import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validation/quote'
import { sanitizeObject, validateHoneypot } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateQuoteEmail } from '@/lib/api/emailTemplates'
import { submitQuote } from '@/lib/forms/submissions'
import { handleSubmission } from '@/lib/api/handlers'

export const runtime = 'edge'

export function POST(request: NextRequest) {
  return handleSubmission({
    request,
    schema: quoteFormSchema,
    rateLimit: { limit: 3, windowMs: 5 * 60 * 1000 },
    sanitize: (payload) => sanitizeObject(payload as Record<string, unknown>),
    honeypotCheck: (payload) => validateHoneypot((payload as Record<string, any>).website),
    store: (data, { request }) =>
      submitQuote({
        company_name: data.company,
        contact_name: data.fullName,
        email: data.email,
        phone: data.phone,
        facility_type: data.facilityType,
        square_footage: String(data.squareFootage),
        num_restrooms: data.numRestrooms || null,
        num_floors: data.numFloors || null,
        address: data.address || null,
        services: data.services,
        cleaning_frequency: data.cleaningFrequency,
        special_requirements: data.specialRequirements || null,
        start_date: data.startDate || null,
        current_provider: data.currentProvider || null,
        budget_range: data.budgetRange || null,
        how_heard: data.howHeard || null,
        additional_notes: data.additionalNotes || null,
        source_page: request.headers.get('referer') || '/quote',
        ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || null,
        user_agent: request.headers.get('user-agent') || null,
      }),
    notify: async (data) => {
      const { html, text } = generateQuoteEmail(data)
      const emailResult = await sendEmail({
        to: getNotificationEmail(),
        subject: `New Quote Request from ${data.fullName} - ${data.company}`,
        html,
        text,
        replyTo: data.email,
      })
      logEmailSend(
        {
          to: getNotificationEmail(),
          subject: `New Quote Request from ${data.fullName}`,
          html,
        },
        emailResult
      )
    },
    successMessage: 'Quote request submitted successfully. We will contact you within 30 minutes!',
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
