/**
 * Lazy Load Component Wrapper
 *
 * Dynamically imports components to reduce initial bundle size
 * Shows loading fallback while component loads
 */

'use client'

import { Suspense, ComponentType } from 'react'
import dynamic from 'next/dynamic'

interface LazyLoadProps {
  /**
   * Component to lazy load
   */
  component: () => Promise<{ default: ComponentType<any> }>
  /**
   * Props to pass to the component
   */
  componentProps?: Record<string, any>
  /**
   * Loading fallback (optional)
   */
  fallback?: React.ReactNode
  /**
   * Whether to disable SSR for this component
   */
  ssr?: boolean
}

/**
 * Default loading spinner
 */
const DefaultFallback = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
  </div>
)

/**
 * Lazy load a component with optional fallback
 */
export default function LazyLoad({
  component,
  componentProps = {},
  fallback = <DefaultFallback />,
  ssr = false,
}: LazyLoadProps) {
  const DynamicComponent = dynamic(component, {
    loading: () => <>{fallback}</>,
    ssr,
  })

  return (
    <Suspense fallback={fallback}>
      <DynamicComponent {...componentProps} />
    </Suspense>
  )
}

/**
 * Helper function to create lazy-loaded component
 */
export function createLazyComponent<P = {}>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options: {
    fallback?: React.ReactNode
    ssr?: boolean
  } = {}
) {
  return dynamic(importFn, {
    loading: () => <>{options.fallback || <DefaultFallback />}</>,
    ssr: options.ssr !== undefined ? options.ssr : false,
  })
}

/**
 * Lazy-loaded components (ready to use)
 */
export const LazyBeforeAfterSlider = createLazyComponent(
  () => import('@/components/sections/BeforeAfterSlider'),
  { ssr: false }
)

export const LazyCookieBanner = createLazyComponent(
  () => import('@/components/CookieBanner'),
  { ssr: false }
)

export const LazyFeedbackWidget = createLazyComponent(
  () => import('@/components/FeedbackWidget'),
  { ssr: false }
)

export const LazyChatWidget = createLazyComponent(
  () => import('@/components/chat/ChatWidget'),
  { ssr: false, fallback: null }
)
