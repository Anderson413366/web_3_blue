# Contributing Guide

Welcome to the Anderson Cleaning website development team! This guide will help you contribute effectively to the project.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Style & Conventions](#code-style--conventions)
4. [Git Workflow](#git-workflow)
5. [Testing Requirements](#testing-requirements)
6. [Documentation Standards](#documentation-standards)
7. [Pull Request Process](#pull-request-process)
8. [Code Review Guidelines](#code-review-guidelines)
9. [Deployment Process](#deployment-process)
10. [Getting Help](#getting-help)

---

## Getting Started

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- **npm** or **yarn** package manager
- **Git** for version control
- **Code editor** (VS Code recommended)
- **GitHub account** with repository access

### Initial Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anderson-cleaning/website.git
   cd website/anderson-cleaning
   ```

2. **Install dependencies**:

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Copy environment variables**:

   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment**:
   - Update `.env.local` with your credentials
   - Ask team lead for Sanity project ID
   - Request API keys for third-party services

5. **Start development server**:

   ```bash
   npm run dev
   ```

6. **Verify setup**:
   - Open http://localhost:3000
   - Check that pages load correctly
   - Test Sanity Studio at http://localhost:3000/studio

### Recommended VS Code Extensions

Install these extensions for the best development experience:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "bradlc.vscode-tailwindcss",
    "ms-playwright.playwright",
    "orta.vscode-jest",
    "sanity-io.vscode-sanity"
  ]
}
```

**Save this as**: `.vscode/extensions.json`

### VS Code Settings

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [["cn\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]]
}
```

**Save this as**: `.vscode/settings.json`

---

## Development Workflow

### Daily Workflow

1. **Pull latest changes**:

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Create feature branch**:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes**:
   - Write code
   - Test locally
   - Run linter

4. **Commit changes**:

   ```bash
   git add .
   git commit -m "feat: add new feature"
   ```

5. **Push to GitHub**:

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create pull request**:
   - Open GitHub
   - Click "New Pull Request"
   - Fill out PR template
   - Request review

### Branch Naming Convention

Use descriptive branch names with prefixes:

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Test additions/changes
- `chore/` - Maintenance tasks

**Examples**:

```
feature/add-contact-form
fix/testimonials-layout-bug
docs/update-readme
refactor/optimize-images
test/add-e2e-tests
chore/update-dependencies
```

### Environment Management

**Development**:

- Use `.env.local` for local development
- Never commit `.env.local` to git
- Use test API keys, not production

**Staging**:

- Uses `.env.staging` (if applicable)
- Preview deployments on Vercel
- Connected to production Sanity dataset

**Production**:

- Uses `.env.production`
- Environment variables set in Vercel dashboard
- Production API keys and services

---

## Code Style & Conventions

### TypeScript

**Always use TypeScript**:

```typescript
// ✅ Good
interface ServiceProps {
  title: string
  description: string
  image?: string
}

export function ServiceCard({ title, description, image }: ServiceProps) {
  // ...
}

// ❌ Bad
export function ServiceCard({ title, description, image }) {
  // No type annotations
}
```

**Avoid `any` type**:

```typescript
// ✅ Good
function processData(data: ServiceData[]): ProcessedData {
  // ...
}

// ❌ Bad
function processData(data: any): any {
  // ...
}
```

**Use type inference when obvious**:

```typescript
// ✅ Good
const count = 5 // TypeScript infers number
const services = await fetchServices() // Inferred from function return type

// ❌ Unnecessary
const count: number = 5
```

### React Components

**Use functional components**:

```typescript
// ✅ Good
export function Button({ children, onClick }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>
}

// ❌ Bad (class components)
export class Button extends React.Component {
  // ...
}
```

**Use named exports for components**:

```typescript
// ✅ Good
export function ServiceCard() {}
export function TestimonialCard() {}

// ❌ Bad
export default ServiceCard
```

**Component file structure**:

```typescript
// 1. Imports
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

// 2. Types/Interfaces
interface ServiceCardProps {
  title: string
  description: string
}

// 3. Component
export function ServiceCard({ title, description }: ServiceCardProps) {
  // 3a. Hooks
  const [isExpanded, setIsExpanded] = useState(false)

  // 3b. Event handlers
  const handleToggle = () => setIsExpanded(!isExpanded)

  // 3c. Render
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button onClick={handleToggle}>Read More</Button>
    </div>
  )
}

// 4. Helper functions (if any)
function formatDescription(desc: string) {
  return desc.slice(0, 100) + '...'
}
```

### Naming Conventions

**Files and folders**:

- Components: `PascalCase.tsx` (e.g., `ServiceCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Hooks: `useCamelCase.ts` (e.g., `useServiceData.ts`)
- Types: `camelCase.types.ts` (e.g., `service.types.ts`)

**Variables and functions**:

```typescript
// Variables: camelCase
const serviceList = []
const isLoading = false

// Functions: camelCase, verb prefix
function fetchServices() {}
function handleClick() {}
function validateEmail() {}

// Components: PascalCase
function ServiceCard() {}

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.example.com'
const MAX_ITEMS = 10
```

**Boolean naming**:

```typescript
// ✅ Good (descriptive, verb prefix)
const isLoading = true
const hasError = false
const canEdit = true
const shouldUpdate = false

// ❌ Bad
const loading = true
const error = false
```

### Tailwind CSS

**Use utility classes**:

```typescript
// ✅ Good
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ Bad (custom CSS)
<div className="custom-card-container">
```

**Use `cn()` helper for conditional classes**:

```typescript
import { cn } from '@/lib/utils'

<button
  className={cn(
    'px-4 py-2 rounded-md font-medium',
    isActive && 'bg-blue-600 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
```

**Responsive design**:

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

**Avoid inline styles**:

```typescript
// ✅ Good
<div className="w-full h-64" />

// ❌ Bad
<div style={{ width: '100%', height: '256px' }} />
```

### Accessibility

**Always include ARIA attributes**:

```typescript
<button
  onClick={handleClick}
  aria-label="Close modal"
  aria-pressed={isPressed}
>
  <XIcon aria-hidden="true" />
</button>
```

**Semantic HTML**:

```typescript
// ✅ Good
<nav>
  <ul>
    <li><a href="/services">Services</a></li>
  </ul>
</nav>

// ❌ Bad
<div>
  <div>
    <div><a href="/services">Services</a></div>
  </div>
</div>
```

**Alt text for images**:

```typescript
// ✅ Good
<Image
  src="/hero.jpg"
  alt="Office cleaning team at work in conference room"
  width={800}
  height={600}
/>

// ❌ Bad
<Image src="/hero.jpg" alt="image" width={800} height={600} />
```

### Comments

**Use JSDoc for functions**:

```typescript
/**
 * Fetches service data from Sanity CMS
 *
 * @param slug - Service slug identifier
 * @returns Service data or null if not found
 * @throws {Error} If API request fails
 */
export async function fetchService(slug: string): Promise<Service | null> {
  // Implementation
}
```

**Inline comments for complex logic**:

```typescript
// Calculate revalidation time based on content freshness
// Recent content: 60s, older content: 3600s
const revalidate = isRecent ? 60 : 3600
```

**Avoid obvious comments**:

```typescript
// ❌ Bad
// Set count to 0
const count = 0

// ✅ Good (comment explains WHY, not WHAT)
// Initialize count to 0 for first-time users without saved preferences
const count = 0
```

---

## Git Workflow

### Commit Messages

Follow **Conventional Commits** format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types**:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks
- `perf`: Performance improvement

**Examples**:

```bash
feat(services): add office cleaning page

fix(testimonials): correct star rating display

docs(readme): update installation instructions

refactor(api): optimize Sanity queries for performance

test(contact-form): add validation test cases

chore(deps): update Next.js to 14.2.0
```

**Best practices**:

- Use imperative mood ("add" not "added")
- Keep subject line under 72 characters
- Capitalize subject line
- No period at end of subject
- Separate subject from body with blank line
- Use body to explain _what_ and _why_, not _how_

### Branching Strategy

We use **GitHub Flow** (simplified Git Flow):

```
main (production)
  └── feature/add-contact-form
  └── fix/testimonials-bug
  └── docs/update-readme
```

**Rules**:

1. `main` branch is always deployable
2. Create descriptive feature branches
3. Commit early and often
4. Open PR when ready for review
5. Merge only after approval and passing tests
6. Delete branch after merge

### Pull Request Workflow

1. **Create PR**:

   ```bash
   git push origin feature/your-feature
   # Then open PR on GitHub
   ```

2. **Fill out PR template**:
   - Title: Clear, descriptive
   - Description: What, why, how
   - Screenshots: For UI changes
   - Testing: How you tested
   - Related issues: Link to issue #

3. **Request reviewers**:
   - Tag 1-2 team members
   - Assign yourself
   - Add labels (feature, bug, docs, etc.)

4. **Address feedback**:
   - Make requested changes
   - Push additional commits
   - Reply to comments
   - Re-request review

5. **Merge**:
   - Squash and merge (preferred)
   - Delete branch after merge

### PR Template

Create `.github/PULL_REQUEST_TEMPLATE.md`:

```markdown
## Description

Brief description of changes

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] E2E tests pass
- [ ] Lighthouse scores maintained
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Mobile responsive

## Screenshots

(if applicable)

## Checklist

- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Accessibility tested

## Related Issues

Closes #123
```

---

## Testing Requirements

### Before Committing

Run these commands before every commit:

```bash
# Lint code
npm run lint

# Type check
npx tsc --noEmit

# Run unit tests
npm run test:unit

# Run E2E tests (optional, but recommended)
npm run test:e2e
```

**Pre-commit hook automatically runs**:

- ESLint
- Prettier
- TypeScript type check

### Writing Tests

#### Unit Tests

**Location**: `tests/unit/`

**Example**:

```typescript
// tests/unit/components/ServiceCard.test.tsx
import { render, screen } from '@testing-library/react'
import { ServiceCard } from '@/components/ServiceCard'

describe('ServiceCard', () => {
  it('renders service title', () => {
    render(<ServiceCard title="Office Cleaning" description="..." />)
    expect(screen.getByText('Office Cleaning')).toBeInTheDocument()
  })

  it('handles click event', () => {
    const handleClick = jest.fn()
    render(<ServiceCard title="..." onClick={handleClick} />)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

#### E2E Tests

**Location**: `tests/e2e/`

**Example**:

```typescript
// tests/e2e/contact-form.spec.ts
import { test, expect } from '@playwright/test'

test('submits contact form successfully', async ({ page }) => {
  await page.goto('/contact')

  await page.fill('[name="name"]', 'John Doe')
  await page.fill('[name="email"]', 'john@example.com')
  await page.fill('[name="message"]', 'Test message')

  await page.click('button[type="submit"]')

  await expect(page.locator('.success-message')).toBeVisible()
})
```

#### Accessibility Tests

**Run automatically**:

```bash
npm run test:a11y
```

**Manual testing**:

- Tab through all interactive elements
- Test with screen reader (NVDA, VoiceOver)
- Check color contrast
- Verify ARIA attributes

### Coverage Requirements

**Minimum thresholds**:

- Branches: 70%
- Functions: 70%
- Lines: 80%
- Statements: 80%

**Check coverage**:

```bash
npm run test:coverage
```

**Coverage report**: `coverage/lcov-report/index.html`

---

## Documentation Standards

### Code Documentation

**Document public APIs**:

````typescript
/**
 * Validates email address format
 *
 * @param email - Email address to validate
 * @returns True if valid, false otherwise
 *
 * @example
 * ```ts
 * validateEmail('user@example.com') // true
 * validateEmail('invalid') // false
 * ```
 */
export function validateEmail(email: string): boolean {
  // Implementation
}
````

**Document complex logic**:

```typescript
// Calculate ISR revalidation time using exponential backoff
// based on content age to balance freshness and performance
const revalidate = Math.min(
  60 * Math.pow(2, daysSincePublished),
  86400 // Max 24 hours
)
```

### README Updates

When adding a major feature:

1. Update main README.md
2. Add entry to Features section
3. Update table of contents
4. Add configuration instructions

### Creating Documentation

**New feature documentation checklist**:

- [ ] Add to README.md Features section
- [ ] Create dedicated doc in `docs/` if complex
- [ ] Add JSDoc comments to public functions
- [ ] Update relevant guides (deployment, CMS, etc.)
- [ ] Add code examples
- [ ] Include troubleshooting section

---

## Pull Request Process

### Creating a PR

1. **Ensure your branch is up to date**:

   ```bash
   git checkout main
   git pull origin main
   git checkout feature/your-feature
   git merge main
   ```

2. **Run all checks**:

   ```bash
   npm run test:all
   npm run build
   ```

3. **Push to GitHub**:

   ```bash
   git push origin feature/your-feature
   ```

4. **Open PR**:
   - Go to GitHub repository
   - Click "New Pull Request"
   - Select your branch
   - Fill out template

### PR Checklist

Before requesting review:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No console errors or warnings
- [ ] Lighthouse scores maintained (≥90)
- [ ] Responsive on mobile, tablet, desktop
- [ ] Accessibility tested (keyboard, screen reader)
- [ ] Images optimized
- [ ] No hardcoded values (use env variables)
- [ ] Documentation updated
- [ ] Self-reviewed code

### Review Process

**As Author**:

1. Address all feedback
2. Reply to each comment
3. Push additional commits
4. Re-request review
5. Don't merge your own PRs

**As Reviewer**:

1. Review within 24 hours
2. Test locally if UI changes
3. Check for security issues
4. Verify tests are adequate
5. Approve or request changes
6. Be constructive and kind

### Merging

**Merge requirements**:

- ✅ At least 1 approval
- ✅ All CI checks pass
- ✅ No merge conflicts
- ✅ Branch up to date with main

**Merge method**: Squash and merge

**After merge**:

- Delete feature branch
- Close related issues
- Monitor deployment

---

## Code Review Guidelines

### What to Look For

**Correctness**:

- Does the code do what it's supposed to?
- Are edge cases handled?
- Are there any bugs?

**Security**:

- Input validation present?
- No XSS vulnerabilities?
- No sensitive data exposed?
- Environment variables used correctly?

**Performance**:

- Unnecessary re-renders avoided?
- Images optimized?
- Queries efficient?
- Bundle size impact minimal?

**Accessibility**:

- Semantic HTML used?
- ARIA attributes present?
- Keyboard navigation works?
- Alt text on images?

**Testing**:

- Are there tests?
- Do tests cover edge cases?
- Are tests meaningful?

**Documentation**:

- Is complex code commented?
- Is public API documented?
- Is README updated?

### Providing Feedback

**Be specific**:

```
❌ "This could be better"
✅ "Consider using useMemo here to avoid recalculating on every render"
```

**Be kind**:

```
❌ "This code is terrible"
✅ "This works, but we could make it more maintainable by extracting this logic into a separate function"
```

**Suggest solutions**:

```
✅ "This query could be optimized by adding a projection:
*[_type == 'service'] { _id, title, slug }
instead of fetching all fields"
```

**Ask questions**:

```
✅ "What happens if the image is null here? Should we add a fallback?"
```

### Review Comments Format

Use GitHub's suggestion feature:

````typescript
// Reviewers can suggest code changes directly:
```suggestion
const isValid = validateEmail(email) && validatePhone(phone)
\`\`\`
````

### Approval Criteria

**Approve** if:

- Code works as intended
- Tests are adequate
- No major issues
- Minor issues noted as non-blocking

**Request changes** if:

- Code doesn't work
- Security vulnerabilities
- Major performance issues
- Tests missing or inadequate

**Comment** if:

- Just asking questions
- Suggesting improvements
- Not ready to approve/reject

---

## Deployment Process

### Development

**Auto-deploys**:

- Every push to any branch
- Preview URL provided in PR

**Test deployment**:

1. Push branch
2. Wait for Vercel deploy
3. Check preview URL
4. Verify changes

### Staging (if applicable)

**Manual deploy**:

```bash
npm run build
vercel --prod
```

### Production

**Deploy process**:

1. Merge PR to `main`
2. Automatic deployment to production
3. Monitor Sentry for errors
4. Check Vercel deployment logs
5. Verify on production URL

**Post-deployment checklist**:

- [ ] Homepage loads
- [ ] No console errors
- [ ] Forms work
- [ ] Sanity content displays
- [ ] Images load
- [ ] No broken links
- [ ] Mobile responsive

**Rollback procedure**:

1. Go to Vercel dashboard
2. Find previous deployment
3. Click "Promote to Production"
4. Verify rollback successful

---

## Getting Help

### Resources

**Documentation**:

- [README.md](../README.md) - Project overview
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Deployment instructions
- [CMS_GUIDE.md](./CMS_GUIDE.md) - Sanity CMS usage

**External Docs**:

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Sanity Docs](https://www.sanity.io/docs)

### Communication

**Slack channels** (if applicable):

- `#dev-general` - General development discussion
- `#dev-help` - Ask for help
- `#deployments` - Deployment notifications
- `#bugs` - Bug reports

**Email**:

- Technical lead: dev@andersoncleaning.com
- DevOps: devops@andersoncleaning.com

### Debugging

**Common issues**:

1. **Build fails**:

   ```bash
   # Clear cache and reinstall
   rm -rf node_modules .next
   npm install --legacy-peer-deps
   npm run build
   ```

2. **Tests fail**:

   ```bash
   # Update snapshots
   npm run test:unit -- -u

   # Clear Playwright cache
   npx playwright install
   ```

3. **Sanity Studio won't load**:

   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_SANITY_PROJECT_ID

   # Clear cache
   rm -rf node_modules/.sanity
   ```

4. **Type errors**:
   ```bash
   # Regenerate types
   npm run sanity:typegen
   ```

---

## Best Practices Checklist

Before submitting a PR, ensure:

### Code Quality

- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint errors (`npm run lint`)
- [ ] Formatted with Prettier (`npm run format`)
- [ ] No console.log statements (use proper logging)
- [ ] No commented-out code
- [ ] No hardcoded values

### Testing

- [ ] Unit tests added for new functions
- [ ] E2E tests added for new pages/features
- [ ] All tests pass (`npm run test:all`)
- [ ] Coverage thresholds met
- [ ] Manual testing completed

### Performance

- [ ] Images optimized (WebP, compressed)
- [ ] No unnecessary re-renders
- [ ] Code splitting used for large components
- [ ] Lighthouse score ≥90
- [ ] Bundle size impact minimal

### Accessibility

- [ ] Semantic HTML used
- [ ] ARIA attributes added
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA
- [ ] Alt text on images
- [ ] Focus indicators visible

### Security

- [ ] Input validation implemented
- [ ] XSS prevention in place
- [ ] No sensitive data exposed
- [ ] HTTPS enforced
- [ ] CSP compliant

### Documentation

- [ ] JSDoc comments added
- [ ] README updated (if needed)
- [ ] Code comments for complex logic
- [ ] Examples provided

---

## Version Control Etiquette

### Do's

✅ Commit early and often
✅ Write descriptive commit messages
✅ Keep commits focused (one logical change)
✅ Pull before push
✅ Review your own PR first
✅ Delete merged branches

### Don'ts

❌ Commit directly to main
❌ Force push to shared branches
❌ Commit secrets or API keys
❌ Push broken code
❌ Ignore merge conflicts
❌ Leave branches unmerged for weeks

---

## Questions?

If you have questions not covered in this guide:

1. Check existing documentation
2. Search GitHub issues
3. Ask in Slack
4. Email the team lead

**Happy coding! 🚀**

---

**Document Version**: 1.0
**Last Updated**: November 2024
**Maintained By**: Development Team
