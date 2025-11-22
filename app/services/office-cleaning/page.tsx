import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import ProcessSteps from '@/components/sections/ProcessSteps'
import {
  Building,
  Building2,
  CheckCircle2,
  Clock,
  Gavel,
  Landmark,
  Shield,
  Sparkles,
  Stethoscope,
  Store,
  Users,
} from 'lucide-react'

export const revalidate = 86400

export default function OfficeCleaningPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
              <Building2 className="h-8 w-8 text-brand-bright-blue" aria-hidden="true" />
            </div>
            <h1 className="text-h1 md:text-h1 font-extrabold mb-6">
              Office & Commercial Cleaning
            </h1>
            <p className="text-body text-white/80 mb-8">
              Nightly and weekly cleaning programs that keep your workplace spotless, safe, and
              productive.
            </p>
            <Link href="/quote">
              <Button variant="accent" size="lg">
                Get Your Free Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">What's Included</h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">
              Comprehensive cleaning tailored to your office environment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-neutral-off-white rounded-xl p-8">
              <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-6 flex items-center">
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
                  <li key={i} className="flex items-start text-neutral-charcoal/80">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-neutral-off-white rounded-xl p-8">
              <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-6 flex items-center">
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
                  <li key={i} className="flex items-start text-neutral-charcoal/80">
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
      <section className="py-20 bg-neutral-off-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">
              How We Ensure Quality
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80">Corporate-grade standards for every clean</p>
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
                  <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">{item.title}</h3>
                  <p className="text-neutral-charcoal/70 dark:text-white/80 text-sm">{item.description}</p>
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
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4">Perfect For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: 'Corporate Offices',
                desc: 'Professional environments requiring consistent, high-quality cleaning',
              },
              {
                icon: Stethoscope,
                title: 'Medical Offices',
                desc: 'Healthcare settings with strict sanitation requirements',
              },
              {
                icon: Landmark,
                title: 'Financial Services',
                desc: 'Professional spaces where image matters',
              },
              {
                icon: Gavel,
                title: 'Law Firms',
                desc: 'Client-facing offices requiring meticulous attention',
              },
              {
                icon: Building,
                title: 'Property Management',
                desc: 'Multi-tenant buildings and common areas',
              },
              {
                icon: Store,
                title: 'Retail Offices',
                desc: 'Corporate headquarters and back-office spaces',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="bg-neutral-off-white rounded-lg p-6 text-center hover:shadow-lg transition-all"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-off-white text-brand-bright-blue">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-neutral-charcoal dark:text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-h2 font-bold text-neutral-charcoal dark:text-white mb-4">
                Custom Pricing Based on Your Needs
              </h2>
              <p className="text-neutral-charcoal/70 dark:text-white/80">
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
                  <span className="text-neutral-charcoal/80">{item}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/quote">
                <Button variant="primary" size="lg">
                  Get Your Custom Quote
                </Button>
              </Link>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/80 mt-4">
                We respond within 24 hours (Monday – Friday, 9 AM – 5 PM EST)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <Sparkles className="h-16 w-16 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-h2 leading-tight font-bold mb-6">
            Ready for a Cleaner, Healthier Office?
          </h2>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
            Schedule a free walk-through and get your customized cleaning proposal.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/quote">
              <Button variant="accent" size="lg">
                Get Your Free Quote
              </Button>
            </Link>
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
      <footer className="bg-brand-navy text-neutral-charcoal/40 py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-4">
            <a href="/services" className="text-accent-400 hover:text-accent-300">
              ← Back to All Services
            </a>
          </div>
          <p className="text-sm text-neutral-charcoal/60 dark:text-white/70">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
