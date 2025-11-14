/**
 * ServiceAreaMap
 *
 * Purpose: Visual service area map section showing coverage areas
 * Location: Homepage, can be used on About or Contact pages
 *
 * Features:
 * - Two-column responsive layout (map + coverage list)
 * - Placeholder map image with 16:9 aspect ratio
 * - Checkmark list of primary service cities
 * - CTA button linking to contact page
 * - Fully accessible with semantic HTML
 *
 * Accessibility:
 * - Proper heading hierarchy (h2, h3)
 * - Descriptive alt text for map image
 * - Semantic list markup (<ul>, <li>)
 * - Checkmarks + text (not color-only)
 * - ARIA labels on CTA link
 */

'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface ServiceAreaMapProps {
  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Show CTA button
   * @default true
   */
  showCta?: boolean

  /**
   * CTA link destination
   * @default "/contact"
   */
  ctaLink?: string
}

// ============================================================================
// CONSTANTS
// ============================================================================

const SERVICE_AREAS = [
  'Springfield & West Springfield',
  'Worcester County',
  'Northampton & Amherst',
  'Hartford, CT area',
  'All locations within 100 miles',
]

const MAP_ALT_TEXT = 'Anderson Cleaning service area covering Western Massachusetts and Northern Connecticut'

// ============================================================================
// COMPONENT
// ============================================================================

export default function ServiceAreaMap({
  className = '',
  showCta = true,
  ctaLink = '/contact',
}: ServiceAreaMapProps) {
  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <section
      className={`
        py-16 md:py-20
        bg-[var(--color-gray-50)]
        dark:bg-slate-900
        ${className}
      `}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* ================================================================
            SECTION HEADER
            ================================================================ */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
            Our Service Area
          </h2>
          <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            100-mile radius from West Springfield, MA
          </p>
        </div>

        {/* ================================================================
            TWO-COLUMN LAYOUT
            Grid: 1 column on mobile, 2 columns on desktop
            ================================================================ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">

          {/* ============================================================
              MAP VISUAL (LEFT COLUMN)
              ============================================================ */}
          <div className="order-1">
            {/* Map Container with 16:9 Aspect Ratio */}
            <div
              className="
                relative
                w-full
                aspect-video
                bg-gradient-to-br from-blue-100 to-blue-200
                dark:from-slate-700 dark:to-slate-600
                rounded-[var(--border-radius-lg)]
                shadow-[var(--shadow-card)]
                overflow-hidden
                border-2 border-gray-200 dark:border-slate-600
              "
            >
              {/* TODO: Replace this placeholder with actual map graphic
                  Options:
                  1. Static map image exported from Google Maps or Mapbox
                  2. Interactive map using react-leaflet or Google Maps API
                  3. Custom SVG map illustration
                  4. Screenshot of service area with pins

                  Recommended approach:
                  - Export static map from Google Maps showing 100-mile radius
                  - Add custom markers for primary cities
                  - Export as high-res PNG or WebP
                  - Place in /public/images/service-area-map.png
                  - Replace this div with:

                  <img
                    src="/images/service-area-map.png"
                    alt={MAP_ALT_TEXT}
                    className="w-full h-full object-cover"
                  />
              */}

              {/* Placeholder Map Visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                {/* Location Pin Icon */}
                <svg
                  className="w-16 h-16 text-blue-600 dark:text-blue-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>

                <h3 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-2">
                  Service Area Map
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xs">
                  100-mile radius covering Western MA and Northern CT
                </p>

                {/* Visual circle indicating coverage area */}
                <div className="mt-6 relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500 dark:border-blue-400 opacity-30 animate-pulse"></div>
                  <div className="absolute inset-8 rounded-full border-4 border-blue-600 dark:border-blue-300 opacity-50"></div>
                  <div className="absolute inset-16 rounded-full bg-blue-600 dark:bg-blue-400 opacity-70 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">100mi</span>
                  </div>
                </div>
              </div>

              {/* Screen reader description */}
              <span className="sr-only">{MAP_ALT_TEXT}</span>
            </div>

            {/* Map Caption */}
            <p className="mt-4 text-sm text-center text-[var(--color-text-tertiary)] italic">
              Serving Western Massachusetts and Northern Connecticut
            </p>
          </div>

          {/* ============================================================
              COVERAGE LIST (RIGHT COLUMN)
              ============================================================ */}
          <div className="order-2">
            <div className="bg-white dark:bg-slate-800 rounded-[var(--border-radius-lg)] shadow-[var(--shadow-card)] p-8 border border-gray-200 dark:border-slate-700">
              {/* List Heading */}
              <h3 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6">
                Primary Coverage Areas
              </h3>

              {/* Service Areas Checklist */}
              <ul className="space-y-4 mb-8" role="list">
                {SERVICE_AREAS.map((area, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-text-primary)]"
                  >
                    {/* Checkmark Icon */}
                    <CheckCircle2
                      className="h-6 w-6 text-[var(--color-success-base)] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />

                    {/* Area Name */}
                    <span className="text-base md:text-lg font-medium">
                      {area}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Additional Information */}
              <div className="bg-[var(--color-primary-light)] dark:bg-slate-700 rounded-lg p-4 mb-6">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  <strong className="text-[var(--color-text-primary)]">Note:</strong>{' '}
                  We proudly serve businesses, schools, medical facilities, and more
                  throughout our coverage area. Not sure if we serve your location?
                </p>
              </div>

              {/* CTA Button */}
              {showCta && (
                <Link href={ctaLink} className="block">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    aria-label="Contact us to see if we serve your area"
                  >
                    See If We Serve Your Area
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* ================================================================
            ADDITIONAL CONTEXT (OPTIONAL)
            ================================================================ */}
        <div className="mt-12 text-center">
          <p className="text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            We're committed to providing exceptional cleaning services throughout Western Massachusetts
            and Northern Connecticut. Our central location in West Springfield allows us to efficiently
            serve a wide range of communities within a 100-mile radius.
          </p>
        </div>
      </div>
    </section>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * // Basic usage
 * <ServiceAreaMap />
 *
 * // Without CTA button
 * <ServiceAreaMap showCta={false} />
 *
 * // Custom CTA link
 * <ServiceAreaMap ctaLink="/quote" />
 *
 * // With custom styling
 * <ServiceAreaMap className="my-custom-class" />
 *
 * // On homepage
 * <main>
 *   <HeroSection />
 *   <ServiceAreaMap />
 *   <TestimonialsSection />
 * </main>
 * ```
 */

// ============================================================================
// MAP REPLACEMENT INSTRUCTIONS
// ============================================================================

/**
 * TO REPLACE THE PLACEHOLDER MAP:
 *
 * 1. CREATE STATIC MAP IMAGE:
 *    Option A: Google Maps
 *    - Go to https://www.google.com/maps
 *    - Search "West Springfield, MA"
 *    - Right-click → "Measure distance"
 *    - Click 100 miles from center
 *    - Take screenshot (Cmd/Ctrl + Shift + 4 on Mac/Windows)
 *    - Crop to 16:9 aspect ratio
 *    - Add markers for primary cities (optional)
 *    - Save as service-area-map.png
 *
 *    Option B: Mapbox Studio
 *    - Create custom styled map at https://www.mapbox.com/mapbox-studio
 *    - Add custom markers for Springfield, Worcester, Northampton, Hartford
 *    - Draw 100-mile radius circle
 *    - Export static image (1200x675px for 16:9)
 *
 *    Option C: Custom SVG
 *    - Design custom map illustration in Figma/Illustrator
 *    - Export as SVG or high-res PNG
 *
 * 2. SAVE IMAGE FILE:
 *    - Place in: /public/images/service-area-map.png
 *    - Recommended size: 1200x675px (16:9 ratio)
 *    - Optimize with tinypng.com or imageoptim.com
 *    - Consider WebP format for better compression
 *
 * 3. UPDATE COMPONENT:
 *    Replace the placeholder div (lines 110-160) with:
 *
 *    ```tsx
 *    <img
 *      src="/images/service-area-map.png"
 *      alt={MAP_ALT_TEXT}
 *      className="w-full h-full object-cover"
 *      loading="lazy"
 *    />
 *    ```
 *
 * 4. ALTERNATIVE: INTERACTIVE MAP
 *    For interactive map using react-leaflet:
 *
 *    ```bash
 *    npm install react-leaflet leaflet
 *    npm install -D @types/leaflet
 *    ```
 *
 *    Then replace placeholder with:
 *    ```tsx
 *    import { MapContainer, TileLayer, Circle, Marker } from 'react-leaflet'
 *    import 'leaflet/dist/leaflet.css'
 *
 *    <MapContainer
 *      center={[42.1070, -72.6209]} // West Springfield, MA
 *      zoom={8}
 *      style={{ height: '100%', width: '100%' }}
 *    >
 *      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 *      <Circle
 *        center={[42.1070, -72.6209]}
 *        radius={160934} // 100 miles in meters
 *        color="blue"
 *      />
 *      <Marker position={[42.1070, -72.6209]} />
 *    </MapContainer>
 *    ```
 */

// ============================================================================
// ACCESSIBILITY NOTES
// ============================================================================

/**
 * This component follows WCAG 2.1 AA guidelines:
 *
 * - Heading Hierarchy: Proper h2, h3 structure
 * - Alt Text: Descriptive alt text for map image
 * - Semantic HTML: <ul>, <li> for list structure
 * - Not Color-Only: Checkmarks + text convey information
 * - ARIA Labels: CTA button has descriptive aria-label
 * - Screen Reader: .sr-only class for map description
 * - Keyboard Navigation: All interactive elements keyboard accessible
 * - Focus Indicators: Visible focus states on links/buttons
 * - Color Contrast: All text meets 4.5:1 minimum contrast
 * - Touch Targets: CTA button exceeds 44x44px minimum
 */

// ============================================================================
// RESPONSIVE BREAKPOINTS
// ============================================================================

/**
 * Layout behavior across screen sizes:
 *
 * Mobile (< 1024px):
 * - Single column layout
 * - Map stacked above coverage list
 * - Full width elements
 * - Reduced padding
 *
 * Desktop (≥ 1024px):
 * - Two-column grid layout
 * - Map left, coverage list right
 * - 50/50 split with gap
 * - Increased padding
 *
 * Aspect Ratio:
 * - Map maintains 16:9 ratio at all sizes
 * - Uses aspect-video Tailwind utility
 */
