/**
 * Industries Hub Page
 *
 * Purpose: Overview page showing all industries served by Anderson Cleaning
 * Location: /industries
 */

import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { industries } from '@/lib/industries-data'
import { getIconComponent } from '@/lib/icon-map'

export const metadata: Metadata = {
  title: 'Industries We Serve | Anderson Cleaning Services',
  description:
    'Specialized commercial cleaning services for healthcare, corporate offices, schools, retail stores, and manufacturing facilities. Expert solutions for your industry.',
}

export const revalidate = 86400

export default function IndustriesPage() {
  const filteredIndustries = industries.filter(ind =>
    ['healthcare', 'corporate-offices', 'educational-facilities', 'retail-stores', 'manufacturing-warehouses'].includes(ind.slug)
  )

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-deep-blue via-brand-navy to-brand-bright-blue text-white pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
              Industries We Serve
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Specialized cleaning solutions tailored to your industry's unique standards and compliance requirements
            </p>
          </div>
        </div>
      </section>

      {/* Industry Cards Grid */}
      <section className="py-16 md:py-20 bg-neutral-off-white dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-h2 leading-tight font-bold text-[var(--color-text-primary)] mb-4">
              Explore Our Industry Expertise
            </h2>
            <p className="text-body text-[var(--color-text-secondary)] max-w-3xl mx-auto">
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
                  className="group h-full"
                >
                  <div className="h-full flex flex-col bg-white dark:bg-slate-900 rounded-xl shadow-sm border-2 border-neutral-light-grey dark:border-slate-700 p-8 transition-all duration-300 hover:shadow-xl hover:border-brand-bright-blue hover:-translate-y-1">
                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-xl bg-brand-bright-blue/10 dark:bg-brand-bright-blue/20 flex items-center justify-center transition-colors group-hover:bg-brand-bright-blue">
                        <IconComponent
                          className="h-8 w-8 text-brand-bright-blue group-hover:text-white transition-colors"
                          aria-hidden="true"
                        />
                      </div>
                    </div>

                    <h3 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-4 group-hover:text-brand-bright-blue dark:group-hover:text-brand-bright-blue transition-colors">
                      {industry.name}
                    </h3>

                    <p className="text-body text-neutral-charcoal/80 dark:text-white/80 mb-6 leading-relaxed flex-1">
                      {industry.shortDescription}
                    </p>

                    <div className="flex items-center gap-2 text-brand-bright-blue font-semibold group-hover:gap-3 transition-all mt-auto">
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
              bg-brand-navy
              rounded-[var(--border-radius-lg)]
              shadow-2xl
              p-8 md:p-12
              text-center
            "
          >
            <h2 className="text-h2 leading-tight font-bold text-white mb-4">
              Not Sure Which Category Fits Your Business?
            </h2>

            <p className="text-body md:text-body text-white/80 max-w-2xl mx-auto">
              We serve a wide range of commercial facilities beyond these categories.
              Contact us to discuss your specific cleaning needs and how we can help.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
