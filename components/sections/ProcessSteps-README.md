# ProcessSteps Component

A reusable component that displays the standardized 4-step onboarding process across all service pages.

## 📋 Overview

The ProcessSteps component shows Anderson Cleaning's consistent 4-step client onboarding flow:

1. **Facility Walk-Through** - Free consultation to understand your space
2. **Custom SOPs** - Detailed Standard Operating Procedures for your facility
3. **Team Training** - 40+ hours of training plus facility-specific instruction
4. **Supervised Start** - Extra oversight and quality checks in the first week

## 🎨 Layout

### Desktop (≥ 768px)
- Horizontal timeline with 4 steps in a row
- Connected by a horizontal line
- Large circular icons (120px) with numbered badges
- Step cards arranged in grid layout

### Mobile (< 768px)
- Vertical timeline with stacked steps
- Connected by a vertical line on the left
- Smaller circular icons (60px) with numbered badges
- Steps flow top to bottom

## 📦 Files

```
/lib/process-steps-data.ts              ← Step data & TypeScript interfaces
/components/sections/ProcessSteps.tsx   ← Main component
/components/sections/ProcessSteps-README.md   ← This file
```

## 🚀 Quick Start

### Basic Usage

```tsx
import ProcessSteps from '@/components/sections/ProcessSteps'

export default function ServicePage() {
  return (
    <div>
      {/* Your other sections */}

      <ProcessSteps />

      {/* More sections */}
    </div>
  )
}
```

This will render the component with default settings:
- Heading: "Our Process"
- Subtitle: "How we onboard new clients in 4 simple steps"
- Background: Gray (gray-50 / slate-800 in dark mode)

### Custom Heading & Subtitle

```tsx
<ProcessSteps
  heading="How It Works"
  subtitle="Our proven approach to exceptional cleaning"
/>
```

### White Background Variant

```tsx
<ProcessSteps background="white" />
```

Use this when the surrounding sections have gray backgrounds and you want visual contrast.

### No Subtitle

```tsx
<ProcessSteps subtitle="" />
```

### Additional CSS Classes

```tsx
<ProcessSteps className="mt-8 mb-12" />
```

## 🔧 Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `heading` | `string` | `"Our Process"` | Main section heading |
| `subtitle` | `string` | `"How we onboard new clients in 4 simple steps"` | Optional subtitle below heading |
| `background` | `"white" \| "gray"` | `"gray"` | Background color variant |
| `className` | `string` | `""` | Additional CSS classes to apply |

## 📍 Where to Add It

Add the ProcessSteps component to **all service detail pages**:

- ✅ Office Cleaning (`/services/office-cleaning`)
- ✅ Janitorial Services (`/services/janitorial-services`)
- ✅ Floor Care (`/services/floor-care`)
- ✅ Post-Construction (`/services/post-construction`)
- ✅ Medical Facilities (`/services/medical-cleaning`)
- ✅ Any other service pages

### Recommended Placement

Add the ProcessSteps component **after the main service description** and **before the pricing or CTA section**.

**Example Service Page Structure:**
```tsx
<ServicePage>
  <Hero />
  <WhatIsIncluded />
  <HowWeEnsureQuality />

  <ProcessSteps />  {/* ← Add here */}

  <WhoItsFor />
  <Pricing />
  <CTA />
</ServicePage>
```

This placement ensures users understand:
1. **What** you're getting (service details)
2. **How** we deliver it (quality standards)
3. **The Process** for getting started
4. **Who** it's for and pricing

## 🎯 Complete Integration Example

Here's how to add ProcessSteps to the Office Cleaning page:

```tsx
'use client'

import { Button } from '@/components/ui/Button'
import Header from '@/components/Header'
import ProcessSteps from '@/components/sections/ProcessSteps'  // ← Import
import { CheckCircle2, Clock, Shield, Users, Sparkles } from 'lucide-react'

export default function OfficeCleaningPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-700 to-indigo-900 text-white">
        {/* ... hero content ... */}
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        {/* ... service details ... */}
      </section>

      {/* How We Ensure Quality */}
      <section className="py-20 bg-gray-50">
        {/* ... quality standards ... */}
      </section>

      {/* ========================================
          OUR PROCESS - NEW SECTION
          ======================================== */}
      <ProcessSteps background="white" />  {/* ← Add this line */}

      {/* Who It's For */}
      <section className="py-20 bg-gray-50">
        {/* ... target audience ... */}
      </section>

      {/* Pricing */}
      <section className="py-20 bg-blue-50">
        {/* ... pricing details ... */}
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-primary-900">
        {/* ... call to action ... */}
      </section>
    </div>
  )
}
```

## 🎨 Design Specifications

### Desktop Layout
```
┌─────────────────────────────────────────────────────────────┐
│                         Our Process                          │
│           How we onboard new clients in 4 steps              │
│                                                              │
│   ①────────────②────────────③────────────④                 │
│   🔍          📄          👥          ✓                      │
│   Walk        SOPs        Training    Start                  │
│   Through                                                     │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────────┐
│      Our Process         │
│                          │
│  ① 🔍  Walk-Through     │
│  │                       │
│  ② 📄  Custom SOPs      │
│  │                       │
│  ③ 👥  Team Training    │
│  │                       │
│  ④ ✓   Supervised Start │
└──────────────────────────┘
```

### Colors (Design System Variables)

- **Circle border**: `--color-primary-base` (blue-600)
- **Number badges**: `--color-primary-base` background, white text
- **Connecting line**: `--color-primary-light` (blue-200)
- **Icon color**: `--color-primary-base`
- **Title text**: `--color-text-primary` (gray-900 / white)
- **Description text**: `--color-text-secondary` (gray-600 / gray-300)
- **Background**: `bg-gray-50` or `bg-white` (with dark mode variants)

### Sizing

**Desktop:**
- Circle size: 120px × 120px
- Border width: 4px
- Number badge: 40px × 40px
- Icon size: 48px (h-12 w-12)
- Gap between steps: 24px (gap-6)

**Mobile:**
- Circle size: 60px × 60px
- Border width: 4px
- Number badge: 28px × 28px
- Icon size: 28px (h-7 w-7)
- Vertical spacing: 32px (space-y-8)

## ♿ Accessibility

The ProcessSteps component follows WCAG 2.1 AA guidelines:

- ✅ **Semantic HTML**: Uses `<ol>` (ordered list) for screen readers
- ✅ **ARIA labels**: Section labeled with `aria-labelledby` and list labeled with `aria-label`
- ✅ **Proper headings**: `<h2>` for section, `<h3>` for step titles
- ✅ **Color contrast**: All text meets 4.5:1 minimum contrast ratio
- ✅ **Icon decorations**: Icons marked with `aria-hidden="true"` (numbers provide meaning)
- ✅ **Keyboard navigation**: Fully navigable without a mouse
- ✅ **Responsive design**: Works on all screen sizes and orientations

### Screen Reader Experience

When using a screen reader, users will hear:
1. "Our Process" (heading)
2. "How we onboard new clients in 4 simple steps" (subtitle)
3. "Four-step onboarding process" (list label)
4. "Step 1, Facility Walk-Through: We tour your space..."
5. "Step 2, Custom SOPs: We create detailed..."
6. etc.

## 🧪 Testing Checklist

Before deploying to production:

- [ ] Component renders correctly on desktop (≥768px)
- [ ] Component renders correctly on mobile (<768px)
- [ ] Timeline connecting lines display properly
- [ ] All 4 steps are visible and numbered correctly
- [ ] Icons load and display with correct colors
- [ ] Text is readable in both light and dark mode
- [ ] Background variant works (`white` and `gray`)
- [ ] Custom heading and subtitle props work
- [ ] Responsive breakpoint transitions smoothly
- [ ] Screen reader announces steps in order
- [ ] All text meets WCAG 2.1 AA contrast requirements

## 📝 Modifying Step Content

To modify the step content (titles, descriptions, icons), edit the data file:

**File**: `/lib/process-steps-data.ts`

```typescript
export const processSteps: ProcessStep[] = [
  {
    number: 1,
    title: 'Facility Walk-Through',  // ← Change title here
    description: 'We tour your space...',  // ← Change description here
    icon: ClipboardCheck,  // ← Change icon here
  },
  // ... more steps
]
```

**Available Lucide Icons**: Browse at https://lucide.dev/icons

**Important**: All steps should:
- Have a concise title (2-4 words)
- Have a description (1-2 sentences, ~20-30 words)
- Use an appropriate icon from Lucide React
- Maintain consistent numbering (1, 2, 3, 4)

## 🔧 Customization

### Changing the Number of Steps

The component automatically adapts to any number of steps in the data array. To add or remove steps:

1. Edit `/lib/process-steps-data.ts`
2. Add or remove step objects from the `processSteps` array
3. Ensure sequential numbering (1, 2, 3, ...)

**Note**: The horizontal desktop layout works best with 3-5 steps. More than 5 may require layout adjustments.

### Changing Colors

All colors use design system CSS variables. To change the theme:

1. Edit `/app/styles/globals.css` (or your design tokens file)
2. Modify the CSS custom properties:
   - `--color-primary-base`
   - `--color-primary-light`
   - `--color-text-primary`
   - `--color-text-secondary`

### Changing Responsive Breakpoint

The component switches from horizontal to vertical at 768px (Tailwind's `md` breakpoint).

To change this:
1. Open `/components/sections/ProcessSteps.tsx`
2. Replace `md:` prefix with your desired breakpoint:
   - `sm:` (640px)
   - `md:` (768px) ← current
   - `lg:` (1024px)
   - `xl:` (1280px)

## 🐛 Troubleshooting

### Icons not displaying
- Verify Lucide React is installed: `npm list lucide-react`
- Check icon imports in `/lib/process-steps-data.ts`
- Ensure icon names are PascalCase (e.g., `CheckCircle2`, not `check-circle-2`)

### Timeline line not connecting circles
- Check that the connecting line div is present (should have `absolute` positioning)
- Verify CSS variables are defined in your global styles
- Try adjusting `left`, `right`, `top` positioning values

### Mobile layout not switching
- Verify Tailwind CSS is processing `md:` breakpoints
- Check browser viewport width (should be < 768px for mobile)
- Clear cache and hard reload

### Dark mode colors incorrect
- Ensure `dark:` variants are applied to all color classes
- Check that `dark` class is applied to parent element (usually `<html>`)
- Verify CSS variables have dark mode definitions

## 📚 Related Components

- **IndustryTemplate** - Industry-specific service pages
- **ServiceAreaMap** - Visual service coverage area
- **QuoteFormInline** - Lead capture form

## 🚀 Deployment

The ProcessSteps component is:
- ✅ **Client component** (`'use client'`) - Uses React hooks for responsive behavior
- ✅ **Statically generated** - No dynamic data fetching
- ✅ **SEO friendly** - Semantic HTML with proper heading hierarchy
- ✅ **Performance optimized** - No external API calls, minimal JavaScript

No special build configuration is required.

---

**Version**: 1.0.0
**Last Updated**: 2025-11-14
**Maintainer**: Anderson Cleaning Development Team
**Questions?** Review the code comments in `ProcessSteps.tsx` for detailed implementation notes.
