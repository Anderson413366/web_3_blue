'use client'

import React, { useContext, useState, useCallback } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import ProgressBar from '@/components/ui/ProgressBar'
import CareersHero from './CareersHero'
import WhyWorkSection from './WhyWorkSection'
import WhatWeOfferSection from './WhatWeOfferSection'
import EmployeeStoriesSection from './EmployeeStoriesSection'
import CompanyCultureSection from './CompanyCultureSection'
import ApplicationProcessSection from './ApplicationProcessSection'
import CareerFAQSection from './CareerFAQSection'
import Alert from '@/components/ui/Alert'
import Modal from '@/components/ui/Modal'
import { SectionConfig, SectionError } from '@/lib/careers/types'
import { validateSectionData } from '@/lib/careers/utils/validation'

/**
 * Client-side experience that combines the marketing hero sections with the
 * multi-step application wizard backed by the careers context.
 */
const CareersPage: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')

  const {
    t,
    formData,
    currentSectionIndex,
    setCurrentSectionIndex,
    SECTIONS_CONFIG,
    applicationStatus,
    setApplicationStatus,
    formErrors,
    setFormErrors,
  } = context

  const [showIntro, setShowIntro] = useState(true)

  const CurrentSectionComponent = SECTIONS_CONFIG[currentSectionIndex]?.component
  const currentSectionConfig = SECTIONS_CONFIG[currentSectionIndex]

  const handleNextSection = useCallback(() => {
    // Validate current section before proceeding
    const errors = validateSectionData(
      formData,
      currentSectionConfig.id,
      t as (key: string, options?: Record<string, string | number>) => string,
      currentSectionConfig.requiredFields || []
    )
    setFormErrors(errors)

    if (Object.keys(errors).length === 0) {
      if (currentSectionIndex < SECTIONS_CONFIG.length - 1) {
        setCurrentSectionIndex((prev) => prev + 1)
        window.scrollTo(0, 0)
      } else {
        // This case should ideally not be hit if "Review Application" is the last step before true submission
        // True submission logic is handled by ReviewSection
      }
    } else {
      setApplicationStatus('error') // Indicate validation error
      setTimeout(() => setApplicationStatus('idle'), 3000) // Reset after a delay
    }
  }, [
    formData,
    currentSectionIndex,
    setCurrentSectionIndex,
    t,
    SECTIONS_CONFIG,
    setFormErrors,
    currentSectionConfig,
    setApplicationStatus,
  ])

  const handlePrevSection = useCallback(() => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex((prev) => prev - 1)
      window.scrollTo(0, 0)
      setFormErrors({}) // Clear errors when moving back
    } else {
      setShowIntro(true) // Go back to intro sections
    }
  }, [currentSectionIndex, setCurrentSectionIndex, setFormErrors])

  const handleStartApplication = () => {
    setShowIntro(false)
    setCurrentSectionIndex(0) // Start with the first form section
    window.scrollTo(0, 0)
  }

  if (showIntro) {
    return (
      <>
        <CareersHero onStartApplication={handleStartApplication} />
        <WhyWorkSection />
        <WhatWeOfferSection />
        <EmployeeStoriesSection />
        <CompanyCultureSection />
        <ApplicationProcessSection onStartApplication={handleStartApplication} />
        <CareerFAQSection onStartApplication={handleStartApplication} />
      </>
    )
  }

  const totalFormSteps = SECTIONS_CONFIG.filter((s) => s.id !== 'hero' && s.id !== 'whyWork').length
  const currentFormStep = currentSectionIndex + 1

  return (
    <main className="bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
        <ProgressBar
          currentStep={currentFormStep}
          totalSteps={totalFormSteps}
          currentTitle={t(SECTIONS_CONFIG[currentSectionIndex].titleKey) as string}
        />

        {applicationStatus === 'error' && Object.keys(formErrors).length > 0 && (
          <Alert type="error" message={t('incompleteSectionError') as string} className="mb-4" />
        )}
        {applicationStatus === 'error' &&
          Object.keys(formErrors).length === 0 && ( // General submission error
            <Alert type="error" message={t('submissionErrorMessage') as string} className="mb-4" />
          )}

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSectionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {CurrentSectionComponent && <CurrentSectionComponent />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={handlePrevSection}
            variant="outline"
            disabled={currentSectionIndex === 0 && showIntro}
            className="w-full sm:w-auto"
          >
            {t('prevButton') as string}
          </Button>
          {SECTIONS_CONFIG[currentSectionIndex].id !== 'review' && (
            <Button
              onClick={handleNextSection}
              className="w-full sm:w-auto"
              isLoading={applicationStatus === 'submitting'}
            >
              {currentSectionIndex === SECTIONS_CONFIG.length - 2
                ? (t('reviewAppButton') as string)
                : (t('nextButton') as string)}
            </Button>
          )}
        </div>
        </div>
      </div>

      <Modal
        isOpen={applicationStatus === 'success'}
        onClose={() => {
          setApplicationStatus('idle')
          // Optionally reset form or redirect:
          // setFormData(INITIAL_FORM_DATA);
          // setCurrentSectionIndex(0);
          setShowIntro(true) // Go back to intro
        }}
        title={t('submissionSuccessTitle') as string}
      >
        <p>{t('submissionSuccessMessage') as string}</p>
      </Modal>
    </main>
  )
}

export default CareersPage
