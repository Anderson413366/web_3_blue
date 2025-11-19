import { captureException, captureMessage } from '@sentry/nextjs'
import { createSupabaseServerAnon } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/types'

export type SubmissionResult = { success: true } | { success: false; error: string }

export type ContactSubmission = Database['public']['Tables']['contact_submissions']['Insert']
export type QuoteSubmission = Database['public']['Tables']['quote_requests']['Insert']
export type NewsletterSubmission = Database['public']['Tables']['newsletter_subscriptions']['Insert']
export type CareerSubmission = Database['public']['Tables']['career_applications']['Insert']
export type FeedbackSubmission = Database['public']['Tables']['page_feedback']['Insert']

async function insertRecord<TableName extends keyof Database['public']['Tables']>(
  table: TableName,
  payload: Database['public']['Tables'][TableName]['Insert']
): Promise<SubmissionResult> {
  try {
    const supabase = createSupabaseServerAnon()
    const { error } = await supabase.from(table).insert(payload as any)

    if (error) {
      captureException(error, { tags: { module: 'supabase', table: String(table) } })
      return { success: false, error: error.message }
    }
    captureMessage('supabase_insert_success', {
      level: 'info',
      extra: { table: String(table) },
    })
    return { success: true }
  } catch (error) {
    captureException(error, { tags: { module: 'supabase', table: String(table) } })
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export function submitContact(payload: ContactSubmission) {
  return insertRecord('contact_submissions', payload)
}

export function submitQuote(payload: QuoteSubmission) {
  return insertRecord('quote_requests', payload)
}

export function submitNewsletter(payload: NewsletterSubmission) {
  return insertRecord('newsletter_subscriptions', payload)
}

export function submitCareerApplication(payload: CareerSubmission) {
  return insertRecord('career_applications', payload)
}

export function submitFeedback(payload: FeedbackSubmission) {
  return insertRecord('page_feedback', payload)
}
