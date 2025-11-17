# Sanity CMS Setup

This directory contains the Sanity CMS configuration for the Anderson Cleaning website.

## Directory Structure

```
lib/cms/
├── README.md                 # This file
├── sanity.client.ts         # Sanity client configuration
├── queries.ts               # GROQ queries for fetching data
└── schemas/                 # Content type schemas
    ├── index.ts            # Schema exports
    ├── settings.ts         # Site settings
    ├── navigation.ts       # Navigation configuration
    ├── service.ts          # Service pages
    ├── industry.ts         # Industry pages
    ├── testimonial.ts      # Customer testimonials
    ├── beforeAfter.ts      # Before/after examples
    ├── badge.ts            # Badges & certifications
    ├── page.ts             # Flexible pages
    └── post.ts             # Blog posts
```

## Getting Started

### 1. Create a Sanity Project

If you haven't already, create a Sanity project:

```bash
npx sanity init --project-type=clean
```

Follow the prompts and note your Project ID.

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local` and fill in your Sanity credentials:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_READ_TOKEN=your-read-token
SANITY_PREVIEW_SECRET=your-secret-preview-token
```

### 3. Access Sanity Studio

The Sanity Studio is available at:

```
http://localhost:3000/studio
```

**Important:** In production, protect this route with authentication.

### 4. Deploy Sanity Studio

You can either:

1. **Embed in Next.js** (current setup): Studio accessible at `/studio`
2. **Deploy separately**: Use `sanity deploy` to host on Sanity's infrastructure

## Content Types

### Settings

Singleton document for site-wide configuration:

- Site name
- Company info (address, phone, email, hours)
- Social media links
- Google rating
- Site notices

### Navigation

Singleton document for navigation configuration:

- Header links
- Footer links (grouped by column)
- CTA button

### Services

Individual service pages:

- Title, slug, summary
- Contracted-only flag
- Includes list
- Process steps
- Rich text body
- SEO fields

### Industries

Industry-specific pages:

- Title, slug, icon
- Description
- Pain points
- Compliance standards
- Related services
- Rich text body

### Testimonials

Customer testimonials:

- Quote text
- Author details (name, title, company)
- Company logo
- Star rating (1-5)
- Featured flag
- Industry/service references

### Before & After

Visual transformation examples:

- Before/after images
- Caption
- Service/industry references
- Featured flag

### Badges

Trust badges and certifications:

- Label, icon
- Description
- Display order
- Visibility toggle

### Pages

Flexible content pages:

- Title, slug
- Rich text body with custom blocks
- SEO fields
- Open Graph image

### Posts

Blog posts:

- Title, slug, excerpt
- Author, published date
- Categories, tags
- Featured image
- Rich text body
- SEO fields

## Fetching Data

Use the query functions from `queries.ts`:

```typescript
import { getSettings, getAllServices, getFeaturedTestimonials } from '@/lib/cms/queries'

// In a Server Component
export default async function Page() {
  const settings = await getSettings()
  const services = await getAllServices()
  const testimonials = await getFeaturedTestimonials(6)

  return (
    // Your JSX
  )
}
```

### Preview Mode

Enable draft preview:

```
/api/preview?secret=YOUR_SECRET&slug=/your-page
```

Pass `preview={true}` to queries:

```typescript
import { draftMode } from 'next/headers'

export default async function Page() {
  const { isEnabled } = await draftMode()
  const data = await getServiceBySlug('office-cleaning', isEnabled)

  return // Your JSX
}
```

## ISR Revalidation

Recommended revalidation times are defined in `sanity.client.ts`:

```typescript
export const REVALIDATE_TIME = {
  HOMEPAGE: 60, // 1 minute
  SERVICES: 300, // 5 minutes
  INDUSTRIES: 300, // 5 minutes
  TESTIMONIALS: 600, // 10 minutes
  BLOG: 300, // 5 minutes
  SETTINGS: 3600, // 1 hour
}
```

Use in your pages:

```typescript
export const revalidate = REVALIDATE_TIME.SERVICES
```

## Best Practices

1. **Always use `getClient(preview)`** instead of directly using `client` or `previewClient`
2. **Set appropriate revalidation times** for each page type
3. **Use TypeScript** for type-safe queries
4. **Protect `/studio` route** in production with authentication
5. **Use environment variables** for sensitive data
6. **Test preview mode** before deploying

## Troubleshooting

### Studio won't load

- Check `NEXT_PUBLIC_SANITY_PROJECT_ID` is set
- Verify project ID matches your Sanity project
- Clear Next.js cache: `rm -rf .next`

### Preview not working

- Verify `SANITY_API_READ_TOKEN` has read permissions
- Check `SANITY_PREVIEW_SECRET` matches query parameter
- Ensure draft mode is enabled

### Data not updating

- Check ISR revalidation time
- Force revalidation with `revalidatePath()` or `revalidateTag()`
- Clear CDN cache if using one

## Learn More

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity](https://www.sanity.io/plugins/next-sanity)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
