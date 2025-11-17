/**
 * Newsletter Subscription API Route
 *
 * Handles newsletter subscriptions with:
 * - Email validation
 * - Rate limiting
 * - Email notification
 * - Error handling
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { checkRateLimit, getClientIdentifier } from '@/lib/api/rateLimit'
import { sanitizeEmail } from '@/lib/api/sanitize'
import { sendEmail, getNotificationEmail, logEmailSend } from '@/lib/api/email'
import { generateNewsletterEmail } from '@/lib/api/emailTemplates'

export const runtime = 'edge'

// Simple newsletter schema
const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase(),
})

export async function POST(request: NextRequest) {
  try {
    // Rate limiting - 3 requests per 10 minutes
    const clientId = getClientIdentifier(request)
    const rateLimitResult = checkRateLimit(clientId, { limit: 3, window: 10 * 60 * 1000 })

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      )
    }

    // Parse request body
    const body = await request.json()

    // Sanitize email
    const sanitizedEmail = sanitizeEmail(body.email || '')

    // Validate email
    const validationResult = newsletterSchema.safeParse({ email: sanitizedEmail })

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid email address',
        },
        { status: 400 }
      )
    }

    const { email } = validationResult.data

    // Generate email notification
    const { html, text } = generateNewsletterEmail(email)

    // Send notification
    const emailResult = await sendEmail({
      to: getNotificationEmail(),
      subject: `New Newsletter Subscription: ${email}`,
      html,
      text,
    })

    // Log email send
    logEmailSend(
      {
        to: getNotificationEmail(),
        subject: `New Newsletter Subscription: ${email}`,
        html,
      },
      emailResult
    )

    // Log successful subscription
    console.log('[NEWSLETTER] New subscription:', {
      email,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for subscribing! Check your email for a confirmation.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('[NEWSLETTER] Error:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred. Please try again later.',
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
