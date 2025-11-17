'use client'

import React, { forwardRef } from 'react'
import { AvatarProps, AvatarImageProps, AvatarFallbackProps } from '@/lib/careers/types'

// Image fallback helper (as provided by user)
const imageErrorFallback = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  placeholderText = 'Image Not Found'
) => {
  event.currentTarget.onerror = null // Prevent infinite loop if fallback also fails
  event.currentTarget.src = `https://placehold.co/600x400/E0E0E0/B0B0B0?text=${encodeURIComponent(placeholderText)}`
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full ${className}`}
    {...props}
  />
))
Avatar.displayName = 'Avatar'

const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`aspect-square h-full w-full ${className}`}
      onError={(e) => imageErrorFallback(e, 'Avatar')}
      {...props}
    />
  )
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center rounded-full bg-muted dark:bg-slate-700 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)
AvatarFallback.displayName = 'AvatarFallback'

export { Avatar, AvatarImage, AvatarFallback }
