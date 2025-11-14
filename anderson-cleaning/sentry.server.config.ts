/**
 * Sentry Server Configuration
 *
 * Configures error tracking for the server-side (Node.js).
 * This captures errors in API routes, SSR, and server components.
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

    // Tracing - Lower sample rate for production to reduce costs
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.05 : 1.0,

    // Before sending events, filter sensitive data
    beforeSend(event, hint) {
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

        // Filter query params
        if (event.request.query_string && typeof event.request.query_string === 'string') {
          const sensitiveParams = ['token', 'key', 'secret', 'password']
          let queryString = event.request.query_string
          sensitiveParams.forEach((param) => {
            const regex = new RegExp(`${param}=[^&]+`, 'gi')
            queryString = queryString.replace(regex, `${param}=[Filtered]`)
          })
          event.request.query_string = queryString
        }
      }

      // Filter sensitive data from extra context
      if (event.extra) {
        const sensitiveKeys = [
          'apiKey',
          'api_key',
          'password',
          'secret',
          'token',
          'accessToken',
          'access_token',
        ]

        Object.keys(event.extra).forEach((key) => {
          if (sensitiveKeys.some((sensitive) => key.toLowerCase().includes(sensitive))) {
            event.extra![key] = '[Filtered]'
          }
        })
      }

      // Filter user data
      if (event.user) {
        // Keep id and email for tracking, but remove other PII
        delete event.user.ip_address
        if (event.user.email) {
          // Optionally hash emails for privacy
          event.user.email = event.user.email.replace(/(.{2}).*(@.*)/, '$1***$2')
        }
      }

      return event
    },

    // Ignore certain errors
    ignoreErrors: [
      // Database connection errors (handled by retry logic)
      'ECONNREFUSED',
      'ETIMEDOUT',
      // Rate limit errors (expected behavior)
      'Too Many Requests',
      // Client aborted requests
      'aborted',
      'ECONNRESET',
    ],

    // Server-specific integrations
    integrations: [
      // Add custom integrations here if needed
    ],

    // Debug mode for development
    debug: process.env.NODE_ENV === 'development',
  })
}
