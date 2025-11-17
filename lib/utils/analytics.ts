/**
 * Analytics and Performance Monitoring
 *
 * Tracks Core Web Vitals and sends performance metrics to Google Analytics
 * and Sentry for monitoring and optimization.
 */

import * as Sentry from '@sentry/nextjs'

/**
 * Core Web Vitals metric types
 */
export type MetricName = 'FCP' | 'LCP' | 'CLS' | 'FID' | 'TTFB' | 'INP'

export interface Metric {
  name: MetricName
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
  navigationType: string
}

/**
 * Rating thresholds for Core Web Vitals
 */
const METRIC_THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint (ms)
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint (ms)
  CLS: { good: 0.1, poor: 0.25 }, // Cumulative Layout Shift
  FID: { good: 100, poor: 300 }, // First Input Delay (ms)
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte (ms)
  INP: { good: 200, poor: 500 }, // Interaction to Next Paint (ms)
} as const

/**
 * Get rating for a metric value
 */
function getRating(name: MetricName, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = METRIC_THRESHOLDS[name]
  if (!thresholds) return 'good'

  if (value <= thresholds.good) return 'good'
  if (value <= thresholds.poor) return 'needs-improvement'
  return 'poor'
}

/**
 * Send metric to Google Analytics 4
 */
function sendToGoogleAnalytics(metric: Metric) {
  // Check if GA4 is loaded
  if (typeof window === 'undefined' || !window.gtag) return

  const { name, value, id, rating } = metric

  // Send as event to GA4
  window.gtag('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    metric_id: id,
    metric_value: value,
    metric_delta: metric.delta,
    metric_rating: rating,
    event_category: 'Web Vitals',
    event_label: id,
    non_interaction: true,
  })
}

/**
 * Send metric to Sentry
 */
function sendToSentry(metric: Metric) {
  const { name, value, rating } = metric

  // Send as measurement to Sentry
  Sentry.setMeasurement(name, value, name === 'CLS' ? 'none' : 'millisecond')

  // If metric is poor, send as message for alerting
  if (rating === 'poor') {
    Sentry.captureMessage(`Poor ${name}: ${value}`, {
      level: 'warning',
      tags: {
        metric_name: name,
        metric_rating: rating,
      },
      extra: {
        metric_value: value,
        metric_id: metric.id,
      },
    })
  }
}

/**
 * Main function to report Web Vitals
 * Call this with the metric object from web-vitals library
 */
export function reportWebVitals(metric: Metric) {
  // Add rating to metric
  const metricWithRating = {
    ...metric,
    rating: getRating(metric.name, metric.value),
  }

  // Send to analytics services
  sendToGoogleAnalytics(metricWithRating)
  sendToSentry(metricWithRating)

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metricWithRating.rating,
      id: metric.id,
    })
  }
}

/**
 * Track custom performance event
 */
export function trackPerformance(eventName: string, data?: Record<string, any>) {
  // Send to GA4
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Performance',
      ...data,
    })
  }

  // Send to Sentry
  Sentry.addBreadcrumb({
    category: 'performance',
    message: eventName,
    level: 'info',
    data,
  })
}

/**
 * Track resource timing
 */
export function trackResourceTiming(resourceType: string) {
  if (typeof window === 'undefined' || !window.performance) return

  const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]

  const filteredResources = resources.filter((resource) => {
    if (resourceType === 'script') return resource.name.endsWith('.js')
    if (resourceType === 'style') return resource.name.endsWith('.css')
    if (resourceType === 'image') return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(resource.name)
    if (resourceType === 'font') return /\.(woff|woff2|ttf|otf)$/i.test(resource.name)
    return false
  })

  const totalDuration = filteredResources.reduce((sum, r) => sum + r.duration, 0)
  const averageDuration =
    filteredResources.length > 0 ? totalDuration / filteredResources.length : 0

  trackPerformance(`resource_timing_${resourceType}`, {
    count: filteredResources.length,
    total_duration: Math.round(totalDuration),
    average_duration: Math.round(averageDuration),
  })
}

/**
 * Track page load metrics
 */
export function trackPageLoad() {
  if (typeof window === 'undefined' || !window.performance) return

  // Wait for page to fully load
  if (document.readyState !== 'complete') {
    window.addEventListener('load', trackPageLoad)
    return
  }

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

  if (!navigation) return

  const metrics = {
    dns_time: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp_time: Math.round(navigation.connectEnd - navigation.connectStart),
    request_time: Math.round(navigation.responseStart - navigation.requestStart),
    response_time: Math.round(navigation.responseEnd - navigation.responseStart),
    dom_processing: Math.round(
      navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart
    ),
    load_time: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
    total_time: Math.round(navigation.loadEventEnd - navigation.fetchStart),
  }

  trackPerformance('page_load', metrics)
}

/**
 * Track JavaScript bundle size
 */
export function trackBundleSize() {
  if (typeof window === 'undefined' || !window.performance) return

  const scripts = performance
    .getEntriesByType('resource')
    .filter((r) => r.name.endsWith('.js')) as PerformanceResourceTiming[]

  const totalSize = scripts.reduce((sum, script) => sum + (script.transferSize || 0), 0)

  trackPerformance('bundle_size', {
    total_kb: Math.round(totalSize / 1024),
    script_count: scripts.length,
  })
}

/**
 * Track image load performance
 */
export function trackImagePerformance() {
  if (typeof window === 'undefined' || !window.performance) return

  const images = performance
    .getEntriesByType('resource')
    .filter((r) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(r.name)) as PerformanceResourceTiming[]

  const totalSize = images.reduce((sum, img) => sum + (img.transferSize || 0), 0)
  const averageLoadTime =
    images.length > 0 ? images.reduce((sum, img) => sum + img.duration, 0) / images.length : 0

  trackPerformance('image_performance', {
    total_kb: Math.round(totalSize / 1024),
    image_count: images.length,
    average_load_ms: Math.round(averageLoadTime),
  })
}

/**
 * Initialize performance monitoring
 * Call this in your app initialization
 */
export function initPerformanceMonitoring() {
  if (typeof window === 'undefined') return

  // Track page load
  trackPageLoad()

  // Track resources after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      trackBundleSize()
      trackImagePerformance()
      trackResourceTiming('script')
      trackResourceTiming('style')
      trackResourceTiming('font')
    }, 3000) // Wait 3s for all resources to load
  })
}

/**
 * Performance observer for long tasks
 */
export function observeLongTasks() {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Long task detected (>50ms)
        if (entry.duration > 50) {
          trackPerformance('long_task', {
            duration: Math.round(entry.duration),
            start_time: Math.round(entry.startTime),
          })

          // Report to Sentry if very long
          if (entry.duration > 200) {
            Sentry.captureMessage(`Long task detected: ${Math.round(entry.duration)}ms`, {
              level: 'warning',
              tags: { task_duration: Math.round(entry.duration) },
            })
          }
        }
      }
    })

    observer.observe({ entryTypes: ['longtask'] })
  } catch (error) {
    // PerformanceObserver not supported
    console.warn('PerformanceObserver not supported')
  }
}

/**
 * Global type for gtag
 */
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: Record<string, any>) => void
  }
}
