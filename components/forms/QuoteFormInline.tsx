/**
 * QuoteFormInline
 *
 * Purpose: Compact inline quote form for homepage hero section
 * Location: Homepage hero, can be used in other prominent locations
 *
 * Features:
 * - Client-side validation with real-time feedback
 * - Phone number input masking (555) 123-4567 format
 * - Facility type dropdown selection
 * - Full WCAG 2.1 AA accessibility compliance
 * - Success/error state management
 * - Design system integration
 *
 * Accessibility:
 * - All inputs have associated labels
 * - Error messages with role="alert" and aria-describedby
 * - aria-invalid on error states
 * - Keyboard navigable
 * - Focus management (first error field on submit)
 * - Screen reader friendly announcements
 */

'use client'

import React, { useState, FormEvent, ChangeEvent } from 'react'
import { CheckCircle2, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { submitQuickQuoteRequest } from '@/lib/forms/quickQuoteClient'
import {
  FACILITY_TYPES,
  ERROR_MESSAGES,
  RESPONSE_TIME_TEXT,
  formatPhoneNumber,
  isValidEmail,
  isValidPhone,
  isValidName,
} from '@/components/forms/quickQuoteHelpers'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface FormData {
  name: string
  email: string
  phone: string
  facilityType: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  facilityType?: string
}

interface QuoteFormInlineProps {
  /**
   * Callback function when form is successfully submitted
   * @param data - The submitted form data
   */
  onSubmitSuccess?: (data: FormData) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Form variant for different placements
   * @default "default"
   */
  variant?: 'default' | 'compact'
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function QuoteFormInline({
  onSubmitSuccess,
  className = '',
  variant = 'default',
}: QuoteFormInlineProps) {
  // --------------------------------------------------------------------------
  // STATE
  // --------------------------------------------------------------------------

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    facilityType: '',
  })

  // Validation errors state
  const [errors, setErrors] = useState<FormErrors>({})

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  // Track which fields have been touched (for validation UX)
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  /**
   * Handle input changes with phone number formatting
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Apply phone number formatting
    if (name === 'phone') {
      const formattedPhone = formatPhoneNumber(value)
      setFormData((prev) => ({ ...prev, [name]: formattedPhone }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  /**
   * Handle input blur (mark field as touched)
   */
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    // Validate field on blur
    validateField(name as keyof FormData, formData[name as keyof FormData])
  }

  /**
   * Validate individual field
   */
  const validateField = (fieldName: keyof FormData, value: string): boolean => {
    let error: string | undefined

    switch (fieldName) {
      case 'name':
        if (!isValidName(value)) {
          error = ERROR_MESSAGES.name
        }
        break
      case 'email':
        if (!isValidEmail(value)) {
          error = ERROR_MESSAGES.email
        }
        break
      case 'phone':
        if (!isValidPhone(value)) {
          error = ERROR_MESSAGES.phone
        }
        break
      case 'facilityType':
        if (!value) {
          error = ERROR_MESSAGES.facilityType
        }
        break
    }

    setErrors((prev) => ({ ...prev, [fieldName]: error }))
    return !error
  }

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {}

    if (!isValidName(formData.name)) {
      newErrors.name = ERROR_MESSAGES.name
    }
    if (!isValidEmail(formData.email)) {
      newErrors.email = ERROR_MESSAGES.email
    }
    if (!isValidPhone(formData.phone)) {
      newErrors.phone = ERROR_MESSAGES.phone
    }
    if (!formData.facilityType) {
      newErrors.facilityType = ERROR_MESSAGES.facilityType
    }

    setErrors(newErrors)
    return newErrors
  }

  const focusFirstErrorField = (formErrors: FormErrors) => {
    const firstErrorField = Object.keys(formErrors)[0]
    if (!firstErrorField) return

    document.getElementById(firstErrorField)?.focus()
  }

  const resetInlineForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      facilityType: '',
    })
    setTouched({})
    setIsSuccess(false)
    setSubmitError(null)
    setHoneypot('')
  }

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setTouched({
      name: true,
      email: true,
      phone: true,
      facilityType: true,
    })

    const formErrors = validateForm()
    if (Object.keys(formErrors).length > 0) {
      focusFirstErrorField(formErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)

    try {
      await submitQuickQuoteRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        facilityType: formData.facilityType,
        source: variant === 'compact' ? 'inline-compact' : 'inline',
        website: honeypot,
      })

      setIsSuccess(true)
      onSubmitSuccess?.(formData)
      setTimeout(resetInlineForm, 3000)
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your request right now. Please try again shortly.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // --------------------------------------------------------------------------
  // RENDER
  // --------------------------------------------------------------------------

  return (
    <div
      className={`
        bg-white dark:bg-slate-800
        rounded-[var(--border-radius-lg)]
        shadow-[var(--shadow-card)]
        p-8
        max-w-[500px]
        w-full
        border border-gray-200 dark:border-slate-700
        transition-[var(--transition-all)]
        ${className}
      `}
    >
      {/* Form Title */}
      <h3 className="text-h3 font-bold text-[var(--color-text-primary)] mb-2">
        Get Your Free Quote
      </h3>
      <p className="text-[var(--color-text-secondary)] mb-6">
        Fill out the form below and we'll get back to you within 24 hours (Monday – Friday, 9 AM – 5
        PM EST).
      </p>

      {/* Success Message */}
      {isSuccess && (
        <div
          className="
            mb-6 p-4 rounded-lg
            bg-[var(--color-success-light)]
            border-2 border-[var(--color-success-base)]
            text-[var(--color-success-dark)]
          "
          role="alert"
          aria-live="polite"
        >
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 text-brand-bright-blue flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Thank you for your request!</p>
              <p className="text-sm mt-1">
                We'll contact you within 24 hours during office hours. Current clients have 24/7
                emergency support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot field for spam prevention (intentionally hidden from real users) */}
        <div className="sr-only" aria-hidden="true">
          <label htmlFor="website" className="block text-sm font-semibold text-neutral-charcoal/80">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2"
          >
            Full Name <span className="text-[var(--color-error-base)]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            className={`
              w-full
              min-h-[44px]
              px-4 py-2
              text-body-sm
              bg-white dark:bg-slate-900
              border-2
              ${errors.name && touched.name
                ? 'border-[var(--color-error-base)]'
                : 'border-gray-300 dark:border-slate-600'
              }
              rounded-lg
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              focus:outline-none
              focus:border-[var(--color-primary-base)]
              focus:ring-2
              focus:ring-[var(--color-primary-base)]/20
              transition-[var(--transition-colors)]
            `}
            placeholder="John Doe"
            required
          />
          {errors.name && touched.name && (
            <p
              id="name-error"
              role="alert"
              className="mt-2 text-sm text-[var(--color-error-base)] flex items-start gap-1"
            >
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Submission Error */}
        {submitError && (
          <div
            className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {submitError}
          </div>
        )}

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2"
          >
            Business Email <span className="text-[var(--color-error-base)]">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            className={`
              w-full
              min-h-[44px]
              px-4 py-2
              text-body-sm
              bg-white dark:bg-slate-900
              border-2
              ${errors.email && touched.email
                ? 'border-[var(--color-error-base)]'
                : 'border-gray-300 dark:border-slate-600'
              }
              rounded-lg
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              focus:outline-none
              focus:border-[var(--color-primary-base)]
              focus:ring-2
              focus:ring-[var(--color-primary-base)]/20
              transition-[var(--transition-colors)]
            `}
            placeholder="john@company.com"
            required
          />
          {errors.email && touched.email && (
            <p
              id="email-error"
              role="alert"
              className="mt-2 text-sm text-[var(--color-error-base)] flex items-start gap-1"
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2"
          >
            Phone Number <span className="text-[var(--color-error-base)]">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            className={`
              w-full
              min-h-[44px]
              px-4 py-2
              text-body-sm
              bg-white dark:bg-slate-900
              border-2
              ${errors.phone && touched.phone
                ? 'border-[var(--color-error-base)]'
                : 'border-gray-300 dark:border-slate-600'
              }
              rounded-lg
              text-[var(--color-text-primary)]
              placeholder:text-[var(--color-text-tertiary)]
              focus:outline-none
              focus:border-[var(--color-primary-base)]
              focus:ring-2
              focus:ring-[var(--color-primary-base)]/20
              transition-[var(--transition-colors)]
            `}
            placeholder="(555) 123-4567"
            maxLength={14}
            required
          />
          {errors.phone && touched.phone && (
            <p
              id="phone-error"
              role="alert"
              className="mt-2 text-sm text-[var(--color-error-base)] flex items-start gap-1"
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Facility Type Field */}
        <div className="mb-6">
          <label
            htmlFor="facilityType"
            className="block text-sm font-semibold text-[var(--color-text-primary)] mb-2"
          >
            Facility Type <span className="text-[var(--color-error-base)]">*</span>
          </label>
          <select
            id="facilityType"
            name="facilityType"
            value={formData.facilityType}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.facilityType}
            aria-describedby={errors.facilityType ? 'facilityType-error' : undefined}
            className={`
              w-full
              min-h-[44px]
              px-4 py-2
              text-body-sm
              bg-white dark:bg-slate-900
              border-2
              ${errors.facilityType && touched.facilityType
                ? 'border-[var(--color-error-base)]'
                : 'border-gray-300 dark:border-slate-600'
              }
              rounded-lg
              text-[var(--color-text-primary)]
              focus:outline-none
              focus:border-[var(--color-primary-base)]
              focus:ring-2
              focus:ring-[var(--color-primary-base)]/20
              transition-[var(--transition-colors)]
              cursor-pointer
            `}
            required
          >
            {FACILITY_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.facilityType && touched.facilityType && (
            <p
              id="facilityType-error"
              role="alert"
              className="mt-2 text-sm text-[var(--color-error-base)] flex items-start gap-1"
            >
              <AlertTriangle className="h-4 w-4" aria-hidden="true" />
              <span>{errors.facilityType}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="accent"
          className="w-full min-h-[48px] text-body-sm font-semibold"
          disabled={isSubmitting || isSuccess}
        >
          {isSubmitting ? 'Submitting...' : isSuccess ? 'Submitted!' : 'Get Free Quote'}
        </Button>

        {/* Response Time Text */}
        <p className="mt-4 text-center text-sm text-[var(--color-success-base)] font-medium">
          {RESPONSE_TIME_TEXT}
        </p>
      </form>
    </div>
  )
}

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/**
 * @example
 * ```tsx
 * // Basic usage
 * <QuoteFormInline />
 *
 * // With success callback
 * <QuoteFormInline
 *   onSubmitSuccess={(data) => {
 *     console.log('Form submitted:', data)
 *     // Send to analytics, etc.
 *   }}
 * />
 *
 * // With custom styling
 * <QuoteFormInline
 *   className="mt-8"
 *   variant="compact"
 * />
 *
 * // In hero section
 * <section className="hero">
 *   <div className="hero-content">
 *     <h1>Professional Cleaning Services</h1>
 *     <p>Get your free quote today</p>
 *   </div>
 *   <QuoteFormInline />
 * </section>
 * ```
 */

// ============================================================================
// ACCESSIBILITY NOTES
// ============================================================================

/**
 * This component follows WCAG 2.1 AA guidelines:
 *
 * - Labels: All inputs have associated <label> elements with htmlFor
 * - Error Messages: role="alert" for screen reader announcements
 * - ARIA Attributes: aria-invalid, aria-describedby for error associations
 * - Focus Management: First error field receives focus on submit
 * - Keyboard Navigation: All elements keyboard accessible
 * - Touch Targets: Minimum 44px height on all inputs (WCAG 2.2)
 * - Color Contrast: Error messages use high contrast colors
 * - Form Validation: Clear, specific error messages
 * - Success Feedback: aria-live="polite" for success message
 * - Required Fields: Visual (*) and screen reader indication
 * - Disabled States: Submit button properly disabled during submission
 */

// ============================================================================
// TESTING CHECKLIST
// ============================================================================

/**
 * Manual Testing:
 * - [ ] All fields validate correctly
 * - [ ] Phone number formats as (555) 123-4567
 * - [ ] Error messages appear on blur for touched fields
 * - [ ] Error messages clear when field becomes valid
 * - [ ] Form submits only when all fields valid
 * - [ ] Success message displays after submission
 * - [ ] Form resets after 3 seconds
 * - [ ] Works in light and dark mode
 * - [ ] Keyboard navigation works (Tab, Enter)
 * - [ ] Focus indicators visible
 * - [ ] Screen reader announces errors
 * - [ ] Touch targets are 44px minimum
 * - [ ] Responsive on mobile devices
 */
