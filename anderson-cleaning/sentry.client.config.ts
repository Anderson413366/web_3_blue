/**
 * Sentry Client Configuration
 *
 * Configures error tracking for the browser/client-side.
 * This runs in the user's browser and captures client-side errors.
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

    // Tracing - Adjust sample rate for production
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

    // Replay Sessions - helpful for debugging UX issues
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Integrations
    integrations: [
      // Browser tracing for performance monitoring
      // Replay for session recording (if available)
    ],

    // Before sending events, filter sensitive data
    beforeSend(event, hint) {
      // Remove sensitive data from breadcrumbs
      if (event.breadcrumbs) {
        event.breadcrumbs = event.breadcrumbs.map((breadcrumb) => {
          // Remove passwords from form data
          if (breadcrumb.data && breadcrumb.data.password) {
            breadcrumb.data.password = '[Filtered]'
          }
          return breadcrumb
        })
      }

      // Filter out non-error exceptions in development
      if (process.env.NODE_ENV === 'development') {
        const error = hint.originalException
        if (error instanceof Error) {
          // Don't send hydration errors in dev
          if (error.message.includes('Hydration')) {
            return null
          }
        }
      }

      return event
    },

    // Ignore certain errors
    ignoreErrors: [
      // Browser extensions
      'top.GLOBALS',
      'chrome-extension://',
      'moz-extension://',
      // Network errors
      'Network request failed',
      'Failed to fetch',
      // ResizeObserver loop errors (benign)
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
    ],

    // Deny URLs from being captured
    denyUrls: [
      // Browser extensions
      /extensions\//i,
      /^chrome:\/\//i,
      /^moz-extension:\/\//i,
    ],
  })
}
