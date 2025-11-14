'use client'

import React from 'react'
import { FormCheckboxGroupProps } from '@/lib/careers/types'
import { AppContext } from '@/lib/careers/AppContext'

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = ({
  label,
  namePrefix,
  options,
  values,
  onChange,
  error,
  translationKeyPrefix,
}) => {
  const context = React.useContext(AppContext)
  if (!context) throw new Error('AppContext not found')
  const { t } = context

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="mt-2 space-y-2">
        {options.map((optionKey) => (
          <div key={optionKey} className="flex items-center">
            <input
              id={`${namePrefix}-${optionKey}`}
              name={`${namePrefix}-${optionKey}`}
              type="checkbox"
              checked={values[optionKey] || false}
              onChange={(e) => onChange(optionKey, e.target.checked)}
              className="h-4 w-4 text-primary dark:text-blue-500 bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600 rounded focus:ring-primary dark:focus:ring-blue-600"
            />
            <label
              htmlFor={`${namePrefix}-${optionKey}`}
              className="ml-2 block text-sm text-gray-900 dark:text-gray-200"
            >
              {t(`${translationKeyPrefix}_${optionKey}Label`) as string}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  )
}

export default FormCheckboxGroup
