# Testing & Quality Assurance Documentation

## Overview

This document provides comprehensive testing and QA procedures for the Anderson Cleaning website.

## Table of Contents

1. [Running Tests Locally](#running-tests-locally)
2. [Unit Tests (Vitest)](#unit-tests-vitest)
3. [Playwright E2E Tests](#playwright-e2e-tests)
4. [Visual Regression Testing (VRT)](#visual-regression-testing-vrt)
5. [Cookie Consent & Privacy Compliance](#cookie-consent--privacy-compliance)
6. [Error Tracking & Monitoring (Sentry)](#error-tracking--monitoring-sentry)
7. [Cypress E2E Tests](#cypress-e2e-tests)
8. [Lighthouse Audits](#lighthouse-audits)
9. [Accessibility Testing](#accessibility-testing)
10. [CI/CD Pipeline](#cicd-pipeline)
11. [Performance Optimization](#performance-optimization)
12. [Link Integrity Crawler](#link-integrity-crawler)
13. [Progressive Web App (PWA) Testing](#progressive-web-app-pwa-testing)

---

## Running Tests Locally

### Prerequisites

```bash
cd anderson-cleaning
npm install
```

### Available Test Commands

```bash
# Unit tests (Vitest)
npm test                            # Run all unit tests in watch mode
npm run test:ui                     # Run with interactive UI
npm run test:coverage               # Run with coverage report

# Playwright E2E tests
npm run test:e2e                    # Run all Playwright tests
npm run test:e2e:ui                 # Run with interactive UI
npm run test:e2e:snapshots          # Run visual regression tests only
npm run test:e2e:pwa                # Run PWA tests only
npm run test:e2e:update             # Update all snapshots
npm run test:e2e:snapshots:update   # Update VRT snapshots only

# Cypress tests (legacy)
npm run cypress:open                # Run Cypress tests (interactive)
npm run cypress:run                 # Run Cypress tests (headless)

# Lighthouse audit
npm run lighthouse

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## Unit Tests (Vitest)

### Overview

Vitest is our unit testing framework for TypeScript/JavaScript code. It provides:
- Fast test execution with watch mode
- TypeScript support out of the box
- Coverage reporting with V8
- Interactive UI for test debugging
- Compatible with Jest API

### Test Files

Unit tests are located alongside the code they test:

```
lib/
  sentry/
    pii-scrubber.ts
    __tests__/
      pii-scrubber.test.ts
```

### Running Unit Tests

**Watch mode (recommended for development):**
```bash
npm test
```

**Run once:**
```bash
npm test -- --run
```

**Interactive UI:**
```bash
npm run test:ui
```

**With coverage:**
```bash
npm run test:coverage
```

Coverage reports are generated in `coverage/` directory.

### Writing Unit Tests

**Example test structure:**

```typescript
import { describe, it, expect } from 'vitest'
import { scrubPII } from '../pii-scrubber'

describe('scrubPII', () => {
  it('should remove email addresses', () => {
    const event = {
      user: { email: 'user@example.com' }
    }

    const result = scrubPII(event)

    expect(result.user?.email).not.toContain('@example.com')
  })
})
```

### Test Coverage Requirements

We aim for:
- **80%+ overall coverage**
- **100% coverage for critical utilities** (e.g., PII scrubbing, consent management)
- **90%+ coverage for business logic**

Check coverage with:
```bash
npm run test:coverage
```

### Best Practices

1. **Test file naming:** `*.test.ts` or place in `__tests__/` directory
2. **Describe blocks:** Group related tests logically
3. **It blocks:** Clear, descriptive test names
4. **AAA pattern:** Arrange, Act, Assert
5. **Mock external dependencies:** Use `vi.mock()` for APIs, databases, etc.

---

## Playwright E2E Tests

### Overview

Playwright is our primary E2E testing framework. It provides:
- Cross-browser testing (Chromium, Firefox, WebKit)
- Mobile viewport testing
- Visual regression testing (VRT)
- Screenshot comparison
- Trace viewer for debugging

### Test Files

Located in `tests/e2e/`:

- **home.spec.ts** - Homepage functionality tests
- **accessibility.spec.ts** - WCAG compliance tests
- **apply.spec.ts** - Apply/Careers page tests
- **apply-header.spec.ts** - Duplicate header detection tests
- **snapshots.spec.ts** - Visual regression tests (VRT)

### Running Playwright Tests

**All E2E Tests:**
```bash
npm run test:e2e
```

**Interactive UI Mode (Recommended for Development):**
```bash
npm run test:e2e:ui
```

**Visual Regression Tests Only:**
```bash
npm run test:e2e:snapshots
```

**Specific Test File:**
```bash
npx playwright test tests/e2e/home.spec.ts
```

**Specific Browser:**
```bash
npx playwright test --project=chromium
```

### Configuration

Playwright is configured in `playwright.config.ts`:

- **Base URL**: `http://localhost:3000`
- **Test timeout**: 30 seconds
- **Retries**: 2 on CI, 0 locally
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari
- **Web server**: Auto-starts `npm run dev`

---

## Visual Regression Testing (VRT)

### What is Visual Regression Testing?

Visual regression testing captures full-page screenshots and compares them to baseline images. If pixels differ beyond a threshold, the test fails, catching unintended visual changes.

### Routes Tested

The snapshot tests (`snapshots.spec.ts`) cover these key routes:

- `/` (Home)
- `/services`
- `/industries`
- `/about`
- `/apply`
- `/contact`
- `/faq`

### Viewports Tested

Each route is tested at 3 viewport sizes:

| Viewport | Size | Description |
|----------|------|-------------|
| Mobile | 360×800 | Smartphone |
| Tablet | 768×1024 | Tablet |
| Desktop | 1366×768 | Laptop/Desktop |

**Total snapshots**: 7 routes × 3 viewports = **21 snapshots per browser**

### Layout Parity Assertions

For each route × viewport combination, we automatically assert:

1. ✅ **Exactly 1 header and 1 footer** (no duplicates)
2. ✅ **Consistent container max-width** (`.container` CSS class)
3. ✅ **No horizontal scrollbars** (responsive design check)
4. ✅ **No console errors** (JavaScript health check)

### Cross-Route Consistency Checks

We also verify:
- Header height is consistent across all routes (±5px tolerance)
- Footer structure has the same number of links
- Theme colors are consistent (header background)

### Running Snapshot Tests

**Run snapshot tests:**
```bash
npm run test:e2e:snapshots
```

**View test report (shows visual diffs):**
```bash
npx playwright show-report
```

### Updating Snapshots

⚠️ **Only update snapshots after reviewing the visual diffs!**

**When to update:**
- You've made intentional design changes (colors, fonts, spacing)
- You've updated component layouts
- You've modified responsive breakpoints

**How to update:**

1. **Run tests to see failures:**
   ```bash
   npm run test:e2e:snapshots
   ```

2. **Review visual diffs:**
   ```bash
   npx playwright show-report
   ```
   Opens an HTML report showing Expected vs Actual screenshots.

3. **Update snapshots if changes are correct:**
   ```bash
   npm run test:e2e:snapshots:update
   ```

4. **Commit updated snapshots:**
   ```bash
   git add tests/e2e/__snapshots__
   git commit -m "test(vrt): update visual snapshots after design changes"
   git push
   ```

### Snapshot Storage

Snapshots are stored in `tests/e2e/__snapshots__/` with naming:

```
{route-name}-{viewport-name}.png
```

Examples:
- `home-mobile.png`
- `services-desktop.png`
- `apply-tablet.png`

These files are committed to Git so CI can compare against the baseline.

### Handling Snapshot Failures in CI

If the GitHub Actions workflow fails due to snapshot mismatches:

1. **Download artifacts**: Go to Actions → Failed run → Artifacts → `snapshot-diff`
2. **Review locally**: Run `npm run test:e2e:snapshots` to reproduce
3. **Update if correct**: Run `npm run test:e2e:snapshots:update`
4. **Commit and push**: The updated snapshots will make CI pass

The CI will automatically comment on your PR with update instructions if snapshots fail.

### Troubleshooting Snapshots

**Flaky snapshots (random failures):**
- Disable animations: Already configured in `snapshots.spec.ts`
- Mask dynamic content: Add `data-testid="dynamic-content"` to changing elements
- Increase wait time: Already set to 500ms after page load

**Font rendering differences:**
- CI uses Ubuntu (Linux), which may render fonts differently than macOS/Windows
- Solution: Commit snapshots generated on CI, or increase `threshold` to 0.3

**Threshold too strict:**
- Edit `tests/e2e/snapshots.spec.ts`:
  ```ts
  threshold: 0.3, // Increase from 0.2
  ```

---

## Cookie Consent & Privacy Compliance

### Overview

The site implements **Google Consent Mode v2** for GDPR, CCPA, and privacy law compliance. This ensures analytics and advertising tracking only occurs after explicit user consent.

### What is Consent Mode v2?

Google Consent Mode v2 is a framework that:
- Sets default consent states to "denied" before tags load
- Updates consent states when users make choices
- Allows tags (GA4, GTM, Ads) to adjust behavior based on consent
- Enables privacy-safe measurement through modeling when consent is denied

### Implementation

#### **Consent Defaults (lib/consent.ts)**

Before GTM loads, we push consent defaults to dataLayer:

```javascript
window.dataLayer = window.dataLayer || []
window.dataLayer.push({
  event: 'consent_default',
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  functionality_storage: 'granted', // Essential
  security_storage: 'granted' // Essential
})
```

#### **Consent Updates**

When users click "Accept All" or "Decline":

```javascript
window.dataLayer.push({
  event: 'consent_update',
  analytics_storage: 'granted', // or 'denied'
  ad_storage: 'granted', // or 'denied'
  ad_user_data: 'granted', // or 'denied'
  ad_personalization: 'granted' // or 'denied'
})
```

### Cookie Banner Actions

| Action | Effect | Consent State | Persisted |
|--------|--------|---------------|-----------|
| **Accept All** | Grants all consent | All `'granted'` | ✅ Yes (localStorage) |
| **Decline** | Denies all non-essential consent | All `'denied'` | ✅ Yes (localStorage) |
| **Dismiss** | Closes banner without choice | Defaults (`'denied'`) | ❌ No (defaults remain) |

### Consent Storage

Consent preferences are stored in `localStorage`:

**Key:** `cookie-consent-v2`

**Value:**
```json
{
  "choice": "accepted" | "declined" | "custom",
  "timestamp": "2025-01-15T12:34:56.789Z",
  "state": {
    "analytics_storage": "granted",
    "ad_storage": "granted",
    "ad_user_data": "granted",
    "ad_personalization": "granted",
    "functionality_storage": "granted",
    "personalization_storage": "granted",
    "security_storage": "granted"
  }
}
```

### Tracking Helper (lib/track.ts)

The `track` helper queues analytics events until consent is granted:

```typescript
import { track } from '@/lib/track'

// Events are queued if consent not granted
track.event('button_click', { button_name: 'cta' })
track.pageview('/about', 'About Us')
track.formSubmit('contact_form')
track.phoneClick('1-800-555-0123')
```

**Features:**
- ✅ Queues events until consent granted
- ✅ Flushes queue when consent received
- ✅ Clears queue if consent revoked
- ✅ Listens for `consentchange` events

### Testing Consent

**Run consent tests:**
```bash
npm run test:e2e tests/e2e/consent.spec.ts
```

**Test Coverage:**

| Test | Description |
|------|-------------|
| Cookie banner shows on first visit | Banner appears after 1s delay |
| Banner doesn't show if consent given | Respects stored consent |
| No GA requests until consent | Analytics blocked by default |
| Accept All enables analytics | Consent update pushed to GTM |
| Decline keeps analytics denied | Defaults remain denied |
| Dismiss closes without storing | No localStorage persistence |
| Consent persists across pages | Works after navigation |
| Consent defaults set before GTM | `consent_default` pushed first |
| Privacy policy link works | Links to `/legal/privacy-policy` |
| Events are queued until consent | Track helper queues events |

### Consent API

#### **Check Consent Status**

```typescript
import {
  hasAnalyticsConsent,
  hasAdConsent,
  hasConsentChoice,
  getStoredConsent
} from '@/lib/consent'

if (hasAnalyticsConsent()) {
  // Analytics is allowed
}

if (hasConsentChoice()) {
  // User has made a choice (don't show banner)
}

const consent = getStoredConsent()
console.log(consent?.choice) // 'accepted' | 'declined' | 'custom'
```

#### **Update Consent**

```typescript
import { acceptAllConsent, declineAllConsent, updateConsent } from '@/lib/consent'

// Accept all
acceptAllConsent()

// Decline all
declineAllConsent()

// Custom consent state
updateConsent({
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
})
```

#### **Listen for Consent Changes**

```typescript
window.addEventListener('consentchange', (event: CustomEvent) => {
  console.log('Consent changed:', event.detail)
  // event.detail = { analytics_storage: 'granted', ... }
})
```

### GTM Configuration

In GTM, configure triggers based on consent:

**Analytics Trigger:**
```
Trigger Type: Consent Initialization - All Pages
Consent Settings: Require analytics_storage = granted
```

**Custom Event Trigger:**
```
Event Name: consent_update
Condition: analytics_storage = granted
```

### Privacy Policy

Ensure your privacy policy (`/legal/privacy-policy`) includes:
- What cookies are used
- Why you use cookies (analytics, ads, functionality)
- How users can control cookies
- Third-party cookies (Google Analytics, GTM)
- Data retention policies
- User rights (GDPR, CCPA)

### Best Practices

1. **Always set defaults before GTM loads:**
   - Done automatically in `GoogleTagManager` component

2. **Store consent preferences:**
   - Use `localStorage` with versioned key (`cookie-consent-v2`)
   - Include timestamp for audit trail

3. **Respect user choices:**
   - Don't auto-accept after banner dismissal
   - Keep defaults as "denied"

4. **Test thoroughly:**
   - Use Playwright tests to verify consent flow
   - Check network requests (no GA until consent)

5. **Update privacy policy:**
   - Keep it current with actual cookie usage
   - Link to it prominently in banner

### Compliance Checklist

- [x] Consent defaults set to "denied" before tags load
- [x] User can accept or decline all cookies
- [x] User can dismiss without choosing (defaults remain)
- [x] Consent choice is stored and persists
- [x] No tracking occurs until consent granted
- [x] Privacy policy link provided
- [x] Consent can be revoked (future: preference center)
- [x] Automated tests verify consent flow

### Future Enhancements

- **Preference Center:** Allow granular consent per category
- **Consent Expiration:** Auto-expire consent after 12 months
- **Regional Defaults:** Auto-deny in EU/CA, auto-grant elsewhere
- **Consent History:** Track consent changes over time
- **Cookie Declaration:** Auto-generate list of all cookies

---

## Error Tracking & Monitoring (Sentry)

### Overview

Sentry provides real-time error tracking and performance monitoring for both server and client-side code. Our implementation prioritizes:

- **Privacy compliance** (GDPR, CCPA) with comprehensive PII scrubbing
- **Server-only initialization** to minimize client bundle size
- **Environment-driven configuration** for flexible deployment
- **Slack alerts** for critical errors
- **Release tracking** with git commit SHAs

### Architecture

We use three separate Sentry configurations:

1. **sentry.server.config.ts** - Node.js server errors (API routes, SSR)
2. **sentry.edge.config.ts** - Edge runtime errors (middleware)
3. **sentry.client.config.ts** - Browser errors (client-side)

### Configuration

#### Environment Variables

Add these to your `.env` or Vercel environment:

```bash
# Server-side DSN (private, not exposed to client)
SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Client-side DSN (public, exposed to browser)
NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx

# Dynamic sample rates (0.0 to 1.0)
SENTRY_TRACES_SAMPLE_RATE=0.1                      # Server: 10% sampling
NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE=0.1          # Client: 10% sampling

# Slack webhook for critical error alerts (optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx

# Build-time authentication (for source maps)
SENTRY_AUTH_TOKEN=sntrys_xxx
SENTRY_ORG=anderson-cleaning
SENTRY_PROJECT=anderson-cleaning-website
```

#### Sample Rate Recommendations

| Environment | Server | Edge | Client | Reasoning |
|-------------|--------|------|--------|-----------|
| Production  | 0.1 (10%) | 0.01 (1%) | 0.1 (10%) | Reduce costs, edge has high volume |
| Preview     | 0.5 (50%) | 0.1 (10%) | 0.5 (50%) | More debugging during testing |
| Development | 1.0 (100%) | 0.2 (20%) | 1.0 (100%) | Full error visibility |

Adjust these based on your traffic and Sentry quota.

### PII Scrubbing

All PII (Personally Identifiable Information) is automatically scrubbed before sending to Sentry:

#### What Gets Scrubbed

**Automatically removed fields:**
- Email addresses (partially redacted: `jo***@example.com`)
- Phone numbers (last 4 digits kept: `***-***-4567`)
- Names (first, last, full name)
- Addresses (street, city, state, zip, country)
- Passwords and authentication tokens
- API keys and secrets
- Credit card numbers and financial data
- IP addresses

**Automatically redacted:**
- Request cookies
- Authorization headers
- Sensitive query parameters (`?email=`, `?phone=`, `?token=`)

#### Implementation

PII scrubbing is handled by `lib/sentry/pii-scrubber.ts`:

```typescript
import { scrubPII } from '@/lib/sentry/pii-scrubber'

// Used in beforeSend hooks
beforeSend(event, hint) {
  const scrubbedEvent = scrubPII(event, hint)
  return scrubbedEvent
}
```

#### Testing PII Scrubbing

Run unit tests to verify scrubbing:

```bash
npm test lib/sentry/__tests__/pii-scrubber.test.ts
```

Tests cover:
- Email redaction in event data
- Phone number masking
- Header scrubbing (Authorization, Cookie)
- Query parameter redaction
- Nested object scrubbing
- Exception message sanitization

### Slack Alerts

Critical errors (level: `error` or `fatal`) automatically send Slack notifications:

**Setup:**

1. Create a Slack webhook URL: https://api.slack.com/messaging/webhooks
2. Add to environment:
   ```bash
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/T.../B.../xxx
   ```

**Alert Format:**

```
🚨 Error

Error: Failed to process payment
Environment: production
Level: error
Release: anderson-cleaning@a1b2c3d
User: user123
URL: https://andersoncleaning.com/api/checkout

Event ID: abc123def456
```

**Deduplication:**

Alerts are deduplicated per-session to prevent spam. Only the first occurrence of each error is sent to Slack.

### Release Tagging

Errors are automatically tagged with git commit SHAs for tracking:

**Vercel (automatic):**
```bash
# Uses VERCEL_GIT_COMMIT_SHA from Vercel environment
# Format: anderson-cleaning@a1b2c3d
```

**Manual/Local:**
```bash
export VERCEL_GIT_COMMIT_SHA=$(git rev-parse HEAD)
```

This allows you to:
- Track which deployment introduced an error
- Correlate errors with code changes
- Filter issues by release in Sentry dashboard

### Environment Tagging

Errors are tagged with deployment environment:

- **production** - Live site
- **preview** - Vercel preview deployments
- **development** - Local development

**Vercel (automatic):**
Uses `VERCEL_ENV` environment variable.

**Manual:**
```bash
export VERCEL_ENV=production
```

### Testing Error Tracking

#### Trigger Test Errors

**Server-side (API route):**

Create a test API route that throws an error:

```typescript
// app/api/test-sentry/route.ts
export async function GET() {
  throw new Error('Test Sentry server error')
}
```

Visit: `http://localhost:3000/api/test-sentry`

**Client-side (button click):**

```typescript
<button onClick={() => {
  throw new Error('Test Sentry client error')
}}>
  Trigger Error
</button>
```

#### Verify in Sentry

1. Go to https://sentry.io
2. Select your project
3. Check "Issues" tab for new errors
4. Verify:
   - PII is scrubbed (no emails, phones, tokens visible)
   - Release tag is present (`anderson-cleaning@xxx`)
   - Environment is correct (`production`, `preview`, etc.)
   - Stack trace is readable (source maps working)

### Source Maps

Source maps are automatically uploaded during `next build` via Sentry's Next.js plugin.

**Verify source maps:**

1. Trigger an error
2. Open error in Sentry
3. Check stack trace shows original TypeScript/JSX code (not minified)

**Troubleshooting:**

If stack traces show minified code:

```bash
# Ensure auth token is set
echo $SENTRY_AUTH_TOKEN

# Re-build with source maps
npm run build

# Check for source map uploads in build output
# Look for: "Sentry: Uploaded X source maps"
```

### Performance Monitoring

Sentry tracks:
- Page load times
- API response times
- Database query performance
- Third-party API calls

**View performance:**

1. Go to Sentry dashboard
2. Click "Performance" tab
3. See slowest transactions
4. Identify bottlenecks

**Sample rates** control how much performance data is collected (see Configuration above).

### Ignoring Errors

Some errors are expected and should not be tracked. These are automatically ignored:

**Server:**
- Database connection errors (`ECONNREFUSED`, `ETIMEDOUT`)
- Rate limit errors (`Too Many Requests`)
- Client aborted requests (`ECONNRESET`)
- Next.js navigation errors (`NEXT_NOT_FOUND`, `NEXT_REDIRECT`)

**Client:**
- Browser extension errors (`chrome-extension://`)
- Network errors (`Failed to fetch`)
- ResizeObserver errors (benign)
- AbortController errors (user navigated away)

**Add more ignored errors:**

Edit `sentry.*.config.ts`:

```typescript
ignoreErrors: [
  // Add custom patterns
  'My expected error pattern',
  /regex-pattern/i,
],
```

### Best Practices

1. **Never log PII:** Even before Sentry, avoid logging sensitive data
2. **Use structured errors:** Provide context without exposing secrets
3. **Test scrubbing:** Run `npm test` to verify PII is removed
4. **Monitor quota:** Check Sentry usage regularly to avoid overages
5. **Set up alerts:** Configure Sentry alerts for critical errors
6. **Review issues weekly:** Triage and fix errors proactively
7. **Tag releases:** Always deploy with proper release tagging

### Troubleshooting

**Errors not appearing in Sentry:**

```bash
# Check DSN is configured
echo $SENTRY_DSN
echo $NEXT_PUBLIC_SENTRY_DSN

# Check sample rate (1.0 = 100% of errors)
echo $SENTRY_TRACES_SAMPLE_RATE

# Enable debug mode (add to sentry.*.config.ts)
debug: true

# Check console for Sentry logs
```

**PII leaking through:**

```bash
# Run unit tests to verify scrubbing
npm test lib/sentry/__tests__/pii-scrubber.test.ts

# Check event in Sentry dashboard
# If PII visible, add pattern to pii-scrubber.ts
```

**Slack alerts not working:**

```bash
# Verify webhook URL is set
echo $SLACK_WEBHOOK_URL

# Test webhook manually
curl -X POST $SLACK_WEBHOOK_URL \
  -H 'Content-Type: application/json' \
  -d '{"text":"Test from Anderson Cleaning"}'

# Check Sentry error level (must be "error" or "fatal")
```

**High quota usage:**

```bash
# Reduce sample rates
SENTRY_TRACES_SAMPLE_RATE=0.05  # 5% instead of 10%

# Add more ignored errors (see Ignoring Errors above)

# Filter noisy errors in Sentry dashboard → Settings → Inbound Filters
```

### Compliance Checklist

- [x] PII is scrubbed before sending to Sentry
- [x] IP addresses are removed from events
- [x] Emails are partially redacted (jo***@example.com)
- [x] Phone numbers show only last 4 digits
- [x] Authentication tokens are filtered
- [x] Query parameters with sensitive data are redacted
- [x] Request cookies are removed
- [x] Unit tests verify PII scrubbing
- [x] Server-only DSN prevents client exposure
- [x] Sample rates reduce data collection

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

## Link Integrity Crawler

### What is Link Integrity Testing?

The link integrity crawler checks deployed sites (preview or production) for broken internal links. It crawls all internal pages up to a configurable depth and reports any links returning 3xx/4xx/5xx status codes.

### Why Link Integrity Matters

- Prevents **404 errors** from broken navigation
- Catches **redirect chains** (3xx) that slow down user experience
- Detects **server errors** (5xx) before users encounter them
- Ensures **consistent navigation** across all pages
- Prevents **link rot** as the site evolves

### How It Works

The crawler:
1. Starts from a base URL (deployment URL)
2. Extracts all internal links from each page (same hostname only)
3. Follows links up to depth 3 (configurable)
4. Records HTTP status codes for each URL
5. Fails if any internal link returns 3xx/4xx/5xx

**Excluded from crawling:**
- External links (different hostname)
- `mailto:` links
- `tel:` links
- `javascript:` links
- Fragment-only links (`#section`)

### Running Locally

**Against local dev server:**
```bash
# Start dev server
npm run dev

# In another terminal
DEPLOY_URL=http://localhost:3000 npm run crawl:prod
```

**Against a deployed preview:**
```bash
DEPLOY_URL=https://your-preview.vercel.app npm run crawl:prod
```

**Against production:**
```bash
DEPLOY_URL=https://andersoncleaning.com npm run crawl:prod
```

### Configuration

Environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `DEPLOY_URL` | Base URL to crawl | *Required* |
| `MAX_DEPTH` | Maximum crawl depth | 3 |
| `MAX_PAGES` | Maximum pages to crawl | 100 |

**Example with custom settings:**
```bash
DEPLOY_URL=http://localhost:3000 MAX_DEPTH=2 MAX_PAGES=50 npm run crawl:prod
```

### Output Examples

**Success (no broken links):**
```
================================================================================
📊 CRAWL STATISTICS
================================================================================
Total pages crawled: 47
✅ Success (2xx):     47
↪️  Redirects (3xx):   0
❌ Client errors (4xx): 0
🔥 Server errors (5xx): 0
⏭️  Skipped:           0

================================================================================
✅ SUCCESS: Internal link integrity OK
================================================================================
```

**Failure (broken links detected):**
```
================================================================================
📊 CRAWL STATISTICS
================================================================================
Total pages crawled: 52
✅ Success (2xx):     50
↪️  Redirects (3xx):   0
❌ Client errors (4xx): 2
🔥 Server errors (5xx): 0
⏭️  Skipped:           0

================================================================================
❌ BROKEN LINKS DETECTED
================================================================================

404 - Not Found (2 URLs)
--------------------------------------------------------------------------------
  URL:      https://example.com/old-page
  Referrer: https://example.com/about
  Depth:    1

  URL:      https://example.com/missing-image.jpg
  Referrer: https://example.com/services
  Depth:    2

================================================================================

❌ FAIL: 2 broken internal link(s) found
```

### CI/CD Integration

The link integrity check can be triggered manually via GitHub Actions:

**Workflow: `.github/workflows/link-integrity.yml`**

#### Manual Trigger

1. Go to GitHub Actions → Link Integrity Check
2. Click "Run workflow"
3. Enter deployment URL (e.g., `https://your-preview.vercel.app`)
4. Click "Run workflow"

The crawler will:
- Crawl all internal links
- Report broken links in the workflow logs
- Comment on PR if triggered from a PR
- Fail the workflow if broken links are found

#### After Vercel Deployment

When Vercel creates a preview deployment:

1. Get the preview URL from Vercel comment
2. Manually trigger the Link Integrity workflow
3. Enter the preview URL
4. Review results before merging

**Future enhancement:** Automate this with Vercel deployment webhooks.

### Fixing Broken Links

Common broken link issues and fixes:

#### 404 - Page Not Found

**Cause:** Link points to non-existent page

**Fix:**
- Update the link to the correct URL
- Create the missing page
- Add a redirect in `next.config.js`

#### 301/302 - Redirects

**Cause:** Link goes through one or more redirects

**Fix:**
- Update link to point directly to final destination
- Avoid redirect chains (A → B → C)
- Use canonical URLs

#### 500 - Server Error

**Cause:** Page crashes or has runtime errors

**Fix:**
- Check server logs for errors
- Fix the page component
- Verify API endpoints work

#### Case-Sensitive URLs

**Cause:** `/About` vs `/about` treated as different URLs

**Fix:**
- Standardize all links to lowercase
- Ensure Next.js routing uses consistent casing

### Best Practices

1. **Run locally before pushing:**
   ```bash
   DEPLOY_URL=http://localhost:3000 npm run crawl:prod
   ```

2. **Test preview deployments:**
   - Always run crawler on Vercel preview before merging
   - Fix broken links found during review

3. **Add to PR checklist:**
   - [ ] No broken internal links (run crawler)
   - [ ] All redirects necessary and working
   - [ ] No 404s from navigation

4. **Monitor production regularly:**
   - Schedule weekly crawls of production
   - Set up alerts for broken links
   - Track link health over time

### Limitations

- **JavaScript-rendered links:** May miss links added by client-side JS
- **Dynamic routes:** May not crawl all possible parameter combinations
- **Authentication:** Cannot crawl authenticated pages
- **External links:** Not checked (only internal same-host links)

For comprehensive link checking including external links, consider tools like:
- [Broken Link Checker](https://github.com/stevenvachon/broken-link-checker)
- [linkinator](https://github.com/JustinBeckwith/linkinator)
- [lychee](https://github.com/lycheeverse/lychee)

---

## Progressive Web App (PWA) Testing

### What is PWA Testing?

PWA testing ensures that the website meets Progressive Web App standards, providing an app-like experience with offline support, installability, and optimal performance on mobile devices.

### Why PWA Testing Matters

- **Offline Support**: Users can access cached content when offline
- **Installability**: Website can be installed to home screen like a native app
- **Performance**: Faster load times through service worker caching
- **Engagement**: Push notifications and app shortcuts improve user engagement
- **SEO**: PWAs rank better in search results
- **Mobile Experience**: App-like experience without app store distribution

### PWA Features Implemented

Our PWA implementation includes:

1. **Service Worker**: Automatically generated by next-pwa
   - Caches static assets (.next/static, public/)
   - Network-first strategy for dynamic content
   - Offline fallback page
   - Excludes /api/** from aggressive caching

2. **Web App Manifest**: `/public/manifest.json`
   - Name, icons, theme colors
   - App shortcuts (Quote, Contact, Services)
   - Standalone display mode
   - Portrait orientation preference

3. **Offline Fallback**: `/offline` page
   - Accessible when network is unavailable
   - "Try Again" and "Go Home" actions
   - Friendly offline messaging

4. **Icons**: Multiple sizes for different devices
   - SVG icons for scalability
   - PNG fallbacks (180x180, 192x192, 512x512)
   - Apple touch icon
   - Maskable icons for Android

### Running PWA Tests

**Run all PWA tests:**
```bash
npm run test:e2e:pwa
```

**Run specific test suites:**
```bash
# PWA functionality tests
npx playwright test tests/e2e/pwa.spec.ts -g "PWA Functionality"

# PWA installability tests
npx playwright test tests/e2e/pwa.spec.ts -g "PWA Installability"
```

**Run with UI mode for debugging:**
```bash
npx playwright test tests/e2e/pwa.spec.ts --ui
```

### PWA Test Coverage

Our PWA test suite (`tests/e2e/pwa.spec.ts`) validates:

#### Manifest Tests
- ✅ Manifest is accessible at `/manifest.json`
- ✅ Manifest has required fields (name, icons, theme_color, etc.)
- ✅ Icons include required sizes (192x192, 512x512)
- ✅ Manifest has valid JSON structure
- ✅ App shortcuts are properly configured

#### Service Worker Tests
- ✅ Service worker registers in production
- ✅ Static assets have proper cache headers
- ✅ SW is disabled in development mode

#### Offline Support Tests
- ✅ Offline page is accessible at `/offline`
- ✅ Offline page has proper content and UI
- ✅ "Try Again" button works
- ✅ "Go Home" link works
- ✅ Offline page has noindex robots meta

#### Installability Tests
- ✅ Theme color meta tag exists
- ✅ Apple touch icon is configured
- ✅ Viewport meta tag exists (required for PWA)
- ✅ Display mode is standalone/fullscreen/minimal-ui
- ✅ HTTPS or localhost (security requirement)

### Manual PWA Testing

#### Test Installability (Chrome/Edge)

1. **Build and run production mode:**
   ```bash
   npm run build
   npm start
   ```

2. **Open in Chrome/Edge:**
   - Navigate to `http://localhost:3000`
   - Open DevTools → Application → Manifest
   - Verify manifest loads correctly

3. **Test install prompt:**
   - Look for install icon in address bar
   - Click install
   - Verify app installs to desktop/home screen

4. **Check service worker:**
   - DevTools → Application → Service Workers
   - Verify SW is activated and running
   - Check Cache Storage for cached assets

#### Test Offline Functionality

1. **Cache the site:**
   - Visit homepage and key pages
   - Wait for service worker to cache assets

2. **Go offline:**
   - DevTools → Network → Enable "Offline"
   - Or use system network settings

3. **Test offline behavior:**
   - Reload homepage (should load from cache)
   - Navigate to uncached page (should show /offline)
   - Verify offline page UI and functionality

4. **Go back online:**
   - Disable offline mode
   - Click "Try Again" on offline page
   - Verify site works normally

#### Test on Mobile Device

1. **Deploy to preview/production:**
   ```bash
   git push origin feature-branch
   # Wait for Vercel deployment
   ```

2. **Visit on mobile (Android/iOS):**
   - Open in Chrome (Android) or Safari (iOS)
   - Look for install prompt

3. **Install to home screen:**
   - Android: Chrome menu → "Install app" or "Add to Home screen"
   - iOS: Share menu → "Add to Home Screen"

4. **Test installed app:**
   - Launch from home screen
   - Verify standalone mode (no browser chrome)
   - Test offline functionality
   - Check app shortcuts (Android only)

### Lighthouse PWA Audit

**Run Lighthouse audit:**
```bash
# Production build required
npm run build
npm start

# In another terminal
npx lighthouse http://localhost:3000 --view --preset=desktop
```

**PWA criteria checked by Lighthouse:**
- ✅ Registers a service worker
- ✅ Responds with 200 when offline
- ✅ Has a web app manifest
- ✅ Configured for a custom splash screen
- ✅ Sets a theme color for address bar
- ✅ Provides a valid apple-touch-icon
- ✅ Uses HTTPS
- ✅ Redirects HTTP to HTTPS (production only)
- ✅ Has a viewport meta tag
- ✅ Content is sized correctly for viewport

### Debugging PWA Issues

#### Service Worker Not Registering

**Check browser console:**
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  console.log('Service Workers:', registrations)
})
```

**Common issues:**
- Not running in production mode (`NODE_ENV=production`)
- HTTPS not enabled (use localhost or HTTPS)
- Service worker file not found (check `/public/sw.js`)
- Browser cache needs clearing

**Solution:**
```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
npm start

# Clear browser cache
# Chrome: DevTools → Application → Clear storage → Clear site data
```

#### Manifest Not Loading

**Check DevTools:**
- DevTools → Application → Manifest
- Look for parsing errors

**Common issues:**
- Invalid JSON syntax
- Missing required fields
- Wrong Content-Type header
- Incorrect path in `<link rel="manifest">`

**Validate manifest:**
```bash
# Check JSON syntax
node -e "require('./public/manifest.json')"

# Check in browser
curl http://localhost:3000/manifest.json
```

#### Offline Page Not Showing

**Check configuration:**
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  fallbacks: {
    document: '/offline',  // Must match route
  },
})
```

**Verify route exists:**
- Check `app/offline/page.tsx` exists
- Visit `http://localhost:3000/offline` directly
- Should return 200 OK

#### Install Prompt Not Appearing

**Requirements:**
- HTTPS or localhost
- Valid manifest with icons
- Service worker registered
- Site visited at least once (Chrome)
- Not already installed

**Trigger manually:**
```javascript
// For testing only - add to page
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault()
  console.log('Install prompt available')
  // Store event and show custom install button
})
```

### Best Practices

1. **Test in production mode:**
   - Service workers only work in production
   - Always run `npm run build && npm start`

2. **Clear cache between tests:**
   - Service workers cache aggressively
   - Clear browser cache when testing changes
   - Unregister old service workers

3. **Test on real devices:**
   - Emulators don't always match real behavior
   - Test on actual Android and iOS devices
   - Check different screen sizes

4. **Monitor performance:**
   - Service workers can improve or harm performance
   - Monitor Core Web Vitals with PWA enabled
   - Check cache storage size

5. **Update strategy:**
   - Service workers cache aggressively
   - Plan for cache invalidation
   - Consider versioning strategy

### Configuration Files

**next.config.js:**
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})
```

**public/manifest.json:**
- Name, short_name, description
- Icons (SVG + PNG in multiple sizes)
- Theme colors
- Display mode
- App shortcuts

**app/offline/page.tsx:**
- Fallback page shown when offline
- User-friendly messaging
- Retry and navigation options

### CI/CD Integration

PWA tests run automatically in CI:

**On pull requests:**
- PWA E2E tests run via Playwright
- Lighthouse PWA audit (via LHCI)
- Manifest validation

**On deployment:**
- Service worker generated automatically
- Manifest available at /manifest.json
- Offline page deployed

**Monitoring:**
- Check service worker registration rate
- Monitor offline page views
- Track install events (if implemented)

### Resources

- [next-pwa Documentation](https://github.com/shadowwalker/next-pwa)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN: Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google PWA Checklist](https://web.dev/pwa-checklist/)
- [Workbox Documentation](https://developers.google.com/web/tools/workbox)

---

## Resources

- [Cypress Documentation](https://docs.cypress.io/)
- [Playwright Documentation](https://playwright.dev/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Testing](https://nextjs.org/docs/testing)
- [Web Vitals](https://web.dev/vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Contact

For questions about testing or QA, contact the development team.
