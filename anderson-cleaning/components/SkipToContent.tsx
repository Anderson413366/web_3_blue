'use client'

/**
 * Skip to Content Link
 *
 * Provides a keyboard-accessible link that allows users to skip navigation
 * and jump directly to main content. Complies with WCAG 2.1 AA.
 *
 * Usage:
 * - Add this component at the very top of your layout/page
 * - Ensure your main content has id="main-content"
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-[100]
        focus:px-6
        focus:py-3
        focus:bg-primary-600
        focus:text-white
        focus:font-semibold
        focus:rounded-lg
        focus:shadow-lg
        focus:outline-none
        focus:ring-4
        focus:ring-primary-300
        dark:focus:ring-primary-800
        transition-all
      "
    >
      Skip to main content
    </a>
  )
}
