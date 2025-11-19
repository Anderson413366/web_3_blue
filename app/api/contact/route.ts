import { NextRequest, NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validation/quote'
import { sanitizeObject, validateHoneypot } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateContactEmail } from '@/lib/api/emailTemplates'
import { submitContact } from '@/lib/forms/submissions'
import { handleSubmission } from '@/lib/api/handlers'

export const runtime = 'edge'

export function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: contactFormSchema,
    rateLimit: { limit: 5, windowMs: 10 * 60 * 1000 },
    sanitize: (payload) => sanitizeObject(payload as Record<string, unknown>),
    honeypotCheck: (payload) => validateHoneypot((payload as Record<string, any>).website),
    store: (data, { request }) =>
      submitContact({
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        message: data.message,
        source_page: request.headers.get('referer') || '/contact',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    notify: async (data) => {
      const { html, text } = generateContactEmail(data)
      const emailResult = await sendEmail({
        to: getNotificationEmail(),
        subject: `New Contact Form Submission from ${data.name}`,
        html,
        text,
        replyTo: data.email,
      })
      logEmailSend(
        {
          to: getNotificationEmail(),
          subject: `New Contact Form Submission from ${data.name}`,
          html,
        },
        emailResult
      )
    },
    successMessage: 'Thank you for contacting us! We will respond within 1 business day.',
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
