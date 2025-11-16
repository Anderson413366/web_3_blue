# Testing & Quality Assurance Documentation

## Overview

This document provides comprehensive testing and QA procedures for the Anderson Cleaning website.

## Table of Contents

1. [Running Tests Locally](#running-tests-locally)
2. [Playwright E2E Tests](#playwright-e2e-tests)
3. [Visual Regression Testing](#visual-regression-testing)
4. [Lighthouse Audits](#lighthouse-audits)
5. [Accessibility Testing](#accessibility-testing)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Performance Optimization](#performance-optimization)

---

## Running Tests Locally

### Prerequisites

```bash
cd anderson-cleaning
npm install
```

### Available Test Commands

```bash
# Run Playwright tests (headless)
npx playwright test

# Run Playwright tests (headed mode - see browser)
npm run test:headed

# Run Playwright tests (debug mode)
npm run test:debug

# Run visual regression tests
npm run test:visual

# Update visual regression snapshots
npm run test:visual:update

# Run Playwright UI mode
npm run test:visual:ui

# Show test report
npm run test:report

# Run type checking
npm run type-check

# Run linting
npm run lint

# Format code
npm run format
```

---

## Playwright E2E Tests

### Test Files

Located in `tests/e2e/`:

- **quote.spec.ts** - Quote form submission and validation
- **contact.spec.ts** - Contact form submission and validation
- Additional tests configured in CI/CD

### Running Playwright Tests

**Headless Mode (CI):**

```bash
npx playwright test
```

**Headed Mode (see browser):**

```bash
npm run test:headed
```

**Debug Mode (step through tests):**

```bash
npm run test:debug
```

**Interactive UI Mode:**

```bash
npm run test:visual:ui
```

### Playwright Configuration

Configuration is in `playwright.config.ts`:

- Tests run against `http://localhost:3000`
- Supports Chrome, Firefox, and WebKit browsers
- Screenshots captured on test failure
- Videos recorded for failing tests
- Parallel test execution enabled

### Example Test

```typescript
import { test, expect } from '@playwright/test'

test('should submit quote form successfully', async ({ page }) => {
  await page.goto('/quote')
  await page.fill('[name="name"]', 'Test User')
  await page.fill('[name="email"]', 'test@example.com')
  await page.click('button[type="submit"]')
  await expect(page.locator('.success-message')).toBeVisible()
})
```

---

## Visual Regression Testing

### Overview

Visual regression tests compare screenshots to detect unintended visual changes.

### Test Files

Located in `tests/visual-regression/`:

- Comprehensive layout parity tests
- Snapshot-based comparisons
- Multi-browser testing

### Running Visual Tests

```bash
# Run visual regression tests
npm run test:visual

# Update snapshots (when changes are intentional)
npm run test:visual:update

# Interactive UI mode
npm run test:visual:ui
```

### How It Works

1. Tests capture screenshots of pages/components
2. Compare against baseline snapshots
3. Flag differences as test failures
4. Update baselines when changes are intentional

---

## Lighthouse Audits

### Configuration

Lighthouse CI is configured in `lighthouserc.json` with the following targets:

- **Performance:** ≥ 90
- **Accessibility:** ≥ 95
- **Best Practices:** ≥ 90
- **SEO:** ≥ 95

### Running Lighthouse Locally

```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Build the project
npm run build

# Start production server
npm run start

# Run Lighthouse audit (in another terminal)
lhci autorun
```

### Metrics Monitored

- First Contentful Paint (FCP): < 2s
- Largest Contentful Paint (LCP): < 2.5s
- Cumulative Layout Shift (CLS): < 0.1
- Total Blocking Time (TBT): < 300ms
- Speed Index: < 3s

---

## Accessibility Testing

### Tools Used

1. **@axe-core/playwright** - Automated accessibility testing in Playwright
2. **Lighthouse CI** - Accessibility score ≥ 95
3. **Manual testing** - Screen readers (NVDA, JAWS, VoiceOver)

### Running Accessibility Tests

Accessibility tests are integrated into Playwright E2E tests:

```typescript
import { test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('should not have accessibility violations', async ({ page }) => {
  await page.goto('/')
  const results = await new AxeBuilder({ page }).analyze()
  expect(results.violations).toEqual([])
})
```

### WCAG 2.1 AA Compliance Checklist

- ✅ All images have alt text
- ✅ All form inputs have labels
- ✅ Color contrast ≥ 4.5:1
- ✅ Keyboard navigation works
- ✅ Focus indicators visible
- ✅ Skip to main content link
- ✅ Semantic HTML structure
- ✅ ARIA attributes where needed

---

## CI/CD Pipeline

### GitHub Actions Workflow

File: `.github/workflows/ci.yml`

### Pipeline Stages

1. **Build & Type Check**
   - Install dependencies (`npm ci`)
   - TypeScript compilation
   - ESLint checks
   - Next.js production build

2. **Playwright E2E Tests**
   - Install Playwright browsers
   - Run quote and contact form tests
   - Upload test results on failure

3. **Lighthouse CI**
   - Performance audits (≥90 score)
   - Accessibility audits (≥95 score)
   - SEO checks (≥95 score)
   - Best practices (≥90 score)

### Required Environment Variables

Set these in GitHub repository settings or Vercel:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=xxx
NEXT_PUBLIC_SANITY_DATASET=xxx
SANITY_API_TOKEN=xxx

# Email & Forms
RESEND_API_KEY=xxx

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=xxx

# See .env.example for complete list
```

### Branch Protection Rules

**Main Branch:**

- Require status checks to pass
- Require review before merging
- Require linear history

**Checks Required:**

- Build and Type Check
- Playwright E2E Tests
- Lighthouse Audit

---

## Performance Optimization

### Implemented Optimizations

1. **Image Optimization**
   - next/image for automatic optimization
   - WebP format with fallbacks
   - Lazy loading for below-fold images
   - Responsive images with srcset

2. **Script Optimization**
   - Lazy loading for heavy components
   - Dynamic imports for code splitting
   - Tree-shaking unused code

3. **CSS Optimization**
   - Tailwind CSS purging
   - Critical CSS inlined
   - Font loading optimization

4. **Lazy-Loaded Components**
   - Before/After Slider
   - Cookie Banner
   - Feedback Widget
   - Chat Widget

### Usage Example

```tsx
import { LazyBeforeAfterSlider } from '@/components/LazyLoad'

// Component will be loaded only when needed
;<LazyBeforeAfterSlider items={items} />
```

---

## Analytics Testing

### Google Tag Manager (GTM)

**GTM Container ID:** Set via `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`

### Events Tracked

1. **Page Views** - Automatic
2. **Form Submissions** - Quote, Contact, Careers
3. **CTA Clicks** - "Get a Quote", "Call Now"
4. **Scroll Depth** - 25%, 50%, 75%, 100%
5. **Outbound Links** - External link clicks
6. **Phone Clicks** - tel: link clicks
7. **Email Clicks** - mailto: link clicks

### Testing Analytics

**In Browser Console:**

```javascript
// Check if dataLayer exists
window.dataLayer

// Track test event
dataLayer.push({
  event: 'test_event',
  category: 'test',
  action: 'manual_test',
})
```

**In GTM Preview Mode:**

1. Open GTM container
2. Click "Preview"
3. Enter site URL
4. Test events in real-time

---

## Manual Testing Checklist

### Before Each Release

- [ ] All Playwright tests pass
- [ ] Lighthouse scores ≥ 90 (95 for accessibility)
- [ ] No console errors on any page
- [ ] Forms submit successfully
- [ ] Mobile responsive on all pages
- [ ] No horizontal scroll on mobile
- [ ] All images load correctly
- [ ] All links work (no 404s)
- [ ] GTM events fire correctly

### Cross-Browser Testing

Test on:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Performance Checklist

- [ ] FCP < 2s
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] TTI < 3.5s
- [ ] Bundle size optimized

---

## Troubleshooting

### Playwright Tests Failing

1. Clear Playwright cache: `npx playwright install --force`
2. Reinstall dependencies: `npm ci`
3. Check baseUrl in `playwright.config.ts`
4. Verify dev server is running on port 3000

### Lighthouse Scores Low

1. Run in incognito mode
2. Disable browser extensions
3. Test on stable network
4. Check for console errors
5. Ensure production build (`npm run build && npm start`)

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm ci`
3. Check TypeScript errors: `npm run type-check`
4. Run linting: `npm run lint`

---

## Resources

- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Axe Accessibility Testing](https://www.deque.com/axe/)

---

## Contact

For questions about testing or QA, contact the development team.
