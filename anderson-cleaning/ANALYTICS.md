# Analytics & Tracking Documentation

## Overview

This document explains the analytics implementation for the Anderson Cleaning website, including Google Tag Manager (GTM), Google Analytics 4 (GA4), and custom event tracking.

---

## Table of Contents

1. [Setup](#setup)
2. [Google Tag Manager Integration](#google-tag-manager-integration)
3. [Custom Events](#custom-events)
4. [Automatic Tracking](#automatic-tracking)
5. [Testing Analytics](#testing-analytics)
6. [Best Practices](#best-practices)

---

## Setup

### Prerequisites

1. Google Tag Manager account
2. Google Analytics 4 property
3. GTM container created

### Configuration

Set environment variable:

```env
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GTM-XXXXXXX
```

### Installation

Analytics are automatically initialized in the root layout via `AnalyticsProvider`.

**In `app/layout.tsx`:**
```tsx
import AnalyticsProvider from '@/components/AnalyticsProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

---

## Google Tag Manager Integration

### Components

1. **GoogleTagManager** (`components/GoogleTagManager.tsx`)
   - Injects GTM container script
   - Initializes dataLayer

2. **AnalyticsProvider** (`components/AnalyticsProvider.tsx`)
   - Wraps app with analytics context
   - Enables automatic event tracking

### dataLayer Structure

```javascript
window.dataLayer.push({
  event: 'event_name',
  property1: 'value1',
  property2: 'value2',
  // ... additional properties
})
```

---

## Custom Events

### Available Events

All tracking functions are in `lib/analytics/gtm.ts`.

#### 1. Form Submissions

```typescript
import { trackFormSubmission } from '@/lib/analytics/gtm'

trackFormSubmission('quote_request', 'multi_step', {
  facility_type: 'office',
  cleaning_frequency: 'weekly'
})
```

**dataLayer Output:**
```javascript
{
  event: 'form_submission',
  form_name: 'quote_request',
  form_type: 'multi_step',
  facility_type: 'office',
  cleaning_frequency: 'weekly'
}
```

---

#### 2. CTA Clicks

```typescript
import { trackCTAClick } from '@/lib/analytics/gtm'

trackCTAClick('Get a Free Quote', 'homepage_hero', '/quote')
```

**dataLayer Output:**
```javascript
{
  event: 'cta_click',
  cta_text: 'Get a Free Quote',
  cta_location: 'homepage_hero',
  cta_destination: '/quote'
}
```

---

#### 3. Outbound Links

```typescript
import { trackOutboundLink } from '@/lib/analytics/gtm'

trackOutboundLink('https://facebook.com/andersoncleaning', 'Facebook')
```

**dataLayer Output:**
```javascript
{
  event: 'outbound_link_click',
  outbound_url: 'https://facebook.com/andersoncleaning',
  link_text: 'Facebook'
}
```

---

#### 4. Scroll Depth

```typescript
import { trackScrollDepth } from '@/lib/analytics/gtm'

// Automatically tracked at 25%, 50%, 75%, 100%
trackScrollDepth(50)
```

**dataLayer Output:**
```javascript
{
  event: 'scroll_depth',
  scroll_percentage: 50,
  page_path: '/about'
}
```

---

#### 5. Phone & Email Clicks

```typescript
import { trackPhoneClick, trackEmailClick } from '@/lib/analytics/gtm'

trackPhoneClick('(413) 306-5053', 'header')
trackEmailClick('info@andersoncleaning.com', 'footer')
```

**dataLayer Output:**
```javascript
// Phone
{
  event: 'phone_click',
  phone_number: '(413) 306-5053',
  click_location: 'header'
}

// Email
{
  event: 'email_click',
  email_address: 'info@andersoncleaning.com',
  click_location: 'footer'
}
```

---

#### 6. Quote Flow Tracking

```typescript
import { trackQuoteStart, trackQuoteStepCompleted } from '@/lib/analytics/gtm'

// When user starts quote
trackQuoteStart()

// When user completes a step
trackQuoteStepCompleted(1, 'contact_info')
```

**dataLayer Output:**
```javascript
// Quote started
{
  event: 'quote_started',
  timestamp: '2024-01-15T10:30:00.000Z'
}

// Step completed
{
  event: 'quote_step_completed',
  step_number: 1,
  step_name: 'contact_info'
}
```

---

## Automatic Tracking

### Enabled by Default

The following events are tracked automatically when `AnalyticsProvider` is used:

1. **Page Views** - On route change
2. **Scroll Depth** - At 25%, 50%, 75%, 100% milestones
3. **Outbound Links** - All external link clicks
4. **Phone/Email Clicks** - All tel: and mailto: links
5. **Time on Page** - Tracked on page exit

### Implementation

Automatic tracking uses React hooks in `lib/analytics/hooks.ts`:

```typescript
// In AnalyticsProvider
usePageViewTracking()
useScrollDepthTracking()
useOutboundLinkTracking()
useContactLinkTracking()
```

### Disabling Automatic Tracking

If you need to disable automatic tracking:

```tsx
// Don't use AnalyticsProvider
// Manually add GoogleTagManager only
<GoogleTagManager gtmId={gtmId} />
```

---

## Testing Analytics

### Method 1: Browser Console

```javascript
// Check dataLayer
console.log(window.dataLayer)

// Manually push test event
window.dataLayer.push({
  event: 'test_event',
  test_property: 'test_value'
})
```

### Method 2: GTM Preview Mode

1. Open GTM container
2. Click "Preview" in top right
3. Enter your site URL
4. Navigate and perform actions
5. View events in real-time debug panel

### Method 3: GA4 DebugView

1. Open Google Analytics 4
2. Go to Configure → DebugView
3. Enable debug mode in browser:
   ```javascript
   // Set debug mode
   localStorage.setItem('debug_mode', 'true')
   ```
4. Perform actions on site
5. View events in DebugView

### Method 4: Chrome DevTools

1. Open DevTools → Network tab
2. Filter by "google-analytics" or "gtm"
3. Perform actions
4. Inspect network requests for events

---

## GTM Tag Configuration

### Recommended Tags

1. **Google Analytics 4 Configuration**
   - Trigger: All Pages
   - Measurement ID: G-XXXXXXXXXX

2. **GA4 Event - Form Submission**
   - Trigger: Custom Event - form_submission
   - Event Name: form_submit
   - Parameters:
     - form_name: {{form_name}}
     - form_type: {{form_type}}

3. **GA4 Event - CTA Click**
   - Trigger: Custom Event - cta_click
   - Event Name: cta_click
   - Parameters:
     - cta_text: {{cta_text}}
     - cta_location: {{cta_location}}

4. **GA4 Event - Scroll Depth**
   - Trigger: Custom Event - scroll_depth
   - Event Name: scroll
   - Parameters:
     - percent_scrolled: {{scroll_percentage}}

### Variables to Create

- form_name (Data Layer Variable)
- form_type (Data Layer Variable)
- cta_text (Data Layer Variable)
- cta_location (Data Layer Variable)
- scroll_percentage (Data Layer Variable)
- outbound_url (Data Layer Variable)

---

## Event Tracking Examples

### Example 1: Track Button Click

```tsx
import { trackCTAClick } from '@/lib/analytics/gtm'

function CTAButton() {
  const handleClick = () => {
    trackCTAClick('Schedule Consultation', 'services_page', '/quote')
  }

  return (
    <button onClick={handleClick}>
      Schedule Free Consultation
    </button>
  )
}
```

### Example 2: Track Form Submit

```tsx
import { trackFormSubmission } from '@/lib/analytics/gtm'

const onSubmit = async (data) => {
  // Submit form
  const response = await fetch('/api/contact', { ... })

  if (response.ok) {
    // Track successful submission
    trackFormSubmission('contact_form', 'simple')
  }
}
```

### Example 3: Track Custom Event

```typescript
import { trackCustomEvent } from '@/lib/analytics/gtm'

// Track video play
trackCustomEvent('video_play', {
  video_title: 'Company Overview',
  video_duration: 120,
  video_platform: 'youtube'
})

// Track file download
trackCustomEvent('file_download', {
  file_name: 'service-brochure.pdf',
  file_size: 2048,
  download_location: 'services_page'
})
```

---

## Data Privacy & GDPR Compliance

### Cookie Consent

Analytics only load after cookie consent is given via `CookieBanner` component.

### User Opt-Out

Users can opt out of tracking:

```javascript
// Disable GTM
window['ga-disable-GTM-XXXXXXX'] = true

// Clear dataLayer
window.dataLayer = []
```

### Anonymized IP

Configure in GA4:
- Settings → Data Streams → Web → Configure tag settings
- Show more → Anonymize IP addresses: ON

---

## Troubleshooting

### Events Not Showing in GA4

1. Check GTM container is published
2. Verify GA4 tag is firing in GTM Preview
3. Check network tab for `google-analytics.com/g/collect` requests
4. Ensure GA4 property ID is correct

### dataLayer Not Defined

1. Check `GoogleTagManager` component is mounted
2. Verify GTM script loaded (check Network tab)
3. Check for JavaScript errors in console

### Events Tracked Multiple Times

1. Check for duplicate GTM containers
2. Verify AnalyticsProvider only wraps app once
3. Check for event listeners not being cleaned up

---

## Best Practices

### Do's

✅ Use descriptive event names
✅ Include context in event properties
✅ Test in GTM preview before deploying
✅ Document custom events
✅ Use consistent naming conventions

### Don'ts

❌ Track Personally Identifiable Information (PII)
❌ Send sensitive data (passwords, SSNs)
❌ Track form input values
❌ Use generic event names
❌ Send redundant data

### Event Naming Convention

Use snake_case for consistency with GA4:

```javascript
// Good
trackCustomEvent('quote_step_completed')

// Bad
trackCustomEvent('Quote Step Completed')
trackCustomEvent('quote-step-completed')
```

---

## Resources

- [GTM Documentation](https://developers.google.com/tag-manager)
- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [dataLayer Reference](https://developers.google.com/tag-manager/devguide)
- [GA4 Event Reference](https://support.google.com/analytics/answer/9267735)

---

## Support

For analytics issues or questions, contact the development team.
