# Performance Optimization Guide

Comprehensive performance optimizations for achieving excellent Core Web Vitals and Lighthouse scores.

## 📊 Performance Targets

### Lighthouse Scores (Mobile)

- ✅ **Performance**: ≥90
- ✅ **Accessibility**: ≥95
- ✅ **Best Practices**: ≥95
- ✅ **SEO**: ≥95

### Core Web Vitals

- ✅ **LCP (Largest Contentful Paint)**: <2.5s
- ✅ **FID (First Input Delay)**: <100ms
- ✅ **CLS (Cumulative Layout Shift)**: <0.1
- ✅ **TTFB (Time to First Byte)**: <800ms
- ✅ **INP (Interaction to Next Paint)**: <200ms

### Performance Budgets

- **Total JavaScript**: <200KB (gzipped)
- **Total CSS**: <50KB (gzipped)
- **LCP Element**: <2.5s
- **FCP (First Contentful Paint)**: <1.8s

## 🎯 Implemented Optimizations

### 1. Image Optimization

**next/image Configuration** (next.config.js):

```javascript
images: {
  remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  formats: ['image/avif', 'image/webp'], // Modern formats
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year caching
}
```

**OptimizedImage Component Usage**:

```tsx
import OptimizedImage, { HeroImage, CardImage } from '@/components/OptimizedImage'

// Above-the-fold hero image (priority + blur)
<HeroImage
  src="/images/hero.jpg"
  alt="Hero image"
  width={1920}
  height={1080}
  sizes="100vw"
/>

// Below-the-fold images (lazy loading)
<OptimizedImage
  src="/images/service.jpg"
  alt="Service image"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Card images with aspect ratio
<CardImage
  src="/images/card.jpg"
  alt="Card image"
  width={400}
  height={300}
  aspectRatio="4:3"
/>
```

**Best Practices**:

- ✅ Always set `width` and `height` to prevent CLS
- ✅ Use `priority` for above-the-fold images (LCP)
- ✅ Use `sizes` prop for responsive images
- ✅ Lazy load below-the-fold images
- ✅ Use WebP/AVIF formats automatically
- ✅ Serve appropriately sized images per device

### 2. Font Optimization

**Inter Font with next/font** (app/layout.tsx):

```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap', // Prevents FOIT (Flash of Invisible Text)
  preload: true,
  fallback: ['system-ui', 'arial'],
})
```

**Benefits**:

- ✅ Automatic font subsetting
- ✅ Zero layout shift with `font-display: swap`
- ✅ Preloading for faster load
- ✅ Self-hosted fonts (no external requests)
- ✅ Fallback fonts prevent blank text

### 3. JavaScript Optimization

**Code Splitting**:

```tsx
// Dynamic imports for heavy components
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false, // Client-side only if needed
})
```

**Lazy Scripts** (components/LazyScripts.tsx):

```tsx
import { CrispChat, GoogleAnalytics, MicrosoftClarity } from '@/components/LazyScripts'

// In layout or page
<GoogleAnalytics /> {/* Loads afterInteractive */}
<CrispChat /> {/* Loads on idle */}
<MicrosoftClarity /> {/* Loads on idle */}
```

**Tree Shaking** (next.config.js):

```javascript
experimental: {
  optimizePackageImports: ['lucide-react', 'framer-motion'],
}
```

**Production Optimizations**:

```javascript
compiler: {
  removeConsole: process.env.NODE_ENV === 'production' ? {
    exclude: ['error', 'warn'],
  } : false,
}
```

### 4. Resource Hints

**Preconnect & DNS Prefetch** (app/layout.tsx):

```tsx
<head>
  {/* Preconnect to critical origins */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://cdn.sanity.io" />
  <link rel="preconnect" href="https://www.googletagmanager.com" />

  {/* DNS Prefetch for less critical services */}
  <link rel="dns-prefetch" href="https://www.clarity.ms" />
  <link rel="dns-prefetch" href="https://calendly.com" />
  <link rel="dns-prefetch" href="https://api.hubspot.com" />
</head>
```

**Benefits**:

- ✅ Reduces DNS lookup time
- ✅ Establishes early connections
- ✅ Faster resource loading

### 5. Caching Strategy

**Static Assets** (next.config.js):

```javascript
async headers() {
  return [
    // Images: 1 year cache
    {
      source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    // Next.js static files: 1 year cache
    {
      source: '/_next/static/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
    // Fonts: 1 year cache
    {
      source: '/fonts/:path*',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ]
}
```

**ISR (Incremental Static Regeneration)**:

```tsx
// In page.tsx
export const revalidate = 3600 // Revalidate every hour

// Or in fetch
const data = await fetch('https://api.example.com/data', {
  next: { revalidate: 3600 },
})
```

### 6. Core Web Vitals Tracking

**Automatic Reporting** (lib/utils/analytics.ts):

```tsx
import { reportWebVitals } from '@/lib/utils/analytics'

// Reports to Google Analytics and Sentry automatically
```

**Performance Metrics Tracked**:

- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)
- TTFB (Time to First Byte)
- INP (Interaction to Next Paint)
- Long Tasks (>50ms)
- Resource Timing
- Page Load Metrics

**View in Google Analytics**:

1. Navigate to Events
2. Filter by "Web Vitals" category
3. View metrics: LCP, FID, CLS, etc.

**View in Sentry**:

1. Navigate to Performance
2. View measurements tab
3. Check poor metrics in Issues

### 7. CSS Optimization

**Tailwind Configuration** (tailwind.config.ts):

```typescript
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  // Purges unused CSS automatically
}
```

**Critical CSS**:

- Next.js automatically inlines critical CSS
- Route-based code splitting
- CSS modules for component styles

### 8. Webpack Optimizations

**Code Splitting** (next.config.js):

```javascript
webpack: (config, { isServer }) => {
  if (!isServer) {
    config.optimization = {
      ...config.optimization,
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /node_modules/,
            priority: 20,
          },
          common: {
            name: 'common',
            minChunks: 2,
            priority: 10,
          },
        },
      },
    }
  }
  return config
}
```

### 9. Mobile Optimization

**Responsive Breakpoints**:

- Mobile: <640px
- Tablet: 640px - 1024px
- Desktop: >1024px

**Touch Targets**:

- Minimum size: 44x44px
- Proper spacing between interactive elements

**Viewport**:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

**Font Sizes**:

- Minimum: 16px (prevents zoom on iOS)
- Line height: 1.5 for readability

### 10. Performance Monitoring

**Lighthouse CI** (Coming Soon):

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [pull_request]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls: |
            https://staging.andersoncleaning.com
          uploadArtifacts: true
          temporaryPublicStorage: true
```

**Vercel Analytics**:

1. Enable in Vercel dashboard
2. View Real Experience Score
3. Monitor Core Web Vitals over time

## 🔧 Testing Performance

### Local Testing

**Run Lighthouse**:

```bash
npm run build
npm run start
# Open Chrome DevTools > Lighthouse
# Select "Performance" + "Mobile"
# Click "Generate report"
```

**Test Slow Networks**:

1. Chrome DevTools > Network tab
2. Select "Slow 3G" or "Fast 3G"
3. Reload page and test user experience

### Real Device Testing

**BrowserStack/LambdaTest**:

- Test on real mobile devices
- Check performance on slower devices
- Verify touch interactions

**WebPageTest**:

```
https://webpagetest.org
```

- Test from multiple locations
- View filmstrip and waterfall
- Check TTFB, Start Render, Speed Index

### Analytics

**Google PageSpeed Insights**:

```
https://pagespeed.web.dev/?url=https://andersoncleaning.com
```

**Sentry Performance**:

- View slow transactions
- Identify bottlenecks
- Monitor trends

## 📈 Optimization Checklist

### Images

- [x] Use next/image for all images
- [x] Set width and height to prevent CLS
- [x] Use priority for LCP image
- [x] Lazy load below-fold images
- [x] Use WebP/AVIF formats
- [x] Implement blur placeholders
- [x] Serve responsive sizes

### JavaScript

- [x] Dynamic imports for heavy components
- [x] Code splitting enabled
- [x] Tree shaking configured
- [x] Minimize third-party scripts
- [x] Defer non-critical JS
- [x] Remove console.logs in production

### CSS

- [x] Tailwind with purge enabled
- [x] Critical CSS inlined
- [x] Remove unused styles
- [x] Minimize specificity

### Fonts

- [x] Use next/font
- [x] Font display swap
- [x] Preload fonts
- [x] Subset fonts

### Caching

- [x] Long cache for static assets
- [x] ETags enabled
- [x] Compression enabled
- [x] ISR for dynamic pages

### Monitoring

- [x] Core Web Vitals tracking
- [x] Sentry performance monitoring
- [x] Google Analytics events
- [ ] Lighthouse CI (TODO)
- [ ] Vercel Analytics (TODO)

## 🚀 Next Steps

1. **Implement Lighthouse CI** in GitHub Actions
2. **Enable Vercel Analytics** for real user monitoring
3. **Set up performance budgets** in CI/CD
4. **Monitor Core Web Vitals** monthly
5. **Optimize based on real data** from analytics

## 📚 Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [WebPageTest](https://webpagetest.org/)
- [Can I Use](https://caniuse.com/)

## 🎯 Common Performance Issues

### High LCP

**Causes**:

- Large hero image
- Slow server response
- Render-blocking resources

**Solutions**:

- Use `priority` on LCP image
- Optimize image size
- Preconnect to image CDN
- Enable ISR/SSG

### High CLS

**Causes**:

- Images without dimensions
- Web fonts causing layout shift
- Dynamic content injection

**Solutions**:

- Set explicit width/height
- Use `font-display: swap`
- Reserve space for dynamic content

### High FID/INP

**Causes**:

- Long JavaScript tasks
- Heavy third-party scripts
- Unoptimized event handlers

**Solutions**:

- Code splitting
- Defer third-party scripts
- Use web workers for heavy computation
- Debounce/throttle event handlers

---

**Last Updated**: 2024-01-13
**Maintained By**: Development Team
