# 📧 Resend DNS Setup Guide for andersoncleaning.com

**Last Updated:** 2025-11-17
**Domain:** andersoncleaning.com
**Purpose:** Enable professional email sending from noreply@andersoncleaning.com

---

## 🎯 Overview

This guide will help you add DNS records to your domain registrar so that emails sent from your website come from `noreply@andersoncleaning.com` instead of `onboarding@resend.dev`.

**Time Required:** 10 minutes
**DNS Propagation:** Up to 24-48 hours (usually much faster)

---

## 📋 Step-by-Step Instructions

### Step 1: Add Domain in Resend

1. Log into your Resend dashboard: https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `andersoncleaning.com`
4. Click **"Add"**

### Step 2: Get Your DNS Records from Resend

After adding the domain, Resend will show you **3 DNS records** that you need to add. They will look something like this:

```
Record 1 - SPF (TXT)
Name: andersoncleaning.com (or @)
Type: TXT
Value: v=spf1 include:_spf.resend.com ~all

Record 2 - DKIM (TXT)
Name: resend._domainkey.andersoncleaning.com
Type: TXT
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC... [long string]

Record 3 - Return-Path (MX)
Name: andersoncleaning.com (or @)
Type: MX
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10
```

**⚠️ IMPORTANT:** The exact values will be different for your domain. Copy them from your Resend dashboard!

### Step 3: Add DNS Records to Your Domain Registrar

**Where is your domain registered?**
- GoDaddy? → Go to https://dcc.godaddy.com/manage/dns
- Namecheap? → Go to https://ap.www.namecheap.com/domains/list/
- Cloudflare? → Go to https://dash.cloudflare.com
- Other registrar? → Log into your domain registrar's DNS management panel

**For each of the 3 records:**

#### Record 1 - SPF (TXT Record)
1. Click **"Add Record"** or **"Add DNS Record"**
2. Type: `TXT`
3. Name/Host: `@` (or `andersoncleaning.com` if @ doesn't work)
4. Value: Copy the SPF value from Resend (starts with `v=spf1`)
5. TTL: `3600` (or leave default)
6. Save

#### Record 2 - DKIM (TXT Record)
1. Click **"Add Record"**
2. Type: `TXT`
3. Name/Host: `resend._domainkey` (or `resend._domainkey.andersoncleaning.com`)
4. Value: Copy the DKIM value from Resend (long string starting with `p=`)
5. TTL: `3600` (or leave default)
6. Save

#### Record 3 - MX Record
1. Click **"Add Record"**
2. Type: `MX`
3. Name/Host: `@` (or `andersoncleaning.com`)
4. Value/Points to: `feedback-smtp.us-east-1.amazonses.com`
5. Priority: `10`
6. TTL: `3600` (or leave default)
7. Save

### Step 4: Verify in Resend

1. Go back to Resend dashboard → Domains
2. Click **"Verify"** next to your domain
3. If all records are correct, it will show ✅ **Verified**
4. If not verified yet, wait 5-10 minutes and try again

---

## 🔍 Common Issues & Solutions

### ❌ "DNS records not found"
- **Solution:** Wait 5-10 minutes for DNS propagation, then click Verify again

### ❌ "SPF record conflict"
- **Solution:** If you already have an SPF record, merge them:
  - Old: `v=spf1 include:_spf.google.com ~all`
  - New: `v=spf1 include:_spf.google.com include:_spf.resend.com ~all`

### ❌ "MX record priority issue"
- **Solution:** Make sure MX priority is set to `10`
- If you have existing MX records (for email hosting), you may need to:
  - Keep your existing MX records with lower priority (e.g., priority 1)
  - Add Resend MX with higher priority number (e.g., priority 10)

### ❌ "DKIM value too long"
- **Solution:** Some DNS providers split long TXT records. That's okay! Just paste the full value.

---

## ✅ Verification Checklist

After adding DNS records, verify:

- [ ] SPF record added (TXT with `v=spf1 include:_spf.resend.com ~all`)
- [ ] DKIM record added (TXT with long `p=MIGf...` value)
- [ ] MX record added (MX pointing to `feedback-smtp.us-east-1.amazonses.com`)
- [ ] Domain shows as ✅ Verified in Resend dashboard
- [ ] Test email sent successfully

---

## 📧 Test Email

Once verified, Resend will allow sending from `noreply@andersoncleaning.com`

We'll test all forms to confirm emails are being delivered properly.

---

## 🆘 Need Help?

If you get stuck:
1. Check your domain registrar's DNS help docs
2. Most registrars have 24/7 chat support
3. Take a screenshot of your DNS records and I can review them
4. Can always fall back to Option A temporarily (onboarding@resend.dev)

---

**Next Step:** Once you've added the DNS records and they're verified in Resend, provide me with your API key and I'll configure everything else automatically!
