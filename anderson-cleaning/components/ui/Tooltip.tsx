'use client'

import React, { useState, createContext, useContext, useRef, useEffect } from 'react'
import { TooltipContextType } from '@/lib/careers/types'
import { motion, AnimatePresence } from 'framer-motion'

// TooltipProvider is kept as it wraps the App.
export const TooltipContext = createContext<TooltipContextType | undefined>(undefined)

export const TooltipProvider: React.FC<{ children: React.ReactNode; delayDuration?: number }> = ({
  children,
  delayDuration = 100,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState<React.ReactNode | null>(null)
  const [triggerRef, setTriggerRef] = useState<React.RefObject<HTMLElement> | null>(null)
  // Additional state for positioning
  const [position, setPosition] = useState({ top: 0, left: 0, opacity: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  const calculatePosition = () => {
    if (triggerRef?.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      let top = triggerRect.bottom + window.scrollY + 5 // 5px gap
      let left = triggerRect.left + window.scrollX + triggerRect.width / 2 - tooltipRect.width / 2

      // Adjust if tooltip goes off screen
      if (left < 0) left = 5
      if (left + tooltipRect.width > viewportWidth) left = viewportWidth - tooltipRect.width - 5
      if (top + tooltipRect.height > viewportHeight + window.scrollY) {
        // Check if goes off bottom
        top = triggerRect.top + window.scrollY - tooltipRect.height - 5 // Position on top
      }
      if (top < window.scrollY) {
        // Check if goes off top (when positioned above)
        top = triggerRect.bottom + window.scrollY + 5 // Reset to bottom
      }

      setPosition({ top, left, opacity: 1 })
    } else {
      setPosition((prev) => ({ ...prev, opacity: 0 }))
    }
  }

  useEffect(() => {
    if (isOpen && triggerRef?.current) {
      const timer = setTimeout(calculatePosition, 0)
      window.addEventListener('resize', calculatePosition)
      window.addEventListener('scroll', calculatePosition, true)
      return () => {
        clearTimeout(timer)
        window.removeEventListener('resize', calculatePosition)
        window.removeEventListener('scroll', calculatePosition, true)
      }
    } else {
      setPosition((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [isOpen, triggerRef, content])

  return (
    <TooltipContext.Provider
      value={{ isOpen, setIsOpen, content, setContent, triggerRef, setTriggerRef }}
    >
      {children}
      <AnimatePresence>
        {isOpen && content && (
          <motion.div
            ref={tooltipRef}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: position.opacity, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm dark:bg-gray-700 dark:text-gray-100"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              pointerEvents: 'none',
            }}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </TooltipContext.Provider>
  )
}

export const useTooltip = () => {
  const context = useContext(TooltipContext)
  if (!context) {
    throw new Error('useTooltip must be used within a TooltipProvider')
  }
  return context
}

interface TooltipTriggerProps {
  children: React.ReactElement
  tooltipContent: React.ReactNode
}

export const Tooltip: React.FC<TooltipTriggerProps> = ({ children, tooltipContent }) => {
  const { setIsOpen, setContent, setTriggerRef } = useTooltip()
  const childRef = useRef<HTMLElement>(null)

  const handleMouseEnter = () => {
    setTriggerRef(childRef)
    setContent(tooltipContent)
    setIsOpen(true)
  }

  const handleMouseLeave = () => {
    setIsOpen(false)
  }

  const triggerElement = React.cloneElement(children, {
    ...children.props, // Assuming children.props is always an object for React.ReactElement
    ref: childRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
  })

  return triggerElement
}
