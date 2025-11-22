import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CheckCircle2, ArrowLeft, Clock, Shield, Users, Award } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import StructuredData from '@/components/StructuredData'
import { servicesData, type ServiceData } from '@/lib/services-data'

export const revalidate = 86400

/**
 * Renders the dynamic service detail experience for each /services/[slug] route.
 * Loads metadata from the shared services data map and ensures JSON-LD is emitted.
 */
export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicesData[slug]

  if (!service) {
    notFound()
  }

  const jsonLd = createServiceJsonLd(service)
  const ServiceIcon = service.icon

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {jsonLd && <StructuredData schema={jsonLd} />}

      {/* Hero Section */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6">
          <Link
            href="/services"
            className="flex items-center text-blue-200 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Services
          </Link>

          <div className="flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/10">
              <ServiceIcon className="h-10 w-10 text-brand-bright-blue" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <h1 className="text-h1 md:text-h1 font-extrabold mb-4">{service.title}</h1>
              <p className="text-h3 text-accent-300 mb-4">{service.tagline}</p>
              <p className="text-body text-white/80 max-w-3xl">{service.heroDescription}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <Link href="/quote">
              <Button variant="accent" size="lg">
                Get Your Free Quote
              </Button>
            </Link>
            {service.availability === 'contracted' && (
              <span className="inline-block px-4 py-2 bg-yellow-500/20 border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium">
                Premium Add-on Service
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
            Why Choose Our {service.title}?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-lg p-6 shadow-sm flex items-start gap-3"
              >
                <CheckCircle2 className="h-6 w-6 text-brand-bright-blue flex-shrink-0 mt-0.5" />
                <span className="text-body text-neutral-charcoal/80 dark:text-white/80">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
            Our Process
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Here's how we deliver exceptional {service.title.toLowerCase()}
          </p>

          <div className="max-w-4xl mx-auto space-y-6">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm flex items-start gap-6"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-brand-navy text-white rounded-full text-body font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
              What's Included
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.included.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white flex items-center justify-center">
                      <Users className="h-5 w-5" />
                    </div>
                    <span className="text-body text-neutral-charcoal/80 dark:text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Highlights Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Clock,
                title: 'Flexible Scheduling',
                description:
                  'Day, night, weekend, and emergency coverage. Current clients get 24/7 dispatch with on-site arrival in 2 hours or less.',
              },
              {
                icon: Shield,
                title: 'Safety First',
                description: 'OSHA-trained teams, background checked, and supervised by field managers.',
              },
              {
                icon: Award,
                title: 'Quality Guaranteed',
                description: 'Detailed inspections and 24-hour corrective action response on every account.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm"
              >
                <div className="w-14 h-14 rounded-full bg-brand-navy/10 text-brand-navy dark:bg-white/10 dark:text-white flex items-center justify-center mb-4">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-body text-neutral-charcoal/80 dark:text-white/80">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Factors Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
            Pricing Factors
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Your custom quote considers these factors
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {service.pricing.map((factor, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md text-center"
              >
                <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-2">
                  {factor.factor}
                </h3>
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">{factor.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-neutral-off-white dark:bg-slate-800 rounded-xl p-8 md:p-12 shadow-lg">
              <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-4 text-center">
                Example Pricing
              </h3>
              <p className="text-neutral-charcoal/80 dark:text-white/80 text-center mb-6">
                While every facility is unique, here are typical price ranges to help you budget:
              </p>

              {slug === 'office-cleaning' && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-neutral-charcoal dark:text-white">
                          Small Office (2,000-5,000 sq ft)
                        </p>
                        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                          3x per week, after hours
                        </p>
                      </div>
                      <p className="text-body font-bold text-primary-600 dark:text-primary-400">
                        $800-1,500/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-neutral-charcoal dark:text-white">
                          Medium Office (5,000-15,000 sq ft)
                        </p>
                        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                          5x per week, nightly service
                        </p>
                      </div>
                      <p className="text-body font-bold text-primary-600 dark:text-primary-400">
                        $2,000-4,500/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-neutral-charcoal dark:text-white">
                          Large Office (15,000+ sq ft)
                        </p>
                        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                          Daily service, dedicated team
                        </p>
                      </div>
                      <p className="text-body font-bold text-primary-600 dark:text-primary-400">
                        $5,000+/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {slug === 'janitorial' && (
                <div className="space-y-4">
                  <p className="text-neutral-charcoal/80 dark:text-white/80 text-center mb-4">
                    Janitorial service pricing is similar to office cleaning but includes enhanced
                    quality control and dedicated account management.
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <p className="font-bold text-neutral-charcoal dark:text-white text-center">
                      Typically 10-15% premium over standard office cleaning for added services and
                      oversight
                    </p>
                  </div>
                </div>
              )}

              {(slug === 'floor-carpet-care' ||
                slug === 'window-cleaning' ||
                slug === 'post-construction') && (
                <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                  <p className="text-neutral-charcoal/80 dark:text-white/80 text-center">
                    <strong>Project-based pricing</strong> varies widely based on size and
                    condition. Contact us for a free on-site estimate.
                  </p>
                  <p className="text-sm text-neutral-charcoal/70 dark:text-white/80 text-center mt-3">
                    Most {service.title.toLowerCase()} projects range from $500-$5,000 depending on
                    facility size and scope.
                  </p>
                </div>
              )}

              {slug === 'supply-management' && (
                <div className="space-y-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-neutral-charcoal dark:text-white">
                          Small Facility (1-10 employees)
                        </p>
                        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                          Basic consumables + management
                        </p>
                      </div>
                      <p className="text-body font-bold text-primary-600 dark:text-primary-400">
                        $150-300/mo
                      </p>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-neutral-charcoal dark:text-white">
                          Medium Facility (10-50 employees)
                        </p>
                        <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                          Full consumables management
                        </p>
                      </div>
                      <p className="text-body font-bold text-primary-600 dark:text-primary-400">
                        $400-800/mo
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-600 text-center">
                <p className="text-sm text-neutral-charcoal/70 dark:text-white/80 mb-4">
                  <strong>Free On-Site Consultation:</strong> Get an exact quote tailored to your
                  facility
                </p>
                <Link href="/quote">
                  <Button variant="primary" size="lg">
                    Request Your Free Quote
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-off-white dark:bg-slate-800/50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 leading-tight font-bold text-neutral-charcoal dark:text-white mb-12 text-center">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                  <h3 className="text-body font-bold text-neutral-charcoal dark:text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-neutral-charcoal/80 dark:text-white/80 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-h2 leading-tight font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-body text-white/80 mb-8 max-w-2xl mx-auto">
            Get your free quote today and experience the Anderson Cleaning difference.
          </p>
          <Link href="/quote">
            <Button variant="accent" size="lg">
              Request Your Free Quote
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

function createServiceJsonLd(service: ServiceData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.heroDescription,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Anderson Cleaning',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '103 Wayside Avenue',
        addressLocality: 'West Springfield',
        addressRegion: 'MA',
        postalCode: '01089',
        addressCountry: 'US',
      },
      telephone: '+1-555-123-4567',
    },
    areaServed: {
      '@type': 'State',
      name: 'Massachusetts',
    },
    offers: {
      '@type': 'Offer',
      availability:
        service.availability === 'all'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/LimitedAvailability',
      priceCurrency: 'USD',
    },
  }
}
