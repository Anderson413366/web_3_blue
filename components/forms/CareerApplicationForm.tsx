'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/Button'
import { Upload, CheckCircle2 } from 'lucide-react'
import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/types'

const formSchema = z.object({
  full_name: z.string().min(2, 'Name required'),
  email: z.string().email('Valid email required'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  position: z.string().min(1, 'Select a position'),
  why_anderson: z.string().min(20, 'Tell us more (min 20 characters)'),
  availability: z.array(z.string()).min(1, 'Select at least one'),
  cover_letter: z.string().optional(),
  resume_url: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

const POSITIONS = [
  'Cleaning Specialist - Springfield/Hartford',
  'Field Supervisor - West Springfield',
  'Operations Assistant - Evening Shift',
  'Other - Specify in cover letter',
]

const AVAILABILITY_OPTIONS = [
  'Weekday Mornings',
  'Weekday Evenings',
  'Weekends',
  'Evening Shift (4:30 PM - 10 PM)',
  'Flexible',
]

export default function CareerApplicationForm() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [recoveryCode, setRecoveryCode] = useState<string | null>(null)
  const [resumeFilename, setResumeFilename] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      availability: [],
    },
  })

  const selectedAvailability = watch('availability') || []

  const generateRecoveryCode = () => {
    if (!recoveryCode) {
      const code = Math.random().toString(36).substring(2, 9).toUpperCase()
      setRecoveryCode(code)
      return code
    }
    return recoveryCode
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      alert('File must be under 5MB')
      return
    }

    const code = generateRecoveryCode()
    const fileName = `${code}-${file.name}`

    const { data, error } = await supabase.storage.from('resumes').upload(fileName, file)
    if (error || !data) {
      alert('Upload failed. Please try again.')
      return
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from('resumes').getPublicUrl(data.path)
    setValue('resume_url', publicUrl, { shouldValidate: true })
    setResumeFilename(file.name)
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    type CareerInsert = Database['public']['Tables']['career_applications']['Insert']
    const payload: CareerInsert = {
      name: data.full_name,
      email: data.email,
      phone: data.phone,
      position: data.position,
      availability: selectedAvailability.join(', '),
      cover_letter: data.cover_letter
        ? `${data.why_anderson}\n\n${data.cover_letter}`
        : data.why_anderson,
      resume_url: data.resume_url,
      resume_filename: resumeFilename,
      source_page: 'careers',
    }

    const { error } = await (supabase as any).from('career_applications').insert(payload)
    if (error) {
      alert('Submission failed. Please try again.')
    } else {
      setIsSuccess(true)
    }

    setIsSubmitting(false)
  }

  const handleNext = async (fields: (keyof FormData)[], nextStep: number) => {
    const valid = await trigger(fields, { shouldFocus: true })
    if (valid) {
      setStep(nextStep)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleAvailabilityChange = (option: string, checked: boolean) => {
    const updated = checked
      ? [...selectedAvailability, option]
      : selectedAvailability.filter((item) => item !== option)
    setValue('availability', updated, { shouldValidate: true })
  }

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg border-2 border-brand-bright-blue p-8 text-center">
        <CheckCircle2 className="h-16 w-16 text-brand-bright-blue mx-auto mb-4" />
        <h3 className="text-h3 mb-2">Application Submitted!</h3>
        <p className="text-body-sm mb-4">We'll review your application and contact you within 48 hours.</p>
        {recoveryCode && (
          <div className="bg-neutral-off-white p-4 rounded">
            <p className="text-body-sm font-semibold">Your Recovery Code:</p>
            <p className="text-h3 text-brand-navy font-mono">{recoveryCode}</p>
            <p className="text-body-sm text-neutral-charcoal dark:text-white mt-2">
              Save this code to check your application status.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div id="application-form" className="bg-white rounded-lg border-2 border-neutral-light-grey p-8">
      <h2 className="text-h2 mb-6">Apply Now</h2>

      <div className="flex justify-between mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center w-full">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                step >= s
                  ? 'bg-brand-bright-blue text-white'
                  : 'bg-neutral-light-grey text-neutral-charcoal dark:text-white/80'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className="w-full h-1 bg-neutral-light-grey mx-2" />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {step === 1 && (
          <div className="space-y-5">
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Full Name *
              </label>
              <input
                {...register('full_name')}
                onFocus={generateRecoveryCode}
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              {errors.full_name && <p className="text-sm text-red-600 mt-1">{errors.full_name.message}</p>}
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Email *
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Phone *
              </label>
              <input
                {...register('phone')}
                type="tel"
                placeholder="1234567890"
                maxLength={10}
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Resume (PDF/DOC, max 5MB)
              </label>
              <label className="flex items-center justify-center gap-2 border-2 border-dashed border-neutral-light-grey rounded px-4 py-6 cursor-pointer hover:border-brand-bright-blue transition-colors">
                <Upload className="h-5 w-5" />
                <span>Upload File</span>
                {/* Hidden native input lets screen readers trigger uploads while keeping the custom UI */}
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} className="hidden" />
              </label>
              {recoveryCode && (
                <p className="text-body-sm text-neutral-charcoal dark:text-white mt-2">
                  Recovery Code: <span className="font-semibold">{recoveryCode}</span>
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="primary"
              className="w-full"
              onClick={() => handleNext(['full_name', 'email', 'phone'], 2)}
            >
              Next
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Position Applying For *
              </label>
              <select
                {...register('position')}
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white"
              >
                <option value="">Select a position...</option>
                {POSITIONS.map((pos) => (
                  <option key={pos} value={pos}>
                    {pos}
                  </option>
                ))}
              </select>
              {errors.position && <p className="text-sm text-red-600 mt-1">{errors.position.message}</p>}
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Why Anderson Cleaning? *
              </label>
              <textarea
                {...register('why_anderson')}
                rows={4}
                placeholder="Tell us why you want to join our team..."
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
              {errors.why_anderson && (
                <p className="text-sm text-red-600 mt-1">{errors.why_anderson.message}</p>
              )}
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                type="button"
                variant="primary"
                className="flex-1"
                onClick={() => handleNext(['position', 'why_anderson'], 3)}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Availability *
              </label>
              <div className="space-y-2">
                {AVAILABILITY_OPTIONS.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={option}
                      checked={selectedAvailability.includes(option)}
                      onChange={(e) => handleAvailabilityChange(option, e.target.checked)}
                      className="w-5 h-5"
                    />
                    <span className="text-neutral-charcoal dark:text-white">{option}</span>
                  </label>
                ))}
              </div>
              {errors.availability && (
                <p className="text-sm text-red-600 mt-1">{errors.availability.message}</p>
              )}
            </div>
            <div>
              <label className="block text-body-sm font-semibold mb-2 text-neutral-charcoal dark:text-white">
                Cover Letter (Optional)
              </label>
              <textarea
                {...register('cover_letter')}
                rows={4}
                placeholder="Additional information..."
                className="w-full border-2 border-neutral-light-grey rounded px-4 py-2 focus:border-brand-bright-blue outline-none bg-white dark:bg-slate-800 text-neutral-charcoal dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
            <div className="flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button type="submit" variant="accent" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
  )
}
