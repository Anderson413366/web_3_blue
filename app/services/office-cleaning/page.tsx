'use client'

import { Button } from '@/components/ui/Button'
import ProcessSteps from '@/components/sections/ProcessSteps'
import { CheckCircle2, Clock, Shield, Users, Sparkles } from 'lucide-react'

export default function OfficeCleaningPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">🏢</div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
              Office & Commercial Cleaning
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Nightly and weekly cleaning programs that keep your workplace spotless, safe, and
              productive.
            </p>
            <Button variant="accent" size="lg" onClick={() => (window.location.href = '/quote')}>
              Get Your Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What's Included</h2>
            <p className="text-xl text-gray-600">
              Comprehensive cleaning tailored to your office environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                Daily Cleaning Tasks
              </h3>
              <ul className="space-y-3">
                {[
                  'Empty all trash and recycling bins',
                  'Vacuum all carpeted areas',
                  'Sweep and mop hard floors',
                  'Clean and sanitize restrooms',
                  'Wipe down desks, counters, and surfaces',
                  'Clean breakroom and kitchen areas',
                  'Spot-clean walls, doors, and baseboards',
                  'Disinfect high-touch points (door handles, light switches)',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" />
                Weekly/Monthly Deep Cleaning
              </h3>
              <ul className="space-y-3">
                {[
                  'Detail-clean all glass and mirrors',
                  'Dust all surfaces, shelves, and fixtures',
                  'Clean behind and under furniture',
                  'Sanitize phones and keyboards',
                  'Wipe down window sills and blinds',
                  'Clean interior windows',
                  'Vacuum under desks and hard-to-reach areas',
                  'Spot-clean carpet stains',
                ].map((item, i) => (
                  <li key={i} className="flex items-start text-gray-700">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How We Ensure Quality */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How We Ensure Quality
            </h2>
            <p className="text-xl text-gray-600">Corporate-grade standards for every clean</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: 'Trained Teams',
                description:
                  'Every team member completes 40+ hours of training before their first assignment.',
              },
              {
                icon: CheckCircle2,
                title: 'Detailed Checklists',
                description:
                  'Custom cleaning checklists for your facility ensure nothing is missed.',
              },
              {
                icon: Shield,
                title: 'Quality Audits',
                description: 'Regular inspections and immediate corrective action on any issues.',
              },
              {
                icon: Clock,
                title: 'Consistent Schedule',
                description:
                  'Same team, same time, every visit. Build familiarity with your space.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="bg-white rounded-xl p-6 shadow-lg text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-primary-700" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Process - 4-Step Onboarding */}
      <ProcessSteps background="white" />

      {/* Who It's For */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Perfect For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🏢',
                title: 'Corporate Offices',
                desc: 'Professional environments requiring consistent, high-quality cleaning',
              },
              {
                icon: '⚕️',
                title: 'Medical Offices',
                desc: 'Healthcare settings with strict sanitation requirements',
              },
              {
                icon: '🏦',
                title: 'Financial Services',
                desc: 'Professional spaces where image matters',
              },
              {
                icon: '💼',
                title: 'Law Firms',
                desc: 'Client-facing offices requiring meticulous attention',
              },
              {
                icon: '🏛️',
                title: 'Property Management',
                desc: 'Multi-tenant buildings and common areas',
              },
              {
                icon: '🏪',
                title: 'Retail Offices',
                desc: 'Corporate headquarters and back-office spaces',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Custom Pricing Based on Your Needs
              </h2>
              <p className="text-gray-600">
                Every facility is unique. We create custom proposals based on:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                'Square footage',
                'Cleaning frequency (daily, 2-3x/week, weekly)',
                'Number of restrooms',
                'Floor types (carpet vs. hard surface)',
                'Special requirements or high-traffic areas',
                'Preferred cleaning times',
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button variant="primary" size="lg" onClick={() => (window.location.href = '/quote')}>
                Get Your Custom Quote
              </Button>
              <p className="text-sm text-gray-600 mt-4">
                We respond within 30 minutes with your personalized proposal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready for a Cleaner, Healthier Office?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Schedule a free walk-through and get your customized cleaning proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" onClick={() => (window.location.href = '/quote')}>
              Get Your Free Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Call (555) 123-4567
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <a href="/services" className="text-accent-400 hover:text-accent-300">
              ← Back to All Services
            </a>
          </div>
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
