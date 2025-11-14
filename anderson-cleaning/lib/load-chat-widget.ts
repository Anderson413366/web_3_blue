/**
 * Chat Widget Loader Utility
 *
 * Dynamically loads chat widget scripts based on configured provider
 * Supports: Intercom, Drift, Tidio, Tawk.to
 *
 * Usage:
 * import { loadChatWidget } from '@/lib/load-chat-widget'
 * loadChatWidget() // Loads configured provider
 */

import {
  chatConfig,
  getCurrentProviderConfig,
  shouldLoadOnDevice,
  hasValidCredentials,
  IntercomConfig,
  DriftConfig,
  TidioConfig,
  TawkConfig,
} from './chat-config'

// ============================================================================
// TYPE DECLARATIONS FOR THIRD-PARTY WIDGETS
// ============================================================================

declare global {
  interface Window {
    // Intercom
    Intercom?: any
    intercomSettings?: {
      app_id: string
      custom_launcher_selector?: string
      [key: string]: any
    }

    // Drift
    drift?: any
    driftt?: any

    // Tidio
    tidioChatApi?: any

    // Tawk.to
    Tawk_API?: any
    Tawk_LoadStart?: Date
  }
}

// ============================================================================
// PROVIDER LOADERS
// ============================================================================

/**
 * Load Intercom chat widget
 * Docs: https://developers.intercom.com/installing-intercom/docs/intercom-javascript
 */
function loadIntercom(config: IntercomConfig): void {
  // Set Intercom settings
  window.intercomSettings = {
    app_id: config.appId,
    custom_launcher_selector: '#chat-launcher',
  }

  // Create and append script
  const script = document.createElement('script')
  script.src = `https://widget.intercom.io/widget/${config.appId}`
  script.async = true
  script.onload = () => {
    console.log('[Chat Widget] Intercom loaded successfully')
  }
  script.onerror = () => {
    console.error('[Chat Widget] Failed to load Intercom')
  }

  document.body.appendChild(script)
}

/**
 * Load Drift chat widget
 * Docs: https://devdocs.drift.com/docs/quick-start
 */
function loadDrift(config: DriftConfig): void {
  // Drift initialization code (from their docs)
  // eslint-disable-next-line @typescript-eslint/no-extra-semi
  ;(function () {
    const t = (window.driftt = window.drift = window.driftt || [])

    if (!t.init) {
      if (t.invoked) return void (window.console && console.error && console.error('Drift snippet included twice.'))

      t.invoked = true
      t.methods = [
        'identify',
        'config',
        'track',
        'reset',
        'debug',
        'show',
        'ping',
        'page',
        'hide',
        'off',
        'on',
      ]

      t.factory = function (e: string) {
        return function () {
          const n = Array.prototype.slice.call(arguments)
          n.unshift(e)
          t.push(n)
          return t
        }
      }

      t.methods.forEach(function (e: string) {
        t[e] = t.factory(e)
      })

      t.load = function (t: string) {
        const e = 3e5
        const n = Math.ceil(new Date().getTime() / e) * e
        const o = document.createElement('script')
        o.type = 'text/javascript'
        o.async = true
        o.crossOrigin = 'anonymous'
        o.src = 'https://js.driftt.com/include/' + n + '/' + t + '.js'
        o.onload = () => {
          console.log('[Chat Widget] Drift loaded successfully')
        }
        o.onerror = () => {
          console.error('[Chat Widget] Failed to load Drift')
        }
        const i = document.getElementsByTagName('script')[0]
        if (i && i.parentNode) {
          i.parentNode.insertBefore(o, i)
        }
      }
    }

    t.load(config.appId)
  })()
}

/**
 * Load Tidio chat widget
 * Docs: https://www.tidio.com/docs/
 */
function loadTidio(config: TidioConfig): void {
  const script = document.createElement('script')
  script.src = `https://code.tidio.co/${config.publicKey}.js`
  script.async = true
  script.onload = () => {
    console.log('[Chat Widget] Tidio loaded successfully')
  }
  script.onerror = () => {
    console.error('[Chat Widget] Failed to load Tidio')
  }

  document.body.appendChild(script)
}

/**
 * Load Tawk.to chat widget
 * Docs: https://help.tawk.to/article/adding-a-widget-to-your-website
 */
function loadTawk(config: TawkConfig): void {
  // Set Tawk globals
  window.Tawk_API = window.Tawk_API || {}
  window.Tawk_LoadStart = new Date()

  const script = document.createElement('script')
  script.src = `https://embed.tawk.to/${config.propertyId}/${config.widgetId}`
  script.async = true
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')
  script.onload = () => {
    console.log('[Chat Widget] Tawk.to loaded successfully')
  }
  script.onerror = () => {
    console.error('[Chat Widget] Failed to load Tawk.to')
  }

  document.body.appendChild(script)
}

// ============================================================================
// PROVIDER LOADER MAP
// ============================================================================

const loaders = {
  intercom: loadIntercom,
  drift: loadDrift,
  tidio: loadTidio,
  tawk: loadTawk,
}

// ============================================================================
// MAIN LOADER FUNCTION
// ============================================================================

let isLoaded = false

/**
 * Load the configured chat widget
 * Performs validation and device checks before loading
 *
 * @returns True if widget was loaded, false otherwise
 */
export function loadChatWidget(): boolean {
  // Prevent multiple loads
  if (isLoaded) {
    console.log('[Chat Widget] Already loaded')
    return false
  }

  // Check if enabled
  if (!chatConfig.enabled) {
    console.log('[Chat Widget] Disabled in configuration')
    return false
  }

  // Check if valid credentials configured
  if (!hasValidCredentials()) {
    console.error(
      `[Chat Widget] Invalid credentials for ${chatConfig.provider}. Please update lib/chat-config.ts`
    )
    return false
  }

  // Check device type
  if (!shouldLoadOnDevice()) {
    const deviceType = window.innerWidth < 768 ? 'mobile' : 'desktop'
    console.log(`[Chat Widget] Disabled for ${deviceType} devices`)
    return false
  }

  // Get provider and config
  const provider = chatConfig.provider
  const config = getCurrentProviderConfig()
  const loader = loaders[provider]

  if (!loader) {
    console.error(`[Chat Widget] Unknown provider: ${provider}`)
    return false
  }

  try {
    // Load the widget
    loader(config as any)
    isLoaded = true
    console.log(`[Chat Widget] ${provider} loading...`)
    return true
  } catch (error) {
    console.error(`[Chat Widget] Error loading ${provider}:`, error)
    return false
  }
}

/**
 * Check if chat widget is currently loaded
 * @returns True if widget has been loaded
 */
export function isChatLoaded(): boolean {
  return isLoaded
}

/**
 * Reset loaded state (useful for testing)
 * WARNING: This doesn't unload the actual widget scripts
 */
export function resetChatLoader(): void {
  isLoaded = false
}

// ============================================================================
// PROVIDER-SPECIFIC API HELPERS
// ============================================================================

/**
 * Show the chat widget (if supported by provider)
 */
export function showChat(): void {
  switch (chatConfig.provider) {
    case 'intercom':
      if (window.Intercom) {
        window.Intercom('show')
      }
      break

    case 'drift':
      if (window.drift) {
        window.drift.api.openChat()
      }
      break

    case 'tidio':
      if (window.tidioChatApi) {
        window.tidioChatApi.show()
      }
      break

    case 'tawk':
      if (window.Tawk_API) {
        window.Tawk_API.maximize()
      }
      break
  }
}

/**
 * Hide the chat widget (if supported by provider)
 */
export function hideChat(): void {
  switch (chatConfig.provider) {
    case 'intercom':
      if (window.Intercom) {
        window.Intercom('hide')
      }
      break

    case 'drift':
      if (window.drift) {
        window.drift.api.hideChat()
      }
      break

    case 'tidio':
      if (window.tidioChatApi) {
        window.tidioChatApi.hide()
      }
      break

    case 'tawk':
      if (window.Tawk_API) {
        window.Tawk_API.minimize()
      }
      break
  }
}

/**
 * Update chat widget with user information
 * Useful for B2B tracking and personalization
 */
export function identifyUser(userData: {
  email?: string
  name?: string
  company?: string
  [key: string]: any
}): void {
  switch (chatConfig.provider) {
    case 'intercom':
      if (window.Intercom) {
        window.Intercom('update', userData)
      }
      break

    case 'drift':
      if (window.drift) {
        window.drift.identify(userData.email, {
          name: userData.name,
          company: userData.company,
          ...userData,
        })
      }
      break

    case 'tidio':
      if (window.tidioChatApi) {
        window.tidioChatApi.setVisitorData(userData)
      }
      break

    case 'tawk':
      if (window.Tawk_API) {
        window.Tawk_API.setAttributes(userData, (error: any) => {
          if (error) console.error('[Chat Widget] Error setting Tawk attributes:', error)
        })
      }
      break
  }
}
