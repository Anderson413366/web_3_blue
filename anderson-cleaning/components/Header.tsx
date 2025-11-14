'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/ThemeProvider'

// ============================================================================
// PHONE ICON COMPONENT
// ============================================================================

/**
 * PhoneIcon - SVG icon for the phone number link
 * Accessible, scalable, and theme-aware
 */
const PhoneIcon = ({ className = '' }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
)

// ============================================================================
// CONSTANTS
// ============================================================================

const PHONE_NUMBER = '(413) 306-5053'
const PHONE_NUMBER_TEL = '+14133065053'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface HeaderProps {
  extraControls?: React.ReactNode
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

export default function Header({ extraControls }: HeaderProps = {}) {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  // --------------------------------------------------------------------------
  // EFFECTS
  // --------------------------------------------------------------------------
  useEffect(() => {
    setMounted(true)
  }, [])

  // --------------------------------------------------------------------------
  // NAVIGATION DATA
  // --------------------------------------------------------------------------
  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'About', href: '/about' },
    { name: 'Careers', href: '/apply' },
    { name: 'Resources', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <img
                src="/images/logo.svg"
                alt="Anderson Cleaning Logo"
                className="h-10 w-auto dark:hidden transition-transform group-hover:scale-105"
              />
              <img
                src="/images/logo-dark.svg"
                alt="Anderson Cleaning Logo"
                className="h-10 w-auto hidden dark:block transition-transform group-hover:scale-105"
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ================================================================
              LOGO SECTION
              ================================================================ */}
          <Link href="/" className="flex items-center space-x-2 group">
            <img
              src="/images/logo.svg"
              alt="Anderson Cleaning Logo"
              className="h-10 w-auto dark:hidden transition-transform group-hover:scale-105"
            />
            <img
              src="/images/logo-dark.svg"
              alt="Anderson Cleaning Logo"
              className="h-10 w-auto hidden dark:block transition-transform group-hover:scale-105"
            />
          </Link>

          {/* ================================================================
              DESKTOP NAVIGATION & CONTROLS
              ================================================================ */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-blue-400 font-medium transition"
              >
                {item.name}
              </Link>
            ))}

            {/* Extra Controls (e.g., Language Switcher) */}
            {extraControls}

            {/* Phone Number Link
                - Visible on desktop (md+), hidden on mobile (< 768px)
                - Hidden on small screens (< 480px) via custom media query
                - Uses design system color variable
                - Minimum 44px touch target for accessibility
                - Includes phone icon for visual clarity
            */}
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="
                hidden sm:flex items-center gap-2
                text-[var(--color-primary-base)]
                hover:text-[var(--color-primary-hover)]
                font-semibold
                text-base
                transition-[var(--transition-colors)]
                min-h-[44px] min-w-[44px]
                px-3 py-2
                rounded-lg
                hover:bg-gray-100 dark:hover:bg-slate-800
                focus-visible:outline-[var(--color-primary-base)]
                focus-visible:outline-2
                focus-visible:outline-offset-2
              "
              aria-label="Call Anderson Cleaning"
            >
              <PhoneIcon className="h-5 w-5 flex-shrink-0" />
              <span className="hidden lg:inline whitespace-nowrap">{PHONE_NUMBER}</span>
            </a>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            {/* Get a Quote Button */}
            <Link href="/quote">
              <Button variant="primary" size="sm">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* ================================================================
              MOBILE MENU CONTROLS
              ================================================================ */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Phone Link - Mobile (Icon Only) */}
            <a
              href={`tel:${PHONE_NUMBER_TEL}`}
              className="
                p-2 rounded-lg
                text-[var(--color-primary-base)]
                hover:text-[var(--color-primary-hover)]
                hover:bg-gray-100 dark:hover:bg-slate-800
                transition-colors
                min-h-[44px] min-w-[44px]
                flex items-center justify-center
              "
              aria-label="Call Anderson Cleaning"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>

            {/* Theme Toggle - Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            {/* Menu Toggle - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors min-h-[44px] min-w-[44px]"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* ================================================================
            MOBILE NAVIGATION MENU
            ================================================================ */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700"
            aria-label="Mobile Navigation"
          >
            <div className="flex flex-col space-y-3">
              {/* Phone Number Link - Full display in mobile menu */}
              <a
                href={`tel:${PHONE_NUMBER_TEL}`}
                className="
                  flex items-center gap-3
                  text-[var(--color-primary-base)]
                  hover:text-[var(--color-primary-hover)]
                  font-semibold
                  text-base
                  py-3 px-4
                  rounded-lg
                  hover:bg-gray-100 dark:hover:bg-slate-800
                  transition-colors
                  min-h-[44px]
                  border-2 border-[var(--color-primary-base)]
                  bg-[var(--color-primary-light)]
                  dark:bg-[var(--color-primary-900)]/20
                "
                aria-label="Call Anderson Cleaning"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PhoneIcon className="h-5 w-5 flex-shrink-0" />
                <span>{PHONE_NUMBER}</span>
              </a>

              {/* Navigation Links */}
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-blue-400 font-medium py-2 px-4 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              {/* Extra Controls in Mobile (e.g., Language Switcher) */}
              {extraControls && <div className="px-4 py-2">{extraControls}</div>}

              {/* Get a Quote Button */}
              <Link href="/quote" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
