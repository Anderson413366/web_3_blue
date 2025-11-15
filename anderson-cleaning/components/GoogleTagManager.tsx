/**
 * Google Tag Manager Script Component with Consent Mode v2
 *
 * Implements Google Consent Mode v2 for GDPR/CCPA compliance
 * Sets consent defaults BEFORE GTM loads, then loads GTM
 *
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { initializeConsentDefaults } from '@/lib/consent'

interface GTMProps {
  gtmId: string
}

export default function GoogleTagManager({ gtmId }: GTMProps) {
  useEffect(() => {
    // CRITICAL: Initialize consent defaults BEFORE GTM loads
    // This ensures no tracking happens until user grants consent
    initializeConsentDefaults()

    // Initialize dataLayer and GTM start event
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      })
    }
  }, [])

  if (!gtmId || gtmId.startsWith('GTM-X')) {
    // Don't load GTM in development or if ID not configured
    return null
  }

  return (
    <>
      {/* Google Tag Manager with Consent Mode */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />

      {/* GTM Noscript iframe */}
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  )
}

// TypeScript declaration for dataLayer
declare global {
  interface Window {
    dataLayer?: any[]
  }
}
