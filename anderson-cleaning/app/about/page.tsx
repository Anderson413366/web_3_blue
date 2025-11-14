'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
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
} from 'lucide-react'

export default function AboutPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">About Anderson Cleaning</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Over 20 years of professional commercial cleaning with the personal touch your facility
            deserves.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
              Our Story
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Anderson Cleaning was founded with a simple but powerful vision: to provide
                corporate-grade commercial cleaning services with the accountability and personal
                attention of a family business.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                After years of watching businesses struggle with unreliable cleaning contractors,
                high turnover, and inconsistent quality, we knew there had to be a better way. We
                built Anderson Cleaning on three core principles:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
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
                      className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 text-center"
                    >
                      <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {principle.description}
                      </p>
                    </div>
                  )
                })}
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Today, we serve dozens of commercial facilities across Massachusetts and
                Connecticut, from small professional offices to large corporate campuses. Our
                secret? We treat every client like they're our only client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
            What Makes Us Different
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
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
                  'Real people answer the phone, day or night. We respond to all requests within 30 minutes or less.',
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
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                  <Icon className="h-12 w-12 text-accent-500 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
            Anderson Cleaning By the Numbers
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { number: '20+', label: 'Years in Business', icon: Award },
              { number: '50+', label: 'Active Clients', icon: Building2 },
              { number: '40+', label: 'Trained Staff Members', icon: Users },
              { number: '30min', label: 'Avg Response Time', icon: Clock },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                  <div className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-12 text-center">
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
                    'Something missed? Call or text us anytime. We respond within 30 minutes and fix issues the same day or within 24 hours.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md"
                >
                  <div className="flex items-center justify-center w-10 h-10 bg-primary-600 text-white rounded-full text-lg font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Green & Safety Commitments */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
              Environmentally Responsible & Safety-First
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              We believe in protecting both your facility and our planet. Our cleaning practices
              prioritize health, safety, and environmental sustainability.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-6">
                  🌿 Green Cleaning Practices
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>EPA Safer Choice Products:</strong> Where possible, we use cleaning
                      products certified by the EPA as safer for people and the environment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>HEPA Filtration:</strong> Our vacuums use HEPA filters to trap 99.97%
                      of particles, improving indoor air quality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Microfiber Technology:</strong> Microfiber cloths reduce chemical use
                      while cleaning more effectively than traditional materials
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Waste Reduction:</strong> Proper recycling protocols and concentrated
                      product use to minimize environmental impact
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-6">
                  🛡️ Safety & Security Protocols
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Background Checks:</strong> Every team member undergoes comprehensive
                      criminal background screening before employment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>Drug Testing:</strong> Pre-employment and random drug screening
                      ensures a safe, reliable workforce
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
                      <strong>OSHA Compliance:</strong> All staff trained on safety data sheets,
                      bloodborne pathogens, and hazard communication
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">
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
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Proud to Serve Our Community
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Anderson Cleaning is more than just a business—we're active members of the Western
              Massachusetts and Northern Connecticut communities we serve.
            </p>
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl mb-3">🤝</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">Local Hiring</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We employ local residents, keeping jobs and economic benefits in our community
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">💚</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Community Support
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Regular donations and support for local charities, schools, and community events
                  </p>
                </div>
                <div>
                  <div className="text-4xl mb-3">🌟</div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Local Partnerships
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We source supplies from local vendors whenever possible to support area
                    businesses
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-primary-700 to-primary-900 rounded-2xl p-8 md:p-12 text-white text-center">
              <Sparkles className="h-16 w-16 text-accent-400 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to You</h2>
              <p className="text-xl text-blue-100 mb-8">
                We promise to treat your facility like it's our own. We show up on time, do the work
                right, and fix any issues immediately. No excuses, no runarounds, just professional
                cleaning you can count on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="accent" size="lg" onClick={() => router.push('/quote')}>
                  Get Your Free Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => router.push('/services')}
                >
                  View Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Proudly Serving Massachusetts & Connecticut
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Based in West Springfield, MA, we provide commercial cleaning services throughout
              Western Massachusetts and Northern Connecticut within a 100-mile radius.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700 dark:text-gray-300">
              <div>Springfield, MA</div>
              <div>Worcester, MA</div>
              <div>Northampton, MA</div>
              <div>Hartford, CT</div>
              <div>Holyoke, MA</div>
              <div>Chicopee, MA</div>
              <div>Westfield, MA</div>
              <div>Enfield, CT</div>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
              Don't see your city? Contact us-we may serve your area!
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
