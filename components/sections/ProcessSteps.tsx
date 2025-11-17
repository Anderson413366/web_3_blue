/**
 * ProcessSteps Component
 *
 * Purpose: Display the standardized 4-step onboarding process
 * Location: Used across all service detail pages
 *
 * Layout:
 * - Desktop (≥768px): Horizontal timeline with connected steps
 * - Mobile (<768px): Vertical timeline stacked
 *
 * Features:
 * - Numbered circles with icons
 * - Connecting lines between steps
 * - Semantic <ol> for accessibility
 * - Design system integration
 * - Fully responsive
 *
 * Accessibility:
 * - Semantic HTML with <ol> for step ordering
 * - ARIA labels for screen readers
 * - Proper heading hierarchy
 * - Color contrast compliance (WCAG 2.1 AA)
 */

'use client'

import React from 'react'
import { processSteps } from '@/lib/process-steps-data'
import { getIconComponent } from '@/lib/icon-map'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ProcessStepsProps {
  /**
   * Optional heading text
   * @default "Our Process"
   */
  heading?: string

  /**
   * Optional subtitle text
   * @default "How we onboard new clients in 4 simple steps"
   */
  subtitle?: string

  /**
   * Background color variant
   * @default "gray"
   */
  background?: 'white' | 'gray'

  /**
   * Additional CSS classes
   */
  className?: string
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProcessSteps({
  heading = 'Our Process',
  subtitle = 'How we onboard new clients in 4 simple steps',
  background = 'gray',
  className = '',
}: ProcessStepsProps) {
  const bgColor =
    background === 'white'
      ? 'bg-white dark:bg-slate-900'
      : 'bg-gray-50 dark:bg-slate-800'

  return (
    <section
      className={`py-16 md:py-20 ${bgColor} transition-colors duration-300 ${className}`}
      aria-labelledby="process-steps-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              id="process-steps-heading"
              className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4"
            >
              {heading}
            </h2>
            {subtitle && (
              <p className="text-lg text-[var(--color-text-secondary)] max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* ================================================================
              DESKTOP LAYOUT: Horizontal Timeline
              Visible on screens ≥ 768px
              ================================================================ */}
          <ol
            className="hidden md:grid md:grid-cols-4 gap-6 relative"
            aria-label="Four-step onboarding process"
          >
            {/* Connecting Line - Behind the steps */}
            <div
              className="absolute top-[60px] left-[12.5%] right-[12.5%] h-[2px] bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-900)] z-0"
              aria-hidden="true"
            ></div>

            {processSteps.map((step, index) => {
              const IconComponent = getIconComponent(step.icon)

              return (
                <li key={step.number} className="relative z-10">
                  {/* Step Card */}
                  <div className="flex flex-col items-center text-center">
                    {/* Icon Circle */}
                    <div
                      className="
                        relative
                        w-[120px] h-[120px]
                        rounded-full
                        bg-white dark:bg-slate-900
                        border-4 border-[var(--color-primary-base)]
                        flex flex-col items-center justify-center
                        mb-6
                        shadow-[var(--shadow-card)]
                      "
                    >
                      {/* Step Number */}
                      <div
                        className="
                          absolute -top-3 -right-3
                          w-10 h-10
                          rounded-full
                          bg-[var(--color-primary-base)]
                          text-white
                          flex items-center justify-center
                          font-bold text-lg
                          shadow-lg
                        "
                        aria-label={`Step ${step.number}`}
                      >
                        {step.number}
                      </div>

                      {/* Icon */}
                      <IconComponent
                        className="h-12 w-12 text-[var(--color-primary-base)]"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Step Title */}
                    <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3">
                      {step.title}
                    </h3>

                    {/* Step Description */}
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>

          {/* ================================================================
              MOBILE LAYOUT: Vertical Timeline
              Visible on screens < 768px
              ================================================================ */}
          <ol className="md:hidden space-y-8 relative" aria-label="Four-step onboarding process">
            {/* Vertical Connecting Line */}
            <div
              className="absolute left-[30px] top-[60px] bottom-[60px] w-[2px] bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-900)] z-0"
              aria-hidden="true"
            ></div>

            {processSteps.map((step, index) => {
              const IconComponent = getIconComponent(step.icon)
              const isLast = index === processSteps.length - 1

              return (
                <li key={step.number} className="relative z-10 flex gap-6">
                  {/* Icon Circle */}
                  <div className="flex-shrink-0">
                    <div
                      className="
                        relative
                        w-[60px] h-[60px]
                        rounded-full
                        bg-white dark:bg-slate-900
                        border-4 border-[var(--color-primary-base)]
                        flex items-center justify-center
                        shadow-[var(--shadow-card)]
                      "
                    >
                      {/* Step Number Badge */}
                      <div
                        className="
                          absolute -top-2 -right-2
                          w-7 h-7
                          rounded-full
                          bg-[var(--color-primary-base)]
                          text-white
                          flex items-center justify-center
                          font-bold text-sm
                          shadow-md
                        "
                        aria-label={`Step ${step.number}`}
                      >
                        {step.number}
                      </div>

                      {/* Icon */}
                      <IconComponent
                        className="h-7 w-7 text-[var(--color-primary-base)]"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className={`flex-1 ${!isLast ? 'pb-8' : ''}`}>
                    <h3 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * @example Default usage
 * ```tsx
 * import ProcessSteps from '@/components/sections/ProcessSteps'
 *
 * export default function ServicePage() {
 *   return (
 *     <div>
 *       <ProcessSteps />
 *     </div>
 *   )
 * }
 * ```
 *
 * @example Custom heading and subtitle
 * ```tsx
 * <ProcessSteps
 *   heading="How It Works"
 *   subtitle="Our proven 4-step approach to spotless facilities"
 * />
 * ```
 *
 * @example White background variant
 * ```tsx
 * <ProcessSteps background="white" />
 * ```
 *
 * @example No subtitle
 * ```tsx
 * <ProcessSteps subtitle="" />
 * ```
 */
