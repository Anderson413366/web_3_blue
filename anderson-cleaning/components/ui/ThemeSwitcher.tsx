'use client'

import React, { useContext } from 'react'
import { AppContext } from '@/lib/careers/AppContext'
import { Button } from './Button'
import { SunIconCareers, MoonIconCareers } from '../careers/icons'

const ThemeSwitcher: React.FC = () => {
  const context = useContext(AppContext)
  if (!context) throw new Error('AppContext not found')

  const { theme, setTheme, t } = context

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        theme === 'light' ? (t('darkModeButton') as string) : (t('lightModeButton') as string)
      }
      className="text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-blue-400"
    >
      {theme === 'light' ? (
        <MoonIconCareers className="h-5 w-5" />
      ) : (
        <SunIconCareers className="h-5 w-5" />
      )}
    </Button>
  )
}

export default ThemeSwitcher
