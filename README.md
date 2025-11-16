# Anderson Cleaning - Production Website

This repository contains the **Anderson Cleaning** Next.js application that powers the live Vercel deployment at [andersoncleaning.com](https://andersoncleaning.com).

## Repository Structure

The production website lives in the `anderson-cleaning/` directory:

```
web_3_blue/
├── anderson-cleaning/          # Production Next.js application
│   ├── app/                   # Next.js App Router pages
│   ├── components/            # React components
│   ├── lib/                   # Utilities and configurations
│   ├── public/                # Static assets
│   ├── scripts/               # Build and validation scripts
│   ├── tests/                 # E2E and integration tests
│   ├── package.json           # Dependencies and scripts
│   ├── DEPLOYMENT.md          # Deployment checklist
│   ├── README.md              # Application documentation
│   └── ...                    # Configuration files
├── .github/                   # CI/CD workflows
├── .husky/                    # Git hooks for quality gates
└── README.md                  # This file
```

## Getting Started

1. **Navigate to the application directory:**
   ```bash
   cd anderson-cleaning
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser.

## Deployment

The application is deployed on **Vercel**. See `anderson-cleaning/DEPLOYMENT.md` for the complete deployment checklist including:
- Environment variable setup
- Sanity CMS dataset configuration
- Analytics and monitoring (GA4, Clarity, Sentry)
- Integration with HubSpot, Resend, and other services

## Key Features

- **Next.js 14** with App Router
- **Sanity CMS** for content management
- **Multi-language support** (EN/ES/PT) via next-intl
- **E2E testing** with Playwright
- **Performance monitoring** with Lighthouse CI
- **Security** with CSP, Sentry error tracking
- **Pre-commit quality gates** (lint, type-check, format)

## Documentation

All documentation lives in `anderson-cleaning/`:
- `README.md` - Application overview and site map
- `DEPLOYMENT.md` - Deployment guide
- `TESTING.md` - Testing strategy
- `ANALYTICS.md` - Analytics setup
- `QA_REPORT.md` - Quality assurance report
- `docs/` - Additional guides (architecture, CMS, design system, etc.)

## Support

For issues or questions, please refer to the documentation in the `anderson-cleaning/` directory.
