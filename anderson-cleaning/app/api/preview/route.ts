import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

/**
 * Preview Mode API Route
 *
 * Enables draft mode for previewing unpublished content
 *
 * Usage:
 * /api/preview?secret=YOUR_SECRET&slug=/your-page-slug
 *
 * Example:
 * /api/preview?secret=my-secret-token&slug=/services/office-cleaning
 */

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl

  // Check the secret
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  // Validate secret
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid token', { status: 401 })
  }

  // Enable Draft Mode
  const draft = await draftMode()
  draft.enable()

  // Redirect to the path from the fetched content
  redirect(slug)
}
