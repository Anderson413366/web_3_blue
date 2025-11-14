'use client'

import React from 'react'
import { Loader2IconCareers } from '../careers/icons' // Using career-specific icon

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  message?: string
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className, message }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className || ''}`}>
      <Loader2IconCareers
        className={`${sizeClasses[size]} text-primary dark:text-blue-500 animate-spin`}
      />
      {message && <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">{message}</p>}
    </div>
  )
}

export default Spinner
