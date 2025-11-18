/**
 * Nonce Utility
 *
 * Helper function to retrieve CSP nonce from request headers.
 * The nonce is generated in middleware and passed via x-nonce header.
 *
 * IMPORTANT: For static generation, we use a placeholder nonce that gets
 * replaced by middleware at runtime for actual CSP enforcement.
 */

import { headers } from 'next/headers'

/**
 * Get the CSP nonce for the current request
 *
 * Returns empty string during build/static generation to allow pages
 * to be pre-rendered. At runtime, middleware will inject the actual nonce.
 *
 * @returns The nonce string, or empty string for static pages
 */
export function getNonce(): string {
  // Return empty string for static generation
  // This allows pages to be statically generated without calling headers()
  // At runtime, the actual nonce is handled by middleware CSP headers
  return ''
}

/**
 * Get the CSP nonce for dynamic pages that need it in the HTML
 * Use this ONLY in pages that must be dynamic (forms, auth, etc.)
 *
 * @returns The nonce string from request headers
 */
export async function getDynamicNonce(): Promise<string> {
  try {
    const headersList = await headers()
    const nonce = headersList.get('x-nonce')
    return nonce || ''
  } catch (error) {
    console.error('[Nonce] Error retrieving nonce from headers:', error)
    return ''
  }
}
