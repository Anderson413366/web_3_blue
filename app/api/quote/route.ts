/**
 * Quote Form API Route
 *
 * Handles quote request submissions with:
 * - Zod validation
 * - Rate limiting
 * - Sanitization
 * - Email sending
 * - Error handling
 */

import { NextRequest, NextResponse } from 'next/server'
import { quoteFormSchema } from '@/lib/validation/quote'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import { sanitizeObject, validateHoneypot } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateQuoteEmail } from '@/lib/api/emailTemplates'

export const runtime = 'edge' // Use Edge Runtime for faster responses

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per 5 minutes
    const clientId = getClientIdentifier(request)
    const rateLimitResult = checkRateLimit(clientId, { limit: 3, window: 5 * 60 * 1000 })

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
      // Return success to avoid revealing the honeypot
      return NextResponse.json({ success: true, message: 'Quote request submitted successfully' })
    }

    // Sanitize input
    const sanitizedData = sanitizeObject(body)

    // Validate with Zod schema
    const validationResult = quoteFormSchema.safeParse(sanitizedData)

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
    const { html, text } = generateQuoteEmail(data)

    // Send email notification
    const emailResult = await sendEmail({
      to: getNotificationEmail(),
      subject: `New Quote Request from ${data.fullName} - ${data.company}`,
      html,
      text,
      replyTo: data.email,
    })

    // Log email send
    logEmailSend(
      {
        to: getNotificationEmail(),
        subject: `New Quote Request from ${data.fullName}`,
        html,
      },
      emailResult
    )

    // Log successful submission
    console.log('[QUOTE] Submission successful:', {
      name: data.fullName,
      company: data.company,
      email: data.email,
      facilityType: data.facilityType,
      timestamp: new Date().toISOString(),
    })

    // Track in Google Analytics dataLayer (if GTM is configured)
    // This would be handled client-side after successful response

    return NextResponse.json(
      {
        success: true,
        message: 'Quote request submitted successfully. We will contact you within 30 minutes!',
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
    console.error('[QUOTE] Error:', error)

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while processing your request. Please try again or call (413) 306-5053.',
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
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
