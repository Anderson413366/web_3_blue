'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react'

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <div className="max-w-6xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Anderson Cleaning Design System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Complete design tokens, components, and patterns for consistent, accessible UX
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full">
              Next.js 14 App Router
            </span>
            <span className="px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 rounded-full">
              TailwindCSS
            </span>
            <span className="px-3 py-1 bg-info-light dark:bg-info-dark/30 text-info-dark dark:text-info-light rounded-full">
              WCAG 2.1 AA Compliant
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-16">
          {/* Color Palette */}
          <section id="colors">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Color Palette</h2>

            {/* Primary Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Primary (Blue) - Trust & Professionalism
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`h-20 rounded-lg mb-2 border border-gray-200 dark:border-gray-700`}
                      style={{ backgroundColor: `var(--color-primary-${shade})` }}
                    />
                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Accent (Green) - Calls-to-Action & Success
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-11 gap-2">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`h-20 rounded-lg mb-2 border border-gray-200 dark:border-gray-700 bg-accent-${shade}`}
                    />
                    <p className="text-xs font-mono text-gray-600 dark:text-gray-400">{shade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic Colors */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Semantic Colors
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-success-light dark:bg-success-dark/20 border-l-4 border-success rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-success mb-2" />
                  <p className="font-semibold text-success-dark dark:text-success-light">Success</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Positive actions, completed states
                  </p>
                </div>
                <div className="p-4 bg-warning-light dark:bg-warning-dark/20 border-l-4 border-warning rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-warning mb-2" />
                  <p className="font-semibold text-warning-dark dark:text-warning-light">Warning</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Caution states, important notices
                  </p>
                </div>
                <div className="p-4 bg-error-light dark:bg-error-dark/20 border-l-4 border-error rounded-lg">
                  <AlertCircle className="h-6 w-6 text-error mb-2" />
                  <p className="font-semibold text-error-dark dark:text-error-light">Error</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Errors, destructive actions
                  </p>
                </div>
                <div className="p-4 bg-info-light dark:bg-info-dark/20 border-l-4 border-info rounded-lg">
                  <Info className="h-6 w-6 text-info mb-2" />
                  <p className="font-semibold text-info-dark dark:text-info-light">Info</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Informational messages
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Typography */}
          <section id="typography">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Typography</h2>
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">font-family: Inter</p>
                <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white">Heading 1</h1>
                <code className="text-xs text-gray-500">text-6xl font-extrabold</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h2 className="text-5xl font-bold text-gray-900 dark:text-white">Heading 2</h2>
                <code className="text-xs text-gray-500">text-5xl font-bold</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h3 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 3</h3>
                <code className="text-xs text-gray-500">text-4xl font-bold</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <h4 className="text-3xl font-semibold text-gray-900 dark:text-white">Heading 4</h4>
                <code className="text-xs text-gray-500">text-3xl font-semibold</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <p className="text-xl text-gray-700 dark:text-gray-300">
                  Body Large - Used for hero sections and important introductory text. Line height
                  is optimized for readability.
                </p>
                <code className="text-xs text-gray-500">text-xl</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <p className="text-base text-gray-700 dark:text-gray-300">
                  Body Regular - Default paragraph text with 1.5rem line height for optimal
                  readability. This is the most commonly used text size across the site.
                </p>
                <code className="text-xs text-gray-500">text-base</code>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Small - Used for secondary information, captions, and metadata.
                </p>
                <code className="text-xs text-gray-500">text-sm</code>
              </div>
            </div>
          </section>

          {/* Spacing Scale */}
          <section id="spacing">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Spacing Scale</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Consistent spacing creates visual rhythm and improves scannability for users with
              ADHD.
            </p>
            <div className="space-y-4">
              {[
                { size: '1', rem: '0.25rem', px: '4px' },
                { size: '2', rem: '0.5rem', px: '8px' },
                { size: '3', rem: '0.75rem', px: '12px' },
                { size: '4', rem: '1rem', px: '16px' },
                { size: '6', rem: '1.5rem', px: '24px' },
                { size: '8', rem: '2rem', px: '32px' },
                { size: '12', rem: '3rem', px: '48px' },
                { size: '16', rem: '4rem', px: '64px' },
                { size: '20', rem: '5rem', px: '80px' },
              ].map((space) => (
                <div key={space.size} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-mono text-gray-600 dark:text-gray-400">
                    {space.size}
                  </div>
                  <div className="flex-1 bg-gray-100 dark:bg-slate-800 rounded">
                    <div className="bg-primary-500 h-8 rounded" style={{ width: space.rem }} />
                  </div>
                  <div className="w-32 text-sm text-gray-600 dark:text-gray-400">
                    {space.rem} ({space.px})
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Buttons */}
          <section id="buttons">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Buttons</h2>
            <div className="space-y-8">
              {/* Variants */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Variants
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="outline">Secondary (Outline)</Button>
                  <Button variant="accent">Accent (CTA)</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  Sizes
                </h3>
                <div className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Medium (Default)</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>

              {/* States */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                  States
                </h3>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Default</Button>
                  <Button variant="primary" disabled>
                    Disabled
                  </Button>
                  <Button variant="primary" isLoading>
                    Loading
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Form Elements */}
          <section id="forms">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Form Elements</h2>
            <div className="max-w-2xl space-y-6">
              {/* Text Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Input
                </label>
                <input
                  type="text"
                  placeholder="Enter text..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Text Area */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Text Area
                </label>
                <textarea
                  rows={4}
                  placeholder="Enter message..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white"
                />
              </div>

              {/* Select */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Select Dropdown
                </label>
                <select className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:text-white">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>

              {/* Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="checkbox-example"
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label
                  htmlFor="checkbox-example"
                  className="text-sm text-gray-700 dark:text-gray-300"
                >
                  Checkbox example
                </label>
              </div>

              {/* Radio */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="radio-example"
                    id="radio-1"
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="radio-1" className="text-sm text-gray-700 dark:text-gray-300">
                    Radio option 1
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="radio-example"
                    id="radio-2"
                    className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                  />
                  <label htmlFor="radio-2" className="text-sm text-gray-700 dark:text-gray-300">
                    Radio option 2
                  </label>
                </div>
              </div>
            </div>
          </section>

          {/* Cards */}
          <section id="cards">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Basic Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Basic Card</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Simple card with shadow-md and rounded-xl corners.
                </p>
              </div>

              {/* Hover Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Hover Card</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Elevates on hover with smooth transition.
                </p>
              </div>

              {/* Accent Border Card */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border-l-4 border-accent-500">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Accent Border
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Left border accent for visual emphasis.
                </p>
              </div>
            </div>
          </section>

          {/* Accessibility */}
          <section id="accessibility">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Accessibility (WCAG 2.1 AA)
            </h2>
            <div className="space-y-6">
              <div className="p-6 bg-info-light dark:bg-info-dark/20 border-l-4 border-info rounded-lg">
                <h3 className="text-lg font-semibold text-info-dark dark:text-info-light mb-2">
                  ✓ Color Contrast Ratios
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                  <li>All text meets WCAG AA standards (4.5:1 minimum)</li>
                  <li>Large text meets AAA standards (3:1 minimum)</li>
                  <li>UI components have 3:1 contrast with backgrounds</li>
                </ul>
              </div>

              <div className="p-6 bg-success-light dark:bg-success-dark/20 border-l-4 border-success rounded-lg">
                <h3 className="text-lg font-semibold text-success-dark dark:text-success-light mb-2">
                  ✓ Keyboard Navigation
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                  <li>All interactive elements are keyboard accessible</li>
                  <li>Focus indicators visible with 2px outline</li>
                  <li>Logical tab order throughout pages</li>
                </ul>
              </div>

              <div className="p-6 bg-accent-100 dark:bg-accent-900/20 border-l-4 border-accent rounded-lg">
                <h3 className="text-lg font-semibold text-accent-900 dark:text-accent-300 mb-2">
                  ✓ Reduced Motion Support
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                  <li>prefers-reduced-motion media query implemented</li>
                  <li>Animations disabled for sensitive users</li>
                  <li>Smooth scrolling respects user preferences</li>
                </ul>
              </div>

              <div className="p-6 bg-gray-100 dark:bg-slate-800 border-l-4 border-gray-500 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  ✓ ADHD/OCD-Friendly Design
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 ml-4">
                  <li>Short paragraphs (max 2-3 sentences)</li>
                  <li>Clear visual hierarchy with consistent headings</li>
                  <li>Bullet points for easy scanning</li>
                  <li>Consistent spacing and alignment throughout</li>
                  <li>Predictable navigation patterns</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Design Principles */}
          <section id="principles">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Design Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                  1. Clarity First
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Every element should communicate its purpose immediately. Use clear labels,
                  descriptive headings, and obvious CTAs.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                  2. Consistent Patterns
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Reuse established patterns for buttons, forms, navigation, and layouts.
                  Consistency reduces cognitive load.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                  3. Accessibility Always
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Design for all users. Consider keyboard navigation, screen readers, color
                  blindness, and cognitive differences.
                </p>
              </div>

              <div className="p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
                <h3 className="text-xl font-bold text-primary-700 dark:text-primary-400 mb-3">
                  4. Performance Matters
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Optimize images, minimize animations for reduced-motion users, and ensure fast
                  page loads.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
