'use client'

import React, { useState } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { ChevronDown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface CareerFAQSectionProps {
  onStartApplication: () => void
}

const CareerFAQSection: React.FC<CareerFAQSectionProps> = ({ onStartApplication }) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqsData = t('careerFAQs')
  const faqs = Array.isArray(faqsData)
    ? (faqsData as unknown as { question: string; answer: string }[])
    : []

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('careerFAQTitle') as string}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('careerFAQSubtitle') as string}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-slate-700 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="font-semibold text-left text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-600 dark:text-gray-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="p-6 bg-white dark:bg-slate-900">
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {t('stillHaveQuestions') as string}
          </p>
          <Button variant="accent" size="lg" onClick={onStartApplication} className="group">
            {t('applyNowButton') as string}
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default CareerFAQSection
