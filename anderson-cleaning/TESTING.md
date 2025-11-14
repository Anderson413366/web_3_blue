# Testing & Quality Assurance Documentation

## Overview

This document provides comprehensive testing and QA procedures for the Anderson Cleaning website.

## Table of Contents

1. [Running Tests Locally](#running-tests-locally)
2. [Cypress E2E Tests](#cypress-e2e-tests)
3. [Lighthouse Audits](#lighthouse-audits)
4. [Accessibility Testing](#accessibility-testing)
5. [CI/CD Pipeline](#cicd-pipeline)
6. [Performance Optimization](#performance-optimization)

---

## Running Tests Locally

### Prerequisites

```bash
cd anderson-cleaning
npm install
```

### Available Test Commands

```bash
# Run Cypress tests (interactive)
npm run cypress:open

# Run Cypress tests (headless)
npm run cypress:run

# Run Lighthouse audit
npm run lighthouse

# Run type checking
npm run type-check

# Run linting
npm run lint

# Run all tests
npm run test:all
```

---

## Cypress E2E Tests

### Test Files

Located in `cypress/e2e/`:

- **navigation.cy.ts** - Header, footer, routing tests
- **forms.cy.ts** - Contact form, quote form validation
- **accessibility.cy.ts** - WCAG compliance, dark mode, keyboard navigation

### Running Cypress Tests

**Interactive Mode (with UI):**
```bash
npm run cypress:open
```

**Headless Mode (CI):**
```bash
npm run cypress:run
```

### Custom Commands

Defined in `cypress/support/commands.ts`:

- `cy.checkA11y()` - Run axe accessibility tests
- `cy.testKeyboardNav()` - Test keyboard navigation
- `cy.toggleDarkMode()` - Toggle dark/light theme
- `cy.checkBrokenLinks()` - Check for broken links

### Example Test

```typescript
describe('Navigation', () => {
  it('should navigate to contact page', () => {
    cy.visit('/')
    cy.contains('Contact').click()
    cy.url().should('include', '/contact')
  })
})
```

---

## Lighthouse Audits

### Configuration

Lighthouse CI is configured in `lighthouserc.js` with the following targets:

- **Performance:** ≥ 90
- **Accessibility:** ≥ 90
- **Best Practices:** ≥ 90
- **SEO:** ≥ 90

### Running Lighthouse Locally

```bash
# Install Lighthouse CI globally
npm install -g @lhci/cli

# Build the project
npm run build

# Run Lighthouse audit
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

1. **axe-core** - Automated accessibility testing
2. **Cypress** - Interactive testing
3. **Manual testing** - Screen readers (NVDA, JAWS, VoiceOver)

### Running Accessibility Tests

```bash
# Start dev server
npm run dev

# Run axe tests
npx @axe-core/cli http://localhost:3000
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

File: `.github/workflows/ci-cd.yml`

### Pipeline Stages

1. **Build & Type Check**
   - Install dependencies
   - TypeScript compilation
   - ESLint checks
   - Next.js build

2. **Cypress E2E Tests**
   - Run all Cypress tests
   - Upload screenshots on failure

3. **Lighthouse CI**
   - Performance audits
   - Accessibility audits
   - SEO checks

4. **Accessibility Tests**
   - axe-core automated tests

5. **Deploy**
   - Production deploy (main branch)
   - Preview deploy (pull requests)

### Required Secrets

Set these in GitHub repository settings:

```env
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
LHCI_GITHUB_APP_TOKEN=xxx (optional)
```

### Branch Protection Rules

**Main Branch:**
- Require status checks to pass
- Require review before merging
- Require linear history

**Checks Required:**
- Build and Test
- Cypress Tests
- Lighthouse Audit
- Accessibility Audit

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
<LazyBeforeAfterSlider items={items} />
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
  action: 'manual_test'
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

- [ ] All Cypress tests pass
- [ ] Lighthouse scores ≥ 90
- [ ] No console errors on any page
- [ ] Forms submit successfully
- [ ] Dark mode works correctly
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

### Cypress Tests Failing

1. Clear cache: `npm run cypress:cache:clear`
2. Reinstall: `npm ci`
3. Check baseUrl in `cypress.config.ts`

### Lighthouse Scores Low

1. Run in incognito mode
2. Disable browser extensions
3. Test on stable network
4. Check for console errors

### Build Errors

1. Clear `.next` folder: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm ci`
3. Check TypeScript errors: `npm run type-check`

---

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Contact

For questions about testing or QA, contact the development team.
