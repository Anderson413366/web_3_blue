'use client'

/**
 * Lazy-loaded Third-Party Scripts
 *
 * Dynamically loads heavy third-party scripts only when needed
 * to improve initial page load performance.
 */

import { useEffect, useState } from 'react'
import Script from 'next/script'

/**
 * Crisp Chat Widget
 * Loads after page is idle to avoid blocking main thread
 */
export function CrispChat() {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Wait for page to be idle before loading Crisp
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setShouldLoad(true), { timeout: 3000 })
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => setShouldLoad(true), 3000)
    }
  }, [])

  if (!shouldLoad || !process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID) return null

  return (
    <Script
      id="crisp-chat"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "${process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID}";
          (function() {
            var d = document;
            var s = d.createElement("script");
            s.src = "https://client.crisp.chat/l.js";
            s.async = 1;
            d.getElementsByTagName("head")[0].appendChild(s);
          })();
        `,
      }}
    />
  )
}

/**
 * Google Analytics 4
 * Loads with afterInteractive strategy for tracking
 */
export function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!gaId) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}

/**
 * Microsoft Clarity
 * Loads after page is idle for heatmap tracking
 */
export function MicrosoftClarity() {
  const [shouldLoad, setShouldLoad] = useState(false)
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  useEffect(() => {
    // Wait for idle to avoid blocking main thread
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => setShouldLoad(true), { timeout: 4000 })
    } else {
      setTimeout(() => setShouldLoad(true), 4000)
    }
  }, [])

  if (!shouldLoad || !clarityId) return null

  return (
    <Script
      id="microsoft-clarity"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `,
      }}
    />
  )
}

/**
 * Calendly Widget (for embedding)
 * Only loads when Calendly component is visible
 */
interface CalendlyWidgetProps {
  url: string
  prefill?: Record<string, any>
  pageSettings?: Record<string, any>
}

export function CalendlyWidget({ url, prefill, pageSettings }: CalendlyWidgetProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    // Load Calendly script only when component mounts
    if (!scriptLoaded) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      script.onload = () => setScriptLoaded(true)
      document.head.appendChild(script)

      // Load CSS
      const link = document.createElement('link')
      link.href = 'https://assets.calendly.com/assets/external/widget.css'
      link.rel = 'stylesheet'
      document.head.appendChild(link)
    }
  }, [scriptLoaded])

  useEffect(() => {
    if (scriptLoaded && window.Calendly) {
      window.Calendly.initInlineWidget({
        url,
        parentElement: document.getElementById('calendly-embed'),
        prefill: prefill || {},
        pageSettings: pageSettings || {},
      })
    }
  }, [scriptLoaded, url, prefill, pageSettings])

  return (
    <div
      id="calendly-embed"
      className="calendly-inline-widget"
      style={{ minWidth: '320px', height: '700px' }}
    />
  )
}

/**
 * Intersection Observer wrapper for lazy components
 * Use this to load components only when they're visible
 */
interface LazyLoadWrapperProps {
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
}

export function LazyLoadWrapper({
  children,
  threshold = 0.1,
  rootMargin = '100px',
}: LazyLoadWrapperProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [ref, setRef] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(ref)

    return () => observer.disconnect()
  }, [ref, threshold, rootMargin])

  return <div ref={setRef}>{isVisible ? children : <div style={{ minHeight: '100px' }} />}</div>
}

/**
 * Type declarations for external scripts
 */
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string
        parentElement: HTMLElement | null
        prefill?: Record<string, any>
        pageSettings?: Record<string, any>
      }) => void
    }
    dataLayer?: any[]
    clarity?: (...args: any[]) => void
    $crisp?: any[]
    CRISP_WEBSITE_ID?: string
  }
}
