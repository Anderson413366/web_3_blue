import Image from 'next/image'
import type { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import CareerApplicationForm from '@/components/forms/CareerApplicationForm'
import {
  DollarSign,
  GraduationCap,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import StructuredData from '@/components/StructuredData'
import { generateJobPostingSchema, generateBreadcrumbSchema } from '@/lib/seo/jsonld'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anderson-cleaning-site.vercel.app'

export const metadata: Metadata = {
  title: 'Careers - Cleaning Specialist, Field Supervisor, Operations Assistant | Anderson Cleaning',
  description:
    'Join Anderson Cleaning! Now hiring Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
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
    title:
      'Careers - Cleaning Specialist, Field Supervisor, Operations Assistant | Anderson Cleaning',
    description:
      'Join Anderson Cleaning! Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
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
    title: 'Careers - Cleaning Specialist, Field Supervisor, Operations Assistant',
    description:
      'Now hiring Cleaning Specialists ($15-20/hr), Field Supervisors ($20-25/hr), and Operations Assistants (Premium Pay). Apply today!',
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

export default function CareersPage() {
  const jobPostingSchema = generateJobPostingSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: baseUrl },
    { name: 'Careers', url: `${baseUrl}/careers` },
  ])

  return (
    <>
      <StructuredData schema={jobPostingSchema} />
      <StructuredData schema={breadcrumbSchema} />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep-blue via-brand-navy to-brand-bright-blue text-white pt-28 pb-16 md:pt-32 md:pb-20">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

          <div className="relative z-10 container mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">Join Our Growing Team</h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Competitive pay, comprehensive training, and real career advancement opportunities
              </p>
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 bg-neutral-off-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 text-center mb-12">Current Openings</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Cleaning Specialist',
                  locationIcon: <MapPin className="h-4 w-4" />,
                  locationLabel: 'Springfield/Hartford Area',
                  rateIcon: <DollarSign className="h-4 w-4" />,
                  rateLabel: '$15–20/hour',
                  bullets: [
                    'Part-time & Full-time available',
                    'Evening/Night shifts',
                    'No experience required',
                  ],
                },
                {
                  title: 'Field Supervisor',
                  locationIcon: <MapPin className="h-4 w-4" />,
                  locationLabel: 'West Springfield',
                  rateIcon: <DollarSign className="h-4 w-4" />,
                  rateLabel: '$20–25/hour',
                  bullets: [
                    'Full-time W-2 position',
                    '2+ years experience required',
                    'Lead & train team members',
                  ],
                },
                {
                  title: 'Operations Assistant',
                  locationIcon: <Clock className="h-4 w-4" />,
                  locationLabel: '4:30 PM – 10 PM',
                  rateIcon: <Sparkles className="h-4 w-4" />,
                  rateLabel: 'Premium Pay',
                  bullets: [
                    'Evening hours (4:30 PM – 10 PM)',
                    'Night differential + base pay',
                    'Full-time or Part-time',
                    'Fewer distractions',
                  ],
                },
              ].map((role) => (
                <div
                  key={role.title}
                  className="h-full flex flex-col bg-white dark:bg-slate-800 rounded-xl border-2 border-neutral-light-grey dark:border-slate-700 hover:border-brand-bright-blue transition-all duration-300 hover:-translate-y-1 p-6 shadow-sm"
                >
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-3">{role.title}</h3>
                  <div className="flex items-center gap-2 text-neutral-charcoal/80 dark:text-white/80 mb-2">
                    {role.locationIcon}
                    <span className="text-body-sm">{role.locationLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-bright-blue mb-4">
                    {role.rateIcon}
                    <span className="text-body-sm font-bold">{role.rateLabel}</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-body-sm flex-1">
                    {role.bullets.map((badge) => (
                      <li key={badge} className="flex items-start gap-2 text-neutral-charcoal/80 dark:text-white/80">
                        <CheckCircle2 className="h-4 w-4 text-brand-bright-blue mt-0.5 flex-shrink-0" />
                        <span>{badge}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#application-form" className="inline-block w-full mt-auto">
                    <Button variant="secondary" size="sm" className="w-full">
                      Apply Now
                    </Button>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <CareerApplicationForm />
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
