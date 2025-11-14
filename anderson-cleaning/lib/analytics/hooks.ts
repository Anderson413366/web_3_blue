/**
 * Analytics React Hooks
 *
 * Custom hooks for automatic event tracking
 */

'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth, trackOutboundLink, trackPageView } from './gtm'

/**
 * Track page views on route change
 */
export function usePageViewTracking() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname) {
      trackPageView(pathname)
    }
  }, [pathname])
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export function useScrollDepthTracking() {
  const scrollDepthsTracked = useRef<Set<number>>(new Set())

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollTop = window.scrollY
      const scrollPercentage = Math.round((scrollTop / scrollHeight) * 100)

      // Track at 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100]
      for (const milestone of milestones) {
        if (
          scrollPercentage >= milestone &&
          !scrollDepthsTracked.current.has(milestone)
        ) {
          scrollDepthsTracked.current.add(milestone)
          trackScrollDepth(milestone)
        }
      }
    }

    // Debounce scroll events
    let scrollTimeout: NodeJS.Timeout
    const debouncedScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(handleScroll, 100)
    }

    window.addEventListener('scroll', debouncedScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', debouncedScroll)
      clearTimeout(scrollTimeout)
    }
  }, [])

  // Reset scroll depths when pathname changes
  const pathname = usePathname()
  useEffect(() => {
    scrollDepthsTracked.current.clear()
  }, [pathname])
}

/**
 * Track outbound link clicks automatically
 * Attach to document root and listen for clicks on external links
 */
export function useOutboundLinkTracking() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      // Check if link is external
      const isExternal =
        href.startsWith('http') &&
        !href.includes(window.location.hostname)

      if (isExternal) {
        const linkText = link.textContent?.trim() || href
        trackOutboundLink(href, linkText)
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

/**
 * Track tel: and mailto: link clicks
 */
export function useContactLinkTracking() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a')

      if (!link) return

      const href = link.getAttribute('href')
      if (!href) return

      // Track phone clicks
      if (href.startsWith('tel:')) {
        const phoneNumber = href.replace('tel:', '')
        const location = link.getAttribute('data-location') || 'unknown'

        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'phone_click',
            phone_number: phoneNumber,
            click_location: location,
          })
        }
      }

      // Track email clicks
      if (href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '')
        const location = link.getAttribute('data-location') || 'unknown'

        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'email_click',
            email_address: email,
            click_location: location,
          })
        }
      }
    }

    document.addEventListener('click', handleClick, { passive: true })
    return () => document.removeEventListener('click', handleClick)
  }, [])
}

/**
 * Combined analytics hook - use this in root layout
 */
export function useAnalytics() {
  usePageViewTracking()
  useScrollDepthTracking()
  useOutboundLinkTracking()
  useContactLinkTracking()
}
