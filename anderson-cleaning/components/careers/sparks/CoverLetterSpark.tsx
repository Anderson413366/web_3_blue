'use client'

import React, { useContext, useState } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { SparklesIconCareers } from '../icons'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import { generateCoverLetterSuggestion } from '@/lib/careers/services/geminiService'

interface CoverLetterSparkProps {
  onSuggestion: (suggestion: string) => void
}

const CoverLetterSpark: React.FC<CoverLetterSparkProps> = ({ onSuggestion }) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')

  const {
    t,
    formData,
    currentLanguage,
    isLoadingSpark,
    setIsLoadingSpark,
    sparkResults,
    setSparkResults,
  } = context

  const type = 'coverLetter'

  const handleGenerate = async () => {
    setIsLoadingSpark((prev) => ({ ...prev, [type]: true }))
    setSparkResults((prev) => ({ ...prev, [type]: null }))

    const position = formData.jobDetails.applyingFor
    const experiences = Object.entries(formData.jobDetails.experienceWith)
      .filter(([, value]) => value)
      .map(([key]) => t(`experienceWith_${key}Label`) as string) // Get translated experience labels

    if (!position || experiences.length === 0) {
      setSparkResults((prev) => ({
        ...prev,
        [type]: t('coverLetterPromptDetailsMissing') as string,
      }))
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
      return
    }

    try {
      const result = await generateCoverLetterSuggestion(position, experiences, currentLanguage)
      setSparkResults((prev) => ({ ...prev, [type]: result }))
      if (result && !result.toLowerCase().includes('error')) {
        // Optionally auto-apply or provide a button to use it
      }
    } catch (error) {
      console.error('Error generating cover letter spark:', error)
      setSparkResults((prev) => ({ ...prev, [type]: t('coverLetterSparkError') as string }))
    } finally {
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
    }
  }

  const suggestionText = sparkResults[type] as string | null

  return (
    <div className="mt-4 p-4 border border-dashed border-yellow-400 dark:border-yellow-600 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
      <div className="flex items-center mb-3">
        <SparklesIconCareers className="h-6 w-6 text-yellow-500 dark:text-yellow-400 mr-2" />
        <h4 className="text-md font-semibold text-yellow-700 dark:text-yellow-300">
          {t('generateCoverLetterSparkButton') as string}
        </h4>
      </div>

      <Button
        onClick={handleGenerate}
        isLoading={isLoadingSpark[type]}
        disabled={isLoadingSpark[type]}
        variant="outline"
        className="border-yellow-500 text-yellow-600 hover:bg-yellow-100 dark:border-yellow-600 dark:text-yellow-400 dark:hover:bg-yellow-800/50"
      >
        {isLoadingSpark[type]
          ? (t('generatingCoverLetterSpark') as string)
          : (t('generateCoverLetterSparkButton') as string).replace('✨ ', '')}
      </Button>

      {isLoadingSpark[type] && (
        <Spinner message={t('generatingCoverLetterSpark') as string} className="mt-3" />
      )}

      {suggestionText && !isLoadingSpark[type] && (
        <div className="mt-4">
          <Alert
            type={
              suggestionText.toLowerCase().includes('error') ||
              suggestionText === (t('coverLetterPromptDetailsMissing') as string)
                ? 'error'
                : 'info'
            }
            title={
              suggestionText.toLowerCase().includes('error') ||
              suggestionText === (t('coverLetterPromptDetailsMissing') as string)
                ? (t('coverLetterSparkError') as string)
                : (t('coverLetterSparkSuggestion') as string)
            }
            message={<p className="whitespace-pre-wrap">{suggestionText}</p>}
          />
          {!suggestionText.toLowerCase().includes('error') &&
            suggestionText !== (t('coverLetterPromptDetailsMissing') as string) && (
              <Button
                onClick={() => onSuggestion(suggestionText)}
                variant="default"
                size="sm"
                className="mt-3"
              >
                {t('useSparkSuggestionButton') as string}
              </Button>
            )}
        </div>
      )}
    </div>
  )
}

export default CoverLetterSpark
