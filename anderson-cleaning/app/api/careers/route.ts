/**
 * Careers Application API Route
 *
 * Handles job applications with:
 * - Resume file upload (multipart/form-data)
 * - Validation
 * - Rate limiting
 * - Email sending with attachment
 * - File type and size validation
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import { sanitizeObject, sanitizeFilename } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateCareersEmail } from '@/lib/api/emailTemplates'

// Use Node.js runtime for file upload handling
export const runtime = 'nodejs'

// Careers application schema
const careersSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(100),
  lastName: z.string().min(2, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  applyingFor: z.string().optional(),
  message: z.string().max(2000, 'Message must be less than 2000 characters').optional(),
})

// Allowed file types for resume
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 2 requests per 15 minutes
    const clientId = getClientIdentifier(request)
    const rateLimitResult = checkRateLimit(clientId, { limit: 2, window: 15 * 60 * 1000 })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      )
    }

    // Parse multipart/form-data
    const formData = await request.formData()

    // Extract form fields
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      applyingFor: formData.get('applyingFor') as string,
      message: formData.get('message') as string,
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(data)

    // Validate with Zod
    const validationResult = careersSchema.safeParse(sanitizedData)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid form data',
          details: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      )
    }

    const validData = validationResult.data

    // Handle resume file upload
    const resumeFile = formData.get('resume') as File | null
    let resumeAttachment = null

    if (resumeFile && resumeFile.size > 0) {
      // Validate file type
      if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid file type. Please upload a PDF or Word document.',
          },
          { status: 400 }
        )
      }

      // Validate file size
      if (resumeFile.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: 'File too large. Maximum size is 5MB.',
          },
          { status: 400 }
        )
      }

      // Convert to buffer for email attachment
      const arrayBuffer = await resumeFile.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Sanitize filename
      const sanitizedFilename = sanitizeFilename(
        resumeFile.name || `resume_${validData.firstName}_${validData.lastName}.pdf`
      )

      resumeAttachment = {
        filename: sanitizedFilename,
        content: buffer,
        contentType: resumeFile.type,
      }
    }

    // Generate email content
    const { html, text } = generateCareersEmail({
      ...validData,
      hasResume: !!resumeAttachment,
    })

    // Send email with attachment
    const emailResult = await sendEmail({
      to: getNotificationEmail(),
      subject: `New Job Application: ${validData.firstName} ${validData.lastName}${validData.applyingFor ? ` - ${validData.applyingFor}` : ''}`,
      html,
      text,
      replyTo: validData.email,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    })

    // Log email send
    logEmailSend(
      {
        to: getNotificationEmail(),
        subject: `New Job Application: ${validData.firstName} ${validData.lastName}`,
        html,
      },
      emailResult
    )

    // Log successful application
    console.log('[CAREERS] Application submitted:', {
      name: `${validData.firstName} ${validData.lastName}`,
      email: validData.email,
      position: validData.applyingFor,
      hasResume: !!resumeAttachment,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Application submitted successfully! We will review your application and contact you soon.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[CAREERS] Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while submitting your application. Please try again or email info@andersoncleaning.com.',
      },
      { status: 500 }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
