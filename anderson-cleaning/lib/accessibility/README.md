# Accessibility (A11y) Implementation

Comprehensive WCAG 2.2 Level AA compliance implementation for the Anderson Cleaning website.

## 🎯 Accessibility Statement

Anderson Cleaning is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.

### Conformance Status

This website aims to conform to **WCAG 2.2 Level AA** standards.

**Conformance Status**: Partial conformance

- We are actively working towards full WCAG 2.2 AA compliance
- Some areas may not yet meet all success criteria
- We welcome feedback and will address issues promptly

## 📋 Implementation Checklist

### ✅ Semantic HTML (Complete)

- [x] Proper heading hierarchy (h1 → h6, no skipping)
- [x] Semantic landmarks (`<nav>`, `<main>`, `<aside>`, `<footer>`)
- [x] `<article>` for blog posts and independent content
- [x] `<section>` with `aria-labelledby` for major sections
- [x] Lists (`<ul>`, `<ol>`, `<dl>`) for navigation and content groups
- [x] Proper button vs anchor usage
- [x] Form elements with proper labels

### ✅ Keyboard Navigation (Complete)

- [x] All interactive elements focusable
- [x] Visible focus indicators (3px solid outline)
- [x] Skip to main content link
- [x] Logical tab order
- [x] No keyboard traps
- [x] Escape key closes modals/dialogs
- [x] Arrow key navigation for custom components

### ✅ Forms Accessibility (Complete)

- [x] All inputs have associated labels
- [x] Required fields marked with `*` and `aria-required`
- [x] Error messages linked with `aria-describedby`
- [x] Error summary with `role="alert"`
- [x] Fieldset/legend for radio/checkbox groups
- [x] Autocomplete attributes where appropriate
- [x] Clear error recovery instructions
- [x] Success messages announced

### ✅ Color Contrast (Complete)

- [x] Text contrast ≥4.5:1 for normal text
- [x] Large text contrast ≥3:1
- [x] Interactive elements contrast ≥3:1
- [x] Don't rely on color alone (icons + text)
- [x] Dark mode with sufficient contrast

### ✅ Screen Reader Support (Complete)

- [x] Descriptive alt text for all images
- [x] `aria-label` for icon-only buttons
- [x] `aria-live` regions for dynamic content
- [x] `aria-expanded` for accordions/dropdowns
- [x] `role="status"` for loading indicators
- [x] Language changes announced (`lang` attribute)
- [x] Decorative images hidden (`alt=""` or `aria-hidden`)

### ✅ Responsive Text (Complete)

- [x] 200% zoom without horizontal scroll
- [x] No text in images (or alternatives provided)
- [x] Line height 1.5+ for body text
- [x] Sufficient paragraph spacing
- [x] Minimum font size 16px

### ✅ Additional Features (Complete)

- [x] `prefers-reduced-motion` support
- [x] `prefers-contrast: high` support
- [x] Touch targets ≥44x44px
- [x] No flashing content
- [x] Auto-playing content can be paused

## 🛠️ Components and Utilities

### SkipLink Component

Allows keyboard users to skip navigation and jump to main content.

**Usage:**

```tsx
import SkipLink from '@/components/SkipLink'

// In root layout
;<body>
  <SkipLink />
  <Navigation />
  <main id="main-content" tabIndex={-1}>
    {/* Main content */}
  </main>
</body>
```

**Features:**

- Visible only when focused
- First element in tab order
- Smooth scroll to main content
- WCAG 2.2 Level A requirement

### Accessibility Utilities

Located in `lib/utils/accessibility.ts`.

**Generate Unique IDs:**

```tsx
import { generateId } from '@/lib/utils/accessibility'

const id = generateId('email') // "email-1-1234567890"
```

**Announce to Screen Readers:**

```tsx
import { announceToScreenReader } from '@/lib/utils/accessibility'

// Polite announcement (default)
announceToScreenReader('Form submitted successfully')

// Assertive announcement (interrupts)
announceToScreenReader('Error: Please fix form errors', 'assertive')
```

**Focus Management:**

```tsx
import { trapFocus, restoreFocus } from '@/lib/utils/accessibility'

// Trap focus within modal
const cleanup = trapFocus(modalElement)

// Cleanup when modal closes
cleanup()

// Restore focus to trigger element
restoreFocus(previouslyFocusedElement)
```

**Handle Escape Key:**

```tsx
import { handleEscapeKey } from '@/lib/utils/accessibility'

// Close modal on Escape
const cleanup = handleEscapeKey(() => {
  closeModal()
})

// Cleanup
cleanup()
```

**Check Color Contrast:**

```tsx
import { getContrastRatio, meetsContrastRequirement } from '@/lib/utils/accessibility'

const ratio = getContrastRatio('#000000', '#FFFFFF') // 21
const meetsAA = meetsContrastRequirement(ratio, 'AA', false) // true
```

**Reduced Motion:**

```tsx
import { prefersReducedMotion, getAnimationDuration } from '@/lib/utils/accessibility'

const duration = getAnimationDuration(300) // 0 if reduced motion preferred
```

### Accessibility Provider

Runs axe-core accessibility testing in development.

**Usage:**

```tsx
// In root layout
import AccessibilityProvider from '@/components/AccessibilityProvider'

;<AccessibilityProvider>{children}</AccessibilityProvider>
```

**Features:**

- Only runs in development mode
- Reports violations to console
- Zero production bundle impact

## 🎨 CSS Classes

### Screen Reader Only

**`.sr-only`** - Visually hidden, accessible to screen readers:

```tsx
<span className="sr-only">Loading...</span>
```

**`.sr-only-focusable`** - Hidden until focused:

```tsx
<a href="#main" className="sr-only-focusable">
  Skip navigation
</a>
```

### Focus Styles

Focus styles are automatically applied with `focus-visible`:

- Standard elements: 2px outline
- Interactive elements: 3px outline with shadow
- Dark mode support
- High contrast mode support

### Error Styling

**`aria-invalid`** - Applied automatically:

```tsx
<input aria-invalid="true" />
```

**Error messages:**

```tsx
<span className="error-message">This field is required</span>
```

### Message Types

```tsx
<div className="success-message">Operation successful</div>
<div className="error-message">An error occurred</div>
<div className="warning-message">Warning: Check your input</div>
<div className="info-message">Additional information</div>
```

All include appropriate icons automatically.

## 📱 Form Accessibility

### Proper Label Association

```tsx
// DO: Explicit association
<label htmlFor="email">Email Address</label>
<input id="email" name="email" type="email" />

// DO: Implicit association
<label>
  Email Address
  <input name="email" type="email" />
</label>

// DON'T: No association
<span>Email</span>
<input name="email" type="email" />
```

### Required Fields

```tsx
<label htmlFor="name">
  Full Name
  <span className="required-indicator" aria-label="required">*</span>
</label>
<input
  id="name"
  name="name"
  required
  aria-required="true"
/>
```

### Error Handling

```tsx
const errorId = `${fieldId}-error`

<input
  id="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? errorId : undefined}
/>
{hasError && (
  <span id={errorId} role="alert" className="error-message">
    Please enter a valid email address
  </span>
)}
```

### Field Groups

```tsx
<fieldset>
  <legend>Contact Preference</legend>
  <label>
    <input type="radio" name="contact" value="email" />
    Email
  </label>
  <label>
    <input type="radio" name="contact" value="phone" />
    Phone
  </label>
</fieldset>
```

### Autocomplete

```tsx
<input
  name="email"
  type="email"
  autoComplete="email"
/>

<input
  name="phone"
  type="tel"
  autoComplete="tel"
/>

<input
  name="company"
  type="text"
  autoComplete="organization"
/>
```

## ⌨️ Keyboard Navigation Guide

### Tab Order

1. **Skip to main content** link (visible on focus)
2. **Navigation** menu items
3. **Main content** interactive elements
4. **Sidebar** (if present)
5. **Footer** links

### Keyboard Shortcuts

| Key          | Action                             |
| ------------ | ---------------------------------- |
| `Tab`        | Move to next focusable element     |
| `Shift+Tab`  | Move to previous focusable element |
| `Enter`      | Activate button/link               |
| `Space`      | Activate button, toggle checkbox   |
| `Escape`     | Close modal/dialog                 |
| `Arrow keys` | Navigate within custom components  |
| `Home`       | Jump to start (in text fields)     |
| `End`        | Jump to end (in text fields)       |

### Focus Management

All interactive elements must be focusable:

- Buttons
- Links
- Form inputs
- Custom controls (with `tabindex="0"`)

Elements that should NOT be focusable:

- Decorative elements
- Disabled elements
- Hidden elements (use `tabindex="-1"`)

## 🔍 Testing Accessibility

### Automated Testing

**Run axe-core in Development:**

```bash
npm run dev
# Open browser console
# axe violations will appear in console
```

**Lighthouse Audit:**

```bash
npm run build
npm run start
# Chrome DevTools > Lighthouse > Accessibility
# Target score: ≥95
```

### Manual Testing

**Keyboard Navigation:**

1. Unplug mouse
2. Use `Tab` to navigate entire site
3. Verify all interactive elements are reachable
4. Check focus indicators are visible
5. Ensure no keyboard traps

**Screen Reader Testing:**

**Windows - NVDA (Free):**

```
Download: https://www.nvaccess.org/
Shortcut: Ctrl + Alt + N (start/stop)
```

**Windows - JAWS (Paid):**

```
Download: https://www.freedomscientific.com/products/software/jaws/
Free trial available
```

**Mac - VoiceOver (Built-in):**

```
Enable: Cmd + F5
Quick start: Cmd + F5, then Ctrl + Opt + Arrow keys
```

**iOS - VoiceOver:**

```
Settings > Accessibility > VoiceOver
Shortcut: Triple-click home/side button
```

**Android - TalkBack:**

```
Settings > Accessibility > TalkBack
```

### Browser Extensions

**WAVE (Web Accessibility Evaluation Tool):**

```
Chrome: https://chrome.google.com/webstore/detail/wave-evaluation-tool/...
Firefox: https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/
```

**axe DevTools:**

```
Chrome: https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/...
Firefox: https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/
```

**Accessibility Insights:**

```
Chrome/Edge: https://accessibilityinsights.io/
```

### Color Contrast Checkers

**Online Tools:**

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)
- [Color Review](https://color.review/)

**Browser Extensions:**

- [Colorblindly](https://chrome.google.com/webstore/detail/colorblindly/)
- [Let's get color blind](https://chromewebstore.google.com/detail/lets-get-color-blind/)

### Validation Tools

**AChecker:**

```
https://achecker.achecks.ca/checker/index.php
```

**WAVE API:**

```
https://wave.webaim.org/api/
```

## 🐛 Common Issues and Solutions

### Issue: Low Color Contrast

**Problem:** Text is hard to read on background

**Solution:**

```css
/* Ensure 4.5:1 contrast for normal text */
color: #1f2937; /* Dark gray on white */
background: #ffffff;

/* Ensure 3:1 contrast for large text (18px+ or 14px+ bold) */
color: #374151;
background: #f3f4f6;
```

### Issue: Missing Alt Text

**Problem:** Images without alternative text

**Solution:**

```tsx
// Informative image
<img src="/service.jpg" alt="Janitor mopping office floor" />

// Decorative image
<img src="/pattern.svg" alt="" />
// or
<img src="/pattern.svg" aria-hidden="true" />

// Complex image
<img
  src="/chart.png"
  alt="Bar chart showing 95% customer satisfaction"
  longdesc="/chart-description.html"
/>
```

### Issue: No Keyboard Access

**Problem:** Elements not reachable with keyboard

**Solution:**

```tsx
// DON'T: Use div for button
<div onClick={handleClick}>Click me</div>

// DO: Use proper button element
<button onClick={handleClick}>Click me</button>

// DO: Make div keyboard accessible (if necessary)
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick()
    }
  }}
>
  Click me
</div>
```

### Issue: Forms Not Labeled

**Problem:** Screen readers can't identify form fields

**Solution:**

```tsx
// DO: Associate label with input
<label htmlFor="email">Email Address</label>
<input id="email" type="email" />

// DO: Use aria-label for icon buttons
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// DO: Use aria-labelledby for complex associations
<div id="form-title">Contact Form</div>
<form aria-labelledby="form-title">
  {/* form fields */}
</form>
```

### Issue: Dynamic Content Not Announced

**Problem:** Content changes not communicated to screen readers

**Solution:**

```tsx
// Loading state
<div role="status" aria-live="polite">
  {isLoading ? 'Loading...' : 'Content loaded'}
</div>

// Error message
<div role="alert" aria-live="assertive">
  {error && 'An error occurred'}
</div>

// Use utility function
import { announceToScreenReader } from '@/lib/utils/accessibility'

announceToScreenReader('Form submitted successfully')
```

### Issue: Modal Focus Trap

**Problem:** Focus escapes modal

**Solution:**

```tsx
import { trapFocus, handleEscapeKey } from '@/lib/utils/accessibility'

useEffect(() => {
  if (isOpen) {
    // Trap focus
    const cleanupFocus = trapFocus(modalRef.current)

    // Handle Escape key
    const cleanupEscape = handleEscapeKey(() => setIsOpen(false))

    return () => {
      cleanupFocus()
      cleanupEscape()
    }
  }
}, [isOpen])
```

## 📚 Resources

### WCAG Guidelines

- [WCAG 2.2 Overview](https://www.w3.org/WAI/WCAG22/quickref/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG22/quickref/)

### Testing Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Pa11y](https://pa11y.org/)

### Screen Readers

- [NVDA (Windows)](https://www.nvaccess.org/)
- [JAWS (Windows)](https://www.freedomscientific.com/products/software/jaws/)
- [VoiceOver (Mac/iOS)](https://www.apple.com/accessibility/voiceover/)
- [TalkBack (Android)](https://support.google.com/accessibility/android/answer/6283677)

### Learning Resources

- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Inclusive Components](https://inclusive-components.design/)

## 🤝 Feedback

We welcome feedback on the accessibility of this website. If you encounter any accessibility barriers, please contact us:

**Email:** accessibility@andersoncleaning.com
**Phone:** (413) 733-3334
**Address:** 103 Wayside Ave, West Springfield, MA 01089

We aim to respond within 5 business days.

## 📝 Known Issues

None currently reported. We are continuously working to improve accessibility.

Last updated: January 13, 2025

---

**Commitment**: Anderson Cleaning is committed to making our website accessible to all users, including those with disabilities. We regularly review and update our accessibility practices to ensure compliance with WCAG 2.2 Level AA standards.
