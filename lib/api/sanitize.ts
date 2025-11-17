/**
 * Input Sanitization Utilities
 *
 * Sanitizes user input to prevent XSS and injection attacks
 */

/**
 * Sanitize a string by removing potentially dangerous characters
 * while preserving legitimate content
 */
export function sanitizeString(input: string): string {
  if (!input || typeof input !== 'string') return ''

  return (
    input
      // Remove null bytes
      .replace(/\0/g, '')
      // Remove control characters except newlines and tabs
      .replace(/[\x01-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '')
      // Trim whitespace
      .trim()
      // Limit consecutive spaces
      .replace(/\s+/g, ' ')
  )
}

/**
 * Sanitize HTML content by escaping dangerous characters
 * Use this for content that will be displayed in HTML
 */
export function escapeHtml(input: string): string {
  if (!input || typeof input !== 'string') return ''

  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  }

  return input.replace(/[&<>"'/]/g, (char) => htmlEscapeMap[char] || char)
}

/**
 * Sanitize email address
 */
export function sanitizeEmail(email: string): string {
  if (!email || typeof email !== 'string') return ''

  return email
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9@._+-]/gi, '')
}

/**
 * Sanitize phone number - remove all non-digit characters except + at start
 */
export function sanitizePhone(phone: string): string {
  if (!phone || typeof phone !== 'string') return ''

  // Allow + at start, then only digits, spaces, hyphens, parentheses
  return phone.trim().replace(/[^\d+\s()-]/g, '')
}

/**
 * Sanitize URL - ensure it's a valid HTTP/HTTPS URL
 */
export function sanitizeUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null
    }
    return parsed.toString()
  } catch {
    return null
  }
}

/**
 * Sanitize filename - remove dangerous characters
 */
export function sanitizeFilename(filename: string): string {
  if (!filename || typeof filename !== 'string') return ''

  return filename
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_{2,}/g, '_')
    .substring(0, 255)
}

/**
 * Sanitize an entire object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized: any = {}

  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      sanitized[key] = value
    } else if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value)
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string'
          ? sanitizeString(item)
          : typeof item === 'object'
            ? sanitizeObject(item)
            : item
      )
    } else {
      sanitized[key] = value
    }
  }

  return sanitized as T
}

/**
 * Check for honeypot field (should be empty)
 */
export function validateHoneypot(value: string | undefined): boolean {
  return !value || value.trim() === ''
}
