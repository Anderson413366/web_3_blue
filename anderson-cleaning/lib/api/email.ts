/**
 * Email Service
 *
 * Handles email sending via Resend API
 * Fallback to Nodemailer for development
 */

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
  from?: string
  replyTo?: string
  attachments?: EmailAttachment[]
}

export interface EmailAttachment {
  filename: string
  content: Buffer | string
  contentType?: string
}

/**
 * Send email via Resend API
 */
async function sendViaResend(options: EmailOptions): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY not configured')
  }

  const fromEmail = options.from || process.env.RESEND_FROM_EMAIL || 'noreply@andersoncleaning.com'

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(options.to) ? options.to : [options.to],
        subject: options.subject,
        html: options.html,
        text: options.text,
        reply_to: options.replyTo,
        attachments: options.attachments?.map((att) => ({
          filename: att.filename,
          content: Buffer.isBuffer(att.content)
            ? att.content.toString('base64')
            : Buffer.from(att.content).toString('base64'),
        })),
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Resend API error: ${error}`)
    }

    const data = await response.json()
    return { success: true, id: data.id }
  } catch (error) {
    console.error('Email send error:', error)
    throw error
  }
}

/**
 * Send email (with automatic fallback)
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; id?: string }> {
  // Validate email addresses
  const toEmails = Array.isArray(options.to) ? options.to : [options.to]
  for (const email of toEmails) {
    if (!isValidEmail(email)) {
      throw new Error(`Invalid email address: ${email}`)
    }
  }

  // Send via Resend
  return sendViaResend(options)
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Get notification email address from environment
 */
export function getNotificationEmail(): string {
  return process.env.NOTIFICATION_EMAIL || 'info@andersoncleaning.com'
}

/**
 * Log email send attempt (for debugging)
 */
export function logEmailSend(options: EmailOptions, result: { success: boolean; id?: string }) {
  console.log('[EMAIL]', {
    to: options.to,
    subject: options.subject,
    success: result.success,
    id: result.id,
    timestamp: new Date().toISOString(),
  })
}
