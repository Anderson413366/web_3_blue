'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { AwardIconCareers, SparklesIconCareers } from '../icons'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import { identifyStrengths } from '@/lib/careers/services/geminiService'

const StrengthsSpark: React.FC = () => {
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

  const type = 'strengths'

  const handleGenerate = async () => {
    setIsLoadingSpark((prev) => ({ ...prev, [type]: true }))
    setSparkResults((prev) => ({ ...prev, [type]: null }))

    const position = formData.jobDetails.applyingFor
    const experiences = Object.entries(formData.jobDetails.experienceWith)
      .filter(([, value]) => value)
      .map(([key]) => t(`experienceWith_${key}Label`) as string)
    const knowYouAnswers = Object.entries(formData.gettingToKnowYou)
      .map(([key, answer]) => ({ questionKey: key, answer: String(answer) }))
      .filter((item) => item.answer.trim() !== '')

    if (!position || experiences.length === 0 || knowYouAnswers.length === 0) {
      setSparkResults((prev) => ({
        ...prev,
        [type]: [t('strengthsPromptDetailsMissing') as string],
      }))
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
      return
    }

    try {
      const result = await identifyStrengths(position, experiences, knowYouAnswers, currentLanguage)
      setSparkResults((prev) => ({ ...prev, [type]: result }))
    } catch (error) {
      console.error('Error generating strengths spark:', error)
      setSparkResults((prev) => ({ ...prev, [type]: [t('strengthsError') as string] }))
    } finally {
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
    }
  }

  const strengths = sparkResults[type] as string[] | null
  const hasError =
    strengths &&
    strengths.length > 0 &&
    (strengths[0].toLowerCase().includes('error') ||
      strengths[0] === (t('strengthsPromptDetailsMissing') as string))

  return (
    <div className="p-4 border border-dashed border-green-400 dark:border-green-600 rounded-lg bg-green-50 dark:bg-green-900/20">
      <div className="flex items-center mb-3">
        <SparklesIconCareers className="h-6 w-6 text-green-500 dark:text-green-400 mr-2" />
        <h4 className="text-md font-semibold text-green-700 dark:text-green-300">
          {(t('strengthsSectionTitle') as string).replace('✨ ', '')}
        </h4>
      </div>
      <Button
        onClick={handleGenerate}
        isLoading={isLoadingSpark[type]}
        disabled={isLoadingSpark[type]}
        variant="outline"
        className="border-green-500 text-green-600 hover:bg-green-100 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-800/50"
      >
        {isLoadingSpark[type]
          ? (t('generatingStrengths') as string)
          : (t('generateStrengthsButton') as string)}
      </Button>

      {isLoadingSpark[type] && (
        <Spinner message={t('generatingStrengths') as string} className="mt-3" />
      )}

      {strengths && !isLoadingSpark[type] && (
        <div className="mt-4">
          {hasError ? (
            <Alert type="error" title={t('strengthsError') as string} message={strengths[0]} />
          ) : (
            <>
              <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <AwardIconCareers className="h-5 w-5 mr-2 text-green-500 dark:text-green-400" />
                {t('strengthsSummary') as string}
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-slate-300">
                {strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default StrengthsSpark
