'use client'

import React, { forwardRef } from 'react'
import { FormCheckboxProps } from '@/lib/careers/types'

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, name, className, error, ...props }, ref) => {
    return (
      <div className="mb-4">
        <div className="flex items-center">
          <input
            id={name}
            name={name}
            type="checkbox"
            ref={ref}
            className={`h-4 w-4 text-primary dark:text-blue-500 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-primary dark:focus:ring-blue-600 ${className || ''}`}
            {...props}
          />
          <label htmlFor={name} className="ml-2 block text-sm text-gray-900 dark:text-gray-200">
            {label}
          </label>
        </div>
        {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)
FormCheckbox.displayName = 'FormCheckbox'

export default FormCheckbox
