import { Metadata } from 'next'
import Link from 'next/link'
import { WifiOff } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Offline - Anderson Cleaning',
  description: 'You are currently offline',
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-blue-100 p-6">
            <WifiOff className="h-16 w-16 text-blue-600" aria-hidden="true" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          You&apos;re Offline
        </h1>

        <p className="text-lg text-gray-600 mb-8">
          It looks like you&apos;ve lost your internet connection. Some features may not be available until you reconnect.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="block w-full bg-white hover:bg-gray-50 text-blue-600 font-semibold py-3 px-6 rounded-lg border-2 border-blue-600 transition-colors duration-200"
          >
            Go to Homepage
          </Link>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-900 mb-2">
            Offline Mode
          </h2>
          <p className="text-sm text-gray-600">
            This page is cached and available offline. Once you&apos;re back online, you&apos;ll have full access to all features.
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            Having trouble? Check your internet connection or contact your network administrator.
          </p>
        </div>
      </div>
    </div>
  )
}
