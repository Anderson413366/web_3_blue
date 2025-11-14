'use client'

import React, { forwardRef } from 'react'
import { ButtonProps } from '@/lib/careers/types'
import { Loader2IconCareers } from '../careers/icons'

const Button = forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:ring-offset-slate-900'

    let variantStyles = ''
    switch (variant) {
      case 'outline':
        variantStyles =
          'border border-input hover:bg-accent hover:text-accent-foreground dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100'
        break
      case 'ghost':
        variantStyles =
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-slate-800 dark:hover:text-slate-100'
        break
      case 'link':
        variantStyles =
          'underline-offset-4 hover:underline text-primary dark:text-blue-400 dark:hover:text-blue-300'
        break
      case 'destructive':
        variantStyles =
          'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
        break
      case 'primary':
        variantStyles =
          'bg-primary-700 text-white hover:bg-primary-800 dark:bg-blue-600 dark:hover:bg-blue-700'
        break
      case 'accent':
        variantStyles =
          'bg-accent-500 text-white hover:bg-accent-600 dark:bg-green-500 dark:hover:bg-green-600'
        break
      default: // 'default' variant
        variantStyles =
          'bg-primary text-primary-foreground hover:bg-primary/90 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700'
    }

    let sizeStyles = ''
    switch (size) {
      case 'sm':
        sizeStyles = 'h-9 px-3 rounded-md text-sm'
        break
      case 'lg':
        sizeStyles = 'h-11 px-8 rounded-md text-base'
        break
      case 'icon':
        sizeStyles = 'h-10 w-10'
        break
      default: // 'default' size
        sizeStyles = 'h-10 py-2 px-4'
    }

    const finalClassName = `${baseStyles} ${variantStyles} ${sizeStyles} ${className || ''}`

    if (asChild) {
      // When asChild is true, render as div
      // Extract only div-compatible props
      const {
        disabled,
        form,
        formAction,
        formEncType,
        formMethod,
        formNoValidate,
        formTarget,
        name,
        type,
        value,
        onToggle,
        ...divCompatibleProps
      } = props

      return (
        <div
          className={finalClassName}
          ref={ref as React.Ref<HTMLDivElement>}
          {...(divCompatibleProps as React.HTMLAttributes<HTMLDivElement>)}
        >
          {isLoading && <Loader2IconCareers className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </div>
      )
    } else {
      // When asChild is false, render as button
      return (
        <button
          className={finalClassName}
          ref={ref as React.Ref<HTMLButtonElement>}
          {...props}
          disabled={props.disabled || isLoading}
        >
          {isLoading && <Loader2IconCareers className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </button>
      )
    }
  }
)
Button.displayName = 'Button'

export { Button }
