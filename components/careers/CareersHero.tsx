'use client'

import React from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Button } from '@/components/ui/Button'
import { Globe, CheckCircle2, Users, Award, TrendingUp, ArrowRight } from 'lucide-react'
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
      className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white py-16 md:py-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" aria-hidden="true"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-accent-500/20 border border-accent-400/30 rounded-full text-accent-300 text-sm font-medium">
              Join Our Growing Team
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
            {t('heroTitle') as string}
          </h1>

          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t('heroSubtitle') as string}
          </p>

          {/* Key Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <CheckCircle2 className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm">Full-Time W-2 Positions</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <CheckCircle2 className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm">40+ Hours Paid Training</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <CheckCircle2 className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm">Health Insurance</span>
            </div>
            <div className="flex items-center justify-center space-x-2 text-blue-100">
              <CheckCircle2 className="h-5 w-5 text-accent-400 flex-shrink-0" aria-hidden="true" />
              <span className="text-sm">Career Advancement</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mb-10">
            <Button
              variant="accent"
              size="lg"
              onClick={onStartApplication}
              className="group"
            >
              {t('applicationTitle') as string}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
          </div>

          {/* Language Selector */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 text-sm text-blue-200 mb-3">
              <Globe className="h-4 w-4" aria-hidden="true" />
              <span>{t('selectLanguage') as string}</span>
            </div>
            <div
              className="inline-flex flex-wrap justify-center gap-2 sm:gap-0 sm:bg-white/10 sm:backdrop-blur-sm sm:rounded-lg sm:p-1 sm:border sm:border-white/20"
              role="group"
              aria-label="Language selection"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setCurrentLanguage(lang.code)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    currentLanguage === lang.code
                      ? 'bg-accent-500 text-white shadow-lg scale-105'
                      : 'bg-white/10 sm:bg-transparent text-white hover:bg-white/20 sm:hover:bg-white/10'
                  }`}
                  aria-label={`Switch to ${lang.name}`}
                  aria-pressed={currentLanguage === lang.code}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mt-8">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent-400" aria-hidden="true" />
              <span>100+ Team Members</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-accent-400" aria-hidden="true" />
              <span>20+ Years in Business</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent-400" aria-hidden="true" />
              <span>Growing Company</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CareersHero
