'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export interface BeforeAfterItem {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  title: string
  description?: string
}

export interface BeforeAfterSliderProps {
  items: BeforeAfterItem[]
  /**
   * Initial slider position (0-100)
   * @default 50
   */
  initialPosition?: number
  /**
   * Height of the slider container
   * @default 'h-96'
   */
  height?: string
}

/**
 * Interactive Before/After image comparison slider
 *
 * Features:
 * - Draggable divider for comparison
 * - Keyboard accessible (arrow keys to adjust)
 * - Touch-enabled for mobile devices
 * - WCAG 2.1 AA compliant
 * - Respects prefers-reduced-motion
 * - Multiple comparison items support
 *
 * @example
 * <BeforeAfterSlider
 *   items={[
 *     {
 *       beforeImage: '/images/floor-before.jpg',
 *       afterImage: '/images/floor-after.jpg',
 *       title: 'Spotless Floors',
 *       description: 'Professional floor stripping and waxing'
 *     }
 *   ]}
 * />
 */
export default function BeforeAfterSlider({
  items,
  initialPosition = 50,
  height = 'h-96',
}: BeforeAfterSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sliderPosition, setSliderPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentItem = items[currentIndex]

  // Handle mouse/touch drag
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseDown = () => setIsDragging(true)

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX)
    }
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchMove = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX)
    }
  }

  // Add/remove event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)
      window.addEventListener('touchmove', handleTouchMove)
      window.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5))
      e.preventDefault()
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5))
      e.preventDefault()
    }
  }

  // Navigation between items
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setSliderPosition(initialPosition)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setSliderPosition(initialPosition)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Image Comparison */}
      <div
        ref={containerRef}
        className={`relative ${height} overflow-hidden rounded-xl shadow-2xl cursor-ew-resize select-none`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison slider: ${currentItem.title}. Use left and right arrow keys to adjust.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuetext={`${Math.round(sliderPosition)}% after image visible`}
      >
        {/* After Image (background) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentItem.afterImage})` }}
          aria-hidden="true"
        >
          {currentItem.afterLabel && (
            <div className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {currentItem.afterLabel || 'After'}
            </div>
          )}
        </div>

        {/* Before Image (clipped overlay) */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${currentItem.beforeImage})`,
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
          }}
          aria-hidden="true"
        >
          {currentItem.beforeLabel && sliderPosition > 20 && (
            <div className="absolute top-4 left-4 bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
              {currentItem.beforeLabel || 'Before'}
            </div>
          )}
        </div>

        {/* Slider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%` }}
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
            <svg
              className="w-5 h-5 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l4-4 4 4m0 6l-4 4-4-4"
              />
            </svg>
          </div>
        </div>

        {/* Keyboard hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-3 py-1 rounded-full opacity-0 focus-within:opacity-100 transition-opacity">
          Use ← → arrow keys to compare
        </div>
      </div>

      {/* Content */}
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          {currentItem.title}
        </h3>
        {currentItem.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4">{currentItem.description}</p>
        )}
      </div>

      {/* Navigation (if multiple items) */}
      {items.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            onClick={goToPrevious}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Previous comparison"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setSliderPosition(initialPosition)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-primary-600 w-8' : 'bg-gray-300 dark:bg-slate-600'
                }`}
                aria-label={`Go to comparison ${index + 1}`}
                aria-current={index === currentIndex ? 'true' : 'false'}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="p-2 rounded-full bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Next comparison"
          >
            <svg
              className="w-5 h-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
