'use client'

import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
  ShieldCheck,
  BadgeCheck,
  Leaf,
  Star,
  Sun,
  Moon,
} from 'lucide-react'

import { useTheme } from '@/lib/ThemeProvider'

const navigation = {
  services: [
    { name: 'Office & Commercial Cleaning', href: '/services/office-cleaning' },
    { name: 'Janitorial Services', href: '/services/janitorial' },
    { name: 'Floor & Carpet Care', href: '/services/floor-carpet-care' },
    { name: 'Window Cleaning', href: '/services/window-cleaning' },
    { name: 'Post-Construction Cleanup', href: '/services/post-construction' },
  ],
  quickLinks: [
    { name: 'About Us', href: '/about' },
    { name: 'Industries We Serve', href: '/industries' },
    { name: 'Client Testimonials', href: '/testimonials' },
    { name: 'Blog & Resources', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
  ],
  social: [
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
  ],
}

const trustBadges = [
  { name: 'Licensed & Insured', icon: ShieldCheck },
  { name: 'OSHA Compliant', icon: BadgeCheck },
  { name: 'Eco-Friendly', icon: Leaf },
  { name: 'BBB Accredited', icon: Star },
]

const serviceAreas = [
  'Springfield',
  'Worcester',
  'Hartford',
  'Northampton',
  'Amherst',
  'Holyoke',
  'Chicopee',
  'West Springfield',
  'Westfield',
  'Enfield',
]

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* CTA Section - Above Footer */}
      <section className="bg-gradient-to-r from-brand-bright-blue via-brand-deep-blue to-brand-deep-blue py-12">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready to Experience Professional Cleaning?
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Join 100+ businesses that trust Anderson Cleaning for their facility maintenance
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-3 font-semibold text-brand-deep-blue transition-colors hover:bg-gray-50"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+14133065053"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-brand-deep-blue"
            >
              <Phone className="h-5 w-5" />
              Call (413) 306-5053
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <footer className="bg-brand-deep-blue text-gray-300" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Top Section - 4 Columns */}
          <div className="grid grid-cols-1 gap-8 border-b border-gray-800 pb-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Company Info */}
            <div>
              <div className="mb-4">
                <h3 className="mb-1 text-lg font-bold text-white">Anderson Cleaning</h3>
                <p className="text-sm text-gray-400">Commercial Cleaning Excellence Since 2007</p>
              </div>
              <p className="mb-4 text-sm leading-relaxed">
                Professional facility maintenance for businesses throughout Western Massachusetts and
                Northern Connecticut.
              </p>

              {/* Trust Badges */}
              <div className="mb-4 flex gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="rounded bg-gray-800 p-2"
                    title={badge.name}
                    aria-label={badge.name}
                  >
                    <badge.icon className="h-6 w-6 text-brand-bright-blue" aria-hidden="true" />
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Our Services */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Our Services</h4>
              <ul className="space-y-2">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-brand-bright-blue"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/quote"
                    className="text-sm font-semibold text-brand-bright-blue transition-colors hover:text-brand-bright-blue/80"
                  >
                    Get a Custom Quote →
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <ul className="space-y-2">
                {navigation.quickLinks.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm transition-colors hover:text-brand-bright-blue"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Get in Touch */}
            <div>
              <h4 className="mb-4 font-semibold text-white">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href="tel:+14133065053"
                  className="group flex items-start gap-3 text-sm transition-colors hover:text-brand-bright-blue"
                >
                  <Phone className="mt-0.5 h-5 w-5 text-gray-400 group-hover:text-brand-bright-blue" />
                  <div>
                    <div className="font-semibold">(413) 306-5053</div>
                    <div className="text-xs text-gray-500">Mon-Fri, 9 AM - 5 PM EST</div>
                  </div>
                </a>
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="group flex items-start gap-3 text-sm transition-colors hover:text-brand-bright-blue"
                >
                  <Mail className="mt-0.5 h-5 w-5 text-gray-400 group-hover:text-brand-bright-blue" />
                  <div>
                    <div>info@andersoncleaning.com</div>
                    <div className="text-xs text-gray-500">24-hour response time</div>
                  </div>
                </a>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="mt-0.5 h-5 w-5 text-gray-400" />
                  <div>
                    <div>103 Wayside Avenue</div>
                    <div>West Springfield, MA 01089</div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex gap-3 pt-3">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="rounded bg-gray-800 p-2 transition-colors hover:bg-brand-bright-blue"
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <item.icon className="h-4 w-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Service Area & Legal */}
          <div className="pt-8">
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Service Areas */}
              <div>
                <p className="mb-2 text-sm text-gray-400">
                  <span className="font-semibold text-white">Service Areas:</span>
                </p>
                <p className="text-sm text-gray-400">{serviceAreas.join(' • ')}</p>
              </div>

              {/* Certifications Text */}
              <div className="md:text-right">
                <p className="text-sm text-gray-400">
                  Licensed & Insured • OSHA Compliant • EPA Registered • Background Checked • W2
                  Employees Only
                </p>
              </div>
            </div>

            {/* Dark Mode Toggle */}
            <div className="mb-6 flex justify-center border-t border-gray-800 pt-6">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-white/70">
                  Theme
                </span>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  aria-label="Toggle dark mode"
                >
                  <span className="relative h-5 w-5 text-brand-bright-blue" aria-hidden="true">
                    <Sun
                      className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                        theme === 'dark' ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'
                      }`}
                    />
                    <Moon
                      className={`absolute inset-0 h-5 w-5 transition-all duration-200 ${
                        theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'
                      }`}
                    />
                  </span>
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div>
            </div>

            {/* Copyright and Legal Links */}
            <div className="flex flex-col items-center justify-between border-t border-gray-800 pt-6 md:flex-row">
              <p className="mb-4 text-sm text-gray-500 md:mb-0">
                © {currentYear} Anderson Cleaning, Inc. All rights reserved.
              </p>
              <div className="flex gap-6">
                {navigation.legal.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm text-gray-500 transition-colors hover:text-brand-bright-blue"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href="/sitemap.xml"
                  className="text-sm text-gray-500 transition-colors hover:text-brand-bright-blue"
                >
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
