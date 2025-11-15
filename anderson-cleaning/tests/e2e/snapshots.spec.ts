import { test, expect, Page } from '@playwright/test'

/**
 * Visual Regression & Layout Parity Tests
 *
 * Catches layout/spacing/nav/theme drifts across top routes with visual snapshots.
 * Also validates layout parity (single header/footer, no horizontal scroll, etc.)
 *
 * Usage:
 * - Update snapshots: npm run test:e2e:update
 * - Run tests: npm run test:visual
 */

// Test routes
const ROUTES = ['/', '/services', '/industries', '/about', '/apply', '/contact', '/faq']

// Test viewports as specified
const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1366, height: 768 },
]

/**
 * Layout Parity Assertion Helper
 * Validates that pages have consistent layout structure
 */
async function assertLayoutParity(page: Page, routeName: string) {
  // 1. Exactly 1 <header> element
  const headers = await page.locator('header').count()
  expect(headers, `${routeName} should have exactly 1 header`).toBe(1)

  // 2. Exactly 1 <footer> element
  const footers = await page.locator('footer').count()
  expect(footers, `${routeName} should have exactly 1 footer`).toBe(1)

  // 3. No horizontal scrollbars (body width should equal viewport width)
  const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
  const viewportWidth = await page.evaluate(() => window.innerWidth)
  expect(
    bodyWidth,
    `${routeName} should not have horizontal scroll (body: ${bodyWidth}px, viewport: ${viewportWidth}px)`,
  ).toBeLessThanOrEqual(viewportWidth + 1) // +1 for rounding

  // 4. Check for container max-width consistency
  // Look for common container classes
  const containerSelectors = [
    '.container',
    '[class*="container"]',
    'main > div:first-child',
    '[class*="max-w"]',
  ]

  for (const selector of containerSelectors) {
    const containers = page.locator(selector)
    const count = await containers.count()
    if (count > 0) {
      // Just verify they exist and are visible
      const firstContainer = containers.first()
      await expect(
        firstContainer,
        `${routeName} container ${selector} should be visible`,
      ).toBeVisible()
      break // Found a container, move on
    }
  }
}

/**
 * Check for console errors
 */
async function setupConsoleErrorTracking(page: Page, routeName: string) {
  const consoleErrors: string[] = []

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text())
    }
  })

  page.on('pageerror', (error) => {
    consoleErrors.push(error.message)
  })

  return consoleErrors
}

// Disable animations helper
async function disableAnimations(page: Page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `,
  })
}

// Generate tests for each viewport and route combination
for (const viewport of VIEWPORTS) {
  test.describe(`Snapshots & Layout Parity - ${viewport.name} (${viewport.width}x${viewport.height})`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
    })

    test.beforeEach(async ({ page }) => {
      await disableAnimations(page)
    })

    for (const route of ROUTES) {
      test(`${route} - snapshot and layout parity`, async ({ page }) => {
        const consoleErrors = await setupConsoleErrorTracking(page, route)

        // Navigate to route
        await page.goto(route)

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle')

        // Wait for critical content (h1 or main content)
        await page.waitForSelector('h1, main', { state: 'visible', timeout: 10000 })

        // Additional wait for any lazy-loaded content
        await page.waitForTimeout(500)

        // Perform layout parity assertions
        await assertLayoutParity(page, route)

        // Take full-page screenshot
        const sanitizedRoute = route === '/' ? 'home' : route.replace(/\//g, '-')
        await expect(page).toHaveScreenshot(`${sanitizedRoute}-${viewport.name}.png`, {
          fullPage: true,
          animations: 'disabled',
          // Allow small differences for font rendering across platforms
          maxDiffPixelRatio: 0.01,
        })

        // Assert no console errors occurred
        expect(
          consoleErrors,
          `${route} on ${viewport.name} should not have console errors: ${consoleErrors.join(', ')}`,
        ).toHaveLength(0)
      })
    }
  })
}

// Additional component-level snapshot tests
test.describe('Component Snapshots', () => {
  test.beforeEach(async ({ page }) => {
    await disableAnimations(page)
  })

  test('Header component consistency', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const header = page.locator('header').first()
    await expect(header).toBeVisible()
    await expect(header).toHaveScreenshot('header-component.png', {
      animations: 'disabled',
    })
  })

  test('Footer component consistency', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const footer = page.locator('footer').first()
    await expect(footer).toBeVisible()
    await expect(footer).toHaveScreenshot('footer-component.png', {
      animations: 'disabled',
    })
  })

  test('Mobile navigation menu', async ({ page }) => {
    // Use mobile viewport
    await page.setViewportSize({ width: 360, height: 800 })
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    // Find and click mobile menu button
    const menuButton = page.getByRole('button', { name: /menu|navigation/i })
    if ((await menuButton.count()) > 0) {
      await menuButton.first().click()
      await page.waitForTimeout(500) // Wait for menu animation

      await expect(page).toHaveScreenshot('mobile-menu-open.png', {
        animations: 'disabled',
      })
    }
  })
})

// Test for dark mode if implemented
test.describe('Dark Mode Snapshots', () => {
  test.use({
    colorScheme: 'dark',
  })

  test.beforeEach(async ({ page }) => {
    await disableAnimations(page)
  })

  test('Homepage in dark mode', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('home-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })

  test('Apply page in dark mode', async ({ page }) => {
    await page.goto('/apply')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveScreenshot('apply-dark.png', {
      fullPage: true,
      animations: 'disabled',
    })
  })
})
