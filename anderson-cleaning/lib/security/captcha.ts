/**
 * CAPTCHA Verification
 *
 * Supports Google reCAPTCHA v3 and Cloudflare Turnstile
 * to protect forms from bot submissions.
 */

export interface RecaptchaResponse {
  success: boolean
  score?: number
  action?: string
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
}

export interface TurnstileResponse {
  success: boolean
  challenge_ts?: string
  hostname?: string
  'error-codes'?: string[]
  action?: string
  cdata?: string
}

export interface CaptchaVerificationResult {
  success: boolean
  score?: number
  error?: string
}

/**
 * Verify Google reCAPTCHA v3 token
 *
 * @param token - The reCAPTCHA response token from the client
 * @param scoreThreshold - Minimum score required (0.0 to 1.0, default 0.5)
 * @returns Verification result with success status and score
 */
export async function verifyRecaptcha(
  token: string,
  scoreThreshold: number = 0.5
): Promise<CaptchaVerificationResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured')
    return {
      success: false,
      error: 'reCAPTCHA is not configured',
    }
  }

  if (!token || typeof token !== 'string') {
    return {
      success: false,
      error: 'Invalid reCAPTCHA token',
    }
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    if (!response.ok) {
      throw new Error(`reCAPTCHA API returned ${response.status}`)
    }

    const data: RecaptchaResponse = await response.json()

    // Check if verification was successful
    if (!data.success) {
      return {
        success: false,
        error: data['error-codes']?.join(', ') || 'reCAPTCHA verification failed',
      }
    }

    // Check score threshold (v3 only)
    if (data.score !== undefined) {
      if (data.score < scoreThreshold) {
        return {
          success: false,
          score: data.score,
          error: `reCAPTCHA score too low: ${data.score}`,
        }
      }

      return {
        success: true,
        score: data.score,
      }
    }

    // v2 checkbox (no score)
    return {
      success: true,
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return {
      success: false,
      error: 'Failed to verify reCAPTCHA',
    }
  }
}

/**
 * Verify Cloudflare Turnstile token
 *
 * @param token - The Turnstile response token from the client
 * @param remoteIp - Optional IP address of the user
 * @returns Verification result with success status
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string
): Promise<CaptchaVerificationResult> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not configured')
    return {
      success: false,
      error: 'Turnstile is not configured',
    }
  }

  if (!token || typeof token !== 'string') {
    return {
      success: false,
      error: 'Invalid Turnstile token',
    }
  }

  try {
    const formData = new URLSearchParams({
      secret: secretKey,
      response: token,
    })

    if (remoteIp) {
      formData.append('remoteip', remoteIp)
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Turnstile API returned ${response.status}`)
    }

    const data: TurnstileResponse = await response.json()

    // Check if verification was successful
    if (!data.success) {
      return {
        success: false,
        error: data['error-codes']?.join(', ') || 'Turnstile verification failed',
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return {
      success: false,
      error: 'Failed to verify Turnstile',
    }
  }
}

/**
 * Verify CAPTCHA based on configured provider
 * Automatically detects which CAPTCHA service is configured
 *
 * @param token - The CAPTCHA response token from the client
 * @param options - Optional configuration
 * @returns Verification result
 */
export async function verifyCaptcha(
  token: string,
  options?: {
    scoreThreshold?: number
    remoteIp?: string
  }
): Promise<CaptchaVerificationResult> {
  const hasRecaptcha = !!process.env.RECAPTCHA_SECRET_KEY
  const hasTurnstile = !!process.env.TURNSTILE_SECRET_KEY

  // Prefer reCAPTCHA if both are configured
  if (hasRecaptcha) {
    return verifyRecaptcha(token, options?.scoreThreshold)
  }

  if (hasTurnstile) {
    return verifyTurnstile(token, options?.remoteIp)
  }

  // No CAPTCHA configured - in development, allow through
  if (process.env.NODE_ENV === 'development') {
    console.warn('No CAPTCHA configured - allowing through in development mode')
    return { success: true }
  }

  return {
    success: false,
    error: 'No CAPTCHA service configured',
  }
}

/**
 * Get CAPTCHA site key for client-side rendering
 * Returns the appropriate site key based on what's configured
 */
export function getCaptchaSiteKey(): string | null {
  return (
    process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || null
  )
}

/**
 * Get CAPTCHA provider type
 */
export function getCaptchaProvider(): 'recaptcha' | 'turnstile' | null {
  if (process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return 'recaptcha'
  }
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return 'turnstile'
  }
  return null
}

/**
 * Check if CAPTCHA is required for a given action
 * Can be used to implement different CAPTCHA requirements for different forms
 */
export function isCaptchaRequired(action: string): boolean {
  // Define which actions require CAPTCHA
  const requireCaptcha = ['contact', 'quote', 'application', 'comment', 'registration']

  return requireCaptcha.includes(action.toLowerCase())
}

/**
 * Rate limit check before CAPTCHA verification
 * Prevents abuse of CAPTCHA verification endpoint
 */
const verificationAttempts = new Map<string, { count: number; resetAt: number }>()

export function checkCaptchaRateLimit(identifier: string, maxAttempts = 10): boolean {
  const now = Date.now()
  const entry = verificationAttempts.get(identifier)

  // Clean up expired entries
  if (entry && entry.resetAt < now) {
    verificationAttempts.delete(identifier)
  }

  // Check current attempts
  if (entry && entry.resetAt >= now) {
    if (entry.count >= maxAttempts) {
      return false // Rate limit exceeded
    }
    entry.count++
  } else {
    // Create new entry (reset after 1 hour)
    verificationAttempts.set(identifier, {
      count: 1,
      resetAt: now + 60 * 60 * 1000,
    })
  }

  return true // Within rate limit
}
