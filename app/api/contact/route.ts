/**
 * Contact Form API Route
 *
 * Handles contact form submissions with:
 * - Zod validation
 * - Rate limiting
 * - Sanitization
 * - Email sending
 * - Error handling
 */

import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/quote'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import { sanitizeObject, validateHoneypot } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateContactEmail } from '@/lib/api/emailTemplates'

export const runtime = 'edge'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 5 requests per 10 minutes
    const clientId = getClientIdentifier(request)
    const rateLimitResult = checkRateLimit(clientId, { limit: 5, window: 10 * 60 * 1000 })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
            'Retry-After': Math.ceil((rateLimitResult.reset - Date.now()) / 1000).toString(),
          },
        }
      )
    }

    // Parse and validate request body
    const body = await request.json()

    // Check honeypot
    if (!validateHoneypot(body.website)) {
      console.warn('[SECURITY] Honeypot triggered:', clientId)
      return NextResponse.json({ success: true, message: 'Message sent successfully' })
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(body)

    // Validate with Zod schema
    const validationResult = contactFormSchema.safeParse(sanitizedData)

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

    const data = validationResult.data

    // Generate email content
    const { html, text } = generateContactEmail(data)

    // Send email notification
    const emailResult = await sendEmail({
      to: getNotificationEmail(),
      subject: `New Contact Form Submission from ${data.name}`,
      html,
      text,
      replyTo: data.email,
    })

    // Log email send
    logEmailSend(
      {
        to: getNotificationEmail(),
        subject: `New Contact Form Submission from ${data.name}`,
        html,
      },
      emailResult
    )

    // Log successful submission
    console.log('[CONTACT] Submission successful:', {
      name: data.name,
      email: data.email,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for contacting us! We will respond within 1 business day.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error('[CONTACT] Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while sending your message. Please try again or call (413) 306-5053.',
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
