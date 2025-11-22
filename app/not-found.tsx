import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export const metadata = {
  title: '404 - Page Not Found | Anderson Cleaning',
  description: 'The page you are looking for could not be found.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-off-white dark:bg-slate-900 px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <svg
            className="w-full h-64 mx-auto"
            viewBox="0 0 600 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 404 Text */}
            <text
              x="300"
              y="150"
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-brand-navy dark:fill-white/40"
              style={{ fontSize: '120px', fontWeight: 'bold', opacity: 0.1 }}
            >
              404
            </text>

            {/* Cleaning Bucket Icon */}
            <g transform="translate(250, 120)">
              <path
                d="M30 40 L50 40 L45 60 L25 60 Z"
                className="fill-brand-bright-blue dark:fill-brand-bright-blue/70"
              />
              <path
                d="M20 35 L60 35 L58 40 L22 40 Z"
                className="fill-brand-navy dark:fill-white/30"
              />
              <line
                x1="35"
                y1="35"
                x2="35"
                y2="20"
                className="stroke-neutral-charcoal dark:stroke-white/70"
                strokeWidth="2"
              />
              <path
                d="M30 20 Q35 15 40 20"
                className="stroke-neutral-charcoal dark:stroke-white/70"
                strokeWidth="2"
                fill="none"
              />
            </g>
          </svg>
        </div>

        {/* Error Message */}
        <h1 className="text-h1 font-bold text-neutral-charcoal dark:text-white mb-4">
          404
        </h1>

        <h2 className="text-h3 font-semibold text-neutral-charcoal dark:text-white mb-4">
          Page Not Found
        </h2>

        <p className="text-body text-neutral-charcoal/70 dark:text-white/80 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's
          get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="lg">
              Back to Home
            </Button>
          </Link>

          <Link href="/contact">
            <Button variant="outline" size="lg">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-neutral-charcoal/60 dark:text-white/70 mb-4">
            Maybe you were looking for:
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              href="/services"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              Our Services
            </Link>

            <span className="text-neutral-charcoal/40 dark:text-neutral-charcoal/80">•</span>

            <Link
              href="/about"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              About Us
            </Link>

            <span className="text-neutral-charcoal/40 dark:text-neutral-charcoal/80">•</span>

            <Link
              href="/quote"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              Get a Quote
            </Link>

            <span className="text-neutral-charcoal/40 dark:text-neutral-charcoal/80">•</span>

            <Link
              href="/apply"
              className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 hover:underline"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
