/**
 * Accessibility Provider
 *
 * Runs axe-core accessibility testing in development mode.
 * Reports violations to console for immediate feedback during development.
 */

'use client'

import { useEffect } from 'react'

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return

    // Dynamic import to avoid including in production bundle
    import('@axe-core/react')
      .then((axe) => {
        const React = require('react')
        const ReactDOM = require('react-dom')

        axe.default(React, ReactDOM, 1000, {
          // Run on every render in development
          // Results will appear in console
        })
      })
      .catch((error) => {
        console.warn('Failed to load axe-core:', error)
      })
  }, [])

  return <>{children}</>
}
