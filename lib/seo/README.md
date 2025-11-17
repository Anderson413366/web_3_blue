# SEO Implementation Guide

This directory contains comprehensive SEO configuration for the Anderson Cleaning website.

## Overview

The SEO implementation includes:

- **Default SEO Configuration** (next-seo.config.ts)
- **JSON-LD Structured Data** (jsonld.ts)
- **Sitemap Generation** (next-sitemap.config.js)
- **Dynamic OG Images** (/api/og)

## Files

### next-seo.config.ts

Default SEO settings for the entire site, including:

- Title templates
- Meta descriptions
- Open Graph tags
- Twitter Card configuration
- Additional meta tags
- Page-specific SEO configs

### jsonld.ts

Structured data generators for:

- Organization schema
- LocalBusiness schema
- Service schema
- Review schema
- FAQPage schema
- Breadcrumb schema
- AggregateRating schema

## Usage

### Using Default SEO

The root layout already includes default SEO settings. Individual pages can override these:

```typescript
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Office Cleaning Services',
  description: 'Professional office cleaning for businesses in Western MA',
  openGraph: {
    images: ['/images/office-cleaning-og.jpg'],
  },
}
```

### Adding JSON-LD Structured Data

Import and use the schema generators:

```typescript
import { generateServiceSchema } from '@/lib/seo/jsonld'

export default function ServicePage() {
  const serviceSchema = generateServiceSchema({
    name: 'Office Cleaning Services',
    description: 'Professional office cleaning...',
    serviceType: 'Commercial Cleaning',
    url: 'https://andersoncleaning.com/services/office-cleaning',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {/* Your page content */}
    </>
  )
}
```

### Using Dynamic OG Images

Generate custom Open Graph images for any page:

```typescript
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/api/og?title=Office%20Cleaning&description=Professional%20cleaning',
        width: 1200,
        height: 630,
      },
    ],
  },
}
```

Parameters:

- `title` - Page title (required)
- `description` - Page description (optional)
- `type` - Image type: default, service, industry, blog (optional)

### Page-Specific SEO Examples

#### Service Page

```typescript
import { Metadata } from 'next'
import { generateServiceSchema } from '@/lib/seo/jsonld'

export const metadata: Metadata = {
  title: 'Office Cleaning Services',
  description: 'Professional office cleaning for businesses...',
  alternates: {
    canonical: 'https://andersoncleaning.com/services/office-cleaning',
  },
}

export default function OfficeCleaning() {
  const schema = generateServiceSchema({
    name: 'Office Cleaning Services',
    description: 'Professional office cleaning...',
    serviceType: 'Commercial Cleaning',
    url: 'https://andersoncleaning.com/services/office-cleaning',
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Page content */}
    </>
  )
}
```

#### Testimonials Page with Reviews

```typescript
import { generateAggregateRatingSchema, generateReviewSchema } from '@/lib/seo/jsonld'

export default function TestimonialsPage() {
  const ratingSchema = generateAggregateRatingSchema({
    ratingValue: 4.8,
    reviewCount: 150,
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
      />
      {/* Testimonials */}
    </>
  )
}
```

#### FAQ Page

```typescript
import { generateFAQPageSchema, FAQItem } from '@/lib/seo/jsonld'

const faqs: FAQItem[] = [
  {
    question: 'What areas do you serve?',
    answer: 'We serve businesses within 100 miles of West Springfield, MA...',
  },
  {
    question: 'Do you clean restaurants?',
    answer: 'No, we do not service restaurants or food service establishments...',
  },
]

export default function FAQPage() {
  const faqSchema = generateFAQPageSchema(faqs)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* FAQ content */}
    </>
  )
}
```

## Sitemap

The sitemap is automatically generated after each build via the `postbuild` script.

Configuration: `next-sitemap.config.js`

Generated files:

- `/public/sitemap.xml` - Main sitemap
- `/public/robots.txt` - Robots file

### Priority Structure

- Homepage: 1.0
- Services & Quote: 0.9
- About & Contact: 0.8
- Industries: 0.8
- Blog Posts: 0.7
- Testimonials: 0.7

### Excluded Paths

- `/studio` - Sanity CMS
- `/api/*` - API routes
- `/apply/success` - Success pages
- `/_next/*` - Next.js internals

## Testing SEO

### 1. Google Rich Results Test

Test structured data:
https://search.google.com/test/rich-results

### 2. Schema.org Validator

Validate JSON-LD:
https://validator.schema.org/

### 3. Facebook Sharing Debugger

Test Open Graph tags:
https://developers.facebook.com/tools/debug/

### 4. Twitter Card Validator

Test Twitter Cards:
https://cards-dev.twitter.com/validator

### 5. Lighthouse SEO Audit

Run in Chrome DevTools:

- Open DevTools (F12)
- Go to Lighthouse tab
- Select "SEO" category
- Run audit

## Best Practices

1. **Unique Titles & Descriptions**
   - Every page should have unique metadata
   - Keep titles under 60 characters
   - Keep descriptions under 160 characters

2. **Canonical URLs**
   - Always set canonical URLs
   - Use absolute URLs, not relative

3. **Structured Data**
   - Add relevant JSON-LD to every page
   - Test with Google Rich Results Test
   - Validate with Schema.org validator

4. **OG Images**
   - Use 1200x630px images
   - Include descriptive alt text
   - Optimize file size

5. **Mobile Optimization**
   - Ensure viewport meta tag is set
   - Test mobile-friendliness
   - Optimize Core Web Vitals

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://andersoncleaning.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-verification-code
```

## Troubleshooting

### Sitemap not generating

- Check `postbuild` script in package.json
- Verify next-sitemap.config.js exists
- Run `npm run postbuild` manually

### OG images not loading

- Check `/api/og` route is accessible
- Verify @vercel/og is installed
- Check browser console for errors

### Structured data not validating

- Use Google Rich Results Test
- Check JSON-LD syntax
- Verify required fields are present

## Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Google Search Central](https://developers.google.com/search)
