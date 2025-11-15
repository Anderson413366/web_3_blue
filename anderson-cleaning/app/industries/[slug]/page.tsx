/**
 * Industry Detail Page - Dynamic Route
 *
 * Purpose: Individual industry detail pages
 * Route: /industries/[slug]
 *
 * Generates static pages for all industries at build time.
 */

import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import IndustryTemplate from '@/components/industries/IndustryTemplate'
import { getIndustryBySlug, getAllIndustrySlugs } from '@/lib/industries-data'

// ============================================================================
// STATIC PATH GENERATION
// ============================================================================

export async function generateStaticParams() {
  const slugs = getAllIndustrySlugs()

  return slugs.map((slug) => ({
    slug,
  }))
}

// ============================================================================
// METADATA GENERATION
// ============================================================================

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const industry = getIndustryBySlug(params.slug)

  if (!industry) {
    return {
      title: 'Industry Not Found | Anderson Cleaning',
    }
  }

  return {
    title: `${industry.hero.title} | Anderson Cleaning Services`,
    description: industry.hero.subtitle,
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustryBySlug(params.slug)

  // If industry not found, show 404
  if (!industry) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <IndustryTemplate industry={industry} showQuoteForm={false} />
    </div>
  )
}
