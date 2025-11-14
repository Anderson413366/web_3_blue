'use client'

import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-accent-400 mt-1 flex-shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  103 Wayside Avenue
                  <br />
                  West Springfield, MA 01089
                </address>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="tel:+14133065053"
                  className="hover:text-accent-400 transition-colors"
                  aria-label="Call Anderson Cleaning"
                >
                  (413) 306-5053
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
                <a
                  href="mailto:info@andersoncleaning.com"
                  className="hover:text-accent-400 transition-colors"
                  aria-label="Email Anderson Cleaning"
                >
                  info@andersoncleaning.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:text-accent-400 transition-colors inline-block">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/testimonials"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/quote"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Get a Quote
                  </Link>
                </li>
                <li>
                  <Link
                    href="/apply"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Careers - Apply Now
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Blog & Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/promotions"
                    className="hover:text-accent-400 transition-colors inline-block"
                  >
                    Special Offers
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Service Area</h3>
            <p className="mb-4 leading-relaxed">
              Serving businesses within 100 miles of West Springfield, MA—including Springfield,
              Worcester, Northampton, Amherst, Hartford (CT), and more.
            </p>
            <div className="text-sm text-gray-400 border-t border-gray-700 pt-4">
              <p className="font-semibold text-gray-300 mb-1">B2B Only</p>
              <p className="text-xs">No restaurants or 7-day/week cleaning</p>
            </div>
          </div>

          {/* Social Media & Connect */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect With Us</h3>
            <p className="mb-4 leading-relaxed">
              Follow us on social media for cleaning tips, company updates, and special offers.
            </p>
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com/andersoncleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://twitter.com/andersoncleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://instagram.com/andersoncleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://linkedin.com/company/anderson-cleaning"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 hover:bg-accent-500 rounded-lg flex items-center justify-center transition-colors group"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-800">
              <p className="text-sm text-gray-400 mb-2">
                <strong className="text-gray-300">Newsletter</strong>
              </p>
              <p className="text-xs text-gray-500 mb-3">Get monthly cleaning tips & exclusive offers</p>
              <Link href="/blog#newsletter">
                <span className="inline-block text-sm text-accent-400 hover:text-accent-300 transition-colors underline underline-offset-2">
                  Subscribe Now →
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright & Legal Links */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} Anderson Cleaning, Inc. All rights reserved.
            </p>
            <nav className="flex items-center gap-6" aria-label="Legal Links">
              <Link
                href="/legal/privacy"
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/terms"
                className="text-sm text-gray-400 hover:text-accent-400 transition-colors"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
