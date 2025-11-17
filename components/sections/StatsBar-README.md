# StatsBar Component

A responsive, animated statistics display component that showcases key company metrics with impressive count-up animations.

## 📋 Overview

The StatsBar component displays company statistics in a visually appealing grid layout with smooth count-up animations triggered when the component enters the viewport. Perfect for About pages, landing pages, or anywhere you want to build credibility with impressive metrics.

## ✨ Key Features

- **Count-up animation** - Numbers animate from 0 to target value
- **Intersection Observer** - Animation triggers when component enters viewport
- **Fully responsive** - 4 columns → 2 columns → 1 column layouts
- **Customizable stats** - Pass your own stats array
- **Icon support** - Uses Lucide React icons
- **Design system integration** - Uses CSS variables for theming
- **Accessibility compliant** - WCAG 2.1 AA standards
- **Dark mode support** - Automatic theme switching
- **Performance optimized** - Animations run once per page load

## 📦 Installation

The component is already installed in the project. No additional dependencies required beyond Lucide React (already installed).

## 🚀 Quick Start

### Basic Usage (Default Stats)

```tsx
import StatsBar from '@/components/sections/StatsBar'

export default function Page() {
  return (
    <div>
      <StatsBar />
    </div>
  )
}
```

This displays the default Anderson Cleaning stats:
- **20+** Years in Business
- **50+** Active Clients
- **2M+** Sq Ft Cleaned Monthly
- **100%** Client Satisfaction

### Custom Stats

```tsx
import StatsBar from '@/components/sections/StatsBar'
import { Target, Award, Trophy, Users } from 'lucide-react'

const myStats = [
  {
    id: 1,
    value: '500+',
    label: 'Projects Completed',
    icon: Target,
    numericValue: 500,
    suffix: '+',
  },
  {
    id: 2,
    value: '98%',
    label: 'Customer Retention',
    icon: Award,
    numericValue: 98,
    suffix: '%',
  },
  {
    id: 3,
    value: '15',
    label: 'Industry Awards',
    icon: Trophy,
    numericValue: 15,
  },
  {
    id: 4,
    value: '200+',
    label: 'Team Members',
    icon: Users,
    numericValue: 200,
    suffix: '+',
  },
]

export default function Page() {
  return <StatsBar stats={myStats} />
}
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `stats` | `Stat[]` | `DEFAULT_STATS` | Array of stat objects to display |
| `background` | `"white" \| "gray" \| "blue"` | `"gray"` | Background color variant |
| `enableAnimation` | `boolean` | `true` | Enable/disable count-up animation |
| `animationDuration` | `number` | `2000` | Animation duration in milliseconds |
| `className` | `string` | `""` | Additional CSS classes |

### Stat Object Structure

```typescript
interface Stat {
  id: string | number          // Unique identifier
  value: string                // Display value (e.g., "20+", "100%")
  label: string                // Label below the number
  icon?: LucideIcon            // Optional Lucide React icon
  numericValue?: number        // Number to animate to (for count-up)
  suffix?: string              // Suffix to append after count (e.g., "+", "%", "M+")
}
```

## 📐 Layout & Responsive Design

### Desktop (≥ 1024px)
- 4 columns in a single row
- Large icons (64px circles)
- Large numbers (text-6xl, ~60px)
- Vertical separator lines between stats

### Tablet (768px - 1023px)
- 2×2 grid layout
- Medium icons (64px circles)
- Large numbers (text-5xl, ~48px)
- No separator lines

### Mobile (< 768px)
- Single column stack
- Medium icons (64px circles)
- Smaller numbers (text-5xl, ~48px)
- Clean vertical layout

## 🎬 Animation Behavior

### How It Works

1. **Page Load**: Stats display at 0 (or start value)
2. **Scroll Into View**: When component enters viewport (20% visible)
3. **Count Up**: Numbers animate from 0 to target value
4. **Easing**: Uses ease-out cubic for natural deceleration
5. **Complete**: Animation holds at final value

### Animation Details

- **Duration**: 2000ms (2 seconds) by default
- **Easing**: Cubic ease-out (starts fast, slows down)
- **Trigger**: Intersection Observer at 20% visibility
- **Frequency**: Animates once per page load
- **Performance**: Uses `requestAnimationFrame` for smooth 60fps

### Customizing Animation

```tsx
{/* Slower animation (3 seconds) */}
<StatsBar animationDuration={3000} />

{/* Faster animation (1 second) */}
<StatsBar animationDuration={1000} />

{/* Disable animation */}
<StatsBar enableAnimation={false} />
```

## 🎨 Background Variants

### Gray Background (Default)

```tsx
<StatsBar background="gray" />
```

Best for: Pages with white sections above/below

### White Background

```tsx
<StatsBar background="white" />
```

Best for: Pages with gray sections above/below (like the About page)

### Blue Background

```tsx
<StatsBar background="blue" />
```

Best for: Accent sections or standalone hero areas

## 🔧 Common Use Cases

### 1. About Page

```tsx
import StatsBar from '@/components/sections/StatsBar'

export default function AboutPage() {
  return (
    <div>
      {/* Company story section */}
      <section>...</section>

      {/* Stats showcasing credibility */}
      <StatsBar background="white" />

      {/* More about content */}
      <section>...</section>
    </div>
  )
}
```

### 2. Homepage Hero

```tsx
<section className="hero">
  <h1>Welcome to Our Company</h1>
  <p>Industry-leading solutions</p>

  <StatsBar
    background="blue"
    stats={[
      { id: 1, value: '10K+', label: 'Customers', numericValue: 10, suffix: 'K+' },
      { id: 2, value: '99%', label: 'Satisfaction', numericValue: 99, suffix: '%' },
      { id: 3, value: '24/7', label: 'Support', numericValue: 24, suffix: '/7' },
      { id: 4, value: '50+', label: 'Countries', numericValue: 50, suffix: '+' },
    ]}
  />
</section>
```

### 3. Landing Page

```tsx
<section>
  <h2>Why Choose Us</h2>

  <StatsBar
    stats={[
      { id: 1, value: '15+', label: 'Years Experience', numericValue: 15, suffix: '+' },
      { id: 2, value: '5K+', label: 'Projects', numericValue: 5, suffix: 'K+' },
      { id: 3, value: '100%', label: 'Guarantee', numericValue: 100, suffix: '%' },
      { id: 4, value: '4.9', label: 'Rating', numericValue: 4.9 },
    ]}
    animationDuration={2500}
  />
</section>
```

## 🎭 Icons

### Using Lucide React Icons

The component supports any icon from [Lucide React](https://lucide.dev/icons):

```tsx
import {
  Calendar,      // Years/Time
  Users,         // People/Clients
  Building2,     // Buildings/Facilities
  Star,          // Ratings/Satisfaction
  Target,        // Goals/Accuracy
  Award,         // Achievements
  Trophy,        // Awards/Wins
  CheckCircle2,  // Completion/Success
  TrendingUp,    // Growth
  MapPin,        // Locations
  Zap,           // Speed/Energy
  Shield,        // Security/Protection
} from 'lucide-react'
```

### Without Icons

Stats work perfectly without icons too:

```tsx
const stats = [
  { id: 1, value: '20+', label: 'Years', numericValue: 20, suffix: '+' },
  { id: 2, value: '100%', label: 'Satisfaction', numericValue: 100, suffix: '%' },
  // No icon property = no icon displayed
]
```

## ♿ Accessibility

### Screen Reader Support

- Component includes hidden `<h2>` with "Company Statistics"
- Each stat has `aria-label` with full context: "20+ Years in Business"
- Icons marked `aria-hidden="true"` (decorative only)
- Semantic HTML structure

### Keyboard Navigation

- Component is non-interactive (display only)
- No keyboard traps or focus issues
- Animates independently of user interaction

### Color Contrast

- Numbers: Primary blue (#2563eb) on white/gray backgrounds
- Meets WCAG 2.1 AA standard (>4.5:1 contrast ratio)
- Labels: Gray-600 on white (#4b5563) - sufficient contrast

### Motion Sensitivity

Users with vestibular disorders or motion sensitivity can:
- Disable animations via browser/OS settings
- Component respects `prefers-reduced-motion` media query

## 🎨 Styling & Customization

### Custom CSS Classes

Add additional styles via className:

```tsx
<StatsBar className="my-8 border-t border-b border-gray-200" />
```

### Overriding Colors

The component uses CSS variables from the design system:

```css
/* In your globals.css */
:root {
  --color-primary-base: #your-color;
  --color-primary-light: #your-lighter-color;
  --color-text-primary: #your-text-color;
  --color-text-secondary: #your-secondary-text;
}
```

### Custom Separators

The component includes decorative vertical lines between stats on desktop. These are hardcoded but can be hidden:

```tsx
<StatsBar className="[&_.separator]:hidden" />
```

Or modify in the component source code.

## 📊 Number Formatting

### Handling Different Value Types

**Whole numbers**:
```tsx
{ value: '50', numericValue: 50 }
// Displays: 50
```

**With plus sign**:
```tsx
{ value: '50+', numericValue: 50, suffix: '+' }
// Animates to 50, displays: 50+
```

**Percentages**:
```tsx
{ value: '100%', numericValue: 100, suffix: '%' }
// Animates to 100, displays: 100%
```

**Millions/Thousands**:
```tsx
{ value: '2M+', numericValue: 2, suffix: 'M+' }
// Animates to 2, displays: 2M+
```

**Decimals**:
```tsx
{ value: '4.9', numericValue: 4.9 }
// Animates to 4.9, displays: 4 (rounded)
// Note: Component currently rounds to integers
```

### Large Numbers

For very large numbers, animate to a smaller value and use a suffix:

```tsx
// Instead of animating to 2,000,000:
{ value: '2M+', numericValue: 2000000, suffix: '' }

// Animate to 2 with suffix:
{ value: '2M+', numericValue: 2, suffix: 'M+' }
// More performant and better UX
```

## 🐛 Troubleshooting

### Animation not triggering

**Problem**: Stats show final values immediately without counting up

**Solutions**:
1. Check if `enableAnimation={false}` is set
2. Verify `numericValue` is defined in stat objects
3. Ensure component is in viewport (scroll down if it's below fold)
4. Check browser console for JavaScript errors

### Icons not displaying

**Problem**: Blank space where icons should be

**Solutions**:
1. Verify Lucide React is installed: `npm list lucide-react`
2. Check icon imports at top of file
3. Ensure icon is assigned to `icon` field (not as string)
4. Try a different icon to rule out specific icon issues

### Layout broken on mobile

**Problem**: Stats overflow or don't stack properly

**Solutions**:
1. Ensure Tailwind CSS is processing `md:` and `lg:` breakpoints
2. Check for parent containers with fixed widths
3. Test in browser dev tools with responsive mode
4. Verify `container` class is working (check globals.css)

### Numbers counting to wrong values

**Problem**: Numbers count to unexpected values

**Solutions**:
1. Check that `numericValue` matches intended animation target
2. Verify `suffix` is separate from `numericValue`
3. Example: For "50+", use `numericValue: 50, suffix: '+'`
4. Don't include suffix in numericValue (e.g., not `numericValue: "50+"`)

### Dark mode colors incorrect

**Problem**: Text unreadable in dark mode

**Solutions**:
1. Verify dark mode CSS variables are defined in globals.css
2. Check that `dark:` prefixes are in Tailwind config
3. Test by manually adding `dark` class to `<html>` element
4. Ensure ThemeProvider is wrapping the app

## 🎯 Best Practices

### Writing Effective Stats

**✅ Good stats**:
- Specific and quantifiable: "20+ Years", "100% Satisfaction"
- Impressive and credible: Don't inflate numbers
- Relevant to audience: B2B buyers care about experience, clients, scale
- Easy to understand: Avoid jargon or complex metrics

**❌ Avoid**:
- Vague: "Lots of experience", "Many clients"
- Unverifiable: "Best in the world", "Unlimited"
- Too complex: "23.7% CAGR over 5-year period"
- Irrelevant: Stats that don't matter to your audience

### Choosing Icons

- **Calendar**: Years, time, experience, history
- **Users**: Clients, customers, team members, people
- **Building2**: Facilities, properties, locations, square footage
- **Star**: Ratings, reviews, satisfaction, quality
- **Award**: Certifications, achievements, recognition
- **Target**: Goals, accuracy, precision, performance
- **TrendingUp**: Growth, improvement, success, metrics

### Performance Considerations

- Keep `animationDuration` between 1500-3000ms for best UX
- Don't use extremely large `numericValue` (causes unnecessary calculations)
- Limit to 4-6 stats maximum (more = less impact)
- Use descriptive but concise labels (1-3 words ideal)

## 📦 Export & Import

### Default Export

```tsx
import StatsBar from '@/components/sections/StatsBar'
```

### Type Exports

```tsx
import StatsBar, { Stat } from '@/components/sections/StatsBar'

// Use the Stat interface for type safety
const myStats: Stat[] = [...]
```

## 🔄 Integration with Existing About Page

The StatsBar has been integrated into the About page at `/app/about/page.tsx`:

```tsx
import StatsBar from '@/components/sections/StatsBar'

export default function AboutPage() {
  return (
    <div>
      {/* Other sections... */}

      {/* By the Numbers - Animated Stats Bar */}
      <StatsBar background="white" />

      {/* More sections... */}
    </div>
  )
}
```

**Placement**: After "What Makes Us Different" section, before "Our Approach"

**Background**: White variant to contrast with gray sections above/below

## 📚 Additional Resources

- **Lucide Icons**: https://lucide.dev/icons
- **Intersection Observer API**: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
- **requestAnimationFrame**: https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame
- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/

## 🆕 Future Enhancements

Potential additions (not currently implemented):

- Number formatting (commas for thousands: 1,000)
- Decimal place control (4.95 instead of rounded 5)
- Multiple animation styles (bounce, elastic, etc.)
- Custom easing functions
- Hover effects on individual stats
- Click-to-reveal detail modals
- Comparison mode (before/after stats)

---

**Version**: 1.0.0
**Last Updated**: 2025-11-14
**Component Location**: `/components/sections/StatsBar.tsx`
**Documentation**: `/components/sections/StatsBar-README.md`

**Questions or issues?** Review the component source code for detailed inline documentation and examples.
