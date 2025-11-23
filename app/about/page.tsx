
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import StatsBar from '@/components/sections/StatsBar'
import {
  Users,
  Heart,
  Shield,
  Award,
  Clock,
  Target,
  CheckCircle2,
  TrendingUp,
  Building2,
  Sparkles,
  Leaf,
  Handshake,
  Star,
} from 'lucide-react'

export const revalidate = 86400

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep-blue via-brand-navy to-brand-bright-blue text-white py-20 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">About Anderson Cleaning</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            18 years of excellence delivering professional commercial cleaning with the personal touch
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6 text-center">
              Our Story
            </h2>
            <div className="space-y-6 text-body leading-relaxed text-neutral-charcoal/80 dark:text-white/80 text-center md:text-left">
              <p>
                Anderson Cleaning was founded with a simple but powerful vision: to provide
                corporate-grade commercial cleaning services with the accountability and personal
                attention of a family business.
              </p>
              <p>
                After years of watching businesses struggle with unreliable cleaning contractors,
                high turnover, and inconsistent quality, we knew there had to be a better way. We
                built Anderson Cleaning on three core principles:
              </p>
            </div>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Users,
                  title: 'Invest in People',
                  description: 'Full-time salaried employees, not contractors',
                },
                {
                  icon: Target,
                  title: 'Systems & Standards',
                  description: 'Corporate-grade processes and quality control',
                },
                {
                  icon: Heart,
                  title: 'Personal Touch',
                  description: '24/7 support with real accountability',
                },
              ].map((principle, index) => {
                const Icon = principle.icon
                return (
                  <div
                    key={index}
                    className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 text-center"
                  >
                    <Icon className="h-12 w-12 text-brand-navy dark:text-brand-bright-blue mx-auto mb-4" />
                    <h3 className="font-bold text-neutral-charcoal dark:text-white mb-2">
                      {principle.title}
                    </h3>
                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80">
                      {principle.description}
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="text-body leading-relaxed text-neutral-charcoal/80 dark:text-white/80 mt-10 text-center md:text-left">
              Today, we serve dozens of commercial facilities across Massachusetts and Connecticut,
              from small professional offices to large corporate campuses. Our secret? We treat
              every client like they're our only client.
            </p>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
            What Makes Us Different
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-2xl mx-auto">
            We're not the biggest cleaning company, but we might be the most committed to your
            success
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Users,
                title: 'Full-Time Salaried Staff',
                description:
                  'No independent contractors. Our cleaners are W-2 employees with benefits, training, and accountability.',
              },
              {
                icon: Clock,
                title: '24/7 Support',
                description:
                  'Real people answer the phone, day or night. Current clients receive emergency support with on-site arrival in 2 hours or less.',
              },
              {
                icon: Shield,
                title: 'Fully Insured & Bonded',
                description:
                  "Comprehensive general liability and workers' comp insurance. All staff undergo background checks.",
              },
              {
                icon: CheckCircle2,
                title: 'Quality Assurance',
                description:
                  'Regular inspections, detailed checklists, and corrective action plans ensure consistent quality.',
              },
              {
                icon: Award,
                title: 'Industry-Specific Training',
                description:
                  'Teams trained on OSHA standards, industry protocols, and facility-specific procedures.',
              },
              {
                icon: Heart,
                title: 'We Actually Care',
                description:
                  'Your account manager knows your name, your facility, and your concerns. No call centers.',
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
                >
                  <Icon className="h-12 w-12 text-brand-bright-blue mb-4" />
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* By the Numbers - Animated Stats Bar */}
      <StatsBar background="gray" />

      {/* Our Approach */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
              Our Approach
            </h2>

            <div className="space-y-8">
              {[
                {
                  title: 'Listen First',
                  description:
                    'We start every relationship with a comprehensive facility walk-through. We do not just look at square footage - we understand your foot traffic, risk points, and priorities.',
                },
                {
                  title: 'Create Custom SOPs',
                  description:
                    'Every facility gets customized Standard Operating Procedures. No cookie-cutter checklists - we document exactly what needs to be done, when, and how.',
                },
                {
                  title: 'Train Our Teams',
                  description:
                    'Before we ever clean your facility, our staff receives 40+ hours of training on equipment, chemicals, safety, and your specific procedures.',
                },
                {
                  title: 'Monitor Quality',
                  description:
                    'Regular inspections, detailed documentation, and immediate corrective action ensure you get consistent quality every single time.',
                },
                {
                  title: 'Stay Responsive',
                  description:
                    'Something missed? Call or text us anytime. We respond within 24 hours during office hours and provide 24/7 emergency support for current clients with on-site arrival in 2 hours or less.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-brand-navy text-white rounded-full text-body font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Green & Safety Commitments */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
              Environmentally Responsible & Safety-First
            </h2>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-3xl mx-auto">
              We believe in protecting both your facility and our planet. Our cleaning practices
              prioritize health, safety, and environmental sustainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Leaf className="h-6 w-6 text-brand-bright-blue" />
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    Green Cleaning Practices
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>EPA Safer Choice Products:</strong> Where possible, we use cleaning
                      products certified by the EPA as safer for people and the environment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>HEPA Filtration:</strong> Our vacuums use HEPA filters to trap 99.97%
                      of particles, improving indoor air quality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Microfiber Technology:</strong> Microfiber cloths reduce chemical use
                      while cleaning more effectively than traditional materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Waste Reduction:</strong> Proper recycling protocols and concentrated
                      product use to minimize environmental impact
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-neutral-off-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="h-6 w-6 text-brand-navy dark:text-brand-bright-blue" />
                  <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white">
                    Safety & Security Protocols
                  </h3>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-navy dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Background Checks:</strong> Every team member undergoes comprehensive
                      criminal background screening before employment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-navy dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Drug Testing:</strong> Pre-employment and random drug screening
                      ensures a safe, reliable workforce
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-navy dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>OSHA Compliance:</strong> All staff trained on safety data sheets,
                      bloodborne pathogens, and hazard communication
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-navy dark:text-brand-bright-blue flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-charcoal/80 dark:text-white/80">
                      <strong>Industry Certifications:</strong> Specialized training for medical
                      facilities (HIPAA awareness), schools (child safety), and more
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Involvement */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6">
              Proud to Serve Our Community
            </h2>
            <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-8">
              Anderson Cleaning is more than just a business—we're active members of the Western
              Massachusetts and Northern Connecticut communities we serve.
            </p>
            <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Handshake,
                    title: 'Local Hiring',
                    description: 'We employ local residents to keep jobs and economic benefits in our community.',
                  },
                  {
                    icon: Heart,
                    title: 'Community Support',
                    description: 'Regular donations and volunteer work for local charities, schools, and events.',
                  },
                  {
                    icon: Star,
                    title: 'Local Partnerships',
                    description: 'We source supplies from area vendors whenever possible to reinvest locally.',
                  },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="text-center">
                      <div className="mx-auto mb-3 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white">
                        <Icon className="h-7 w-7" aria-hidden="true" />
                      </div>
                      <h3 className="font-bold text-neutral-charcoal dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-body-sm text-neutral-charcoal/70 dark:text-white/80">
                        {item.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-navy rounded-2xl p-8 md:p-12 text-white text-center">
              <Sparkles className="h-16 w-16 text-brand-bright-blue mx-auto mb-6" />
              <h2 className="text-h2 leading-tight font-bold mb-6">Our Commitment to You</h2>
              <p className="text-body text-white/80">
                We promise to treat your facility like it's our own. We show up on time, do the work
                right, and fix any issues immediately. No excuses, no runarounds, just professional
                cleaning you can count on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-6">
              Proudly Serving Massachusetts & Connecticut
            </h2>
            <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8">
              Based in West Springfield, MA, we provide commercial cleaning services throughout
              Western Massachusetts and Northern Connecticut within a 100-mile radius.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-neutral-charcoal/80 dark:text-white/80">
              <div>Springfield, MA</div>
              <div>Worcester, MA</div>
              <div>Northampton, MA</div>
              <div>Hartford, CT</div>
              <div>Holyoke, MA</div>
              <div>Chicopee, MA</div>
              <div>Westfield, MA</div>
              <div>Enfield, CT</div>
            </div>
            <p className="text-sm text-neutral-charcoal/60 dark:text-white/70 mt-8">
              Don't see your city? Contact us-we may serve your area!
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
