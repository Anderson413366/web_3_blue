module.exports = {
  ci: {
    collect: {
      // Use deployed URL from env or fallback to localhost
      // In CI: LHCI_BUILD_URL will be set to Vercel preview URL
      startServerCommand: process.env.LHCI_BUILD_URL ? undefined : 'npm run start',
      url: process.env.LHCI_BUILD_URL
        ? [
            `${process.env.LHCI_BUILD_URL}/`,
            `${process.env.LHCI_BUILD_URL}/services`,
            `${process.env.LHCI_BUILD_URL}/apply`,
          ]
        : [
            'http://localhost:3000/',
            'http://localhost:3000/services',
            'http://localhost:3000/apply',
          ],
      numberOfRuns: 3,
      settings: {
        // Mobile emulation for realistic performance testing
        formFactor: 'mobile',
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2,
          disabled: false,
        },
        // Simulated 4G throttling (realistic mobile conditions)
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // ===== PERFORMANCE BUDGETS (MOBILE) =====
        // Category score must be >= 90 (0.9)
        'categories:performance': ['error', { minScore: 0.9 }],

        // Core Web Vitals - STRICT
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }], // LCP <= 2.5s
        'total-blocking-time': ['error', { maxNumericValue: 150 }], // TBT <= 150ms
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }], // CLS <= 0.1

        // Other Performance Metrics
        'first-contentful-paint': ['warn', { maxNumericValue: 1800 }], // FCP <= 1.8s
        'speed-index': ['warn', { maxNumericValue: 3400 }], // SI <= 3.4s
        'interactive': ['warn', { maxNumericValue: 3800 }], // TTI <= 3.8s
        'max-potential-fid': ['warn', { maxNumericValue: 130 }], // Max FID <= 130ms

        // Resource Budgets
        'total-byte-weight': ['warn', { maxNumericValue: 3000000 }], // Total <= 3MB (lower over time)
        'dom-size': ['warn', { maxNumericValue: 1500 }], // DOM nodes <= 1500
        'bootup-time': ['warn', { maxNumericValue: 3500 }], // JS bootup <= 3.5s
        'mainthread-work-breakdown': ['warn', { maxNumericValue: 4000 }], // Main thread <= 4s

        // Optimization Audits
        'uses-optimized-images': 'error',
        'uses-webp-images': 'warn',
        'uses-responsive-images': 'warn',
        'offscreen-images': 'warn',
        'uses-text-compression': 'error',
        'uses-rel-preconnect': 'warn',
        'font-display': 'warn',
        'unminified-css': 'error',
        'unminified-javascript': 'error',
        'unused-css-rules': 'warn',
        'unused-javascript': 'warn',
        'modern-image-formats': 'warn',
        'uses-long-cache-ttl': 'warn',
        'no-document-write': 'error',
        'uses-passive-event-listeners': 'warn',
        'no-unload-listeners': 'warn',
        'preload-lcp-image': 'warn',
        'valid-source-maps': 'warn',

        // ===== ACCESSIBILITY =====
        'categories:accessibility': ['warn', { minScore: 0.95 }],
        'color-contrast': 'error',
        'image-alt': 'error',
        'button-name': 'error',
        'link-name': 'error',
        'label': 'error',
        'aria-required-attr': 'error',
        'aria-valid-attr': 'error',
        'aria-valid-attr-value': 'error',
        'heading-order': 'warn',
        'tabindex': 'warn',
        'duplicate-id-aria': 'error',

        // ===== BEST PRACTICES =====
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'errors-in-console': 'warn',
        'uses-http2': 'warn',
        'no-vulnerable-libraries': 'warn',
        'image-aspect-ratio': 'warn',
        'image-size-responsive': 'warn',
        'doctype': 'error',
        'charset': 'error',

        // ===== SEO =====
        'categories:seo': ['warn', { minScore: 0.95 }],
        'meta-description': 'error',
        'document-title': 'error',
        'html-has-lang': 'error',
        'canonical': 'warn',
        'viewport': 'error',
        'robots-txt': 'warn',
        'hreflang': 'warn',
        'font-size': 'warn',
        'tap-targets': 'warn',

        // ===== PWA (Optional) =====
        'themed-omnibox': 'warn',
        'installable-manifest': 'off', // Not a PWA
        'service-worker': 'off', // Not using service worker yet
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}
