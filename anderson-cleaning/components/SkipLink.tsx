/**
 * Skip to Main Content Link
 *
 * Provides keyboard users a way to skip navigation and jump directly to main content.
 * Visible only when focused, positioned first in tab order.
 * WCAG 2.2 Level A requirement.
 */

'use client'

import { useEffect, useState } from 'react'

export default function SkipLink() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')

    if (mainContent) {
      mainContent.focus()
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!isMounted) return null

  return (
    <a
      href="#main-content"
      onClick={handleClick}
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}
