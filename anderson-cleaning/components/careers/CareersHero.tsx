'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { LanguageCode } from '@/lib/careers/types'

interface CareersHeroProps {
  onStartApplication: () => void
}

const CareersHero: React.FC<CareersHeroProps> = ({ onStartApplication }) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t, currentLanguage, setCurrentLanguage } = context

  const languages: { code: LanguageCode; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'pt-BR', name: 'Português' },
    { code: 'ro', name: 'Română' },
  ]

  return (
    <section
      id="careers-hero"
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            {t('heroTitle') as string}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100"
          >
            {t('heroSubtitle') as string}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, type: 'spring', stiffness: 150 }}
            className="mb-8"
          >
            <Button
              size="lg"
              onClick={onStartApplication}
              className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 dark:text-blue-900 font-semibold px-10 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              {t('applicationTitle') as string}
            </Button>
          </motion.div>

          {/* Language Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-col items-center"
          >
            <p className="text-sm text-blue-200 mb-3 font-medium">Select Your Language:</p>
            <div className="inline-flex bg-white/10 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-white/20">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 ${
                    currentLanguage === lang.code
                      ? 'bg-yellow-400 text-blue-900 shadow-md'
                      : 'text-white hover:bg-white/10'
                  }`}
                  aria-label={`Switch to ${lang.name}`}
                  aria-pressed={currentLanguage === lang.code}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default CareersHero
