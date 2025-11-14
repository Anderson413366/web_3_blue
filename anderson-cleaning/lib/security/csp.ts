/**
 * Content Security Policy Configuration
 *
 * Defines CSP directives to protect against XSS, clickjacking, and other code injection attacks.
 * This configuration allows necessary third-party services while maintaining strong security.
 */

export interface CSPDirectives {
  'default-src': string[]
  'script-src': string[]
  'style-src': string[]
  'img-src': string[]
  'font-src': string[]
  'connect-src': string[]
  'frame-src': string[]
  'media-src': string[]
  'object-src': string[]
  'base-uri': string[]
  'form-action': string[]
  'frame-ancestors': string[]
  'upgrade-insecure-requests': boolean
}

/**
 * CSP Directives Configuration
 */
export const cspDirectives: CSPDirectives = {
  'default-src': ["'self'"],

  'script-src': [
    "'self'",
    "'unsafe-eval'", // Required for Next.js dev mode
    "'unsafe-inline'", // Required for Next.js inline scripts
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.clarity.ms',
    'https://client.crisp.chat',
    'https://assets.calendly.com',
    'https://cdn.sanity.io',
  ],

  'style-src': [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS and styled-jsx
    'https://fonts.googleapis.com',
    'https://client.crisp.chat',
    'https://assets.calendly.com',
  ],

  'img-src': [
    "'self'",
    'data:',
    'blob:',
    'https://cdn.sanity.io',
    'https://images.unsplash.com',
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://maps.googleapis.com',
    'https://maps.gstatic.com',
    'https://client.crisp.chat',
    'https://image.crisp.chat',
    'https://storage.crisp.chat',
  ],

  'font-src': ["'self'", 'data:', 'https://fonts.gstatic.com', 'https://client.crisp.chat'],

  'connect-src': [
    "'self'",
    'https://api.hubspot.com',
    'https://forms.hubspot.com',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://www.clarity.ms',
    'https://client.crisp.chat',
    'https://wss.crisp.chat',
    'https://api.resend.com',
    'https://cdn.sanity.io',
    'https://*.sanity.io',
  ],

  'frame-src': [
    "'self'",
    'https://calendly.com',
    'https://www.google.com',
    'https://maps.google.com',
  ],

  'media-src': [
    "'self'",
    'https://cdn.sanity.io',
    'https://client.crisp.chat',
    'https://storage.crisp.chat',
  ],

  'object-src': ["'none'"],

  'base-uri': ["'self'"],

  'form-action': ["'self'"],

  'frame-ancestors': ["'none'"], // Prevents embedding in iframes

  'upgrade-insecure-requests': true,
}

/**
 * Generate CSP header string from directives
 */
export function generateCSPHeader(directives: CSPDirectives): string {
  const policies: string[] = []

  for (const [key, value] of Object.entries(directives)) {
    if (key === 'upgrade-insecure-requests') {
      if (value === true) {
        policies.push('upgrade-insecure-requests')
      }
    } else {
      const directiveValue = Array.isArray(value) ? value.join(' ') : value
      policies.push(`${key} ${directiveValue}`)
    }
  }

  return policies.join('; ')
}

/**
 * Get CSP header value for production
 */
export function getCSPHeader(): string {
  return generateCSPHeader(cspDirectives)
}

/**
 * Get CSP header value for development (more permissive)
 */
export function getDevCSPHeader(): string {
  const devDirectives = { ...cspDirectives }

  // More permissive for development
  devDirectives['script-src'] = [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    ...cspDirectives['script-src'].filter(
      (src) => !["'unsafe-eval'", "'unsafe-inline'"].includes(src)
    ),
  ]

  return generateCSPHeader(devDirectives)
}

/**
 * Get CSP nonce for inline scripts (if using nonce-based CSP)
 */
export function generateNonce(): string {
  return Buffer.from(crypto.randomUUID()).toString('base64')
}

/**
 * CSP Violation Report Handler
 * Log CSP violations for monitoring
 */
export interface CSPViolationReport {
  'csp-report': {
    'document-uri': string
    'violated-directive': string
    'effective-directive': string
    'original-policy': string
    'blocked-uri': string
    'status-code': number
    'source-file'?: string
    'line-number'?: number
    'column-number'?: number
  }
}

export function handleCSPViolation(report: CSPViolationReport) {
  const violation = report['csp-report']

  // Log the violation (in production, send to monitoring service)
  console.warn('CSP Violation:', {
    blockedUri: violation['blocked-uri'],
    violatedDirective: violation['violated-directive'],
    documentUri: violation['document-uri'],
    sourceFile: violation['source-file'],
    lineNumber: violation['line-number'],
  })

  // In production, send to Sentry or other monitoring service
  if (process.env.NODE_ENV === 'production') {
    // Sentry.captureMessage('CSP Violation', {
    //   level: 'warning',
    //   extra: violation,
    // })
  }
}
