import baseConfig from './playwright.config'
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  ...baseConfig,
  testDir: './tests/a11y',
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  projects: [
    {
      name: 'chromium-accessibility',
      use: {
        ...devices['Desktop Chrome'],
        bypassCSP: true, // Allow axe-core injection for testing
      },
    },
  ],
})
