import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { ThemeProvider } from '@/lib/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ConsentInit from '@/components/ConsentInit'
import CookieBanner from '@/components/CookieBanner'
import WebVitalsReporter from '@/components/WebVitalsReporter'
import SkipLink from '@/components/SkipLink'
import AccessibilityProvider from '@/components/AccessibilityProvider'
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

        {/* Favicon and Icons */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/images/logo-icon.svg" color="#1D4ED8" />

        {/* Theme Color */}
        <meta name="theme-color" content="#1D4ED8" />
        <meta name="msapplication-TileColor" content="#1D4ED8" />

          {/* JSON-LD Structured Data with CSP nonce */}
        <StructuredData schema={organizationSchema} nonce={nonce} />
        <StructuredData schema={localBusinessSchema} nonce={nonce} />
        <StructuredData schema={websiteSchema} nonce={nonce} />
      </head>
      <body className="antialiased">
        <ConsentInit />
        <AccessibilityProvider>
          <ThemeProvider>
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
