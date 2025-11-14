'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import IndustriesGrid, { Industry } from '@/components/sections/IndustriesGrid'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'

export default function IndustriesPage() {
  const router = useRouter()

  const industries: Industry[] = [
    {
      title: 'Office Buildings',
      slug: 'offices',
      icon: '🏢',
      description:
        'Corporate offices, coworking spaces, and business centers with daily or weekly cleaning programs.',
      features: [
        'Daily/weekly cleaning schedules',
        'Conference room preparation',
        'Break room maintenance',
        'Lobby and common area care',
      ],
    },
    {
      title: 'Medical Facilities',
      slug: 'medical',
      icon: '🏥',
      description:
        'Healthcare offices, clinics, and medical centers requiring specialized sanitation protocols.',
      features: [
        'OSHA-compliant cleaning',
        'Exam room sanitization',
        'Waiting area maintenance',
        'EPA-approved disinfectants',
      ],
    },
    {
      title: 'Educational Facilities',
      slug: 'education',
      icon: '🎓',
      description:
        'Schools, colleges, training centers, and childcare facilities with high-traffic cleaning needs.',
      features: [
        'Classroom deep cleaning',
        'Restroom sanitation',
        'Cafeteria maintenance',
        'Safe, non-toxic products',
      ],
    },
    {
      title: 'Manufacturing & Warehouses',
      slug: 'manufacturing',
      icon: '🏭',
      description:
        'Industrial facilities, distribution centers, and warehouses requiring specialized cleaning.',
      features: [
        'Floor scrubbing & maintenance',
        'Break room & office areas',
        'High-traffic zone care',
        'Safety-first approach',
      ],
    },
    {
      title: 'Property Management',
      slug: 'property-management',
      icon: '🏘️',
      description:
        'Multi-tenant buildings, apartment complexes, and commercial real estate portfolios.',
      features: [
        'Common area cleaning',
        'Turnover cleaning',
        'Amenity space maintenance',
        'Flexible scheduling',
      ],
    },
    {
      title: 'Retail Spaces',
      slug: 'retail',
      icon: '🏬',
      description:
        'Non-food retail stores, showrooms, and shopping centers maintaining professional appearance.',
      features: [
        'After-hours cleaning',
        'Window cleaning',
        'Floor care programs',
        'Customer-facing areas',
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Industries We Serve</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Specialized commercial cleaning solutions tailored to your industry's unique needs and
            compliance requirements.
          </p>
          <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
            Get Your Free Quote
          </Button>
        </div>
      </section>

      {/* Important Notice */}
      <section className="py-12 bg-yellow-50 dark:bg-yellow-900/20 border-y border-yellow-200 dark:border-yellow-800">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 border-2 border-yellow-500 dark:border-yellow-600">
              <div className="flex-shrink-0 mt-1">
                <div className="h-10 w-10 rounded-full bg-yellow-500 dark:bg-yellow-600 flex items-center justify-center text-white font-bold text-xl">
                  ⚠️
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Important: We Do NOT Service Restaurants
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                  Anderson Cleaning specializes in B2B commercial and janitorial services for
                  offices, medical facilities, schools, manufacturing, property management, and
                  retail showrooms.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                  We do <strong>not</strong> provide cleaning services for restaurants, food service
                  establishments, or facilities requiring 7-day-per-week coverage.
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  This allows us to specialize in the industries we serve best and maintain our high
                  quality standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Facility Types We Clean
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              From corporate offices to medical facilities, we understand the unique cleaning
              requirements of each industry.
            </p>
          </div>

          <IndustriesGrid
            industries={industries}
            columns={3}
            featured={['offices', 'medical']}
            onIndustryClick={(slug) => router.push(`/industries/${slug}`)}
          />
        </div>
      </section>

      {/* Why Industry-Specific Matters */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">
              Why Industry-Specific Cleaning Matters
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: '📋',
                  title: 'Compliance Requirements',
                  description:
                    'Each industry has specific regulations—OSHA for healthcare, safety standards for manufacturing, etc.',
                },
                {
                  icon: '🧪',
                  title: 'Specialized Products',
                  description:
                    'Medical facilities need EPA-approved disinfectants, schools require non-toxic cleaners.',
                },
                {
                  icon: '⏰',
                  title: 'Optimal Timing',
                  description:
                    'Retail needs after-hours cleaning, offices prefer evenings, medical may need multiple shifts.',
                },
                {
                  icon: '👥',
                  title: 'Trained Staff',
                  description:
                    'Our teams are trained on industry-specific protocols, risk areas, and best practices.',
                },
              ].map((item, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience Industry-Leading Cleaning?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a customized cleaning program designed specifically for your facility type.
          </p>
          <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
            Request Your Custom Quote
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
