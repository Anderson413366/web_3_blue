/**
 * Sanity Client Configuration
 *
 * Provides both CDN and live client instances for optimal performance
 * - CDN client: Fast, cached reads for production
 * - Live client: Real-time data for preview mode
 */

import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

// CDN Client - Fast, cached reads for production
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN for faster cached responses
  perspective: 'published', // Only return published documents
})

// Live Client - Real-time data for preview mode
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Disable CDN for live data
  perspective: 'previewDrafts', // Include draft documents
  token: process.env.SANITY_API_READ_TOKEN, // Required for reading drafts
})

// Helper: Get client based on preview mode
export function getClient(preview: boolean = false) {
  return preview ? previewClient : client
}

// Type for Sanity config
export const sanityConfig = {
  projectId,
  dataset,
  apiVersion,
}

// ISR Revalidation helpers
export const REVALIDATE_TIME = {
  HOMEPAGE: 60, // 1 minute
  SERVICES: 300, // 5 minutes
  INDUSTRIES: 300, // 5 minutes
  TESTIMONIALS: 600, // 10 minutes
  BLOG: 300, // 5 minutes
  SETTINGS: 3600, // 1 hour
}
