import { z } from 'zod'

/**
 * Phone number validation - accepts various formats:
 * - (555) 123-4567
 * - 555-123-4567
 * - 5551234567
 * - +1 555 123 4567
 */
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

/**
 * ZIP code validation - accepts 5-digit or 9-digit formats
 * - 12345
 * - 12345-6789
 */
const zipRegex = /^\d{5}(-\d{4})?$/

// ============================================================================
// Quote Form Validation Schema (Multi-step)
// ============================================================================

/**
 * Step 1: Contact Information
 */
export const quoteStep1Schema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  company: z
    .string()
    .min(2, 'Company name must be at least 2 characters')
    .max(200, 'Company name must be less than 200 characters'),
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number (e.g., 555-123-4567)'),
})

/**
 * Step 2: Facility Information
 */
export const quoteStep2Schema = z.object({
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(200, 'Address must be less than 200 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  zipCode: z.string().regex(zipRegex, 'Please enter a valid ZIP code (e.g., 01089 or 01089-1234)'),
  squareFootage: z
    .number()
    .positive('Square footage must be a positive number')
    .int('Square footage must be a whole number')
    .optional()
    .or(z.literal('')),
  facilityType: z.enum(
    [
      'office',
      'medical',
      'education',
      'manufacturing',
      'warehouse',
      'retail',
      'property-management',
      'other',
    ],
    { required_error: 'Please select a facility type' }
  ),
  cleaningFrequency: z.enum(['daily', '2-3x-week', 'weekly', 'bi-weekly', 'monthly', 'one-time'], {
    required_error: 'Please select a cleaning frequency',
  }),
  desiredStartDate: z
    .string()
    .optional()
    .refine(
      (date) => {
        if (!date) return true
        const selectedDate = new Date(date)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return selectedDate >= today
      },
      { message: 'Start date must be today or in the future' }
    ),
})

/**
 * Step 3: Services Needed
 */
export const quoteStep3Schema = z.object({
  services: z
    .array(
      z.enum([
        'office-cleaning',
        'janitorial-services',
        'floor-carpet-care',
        'window-cleaning',
        'post-construction',
        'supply-management',
      ])
    )
    .min(1, 'Please select at least one service'),
})

/**
 * Step 4: Additional Information & Consent
 */
export const quoteStep4Schema = z.object({
  specialRequests: z
    .string()
    .max(500, 'Special requests must be less than 500 characters')
    .optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'You must agree to be contacted to submit this quote request',
  }),
  // Honeypot field - should always be empty
  website: z.string().max(0, 'Invalid submission').optional(),
})

/**
 * Complete Quote Form Schema (all steps combined)
 */
export const quoteFormSchema = quoteStep1Schema
  .merge(quoteStep2Schema)
  .merge(quoteStep3Schema)
  .merge(quoteStep4Schema)

/**
 * TypeScript types derived from schemas
 */
export type QuoteStep1Data = z.infer<typeof quoteStep1Schema>
export type QuoteStep2Data = z.infer<typeof quoteStep2Schema>
export type QuoteStep3Data = z.infer<typeof quoteStep3Schema>
export type QuoteStep4Data = z.infer<typeof quoteStep4Schema>
export type QuoteFormData = z.infer<typeof quoteFormSchema>

// ============================================================================
// Contact Form Validation Schema (Simple)
// ============================================================================

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z.string().email('Please enter a valid email address').toLowerCase(),
  phone: z.string().regex(phoneRegex, 'Please enter a valid phone number (e.g., 555-123-4567)'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
  // Honeypot field - should always be empty
  website: z.string().max(0, 'Invalid submission').optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Format phone number for display
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  return phone
}

/**
 * Facility type display names
 */
export const facilityTypeLabels: Record<string, string> = {
  office: 'Office/Corporate',
  medical: 'Medical Facility',
  education: 'Educational Facility',
  manufacturing: 'Manufacturing',
  warehouse: 'Warehouse/Distribution',
  retail: 'Retail/Showroom',
  'property-management': 'Property Management',
  other: 'Other',
}

/**
 * Cleaning frequency display names
 */
export const cleaningFrequencyLabels: Record<string, string> = {
  daily: 'Daily',
  '2-3x-week': '2-3 times per week',
  weekly: 'Weekly',
  'bi-weekly': 'Bi-weekly (every 2 weeks)',
  monthly: 'Monthly',
  'one-time': 'One-time cleaning',
}

/**
 * Service display names
 */
export const serviceLabels: Record<string, string> = {
  'office-cleaning': 'Office & Commercial Cleaning',
  'janitorial-services': 'Janitorial Services',
  'floor-carpet-care': 'Floor/Carpet Care',
  'window-cleaning': 'Window Cleaning',
  'post-construction': 'Post-Construction Cleaning',
  'supply-management': 'Supply Management',
}
