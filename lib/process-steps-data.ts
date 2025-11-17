/**
 * Process Steps Data
 *
 * Defines the standard 4-step onboarding process used across all service pages.
 * Consistent across all services to maintain brand consistency.
 */

// Icons are now stored as strings and mapped to components via getIconComponent()
// in consuming components. This prevents Server/Client boundary violations.

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface ProcessStep {
  number: number
  title: string
  description: string
  icon: string // Icon name (e.g., 'ClipboardCheck', 'FileText')
}

// ============================================================================
// PROCESS STEPS DATA
// ============================================================================

/**
 * Standard 4-step onboarding process
 * Used across all service pages
 */
export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Facility Walk-Through',
    description:
      'We tour your space to understand layout, traffic patterns, and special requirements. Free consultation, no obligation.',
    icon: 'ClipboardCheck',
  },
  {
    number: 2,
    title: 'Custom SOPs',
    description:
      'We create detailed Standard Operating Procedures specific to your facility. No cookie-cutter checklists.',
    icon: 'FileText',
  },
  {
    number: 3,
    title: 'Team Training',
    description:
      'Our staff receives 40+ hours of training plus facility-specific instruction. Background-checked professionals.',
    icon: 'Users',
  },
  {
    number: 4,
    title: 'Supervised Start',
    description:
      'First week includes extra oversight and quality checks. We ensure we meet your standards from day one.',
    icon: 'CheckCircle2',
  },
]
