import { test, expect } from '@playwright/test'

const marketingRoutes = [
  { path: '/', hero: /Professional Commercial Cleaning.*Personal Touch/i },
  { path: '/about', hero: /About Anderson Cleaning/i },
  { path: '/services/office-cleaning', hero: /Office & Commercial Cleaning/i },
  { path: '/contact', hero: /Get in Touch/i },
  { path: '/quote', hero: /Get Your Free Quote/i },
]

test.describe('Marketing pages render key content', () => {
  for (const route of marketingRoutes) {
    test(`renders ${route.path}`, async ({ page }) => {
      await page.goto(route.path)
      // Verify the main heading is present and visible
      await expect(page.getByRole('heading', { level: 1, name: route.hero })).toBeVisible()
      // Verify page loaded successfully (check for body)
      await expect(page.locator('body')).toBeVisible()
    })
  }
})

test('header navigation is functional', async ({ page }) => {
  await page.goto('/')
  // Check header exists
  await expect(page.locator('header')).toBeVisible()
  // Check key nav links exist (using first match to avoid strict mode issues)
  await expect(page.getByRole('link', { name: /about/i }).first()).toBeVisible()
  await expect(page.getByRole('link', { name: /contact/i }).first()).toBeVisible()
})

test('quote form renders and accepts input', async ({ page }) => {
  await page.goto('/quote')

  // Verify form fields are present
  await expect(page.getByLabel(/Full Name/i)).toBeVisible()
  await expect(page.getByLabel(/Company Name/i)).toBeVisible()
  await expect(page.getByLabel(/Email Address/i)).toBeVisible()
  await expect(page.getByLabel(/Phone Number/i)).toBeVisible()

  // Fill out the form
  await page.getByLabel(/Full Name/i).fill('Test User')
  await page.getByLabel(/Company Name/i).fill('Test Company')
  await page.getByLabel(/Email Address/i).fill('test@example.com')
  await page.getByLabel(/Phone Number/i).fill('(413) 555-0100')

  // Verify Next Step button is present (don't test form submission to avoid state issues)
  await expect(page.getByRole('button', { name: 'Next Step' })).toBeVisible()
})
