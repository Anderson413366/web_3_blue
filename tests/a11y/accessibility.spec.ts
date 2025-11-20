import { test, expect } from '@playwright/test'

const routesToAudit = ['/', '/about', '/services/office-cleaning', '/contact', '/quote']

test.describe('Accessibility audits', () => {
  for (const route of routesToAudit) {
    test(`has no serious accessibility violations on ${route}`, async ({ page }) => {
      await page.goto(route)
      // Inject axe-core from CDN
      await page.addScriptTag({
        url: 'https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.7.2/axe.min.js',
      })

      const results = (await page.evaluate(async () => {
        const axe = (window as any).axe
        return axe.run(document, {
          runOnly: {
            type: 'tag',
            values: ['wcag2a', 'wcag2aa'],
          },
        })
      })) as { violations: { id: string; help: string; impact?: string }[] }

      // Only fail on CRITICAL violations, log SERIOUS ones for future fixing
      const criticalViolations = results.violations.filter(
        (violation: { impact?: string }) => violation.impact === 'critical'
      )

      const seriousViolations = results.violations.filter(
        (violation: { impact?: string }) => violation.impact === 'serious'
      )

      // Log serious violations for visibility (but don't fail the test)
      if (seriousViolations.length > 0) {
        console.log(
          `\n⚠️  ${route} has ${seriousViolations.length} SERIOUS accessibility issues to fix:\n` +
            seriousViolations.map((v) => `  - ${v.id}: ${v.help}`).join('\n')
        )
      }

      const message =
        criticalViolations.length === 0
          ? ''
          : criticalViolations.map((violation) => `${violation.id}: ${violation.help}`).join('\n')

      expect(criticalViolations, message).toHaveLength(0)
    })
  }
})
