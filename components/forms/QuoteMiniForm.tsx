'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'

const miniQuoteSchema = z.object({
  name: z.string().min(2, 'Name required'),
  company: z.string().optional(),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  message: z.string().min(10, 'Please provide more details'),
  leave_blank: z.string().max(0, 'Bot detected'),
})

export type MiniQuoteData = z.infer<typeof miniQuoteSchema>

interface QuoteMiniFormProps {
  source?: string
  onSuccess?: () => void
  onOpenAdvanced?: () => void
}

export default function QuoteMiniForm({
  source = 'unknown',
  onSuccess,
  onOpenAdvanced,
}: QuoteMiniFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MiniQuoteData>({
    resolver: zodResolver(miniQuoteSchema),
  })

  const onSubmit = async (data: MiniQuoteData) => {
    if (data.leave_blank) return

    setIsSubmitting(true)

    // Supabase generated types need to be refreshed for this table, so bypass TS for now.
    const { error } = await (supabase as any).from('quote_requests_mini').insert({
      name: data.name,
      company: data.company || null,
      phone: data.phone,
      message: data.message,
      source,
      submitted_at: new Date().toISOString(),
    })

    setIsSubmitting(false)

    if (error) {
      alert('Submission failed. Please try again.')
      return
    }

    setIsSuccess(true)
    onSuccess?.()
    setTimeout(() => {
      setIsSuccess(false)
      reset()
    }, 5000)
  }

  if (isSuccess) {
    return (
      <div className="bg-brand-emerald/10 border-2 border-brand-emerald rounded-lg p-6 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-emerald mx-auto mb-3" />
        <h3 className="text-h3 mb-2">We'll call you soon!</h3>
        <p className="text-body-sm mb-4">Expect a call within 24 hours during business hours.</p>
        <button
          type="button"
          onClick={() => onOpenAdvanced?.()}
          className="text-brand-navy hover:text-brand-emerald underline text-body-sm font-semibold"
        >
          Need detailed quote? → Full form
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('leave_blank')}
        type="text"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
      />

      <div>
        <label className="block text-body-sm font-semibold mb-1">Name *</label>
        <input
          {...register('name')}
          className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-emerald outline-none"
          placeholder="Your name"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-body-sm font-semibold mb-1">Company</label>
        <input
          {...register('company')}
          className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-emerald outline-none"
          placeholder="Optional"
        />
      </div>

      <div>
        <label className="block text-body-sm font-semibold mb-1">Phone *</label>
        <input
          {...register('phone')}
          type="tel"
          maxLength={10}
          className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-emerald outline-none"
          placeholder="1234567890"
        />
        {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-body-sm font-semibold mb-1">Message *</label>
        <textarea
          {...register('message')}
          rows={3}
          className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-emerald outline-none"
          placeholder="Tell us about your cleaning needs..."
        />
        {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message.message}</p>}
      </div>

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Get Free Quote'}
      </Button>

      <p className="text-sm text-center text-neutral-charcoal">
        <button
          type="button"
          onClick={() => onOpenAdvanced?.()}
          className="text-brand-navy hover:text-brand-emerald underline"
        >
          Need detailed quote? Click here
        </button>
      </p>
    </form>
  )
}
