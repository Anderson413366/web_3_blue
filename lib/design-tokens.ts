/**
 * Anderson Cleaning Design Tokens
 * Apple-style spacing scale and typography system
 */

// ===================================================================
// SPACING SCALE (8px base unit)
// ===================================================================
export const spacing = {
  xs: '8px',    // 0.5rem - Tight spacing within components
  sm: '12px',   // 0.75rem - Small gaps between related items
  md: '16px',   // 1rem - Standard component padding
  lg: '24px',   // 1.5rem - Section spacing within cards
  xl: '32px',   // 2rem - Standard section spacing
  '2xl': '48px', // 3rem - Large section spacing
  '3xl': '64px', // 4rem - Hero section spacing (vertical)
  '4xl': '80px', // 5rem - Major section spacing
} as const

// Tailwind class mappings for convenience
export const spacingClasses = {
  xs: 'p-2',      // 8px
  sm: 'p-3',      // 12px
  md: 'p-4',      // 16px
  lg: 'p-6',      // 24px
  xl: 'p-8',      // 32px
  '2xl': 'p-12',  // 48px
  '3xl': 'p-16',  // 64px
  '4xl': 'p-20',  // 80px
} as const

// ===================================================================
// TYPOGRAPHY SCALE
// ===================================================================
export const typography = {
  // Headings
  h1: {
    fontSize: '2.5rem',    // 40px
    lineHeight: '1.2',
    fontWeight: '800',     // extrabold
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2rem',      // 32px
    lineHeight: '1.3',
    fontWeight: '700',     // bold
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.5rem',    // 24px
    lineHeight: '1.4',
    fontWeight: '600',     // semibold
    letterSpacing: '0',
  },
  h4: {
    fontSize: '1.25rem',   // 20px
    lineHeight: '1.5',
    fontWeight: '600',     // semibold
    letterSpacing: '0',
  },

  // Body text
  body: {
    fontSize: '1rem',      // 16px
    lineHeight: '1.6',
    fontWeight: '400',     // normal
    letterSpacing: '0',
  },
  bodyLarge: {
    fontSize: '1.125rem',  // 18px
    lineHeight: '1.7',
    fontWeight: '400',
    letterSpacing: '0',
  },
  bodySmall: {
    fontSize: '0.875rem',  // 14px
    lineHeight: '1.5',
    fontWeight: '400',
    letterSpacing: '0',
  },

  // Special
  lead: {
    fontSize: '1.25rem',   // 20px
    lineHeight: '1.8',
    fontWeight: '400',
    letterSpacing: '0',
  },
} as const

// ===================================================================
// BRAND COLORS (Reference)
// ===================================================================
export const colors = {
  brand: {
    deepBlue: '#002A86',      // Pantone 2747C
    brightBlue: '#0077D9',    // Pantone 3005C
    navy: '#001F5C',          // Darker variant
    red: '#C8102E',           // Pantone 193C
  },
  neutral: {
    charcoal: '#333333',
    offWhite: '#F9FAFB',
    lightGrey: '#E5E7EB',
    white: '#FFFFFF',
  },
} as const

// ===================================================================
// BORDER RADIUS
// ===================================================================
export const borderRadius = {
  sm: '8px',
  md: '10px',   // Standard button radius
  lg: '12px',
  xl: '16px',
  '2xl': '24px',
} as const

// ===================================================================
// TRANSITIONS
// ===================================================================
export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
} as const
