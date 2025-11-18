'use client'

/**
 * Web Vitals Reporter Component
 *
 * Tracks and reports Core Web Vitals metrics to analytics services.
 * Uses the web-vitals library to measure real user performance.
 */

import { useEffect } from 'react'
import { reportWebVitals, initPerformanceMonitoring, observeLongTasks } from '@/lib/utils/analytics'

export default function WebVitalsReporter() {
  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return

    // Initialize performance monitoring
    initPerformanceMonitoring()

    // Observe long tasks
    observeLongTasks()

    // Dynamically import web-vitals library
    import('web-vitals')
      .then((webVitals) => {
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = webVitals

        // Report Core Web Vitals
        onCLS(reportWebVitals)
        onFCP(reportWebVitals)
        onLCP(reportWebVitals)
        onTTFB(reportWebVitals)
        onINP(reportWebVitals)

        // onFID is deprecated in web-vitals v3, use onINP instead
        // Try to use onFID if available (backwards compatibility)
        if ('onFID' in webVitals && typeof webVitals.onFID === 'function') {
          webVitals.onFID(reportWebVitals)
        }
      })
      .catch((error) => {
        console.error('Failed to load web-vitals:', error)
      })
  }, [])

  // This component doesn't render anything
  return null
}
