/**
 * CSP Nonce Helper
 *
 * Provides access to the CSP nonce generated in middleware.
 * Used for inline scripts that need to bypass CSP restrictions.
 */

import { headers } from 'next/headers'

/**
 * Get the CSP nonce for the current request
 *
 * This nonce is generated in middleware and passed via x-nonce header.
 * Use it in script tags to bypass CSP restrictions for inline scripts.
 *
 * @example
 * ```tsx
 * import { getNonce } from '@/lib/security/nonce'
 *
 * export default function Layout() {
 *   const nonce = getNonce()
 *
 *   return (
 *     <html>
 *       <head>
 *         <script
 *           nonce={nonce}
 *           dangerouslySetInnerHTML={{
 *             __html: `console.log('Inline script with nonce')`
 *           }}
 *         />
 *       </head>
 *     </html>
 *   )
 * }
 * ```
 */
export function getNonce(): string | undefined {
  const headersList = headers()
  return headersList.get('x-nonce') || undefined
}

/**
 * Get the CSP nonce for the current request (async version)
 *
 * Use this in async server components or server actions.
 */
export async function getNonceAsync(): Promise<string | undefined> {
  const headersList = await headers()
  return headersList.get('x-nonce') || undefined
}
