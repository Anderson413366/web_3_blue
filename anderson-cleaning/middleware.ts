/**
 * Next.js Middleware
 *
 * Implements security headers, rate limiting, and route protection.
 * Runs on all requests before they reach the application.
 */

import { NextRequest, NextResponse } from 'next/server'
import { getCSPHeader, getDevCSPHeader } from './lib/security/csp'

// ===== RATE LIMITING =====

interface RateLimitEntry {
  count: number
  resetAt: number
}

// In-memory rate limit store
// In production, use Redis or similar distributed cache
const rateLimitStore = new Map<string, RateLimitEntry>()

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // API routes
  '/api/contact': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  '/api/quote': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5 per hour
  '/api/careers': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  '/api/': { maxRequests: 100, windowMs: 15 * 60 * 1000 }, // 100 per 15 min (general API)

  // Default for all other routes
  default: { maxRequests: 1000, windowMs: 15 * 60 * 1000 }, // 1000 per 15 min
}

function getRateLimitConfig(pathname: string): RateLimitConfig {
  // Find the most specific rate limit config
  for (const [path, config] of Object.entries(RATE_LIMITS)) {
    if (pathname.startsWith(path)) {
      return config
    }
  }
  return RATE_LIMITS.default
}

function getClientIdentifier(request: NextRequest): string {
  // Get IP address from various headers (considering proxies)
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const ip = forwarded?.split(',')[0] || realIp || 'unknown'

  return `${ip}-${request.nextUrl.pathname}`
}

function checkRateLimit(request: NextRequest): {
  allowed: boolean
  resetAt?: number
  remaining?: number
} {
  const identifier = getClientIdentifier(request)
  const config = getRateLimitConfig(request.nextUrl.pathname)
  const now = Date.now()

  // Clean up expired entries periodically
  if (Math.random() < 0.01) {
    // 1% chance
    for (const [key, entry] of rateLimitStore.entries()) {
      if (entry.resetAt < now) {
        rateLimitStore.delete(key)
      }
    }
  }

  const entry = rateLimitStore.get(identifier)

  // Create new entry if doesn't exist or expired
  if (!entry || entry.resetAt < now) {
    const resetAt = now + config.windowMs
    rateLimitStore.set(identifier, { count: 1, resetAt })
    return {
      allowed: true,
      resetAt,
      remaining: config.maxRequests - 1,
    }
  }

  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      resetAt: entry.resetAt,
      remaining: 0,
    }
  }

  // Increment counter
  entry.count++
  return {
    allowed: true,
    resetAt: entry.resetAt,
    remaining: config.maxRequests - entry.count,
  }
}

// ===== STUDIO PROTECTION =====

function isStudioRoute(pathname: string): boolean {
  return pathname.startsWith('/studio')
}

function checkStudioAuth(request: NextRequest): boolean {
  const authUser = process.env.STUDIO_BASIC_AUTH_USER
  const authPass = process.env.STUDIO_BASIC_AUTH_PASS

  // If no auth configured, allow access (rely on Sanity's auth)
  if (!authUser || !authPass) {
    return true
  }

  // Check Authorization header
  const authHeader = request.headers.get('authorization')
  if (!authHeader) {
    return false
  }

  // Parse Basic Auth
  const base64Credentials = authHeader.split(' ')[1]
  if (!base64Credentials) {
    return false
  }

  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  return username === authUser && password === authPass
}

function createBasicAuthResponse(): NextResponse {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Sanity Studio", charset="UTF-8"',
    },
  })
}

// ===== IP ALLOWLIST (Optional) =====

function isIpAllowed(request: NextRequest): boolean {
  const allowlist = process.env.STUDIO_IP_ALLOWLIST

  // If no allowlist configured, allow all IPs
  if (!allowlist) {
    return true
  }

  const allowedIps = allowlist.split(',').map((ip) => ip.trim())
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const clientIp = forwarded?.split(',')[0] || realIp || ''

  return allowedIps.includes(clientIp)
}

// ===== SECURITY HEADERS =====

function getSecurityHeaders(pathname: string): Record<string, string> {
  const isDev = process.env.NODE_ENV === 'development'
  const cspHeader = isDev ? getDevCSPHeader() : getCSPHeader()

  const headers: Record<string, string> = {
    // Content Security Policy
    'Content-Security-Policy': cspHeader,

    // Prevent MIME type sniffing
    'X-Content-Type-Options': 'nosniff',

    // XSS Protection (legacy browsers)
    'X-XSS-Protection': '1; mode=block',

    // Referrer Policy
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions Policy
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',

    // DNS Prefetch Control
    'X-DNS-Prefetch-Control': 'on',
  }

  // HSTS (only in production and over HTTPS)
  if (!isDev) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
  }

  // X-Frame-Options (vary by route)
  if (pathname.startsWith('/studio')) {
    // Allow framing for Sanity Studio
    headers['X-Frame-Options'] = 'SAMEORIGIN'
  } else if (pathname.includes('/calendly') || pathname.includes('/embed')) {
    // Allow framing for embeds
    headers['X-Frame-Options'] = 'SAMEORIGIN'
  } else {
    // Prevent clickjacking for all other routes
    headers['X-Frame-Options'] = 'DENY'
  }

  return headers
}

// ===== MIDDLEWARE HANDLER =====

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files and Next.js internals
  if (pathname.startsWith('/_next') || pathname.startsWith('/static') || pathname.includes('.')) {
    return NextResponse.next()
  }

  // Check rate limit
  const rateLimit = checkRateLimit(request)
  if (!rateLimit.allowed) {
    const retryAfter = Math.ceil((rateLimit.resetAt! - Date.now()) / 1000)
    return new NextResponse('Too Many Requests', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(getRateLimitConfig(pathname).maxRequests),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(rateLimit.resetAt),
      },
    })
  }

  // Protect /studio route
  if (isStudioRoute(pathname)) {
    // Check IP allowlist
    if (!isIpAllowed(request)) {
      return new NextResponse('Access Denied', { status: 403 })
    }

    // Check basic auth
    if (!checkStudioAuth(request)) {
      return createBasicAuthResponse()
    }
  }

  // Create response with security headers
  const response = NextResponse.next()
  const securityHeaders = getSecurityHeaders(pathname)

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  // Add rate limit headers
  response.headers.set('X-RateLimit-Limit', String(getRateLimitConfig(pathname).maxRequests))
  response.headers.set('X-RateLimit-Remaining', String(rateLimit.remaining))
  response.headers.set('X-RateLimit-Reset', String(rateLimit.resetAt))

  return response
}

// ===== MIDDLEWARE CONFIG =====

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
