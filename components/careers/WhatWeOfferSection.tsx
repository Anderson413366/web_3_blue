'use client'

import React from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { DollarSign, Heart, TrendingUp, Clock } from 'lucide-react'

const WhatWeOfferSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  const benefits = [
    {
      icon: DollarSign,
      title: t('compensationTitle') as string,
      items: t('compensationItems') as string[],
    },
    {
      icon: Heart,
      title: t('benefitsPackageTitle') as string,
      items: t('benefitsPackageItems') as string[],
    },
    {
      icon: TrendingUp,
      title: t('trainingTitle') as string,
      items: t('trainingItems') as string[],
    },
    {
      icon: Clock,
      title: t('workLifeBalanceTitle') as string,
      items: t('workLifeBalanceItems') as string[],
    },
  ]

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('whatWeOfferTitle') as string}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('whatWeOfferSubtitle') as string}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-slate-800 rounded-xl p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                    <Icon className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-4">
                    {benefit.title}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {benefit.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-gray-600 dark:text-gray-400">
                      <span className="text-accent-500 mr-2 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhatWeOfferSection
