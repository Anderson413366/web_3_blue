'use client'

import React from 'react'
import { AlertCircleIconCareers, CheckIconCareers, LightbulbIconCareers } from '../careers/icons' // Using CareersPage specific icons

interface AlertProps {
  type: 'success' | 'error' | 'info' | 'warning'
  title?: string
  message: string | React.ReactNode
  className?: string
}

const Alert: React.FC<AlertProps> = ({ type, title, message, className }) => {
  const typeStyles = {
    success: {
      bg: 'bg-green-50 dark:bg-green-900/30',
      text: 'text-green-700 dark:text-green-300',
      border: 'border-green-400 dark:border-green-600',
      icon: <CheckIconCareers className="h-5 w-5 text-green-500 dark:text-green-400" />,
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/30',
      text: 'text-red-700 dark:text-red-300',
      border: 'border-red-400 dark:border-red-600',
      icon: <AlertCircleIconCareers className="h-5 w-5 text-red-500 dark:text-red-400" />,
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/30',
      text: 'text-blue-700 dark:text-blue-300',
      border: 'border-blue-400 dark:border-blue-600',
      icon: <LightbulbIconCareers className="h-5 w-5 text-blue-500 dark:text-blue-400" />,
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/30',
      text: 'text-yellow-700 dark:text-yellow-300',
      border: 'border-yellow-400 dark:border-yellow-600',
      icon: <AlertCircleIconCareers className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />, // Could use a different icon for warning
    },
  }

  const currentStyle = typeStyles[type]

  return (
    <div
      className={`p-4 border-l-4 rounded-md ${currentStyle.bg} ${currentStyle.border} ${className || ''}`}
      role="alert"
    >
      <div className="flex">
        <div className="flex-shrink-0">{currentStyle.icon}</div>
        <div className="ml-3">
          {title && <h3 className={`text-sm font-medium ${currentStyle.text}`}>{title}</h3>}
          <div className={`text-sm ${currentStyle.text} ${title ? 'mt-1' : ''}`}>
            {typeof message === 'string' ? <p>{message}</p> : message}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Alert
