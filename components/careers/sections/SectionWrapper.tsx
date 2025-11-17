'use client'

import React, { useContext } from 'react'
import { useAppContext } from '@/lib/careers/AppContext'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/Card'

interface SectionWrapperProps {
  titleKey: string
  descriptionKey?: string
  children: React.ReactNode
  className?: string
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  titleKey,
  descriptionKey,
  children,
  className,
}) => {
  const context = useAppContext()
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  return (
    <Card className={`mb-8 shadow-lg dark:bg-slate-800/70 ${className}`}>
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 dark:text-gray-100">
          {t(titleKey) as string}
        </CardTitle>
        {descriptionKey && (
          <CardDescription className="dark:text-slate-400">
            {t(descriptionKey) as string}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default SectionWrapper
