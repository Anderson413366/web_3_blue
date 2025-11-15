'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { X, Cookie } from 'lucide-react'
import { grantConsent, denyConsent, hasConsentChoice } from '@/lib/utils/consent'

/**
 * Cookie consent banner component
 *
 * Features:
 * - GDPR/CCPA compliant consent banner
 * - Google Consent Mode v2 integration
 * - LocalStorage persistence
 * - Accessible keyboard navigation
 * - Smooth animations
 * - Link to privacy policy
 *
 * @example
 * <CookieBanner />
 */
export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has already made a consent choice
    if (!hasConsentChoice()) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => {
        setShowBanner(true)
        setIsVisible(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    // Grant consent via Consent Mode v2
    grantConsent()

    // Hide banner
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleDecline = () => {
    // Deny consent via Consent Mode v2
    denyConsent()

    // Hide banner
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => setShowBanner(false), 300)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-gray-200 dark:border-slate-700 p-6 md:p-8">
              <div className="flex items-start gap-4">
                {/* Cookie Icon */}
                <div className="hidden sm:block flex-shrink-0">
                  <div className="w-12 h-12 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center">
                    <Cookie className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    We use cookies to enhance your browsing experience, serve personalized content,
                    and analyze our traffic. By clicking "Accept All," you consent to our use of
                    cookies.{' '}
                    <a
                      href="/legal/privacy-policy"
                      className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >
                      Read our Privacy Policy
                    </a>
                  </p>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleAccept}
                      className="sm:w-auto"
                    >
                      Accept All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDecline}
                      className="sm:w-auto"
                    >
                      Decline
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDismiss}
                      className="sm:w-auto text-gray-600 dark:text-gray-400"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={handleDismiss}
                  className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700"
                  aria-label="Dismiss cookie banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Cookie Details (Optional Expansion) */}
              <details className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                <summary className="text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:text-primary-600 dark:hover:text-primary-400">
                  Cookie Details
                </summary>
                <div className="mt-3 space-y-3 text-sm text-gray-600 dark:text-gray-400">
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Essential Cookies:</strong>
                    <p className="mt-1">
                      Required for the website to function properly. These cannot be disabled.
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Analytics Cookies:</strong>
                    <p className="mt-1">
                      Help us understand how visitors interact with our website by collecting and
                      reporting information anonymously.
                    </p>
                  </div>
                  <div>
                    <strong className="text-gray-900 dark:text-gray-100">Marketing Cookies:</strong>
                    <p className="mt-1">
                      Used to track visitors across websites to display relevant ads.
                    </p>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
