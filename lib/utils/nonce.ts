/**
 * Nonce Utility
 *
 * Helper function to retrieve CSP nonce from request headers.
 * The nonce is generated in middleware and passed via x-nonce header.
 */

import { headers } from 'next/headers'

/**
 * Get the CSP nonce for the current request
 * Must be called from a Server Component
 *
 * @returns The nonce string, or empty string if not available
 */
export async function getNonce(): Promise<string> {
  try {
    const headersList = await headers()
    const nonce = headersList.get('x-nonce')
    return nonce || ''
  } catch (error) {
    console.error('[Nonce] Error retrieving nonce from headers:', error)
    return ''
  }
}
