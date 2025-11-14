# Component Templates

This folder contains template files to help you create new components that follow the Anderson Cleaning design system and architecture guidelines.

## 📋 Available Templates

### `ComponentTemplate.tsx`

A comprehensive TypeScript/React component template that includes:

- ✅ **Proper TypeScript typing** with interface documentation
- ✅ **Design system integration** using CSS variables
- ✅ **WCAG 2.1 AA accessibility** built-in
- ✅ **Clear code organization** with labeled sections
- ✅ **Inline documentation** and usage examples
- ✅ **Keyboard navigation** and ARIA attributes
- ✅ **Tailwind CSS** with design system variables
- ✅ **Dark mode support** automatic via CSS variables

---

## 🚀 How to Use Templates

### Step 1: Copy the Template

```bash
# Navigate to the appropriate component folder
cd components/ui  # or layout, sections, forms, etc.

# Copy the template
cp ../_templates/ComponentTemplate.tsx MyNewComponent.tsx
```

### Step 2: Customize the Component

1. **Rename the component**:
   - Change `ComponentTemplate` to `MyNewComponent` (must match filename exactly)
   - Update all instances in the file

2. **Update the header documentation**:
   ```tsx
   /**
    * MyNewComponent
    *
    * Purpose: Display a call-to-action button for service bookings
    * Location: Used in Hero sections and promotional banners
    *
    * Features:
    * - Gradient background with hover effects
    * - Supports both primary and secondary variants
    * - Fully keyboard accessible
    */
   ```

3. **Define your props interface**:
   ```tsx
   interface MyNewComponentProps {
     variant?: 'primary' | 'secondary'
     label: string
     onClick: () => void
     icon?: React.ReactNode
   }
   ```

4. **Update the component logic**:
   - Add state if needed
   - Add effects if needed
   - Add event handlers
   - Implement your JSX

5. **Update accessibility notes**:
   - Document any specific ARIA attributes used
   - Note keyboard interactions
   - List any accessibility considerations

### Step 3: Verify Accessibility

Run through the accessibility checklist:

- [ ] Semantic HTML elements
- [ ] ARIA attributes if needed
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Color contrast ≥ 4.5:1 (text)
- [ ] Touch targets ≥ 44x44px
- [ ] Works with screen readers

### Step 4: Test in Both Themes

```bash
# Test in light mode
# Toggle dark mode in browser
# Verify all colors, contrast, and readability
```

---

## 📐 Template Structure Explained

### Header Documentation
```tsx
/**
 * ComponentName
 * Purpose: What does it do?
 * Location: Where is it used?
 * Features: Key capabilities
 * Accessibility: Important a11y notes
 */
```

### Types & Interfaces
```tsx
interface ComponentProps {
  // Document each prop with JSDoc comments
  /** Brief description */
  propName: type
}
```

### Constants
```tsx
// Define constants at the top
const DEFAULT_VALUE = 'value'
```

### Component Function
```tsx
export default function ComponentName(props: ComponentProps) {
  // STATE: React.useState, useReducer
  // EFFECTS: React.useEffect
  // HANDLERS: Event handler functions
  // RENDER: JSX return
}
```

### Usage Example
```tsx
/**
 * @example
 * <ComponentName prop="value" />
 */
```

### Notes Sections
- **Accessibility Notes**: WCAG compliance details
- **Styling Notes**: Design system usage guidelines

---

## 🎨 Design System Integration

The template uses CSS variables from `/styles/design-system.css`:

### Colors
```tsx
// ✅ DO: Use design system variables
bg-[var(--color-primary-base)]
text-[var(--color-text-primary)]

// ❌ DON'T: Hard-code colors
bg-blue-700
text-gray-900
```

### Spacing
```tsx
// ✅ DO: Use spacing variables
p-[var(--spacing-md)]
gap-[var(--spacing-sm)]

// ❌ DON'T: Arbitrary spacing
p-4
gap-3
```

### Typography
```tsx
// ✅ DO: Use font variables
text-[var(--font-size-heading-2)]
font-[var(--font-weight-bold)]

// ❌ DON'T: Hard-coded sizes
text-2xl
font-bold
```

### Borders & Shadows
```tsx
// ✅ DO: Use design system
rounded-[var(--border-radius-lg)]
shadow-[var(--shadow-card)]

// ❌ DON'T: Custom values
rounded-lg
shadow-md
```

---

## 🔍 Quick Reference

### Most Common Design System Variables

```css
/* Colors */
--color-primary-base          /* #1D4ED8 - Main brand blue */
--color-accent-base           /* #10B981 - Green CTAs */
--color-text-primary          /* Auto light/dark */
--color-text-secondary        /* Muted text */
--color-background-base       /* Page background */

/* Spacing */
--spacing-sm                  /* 8px */
--spacing-md                  /* 16px */
--spacing-lg                  /* 24px */
--spacing-xl                  /* 32px */

/* Typography */
--font-size-base              /* 16px - Body */
--font-size-heading-1         /* 36px - H1 */
--font-size-heading-2         /* 30px - H2 */
--font-weight-semibold        /* 600 */
--font-weight-bold            /* 700 */

/* Effects */
--border-radius-lg            /* 12px */
--shadow-card                 /* Card shadow */
--transition-colors           /* Color transitions */
```

---

## 📚 Additional Resources

- **Main Architecture Guide**: `/components/README.md`
- **Design System Guide**: `/docs/DESIGN_SYSTEM_GUIDE.md`
- **Design System Variables**: `/styles/design-system.css`

---

## ✨ Best Practices

### Do's ✅

1. **Use the template** for all new components
2. **Document props** with JSDoc comments
3. **Use design system variables** exclusively
4. **Test accessibility** with keyboard and screen reader
5. **Keep components small** (< 200 lines when possible)
6. **Follow naming conventions** (PascalCase, exact filename match)

### Don'ts ❌

1. **Don't hard-code colors** - use CSS variables
2. **Don't use arbitrary spacing** - use spacing scale
3. **Don't skip accessibility** - it's built into the template
4. **Don't create mega-components** - break them down
5. **Don't ignore dark mode** - test both themes
6. **Don't remove documentation** - it helps future you

---

## 🤔 Need Help?

1. Check the main **Components Architecture Guide**: `/components/README.md`
2. Review the **Design System Guide**: `/docs/DESIGN_SYSTEM_GUIDE.md`
3. Look at existing components for examples
4. Ensure you're following the **One File One Purpose** principle

---

**Last Updated**: 2025-11-14
**Version**: 1.0.0
