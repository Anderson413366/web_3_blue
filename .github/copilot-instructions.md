# Anderson Cleaning - AI Coding Agent Instructions

## Project Overview

**B2B Commercial Cleaning Website** built with Next.js 14 App Router, serving a 100-mile radius from West Springfield, MA. Focus: office buildings, medical facilities, educational institutions, retail stores, warehouses. **NO residential cleaning, restaurants, or 7-day services.**

## Architecture Patterns

### Next.js App Router Structure
- **Server Components**: Default for performance - use for static content, CMS data
- **Client Components**: `'use client'` only for interactivity (forms, state, hooks)
- **Route Groups**: `(site)` for main website, `(careers)` for multilingual careers section
- **API Routes**: Located in `app/api/` - handle forms, webhooks, integrations

### Security-First Approach
- **CSP (Content Security Policy)**: Defined in `lib/security/csp.ts` - add new domains here
- **Rate Limiting**: Configured per-route in `middleware.ts` (5/hour for forms, 100/15min API)
- **Input Sanitization**: Always use `lib/security/sanitizer.ts` functions in API routes
- **CAPTCHA**: Verify with `verifyCaptcha()` from `lib/security/captcha.ts` in form APIs

### Content Management (Sanity CMS)
- **Data Fetching**: Use existing queries from `lib/cms/queries.ts` - extend don't duplicate
- **ISR Pattern**: Pages revalidate via `export const revalidate = 3600` (1 hour)
- **Preview Mode**: Already configured - test content changes at `/api/preview`
- **Studio Access**: Protected at `/studio` with Basic Auth + optional IP allowlist

## Development Workflows

### Environment Setup
```bash
# Required for development
cp .env.example .env.local
npm install --legacy-peer-deps  # Required for peer dependency conflicts
npm run dev
```

**Critical env vars**: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL`

### Component Architecture

Follow strict patterns in `components/README.md`:
- **File naming**: PascalCase (`ContactForm.tsx`) matching component name exactly
- **Structure**: `layout/` (global), `sections/` (page-specific), `ui/` (reusable), `forms/`, `[domain]/`
- **Props**: TypeScript interfaces with JSDoc comments
- **Accessibility**: WCAG 2.2 AA compliant - use semantic HTML, ARIA labels, keyboard navigation

### Form Handling Standard

**Client Pattern** (React Hook Form + Zod):
```tsx
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(schema),
  mode: 'onBlur'
})
```

**Server Pattern** (API routes):
```tsx
// 1. Sanitize inputs
const sanitized = sanitizeFormInput(data.field, 'text')
// 2. Verify CAPTCHA
const result = await verifyCaptcha(token)
// 3. Check honeypot (if data.website exists, reject silently)
```

### Testing Requirements

**Commands**:
- `npm run test:unit` - Jest + React Testing Library
- `npm run test:e2e` - Playwright browser tests
- `npm run test:a11y` - Accessibility compliance

**Patterns**: Test behavior not implementation, mock API calls, test accessibility with axe-core

## Key Integrations

### External Services
- **Email**: Resend API for transactional emails (contact, quotes, careers)
- **CRM**: HubSpot for lead management - forms POST to both internal API and HubSpot
- **Analytics**: Google Analytics 4 + Microsoft Clarity
- **Error Tracking**: Sentry with filtered sensitive data
- **Chat**: Crisp chat widget (lazy loaded)

### API Route Patterns

**Form Submission Template**:
```tsx
// app/api/contact/route.ts
export async function POST(request: Request) {
  // Rate limiting handled by middleware
  const data = await request.json()
  
  // 1. Honeypot check
  if (data.website) return Response.json({ success: true })
  
  // 2. Sanitize & validate
  const sanitized = sanitizeFormInput(data)
  
  // 3. CAPTCHA verification
  const captchaResult = await verifyCaptcha(data.captchaToken)
  
  // 4. Process (email, CRM, etc.)
  // 5. Return consistent response format
}
```

## Content & SEO Patterns

### SEO Implementation
- **JSON-LD**: Use generators from `lib/seo/jsonld.ts` for structured data
- **OG Images**: Dynamic generation at `/api/og` with query params
- **Metadata**: Set in page files using Next.js metadata API
- **Sitemap**: Auto-generated post-build via `next-sitemap.config.js`

### Multilingual (Careers Only)
- **Languages**: EN, ES, PT-BR, RO
- **Route**: `/careers/[lang]/apply`
- **Implementation**: `lib/careers-i18n/` with 170+ translation keys
- **Pattern**: `t('key.subkey')` for translations

## Performance Standards

### Core Web Vitals Targets
- **LCP**: <2.5s (image optimization, lazy loading)
- **CLS**: <0.1 (proper image dimensions, font display: swap)
- **INP**: <200ms (minimal client-side JavaScript)

### Optimization Patterns
- **Images**: Next.js Image component with proper sizing, WebP/AVIF formats
- **Fonts**: Google Fonts with `display: swap`, preconnect headers
- **Scripts**: Lazy load third-party scripts in `LazyScripts.tsx`
- **Code Splitting**: Automatic via Next.js, optimize with dynamic imports

## Development Best Practices

### TypeScript Patterns
- **Strict mode**: Enabled - no `any` types
- **Interfaces**: Define props with JSDoc comments
- **Validation**: Use Zod schemas for runtime validation

### Error Handling
- **API Routes**: Return consistent error format `{ error: string, success: boolean }`
- **Client Components**: Use Error Boundaries, display user-friendly messages
- **Logging**: Sentry captures errors automatically with context

### Security Checklist
- [ ] Sanitize all user inputs using `lib/security/sanitizer.ts`
- [ ] Verify CAPTCHA on form submissions
- [ ] Check honeypot fields (reject if filled)
- [ ] Use CSP-compliant script loading with nonces
- [ ] Validate file uploads with magic byte checking

## Common Tasks

### Adding New Service/Industry Page
1. Add schema to Sanity CMS (`lib/cms/schemas/`)
2. Create query in `lib/cms/queries.ts`
3. Generate page with ISR: `export const revalidate = 3600`
4. Add SEO metadata and JSON-LD schema

### Adding New Form
1. Create Zod schema in `lib/validation/`
2. Build component with React Hook Form pattern
3. Create API route with security checks
4. Add rate limiting config to `middleware.ts`
5. Write tests for validation and submission

### Security Updates
- **CSP changes**: Modify `lib/security/csp.ts`
- **Rate limits**: Adjust `middleware.ts` RATE_LIMITS object
- **New domains**: Add to CSP and CORS headers

## File Locations

**Critical files to understand**:
- `middleware.ts` - Security headers, rate limiting, studio protection
- `lib/security/` - All security utilities and configurations  
- `lib/cms/queries.ts` - All Sanity CMS data fetching
- `components/README.md` - Component architecture patterns
- `lib/seo/` - SEO implementation and JSON-LD generators
- `next.config.js` - Performance optimizations and security headers

Remember: This is a production commercial website with strict security, performance, and accessibility requirements. Always test changes thoroughly and follow established patterns.