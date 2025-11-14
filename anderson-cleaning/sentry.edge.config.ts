/**
 * Sentry Edge Runtime Configuration
 *
 * Configures error tracking for Edge Runtime (middleware, edge API routes).
 * Note: Edge runtime has limitations - fewer Node.js APIs available.
 */

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN

// Only initialize Sentry if DSN is configured
if (SENTRY_DSN) {
  Sentry.init({
    // Sentry DSN
    dsn: SENTRY_DSN,

    // Environment
    environment: process.env.NODE_ENV || 'development',

    // Lower sample rate for edge runtime (runs on every request)
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.01 : 0.1,

    // Before sending events, filter sensitive data
    beforeSend(event) {
      // Remove sensitive request data
      if (event.request) {
        // Remove cookies
        if (event.request.cookies) {
          event.request.cookies = { filtered: '[Filtered]' }
        }

        // Remove auth headers
        if (event.request.headers) {
          const sensitiveHeaders = ['authorization', 'cookie', 'x-api-key']
          sensitiveHeaders.forEach((header) => {
            if (event.request?.headers?.[header]) {
              event.request.headers[header] = '[Filtered]'
            }
          })
        }
      }

      return event
    },

    // Ignore errors that are handled by rate limiting
    ignoreErrors: ['Too Many Requests', 'Rate limit exceeded'],
  })
}
