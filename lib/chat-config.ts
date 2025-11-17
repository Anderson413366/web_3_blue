/**
 * Chat Widget Configuration
 *
 * Provider-agnostic configuration for live chat widgets
 * Supports: Intercom, Drift, Tidio, Tawk.to
 *
 * To enable chat:
 * 1. Set enabled: true
 * 2. Choose provider ('intercom' | 'drift' | 'tidio' | 'tawk')
 * 3. Add your provider credentials below
 * 4. Deploy and test
 *
 * To switch providers:
 * 1. Change the 'provider' field
 * 2. Ensure credentials are filled in for new provider
 * 3. Test thoroughly before deploying
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export type ChatProvider = 'intercom' | 'drift' | 'tidio' | 'tawk'

export interface IntercomConfig {
  appId: string
}

export interface DriftConfig {
  appId: string
}

export interface TidioConfig {
  publicKey: string
}

export interface TawkConfig {
  propertyId: string
  widgetId: string
}

export interface DisplaySettings {
  mobile: boolean
  desktop: boolean
}

export interface ThemeSettings {
  primaryColor: string
  position: 'right' | 'left'
}

export interface ChatConfiguration {
  enabled: boolean
  provider: ChatProvider
  intercom: IntercomConfig
  drift: DriftConfig
  tidio: TidioConfig
  tawk: TawkConfig
  displayOn: DisplaySettings
  loadOnConsent: boolean
  theme: ThemeSettings
}

// ============================================================================
// CHAT CONFIGURATION
// ============================================================================

export const chatConfig: ChatConfiguration = {
  /**
   * Enable or disable chat widget globally
   * Set to true to activate chat on the site
   * @default false
   */
  enabled: false,

  /**
   * Chat provider to use
   * Options: 'intercom' | 'drift' | 'tidio' | 'tawk'
   * @default 'intercom'
   */
  provider: 'intercom',

  // ==========================================================================
  // PROVIDER CREDENTIALS
  // Add your provider-specific credentials below
  // ==========================================================================

  /**
   * Intercom Configuration
   * Get your App ID from: https://app.intercom.com/a/apps/_/settings/web
   */
  intercom: {
    appId: 'YOUR_INTERCOM_APP_ID', // e.g., 'abc12345'
  },

  /**
   * Drift Configuration
   * Get your App ID from: https://app.drift.com/settings/livechat
   */
  drift: {
    appId: 'YOUR_DRIFT_APP_ID', // e.g., 'abc123def456'
  },

  /**
   * Tidio Configuration
   * Get your Public Key from: https://www.tidio.com/panel/settings/developer
   */
  tidio: {
    publicKey: 'YOUR_TIDIO_PUBLIC_KEY', // e.g., 'abc123def456ghi789'
  },

  /**
   * Tawk.to Configuration
   * Get your IDs from: https://dashboard.tawk.to/#/administration/property
   */
  tawk: {
    propertyId: 'YOUR_TAWK_PROPERTY_ID', // e.g., '5f1234567890abcdef123456'
    widgetId: 'YOUR_TAWK_WIDGET_ID', // e.g., 'default'
  },

  // ==========================================================================
  // DISPLAY SETTINGS
  // ==========================================================================

  /**
   * Control where chat widget appears
   */
  displayOn: {
    /**
     * Show chat on mobile devices (< 768px)
     * @default true
     */
    mobile: true,

    /**
     * Show chat on desktop devices (≥ 768px)
     * @default true
     */
    desktop: true,
  },

  // ==========================================================================
  // PRIVACY SETTINGS
  // ==========================================================================

  /**
   * Wait for cookie consent before loading chat widget
   * Helps comply with GDPR/CCPA regulations
   *
   * If true, checks localStorage for 'cookie-consent' = 'true'
   * If false, loads immediately
   *
   * @default true
   */
  loadOnConsent: true,

  // ==========================================================================
  // THEME & STYLING
  // ==========================================================================

  /**
   * Visual customization (if supported by provider)
   */
  theme: {
    /**
     * Primary color for chat bubble and elements
     * Should match your brand color
     * @default '#2563eb' (Anderson Cleaning blue)
     */
    primaryColor: '#2563eb',

    /**
     * Position of chat widget on screen
     * @default 'right'
     */
    position: 'right',
  },
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get the configuration for the current provider
 * @returns Provider-specific configuration object
 */
export function getCurrentProviderConfig():
  | IntercomConfig
  | DriftConfig
  | TidioConfig
  | TawkConfig {
  return chatConfig[chatConfig.provider]
}

/**
 * Check if chat widget should load on current device
 * @returns True if chat should load on this device type
 */
export function shouldLoadOnDevice(): boolean {
  if (typeof window === 'undefined') return false

  const isMobile = window.innerWidth < 768
  return isMobile ? chatConfig.displayOn.mobile : chatConfig.displayOn.desktop
}

/**
 * Validate that provider credentials are configured
 * @returns True if credentials are not default placeholders
 */
export function hasValidCredentials(): boolean {
  const config = getCurrentProviderConfig()

  switch (chatConfig.provider) {
    case 'intercom':
      return (config as IntercomConfig).appId !== 'YOUR_INTERCOM_APP_ID'

    case 'drift':
      return (config as DriftConfig).appId !== 'YOUR_DRIFT_APP_ID'

    case 'tidio':
      return (config as TidioConfig).publicKey !== 'YOUR_TIDIO_PUBLIC_KEY'

    case 'tawk':
      return (
        (config as TawkConfig).propertyId !== 'YOUR_TAWK_PROPERTY_ID' &&
        (config as TawkConfig).widgetId !== 'YOUR_TAWK_WIDGET_ID'
      )

    default:
      return false
  }
}

// ============================================================================
// DEVELOPMENT WARNINGS
// ============================================================================

if (typeof window !== 'undefined' && chatConfig.enabled) {
  // Warn if credentials are still default values
  if (!hasValidCredentials()) {
    console.warn(
      `[Chat Widget] Chat is enabled but ${chatConfig.provider} credentials are not configured. Please update lib/chat-config.ts with your ${chatConfig.provider} credentials.`
    )
  }

  // Log chat status in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Chat Widget] Configuration:', {
      enabled: chatConfig.enabled,
      provider: chatConfig.provider,
      loadOnConsent: chatConfig.loadOnConsent,
      displayOn: chatConfig.displayOn,
    })
  }
}
