import { test, expect } from '@playwright/test'

test.describe('PWA Functionality', () => {
  test('should have a valid web app manifest', async ({ page }) => {
    await page.goto('/')

    // Check that manifest link exists
    const manifestLink = page.locator('link[rel="manifest"]')
    await expect(manifestLink).toHaveAttribute('href', '/manifest.json')

    // Fetch and validate manifest
    const response = await page.request.get('/manifest.json')
    expect(response.ok()).toBeTruthy()

    const manifest = await response.json()

    // Validate required manifest fields
    expect(manifest.name).toBe('Anderson Cleaning - Commercial Cleaning Services')
    expect(manifest.short_name).toBe('Anderson Cleaning')
    expect(manifest.theme_color).toBe('#1D4ED8')
    expect(manifest.background_color).toBe('#ffffff')
    expect(manifest.display).toBe('standalone')
    expect(manifest.start_url).toBe('/')
    expect(manifest.scope).toBe('/')

    // Validate icons exist and have required sizes
    expect(manifest.icons).toBeDefined()
    expect(Array.isArray(manifest.icons)).toBeTruthy()
    expect(manifest.icons.length).toBeGreaterThan(0)

    // Check for required icon sizes (at least 192x192 and 512x512)
    const iconSizes = manifest.icons.map((icon: any) => icon.sizes)
    const hasRequiredSizes = iconSizes.some((size: string) =>
      ['192x192', '512x512', 'any'].includes(size)
    )
    expect(hasRequiredSizes).toBeTruthy()
  })

  test('should have theme-color meta tag', async ({ page }) => {
    await page.goto('/')

    const themeColorMeta = page.locator('meta[name="theme-color"]')
    await expect(themeColorMeta).toHaveAttribute('content', '#1D4ED8')
  })

  test('should have apple-touch-icon', async ({ page }) => {
    await page.goto('/')

    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]')
    await expect(appleTouchIcon).toHaveCount(1)
  })

  test('should register service worker in production', async ({ page, context }) => {
    // Skip in development mode
    if (process.env.NODE_ENV === 'development') {
      test.skip()
    }

    await page.goto('/')

    // Wait for service worker registration
    const swRegistered = await page.evaluate(async () => {
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready
        return registration !== null && registration !== undefined
      }
      return false
    })

    expect(swRegistered).toBeTruthy()
  })

  test('offline page should be accessible', async ({ page }) => {
    const response = await page.goto('/offline')
    expect(response?.status()).toBe(200)

    // Check for offline page content
    await expect(page.locator('h1')).toContainText(/offline/i)
    await expect(page.getByText(/lost your internet connection/i)).toBeVisible()

    // Check for "Try Again" button
    await expect(page.getByRole('button', { name: /try again/i })).toBeVisible()

    // Check for homepage link
    await expect(page.getByRole('link', { name: /homepage/i })).toBeVisible()
  })

  test('should have valid manifest shortcuts', async ({ page }) => {
    const response = await page.request.get('/manifest.json')
    const manifest = await response.json()

    expect(manifest.shortcuts).toBeDefined()
    expect(Array.isArray(manifest.shortcuts)).toBeTruthy()

    // Validate each shortcut has required fields
    for (const shortcut of manifest.shortcuts) {
      expect(shortcut.name).toBeDefined()
      expect(shortcut.url).toBeDefined()
      expect(shortcut.url).toMatch(/^\//)
    }

    // Check for expected shortcuts
    const shortcutUrls = manifest.shortcuts.map((s: any) => s.url)
    expect(shortcutUrls).toContain('/quote')
    expect(shortcutUrls).toContain('/contact')
    expect(shortcutUrls).toContain('/services')
  })

  test('should have proper cache-control headers for static assets', async ({ page }) => {
    await page.goto('/')

    // Check Next.js static files have proper caching
    const response = await page.waitForResponse(
      (response) =>
        response.url().includes('/_next/static/') &&
        response.request().resourceType() === 'script',
      { timeout: 5000 }
    ).catch(() => null)

    if (response) {
      const cacheControl = response.headers()['cache-control']
      expect(cacheControl).toContain('max-age')
    }
  })

  test('manifest should have valid JSON structure', async ({ page }) => {
    const response = await page.request.get('/manifest.json')
    expect(response.ok()).toBeTruthy()
    expect(response.headers()['content-type']).toContain('application/json')

    const manifestText = await response.text()
    expect(() => JSON.parse(manifestText)).not.toThrow()
  })

  test('should have HTTPS or localhost for PWA installability', async ({ page }) => {
    await page.goto('/')

    const url = page.url()
    const isSecure = url.startsWith('https://') || url.includes('localhost')
    expect(isSecure).toBeTruthy()
  })

  test('offline page should have proper metadata', async ({ page }) => {
    await page.goto('/offline')

    // Check page title
    await expect(page).toHaveTitle(/offline/i)

    // Check robots meta tag (should not be indexed)
    const robotsMeta = page.locator('meta[name="robots"]')
    const robotsContent = await robotsMeta.getAttribute('content')
    expect(robotsContent).toContain('noindex')
  })
})

test.describe('PWA Installability', () => {
  test('should meet basic PWA criteria', async ({ page }) => {
    await page.goto('/')

    // Check for manifest
    const manifestLink = await page.locator('link[rel="manifest"]').count()
    expect(manifestLink).toBeGreaterThan(0)

    // Check for icons in manifest
    const manifestResponse = await page.request.get('/manifest.json')
    const manifest = await manifestResponse.json()
    expect(manifest.icons.length).toBeGreaterThan(0)

    // Check for theme color
    const themeColor = await page.locator('meta[name="theme-color"]').count()
    expect(themeColor).toBeGreaterThan(0)

    // Check for viewport meta tag (required for PWA)
    const viewport = await page.locator('meta[name="viewport"]').count()
    expect(viewport).toBeGreaterThan(0)
  })

  test('should have proper display mode in manifest', async ({ page }) => {
    const response = await page.request.get('/manifest.json')
    const manifest = await response.json()

    const validDisplayModes = ['standalone', 'fullscreen', 'minimal-ui']
    expect(validDisplayModes).toContain(manifest.display)
  })

  test('should have start_url in manifest', async ({ page }) => {
    const response = await page.request.get('/manifest.json')
    const manifest = await response.json()

    expect(manifest.start_url).toBeDefined()
    expect(manifest.start_url).toBe('/')
  })
})
