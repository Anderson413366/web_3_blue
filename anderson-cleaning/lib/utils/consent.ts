/**
 * Google Consent Mode v2 Integration
 *
 * Implements Google's Consent Mode v2 for GDPR/CCPA compliance.
 * Works with Google Analytics 4 and Google Tag Manager.
 *
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

export type ConsentStatus = 'granted' | 'denied'

export interface ConsentSettings {
  ad_storage: ConsentStatus
  ad_user_data: ConsentStatus
  ad_personalization: ConsentStatus
  analytics_storage: ConsentStatus
  functionality_storage: ConsentStatus
  personalization_storage: ConsentStatus
  security_storage: ConsentStatus
}

// Default consent state (denied for all except essential)
const DEFAULT_CONSENT: ConsentSettings = {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted', // Essential for website functionality
  personalization_storage: 'denied',
  security_storage: 'granted', // Essential for security
}

// Accepted consent state (granted for analytics, denied for ads)
const ACCEPTED_CONSENT: ConsentSettings = {
  ad_storage: 'denied', // Still denied - we don't use ads
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'granted', // Allow analytics
  functionality_storage: 'granted',
  personalization_storage: 'granted', // Allow personalization
  security_storage: 'granted',
}

/**
 * Initialize Google Consent Mode v2
 * Call this BEFORE loading gtag.js
 */
export function initializeConsentMode() {
  if (typeof window === 'undefined') return

  // Check if gtag is available
  if (!window.gtag) {
    console.warn('[Consent] gtag not available. Make sure Google Analytics is loaded.')
    return
  }

  // Set default consent state (before user interaction)
  window.gtag('consent', 'default', {
    ...DEFAULT_CONSENT,
    wait_for_update: 500, // Wait 500ms for user consent before loading tags
    region: ['US', 'EU'], // Apply to US and EU
  })

  // Check if user has previously given consent
  const savedConsent = getSavedConsent()
  if (savedConsent) {
    updateConsent(savedConsent === 'accepted')
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[Consent Mode v2] Initialized with default:', DEFAULT_CONSENT)
  }
}

/**
 * Update consent based on user choice
 * Call this when user accepts/declines cookies
 */
export function updateConsent(accepted: boolean) {
  if (typeof window === 'undefined' || !window.gtag) return

  const consentSettings = accepted ? ACCEPTED_CONSENT : DEFAULT_CONSENT

  window.gtag('consent', 'update', consentSettings)

  // Save consent choice to localStorage
  saveConsentChoice(accepted ? 'accepted' : 'declined')

  if (process.env.NODE_ENV === 'development') {
    console.log(
      `[Consent Mode v2] Updated to ${accepted ? 'ACCEPTED' : 'DECLINED'}:`,
      consentSettings
    )
  }
}

/**
 * Grant all consents (when user accepts cookies)
 */
export function grantConsent() {
  updateConsent(true)
}

/**
 * Deny all non-essential consents (when user declines cookies)
 */
export function denyConsent() {
  updateConsent(false)
}

/**
 * Get saved consent choice from localStorage
 */
export function getSavedConsent(): 'accepted' | 'declined' | null {
  if (typeof window === 'undefined') return null

  try {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted' || consent === 'declined') {
      return consent
    }
  } catch (error) {
    console.error('[Consent] Error reading consent from localStorage:', error)
  }

  return null
}

/**
 * Save consent choice to localStorage
 */
function saveConsentChoice(choice: 'accepted' | 'declined') {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem('cookie-consent', choice)
    localStorage.setItem('cookie-consent-date', new Date().toISOString())
  } catch (error) {
    console.error('[Consent] Error saving consent to localStorage:', error)
  }
}

/**
 * Check if user has made a consent choice
 */
export function hasConsentChoice(): boolean {
  return getSavedConsent() !== null
}

/**
 * Get current consent state
 */
export function getConsentState(): ConsentSettings {
  const savedConsent = getSavedConsent()
  return savedConsent === 'accepted' ? ACCEPTED_CONSENT : DEFAULT_CONSENT
}

/**
 * Reset consent (clear saved choice)
 * Useful for testing or allowing users to change their mind
 */
export function resetConsent() {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem('cookie-consent')
    localStorage.removeItem('cookie-consent-date')

    // Reset to default consent
    if (window.gtag) {
      window.gtag('consent', 'update', DEFAULT_CONSENT)
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('[Consent Mode v2] Reset to default')
    }
  } catch (error) {
    console.error('[Consent] Error resetting consent:', error)
  }
}

/**
 * Note: gtag type is declared in lib/utils/analytics.ts
 */
