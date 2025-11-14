/**
 * ChatWidget Component
 *
 * Purpose: Wrapper component for third-party chat widgets
 * Features: Privacy-conscious loading, error handling, device detection
 *
 * Usage:
 * ```tsx
 * import ChatWidget from '@/components/chat/ChatWidget'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <body>
 *         {children}
 *         <ChatWidget />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 *
 * How it works:
 * 1. Checks if chat is enabled in config
 * 2. Waits for cookie consent (if required)
 * 3. Loads appropriate provider script
 * 4. Handles errors gracefully
 */

'use client'

import { useEffect, useState } from 'react'
import { loadChatWidget } from '@/lib/load-chat-widget'
import { chatConfig } from '@/lib/chat-config'

// ============================================================================
// COMPONENT
// ============================================================================

export default function ChatWidget() {
  const [loaded, setLoaded] = useState(false)
  const [hasConsent, setHasConsent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ==========================================================================
  // COOKIE CONSENT CHECK
  // ==========================================================================

  useEffect(() => {
    // Skip consent check if not required
    if (!chatConfig.loadOnConsent) {
      setHasConsent(true)
      return
    }

    // Check for cookie consent in localStorage
    try {
      const consent = localStorage.getItem('cookie-consent')

      if (consent === 'true' || consent === 'accepted') {
        setHasConsent(true)
      } else {
        console.log('[Chat Widget] Waiting for cookie consent')

        // Listen for consent events
        const handleConsent = (event: CustomEvent) => {
          if (event.detail?.accepted) {
            setHasConsent(true)
          }
        }

        window.addEventListener('cookie-consent-accepted', handleConsent as EventListener)

        return () => {
          window.removeEventListener('cookie-consent-accepted', handleConsent as EventListener)
        }
      }
    } catch (err) {
      console.error('[Chat Widget] Error checking cookie consent:', err)
      // If localStorage fails, load anyway (degraded experience)
      setHasConsent(true)
    }
  }, [])

  // ==========================================================================
  // WIDGET LOADING
  // ==========================================================================

  useEffect(() => {
    // Don't load if chat is disabled
    if (!chatConfig.enabled) {
      return
    }

    // Don't load if no consent yet
    if (!hasConsent) {
      return
    }

    // Don't load if already loaded
    if (loaded) {
      return
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      try {
        const success = loadChatWidget()

        if (success) {
          setLoaded(true)
        } else {
          setError('Failed to load chat widget. Check configuration.')
        }
      } catch (err) {
        console.error('[Chat Widget] Load error:', err)
        setError('An error occurred while loading the chat widget.')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [hasConsent, loaded])

  // ==========================================================================
  // RENDER
  // ==========================================================================

  // If chat is disabled, render nothing
  if (!chatConfig.enabled) {
    return null
  }

  // Show error in development mode only
  if (error && process.env.NODE_ENV === 'development') {
    return (
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '12px 16px',
          background: '#fee',
          border: '1px solid #fcc',
          borderRadius: '8px',
          fontSize: '12px',
          color: '#c00',
          maxWidth: '300px',
          zIndex: 9999,
        }}
      >
        <strong>Chat Widget Error:</strong>
        <br />
        {error}
      </div>
    )
  }

  // Main render (chat widget injected by provider script)
  return (
    <div
      id="chat-widget-container"
      className="chat-widget"
      aria-label="Live chat widget"
      role="complementary"
    >
      {/* Chat widget will be injected here by provider script */}
      {/* No visual elements needed - provider handles all UI */}
    </div>
  )
}

// ============================================================================
// MANUAL TRIGGER COMPONENT (OPTIONAL)
// ============================================================================

/**
 * ChatLauncher - Optional manual trigger button
 *
 * Use this if you want a custom chat button in your UI
 * instead of the provider's default floating button
 *
 * Example:
 * ```tsx
 * import { ChatLauncher } from '@/components/chat/ChatWidget'
 *
 * <ChatLauncher>
 *   <button>Chat with us</button>
 * </ChatLauncher>
 * ```
 */
export function ChatLauncher({ children }: { children: React.ReactNode }) {
  const handleClick = () => {
    // Try to open chat using provider APIs
    if (typeof window !== 'undefined') {
      // Intercom
      if (window.Intercom) {
        window.Intercom('show')
        return
      }

      // Drift
      if (window.drift && window.drift.api) {
        window.drift.api.openChat()
        return
      }

      // Tidio
      if (window.tidioChatApi) {
        window.tidioChatApi.show()
        window.tidioChatApi.open()
        return
      }

      // Tawk
      if (window.Tawk_API) {
        window.Tawk_API.maximize()
        return
      }

      console.warn('[Chat Widget] Chat launcher clicked but no chat provider loaded')
    }
  }

  return (
    <div id="chat-launcher" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  )
}

// Type declarations for window extensions
declare global {
  interface Window {
    Intercom?: any
    drift?: any
    tidioChatApi?: any
    Tawk_API?: any
  }

  interface WindowEventMap {
    'cookie-consent-accepted': CustomEvent
  }
}
