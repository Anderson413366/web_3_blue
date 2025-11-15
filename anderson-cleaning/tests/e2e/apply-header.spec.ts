import { test, expect } from '@playwright/test'

/**
 * E2E Tests for Apply/Careers Page Layout
 *
 * These tests ensure:
 * 1. No duplicate headers/footers on the apply page
 * 2. Careers route properly redirects to apply
 * 3. Global layout is properly applied
 */

test.describe('Apply Page Layout', () => {
  test('Apply page uses exactly one header and one footer', async ({ page }) => {
    await page.goto('/apply')

    // Wait for page to load
    await page.waitForLoadState('networkidle')

    // Check for exactly one header
    const headers = page.locator('header')
    await expect(headers).toHaveCount(1)

    // Check for exactly one footer
    const footers = page.locator('footer')
    await expect(footers).toHaveCount(1)
  })

  test('Careers page redirects to apply', async ({ page }) => {
    const response = await page.goto('/careers')

    // Verify redirect happened (could be 301, 302, 307, or 308)
    const statusCode = response?.status()
    const isRedirect = statusCode && [301, 302, 307, 308].includes(statusCode)

    // OR check that we ended up on the apply page
    const finalUrl = page.url()
    const isOnApplyPage = finalUrl.includes('/apply')

    // Either should be true
    expect(isRedirect || isOnApplyPage).toBe(true)
  })

  test('Apply page has main content', async ({ page }) => {
    await page.goto('/apply')
    await page.waitForLoadState('networkidle')

    // Verify main content exists (the CareersPage component should render)
    const mainContent = page.locator('main')
    await expect(mainContent).toBeVisible()
  })

  test('No duplicate navigation elements on apply page', async ({ page }) => {
    await page.goto('/apply')
    await page.waitForLoadState('networkidle')

    // Check that there's only one nav element (should be in header)
    const navElements = page.locator('nav')
    const navCount = await navElements.count()

    // Should have at most 1 main nav (some sites might have multiple navs, but not duplicates)
    expect(navCount).toBeGreaterThanOrEqual(1)
    expect(navCount).toBeLessThanOrEqual(2) // Allow for mobile nav
  })
})
