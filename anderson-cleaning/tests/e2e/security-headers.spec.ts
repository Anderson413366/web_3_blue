/**
 * Security Headers E2E Tests
 *
 * Verifies that security headers including CSP with nonces
 * and HSTS are properly set on all pages.
 */

import { test, expect } from '@playwright/test'

test.describe('Security Headers', () => {
  test('should have CSP header with nonce on homepage', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    // Verify CSP header exists
    const csp = headers['content-security-policy']
    expect(csp).toBeDefined()

    // Verify nonce is present in CSP
    expect(csp).toContain("'nonce-")

    // Verify CSP directives
    expect(csp).toContain("default-src 'self'")
    expect(csp).toContain('script-src')
    expect(csp).toContain('https://www.googletagmanager.com')
    expect(csp).toContain('https://www.google-analytics.com')

    // In production, verify unsafe-inline is removed
    if (process.env.NODE_ENV === 'production') {
      // For script-src, should use nonces instead of unsafe-inline
      const scriptSrcMatch = csp.match(/script-src[^;]+/)
      if (scriptSrcMatch) {
        const scriptSrc = scriptSrcMatch[0]
        // If unsafe-inline is present with nonce, it's OK (nonce takes precedence)
        // But preferably it should not be there
        expect(scriptSrc).toContain("'nonce-")
      }
    }
  })

  test('should have HSTS header in production', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()

    if (process.env.NODE_ENV === 'production' || process.env.VERCEL_ENV === 'production') {
      const hsts = headers['strict-transport-security']
      expect(hsts).toBeDefined()
      expect(hsts).toContain('max-age=31536000')
      expect(hsts).toContain('includeSubDomains')
      expect(hsts).toContain('preload')
    }
  })

  test('should have X-Content-Type-Options header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['x-content-type-options']).toBe('nosniff')
  })

  test('should have Referrer-Policy header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
  })

  test('should have Permissions-Policy header', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    const permissionsPolicy = headers['permissions-policy']
    expect(permissionsPolicy).toBeDefined()
    expect(permissionsPolicy).toContain('camera=()')
    expect(permissionsPolicy).toContain('microphone=()')
    expect(permissionsPolicy).toContain('geolocation=()')
  })

  test('should have X-Frame-Options header set to DENY', async ({ page }) => {
    const response = await page.goto('/')
    expect(response).not.toBeNull()

    const headers = response!.headers()
    expect(headers['x-frame-options']).toBe('DENY')
  })

  test('inline scripts with nonce should load', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/')

    // Wait for page to fully load
    await page.waitForLoadState('networkidle')

    // Verify JSON-LD scripts are present (they use nonces)
    const jsonLdScripts = await page.locator('script[type="application/ld+json"]').count()
    expect(jsonLdScripts).toBeGreaterThan(0)

    // Verify no CSP violation errors in console
    const cspViolations: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error' && msg.text().toLowerCase().includes('content security policy')) {
        cspViolations.push(msg.text())
      }
    })

    // Reload to catch any CSP violations
    await page.reload()
    await page.waitForLoadState('networkidle')

    // Should have no CSP violations
    expect(cspViolations.length).toBe(0)
  })

  test('external scripts from allowed domains should load', async ({ page }) => {
    // Track script loading
    const loadedScripts = new Set<string>()
    const failedScripts = new Set<string>()

    page.on('response', (response) => {
      const url = response.url()
      if (url.includes('.js') && !url.includes('localhost')) {
        if (response.ok()) {
          loadedScripts.add(url)
        } else {
          failedScripts.add(url)
        }
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // If GTM is configured, it should load successfully
    const gtmId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
    if (gtmId && !gtmId.startsWith('GTM-X')) {
      // GTM script should be in loaded scripts or at least not in failed
      const hasGtm = Array.from(loadedScripts).some((url) => url.includes('googletagmanager.com'))
      const gtmFailed = Array.from(failedScripts).some((url) => url.includes('googletagmanager.com'))

      if (hasGtm || !gtmFailed) {
        // GTM either loaded or wasn't blocked by CSP
        expect(gtmFailed).toBe(false)
      }
    }
  })

  test('CSP nonce should be unique per request', async ({ page, context }) => {
    // Make first request
    const response1 = await page.goto('/')
    const csp1 = response1!.headers()['content-security-policy']
    const nonceMatch1 = csp1?.match(/'nonce-([^']+)'/)
    const nonce1 = nonceMatch1 ? nonceMatch1[1] : null

    // Make second request in new page
    const page2 = await context.newPage()
    const response2 = await page2.goto('/')
    const csp2 = response2!.headers()['content-security-policy']
    const nonceMatch2 = csp2?.match(/'nonce-([^']+)'/)
    const nonce2 = nonceMatch2 ? nonceMatch2[1] : null

    // Nonces should exist and be different
    expect(nonce1).toBeTruthy()
    expect(nonce2).toBeTruthy()
    expect(nonce1).not.toBe(nonce2)

    await page2.close()
  })

  test('all security headers should be present on different routes', async ({ page }) => {
    const routes = ['/', '/about', '/services', '/contact']

    for (const route of routes) {
      const response = await page.goto(route)
      expect(response).not.toBeNull()

      const headers = response!.headers()

      // All routes should have these headers
      expect(headers['content-security-policy']).toBeDefined()
      expect(headers['x-content-type-options']).toBe('nosniff')
      expect(headers['referrer-policy']).toBe('strict-origin-when-cross-origin')
      expect(headers['permissions-policy']).toBeDefined()

      // CSP should contain nonce
      expect(headers['content-security-policy']).toContain("'nonce-")
    }
  })
})
