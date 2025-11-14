'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Menu, X, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/ThemeProvider'

interface HeaderProps {
  extraControls?: React.ReactNode
}

export default function Header({ extraControls }: HeaderProps = {}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Industries', href: '/industries' },
    { name: 'About', href: '/about' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/apply' },
  ]

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src="/images/logo.svg"
                alt="Anderson Cleaning Logo"
                width={160}
                height={40}
                className="h-10 w-auto dark:hidden transition-transform group-hover:scale-105"
                priority
              />
              <Image
                src="/images/logo-dark.svg"
                alt="Anderson Cleaning Logo"
                width={160}
                height={40}
                className="h-10 w-auto hidden dark:block transition-transform group-hover:scale-105"
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 shadow-md transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image
              src="/images/logo.svg"
              alt="Anderson Cleaning Logo"
              width={160}
              height={40}
              className="h-10 w-auto dark:hidden transition-transform group-hover:scale-105"
              priority
            />
            <Image
              src="/images/logo-dark.svg"
              alt="Anderson Cleaning Logo"
              width={160}
              height={40}
              className="h-10 w-auto hidden dark:block transition-transform group-hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>

            <Link href="/quote">
              <Button variant="primary" size="sm">
                Get a Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-3">
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
              <Link href="/quote" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full">
                  Get a Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
