/**
 * StatsBar Component
 *
 * Purpose: Display impressive company statistics for credibility
 * Features: Count-up animation, responsive layout, design system integration
 *
 * Layout:
 * - Desktop (≥1024px): 4 columns in a row
 * - Tablet (768px-1023px): 2x2 grid
 * - Mobile (<768px): Single column stack
 *
 * Animation:
 * - Numbers count up from 0 when component enters viewport
 * - Uses Intersection Observer for performance
 * - Animates once per page load
 *
 * Accessibility:
 * - Semantic HTML structure
 * - High contrast text
 * - Screen reader friendly
 */

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Calendar, Users, Building2, Star, LucideIcon } from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface Stat {
  id: string | number
  value: string
  label: string
  icon?: LucideIcon
  numericValue?: number // For count-up animation
  suffix?: string // e.g., "+", "%"
}

interface StatsBarProps {
  /**
   * Array of stats to display
   */
  stats?: Stat[]

  /**
   * Background color variant
   * @default "gray"
   */
  background?: 'white' | 'gray' | 'blue'

  /**
   * Enable count-up animation
   * @default true
   */
  enableAnimation?: boolean

  /**
   * Animation duration in milliseconds
   * @default 2000
   */
  animationDuration?: number

  /**
   * Additional CSS classes
   */
  className?: string
}

// ============================================================================
// DEFAULT STATS DATA
// ============================================================================

const DEFAULT_STATS: Stat[] = [
  {
    id: 1,
    value: '20+',
    label: 'Years in Business',
    icon: Calendar,
    numericValue: 20,
    suffix: '+',
  },
  {
    id: 2,
    value: '50+',
    label: 'Active Clients',
    icon: Users,
    numericValue: 50,
    suffix: '+',
  },
  {
    id: 3,
    value: '2M+',
    label: 'Sq Ft Cleaned Monthly',
    icon: Building2,
    numericValue: 2,
    suffix: 'M+',
  },
  {
    id: 4,
    value: '100%',
    label: 'Client Satisfaction',
    icon: Star,
    numericValue: 100,
    suffix: '%',
  },
]

// ============================================================================
// ANIMATION HELPER - COUNT UP
// ============================================================================

/**
 * Easing function for smooth count-up animation
 * Uses ease-out cubic for natural deceleration
 */
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3)
}

/**
 * Custom hook for count-up animation
 * @param end - Target number to count to
 * @param duration - Animation duration in ms
 * @param start - Starting number (default 0)
 * @param shouldAnimate - Whether to start animation
 * @returns Current animated value
 */
const useCountUp = (
  end: number,
  duration: number,
  start: number = 0,
  shouldAnimate: boolean = false
): number => {
  const [count, setCount] = useState(start)
  const startTimeRef = useRef<number | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(start)
      return
    }

    startTimeRef.current = null

    const animate = (currentTime: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(progress)
      const currentCount = start + (end - start) * easedProgress

      setCount(currentCount)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [end, duration, start, shouldAnimate])

  return count
}

// ============================================================================
// INDIVIDUAL STAT ITEM COMPONENT
// ============================================================================

interface StatItemProps {
  stat: Stat
  enableAnimation: boolean
  animationDuration: number
  shouldAnimate: boolean
}

const StatItem: React.FC<StatItemProps> = ({
  stat,
  enableAnimation,
  animationDuration,
  shouldAnimate,
}) => {
  const IconComponent = stat.icon
  const animatedValue = useCountUp(
    stat.numericValue || 0,
    animationDuration,
    0,
    enableAnimation && shouldAnimate
  )

  // Format the displayed value
  const displayValue = enableAnimation && stat.numericValue !== undefined && shouldAnimate
    ? `${Math.round(animatedValue)}${stat.suffix || ''}`
    : stat.value

  return (
    <div className="flex flex-col items-center text-center px-6 py-8">
      {/* Icon */}
      {IconComponent && (
        <div className="mb-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-900)] flex items-center justify-center">
            <IconComponent
              className="h-8 w-8 text-[var(--color-primary-base)]"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* Stat Value (Number) */}
      <div
        className="text-5xl md:text-6xl font-extrabold text-[var(--color-primary-base)] mb-3"
        aria-label={`${stat.value} ${stat.label}`}
      >
        {displayValue}
      </div>

      {/* Stat Label */}
      <div className="text-base md:text-lg font-medium text-[var(--color-text-secondary)]">
        {stat.label}
      </div>
    </div>
  )
}

// ============================================================================
// MAIN STATS BAR COMPONENT
// ============================================================================

export default function StatsBar({
  stats = DEFAULT_STATS,
  background = 'gray',
  enableAnimation = true,
  animationDuration = 2000,
  className = '',
}: StatsBarProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer for triggering animation when in viewport
  useEffect(() => {
    if (!enableAnimation) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimate) {
            setShouldAnimate(true)
          }
        })
      },
      {
        threshold: 0.2, // Trigger when 20% of component is visible
        rootMargin: '0px 0px -50px 0px', // Slight offset from bottom
      }
    )

    const currentRef = sectionRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [enableAnimation, shouldAnimate])

  // Background color classes
  const bgColorClass =
    background === 'white'
      ? 'bg-white dark:bg-slate-900'
      : background === 'blue'
        ? 'bg-blue-50 dark:bg-slate-800'
        : 'bg-gray-50 dark:bg-slate-800'

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-20 ${bgColorClass} transition-colors duration-300 ${className}`}
      aria-labelledby="stats-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Screen reader heading (visually hidden) */}
          <h2 id="stats-heading" className="sr-only">
            Company Statistics
          </h2>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <React.Fragment key={stat.id}>
                <StatItem
                  stat={stat}
                  enableAnimation={enableAnimation}
                  animationDuration={animationDuration}
                  shouldAnimate={shouldAnimate}
                />
              </React.Fragment>
            ))}
          </div>

          {/* Optional: Decorative separator lines between stats (desktop only) */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none">
            <div className="max-w-7xl mx-auto h-full flex">
              {stats.slice(0, -1).map((stat, index) => (
                <div key={`separator-${stat.id}`} className="flex-1 relative">
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 h-24 w-px bg-gray-200 dark:bg-gray-700"></div>
                </div>
              ))}
              <div className="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/**
 * @example Default usage with built-in stats
 * ```tsx
 * import StatsBar from '@/components/sections/StatsBar'
 *
 * export default function AboutPage() {
 *   return (
 *     <div>
 *       <StatsBar />
 *     </div>
 *   )
 * }
 * ```
 *
 * @example Custom stats
 * ```tsx
 * import StatsBar from '@/components/sections/StatsBar'
 * import { Target, Award } from 'lucide-react'
 *
 * const customStats = [
 *   { id: 1, value: '500+', label: 'Projects Completed', icon: Target, numericValue: 500, suffix: '+' },
 *   { id: 2, value: '25', label: 'Awards Won', icon: Award, numericValue: 25 },
 * ]
 *
 * export default function Page() {
 *   return <StatsBar stats={customStats} />
 * }
 * ```
 *
 * @example White background variant
 * ```tsx
 * <StatsBar background="white" />
 * ```
 *
 * @example Disable animation
 * ```tsx
 * <StatsBar enableAnimation={false} />
 * ```
 *
 * @example Custom animation duration
 * ```tsx
 * <StatsBar animationDuration={3000} />
 * ```
 */
