import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sanitizeEmail } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateNewsletterEmail } from '@/lib/api/emailTemplates'
import { submitNewsletter } from '@/lib/forms/submissions'
import { handleSubmission } from '@/lib/api/handlers'

export const runtime = 'edge'

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase(),
})

export function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: newsletterSchema,
    rateLimit: { limit: 3, windowMs: 10 * 60 * 1000 },
    sanitize: (payload) => ({ email: sanitizeEmail((payload as Record<string, any>).email || '') }),
    store: (data, { request }) =>
      submitNewsletter({
        email: data.email,
        source_page: request.headers.get('referer') || '/',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    notify: async (data) => {
      const { html, text } = generateNewsletterEmail(data.email)
      const emailResult = await sendEmail({
        to: getNotificationEmail(),
        subject: `New Newsletter Subscription: ${data.email}`,
        html,
        text,
      })
      logEmailSend(
        {
          to: getNotificationEmail(),
          subject: `New Newsletter Subscription: ${data.email}`,
          html,
        },
        emailResult
      )
    },
    successMessage: 'Thank you for subscribing! Check your email for a confirmation.',
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
