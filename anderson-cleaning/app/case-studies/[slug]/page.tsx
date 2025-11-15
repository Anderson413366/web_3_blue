/**
 * Dynamic Case Study Detail Page
 *
 * Purpose: Renders individual case study pages using the CaseStudyTemplate
 * Route: /case-studies/[slug]
 *
 * Features:
 * - Static generation for all case studies
 * - Dynamic metadata for SEO
 * - 404 handling for invalid slugs
 */

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CaseStudyTemplate from '@/components/case-studies/CaseStudyTemplate'
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
  caseStudies,
} from '@/lib/case-studies-data'

// ============================================================================
// STATIC GENERATION
// ============================================================================

/**
 * Generate static params for all case studies
 * This enables static generation at build time for optimal performance
 */
export async function generateStaticParams() {
  const slugs = getAllCaseStudySlugs()

  return slugs.map((slug) => ({
    slug: slug,
  }))
}

/**
 * Generate metadata for SEO
 * Creates dynamic title, description, and Open Graph tags
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(params.slug)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found | Anderson Cleaning Services',
      description: 'The requested case study could not be found.',
    }
  }

  return {
    title: `${caseStudy.title} | Anderson Cleaning Case Study`,
    description: `${caseStudy.challenge.headline}. ${caseStudy.keyResult}. Read how Anderson Cleaning delivered measurable results for ${caseStudy.client.name}.`,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.keyResult,
      images: [
        {
          url: caseStudy.featuredImage,
          width: 1200,
          height: 630,
          alt: caseStudy.title,
        },
      ],
      type: 'article',
      publishedTime: caseStudy.publishedDate,
    },
    twitter: {
      card: 'summary_large_image',
      title: caseStudy.title,
      description: caseStudy.keyResult,
      images: [caseStudy.featuredImage],
    },
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  // Fetch the case study by slug
  const caseStudy = getCaseStudyBySlug(params.slug)

  // Handle 404 for invalid slugs
  if (!caseStudy) {
    notFound()
  }

  return (
    <div>
      <CaseStudyTemplate caseStudy={caseStudy} />
    </div>
  )
}

// ============================================================================
// CONFIGURATION
// ============================================================================

/**
 * Revalidate every 24 hours (86400 seconds)
 * This ensures case studies stay up-to-date if data changes
 */
export const revalidate = 86400
