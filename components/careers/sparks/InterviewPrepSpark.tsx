'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { LightbulbIconCareers, SparklesIconCareers } from '../icons'
import Alert from '@/components/ui/Alert'
import Spinner from '@/components/ui/Spinner'
import { generateInterviewTips } from '@/lib/careers/services/geminiService'
import { InterviewPrepTip } from '@/lib/careers/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const InterviewPrepSpark: React.FC = () => {
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

  const type = 'interviewPrep'

  const handleGenerate = async () => {
    setIsLoadingSpark((prev) => ({ ...prev, [type]: true }))
    setSparkResults((prev) => ({ ...prev, [type]: null }))

    const position = formData.jobDetails.applyingFor
    const knowYouAnswers = Object.entries(formData.gettingToKnowYou)
      .map(([key, answer]) => ({ questionKey: key, answer: String(answer) }))
      .filter((item) => item.answer.trim() !== '')

    if (!position || knowYouAnswers.length === 0) {
      setSparkResults((prev) => ({
        ...prev,
        [type]: [{ question: t('interviewPrepPromptDetailsMissing') as string, tip: '' }],
      }))
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
      return
    }

    try {
      const result = await generateInterviewTips(position, knowYouAnswers, currentLanguage)
      setSparkResults((prev) => ({ ...prev, [type]: result }))
    } catch (error) {
      console.error('Error generating interview prep spark:', error)
      setSparkResults((prev) => ({
        ...prev,
        [type]: [{ question: t('interviewPrepError') as string, tip: '' }],
      }))
    } finally {
      setIsLoadingSpark((prev) => ({ ...prev, [type]: false }))
    }
  }

  const tips = sparkResults[type] as InterviewPrepTip[] | null
  const hasError =
    tips &&
    tips.length > 0 &&
    (tips[0].question.toLowerCase().includes('error') ||
      tips[0].question === (t('interviewPrepPromptDetailsMissing') as string))

  return (
    <div className="p-4 border border-dashed border-blue-400 dark:border-blue-600 rounded-lg bg-blue-50 dark:bg-blue-900/20">
      <div className="flex items-center mb-3">
        <SparklesIconCareers className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
        <h4 className="text-md font-semibold text-blue-700 dark:text-blue-300">
          {(t('interviewPrepSectionTitle') as string).replace('✨ ', '')}
        </h4>
      </div>
      <Button
        onClick={handleGenerate}
        isLoading={isLoadingSpark[type]}
        disabled={isLoadingSpark[type]}
        variant="outline"
        className="border-blue-500 text-blue-600 hover:bg-blue-100 dark:border-blue-600 dark:text-blue-400 dark:hover:bg-blue-800/50"
      >
        {isLoadingSpark[type]
          ? (t('generatingInterviewPrep') as string)
          : (t('generateInterviewPrepButton') as string)}
      </Button>

      {isLoadingSpark[type] && (
        <Spinner message={t('generatingInterviewPrep') as string} className="mt-3" />
      )}

      {tips && !isLoadingSpark[type] && (
        <div className="mt-4 space-y-3">
          {hasError ? (
            <Alert
              type="error"
              title={t('interviewPrepError') as string}
              message={tips[0].question}
            />
          ) : (
            <>
              <h5 className="text-md font-semibold text-gray-700 dark:text-gray-300 flex items-center">
                <LightbulbIconCareers className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                {t('interviewPrepTips') as string}
              </h5>
              {tips.map((tip, index) => (
                <Card key={index} className="bg-card/80 dark:bg-slate-800/80 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-sm text-primary dark:text-blue-400">
                      {t('interviewQuestionLabel') as string} {tip.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground dark:text-slate-400">
                      <strong>{t('interviewTipLabel') as string}</strong> {tip.tip}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default InterviewPrepSpark
