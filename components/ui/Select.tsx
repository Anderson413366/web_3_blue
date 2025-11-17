'use client'

import React, { forwardRef, SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
  isRequired?: boolean
}

/**
 * Accessible select dropdown component with label, error state, and helper text
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - Supports error state with error message
 * - Optional helper text
 * - Required field indicator
 * - Placeholder option support
 * - Disabled options support
 * - Full keyboard navigation support
 * - Focus-visible styles
 *
 * @example
 * <Select
 *   label="Facility Type"
 *   placeholder="Select facility type"
 *   options={[
 *     { value: 'office', label: 'Office Building' },
 *     { value: 'medical', label: 'Medical Facility' },
 *   ]}
 *   isRequired
 * />
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      options,
      placeholder,
      isRequired = false,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const helperTextId = helperText ? `${selectId}-helper` : undefined
    const errorId = error ? `${selectId}-error` : undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            {label}
            {isRequired && (
              <span className="text-error ml-1" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-describedby={cn(
              helperTextId && !error ? helperTextId : undefined,
              errorId ? errorId : undefined
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={isRequired}
            className={cn(
              // Base styles
              'block w-full px-4 py-2 pr-10 text-sm',
              'bg-white dark:bg-slate-800',
              'border rounded-lg',
              'transition-colors duration-200',
              'appearance-none',
              'cursor-pointer',

              // Focus styles (WCAG 2.1 AA)
              'focus:outline-none focus:ring-2 focus:ring-offset-0',

              // Normal state
              !error && !disabled && 'border-gray-300 dark:border-slate-600',
              !error && !disabled && 'focus:border-primary-500 focus:ring-primary-500/20',

              // Error state
              error && 'border-error dark:border-error',
              error && 'focus:border-error focus:ring-error/20',

              // Disabled state
              disabled && 'bg-gray-50 dark:bg-slate-900',
              disabled && 'text-gray-500 dark:text-slate-400',
              disabled && 'cursor-not-allowed',

              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>

          {/* Custom dropdown icon */}
          <div
            className={cn(
              'absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none',
              disabled ? 'text-gray-400 dark:text-slate-500' : 'text-gray-500 dark:text-slate-400'
            )}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {helperText && !error && (
          <p id={helperTextId} className="mt-1.5 text-xs text-gray-500 dark:text-slate-400">
            {helperText}
          </p>
        )}

        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-xs text-error dark:text-error-light flex items-center gap-1"
            role="alert"
          >
            <svg
              className="h-3.5 w-3.5 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'

export default Select
