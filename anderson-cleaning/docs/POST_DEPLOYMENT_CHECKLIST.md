# Post-Deployment Checklist

Complete checklist to verify successful deployment of Anderson Cleaning website.

## Pre-Flight Check

**Before starting deployment:**

- [ ] All code merged to main branch
- [ ] All tests passing (`npm run test:all`)
- [ ] Build successful locally (`npm run build`)
- [ ] Environment variables documented
- [ ] Deployment plan reviewed
- [ ] Rollback plan prepared
- [ ] Stakeholders notified of deployment window

---

## Deployment Verification

### 1. Core Functionality

#### Homepage

- [ ] Homepage loads at https://andersoncleaning.com
- [ ] All images load correctly
- [ ] Logo displays in header
- [ ] Navigation menu functional
- [ ] Mobile menu opens/closes
- [ ] Dark mode toggle works
- [ ] Before/After slider interactive
- [ ] All sections visible (Hero, Services, Coverage, Testimonials, etc.)
- [ ] Footer displays with all links
- [ ] No console errors in browser DevTools

#### Navigation

- [ ] All navigation links work
  - [ ] Home (/)
  - [ ] Services (/services)
  - [ ] Industries (/industries)
  - [ ] About (/about)
  - [ ] Testimonials (/testimonials)
  - [ ] Contact (/contact)
  - [ ] Careers (/apply)
  - [ ] Quote (/quote)
- [ ] Logo links back to homepage
- [ ] "Get a Quote" button works

### 2. Forms & Submissions

#### Quote Form (/quote)

- [ ] Form loads correctly
- [ ] All form fields present:
  - [ ] Name
  - [ ] Email
  - [ ] Phone
  - [ ] Company
  - [ ] Facility Type
  - [ ] Message
- [ ] Form validation works:
  - [ ] Required fields show error when empty
  - [ ] Email format validated
  - [ ] Phone number validated
- [ ] reCAPTCHA loads
- [ ] Form submits successfully
- [ ] Success message displays
- [ ] Confirmation email sent to user
- [ ] Notification email sent to admin
- [ ] Lead created in HubSpot
- [ ] No errors in Sentry

**Test submission:**

```
Name: Test User
Email: test@example.com
Phone: (555) 123-4567
Company: Test Company
Facility: Office Building
```

#### Contact Form (/contact)

- [ ] Form loads correctly
- [ ] All fields functional
- [ ] Validation works
- [ ] Submits successfully
- [ ] Emails sent correctly
- [ ] HubSpot contact created

#### Careers Application (/apply)

- [ ] English version loads (/en/apply)
- [ ] Spanish version loads (/es/apply)
- [ ] Portuguese version loads (/pt-BR/apply)
- [ ] Romanian version loads (/ro/apply)
- [ ] Language switcher works
- [ ] Language selection persists
- [ ] All form fields in correct language
- [ ] File upload works (resume)
- [ ] Validation messages in correct language
- [ ] Success page in correct language
- [ ] Application email sent with attachment
- [ ] HubSpot candidate record created

### 3. Internationalization (i18n)

#### Language Switching

- [ ] Default language is English
- [ ] Language switcher visible on /apply
- [ ] Switching to ES shows Spanish content
- [ ] Switching to PT-BR shows Portuguese content
- [ ] Switching to RO shows Romanian content
- [ ] Form labels translate correctly
- [ ] Error messages translate correctly
- [ ] Success messages translate correctly
- [ ] Language persists on page refresh

#### Content Verification

- [ ] Check all translations for accuracy
- [ ] Verify no English fallbacks on non-EN pages
- [ ] Test special characters (accents, etc.)
- [ ] Verify RTL languages if applicable

### 4. Sanity CMS Integration

#### Studio Access

- [ ] Sanity Studio accessible at /studio
- [ ] Login page loads
- [ ] Can authenticate with credentials
- [ ] Dashboard loads after login
- [ ] Can create/edit content
- [ ] Can publish changes
- [ ] Can upload images

#### Content Display

- [ ] Content from Sanity displays on website
- [ ] Images from Sanity CDN load
- [ ] Rich text formatting preserved
- [ ] Test content update:
  1. [ ] Make change in Studio
  2. [ ] Publish change
  3. [ ] Verify change on website (may take up to 60s for ISR)

### 5. Third-Party Integrations

#### Google Analytics 4

- [ ] Tracking code loads (check browser DevTools → Network)
- [ ] Page views tracked in Real-Time report
- [ ] Events firing correctly:
  - [ ] page_view
  - [ ] form_submit
  - [ ] button_click
- [ ] Test with Google Analytics Debugger extension

#### Microsoft Clarity

- [ ] Clarity script loads
- [ ] Session recording starts
- [ ] Heatmap data collecting
- [ ] Dashboard shows new session within 5 minutes

#### Crisp Chat

- [ ] Chat widget appears in bottom-right
- [ ] Widget opens when clicked
- [ ] Can send test message
- [ ] Message appears in Crisp dashboard

#### reCAPTCHA v3

- [ ] reCAPTCHA badge appears (bottom-right)
- [ ] Forms have invisible reCAPTCHA
- [ ] Score being validated on backend
- [ ] Low scores rejected appropriately

#### HubSpot Forms

- [ ] Quote submissions create contacts
- [ ] Contact form submissions create contacts
- [ ] Careers submissions create candidates
- [ ] Lead source tracked correctly
- [ ] Form GUIDs correct for each form
- [ ] Workflows triggering (if configured)

#### Resend Email

- [ ] Quote confirmation emails sending
- [ ] Careers application emails sending
- [ ] Contact form emails sending
- [ ] Admin notification emails sending
- [ ] Emails have correct "From" address
- [ ] Email templates rendering correctly
- [ ] Attachments included (careers resumes)

#### Calendly (if applicable)

- [ ] Calendly embed loads
- [ ] Can select date/time
- [ ] Can complete booking
- [ ] Confirmation email sent

### 6. SEO & Meta Tags

#### Meta Tags

- [ ] Title tag present and correct on all pages
- [ ] Meta description present and unique per page
- [ ] Open Graph tags present:
  - [ ] og:title
  - [ ] og:description
  - [ ] og:image
  - [ ] og:url
- [ ] Twitter Card tags present
- [ ] Canonical URL correct on all pages

**Test with:**

- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/

#### Structured Data

- [ ] Organization schema present
- [ ] Local Business schema present
- [ ] Service schema present
- [ ] Breadcrumb schema on inner pages
- [ ] FAQ schema (if applicable)
- [ ] Review schema (if applicable)

**Test with:**

- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema.org Validator: https://validator.schema.org

#### Sitemap & Robots

- [ ] Sitemap accessible: /sitemap.xml
- [ ] All pages listed in sitemap
- [ ] Sitemap valid XML format
- [ ] Robots.txt accessible: /robots.txt
- [ ] Sitemap referenced in robots.txt
- [ ] Correct Allow/Disallow rules

**Test sitemap:**

```bash
curl https://andersoncleaning.com/sitemap.xml | xmllint --format -
```

#### Google Search Console

- [ ] Property verified
- [ ] Sitemap submitted
- [ ] No critical issues
- [ ] Mobile usability green
- [ ] Core Web Vitals in "Good" range
- [ ] Index coverage healthy

### 7. Performance

#### Lighthouse Scores

Run Lighthouse audit (Incognito mode):

- [ ] Performance: ≥ 90
- [ ] Accessibility: ≥ 95
- [ ] Best Practices: ≥ 90
- [ ] SEO: ≥ 95

**Run audit:**

```bash
npm run lighthouse
```

Or manually:

1. Open Chrome DevTools
2. Navigate to Lighthouse tab
3. Select "Desktop" mode
4. Run audit
5. Repeat for "Mobile"

#### Core Web Vitals

- [ ] LCP < 2.5s (desktop and mobile)
- [ ] FID/INP < 100ms / 200ms
- [ ] CLS < 0.1

**Check in:**

- Vercel Speed Insights
- Google Search Console → Core Web Vitals
- PageSpeed Insights: https://pagespeed.web.dev

#### Page Load Times

Test with WebPageTest (https://www.webpagetest.org):

- [ ] First Byte Time < 600ms
- [ ] Start Render < 1.5s
- [ ] Speed Index < 3.0s
- [ ] Fully Loaded < 5.0s

#### Image Optimization

- [ ] All images using next/image
- [ ] Images lazy loaded
- [ ] Modern formats (WebP/AVIF) served
- [ ] Proper sizing (not oversized)
- [ ] Blur placeholders showing

### 8. Security

#### HTTPS & SSL

- [ ] Site accessible via HTTPS
- [ ] HTTP redirects to HTTPS
- [ ] SSL certificate valid
- [ ] Certificate not expiring soon (> 30 days)
- [ ] No mixed content warnings
- [ ] HSTS header present

**Test:**

```bash
curl -I https://andersoncleaning.com | grep -i strict-transport
# Should show: strict-transport-security: max-age=31536000
```

#### Security Headers

- [ ] Strict-Transport-Security present
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] Content-Security-Policy present
- [ ] Referrer-Policy present
- [ ] Permissions-Policy present

**Test with:**

- SecurityHeaders.com: https://securityheaders.com
- Mozilla Observatory: https://observatory.mozilla.org

#### Input Validation

- [ ] Forms sanitize HTML input
- [ ] XSS attempts blocked
- [ ] SQL injection attempts blocked
- [ ] File upload restricted to allowed types
- [ ] File size limits enforced
- [ ] CAPTCHA prevents bot submissions

**Test XSS:**
Try submitting:

```
<script>alert('XSS')</script>
```

Should be sanitized/escaped.

#### Rate Limiting

- [ ] API routes rate limited
- [ ] Form submissions rate limited
- [ ] Excessive requests return 429
- [ ] Rate limit resets correctly

**Test:**

```bash
# Send 10 requests quickly
for i in {1..10}; do curl -X POST https://andersoncleaning.com/api/quote; done
# Should see 429 after threshold
```

### 9. Accessibility (A11y)

#### Automated Testing

Run axe DevTools:

- [ ] No critical violations
- [ ] No serious violations
- [ ] Review moderate/minor violations

**Or run via Playwright:**

```bash
npm run test:a11y
```

#### Keyboard Navigation

- [ ] Can tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Skip to main content link works
- [ ] No keyboard traps
- [ ] Escape key closes modals/menus
- [ ] Enter/Space activate buttons

#### Screen Reader

Test with NVDA (Windows) or VoiceOver (Mac):

- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Buttons have accessible names
- [ ] Headings in logical order (H1 → H2 → H3)
- [ ] Links descriptive (not "click here")
- [ ] ARIA attributes used correctly

#### Color Contrast

- [ ] Text meets 4.5:1 contrast ratio (AA)
- [ ] Large text meets 3:1 ratio
- [ ] Interactive elements meet 3:1 ratio
- [ ] No color-only information

**Test with:**

- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

#### Touch Targets

- [ ] All buttons ≥ 44x44px
- [ ] Links have adequate spacing
- [ ] Form inputs large enough for touch

### 10. Responsive Design

#### Breakpoints

Test at these widths:

- [ ] Mobile: 375px (iPhone SE)
- [ ] Mobile: 414px (iPhone Pro Max)
- [ ] Tablet: 768px (iPad)
- [ ] Desktop: 1024px
- [ ] Desktop: 1440px
- [ ] Desktop: 1920px

#### Device Testing

- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop Chrome
- [ ] Desktop Firefox
- [ ] Desktop Safari
- [ ] Desktop Edge

#### Orientation

- [ ] Portrait mode works
- [ ] Landscape mode works
- [ ] Content readable in both

### 11. Browser Compatibility

Test in:

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Samsung Internet (Android)
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)

**Check for:**

- No JavaScript errors
- CSS rendering correctly
- All features functional
- No layout issues

### 12. Monitoring & Analytics

#### Vercel

- [ ] Deployment successful
- [ ] No build errors
- [ ] Correct environment variables set
- [ ] Analytics enabled
- [ ] Speed Insights enabled

#### Sentry

- [ ] Error tracking active
- [ ] Source maps uploaded
- [ ] Releases tagged correctly
- [ ] Alerts configured
- [ ] Test error captures correctly

#### UptimeRobot

- [ ] Monitors created:
  - [ ] Homepage
  - [ ] /api/health
  - [ ] /quote
- [ ] Alert contacts configured
- [ ] Status page created (optional)

#### Google Analytics

- [ ] Real-time shows activity
- [ ] Page views tracking
- [ ] Events tracking
- [ ] Goals configured

### 13. Domain & DNS

#### Domain

- [ ] Custom domain configured in Vercel
- [ ] andersoncleaning.com resolves to site
- [ ] www.andersoncleaning.com redirects to non-www
- [ ] SSL certificate issued

#### DNS Records

- [ ] A record points to Vercel
- [ ] CNAME for www configured
- [ ] MX records for email (if applicable)
- [ ] TXT records for verification
- [ ] SPF record for email

**Check DNS:**

```bash
dig andersoncleaning.com
dig www.andersoncleaning.com
```

### 14. Content Review

#### Text Content

- [ ] No typos or grammatical errors
- [ ] Phone numbers correct
- [ ] Email addresses correct
- [ ] Business address correct
- [ ] Service area information accurate
- [ ] Pricing information accurate (if shown)

#### Legal Pages

- [ ] Privacy Policy page exists
- [ ] Terms of Service page exists
- [ ] Cookie Policy (if applicable)
- [ ] Content is up to date
- [ ] Links to legal pages in footer

#### Images

- [ ] All images load correctly
- [ ] No broken image links
- [ ] Images optimized (< 500KB each)
- [ ] Alt text descriptive
- [ ] Proper aspect ratios

---

## Production Validation

### Smoke Tests

**Critical Path Testing:**

1. [ ] User can visit homepage
2. [ ] User can navigate to services page
3. [ ] User can fill out quote form
4. [ ] User receives confirmation email
5. [ ] Admin receives notification
6. [ ] Lead appears in HubSpot

### Load Testing (Optional)

Use tools like:

- Apache Bench
- Lighthouse
- WebPageTest

```bash
# Simple load test with Apache Bench
ab -n 100 -c 10 https://andersoncleaning.com/
```

### Edge Cases

- [ ] 404 page displays for invalid URLs
- [ ] 500 error page (if custom)
- [ ] Offline page (PWA, if applicable)
- [ ] Long form inputs (max length)
- [ ] Special characters in forms (à, ñ, etc.)
- [ ] File upload limits enforced

---

## Rollback Verification

Test rollback procedure:

- [ ] Previous deployment accessible in Vercel
- [ ] Can promote previous deployment
- [ ] Rollback completes successfully
- [ ] Site functional after rollback
- [ ] Re-promote latest deployment

---

## Documentation

- [ ] .env.production.example updated
- [ ] DEPLOYMENT_GUIDE.md complete
- [ ] README.md updated
- [ ] API documentation current
- [ ] Deployment notes documented
- [ ] Known issues documented

---

## Handoff

Before considering deployment complete:

- [ ] Stakeholders notified of successful deployment
- [ ] Monitoring dashboards shared
- [ ] Access credentials provided (if needed)
- [ ] Training conducted (if needed)
- [ ] Support contacts documented
- [ ] Maintenance schedule established

---

## Sign-Off

**Deployed By:** ************\_\_\_************

**Date/Time:** ************\_\_\_************

**Deployment Version:** ************\_\_\_************

**Verified By:** ************\_\_\_************

**Issues Found:** ************\_\_\_************

**Status:** ⬜ Approved ⬜ Issues Found ⬜ Rolled Back

---

## Post-Deployment

### Day 1

- [ ] Monitor error rates (should be near zero)
- [ ] Check form submissions working
- [ ] Review analytics for traffic
- [ ] Verify email deliverability
- [ ] Check uptime (should be 100%)

### Week 1

- [ ] Review Lighthouse scores
- [ ] Check Core Web Vitals trend
- [ ] Analyze user behavior in Clarity
- [ ] Review Sentry error patterns
- [ ] Optimize based on real user data

### Month 1

- [ ] Performance audit
- [ ] Security review
- [ ] Content review
- [ ] Analytics deep dive
- [ ] Plan improvements

---

**Checklist Version:** 1.0
**Last Updated:** November 2024
**Maintained By:** DevOps Team
