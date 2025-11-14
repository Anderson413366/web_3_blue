# Production Deployment Guide

Complete guide for deploying Anderson Cleaning website to Vercel.

## Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Vercel Setup](#vercel-setup)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [Sanity Studio Deployment](#sanity-studio-deployment)
- [Monitoring Setup](#monitoring-setup)
- [Post-Deployment Verification](#post-deployment-verification)
- [Rollback Procedures](#rollback-procedures)
- [Troubleshooting](#troubleshooting)

---

## Pre-Deployment Checklist

Before deploying to production, ensure:

- [ ] All code is committed and pushed to GitHub
- [ ] All tests pass locally (`npm run test:all`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] No console errors in production build
- [ ] All images optimized and accessible
- [ ] Environment variables documented
- [ ] Third-party API keys obtained
- [ ] Domain purchased and DNS accessible
- [ ] SSL certificates ready (Vercel handles this automatically)

---

## Vercel Setup

### 1. Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub account
3. Authorize Vercel to access your repositories

### 2. Import Project

```bash
# Option 1: Via Vercel Dashboard
1. Click "Add New Project"
2. Import from GitHub: Anderson413366/web_3_blue
3. Select root directory: anderson-cleaning/
4. Framework Preset: Next.js (auto-detected)
5. Click "Deploy"

# Option 2: Via Vercel CLI
npm i -g vercel
cd anderson-cleaning
vercel --prod
```

### 3. Project Settings

**Build & Development Settings:**

- Framework Preset: `Next.js`
- Build Command: `npm run build`
- Output Directory: `.next` (default)
- Install Command: `npm ci`
- Development Command: `npm run dev`

**Root Directory:**

- Set to `anderson-cleaning/` (important!)

**Node.js Version:**

- Use Node.js 18.x or 20.x
- Set in Vercel Dashboard → Settings → General → Node.js Version

### 4. Configure Deployment Regions

**Recommended Region:** `iad1` (Washington, D.C., USA)

- Closest to Western MA/CT service area
- Low latency for target audience

In `vercel.json`:

```json
{
  "regions": ["iad1"]
}
```

---

## Environment Variables

### Setting Up in Vercel

1. Go to Project Settings → Environment Variables
2. Add variables for each environment:
   - **Production**: Live site (andersoncleaning.com)
   - **Preview**: PR deployments and branches
   - **Development**: Local development (optional)

### Environment Types

#### Production-Only Variables

Add these ONLY to Production environment:

```bash
# Sanity (Read-only token for production)
SANITY_API_READ_TOKEN=sk_prod_xxxxx

# Email (Production sender)
RESEND_API_KEY=re_prod_xxxxx
RESEND_TO_EMAIL=info@andersoncleaning.com

# HubSpot (Production forms)
HUBSPOT_ACCESS_TOKEN=prod_token_xxxxx

# Sentry (Production monitoring)
SENTRY_DSN=https://prod@sentry.io/xxxxx
SENTRY_ENVIRONMENT=production
```

#### Preview-Only Variables

Add these for Preview deployments (different from production):

```bash
# Sanity (Read+Write token for preview testing)
SANITY_API_WRITE_TOKEN=sk_preview_xxxxx

# Test email address
RESEND_TO_EMAIL=test@andersoncleaning.com

# Sentry (Preview monitoring)
SENTRY_ENVIRONMENT=preview
```

#### Public Variables (All Environments)

Add these to ALL environments (Production, Preview, Development):

```bash
NEXT_PUBLIC_SITE_URL=https://andersoncleaning.com
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Le...
NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123
NEXT_PUBLIC_CRISP_WEBSITE_ID=xyz789
```

### Complete Variable List

See `.env.production.example` for complete list with descriptions.

**Import Variables via CLI:**

```bash
# From .env.production file
vercel env pull .env.production
```

---

## Domain Configuration

### 1. Add Custom Domain

**In Vercel Dashboard:**

1. Go to Project → Settings → Domains
2. Add domain: `andersoncleaning.com`
3. Add www subdomain: `www.andersoncleaning.com`

### 2. DNS Configuration

**Option A: Vercel Nameservers (Recommended)**

1. Vercel provides nameservers: `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
2. Update nameservers at your domain registrar
3. Wait for DNS propagation (up to 48 hours)

**Option B: Custom DNS (A/CNAME Records)**

At your DNS provider, add:

```
# Root domain
A     @     76.76.21.21

# WWW subdomain
CNAME www   cname.vercel-dns.com

# Email (if using external email provider)
MX    @     10 mx1.emailprovider.com
MX    @     20 mx2.emailprovider.com

# SPF (for email authentication)
TXT   @     "v=spf1 include:emailprovider.com ~all"
```

### 3. Redirect Configuration

**WWW to non-WWW:**
Handled automatically by `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "https://www.andersoncleaning.com/:path*",
      "destination": "https://andersoncleaning.com/:path*",
      "permanent": true
    }
  ]
}
```

### 4. SSL/TLS Configuration

**Automatic SSL (Vercel):**

- SSL certificate provisioned automatically
- Auto-renewal before expiration
- HTTPS enforced by default

**Verify SSL:**

```bash
curl -I https://andersoncleaning.com
# Look for: strict-transport-security header
```

**HSTS Configuration:**
Already configured in `middleware.ts`:

```typescript
response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
```

---

## Sanity Studio Deployment

We're using embedded Studio at `/studio` route.

### Option 1: Embedded Studio (Current Setup)

**Pros:**

- Same deployment as main site
- No separate hosting needed
- Protected by same middleware
- Single domain

**Security:**
Configured in `middleware.ts`:

```typescript
// Only allow authenticated users to access /studio
if (pathname.startsWith('/studio')) {
  // Add authentication check here
}
```

**Deployment:**
Studio is deployed automatically with main site.

### Option 2: Separate Studio Deployment (Alternative)

If you prefer separate deployment:

```bash
# 1. Create separate Vercel project for Studio
cd sanity-studio/
vercel --prod

# 2. Configure CORS in sanity.config.ts
export default defineConfig({
  // ...
  cors: {
    credentials: true,
    origin: [
      'https://andersoncleaning.com',
      'https://studio.andersoncleaning.com'
    ]
  }
})
```

**Subdomain:** `studio.andersoncleaning.com`

---

## Monitoring Setup

### 1. Vercel Analytics

**Enable in Dashboard:**

1. Go to Project → Analytics
2. Enable Web Analytics
3. No code changes needed (auto-injected)

**Features:**

- Page views and unique visitors
- Top pages and referrers
- Device and browser stats
- Real-time traffic

### 2. Vercel Speed Insights

**Enable in Dashboard:**

1. Go to Project → Speed Insights
2. Enable feature
3. View Core Web Vitals data

**Metrics Tracked:**

- LCP (Largest Contentful Paint)
- FID (First Input Delay) / INP (Interaction to Next Paint)
- CLS (Cumulative Layout Shift)
- FCP (First Contentful Paint)
- TTFB (Time to First Byte)

### 3. Google Analytics 4

**Setup:**

1. Create GA4 property at [analytics.google.com](https://analytics.google.com)
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to Vercel environment variables:
   ```bash
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

**Configured in:** `components/LazyScripts.tsx`

### 4. Microsoft Clarity

**Setup:**

1. Sign up at [clarity.microsoft.com](https://clarity.microsoft.com)
2. Create project for andersoncleaning.com
3. Get Project ID
4. Add to environment variables:
   ```bash
   NEXT_PUBLIC_CLARITY_PROJECT_ID=abc123xyz
   ```

**Configured in:** `components/LazyScripts.tsx`

**Features:**

- Session recordings
- Heatmaps
- User behavior insights

### 5. Sentry Error Tracking

**Setup:**

1. Create account at [sentry.io](https://sentry.io)
2. Create new project: "anderson-cleaning"
3. Get DSN and Auth Token
4. Add to Vercel environment variables:
   ```bash
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
   SENTRY_AUTH_TOKEN=your_auth_token
   SENTRY_ORG=your_org
   SENTRY_PROJECT=anderson-cleaning
   SENTRY_ENVIRONMENT=production
   ```

**Configured in:**

- `sentry.client.config.ts`
- `sentry.server.config.ts`
- `sentry.edge.config.ts`

**Alerts Setup:**

1. Go to Sentry → Alerts → Create Alert
2. Set up alerts for:
   - Error rate > 10/hour
   - New issues
   - Performance regressions

### 6. Uptime Monitoring

**Recommended Services:**

- [UptimeRobot](https://uptimerobot.com) (Free)
- [Pingdom](https://www.pingdom.com)
- [StatusCake](https://www.statuscake.com)

**Setup UptimeRobot:**

1. Create account
2. Add monitor:
   - Type: HTTP(s)
   - URL: https://andersoncleaning.com
   - Monitoring Interval: 5 minutes
3. Set up alert contacts (email, SMS)

**Monitor These URLs:**

- Homepage: `https://andersoncleaning.com`
- Quote Form: `https://andersoncleaning.com/quote`
- API Health: `https://andersoncleaning.com/api/health` (create this endpoint)

### 7. Performance Budgets

**Lighthouse CI (Already configured):**

In `lighthouserc.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }]
      }
    }
  }
}
```

**GitHub Actions Integration:**
Runs automatically on PRs (see `.github/workflows/ci.yml`)

**Fail Build If:**

- Performance score < 90
- Accessibility score < 95
- SEO score < 95

---

## Post-Deployment Verification

### Automated Checklist

Run this script after deployment:

```bash
#!/bin/bash
# deployment-check.sh

DOMAIN="https://andersoncleaning.com"

echo "🔍 Starting post-deployment verification..."

# 1. Check if site is accessible
echo "✓ Checking homepage..."
curl -f "$DOMAIN" > /dev/null && echo "✅ Homepage OK" || echo "❌ Homepage FAILED"

# 2. Check SSL
echo "✓ Checking SSL..."
curl -I "$DOMAIN" 2>&1 | grep -q "HTTP/2 200" && echo "✅ SSL OK" || echo "❌ SSL FAILED"

# 3. Check redirects
echo "✓ Checking WWW redirect..."
curl -I "https://www.$DOMAIN" 2>&1 | grep -q "301\|302" && echo "✅ Redirect OK" || echo "❌ Redirect FAILED"

# 4. Check sitemap
echo "✓ Checking sitemap..."
curl -f "$DOMAIN/sitemap.xml" > /dev/null && echo "✅ Sitemap OK" || echo "❌ Sitemap FAILED"

# 5. Check robots.txt
echo "✓ Checking robots.txt..."
curl -f "$DOMAIN/robots.txt" > /dev/null && echo "✅ Robots.txt OK" || echo "❌ Robots.txt FAILED"

echo "✨ Verification complete!"
```

### Manual Checklist

#### Functional Tests

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Forms submit successfully:
  - [ ] Quote form
  - [ ] Contact form
  - [ ] Careers application form
- [ ] Language switcher works on /apply page
- [ ] Before/After slider is interactive
- [ ] Mobile menu opens/closes
- [ ] Dark mode toggle works

#### Integrations

- [ ] HubSpot forms submitting to correct portal
- [ ] Emails sending via Resend:
  - [ ] Quote confirmation email
  - [ ] Careers application email
  - [ ] Admin notification emails
- [ ] Google Analytics tracking pageviews
- [ ] Microsoft Clarity recording sessions
- [ ] Crisp chat widget appears
- [ ] reCAPTCHA v3 loading on forms
- [ ] Calendly embeds working (if applicable)
- [ ] Google Maps displaying correctly

#### SEO & Performance

- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Meta tags correct (view page source)
- [ ] Open Graph images showing on social media
- [ ] Canonical URLs correct
- [ ] Structured data valid (Google Rich Results Test)
- [ ] Lighthouse scores meet targets:
  - [ ] Performance ≥ 90
  - [ ] Accessibility ≥ 95
  - [ ] Best Practices ≥ 90
  - [ ] SEO ≥ 95

#### Security

- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Security headers present:
  - [ ] Strict-Transport-Security
  - [ ] X-Frame-Options
  - [ ] X-Content-Type-Options
  - [ ] Content-Security-Policy
- [ ] No mixed content warnings
- [ ] API routes protected by rate limiting
- [ ] Studio route protected (if embedded)

#### Monitoring

- [ ] Vercel Analytics showing data
- [ ] Google Analytics receiving hits
- [ ] Microsoft Clarity tracking sessions
- [ ] Sentry error tracking active
- [ ] Uptime monitor configured and running

#### Browser Testing

Test on:

- [ ] Chrome (desktop & mobile)
- [ ] Firefox (desktop)
- [ ] Safari (desktop & iOS)
- [ ] Edge (desktop)
- [ ] Samsung Internet (Android)

#### Device Testing

- [ ] iPhone (Safari)
- [ ] Android phone (Chrome)
- [ ] iPad (Safari)
- [ ] Desktop 1920x1080
- [ ] Desktop 1366x768

---

## Rollback Procedures

### Instant Rollback (Vercel Dashboard)

**If deployment fails or has critical bugs:**

1. Go to Vercel Dashboard → Deployments
2. Find last working deployment
3. Click "..." menu → Promote to Production
4. Confirm promotion

**Rollback time:** ~30 seconds

### Git Rollback

**If you need to revert code:**

```bash
# 1. Find commit to revert to
git log --oneline

# 2. Revert to specific commit
git revert <commit-hash>

# 3. Push to trigger new deployment
git push origin main
```

### Environment Variable Rollback

**If issue is related to env vars:**

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Check deployment logs for which variable caused issue
3. Update or remove problematic variable
4. Redeploy (or Vercel redeploys automatically)

### Database Rollback (Sanity)

**If Sanity data was corrupted:**

1. Go to Sanity Dashboard → Datasets
2. View history
3. Restore to previous version

**Or via CLI:**

```bash
sanity dataset export production backup.tar.gz
sanity dataset import backup.tar.gz production
```

### DNS Rollback

**If DNS change caused issues:**

1. Revert DNS records at registrar
2. Wait for propagation (up to 48 hours, usually faster)
3. Use Cloudflare for instant DNS updates

---

## Troubleshooting

### Build Failures

**Issue:** Build fails on Vercel but works locally

**Solutions:**

1. Check Node.js version matches (use same version locally)
2. Clear Vercel cache: Settings → General → Clear Cache
3. Check environment variables are set
4. Review build logs for specific errors
5. Try: `rm -rf .next node_modules && npm install && npm run build`

### 404 Errors

**Issue:** Pages return 404 after deployment

**Solutions:**

1. Verify `vercel.json` rewrites are correct
2. Check Next.js routing (pages should be in `app/` directory)
3. Ensure dynamic routes have proper file structure
4. Check middleware isn't blocking routes

### Slow Performance

**Issue:** Site is slow in production

**Solutions:**

1. Run Lighthouse audit to identify bottlenecks
2. Check image optimization (use next/image)
3. Review bundle size: `npm run build` → check `.next/` sizes
4. Enable CDN caching (automatic with Vercel)
5. Use Edge Functions for API routes (add `export const runtime = 'edge'`)

### Form Submission Failures

**Issue:** Forms not submitting or emails not sending

**Solutions:**

1. Check Resend API key is set in environment variables
2. Verify CORS headers for API routes
3. Check rate limiting isn't blocking requests
4. Review Sentry for error logs
5. Test API endpoint directly: `curl -X POST https://andersoncleaning.com/api/quote`

### SSL/HTTPS Issues

**Issue:** SSL certificate not provisioning

**Solutions:**

1. Verify domain DNS is pointing to Vercel
2. Wait up to 24 hours for certificate provisioning
3. Remove and re-add domain in Vercel
4. Check CAA records don't block Let's Encrypt

### Analytics Not Tracking

**Issue:** Google Analytics or Clarity not showing data

**Solutions:**

1. Verify tracking IDs are correct in environment variables
2. Check CSP isn't blocking analytics scripts
3. Test with browser dev tools → Network tab
4. Ensure scripts are loaded (check page source)
5. Wait 24-48 hours for data to appear

### Sanity Content Not Updating

**Issue:** Changes in Sanity Studio not reflecting on site

**Solutions:**

1. Check GROQ queries are correct
2. Verify Sanity tokens have read access
3. Clear Vercel cache
4. Use ISR (Incremental Static Regeneration): `revalidate: 60`
5. Check dataset name is correct (production vs staging)

### High Error Rates in Sentry

**Issue:** Sentry showing many errors

**Solutions:**

1. Group errors by type to identify pattern
2. Check if errors are from specific browsers/devices
3. Review recent deployments for breaking changes
4. Filter out non-critical errors (404s, network errors)
5. Set up source maps for better debugging

---

## Additional Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Deployment:** https://nextjs.org/docs/deployment
- **Sanity Deployment:** https://www.sanity.io/docs/deployment
- **Sentry Next.js:** https://docs.sentry.io/platforms/javascript/guides/nextjs/

---

## Support

For deployment issues:

1. Check this guide first
2. Review Vercel deployment logs
3. Check Sentry for errors
4. Contact Vercel Support (if needed)

---

**Last Updated:** November 2024
**Maintained By:** Development Team
