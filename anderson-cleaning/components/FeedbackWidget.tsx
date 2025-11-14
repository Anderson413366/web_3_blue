/**
 * Feedback Widget Component
 *
 * "Was this helpful?" widget for collecting user feedback
 * Features:
 * - Yes/No buttons
 * - Optional text feedback
 * - Non-intrusive design
 * - Mobile-friendly
 * - Fully accessible
 * - Analytics tracking
 */

'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Send, X } from 'lucide-react'
import { trackCustomEvent } from '@/lib/analytics/gtm'

interface FeedbackWidgetProps {
  /**
   * Page or section identifier for tracking
   */
  pageId: string
  /**
   * Optional title for the widget
   */
  title?: string
  /**
   * Position on the page
   */
  position?: 'bottom-right' | 'bottom-left' | 'inline'
}

export default function FeedbackWidget({
  pageId,
  title = 'Was this helpful?',
  position = 'inline',
}: FeedbackWidgetProps) {
  const [vote, setVote] = useState<'yes' | 'no' | null>(null)
  const [showTextInput, setShowTextInput] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleVote = (value: 'yes' | 'no') => {
    setVote(value)
    setShowTextInput(true)

    // Track vote
    trackCustomEvent('feedback_vote', {
      page_id: pageId,
      vote: value,
    })

    // If "yes", auto-submit after 2 seconds unless user types feedback
    if (value === 'yes') {
      setTimeout(() => {
        if (!feedbackText) {
          handleSubmit(value, '')
        }
      }, 2000)
    }
  }

  const handleSubmit = async (voteValue: 'yes' | 'no', text: string) => {
    setIsSubmitting(true)

    try {
      // Send feedback to API
      await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId,
          vote: voteValue,
          feedback: text,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        }),
      })

      // Track submission
      trackCustomEvent('feedback_submitted', {
        page_id: pageId,
        vote: voteValue,
        has_text: !!text,
      })

      setSubmitted(true)

      // Hide widget after 3 seconds
      setTimeout(() => {
        setSubmitted(false)
        setVote(null)
        setShowTextInput(false)
        setFeedbackText('')
      }, 3000)
    } catch (error) {
      console.error('Feedback submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTextSubmit = () => {
    if (vote) {
      handleSubmit(vote, feedbackText)
    }
  }

  const handleClose = () => {
    setVote(null)
    setShowTextInput(false)
    setFeedbackText('')
  }

  // Position classes
  const positionClasses = {
    'bottom-right': 'fixed bottom-4 right-4 z-50',
    'bottom-left': 'fixed bottom-4 left-4 z-50',
    'inline': 'relative my-8',
  }

  if (submitted) {
    return (
      <div className={`${positionClasses[position]}`}>
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg max-w-sm">
          <p className="text-green-800 dark:text-green-300 font-medium flex items-center gap-2">
            <ThumbsUp className="h-5 w-5" />
            Thank you for your feedback!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${positionClasses[position]}`}>
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg shadow-lg p-4 max-w-sm">
        {!vote ? (
          // Initial state - show yes/no buttons
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {title}
            </h3>
            <div className="flex gap-2">
              <button
                onClick={() => handleVote('yes')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg transition-colors min-h-[44px] font-medium"
                aria-label="Yes, this was helpful"
              >
                <ThumbsUp className="h-5 w-5" />
                Yes
              </button>
              <button
                onClick={() => handleVote('no')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg transition-colors min-h-[44px] font-medium"
                aria-label="No, this was not helpful"
              >
                <ThumbsDown className="h-5 w-5" />
                No
              </button>
            </div>
          </div>
        ) : showTextInput ? (
          // After vote - show optional text input
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {vote === 'yes' ? 'Great! Any additional feedback?' : 'How can we improve?'}
              </h3>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded transition-colors"
                aria-label="Close feedback"
              >
                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            <textarea
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Your feedback (optional)..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-slate-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
            />
            <div className="mt-2 flex gap-2">
              <button
                onClick={handleTextSubmit}
                disabled={isSubmitting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium min-h-[44px]"
                aria-label="Submit feedback"
              >
                {isSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit
                  </>
                )}
              </button>
              <button
                onClick={() => handleSubmit(vote, '')}
                disabled={isSubmitting}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors font-medium min-h-[44px]"
                aria-label="Skip feedback text"
              >
                Skip
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {feedbackText.length}/500 characters
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
