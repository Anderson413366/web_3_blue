'use client'

import React, { useContext } from 'react'
import { AppContext } from '@/lib/careers/AppContext'
import { LanguageCode } from '@/lib/careers/types'
import { Button } from './Button'
import { GlobeIconCareers } from '../careers/icons'

const LanguageSwitcher: React.FC = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')

  const { currentLanguage, setCurrentLanguage, t } = context

  const languages: { code: LanguageCode; name: string; short: string }[] = [
    { code: 'en', name: 'English', short: 'EN' },
    { code: 'es', name: 'Español', short: 'ES' },
    { code: 'pt-BR', name: 'Português', short: 'PT' },
    { code: 'ro', name: 'Română', short: 'RO' },
  ]

  return (
    <div className="flex items-center space-x-2" aria-label="Change application language">
      <GlobeIconCareers className="h-5 w-5 text-gray-600 dark:text-slate-400" />
      <div className="flex items-center divide-x divide-gray-300 dark:divide-slate-600 border border-gray-300 dark:border-slate-600 rounded-md overflow-hidden">
        {languages.map((lang, index) => (
          <button
            key={lang.code}
            onClick={() => setCurrentLanguage(lang.code)}
            className={`px-3 py-1.5 text-sm font-medium transition-colors ${
              currentLanguage === lang.code
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-600'
            }`}
            aria-label={`Switch to ${lang.name}`}
            aria-pressed={currentLanguage === lang.code}
          >
            {lang.short}
          </button>
        ))}
      </div>
    </div>
  )
}

export default LanguageSwitcher
