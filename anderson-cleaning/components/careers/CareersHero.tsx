'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { SparklesIconCareers } from './icons'
import { motion } from 'framer-motion'

interface CareersHeroProps {
  onStartApplication: () => void
}

const CareersHero: React.FC<CareersHeroProps> = ({ onStartApplication }) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  return (
    <section
      id="careers-hero"
      className="py-16 md:py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 dark:from-slate-800 dark:via-slate-900 dark:to-black text-white rounded-xl shadow-2xl overflow-hidden"
    >
      <div className="container mx-auto px-6 text-center relative">
        <SparklesIconCareers className="absolute top-8 left-8 h-12 w-12 text-yellow-300 opacity-50 transform rotate-12" />
        <SparklesIconCareers className="absolute bottom-12 right-12 h-16 w-16 text-yellow-300 opacity-70 transform -rotate-12" />

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight"
        >
          {t('heroTitle') as string}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 dark:text-slate-300"
        >
          {t('heroSubtitle') as string}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 150 }}
        >
          <Button
            size="lg"
            onClick={onStartApplication}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-10 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            {t('applicationTitle') as string}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default CareersHero
