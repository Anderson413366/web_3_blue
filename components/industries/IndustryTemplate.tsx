/**
 * IndustryTemplate
 *
 * Purpose: Reusable template for individual industry detail pages
 * Location: Used in /industries/[slug] pages
 *
 * Features:
 * - Hero section with industry-specific title and subtitle
 * - Overview paragraphs explaining industry needs
 * - Challenges section with card layout
 * - Solutions section with numbered cards
 * - Standards & compliance badges
 * - Testimonials from industry clients
 * - CTA section with quote form or button
 *
 * Accessibility:
 * - Proper heading hierarchy (h1 → h2 → h3)
 * - Semantic HTML structure
 * - ARIA labels on interactive elements
 * - Color contrast compliance
 * - Keyboard navigation support
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Industry } from '@/lib/industries-data'
import { getIconComponent } from '@/lib/icon-map'
import {
  CheckCircle2,
  ArrowLeft,
  AlertTriangle,
  Award,
  Shield,
  Users,
} from 'lucide-react'
import QuoteFormInline from '@/components/forms/QuoteFormInline'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface IndustryTemplateProps {
  industry: Industry
  showQuoteForm?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function IndustryTemplate({
  industry,
  showQuoteForm = false,
}: IndustryTemplateProps) {
  const IconComponent = getIconComponent(industry.icon)

  return (
    <div className="min-h-screen">
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Button */}
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to All Industries</span>
          </Link>

          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-start gap-8 max-w-5xl">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <IconComponent className="h-12 w-12 md:h-14 md:w-14 text-white" aria-hidden="true" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4">
                {industry.hero.title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-blue-100 mb-8">
                {industry.hero.subtitle}
              </p>

              {/* CTA Button */}
              <Link href="/quote">
                <Button variant="accent" size="lg">
                  Get Your Free Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          OVERVIEW SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6 text-lg text-[var(--color-text-secondary)] leading-relaxed">
              {industry.overview.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CHALLENGES SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                Common {industry.name} Cleaning Challenges
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                Every industry has unique cleaning requirements. Here are the specific
                challenges we address in {industry.name.toLowerCase()}.
              </p>
            </div>

            {/* Challenges Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.challenges.map((challenge, index) => (
                <div
                  key={index}
                  className="
                    bg-white dark:bg-slate-900
                    rounded-[var(--border-radius-lg)]
                    shadow-[var(--shadow-card)]
                    p-6
                    border border-gray-200 dark:border-slate-700
                  "
                >
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                      <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Challenge Text */}
                  <p className="text-base font-semibold text-[var(--color-text-primary)]">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                How We Serve {industry.name}
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                Our specialized approach combines industry expertise with proven cleaning
                protocols to deliver exceptional results.
              </p>
            </div>

            {/* Solutions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.solutions.map((solution, index) => (
                <div
                  key={index}
                  className="
                    bg-gradient-to-br from-blue-50 to-green-50
                    dark:from-slate-800 dark:to-slate-700
                    rounded-[var(--border-radius-lg)]
                    shadow-[var(--shadow-card)]
                    p-8
                    border border-gray-200 dark:border-slate-600
                  "
                >
                  {/* Number Badge */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[var(--color-primary-base)] text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)]">
                      {solution.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          STANDARDS & COMPLIANCE SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                Standards & Compliance
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                We maintain the highest standards and certifications required for your industry.
              </p>
            </div>

            {/* Compliance Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {industry.compliance.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white dark:bg-slate-900
                    rounded-[var(--border-radius-lg)]
                    shadow-[var(--shadow-card)]
                    p-6
                    flex flex-col items-center justify-center
                    text-center
                    border border-gray-200 dark:border-slate-700
                  "
                >
                  {/* Icon */}
                  <div className="mb-3">
                    {index % 3 === 0 ? (
                      <Shield className="h-8 w-8 text-[var(--color-success-base)]" aria-hidden="true" />
                    ) : index % 3 === 1 ? (
                      <Award className="h-8 w-8 text-[var(--color-primary-base)]" aria-hidden="true" />
                    ) : (
                      <Users className="h-8 w-8 text-[var(--color-accent-base)]" aria-hidden="true" />
                    )}
                  </div>

                  {/* Badge Text */}
                  <p className="text-sm font-semibold text-[var(--color-text-primary)] leading-tight">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                What Our {industry.name} Clients Say
              </h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {industry.testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="
                    bg-gradient-to-br from-gray-50 to-blue-50
                    dark:from-slate-800 dark:to-slate-700
                    rounded-[var(--border-radius-lg)]
                    shadow-[var(--shadow-card)]
                    p-8
                    border border-gray-200 dark:border-slate-600
                  "
                >
                  {/* Quote */}
                  <div className="mb-6">
                    <p className="text-lg text-[var(--color-text-primary)] leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </div>

                  {/* Author */}
                  <div className="border-t border-gray-300 dark:border-slate-600 pt-4">
                    <p className="font-bold text-[var(--color-text-primary)]">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      {testimonial.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-tertiary)]">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION
          ================================================================ */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-indigo-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {showQuoteForm ? (
              /* Option 1: Quote Form */
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: CTA Text */}
                <div className="text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Discuss Your {industry.name}?
                  </h2>
                  <p className="text-lg md:text-xl text-blue-100 mb-6">
                    Get a customized cleaning program designed specifically for your facility's
                    unique requirements.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span>Free, no-obligation quote</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span>Response within 30 minutes</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-green-300 flex-shrink-0 mt-0.5" />
                      <span>Industry-specific solutions</span>
                    </li>
                  </ul>
                </div>

                {/* Right: Quote Form */}
                <div>
                  <QuoteFormInline />
                </div>
              </div>
            ) : (
              /* Option 2: CTA Button */
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Discuss Your {industry.name}?
                </h2>
                <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                  Get a customized cleaning program designed specifically for your facility's
                  unique requirements and compliance standards.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/quote">
                    <Button variant="accent" size="lg" className="min-w-[200px]">
                      Get Free Quote
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="min-w-[200px] bg-white text-blue-700 border-white hover:bg-blue-50"
                    >
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * import { getIndustryBySlug } from '@/lib/industries-data'
 * import IndustryTemplate from '@/components/industries/IndustryTemplate'
 *
 * const industry = getIndustryBySlug('healthcare')
 *
 * if (!industry) {
 *   return <div>Industry not found</div>
 * }
 *
 * <IndustryTemplate industry={industry} />
 *
 * // With quote form
 * <IndustryTemplate industry={industry} showQuoteForm={true} />
 * ```
 */
