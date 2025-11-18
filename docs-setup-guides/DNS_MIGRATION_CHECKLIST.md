# DNS Migration Checklist - Anderson Cleaning

## CRITICAL: Add These DNS Records in Vercel Dashboard

Go to: Vercel Dashboard → Settings → Domains → andersoncleaning.com → DNS Records

---

## 1. Google Workspace Email (CRITICAL - DO FIRST!)

### MX Records (Email Receiving):
```
Type: MX
Name: @
Value: aspmx.l.google.com
Priority: 1

Type: MX
Name: @
Value: alt1.aspmx.l.google.com
Priority: 5

Type: MX
Name: @
Value: alt2.aspmx.l.google.com
Priority: 5

Type: MX
Name: @
Value: alt3.aspmx.l.google.com
Priority: 10

Type: MX
Name: @
Value: alt4.aspmx.l.google.com
Priority: 10
```

### SPF Record (Email Sending - combines Google + HubSpot):
```
Type: TXT
Name: @
Value: v=spf1 a mx include:_spf.google.com include:22703473.spf10.hubspotemail.net ~all
```

### Google DKIM (Email Authentication):
```
Type: TXT
Name: google._domainkey
Value: v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAy3gQtjzXSnCX0Fhr1wUR30w5yb8KBQuF7eW1RvyxppOHwKb5m3pXevnWktq9z1WpnuC5RrzFd/c96CbXvAZWGcvgCwMEytx9IDIUcKsbsL1MXYURA0NNw7s0IoOKAs+s2ELKi1AVt7cFYQMu2tqe7TBRZ3hs0+yHQQgx40maoKMCnh1PwU5OePPTKgPnhwTk5IYGCRDugTysgiB8UsyT4V1xWO7QQPIXPfEyAsraj1raqjOqGRaAtCOlxfCM/KrFs5T6SizKFR4SY0ZTPpp92ViYApzTYk9wOm+3JhVUodWVSZKWhEALKZxF7+/j0DDQK3fx0kmexld1uvD3a5TmpQIDAQAB
```

### DMARC Policy (Email Security):
```
Type: TXT
Name: _dmarc
Value: v=DMARC1;p=quarantine;sp=quarantine;adkim=r;aspf=r;pct=100;fo=1;rf=afrf;ri=86400;rua=mailto:agomes@andersoncleaning.com;ruf=mailto:agomes@andersoncleaning.com
```

---

## 2. HubSpot Marketing Email

### HubSpot DKIM Records:
```
Type: CNAME
Name: hs1-22703473._domainkey
Value: andersoncleaning-com.hs14a.dkim.hubspotemail.net

Type: CNAME
Name: hs2-22703473._domainkey
Value: andersoncleaning-com.hs14b.dkim.hubspotemail.net
```

---

## 3. Domain Verifications

### Google Site Verification:
```
Type: TXT
Name: @
Value: google-site-verification=Vx57vBYUHftpSXKZUyqq8h20ddmlSuaapsIoLfb2m28
```

### Facebook Domain Verification:
```
Type: TXT
Name: @
Value: facebook-domain-verification=u332a35zeua4rrj8vwa46pdk7n0zzh
```

### Apple Domain Verification:
```
Type: TXT
Name: @
Value: apple-domain-verification=ohcGbRRHBOz7YCk1
```

### OpenAI Domain Verification:
```
Type: TXT
Name: @
Value: openai-domain-verification=dv-ZXybrj9IPRTAPYoxc2PNfWei
```

---

## 4. Website (www redirect)

### WWW Subdomain:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**Note:** Vercel automatically handles the root domain (@) pointing to your site

---

## 5. Resend (Email for Forms) - ADD AFTER DOMAIN VERIFICATION

You'll add these AFTER you switch nameservers and verify email is working:

Go to Resend dashboard and it will show you the exact DNS records to add.
They will look something like:

```
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCS... (Resend will give you this)

Type: TXT
Name: _resend
Value: resend-verify=... (Resend will give you this)
```

---

## Vercel Nameservers (Update in GoDaddy)

After adding all records above, update nameservers in GoDaddy to:

```
ns1.vercel-dns.com
ns2.vercel-dns.com
```

(Exact nameservers will be shown in Vercel dashboard)

---

## Testing Checklist (After DNS Switch)

Wait 15-30 minutes after switching nameservers, then test:

- [ ] Website loads at andersoncleaning.com
- [ ] www.andersoncleaning.com redirects to andersoncleaning.com
- [ ] Send test email TO info@andersoncleaning.com (should receive it)
- [ ] Send test email FROM info@andersoncleaning.com (should send successfully)
- [ ] Check https://mxtoolbox.com/domain for any DNS issues

---

## If Something Goes Wrong

If email stops working:
1. Check MX records are exactly as listed above
2. Wait 1 hour for DNS to fully propagate
3. Contact me immediately if still not working after 1 hour

If website doesn't load:
1. Check that Vercel shows the domain as "Active"
2. Verify nameservers in GoDaddy match Vercel's nameservers
3. Clear browser cache and try incognito mode
