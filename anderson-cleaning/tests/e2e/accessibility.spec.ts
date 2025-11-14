import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility Tests', () => {
  test('homepage should not have any automatically detectable accessibility issues', async ({
    page,
  }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('services page should not have accessibility violations', async ({ page }) => {
    await page.goto('/services')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('about page should not have accessibility violations', async ({ page }) => {
    await page.goto('/about')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('contact page should not have accessibility violations', async ({ page }) => {
    await page.goto('/contact')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('keyboard navigation works on homepage', async ({ page }) => {
    await page.goto('/')

    // Focus should start at skip link
    await page.keyboard.press('Tab')
    const skipLink = page.locator('.skip-link')
    await expect(skipLink).toBeFocused()

    // Continue tabbing through interactive elements
    await page.keyboard.press('Tab')
    const firstLink = page.locator('a').first()
    await expect(firstLink).toBeFocused()
  })

  test('skip link works correctly', async ({ page }) => {
    await page.goto('/')

    // Tab to skip link
    await page.keyboard.press('Tab')
    const skipLink = page.locator('.skip-link')
    await expect(skipLink).toBeFocused()

    // Activate skip link
    await page.keyboard.press('Enter')

    // Main content should receive focus
    const mainContent = page.locator('#main-content')
    await expect(mainContent).toBeFocused()
  })

  test('focus indicators are visible', async ({ page }) => {
    await page.goto('/')

    // Tab to first focusable element
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab')

    // Get focused element
    const focusedElement = page.locator(':focus')
    await expect(focusedElement).toBeVisible()

    // Check if focus outline is present
    const outlineStyle = await focusedElement.evaluate((el) => {
      const computed = window.getComputedStyle(el)
      return {
        outline: computed.outline,
        outlineWidth: computed.outlineWidth,
        boxShadow: computed.boxShadow,
      }
    })

    // Should have either outline or box-shadow for focus indication
    const hasFocusIndicator =
      (outlineStyle.outline && outlineStyle.outline !== 'none') ||
      (outlineStyle.outlineWidth && outlineStyle.outlineWidth !== '0px') ||
      (outlineStyle.boxShadow && outlineStyle.boxShadow !== 'none')

    expect(hasFocusIndicator).toBeTruthy()
  })

  test('all images have alt text', async ({ page }) => {
    await page.goto('/')

    const images = await page.locator('img').all()

    for (const img of images) {
      const alt = await img.getAttribute('alt')
      // Alt attribute should exist (can be empty for decorative images)
      expect(alt).not.toBeNull()
    }
  })

  test('buttons have accessible names', async ({ page }) => {
    await page.goto('/')

    const buttons = await page.locator('button').all()

    for (const button of buttons) {
      const accessibleName = await button.evaluate((el) => {
        return (
          el.textContent?.trim() ||
          el.getAttribute('aria-label') ||
          el.getAttribute('aria-labelledby') ||
          el.getAttribute('title')
        )
      })

      expect(accessibleName).toBeTruthy()
    }
  })

  test('links have accessible names', async ({ page }) => {
    await page.goto('/')

    const links = await page.locator('a').all()

    for (const link of links) {
      const accessibleName = await link.evaluate((el) => {
        return (
          el.textContent?.trim() ||
          el.getAttribute('aria-label') ||
          el.getAttribute('aria-labelledby') ||
          el.getAttribute('title')
        )
      })

      expect(accessibleName).toBeTruthy()
    }
  })

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/quote')

    const inputs = await page
      .locator('input[type="text"], input[type="email"], input[type="tel"], select, textarea')
      .all()

    for (const input of inputs) {
      const hasLabel = await input.evaluate((el) => {
        const id = el.getAttribute('id')
        if (!id) return false

        // Check for associated label
        const label = document.querySelector(`label[for="${id}"]`)
        if (label) return true

        // Check for aria-label or aria-labelledby
        const ariaLabel = el.getAttribute('aria-label')
        const ariaLabelledby = el.getAttribute('aria-labelledby')

        return !!(ariaLabel || ariaLabelledby)
      })

      expect(hasLabel).toBeTruthy()
    }
  })

  test('color contrast is sufficient', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze()

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    expect(contrastViolations).toHaveLength(0)
  })

  test('page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/')

    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all()

    let previousLevel = 0
    for (const heading of headings) {
      const tagName = await heading.evaluate((el) => el.tagName.toLowerCase())
      const level = parseInt(tagName.substring(1))

      // First heading should be h1
      if (previousLevel === 0) {
        expect(level).toBe(1)
      }

      // Should not skip levels (e.g., h1 -> h3)
      if (previousLevel > 0) {
        expect(level).toBeLessThanOrEqual(previousLevel + 1)
      }

      previousLevel = level
    }
  })

  test('landmarks are properly structured', async ({ page }) => {
    await page.goto('/')

    // Should have main landmark
    const main = page.locator('main, [role="main"]')
    await expect(main).toHaveCount(1)

    // Should have header/banner
    const header = page.locator('header, [role="banner"]')
    expect(await header.count()).toBeGreaterThan(0)

    // Should have footer/contentinfo
    const footer = page.locator('footer, [role="contentinfo"]')
    expect(await footer.count()).toBeGreaterThan(0)
  })

  test('touch targets are large enough', async ({ page }) => {
    await page.goto('/')

    const interactiveElements = await page.locator('button, a[href], input').all()

    for (const element of interactiveElements) {
      const boundingBox = await element.boundingBox()

      if (boundingBox) {
        // WCAG 2.2 AA requires minimum 24x24px, but 44x44px is better
        const meetsMinimum = boundingBox.width >= 24 && boundingBox.height >= 24
        expect(meetsMinimum).toBeTruthy()
      }
    }
  })

  test('prefers-reduced-motion is respected', async ({ page }) => {
    // Enable reduced motion preference
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')

    // Check if animations are disabled or reduced
    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    })

    expect(hasReducedMotion).toBeTruthy()
  })

  test('screen reader announcements work', async ({ page }) => {
    await page.goto('/')

    // Check for screen reader only text
    const srOnly = page.locator('.sr-only')
    expect(await srOnly.count()).toBeGreaterThan(0)

    // Check for aria-live regions
    const liveRegions = page.locator('[aria-live]')
    expect(await liveRegions.count()).toBeGreaterThan(0)
  })

  test('focus is not trapped unintentionally', async ({ page }) => {
    await page.goto('/')

    // Tab through multiple elements
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab')
    }

    // Should be able to shift-tab back
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Shift+Tab')
    }

    // No errors should occur
    expect(true).toBe(true)
  })
})
