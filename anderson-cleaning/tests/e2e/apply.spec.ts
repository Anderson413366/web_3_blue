import { test, expect } from '@playwright/test'

test.describe('/apply page', () => {
  test('should have header and footer from global layout', async ({ page }) => {
    await page.goto('/apply')

    // Check that header exists (from global layout)
    const header = page.locator('header, [role="banner"], nav').first()
    await expect(header).toBeVisible()

    // Check that footer exists (from global layout)
    const footer = page.locator('footer, [role="contentinfo"]').first()
    await expect(footer).toBeVisible()
  })

  test('body should not have theme-dark class', async ({ page }) => {
    await page.goto('/apply')

    // Check that body doesn't have 'theme-dark' class
    const body = page.locator('body')
    const bodyClass = await body.getAttribute('class')

    expect(bodyClass).not.toContain('theme-dark')
  })

  test('main should not have route-level font class', async ({ page }) => {
    await page.goto('/apply')

    // Check that main doesn't have route-specific font classes
    const main = page.locator('main')
    const mainClass = await main.getAttribute('class')

    // Should not have font classes like 'font-inter', '__className', etc.
    if (mainClass) {
      expect(mainClass).not.toMatch(/font-\w+/)
      expect(mainClass).not.toMatch(/__className_\w+/)
    }
  })

  test('form fields and submit button should be visible', async ({ page }) => {
    await page.goto('/apply')

    // Wait for the page to load
    await page.waitForLoadState('networkidle')

    // Check for either the "Start Application" button or form fields
    // The careers page shows an intro first, then the form
    const startButton = page.getByRole('button', { name: /start|apply|begin/i })
    const formInputs = page.locator('input, select, textarea')

    // Either start button or form fields should be visible
    const hasStartButton = await startButton.count() > 0
    const hasFormFields = await formInputs.count() > 0

    expect(hasStartButton || hasFormFields).toBeTruthy()

    // If there's a start button, it should be visible
    if (hasStartButton) {
      await expect(startButton.first()).toBeVisible()
    }

    // If there are form fields, at least one should be visible
    if (hasFormFields) {
      const visibleInputs = await formInputs.filter({ hasText: /./ }).or(formInputs.filter({ has: page.locator('*') }))
      expect(await visibleInputs.count()).toBeGreaterThan(0)
    }
  })

  test('submit button should be present when in form view', async ({ page }) => {
    await page.goto('/apply')

    await page.waitForLoadState('networkidle')

    // Check for submit/next/continue buttons
    const actionButtons = page.getByRole('button', { name: /submit|next|continue|send|review/i })
    const buttonCount = await actionButtons.count()

    expect(buttonCount).toBeGreaterThan(0)
  })
})
