# System Architecture

Technical architecture documentation for Anderson Cleaning website.

## Table of Contents

- [Overview](#overview)
- [Technology Stack](#technology-stack)
- [Application Architecture](#application-architecture)
- [Data Flow](#data-flow)
- [API Routes](#api-routes)
- [Content Management](#content-management)
- [Security Architecture](#security-architecture)
- [Performance Optimizations](#performance-optimizations)
- [Deployment Architecture](#deployment-architecture)
- [Integrations](#integrations)

---

## Overview

### Architecture Pattern

**Next.js App Router with Server Components**

- Server-Side Rendering (SSR) for dynamic content
- Static Site Generation (SSG) for marketing pages
- Incremental Static Regeneration (ISR) for CMS content
- Client Components only where necessary (forms, interactive UI)

### Key Architectural Decisions

1. **Monorepo Structure:** Single repository for frontend + CMS Studio
2. **Serverless Deployment:** Vercel Edge Network for global performance
3. **Headless CMS:** Sanity for content management (decoupled)
4. **API Routes:** Next.js API routes for form submissions and webhooks
5. **Security-First:** CSP, rate limiting, input sanitization at every layer

---

## Technology Stack

### Frontend

| Layer          | Technology              | Purpose                      |
| -------------- | ----------------------- | ---------------------------- |
| **Framework**  | Next.js 14 (App Router) | React framework with SSR/SSG |
| **Language**   | TypeScript 5.4 (strict) | Type-safe development        |
| **UI Library** | React 18                | Component-based UI           |
| **Styling**    | Tailwind CSS 3.4        | Utility-first CSS            |
| **Forms**      | React Hook Form 7       | Form state management        |
| **Validation** | Zod 3                   | Schema validation            |
| **Animations** | Framer Motion 12        | Declarative animations       |
| **Icons**      | Lucide React            | SVG icon library             |

### Backend & Infrastructure

| Layer          | Technology                  | Purpose                      |
| -------------- | --------------------------- | ---------------------------- |
| **CMS**        | Sanity v3                   | Headless content management  |
| **Email**      | Resend                      | Transactional email API      |
| **Analytics**  | Google Analytics 4, Clarity | User behavior tracking       |
| **Monitoring** | Sentry                      | Error & performance tracking |
| **Deployment** | Vercel                      | Serverless hosting           |
| **CDN**        | Vercel Edge Network         | Global content delivery      |
| **Database**   | Sanity (document-based)     | Content storage              |

### Development Tools

| Tool              | Purpose                                 |
| ----------------- | --------------------------------------- | ------------------------------ |
| **Testing**       | Jest, React Testing Library, Playwright | Unit, integration, E2E tests   |
| **Linting**       | ESLint                                  | Code quality                   |
| **Formatting**    | Prettier                                | Code formatting                |
| **Type Checking** | TypeScript                              | Static type analysis           |
| **Git Hooks**     | Husky                                   | Pre-commit checks              |
| **CI/CD**         | GitHub Actions                          | Automated testing & deployment |

---

## Application Architecture

### Layer Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      CDN (Vercel Edge)                  │
│            Static Assets + Edge Functions               │
└─────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js Application                    │
│  ┌─────────────┬──────────────┬────────────────────┐   │
│  │  App Router │  Middleware  │  API Routes        │   │
│  │  (Pages)    │  (Security)  │  (Forms,Webhooks)  │   │
│  └─────────────┴──────────────┴────────────────────┘   │
└─────────────────────────────────────────────────────────┘
         │                │                    │
         ▼                ▼                    ▼
  ┌─────────────┐  ┌──────────────┐    ┌─────────────────┐
  │   Sanity    │  │   Security   │    │  Third-Party    │
  │     CMS     │  │   Services   │    │  Integrations   │
  │   (GROQ)    │  │ (CAPTCHA,etc)│    │ (HubSpot, etc)  │
  └─────────────┘  └──────────────┘    └─────────────────┘
```

### Directory Structure

```
app/
├── (site)/              # Main website routes (Route Group)
│   ├── layout.tsx       # Site-specific layout
│   ├── page.tsx         # Homepage
│   ├── about/           # About page
│   ├── services/        # Services pages
│   ├── industries/      # Industries pages
│   ├── testimonials/    # Testimonials
│   ├── contact/         # Contact form
│   ├── quote/           # Quote request
│   └── legal/           # Privacy, Terms
│
├── [lang]/              # Internationalized routes
│   └── apply/           # Careers (EN, ES, PT-BR, RO)
│       ├── layout.tsx   # Careers layout with i18n
│       └── page.tsx     # Application form
│
├── studio/              # Sanity CMS Studio
│   └── [[...index]]/    # Catch-all route
│       └── page.tsx     # Studio component
│
├── api/                 # API Routes
│   ├── quote/           # Quote submission handler
│   ├── contact/         # Contact form handler
│   ├── apply/           # Careers application handler
│   ├── preview/         # CMS preview mode
│   └── og/              # Dynamic OG image generation
│
├── layout.tsx           # Root layout (providers, metadata)
└── not-found.tsx        # 404 page
```

### Rendering Strategy

| Route           | Rendering | Revalidation | Reason                      |
| --------------- | --------- | ------------ | --------------------------- |
| `/` (Homepage)  | ISR       | 60s          | CMS content updates         |
| `/services/*`   | ISR       | 60s          | CMS content updates         |
| `/about`        | ISR       | 60s          | CMS content updates         |
| `/testimonials` | ISR       | 60s          | CMS content updates         |
| `/contact`      | SSG       | Static       | No dynamic content          |
| `/quote`        | SSG       | Static       | Form only                   |
| `/[lang]/apply` | SSG       | Static       | Form only, i18n client-side |
| `/studio/*`     | Client    | N/A          | Interactive CMS             |
| `/api/*`        | Server    | N/A          | API routes                  |

**ISR (Incremental Static Regeneration):** Generates static pages on-demand, revalidates every 60 seconds.

---

## Data Flow

### Content Management Flow

```
┌──────────────┐
│ Sanity       │
│ Studio       │ ← Editor creates/updates content
│ (/studio)    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Sanity       │
│ Content Lake │ ← Content stored in cloud
└──────┬───────┘
       │ GROQ Query
       ▼
┌──────────────┐
│ Next.js      │
│ Server       │ ← Fetches content via GROQ
│ Components   │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ HTML         │
│ Response     │ ← Rendered page sent to client
└──────────────┘
```

### Form Submission Flow

```
User fills form
     │
     ▼
Client-side validation (Zod)
     │
     ▼
CAPTCHA verification
     │
     ▼
POST to /api/{form-type}
     │
     ├──> Rate limit check (middleware)
     │
     ├──> Input sanitization
     │
     ├──> Server-side validation (Zod)
     │
     ├──> CAPTCHA server verification
     │
     ├──> Send email (Resend)
     │
     └──> Create lead (HubSpot)
           │
           ▼
       Return success/error
```

---

## API Routes

### Quote Submission (`/api/quote`)

**Method:** POST

**Request Body:**

```typescript
{
  name: string;
  email: string;
  phone: string;
  company: string;
  facilityType: string;
  message?: string;
  captchaToken: string;
  honeypot?: string; // Should be empty
}
```

**Response:**

```typescript
{
  success: boolean;
  message: string;
  error?: string;
}
```

**Flow:**

1. Rate limiting (5 requests/hour per IP)
2. Input sanitization
3. Zod validation
4. CAPTCHA verification
5. Honeypot check
6. Send email via Resend
7. Create HubSpot contact
8. Return success response

### Contact Form (`/api/contact`)

Similar to `/api/quote` but different fields and HubSpot form.

### Careers Application (`/api/apply`)

**Method:** POST

**Request Body:**

```typescript
{
  name: string
  email: string
  phone: string
  position: string
  resumeUrl: string // After file upload
  language: 'en' | 'es' | 'pt-BR' | 'ro'
  captchaToken: string
}
```

**Flow:**

1. File upload validation (PDF/DOC, max 5MB, magic bytes)
2. Rate limiting
3. Input sanitization
4. Zod validation
5. CAPTCHA verification
6. Send localized email (based on language)
7. Create HubSpot candidate
8. Return success response

### Preview Mode (`/api/preview`)

**Method:** GET

**Query Parameters:**

```
?secret=YOUR_SECRET&slug=/path
```

**Response:** Redirects to preview page with cookie set.

**Purpose:** View draft content from Sanity before publishing.

### OG Image Generation (`/api/og`)

**Method:** GET

**Query Parameters:**

```
?title=Page+Title
```

**Response:** Dynamic PNG image (1200x630px)

**Purpose:** Generate Open Graph images for social sharing.

---

## Content Management

### Sanity Schema Architecture

```
┌─────────────────────┐
│   site-settings     │ ← Global site config (hours, contact)
└─────────────────────┘
┌─────────────────────┐
│      service        │ ← Services (Office, Janitorial, etc.)
│  - title            │
│  - description      │
│  - icon             │
│  - available        │
└─────────────────────┘
┌─────────────────────┐
│     industry        │ ← Industries served
│  - name             │
│  - description      │
│  - icon             │
└─────────────────────┘
┌─────────────────────┐
│   testimonial       │ ← Customer reviews
│  - quote            │
│  - author           │
│  - company          │
│  - rating           │
└─────────────────────┘
┌─────────────────────┐
│    team-member      │ ← Staff profiles
│  - name             │
│  - role             │
│  - bio              │
│  - photo            │
└─────────────────────┘
┌─────────────────────┐
│  before-after       │ ← Before/After images
│  - beforeImage      │
│  - afterImage       │
│  - title            │
│  - description      │
└─────────────────────┘
```

### GROQ Queries

Located in `lib/cms/queries.ts`:

**Get All Services:**

```groq
*[_type == "service"] | order(order asc) {
  _id,
  title,
  description,
  icon,
  available,
  slug
}
```

**Get Service by Slug:**

```groq
*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  description,
  icon,
  available,
  content,
  "image": image.asset->url
}
```

**Get All Testimonials:**

```groq
*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  quote,
  author,
  company,
  rating
}
```

### Caching Strategy

| Content Type  | Cache Strategy | Revalidation |
| ------------- | -------------- | ------------ |
| Services      | ISR            | 60s          |
| Industries    | ISR            | 60s          |
| Testimonials  | ISR            | 60s          |
| Site Settings | ISR            | 60s          |
| Images        | CDN            | 1 year       |

---

## Security Architecture

### Defense in Depth

**Layer 1: Network**

- HTTPS enforced (HSTS)
- DDoS protection (Vercel)
- CDN security (Vercel Edge)

**Layer 2: Application**

- Content Security Policy (CSP)
- Security headers (X-Frame-Options, etc.)
- Rate limiting per route
- CORS configuration

**Layer 3: Input**

- Client-side validation (Zod)
- Server-side validation (Zod)
- Input sanitization (strip HTML, escape)
- Honeypot fields

**Layer 4: Authentication**

- CAPTCHA (reCAPTCHA v3 or Turnstile)
- IP-based rate limiting
- Basic Auth for Studio (optional)

**Layer 5: Data**

- Environment variable encryption
- Sanity token permissions (read-only)
- Sensitive data filtering (Sentry)

### CSP Configuration

Located in `lib/security/csp.ts`:

```typescript
const csp = {
  'default-src': ["'self'"],
  'script-src': ["'self'", 'https://www.googletagmanager.com'],
  'style-src': ["'self'", "'unsafe-inline'"], // Tailwind requires unsafe-inline
  'img-src': ["'self'", 'data:', 'https://cdn.sanity.io'],
  'font-src': ["'self'", 'https://fonts.gstatic.com'],
  'connect-src': ["'self'", 'https://api.hubspot.com'],
  'frame-ancestors': ["'none'"],
  'upgrade-insecure-requests': true,
}
```

### Rate Limiting

Implemented in `middleware.ts`:

```typescript
const rateLimits = {
  '/api/quote': { requests: 5, window: 3600 }, // 5/hour
  '/api/contact': { requests: 5, window: 3600 },
  '/api/apply': { requests: 3, window: 3600 }, // Stricter for file uploads
}
```

---

## Performance Optimizations

### Image Optimization

**next/image Component:**

- Automatic WebP/AVIF conversion
- Lazy loading
- Responsive srcsets
- Blur placeholders

**Configuration (next.config.js):**

```javascript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  minimumCacheTTL: 31536000, // 1 year
}
```

### Code Splitting

**Automatic:**

- Each page is its own bundle
- Shared dependencies in vendor chunk

**Manual (Dynamic Imports):**

```typescript
const LazyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Client-side only if needed
})
```

### Caching Headers

```
Static Assets (/_next/static/*):
  Cache-Control: public, max-age=31536000, immutable

Images (/*.{jpg,png,svg}):
  Cache-Control: public, max-age=31536000, immutable

HTML Pages:
  Cache-Control: s-maxage=60, stale-while-revalidate=86400
```

### Performance Budget

| Metric     | Budget       | Enforcement   |
| ---------- | ------------ | ------------- |
| JavaScript | < 200KB      | Lighthouse CI |
| CSS        | < 50KB       | Lighthouse CI |
| Images     | < 500KB each | Manual review |
| LCP        | < 2.5s       | Lighthouse CI |
| CLS        | < 0.1        | Lighthouse CI |
| INP        | < 200ms      | Lighthouse CI |

---

## Deployment Architecture

### Vercel Deployment

```
┌────────────────────────────────────┐
│       GitHub Repository             │
│     (main branch trigger)           │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│      Vercel Build Process           │
│  1. Install dependencies            │
│  2. Run build command               │
│  3. Generate static pages           │
│  4. Deploy to Edge Network          │
└────────────┬───────────────────────┘
             │
             ▼
┌────────────────────────────────────┐
│      Vercel Edge Network            │
│  - Global CDN (40+ regions)         │
│  - Automatic SSL                    │
│  - DDoS protection                  │
│  - Edge Functions                   │
└────────────────────────────────────┘
```

### Environment Variables

**Client-Side (NEXT*PUBLIC*\*):**

- Exposed to browser
- Safe for public consumption
- Example: Google Analytics ID

**Server-Side:**

- Never sent to client
- Secrets and API keys
- Example: Resend API key

**Environments:**

1. **Development:** Local `.env.local`
2. **Preview:** PR deployments (preview.vercel.app)
3. **Production:** Main branch (andersoncleaning.com)

### Deployment Strategy

**Automatic Deployments:**

- Push to `main` → Production
- Push to any branch → Preview URL
- Pull Request → Preview URL with comment

**Manual Deployments:**

```bash
vercel --prod  # Deploy to production
```

---

## Integrations

### Third-Party Services

| Service                | Purpose                | Integration Point            |
| ---------------------- | ---------------------- | ---------------------------- |
| **Sanity**             | Content management     | GROQ queries, Studio embed   |
| **Resend**             | Email sending          | API routes                   |
| **HubSpot**            | CRM & lead management  | API routes, form submissions |
| **Google Analytics 4** | Analytics              | Client-side script           |
| **Microsoft Clarity**  | Session recordings     | Client-side script           |
| **Sentry**             | Error tracking         | Client, server, edge         |
| **reCAPTCHA v3**       | Bot protection         | Forms                        |
| **Crisp**              | Live chat              | Client-side widget           |
| **Calendly**           | Appointment scheduling | Embeds (optional)            |

### Integration Architecture

```
┌───────────────┐
│ Next.js App   │
└───────┬───────┘
        │
    ┌───┴────┬─────────┬──────────┬─────────┐
    │        │         │          │         │
    ▼        ▼         ▼          ▼         ▼
┌────────┐ ┌──────┐ ┌──────┐ ┌────────┐ ┌────────┐
│Sanity  │ │Resend│ │HubSpot│ │Sentry  │ │GA4     │
│(CMS)   │ │(Email)│ │(CRM) │ │(Errors)│ │(Analytics)│
└────────┘ └──────┘ └──────┘ └────────┘ └────────┘
```

### API Error Handling

**Retry Logic:**

```typescript
async function sendEmail(data) {
  const maxRetries = 3
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await resend.send(data)
    } catch (error) {
      if (i === maxRetries - 1) throw error
      await sleep(1000 * Math.pow(2, i)) // Exponential backoff
    }
  }
}
```

**Fallback Mechanisms:**

1. Primary: Resend API
2. Fallback: Log to Sentry, notify admin
3. User: Show success message (email queued)

---

## Scalability

### Current Architecture

**Serverless Benefits:**

- Auto-scaling (0 to infinity)
- Pay-per-use pricing
- Global edge distribution
- No server management

**Limitations:**

- Cold starts (mitigated by Vercel)
- Execution time limits (10s for Hobby, 60s for Pro)
- Memory limits (1GB default)

### Future Considerations

**If traffic grows significantly:**

1. **Enable Vercel Pro:**
   - Increased execution time (60s)
   - More concurrent executions
   - Advanced analytics

2. **Implement Caching Layer:**
   - Redis for rate limiting
   - CDN for static assets (already using Vercel)

3. **Optimize Database Queries:**
   - Use Sanity's GROQ query projection
   - Implement pagination for large datasets

4. **Split Services:**
   - Separate API for form submissions
   - Dedicated service for file uploads
   - Queue system for email sending

---

## Monitoring & Observability

### Metrics Tracked

**Performance:**

- Core Web Vitals (LCP, FID/INP, CLS)
- Page load times
- API response times
- Bundle sizes

**Business:**

- Form submissions
- Error rates
- Uptime percentage
- Traffic sources

**Technical:**

- Server errors
- Client errors
- Failed API calls
- GROQ query performance

### Logging

**Client-Side:**

- Sentry (errors only, no PII)
- Web Vitals (performance metrics)
- Google Analytics (user behavior)

**Server-Side:**

- Vercel logs (serverless function execution)
- Sentry (API errors, performance)
- HubSpot (form submissions)

---

## Development Workflow

### Local Development

```bash
# 1. Start dev server
npm run dev

# 2. Make changes

# 3. Test locally
npm run test:unit

# 4. Lint & type check
npm run lint
npm run type-check

# 5. Commit (Husky runs pre-commit hooks)
git commit -m "feat: your feature"

# 6. Push (triggers preview deployment)
git push
```

### CI/CD Pipeline

**GitHub Actions (`.github/workflows/ci.yml`):**

1. Lint & type check
2. Run unit tests
3. Run E2E tests
4. Run accessibility tests
5. Run Lighthouse CI
6. Build production
7. Security scan

**On Success:**

- Merge to main
- Vercel deploys to production

**On Failure:**

- Block merge
- Notify team

---

## Best Practices

### Code Organization

1. **Colocation:** Keep related files together
2. **Separation of Concerns:** UI, logic, data separate
3. **DRY:** Reusable components and utilities
4. **Type Safety:** TypeScript strict mode
5. **Documentation:** JSDoc for complex functions

### Component Design

1. **Server Components by default:** Client only when needed
2. **Props validation:** TypeScript interfaces
3. **Accessibility:** ARIA, semantic HTML
4. **Performance:** Lazy loading, memoization
5. **Testing:** Unit tests for logic, E2E for flows

### API Design

1. **RESTful conventions:** POST for mutations
2. **Input validation:** Server-side always
3. **Error handling:** Consistent error responses
4. **Rate limiting:** Prevent abuse
5. **Logging:** Track all requests (no PII)

---

## Resources

- **Next.js Docs:** https://nextjs.org/docs
- **Sanity Docs:** https://www.sanity.io/docs
- **Vercel Docs:** https://vercel.com/docs
- **TypeScript Handbook:** https://www.typescriptlang.org/docs/

---

**Document Version:** 1.0
**Last Updated:** November 2024
**Maintained By:** Development Team
