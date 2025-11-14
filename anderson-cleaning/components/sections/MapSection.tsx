'use client'

import React from 'react'
import { MapPin, CheckCircle2 } from 'lucide-react'

export interface MapSectionProps {
  /**
   * Show service area list
   * @default true
   */
  showServiceAreas?: boolean
  /**
   * Custom height for map
   * @default 'h-96'
   */
  height?: string
  /**
   * Center coordinates [latitude, longitude]
   * @default [42.1070, -72.6209] (West Springfield, MA)
   */
  center?: [number, number]
}

/**
 * Map section showing service area with iframe embed
 *
 * Features:
 * - Google Maps iframe integration
 * - Service area list
 * - 100-mile radius indicator
 * - Responsive design
 * - WCAG 2.1 AA compliant
 *
 * @example
 * <MapSection showServiceAreas />
 */
export default function MapSection({
  showServiceAreas = true,
  height = 'h-96',
  center = [42.107, -72.6209], // West Springfield, MA
}: MapSectionProps) {
  const serviceAreas = [
    { city: 'Springfield', state: 'MA' },
    { city: 'Worcester', state: 'MA' },
    { city: 'Northampton', state: 'MA' },
    { city: 'Hartford', state: 'CT' },
    { city: 'Holyoke', state: 'MA' },
    { city: 'Chicopee', state: 'MA' },
    { city: 'Westfield', state: 'MA' },
    { city: 'Enfield', state: 'CT' },
  ]

  // Generate Google Maps embed URL
  // Note: In production, replace with actual Google Maps API key
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d189452.7471825!2d-72.7209!3d42.1070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e6e625e1c22a23%3A0x94a15e5a7ac5e33e!2sWest%20Springfield%2C%20MA!5e0!3m2!1sen!2sus!4v1234567890`

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Map */}
        <div className="order-2 lg:order-1">
          <div
            className={`relative ${height} rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-slate-700`}
          >
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Anderson Cleaning Service Area Map"
              className="absolute inset-0"
            />
          </div>

          {/* Map Legend */}
          <div className="mt-4 bg-info-light dark:bg-info-dark/20 border-l-4 border-info rounded-lg p-4">
            <p className="text-sm text-info-dark dark:text-info-light flex items-center">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
              <strong className="mr-2">Service Radius:</strong>
              100 miles from West Springfield, MA
            </p>
          </div>
        </div>

        {/* Service Areas List */}
        {showServiceAreas && (
          <div className="order-1 lg:order-2">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Service Area
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We proudly serve commercial facilities throughout:
              </p>

              <div className="space-y-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                    <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2" />
                    Primary Service Areas
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {serviceAreas.map((area, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-700 dark:text-gray-300"
                      >
                        <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                        <span>
                          {area.city}, {area.state}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Coverage Area
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Western Massachusetts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>Northern Connecticut</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>100-mile radius from West Springfield</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-slate-700 dark:to-slate-600 rounded-lg p-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong className="text-gray-900 dark:text-gray-100">Don't see your city?</strong>
                  <br />
                  Contact us—we may serve your area or be planning expansion!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
