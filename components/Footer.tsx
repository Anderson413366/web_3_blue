'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const navigation = {
  services: [
    { name: 'Office Cleaning', href: '/services/office-cleaning' },
    { name: 'Janitorial Services', href: '/services/janitorial' },
    { name: 'Floor & Carpet Care', href: '/services/floor-carpet-care' },
    { name: 'Window Cleaning', href: '/services/window-cleaning' },
    { name: 'Post-Construction', href: '/services/post-construction' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Industries', href: '/industries' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'FAQ', href: '/faq' },
  ],
  social: [
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/company/anderson-cleaning-inc-',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ),
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/Andersonclean/',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com/andersonclean',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/andersonclean/',
      icon: (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
    },
  ],
}

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <>
      {/* CTA Section - Above Footer - Apple-style rhythm */}
      <section className="bg-gradient-to-r from-brand-bright-blue via-brand-deep-blue to-brand-deep-blue py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-3xl font-bold leading-tight text-white md:text-4xl">
            Ready to Experience Professional Cleaning?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90">
            Join 100+ businesses that trust Anderson Cleaning for their facility maintenance
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-[10px] bg-white px-7 py-[14px] text-base font-semibold text-brand-deep-blue transition-all duration-150 hover:bg-gray-100 active:bg-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              Get Your Free Quote
            </Link>
            <a
              href="tel:+14133065053"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] border-2 border-white bg-transparent px-7 py-[14px] text-base font-semibold text-white transition-all duration-150 hover:bg-white/10 active:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
            >
              <Phone className="h-5 w-5" />
              Call (413) 306-5053
            </a>
          </div>
        </div>
      </section>

      {/* Main Footer - Three Columns with Dark Mode Support */}
      <footer className="bg-neutral-off-white dark:bg-brand-deep-blue text-neutral-charcoal dark:text-white transition-colors duration-300" aria-labelledby="footer-heading">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8">
          {/* Three Columns - Clean Layout */}
          <div className="mb-12 grid grid-cols-1 gap-y-12 gap-x-8 md:grid-cols-3 md:gap-x-12">
            {/* Column 1: Our Services */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-neutral-charcoal dark:text-white">Our Services</h3>
              <ul className="space-y-2.5">
                {navigation.services.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-neutral-charcoal dark:text-white">Quick Links</h3>
              <ul className="space-y-2.5">
                {navigation.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-base text-neutral-charcoal/70 dark:text-white/75 transition-colors duration-150 hover:text-brand-bright-blue dark:hover:text-white"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Get in Touch */}
            <div>
              <h3 className="mb-4 text-base font-semibold text-neutral-charcoal dark:text-white">Get in Touch</h3>
              <div className="mt-10 space-y-5">
                <a
                  href="tel:+14133065053"
                  className="flex items-start gap-3 text-base text-neutral-charcoal/80 dark:text-white/75 transition-colors duration-150 hover:text-white/80 md:text-lg"
                >
                  <div className="w-7 flex-shrink-0">
                    <Phone className="mt-1 h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="leading-tight">(413) 306-5053</span>
                </a>
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="flex items-start gap-3 text-base text-neutral-charcoal/80 dark:text-white/75 transition-colors duration-150 hover:text-white/80 md:text-lg"
                >
                  <div className="w-7 flex-shrink-0">
                    <Mail className="mt-1 h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="leading-tight">info@andersoncleaning.com</span>
                </a>
                <div className="flex items-start gap-3 text-base text-neutral-charcoal/80 dark:text-white/75 md:text-lg">
                  <div className="w-7 flex-shrink-0">
                    <MapPin className="mt-1 h-5 w-5" aria-hidden="true" />
                  </div>
                  <span className="leading-tight">
                    103 Wayside Avenue<br />
                    West Springfield, MA 01089
                  </span>
                </div>

                {/* Social Icons - Colored in light mode, white in dark mode */}
                <div className="flex gap-3 pt-4">
                  {navigation.social.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-bright-blue/10 text-brand-bright-blue transition-all duration-150 hover:-translate-y-0.5 hover:bg-brand-bright-blue hover:text-white dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/20 dark:hover:text-white"
                      aria-label={item.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-neutral-light-grey dark:border-white/10 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-neutral-charcoal/50 dark:text-white/50 md:flex-row">
              <p>© {currentYear} Anderson Cleaning, Inc.</p>
              <div className="flex gap-4">
                <Link
                  href="/legal/privacy"
                  className="transition-colors duration-150 hover:text-neutral-charcoal dark:hover:text-white/80"
                >
                  Privacy
                </Link>
                <Link
                  href="/legal/terms"
                  className="transition-colors duration-150 hover:text-neutral-charcoal dark:hover:text-white/80"
                >
                  Terms
                </Link>
                <Link
                  href="/sitemap.xml"
                  className="transition-colors duration-150 hover:text-neutral-charcoal dark:hover:text-white/80"
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
