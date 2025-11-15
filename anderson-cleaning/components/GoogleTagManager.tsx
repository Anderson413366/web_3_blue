/**
 * Google Tag Manager Component
 *
 * Loads Google Tag Manager with proper Consent Mode v2 integration.
 * Must be rendered AFTER ConsentInit to ensure consent defaults are set first.
 *
 * @see https://developers.google.com/tag-platform/tag-manager/web
 */

'use client'

import Script from 'next/script'
import { useEffect } from 'react'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

export default function GoogleTagManager() {
  // Only load in production or if GTM_ID is explicitly set
  if (!GTM_ID) {
    return null
  }

  useEffect(() => {
    // Initialize dataLayer if not already done by ConsentInit
    window.dataLayer = window.dataLayer || []

    // Push GTM initialization event
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    })

    if (process.env.NODE_ENV === 'development') {
      console.log('[GTM] Google Tag Manager initialized:', GTM_ID)
    }
  }, [])

  return (
    <>
      {/* Google Tag Manager Script */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        src={\`https://www.googletagmanager.com/gtm.js?id=\${GTM_ID}\`}
      />

      {/* Google Tag Manager NoScript Fallback */}
      <noscript>
        <iframe
          src={\`https://www.googletagmanager.com/ns.html?id=\${GTM_ID}\`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}
