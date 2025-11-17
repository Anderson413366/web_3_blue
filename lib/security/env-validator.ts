/**
 * Environment Variable Validator
 *
 * Validates that all required environment variables are present
 * and provides clear error messages if any are missing.
 */

export interface EnvVariable {
  name: string
  required: boolean
  description: string
  type?: 'string' | 'url' | 'email' | 'number' | 'boolean'
  pattern?: RegExp
  example?: string
}

/**
 * Define all environment variables used in the application
 */
export const ENV_VARIABLES: EnvVariable[] = [
  // Site Configuration
  {
    name: 'NEXT_PUBLIC_SITE_URL',
    required: true,
    description: 'Public URL of the website',
    type: 'url',
    example: 'https://andersoncleaning.com',
  },

  // Sanity CMS
  {
    name: 'NEXT_PUBLIC_SANITY_PROJECT_ID',
    required: true,
    description: 'Sanity project ID',
    pattern: /^[a-z0-9]+$/,
    example: 'abc123xyz',
  },
  {
    name: 'NEXT_PUBLIC_SANITY_DATASET',
    required: true,
    description: 'Sanity dataset name',
    example: 'production',
  },
  {
    name: 'NEXT_PUBLIC_SANITY_API_VERSION',
    required: true,
    description: 'Sanity API version',
    pattern: /^\d{4}-\d{2}-\d{2}$/,
    example: '2024-01-01',
  },
  {
    name: 'SANITY_API_READ_TOKEN',
    required: false,
    description: 'Sanity API read token for preview mode',
    pattern: /^sk[a-zA-Z0-9]+$/,
  },
  {
    name: 'SANITY_PREVIEW_SECRET',
    required: false,
    description: 'Secret key for Sanity preview mode',
  },

  // Email Service (Resend)
  {
    name: 'RESEND_API_KEY',
    required: false,
    description: 'Resend API key for sending emails',
    pattern: /^re_[a-zA-Z0-9_]+$/,
    example: 're_abc123xyz',
  },
  {
    name: 'RESEND_FROM_EMAIL',
    required: false,
    description: 'From email address for Resend',
    type: 'email',
    example: 'noreply@andersoncleaning.com',
  },

  // HubSpot CRM
  {
    name: 'HUBSPOT_ACCESS_TOKEN',
    required: false,
    description: 'HubSpot API access token',
  },
  {
    name: 'NEXT_PUBLIC_HUBSPOT_PORTAL_ID',
    required: false,
    description: 'HubSpot portal ID',
    type: 'number',
  },

  // Analytics & Monitoring
  {
    name: 'NEXT_PUBLIC_GA_MEASUREMENT_ID',
    required: false,
    description: 'Google Analytics measurement ID',
    pattern: /^G-[A-Z0-9]+$/,
    example: 'G-XXXXXXXXXX',
  },
  {
    name: 'NEXT_PUBLIC_CLARITY_PROJECT_ID',
    required: false,
    description: 'Microsoft Clarity project ID',
  },

  // CAPTCHA
  {
    name: 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY',
    required: false,
    description: 'Google reCAPTCHA site key',
  },
  {
    name: 'RECAPTCHA_SECRET_KEY',
    required: false,
    description: 'Google reCAPTCHA secret key',
  },
  {
    name: 'NEXT_PUBLIC_TURNSTILE_SITE_KEY',
    required: false,
    description: 'Cloudflare Turnstile site key',
  },
  {
    name: 'TURNSTILE_SECRET_KEY',
    required: false,
    description: 'Cloudflare Turnstile secret key',
  },

  // Error Tracking (Sentry)
  {
    name: 'NEXT_PUBLIC_SENTRY_DSN',
    required: false,
    description: 'Sentry DSN for error tracking',
    type: 'url',
  },
  {
    name: 'SENTRY_AUTH_TOKEN',
    required: false,
    description: 'Sentry auth token for uploading source maps',
  },

  // Security
  {
    name: 'STUDIO_BASIC_AUTH_USER',
    required: false,
    description: 'Basic auth username for /studio route',
  },
  {
    name: 'STUDIO_BASIC_AUTH_PASS',
    required: false,
    description: 'Basic auth password for /studio route',
  },

  // Google Site Verification
  {
    name: 'NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION',
    required: false,
    description: 'Google site verification code',
  },
]

/**
 * Validation result for a single environment variable
 */
export interface EnvValidationError {
  name: string
  error: string
  suggestion?: string
}

/**
 * Validate a single environment variable
 */
function validateEnvVar(envVar: EnvVariable): EnvValidationError | null {
  const value = process.env[envVar.name]

  // Check if required variable is missing
  if (envVar.required && !value) {
    return {
      name: envVar.name,
      error: 'Required environment variable is missing',
      suggestion: envVar.example ? `Example: ${envVar.example}` : envVar.description,
    }
  }

  // If not required and missing, skip validation
  if (!value) return null

  // Validate URL type
  if (envVar.type === 'url') {
    try {
      new URL(value)
    } catch {
      return {
        name: envVar.name,
        error: 'Invalid URL format',
        suggestion: envVar.example || 'Must be a valid URL',
      }
    }
  }

  // Validate email type
  if (envVar.type === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      return {
        name: envVar.name,
        error: 'Invalid email format',
        suggestion: envVar.example || 'Must be a valid email address',
      }
    }
  }

  // Validate number type
  if (envVar.type === 'number') {
    if (isNaN(Number(value))) {
      return {
        name: envVar.name,
        error: 'Must be a valid number',
      }
    }
  }

  // Validate pattern
  if (envVar.pattern && !envVar.pattern.test(value)) {
    return {
      name: envVar.name,
      error: 'Does not match required pattern',
      suggestion: envVar.example || envVar.description,
    }
  }

  return null
}

/**
 * Validate all environment variables
 */
export function validateEnvironmentVariables(): {
  valid: boolean
  errors: EnvValidationError[]
  warnings: EnvValidationError[]
} {
  const errors: EnvValidationError[] = []
  const warnings: EnvValidationError[] = []

  for (const envVar of ENV_VARIABLES) {
    const error = validateEnvVar(envVar)
    if (error) {
      if (envVar.required) {
        errors.push(error)
      } else {
        warnings.push(error)
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  }
}

/**
 * Check if server-side secrets are accidentally exposed to client
 */
export function checkForExposedSecrets(): string[] {
  const exposed: string[] = []

  const serverOnlyVars = ENV_VARIABLES.filter(
    (v) => v.required && !v.name.startsWith('NEXT_PUBLIC_')
  )

  for (const envVar of serverOnlyVars) {
    // Check if variable exists in window object (client-side)
    if (typeof window !== 'undefined' && (window as any)[envVar.name]) {
      exposed.push(envVar.name)
    }
  }

  return exposed
}

/**
 * Format validation errors for display
 */
export function formatValidationErrors(errors: EnvValidationError[]): string {
  if (errors.length === 0) return ''

  const lines = ['❌ Environment Variable Validation Failed:', '']

  for (const error of errors) {
    lines.push(`  ${error.name}:`)
    lines.push(`    Error: ${error.error}`)
    if (error.suggestion) {
      lines.push(`    Suggestion: ${error.suggestion}`)
    }
    lines.push('')
  }

  lines.push('Please check your .env.local file and ensure all required variables are set.')
  lines.push('See .env.example for reference.')

  return lines.join('\n')
}

/**
 * Format validation warnings for display
 */
export function formatValidationWarnings(warnings: EnvValidationError[]): string {
  if (warnings.length === 0) return ''

  const lines = ['⚠️  Environment Variable Warnings:', '']

  for (const warning of warnings) {
    lines.push(`  ${warning.name}:`)
    lines.push(`    ${warning.error}`)
    if (warning.suggestion) {
      lines.push(`    Suggestion: ${warning.suggestion}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

/**
 * Validate environment on startup
 * Call this in your application initialization
 */
export function validateEnvironmentOnStartup(): void {
  const result = validateEnvironmentVariables()

  // Check for exposed secrets
  const exposed = checkForExposedSecrets()
  if (exposed.length > 0) {
    console.error('🔴 SECURITY WARNING: Server-side secrets exposed to client!')
    console.error('Exposed variables:', exposed.join(', '))
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Server-side secrets must not be exposed to the client')
    }
  }

  // Log warnings
  if (result.warnings.length > 0) {
    console.warn(formatValidationWarnings(result.warnings))
  }

  // Handle errors
  if (!result.valid) {
    console.error(formatValidationErrors(result.errors))
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Environment validation failed. Check logs above.')
    }
  }

  // Success message
  if (result.valid && result.warnings.length === 0) {
    console.log('✅ Environment variables validated successfully')
  }
}

/**
 * Get environment variable with type safety
 */
export function getEnvVar(name: string, defaultValue?: string): string {
  const value = process.env[name]
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${name} is not set`)
  }
  return value || defaultValue || ''
}

/**
 * Check if running in production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}

/**
 * Check if running in development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development'
}

/**
 * Get current environment name
 */
export function getEnvironment(): string {
  return process.env.NODE_ENV || 'development'
}
