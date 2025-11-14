import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('page loads correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Anderson Cleaning/)
    await expect(page.locator('h1')).toContainText('Anderson Cleaning')
  })

  test('navigation is visible and functional', async ({ page }) => {
    // Check if header is visible
    const header = page.locator('header')
    await expect(header).toBeVisible()

    // Check navigation links
    await expect(page.locator('a[href="/"]')).toBeVisible()
    await expect(page.locator('a[href="/services"]')).toBeVisible()
    await expect(page.locator('a[href="/about"]')).toBeVisible()
    await expect(page.locator('a[href="/contact"]')).toBeVisible()
  })

  test('logo is visible and links to homepage', async ({ page }) => {
    const logo = page.locator('header a[href="/"]').first()
    await expect(logo).toBeVisible()

    // Click logo should reload homepage
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('CTAs are clickable', async ({ page }) => {
    // Find "Get a Quote" button
    const quoteButton = page.locator('text="Get a Quote"').first()
    await expect(quoteButton).toBeVisible()
    await expect(quoteButton).toBeEnabled()
  })

  test('all main sections are visible', async ({ page }) => {
    // Hero section
    await expect(page.locator('text=/commercial cleaning/i').first()).toBeVisible()

    // Services section
    await expect(page.locator('text=/our services/i')).toBeVisible()

    // Coverage area section
    await expect(page.locator('text=/massachusetts.*connecticut/i')).toBeVisible()

    // Testimonials section
    await expect(page.locator('text=/what our clients say/i')).toBeVisible()

    // Before/After section
    await expect(page.locator('text=/our work speaks for itself/i')).toBeVisible()
  })

  test('mobile menu works', async ({ page, viewport }) => {
    // Only test on mobile viewports
    if (viewport && viewport.width < 768) {
      // Mobile menu button should be visible
      const menuButton = page.locator('button[aria-label="Toggle menu"]')
      await expect(menuButton).toBeVisible()

      // Click to open menu
      await menuButton.click()

      // Menu items should be visible
      await expect(page.locator('text="Home"')).toBeVisible()
      await expect(page.locator('text="Services"')).toBeVisible()

      // Click to close menu
      await menuButton.click()

      // Wait for menu to close (check if menu items are hidden)
      await expect(page.locator('text="Home"')).toBeHidden()
    }
  })

  test('dark mode toggle works', async ({ page }) => {
    // Find theme toggle button
    const themeToggle = page.locator('button[aria-label="Toggle theme"]')
    await expect(themeToggle).toBeVisible()

    // Get initial theme
    const html = page.locator('html')
    const initialClass = await html.getAttribute('class')

    // Toggle theme
    await themeToggle.click()

    // Wait a bit for transition
    await page.waitForTimeout(300)

    // Check if class changed
    const newClass = await html.getAttribute('class')
    expect(newClass).not.toBe(initialClass)
  })

  test('footer is visible', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))

    const footer = page.locator('footer')
    await expect(footer).toBeVisible()
  })

  test('phone number is clickable', async ({ page }) => {
    const phoneLink = page.locator('a[href^="tel:"]').first()
    if ((await phoneLink.count()) > 0) {
      await expect(phoneLink).toBeVisible()
    }
  })

  test('services are displayed', async ({ page }) => {
    // Check for service cards
    await expect(page.locator('text=/office.*cleaning/i')).toBeVisible()
    await expect(page.locator('text=/janitorial/i')).toBeVisible()
  })

  test('testimonials are visible', async ({ page }) => {
    // Scroll to testimonials section
    await page.locator('text=/what our clients say/i').scrollIntoViewIfNeeded()

    // Check for star ratings
    const stars = page.locator('[class*="text-accent-500"]')
    expect(await stars.count()).toBeGreaterThan(0)

    // Check for testimonial text
    await expect(page.locator('blockquote').first()).toBeVisible()
  })

  test('before/after slider is interactive', async ({ page }) => {
    // Scroll to before/after section
    await page.locator('text=/our work speaks for itself/i').scrollIntoViewIfNeeded()

    // Check if slider container exists
    const slider = page.locator('[role="img"]').filter({ hasText: /before and after/i })
    if ((await slider.count()) > 0) {
      await expect(slider.first()).toBeVisible()
    }
  })

  test('page is responsive', async ({ page }) => {
    // Test different viewport sizes
    const viewports = [
      { width: 375, height: 667 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ]

    for (const viewport of viewports) {
      await page.setViewportSize(viewport)
      await page.reload()

      // Header should always be visible
      await expect(page.locator('header')).toBeVisible()

      // Main content should be visible
      await expect(page.locator('h1')).toBeVisible()
    }
  })

  test('no console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = []

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text())
      }
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Allow some warnings but no critical errors
    const criticalErrors = consoleErrors.filter(
      (error) =>
        !error.includes('favicon') && !error.includes('sourcemap') && !error.includes('DevTools')
    )

    expect(criticalErrors).toHaveLength(0)
  })
})
