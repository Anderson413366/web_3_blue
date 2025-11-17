/**
 * Rate Limiting Middleware
 *
 * Simple in-memory rate limiter for API routes
 * For production with multiple instances, use Redis or Upstash
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const rateLimit = new Map<string, RateLimitEntry>()

// Clean up expired entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of rateLimit.entries()) {
    if (entry.resetAt < now) {
      rateLimit.delete(key)
    }
  }
}, 5 * 60 * 1000)

export interface RateLimitOptions {
  /**
   * Maximum number of requests allowed within the window
   * @default 5
   */
  limit?: number
  /**
   * Time window in milliseconds
   * @default 60000 (1 minute)
   */
  window?: number
}

export interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Check if a request is rate limited
 *
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param options - Rate limit configuration
 * @returns Rate limit result
 */
export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { limit = 5, window = 60000 } = options
  const now = Date.now()
  const resetAt = now + window

  const entry = rateLimit.get(identifier)

  if (!entry || entry.resetAt < now) {
    // First request or window expired - create new entry
    rateLimit.set(identifier, { count: 1, resetAt })
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetAt,
    }
  }

  // Window still active
  if (entry.count >= limit) {
    // Rate limit exceeded
    return {
      success: false,
      limit,
      remaining: 0,
      reset: entry.resetAt,
    }
  }

  // Increment count
  entry.count++
  return {
    success: true,
    limit,
    remaining: limit - entry.count,
    reset: entry.resetAt,
  }
}

/**
 * Get client identifier from request headers
 * Uses X-Forwarded-For, X-Real-IP, or falls back to "anonymous"
 */
export function getClientIdentifier(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  // Fallback for local development
  return 'anonymous'
}
