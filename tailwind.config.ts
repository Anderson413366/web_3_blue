import type { Config } from 'tailwindcss'
import tailwindForms from '@tailwindcss/forms'
import tailwindTypography from '@tailwindcss/typography'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Official Anderson Cleaning Brand Colors */
        'brand-deep-blue': '#002A86',      /* Pantone 2747C */
        'brand-bright-blue': '#0077D9',    /* Pantone 3005C */
        'brand-red': '#C8102E',            /* Pantone 193C */

        /* Legacy aliases (deprecated - use brand-* colors above) */
        'brand-navy': '#002A86',           /* → Use brand-deep-blue */
        'brand-emerald': '#0077D9',        /* → Use brand-bright-blue */

        /* Neutral system */
        'neutral-off-white': '#FFFFFF',
        'neutral-light-grey': '#F8F9FA',
        'neutral-charcoal': '#1A1A1A',

        /* Primary scale - Deep Blue */
        primary: {
          DEFAULT: '#002A86',
          50: '#E6ECF7',
          100: '#CCD9EF',
          200: '#99B3DF',
          300: '#668DCF',
          400: '#3367BF',
          500: '#002A86',
          600: '#00226B',
          700: '#001950',
          800: '#001135',
          900: '#00081A',
        },

        /* Accent scale - Bright Blue */
        accent: {
          DEFAULT: '#0077D9',
          50: '#E6F3FC',
          100: '#CCE7F9',
          200: '#99CFF3',
          300: '#66B7ED',
          400: '#339FE7',
          500: '#0077D9',
          600: '#005FAE',
          700: '#004782',
          800: '#003057',
          900: '#00182B',
        },

        /* Alert/Error scale - Red */
        error: {
          DEFAULT: '#C8102E',
          50: '#FDE8EC',
          100: '#FBD1D9',
          200: '#F7A3B3',
          300: '#F3758D',
          400: '#EF4767',
          500: '#C8102E',
          600: '#A00D25',
          700: '#780A1C',
          800: '#500612',
          900: '#280309',
        },

        /* Neutral scales remapped to brand colors */
        // Slate: Maps to brand-deep-blue tints/shades for dark mode backgrounds
        slate: {
          50: '#E6F3FC',     // Very light blue (brand-bright-blue tint)
          100: '#CCE7F9',    // Light blue
          200: '#99CFF3',    // Lighter blue
          300: '#66B7ED',    // Medium light blue
          400: '#339FE7',    // Medium blue
          500: '#0077D9',    // Brand bright blue
          600: '#005FAE',    // Darker blue
          700: '#004782',    // Deep blue
          800: '#002A86',    // Brand deep blue (primary dark bg)
          900: '#001A55',    // Darker deep blue
          950: '#00081A',    // Almost black blue
        },

        // Gray: Maps to deep blue tints for borders and subtle elements
        gray: {
          50: '#FFFFFF',      // White
          100: '#F8F9FA',     // Off-white
          200: '#E6ECF7',     // Very light blue-gray
          300: '#CCD9EF',     // Light blue-gray
          400: '#99B3DF',     // Medium blue-gray
          500: '#668DCF',     // Medium blue
          600: '#3367BF',     // Blue
          700: '#002A86',     // Brand deep blue
          800: '#001950',     // Darker deep blue
          900: '#001135',     // Very dark blue
        },

        // Black: Maps to brand deep blue
        black: '#002A86',

        // White: Pure white for light mode
        white: '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['40px', { lineHeight: '1.3', fontWeight: '700' }],
        h2: ['32px', { lineHeight: '1.3', fontWeight: '700' }],
        h3: ['24px', { lineHeight: '1.4', fontWeight: '600' }],
        body: ['18px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-sm': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        button: ['18px', { lineHeight: '1.3', fontWeight: '500' }],
        'button-sm': ['16px', { lineHeight: '1.3', fontWeight: '500' }],
      },
      spacing: {
        // Consistent spacing scale for OCD-friendly layouts
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      borderRadius: {
        // Consistent border radius
        DEFAULT: '0.5rem', // 8px
        sm: '0.375rem', // 6px
        md: '0.5rem', // 8px
        lg: '0.75rem', // 12px
        xl: '1rem', // 16px
        '2xl': '1.5rem', // 24px
      },
      boxShadow: {
        // Elevation system
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      },
      animation: {
        // Respect prefers-reduced-motion
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-in': 'slideIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      transitionDuration: {
        // Consistent transition timings
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [tailwindForms, tailwindTypography],
}
export default config
