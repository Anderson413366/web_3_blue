'use client'

import React, { forwardRef, TextareaHTMLAttributes, useState, useEffect } from 'react'
import { cn } from '@/lib/utils/cn'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
  error?: string
  isRequired?: boolean
  showCharCount?: boolean
  maxLength?: number
}

/**
 * Accessible textarea component with label, error state, helper text, and character count
 *
 * Features:
 * - WCAG 2.1 AA compliant
 * - Supports error state with error message
 * - Optional helper text
 * - Character count indicator
 * - Required field indicator
 * - Full keyboard navigation support
 * - Focus-visible styles
 * - Auto-resize support (via rows prop)
 *
 * @example
 * <Textarea
 *   label="Additional Notes"
 *   helperText="Tell us more about your cleaning needs"
 *   maxLength={500}
 *   showCharCount
 *   rows={4}
 *   isRequired
 * />
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      isRequired = false,
      showCharCount = false,
      maxLength,
      className,
      id,
      disabled,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(0)
    const textareaId = id || `textarea-${label?.toLowerCase().replace(/\s+/g, '-')}`
    const helperTextId = helperText ? `${textareaId}-helper` : undefined
    const errorId = error ? `${textareaId}-error` : undefined
    const charCountId = showCharCount ? `${textareaId}-charcount` : undefined

    // Track character count
    useEffect(() => {
      if (value !== undefined) {
        setCharCount(String(value).length)
      } else if (defaultValue !== undefined) {
        setCharCount(String(defaultValue).length)
      }
    }, [value, defaultValue])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      if (onChange) {
        onChange(e)
      }
    }

    const isNearLimit = maxLength && charCount / maxLength > 0.9
    const isAtLimit = maxLength && charCount >= maxLength

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
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
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            defaultValue={defaultValue}
            onChange={handleChange}
            aria-describedby={cn(
              helperTextId && !error ? helperTextId : undefined,
              errorId ? errorId : undefined,
              charCountId ? charCountId : undefined
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
              'resize-y',

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
              disabled && 'resize-none',

              // Character limit warning
              showCharCount && isAtLimit && 'border-warning',

              className
            )}
            {...props}
          />
        </div>

        <div className="mt-1.5 flex items-start justify-between gap-2">
          <div className="flex-1">
            {helperText && !error && (
              <p id={helperTextId} className="text-xs text-gray-500 dark:text-slate-400">
                {helperText}
              </p>
            )}

            {error && (
              <p
                id={errorId}
                className="text-xs text-error dark:text-error-light flex items-center gap-1"
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

          {showCharCount && (
            <p
              id={charCountId}
              className={cn(
                'text-xs font-medium flex-shrink-0',
                isAtLimit && 'text-warning dark:text-warning',
                isNearLimit && !isAtLimit && 'text-gray-600 dark:text-slate-300',
                !isNearLimit && 'text-gray-500 dark:text-slate-400'
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {charCount}
              {maxLength && ` / ${maxLength}`}
            </p>
          )}
        </div>
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'

export default Textarea
