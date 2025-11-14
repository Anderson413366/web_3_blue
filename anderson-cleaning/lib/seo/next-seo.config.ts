/**
 * Default SEO Configuration for Anderson Cleaning
 *
 * This configuration provides site-wide SEO defaults
 * Individual pages can override these settings
 */

import { DefaultSeoProps } from 'next-seo'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const defaultSEO: DefaultSeoProps = {
  titleTemplate: '%s | Anderson Cleaning',
  defaultTitle: 'Anderson Cleaning - Commercial Cleaning Services in Western MA & CT',
  description:
    'Professional B2B commercial cleaning and janitorial services for offices, medical facilities, schools, and more in Western Massachusetts and Northern Connecticut. 100-mile service radius from Springfield, MA.',
  canonical: baseUrl,

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
        url: `${baseUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning - Professional Commercial Cleaning Services',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    handle: '@andersoncleaning',
    site: '@andersoncleaning',
    cardType: 'summary_large_image',
  },

  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'keywords',
      content:
        'commercial cleaning, janitorial services, office cleaning, medical facility cleaning, school cleaning, B2B cleaning, Springfield MA, Western Massachusetts, Northern Connecticut, professional cleaning',
    },
    {
      name: 'author',
      content: 'Anderson Cleaning, Inc.',
    },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'googlebot',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    {
      name: 'theme-color',
      content: '#1D4ED8',
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes',
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: 'default',
    },
    {
      name: 'apple-mobile-web-app-title',
      content: 'Anderson Cleaning',
    },
    {
      name: 'format-detection',
      content: 'telephone=no',
    },
    {
      property: 'og:locale',
      content: 'en_US',
    },
    {
      property: 'og:site_name',
      content: 'Anderson Cleaning',
    },
  ],

  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '180x180',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: '/safari-pinned-tab.svg',
      color: '#1D4ED8',
    },
  ],
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Commercial Cleaning Services in Western MA & CT',
    description:
      'Professional B2B commercial cleaning and janitorial services. Serving Springfield, Worcester, Hartford, and surrounding areas within 100 miles. Get a free quote today!',
    canonical: `${baseUrl}/`,
  },

  services: {
    title: 'Commercial Cleaning Services',
    description:
      'Comprehensive commercial cleaning services including office cleaning, janitorial services, medical facility cleaning, post-construction cleanup, and more. B2B only.',
    canonical: `${baseUrl}/services`,
  },

  industries: {
    title: 'Industries We Serve',
    description:
      'Specialized commercial cleaning for offices, medical facilities, schools, manufacturing, retail, and property management. No restaurants. B2B only.',
    canonical: `${baseUrl}/industries`,
  },

  about: {
    title: 'About Us',
    description:
      'Anderson Cleaning provides professional commercial cleaning services in Western MA and Northern CT. Family-owned, trusted by businesses since inception.',
    canonical: `${baseUrl}/about`,
  },

  testimonials: {
    title: 'Client Testimonials & Reviews',
    description:
      'Read what our commercial cleaning clients say about our services. 4.8/5 average rating from satisfied business customers across various industries.',
    canonical: `${baseUrl}/testimonials`,
  },

  contact: {
    title: 'Contact Us',
    description:
      'Get in touch with Anderson Cleaning for a free commercial cleaning quote. Serving Western MA and Northern CT within 100 miles of West Springfield.',
    canonical: `${baseUrl}/contact`,
  },

  quote: {
    title: 'Request a Free Cleaning Quote',
    description:
      'Request a free, no-obligation quote for commercial cleaning services. Fast response within 30 minutes during business hours. B2B only.',
    canonical: `${baseUrl}/quote`,
  },

  careers: {
    title: 'Careers - Join Our Team',
    description:
      'Join the Anderson Cleaning team! Apply now for commercial cleaning positions. Competitive pay, growth opportunities, and supportive work environment.',
    canonical: `${baseUrl}/apply`,
  },
}
