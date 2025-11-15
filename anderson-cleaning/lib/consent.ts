/**
 * Google Consent Mode v2 Implementation
 *
 * Manages user consent for analytics and advertising tracking
 * in compliance with GDPR, CCPA, and other privacy regulations.
 *
 * @see https://developers.google.com/tag-platform/security/guides/consent
 */

'use client'

export type ConsentValue = 'granted' | 'denied'

export interface ConsentState {
  analytics_storage: ConsentValue
  ad_storage: ConsentValue
  ad_user_data: ConsentValue
  ad_personalization: ConsentValue
  functionality_storage?: ConsentValue
  personalization_storage?: ConsentValue
  security_storage?: ConsentValue
}

export interface ConsentPreferences {
  choice: 'accepted' | 'declined' | 'custom' | null
  timestamp: string
  state: ConsentState
}

const CONSENT_STORAGE_KEY = 'cookie-consent-v2'

/**
 * Default consent state (all denied until user chooses)
 */
export const DEFAULT_CONSENT: ConsentState = {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted', // Essential for site functionality
  personalization_storage: 'denied',
  security_storage: 'granted', // Essential for security
}

/**
 * Granted consent state (when user accepts)
 */
export const GRANTED_CONSENT: ConsentState = {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
  functionality_storage: 'granted',
  personalization_storage: 'granted',
  security_storage: 'granted',
}

/**
 * Initialize consent defaults before GTM loads
 * Must be called BEFORE GTM script loads
 */
export function initializeConsentDefaults(): void {
  if (typeof window === 'undefined') return

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || []

  // Push default consent state
  window.dataLayer.push({
    event: 'consent_default',
    ...DEFAULT_CONSENT,
  })

  // Apply stored consent if it exists
  const stored = getStoredConsent()
  if (stored) {
    updateConsent(stored.state, false) // Don't store again
  }
}

/**
 * Update consent state and push to dataLayer
 */
export function updateConsent(state: ConsentState, persist = true): void {
  if (typeof window === 'undefined') return

  // Initialize dataLayer if it doesn't exist
  window.dataLayer = window.dataLayer || []

  // Push consent update to GTM
  window.dataLayer.push({
    event: 'consent_update',
    ...state,
  })

  // Persist to localStorage if requested
  if (persist) {
    storeConsent(state)
  }

  // Trigger consent change event for listeners
  window.dispatchEvent(new CustomEvent('consentchange', { detail: state }))
}

/**
 * Accept all consent (grant all permissions)
 */
export function acceptAllConsent(): void {
  const preferences: ConsentPreferences = {
    choice: 'accepted',
    timestamp: new Date().toISOString(),
    state: GRANTED_CONSENT,
  }

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))

  // Also store old format for backwards compatibility
  localStorage.setItem('cookie-consent', 'accepted')
  localStorage.setItem('cookie-consent-date', preferences.timestamp)

  updateConsent(GRANTED_CONSENT, false)
}

/**
 * Decline all consent (deny all non-essential permissions)
 */
export function declineAllConsent(): void {
  const preferences: ConsentPreferences = {
    choice: 'declined',
    timestamp: new Date().toISOString(),
    state: DEFAULT_CONSENT,
  }

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))

  // Also store old format for backwards compatibility
  localStorage.setItem('cookie-consent', 'declined')
  localStorage.setItem('cookie-consent-date', preferences.timestamp)

  updateConsent(DEFAULT_CONSENT, false)
}

/**
 * Store consent preferences to localStorage
 */
function storeConsent(state: ConsentState): void {
  const preferences: ConsentPreferences = {
    choice: 'custom',
    timestamp: new Date().toISOString(),
    state,
  }

  localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences))
}

/**
 * Get stored consent preferences from localStorage
 */
export function getStoredConsent(): ConsentPreferences | null {
  if (typeof window === 'undefined') return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null

    return JSON.parse(stored) as ConsentPreferences
  } catch (error) {
    console.error('Error parsing stored consent:', error)
    return null
  }
}

/**
 * Check if user has granted analytics consent
 */
export function hasAnalyticsConsent(): boolean {
  const stored = getStoredConsent()
  return stored?.state.analytics_storage === 'granted'
}

/**
 * Check if user has granted ad consent
 */
export function hasAdConsent(): boolean {
  const stored = getStoredConsent()
  return stored?.state.ad_storage === 'granted'
}

/**
 * Check if user has made a consent choice
 */
export function hasConsentChoice(): boolean {
  if (typeof window === 'undefined') return false

  // Check new format
  const newFormat = localStorage.getItem(CONSENT_STORAGE_KEY)
  if (newFormat) return true

  // Check old format for backwards compatibility
  const oldFormat = localStorage.getItem('cookie-consent')
  return oldFormat !== null
}

/**
 * Clear consent preferences (for testing or reset)
 */
export function clearConsent(): void {
  if (typeof window === 'undefined') return

  localStorage.removeItem(CONSENT_STORAGE_KEY)
  localStorage.removeItem('cookie-consent')
  localStorage.removeItem('cookie-consent-date')

  // Reset to defaults
  updateConsent(DEFAULT_CONSENT, false)
}

/**
 * Get consent state for a specific storage type
 */
export function getConsentState(
  type: keyof ConsentState
): ConsentValue {
  const stored = getStoredConsent()
  return stored?.state[type] || DEFAULT_CONSENT[type] || 'denied'
}

// TypeScript declaration for dataLayer
declare global {
  interface Window {
    dataLayer?: any[]
  }

  interface WindowEventMap {
    consentchange: CustomEvent<ConsentState>
  }
}
