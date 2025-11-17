/**
 * CaseStudyTemplate Component
 *
 * Purpose: Reusable template for all case study detail pages
 * Layout: Problem → Solution → Results format
 *
 * Sections:
 * 1. Hero - Title, client info, industry badge, featured image
 * 2. Overview - Client background and facility details
 * 3. Challenge - The problem (headline + description + pain points)
 * 4. Solution - What we implemented
 * 5. Results - Metrics and outcomes with client quote
 * 6. Services Used - List with links to service pages
 * 7. CTA - Call to action for similar results
 *
 * Features:
 * - Professional, scannable layout
 * - Large readable metrics
 * - Print-friendly formatting
 * - Full WCAG 2.1 AA accessibility
 * - Design system integration
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  ArrowLeft,
  MapPin,
  Users,
  Square,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  CheckCircle2,
  Quote,
  Building2,
  Clock,
} from 'lucide-react'
import { CaseStudy } from '@/lib/case-studies-data'
import { getIconComponent } from '@/lib/icon-map'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface CaseStudyTemplateProps {
  /**
   * Complete case study data object
   */
  caseStudy: CaseStudy

  /**
   * Show print button
   * @default true
   */
  showPrintButton?: boolean

  /**
   * Show CTA section at bottom
   * @default true
   */
  showCTA?: boolean
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function CaseStudyTemplate({
  caseStudy,
  showPrintButton = true,
  showCTA = true,
}: CaseStudyTemplateProps) {
  // Get icon component from string name
  const IconComponent = getIconComponent(caseStudy.icon)

  // Format date for display
  const formattedDate = new Date(caseStudy.publishedDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* =====================================================================
          HERO SECTION
          ===================================================================== */}
      <section className="relative bg-gradient-to-br from-blue-700 to-indigo-900 text-white py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link
              href="/case-studies"
              className="
                inline-flex items-center gap-2
                text-blue-100 hover:text-white
                transition-colors duration-200
                mb-8
                group
              "
            >
              <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Back to Case Studies</span>
            </Link>

            {/* Industry Badge & Icon */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <IconComponent className="h-8 w-8 text-white" aria-hidden="true" />
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <span className="text-sm font-semibold">{caseStudy.client.industry}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
              {caseStudy.title}
            </h1>

            {/* Key Result */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 backdrop-blur-sm rounded-lg border border-green-400/30 mb-6">
              <TrendingUp className="h-5 w-5 text-green-300" aria-hidden="true" />
              <span className="text-lg font-semibold text-green-100">{caseStudy.keyResult}</span>
            </div>

            {/* Published Date */}
            <p className="text-blue-100 text-sm mb-8">Published {formattedDate}</p>

            {/* Print Button */}
            {showPrintButton && (
              <button
                onClick={() => window.print()}
                className="
                  px-4 py-2
                  bg-white/10 hover:bg-white/20
                  backdrop-blur-sm
                  rounded-lg
                  text-sm font-medium
                  transition-colors duration-200
                  print:hidden
                "
              >
                Print Case Study
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          OVERVIEW SECTION
          ===================================================================== */}
      <section className="py-12 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-6">
              Client Overview
            </h2>

            {/* Client Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Client Name */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-2">
                  <Building2
                    className="h-5 w-5 text-[var(--color-primary-base)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                    Client
                  </h3>
                </div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {caseStudy.client.name}
                </p>
              </div>

              {/* Location */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin
                    className="h-5 w-5 text-[var(--color-primary-base)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                    Location
                  </h3>
                </div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {caseStudy.client.location}
                </p>
              </div>

              {/* Facility Size */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-2">
                  <Square
                    className="h-5 w-5 text-[var(--color-primary-base)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                    Facility Size
                  </h3>
                </div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {caseStudy.client.facilitySize}
                </p>
              </div>

              {/* Employees */}
              <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-2">
                  <Users
                    className="h-5 w-5 text-[var(--color-primary-base)]"
                    aria-hidden="true"
                  />
                  <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide">
                    Employees
                  </h3>
                </div>
                <p className="text-lg font-bold text-[var(--color-text-primary)]">
                  {caseStudy.client.employees}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CHALLENGE SECTION
          ===================================================================== */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
                <AlertTriangle
                  className="h-6 w-6 text-orange-600 dark:text-orange-400"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                The Challenge
              </h2>
            </div>

            {/* Challenge Headline */}
            <div className="mb-6 p-6 bg-orange-50 dark:bg-orange-900/10 border-l-4 border-orange-500 rounded-r-lg">
              <p className="text-xl font-semibold text-[var(--color-text-primary)]">
                {caseStudy.challenge.headline}
              </p>
            </div>

            {/* Challenge Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {caseStudy.challenge.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[var(--color-text-secondary)] leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Pain Points */}
            <div className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 md:p-8">
              <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                Key Pain Points
              </h3>
              <ul className="space-y-3">
                {caseStudy.challenge.painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <AlertTriangle
                      className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="text-[var(--color-text-secondary)]">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SOLUTION SECTION
          ===================================================================== */}
      <section className="py-16 md:py-20 bg-blue-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                <Lightbulb
                  className="h-6 w-6 text-blue-600 dark:text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                Our Solution
              </h2>
            </div>

            {/* Solution Description */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-8">
              {caseStudy.solution.description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[var(--color-text-secondary)] leading-relaxed mb-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Services Used & Timeline Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Services Used */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                  Services Implemented
                </h3>
                <ul className="space-y-3">
                  {caseStudy.solution.servicesUsed.map((service, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-[var(--color-text-secondary)]">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Timeline */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">
                  Timeline
                </h3>
                <div className="flex items-center gap-3 mb-2">
                  <Clock
                    className="h-6 w-6 text-[var(--color-primary-base)]"
                    aria-hidden="true"
                  />
                  <span className="text-2xl font-bold text-[var(--color-primary-base)]">
                    {caseStudy.solution.timeline.split(' ')[0]}
                  </span>
                </div>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  {caseStudy.solution.timeline}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RESULTS SECTION
          ===================================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="flex items-center gap-4 mb-12 justify-center">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <TrendingUp
                  className="h-6 w-6 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)]">
                The Results
              </h2>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {caseStudy.results.metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-900 rounded-xl p-6 shadow-[var(--shadow-lg)] text-center"
                >
                  <div className="text-4xl md:text-5xl font-extrabold text-[var(--color-primary-base)] mb-2">
                    {metric.value}
                  </div>
                  <div className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                    {metric.label}
                  </div>
                  {metric.description && (
                    <div className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {metric.description}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Client Quote */}
            {caseStudy.results.quote && (
              <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-2xl p-8 md:p-12 shadow-[var(--shadow-xl)] relative">
                <Quote
                  className="h-12 w-12 text-[var(--color-primary-light)] opacity-20 absolute top-6 left-6"
                  aria-hidden="true"
                />
                <blockquote className="relative z-10">
                  <p className="text-xl md:text-2xl text-[var(--color-text-primary)] leading-relaxed mb-6 italic">
                    "{caseStudy.results.quote.text}"
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="w-1 h-16 bg-[var(--color-primary-base)] rounded-full"></div>
                    <div>
                      <div className="font-bold text-lg text-[var(--color-text-primary)]">
                        {caseStudy.results.quote.author}
                      </div>
                      <div className="text-[var(--color-text-secondary)]">
                        {caseStudy.results.quote.role}
                        {caseStudy.results.quote.company && (
                          <>, {caseStudy.results.quote.company}</>
                        )}
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            )}

            {/* Additional Outcomes */}
            {caseStudy.results.additionalOutcomes &&
              caseStudy.results.additionalOutcomes.length > 0 && (
                <div className="max-w-4xl mx-auto mt-12">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6 text-center">
                    Additional Outcomes
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {caseStudy.results.additionalOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2
                          className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="text-[var(--color-text-secondary)]">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          CTA SECTION
          ===================================================================== */}
      {showCTA && (
        <section className="py-16 md:py-20 bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready for Similar Results?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Let's discuss how Anderson Cleaning can solve your facility's challenges and deliver
                measurable results.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => (window.location.href = '/quote')}
                >
                  Get Your Free Quote
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => (window.location.href = '/contact')}
                >
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
