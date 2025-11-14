# Security Implementation

Comprehensive security measures for the Anderson Cleaning website.

## 📋 Table of Contents

- [Overview](#overview)
- [Content Security Policy](#content-security-policy)
- [Security Headers](#security-headers)
- [Rate Limiting](#rate-limiting)
- [Studio Protection](#studio-protection)
- [Input Sanitization](#input-sanitization)
- [CAPTCHA Protection](#captcha-protection)
- [File Upload Security](#file-upload-security)
- [Environment Variables](#environment-variables)
- [Error Tracking](#error-tracking)
- [Honeypot Implementation](#honeypot-implementation)
- [Testing](#testing)
- [Best Practices](#best-practices)

## 🛡️ Overview

This implementation provides multiple layers of security:

1. **Content Security Policy (CSP)** - Prevents XSS attacks
2. **Security Headers** - HSTS, X-Frame-Options, etc.
3. **Rate Limiting** - Prevents abuse and DDoS
4. **Input Sanitization** - Cleans user inputs
5. **CAPTCHA** - Bot protection for forms
6. **File Upload Security** - Validates file types and scans for threats
7. **Environment Protection** - Validates and protects secrets
8. **Error Tracking** - Monitors and reports errors with Sentry

## 🔒 Content Security Policy

Located in `lib/security/csp.ts`.

### CSP Directives

```typescript
import { getCSPHeader } from '@/lib/security/csp'

// Get CSP header for production
const csp = getCSPHeader()

// Get more permissive CSP for development
const devCsp = getDevCSPHeader()
```

### Allowed Domains

- **Scripts**: Google Analytics, Clarity, Crisp, Calendly, Sanity
- **Styles**: Google Fonts, Crisp, Calendly
- **Images**: Sanity CDN, Google Maps, Crisp
- **Frames**: Calendly, Google Maps
- **Connect**: HubSpot, Resend, Analytics services

### Modifying CSP

Edit `lib/security/csp.ts` and update the `cspDirectives` object:

```typescript
export const cspDirectives: CSPDirectives = {
  'script-src': [
    "'self'",
    'https://new-service.com', // Add new domain
  ],
  // ... other directives
}
```

## 🔐 Security Headers

Implemented in `middleware.ts`.

### Headers Applied

- **Content-Security-Policy**: See CSP section
- **X-Content-Type-Options**: `nosniff` - Prevents MIME sniffing
- **X-XSS-Protection**: `1; mode=block` - Legacy XSS protection
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: Disables camera, microphone, geolocation
- **Strict-Transport-Security**: Forces HTTPS (production only)
- **X-Frame-Options**: `DENY` or `SAMEORIGIN` based on route

### Route-Specific Headers

```typescript
// Studio routes allow framing
if (pathname.startsWith('/studio')) {
  headers['X-Frame-Options'] = 'SAMEORIGIN'
}

// Most routes prevent clickjacking
else {
  headers['X-Frame-Options'] = 'DENY'
}
```

## ⏱️ Rate Limiting

Protects against abuse and DDoS attacks.

### Rate Limit Configuration

```typescript
const RATE_LIMITS = {
  '/api/contact': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5/hour
  '/api/quote': { maxRequests: 5, windowMs: 60 * 60 * 1000 }, // 5/hour
  '/api/careers': { maxRequests: 3, windowMs: 60 * 60 * 1000 }, // 3/hour
  '/api/': { maxRequests: 100, windowMs: 15 * 60 * 1000 }, // 100/15min
  default: { maxRequests: 1000, windowMs: 15 * 60 * 1000 }, // 1000/15min
}
```

### Response Headers

When rate limited, returns `429 Too Many Requests` with:

- `Retry-After`: Seconds until limit resets
- `X-RateLimit-Limit`: Maximum requests allowed
- `X-RateLimit-Remaining`: Requests remaining
- `X-RateLimit-Reset`: Timestamp when limit resets

### Production Considerations

⚠️ **Important**: In-memory rate limiting doesn't work across multiple servers.

For production, replace with Redis:

```typescript
// Example with Redis
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

async function checkRateLimit(key: string) {
  const count = await redis.incr(key)
  if (count === 1) {
    await redis.expire(key, windowSeconds)
  }
  return count <= maxRequests
}
```

## 🎨 Studio Protection

Protects `/studio` route with multiple security layers.

### Basic Authentication

Set environment variables:

```env
STUDIO_BASIC_AUTH_USER=admin
STUDIO_BASIC_AUTH_PASS=your-secure-password
```

Users will be prompted for credentials when accessing `/studio`.

### IP Allowlist (Optional)

Restrict access to specific IP addresses:

```env
STUDIO_IP_ALLOWLIST=192.168.1.100,10.0.0.1,203.0.113.42
```

Leave empty to allow all IPs (rely on Basic Auth and Sanity's auth).

### Testing Studio Access

```bash
# Without auth (should return 401)
curl https://yoursite.com/studio

# With auth
curl -u admin:password https://yoursite.com/studio
```

## 🧹 Input Sanitization

Located in `lib/security/sanitizer.ts`.

### Functions Available

```typescript
import {
  stripHtml,
  escapeHtml,
  sanitizeFilename,
  normalizeEmail,
  normalizePhone,
  sanitizeUrl,
  sanitizeTextInput,
  sanitizeFormInput,
} from '@/lib/security/sanitizer'

// Remove HTML tags
const clean = stripHtml('<script>alert("xss")</script>Hello')
// Result: "Hello"

// Escape HTML entities
const safe = escapeHtml('<script>alert("xss")</script>')
// Result: "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"

// Clean filename
const filename = sanitizeFilename('../../etc/passwd')
// Result: ".._.._etc_passwd"

// Normalize email
const email = normalizeEmail('  User@EXAMPLE.COM  ')
// Result: "user@example.com"

// Sanitize form input (all-in-one)
const sanitized = sanitizeFormInput(userInput, 'email')
```

### Using in API Routes

```typescript
// app/api/contact/route.ts
import { sanitizeFormInput } from '@/lib/security/sanitizer'

export async function POST(request: Request) {
  const data = await request.json()

  // Sanitize all inputs
  const sanitized = {
    name: sanitizeFormInput(data.name, 'text'),
    email: sanitizeFormInput(data.email, 'email'),
    phone: sanitizeFormInput(data.phone, 'phone'),
    message: sanitizeFormInput(data.message, 'text'),
  }

  // Proceed with sanitized data
  await sendEmail(sanitized)
}
```

## 🤖 CAPTCHA Protection

Located in `lib/security/captcha.ts`.

### Supported Providers

- **Google reCAPTCHA v3** - Invisible, score-based
- **Cloudflare Turnstile** - Privacy-friendly alternative

### Setup

Choose ONE provider:

#### Google reCAPTCHA v3

```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Le...
RECAPTCHA_SECRET_KEY=6Le...
```

#### Cloudflare Turnstile

```env
NEXT_PUBLIC_TURNSTILE_SITE_KEY=0x4...
TURNSTILE_SECRET_KEY=0x4...
```

### Client-Side Implementation

```tsx
// components/ContactForm.tsx
'use client'

import { useEffect, useState } from 'react'

export function ContactForm() {
  const [token, setToken] = useState('')

  useEffect(() => {
    // Load reCAPTCHA script
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    document.body.appendChild(script)
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()

    // Get reCAPTCHA token
    const token = await grecaptcha.execute(siteKey, { action: 'contact' })

    // Submit with token
    await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify({ ...formData, captchaToken: token }),
    })
  }

  return <form onSubmit={handleSubmit}>{/* form fields */}</form>
}
```

### Server-Side Verification

```typescript
// app/api/contact/route.ts
import { verifyCaptcha } from '@/lib/security/captcha'

export async function POST(request: Request) {
  const { captchaToken, ...data } = await request.json()

  // Verify CAPTCHA
  const result = await verifyCaptcha(captchaToken, {
    scoreThreshold: 0.5, // Minimum score (0.0 to 1.0)
  })

  if (!result.success) {
    return Response.json({ error: 'CAPTCHA verification failed' }, { status: 400 })
  }

  // Proceed with form submission
  // ...
}
```

### Score Thresholds (reCAPTCHA v3)

- **0.9+**: Definitely human
- **0.5-0.9**: Likely human (recommended threshold)
- **0.3-0.5**: Suspicious, may be bot
- **<0.3**: Definitely bot

## 📁 File Upload Security

Located in `lib/security/file-upload.ts`.

### Validation Steps

1. ✅ Check file size
2. ✅ Validate MIME type
3. ✅ Verify magic bytes (file signature)
4. ✅ Scan for executable content
5. ✅ Generate secure random filename

### Usage Example

```typescript
// app/api/careers/upload/route.ts
import { validateResumeFile, generateSecureFilename } from '@/lib/security/file-upload'

export async function POST(request: Request) {
  const formData = await request.formData()
  const file = formData.get('resume') as File

  // Convert to buffer
  const buffer = Buffer.from(await file.arrayBuffer())

  // Validate file
  const validation = await validateResumeFile(buffer, file.name, file.type)

  if (!validation.valid) {
    return Response.json({ error: validation.error }, { status: 400 })
  }

  // Generate secure filename
  const secureFilename = generateSecureFilename(file.name)

  // Save to storage (S3, Supabase, etc.)
  await saveFile(secureFilename, buffer)

  return Response.json({ filename: secureFilename })
}
```

### Allowed File Types

**Resumes**:

- PDF
- DOC, DOCX
- TXT
- RTF
- Max size: 5MB

**Images**:

- JPEG, JPG
- PNG
- WebP
- GIF
- Max size: 10MB

### Magic Bytes Validation

The library checks file signatures (magic bytes) to ensure files are what they claim to be:

```typescript
// PDF must start with %PDF
// DOCX must start with PK (ZIP signature)
// JPEG must start with FF D8 FF
```

This prevents attackers from renaming malicious files (e.g., `virus.exe` → `resume.pdf`).

## 🌍 Environment Variables

Located in `lib/security/env-validator.ts`.

### Validation on Startup

Add to your root layout or server entry:

```typescript
// app/layout.tsx (Server Component)
import { validateEnvironmentOnStartup } from '@/lib/security/env-validator'

// Run validation
if (typeof window === 'undefined') {
  validateEnvironmentOnStartup()
}
```

### Manual Validation

```typescript
import { validateEnvironmentVariables } from '@/lib/security/env-validator'

const result = validateEnvironmentVariables()

if (!result.valid) {
  console.error('Missing required environment variables:')
  result.errors.forEach((error) => {
    console.error(`  - ${error.name}: ${error.error}`)
  })
}
```

### Preventing Secret Exposure

✅ **DO**:

- Use `NEXT_PUBLIC_` prefix ONLY for truly public values
- Keep API secrets server-side only
- Validate all environment variables on startup

❌ **DON'T**:

- Expose API keys to the client
- Use client-side environment variables for secrets
- Skip validation in production

## 📊 Error Tracking (Sentry)

Configured in `sentry.client.config.ts`, `sentry.server.config.ts`, and `sentry.edge.config.ts`.

### Setup

1. Create a Sentry account at [sentry.io](https://sentry.io)
2. Create a new project
3. Add environment variables:

```env
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=anderson-cleaning
SENTRY_PROJECT=anderson-cleaning-website
```

### Manual Error Reporting

```typescript
import * as Sentry from '@sentry/nextjs'

try {
  // Risky operation
  await processPayment()
} catch (error) {
  // Report to Sentry
  Sentry.captureException(error, {
    extra: {
      userId: user.id,
      paymentAmount: amount,
    },
  })

  // Handle error
  return Response.json({ error: 'Payment failed' }, { status: 500 })
}
```

### Filtering Sensitive Data

Sentry is configured to automatically filter:

- Passwords
- API keys
- Tokens
- Cookies
- Authorization headers
- Email addresses (partially masked)
- IP addresses

## 🍯 Honeypot Implementation

Honeypots catch bots that auto-fill all form fields.

### HTML Implementation

```tsx
{
  /* Hidden field that humans won't fill */
}
;<div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
  <label htmlFor="website">Website</label>
  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
</div>
```

### Server-Side Validation

```typescript
// app/api/contact/route.ts
export async function POST(request: Request) {
  const data = await request.json()

  // Check honeypot
  if (data.website) {
    // Bot detected - silently reject
    return Response.json({ success: true }) // Fake success
  }

  // Process legitimate submission
  // ...
}
```

### CSS Hiding

```css
/* Additional hiding technique */
.honeypot {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
}
```

## 🧪 Testing

### Security Headers

```bash
# Check headers
curl -I https://yoursite.com

# Expected headers:
# Content-Security-Policy: ...
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# Referrer-Policy: strict-origin-when-cross-origin
# Strict-Transport-Security: max-age=31536000
```

### Rate Limiting

```bash
# Test rate limit
for i in {1..10}; do
  curl -w "Status: %{http_code}\n" https://yoursite.com/api/contact
done

# Should return 429 after limit exceeded
```

### CSP Validation

Use online tools:

- [CSP Evaluator](https://csp-evaluator.withgoogle.com/)
- [Security Headers](https://securityheaders.com/)

### Input Sanitization

```typescript
// Test sanitization
import { sanitizeTextInput } from '@/lib/security/sanitizer'

const tests = [
  '<script>alert("xss")</script>',
  'SELECT * FROM users',
  '../../etc/passwd',
  'Normal text',
]

tests.forEach((test) => {
  console.log(`Input: ${test}`)
  console.log(`Output: ${sanitizeTextInput(test, { stripHtml: true })}`)
})
```

## ✅ Best Practices

### Input Validation

1. ✅ **Validate on both client and server**
2. ✅ **Sanitize before storage AND display**
3. ✅ **Use type-safe validation (Zod, Yup)**
4. ✅ **Set maximum lengths for all inputs**
5. ✅ **Use allowlists over denylists**

### Authentication & Authorization

1. ✅ **Use secure session management**
2. ✅ **Implement proper CORS policies**
3. ✅ **Use HTTPS everywhere**
4. ✅ **Never expose secrets to client**
5. ✅ **Implement rate limiting on auth endpoints**

### Error Handling

1. ✅ **Don't expose stack traces in production**
2. ✅ **Log errors securely (Sentry)**
3. ✅ **Return generic error messages to users**
4. ✅ **Monitor error patterns**

### Dependencies

1. ✅ **Keep dependencies updated**
2. ✅ **Run `npm audit` regularly**
3. ✅ **Use `npm audit fix` for patches**
4. ✅ **Review security advisories**

### Deployment

1. ✅ **Use environment variables for secrets**
2. ✅ **Enable HSTS in production**
3. ✅ **Set up security monitoring**
4. ✅ **Regular security audits**
5. ✅ **Implement logging and alerting**

## 📚 Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [Sentry Documentation](https://docs.sentry.io/)

## 🚨 Incident Response

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email security@andersoncleaning.com
3. Include details and proof of concept
4. Allow time for patching before disclosure

---

**Last Updated**: 2024-01-13
**Maintained By**: Development Team
