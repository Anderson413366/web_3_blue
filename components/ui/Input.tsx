'use client'

import React, { forwardRef, InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  isLoading?: boolean
  isRequired?: boolean
}

/**
 * Accessible form input component with label, error state, and helper text
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - Supports error state with error message
 * - Optional helper text
 * - Loading state indicator
 * - Required field indicator
 * - Full keyboard navigation support
 * - Focus-visible styles
 *
 * @example
 * <Input
 *   label="Email Address"
 *   type="email"
 *   helperText="We'll never share your email"
 *   isRequired
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      isLoading = false,
      isRequired = false,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const helperTextId = helperText ? `${inputId}-helper` : undefined
    const errorId = error ? `${inputId}-error` : undefined

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
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
          <input
            ref={ref}
            id={inputId}
            disabled={disabled || isLoading}
            aria-describedby={cn(
              helperTextId && !error ? helperTextId : undefined,
              errorId ? errorId : undefined
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-required={isRequired}
            className={cn(
              // Base styles
              'block w-full px-4 py-2 text-sm',
              'bg-white dark:bg-slate-800',
              'border rounded-lg',
              'placeholder-gray-400 dark:placeholder-slate-500',
              'transition-colors duration-200',

              // Focus styles (WCAG 2.1 AA)
              'focus:outline-none focus:ring-2 focus:ring-offset-0',

              // Normal state
              !error && !disabled && 'border-gray-300 dark:border-slate-600',
              !error && !disabled && 'focus:border-primary-500 focus:ring-primary-500/20',

              // Error state
              error && 'border-error dark:border-error',
              error && 'focus:border-error focus:ring-error/20',

              // Disabled state
              (disabled || isLoading) && 'bg-gray-50 dark:bg-slate-900',
              (disabled || isLoading) && 'text-gray-500 dark:text-slate-400',
              (disabled || isLoading) && 'cursor-not-allowed',

              className
            )}
            {...props}
          />

          {isLoading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="animate-spin h-4 w-4 border-2 border-primary-500 border-t-transparent rounded-full" />
            </div>
          )}
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

Input.displayName = 'Input'

export default Input
