/**
 * Input Sanitization Functions
 *
 * Provides utilities to clean and validate user inputs to prevent XSS,
 * SQL injection, and other security vulnerabilities.
 */

/**
 * Strip all HTML tags from a string
 * Use this for plain text fields where HTML should never be allowed
 */
export function stripHtml(text: string): string {
  if (!text || typeof text !== 'string') return ''

  // Remove all HTML tags
  return text.replace(/<[^>]*>/g, '')
}

/**
 * Escape HTML special characters
 * Converts < > & " ' to their HTML entity equivalents
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') return ''

  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return text.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Sanitize filename to prevent path traversal attacks
 * Removes directory separators, special characters, and control characters
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') return 'file'

  // Remove path components
  filename = filename.replace(/^.*[/\\]/, '')

  // Remove any characters that aren't alphanumeric, dash, underscore, or dot
  filename = filename.replace(/[^a-zA-Z0-9._-]/g, '_')

  // Remove leading dots (hidden files)
  filename = filename.replace(/^\.+/, '')

  // Limit length
  if (filename.length > 255) {
    const ext = filename.split('.').pop() || ''
    const name = filename.substring(0, 255 - ext.length - 1)
    filename = `${name}.${ext}`
  }

  // If nothing is left, return a default
  return filename || 'file'
}

/**
 * Normalize email address
 * Converts to lowercase and trims whitespace
 */
export function normalizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return ''

  return email.toLowerCase().trim()
}

/**
 * Normalize phone number
 * Removes all non-digit characters
 */
export function normalizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return ''

  // Remove all non-digit characters
  return phone.replace(/\D/g, '')
}

/**
 * Truncate text to maximum length
 * Adds ellipsis if truncated
 */
export function truncate(text: string, maxLength: number, ellipsis = '...'): string {
  if (!text || typeof text !== 'string') return ''
  if (text.length <= maxLength) return text

  return text.substring(0, maxLength - ellipsis.length) + ellipsis
}

/**
 * Sanitize URL to prevent javascript: and data: schemes
 * Only allows http:, https:, and relative URLs
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') return ''

  url = url.trim()

  // Allow relative URLs
  if (url.startsWith('/')) return url

  // Check for allowed protocols
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:']
  try {
    const urlObj = new URL(url)
    if (!allowedProtocols.includes(urlObj.protocol)) {
      return ''
    }
    return url
  } catch {
    // Invalid URL, return empty
    return ''
  }
}

/**
 * Remove SQL injection patterns
 * Basic protection - should still use parameterized queries
 */
export function sanitizeSqlInput(input: string): string {
  if (!input || typeof input !== 'string') return ''

  // Remove common SQL injection patterns
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|DECLARE)\b)/gi,
    /--/g, // SQL comments
    /;/g, // Statement terminators
    /\/\*/g, // Block comment start
    /\*\//g, // Block comment end
    /xp_/gi, // Extended stored procedures
    /sp_/gi, // Stored procedures
  ]

  let sanitized = input
  sqlPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, '')
  })

  return sanitized.trim()
}

/**
 * Sanitize input for use in regex
 * Escapes special regex characters
 */
export function escapeRegex(text: string): string {
  if (!text || typeof text !== 'string') return ''

  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

/**
 * Clean whitespace from input
 * Removes leading/trailing whitespace and collapses multiple spaces
 */
export function cleanWhitespace(text: string): string {
  if (!text || typeof text !== 'string') return ''

  return text.trim().replace(/\s+/g, ' ')
}

/**
 * Sanitize user input for general text fields
 * Combines multiple sanitization steps
 */
export function sanitizeTextInput(
  input: string,
  options?: {
    stripHtml?: boolean
    maxLength?: number
    allowNewlines?: boolean
  }
): string {
  if (!input || typeof input !== 'string') return ''

  let sanitized = input

  // Strip HTML if requested
  if (options?.stripHtml) {
    sanitized = stripHtml(sanitized)
  }

  // Remove or preserve newlines
  if (!options?.allowNewlines) {
    sanitized = sanitized.replace(/[\r\n]+/g, ' ')
  }

  // Clean whitespace
  sanitized = cleanWhitespace(sanitized)

  // Truncate if needed
  if (options?.maxLength) {
    sanitized = truncate(sanitized, options.maxLength)
  }

  return sanitized
}

/**
 * Validate and sanitize integer input
 */
export function sanitizeInteger(
  input: string | number,
  options?: {
    min?: number
    max?: number
    default?: number
  }
): number {
  const parsed = typeof input === 'number' ? input : parseInt(input, 10)

  if (isNaN(parsed)) {
    return options?.default ?? 0
  }

  let result = parsed

  if (options?.min !== undefined && result < options.min) {
    result = options.min
  }

  if (options?.max !== undefined && result > options.max) {
    result = options.max
  }

  return result
}

/**
 * Validate and sanitize float input
 */
export function sanitizeFloat(
  input: string | number,
  options?: {
    min?: number
    max?: number
    decimals?: number
    default?: number
  }
): number {
  const parsed = typeof input === 'number' ? input : parseFloat(input)

  if (isNaN(parsed)) {
    return options?.default ?? 0
  }

  let result = parsed

  if (options?.min !== undefined && result < options.min) {
    result = options.min
  }

  if (options?.max !== undefined && result > options.max) {
    result = options.max
  }

  if (options?.decimals !== undefined) {
    result = parseFloat(result.toFixed(options.decimals))
  }

  return result
}

/**
 * Sanitize JSON input
 * Safely parses JSON and returns object or default value
 */
export function sanitizeJson<T = any>(input: string, defaultValue: T): T {
  if (!input || typeof input !== 'string') return defaultValue

  try {
    return JSON.parse(input) as T
  } catch {
    return defaultValue
  }
}

/**
 * Sanitize boolean input
 */
export function sanitizeBoolean(input: string | boolean | number): boolean {
  if (typeof input === 'boolean') return input

  if (typeof input === 'number') return input !== 0

  if (typeof input === 'string') {
    const normalized = input.toLowerCase().trim()
    return ['true', '1', 'yes', 'on'].includes(normalized)
  }

  return false
}

/**
 * Remove null bytes from string
 * Prevents null byte injection attacks
 */
export function removeNullBytes(text: string): string {
  if (!text || typeof text !== 'string') return ''

  return text.replace(/\0/g, '')
}

/**
 * Comprehensive sanitization for form inputs
 * Use this as a general-purpose sanitizer for user-submitted data
 */
export function sanitizeFormInput(
  input: any,
  type: 'text' | 'email' | 'phone' | 'url' | 'number' | 'integer' | 'boolean'
): any {
  if (input === null || input === undefined) return ''

  switch (type) {
    case 'email':
      return normalizeEmail(String(input))

    case 'phone':
      return normalizePhone(String(input))

    case 'url':
      return sanitizeUrl(String(input))

    case 'number':
      return sanitizeFloat(input)

    case 'integer':
      return sanitizeInteger(input)

    case 'boolean':
      return sanitizeBoolean(input)

    case 'text':
    default:
      return sanitizeTextInput(String(input), {
        stripHtml: true,
        maxLength: 10000,
        allowNewlines: true,
      })
  }
}
