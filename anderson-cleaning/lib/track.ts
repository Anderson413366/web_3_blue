/**
 * Analytics Tracking Helper
 *
 * Queues analytics events until user consent is granted,
 * then flushes the queue when consent is received.
 *
 * Usage:
 *   track.event('button_click', { button_name: 'cta' })
 *   track.pageview('/about')
 */

'use client'

import { hasAnalyticsConsent } from './consent'

interface TrackingEvent {
  event: string
  [key: string]: any
}

class AnalyticsTracker {
  private eventQueue: TrackingEvent[] = []
  private consentGranted: boolean = false
  private initialized: boolean = false

  constructor() {
    if (typeof window !== 'undefined') {
      this.checkConsent()
      this.listenForConsentChanges()
    }
  }

  /**
   * Check if analytics consent has been granted
   */
  private checkConsent(): void {
    this.consentGranted = hasAnalyticsConsent()

    if (this.consentGranted) {
      this.flushQueue()
    }
  }

  /**
   * Listen for consent changes
   */
  private listenForConsentChanges(): void {
    if (this.initialized) return
    this.initialized = true

    window.addEventListener('consentchange', ((event: CustomEvent) => {
      const newConsent = event.detail.analytics_storage === 'granted'

      if (newConsent && !this.consentGranted) {
        this.consentGranted = true
        this.flushQueue()
      } else if (!newConsent && this.consentGranted) {
        this.consentGranted = false
        this.eventQueue = [] // Clear queue if consent revoked
      }
    }) as EventListener)
  }

  /**
   * Flush queued events to dataLayer
   */
  private flushQueue(): void {
    if (!window.dataLayer) {
      window.dataLayer = []
    }

    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift()
      if (event) {
        window.dataLayer.push(event)
      }
    }
  }

  /**
   * Track a custom event
   */
  public event(eventName: string, properties: Record<string, any> = {}): void {
    if (typeof window === 'undefined') return

    const event: TrackingEvent = {
      event: eventName,
      ...properties,
    }

    if (this.consentGranted) {
      // Consent granted, push immediately
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(event)
    } else {
      // Queue until consent is granted
      this.eventQueue.push(event)
    }
  }

  /**
   * Track a page view
   */
  public pageview(path: string, title?: string): void {
    this.event('page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href,
    })
  }

  /**
   * Track form submission
   */
  public formSubmit(formName: string, properties: Record<string, any> = {}): void {
    this.event('form_submit', {
      form_name: formName,
      ...properties,
    })
  }

  /**
   * Track button click
   */
  public buttonClick(buttonName: string, properties: Record<string, any> = {}): void {
    this.event('button_click', {
      button_name: buttonName,
      ...properties,
    })
  }

  /**
   * Track outbound link click
   */
  public outboundClick(url: string, properties: Record<string, any> = {}): void {
    this.event('outbound_click', {
      outbound_url: url,
      ...properties,
    })
  }

  /**
   * Track phone number click
   */
  public phoneClick(phoneNumber: string): void {
    this.event('phone_click', {
      phone_number: phoneNumber,
    })
  }

  /**
   * Track email click
   */
  public emailClick(email: string): void {
    this.event('email_click', {
      email_address: email,
    })
  }

  /**
   * Track scroll depth
   */
  public scrollDepth(percentage: number): void {
    this.event('scroll_depth', {
      scroll_percentage: percentage,
    })
  }

  /**
   * Get queue size (for debugging)
   */
  public getQueueSize(): number {
    return this.eventQueue.length
  }

  /**
   * Check if consent is granted (for debugging)
   */
  public hasConsent(): boolean {
    return this.consentGranted
  }
}

// Export singleton instance
export const track = new AnalyticsTracker()

// Export class for testing
export default AnalyticsTracker
