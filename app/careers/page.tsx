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
  title: 'Careers at Anderson Cleaning - Join Our Team',
  description:
    "Join Anderson Cleaning's professional team. Full-time W-2 positions with health insurance, paid training, career advancement, and comprehensive benefits. Multiple locations in MA & CT. Apply now!",
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
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/team-cleaning.jpg"
              alt="Anderson Cleaning Team"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-brand-navy/70" />
          </div>

          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-h1 font-extrabold mb-4">Join a Crew That Cleans Up – And Levels Up</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              18 Years of Excellence • Paid Training • Flexible Schedules • Real Growth
            </p>

            <div className="flex flex-wrap justify-center gap-8 mb-10">
              <div className="flex flex-col items-center">
                <DollarSign className="h-12 w-12 text-brand-emerald mb-2" />
                <span className="font-semibold">Competitive Pay</span>
              </div>
              <div className="flex flex-col items-center">
                <GraduationCap className="h-12 w-12 text-brand-emerald mb-2" />
                <span className="font-semibold">40+ Hours Training</span>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="h-12 w-12 text-brand-emerald mb-2" />
                <span className="font-semibold">Career Advancement</span>
              </div>
            </div>

            <a href="#open-positions" className="inline-block">
              <Button variant="accent" size="lg">
                View Open Positions
              </Button>
            </a>
          </div>
        </section>

        {/* Open Positions */}
        <section id="open-positions" className="py-16 bg-neutral-off-white">
          <div className="container mx-auto px-4">
            <h2 className="text-h2 text-center mb-12">Current Openings</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  title: 'Commercial Cleaner',
                  locationIcon: <MapPin className="h-4 w-4" />,
                  locationLabel: 'Springfield/Hartford Area',
                  rateIcon: <DollarSign className="h-4 w-4" />,
                  rateLabel: '$18–22/hour',
                  bullets: [
                    'Part-time & Full-time available',
                    'Evening/Night shifts',
                    'No experience required',
                  ],
                },
                {
                  title: 'Crew Leader',
                  locationIcon: <MapPin className="h-4 w-4" />,
                  locationLabel: 'West Springfield',
                  rateIcon: <DollarSign className="h-4 w-4" />,
                  rateLabel: '$22–27/hour',
                  bullets: [
                    'Full-time W-2 position',
                    '2+ years experience required',
                    'Lead & train team members',
                  ],
                },
                {
                  title: 'Night Shift Specialist',
                  locationIcon: <Clock className="h-4 w-4" />,
                  locationLabel: '10 PM – 6 AM',
                  rateIcon: <Sparkles className="h-4 w-4" />,
                  rateLabel: 'Premium Pay',
                  bullets: [
                    'Night differential + base pay',
                    'Full-time or Part-time',
                    'Fewer distractions',
                  ],
                },
              ].map((role) => (
                <div
                  key={role.title}
                  className="bg-white rounded-lg border-2 border-neutral-light-grey hover:border-brand-emerald transition-colors p-6"
                >
                  <h3 className="text-h3 mb-2">{role.title}</h3>
                  <div className="flex items-center gap-2 text-neutral-charcoal mb-1">
                    {role.locationIcon}
                    <span className="text-body-sm">{role.locationLabel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-charcoal mb-4">
                    {role.rateIcon}
                    <span className="text-body-sm font-semibold">{role.rateLabel}</span>
                  </div>

                  <ul className="space-y-2 mb-6 text-body-sm">
                    {role.bullets.map((badge) => (
                      <li key={badge} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-brand-emerald mt-0.5 flex-shrink-0" />
                        <span>{badge}</span>
                      </li>
                    ))}
                  </ul>

                  <a href="#application-form" className="inline-block w-full">
                    <Button variant="primary" size="sm" className="w-full">
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
