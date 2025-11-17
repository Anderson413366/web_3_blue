# QuoteFormInline - Integration Guide

## 📋 Overview

The `QuoteFormInline` component is a compact, accessible quote request form designed for the homepage hero section. It provides a low-friction way for visitors to request quotes directly from the hero.

---

## 🚀 Quick Start

### Basic Usage

```tsx
import QuoteFormInline from '@/components/forms/QuoteFormInline'

export default function HomePage() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Professional Cleaning Services</h1>
        <p>Get your free quote today</p>
      </div>

      {/* Add the quote form */}
      <QuoteFormInline />
    </section>
  )
}
```

---

## 🎨 Homepage Hero Integration

### Option 1: Side-by-Side Layout (Desktop)

Place the form next to the hero content on larger screens:

```tsx
// app/page.tsx

<section className="hero bg-gradient-to-br from-blue-700 to-indigo-900 py-16 md:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

      {/* Left Column: Hero Content */}
      <div className="text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
          Professional Cleaning Services for Your Business
        </h1>
        <p className="text-lg md:text-xl mb-8 text-blue-100">
          Trusted by 500+ facilities across the region. Get your free quote in 30 minutes or less.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/quote">
            <Button variant="accent" size="lg">
              Get a Free Quote
            </Button>
          </Link>
          <a href="tel:+15551234567">
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-800">
              Call Now
            </Button>
          </a>
        </div>
      </div>

      {/* Right Column: Quote Form */}
      <div className="flex justify-center lg:justify-end">
        <QuoteFormInline
          onSubmitSuccess={(data) => {
            // Track conversion
            console.log('Quote submitted:', data)
            // Optional: Send to analytics
            // gtag('event', 'quote_form_submit', { ...data })
          }}
        />
      </div>

    </div>
  </div>
</section>
```

**Result:**
- Desktop (≥1024px): Hero content left, form right
- Tablet/Mobile: Stacked vertically, form below content

---

### Option 2: Stacked Layout (Below Hero)

Place the form below the hero content for a simpler layout:

```tsx
<section className="hero bg-gradient-to-br from-blue-700 to-indigo-900 py-16 md:py-24">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">

    {/* Hero Content */}
    <div className="text-center text-white mb-12">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
        Professional Cleaning Services
      </h1>
      <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-3xl mx-auto">
        Get your free quote in 30 minutes or less
      </p>
    </div>

    {/* Quote Form - Centered */}
    <div className="flex justify-center">
      <QuoteFormInline />
    </div>

  </div>
</section>
```

**Result:**
- All screen sizes: Centered form below hero text
- Cleaner, more focused layout

---

### Option 3: Tabbed Interface (Multiple CTAs)

Offer both traditional buttons and inline form as options:

```tsx
'use client'

import { useState } from 'react'
import QuoteFormInline from '@/components/forms/QuoteFormInline'

export default function HeroSection() {
  const [showForm, setShowForm] = useState(false)

  return (
    <section className="hero">
      <div className="container mx-auto px-4">

        {/* Hero Content */}
        <div className="text-center text-white mb-8">
          <h1>Professional Cleaning Services</h1>
          <p>Get your free quote today</p>
        </div>

        {/* Toggle: Buttons or Form */}
        {!showForm ? (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="lg" onClick={() => setShowForm(true)}>
              Get Instant Quote
            </Button>
            <Link href="/quote">
              <Button variant="outline" size="lg">
                Full Quote Page
              </Button>
            </Link>
            <a href="tel:+15551234567">
              <Button variant="outline" size="lg">
                Call Now
              </Button>
            </a>
          </div>
        ) : (
          <div className="flex justify-center">
            <QuoteFormInline />
            <button
              onClick={() => setShowForm(false)}
              className="mt-4 text-white underline"
            >
              Back to options
            </button>
          </div>
        )}

      </div>
    </section>
  )
}
```

**Result:**
- Initially shows CTA buttons
- "Get Instant Quote" toggles to show inline form
- User can switch back to buttons

---

## 📱 Responsive Behavior

The form automatically adapts to different screen sizes:

| Screen Size | Behavior |
|------------|----------|
| **Desktop (≥1024px)** | Full form, side-by-side with hero content |
| **Tablet (768-1023px)** | Full form, stacked below hero content |
| **Mobile (< 768px)** | Full form, full width, stacked |
| **Small Mobile (< 480px)** | Full form, slightly reduced padding |

---

## 🎯 Props & Customization

### Available Props

```tsx
interface QuoteFormInlineProps {
  /**
   * Callback function when form is successfully submitted
   */
  onSubmitSuccess?: (data: FormData) => void

  /**
   * Additional CSS classes
   */
  className?: string

  /**
   * Form variant (future expansion)
   * @default "default"
   */
  variant?: 'default' | 'compact'
}
```

### Usage Examples

```tsx
// Basic usage
<QuoteFormInline />

// With success callback
<QuoteFormInline
  onSubmitSuccess={(data) => {
    console.log('Form data:', data)
    // Send to analytics, CRM, etc.
  }}
/>

// With custom styling
<QuoteFormInline className="mt-8 shadow-2xl" />

// Future: Compact variant
<QuoteFormInline variant="compact" />
```

---

## 📊 Form Data Structure

When the form is submitted, you receive this data structure:

```tsx
interface FormData {
  name: string              // e.g., "John Doe"
  email: string             // e.g., "john@company.com"
  phone: string             // e.g., "(555) 123-4567"
  facilityType: string      // e.g., "office", "medical", etc.
}
```

---

## 🔌 API Integration

### Step 1: Create API Route

Create `/app/api/quote/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate data
    if (!data.name || !data.email || !data.phone || !data.facilityType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send to your CRM, email service, database, etc.
    // Example: Send email notification
    await sendEmailNotification(data)

    // Example: Save to database
    await saveToDatabase(data)

    return NextResponse.json(
      { success: true, message: 'Quote request received' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Quote submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
```

### Step 2: Update Form Component

Update the `handleSubmit` function in `QuoteFormInline.tsx`:

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault()

  if (!validateForm()) return

  setIsSubmitting(true)

  try {
    // Send to API endpoint
    const response = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    const result = await response.json()
    console.log('Form submitted:', result)

    setIsSuccess(true)

    if (onSubmitSuccess) {
      onSubmitSuccess(formData)
    }

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', facilityType: '' })
      setIsSuccess(false)
      setTouched({})
    }, 3000)
  } catch (error) {
    console.error('Form submission error:', error)
    // Show error message to user
  } finally {
    setIsSubmitting(false)
  }
}
```

---

## 📈 Analytics Tracking

Track form interactions for conversion optimization:

```tsx
<QuoteFormInline
  onSubmitSuccess={(data) => {
    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'quote_form_submit', {
        event_category: 'Forms',
        event_label: 'Hero Inline Quote Form',
        facility_type: data.facilityType,
      })
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead', {
        content_name: 'Quote Form',
        content_category: data.facilityType,
      })
    }

    // Custom analytics
    trackConversion('quote_form', data)
  }}
/>
```

---

## ♿ Accessibility Features

The form is fully WCAG 2.1 AA compliant:

- ✅ All inputs have associated `<label>` elements
- ✅ Error messages with `role="alert"` for screen readers
- ✅ `aria-invalid` on fields with errors
- ✅ `aria-describedby` linking errors to inputs
- ✅ Minimum 44px touch targets (WCAG 2.2)
- ✅ Visible focus indicators
- ✅ Required field indicators (*)
- ✅ Success message with `aria-live="polite"`
- ✅ Keyboard navigable (Tab, Enter)

---

## 🎨 Styling Customization

### Custom Background Color

```tsx
<QuoteFormInline className="bg-blue-50 dark:bg-slate-700" />
```

### Custom Shadow

```tsx
<QuoteFormInline className="shadow-2xl" />
```

### Custom Max Width

```tsx
<QuoteFormInline className="max-w-[600px]" />
```

### Remove Default Padding

```tsx
<QuoteFormInline className="p-4" />
```

---

## 🧪 Testing Checklist

Before deploying:

- [ ] All fields validate correctly
- [ ] Phone number formats as (555) 123-4567
- [ ] Error messages appear on blur
- [ ] Form submits only when valid
- [ ] Success message displays
- [ ] Form resets after 3 seconds
- [ ] Works in light and dark mode
- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces errors
- [ ] Touch targets are 44px minimum
- [ ] Responsive on all devices
- [ ] API integration working

---

## 🚨 Common Issues

### Issue: Form not visible in dark mode

**Solution:** The form uses design system variables that automatically adapt to dark mode. Ensure `globals.css` imports `design-system.css`.

### Issue: Phone formatting not working

**Solution:** The `formatPhoneNumber` function handles formatting automatically. Ensure you're not overriding the `onChange` handler.

### Issue: Validation errors not showing

**Solution:** Errors only show after a field is "touched" (blurred). Check that `handleBlur` is properly attached to inputs.

### Issue: Form submitting with invalid data

**Solution:** The form validates on submit. Check that `validateForm()` is called before submission.

---

## 📞 Support

For questions or issues with the QuoteFormInline component:

1. Check this integration guide
2. Review the component source code comments
3. Test with the browser console open for error messages
4. Verify design system CSS is imported

---

**Last Updated:** 2025-11-14
**Component Version:** 1.0.0
**Location:** `/components/forms/QuoteFormInline.tsx`
