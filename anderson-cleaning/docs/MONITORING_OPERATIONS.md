# Monitoring & Operations Guide

Comprehensive guide for monitoring and maintaining Anderson Cleaning website in production.

## Table of Contents

- [Overview](#overview)
- [Health Checks](#health-checks)
- [Performance Monitoring](#performance-monitoring)
- [Error Tracking](#error-tracking)
- [Uptime Monitoring](#uptime-monitoring)
- [Analytics](#analytics)
- [Alerts & Notifications](#alerts--notifications)
- [Daily Operations](#daily-operations)
- [Weekly Maintenance](#weekly-maintenance)
- [Monthly Review](#monthly-review)
- [Incident Response](#incident-response)

---

## Overview

### Monitoring Stack

| Service            | Purpose                       | Dashboard                                              |
| ------------------ | ----------------------------- | ------------------------------------------------------ |
| Vercel Analytics   | Traffic & Web Vitals          | [vercel.com/dashboard](https://vercel.com/dashboard)   |
| Google Analytics 4 | User behavior & conversions   | [analytics.google.com](https://analytics.google.com)   |
| Microsoft Clarity  | Session recordings & heatmaps | [clarity.microsoft.com](https://clarity.microsoft.com) |
| Sentry             | Error tracking & performance  | [sentry.io](https://sentry.io)                         |
| UptimeRobot        | Uptime & availability         | [uptimerobot.com](https://uptimerobot.com)             |
| Lighthouse CI      | Performance budgets           | GitHub Actions                                         |

### Key Metrics to Monitor

**Performance:**

- LCP (Largest Contentful Paint): Target < 2.5s
- FID/INP (First Input Delay / Interaction to Next Paint): Target < 100ms / 200ms
- CLS (Cumulative Layout Shift): Target < 0.1
- TTFB (Time to First Byte): Target < 800ms

**Business:**

- Quote form submissions
- Contact form submissions
- Careers applications
- Page views
- Bounce rate
- Conversion rate

**Technical:**

- Error rate
- API response times
- Build success rate
- Uptime percentage

---

## Health Checks

### Create Health Check Endpoint

**File:** `app/api/health/route.ts`

```typescript
import { NextResponse } from 'next/server'

export async function GET() {
  const healthData = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.VERCEL_GIT_COMMIT_SHA?.substring(0, 7) || 'unknown',
    environment: process.env.VERCEL_ENV || 'development',
    checks: {
      sanity: await checkSanity(),
      email: await checkEmail(),
    },
  }

  return NextResponse.json(healthData)
}

async function checkSanity() {
  try {
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/ping`
    )
    return response.ok ? 'healthy' : 'unhealthy'
  } catch {
    return 'unhealthy'
  }
}

async function checkEmail() {
  // Check if Resend API is accessible
  try {
    const response = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    })
    return response.ok ? 'healthy' : 'unhealthy'
  } catch {
    return 'unhealthy'
  }
}
```

**Test Health Check:**

```bash
curl https://andersoncleaning.com/api/health
```

**Expected Response:**

```json
{
  "status": "ok",
  "timestamp": "2024-11-14T12:00:00.000Z",
  "version": "abc1234",
  "environment": "production",
  "checks": {
    "sanity": "healthy",
    "email": "healthy"
  }
}
```

---

## Performance Monitoring

### Vercel Speed Insights

**Enable:**

1. Vercel Dashboard → Project → Speed Insights
2. Enable feature (no code changes needed)

**View Metrics:**

- Real User Monitoring (RUM) data
- Core Web Vitals by page
- Performance Score over time
- Device and browser breakdown

**Alerts:**
Set up alerts for:

- LCP > 3.0s
- CLS > 0.2
- INP > 300ms

### Real User Monitoring (RUM)

Already configured in `lib/utils/analytics.ts`:

```typescript
import { reportWebVitals } from '@/lib/utils/analytics'

// Automatically tracks:
// - LCP, FID/INP, CLS, FCP, TTFB
// - Sends to Google Analytics
// - Sends to Sentry
```

**View in Google Analytics:**

1. GA4 Dashboard → Events → web_vitals
2. Custom reports → Web Vitals Report

**View in Sentry:**

1. Sentry Dashboard → Performance → Web Vitals
2. Filter by poor/needs improvement

### Lighthouse CI

**Automated via GitHub Actions:**

- Runs on every PR
- Blocks merge if budgets exceeded
- Uploads reports to artifacts

**Manual Run:**

```bash
npm run lighthouse
```

**View Reports:**

- GitHub Actions → Artifacts → lighthouse-results
- Or: `npx @lhci/cli open`

---

## Error Tracking

### Sentry Configuration

**Already configured in:**

- `sentry.client.config.ts` - Browser errors
- `sentry.server.config.ts` - Server errors
- `sentry.edge.config.ts` - Edge function errors

**Key Features:**

- Automatic error capture
- Source maps for debugging
- Performance monitoring
- Release tracking
- User context (session ID, user agent)

### Monitor These Error Types

**Client-Side Errors:**

- JavaScript exceptions
- Unhandled promise rejections
- Network failures
- Third-party script errors

**Server-Side Errors:**

- API route failures
- Database connection issues
- Email sending failures
- Authentication errors

**Performance Issues:**

- Slow API responses (> 1s)
- Large bundle sizes
- Long tasks (> 50ms)

### Error Rate Targets

| Metric                      | Target     | Alert Threshold |
| --------------------------- | ---------- | --------------- |
| Error rate                  | < 0.1%     | > 0.5%          |
| New issues                  | < 5/day    | > 10/day        |
| Unresolved issues           | < 10       | > 20            |
| MTTR (Mean Time to Resolve) | < 24 hours | > 48 hours      |

### Sentry Alerts Setup

1. Go to Sentry → Alerts → Create Alert
2. Create alerts for:
   - Error rate > 10/hour
   - New issue created
   - Unresolved issue count > 20
   - Performance regression detected

**Alert Channels:**

- Email: dev@andersoncleaning.com
- Slack: #alerts channel (if applicable)
- PagerDuty: For critical alerts (optional)

---

## Uptime Monitoring

### UptimeRobot Setup

**Monitors:**

1. **Homepage**
   - URL: https://andersoncleaning.com
   - Type: HTTP(s)
   - Interval: 5 minutes
   - Expected: 200 OK

2. **Quote Form Page**
   - URL: https://andersoncleaning.com/quote
   - Type: HTTP(s)
   - Interval: 5 minutes
   - Expected: 200 OK

3. **API Health**
   - URL: https://andersoncleaning.com/api/health
   - Type: HTTP(s)
   - Interval: 5 minutes
   - Expected: 200 OK with "status": "ok"

4. **Sanity Studio**
   - URL: https://andersoncleaning.com/studio
   - Type: HTTP(s)
   - Interval: 15 minutes
   - Expected: 200 OK

**Alert Contacts:**

- Email: admin@andersoncleaning.com
- SMS: +1-555-XXX-XXXX (optional, for critical alerts)

**Uptime Targets:**

- Target: 99.9% uptime (≈43 minutes downtime/month)
- Alert: If down for > 5 minutes

### Status Page

**Create Public Status Page:**

1. UptimeRobot → My Settings → Status Pages
2. Create new status page: status.andersoncleaning.com
3. Add all monitors
4. Share URL with stakeholders

**Or use Vercel Status:**

- Automatic status page at vercel-status.com
- Shows Vercel infrastructure status

---

## Analytics

### Google Analytics 4

**Key Reports to Monitor:**

**Traffic Sources:**

- Acquisition → Traffic acquisition
- Check: Organic search, Direct, Referral, Social

**User Behavior:**

- Engagement → Pages and screens
- Top pages by views
- Average engagement time
- Bounce rate by page

**Conversions:**

- Events → All events
- Track: form_submission, quote_request, contact_request

**Real-Time:**

- Real-time → Overview
- Current active users
- Top pages right now

**Custom Events Setup:**

Already configured in `lib/utils/analytics.ts`:

```typescript
// Track custom events
gtag('event', 'quote_submission', {
  event_category: 'Conversions',
  event_label: 'Quote Form',
  value: 1,
})
```

**Goals to Track:**

1. Quote form submissions
2. Contact form submissions
3. Careers applications
4. Phone number clicks
5. Chat widget opens
6. Calendly bookings

### Microsoft Clarity

**Session Recordings:**

1. Clarity Dashboard → Recordings
2. Watch user sessions to identify:
   - Usability issues
   - Confusing UI elements
   - Error messages users encounter
   - Drop-off points in forms

**Heatmaps:**

1. Clarity Dashboard → Heatmaps
2. Analyze:
   - Click maps: Where users click
   - Scroll maps: How far users scroll
   - Area maps: Attention zones

**Filters:**

- Filter by: Device, Browser, Country, Page URL
- Look for patterns in user behavior

**Insights:**

- Dead clicks (clicks that do nothing)
- Rage clicks (frustrated rapid clicking)
- Excessive scrolling
- Quick backs

---

## Alerts & Notifications

### Alert Priority Levels

**P0 - Critical (Immediate Response)**

- Site is completely down
- Payment/form system not working
- Data breach detected
- Error rate > 10%

**Action:** Page on-call engineer, fix immediately

**P1 - High (Response within 1 hour)**

- Single page not loading
- API endpoint failing
- Uptime < 95% in last hour
- Performance degradation > 50%

**Action:** Notify team, investigate and fix ASAP

**P2 - Medium (Response within 4 hours)**

- Minor functionality broken
- Performance regression < 50%
- Error rate > 1% but < 10%
- New Sentry issues

**Action:** Create ticket, fix in next sprint

**P3 - Low (Response within 24 hours)**

- Visual bugs
- Typos
- Non-critical feature requests
- Performance optimization opportunities

**Action:** Add to backlog

### Notification Channels

**Email:**

- Primary: dev@andersoncleaning.com
- Secondary: admin@andersoncleaning.com

**Slack (if applicable):**

- #alerts - All automated alerts
- #deployments - Deployment notifications
- #errors - Sentry error summaries

**SMS (for P0 alerts only):**

- On-call engineer phone number

---

## Daily Operations

### Morning Checklist (5 minutes)

- [ ] Check Vercel dashboard for deployment status
- [ ] Review overnight traffic in GA4
- [ ] Check Sentry for new errors (should be 0)
- [ ] Verify uptime (should be 100%)
- [ ] Check form submissions (quote, contact, careers)
- [ ] Review Microsoft Clarity for any user issues

**Dashboard:**
Create a custom dashboard aggregating all metrics.

### Monitoring Form Submissions

**HubSpot Dashboard:**

1. Check new contacts from website forms
2. Verify lead source tracking
3. Ensure auto-responses sent

**Email Notifications:**

- Quote requests should email sales team
- Career applications should email HR
- Contact forms should email support

**Test Monthly:**

```bash
# Test quote form
curl -X POST https://andersoncleaning.com/api/quote \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
```

---

## Weekly Maintenance

### Performance Review (30 minutes)

**Monday Morning:**

1. Run Lighthouse audit on production
2. Check Core Web Vitals trends
3. Review page load times
4. Identify and optimize slowest pages

**Use Vercel Analytics:**

- Compare week-over-week performance
- Identify pages with CLS issues
- Check for performance regressions

### Error Review (15 minutes)

**Wednesday:**

1. Review all Sentry errors from past week
2. Prioritize and assign fixes
3. Resolve or mark as won't-fix
4. Check for error patterns

**Create Dashboard View:**

- Errors by page
- Errors by browser
- Most frequent errors
- Unresolved issues

### Content Review (15 minutes)

**Friday:**

1. Check for broken links (use Screaming Frog or similar)
2. Verify all images loading
3. Test all forms
4. Check Sanity CMS for pending changes

---

## Monthly Review

### Performance Audit (1 hour)

**First Monday of Month:**

1. Full Lighthouse audit of all pages
2. Review bundle sizes:
   ```bash
   npm run build
   # Check .next/static/ sizes
   ```
3. Analyze Web Vitals data:
   - Calculate 75th percentile for LCP, FID, CLS
   - Compare to targets
   - Identify pages needing optimization

4. Review Core Web Vitals in Google Search Console
5. Check mobile usability issues

### Security Review (30 minutes)

1. Run `npm audit`
2. Update dependencies:
   ```bash
   npm outdated
   npm update
   ```
3. Review security headers (securityheaders.com)
4. Check SSL certificate expiration (auto-renewed by Vercel)
5. Review access logs for suspicious activity

### Analytics Deep Dive (1 hour)

1. **Traffic Analysis:**
   - Total visitors (month-over-month growth)
   - Traffic sources breakdown
   - Top landing pages
   - Exit pages (where users leave)

2. **Conversion Analysis:**
   - Quote form conversion rate
   - Contact form submissions
   - Careers applications
   - Goal completion rate

3. **User Behavior:**
   - Average session duration
   - Pages per session
   - Bounce rate by page
   - Device breakdown (mobile vs desktop)

4. **SEO Performance:**
   - Organic search traffic
   - Top keywords (Google Search Console)
   - Click-through rate (CTR)
   - Average position in search results

### Cost Review (15 minutes)

**Review Costs for:**

- Vercel hosting
- Sanity CMS
- Third-party services (Resend, HubSpot, etc.)
- CDN bandwidth
- Sentry quota

**Optimize:**

- Review and remove unused services
- Check for overages
- Adjust plans if needed

---

## Incident Response

### Incident Severity

**SEV1 - Critical**

- Complete site outage
- Payment/forms completely broken
- Data breach

**Response Time:** Immediate
**Team:** All hands on deck

**SEV2 - High**

- Partial outage (1-2 pages down)
- Significant performance degradation
- Major feature broken

**Response Time:** < 1 hour
**Team:** On-call engineer + lead

**SEV3 - Medium**

- Minor functionality broken
- Moderate performance issues

**Response Time:** < 4 hours
**Team:** On-call engineer

### Incident Response Procedure

**1. Detect & Alert**

- Automated alerts from monitoring tools
- User reports
- Team discovery

**2. Acknowledge**

- Acknowledge alert (Sentry, UptimeRobot)
- Notify team (#incidents Slack channel)
- Create incident ticket

**3. Assess**

- Determine severity level
- Identify affected users/pages
- Check recent deployments

**4. Mitigate**

- For deployment issues: Rollback immediately
- For infrastructure: Check Vercel status
- For third-party: Check service status

**5. Fix**

- Identify root cause
- Implement fix
- Test thoroughly
- Deploy fix

**6. Verify**

- Confirm fix resolved issue
- Check monitoring shows green
- Test affected functionality

**7. Post-Mortem**

- Document what happened
- Root cause analysis
- Action items to prevent recurrence
- Share learnings with team

### Rollback Decision Tree

```
Is the issue critical? (SEV1)
  ├─ Yes → Rollback immediately
  │        └─ Fix in separate deployment
  └─ No  → Can you hotfix quickly? (< 15 min)
           ├─ Yes → Hotfix and deploy
           └─ No  → Rollback, fix properly, redeploy
```

### Emergency Contacts

| Role             | Contact            | Availability    |
| ---------------- | ------------------ | --------------- |
| On-Call Engineer | [Phone/Email]      | 24/7            |
| Team Lead        | [Phone/Email]      | Business hours  |
| Vercel Support   | support@vercel.com | 24/7 (Pro plan) |
| Sanity Support   | support@sanity.io  | Business hours  |

---

## Automation & Scripts

### Daily Health Check Script

**File:** `scripts/health-check.sh`

```bash
#!/bin/bash

DOMAIN="https://andersoncleaning.com"
SLACK_WEBHOOK="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

check_health() {
  RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$1")
  if [ "$RESPONSE" -ne 200 ]; then
    echo "❌ FAIL: $1 returned $RESPONSE"
    # Send Slack alert
    curl -X POST "$SLACK_WEBHOOK" \
      -H 'Content-Type: application/json' \
      -d "{\"text\":\"⚠️ Health check failed for $1\"}"
    exit 1
  else
    echo "✅ PASS: $1"
  fi
}

echo "Running health checks..."
check_health "$DOMAIN"
check_health "$DOMAIN/api/health"
check_health "$DOMAIN/quote"
echo "All checks passed!"
```

**Run via Cron:**

```bash
# Run every hour
0 * * * * /path/to/health-check.sh
```

### Weekly Report Script

**File:** `scripts/weekly-report.sh`

```bash
#!/bin/bash

# Generate weekly performance report
echo "📊 Weekly Report for $(date)"
echo "================================"

# Get Lighthouse scores
npx @lhci/cli autorun --collect.numberOfRuns=1

# Get error count from Sentry (requires Sentry CLI)
sentry-cli issues list --status unresolved

# Get uptime from UptimeRobot API
curl "https://api.uptimerobot.com/v2/getMonitors" \
  -H "Content-Type: application/json" \
  -d '{"api_key":"YOUR_API_KEY"}'
```

---

## Best Practices

### Do's

✅ Monitor metrics continuously
✅ Set up alerts before issues occur
✅ Document all incidents
✅ Review and update dashboards regularly
✅ Test monitoring system (trigger test alerts)
✅ Keep runbooks up to date
✅ Share weekly reports with team

### Don'ts

❌ Ignore alerts (alert fatigue)
❌ Set too many noisy alerts
❌ Skip post-mortems
❌ Forget to test recovery procedures
❌ Rely on single monitoring tool
❌ Wait for users to report issues

---

## Resources

- **Vercel Docs:** https://vercel.com/docs/observability
- **Sentry Docs:** https://docs.sentry.io
- **GA4 Help:** https://support.google.com/analytics
- **Web Vitals:** https://web.dev/vitals/

---

**Last Updated:** November 2024
**Maintained By:** DevOps Team
