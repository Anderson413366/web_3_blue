# ARIA Attributes Quick Reference

Comprehensive guide to using ARIA (Accessible Rich Internet Applications) attributes correctly.

## 🎯 General Principles

1. **First Rule of ARIA**: If you can use a native HTML element or attribute, do so
2. **Don't override native semantics** unless absolutely necessary
3. **All interactive elements must be keyboard accessible**
4. **Don't use `role="presentation"` or `aria-hidden="true"` on focusable elements**

## 📋 Common ARIA Attributes

### Labeling

**`aria-label`** - Provides accessible name for element

```tsx
// Icon-only button
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// Search form
<form role="search" aria-label="Site search">
  <input type="search" />
</form>
```

**`aria-labelledby`** - References another element for label

```tsx
<h2 id="dialog-title">Confirm Action</h2>
<div role="dialog" aria-labelledby="dialog-title">
  {/* dialog content */}
</div>
```

**`aria-describedby`** - Additional description

```tsx
<input
  id="password"
  aria-describedby="password-requirements"
/>
<div id="password-requirements">
  Must be at least 8 characters with one number
</div>
```

### States

**`aria-expanded`** - Collapsible content state

```tsx
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>
<div id="menu" hidden={!isOpen}>
  {/* menu items */}
</div>
```

**`aria-selected`** - Selected state in tabs/lists

```tsx
<div role="tablist">
  <button role="tab" aria-selected={activeTab === 'home'} aria-controls="home-panel">
    Home
  </button>
</div>
```

**`aria-checked`** - Checkbox/radio/switch state

```tsx
// Only use if not using native <input type="checkbox">
<div role="checkbox" aria-checked={isChecked} tabIndex={0} onClick={() => setIsChecked(!isChecked)}>
  {isChecked ? '☑' : '☐'} Accept terms
</div>
```

**`aria-pressed`** - Toggle button state

```tsx
<button aria-pressed={isBold} onClick={() => setIsBold(!isBold)}>
  Bold
</button>
```

**`aria-disabled`** - Disabled state (when can't use `disabled`)

```tsx
// Use native disabled when possible
<button disabled>Can't click</button>

// Only use aria-disabled if you need focusability
<button
  aria-disabled={true}
  onClick={(e) => {
    if (isDisabled) e.preventDefault()
  }}
>
  Submit
</button>
```

**`aria-current`** - Current item in navigation

```tsx
<nav>
  <a href="/home" aria-current={pathname === '/home' ? 'page' : undefined}>
    Home
  </a>
  <a href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>
    About
  </a>
</nav>
```

**`aria-invalid`** - Form validation error

```tsx
;<input
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{
  hasError && (
    <span id="email-error" role="alert">
      Please enter a valid email
    </span>
  )
}
```

### Properties

**`aria-required`** - Required field

```tsx
<input required aria-required="true" />
```

**`aria-readonly`** - Read-only field

```tsx
<input readOnly aria-readonly="true" value={email} />
```

**`aria-haspopup`** - Has popup menu/dialog

```tsx
<button aria-haspopup="menu" aria-expanded={isOpen}>
  Options
</button>
```

**`aria-controls`** - Controls another element

```tsx
<button
  aria-controls="content-panel"
  aria-expanded={isOpen}
>
  Toggle Content
</button>
<div id="content-panel">
  {/* content */}
</div>
```

**`aria-owns`** - Owns child elements

```tsx
<div role="listbox" aria-owns="option1 option2 option3">
  <div id="option1" role="option">
    Option 1
  </div>
  <div id="option2" role="option">
    Option 2
  </div>
  <div id="option3" role="option">
    Option 3
  </div>
</div>
```

### Live Regions

**`aria-live`** - Announces dynamic content changes

```tsx
// Polite: Waits for user to finish
<div aria-live="polite" role="status">
  {statusMessage}
</div>

// Assertive: Interrupts immediately
<div aria-live="assertive" role="alert">
  {errorMessage}
</div>
```

**`aria-atomic`** - Read entire region or just changes

```tsx
<div aria-live="polite" aria-atomic="true">
  {/* Entire content will be read on update */}
  Page {currentPage} of {totalPages}
</div>
```

**`aria-relevant`** - What changes trigger announcement

```tsx
<div aria-live="polite" aria-relevant="additions removals text">
  {/* Announces when content is added, removed, or text changes */}
</div>
```

### Visibility

**`aria-hidden`** - Hidden from accessibility tree

```tsx
// Decorative icon
<span aria-hidden="true">
  <DecorativeIcon />
</span>

// Hide from screen readers but show visually
<div aria-hidden="true">
  {/* Purely visual content */}
</div>

// ⚠️ Never use on focusable elements!
// ❌ BAD:
<button aria-hidden="true">Click me</button>
```

### Modal Dialogs

**`aria-modal`** - Indicates modal dialog

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Delete</h2>
  <p id="dialog-description">Are you sure you want to delete this item?</p>
  <button>Confirm</button>
  <button>Cancel</button>
</div>
```

## 🎭 Common Roles

### Landmark Roles

**Already in HTML5 elements** (prefer native):

- `<header>` = `role="banner"`
- `<nav>` = `role="navigation"`
- `<main>` = `role="main"`
- `<aside>` = `role="complementary"`
- `<footer>` = `role="contentinfo"`
- `<section>` = `role="region"` (with label)
- `<form>` = `role="form"` (with label)

```tsx
// DO: Use native HTML
<nav aria-label="Main navigation">
  {/* nav items */}
</nav>

// DON'T: Add redundant role
<nav role="navigation"> {/* Redundant! */}
  {/* nav items */}
</nav>
```

### Widget Roles

**`role="button"`** - Button (use `<button>` if possible)

```tsx
// DO: Use native button
<button onClick={handleClick}>Click me</button>

// ONLY IF NECESSARY:
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

**`role="tab"`** - Tab in tablist

```tsx
<div role="tablist" aria-label="Content sections">
  <button
    role="tab"
    aria-selected={activeTab === 0}
    aria-controls="panel-0"
    id="tab-0"
  >
    Tab 1
  </button>
  <button
    role="tab"
    aria-selected={activeTab === 1}
    aria-controls="panel-1"
    id="tab-1"
  >
    Tab 2
  </button>
</div>
<div
  role="tabpanel"
  id="panel-0"
  aria-labelledby="tab-0"
  hidden={activeTab !== 0}
>
  Panel 1 content
</div>
```

**`role="dialog"`** - Dialog/modal

```tsx
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog Title</h2>
  {/* dialog content */}
</div>
```

**`role="alert"`** - Important message

```tsx
// Automatically announces to screen readers
<div role="alert">
  Form submitted successfully!
</div>

// For errors
<div role="alert" aria-live="assertive">
  {errorMessage}
</div>
```

**`role="status"`** - Status message

```tsx
// Less intrusive than alert
<div role="status" aria-live="polite">
  Saving...
</div>
```

**`role="tooltip"`** - Tooltip

```tsx
;<button
  aria-describedby="tooltip"
  onMouseEnter={() => setShowTooltip(true)}
  onMouseLeave={() => setShowTooltip(false)}
>
  Help
</button>
{
  showTooltip && (
    <div role="tooltip" id="tooltip">
      Additional information
    </div>
  )
}
```

### List Roles

**`role="list"`** and **`role="listitem"`**

```tsx
// Only needed if you removed list styling
<ul className="list-none" role="list">
  <li role="listitem">Item 1</li>
  <li role="listitem">Item 2</li>
  <li role="listitem">Item 3</li>
</ul>
```

**`role="listbox"`** - Select dropdown alternative

```tsx
<div role="listbox" aria-label="Choose option">
  <div role="option" aria-selected={selected === 0}>
    Option 1
  </div>
  <div role="option" aria-selected={selected === 1}>
    Option 2
  </div>
</div>
```

## ⚠️ Common Mistakes

### ❌ DON'T: Override Native Semantics

```tsx
// BAD: Button with link role
<button role="link" onClick={navigate}>Go</button>

// GOOD: Use correct element
<a href="/page">Go</a>
```

### ❌ DON'T: Use ARIA When HTML Works

```tsx
// BAD: Div with button role
<div role="button" tabIndex={0}>Click</div>

// GOOD: Native button
<button>Click</button>
```

### ❌ DON'T: Hide Focusable Elements

```tsx
// BAD: Hidden but focusable
<button aria-hidden="true">Click me</button>

// GOOD: Hidden and not focusable
<div aria-hidden="true">
  <DecorativeIcon />
</div>
```

### ❌ DON'T: Duplicate Native Roles

```tsx
// BAD: Redundant role
<button role="button">Click</button>

// GOOD: Native semantics
<button>Click</button>
```

### ❌ DON'T: Forget Keyboard Support

```tsx
// BAD: Click only
<div role="button" onClick={handleClick}>Click</div>

// GOOD: Full keyboard support
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }}
>
  Click
</div>
```

## ✅ Best Practices

1. **Use semantic HTML first**
2. **Add ARIA when HTML isn't enough**
3. **Test with screen readers**
4. **Validate with axe DevTools**
5. **Keep it simple - less is more**
6. **Update ARIA attributes dynamically** (especially states)
7. **Provide multiple ways to identify content** (label + description)
8. **Test keyboard navigation thoroughly**

## 📚 Resources

- [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [MDN ARIA Reference](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)
- [Using ARIA](https://www.w3.org/TR/using-aria/)

---

**Remember**: ARIA doesn't make things accessible by itself. It must be combined with proper JavaScript behavior and keyboard support.
