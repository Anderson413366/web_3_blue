'use client'

import React, { forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import type { ButtonProps } from './button.types'

const Button = forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps>(
  ({ className, variant, size, asChild = false, isLoading = false, children, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background dark:ring-offset-slate-900'

    let variantStyles = ''
    switch (variant) {
      case 'outline':
        variantStyles =
          'border-2 border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-brand-navy'
        break
      case 'ghost':
        variantStyles =
          'text-brand-navy hover:bg-neutral-light-grey dark:text-white dark:hover:bg-slate-800'
        break
      case 'link':
        variantStyles =
          'underline-offset-4 hover:underline text-brand-bright-blue dark:text-brand-bright-blue'
        break
      case 'destructive':
        variantStyles = 'bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800'
        break
      case 'primary':
        variantStyles =
          'bg-brand-navy text-white hover:bg-brand-navy/90 dark:bg-brand-navy dark:hover:bg-brand-navy/80'
        break
      case 'accent':
        variantStyles =
          'bg-brand-bright-blue text-white hover:bg-brand-bright-blue/90 dark:bg-brand-bright-blue dark:hover:bg-brand-bright-blue/80'
        break
      default: // 'default' variant
        variantStyles =
          'bg-brand-navy text-white hover:bg-brand-navy/90 dark:bg-brand-navy dark:hover:bg-brand-navy/80'
    }

    let sizeStyles = ''
    switch (size) {
      case 'sm':
        sizeStyles = 'h-9 px-4 text-button-sm'
        break
      case 'lg':
        sizeStyles = 'h-12 px-8 text-button'
        break
      case 'icon':
        sizeStyles = 'h-10 w-10'
        break
      default: // 'default' size
        sizeStyles = 'h-10 px-6 text-button-sm'
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
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
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
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </button>
      )
    }
  }
)
Button.displayName = 'Button'

export { Button }
