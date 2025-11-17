'use client'

import React from 'react'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link
        href="/"
        className="flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-blue-400 transition-colors"
        aria-label="Home"
      >
        <Home className="h-4 w-4" aria-hidden="true" />
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <React.Fragment key={item.href}>
            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-600" aria-hidden="true" />
            {isLast ? (
              <span
                className="text-gray-900 dark:text-white font-medium"
                aria-current="page"
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-600 dark:text-gray-400 hover:text-primary-700 dark:hover:text-blue-400 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}

export default Breadcrumbs
