'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service (Sentry)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-gray-100 dark:from-gray-900 dark:to-red-900/20 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Illustration */}
        <div className="mb-8">
          <svg
            className="w-full h-64 mx-auto"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background */}
            <circle
              cx="300"
              y="150"
              r="100"
              className="fill-red-100 dark:fill-red-900/30"
            />

            {/* Broken Broom Icon */}
            <g transform="translate(280, 100)">
              {/* Broom handle (broken) */}
              <line
                x1="20"
                y1="10"
                x2="25"
                y2="40"
                className="stroke-gray-600 dark:stroke-gray-400"
                strokeWidth="3"
              />
              <line
                x1="25"
                y1="45"
                x2="30"
                y2="75"
                className="stroke-gray-600 dark:stroke-gray-400"
                strokeWidth="3"
              />

              {/* Break indicator */}
              <circle cx="27" cy="42" r="4" className="fill-red-500" />

              {/* Broom bristles */}
              <path
                d="M25 75 L15 95 L35 95 Z"
                className="fill-amber-600 dark:fill-amber-500"
              />
            </g>

            {/* Alert icon */}
            <circle
              cx="350"
              cy="120"
              r="20"
              className="fill-red-500 dark:fill-red-600"
            />
            <text
              x="350"
              y="130"
              textAnchor="middle"
              className="fill-white text-2xl font-bold"
            >
              !
            </text>
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Oops!
        </h1>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Something went wrong
        </h2>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2 max-w-md mx-auto">
          We encountered an unexpected error. Our team has been notified and
          we're working to fix it.
        </p>

        {/* Error details for development */}
        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg max-w-md mx-auto">
            <p className="text-sm text-red-800 dark:text-red-300 font-mono text-left break-all">
              {error.message}
            </p>
          </div>
        )}

        {error.digest && (
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
            Error ID: {error.digest}
          </p>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button variant="primary" size="lg" onClick={reset}>
            Try Again
          </Button>

          <Link href="/">
            <Button variant="outline" size="lg">
              Go to Homepage
            </Button>
          </Link>
        </div>

        {/* Support Information */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Need immediate assistance?
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <a
              href="tel:+14133065053"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              Call (413) 306-5053
            </a>

            <span className="hidden sm:inline text-gray-300 dark:text-gray-700">
              •
            </span>

            <Link
              href="/contact"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
