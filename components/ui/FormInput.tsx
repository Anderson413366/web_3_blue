'use client'

import React, { forwardRef } from 'react'
import { FormInputProps } from '@/lib/careers/types'
import { AppContext } from '@/lib/careers/AppContext' // Assuming AppContext is in App.tsx

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, className, error, type = 'text', isRequired, ...props }, ref) => {
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
        <input
          type={type}
          id={name}
          name={name}
          ref={ref}
          className={`mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-slate-500
                      focus:outline-none focus:ring-primary focus:border-primary sm:text-sm
                      ${error ? 'border-red-500 dark:border-red-400' : ''} ${className || ''}`}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

export default FormInput
