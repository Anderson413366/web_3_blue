# Deployment Checklist

Comprehensive checklist for deploying the Anderson Cleaning website to production.

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration

- [ ] **Copy .env.example to .env.local**

  ```bash
  cp .env.example .env.local
  ```

- [ ] **Configure Required Environment Variables**
  - [ ] `NEXT_PUBLIC_SITE_URL` - Production URL (e.g., https://andersoncleaning.com)
  - [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` - Get from Sanity dashboard
  - [ ] `NEXT_PUBLIC_SANITY_DATASET` - Usually "production"
  - [ ] `NEXT_PUBLIC_SANITY_API_VERSION` - Current: 2024-01-01

- [ ] **Configure Optional but Recommended Variables**
  - [ ] `RESEND_API_KEY` - For email functionality
  - [ ] `RESEND_FROM_EMAIL` - Verified sender email
  - [ ] `HUBSPOT_ACCESS_TOKEN` - CRM integration
  - [ ] `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` - HubSpot portal
  - [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics
  - [ ] `NEXT_PUBLIC_CLARITY_PROJECT_ID` - Microsoft Clarity
  - [ ] `RECAPTCHA_SECRET_KEY` + `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - Bot protection
  - [ ] `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
  - [ ] `SENTRY_AUTH_TOKEN` - For source maps
  - [ ] `STUDIO_BASIC_AUTH_USER` - Protect /studio
  - [ ] `STUDIO_BASIC_AUTH_PASS` - Protect /studio
  - [ ] `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` - Google Search Console

### 2. Sanity CMS Setup

- [ ] **Create Sanity Project**

  ```bash
  npm install -g @sanity/cli
  sanity init
  ```

- [ ] **Configure Sanity**
  - [ ] Set project ID in environment variables
  - [ ] Create "production" dataset
  - [ ] Add content schemas (already in lib/cms/schemas/)
  - [ ] Configure CORS in Sanity dashboard
    - Add production URL to allowed origins
    - Add localhost:3000 for development

- [ ] **Add Sample Content**
  - [ ] Services (at least 6)
  - [ ] Industries (at least 8)
  - [ ] Testimonials (at least 5)
  - [ ] Site settings (contact info, social links)

- [ ] **Set up Preview Mode**
  - [ ] Configure `SANITY_PREVIEW_SECRET`
  - [ ] Test preview URL: `/api/preview?secret=YOUR_SECRET&slug=/`

### 3. Third-Party Service Setup

#### Google Analytics

- [ ] Create GA4 property
- [ ] Get Measurement ID
- [ ] Add to `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Verify tracking with GA debugger

#### Microsoft Clarity

- [ ] Create Clarity project
- [ ] Get Project ID
- [ ] Add to `NEXT_PUBLIC_CLARITY_PROJECT_ID`

#### Sentry

- [ ] Create Sentry project
- [ ] Get DSN
- [ ] Add to `NEXT_PUBLIC_SENTRY_DSN`
- [ ] Create auth token for source maps
- [ ] Add to `SENTRY_AUTH_TOKEN`

#### CAPTCHA (Choose One)

- [ ] **Option A: Google reCAPTCHA v3**
  - [ ] Register site at https://www.google.com/recaptcha/admin
  - [ ] Get site key and secret key
  - [ ] Add to environment variables

- [ ] **Option B: Cloudflare Turnstile**
  - [ ] Create Turnstile site
  - [ ] Get site key and secret key
  - [ ] Add to environment variables

#### Email Service (Resend)

- [ ] Create Resend account
- [ ] Verify domain
- [ ] Get API key
- [ ] Add to `RESEND_API_KEY`
- [ ] Configure from email

#### HubSpot (Optional)

- [ ] Get access token
- [ ] Get portal ID
- [ ] Add to environment variables

### 4. Code Quality Checks

- [ ] **Run Linter**

  ```bash
  npm run lint
  ```

- [ ] **Check TypeScript**

  ```bash
  npx tsc --noEmit
  ```

- [ ] **Build Locally**

  ```bash
  npm run build
  ```

- [ ] **Test Production Build**
  ```bash
  npm run build && npm start
  # Visit http://localhost:3000
  ```

### 5. Performance Testing

- [ ] **Run Lighthouse Audit**
  - [ ] Performance: ≥90
  - [ ] Accessibility: ≥95
  - [ ] Best Practices: ≥95
  - [ ] SEO: ≥95

- [ ] **Test Core Web Vitals**
  - [ ] LCP: <2.5s
  - [ ] CLS: <0.1
  - [ ] INP: <200ms

- [ ] **Check Bundle Size**
  ```bash
  npm run build
  # Review .next/analyze output
  ```

### 6. Accessibility Testing

- [ ] **Automated Testing**

  ```bash
  npm run dev
  # Check console for axe-core violations
  ```

- [ ] **Manual Testing**
  - [ ] Keyboard navigation (Tab, Shift+Tab, Enter, Escape)
  - [ ] Screen reader (NVDA or VoiceOver)
  - [ ] Color contrast (use browser extension)
  - [ ] Touch targets (mobile devices)

- [ ] **Browser Extensions**
  - [ ] WAVE evaluation
  - [ ] axe DevTools scan
  - [ ] Lighthouse audit

### 7. Security Checks

- [ ] **Environment Variables**
  - [ ] No secrets committed to git
  - [ ] All required variables set
  - [ ] Validation passes on startup

- [ ] **Security Headers**
  - [ ] CSP configured correctly
  - [ ] HSTS enabled (production only)
  - [ ] X-Frame-Options set
  - [ ] X-Content-Type-Options set

- [ ] **Rate Limiting**
  - [ ] Test form submission limits
  - [ ] Verify 429 responses

- [ ] **Studio Protection**
  - [ ] Basic auth configured
  - [ ] IP allowlist (if needed)
  - [ ] Test /studio access

### 8. SEO Verification

- [ ] **Metadata**
  - [ ] All pages have titles
  - [ ] All pages have descriptions
  - [ ] OG images configured
  - [ ] Canonical URLs set

- [ ] **Structured Data**
  - [ ] Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
  - [ ] Validate JSON-LD schemas
  - [ ] Check Schema.org compliance

- [ ] **Sitemap**
  - [ ] Generated automatically (`npm run build`)
  - [ ] Accessible at /sitemap.xml
  - [ ] Contains all public pages

- [ ] **robots.txt**
  - [ ] Generated automatically
  - [ ] Accessible at /robots.txt
  - [ ] Allows crawling of public pages
  - [ ] Disallows /studio, /api

### 9. Content Review

- [ ] **Text Content**
  - [ ] No lorem ipsum
  - [ ] All placeholders replaced
  - [ ] Phone numbers correct
  - [ ] Email addresses correct
  - [ ] Address correct

- [ ] **Images**
  - [ ] All images optimized (WebP/AVIF)
  - [ ] Alt text for all images
  - [ ] No placeholder images
  - [ ] Proper aspect ratios

- [ ] **Links**
  - [ ] All internal links work
  - [ ] All external links work
  - [ ] No broken links
  - [ ] Social media links correct

### 10. Legal Pages

- [ ] **Privacy Policy**
  - [ ] Accessible at /legal/privacy
  - [ ] Last updated date correct
  - [ ] Lists all third-party services
  - [ ] Contact information correct

- [ ] **Terms of Service**
  - [ ] Accessible at /legal/terms
  - [ ] Service exclusions clear
  - [ ] Service area defined
  - [ ] Governing law specified

## 🚀 Vercel Deployment Steps

### 1. Initial Setup

- [ ] **Install Vercel CLI**

  ```bash
  npm install -g vercel
  ```

- [ ] **Connect to Vercel**

  ```bash
  vercel login
  ```

- [ ] **Link Project**
  ```bash
  vercel link
  ```

### 2. Configure Vercel Project

- [ ] **Project Settings**
  - [ ] Framework Preset: Next.js
  - [ ] Root Directory: ./
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: .next
  - [ ] Install Command: `npm install --legacy-peer-deps`

- [ ] **Environment Variables**
  - [ ] Add all production variables from .env.local
  - [ ] Verify variable names exactly match
  - [ ] Set production-specific URLs

- [ ] **Domains**
  - [ ] Add custom domain
  - [ ] Configure DNS
  - [ ] Verify SSL certificate

### 3. Deploy

- [ ] **Preview Deployment**

  ```bash
  vercel
  ```

  - [ ] Test preview URL
  - [ ] Verify all features work
  - [ ] Check environment variables

- [ ] **Production Deployment**
  ```bash
  vercel --prod
  ```

  - [ ] Deployment succeeds
  - [ ] No build errors
  - [ ] Visit production URL

### 4. Post-Deployment Verification

- [ ] **Functionality Tests**
  - [ ] Home page loads
  - [ ] All navigation works
  - [ ] Forms submit correctly
  - [ ] CMS content displays
  - [ ] Images load properly

- [ ] **Analytics Verification**
  - [ ] GA4 receiving data
  - [ ] Clarity recording sessions
  - [ ] Sentry receiving events
  - [ ] Web Vitals tracked

- [ ] **Security Tests**
  - [ ] HTTPS enforced
  - [ ] Security headers present
  - [ ] Rate limiting works
  - [ ] Studio protected

## 📊 Post-Launch Tasks

### Immediate (Day 1)

- [ ] **Google Search Console**
  - [ ] Verify ownership
  - [ ] Submit sitemap
  - [ ] Request indexing for main pages

- [ ] **Google Analytics**
  - [ ] Verify tracking
  - [ ] Set up goals/conversions
  - [ ] Configure reports

- [ ] **Monitoring**
  - [ ] Check Sentry for errors
  - [ ] Review Clarity recordings
  - [ ] Monitor Web Vitals

### Week 1

- [ ] **SEO**
  - [ ] Check indexing status
  - [ ] Monitor search appearance
  - [ ] Fix any crawl errors

- [ ] **Performance**
  - [ ] Run Lighthouse weekly
  - [ ] Monitor Core Web Vitals
  - [ ] Check error rates

- [ ] **Content**
  - [ ] Gather user feedback
  - [ ] Fix any typos
  - [ ] Update content as needed

### Month 1

- [ ] **Analytics Review**
  - [ ] Review user behavior
  - [ ] Identify popular pages
  - [ ] Check conversion rates

- [ ] **Optimization**
  - [ ] Improve based on data
  - [ ] A/B test CTAs
  - [ ] Optimize slow pages

- [ ] **Security**
  - [ ] Review Sentry errors
  - [ ] Check for vulnerabilities
  - [ ] Update dependencies

## 🔧 Maintenance Checklist

### Weekly

- [ ] Check Sentry for new errors
- [ ] Review Clarity heatmaps
- [ ] Monitor Core Web Vitals
- [ ] Backup Sanity content

### Monthly

- [ ] Update dependencies
  ```bash
  npm outdated
  npm update
  ```
- [ ] Run security audit
  ```bash
  npm audit
  npm audit fix
  ```
- [ ] Review analytics
- [ ] Test all forms
- [ ] Check for broken links

### Quarterly

- [ ] Lighthouse audit
- [ ] Accessibility review
- [ ] Content review
- [ ] Legal pages review
- [ ] Dependency major updates

## 🆘 Troubleshooting

### Build Failures

**Issue**: Build fails with module errors

```bash
# Solution: Use legacy peer deps
npm install --legacy-peer-deps
npm run build
```

**Issue**: Environment variables not found

```bash
# Solution: Verify in Vercel dashboard
# Check spelling and NEXT_PUBLIC_ prefix
```

### Performance Issues

**Issue**: Large bundle size

```bash
# Solution: Check webpack-bundle-analyzer
npm run build
# Review .next/analyze output
```

**Issue**: Slow page loads

```bash
# Solution: Check image optimization
# Verify lazy loading
# Review network tab
```

### SEO Issues

**Issue**: Pages not indexing

- Check robots.txt
- Verify sitemap.xml
- Submit to Search Console
- Check for noindex tags

**Issue**: Missing structured data

- Run Google Rich Results Test
- Validate JSON-LD
- Check Schema.org compliance

## 📞 Support

If you encounter issues:

- **Email**: dev@andersoncleaning.com
- **Sentry**: Check error logs
- **Vercel**: Check deployment logs

---

**Last Updated**: January 13, 2025
