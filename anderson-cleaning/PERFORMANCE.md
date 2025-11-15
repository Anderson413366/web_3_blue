# Performance Monitoring & Optimization

This document outlines our performance standards, monitoring setup, and optimization strategies for the Anderson Cleaning website.

## Table of Contents

- [Performance Standards](#performance-standards)
- [Running Performance Tests](#running-performance-tests)
- [Core Web Vitals Explained](#core-web-vitals-explained)
- [Common Performance Issues](#common-performance-issues)
- [Optimization Strategies](#optimization-strategies)
- [CI/CD Integration](#cicd-integration)

## Performance Standards

We enforce strict performance budgets on **mobile devices** (375x667 viewport, simulated 4G connection) to ensure excellent user experience for all visitors.

### Performance Budgets

| Metric | Budget | Severity | Description |
|--------|--------|----------|-------------|
| **Performance Score** | ≥ 90 | Error | Overall Lighthouse performance score |
| **LCP** (Largest Contentful Paint) | ≤ 2.5s | Error | Time until largest content element renders |
| **TBT** (Total Blocking Time) | ≤ 150ms | Error | Total time main thread is blocked |
| **CLS** (Cumulative Layout Shift) | ≤ 0.1 | Error | Visual stability during page load |
| **FCP** (First Contentful Paint) | ≤ 1.8s | Warning | Time until first content renders |
| **Speed Index** | ≤ 3.4s | Warning | How quickly content is visually displayed |
| **TTI** (Time to Interactive) | ≤ 3.8s | Warning | Time until page is fully interactive |
| **Total Byte Weight** | ≤ 3MB | Warning | Total size of all resources (lower over time) |
| **DOM Size** | ≤ 1500 nodes | Warning | Number of DOM elements |
| **JavaScript Bootup** | ≤ 3.5s | Warning | Time spent parsing/compiling JS |

### Accessibility Standards

- **Accessibility Score**: ≥ 95
- All images must have alt text
- Proper heading hierarchy
- Sufficient color contrast
- Valid ARIA attributes

### SEO Standards

- **SEO Score**: ≥ 95
- Meta descriptions on all pages
- Unique, descriptive page titles
- Valid HTML with lang attribute
- Mobile viewport configuration

## Running Performance Tests

### Local Testing

1. **Build the production bundle:**
   ```bash
   npm run build
   ```

2. **Run Lighthouse CI locally:**
   ```bash
   npm run lhci
   ```

   This will:
   - Start the Next.js production server
   - Run Lighthouse against `/`, `/services`, and `/apply`
   - Test 3 times per page and take the median
   - Enforce all performance budgets
   - Generate detailed HTML reports in `.lighthouseci/`

3. **View detailed reports:**
   ```bash
   open .lighthouseci/*.html
   ```

### Testing Against Deployed Previews

Run LHCI against a deployed preview URL:

```bash
LHCI_BUILD_URL=https://your-preview-url.vercel.app npm run lhci
```

This skips starting a local server and tests the deployed version instead.

### Continuous Integration

Performance tests run automatically on:
- **Pull Requests**: Tests against Vercel preview deployment
- **Main Branch Pushes**: Tests against local build

PRs will be blocked if performance budgets are not met.

## Core Web Vitals Explained

### Largest Contentful Paint (LCP) ≤ 2.5s

**What it measures:** Time until the largest content element (image, text block, video) becomes visible.

**Why it matters:** Users perceive the page as loaded when the main content appears.

**How to optimize:**
- Use `next/image` for optimized image loading
- Implement priority loading for hero images: `<Image priority />`
- Lazy load below-the-fold images
- Optimize server response time
- Remove render-blocking resources
- Use CDN for static assets

**Common issues:**
```tsx
// ❌ Bad: Large unoptimized image
<img src="/hero.jpg" alt="Hero" />

// ✅ Good: Optimized with next/image
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority
/>
```

### Total Blocking Time (TBT) ≤ 150ms

**What it measures:** Total time the main thread is blocked and unable to respond to user input.

**Why it matters:** High TBT makes the page feel sluggish and unresponsive.

**How to optimize:**
- Code split large JavaScript bundles
- Defer non-critical JavaScript
- Use dynamic imports for heavy components
- Minimize third-party script impact
- Remove unused JavaScript

**Common issues:**
```tsx
// ❌ Bad: Importing heavy library synchronously
import { HeavyChart } from 'heavy-chart-library'

function Dashboard() {
  return <HeavyChart data={data} />
}

// ✅ Good: Dynamic import with loading state
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(
  () => import('heavy-chart-library').then(mod => mod.HeavyChart),
  { loading: () => <p>Loading chart...</p> }
)

function Dashboard() {
  return <HeavyChart data={data} />
}
```

### Cumulative Layout Shift (CLS) ≤ 0.1

**What it measures:** Visual stability - how much content shifts during page load.

**Why it matters:** Unexpected layout shifts frustrate users and can cause misclicks.

**How to optimize:**
- Always specify width/height for images and videos
- Reserve space for dynamic content
- Avoid inserting content above existing content
- Use CSS `aspect-ratio` for responsive media
- Preload custom fonts with `font-display: swap`

**Common issues:**
```tsx
// ❌ Bad: No dimensions specified
<img src="/logo.png" alt="Logo" />

// ✅ Good: Dimensions prevent layout shift
<img src="/logo.png" alt="Logo" width={200} height={50} />

// ✅ Better: Use next/image (automatically handles aspect ratio)
<Image src="/logo.png" alt="Logo" width={200} height={50} />
```

## Common Performance Issues

### Issue: Large JavaScript Bundle

**Symptoms:**
- High TBT (> 200ms)
- Slow TTI (> 4s)
- "Reduce unused JavaScript" warning

**Solutions:**
1. **Code splitting:**
   ```tsx
   // Split routes automatically with Next.js App Router
   // Pages are automatically code-split

   // Manual splitting for heavy components
   const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'))
   ```

2. **Optimize package imports:**
   ```tsx
   // ❌ Bad: Imports entire library
   import _ from 'lodash'

   // ✅ Good: Import only what you need
   import debounce from 'lodash/debounce'
   ```

3. **Analyze bundle size:**
   ```bash
   npm run build
   # Review .next/analyze/ for bundle visualization
   ```

### Issue: Unoptimized Images

**Symptoms:**
- High LCP (> 3s)
- "Properly size images" warning
- Large total byte weight (> 5MB)

**Solutions:**
1. **Use next/image:**
   ```tsx
   import Image from 'next/image'

   <Image
     src="/photo.jpg"
     alt="Description"
     width={800}
     height={600}
     sizes="(max-width: 768px) 100vw, 800px"
   />
   ```

2. **Use modern formats:**
   - WebP/AVIF automatically served by next/image
   - Configure in `next.config.js`:
     ```js
     images: {
       formats: ['image/avif', 'image/webp'],
     }
     ```

3. **Lazy load off-screen images:**
   ```tsx
   <Image
     src="/below-fold.jpg"
     alt="Description"
     loading="lazy"
     width={800}
     height={600}
   />
   ```

### Issue: Render-Blocking Resources

**Symptoms:**
- Slow FCP (> 2s)
- "Eliminate render-blocking resources" warning

**Solutions:**
1. **Defer non-critical CSS:**
   ```tsx
   // Use CSS modules for component-specific styles
   import styles from './Component.module.css'
   ```

2. **Inline critical CSS:**
   - Already handled by Next.js for initial render

3. **Preload critical resources:**
   ```tsx
   // In app/layout.tsx
   <link
     rel="preload"
     href="/fonts/custom-font.woff2"
     as="font"
     type="font/woff2"
     crossOrigin="anonymous"
   />
   ```

### Issue: Third-Party Script Impact

**Symptoms:**
- High TBT
- "Reduce impact of third-party code" warning

**Solutions:**
1. **Use Next.js Script component with strategy:**
   ```tsx
   import Script from 'next/script'

   // ❌ Bad: Blocks rendering
   <script src="https://example.com/script.js"></script>

   // ✅ Good: Loads after page interactive
   <Script
     src="https://example.com/script.js"
     strategy="lazyOnload"
   />
   ```

2. **Lazy load analytics:**
   - GTM already configured to load with `strategy="afterInteractive"`

3. **Self-host third-party scripts when possible:**
   - Reduces DNS lookups and connection time

### Issue: Layout Shifts

**Symptoms:**
- High CLS (> 0.15)
- Content "jumping" during load

**Solutions:**
1. **Reserve space for dynamic content:**
   ```tsx
   // ❌ Bad: Height collapses when loading
   {isLoading ? <Spinner /> : <Content />}

   // ✅ Good: Fixed height prevents shift
   <div style={{ minHeight: '500px' }}>
     {isLoading ? <Spinner /> : <Content />}
   </div>
   ```

2. **Use aspect ratio for responsive media:**
   ```css
   .video-container {
     aspect-ratio: 16 / 9;
   }
   ```

3. **Preload fonts:**
   ```tsx
   // In app/layout.tsx
   <link
     rel="preload"
     href="/fonts/inter.woff2"
     as="font"
     type="font/woff2"
     crossOrigin="anonymous"
   />
   ```

## Optimization Strategies

### 1. Image Optimization

**Checklist:**
- [ ] All images use `next/image` component
- [ ] Hero images have `priority` prop
- [ ] Below-fold images have `loading="lazy"`
- [ ] Appropriate `sizes` attribute for responsive images
- [ ] Images compressed (use ImageOptim, Squoosh, or similar)
- [ ] WebP/AVIF formats enabled in `next.config.js`

**Example:**
```tsx
import Image from 'next/image'

// Hero image - loads immediately
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1920}
  height={1080}
  priority
  sizes="100vw"
/>

// Gallery image - lazy loads
<Image
  src="/gallery-1.jpg"
  alt="Gallery item"
  width={800}
  height={600}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### 2. Code Splitting

**Strategies:**
- Route-based splitting (automatic with Next.js App Router)
- Component-based splitting (use `dynamic()`)
- Vendor splitting (configured in `next.config.js`)

**Example:**
```tsx
import dynamic from 'next/dynamic'

// Heavy interactive component
const InteractiveMap = dynamic(
  () => import('@/components/InteractiveMap'),
  {
    loading: () => <MapSkeleton />,
    ssr: false, // Client-only component
  }
)

// Modal that's not always shown
const VideoModal = dynamic(() => import('@/components/VideoModal'))
```

### 3. Server Components

**Best practices:**
- Use Server Components by default (no 'use client')
- Only add 'use client' when needed (interactivity, hooks)
- Fetch data in Server Components to reduce client bundle

**Example:**
```tsx
// ✅ Server Component - no JS sent to client
async function BlogPost({ slug }) {
  const post = await fetchPost(slug) // Runs on server
  return <Article content={post.content} />
}

// ✅ Client Component only when needed
'use client'
function LikeButton() {
  const [likes, setLikes] = useState(0)
  return <button onClick={() => setLikes(l => l + 1)}>
    ❤️ {likes}
  </button>
}
```

### 4. Caching Strategy

**Already configured:**
- Static assets: 1 year cache (`max-age=31536000`)
- Next.js static pages: Cached at edge
- Images: 1 year cache with immutable flag

**Verify caching:**
```bash
curl -I https://your-site.com/image.jpg
# Should see: Cache-Control: public, max-age=31536000, immutable
```

### 5. Font Optimization

**Next.js automatic optimization:**
```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Prevents invisible text during load
  preload: true,
})

export default function RootLayout({ children }) {
  return (
    <html className={inter.className}>
      {children}
    </html>
  )
}
```

### 6. Reduce JavaScript Execution

**Strategies:**
- Remove console.logs in production (configured in `next.config.js`)
- Minimize third-party scripts
- Use Web Workers for heavy computations
- Debounce/throttle event handlers

**Example:**
```tsx
import { useMemo, useCallback } from 'react'
import debounce from 'lodash/debounce'

function SearchInput() {
  // Debounce expensive search operation
  const debouncedSearch = useMemo(
    () => debounce((query) => {
      performSearch(query)
    }, 300),
    []
  )

  return <input onChange={(e) => debouncedSearch(e.target.value)} />
}
```

## CI/CD Integration

### Automated Performance Testing

Performance tests run automatically in GitHub Actions:

**On Pull Requests:**
1. Vercel deploys preview
2. GitHub Action waits for deployment
3. Lighthouse CI runs against preview URL
4. PR is blocked if budgets fail
5. Comment posted with detailed results

**On Main Branch:**
- Local build tested to catch regressions

### Viewing Results

**In GitHub:**
- Check PR comments for performance warnings
- Download Lighthouse reports from Actions artifacts
- View detailed HTML reports with recommendations

**Locally:**
```bash
npm run lhci
open .lighthouseci/*.html
```

### Debugging Failed Budgets

1. **Download the artifact:**
   - Go to GitHub Actions run
   - Download "lighthouse-results" artifact
   - Open HTML reports for detailed analysis

2. **Run locally for faster iteration:**
   ```bash
   npm run build
   npm run lhci
   ```

3. **Compare before/after:**
   - Check which metric failed
   - Review recent code changes
   - Use Chrome DevTools Performance panel
   - Analyze bundle size changes

### Updating Budgets

If legitimate changes require adjusting budgets (rare):

1. **Edit `lighthouserc.js`:**
   ```js
   assertions: {
     'largest-contentful-paint': ['error', { maxNumericValue: 3000 }], // Increased from 2500
   }
   ```

2. **Document why in PR:**
   - Explain what changed
   - Show before/after metrics
   - Describe mitigation plan to improve again

3. **Get team approval before merging**

## Resources

- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse CI Docs](https://github.com/GoogleChrome/lighthouse-ci)
- [Next.js Performance](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Font Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)

## Quick Reference

```bash
# Run performance tests locally
npm run build && npm run lhci

# View reports
open .lighthouseci/*.html

# Test against deployed preview
LHCI_BUILD_URL=https://preview-url.vercel.app npm run lhci

# Analyze bundle size
npm run build
# Check .next/analyze/ output

# Run E2E tests
npm run test:e2e

# Run unit tests
npm run test
```

---

**Last Updated:** 2025-11-15
**Maintainer:** Development Team
