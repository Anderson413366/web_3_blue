/**
 * Industries Hub Page
 *
 * Purpose: Overview page showing all industries served by Anderson Cleaning
 * Location: /industries
 */

import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'
import { Button } from '@/components/ui/Button'
import { industries } from '@/lib/industries-data'
import { getIconComponent } from '@/lib/icon-map'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Industries We Serve | Anderson Cleaning Services',
  description:
    'Specialized commercial cleaning services for healthcare, corporate offices, schools, retail stores, and manufacturing facilities. Expert solutions for your industry.',
}

export default function IndustriesPage() {
  const filteredIndustries = industries.filter(ind =>
    ['healthcare', 'corporate-offices', 'educational-facilities', 'retail-stores', 'manufacturing-warehouses'].includes(ind.slug)
  )

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Industries We Serve
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8">
              Specialized commercial cleaning solutions tailored to your industry's unique needs
            </p>
            <p className="text-base md:text-lg text-blue-200 max-w-3xl mx-auto">
              With decades of experience across multiple sectors, we understand that each industry
              has specific cleaning requirements, compliance standards, and operational challenges.
              Our customized approach ensures your facility receives the specialized care it deserves.
            </p>
          </div>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
              Explore Our Industry Expertise
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
              Select your industry to learn about our specialized cleaning solutions,
              compliance standards, and proven approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filteredIndustries.map((industry) => {
              const IconComponent = getIconComponent(industry.icon)

              return (
                <Link
                  key={industry.id}
                  href={`/industries/${industry.slug}`}
                  className="group"
                >
                  <div
                    className="
                      h-full
                      bg-white dark:bg-slate-900
                      rounded-[var(--border-radius-lg)]
                      shadow-[var(--shadow-card)]
                      border-2 border-gray-200 dark:border-slate-700
                      p-8
                      transition-all duration-300
                      hover:shadow-xl
                      hover:border-[var(--color-primary-base)]
                      hover:-translate-y-1
                    "
                  >
                    <div className="mb-6">
                      <div
                        className="
                          w-16 h-16
                          rounded-lg
                          bg-[var(--color-primary-light)]
                          dark:bg-[var(--color-primary-900)]
                          flex items-center justify-center
                          transition-colors
                          group-hover:bg-[var(--color-primary-base)]
                        "
                      >
                        <IconComponent
                          className="h-8 w-8 text-[var(--color-primary-base)] group-hover:text-white transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4 group-hover:text-[var(--color-primary-base)] transition-colors">
                      {industry.name}
                    </h3>

                    <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
                      {industry.shortDescription}
                    </p>

                    <div className="flex items-center gap-2 text-[var(--color-primary-base)] font-semibold group-hover:gap-3 transition-all">
                      <span>Learn More</span>
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="
              max-w-4xl mx-auto
              bg-gradient-to-br from-blue-600 to-indigo-700
              rounded-[var(--border-radius-lg)]
              shadow-2xl
              p-8 md:p-12
              text-center
            "
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Not Sure Which Category Fits Your Business?
            </h2>

            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We serve a wide range of commercial facilities beyond these categories.
              Contact us to discuss your specific cleaning needs and how we can help.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button
                  variant="accent"
                  size="lg"
                  className="min-w-[200px]"
                  aria-label="Contact us to discuss your facility cleaning needs"
                >
                  Contact Us
                </Button>
              </Link>

              <Link href="/quote">
                <Button
                  variant="outline"
                  size="lg"
                  className="min-w-[200px] bg-white text-blue-700 border-white hover:bg-blue-50 dark:bg-slate-800 dark:text-white dark:border-slate-600"
                  aria-label="Get a free quote for your facility"
                >
                  Get Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
