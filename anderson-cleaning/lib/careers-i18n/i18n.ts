/**
 * i18next Configuration for Careers Application
 * Scoped to /apply route only
 *
 * Features:
 * - Supports 4 languages: en, es, pt-BR, ro
 * - Fallback language: en
 * - Detection order: querystring > localStorage
 * - Persists language choice
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources, type SupportedLanguage } from './resources'

// Language detection function
const detectLanguage = (): SupportedLanguage => {
  // Check querystring first (?lang=xx)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const langFromQuery = params.get('lang')
    if (langFromQuery && langFromQuery in resources) {
      return langFromQuery as SupportedLanguage
    }

    // Check localStorage second
    const langFromStorage = localStorage.getItem('careers-language')
    if (langFromStorage && langFromStorage in resources) {
      return langFromStorage as SupportedLanguage
    }
  }

  // Default fallback
  return 'en'
}

// Initialize i18next
i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: detectLanguage(), // Initial language
    fallbackLng: 'en', // Fallback language if translation is missing

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Optional: Add debug mode for development
    debug: process.env.NODE_ENV === 'development',

    // React options
    react: {
      useSuspense: false, // Set to false to avoid suspense issues in SSR
    },
  })

// Update querystring and localStorage when language changes
if (typeof window !== 'undefined') {
  i18n.on('languageChanged', (lng) => {
    // Update localStorage
    localStorage.setItem('careers-language', lng)

    // Update querystring
    const url = new URL(window.location.href)
    url.searchParams.set('lang', lng)
    window.history.replaceState({}, '', url.toString())
  })
}

export default i18n

// Export useTranslation hook wrapper for convenience
export { useTranslation } from 'react-i18next'
