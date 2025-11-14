# Sanity CMS Guide

Complete guide to managing content for Anderson Cleaning website using Sanity CMS.

---

## Table of Contents

1. [Overview](#overview)
2. [Accessing Sanity Studio](#accessing-sanity-studio)
3. [Content Types (Schemas)](#content-types-schemas)
4. [Creating & Editing Content](#creating--editing-content)
5. [Publishing Workflow](#publishing-workflow)
6. [Preview Mode](#preview-mode)
7. [GROQ Queries](#groq-queries)
8. [Image Management](#image-management)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Overview

### What is Sanity?

Sanity is a headless CMS (Content Management System) that provides:

- **Structured Content**: Define schemas for different content types
- **Real-time Editing**: Changes sync instantly across all editors
- **Powerful Querying**: GROQ query language for flexible data retrieval
- **Image Pipeline**: Automatic optimization and transformations
- **Version History**: Track all changes and revert if needed

### Architecture

```
┌─────────────────┐
│  Sanity Studio  │ ← Content editors work here
│   (/studio)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Sanity Cloud   │ ← Content stored here
│   (Database)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Next.js Site   │ ← Public website fetches content
│ (andersoncleaning.com)
└─────────────────┘
```

### Our Implementation

- **Version**: Sanity v3
- **Studio Location**: `https://andersoncleaning.com/studio`
- **Project ID**: Set in `.env.local` as `NEXT_PUBLIC_SANITY_PROJECT_ID`
- **Dataset**: `production`
- **Revalidation**: ISR with 60-second revalidation

---

## Accessing Sanity Studio

### Production Studio

**URL**: `https://andersoncleaning.com/studio`

1. Navigate to the Studio URL
2. Enter credentials (Basic Auth):
   - Username: Set in `STUDIO_BASIC_AUTH_USER`
   - Password: Set in `STUDIO_BASIC_AUTH_PASS`
3. Log in with Sanity account
4. Start editing content

### Local Development Studio

```bash
# Start development server
npm run dev

# Open Studio in browser
http://localhost:3000/studio
```

**Note**: Local Studio connects to the same production dataset by default. Be careful when editing!

### Authentication

**Sanity Login**:

- Uses Google, GitHub, or email authentication
- Configured in Sanity project settings
- Role-based access control (Administrator, Editor, etc.)

**Basic Auth Protection** (Production only):

- Additional layer of security
- Prevents unauthorized Studio access
- Configured in Vercel environment variables

---

## Content Types (Schemas)

Our Sanity implementation includes 8 content types:

### 1. Services

**Schema**: `lib/cms/schemas/service.ts`

```typescript
{
  name: 'service',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'excerpt', type: 'text' },
    { name: 'description', type: 'blockContent' },
    { name: 'icon', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'features', type: 'array' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Used For**: Main service pages (Office Cleaning, Medical Facility Cleaning, etc.)

**URL Pattern**: `/services/[slug]`

### 2. Industries

**Schema**: `lib/cms/schemas/industry.ts`

```typescript
{
  name: 'industry',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'excerpt', type: 'text' },
    { name: 'description', type: 'blockContent' },
    { name: 'icon', type: 'string' },
    { name: 'image', type: 'image' },
    { name: 'challenges', type: 'array' },
    { name: 'solutions', type: 'array' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Used For**: Industry-specific pages (Healthcare, Education, Retail, etc.)

**URL Pattern**: `/industries/[slug]`

### 3. Testimonials

**Schema**: `lib/cms/schemas/testimonial.ts`

```typescript
{
  name: 'testimonial',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'position', type: 'string' },
    { name: 'company', type: 'string' },
    { name: 'industry', type: 'string' },
    { name: 'quote', type: 'text' },
    { name: 'rating', type: 'number' }, // 1-5
    { name: 'image', type: 'image' },
    { name: 'featured', type: 'boolean' },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

**Used For**: Customer testimonials and reviews

**URL Pattern**: Displayed on `/testimonials` and homepage

### 4. Team Members

**Schema**: `lib/cms/schemas/teamMember.ts`

```typescript
{
  name: 'teamMember',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'position', type: 'string' },
    { name: 'bio', type: 'text' },
    { name: 'image', type: 'image' },
    { name: 'email', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'linkedin', type: 'url' },
    { name: 'order', type: 'number' }
  ]
}
```

**Used For**: About page team section

### 5. FAQs

**Schema**: `lib/cms/schemas/faq.ts`

```typescript
{
  name: 'faq',
  type: 'document',
  fields: [
    { name: 'question', type: 'string' },
    { name: 'answer', type: 'blockContent' },
    { name: 'category', type: 'string' }, // 'general', 'pricing', 'services', etc.
    { name: 'order', type: 'number' },
    { name: 'featured', type: 'boolean' }
  ]
}
```

**Used For**: FAQ sections across the site

### 6. Case Studies

**Schema**: `lib/cms/schemas/caseStudy.ts`

```typescript
{
  name: 'caseStudy',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'client', type: 'string' },
    { name: 'industry', type: 'reference' },
    { name: 'services', type: 'array' },
    { name: 'challenge', type: 'blockContent' },
    { name: 'solution', type: 'blockContent' },
    { name: 'results', type: 'array' },
    { name: 'image', type: 'image' },
    { name: 'publishedAt', type: 'datetime' }
  ]
}
```

**Used For**: Success stories and case studies

**URL Pattern**: `/case-studies/[slug]`

### 7. Blog Posts

**Schema**: `lib/cms/schemas/post.ts`

```typescript
{
  name: 'post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'author', type: 'reference' },
    { name: 'excerpt', type: 'text' },
    { name: 'content', type: 'blockContent' },
    { name: 'image', type: 'image' },
    { name: 'categories', type: 'array' },
    { name: 'tags', type: 'array' },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Used For**: Blog articles and company news

**URL Pattern**: `/blog/[slug]`

### 8. Settings

**Schema**: `lib/cms/schemas/siteSettings.ts`

```typescript
{
  name: 'siteSettings',
  type: 'document',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'description', type: 'text' },
    { name: 'phone', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'address', type: 'object' },
    { name: 'hours', type: 'object' },
    { name: 'socialMedia', type: 'object' },
    { name: 'seo', type: 'seo' }
  ]
}
```

**Used For**: Global site settings (only one document)

---

## Creating & Editing Content

### Creating a New Service

1. **Navigate to Services**:
   - Click "Services" in Studio sidebar
   - Click "Create new Service"

2. **Fill Required Fields**:

   ```
   Title*: Office Cleaning Services
   Slug*: office-cleaning (auto-generated, editable)
   Excerpt*: Professional office cleaning for productive workspaces
   Icon: 🏢 (emoji or icon name)
   ```

3. **Add Description** (Rich Text):
   - Click in description field
   - Use toolbar to format text:
     - **Bold**, _Italic_, `Code`
     - Headings (H2, H3, H4)
     - Lists (bulleted, numbered)
     - Links
     - Block quotes

4. **Upload Image**:
   - Click "Upload" in image field
   - Select image file (JPEG, PNG, WebP)
   - Recommended: 1200x800px minimum
   - Add alt text for accessibility

5. **Add Features**:
   - Click "Add item" in features array
   - Enter feature text
   - Repeat for all features

6. **SEO Settings**:
   - Meta Title (60 chars max)
   - Meta Description (160 chars max)
   - Open Graph Image (optional)

7. **Save Draft** or **Publish**

### Editing Existing Content

1. **Find Content**:
   - Use search bar at top
   - Or browse by content type
   - Click item to open

2. **Make Changes**:
   - Edit any field
   - Changes auto-save as draft

3. **Preview Changes**:
   - Click "Preview" button (if configured)
   - Opens preview URL in new tab

4. **Publish**:
   - Click "Publish" when ready
   - Website updates within 60 seconds (ISR)

### Rich Text Editing (Block Content)

**Available Blocks**:

- Paragraphs
- Headings (H2, H3, H4)
- Lists (ordered, unordered)
- Block quotes
- Code blocks
- Images
- Custom components (callouts, etc.)

**Formatting**:

- **Bold**: Ctrl+B (Cmd+B on Mac)
- _Italic_: Ctrl+I (Cmd+I on Mac)
- Link: Ctrl+K (Cmd+K on Mac)

**Best Practices**:

- Use H2 for main sections, H3 for subsections
- Keep paragraphs concise (3-4 sentences)
- Use lists for scannable content
- Add links to related pages

---

## Publishing Workflow

### Draft vs Published

- **Draft**: Content visible only in Studio
- **Published**: Content live on website

### Publishing Process

1. **Create/Edit Content** → Saves as draft
2. **Review Changes** → Check preview
3. **Click "Publish"** → Makes content live
4. **ISR Revalidation** → Website updates within 60s

### Scheduling (Future Feature)

Currently, all published content is immediately visible. To schedule:

1. Set `publishedAt` date to future
2. Filter queries by `publishedAt <= now()`

### Unpublishing

To remove content from website:

- **Option 1**: Delete document (permanent)
- **Option 2**: Add `hidden` field and set to `true`
- **Option 3**: Set `publishedAt` to future date

---

## Preview Mode

### What is Preview Mode?

Preview mode allows you to view draft content on the website before publishing.

### How to Use

**Method 1: Preview Button in Studio** (if configured):

1. Edit content in Studio
2. Click "Preview" button
3. Opens preview URL with draft content

**Method 2: Manual URL**:

```
https://andersoncleaning.com/api/preview?slug=/services/office-cleaning
```

### Exiting Preview Mode

Visit: `https://andersoncleaning.com/api/exit-preview`

### Technical Details

Preview mode:

- Uses Next.js Preview Mode API
- Sets preview cookie
- Fetches draft content instead of published
- Shows banner indicating preview mode

**Implementation**: `app/api/preview/route.ts`

---

## GROQ Queries

### What is GROQ?

GROQ (Graph-Relational Object Queries) is Sanity's query language.

### Basic Syntax

```groq
*[_type == "service"] {
  title,
  slug,
  excerpt
}
```

**Breakdown**:

- `*` - All documents
- `[_type == "service"]` - Filter by type
- `{ ... }` - Projection (select fields)

### Common Queries

#### Get All Services

```groq
*[_type == "service"] | order(title asc) {
  _id,
  title,
  slug,
  excerpt,
  icon,
  "imageUrl": image.asset->url
}
```

#### Get Single Service by Slug

```groq
*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  features,
  image {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}
```

**Usage**:

```typescript
const service = await client.fetch(query, { slug: 'office-cleaning' })
```

#### Get Featured Testimonials

```groq
*[_type == "testimonial" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  name,
  company,
  quote,
  rating,
  "imageUrl": image.asset->url
}
```

#### Get Services with Related Industries

```groq
*[_type == "service"] {
  _id,
  title,
  "relatedIndustries": *[_type == "industry" && references(^._id)] {
    title,
    slug
  }
}
```

### Advanced Filtering

```groq
// Published in last 30 days
*[_type == "post" && publishedAt > now() - 60*60*24*30]

// Services with specific feature
*[_type == "service" && "Green Cleaning" in features[]]

// Search by keyword
*[_type == "post" && (title match $keyword || excerpt match $keyword)]
```

### Projections

```groq
// Custom field names
*[_type == "service"] {
  "id": _id,
  "name": title,
  "url": slug.current
}

// Conditional fields
*[_type == "service"] {
  title,
  image {
    asset-> {
      url,
      metadata {
        dimensions
      }
    },
    "hasImage": defined(asset)
  }
}
```

### Query Location

All queries are in: `lib/cms/queries.ts`

---

## Image Management

### Uploading Images

1. **Click image field** in Studio
2. **Drag & drop** or **click to browse**
3. **Select image** (JPEG, PNG, WebP, GIF)
4. **Add metadata**:
   - Alt text (required for accessibility)
   - Caption (optional)
   - Attribution (optional)

### Image Specifications

**Recommended Sizes**:

- Hero images: 1920x1080px
- Service images: 1200x800px
- Testimonial photos: 400x400px
- Team photos: 600x600px
- Blog featured images: 1200x630px (OG compatible)

**File Formats**:

- JPEG: Photos, complex images
- PNG: Graphics with transparency
- WebP: Modern format (best compression)

**File Size**:

- Target: < 500KB per image
- Maximum: 5MB (Studio limit)

### Sanity Image Pipeline

Sanity automatically:

- Hosts images on CDN
- Generates optimized formats (WebP, AVIF)
- Creates responsive image sets
- Provides on-the-fly transformations

**Example URL**:

```
https://cdn.sanity.io/images/[project]/production/[image-id]-1200x800.jpg?w=600&h=400&fit=crop&auto=format
```

**Parameters**:

- `w` - Width
- `h` - Height
- `fit` - crop, fill, max, min
- `auto=format` - Automatic WebP/AVIF

### Using Images in Code

```typescript
import { urlFor } from '@/lib/cms/sanity.client'

// Generate image URL with transformations
const imageUrl = urlFor(image)
  .width(800)
  .height(600)
  .fit('crop')
  .auto('format')
  .url()

// In component
<Image
  src={imageUrl}
  alt={image.alt}
  width={800}
  height={600}
/>
```

### Image SEO Best Practices

1. **Always add alt text**:
   - Descriptive, specific
   - Include keywords naturally
   - Avoid "image of" or "picture of"

2. **Use descriptive filenames**:
   - `office-cleaning-conference-room.jpg` ✅
   - `IMG_1234.jpg` ❌

3. **Optimize before upload**:
   - Resize to appropriate dimensions
   - Compress (TinyPNG, ImageOptim)
   - Convert to modern formats

4. **Use captions when helpful**:
   - Provides context
   - Indexed by search engines

---

## Best Practices

### Content Writing

1. **Clear, Concise Headlines**:
   - Front-load keywords
   - Use active voice
   - Keep under 60 characters

2. **Scannable Content**:
   - Short paragraphs (2-4 sentences)
   - Bullet points for lists
   - Subheadings every 200-300 words

3. **SEO Optimization**:
   - Include target keyword in title, first paragraph, H2
   - Write unique meta descriptions
   - Use internal links to related pages

4. **Accessibility**:
   - Provide alt text for all images
   - Use descriptive link text (not "click here")
   - Maintain heading hierarchy (H2 → H3 → H4)

### Studio Organization

1. **Consistent Naming**:
   - Use title case for proper nouns
   - Be consistent with terminology
   - Avoid abbreviations

2. **Slug Management**:
   - Keep slugs short, readable
   - Use hyphens, not underscores
   - Never change published slugs (breaks links)

3. **Image Alt Text**:
   - Be specific and descriptive
   - Include relevant keywords
   - Keep under 125 characters

4. **Publishing Schedule**:
   - Set realistic publishing dates
   - Review content before publishing
   - Update outdated content regularly

### Performance Considerations

1. **Image Optimization**:
   - Compress before upload
   - Use appropriate dimensions
   - Leverage Sanity's image pipeline

2. **Query Efficiency**:
   - Fetch only needed fields
   - Use projections to reduce payload
   - Implement pagination for large datasets

3. **ISR Configuration**:
   - Balance freshness vs performance
   - Use appropriate revalidation times
   - Consider on-demand revalidation for critical content

---

## Troubleshooting

### Common Issues

#### "Document not found" Error

**Problem**: Querying for a document that doesn't exist

**Solution**:

```typescript
// Add null check
const service = await client.fetch(query, { slug })
if (!service) {
  notFound() // Next.js 404
}
```

#### Images Not Displaying

**Possible Causes**:

1. **CSP blocking**: Add `cdn.sanity.io` to Content Security Policy
2. **Wrong project ID**: Check `.env.local`
3. **Missing image asset**: Verify image uploaded in Studio

**Debug**:

```typescript
console.log('Image asset:', image?.asset?._ref)
console.log('Image URL:', urlFor(image).url())
```

#### Studio Won't Load

**Possible Causes**:

1. **Authentication issue**: Clear cookies, log in again
2. **CORS error**: Check Sanity CORS settings
3. **Network issue**: Check browser console

**Solution**:

```bash
# Clear Studio cache
rm -rf node_modules/.sanity
npm run dev
```

#### Content Not Updating on Website

**Possible Causes**:

1. **ISR cache**: Wait 60 seconds for revalidation
2. **CDN cache**: Clear CDN cache in Vercel
3. **Browser cache**: Hard refresh (Ctrl+Shift+R)

**Solution**:

```bash
# Force revalidation
curl -X POST https://andersoncleaning.com/api/revalidate?secret=YOUR_SECRET
```

#### Slow Queries

**Symptoms**: Studio or website slow to load

**Solutions**:

1. **Optimize GROQ queries**:
   - Reduce projection fields
   - Add filters early in query
   - Avoid `references()` in large datasets

2. **Add indexes** (Sanity schema):

   ```typescript
   fields: [
     {
       name: 'publishedAt',
       type: 'datetime',
       options: {
         index: true, // Add index for faster queries
       },
     },
   ]
   ```

3. **Use pagination**:
   ```groq
   *[_type == "post"] | order(publishedAt desc) [0...10]
   ```

### Error Messages

#### "Invalid GROQ query"

**Message**: `SyntaxError: Unexpected token`

**Solution**: Check query syntax:

- Missing brackets
- Incorrect operators
- Typos in field names

#### "Cross-domain request blocked"

**Solution**: Add domain to Sanity CORS settings:

1. Go to sanity.io/manage
2. Select project
3. API settings → CORS Origins
4. Add `https://andersoncleaning.com`

#### "Token expired"

**Solution**: Refresh authentication:

1. Log out of Studio
2. Log back in
3. If persists, revoke and create new token

### Getting Help

1. **Sanity Documentation**: https://www.sanity.io/docs
2. **GROQ Cheat Sheet**: https://www.sanity.io/docs/query-cheat-sheet
3. **Sanity Slack Community**: https://slack.sanity.io
4. **Developer Console**: Check browser DevTools for errors

---

## Advanced Topics

### Custom Components

Add custom blocks to rich text editor:

**1. Define component** (`lib/cms/components/Callout.tsx`):

```typescript
export const Callout = ({ children, type = 'info' }) => (
  <div className={`callout callout-${type}`}>
    {children}
  </div>
)
```

**2. Register in schema** (`lib/cms/schemas/blockContent.ts`):

```typescript
{
  type: 'block',
  of: [
    {
      type: 'object',
      name: 'callout',
      fields: [
        { name: 'type', type: 'string', options: { list: ['info', 'warning', 'success'] } },
        { name: 'content', type: 'text' }
      ]
    }
  ]
}
```

**3. Render on website**:

```typescript
import { PortableText } from '@portabletext/react'

<PortableText
  value={content}
  components={{
    types: {
      callout: ({ value }) => <Callout type={value.type}>{value.content}</Callout>
    }
  }}
/>
```

### Webhooks

Trigger actions when content changes:

**1. Create webhook** (Sanity dashboard):

- URL: `https://andersoncleaning.com/api/webhook`
- Events: `create`, `update`, `delete`
- Dataset: `production`

**2. Handle webhook** (`app/api/webhook/route.ts`):

```typescript
export async function POST(request: Request) {
  const body = await request.json()

  // Verify signature
  if (!verifySignature(body)) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Revalidate affected pages
  if (body._type === 'service') {
    await revalidatePath(`/services/${body.slug.current}`)
  }

  return new Response('OK', { status: 200 })
}
```

### Migrations

Update content programmatically:

```javascript
// migrations/add-featured-flag.js
import { getCliClient } from 'sanity/cli'

const client = getCliClient()

client
  .fetch('*[_type == "testimonial" && !defined(featured)]')
  .then((testimonials) => {
    const patches = testimonials.map((doc) => client.patch(doc._id).set({ featured: false }))
    return Promise.all(patches.map((patch) => patch.commit()))
  })
  .then(() => console.log('Migration complete'))
  .catch((err) => console.error(err))
```

**Run migration**:

```bash
npx sanity exec migrations/add-featured-flag.js --with-user-token
```

---

## Keyboard Shortcuts

| Action  | Windows/Linux | Mac          |
| ------- | ------------- | ------------ |
| Save    | Ctrl+S        | Cmd+S        |
| Publish | Ctrl+Alt+P    | Cmd+Option+P |
| Bold    | Ctrl+B        | Cmd+B        |
| Italic  | Ctrl+I        | Cmd+I        |
| Link    | Ctrl+K        | Cmd+K        |
| Search  | Ctrl+/        | Cmd+/        |
| Undo    | Ctrl+Z        | Cmd+Z        |
| Redo    | Ctrl+Shift+Z  | Cmd+Shift+Z  |

---

## Resources

### Official Documentation

- **Sanity Docs**: https://www.sanity.io/docs
- **GROQ Reference**: https://www.sanity.io/docs/groq
- **Schema Reference**: https://www.sanity.io/docs/schema-types
- **Image URLs**: https://www.sanity.io/docs/image-url

### Community

- **Sanity Slack**: https://slack.sanity.io
- **Sanity Exchange**: https://www.sanity.io/exchange
- **GitHub Discussions**: https://github.com/sanity-io/sanity/discussions

### Internal Resources

- **Schema Definitions**: `lib/cms/schemas/`
- **Query Library**: `lib/cms/queries.ts`
- **Sanity Client**: `lib/cms/sanity.client.ts`
- **Studio Config**: `sanity.config.ts`

---

## Changelog

| Version | Date     | Changes           |
| ------- | -------- | ----------------- |
| 1.0     | Nov 2024 | Initial CMS guide |

---

**Maintained by**: Development Team
**Last Updated**: November 2024
**Questions?**: dev@andersoncleaning.com
