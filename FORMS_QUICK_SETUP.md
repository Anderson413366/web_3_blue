# ⚡ Forms Quick Setup - Anderson Cleaning

**Created:** 2025-11-17
**Status:** Ready for API Key

---

## 🎯 What We're Setting Up

Getting all 5 forms working perfectly:
1. ✉️ **Contact Form** (`/contact`) → Sends to info@andersoncleaning.com
2. 💼 **Quote Form** (`/quote`) → Sends to info@andersoncleaning.com
3. 👔 **Careers Form** (`/apply`) → Sends to info@andersoncleaning.com with resume attachment
4. 📬 **Newsletter** (Footer) → Sends to info@andersoncleaning.com
5. 💬 **Feedback** (Various) → Logs only (already working)

---

## ✅ What's Already Done

- ✅ Forms UI complete and responsive
- ✅ Client-side validation with Zod schemas
- ✅ Server-side validation
- ✅ Rate limiting (prevents spam)
- ✅ Input sanitization (security)
- ✅ Honeypot fields (bot protection)
- ✅ File upload handling (resumes, 5MB max)
- ✅ Error handling and user feedback
- ✅ Email service code ready (`lib/api/email.ts`)
- ✅ All API routes ready (`app/api/*`)

**Everything is coded and ready to go!** We just need the Resend API key.

---

## 📋 Your Action Items

### Step 1: Create Resend Account (2 minutes)

1. Go to: **https://resend.com**
2. Click **"Sign Up"**
3. Use email: `info@andersoncleaning.com` (recommended)
4. Verify your email
5. Free tier: **3,000 emails/month** (perfect for your needs!)

### Step 2: Add Your Domain to Resend (3 minutes)

1. In Resend dashboard, go to **"Domains"**
2. Click **"Add Domain"**
3. Enter: `andersoncleaning.com`
4. Resend will show you **3 DNS records** to add

### Step 3: Add DNS Records (5 minutes)

**You need to add 3 records to your domain registrar:**

#### Where to add DNS records?
- If domain is at **GoDaddy**: https://dcc.godaddy.com/manage/dns
- If domain is at **Namecheap**: https://ap.www.namecheap.com/domains/list/
- If domain is at **Cloudflare**: https://dash.cloudflare.com
- Other: Log into your domain registrar

#### Record 1: SPF (TXT)
```
Type: TXT
Name: @ (or andersoncleaning.com)
Value: v=spf1 include:_spf.resend.com ~all
TTL: 3600
```

#### Record 2: DKIM (TXT)
```
Type: TXT
Name: resend._domainkey
Value: [Copy from Resend dashboard - starts with p=MIGf...]
TTL: 3600
```

#### Record 3: MX Record
```
Type: MX
Name: @ (or andersoncleaning.com)
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
TTL: 3600
```

**⚠️ Important:** The DKIM value will be unique for your domain - copy it from your Resend dashboard!

### Step 4: Verify Domain in Resend (1 minute)

1. After adding DNS records, go back to Resend → Domains
2. Click **"Verify"** next to `andersoncleaning.com`
3. If verification fails, wait 5-10 minutes for DNS propagation, then try again
4. When verified, you'll see a ✅ checkmark

### Step 5: Get Your API Key (1 minute)

1. In Resend dashboard, go to **"API Keys"**
2. Click **"Create API Key"**
3. Name: `Anderson Cleaning Production`
4. **Copy the API key** (starts with `re_`)
5. ⚠️ Save it somewhere safe - you'll only see it once!

### Step 6: Provide API Key to Me

**Paste your Resend API key here and I'll handle the rest!**

The key looks like: `re_abcdefghijklmnop123456789`

---

## 🤖 What I'll Do Automatically (Once You Give Me the Key)

I have CLI access to Vercel and can configure everything:

### 1. Set Environment Variables in Vercel ✅
```bash
vercel env add RESEND_API_KEY
# Value: [your API key]
# Environments: Production, Preview

vercel env add RESEND_FROM_EMAIL
# Value: noreply@andersoncleaning.com
# Environments: Production, Preview

vercel env add NOTIFICATION_EMAIL
# Value: info@andersoncleaning.com
# Environments: Production, Preview
```

### 2. Redeploy to Production ✅
```bash
vercel --prod
```

### 3. Test All Forms ✅
- Submit test Contact form
- Submit test Quote form
- Submit test Careers form (with resume)
- Submit test Newsletter signup
- Verify all emails arrive at info@andersoncleaning.com

### 4. Verify Email Delivery ✅
- Check inbox for test emails
- Verify sender shows as `noreply@andersoncleaning.com`
- Verify reply-to works correctly
- Check spam folder if needed

### 5. Final Verification ✅
- Test rate limiting (prevents abuse)
- Test form validation errors
- Test file upload size limits
- Confirm all success messages display

---

## 📧 How Emails Will Work

### Contact Form
**To:** info@andersoncleaning.com
**From:** noreply@andersoncleaning.com
**Reply-To:** [Customer's email]
**Subject:** New Contact Form Submission from [Name]

**Email contains:**
- Customer name
- Email address
- Phone number
- Message
- Timestamp
- Reply-To: Customer's email (so you can reply directly)

### Quote Form
**To:** info@andersoncleaning.com
**From:** noreply@andersoncleaning.com
**Reply-To:** [Customer's email]
**Subject:** New Quote Request from [Name] - [Company]

**Email contains:**
- Full company details
- Facility information
- Square footage
- Services requested
- Cleaning frequency
- Special requirements
- Contact information
- Timestamp

### Careers/Apply Form
**To:** info@andersoncleaning.com
**From:** noreply@andersoncleaning.com
**Reply-To:** [Applicant's email]
**Subject:** New Job Application: [Name]

**Email contains:**
- Applicant name
- Email and phone
- Position applied for
- Experience details
- Availability
- **Resume attachment** (PDF/DOC, up to 5MB)
- Timestamp

### Newsletter
**To:** info@andersoncleaning.com
**From:** noreply@andersoncleaning.com
**Subject:** New Newsletter Subscription: [Email]

**Email contains:**
- Subscriber email
- Subscription date
- Source page (where they signed up)

---

## 🔒 Security Features (Already Built In!)

Your forms are enterprise-grade secure:

✅ **Rate Limiting**
- Contact: 5 requests / 10 minutes
- Quote: 3 requests / 5 minutes
- Careers: 2 requests / 15 minutes
- Newsletter: 3 requests / 10 minutes

✅ **Input Sanitization**
- HTML stripping (prevents XSS)
- SQL injection protection
- Script tag removal
- Special character handling

✅ **Validation**
- Email format validation
- Phone number validation
- Required field checks
- File type validation (resumes)
- File size limits (5MB max)

✅ **Spam Protection**
- Honeypot fields (invisible to humans, visible to bots)
- Rate limiting
- CAPTCHA-ready (optional, not configured yet)

✅ **Server-side Security**
- All validation runs on server
- Client-side validation is just UX
- API keys never exposed to browser
- Secure file upload handling

---

## 🧪 Testing Checklist (I'll Do This)

Once env vars are set:

### Contact Form Test
- [ ] Submit with valid data
- [ ] Verify email received at info@andersoncleaning.com
- [ ] Verify reply-to works (try replying to test email)
- [ ] Test required field validation
- [ ] Test email format validation
- [ ] Test rate limiting (submit 6 times quickly)

### Quote Form Test
- [ ] Complete all 4 steps
- [ ] Submit with company details
- [ ] Verify email with full quote info
- [ ] Test multi-step navigation (back/next)
- [ ] Test form persistence (refresh doesn't lose data)

### Careers Form Test
- [ ] Fill out application
- [ ] Upload PDF resume
- [ ] Verify email with attachment
- [ ] Test file size limit (try 6MB file)
- [ ] Test file type validation (try .txt file)

### Newsletter Test
- [ ] Enter email in footer
- [ ] Verify subscription email
- [ ] Test duplicate submission handling
- [ ] Test invalid email format

---

## ⏱️ Timeline

**Total setup time:** ~15 minutes

1. Create Resend account: **2 min**
2. Add domain to Resend: **3 min**
3. Add DNS records: **5 min**
4. Verify domain: **1 min** (may need to wait 5-10 min for DNS)
5. Get API key: **1 min**
6. Give me the key: **1 min**
7. **I configure everything: 5 min**
8. **I test everything: 10 min**

**Forms working:** Within 30 minutes of starting!

---

## 🆘 Troubleshooting

### "Domain not verified"
- Wait 5-10 minutes for DNS propagation
- Check DNS records are exactly as shown by Resend
- Try verifying again

### "SPF record conflict"
- If you have existing SPF, merge them:
- `v=spf1 include:existing.com include:_spf.resend.com ~all`

### "Emails going to spam"
- Domain verification may still be propagating (wait 24-48h)
- Ask recipient to mark as "Not Spam"
- Check SPF/DKIM are verified in Resend

### "Can't find DNS settings"
- Contact your domain registrar support
- Most have 24/7 chat
- Search "[registrar name] add DNS records"

---

## 📞 Support

**I'm here to help!**

Once you provide the API key, I'll:
1. Configure everything in Vercel ✅
2. Deploy to production ✅
3. Test all 4 forms ✅
4. Verify email delivery ✅
5. Provide you with test results ✅

**No manual work needed from you after providing the key!**

---

## 🎯 Next Steps

**Right now:**
1. ☑️ Go to https://resend.com and create account
2. ☑️ Add domain `andersoncleaning.com`
3. ☑️ Add the 3 DNS records to your domain registrar
4. ☑️ Verify domain in Resend
5. ☑️ Create API key
6. ☑️ **Give me the API key** → I'll handle the rest!

**Questions?** Ask me anything! I'm here to make this as smooth as possible.
