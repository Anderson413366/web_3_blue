import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import 'leaflet/dist/leaflet.css'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentInit from '@/components/ConsentInit'
import CookieBanner from '@/components/CookieBanner'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import SkipLink from '@/components/SkipLink'
import AccessibilityProvider from '@/components/AccessibilityProvider'
import DarkModeLogger from '@/components/DarkModeLogger'
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from '@/lib/seo/jsonld'
import StructuredData from '@/components/StructuredData'

// Load Inter font with Next.js font optimization
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Anderson Cleaning - Commercial Cleaning Services in Western MA & CT',
    template: '%s | Anderson Cleaning',
  },
  description:
    'Professional B2B commercial cleaning and janitorial services for offices, medical facilities, schools, and more in Western Massachusetts and Northern Connecticut. 100-mile service radius from Springfield, MA.',
  keywords: [
    'commercial cleaning',
    'janitorial services',
    'office cleaning',
    'medical facility cleaning',
    'school cleaning',
    'B2B cleaning',
    'Springfield MA',
    'Western Massachusetts',
    'Northern Connecticut',
  ],
  authors: [{ name: 'Anderson Cleaning, Inc.' }],
  creator: 'Anderson Cleaning, Inc.',
  publisher: 'Anderson Cleaning, Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Anderson Cleaning',
    title: 'Anderson Cleaning - Commercial Cleaning Services',
    description:
      'Professional B2B commercial cleaning and janitorial services for offices, medical facilities, schools, and more in Western Massachusetts and Northern Connecticut.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning - Professional Commercial Cleaning Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andersoncleaning',
    creator: '@andersoncleaning',
    title: 'Anderson Cleaning - Commercial Cleaning Services',
    description: 'Professional B2B commercial cleaning and janitorial services in Western MA & CT',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonceHeader = await headers()
  const nonce = nonceHeader.get('x-nonce')
  // Generate JSON-LD structured data
  const organizationSchema = generateOrganizationSchema()
  const localBusinessSchema = generateLocalBusinessSchema()
  const websiteSchema = generateWebsiteSchema()

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          nonce={nonce || undefined}
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window === 'undefined') return;

                var registry = {};
                var loggedReplacement = false;

                function getActualDefine() {
                  var ce = window.customElements;
                  if (!ce) return null;
                  var proto = Object.getPrototypeOf(ce);
                  if (proto && typeof proto.define === 'function') {
                    return proto.define;
                  }
                  return ce.define;
                }

                function guardedDefine(name, constructor, options) {
                  var ce = window.customElements;
                  if (!ce) return;
                  var stack = (new Error().stack || '').split('\\n');
                  var caller = stack[2] || 'unknown';

                  if (typeof ce.get === 'function' && ce.get(name)) {
                    console.warn('[CustomElementsGuard] BLOCKED duplicate registration:', name);
                    console.warn('Attempted by:', caller);
                    console.warn('First registered by:', registry[name] || 'unknown');
                    return;
                  }

                  console.log('[CustomElementsGuard] Registering:', name);
                  console.log('By:', caller);
                  registry[name] = caller;

                  var actualDefine = getActualDefine();
                  if (typeof actualDefine === 'function') {
                    return actualDefine.call(ce, name, constructor, options);
                  }
                }

                function applyGuard(target) {
                  if (!target || target.__customElementsGuarded) return;
                  Object.defineProperty(target, 'define', {
                    value: guardedDefine,
                    writable: false,
                    configurable: false,
                    enumerable: true,
                  });
                  target.__customElementsGuarded = true;
                }

                var currentCustomElements = window.customElements;
                if (currentCustomElements) {
                  applyGuard(currentCustomElements);
                }

                Object.defineProperty(window, 'customElements', {
                  get: function() {
                    return currentCustomElements;
                  },
                  set: function(value) {
                    currentCustomElements = value;
                    if (!loggedReplacement) {
                      console.warn('[CustomElementsGuard] Detected customElements replacement. Reapplying guard.');
                      loggedReplacement = true;
                    }
                    applyGuard(value);
                  },
                  configurable: true,
                });
              })();
            `,
          }}
        />
        {/* Resource Hints - Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* DNS Prefetch for additional third-party services */}
        <link rel="dns-prefetch" href="https://www.clarity.ms" />
        <link rel="dns-prefetch" href="https://client.crisp.chat" />
        <link rel="dns-prefetch" href="https://calendly.com" />
        <link rel="dns-prefetch" href="https://api.hubspot.com" />
        <link rel="dns-prefetch" href="https://api.resend.com" />

        {/* Favicon and Icons - Light Mode */}
        <link rel="icon" type="image/png" sizes="16x16" href="/brand/color/favicon-16.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/color/favicon-32.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="48x48" href="/brand/color/favicon-48.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="64x64" href="/brand/color/favicon-64.png" media="(prefers-color-scheme: light)" />
        <link rel="icon" type="image/png" sizes="128x128" href="/brand/color/favicon-128.png" media="(prefers-color-scheme: light)" />

        {/* Favicon and Icons - Dark Mode */}
        <link rel="icon" type="image/png" sizes="16x16" href="/brand/white/favicon-16-white.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="32x32" href="/brand/white/favicon-32-white.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="48x48" href="/brand/white/favicon-48-white.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="64x64" href="/brand/white/favicon-64-white.png" media="(prefers-color-scheme: dark)" />
        <link rel="icon" type="image/png" sizes="128x128" href="/brand/white/favicon-128-white.png" media="(prefers-color-scheme: dark)" />

        {/* Apple Touch Icon and PWA */}
        <link rel="apple-touch-icon" sizes="180x180" href="/brand/color/favicon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/brand/color/favicon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/brand/color/favicon-512.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme Color - Official Anderson Cleaning Deep Blue */}
        <meta name="theme-color" content="#002A86" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#002A86" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#002A86" />

          {/* JSON-LD Structured Data with CSP nonce */}
        <StructuredData schema={organizationSchema} nonce={nonce} />
        <StructuredData schema={localBusinessSchema} nonce={nonce} />
        <StructuredData schema={websiteSchema} nonce={nonce} />
      </head>
      <body className="antialiased">
        <ConsentInit />
        <AccessibilityProvider>
          <ThemeProvider>
            <DarkModeLogger />
            <SkipLink />
            <Header />
            <main className="min-h-screen" id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
            <CookieBanner />
          </ThemeProvider>
        </AccessibilityProvider>
        <WebVitalsReporter />
      </body>
    </html>
  )
}
