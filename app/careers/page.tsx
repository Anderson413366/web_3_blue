import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  Briefcase,
  Heart,
  TrendingUp,
  Users,
  Award,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Shield,
  GraduationCap,
} from 'lucide-react'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://andersoncleaning.com'

export const metadata: Metadata = {
  title: 'Careers - Join Anderson Cleaning Team',
  description:
    'Explore career opportunities at Anderson Cleaning. Full-time W-2 positions with competitive pay, health insurance, paid training, and career advancement in Western MA & CT.',
  keywords: [
    'cleaning jobs',
    'commercial cleaning careers',
    'janitorial jobs',
    'full-time cleaning positions',
    'jobs in Springfield MA',
    'cleaning jobs Western Massachusetts',
    'jobs with benefits',
    'entry level jobs',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `${baseUrl}/careers`,
    siteName: 'Anderson Cleaning',
    title: 'Careers - Join Anderson Cleaning Team',
    description:
      'Full-time W-2 positions with health insurance, paid training, and career advancement opportunities.',
    images: [
      {
        url: '/images/og-careers.jpg',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning Careers',
      },
    ],
  },
}

export default function CareersOverviewPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white pt-28 pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Build Your Career with Anderson Cleaning
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Join a team that values growth, stability, and professionalism
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/apply">
                <Button variant="accent" size="lg">
                  View Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#why-anderson">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Anderson Cleaning */}
      <section id="why-anderson" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Work at Anderson Cleaning?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're not just another cleaning company. We invest in our team and provide real career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
                <DollarSign className="h-7 w-7 text-primary-700 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Competitive Pay
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                $35,000-$45,000 annual salary with regular performance reviews and raises
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-full mb-4">
                <Shield className="h-7 w-7 text-accent-700 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Full Benefits
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Health insurance, paid time off, and comprehensive benefits package
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <GraduationCap className="h-7 w-7 text-green-700 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Paid Training
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                40+ hours of comprehensive training with ongoing professional development
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <TrendingUp className="h-7 w-7 text-purple-700 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Career Growth
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Clear advancement paths from Team Member to Supervisor to Manager
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
                <Users className="h-7 w-7 text-orange-700 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Supportive Team
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Work with experienced professionals who value respect and collaboration
              </p>
            </div>

            <div className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Clock className="h-7 w-7 text-blue-700 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Work-Life Balance
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Consistent schedules, no weekends required, and predictable hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Current Openings
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                We're actively hiring for the following positions
              </p>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Commercial Cleaning Team Member
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300 mb-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Multiple Locations - MA & CT</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>Full-Time W-2</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" />
                      <span>$35,000-$45,000/year</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    No experience required - we provide comprehensive training
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Health insurance, paid time off, and benefits
                  </span>
                </div>
                <div className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-accent-600 dark:text-accent-400 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Advancement opportunities to supervisor and management roles
                  </span>
                </div>
              </div>

              <Link href="/apply">
                <Button variant="primary" size="lg" className="w-full sm:w-auto">
                  Apply for This Position
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Simple Application Process
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From application to hire in 4 easy steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Apply Online
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Submit your application through our simple online form
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Phone Interview
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Quick 15-minute call to discuss the role and answer questions
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  In-Person Meeting
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Meet the team and see our facilities
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-600 text-white rounded-full text-2xl font-bold mb-4">
                  4
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Start Training
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Begin paid training and join your team
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join a team that invests in your success and provides real opportunities for growth.
          </p>
          <Link href="/apply">
            <Button variant="accent" size="lg">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
