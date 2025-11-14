'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/Button'
import {
  quoteFormSchema,
  quoteStep1Schema,
  quoteStep2Schema,
  quoteStep3Schema,
  quoteStep4Schema,
  facilityTypeLabels,
  cleaningFrequencyLabels,
  serviceLabels,
  type QuoteFormData,
} from '@/lib/validation/quote'
import {
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Loader2,
} from 'lucide-react'

const TOTAL_STEPS = 4

interface QuoteFormProps {
  onSuccess?: () => void
}

export default function QuoteForm({ onSuccess }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    mode: 'onBlur',
  })

  // Get validation schema for current step
  const getStepSchema = (step: number) => {
    switch (step) {
      case 1:
        return quoteStep1Schema
      case 2:
        return quoteStep2Schema
      case 3:
        return quoteStep3Schema
      case 4:
        return quoteStep4Schema
      default:
        return quoteStep1Schema
    }
  }

  // Validate current step before proceeding
  const validateStep = async () => {
    const schema = getStepSchema(currentStep)
    const fields = Object.keys(schema.shape) as (keyof QuoteFormData)[]
    const isValid = await trigger(fields)
    return isValid
  }

  const handleNext = async () => {
    const isValid = await validateStep()
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setIsSubmitting(true)
      setSubmitError(null)

      // Check honeypot field
      if (data.website) {
        throw new Error('Invalid submission detected')
      }

      // TODO: Send to backend API
      console.log('Quote form submitted:', data)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Success!
      onSuccess?.()
    } catch (error) {
      console.error('Quote submission error:', error)
      setSubmitError(
        'There was an error submitting your quote request. Please try again or call us at (555) 123-4567.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  // Watch services for checkbox states
  const selectedServices = watch('services') || []

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Form */}
      <div className="lg:col-span-2">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Step {currentStep} of {TOTAL_STEPS}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {Math.round((currentStep / TOTAL_STEPS) * 100)}% Complete
              </span>
            </div>
            <div className="relative">
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-600 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Error Summary */}
          {submitError && (
            <div className="rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-red-900 dark:text-red-300 mb-1">
                  Submission Error
                </h4>
                <p className="text-sm text-red-700 dark:text-red-400">{submitError}</p>
              </div>
            </div>
          )}

          {/* Step 1: Contact Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Contact Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Let us know who to contact about your quote.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('fullName')}
                    type="text"
                    id="fullName"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="John Smith"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('company')}
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="ABC Corporation"
                  />
                  {errors.company && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.company.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="john@abccorp.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('phone')}
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Facility Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Facility Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Tell us about your facility to help us prepare an accurate quote.
                </p>
              </div>

              {/* Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  {...register('address')}
                  type="text"
                  id="address"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="123 Main Street"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.address.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* City */}
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('city')}
                    type="text"
                    id="city"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Springfield"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.city.message}
                    </p>
                  )}
                </div>

                {/* ZIP Code */}
                <div>
                  <label
                    htmlFor="zipCode"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    ZIP Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    {...register('zipCode')}
                    type="text"
                    id="zipCode"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="01089"
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.zipCode.message}
                    </p>
                  )}
                </div>

                {/* Square Footage */}
                <div>
                  <label
                    htmlFor="squareFootage"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Approximate Square Footage
                  </label>
                  <input
                    {...register('squareFootage', { valueAsNumber: true })}
                    type="number"
                    id="squareFootage"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="5000"
                  />
                  {errors.squareFootage && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.squareFootage.message}
                    </p>
                  )}
                </div>

                {/* Desired Start Date */}
                <div>
                  <label
                    htmlFor="desiredStartDate"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Desired Start Date
                  </label>
                  <input
                    {...register('desiredStartDate')}
                    type="date"
                    id="desiredStartDate"
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  {errors.desiredStartDate && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.desiredStartDate.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facility Type */}
                <div>
                  <label
                    htmlFor="facilityType"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Facility Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('facilityType')}
                    id="facilityType"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select a facility type</option>
                    {Object.entries(facilityTypeLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.facilityType && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.facilityType.message}
                    </p>
                  )}
                </div>

                {/* Cleaning Frequency */}
                <div>
                  <label
                    htmlFor="cleaningFrequency"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Cleaning Frequency <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register('cleaningFrequency')}
                    id="cleaningFrequency"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select frequency</option>
                    {Object.entries(cleaningFrequencyLabels).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                  {errors.cleaningFrequency && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.cleaningFrequency.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Services Needed */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Services Needed
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Select all the services you're interested in. You can choose multiple.
                </p>
              </div>

              <div className="space-y-3">
                <Controller
                  name="services"
                  control={control}
                  defaultValue={[]}
                  render={({ field }) => (
                    <>
                      {Object.entries(serviceLabels).map(([value, label]) => {
                        const isClientOnly = [
                          'floor-carpet-care',
                          'window-cleaning',
                          'post-construction',
                          'supply-management',
                        ].includes(value)

                        return (
                          <label
                            key={value}
                            className="flex items-start gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                          >
                            <input
                              type="checkbox"
                              value={value}
                              checked={field.value?.includes(value as any)}
                              onChange={(e) => {
                                const newValue = e.target.checked
                                  ? [...(field.value || []), value]
                                  : (field.value || []).filter((v) => v !== value)
                                field.onChange(newValue)
                              }}
                              className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900 dark:text-gray-100">
                                  {label}
                                </span>
                                {isClientOnly && (
                                  <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full">
                                    Clients Only
                                  </span>
                                )}
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </>
                  )}
                />
                {errors.services && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.services.message}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Additional Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Additional Information
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Any special requests or additional details we should know?
                </p>
              </div>

              {/* Special Requests */}
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Special Requests or Notes
                </label>
                <textarea
                  {...register('specialRequests')}
                  id="specialRequests"
                  rows={5}
                  maxLength={500}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., We need eco-friendly products due to allergies, prefer evening cleaning, have specific compliance requirements..."
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {watch('specialRequests')?.length || 0}/500 characters
                </p>
                {errors.specialRequests && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {errors.specialRequests.message}
                  </p>
                )}
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-slate-800">
                <input
                  {...register('consent')}
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="consent"
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300"
                >
                  I agree to be contacted by Anderson Cleaning regarding this quote request. We
                  typically respond within 30 minutes during business hours.{' '}
                  <span className="text-red-500">*</span>
                </label>
              </div>
              {errors.consent && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.consent.message}
                </p>
              )}

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
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-700">
            <div>
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              {currentStep < TOTAL_STEPS ? (
                <Button type="button" variant="primary" onClick={handleNext}>
                  Next Step
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="accent"
                  disabled={isSubmitting}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Submit Quote Request
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Sidebar - Trust Elements */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          {/* Response Time Promise */}
          <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="h-6 w-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                  ≤30-Minute Response
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  We respond to all quote requests within 30 minutes during business hours.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">Prefer to Call?</h3>
            <div className="space-y-3">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-3 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <Phone className="h-5 w-5 flex-shrink-0" />
                <span className="font-semibold">(555) 123-4567</span>
              </a>
              <a
                href="mailto:info@andersoncleaning.com"
                className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                <Mail className="h-5 w-5 flex-shrink-0" />
                <span className="text-sm">info@andersoncleaning.com</span>
              </a>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>Business Hours:</strong>
                <br />
                Monday - Friday: 8 AM - 6 PM
                <br />
                Saturday: 9 AM - 2 PM
                <br />
                24/7 Emergency Support
              </p>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">What Happens Next?</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                  1
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  We'll contact you within 30 minutes to discuss your needs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                  2
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  We'll schedule a free on-site walk-through at your convenience
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 bg-primary-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                  3
                </span>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  You'll receive a detailed proposal within 24 hours
                </span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
