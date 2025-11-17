/**
 * Case Studies Hub Page
 *
 * Purpose: Main landing page for all case studies
 * Displays: Grid of case study cards with key information and links
 *
 * Path: /case-studies
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { caseStudies } from '@/lib/case-studies-data'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { getIconComponent } from '@/lib/icon-map'

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* ===================================================================
          HERO SECTION
          =================================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Success Stories
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              See how we've helped businesses like yours solve their cleaning challenges and
              achieve measurable results
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-300" aria-hidden="true" />
              <span className="text-sm font-semibold">
                Real clients. Real results. Documented outcomes.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CASE STUDIES GRID
          =================================================================== */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Section Intro */}
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
                Featured Case Studies
              </h2>
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                From healthcare facilities to manufacturing plants, we deliver solutions tailored to
                your industry's unique challenges.
              </p>
            </div>

            {/* Case Study Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => {
                const IconComponent = getIconComponent(study.icon)

                return (
                  <Link
                    key={study.id}
                    href={`/case-studies/${study.slug}`}
                    className="group block bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-xl)] transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Featured Image Placeholder */}
                    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 overflow-hidden">
                      {/* Icon Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <IconComponent
                            className="h-10 w-10 text-white"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* Industry Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white dark:bg-slate-900 rounded-full shadow-md">
                        <span className="text-xs font-semibold text-[var(--color-text-primary)]">
                          {study.client.industry}
                        </span>
                      </div>

                      {/* Image placeholder instruction (hidden from users, visible in code) */}
                      {/*
                        TODO: Replace with actual image
                        <Image
                          src={study.featuredImage}
                          alt={study.title}
                          fill
                          className="object-cover"
                        />
                      */}
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      {/* Challenge Headline */}
                      <h3 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-2">
                        The Challenge
                      </h3>
                      <p className="text-lg font-bold text-[var(--color-text-primary)] mb-4 line-clamp-2">
                        {study.challenge.headline}
                      </p>

                      {/* Key Result */}
                      <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                        <div className="flex items-start gap-2">
                          <TrendingUp
                            className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          />
                          <div>
                            <div className="text-xs font-semibold text-green-700 dark:text-green-300 uppercase tracking-wide mb-1">
                              Key Result
                            </div>
                            <div className="text-sm font-bold text-green-900 dark:text-green-100">
                              {study.keyResult}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="text-sm text-[var(--color-text-secondary)] mb-4">
                        <span className="font-semibold">{study.client.name}</span>
                        <span className="mx-2">•</span>
                        <span>{study.client.location}</span>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-[var(--color-primary-base)] font-semibold group-hover:gap-3 transition-all duration-200">
                        <span>Read Full Story</span>
                        <ArrowRight
                          className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          INDUSTRIES SERVED CALLOUT
          =================================================================== */}
      <section className="py-16 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-4">
              Don't See Your Industry?
            </h2>
            <p className="text-lg text-[var(--color-text-secondary)] mb-8">
              We serve businesses across healthcare, corporate offices, manufacturing, retail,
              education, and more. Every facility has unique challenges—let's discuss yours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={() => (window.location.href = '/industries')}
              >
                View All Industries
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => (window.location.href = '/contact')}
              >
                Schedule a Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          RESULTS STATS SECTION
          =================================================================== */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-primary)] mb-12 text-center">
              Our Track Record
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-5xl font-extrabold text-[var(--color-primary-base)] mb-2">
                  100%
                </div>
                <div className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Client Satisfaction
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Every case study client renewed their contract
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[var(--color-primary-base)] mb-2">
                  40%
                </div>
                <div className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Average Improvement
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  Measurable outcomes in key performance indicators
                </div>
              </div>

              <div className="text-center">
                <div className="text-5xl font-extrabold text-[var(--color-primary-base)] mb-2">
                  &lt;3 weeks
                </div>
                <div className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
                  Implementation Time
                </div>
                <div className="text-sm text-[var(--color-text-secondary)]">
                  From consultation to full program launch
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          CTA SECTION
          =================================================================== */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-blue-700 to-indigo-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want Results Like These for Your Facility?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Every case study started with a free consultation. Let's discuss your challenges and
              create a custom solution.
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
                onClick={() => (window.location.href = 'tel:+15551234567')}
              >
                Call (555) 123-4567
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6">
              ✓ Free facility walk-through • ✓ Custom proposal • ✓ 30-minute response time
            </p>
          </div>
        </div>
      </section>

      {/* ===================================================================
          FOOTER
          =================================================================== */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
