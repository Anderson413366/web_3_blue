import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sanitizeObject, sanitizeFilename } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend, type EmailAttachment } from '@/lib/api/email'
import { generateCareersEmail } from '@/lib/api/emailTemplates'
import { submitCareerApplication } from '@/lib/forms/submissions'
import { handleSubmission, SubmissionError } from '@/lib/api/handlers'

export const runtime = 'nodejs'

const careersSchema = z.object({
  firstName: z.string().min(2, 'First name is required').max(100),
  lastName: z.string().min(2, 'Last name is required').max(100),
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  applyingFor: z.string().optional(),
  message: z.string().max(2000, 'Message must be less than 2000 characters').optional(),
})

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024

export function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: careersSchema,
    rateLimit: { limit: 2, windowMs: 15 * 60 * 1000 },
    parse: () => parseCareerForm(request),
    store: (data, { request, extras }) =>
      submitCareerApplication({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        position: data.applyingFor || 'General Application',
        cover_letter: data.message || null,
        resume_filename: (extras?.resumeAttachment as EmailAttachment | null)?.filename || null,
        source_page: request.headers.get('referer') || '/careers',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    notify: async (data, { extras }) => {
      const resumeAttachment = extras?.resumeAttachment as EmailAttachment | undefined
      const { html, text } = generateCareersEmail({ ...data, hasResume: !!resumeAttachment })
      const emailResult = await sendEmail({
        to: getNotificationEmail(),
        subject: `New Job Application: ${data.firstName} ${data.lastName}${data.applyingFor ? ` - ${data.applyingFor}` : ''}`,
        html,
        text,
        replyTo: data.email,
        attachments: resumeAttachment ? [resumeAttachment] : undefined,
      })
      logEmailSend(
        {
          to: getNotificationEmail(),
          subject: `New Job Application: ${data.firstName} ${data.lastName}`,
          html,
        },
        emailResult
      )
    },
    successMessage: 'Application submitted successfully! We will review your application and contact you soon.',
  })
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

async function parseCareerForm(request: NextRequest) {
  const formData = await request.formData()
  const rawFields = {
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    applyingFor: formData.get('applyingFor') as string,
    message: formData.get('message') as string,
  }
  const sanitizedFields = sanitizeObject(rawFields)
  const resumeAttachment = await buildResumeAttachment(formData, sanitizedFields)

  return {
    payload: sanitizedFields,
    extras: { resumeAttachment },
  }
}

async function buildResumeAttachment(formData: FormData, data: Record<string, string>) {
  const resumeFile = formData.get('resume') as File | null
  if (!resumeFile || resumeFile.size === 0) {
    return null
  }

  if (!ALLOWED_MIME_TYPES.includes(resumeFile.type)) {
    throw new SubmissionError('Invalid file type. Please upload a PDF or Word document.')
  }

  if (resumeFile.size > MAX_FILE_SIZE) {
    throw new SubmissionError('File too large. Maximum size is 5MB.')
  }

  const arrayBuffer = await resumeFile.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const sanitizedFilename = sanitizeFilename(
    resumeFile.name || `resume_${data.firstName}_${data.lastName}.pdf`
  )

  return {
    filename: sanitizedFilename,
    content: buffer,
    contentType: resumeFile.type,
  }
}
