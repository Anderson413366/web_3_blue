/**
 * Accessibility Utilities
 *
 * Helper functions for improving accessibility throughout the application.
 */

/**
 * Generate unique ID for form fields
 * Ensures unique IDs for proper label/input association
 */
let idCounter = 0
export function generateId(prefix: string = 'field'): string {
  idCounter++
  return `${prefix}-${idCounter}-${Date.now()}`
}

/**
 * Announce message to screen readers
 * Creates a live region announcement without visual change
 */
export function announceToScreenReader(
  message: string,
  priority: 'polite' | 'assertive' = 'polite'
) {
  if (typeof window === 'undefined') return

  // Create or get announcement container
  let announcer = document.getElementById('screen-reader-announcer')

  if (!announcer) {
    announcer = document.createElement('div')
    announcer.id = 'screen-reader-announcer'
    announcer.setAttribute('role', priority === 'assertive' ? 'alert' : 'status')
    announcer.setAttribute('aria-live', priority)
    announcer.setAttribute('aria-atomic', 'true')
    announcer.className = 'sr-only'
    document.body.appendChild(announcer)
  }

  // Clear previous announcement
  announcer.textContent = ''

  // Slight delay to ensure screen reader picks up the change
  setTimeout(() => {
    if (announcer) {
      announcer.textContent = message
    }
  }, 100)

  // Clear after announcement
  setTimeout(() => {
    if (announcer) {
      announcer.textContent = ''
    }
  }, 5000)
}

/**
 * Trap focus within a container (for modals, dialogs)
 */
export function trapFocus(container: HTMLElement) {
  const focusableElements = container.querySelectorAll<HTMLElement>(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )

  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]

  const handleTabKey = (e: KeyboardEvent) => {
    if (e.key !== 'Tab') return

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      }
    } else {
      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  }

  container.addEventListener('keydown', handleTabKey)

  // Return cleanup function
  return () => {
    container.removeEventListener('keydown', handleTabKey)
  }
}

/**
 * Get all focusable elements within a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  const elements = container.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )

  return Array.from(elements)
}

/**
 * Restore focus to element
 * Useful for modals/dialogs to restore focus after closing
 */
export function restoreFocus(element: HTMLElement | null) {
  if (!element) return

  // Focus with a small delay to ensure DOM is ready
  setTimeout(() => {
    element.focus()
  }, 50)
}

/**
 * Check if element is visible
 */
export function isElementVisible(element: HTMLElement): boolean {
  return !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length)
}

/**
 * Handle Escape key to close modals/dialogs
 */
export function handleEscapeKey(callback: () => void) {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      callback()
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  // Return cleanup function
  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}

/**
 * Check color contrast ratio
 * Returns contrast ratio between two colors
 */
export function getContrastRatio(foreground: string, background: string): number {
  const getLuminance = (color: string): number => {
    // Simple RGB extraction (works for hex colors)
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255

    // Calculate relative luminance
    const getChannel = (c: number) => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }

    return 0.2126 * getChannel(r) + 0.7152 * getChannel(g) + 0.0722 * getChannel(b)
  }

  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

/**
 * Check if contrast meets WCAG standards
 */
export function meetsContrastRequirement(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA',
  isLargeText: boolean = false
): boolean {
  if (level === 'AAA') {
    return isLargeText ? ratio >= 4.5 : ratio >= 7
  }
  // AA level
  return isLargeText ? ratio >= 3 : ratio >= 4.5
}

/**
 * Debounce announcements to avoid overwhelming screen readers
 */
let announceTimeout: NodeJS.Timeout | null = null
export function debounceAnnounce(message: string, delay: number = 1000) {
  if (announceTimeout) {
    clearTimeout(announceTimeout)
  }

  announceTimeout = setTimeout(() => {
    announceToScreenReader(message)
    announceTimeout = null
  }, delay)
}

/**
 * Manage focus for single-page applications
 * Moves focus to main heading on route change
 */
export function manageFocusOnRouteChange() {
  // Find the main heading (h1)
  const mainHeading = document.querySelector('h1')

  if (mainHeading) {
    // Make it focusable temporarily
    mainHeading.setAttribute('tabindex', '-1')
    mainHeading.focus()

    // Remove tabindex after focus to prevent it from being in tab order
    mainHeading.addEventListener(
      'blur',
      () => {
        mainHeading.removeAttribute('tabindex')
      },
      { once: true }
    )

    // Announce page title
    announceToScreenReader(`Navigated to ${document.title}`, 'assertive')
  }
}

/**
 * Detect if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Get appropriate animation duration based on user preference
 */
export function getAnimationDuration(defaultDuration: number): number {
  return prefersReducedMotion() ? 0 : defaultDuration
}

/**
 * Create accessible description for form errors
 */
export function getErrorDescriptionId(fieldId: string): string {
  return `${fieldId}-error`
}

/**
 * Create accessible description ID
 */
export function getDescriptionId(fieldId: string): string {
  return `${fieldId}-description`
}

/**
 * Validate heading hierarchy
 * Checks for skipped heading levels
 */
export function validateHeadingHierarchy(): string[] {
  if (typeof window === 'undefined') return []

  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'))
  const issues: string[] = []
  let previousLevel = 0

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))

    if (index === 0 && level !== 1) {
      issues.push('First heading should be h1')
    }

    if (previousLevel > 0 && level > previousLevel + 1) {
      issues.push(
        `Heading level skipped from h${previousLevel} to h${level} at "${heading.textContent?.trim()}"`
      )
    }

    previousLevel = level
  })

  return issues
}
