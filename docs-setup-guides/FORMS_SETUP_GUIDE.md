# 📋 Forms Configuration & Setup Guide
## Anderson Cleaning Website

Last Updated: 2025-11-17

---

## 📊 Forms Overview

Your application has **5 forms** with **4 API endpoints**:

| Form | Page | API Endpoint | Status | Priority |
|------|------|--------------|--------|----------|
| **Contact Form** | `/contact` | `/api/contact` | ⚠️ Needs Setup | 🔴 HIGH |
| **Quote Form** | `/quote` | `/api/quote` | ⚠️ Needs Setup | 🔴 HIGH |
| **Careers/Apply Form** | `/apply` | `/api/careers` | ⚠️ Needs Setup | 🟡 MEDIUM |
| **Newsletter Form** | Footer (all pages) | `/api/newsletter` | ⚠️ Needs Setup | 🟢 LOW |
| **Feedback Form** | Various pages | `/api/feedback` | ✅ Works (logs only) | 🟢 LOW |

---

## 🚨 Current Status: FORMS WILL NOT WORK

**Why?** The forms are coded correctly, but **email service is NOT configured**.

### What Happens Now:
1. User fills out form ✅
2. Form validates data ✅
3. API tries to send email ❌ **FAILS** (no API key)
4. User sees error message ❌

### What You Need:
- **Resend Account** (email service)
- **API Key** from Resend
- **Environment Variables** set in Vercel

---

## 🔧 Required Setup

### Step 1: Create Resend Account

1. Go to https://resend.com
2. Sign up for free account (includes 3,000 emails/month free)
3. Verify your account

### Step 2: Add Your Domain (Optional but Recommended)

**Option A: Use Resend's Domain (Quick)**
- Send from: `onboarding@resend.dev`
- ⚠️ May go to spam
- ✅ Works immediately

**Option B: Use Your Domain (Best for Production)**
- Send from: `noreply@andersoncleaning.com`
- ✅ Better deliverability
- ⏱️ Requires DNS setup (10 mins)

To add your domain in Resend:
1. Dashboard → Domains → Add Domain
2. Enter: `andersoncleaning.com`
3. Add these DNS records to your domain registrar:

```
Type: TXT
Name: @ or andersoncleaning.com
Value: [provided by Resend]

Type: TXT
Name: resend._domainkey
Value: [provided by Resend]

Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

### Step 3: Get API Key

1. In Resend dashboard: API Keys → Create API Key
2. Name it: `Production - Anderson Cleaning`
3. Copy the key (starts with `re_`)
4. **Save it securely** - you'll only see it once!

---

## 🔑 Environment Variables Setup

### For Vercel Production

Go to: https://vercel.com/your-project/settings/environment-variables

Add these **3 required variables**:

#### 1. RESEND_API_KEY
```
Value: re_xxxxxxxxxxxxxxxxxxxx
Environment: Production, Preview
```

#### 2. RESEND_FROM_EMAIL
```
Value: noreply@andersoncleaning.com
OR
Value: onboarding@resend.dev (if not using custom domain)
Environment: Production, Preview
```

#### 3. NOTIFICATION_EMAIL
```
Value: info@andersoncleaning.com
(This is where form submissions are sent)
Environment: Production, Preview
```

### Optional but Recommended

#### 4. NEXT_PUBLIC_RECAPTCHA_SITE_KEY
```
Value: 6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
(Get from https://www.google.com/recaptcha/admin)
Environment: Production, Preview
```

#### 5. RECAPTCHA_SECRET_KEY
```
Value: 6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
Environment: Production, Preview
```

---

## 📧 Email Configuration Details

### How It Works

```
User submits form
    ↓
Form validation (client-side)
    ↓
API endpoint validates (server-side)
    ↓
Rate limiting check
    ↓
Sanitization & security checks
    ↓
Generate email HTML
    ↓
Send via Resend API ← REQUIRES API KEY
    ↓
Return success/error to user
```

### Email Service (Resend)

**File:** `lib/api/email.ts`

```typescript
// Current configuration
const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@anderson-cleaning-site.vercel.app'
const notificationEmail = process.env.NOTIFICATION_EMAIL || 'info@anderson-cleaning-site.vercel.app'
```

**What emails are sent:**

1. **Contact Form** → `info@andersoncleaning.com`
   - Subject: "New Contact Form Submission from [Name]"
   - Contains: Name, Email, Phone, Message
   - Reply-To: Customer's email

2. **Quote Form** → `info@andersoncleaning.com`
   - Subject: "New Quote Request from [Name] - [Company]"
   - Contains: Full form data (company, facility, square footage, etc.)
   - Reply-To: Customer's email

3. **Careers Form** → `info@andersoncleaning.com`
   - Subject: "New Job Application: [Name]"
   - Contains: Applicant details + Resume attachment
   - Reply-To: Applicant's email
   - **Attachment:** Resume (PDF/DOC, max 5MB)

4. **Newsletter** → `info@andersoncleaning.com`
   - Subject: "New Newsletter Subscription: [Email]"
   - Contains: Email address + timestamp

---

## 🔒 Security Features (Already Implemented)

Your forms have excellent security:

### Rate Limiting
- **Contact:** 5 requests / 10 minutes
- **Quote:** 3 requests / 5 minutes
- **Careers:** 2 requests / 15 minutes
- **Newsletter:** 3 requests / 10 minutes

### Input Sanitization
- HTML stripping
- XSS prevention
- SQL injection protection
- Filename sanitization (file uploads)

### Validation
- Zod schema validation
- Email format checking
- Phone number validation
- File type/size validation

### Honeypot
- Bot detection field
- Silently rejects bot submissions

---

## ✅ Testing Checklist

Once environment variables are set:

### 1. Test Contact Form
- [ ] Go to https://anderson-cleaning-site.vercel.app/contact
- [ ] Fill out form with valid data
- [ ] Submit and verify success message
- [ ] Check `info@andersoncleaning.com` for email
- [ ] Verify email has correct info and Reply-To works

### 2. Test Quote Form
- [ ] Go to https://anderson-cleaning-site.vercel.app/quote
- [ ] Complete all 4 steps
- [ ] Submit and verify success message
- [ ] Check inbox for quote request email
- [ ] Verify all form data is in email

### 3. Test Careers Form
- [ ] Go to https://anderson-cleaning-site.vercel.app/apply
- [ ] Fill out application
- [ ] Upload resume (PDF or DOC)
- [ ] Submit and verify success
- [ ] Check inbox for application email
- [ ] Verify resume attachment is included

### 4. Test Newsletter
- [ ] Find newsletter signup in footer
- [ ] Enter email address
- [ ] Submit and verify success message
- [ ] Check inbox for subscription notification

### 5. Test Rate Limiting
- [ ] Submit same form multiple times quickly
- [ ] Verify rate limit message appears
- [ ] Wait for cooldown period
- [ ] Verify form works again

### 6. Test Error Handling
- [ ] Submit form with invalid email
- [ ] Submit form with missing required fields
- [ ] Verify appropriate error messages

---

## 🐛 Troubleshooting

### "RESEND_API_KEY not configured" Error

**Cause:** Environment variable not set in Vercel

**Fix:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add RESEND_API_KEY
3. Redeploy: `git commit --allow-empty -m "trigger deploy" && git push`

### Emails Going to Spam

**Cause:** Using Resend's default domain or no SPF/DKIM records

**Fix:**
1. Add your custom domain in Resend
2. Add all DNS records (SPF, DKIM, MX)
3. Wait 24-48 hours for DNS propagation
4. Send test email

### "Too Many Requests" Error

**Cause:** Rate limiting triggered (this is working as intended)

**Fix:**
- Wait for cooldown period
- Rate limits are intentionally strict to prevent abuse
- If legitimate use case, adjust limits in API routes

### Resume Upload Fails

**Cause:** File too large or wrong type

**Fix:**
- Maximum size: 5MB
- Allowed types: PDF, DOC, DOCX
- Compress PDFs: https://smallpdf.com/compress-pdf

### Form Submits but No Email Received

**Possible causes:**
1. Wrong NOTIFICATION_EMAIL in Vercel
2. Email in spam folder
3. Domain not verified in Resend
4. API key invalid/expired

**Debug steps:**
1. Check Vercel logs: `vercel logs`
2. Look for `[EMAIL]` log entries
3. Check Resend dashboard for send activity
4. Verify environment variables are set

---

## 📊 Current Form Status Summary

### What's Working ✅
- Form UI and validation
- Client-side validation
- Server-side validation
- Rate limiting
- Security features (sanitization, honeypot)
- Error handling
- File upload handling

### What Needs Setup ⚠️
- **Resend account creation**
- **API key generation**
- **Environment variables in Vercel**
- **Email testing**

### Optional Enhancements 🎯
- Google reCAPTCHA (reduces spam further)
- HubSpot CRM integration (auto-create contacts)
- Email confirmation to users
- Custom thank you pages
- Analytics tracking

---

## 🚀 Quick Start (5 Minutes)

### Fastest Path to Working Forms:

1. **Sign up for Resend** (2 min)
   - https://resend.com

2. **Get API Key** (1 min)
   - Dashboard → API Keys → Create

3. **Add to Vercel** (2 min)
   - Settings → Environment Variables
   - Add: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `NOTIFICATION_EMAIL`
   - Use `onboarding@resend.dev` for FROM email (works immediately)

4. **Redeploy** (automatic)
   - Vercel will auto-deploy when env vars change
   - Or: `git commit --allow-empty -m "deploy" && git push`

5. **Test** (2 min)
   - Submit contact form
   - Check your email
   - ✅ Done!

---

## 📞 Support

If forms still don't work after setup:

1. Check Vercel logs: https://vercel.com/dashboard
2. Check Resend dashboard: https://resend.com/emails
3. Verify environment variables are set correctly
4. Try redeploying

**Email me the error logs if you need help debugging!**

---

## 💡 Pro Tips

1. **Test in Preview First**
   - Create a branch
   - Test forms in preview deployment
   - Once working, merge to main

2. **Monitor Email Deliverability**
   - Check Resend analytics dashboard
   - Monitor bounce rates
   - Watch for spam reports

3. **Set Up Email Alerts**
   - Get notified when forms submitted
   - Use Resend webhooks
   - Forward to phone via email-to-SMS

4. **Backup Plan**
   - Have phone number visible (413) 306-5053
   - Email address for manual contact
   - Multiple contact methods

---

**Status:** ⚠️ Forms configured but email service NOT active

**Next Step:** Set up Resend account and add environment variables to Vercel

**Time to Working Forms:** ~5-10 minutes

---

Generated: 2025-11-17
