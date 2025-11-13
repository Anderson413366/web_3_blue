import { Metadata } from 'next'
import { Building2, Sparkles, Users, CheckCircle2, Shield } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'Commercial Cleaning Services | Anderson Cleaning',
  description: 'Comprehensive commercial cleaning solutions for offices, medical facilities, education, manufacturing, and more. B2B only.',
}

export default function ServicesPage() {
  const services = [
    {
      title: 'Office & Commercial Cleaning',
      slug: 'office-cleaning',
      icon: '🏢',
      description: 'Nightly/weekly programs that keep your workplace spotless and safe.',
      features: ['Daily/weekly cleaning', 'Restroom sanitation', 'Common area maintenance', 'Trash removal'],
      available: 'all',
    },
    {
      title: 'Janitorial Services',
      slug: 'janitorial',
      icon: '🧹',
      description: 'Reliable, consistent, and accountable facility care.',
      features: ['Comprehensive facility care', 'Quality inspections', 'Dedicated teams', 'Custom SOPs'],
      available: 'all',
    },
    {
      title: 'Floor & Carpet Care',
      slug: 'floor-carpet-care',
      icon: '✨',
      description: 'Extend the life and look of your floors.',
      features: ['Strip & wax', 'Carpet cleaning', 'Floor buffing', 'Stain removal'],
      available: 'contracted',
    },
    {
      title: 'Window Cleaning',
      slug: 'window-cleaning',
      icon: '🪟',
      description: 'Streak-free shine for a great first impression.',
      features: ['Interior/exterior', 'High-rise capable', 'Streak-free results', 'Safety certified'],
      available: 'contracted',
    },
    {
      title: 'Post-Construction Cleanup',
      slug: 'post-construction',
      icon: '🏗️',
      description: 'Turnover-ready spaces after construction or renovation.',
      features: ['Debris removal', 'Deep cleaning', 'Final polish', 'Move-in ready'],
      available: 'contracted',
    },
    {
      title: 'Supply Management',
      slug: 'supply-management',
      icon: '📦',
      description: 'Never run out again. We manage consumables for active clients.',
      features: ['Inventory tracking', 'Auto-replenishment', 'Cost savings', 'One invoice'],
      available: 'contracted',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-700 rounded-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anderson Cleaning</h1>
                <p className="text-xs text-gray-600">Our Services</p>
              </div>
            </a>
            <div className="hidden md:flex items-center space-x-6">
              <a href="/" className="text-gray-700 hover:text-primary-700 font-medium">Home</a>
              <a href="/quote" className="text-gray-700 hover:text-primary-700 font-medium">Get Quote</a>
              <Button variant="primary" size="sm" onClick={() => window.location.href='/quote'}>
                Get a Quote
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Comprehensive Commercial Cleaning Solutions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            We build programs around your facility's realities—foot traffic, risk points, schedules, and compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" onClick={() => window.location.href='/quote'}>
              Request a Quote
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Schedule Walk-Through
            </Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                <div className="p-8">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  {service.available === 'contracted' && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-semibold rounded-full mb-3">
                      Contracted Clients Only
                    </span>
                  )}
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 group-hover:underline"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Quality Assurance Process
            </h2>
            <p className="text-xl text-gray-600">
              Every service includes our corporate-grade quality standards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, title: 'Trained Staff', desc: '40+ hours training minimum' },
              { icon: CheckCircle2, title: 'Quality Checklists', desc: 'Every service documented' },
              { icon: Shield, title: 'Regular Audits', desc: 'Ongoing inspections' },
              { icon: Sparkles, title: 'Corrective Action', desc: 'Immediate issue resolution' },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div key={i} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: 'Are you insured and bonded?',
                a: 'Yes, we carry comprehensive general liability and workers\' compensation insurance. All staff undergo background checks.',
              },
              {
                q: 'Do you provide cleaning supplies and equipment?',
                a: 'Yes, all cleaning supplies and equipment are included. We can also manage your facility\'s consumables (paper products, soap, etc.) through our Supply Management service.',
              },
              {
                q: 'How do you ensure quality?',
                a: 'We use detailed checklists, conduct regular quality audits, and provide corrective action within 24 hours if any issues arise.',
              },
              {
                q: 'What is your onboarding process?',
                a: 'We start with a comprehensive facility walk-through, create custom SOPs for your space, train our team, and begin with supervised cleaning for the first week.',
              },
              {
                q: 'Can I get project/specialty work without a regular contract?',
                a: 'No—project work (floor care, windows, post-construction) is available only to clients with active cleaning contracts. This ensures we can properly schedule and resource these specialized services.',
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Anderson Difference?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free quote today and discover why businesses trust us with their facilities.
          </p>
          <Button variant="accent" size="lg" onClick={() => window.location.href='/quote'}>
            Get Your Free Quote
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved. | B2B Only • No restaurants or 7-day/week cleaning
          </p>
        </div>
      </footer>
    </div>
  )
}
