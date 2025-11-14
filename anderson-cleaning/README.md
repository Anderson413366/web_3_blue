# Anderson Cleaning - B2B Commercial Cleaning Website

Professional, conversion-optimized website for Anderson Cleaning's commercial janitorial services.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
![License](https://img.shields.io/badge/license-Proprietary-red)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)

---

## Overview

Modern Next.js 14 (App Router) website serving Anderson Cleaning's B2B commercial janitorial services.

**Service Area:** 100-mile radius from West Springfield, MA (Western Massachusetts & Northern Connecticut)

**Focus:** Office buildings, medical facilities, educational institutions, retail stores, and warehouses. **No residential cleaning, restaurants, or 7-day/week services.**

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy environment variables
cp .env.example .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### First-Time Setup

1. **Configure Environment Variables** (`.env.local`):

   ```env
   # Required
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production

   # Optional (but recommended)
   RESEND_API_KEY=re_xxxxx
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   RECAPTCHA_SECRET_KEY=xxxxx
   NEXT_PUBLIC_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
   ```

2. **Set up Sanity Studio**:

   ```bash
   # Access studio at /studio
   # Configure in sanity.config.ts
   ```

3. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
anderson-cleaning/
├── app/                          # Next.js 14 App Router
│   ├── (site)/                   # Main website routes
│   │   ├── page.tsx             # Home page
│   │   ├── about/               # About page
│   │   ├── services/            # Services pages
│   │   ├── industries/          # Industries served
│   │   ├── testimonials/        # Customer testimonials
│   │   ├── contact/             # Contact page
│   │   ├── quote/               # Quote request form
│   │   └── legal/               # Privacy & Terms
│   ├── (careers)/               # Careers section
│   │   └── [lang]/apply/        # Multilingual application
│   ├── studio/                  # Sanity CMS Studio
│   ├── api/                     # API routes
│   │   ├── og/                  # OG image generation
│   │   └── preview/             # CMS preview mode
│   └── layout.tsx               # Root layout
├── components/
│   ├── ui/                      # Reusable UI components
│   ├── forms/                   # Form components
│   ├── sections/                # Page sections
│   ├── careers/                 # Careers components
│   ├── SkipLink.tsx            # Accessibility skip link
│   ├── AccessibilityProvider.tsx
│   ├── WebVitalsReporter.tsx
│   ├── LazyScripts.tsx         # Lazy-loaded third-party scripts
│   └── OptimizedImage.tsx      # Performance-optimized images
├── lib/
│   ├── cms/                     # Sanity CMS
│   │   ├── schemas/            # Content schemas
│   │   ├── queries.ts          # GROQ queries
│   │   └── sanity.client.ts    # Sanity client
│   ├── careers/                # Careers logic
│   ├── careers-i18n/           # Careers translations
│   ├── validation/             # Zod schemas
│   ├── seo/                    # SEO utilities
│   │   ├── next-seo.config.ts
│   │   ├── jsonld.ts           # Schema.org generators
│   │   └── README.md
│   ├── security/               # Security utilities
│   │   ├── csp.ts              # Content Security Policy
│   │   ├── sanitizer.ts        # Input sanitization
│   │   ├── captcha.ts          # CAPTCHA verification
│   │   ├── file-upload.ts      # File security
│   │   ├── env-validator.ts    # Environment validation
│   │   └── README.md
│   ├── performance/            # Performance docs
│   ├── accessibility/          # A11y docs & guides
│   └── utils/
│       ├── analytics.ts        # Performance tracking
│       └── accessibility.ts    # A11y utilities
├── styles/
│   └── globals.css             # Global styles (includes a11y)
├── middleware.ts               # Security headers & rate limiting
├── next-sitemap.config.js     # Sitemap generation
├── sanity.config.ts           # Sanity configuration
├── sentry.*.config.ts         # Error tracking
└── public/                     # Static assets
```

## ✨ Features

### ✅ Implemented (Production Ready)

#### **Core Pages**

- 🏠 Home page with hero, services, value props, CTAs
- 📄 About page with company history and team
- 🧹 Services pages (6 main services)
- 🏭 Industries pages (8 industries served)
- ⭐ Testimonials page with customer reviews
- 📞 Contact page with form
- 💰 Quote request form (multi-step with validation)
- ⚖️ Privacy Policy and Terms of Service
- 💼 Careers page (multilingual: EN, ES, PT-BR, RO)

#### **SEO & Marketing**

- 🔍 Comprehensive SEO implementation
  - JSON-LD structured data (9 schema types)
  - Automated sitemap generation
  - Dynamic OG image generation
  - Meta tags optimization
  - Canonical URLs
- 📊 Analytics integration
  - Google Analytics 4
  - Microsoft Clarity
  - Core Web Vitals tracking
  - Performance monitoring with Sentry

#### **Security**

- 🔒 Content Security Policy (CSP)
- 🛡️ Security headers (HSTS, X-Frame-Options, etc.)
- ⏱️ Rate limiting (per-route configuration)
- 🔐 Studio protection (Basic Auth + IP allowlist)
- 🧹 Input sanitization (XSS prevention)
- 🤖 CAPTCHA (reCAPTCHA v3 / Cloudflare Turnstile)
- 📁 File upload security (magic bytes validation)
- 🍯 Honeypot fields in forms
- 🔔 Error tracking with Sentry

#### **Performance**

- ⚡ Core Web Vitals optimized (LCP <2.5s, CLS <0.1, INP <200ms)
- 🖼️ Image optimization (WebP/AVIF, lazy loading, blur placeholders)
- 📝 Font optimization (display: swap, preloading)
- 🔀 Code splitting (vendor + common chunks)
- 🌐 Resource hints (preconnect, dns-prefetch)
- 💾 Aggressive caching (1 year for static assets)
- 📦 Tree shaking for dependencies
- 🚀 Next.js optimizations (SWC, compression)

#### **Accessibility (WCAG 2.2 AA)**

- ♿ Skip to main content link
- ⌨️ Full keyboard navigation
- 👁️ Visible focus indicators
- 📢 Screen reader support (ARIA)
- 🎨 Color contrast compliance (≥4.5:1)
- 📱 Touch targets (≥44x44px)
- 🎭 Reduced motion support
- 🔍 High contrast mode support
- 🧪 Automated testing (axe-core)

#### **Content Management**

- 📝 Sanity CMS v3 integration
- 🖥️ Sanity Studio at /studio
- 📋 8 content schemas (services, industries, testimonials, etc.)
- 👁️ Preview mode for draft content
- 🔄 ISR with configurable revalidation

#### **Forms & Validation**

- React Hook Form + Zod validation
- Multi-step quote form
- Contact form
- Comprehensive careers application
- Error handling and recovery
- Success/error announcements
- Honeypot spam protection

#### **Internationalization**

- Careers page: EN, ES, PT-BR, RO
- Language switcher component
- Persistent language preference
- 170+ translation keys

## 🎨 Design System

### Colors

- **Primary**: `#1D4ED8` (blue-700) - Main brand color
- **Accent**: `#10B981` (green-500) - CTAs and highlights
- **Neutral**: Slate/Gray Tailwind scale
- **Error**: `#DC2626` (red-600)
- **Success**: `#10B981` (green-500)

### Typography

- **Font**: Inter (Google Fonts)
- **Display**: swap (prevents FOIT)
- **Headings**: 700-900 weight
- **Body**: 400-500 weight
- **Line height**: 1.5+ for readability

### Breakpoints

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

### Touch Targets

- Minimum: 44x44px (WCAG 2.2)

## 🔧 Development

### Commands

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm start                      # Start production server
npm run lint                   # Lint code

# Sitemap
npm run postbuild             # Generate sitemap (runs after build)
```

### Environment Variables

See `.env.example` for all available variables.

**Required:**

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

**Optional but Recommended:**

- `RESEND_API_KEY` - Email service
- `HUBSPOT_ACCESS_TOKEN` - CRM integration
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Analytics
- `RECAPTCHA_SECRET_KEY` or `TURNSTILE_SECRET_KEY` - Bot protection
- `NEXT_PUBLIC_SENTRY_DSN` - Error tracking
- `STUDIO_BASIC_AUTH_USER` - Studio protection
- `STUDIO_BASIC_AUTH_PASS` - Studio protection

### Testing

#### Automated Testing

```bash
# Development mode includes axe-core
npm run dev
# Check browser console for accessibility violations
```

#### Manual Testing

- **Lighthouse**: Chrome DevTools > Lighthouse (Target: ≥90)
- **WAVE**: Browser extension for accessibility
- **Screen Readers**: NVDA (Windows), VoiceOver (Mac)
- **Keyboard**: Navigate with Tab, test all interactions

## 📦 Deployment

### Vercel (Recommended)

1. **Connect Repository**:

   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   vercel --prod
   ```

2. **Configure Environment Variables** in Vercel dashboard

3. **Enable Vercel Analytics** (optional)

### Performance Targets

- **Lighthouse Scores**: ≥90 (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**:
  - LCP: <2.5s
  - CLS: <0.1
  - INP: <200ms
- **Bundle Size**:
  - JavaScript: <200KB
  - CSS: <50KB

## 📚 Documentation

Comprehensive documentation is available in the following locations:

- **SEO**: `lib/seo/README.md`
- **Security**: `lib/security/README.md`
- **Performance**: `lib/performance/README.md`
- **Accessibility**: `lib/accessibility/README.md`
- **ARIA Guide**: `lib/accessibility/ARIA_GUIDE.md`

## 🔒 Security

### Features

- Content Security Policy (CSP)
- Security headers
- Rate limiting (5/hour for forms)
- Input sanitization
- CAPTCHA protection
- File upload validation
- Environment variable validation
- Error tracking with filtered sensitive data

### Reporting Security Issues

Email: security@andersoncleaning.com

## ♿ Accessibility

This website conforms to **WCAG 2.2 Level AA** standards.

### Features

- Semantic HTML
- Keyboard navigation
- Screen reader support
- Color contrast compliance
- Touch target sizes
- Reduced motion support
- Skip to main content link
- Automated testing (axe-core)

### Feedback

Email: accessibility@andersoncleaning.com

## 📊 Analytics & Monitoring

### Integrated Services

- **Google Analytics 4** - User behavior tracking
- **Microsoft Clarity** - Heatmaps and session recordings
- **Sentry** - Error tracking and performance monitoring
- **Web Vitals** - Core Web Vitals tracking

### Custom Events

- Form submissions
- Button clicks
- Page views
- Core Web Vitals (LCP, CLS, INP, FCP, TTFB)
- Long tasks (>50ms)

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

## 🤝 Contributing

This is a private project. For internal development team only.

## 📄 License

© 2025 Anderson Cleaning, Inc. All rights reserved.

## 📞 Support

For questions, issues, or feature requests:

- **Email**: dev@andersoncleaning.com
- **Phone**: (413) 733-3334
- **Address**: 103 Wayside Ave, West Springfield, MA 01089

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

**Tech Stack**: Next.js 14 • React 18 • TypeScript • Tailwind CSS • Sanity CMS • Sentry • web-vitals • next-seo • next-sitemap
