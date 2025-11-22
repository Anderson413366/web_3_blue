'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import { contactFormSchema, type ContactFormData } from '@/lib/validation/quote'
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  onSuccess?: () => void
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitStatus('idle')

      // Check honeypot field (client-side check)
      if (data.website) {
        throw new Error('Invalid submission detected')
      }

      // Send to backend API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to send message')
      }

      // Track with Google Analytics dataLayer
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'form_submission',
          form_name: 'contact_form',
          form_type: 'simple',
        })
      }

      // Success!
      setSubmitStatus('success')
      reset()
      onSuccess?.()

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error) {
      console.error('Contact submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-neutral-light-grey dark:border-slate-700 rounded-xl shadow-sm p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h2 className="text-h3 font-bold text-neutral-charcoal dark:text-white mb-2">
            Send Us a Message
          </h2>
          <p className="text-neutral-charcoal/70 dark:text-neutral-charcoal/50">
            Fill out the form below and we'll get back to you within 1 business day.
          </p>
        </div>

        {/* Success Message */}
        {submitStatus === 'success' && (
          <div className="rounded-lg bg-brand-emerald/10 border border-brand-emerald/30 p-4 flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-brand-emerald flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-brand-navy mb-1">
                Message Sent Successfully!
              </h4>
              <p className="text-sm text-brand-navy/80">
                Thank you for contacting us. We'll respond to your message within 1 business day.
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {submitStatus === 'error' && (
          <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                Submission Error
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400">
                There was an error sending your message. Please try again or call us at (413)
                306-5053.
              </p>
            </div>
          </div>
        )}

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-2"
          >
            Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register('name')}
            type="text"
            id="name"
            className="w-full px-4 py-2 border border-neutral-light-grey dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-neutral-charcoal dark:text-white focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
            placeholder="John Smith"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-2"
          >
            Email Address <span className="text-red-500">*</span>
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-2 border border-neutral-light-grey dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-neutral-charcoal dark:text-white focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-2"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register('phone')}
            type="tel"
            id="phone"
            autoComplete="tel"
            className="w-full px-4 py-2 border border-neutral-light-grey dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-neutral-charcoal dark:text-white focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
            placeholder="(413) 306-5053"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-neutral-charcoal/80 dark:text-white/80 mb-2"
          >
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            maxLength={1000}
            className="w-full px-4 py-2 border border-neutral-light-grey dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-neutral-charcoal dark:text-white focus:ring-2 focus:ring-brand-emerald focus:border-brand-emerald"
            placeholder="Tell us about your cleaning needs, questions, or concerns..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>
          )}
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          {...register('website')}
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="absolute left-[-9999px]"
          aria-hidden="true"
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Sending Message...
            </>
          ) : (
            <>
              <Send className="h-5 w-5 mr-2" />
              Send Message
            </>
          )}
        </Button>

        <p className="text-xs text-neutral-charcoal/60 dark:text-neutral-charcoal/50 text-center">
          By submitting this form, you agree to be contacted by Anderson Cleaning regarding your
          inquiry.
        </p>
      </form>
    </div>
  )
}
