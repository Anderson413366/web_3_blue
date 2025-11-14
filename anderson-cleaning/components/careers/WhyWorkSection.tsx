'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { motion } from 'framer-motion'
import { GrowthIcon, UsersIcon, HandshakeIcon, ShieldCheckIcon } from './icons'

const WhyWorkSection: React.FC = () => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  // t function now returns Translations[string], so the cast is appropriate if the key maps to this structure.
  const whyWorkItems = t('whyWorkItems') as { title: string; description: string }[]

  const iconMap: { [key: string]: React.FC<any> } = {
    'Growth Opportunities': GrowthIcon,
    'Supportive Culture': UsersIcon,
    'Impactful Work': HandshakeIcon,
    'Competitive Benefits': ShieldCheckIcon,
  }

  const MotionCard = motion(Card)

  return (
    <section id="why-work" className="py-16 md:py-20 bg-gray-50 dark:bg-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          {t('whyWorkTitle') as string}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyWorkItems.map((item, index) => {
            const IconComponent = iconMap[item.title] || ShieldCheckIcon
            return (
              <MotionCard
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                }}
                className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300 bg-white dark:bg-slate-700"
              >
                <CardHeader className="flex-row items-center space-x-4">
                  <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                    <IconComponent className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <CardTitle className="text-lg text-gray-900 dark:text-white">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </CardContent>
              </MotionCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyWorkSection
