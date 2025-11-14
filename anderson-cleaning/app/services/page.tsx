'use client'

import {
  Sparkles,
  Users,
  CheckCircle2,
  Shield,
  ClipboardList,
  FileCheck,
  UserCheck,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ServicesPage() {
  // JSON-LD Structured Data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Commercial Cleaning Services',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Anderson Cleaning',
      image: 'https://andersoncleaning.com/logo.png',
      '@id': 'https://andersoncleaning.com',
      url: 'https://andersoncleaning.com',
      telephone: '+1-413-306-5053',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '103 Wayside Avenue',
        addressLocality: 'West Springfield',
        addressRegion: 'MA',
        postalCode: '01089',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 42.107,
        longitude: -72.6209,
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'Springfield',
          containedIn: { '@type': 'State', name: 'Massachusetts' },
        },
        {
          '@type': 'City',
          name: 'Worcester',
          containedIn: { '@type': 'State', name: 'Massachusetts' },
        },
        {
          '@type': 'City',
          name: 'Hartford',
          containedIn: { '@type': 'State', name: 'Connecticut' },
        },
      ],
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Commercial Cleaning Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Office & Commercial Cleaning',
            description:
              'Daily and weekly cleaning programs for office buildings and commercial facilities',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Janitorial Services',
            description: 'Comprehensive facility care with dedicated teams and quality control',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Floor & Carpet Care',
            description: 'Professional floor maintenance including strip, wax, and carpet cleaning',
          },
        },
      ],
    },
  }

  const services = [
    {
      title: 'Office & Commercial Cleaning',
      slug: 'office-cleaning',
      icon: '🏢',
      description: 'Nightly/weekly programs that keep your workplace spotless and safe.',
      features: [
        'Daily/weekly cleaning',
        'Restroom sanitation',
        'Common area maintenance',
        'Trash removal',
      ],
      available: 'all',
    },
    {
      title: 'Janitorial Services',
      slug: 'janitorial',
      icon: '🧹',
      description: 'Reliable, consistent, and accountable facility care.',
      features: [
        'Comprehensive facility care',
        'Quality inspections',
        'Dedicated teams',
        'Custom SOPs',
      ],
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
      features: [
        'Interior/exterior',
        'High-rise capable',
        'Streak-free results',
        'Safety certified',
      ],
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
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
            Comprehensive Commercial Cleaning Solutions
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            We build programs around your facility's realities—foot traffic, risk points, schedules,
            and compliance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="accent" size="lg" onClick={() => (window.location.href = '/quote')}>
              Request a Quote
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white/10"
            >
              Schedule Walk-Through
            </Button>
          </div>
        </div>
      </section>

      {/* Onboarding Process */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How We Get Started
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              From first contact to consistent quality—here's our onboarding process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: ClipboardList,
                step: '1',
                title: 'Facility Walk-Through',
                description:
                  'We tour your space to understand layout, traffic patterns, and special requirements. Free consultation, no obligation.',
              },
              {
                icon: FileCheck,
                step: '2',
                title: 'Custom SOPs',
                description:
                  'We create detailed Standard Operating Procedures specific to your facility—no cookie-cutter checklists.',
              },
              {
                icon: UserCheck,
                step: '3',
                title: 'Team Training',
                description:
                  'Our staff receives 40+ hours of training plus facility-specific instruction before they ever clean your space.',
              },
              {
                icon: TrendingUp,
                step: '4',
                title: 'Supervised Start',
                description:
                  'First week includes extra oversight and quality checks to ensure we meet your standards from day one.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="relative bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 shadow-md text-center"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                    {item.step}
                  </div>
                  <Icon className="h-12 w-12 text-primary-600 dark:text-primary-400 mx-auto mb-4 mt-4" />
                  <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              <strong>Timeline:</strong> Most clients are fully onboarded within 7-10 business days
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className="p-8">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                    {service.title}
                  </h3>
                  {service.available === 'contracted' && (
                    <span className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs font-semibold rounded-full mb-3">
                      Contracted Clients Only
                    </span>
                  )}
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary-700 dark:text-primary-400 font-semibold hover:text-primary-800 dark:hover:text-primary-300 group-hover:underline"
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
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'Are you insured and bonded?',
                items: [
                  'Comprehensive general liability insurance ✓',
                  "Workers' compensation insurance ✓",
                  'All staff undergo background checks ✓',
                ],
              },
              {
                q: 'Do you provide cleaning supplies and equipment?',
                items: [
                  'All cleaning supplies included',
                  'Professional equipment provided',
                  'Optional: Supply Management service for consumables (paper, soap, etc.)',
                ],
              },
              {
                q: 'How do you ensure quality?',
                items: [
                  'Detailed checklists for every service',
                  'Regular quality audits',
                  'Corrective action within 24 hours',
                ],
              },
              {
                q: 'What is your onboarding process?',
                items: [
                  '1. Comprehensive facility walk-through',
                  '2. Create custom SOPs for your space',
                  '3. Train our team on your requirements',
                  '4. Supervised cleaning for the first week',
                ],
              },
              {
                q: 'Can I get project/specialty work without a regular contract?',
                items: [
                  'No—project work requires an active cleaning contract',
                  'Includes: floor care, windows, post-construction',
                  'Why: Ensures proper scheduling & resource allocation',
                ],
              },
            ].map((faq, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.q}</h3>
                <ul className="space-y-2">
                  {faq.items.map((item, j) => (
                    <li key={j} className="flex items-start text-gray-700">
                      <span className="text-accent-500 mr-2 mt-1 flex-shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Anderson Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your free quote today and discover why businesses trust us with their facilities.
          </p>
          <Button variant="accent" size="lg" onClick={() => (window.location.href = '/quote')}>
            Get Your Free Quote
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
