'use client'

/**
 * Sanity Studio
 *
 * Content management interface for Anderson Cleaning
 * Access at: /studio
 *
 * NOTE: This route should be protected with authentication in production
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
