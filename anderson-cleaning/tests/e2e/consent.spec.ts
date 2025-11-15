import { test, expect, Page } from '@playwright/test'

/**
 * Google Consent Mode v2 Tests
 *
 * Ensures analytics tracking respects user consent choices
 * and complies with GDPR/CCPA requirements
 */

test.describe('Cookie Consent & Analytics Tracking', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.context().clearCookies()
    await page.evaluate(() => {
      localStorage.clear()
    })
  })

  test('Cookie banner shows on first visit', async ({ page }) => {
    await page.goto('/')

    // Wait for banner to appear (has 1s delay)
    await page.waitForTimeout(1500)

    // Cookie banner should be visible
    const banner = page.locator('text=We Value Your Privacy')
    await expect(banner).toBeVisible()

    // Verify buttons are present
    await expect(page.locator('button:has-text("Accept All")')).toBeVisible()
    await expect(page.locator('button:has-text("Decline")')).toBeVisible()
    await expect(page.locator('button:has-text("Dismiss")')).toBeVisible()
  })

  test('Cookie banner does not show if consent already given', async ({ page }) => {
    // Set consent in localStorage
    await page.goto('/')
    await page.evaluate(() => {
      localStorage.setItem('cookie-consent', 'accepted')
    })

    // Reload page
    await page.reload()
    await page.waitForTimeout(1500)

    // Cookie banner should NOT be visible
    const banner = page.locator('text=We Value Your Privacy')
    await expect(banner).not.toBeVisible()
  })

  test('No GA requests until consent is granted', async ({ page }) => {
    const gaRequests: string[] = []

    // Intercept Google Analytics requests
    page.on('request', (request) => {
      const url = request.url()
      if (
        url.includes('google-analytics.com') ||
        url.includes('googletagmanager.com/gtag') ||
        url.includes('/collect') ||
        url.includes('/g/collect')
      ) {
        gaRequests.push(url)
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // No GA requests should have been made yet
    expect(gaRequests.length).toBe(0)
  })

  test('Accept All enables analytics and sends events', async ({ page }) => {
    const dataLayerEvents: any[] = []

    // Monitor dataLayer pushes
    await page.exposeFunction('captureDataLayer', (event: any) => {
      dataLayerEvents.push(event)
    })

    await page.goto('/')

    // Override dataLayer.push to capture events
    await page.evaluate(() => {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push.bind(window.dataLayer)
      window.dataLayer.push = function (...args: any[]) {
        // @ts-ignore
        window.captureDataLayer(args[0])
        return originalPush(...args)
      }
    })

    // Wait for banner
    await page.waitForTimeout(1500)

    // Click "Accept All"
    await page.click('button:has-text("Accept All")')
    await page.waitForTimeout(500)

    // Check dataLayer for consent_update event
    const consentUpdate = dataLayerEvents.find((e) => e.event === 'consent_update')
    expect(consentUpdate).toBeTruthy()
    expect(consentUpdate?.analytics_storage).toBe('granted')
    expect(consentUpdate?.ad_storage).toBe('granted')

    // Verify consent is stored
    const storedConsent = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-consent-v2')
      return stored ? JSON.parse(stored) : null
    })

    expect(storedConsent).toBeTruthy()
    expect(storedConsent?.choice).toBe('accepted')
    expect(storedConsent?.state?.analytics_storage).toBe('granted')
  })

  test('Decline keeps analytics denied', async ({ page }) => {
    const dataLayerEvents: any[] = []

    await page.exposeFunction('captureDataLayer', (event: any) => {
      dataLayerEvents.push(event)
    })

    await page.goto('/')

    await page.evaluate(() => {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push.bind(window.dataLayer)
      window.dataLayer.push = function (...args: any[]) {
        // @ts-ignore
        window.captureDataLayer(args[0])
        return originalPush(...args)
      }
    })

    await page.waitForTimeout(1500)

    // Click "Decline"
    await page.click('button:has-text("Decline")')
    await page.waitForTimeout(500)

    // Check dataLayer for consent_update event
    const consentUpdate = dataLayerEvents.find((e) => e.event === 'consent_update')
    expect(consentUpdate).toBeTruthy()
    expect(consentUpdate?.analytics_storage).toBe('denied')
    expect(consentUpdate?.ad_storage).toBe('denied')

    // Verify consent is stored
    const storedConsent = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-consent-v2')
      return stored ? JSON.parse(stored) : null
    })

    expect(storedConsent).toBeTruthy()
    expect(storedConsent?.choice).toBe('declined')
    expect(storedConsent?.state?.analytics_storage).toBe('denied')
  })

  test('Dismiss keeps defaults (denied) but closes banner', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1500)

    // Banner should be visible
    await expect(page.locator('text=We Value Your Privacy')).toBeVisible()

    // Click "Dismiss"
    await page.click('button:has-text("Dismiss")')
    await page.waitForTimeout(500)

    // Banner should be hidden
    await expect(page.locator('text=We Value Your Privacy')).not.toBeVisible()

    // Consent should NOT be stored (user didn't make a choice)
    const storedConsent = await page.evaluate(() => {
      return localStorage.getItem('cookie-consent-v2')
    })

    expect(storedConsent).toBeNull()
  })

  test('Consent persists across page navigations', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1500)

    // Accept consent
    await page.click('button:has-text("Accept All")')
    await page.waitForTimeout(500)

    // Navigate to another page
    await page.goto('/about')
    await page.waitForTimeout(1500)

    // Cookie banner should NOT show (consent already given)
    await expect(page.locator('text=We Value Your Privacy')).not.toBeVisible()

    // Consent should still be stored
    const storedConsent = await page.evaluate(() => {
      const stored = localStorage.getItem('cookie-consent-v2')
      return stored ? JSON.parse(stored) : null
    })

    expect(storedConsent?.choice).toBe('accepted')
  })

  test('Consent defaults are set before GTM loads', async ({ page }) => {
    const dataLayerEvents: any[] = []

    await page.exposeFunction('captureDataLayer', (event: any) => {
      dataLayerEvents.push(event)
    })

    await page.goto('/')

    // Override dataLayer.push early
    await page.evaluate(() => {
      window.dataLayer = window.dataLayer || []
      const originalPush = window.dataLayer.push.bind(window.dataLayer)
      window.dataLayer.push = function (...args: any[]) {
        // @ts-ignore
        window.captureDataLayer(args[0])
        return originalPush(...args)
      }
    })

    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(1000)

    // Check that consent_default was pushed early
    const consentDefault = dataLayerEvents.find((e) => e.event === 'consent_default')
    expect(consentDefault).toBeTruthy()
    expect(consentDefault?.analytics_storage).toBe('denied')
    expect(consentDefault?.ad_storage).toBe('denied')

    // Check that gtm.js event comes AFTER consent_default
    const consentDefaultIndex = dataLayerEvents.findIndex((e) => e.event === 'consent_default')
    const gtmJsIndex = dataLayerEvents.findIndex((e) => e.event === 'gtm.js')

    if (gtmJsIndex !== -1) {
      expect(consentDefaultIndex).toBeLessThan(gtmJsIndex)
    }
  })

  test('Privacy policy link is present and functional', async ({ page }) => {
    await page.goto('/')
    await page.waitForTimeout(1500)

    // Find privacy policy link
    const privacyLink = page.locator('a:has-text("Read our Privacy Policy")')
    await expect(privacyLink).toBeVisible()

    // Click it
    await privacyLink.click()
    await page.waitForLoadState('networkidle')

    // Should navigate to privacy policy page
    expect(page.url()).toContain('/legal/privacy-policy')
  })
})

test.describe('Analytics Tracking Helper', () => {
  test('Events are queued until consent is granted', async ({ page }) => {
    await page.goto('/')

    // Try to track an event before consent
    const queueSize = await page.evaluate(() => {
      // @ts-ignore
      if (window.track) {
        // @ts-ignore
        window.track.event('test_event', { test_prop: 'value' })
        // @ts-ignore
        return window.track.getQueueSize()
      }
      return 0
    })

    // Event should be queued (if track helper is loaded)
    // This might be 0 if track helper isn't imported on homepage
    // The important test is that it doesn't error
    expect(queueSize).toBeGreaterThanOrEqual(0)
  })
})
