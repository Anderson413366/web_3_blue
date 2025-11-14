/**
 * Optimized Image Component
 *
 * Wrapper around next/image with performance best practices:
 * - Automatic WebP/AVIF conversion
 * - Blur placeholder for above-fold images
 * - Lazy loading for below-fold images
 * - Proper sizing to prevent CLS
 */

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

export interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /**
   * Whether this image is above the fold (should be loaded with priority)
   */
  priority?: boolean

  /**
   * Show blur placeholder while loading (recommended for above-fold)
   */
  blurPlaceholder?: boolean

  /**
   * Fallback image if primary fails to load
   */
  fallbackSrc?: string
}

export default function OptimizedImage({
  src,
  alt,
  priority = false,
  blurPlaceholder = false,
  fallbackSrc,
  onError,
  ...props
}: OptimizedImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [isLoading, setIsLoading] = useState(true)

  const handleError: React.ReactEventHandler<HTMLImageElement> = (e) => {
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc)
    }
    onError?.(e)
  }

  const handleLoadingComplete = (result: any) => {
    setIsLoading(false)
    if (props.onLoadingComplete) {
      props.onLoadingComplete(result)
    }
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      placeholder={blurPlaceholder ? 'blur' : undefined}
      onError={handleError}
      onLoadingComplete={handleLoadingComplete}
      {...props}
      style={{
        ...props.style,
        transition: 'opacity 0.3s ease-in-out',
        opacity: isLoading && blurPlaceholder ? 0.8 : 1,
      }}
    />
  )
}

/**
 * Hero Image Component
 * Optimized for LCP - uses priority loading and blur placeholder
 */
export function HeroImage(props: Omit<OptimizedImageProps, 'priority' | 'blurPlaceholder'>) {
  return <OptimizedImage {...props} priority blurPlaceholder />
}

/**
 * Background Image Component
 * For decorative images that can load lazily
 */
export function BackgroundImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      sizes="100vw"
      style={{
        objectFit: 'cover',
        ...props.style,
      }}
    />
  )
}

/**
 * Logo Image Component
 * Small images that should load quickly
 */
export function LogoImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority
      sizes="(max-width: 768px) 150px, 200px"
      style={{
        width: 'auto',
        height: 'auto',
        ...props.style,
      }}
    />
  )
}

/**
 * Card Image Component
 * For images in card layouts
 */
interface CardImageProps extends OptimizedImageProps {
  aspectRatio?: '1:1' | '4:3' | '16:9' | '3:2'
}

export function CardImage({ aspectRatio = '16:9', ...props }: CardImageProps) {
  const aspectRatios = {
    '1:1': '100%',
    '4:3': '75%',
    '16:9': '56.25%',
    '3:2': '66.67%',
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        paddingBottom: aspectRatios[aspectRatio],
        overflow: 'hidden',
      }}
    >
      <OptimizedImage
        {...props}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{
          objectFit: 'cover',
          ...props.style,
        }}
      />
    </div>
  )
}

/**
 * Generate blur data URL for placeholder
 * Creates a tiny blurred version of the image for loading state
 */
export function generateBlurDataURL(width: number = 8, height: number = 8): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <filter id="blur">
        <feGaussianBlur stdDeviation="2"/>
      </filter>
      <rect width="${width}" height="${height}" fill="#e5e7eb" filter="url(#blur)"/>
    </svg>
  `

  const base64 = Buffer.from(svg).toString('base64')
  return `data:image/svg+xml;base64,${base64}`
}
