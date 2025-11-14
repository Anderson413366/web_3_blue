'use client'

import React, { forwardRef } from 'react'
import { FormSelectProps } from '@/lib/careers/types'
import { AppContext } from '@/lib/careers/AppContext'

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, name, options, className, error, isRequired, ...props }, ref) => {
    const context = React.useContext(AppContext)
    if (!context) throw new Error('AppContext not found')
    const { t } = context

    return (
      <div className="mb-4">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {isRequired && (
            <span className="text-red-500 ml-1">{t('requiredFieldIndicator') as string}</span>
          )}
        </label>
        <select
          id={name}
          name={name}
          ref={ref}
          className={`mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-slate-800 border-gray-300 dark:border-slate-600 
                      focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md
                      ${error ? 'border-red-500 dark:border-red-400' : ''} ${className || ''}`}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)
FormSelect.displayName = 'FormSelect'

export default FormSelect
