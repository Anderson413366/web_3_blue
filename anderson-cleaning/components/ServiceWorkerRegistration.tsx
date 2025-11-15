/**
 * Service Worker Registration
 *
 * Registers the service worker for offline support and PWA capabilities.
 * Only runs in production to avoid conflicts with Next.js dev mode HMR.
 */

'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    // Only register in production and if service workers are supported
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      registerServiceWorker()
    }
  }, [])

  return null // This component doesn't render anything
}

async function registerServiceWorker() {
  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    })

    console.log('[PWA] Service Worker registered:', registration.scope)

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing

      if (newWorker) {
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New service worker available, prompt user to reload
            console.log('[PWA] New service worker available')

            // Optional: Show update notification to user
            if (window.confirm('A new version is available. Reload to update?')) {
              window.location.reload()
            }
          }
        })
      }
    })

    // Check for updates periodically
    setInterval(() => {
      registration.update()
    }, 60 * 60 * 1000) // Check every hour
  } catch (error) {
    console.error('[PWA] Service Worker registration failed:', error)
  }
}
