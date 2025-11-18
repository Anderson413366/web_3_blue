/**
 * Consent Mode Initialization Component
 *
 * Initializes Google Consent Mode v2 on page load.
 * Must be loaded before Google Analytics scripts.
 */

'use client'

import { useEffect } from 'react'
import { initializeConsentMode } from '@/lib/utils/consent'

export default function ConsentInit() {
  useEffect(() => {
    // Initialize consent mode as soon as component mounts
    initializeConsentMode()
  }, [])

  // This component doesn't render anything
  return null
}
