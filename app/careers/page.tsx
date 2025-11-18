import type { Metadata } from 'next'
import { AppProvider } from '@/lib/careers/AppContext'
import CareersPage from '@/components/careers/CareersPage'
import { generateJobPostingSchema, generateBreadcrumbSchema } from '@/lib/seo/jsonld'
import StructuredData from '@/components/StructuredData'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anderson-cleaning-site.vercel.app'

export const metadata: Metadata = {
  title: 'Careers at Anderson Cleaning - Join Our Team',
  description:
    'Join Anderson Cleaning\'s professional team. Full-time W-2 positions with health insurance, paid training, career advancement, and comprehensive benefits. Multiple locations in MA & CT. Apply now!',
  keywords: [
    'cleaning jobs',
    'commercial cleaning careers',
    'janitorial jobs',
    'full-time cleaning positions',
    'jobs in Springfield MA',
    'cleaning jobs Western Massachusetts',
    'jobs with benefits',
    'entry level jobs',
    'career opportunities',
    'Anderson Cleaning careers',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/careers`,
    siteName: 'Anderson Cleaning',
    title: 'Careers at Anderson Cleaning - Join Our Team',
    description:
      'Full-time W-2 positions with health insurance, paid training, and career advancement. Join our professional cleaning team in MA & CT.',
    images: [
      {
        url: '/images/og-careers.jpg',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Careers - Join Our Team',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@andersoncleaning',
    creator: '@andersoncleaning',
    title: 'Careers at Anderson Cleaning - Join Our Team',
    description: 'Full-time positions with benefits. Join our professional cleaning team in MA & CT.',
    images: ['/images/og-careers.jpg'],
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
  alternates: {
    canonical: `${baseUrl}/careers`,
    languages: {
      'en-US': `${baseUrl}/careers`,
      'es-ES': `${baseUrl}/careers?lang=es`,
      'pt-BR': `${baseUrl}/careers?lang=pt-BR`,
      'ro-RO': `${baseUrl}/careers?lang=ro`,
    },
  },
}

export default function CareersPageRoute() {
  // Generate structured data
  const jobPostingSchema = generateJobPostingSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Careers', url: `${baseUrl}/careers` },
  ])

  return (
    <>
      <StructuredData schema={jobPostingSchema} />
      <StructuredData schema={breadcrumbSchema} />
      <AppProvider>
        <CareersPage />
      </AppProvider>
    </>
  )
}
