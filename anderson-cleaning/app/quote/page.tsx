import { Metadata } from 'next'
import { Phone, Mail, Clock, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Get a Free Quote | Anderson Cleaning',
  description: 'Get a free, no-obligation quote for commercial cleaning services. We respond within 30 minutes, 24/7.',
}

export default function QuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-700 rounded-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Anderson Cleaning</h1>
                <p className="text-xs text-gray-600">Get a Free Quote</p>
              </div>
            </a>
            <a href="/" className="text-primary-700 hover:text-primary-800 font-medium">
              ← Back to Home
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-2xl p-8 md:p-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Get Your Free Quote
                </h1>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll respond within 30 minutes with a customized quote for your facility.
                </p>

                <form className="space-y-6">
                  {/* Contact Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Facility Information */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Facility Information</h2>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Facility Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          placeholder="Street Address"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="City"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="State"
                            required
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="ZIP Code"
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Approximate Square Footage
                          </label>
                          <input
                            type="text"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder="e.g., 5,000 sq ft"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facility Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select facility type</option>
                            <option>Office Building</option>
                            <option>Medical Office/Clinic</option>
                            <option>Educational Facility</option>
                            <option>Manufacturing/Warehouse</option>
                            <option>Retail Store (non-food)</option>
                            <option>Property Management</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Preferred Cleaning Frequency <span className="text-red-500">*</span>
                          </label>
                          <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            required
                          >
                            <option value="">Select frequency</option>
                            <option>Daily</option>
                            <option>2-3 times per week</option>
                            <option>Weekly</option>
                            <option>Bi-weekly</option>
                            <option>Monthly</option>
                            <option>One-time project</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Desired Start Date
                          </label>
                          <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Services Needed */}
                  <div className="border-b pb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Services Needed</h2>
                    <p className="text-sm text-gray-600 mb-4">
                      Select all that apply. Note: Project/specialty services are available to contracted clients only.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Office & Commercial Cleaning</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Janitorial Services</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Floor & Carpet Care*</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Window Cleaning*</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Post-Construction Cleanup*</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="rounded text-primary-600" />
                        <span className="text-gray-700">Supply Management*</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                      * Available to contracted clients only
                    </p>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Information</h2>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tell us more about your cleaning needs
                      </label>
                      <textarea
                        rows={5}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Any specific requirements, concerns, or questions..."
                      ></textarea>
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="pt-4">
                    <label className="flex items-start">
                      <input type="checkbox" className="mt-1 mr-3" required />
                      <span className="text-sm text-gray-700">
                        I agree to be contacted by Anderson Cleaning regarding this quote request. <span className="text-red-500">*</span>
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-accent-500 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-accent-600 transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
                    >
                      <CheckCircle2 className="mr-2 h-5 w-5" />
                      Get Your Free Quote
                    </button>
                  </div>

                  <p className="text-center text-sm text-gray-600 mt-4">
                    We'll respond within 30 minutes with your personalized quote!
                  </p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Response Time */}
                <div className="bg-primary-700 text-white rounded-xl p-6 shadow-lg">
                  <Clock className="h-12 w-12 mb-4 text-yellow-400" />
                  <h3 className="text-xl font-bold mb-2">Fast Response Guaranteed</h3>
                  <p className="text-blue-100 mb-4">
                    We respond to all quote requests within 30 minutes or less, 24/7.
                  </p>
                  <div className="text-sm text-blue-100">
                    Average response time: <strong className="text-yellow-400">15 minutes</strong>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Prefer to Call?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-accent-500 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">(555) 123-4567</p>
                        <p className="text-sm text-gray-600">24/7 Availability</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Mail className="h-5 w-5 text-accent-500 mt-1" />
                      <div>
                        <p className="font-semibold text-gray-900">sales@andersoncleaning.com</p>
                        <p className="text-sm text-gray-600">Email us anytime</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What Happens Next */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold mr-3 flex-shrink-0">1</span>
                      <span>We review your request (within 30 minutes)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold mr-3 flex-shrink-0">2</span>
                      <span>Account manager contacts you to discuss details</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold mr-3 flex-shrink-0">3</span>
                      <span>Schedule a free walk-through if needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white text-xs font-bold mr-3 flex-shrink-0">4</span>
                      <span>Receive your customized proposal</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Anderson Cleaning, Inc. All rights reserved. | B2B Only
          </p>
        </div>
      </footer>
    </div>
  )
}
