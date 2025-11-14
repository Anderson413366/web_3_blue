'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import SectionWrapper from './SectionWrapper'
import { SECTIONS_CONFIG } from '@/lib/careers/constants'
import { EditIconCareers } from '../icons'
import InterviewPrepSpark from '../sparks/InterviewPrepSpark'
import StrengthsSpark from '../sparks/StrengthsSpark'
import Alert from '@/components/ui/Alert'
import { validateSectionData, allSectionsValid } from '@/lib/careers/utils/validation'
import { FormDataShape, WorkHistoryEntry, ReferenceEntry } from '@/lib/careers/types'

const ReviewSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const {
    formData,
    t,
    setCurrentSectionIndex,
    setApplicationStatus,
    applicationStatus,
    formErrors,
    setFormErrors,
  } = context

  const handleEditSection = (
    sectionIdToEdit: keyof FormDataShape | 'review' | 'hero' | 'whyWork'
  ) => {
    const sectionIndex = SECTIONS_CONFIG.findIndex((s) => s.id === sectionIdToEdit)
    if (sectionIndex !== -1) {
      setCurrentSectionIndex(sectionIndex)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmitApplication = async () => {
    setApplicationStatus('submitting')
    setFormErrors({}) // Clear previous errors

    const isFormValid = allSectionsValid(
      formData,
      SECTIONS_CONFIG,
      t as (key: string, options?: Record<string, string | number>) => string
    )
    if (!isFormValid) {
      setApplicationStatus('error')
      // Find the first invalid section and navigate there, setting its errors
      for (let i = 0; i < SECTIONS_CONFIG.length; i++) {
        const config = SECTIONS_CONFIG[i]
        if (config.id !== 'review' && config.id !== 'hero' && config.id !== 'whyWork') {
          const errors = validateSectionData(
            formData,
            config.id,
            t as (key: string, options?: Record<string, string | number>) => string,
            config.requiredFields || []
          )
          if (Object.keys(errors).length > 0) {
            setFormErrors(errors) // Set errors for the first invalid section
            setCurrentSectionIndex(i)
            window.scrollTo(0, 0)
            break
          }
        }
      }
      return
    }

    // Simulate API call
    try {
      // console.log("Submitting application Data:", JSON.stringify(formData, (key, value) => value instanceof File ? value.name : value, 2));
      // Create a FormData object for actual submission if files are involved
      const submissionFormData = new FormData()
      Object.entries(formData).forEach(([sectionKey, sectionValue]) => {
        Object.entries(sectionValue as object).forEach(([fieldKey, fieldValue]) => {
          if (fieldValue instanceof File) {
            submissionFormData.append(`${sectionKey}.${fieldKey}`, fieldValue, fieldValue.name)
          } else if (
            Array.isArray(fieldValue) &&
            fieldKey === 'entries' &&
            (sectionKey === 'workHistory' || sectionKey === 'references')
          ) {
            submissionFormData.append(`${sectionKey}.${fieldKey}`, JSON.stringify(fieldValue))
          } else if (typeof fieldValue === 'object' && fieldValue !== null) {
            submissionFormData.append(`${sectionKey}.${fieldKey}`, JSON.stringify(fieldValue))
          } else {
            submissionFormData.append(`${sectionKey}.${fieldKey}`, String(fieldValue))
          }
        })
      })

      // For testing, log the FormData keys/values
      // for (let pair of submissionFormData.entries()) {
      //   console.log(pair[0]+ ', ' + pair[1]);
      // }

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate network delay
      console.log('Simulated submission successful for:', formData.personalInfo.firstName)
      setApplicationStatus('success')
    } catch (error) {
      console.error('Submission error:', error)
      setApplicationStatus('error')
    }
  }

  const renderField = (
    labelKey: string,
    value: any,
    sectionId: keyof FormDataShape | 'review' | 'hero' | 'whyWork'
  ) => {
    let displayValue = value

    if (
      displayValue === null ||
      displayValue === undefined ||
      (typeof displayValue === 'string' && displayValue.trim() === '')
    ) {
      return null
    }
    if (typeof displayValue === 'boolean') {
      displayValue = displayValue ? (t('yesLabel') as string) : (t('noLabel') as string)
    } else if (value instanceof File) {
      displayValue = value.name
    } else if (typeof displayValue === 'object' && !Array.isArray(displayValue)) {
      // Handle checkbox groups (experienceWith, workLocations, daysAvailable, shiftsAvailable)
      const checkedOptions = Object.entries(displayValue)
        .filter(([, val]) => val === true)
        .map(([optKey]) => {
          let transKey = `${optKey}Label`
          if (sectionId === 'jobDetails' && labelKey === 'experienceWithLabel')
            transKey = `experienceWith_${optKey}Label`
          else if (sectionId === 'availability') {
            // For workLocations, daysAvailable, shiftsAvailable
            if (
              labelKey === 'availableWorkLocationsLabel' ||
              labelKey === 'daysAvailableLabel' ||
              labelKey === 'shiftsAvailableLabel'
            ) {
              transKey = `${optKey}Label` // e.g. AgawamLabel, MondayLabel, MorningLabel
            }
          }
          return t(transKey, { defaultValue: optKey }) as string
        })
        .join(', ')
      if (!checkedOptions) return null
      displayValue = checkedOptions
    } else if (Array.isArray(displayValue)) {
      // This case should be handled by the specific entry mapping for workHistory/references
      return null
    }

    return (
      <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
        <dt className="text-sm font-medium text-gray-600 dark:text-slate-400">
          {t(labelKey, { defaultValue: labelKey.replace(/Label$/, '') }) as string}:
        </dt>
        <dd className="mt-1 text-sm text-gray-900 dark:text-gray-200 sm:mt-0 sm:col-span-2 break-words whitespace-pre-wrap">
          {String(displayValue)}
        </dd>
      </div>
    )
  }

  return (
    <SectionWrapper titleKey="reviewSectionTitle" descriptionKey="reviewIntro">
      {SECTIONS_CONFIG.map((sectionConfig) => {
        if (
          sectionConfig.id === 'review' ||
          sectionConfig.id === 'hero' ||
          sectionConfig.id === 'whyWork'
        )
          return null

        const sectionData = formData[sectionConfig.id as keyof FormDataShape] as any
        if (!sectionData) return null

        let hasContentToDisplay = false

        const sectionContent = Object.entries(sectionData)
          .map(([key, value]) => {
            if (
              key === 'entries' &&
              (sectionConfig.id === 'workHistory' || sectionConfig.id === 'references')
            ) {
              const entriesToRender = (value as Array<WorkHistoryEntry | ReferenceEntry>).filter(
                (entry) => {
                  return Object.values(entry).some(
                    (val) => val !== '' && val !== null && val !== undefined
                  )
                }
              )

              if (entriesToRender.length === 0) return null
              hasContentToDisplay = true

              return entriesToRender?.map((entry: any, index: number) => (
                <div
                  key={`${sectionConfig.id}-entry-${index}`}
                  className="py-3 my-2 border-t border-gray-100 dark:border-slate-600 first:border-t-0"
                >
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-1">
                    {sectionConfig.id === 'workHistory'
                      ? (t('employer', { defaultValue: 'Employer' }) as string)
                      : (t('reference', { defaultValue: 'Reference' }) as string)}{' '}
                    #{index + 1}
                  </h4>
                  {Object.entries(entry).map(([entryKey, entryValue]) => {
                    let entryLabelKey = `${sectionConfig.id === 'workHistory' ? 'prev' : 'reference'}${entryKey.charAt(0).toUpperCase() + entryKey.slice(1)}Label`
                    if (sectionConfig.id === 'workHistory' && entryKey === 'streetAddress')
                      entryLabelKey = 'prevStreetAddressLabel' // Explicit for work history address
                    if (sectionConfig.id === 'workHistory' && entryKey === 'city')
                      entryLabelKey = 'prevCityLabel'
                    if (sectionConfig.id === 'workHistory' && entryKey === 'zipCode')
                      entryLabelKey = 'prevZipCodeLabel'
                    return renderField(entryLabelKey, entryValue, sectionConfig.id)
                  })}
                </div>
              ))
            }

            let labelKey = `${key}Label`
            if (sectionConfig.id === 'jobDetails' && key === 'experienceWith')
              labelKey = 'experienceWithLabel'
            else if (sectionConfig.id === 'availability' && key === 'workLocations')
              labelKey = 'availableWorkLocationsLabel'
            else if (sectionConfig.id === 'availability' && key === 'daysAvailable')
              labelKey = 'daysAvailableLabel'
            else if (sectionConfig.id === 'availability' && key === 'shiftsAvailable')
              labelKey = 'shiftsAvailableLabel'
            else if (sectionConfig.id === 'education' && key === 'educationLevel')
              labelKey = 'educationLevelLabel' // Ensure this is general
            else if (sectionConfig.id === 'militaryService' && key === 'branch')
              labelKey = 'branchLabel'
            else if (sectionConfig.id === 'uploads' && key === 'coverLetterText')
              labelKey = 'coverLetterLabel'

            const renderedField = renderField(labelKey, value, sectionConfig.id)
            if (renderedField) hasContentToDisplay = true
            return renderedField
          })
          .filter(Boolean) // Remove nulls

        if (
          !hasContentToDisplay &&
          sectionConfig.id !== 'militaryService' &&
          !(sectionConfig.id === 'workHistory' && sectionData.entries?.length === 0) &&
          !(sectionConfig.id === 'references' && sectionData.entries?.length === 0)
        ) {
          // Military might be empty
          // Don't render section header if no content, unless it's optional like military
          // Or if work/ref history is empty and meant to be.
        }

        // Only render the section div if there's content to display or if it's an optional section that could be empty
        const alwaysRenderContainer =
          sectionConfig.id === 'militaryService' ||
          sectionConfig.id === 'workHistory' ||
          sectionConfig.id === 'references'
        if (!hasContentToDisplay && !alwaysRenderContainer) {
          return null
        }

        return (
          <div
            key={sectionConfig.id}
            className="mb-8 pb-4 border-b border-gray-200 dark:border-slate-700"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-primary dark:text-blue-400">
                {t(sectionConfig.titleKey) as string}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleEditSection(sectionConfig.id as keyof FormDataShape)}
              >
                <EditIconCareers className="h-4 w-4 mr-1" /> {t('editSectionButton') as string}
              </Button>
            </div>
            <dl className="divide-y divide-gray-200 dark:divide-slate-700">{sectionContent}</dl>
          </div>
        )
      })}

      {/* AI Spark sections */}
      <div className="my-8 py-6 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {t('interviewPrepSectionTitle') as string}
        </h3>
        <InterviewPrepSpark />
      </div>
      <div className="my-8 py-6 border-t border-gray-200 dark:border-slate-700">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          {t('strengthsSectionTitle') as string}
        </h3>
        <StrengthsSpark />
      </div>

      {applicationStatus !== 'submitting' &&
        allSectionsValid(
          formData,
          SECTIONS_CONFIG,
          t as (key: string, options?: Record<string, string | number>) => string
        ) && <Alert type="success" message={t('allSectionsComplete') as string} className="my-6" />}
      {applicationStatus === 'error' && Object.keys(formErrors).length > 0 && (
        <Alert type="error" message={t('incompleteSectionError') as string} className="mb-4" />
      )}

      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 flex justify-end">
        <Button
          onClick={handleSubmitApplication}
          isLoading={applicationStatus === 'submitting'}
          disabled={
            applicationStatus === 'submitting' ||
            (applicationStatus !== 'error' &&
              !allSectionsValid(
                formData,
                SECTIONS_CONFIG,
                t as (key: string, options?: Record<string, string | number>) => string
              ))
          }
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
        >
          {t('submitFinalAppButton') as string}
        </Button>
      </div>
    </SectionWrapper>
  )
}

export default ReviewSection
