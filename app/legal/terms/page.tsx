'use client'

import Link from 'next/link'
import { Scale, Download, Mail } from 'lucide-react'

const pageInfo = {
  title: 'Terms of Service | Anderson Cleaning',
  description: 'Terms and conditions for using Anderson Cleaning services and website.',
  robots: {
    index: false,
    follow: true,
  },
}

const lastUpdated = 'January 15, 2025'

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Legal Disclaimer Banner */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-2 text-sm text-blue-900 dark:text-blue-300">
            <Scale className="h-4 w-4" />
            <span>
              This is a legal document. For questions, contact{' '}
              <a href="mailto:legal@andersoncleaning.com" className="underline font-medium">
                legal@andersoncleaning.com
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Last Updated: <time dateTime="2025-01-15">{lastUpdated}</time>
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Print / Save as PDF
            </button>
            <Link
              href="/legal/privacy"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            >
              View Privacy Policy
            </Link>
          </div>
        </div>

        {/* Table of Contents */}
        <nav className="mb-12 p-6 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-2 text-sm">
            <li>
              <a
                href="#acceptance"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                1. Acceptance of Terms
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                2. Services Description
              </a>
            </li>
            <li>
              <a
                href="#exclusions"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                3. Service Exclusions
              </a>
            </li>
            <li>
              <a
                href="#service-area"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                4. Service Area Limitation
              </a>
            </li>
            <li>
              <a href="#quotes" className="text-primary-600 dark:text-primary-400 hover:underline">
                5. Quotes and Pricing
              </a>
            </li>
            <li>
              <a
                href="#intellectual-property"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                6. Intellectual Property
              </a>
            </li>
            <li>
              <a
                href="#liability"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                7. Limitation of Liability
              </a>
            </li>
            <li>
              <a
                href="#dispute-resolution"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                8. Dispute Resolution
              </a>
            </li>
            <li>
              <a
                href="#governing-law"
                className="text-primary-600 dark:text-primary-400 hover:underline"
              >
                9. Governing Law
              </a>
            </li>
            <li>
              <a href="#changes" className="text-primary-600 dark:text-primary-400 hover:underline">
                10. Changes to Terms
              </a>
            </li>
            <li>
              <a href="#contact" className="text-primary-600 dark:text-primary-400 hover:underline">
                11. Contact Information
              </a>
            </li>
          </ol>
        </nav>

        {/* Content - see continuation in next message due to length */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            [Full terms content would continue here - file is being created in sections]
          </p>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            font-size: 12pt;
            line-height: 1.5;
          }
          h1 {
            font-size: 24pt;
          }
          h2 {
            font-size: 18pt;
            page-break-after: avoid;
          }
          h3 {
            font-size: 14pt;
            page-break-after: avoid;
          }
          section {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  )
}
