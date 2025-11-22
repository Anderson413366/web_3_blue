'use client'

import ContactForm from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-off-white dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-h1 md:text-h1 font-extrabold text-neutral-charcoal dark:text-white mb-4">
              Get in Touch
            </h1>
            <p className="text-body text-neutral-charcoal/70 dark:text-neutral-charcoal/50 max-w-2xl mx-auto">
              Have a question? Need a quote? Want to discuss your cleaning needs? We're here to
              help.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Contact Information Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Fast Response */}
              <div className="bg-brand-navy text-white rounded-xl p-6 shadow-sm">
                <Clock className="h-12 w-12 mb-4 text-brand-emerald" />
                <h3 className="text-h3 leading-normal font-semibold mb-2">Here When You Need Us</h3>
                <p className="text-white/80 mb-4">
                  Office hours: Monday – Friday, 9 AM – 5 PM EST. We respond to all inquiries within
                  24 hours.
                </p>
                <div className="text-sm text-white/80">
                  Current clients receive 24/7 emergency support with on-site arrival in 2 hours or
                  less (premium service).
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm space-y-6">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-brand-emerald mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Phone</p>
                      <a
                        href="tel:+14133065053"
                        className="text-brand-emerald hover:underline"
                      >
                        (413) 306-5053
                      </a>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-neutral-charcoal/50">
                        24/7 emergency line for current clients
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-brand-emerald mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Email</p>
                      <a
                        href="mailto:info@andersoncleaning.com"
                        className="text-brand-emerald hover:underline"
                      >
                        info@andersoncleaning.com
                      </a>
                      <p className="text-sm text-neutral-charcoal/70 dark:text-neutral-charcoal/50">General Inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-brand-emerald mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Office</p>
                      <address className="text-neutral-charcoal/80 dark:text-white/80 not-italic">
                        103 Wayside Avenue
                        <br />
                        West Springfield, MA 01089
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-brand-emerald mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-charcoal dark:text-white">Office Hours</p>
                      <p className="text-neutral-charcoal/80 dark:text-white/80">
                        Monday – Friday: 9 AM – 5 PM EST
                      </p>
                      <p className="text-sm text-brand-emerald font-medium mt-1">
                        24/7 emergency support for current clients. On-site in 2 hours or less;
                        premium rates apply.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl p-6 shadow-sm">
                <h3 className="text-h3 leading-normal font-semibold text-neutral-charcoal dark:text-white mb-3">
                  Service Area
                </h3>
                <p className="text-neutral-charcoal/80 dark:text-white/80 mb-3">
                  We serve commercial facilities throughout:
                </p>
                <ul className="space-y-2 text-sm text-neutral-charcoal/80 dark:text-white/80">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-brand-emerald mr-2 flex-shrink-0" />
                    Western Massachusetts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                    Northern Connecticut
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
                    100-mile radius of West Springfield
                  </li>
                </ul>
              </div>

              {/* Emergency Contact */}
              <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <p className="text-red-700 dark:text-red-300 font-semibold mb-2">
                  Current Client Emergency?
                </p>
                <p className="text-sm text-neutral-charcoal/80 dark:text-white/80">
                  If you're an existing client with an urgent issue, please call our 24/7 support
                  line immediately:
                </p>
                <a
                  href="tel:+14133065053"
                  className="inline-block mt-2 font-bold text-red-700 dark:text-red-300 hover:underline"
                >
                  (413) 306-5053
                </a>
                <p className="text-xs text-neutral-charcoal/70 dark:text-neutral-charcoal/50 mt-2">
                  Premium emergency service with on-site arrival in 2 hours or less.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
