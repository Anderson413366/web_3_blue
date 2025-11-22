'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { X } from 'lucide-react'

import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

const advancedQuoteSchema = z.object({
  name: z.string().min(2),
  company: z.string().min(2),
  phone: z.string().regex(/^\d{10}$/),
  email: z.string().email(),
  square_footage: z.string(),
  frequency: z.string(),
  services: z.array(z.string()).min(1),
  additional_notes: z.string().optional(),
})

type AdvancedQuoteData = z.infer<typeof advancedQuoteSchema>

interface QuoteAdvancedModalProps {
  isOpen: boolean
  onClose: () => void
  miniQuoteUUID?: string
}

type FullQuoteInsert = Database['public']['Tables']['quote_requests_full']['Insert']

const SERVICE_OPTIONS = [
  'Office Cleaning',
  'Floor Care',
  'Window Cleaning',
  'Carpet Cleaning',
  'Post-Construction',
]

export default function QuoteAdvancedModal({
  isOpen,
  onClose,
  miniQuoteUUID,
}: QuoteAdvancedModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm<AdvancedQuoteData>({
    resolver: zodResolver(advancedQuoteSchema),
    defaultValues: {
      services: [],
    },
  })

  useEffect(() => {
    register('services')
  }, [register])

  const selectedServices = watch('services') || []

  const toggleService = (service: string, checked: boolean) => {
    const newServices = checked
      ? [...selectedServices, service]
      : selectedServices.filter((s) => s !== service)
    setValue('services', newServices, { shouldValidate: true })
  }

  const onSubmit = async (data: AdvancedQuoteData) => {
    setIsSubmitting(true)

    const payload: FullQuoteInsert = {
      ...data,
      mini_quote_uuid: miniQuoteUUID || null,
      submitted_at: new Date().toISOString(),
    }

    // Supabase generated types don't yet include this table, so skip type-check here.
    const { error } = await (supabase as any).from('quote_requests_full').insert(payload)

    setIsSubmitting(false)

    if (error) {
      alert('Submission failed. Please try again.')
      return
    }

    alert("Detailed quote request submitted! We'll contact you within 24 hours.")
    reset()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-h2">Detailed Quote Request</h2>
          <button onClick={onClose} className="rounded p-2 hover:bg-neutral-light-grey">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-body-sm font-semibold">Name *</label>
              <input
                {...register('name')}
                className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-body-sm font-semibold">Company *</label>
              <input
                {...register('company')}
                className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
              />
              {errors.company && <p className="text-sm text-red-600">{errors.company.message}</p>}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-body-sm font-semibold">Phone *</label>
              <input
                {...register('phone')}
                type="tel"
                maxLength={10}
                className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
              />
              {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-body-sm font-semibold">Email *</label>
              <input
                {...register('email')}
                type="email"
                className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          <div>
            <label className="mb-1 block text-body-sm font-semibold">Square Footage *</label>
            <select
              {...register('square_footage')}
              className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
            >
              <option value="">Select range...</option>
              <option value="<5000">Under 5,000 sq ft</option>
              <option value="5000-10000">5,000 - 10,000 sq ft</option>
              <option value="10000-25000">10,000 - 25,000 sq ft</option>
              <option value=">25000">Over 25,000 sq ft</option>
            </select>
            {errors.square_footage && (
              <p className="text-sm text-red-600">{errors.square_footage.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-body-sm font-semibold">Cleaning Frequency *</label>
            <select
              {...register('frequency')}
              className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
            >
              <option value="">Select frequency...</option>
              <option value="daily">Daily</option>
              <option value="3x-week">3x per Week</option>
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
            {errors.frequency && <p className="text-sm text-red-600">{errors.frequency.message}</p>}
          </div>

          <div>
            <label className="mb-2 block text-body-sm font-semibold">Services Needed *</label>
            <div className="space-y-2">
              {SERVICE_OPTIONS.map((service) => (
                <label key={service} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-5 w-5"
                    checked={selectedServices.includes(service)}
                    onChange={(e) => toggleService(service, e.target.checked)}
                  />
                  <span>{service}</span>
                </label>
              ))}
            </div>
            {errors.services && <p className="text-sm text-red-600">{errors.services.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-body-sm font-semibold">Additional Notes</label>
            <textarea
              {...register('additional_notes')}
              rows={3}
              className="w-full rounded border-2 border-neutral-light-grey px-4 py-2 outline-none focus:border-brand-emerald"
            />
          </div>

          <div className="flex gap-4">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
