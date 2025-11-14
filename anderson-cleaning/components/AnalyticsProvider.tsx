/**
 * Analytics Provider Component
 *
 * Combines GTM script loading with automatic event tracking
 * Should be placed in root layout
 */

'use client'

import { useEffect } from 'react'
import GoogleTagManager from './GoogleTagManager'
import { useAnalytics } from '@/lib/analytics/hooks'

interface AnalyticsProviderProps {
  gtmId?: string
  children: React.ReactNode
}

export default function AnalyticsProvider({ gtmId, children }: AnalyticsProviderProps) {
  // Use combined analytics hook for automatic tracking
  useAnalytics()

  // Track time on page
  useEffect(() => {
    const startTime = Date.now()

    return () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000) // seconds
      if (typeof window !== 'undefined' && window.dataLayer && timeOnPage > 5) {
        window.dataLayer.push({
          event: 'page_exit',
          time_on_page: timeOnPage,
          page_path: window.location.pathname,
        })
      }
    }
  }, [])

  const gtmIdValue = gtmId || process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''

  return (
    <>
      {gtmIdValue && <GoogleTagManager gtmId={gtmIdValue} />}
      {children}
    </>
  )
}
