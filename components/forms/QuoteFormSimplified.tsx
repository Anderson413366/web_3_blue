'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Phone, Mail, CheckCircle2, Loader2, DollarSign } from 'lucide-react'
import { CONTACT_INFO } from '@/lib/constants'

// Simplified validation schema - all in one
const quoteSchema = z.object({
  // Contact Info
  fullName: z.string().min(2, 'Name is required'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().regex(/^\d{10}$|^\(\d{3}\)\s?\d{3}-\d{4}$/, 'Valid phone number required'),

  // Facility Info
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Valid 5-digit ZIP code required'),
  facilityType: z.string().min(1, 'Please select facility type'),
  squareFootage: z.number().min(1000, 'Minimum 1,000 sq ft').optional(),
  cleaningFrequency: z.string().min(1, 'Please select frequency'),

  // Optional
  desiredStartDate: z.string().optional(),
  specialRequests: z.string().max(500).optional(),
  consent: z.boolean().refine((val) => val === true, 'You must agree to be contacted'),

  // Honeypot
  website: z.string().optional(),
})

type QuoteFormData = z.infer<typeof quoteSchema>

const facilityTypes = [
  { value: 'office', label: 'Office Building' },
  { value: 'medical', label: 'Medical/Healthcare' },
  { value: 'education', label: 'School/Education' },
  { value: 'retail', label: 'Retail Store' },
  { value: 'industrial', label: 'Industrial/Warehouse' },
  { value: 'other', label: 'Other' },
]

const frequencies = [
  { value: 'daily', label: 'Daily (5x per week)', rate: 0.06 },
  { value: '3x-week', label: '3x per week', rate: 0.05 },
  { value: '2x-week', label: '2x per week', rate: 0.045 },
  { value: 'weekly', label: 'Weekly', rate: 0.04 },
  { value: 'biweekly', label: 'Bi-weekly', rate: 0.035 },
]

interface QuoteFormSimplifiedProps {
  onSuccess?: () => void
}

export default function QuoteFormSimplified({ onSuccess }: QuoteFormSimplifiedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [estimate, setEstimate] = useState<{ low: number; high: number } | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      consent: false,
    },
  })

  const squareFootage = watch('squareFootage')
  const cleaningFrequency = watch('cleaningFrequency')

  // Calculate instant estimate
  useEffect(() => {
    if (squareFootage && squareFootage >= 1000 && cleaningFrequency) {
      const freq = frequencies.find((f) => f.value === cleaningFrequency)
      if (freq) {
        const monthlyEstimate = squareFootage * freq.rate * 4.33 // 4.33 weeks per month
        setEstimate({
          low: Math.round(monthlyEstimate * 0.9),
          high: Math.round(monthlyEstimate * 1.1),
        })
      }
    } else {
      setEstimate(null)
    }
  }, [squareFootage, cleaningFrequency])

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Check honeypot
      if (data.website) {
        throw new Error('Invalid submission detected')
      }

      // Send to backend
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to submit quote request')
      }

      // Track with analytics
      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        ;(window as any).dataLayer.push({
          event: 'form_submission',
          form_name: 'quote_request_simplified',
          facility_type: data.facilityType,
          cleaning_frequency: data.cleaningFrequency,
        })
      }

      onSuccess?.()
    } catch (error) {
      console.error('Quote submission error:', error)
      setSubmitError(
        error instanceof Error
          ? error.message
          : `There was an error submitting your request. Please call us at ${CONTACT_INFO.phone.formatted}.`
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="mb-8 text-center">
        <h2 className="mb-3 text-3xl font-bold text-neutral-charcoal dark:text-white">
          Get Your Free Quote in 60 Seconds
        </h2>
        <p className="text-neutral-charcoal/70 dark:text-white/80">
          No spam, no pressure. Just honest pricing for quality commercial cleaning.
        </p>
      </div>

      {/* Trust Badges */}
      <div className="mb-8 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">No Contracts Required</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">Licensed & Insured</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span className="text-sm text-neutral-charcoal dark:text-white">24-Hour Response</span>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="rounded-xl border-2 border-neutral-light-grey bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-slate-800">
        {/* Quick Contact Option */}
        <div className="mb-6 rounded-lg border border-brand-bright-blue/30 bg-brand-bright-blue/5 p-4 dark:bg-brand-bright-blue/10">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <p className="font-semibold text-brand-bright-blue dark:text-white">Prefer to talk now?</p>
              <p className="text-sm text-neutral-charcoal/70 dark:text-white/80">
                Call us directly for immediate assistance
              </p>
            </div>
            <a
              href={CONTACT_INFO.phone.href}
              className="flex items-center gap-2 rounded-lg bg-brand-bright-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-teal-700"
            >
              <Phone className="h-5 w-5" />
              {CONTACT_INFO.phone.formatted}
            </a>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <p className="text-sm text-red-700 dark:text-red-400">{submitError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Contact Information Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-neutral-charcoal dark:text-white">
              Your Information
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('fullName')}
                  type="text"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="John Smith"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('company')}
                  type="text"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="ABC Corporation"
                />
                {errors.company && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.company.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="john@company.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('phone')}
                  type="tel"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder={CONTACT_INFO.phone.formatted}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Facility Information Section */}
          <div className="space-y-4">
            <h3 className="border-b pb-2 text-lg font-semibold text-neutral-charcoal dark:text-white">
              Facility Details
            </h3>

            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                Street Address <span className="text-red-500">*</span>
              </label>
              <input
                {...register('address')}
                type="text"
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                placeholder="123 Main Street"
              />
              {errors.address && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.address.message}</p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('city')}
                  type="text"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="Springfield"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.city.message}</p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  ZIP Code <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('zipCode')}
                  type="text"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="01089"
                  maxLength={5}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.zipCode.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Facility Type <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('facilityType')}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                >
                  <option value="">Select type...</option>
                  {facilityTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.facilityType && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.facilityType.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Approximate Square Footage
                </label>
                <input
                  {...register('squareFootage', { valueAsNumber: true })}
                  type="number"
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                  placeholder="5000"
                  min="1000"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Minimum: 1,000 sq ft</p>
                {errors.squareFootage && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.squareFootage.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  Desired Cleaning Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('cleaningFrequency')}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                >
                  <option value="">Select frequency...</option>
                  {frequencies.map((freq) => (
                    <option key={freq.value} value={freq.value}>
                      {freq.label}
                    </option>
                  ))}
                </select>
                {errors.cleaningFrequency && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.cleaningFrequency.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
                  When do you need service?
                </label>
                <input
                  {...register('desiredStartDate')}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Instant Estimate */}
          {estimate && (
            <div className="rounded-lg border-2 border-green-300 bg-green-50 p-6 dark:border-green-700 dark:bg-green-900/20">
              <div className="mb-2 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-green-700 dark:text-green-400" />
                <h3 className="text-lg font-semibold text-green-900 dark:text-green-300">
                  Estimated Monthly Investment
                </h3>
              </div>
              <p className="mb-2 text-3xl font-bold text-green-700 dark:text-green-400">
                ${estimate.low.toLocaleString()} - ${estimate.high.toLocaleString()}
              </p>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                *Final pricing based on on-site assessment
              </p>
              <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  All cleaning supplies included
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Licensed & insured staff
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  Satisfaction guaranteed
                </li>
              </ul>
            </div>
          )}

          {/* Additional Information */}
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-charcoal dark:text-white">
              Additional Information (Optional)
            </label>
            <textarea
              {...register('specialRequests')}
              rows={4}
              maxLength={500}
              className="w-full rounded-lg border-2 border-gray-300 px-4 py-2 focus:border-brand-bright-blue focus:ring-2 focus:ring-brand-bright-blue/20 dark:border-gray-600 dark:bg-slate-900 dark:text-white"
              placeholder="Tell us about any special requirements, current challenges, or questions..."
            />
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {watch('specialRequests')?.length || 0}/500 characters
            </p>
          </div>

          {/* Consent */}
          <div className="flex items-start gap-3 rounded-lg border-2 border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-slate-900">
            <input
              {...register('consent')}
              type="checkbox"
              id="consent"
              className="mt-1 h-4 w-4 rounded border-gray-300 text-brand-bright-blue focus:ring-brand-bright-blue"
            />
            <label htmlFor="consent" className="flex-1 text-sm text-neutral-charcoal/80 dark:text-white/80">
              I agree to be contacted by Anderson Cleaning regarding this quote request. We respond
              within 24 hours during office hours ({CONTACT_INFO.hours.office}).{' '}
              <span className="text-red-500">*</span>
            </label>
          </div>
          {errors.consent && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.consent.message}</p>
          )}

          {/* Honeypot */}
          <input
            {...register('website')}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="absolute left-[-9999px]"
            aria-hidden="true"
          />

          {/* Submit Button */}
          <div className="space-y-4">
            <Button
              type="submit"
              variant="accent"
              disabled={isSubmitting}
              className="w-full py-4 text-lg font-semibold"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-5 w-5" />
                  Get My Custom Quote
                </>
              )}
            </Button>

            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              <p>✓ No contracts required · ✓ Response within 24 hours · ✓ No spam</p>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom Contact */}
      <div className="mt-8 text-center">
        <p className="mb-2 text-neutral-charcoal/70 dark:text-white/80">
          Questions? Call us directly at{' '}
          <a
            href={CONTACT_INFO.phone.href}
            className="font-semibold text-brand-bright-blue hover:underline"
          >
            {CONTACT_INFO.phone.formatted}
          </a>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{CONTACT_INFO.hours.office}</p>
      </div>
    </div>
  )
}
