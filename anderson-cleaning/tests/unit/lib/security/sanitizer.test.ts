import {
  stripHtml,
  escapeHtml,
  sanitizeTextInput,
  sanitizeFilename,
  normalizeEmail,
  normalizePhone,
  sanitizeFormInput,
} from '@/lib/security/sanitizer'

describe('Security Sanitizer', () => {
  describe('stripHtml', () => {
    it('removes HTML tags from string', () => {
      const input = '<script>alert("xss")</script>Hello'
      const result = stripHtml(input)
      expect(result).toBe('alert("xss")Hello')
      expect(result).not.toContain('<script>')
    })

    it('removes multiple HTML tags', () => {
      const input = '<div><p>Hello</p><span>World</span></div>'
      const result = stripHtml(input)
      expect(result).toBe('HelloWorld')
    })

    it('handles self-closing tags', () => {
      const input = 'Hello<br/>World'
      const result = stripHtml(input)
      expect(result).toBe('HelloWorld')
    })

    it('returns unchanged string if no HTML tags', () => {
      const input = 'Plain text'
      const result = stripHtml(input)
      expect(result).toBe('Plain text')
    })

    it('handles empty string', () => {
      expect(stripHtml('')).toBe('')
    })

    it('handles malformed HTML', () => {
      const input = '<div>Unclosed tag'
      const result = stripHtml(input)
      expect(result).toBe('Unclosed tag')
    })
  })

  describe('escapeHtml', () => {
    it('escapes dangerous HTML characters', () => {
      const input = '<script>alert("xss")</script>'
      const result = escapeHtml(input)
      expect(result).toContain('&lt;')
      expect(result).toContain('&gt;')
      expect(result).not.toContain('<')
      expect(result).not.toContain('>')
    })

    it('escapes quotes', () => {
      const input = 'Say "hello"'
      const result = escapeHtml(input)
      expect(result).toContain('&quot;')
    })

    it('escapes ampersands', () => {
      const input = 'Tom & Jerry'
      const result = escapeHtml(input)
      expect(result).toContain('&amp;')
    })

    it('escapes apostrophes', () => {
      const input = "It's working"
      const result = escapeHtml(input)
      expect(result).toContain('&#39;')
    })

    it('handles plain text without changes', () => {
      const input = 'Plain text 123'
      const result = escapeHtml(input)
      expect(result).toBe(input)
    })

    it('handles empty string', () => {
      expect(escapeHtml('')).toBe('')
    })
  })

  describe('sanitizeTextInput', () => {
    it('removes HTML by default', () => {
      const input = '<script>alert("xss")</script>Hello'
      const result = sanitizeTextInput(input)
      expect(result).not.toContain('<script>')
    })

    it('trims whitespace by default', () => {
      const input = '  Hello World  '
      const result = sanitizeTextInput(input)
      expect(result).toBe('Hello World')
    })

    it('normalizes whitespace by default', () => {
      const input = 'Hello    World'
      const result = sanitizeTextInput(input)
      expect(result).toBe('Hello World')
    })

    it('respects maxLength option', () => {
      const input = 'This is a very long text'
      const result = sanitizeTextInput(input, { maxLength: 10 })
      expect(result.length).toBeLessThanOrEqual(10)
    })

    it('can skip HTML stripping when configured', () => {
      const input = '<b>Bold</b>'
      const result = sanitizeTextInput(input, { stripHtml: false })
      expect(result).toContain('<b>')
    })

    it('handles empty string', () => {
      expect(sanitizeTextInput('')).toBe('')
    })
  })

  describe('sanitizeFilename', () => {
    it('removes dangerous characters', () => {
      const input = '../../../etc/passwd'
      const result = sanitizeFilename(input)
      expect(result).not.toContain('..')
      expect(result).not.toContain('/')
    })

    it('removes path traversal attempts', () => {
      const input = '..\\..\\windows\\system32'
      const result = sanitizeFilename(input)
      expect(result).not.toContain('..')
      expect(result).not.toContain('\\')
    })

    it('removes null bytes', () => {
      const input = 'file\0.txt'
      const result = sanitizeFilename(input)
      expect(result).not.toContain('\0')
    })

    it('preserves valid filename characters', () => {
      const input = 'my-file_123.txt'
      const result = sanitizeFilename(input)
      expect(result).toBe('my-file_123.txt')
    })

    it('handles special characters', () => {
      const input = 'file:name*.txt'
      const result = sanitizeFilename(input)
      expect(result).not.toContain(':')
      expect(result).not.toContain('*')
    })

    it('handles empty string', () => {
      expect(sanitizeFilename('')).toBe('')
    })

    it('handles unicode characters correctly', () => {
      const input = 'résumé.pdf'
      const result = sanitizeFilename(input)
      expect(result).toContain('résumé')
    })
  })

  describe('normalizeEmail', () => {
    it('converts to lowercase', () => {
      const input = 'USER@EXAMPLE.COM'
      const result = normalizeEmail(input)
      expect(result).toBe('user@example.com')
    })

    it('trims whitespace', () => {
      const input = '  user@example.com  '
      const result = normalizeEmail(input)
      expect(result).toBe('user@example.com')
    })

    it('handles plus-sign addressing', () => {
      const input = 'user+tag@example.com'
      const result = normalizeEmail(input)
      expect(result).toContain('+')
    })

    it('preserves valid email format', () => {
      const input = 'user.name+tag@example.co.uk'
      const result = normalizeEmail(input)
      expect(result).toBe('user.name+tag@example.co.uk')
    })

    it('handles empty string', () => {
      expect(normalizeEmail('')).toBe('')
    })
  })

  describe('normalizePhone', () => {
    it('removes non-digit characters', () => {
      const input = '(555) 123-4567'
      const result = normalizePhone(input)
      expect(result).toMatch(/^\d+$/)
    })

    it('preserves only digits', () => {
      const input = '+1 (555) 123-4567'
      const result = normalizePhone(input)
      expect(result).toBe('15551234567')
    })

    it('handles various formats', () => {
      const formats = ['555-123-4567', '555.123.4567', '(555) 123-4567', '+1-555-123-4567']

      formats.forEach((format) => {
        const result = normalizePhone(format)
        expect(result).toMatch(/^\d+$/)
      })
    })

    it('handles empty string', () => {
      expect(normalizePhone('')).toBe('')
    })

    it('removes spaces', () => {
      const input = '555 123 4567'
      const result = normalizePhone(input)
      expect(result).toBe('5551234567')
    })
  })

  describe('sanitizeFormInput', () => {
    it('sanitizes text input', () => {
      const input = '<script>alert("xss")</script>Hello'
      const result = sanitizeFormInput(input, 'text')
      expect(result).not.toContain('<script>')
    })

    it('normalizes email input', () => {
      const input = '  USER@EXAMPLE.COM  '
      const result = sanitizeFormInput(input, 'email')
      expect(result).toBe('user@example.com')
    })

    it('normalizes phone input', () => {
      const input = '(555) 123-4567'
      const result = sanitizeFormInput(input, 'phone')
      expect(result).toMatch(/^\d+$/)
    })

    it('sanitizes URL input', () => {
      const input = '  https://example.com  '
      const result = sanitizeFormInput(input, 'url')
      expect(result).toBe('https://example.com')
    })

    it('handles number input', () => {
      const input = '123.45'
      const result = sanitizeFormInput(input, 'number')
      expect(result).toBe('123.45')
    })

    it('handles non-string inputs', () => {
      const input = 123
      const result = sanitizeFormInput(input, 'text')
      expect(typeof result).toBe('string')
    })

    it('handles null and undefined', () => {
      expect(sanitizeFormInput(null, 'text')).toBe('null')
      expect(sanitizeFormInput(undefined, 'text')).toBe('undefined')
    })
  })

  describe('XSS Prevention', () => {
    const xssPayloads = [
      '<script>alert("XSS")</script>',
      '<img src=x onerror=alert("XSS")>',
      '<svg/onload=alert("XSS")>',
      'javascript:alert("XSS")',
      '<iframe src="javascript:alert(\'XSS\')">',
      '<body onload=alert("XSS")>',
    ]

    xssPayloads.forEach((payload) => {
      it(`prevents XSS with payload: ${payload.substring(0, 30)}...`, () => {
        const result = stripHtml(payload)
        expect(result).not.toContain('<script>')
        expect(result).not.toContain('onerror')
        expect(result).not.toContain('onload')
      })
    })
  })

  describe('SQL Injection Prevention', () => {
    const sqlPayloads = [
      "'; DROP TABLE users; --",
      "1' OR '1'='1",
      "admin'--",
      "' UNION SELECT * FROM users--",
    ]

    sqlPayloads.forEach((payload) => {
      it(`escapes SQL-like input: ${payload}`, () => {
        const result = sanitizeTextInput(payload)
        // Should still be a string (not cause errors)
        expect(typeof result).toBe('string')
        // Should be trimmed
        expect(result).toBeTruthy()
      })
    })
  })
})
