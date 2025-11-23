'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Mail, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/lib/ThemeProvider'

// Simplified navigation - FAQ, Blog, Testimonials, Careers moved to Footer Quick Links
const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Industries', href: '/industries' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Determine if we're on the home page
  const isHomePage = pathname === '/'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white/85 backdrop-blur-lg transition-all duration-300 dark:bg-brand-deep-blue/85 ${
        scrolled ? 'shadow-md border-b border-neutral-light-grey dark:border-white/10' : 'shadow-sm'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-5 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 transition-opacity hover:opacity-80">
            <span className="sr-only">Anderson Cleaning</span>
            {/* Desktop Logo - Swaps to white in dark mode, hidden on mobile */}
            <img
              src="/brand/color/logo-full-2000.png"
              alt="Anderson Cleaning"
              className="logo-desktop"
            />
            {/* Mobile Logo Icon - Swaps to white in dark mode, shows only on mobile */}
            <img
              src="/brand/color/logo-icon-512.png"
              alt="Anderson Cleaning"
              className="logo-mobile"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-charcoal dark:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`relative text-sm font-medium leading-6 transition-all duration-150 ${
                pathname === item.href
                  ? 'text-brand-bright-blue'
                  : 'text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-white/80'
              }`}
            >
              {item.name}
              {pathname === item.href && (
                <span className="absolute -bottom-5 left-0 right-0 h-0.5 bg-brand-bright-blue rounded-full" />
              )}
            </Link>
          ))}
        </div>

        {/* Dark Mode Toggle & CTA Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-5">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2.5 text-neutral-charcoal dark:text-white hover:bg-neutral-light-grey dark:hover:bg-white/10 transition-all duration-150"
            aria-label="Toggle dark mode"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
          <Link
            href="/quote"
            className="rounded-[10px] bg-brand-bright-blue px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#006bc4] active:bg-[#005aa3] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright-blue focus-visible:ring-offset-2"
          >
            Get a Quote
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-[9999] w-full overflow-y-auto bg-white dark:bg-brand-deep-blue px-6 py-6 sm:max-w-sm sm:shadow-2xl">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Anderson Cleaning</span>
                <img
                  src="/brand/color/logo-icon-512.png"
                  alt="Anderson Cleaning"
                  className="h-10 w-auto dark:hidden"
                  width="40"
                  height="40"
                />
                <img
                  src="/brand/white/logo-icon-512-white.png"
                  alt="Anderson Cleaning"
                  className="hidden h-10 w-auto dark:block"
                  width="40"
                  height="40"
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-full p-2.5 text-neutral-charcoal dark:text-white hover:bg-neutral-light-grey dark:hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-body-sm font-semibold leading-7 hover:bg-neutral-light-grey dark:hover:bg-slate-800 ${
                        pathname === item.href
                          ? 'text-brand-bright-blue bg-neutral-light-grey dark:bg-slate-800'
                          : 'text-neutral-charcoal dark:text-white'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6">
                  <Link
                    href="/quote"
                    className="block w-full rounded-[10px] bg-brand-bright-blue px-7 py-4 text-center text-base font-semibold text-white shadow-sm hover:bg-[#006bc4] active:bg-[#005aa3] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-bright-blue focus-visible:ring-offset-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Get a Quote
                  </Link>
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={toggleTheme}
                      className="flex w-full items-center gap-2 text-sm text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-brand-bright-blue/90"
                    >
                      {theme === 'dark' ? (
                        <>
                          <Sun className="h-4 w-4" />
                          Light Mode
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4" />
                          Dark Mode
                        </>
                      )}
                    </button>
                    <a
                      href="tel:4133065053"
                      className="flex items-center gap-2 text-sm text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-brand-bright-blue/90"
                    >
                      <Phone className="h-4 w-4" />
                      (413) 306-5053
                    </a>
                    <a
                      href="mailto:info@andersoncleaning.com"
                      className="flex items-center gap-2 text-sm text-neutral-charcoal dark:text-white hover:text-brand-bright-blue dark:hover:text-brand-bright-blue/90"
                    >
                      <Mail className="h-4 w-4" />
                      info@andersoncleaning.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
