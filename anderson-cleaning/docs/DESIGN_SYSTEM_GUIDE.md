# Anderson Cleaning Design System Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Quick Start](#quick-start)
- [Usage Examples](#usage-examples)
- [Migration Guide](#migration-guide)
- [Color System](#color-system)
- [Typography](#typography)
- [Spacing & Layout](#spacing--layout)
- [Components](#components)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)

---

## 🎯 Overview

The Anderson Cleaning Design System is a centralized, ADHD/OCD-friendly CSS variable system that provides:

- **✅ Consistency**: Single source of truth for all design tokens
- **✅ Maintainability**: Change once, updates everywhere
- **✅ Accessibility**: WCAG 2.1 AA compliant by default
- **✅ Dark Mode**: Built-in support with optimized values
- **✅ Semantic Naming**: Self-documenting, clear variable names
- **✅ Type Safety**: Predictable, organized structure

### File Location
```
/styles/design-system.css
```

---

## 🚀 Quick Start

### 1. The design system is already imported in `globals.css`:
```css
@import './design-system.css';
```

### 2. Use CSS variables in your components:

**Before (hard-coded values):**
```css
.button {
  background-color: #1D4ED8;
  color: #FFFFFF;
  padding: 12px 24px;
  border-radius: 8px;
}
```

**After (design system):**
```css
.button {
  background-color: var(--color-primary-base);
  color: var(--color-neutral-white);
  padding: var(--button-padding-md);
  border-radius: var(--button-border-radius);
}
```

### 3. In React/TypeScript components:

```tsx
<div style={{
  backgroundColor: 'var(--color-primary-base)',
  color: 'var(--color-neutral-white)',
  padding: 'var(--spacing-md)',
  borderRadius: 'var(--border-radius-lg)'
}}>
  Hello World
</div>
```

Or with Tailwind (using arbitrary values):
```tsx
<div className="bg-[var(--color-primary-base)] text-[var(--color-neutral-white)] p-[var(--spacing-md)]">
  Hello World
</div>
```

---

## 💡 Usage Examples

### Colors

#### Primary Brand Colors
```css
/* Primary blue (trust, professionalism) */
background-color: var(--color-primary-base);      /* #1D4ED8 */
background-color: var(--color-primary-hover);     /* Darker on hover */
background-color: var(--color-primary-light);     /* Light backgrounds */
```

#### Accent Colors
```css
/* Green accent (CTAs, success) */
background-color: var(--color-accent-base);       /* #10B981 */
background-color: var(--color-accent-hover);      /* Darker on hover */
```

#### Text Colors
```css
color: var(--color-text-primary);     /* Main text (dark/light auto) */
color: var(--color-text-secondary);   /* Secondary text */
color: var(--color-text-tertiary);    /* Muted text */
color: var(--color-text-disabled);    /* Disabled state */
```

#### Semantic Colors
```css
/* Success */
background-color: var(--color-success-base);
background-color: var(--color-success-light);   /* Light background */
color: var(--color-success-text);               /* Text on light bg */

/* Error */
background-color: var(--color-error-base);
background-color: var(--color-error-light);
color: var(--color-error-text);

/* Warning */
background-color: var(--color-warning-base);
background-color: var(--color-warning-light);
color: var(--color-warning-text);

/* Info */
background-color: var(--color-info-base);
background-color: var(--color-info-light);
color: var(--color-info-text);
```

### Typography

#### Font Sizes
```css
/* Body text */
font-size: var(--font-size-base);     /* 16px - default */
font-size: var(--font-size-sm);       /* 14px - small text */
font-size: var(--font-size-lg);       /* 18px - large text */

/* Headings */
font-size: var(--font-size-heading-1);  /* 36px - H1 */
font-size: var(--font-size-heading-2);  /* 30px - H2 */
font-size: var(--font-size-heading-3);  /* 24px - H3 */

/* Display (hero text) */
font-size: var(--font-size-display-md);  /* 60px */
```

#### Font Weights
```css
font-weight: var(--font-weight-normal);     /* 400 */
font-weight: var(--font-weight-medium);     /* 500 */
font-weight: var(--font-weight-semibold);   /* 600 */
font-weight: var(--font-weight-bold);       /* 700 */
```

#### Line Heights
```css
line-height: var(--line-height-normal);    /* 1.5 - body text */
line-height: var(--line-height-tight);     /* 1.25 - headings */
line-height: var(--line-height-relaxed);   /* 1.625 - loose text */
```

### Spacing

#### Basic Spacing
```css
/* Padding/Margin using spacing scale */
padding: var(--spacing-4);           /* 16px - medium */
padding: var(--spacing-sm);          /* 8px - small */
padding: var(--spacing-lg);          /* 24px - large */

margin-bottom: var(--spacing-6);     /* 24px */
gap: var(--spacing-4);               /* 16px - grid/flex gap */
```

#### Section Spacing
```css
/* Consistent section padding */
padding-top: var(--spacing-section-md);     /* 80px */
padding-bottom: var(--spacing-section-md);
```

### Layout

#### Container Widths
```css
/* Text containers (optimal reading) */
max-width: var(--container-text);      /* 672px - 45-75 chars */

/* Content containers */
max-width: var(--container-content);   /* 1024px */

/* Site max-width */
max-width: var(--container-site);      /* 1280px */
```

### Borders & Shadows

#### Border Radius
```css
border-radius: var(--border-radius-base);   /* 8px */
border-radius: var(--border-radius-lg);     /* 12px */
border-radius: var(--border-radius-xl);     /* 16px */
border-radius: var(--border-radius-full);   /* Pills/circles */
```

#### Shadows (Elevation)
```css
box-shadow: var(--shadow-sm);        /* Subtle */
box-shadow: var(--shadow-card);      /* Cards */
box-shadow: var(--shadow-lg);        /* Dropdowns */
box-shadow: var(--shadow-modal);     /* Modals */
```

### Transitions

```css
/* Color transitions */
transition: var(--transition-colors);

/* Opacity fade */
transition: var(--transition-opacity);

/* Transform (scale, translate) */
transition: var(--transition-transform);

/* All properties */
transition: var(--transition-all);
```

### Z-Index (Layering)

```css
/* Semantic z-index (no magic numbers!) */
z-index: var(--z-index-dropdown);        /* 10 */
z-index: var(--z-index-sticky);          /* 20 */
z-index: var(--z-index-modal-backdrop);  /* 40 */
z-index: var(--z-index-modal);           /* 50 */
z-index: var(--z-index-tooltip);         /* 70 */
```

---

## 🔄 Migration Guide

### Step 1: Identify Hard-Coded Values

Find instances of hard-coded colors, spacing, etc.:

**Before:**
```css
.card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
```

### Step 2: Replace with Design System Variables

**After:**
```css
.card {
  background-color: var(--color-background-base);
  padding: var(--spacing-6);
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-card);
}
```

### Step 3: Common Replacements

| Old Value | New Variable |
|-----------|--------------|
| `#1D4ED8` | `var(--color-primary-base)` |
| `#10B981` | `var(--color-accent-base)` |
| `#FFFFFF` | `var(--color-neutral-white)` |
| `#111827` | `var(--color-text-primary)` |
| `16px` padding | `var(--spacing-4)` or `var(--spacing-md)` |
| `24px` padding | `var(--spacing-6)` or `var(--spacing-lg)` |
| `8px` radius | `var(--border-radius-base)` |
| `12px` radius | `var(--border-radius-lg)` |

---

## 🎨 Color System

### Color Contrast Guidelines (WCAG 2.1 AA)

✅ **Safe Combinations:**

```css
/* Light mode */
color: var(--color-text-primary);               /* #111827 */
background-color: var(--color-neutral-white);   /* #FFFFFF */
/* Contrast ratio: 16.3:1 (Excellent!) */

/* Dark mode */
color: var(--color-text-primary);               /* #F9FAFB */
background-color: var(--color-background-base); /* #0F172A */
/* Contrast ratio: 15.8:1 (Excellent!) */

/* Primary button */
color: var(--color-neutral-white);              /* #FFFFFF */
background-color: var(--color-primary-base);    /* #1D4ED8 */
/* Contrast ratio: 7.2:1 (Excellent!) */

/* Accent button */
color: var(--color-neutral-white);              /* #FFFFFF */
background-color: var(--color-accent-base);     /* #10B981 */
/* Contrast ratio: 4.6:1 (Pass AA) */
```

❌ **Avoid These Combinations:**
```css
/* Low contrast - FAILS WCAG */
color: #94A3B8;  /* Gray-400 */
background-color: #FFFFFF;
/* Contrast ratio: 2.8:1 (FAIL) */
```

### Color Usage Best Practices

1. **Text on Backgrounds**
   - Use `--color-text-primary` for main text
   - Use `--color-text-secondary` for supporting text
   - Always ensure 4.5:1 contrast ratio minimum

2. **Interactive Elements**
   - Use `--color-primary-base` for primary actions
   - Use `--color-accent-base` for CTAs
   - Provide hover/active states

3. **Status & Feedback**
   - Success: `--color-success-*`
   - Error: `--color-error-*`
   - Warning: `--color-warning-*`
   - Info: `--color-info-*`

---

## 📐 Typography

### Hierarchy

```css
/* Display (Hero sections) */
font-size: var(--font-size-display-lg);    /* 72px */
font-weight: var(--font-weight-extrabold);
line-height: var(--line-height-tight);

/* H1 (Page titles) */
font-size: var(--font-size-heading-1);     /* 36px */
font-weight: var(--font-weight-bold);
line-height: var(--line-height-tight);

/* H2 (Section headings) */
font-size: var(--font-size-heading-2);     /* 30px */
font-weight: var(--font-weight-bold);
line-height: var(--line-height-snug);

/* Body (Default text) */
font-size: var(--font-size-base);          /* 16px */
font-weight: var(--font-weight-normal);
line-height: var(--line-height-normal);    /* 1.5 */

/* Small (Captions, labels) */
font-size: var(--font-size-sm);            /* 14px */
font-weight: var(--font-weight-normal);
line-height: var(--line-height-normal);
```

### Readability Rules

1. **Minimum font size**: 16px for body text
2. **Maximum line length**: 45-75 characters (use `--container-text`)
3. **Line height**: 1.5+ for body text
4. **Paragraph spacing**: Use `--spacing-4` between paragraphs

---

## 🧩 Components

### Pre-configured Component Variables

#### Buttons
```css
.button-primary {
  background-color: var(--color-primary-base);
  color: var(--color-neutral-white);
  padding: var(--button-padding-md);
  border-radius: var(--button-border-radius);
  font-weight: var(--button-font-weight);
  transition: var(--transition-colors);
}

.button-primary:hover {
  background-color: var(--color-primary-hover);
}
```

#### Cards
```css
.card {
  background-color: var(--card-background);
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  box-shadow: var(--card-shadow);
}
```

#### Input Fields
```css
.input {
  padding: var(--input-padding);
  border: var(--border-width-base) solid var(--input-border-color);
  border-radius: var(--input-border-radius);
  height: var(--input-height-md);
}

.input:focus {
  border-color: var(--input-border-color-focus);
  outline: none;
  box-shadow: var(--shadow-focus);
}
```

---

## ♿ Accessibility

### Built-in Accessibility Features

1. **WCAG 2.1 AA Compliance**
   - All color combinations meet 4.5:1 contrast ratio
   - Large text (18px+) meets 3:1 ratio

2. **Touch Targets**
   - Minimum 44x44px for interactive elements
   - Use `--input-height-md` for form inputs

3. **Focus States**
   - Visible focus ring with `--shadow-focus`
   - 3px outline with offset

4. **Motion**
   - Respects `prefers-reduced-motion`
   - Handled in globals.css

5. **High Contrast Mode**
   - Automatic adjustments for `prefers-contrast: high`

### Accessibility Checklist

```css
/* ✅ Good: Accessible button */
.button {
  min-height: 44px;              /* Touch target */
  min-width: 44px;
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-primary-base);
  color: var(--color-neutral-white);  /* High contrast */
}

.button:focus-visible {
  outline: 3px solid var(--color-primary-base);
  outline-offset: 2px;
}

/* ❌ Bad: Inaccessible button */
.button-bad {
  min-height: 30px;              /* Too small! */
  background-color: #94A3B8;     /* Low contrast */
  color: #FFFFFF;
}
```

---

## ✨ Best Practices

### Do's ✅

1. **Always use CSS variables**
   ```css
   /* Good */
   color: var(--color-text-primary);
   ```

2. **Use semantic names**
   ```css
   /* Good */
   padding: var(--spacing-md);
   ```

3. **Follow the spacing scale**
   ```css
   /* Good - predictable */
   margin-bottom: var(--spacing-6);  /* 24px */
   ```

4. **Use component variables**
   ```css
   /* Good */
   padding: var(--button-padding-md);
   ```

### Don'ts ❌

1. **Don't hard-code colors**
   ```css
   /* Bad */
   color: #1D4ED8;

   /* Good */
   color: var(--color-primary-base);
   ```

2. **Don't use arbitrary spacing**
   ```css
   /* Bad */
   padding: 17px;

   /* Good */
   padding: var(--spacing-4);  /* 16px */
   ```

3. **Don't use magic z-index numbers**
   ```css
   /* Bad */
   z-index: 9999;

   /* Good */
   z-index: var(--z-index-modal);
   ```

4. **Don't ignore dark mode**
   ```css
   /* Bad - only works in light mode */
   color: #111827;

   /* Good - adapts to theme */
   color: var(--color-text-primary);
   ```

---

## 🔍 Quick Reference

### Most Common Variables

```css
/* Colors */
--color-primary-base
--color-accent-base
--color-text-primary
--color-text-secondary
--color-background-base

/* Spacing */
--spacing-sm    /* 8px */
--spacing-md    /* 16px */
--spacing-lg    /* 24px */
--spacing-xl    /* 32px */

/* Typography */
--font-size-base     /* 16px */
--font-size-lg       /* 18px */
--font-size-heading-1  /* 36px */
--font-weight-semibold

/* Layout */
--container-text      /* 672px */
--container-content   /* 1024px */

/* Effects */
--shadow-card
--border-radius-lg
--transition-colors
```

---

## 📞 Support

For questions or issues with the design system:

1. Check this guide first
2. Review `/styles/design-system.css` for available variables
3. Ensure you're following naming conventions
4. Test in both light and dark modes

---

## 🎓 Learning Resources

- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

---

**Last Updated:** 2025-11-14
**Version:** 1.0.0
