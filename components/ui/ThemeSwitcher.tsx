'use client'

import React, { useContext } from 'react'
import { useTheme } from '@/lib/ThemeProvider'
import { AppContext } from '@/lib/careers/AppContext'
import { Button } from './Button'
import { Sun, Moon } from 'lucide-react'

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const context = useContext(AppContext)

  // Get translation function if AppContext is available (for careers page)
  const t = context?.t || ((key: string) => key)

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
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  )
}

export default ThemeSwitcher
