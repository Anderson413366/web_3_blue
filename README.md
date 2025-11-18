# 🧹 Anderson Cleaning - Commercial Cleaning Website

> **Simple, Clear, Organized** - Professional website for B2B commercial janitorial services

---

## 🎯 WHAT IS THIS PROJECT?

This is the **Anderson Cleaning company website**.
It helps commercial businesses request cleaning quotes and learn about services.

**Live Website:** https://andersoncleaning.com
**Service Area:** 100 miles from West Springfield, MA

---

## ⚡ QUICK START (3 Steps)

### Step 1: Install Dependencies
```bash
npm install --legacy-peer-deps
```

### Step 2: Set Up Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Step 3: Run Development Server
```bash
npm run dev
```

Open: http://localhost:3000

---

## 📁 FOLDER STRUCTURE (What Goes Where)

```
anderson-cleaning/
│
├── 📱 app/                    ← ALL WEBSITE PAGES (routes)
│   ├── page.tsx              ← Home page
│   ├── about/                ← About page
│   ├── services/             ← Services pages
│   ├── contact/              ← Contact page
│   ├── quote/                ← Quote request form
│   └── api/                  ← Backend API routes
│
├── 🧩 components/             ← REUSABLE UI PIECES
│   ├── ui/                   ← Buttons, inputs, etc.
│   ├── forms/                ← All form components
│   ├── sections/             ← Page sections (hero, footer, etc.)
│   └── Header.tsx            ← Navigation bar
│
├── 🛠️ lib/                    ← HELPER CODE & UTILITIES
│   ├── validation/           ← Form validation (Zod schemas)
│   ├── api/                  ← Email, rate limiting, sanitization
│   ├── supabase/             ← Database connection
│   └── ThemeProvider.tsx     ← Dark mode logic
│
├── 🎨 styles/                 ← STYLING FILES
│   └── globals.css           ← Global styles
│
├── 📄 public/                 ← STATIC FILES (images, icons)
│   ├── favicon.ico
│   └── robots.txt
│
├── 📚 docs-setup-guides/      ← SETUP INSTRUCTIONS
│   ├── FORMS_SETUP_GUIDE.md
│   ├── DNS_MIGRATION_CHECKLIST.md
│   └── RESEND_DNS_SETUP.md
│
└── 🗑️ _ARCHIVE_FOR_REVIEW/    ← OLD FILES TO REVIEW/DELETE
    └── (files moved here for your review)
```

---

## 🔑 MOST IMPORTANT FILES

| File | Purpose | When to Edit |
|------|---------|--------------|
| `app/page.tsx` | **Home page** | Change homepage content |
| `components/Header.tsx` | **Navigation bar** | Update menu items |
| `lib/validation/quote.ts` | **Form validation** | Change form fields |
| `.env.local` | **Secret keys** | Add API keys, database URLs |
| `tailwind.config.ts` | **Design colors** | Change brand colors |

---

## 💻 COMMON COMMANDS

### Development
```bash
npm run dev          # Start development (auto-refresh)
npm run build        # Build for production (test before deploy)
npm start            # Run production build locally
npm run lint         # Check code for errors
```

### Git (Version Control)
```bash
git status           # See what changed
git add .            # Stage all changes
git commit -m "..."  # Save changes with message
git push             # Send to GitHub
git pull             # Get latest from GitHub
```

### Deployment (Vercel)
```bash
vercel               # Deploy preview
vercel --prod        # Deploy to production
vercel ls            # List deployments
```

---

## 🎨 BRAND COLORS

```css
Primary Blue:   #1D4ED8  (buttons, links)
Accent Green:   #10B981  (CTAs, highlights)
Error Red:      #DC2626  (error messages)
Success Green:  #10B981  (success messages)
Dark Background:#0F172A  (dark mode)
```

---

## 📝 EDITING CONTENT

### Change Homepage Text
→ Edit: `app/page.tsx`

### Change Contact Information
→ Edit: `components/Header.tsx` (phone number)
→ Edit: `app/contact/page.tsx` (contact details)

### Change Services
→ Edit: `app/services/page.tsx`
→ Add new service: Create `app/services/[new-service]/page.tsx`

### Change Form Fields
→ Edit: `lib/validation/quote.ts` (validation)
→ Edit: `components/forms/QuoteForm.tsx` (UI)

---

## 🔐 ENVIRONMENT VARIABLES (.env.local)

**REQUIRED (Must Have):**
```env
NEXT_PUBLIC_SITE_URL=https://andersoncleaning.com
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
```

**OPTIONAL (Nice to Have):**
```env
RESEND_API_KEY=re_xxxxx                    # Email sending
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX # Google Analytics
```

---

## 🆘 HELP & TROUBLESHOOTING

### Build Errors
```bash
rm -rf .next node_modules package-lock.json
npm install --legacy-peer-deps
npm run build
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Git Conflicts
```bash
git status                    # See what's conflicted
# Manually edit conflicted files
git add .
git commit -m "Resolve conflicts"
```

---

## 📚 DOCUMENTATION LOCATIONS

| Topic | File Location |
|-------|---------------|
| **Setup Guides** | `docs-setup-guides/` |
| **Form Setup** | `docs-setup-guides/FORMS_SETUP_GUIDE.md` |
| **DNS Setup** | `docs-setup-guides/DNS_MIGRATION_CHECKLIST.md` |
| **Email Setup** | `docs-setup-guides/RESEND_DNS_SETUP.md` |
| **Component Docs** | `components/README.md` |

---

## ✅ CHECKLIST BEFORE DEPLOYING

- [ ] Run `npm run build` - Build completes without errors
- [ ] Test forms - Contact and quote forms work
- [ ] Test dark mode toggle - Switches properly
- [ ] Check mobile view - Responsive on phone screens
- [ ] Verify environment variables in Vercel
- [ ] Test live site after deployment

---

## 🚨 IMPORTANT NOTES

### DO NOT DELETE:
- `.next/` folder (auto-generated, needed for build)
- `node_modules/` folder (dependencies, reinstall with `npm install`)
- `.env.local` (has secret keys, but .gitignored)
- `.git/` folder (version history)

### SAFE TO DELETE:
- `_ARCHIVE_FOR_REVIEW/` (review first, then delete)
- Old `.log` files
- Duplicate image files

### NEVER COMMIT TO GIT:
- `.env.local` (has secrets)
- `node_modules/` (too large)
- `.next/` (build output)
- Personal API keys

---

## 📞 SUPPORT CONTACTS

**Website Issues:** dev@andersoncleaning.com
**Business Questions:** (413) 306-5053
**Office Address:** 103 Wayside Ave, West Springfield, MA 01089

---

## 🛠️ TECH STACK (What Powers This)

- **Next.js 14** - Website framework
- **React 18** - UI library
- **TypeScript** - Programming language (type-safe JavaScript)
- **Tailwind CSS** - Styling framework
- **Supabase** - Database (stores form submissions)
- **Resend** - Email service (sends notifications)
- **Vercel** - Hosting platform

---

## 📄 LICENSE

© 2025 Anderson Cleaning, Inc. All rights reserved.

---

**Last Updated:** November 17, 2025
**Maintained By:** Anderson Gomes
