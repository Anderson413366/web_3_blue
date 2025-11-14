# Testing Documentation

Comprehensive testing guide for the Anderson Cleaning website project.

## Table of Contents

- [Overview](#overview)
- [Test Types](#test-types)
- [Running Tests](#running-tests)
- [Writing Tests](#writing-tests)
- [Mocking Strategies](#mocking-strategies)
- [CI/CD Pipeline](#cicd-pipeline)
- [Debugging Tests](#debugging-tests)
- [Coverage Reports](#coverage-reports)
- [Best Practices](#best-practices)

## Overview

This project uses a comprehensive testing strategy covering:

- **Unit Tests**: Component and utility function testing with Jest
- **E2E Tests**: End-to-end testing with Playwright
- **Accessibility Tests**: WCAG 2.2 AA compliance testing
- **Performance Tests**: Lighthouse CI for Core Web Vitals
- **Visual Regression**: Screenshot comparison (optional)

### Test Stack

- **Jest**: Unit testing framework
- **React Testing Library**: React component testing
- **Playwright**: E2E browser testing
- **@axe-core/playwright**: Accessibility testing
- **Lighthouse CI**: Performance and SEO auditing

## Test Types

### 1. Unit Tests (`tests/unit/`)

Test individual components and utility functions in isolation.

**Location**: `tests/unit/`

**Files**:

- `components/ui/Button.test.tsx` - Button component tests
- `lib/security/sanitizer.test.ts` - Input sanitization tests
- More to be added as needed

**Run Command**:

```bash
npm run test:unit
```

**Coverage Command**:

```bash
npm run test:coverage
```

**Target Coverage**: 80% overall

- Branches: 70%
- Functions: 70%
- Lines: 80%
- Statements: 80%

### 2. E2E Tests (`tests/e2e/`)

Test complete user flows across multiple pages.

**Location**: `tests/e2e/`

**Files**:

- `home.spec.ts` - Homepage functionality
- `accessibility.spec.ts` - Accessibility compliance
- More to be added (quote form, careers i18n, etc.)

**Run Commands**:

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (interactive)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Run accessibility tests only
npm run test:a11y
```

### 3. Accessibility Tests

WCAG 2.2 Level AA compliance testing.

**Run Command**:

```bash
npm run test:a11y
```

**What it tests**:

- No automatically detectable violations
- Keyboard navigation
- Focus indicators
- Screen reader support
- Color contrast
- Heading hierarchy
- Touch target sizes
- Reduced motion support

### 4. Performance Tests

Lighthouse CI for performance auditing.

**Run Command**:

```bash
npm run lighthouse
```

**Performance Budgets**:

- Performance: ≥90
- Accessibility: ≥95
- Best Practices: ≥90
- SEO: ≥95
- LCP: ≤2500ms
- CLS: ≤0.1
- FCP: ≤2000ms

### 5. Integration Tests

All tests combined.

**Run Command**:

```bash
npm run test:all
```

This runs:

1. ESLint
2. TypeScript type check
3. Unit tests
4. E2E tests

## Running Tests

### Locally

**Watch mode (unit tests)**:

```bash
npm test
```

**Single run (unit tests)**:

```bash
npm run test:unit
```

**E2E tests**:

```bash
npm run test:e2e
```

**All tests**:

```bash
npm run test:all
```

### In CI/CD

Tests run automatically on:

- Every pull request
- Every push to `main` or `develop`

See `.github/workflows/ci.yml` for CI configuration.

## Writing Tests

### Unit Tests

Use Jest and React Testing Library for unit tests.

**Example - Component Test**:

```typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

**Example - Utility Test**:

```typescript
import { stripHtml } from '@/lib/security/sanitizer'

describe('stripHtml', () => {
  it('removes HTML tags', () => {
    const input = '<script>alert("xss")</script>Hello'
    const result = stripHtml(input)
    expect(result).toBe('alert("xss")Hello')
    expect(result).not.toContain('<script>')
  })
})
```

### E2E Tests

Use Playwright for E2E tests.

**Example**:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Quote Form', () => {
  test('submits successfully with valid data', async ({ page }) => {
    await page.goto('/quote')

    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="phone"]', '555-123-4567')

    await page.click('button[type="submit"]')

    await expect(page.locator('text=Thank you')).toBeVisible()
  })
})
```

### Accessibility Tests

Use @axe-core/playwright for accessibility testing.

**Example**:

```typescript
import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/')

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()

  expect(results.violations).toEqual([])
})
```

## Mocking Strategies

### Mock Next.js Router

Already configured in `jest.setup.js`:

```typescript
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
  },
}))
```

### Mock API Calls

**Using jest.fn()**:

```typescript
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock
```

**Using MSW (Mock Service Worker)** (recommended for complex APIs):

```bash
npm install --save-dev msw
```

```typescript
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
  rest.post('/api/quote', (req, res, ctx) => {
    return res(ctx.json({ success: true }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

### Mock Environment Variables

In `jest.setup.js`:

```typescript
process.env.NEXT_PUBLIC_SITE_URL = 'https://andersoncleaning.com'
```

### Mock External Libraries

**framer-motion**:

```typescript
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children }: any) => <div>{children}</div>,
  },
}))
```

## CI/CD Pipeline

### GitHub Actions Workflow

Located at `.github/workflows/ci.yml`

**Jobs**:

1. **Lint and Type Check**: ESLint + TypeScript
2. **Unit Tests**: Jest with coverage
3. **E2E Tests**: Playwright tests
4. **Accessibility Audit**: axe-core tests
5. **Lighthouse CI**: Performance testing
6. **Build**: Production build verification
7. **Security Scan**: npm audit + dependency check

**Triggers**:

- Pull requests to `main` or `develop`
- Pushes to `main` or `develop`

**Artifacts**:

- Playwright test reports
- Lighthouse results
- Coverage reports

### Pre-commit Hooks

Husky runs on `git commit`:

1. ESLint (with auto-fix)
2. Prettier (auto-format)
3. TypeScript type check

**Configuration**: `.husky/pre-commit`

**Staged files only**: `.lintstagedrc.js`

## Debugging Tests

### Debug Unit Tests

**Run single test file**:

```bash
npm test -- Button.test.tsx
```

**Run tests matching pattern**:

```bash
npm test -- --testNamePattern="renders with correct text"
```

**Debug in VS Code**:
Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal"
}
```

### Debug E2E Tests

**Run with UI mode** (recommended):

```bash
npm run test:e2e:ui
```

**Run in headed mode** (see browser):

```bash
npm run test:e2e:headed
```

**Debug specific test**:

```bash
npx playwright test home.spec.ts --debug
```

**Playwright Inspector**:

- Pause test with `await page.pause()`
- Step through code
- Inspect selectors
- Record actions

### Debug Accessibility Tests

Run accessibility tests with Playwright UI:

```bash
npx playwright test accessibility.spec.ts --ui
```

View violations in the test report:

```bash
npx playwright show-report
```

## Coverage Reports

### Generate Coverage Report

```bash
npm run test:coverage
```

### View Coverage Report

**Terminal Summary**:
Shows after running `npm run test:coverage`

**HTML Report**:

```bash
open coverage/lcov-report/index.html
```

### Coverage in CI

- Coverage reports uploaded to Codecov
- PR comments show coverage changes
- Failing coverage thresholds fail the build

### Coverage Configuration

In `jest.config.js`:

```javascript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 80,
    statements: 80,
  },
}
```

## Best Practices

### General

1. **Test behavior, not implementation**
   - Test what the user sees and does
   - Avoid testing internal state

2. **Keep tests isolated**
   - Each test should be independent
   - Use `beforeEach` for setup, `afterEach` for cleanup

3. **Use descriptive test names**
   - `it('should do X when Y happens')`
   - Readable as documentation

4. **Test edge cases**
   - Empty inputs
   - Null/undefined values
   - Maximum values
   - Error states

5. **Don't test third-party libraries**
   - Assume they work correctly
   - Test your integration with them

### Unit Tests

1. **Test one thing per test**
2. **Mock external dependencies**
3. **Use data-testid sparingly** (prefer semantic queries)
4. **Test accessibility** (roles, labels, etc.)

### E2E Tests

1. **Test critical user flows**
2. **Keep tests stable** (avoid flakiness)
3. **Use page objects** for complex pages
4. **Test on multiple browsers** (Chrome, Firefox, Safari)
5. **Test on mobile viewports**

### Accessibility Tests

1. **Run axe on all pages**
2. **Test keyboard navigation**
3. **Test with screen readers** (manual)
4. **Test color contrast**
5. **Test focus management**

## Troubleshooting

### Common Issues

**Issue**: Tests fail with "Cannot find module '@/components/...'"
**Solution**: Check `moduleNameMapper` in `jest.config.js`

**Issue**: E2E tests timeout
**Solution**: Increase timeout in `playwright.config.ts`

**Issue**: Flaky E2E tests
**Solution**:

- Use `waitForLoadState('networkidle')`
- Avoid fixed `setTimeout`, use `waitFor` instead
- Check for race conditions

**Issue**: Coverage below threshold
**Solution**: Add more tests or adjust thresholds in `jest.config.js`

**Issue**: Husky hooks not running
**Solution**:

```bash
npx husky install
chmod +x .husky/pre-commit
```

## Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [axe-core Playwright](https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)

## Contributing

When adding new features:

1. **Write tests first** (TDD recommended)
2. **Ensure all tests pass** before committing
3. **Maintain coverage thresholds**
4. **Update this documentation** if needed

## Contact

For questions about testing:

- Review existing test files
- Check this documentation
- Ask in team chat or code review

---

**Last Updated**: 2024
**Maintainer**: Development Team
