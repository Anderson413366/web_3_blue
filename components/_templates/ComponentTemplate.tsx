/**
 * ComponentTemplate
 *
 * Purpose: [Brief description of what this component does]
 * Location: [Where this component is used]
 *
 * Features:
 * - [Feature 1]
 * - [Feature 2]
 * - [Feature 3]
 *
 * Accessibility:
 * - [Accessibility consideration 1]
 * - [Accessibility consideration 2]
 */

'use client' // Remove if this is a Server Component

import React from 'react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ComponentTemplateProps {
  /**
   * Brief description of the prop
   * @example "Example value"
   */
  title: string

  /**
   * Optional description
   * @default "default value"
   */
  description?: string

  /**
   * Callback function description
   */
  onClick?: () => void

  /**
   * Children elements
   */
  children?: React.ReactNode

  /**
   * Additional CSS classes
   */
  className?: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const DEFAULT_DESCRIPTION = 'Default description text'

// ============================================================================
// COMPONENT
// ============================================================================

export default function ComponentTemplate({
  title,
  description = DEFAULT_DESCRIPTION,
  onClick,
  children,
  className = '',
}: ComponentTemplateProps) {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  // const [state, setState] = React.useState<Type>(initialValue)

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  // React.useEffect(() => {
  //   // Effect logic
  // }, [dependencies])

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------
  // const handleEvent = () => {
  //   // Handler logic
  // }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <div
      className={`
        /* Base styles using design system variables */
        bg-[var(--color-background-base)]
        text-[var(--color-text-primary)]
        p-[var(--spacing-md)]
        rounded-[var(--border-radius-lg)]

        /* Hover/focus states */
        hover:bg-[var(--color-background-hover)]
        focus-visible:outline-[var(--color-primary-base)]

        /* Transitions */
        transition-[var(--transition-colors)]

        /* Custom classes */
        ${className}
      `}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      } : undefined}
    >
      {/* Title */}
      <h2 className="text-[var(--font-size-heading-2)] font-[var(--font-weight-bold)] mb-[var(--spacing-sm)]">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="text-[var(--color-text-secondary)] mb-[var(--spacing-md)]">
          {description}
        </p>
      )}

      {/* Children */}
      {children}
    </div>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * <ComponentTemplate
 *   title="Example Title"
 *   description="Optional description"
 *   onClick={() => console.log('Clicked')}
 *   className="custom-class"
 * >
 *   <p>Child content</p>
 * </ComponentTemplate>
 * ```
 */

// ============================================================================
// ACCESSIBILITY NOTES
// ============================================================================

/**
 * This component follows WCAG 2.1 AA guidelines:
 *
 * - Semantic HTML: Uses appropriate elements (h2, p, div)
 * - Keyboard Navigation: Interactive elements are keyboard accessible
 * - Focus Visible: Clear focus indicators using design system variables
 * - ARIA Attributes: role="button" when onClick is provided
 * - Color Contrast: Uses design system colors (4.5:1+ contrast)
 * - Touch Targets: Minimum 44x44px for interactive elements
 * - Screen Readers: Semantic structure and proper labeling
 */

// ============================================================================
// STYLING NOTES
// ============================================================================

/**
 * Styling Guidelines:
 *
 * 1. USE DESIGN SYSTEM VARIABLES:
 *    - Colors: var(--color-*)
 *    - Spacing: var(--spacing-*)
 *    - Typography: var(--font-*)
 *    - Borders: var(--border-*)
 *    - Shadows: var(--shadow-*)
 *    - Transitions: var(--transition-*)
 *
 * 2. TAILWIND ARBITRARY VALUES:
 *    - Use square brackets for CSS variables: bg-[var(--color-primary-base)]
 *    - Combine with Tailwind utilities for responsive design
 *
 * 3. DARK MODE:
 *    - Design system variables automatically handle light/dark themes
 *    - No need for .dark: prefix when using CSS variables
 *
 * 4. RESPONSIVE DESIGN:
 *    - Mobile-first approach
 *    - Use Tailwind breakpoints: sm:, md:, lg:, xl:, 2xl:
 */
