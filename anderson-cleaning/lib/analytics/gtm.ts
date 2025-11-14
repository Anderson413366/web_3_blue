/**
 * Google Tag Manager (GTM) & Google Analytics 4 (GA4) Utilities
 *
 * Helper functions to push events to dataLayer for GTM/GA4 tracking
 */

/**
 * Push event to dataLayer
 * Safe wrapper that checks if dataLayer exists
 */
export function pushToDataLayer(data: Record<string, any>) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data)
    console.log('[GTM] Event pushed:', data)
  }
}

/**
 * Track page view (automatically handled by GTM, but useful for SPAs)
 */
export function trackPageView(url: string) {
  pushToDataLayer({
    event: 'page_view',
    page_path: url,
    page_title: document.title,
    page_location: window.location.href,
  })
}

/**
 * Track form submission
 */
export function trackFormSubmission(formName: string, formType: string, additionalData?: Record<string, any>) {
  pushToDataLayer({
    event: 'form_submission',
    form_name: formName,
    form_type: formType,
    ...additionalData,
  })
}

/**
 * Track CTA (Call-to-Action) button clicks
 */
export function trackCTAClick(ctaText: string, ctaLocation: string, ctaDestination: string) {
  pushToDataLayer({
    event: 'cta_click',
    cta_text: ctaText,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  })
}

/**
 * Track outbound link clicks
 */
export function trackOutboundLink(url: string, linkText: string) {
  pushToDataLayer({
    event: 'outbound_link_click',
    outbound_url: url,
    link_text: linkText,
  })
}

/**
 * Track scroll depth (25%, 50%, 75%, 100%)
 */
export function trackScrollDepth(percentage: number) {
  pushToDataLayer({
    event: 'scroll_depth',
    scroll_percentage: percentage,
    page_path: window.location.pathname,
  })
}

/**
 * Track file download
 */
export function trackFileDownload(fileName: string, fileType: string) {
  pushToDataLayer({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
  })
}

/**
 * Track search query
 */
export function trackSearch(searchTerm: string, resultsCount: number) {
  pushToDataLayer({
    event: 'search',
    search_term: searchTerm,
    results_count: resultsCount,
  })
}

/**
 * Track video interaction
 */
export function trackVideoInteraction(action: 'play' | 'pause' | 'complete', videoTitle: string) {
  pushToDataLayer({
    event: 'video_interaction',
    video_action: action,
    video_title: videoTitle,
  })
}

/**
 * Track phone click (tel: link)
 */
export function trackPhoneClick(phoneNumber: string, location: string) {
  pushToDataLayer({
    event: 'phone_click',
    phone_number: phoneNumber,
    click_location: location,
  })
}

/**
 * Track email click (mailto: link)
 */
export function trackEmailClick(email: string, location: string) {
  pushToDataLayer({
    event: 'email_click',
    email_address: email,
    click_location: location,
  })
}

/**
 * Track quote request started
 */
export function trackQuoteStart() {
  pushToDataLayer({
    event: 'quote_started',
    timestamp: new Date().toISOString(),
  })
}

/**
 * Track quote step completed
 */
export function trackQuoteStepCompleted(stepNumber: number, stepName: string) {
  pushToDataLayer({
    event: 'quote_step_completed',
    step_number: stepNumber,
    step_name: stepName,
  })
}

/**
 * Track custom event (generic)
 */
export function trackCustomEvent(eventName: string, eventData?: Record<string, any>) {
  pushToDataLayer({
    event: eventName,
    ...eventData,
  })
}
