'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <Header />

      <main id="main-content" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12" tabIndex={-1}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
              <div className="bg-primary-700 text-white rounded-xl p-6 shadow-lg">
                <Clock className="h-12 w-12 mb-4 text-yellow-400" />
                <h3 className="text-xl font-bold mb-2">Fast Response</h3>
                <p className="text-blue-100 mb-4">
                  We respond to all inquiries within 30 minutes or less, 24/7.
                </p>
                <div className="text-sm text-blue-100">
                  Average response: <strong className="text-yellow-400">15 minutes</strong>
                </div>
              </div>

              {/* Contact Methods */}
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg space-y-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Phone</p>
                      <a
                        href="tel:+14133065053"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        (413) 306-5053
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-400">24/7 Support Line</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Email</p>
                      <a
                        href="mailto:info@andersoncleaning.com"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        info@andersoncleaning.com
                      </a>
                      <p className="text-sm text-gray-600 dark:text-gray-400">General Inquiries</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Office</p>
                      <address className="text-gray-700 dark:text-gray-300 not-italic">
                        103 Wayside Avenue
                        <br />
                        West Springfield, MA 01089
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-accent-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Office Hours</p>
                      <p className="text-gray-700 dark:text-gray-300">
                        Monday - Friday: 8am - 6pm
                        <br />
                        Saturday - Sunday: By appointment
                      </p>
                      <p className="text-sm text-accent-600 dark:text-accent-400 font-medium mt-1">
                        Support available 24/7
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div className="bg-gradient-to-br from-accent-50 to-primary-50 dark:from-slate-800 dark:to-slate-700 rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  Service Area
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-3">
                  We serve commercial facilities throughout:
                </p>
                <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent-500 mr-2 flex-shrink-0" />
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
              <div className="bg-error-light dark:bg-error-dark/20 border-l-4 border-error rounded-lg p-6">
                <p className="text-error-dark dark:text-error-light font-semibold mb-2">
                  Current Client Emergency?
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  If you're an existing client with an urgent issue, please call our 24/7 support
                  line immediately:
                </p>
                <a
                  href="tel:+14133065053"
                  className="inline-block mt-2 font-bold text-error-dark dark:text-error-light hover:underline"
                >
                  (413) 306-5053
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
