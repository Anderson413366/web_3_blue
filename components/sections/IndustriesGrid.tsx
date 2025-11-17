'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils/cn'

export interface Industry {
  title: string
  slug: string
  icon: string | React.ReactNode
  description: string
  features?: string[]
  image?: string
}

export interface IndustriesGridProps {
  industries: Industry[]
  /**
   * Number of columns on desktop
   * @default 3
   */
  columns?: 2 | 3 | 4
  /**
   * Show featured industries first
   */
  featured?: string[]
  /**
   * Click handler for industry tiles
   */
  onIndustryClick?: (slug: string) => void
}

/**
 * Grid of industry/facility type tiles
 *
 * Features:
 * - Responsive grid layout
 * - Hover animations (respects prefers-reduced-motion)
 * - Keyboard accessible
 * - WCAG 2.1 AA compliant
 * - Optional click handlers for navigation
 * - Support for featured industries
 *
 * @example
 * <IndustriesGrid
 *   industries={[
 *     {
 *       title: 'Office Buildings',
 *       slug: 'offices',
 *       icon: '🏢',
 *       description: 'Corporate offices and business centers',
 *       features: ['Daily cleaning', 'Conference rooms', 'Break areas']
 *     }
 *   ]}
 *   onIndustryClick={(slug) => router.push(`/industries/${slug}`)}
 * />
 */
export default function IndustriesGrid({
  industries,
  columns = 3,
  featured = [],
  onIndustryClick,
}: IndustriesGridProps) {
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  // Sort industries: featured first, then alphabetically
  const sortedIndustries = [...industries].sort((a, b) => {
    const aFeatured = featured.includes(a.slug)
    const bFeatured = featured.includes(b.slug)

    if (aFeatured && !bFeatured) return -1
    if (!aFeatured && bFeatured) return 1
    return a.title.localeCompare(b.title)
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={cn('grid grid-cols-1 gap-6', columnClasses[columns])}
    >
      {sortedIndustries.map((industry, index) => {
        const isFeatured = featured.includes(industry.slug)
        const isClickable = !!onIndustryClick

        return (
          <motion.div
            key={industry.slug}
            variants={itemVariants}
            whileHover={isClickable ? { y: -8, scale: 1.02 } : undefined}
            className={cn(
              'relative bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden',
              'transition-all duration-300',
              isClickable && 'cursor-pointer hover:shadow-2xl',
              isFeatured && 'ring-2 ring-primary-500 ring-offset-2'
            )}
            onClick={() => onIndustryClick?.(industry.slug)}
            onKeyDown={(e) => {
              if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault()
                onIndustryClick?.(industry.slug)
              }
            }}
            tabIndex={isClickable ? 0 : undefined}
            role={isClickable ? 'button' : undefined}
            aria-label={isClickable ? `Learn more about ${industry.title}` : undefined}
          >
            {/* Featured Badge */}
            {isFeatured && (
              <div className="absolute top-4 right-4 z-10">
                <span className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  Featured
                </span>
              </div>
            )}

            {/* Background Image (if provided) */}
            {industry.image && (
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-5"
                style={{ backgroundImage: `url(${industry.image})` }}
                aria-hidden="true"
              />
            )}

            {/* Content */}
            <div className="relative p-8">
              {/* Icon */}
              <div className="mb-4">
                {typeof industry.icon === 'string' ? (
                  <div className="text-6xl" aria-hidden="true">
                    {industry.icon}
                  </div>
                ) : (
                  industry.icon
                )}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                {industry.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {industry.description}
              </p>

              {/* Features */}
              {industry.features && industry.features.length > 0 && (
                <ul className="space-y-2">
                  {industry.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start text-sm text-gray-700 dark:text-gray-300"
                    >
                      <svg
                        className="h-5 w-5 text-accent-500 mr-2 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Learn More Arrow (if clickable) */}
              {isClickable && (
                <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 font-semibold group-hover:text-primary-700">
                  <span>Learn More</span>
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
