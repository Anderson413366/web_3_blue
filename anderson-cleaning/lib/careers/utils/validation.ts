import { FormDataShape, SectionError } from '@/lib/careers/types'

// Basic email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Basic phone validation regex (allows digits, spaces, parentheses, hyphens, plus)
const PHONE_REGEX = /^[+]?[\d\s()-]+$/
// Basic MM/YYYY date format
const DATE_MMYYYY_REGEX = /^(0[1-9]|1[0-2])\/\d{4}$/

export const validateSectionData = (
  formData: FormDataShape,
  sectionId: keyof FormDataShape | 'review' | 'hero' | 'whyWork',
  t: (key: string, options?: Record<string, string | number>) => string,
  requiredFieldsPaths: string[] = []
): SectionError => {
  const errors: SectionError = {}

  if (sectionId === 'review' || sectionId === 'hero' || sectionId === 'whyWork') {
    return errors // No validation for these pseudo-sections
  }

  const sectionData = formData[sectionId as keyof FormDataShape] as any

  requiredFieldsPaths.forEach((fullPath) => {
    const pathParts = fullPath.split('.') // e.g., "personalInfo.firstName"
    const currentSectionKey = pathParts[0] as keyof FormDataShape

    if (currentSectionKey !== sectionId) return // Only validate fields for the current section

    const fieldName = pathParts[1]
    const value = sectionData[fieldName]

    if (typeof value === 'string' && !value.trim()) {
      errors[fullPath] = t('requiredErrorText')
    } else if (
      typeof value === 'boolean' &&
      value === false &&
      (fieldName.endsWith('Ack') ||
        (fieldName === 'hasDriversLicense' &&
          sectionData.applyingFor !== 'office_staff')) /* Example conditional */
    ) {
      // Specific boolean checks if needed, e.g. acknowledgements
      // The 'hasDriversLicense' condition is an example and may need refinement
      if (fieldName.endsWith('Ack')) {
        errors[fullPath] = t('requiredErrorText') // Or a more specific message like "You must acknowledge this statement."
      }
    } else if (value === null && fieldName.startsWith('driversLicense')) {
      // File uploads
      errors[fullPath] = t('validationErrorMissingFile')
    } else if (
      Array.isArray(value) &&
      value.length === 0 &&
      fieldName === 'entries' &&
      (sectionId === 'workHistory' || sectionId === 'references')
    ) {
      // For work history/references, an empty array might be okay if not explicitly required to add at least one.
      // This depends on business logic. For now, let's assume at least one entry is NOT strictly required by default.
      // errors[fullPath] = t('requiredErrorText'); // e.g. "At least one entry is required."
    }
  })

  // Specific field validations
  if (sectionId === 'personalInfo') {
    if (sectionData.email && !EMAIL_REGEX.test(sectionData.email)) {
      errors['personalInfo.email'] = t('emailInvalidError', {
        defaultValue: 'Invalid email format.',
      })
    }
    if (sectionData.phone && !PHONE_REGEX.test(sectionData.phone)) {
      errors['personalInfo.phone'] = t('phoneInvalidError', {
        defaultValue: 'Invalid phone number format.',
      })
    }
  }

  if (sectionId === 'workHistory') {
    sectionData.entries?.forEach((entry: any, index: number) => {
      if (!entry.companyName?.trim())
        errors[`workHistory.entries.${index}.companyName`] = t('requiredErrorText')
      if (!entry.position?.trim())
        errors[`workHistory.entries.${index}.position`] = t('requiredErrorText')
      if (entry.fromDate && !DATE_MMYYYY_REGEX.test(entry.fromDate))
        errors[`workHistory.entries.${index}.fromDate`] = t('dateInvalidError', {
          defaultValue: 'Invalid date (MM/YYYY).',
        })
      if (entry.toDate && !DATE_MMYYYY_REGEX.test(entry.toDate))
        errors[`workHistory.entries.${index}.toDate`] = t('dateInvalidError', {
          defaultValue: 'Invalid date (MM/YYYY).',
        })
      if (
        entry.fromDate &&
        entry.toDate &&
        DATE_MMYYYY_REGEX.test(entry.fromDate) &&
        DATE_MMYYYY_REGEX.test(entry.toDate)
      ) {
        const [fromM, fromY] = entry.fromDate.split('/').map(Number)
        const [toM, toY] = entry.toDate.split('/').map(Number)
        if (new Date(fromY, fromM - 1) > new Date(toY, toM - 1)) {
          errors[`workHistory.entries.${index}.toDate`] = t('dateToBeforeFromError', {
            defaultValue: 'End date cannot be before start date.',
          })
        }
      }
    })
  }

  if (sectionId === 'references') {
    sectionData.entries?.forEach((entry: any, index: number) => {
      if (!entry.name?.trim()) errors[`references.entries.${index}.name`] = t('requiredErrorText')
      if (!entry.relationship?.trim())
        errors[`references.entries.${index}.relationship`] = t('requiredErrorText')
      if (entry.phone && !PHONE_REGEX.test(entry.phone))
        errors[`references.entries.${index}.phone`] = t('phoneInvalidError', {
          defaultValue: 'Invalid phone number format.',
        })
    })
  }

  if (sectionId === 'uploads') {
    if (!formData.uploads.driversLicense) {
      // Check from root formData for uploads
      errors['uploads.driversLicense'] = t('validationErrorMissingFile')
    }
  }

  return errors
}

// Helper to check if all sections up to a point are valid
export const allSectionsValid = (
  formData: FormDataShape,
  sectionsConfig: typeof import('../constants').SECTIONS_CONFIG,
  t: (key: string, options?: Record<string, string | number>) => string
): boolean => {
  for (const config of sectionsConfig) {
    if (config.id === 'review' || config.id === 'hero' || config.id === 'whyWork') continue
    const errors = validateSectionData(formData, config.id, t, config.requiredFields || [])
    if (Object.keys(errors).length > 0) {
      return false
    }
  }
  return true
}
