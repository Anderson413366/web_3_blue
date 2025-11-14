# Anderson Cleaning Component Architecture

## 📋 Table of Contents
- [Philosophy](#philosophy)
- [Folder Structure](#folder-structure)
- [Naming Conventions](#naming-conventions)
- [Component Types](#component-types)
- [Creating New Components](#creating-new-components)
- [Component Template](#component-template)
- [Props Documentation](#props-documentation)
- [Styling Guidelines](#styling-guidelines)
- [Accessibility Checklist](#accessibility-checklist)
- [Testing](#testing)
- [Best Practices](#best-practices)

---

## 🎯 Philosophy

### Core Principles

1. **One File, One Purpose**
   - Each file contains ONE component
   - File name EXACTLY matches component name
   - No "god files" with multiple components

2. **Small, Reusable, Composable**
   - Components should be small (< 200 lines)
   - Single responsibility principle
   - Compose complex UIs from simple components

3. **Predictable Location**
   - Related files grouped in folders
   - Clear hierarchy (layout → sections → common)
   - Easy to find without searching

4. **Self-Documenting**
   - TypeScript for type safety
   - JSDoc comments for complex logic
   - Props clearly defined with interfaces
   - Examples in component file

5. **Accessible by Default**
   - WCAG 2.1 AA compliance built-in
   - Semantic HTML
   - ARIA labels when needed
   - Keyboard navigation support

---

## 📁 Folder Structure

```
/components/
├── README.md              ← You are here
├── _templates/            ← Component templates
│   ├── ComponentTemplate.tsx
│   └── README.md
│
├── layout/                ← Page structure components
│   ├── Header.tsx         ← Site header with navigation
│   ├── Footer.tsx         ← Site footer
│   ├── Navigation.tsx     ← Main navigation
│   └── SkipLink.tsx       ← Accessibility skip link
│
├── sections/              ← Large page sections
│   ├── BeforeAfterSlider.tsx
│   ├── IndustriesGrid.tsx
│   ├── MapSection.tsx
│   └── [feature-name]/    ← Complex sections get folders
│       ├── FeatureName.tsx
│       ├── FeatureSubComponent.tsx
│       └── index.ts
│
├── ui/                    ← Reusable UI primitives
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Modal.tsx
│   ├── Alert.tsx
│   ├── Spinner.tsx
│   └── ...
│
├── forms/                 ← Form components
│   ├── ContactForm.tsx
│   ├── QuoteForm.tsx
│   └── forms/[specific-form]/
│       ├── FormName.tsx
│       └── validation.ts
│
├── careers/               ← Domain-specific (careers)
│   ├── CareersPage.tsx
│   ├── CareersHero.tsx
│   ├── ApplicationForm.tsx
│   └── sections/
│       ├── PersonalInfoSection.tsx
│       └── ...
│
└── [feature]/             ← Other domain-specific
    └── ...
```

### Organization Rules

1. **`layout/`** - Components used on every page (Header, Footer, etc.)
2. **`sections/`** - Large, page-specific sections (Hero, Services grid, etc.)
3. **`ui/`** - Small, reusable UI primitives (Button, Input, Card, etc.)
4. **`forms/`** - Form-related components
5. **`[domain]/`** - Feature-specific components (careers, blog, etc.)

### When to Create a Folder vs. Single File

**Single File** (ComponentName.tsx):
- Component < 200 lines
- No subcomponents
- No related utilities

**Folder** (ComponentName/):
- Component > 200 lines
- Has subcomponents
- Has related utilities, types, or tests
- Complex domain logic

```
ComponentName/
├── ComponentName.tsx      ← Main component
├── SubComponent.tsx       ← Related subcomponent
├── types.ts               ← TypeScript types
├── utils.ts               ← Helper functions
├── constants.ts           ← Constants/config
└── index.ts               ← Public exports
```

---

## 📝 Naming Conventions

### File Names

```
✅ Good:
- Button.tsx
- ContactForm.tsx
- CareersHero.tsx
- PersonalInfoSection.tsx

❌ Bad:
- button.tsx (lowercase)
- contactForm.tsx (camelCase)
- careers-hero.tsx (kebab-case)
- PersonalInfo.tsx (unclear what it is)
```

**Rules:**
- PascalCase for component files
- Exact match: `Button.tsx` exports `function Button()`
- Descriptive names: `PersonalInfoSection` not `Section1`
- No abbreviations: `Navigation` not `Nav`

### Component Names

```typescript
// ✅ Good: Named export matching filename
export function Button({ children }: ButtonProps) { ... }

// ✅ Good: Default export with same name
export default function Button({ children }: ButtonProps) { ... }

// ❌ Bad: Name mismatch
// File: Button.tsx, Component: PrimaryButton
export function PrimaryButton() { ... }

// ❌ Bad: Anonymous default export
export default function({ children }) { ... }
```

### Variable Names

```typescript
// ✅ Good: Clear, semantic names
const isFormValid = checkValidation();
const userEmail = formData.email;
const navigationItems = getMenuItems();

// ❌ Bad: Abbreviations, unclear
const isValid = check();
const email = fd.e;
const items = getItems();
```

---

## 🔧 Component Types

### 1. Layout Components (`layout/`)

**Purpose:** Page structure, appears on every page

**Examples:**
- `Header.tsx` - Site header with logo, navigation
- `Footer.tsx` - Site footer with links, contact info
- `Navigation.tsx` - Main navigation menu

**Characteristics:**
- Used in `app/layout.tsx`
- Contains global UI elements
- Handles site-wide state (theme, language)

### 2. Section Components (`sections/`)

**Purpose:** Large, self-contained page sections

**Examples:**
- `BeforeAfterSlider.tsx` - Interactive image comparison
- `IndustriesGrid.tsx` - Grid of industry cards
- `TestimonialsCarousel.tsx` - Customer testimonials

**Characteristics:**
- Used on specific pages
- Contains multiple UI components
- Has its own layout and spacing

### 3. UI Components (`ui/`)

**Purpose:** Small, reusable building blocks

**Examples:**
- `Button.tsx` - Clickable button with variants
- `Input.tsx` - Text input field
- `Card.tsx` - Container with padding and shadow

**Characteristics:**
- Highly reusable
- Props-driven (controlled)
- Minimal internal state
- Composable

### 4. Form Components (`forms/`)

**Purpose:** Data collection and validation

**Examples:**
- `ContactForm.tsx` - Contact us form
- `QuoteForm.tsx` - Get a quote form

**Characteristics:**
- Manages form state
- Validation logic
- Submit handling
- Error display

### 5. Domain Components (`[feature]/`)

**Purpose:** Feature-specific, complex components

**Examples:**
- `careers/` - Job application components
- `blog/` - Blog-specific components

**Characteristics:**
- Feature-specific logic
- May have subcomponents
- Domain knowledge encapsulated

---

## 🆕 Creating New Components

### Step-by-Step Guide

#### Step 1: Determine Component Type

Ask yourself:
- Is it used on every page? → `layout/`
- Is it a large page section? → `sections/`
- Is it a small, reusable UI element? → `ui/`
- Is it a form? → `forms/`
- Is it feature-specific? → `[feature]/`

#### Step 2: Choose File Structure

- **Simple component** (< 200 lines, no subcomponents):
  ```
  components/ui/Button.tsx
  ```

- **Complex component** (> 200 lines, has subcomponents):
  ```
  components/sections/BeforeAfterSlider/
  ├── BeforeAfterSlider.tsx
  ├── SliderControls.tsx
  ├── types.ts
  └── index.ts
  ```

#### Step 3: Copy Template

```bash
# For simple component
cp components/_templates/ComponentTemplate.tsx components/ui/YourComponent.tsx

# For complex component
mkdir components/sections/YourComponent
cp components/_templates/ComponentTemplate.tsx components/sections/YourComponent/YourComponent.tsx
```

#### Step 4: Define Props Interface

```typescript
interface YourComponentProps {
  /** Brief description of prop */
  title: string;

  /** Optional prop with default */
  variant?: 'primary' | 'secondary';

  /** Callback function */
  onClick?: () => void;

  /** Children content */
  children?: React.ReactNode;
}
```

#### Step 5: Implement Component

```typescript
export function YourComponent({
  title,
  variant = 'primary',
  onClick,
  children
}: YourComponentProps) {
  return (
    <div className="your-component">
      {/* Implementation */}
    </div>
  );
}
```

#### Step 6: Document Usage

Add JSDoc comment with example:

```typescript
/**
 * YourComponent displays [description]
 *
 * @example
 * ```tsx
 * <YourComponent
 *   title="Hello"
 *   variant="primary"
 * >
 *   Content here
 * </YourComponent>
 * ```
 */
```

#### Step 7: Test in Storybook/Browser

- Import component where needed
- Test all prop combinations
- Test responsive behavior
- Test dark mode
- Test accessibility

---

## 📄 Component Template

See `components/_templates/ComponentTemplate.tsx` for the full template.

**Quick Template:**

```typescript
'use client'

import React from 'react'

/**
 * ComponentName - [Brief description]
 *
 * Purpose: [What this component does]
 * Used on: [Which pages use this]
 *
 * @example
 * ```tsx
 * <ComponentName title="Example" />
 * ```
 */

interface ComponentNameProps {
  /** Description of prop */
  title: string;

  /** Optional children */
  children?: React.ReactNode;
}

export function ComponentName({
  title,
  children
}: ComponentNameProps) {
  return (
    <div className="component-name">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// Optional: Default props using destructuring
ComponentName.defaultProps = {
  children: null
}
```

---

## 📋 Props Documentation

### Interface Best Practices

```typescript
interface ButtonProps {
  // ✅ Good: Required prop with description
  /** Button text label */
  label: string;

  // ✅ Good: Optional prop with union type
  /** Button style variant */
  variant?: 'primary' | 'secondary' | 'outline';

  // ✅ Good: Optional prop with default in destructuring
  /** Button size */
  size?: 'sm' | 'md' | 'lg';

  // ✅ Good: Callback with typed parameters
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

  // ✅ Good: Standard React props
  /** Additional CSS classes */
  className?: string;

  /** Disabled state */
  disabled?: boolean;

  /** Children content */
  children?: React.ReactNode;
}
```

### JSDoc Comments

```typescript
/**
 * Button component for user interactions
 *
 * Supports multiple variants, sizes, and states.
 * Fully accessible with ARIA labels and keyboard navigation.
 *
 * @example
 * ```tsx
 * // Primary button
 * <Button
 *   label="Click Me"
 *   variant="primary"
 *   onClick={handleClick}
 * />
 *
 * // Secondary button with icon
 * <Button variant="secondary">
 *   <Icon /> Save
 * </Button>
 * ```
 */
export function Button({ ... }: ButtonProps) { ... }
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Classes

**Class Order** (for consistency):

```tsx
<div className="
  {/* Layout */}
  flex items-center justify-between

  {/* Spacing */}
  p-4 mx-auto

  {/* Sizing */}
  w-full max-w-screen-xl

  {/* Typography */}
  text-lg font-semibold

  {/* Colors */}
  bg-white text-gray-900

  {/* Borders */}
  border border-gray-200 rounded-lg

  {/* Effects */}
  shadow-md hover:shadow-lg

  {/* Transitions */}
  transition-all duration-200

  {/* Responsive */}
  md:flex-row md:p-6

  {/* Dark mode */}
  dark:bg-slate-800 dark:text-white
">
```

### Using Design System Variables

```tsx
// ✅ Good: Use design system variables
<div className="bg-[var(--color-primary-base)]">

// ✅ Good: Use Tailwind utilities
<div className="bg-primary-700">

// ❌ Bad: Hard-coded colors
<div className="bg-[#1D4ED8]">
```

### Component-Specific Styles

For complex styling, create a separate styles file:

```typescript
// components/ui/Button/Button.tsx
import styles from './Button.module.css'

export function Button() {
  return <button className={styles.button}>Click</button>
}
```

```css
/* components/ui/Button/Button.module.css */
.button {
  /* Custom styles that can't be done with Tailwind */
  background: linear-gradient(135deg, var(--color-primary-base), var(--color-primary-dark));
}
```

### CSS Naming Convention (When Needed)

Use BEM for custom CSS classes:

```css
/* Block */
.component-name { }

/* Element */
.component-name__title { }
.component-name__content { }

/* Modifier */
.component-name--primary { }
.component-name--disabled { }

/* State */
.component-name.is-active { }
.component-name.is-loading { }
```

Example:
```tsx
<div className="card card--featured">
  <h2 className="card__title">Title</h2>
  <div className="card__content">Content</div>
</div>
```

---

## ♿ Accessibility Checklist

Every component must meet these requirements:

### Required ✅

- [ ] **Semantic HTML** - Use correct elements (`<button>` not `<div>`)
- [ ] **Keyboard Navigation** - All interactive elements focusable
- [ ] **Focus Indicators** - Visible focus states
- [ ] **ARIA Labels** - For icons, buttons without text
- [ ] **Color Contrast** - Meet WCAG 2.1 AA (4.5:1 for text)
- [ ] **Touch Targets** - Minimum 44x44px for interactive elements
- [ ] **Alt Text** - For all images and icons
- [ ] **Error Messages** - Clear, associated with inputs
- [ ] **Loading States** - Announce to screen readers
- [ ] **Skip Links** - For navigation (layout components)

### Component-Specific

#### Buttons
```tsx
// ✅ Good
<button
  type="button"
  aria-label="Close dialog"
  onClick={handleClose}
>
  <CloseIcon />
</button>

// ❌ Bad
<div onClick={handleClose}>
  <CloseIcon />
</div>
```

#### Forms
```tsx
// ✅ Good
<div>
  <label htmlFor="email">Email Address</label>
  <input
    id="email"
    type="email"
    aria-required="true"
    aria-invalid={hasError}
    aria-describedby={hasError ? "email-error" : undefined}
  />
  {hasError && (
    <p id="email-error" role="alert">
      Please enter a valid email address
    </p>
  )}
</div>
```

#### Images
```tsx
// ✅ Good: Meaningful image
<img
  src="/logo.svg"
  alt="Anderson Cleaning logo"
/>

// ✅ Good: Decorative image
<img
  src="/decoration.svg"
  alt=""
  aria-hidden="true"
/>
```

#### Modals
```tsx
// ✅ Good
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
>
  <h2 id="dialog-title">Confirm Action</h2>
  {/* Content */}
</div>
```

---

## 🧪 Testing

### Testing Strategy

1. **Visual Testing** - Browser testing (manual)
2. **Unit Testing** - Component logic (Jest + React Testing Library)
3. **Accessibility Testing** - Automated a11y checks
4. **E2E Testing** - User flows (Playwright)

### Component Test Template

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click Me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click Me')
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

---

## ✨ Best Practices

### Do's ✅

1. **Keep Components Small**
   ```typescript
   // ✅ Good: Focused, single purpose
   export function SubmitButton({ onSubmit }: Props) {
     return <button onClick={onSubmit}>Submit</button>
   }
   ```

2. **Use Composition**
   ```typescript
   // ✅ Good: Composable
   <Card>
     <CardHeader>Title</CardHeader>
     <CardContent>Content</CardContent>
   </Card>
   ```

3. **Explicit Props**
   ```typescript
   // ✅ Good: Clear interface
   interface UserCardProps {
     name: string;
     email: string;
     avatar?: string;
   }
   ```

4. **Handle Loading States**
   ```typescript
   // ✅ Good: Loading state
   if (isLoading) {
     return <Spinner aria-label="Loading..." />
   }
   ```

5. **Error Boundaries**
   ```typescript
   // ✅ Good: Handle errors gracefully
   <ErrorBoundary fallback={<ErrorMessage />}>
     <Component />
   </ErrorBoundary>
   ```

### Don'ts ❌

1. **Don't Create God Components**
   ```typescript
   // ❌ Bad: 1000+ line component doing everything
   export function HomePage() { ... }
   ```

2. **Don't Use Inline Styles (Except for Dynamic Values)**
   ```typescript
   // ❌ Bad: Inline styles
   <div style={{ padding: '20px', background: '#fff' }}>

   // ✅ Good: Tailwind classes
   <div className="p-5 bg-white">

   // ✅ Good: Dynamic value
   <div style={{ transform: `translateX(${offset}px)` }}>
   ```

3. **Don't Ignore TypeScript Errors**
   ```typescript
   // ❌ Bad: Silencing errors
   // @ts-ignore
   const value = props.unknownProp

   // ✅ Good: Fix the type
   interface Props {
     knownProp: string;
   }
   ```

4. **Don't Nest Too Deeply**
   ```typescript
   // ❌ Bad: Deep nesting
   <Component1>
     <Component2>
       <Component3>
         <Component4>
           {/* Too deep! */}
         </Component4>
       </Component3>
     </Component2>
   </Component1>

   // ✅ Good: Flatten or extract
   <MainLayout>
     <ContentSection />
   </MainLayout>
   ```

5. **Don't Duplicate Code**
   ```typescript
   // ❌ Bad: Copy-paste components
   export function PrimaryButton() { ... }
   export function SecondaryButton() { /* Same code */ }

   // ✅ Good: Use props
   export function Button({ variant }: Props) { ... }
   ```

---

## 🚀 Quick Reference

### Creating a New UI Component

```bash
# 1. Copy template
cp components/_templates/ComponentTemplate.tsx components/ui/MyComponent.tsx

# 2. Edit file
# - Rename component
# - Define props interface
# - Implement logic
# - Add examples

# 3. Export from index (if needed)
echo "export { MyComponent } from './MyComponent'" >> components/ui/index.ts

# 4. Use in app
import { MyComponent } from '@/components/ui/MyComponent'
```

### File Naming Cheat Sheet

| Type | Location | Example |
|------|----------|---------|
| Layout | `layout/` | `Header.tsx` |
| Section | `sections/` | `TestimonialsCarousel.tsx` |
| UI | `ui/` | `Button.tsx` |
| Form | `forms/` | `ContactForm.tsx` |
| Domain | `[feature]/` | `careers/ApplicationForm.tsx` |

### Common Patterns

```typescript
// ✅ Client component (uses hooks, state)
'use client'
import { useState } from 'react'

// ✅ Server component (default)
import { getData } from '@/lib/data'

// ✅ Controlled input
<Input value={value} onChange={setValue} />

// ✅ Compound components
<Card>
  <Card.Header />
  <Card.Body />
</Card>

// ✅ Render props
<DataProvider>
  {(data) => <Display data={data} />}
</DataProvider>
```

---

## 📚 Additional Resources

- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

---

## 🆘 Need Help?

1. Check this README first
2. Look at existing similar components
3. Review the component template
4. Check the design system documentation

---

**Last Updated:** 2025-11-14
**Version:** 1.0.0
