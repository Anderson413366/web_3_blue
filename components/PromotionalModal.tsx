'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Sparkles, ArrowRight, Gift } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function PromotionalModal() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if user has seen the modal in the last 24 hours
    const lastShown = localStorage.getItem('promoModalLastShown')
    const now = Date.now()
    const twentyFourHours = 24 * 60 * 60 * 1000

    // Only show if not shown in last 24 hours
    if (!lastShown || now - parseInt(lastShown) > twentyFourHours) {
      // Show modal after 10 seconds to indicate engagement
      const timer = setTimeout(() => {
        setIsVisible(true)
        localStorage.setItem('promoModalLastShown', now.toString())
      }, 10000) // 10 seconds

      return () => clearTimeout(timer)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        handleClose()
      }
    }

    if (isVisible) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
    >
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-full animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-neutral-light-grey dark:hover:bg-slate-700 transition-colors"
          aria-label="Close promotional offer"
        >
          <X className="h-5 w-5 text-neutral-charcoal/60 dark:text-white/70" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-bright-blue rounded-full mb-4">
            <Gift className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h2
            id="promo-modal-title"
            className="text-h3 leading-normal font-bold text-neutral-charcoal dark:text-white mb-4"
          >
            Special Offer for New Clients!
          </h2>

          {/* Offer Details */}
          <div className="bg-neutral-off-white dark:bg-slate-800 rounded-xl p-6 mb-6 border-2 border-brand-bright-blue/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-6 w-6 text-brand-bright-blue" />
              <span className="text-h2 font-bold text-brand-bright-blue">10% OFF</span>
            </div>
            <p className="text-body font-semibold text-neutral-charcoal dark:text-white mb-2">
              Your First Month of Service
            </p>
            <p className="text-neutral-charcoal/70 dark:text-white/80 text-sm">
              Professional commercial cleaning with no long-term contracts required
            </p>
          </div>

          {/* Referral Bonus */}
          <div className="bg-neutral-off-white dark:bg-slate-700/50 rounded-lg p-4 mb-6">
            <p className="text-sm font-semibold text-neutral-charcoal dark:text-white mb-1">
              Plus: $100 Referral Rewards
            </p>
            <p className="text-xs text-neutral-charcoal/70 dark:text-white/80">
              Refer another business and you both get $100 credit
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/promotions" className="flex-1" onClick={handleClose}>
              <Button variant="outline" size="lg" className="w-full group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/quote" className="flex-1" onClick={handleClose}>
              <Button variant="accent" size="lg" className="w-full">
                Get Free Quote
              </Button>
            </Link>
          </div>

          {/* Fine Print */}
          <p className="text-xs text-neutral-charcoal/60 dark:text-white/70 mt-4">
            New commercial clients only. Some restrictions may apply.
          </p>
        </div>
      </div>
    </div>
  )
}
