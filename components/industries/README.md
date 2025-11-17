# Industries System Documentation

This document explains how the industries hub and template system works, and how to add new industries.

## 📋 Overview

The industries system consists of:

1. **Data File** (`lib/industries-data.ts`) - Centralized industry data
2. **Hub Page** (`app/industries/page.tsx`) - Lists all industries
3. **Template Component** (`components/industries/IndustryTemplate.tsx`) - Reusable template
4. **Dynamic Route** (`app/industries/[slug]/page.tsx`) - Individual industry pages

---

## 🗂️ File Structure

```
/lib/industries-data.ts              ← Industry data configuration
/app/industries/page.tsx              ← Hub page listing all industries
/app/industries/[slug]/page.tsx       ← Dynamic route for individual pages
/components/industries/
  ├── IndustryTemplate.tsx            ← Reusable page template
  └── README.md                       ← This file
```

---

## 📊 Industry Data Structure

Each industry in `lib/industries-data.ts` has this structure:

```typescript
{
  id: 'healthcare',                    // Unique identifier
  name: 'Healthcare Facilities',       // Display name
  slug: 'healthcare',                  // URL slug
  icon: Heart,                         // Lucide React icon component
  shortDescription: '...',             // 2 sentence description for hub cards

  hero: {
    title: 'Healthcare Facility Cleaning Services',
    subtitle: 'Medical-grade cleaning that meets OSHA and CDC standards',
    backgroundImage: '/images/industries/healthcare-hero.jpg'
  },

  overview: [                          // 2-3 paragraphs
    'Healthcare facilities require...',
    'Our team is trained in...',
    'From waiting rooms to exam rooms...'
  ],

  challenges: [                        // 4-6 bullet points
    'Preventing cross-contamination between patient areas',
    'Meeting strict OSHA and CDC sanitation standards',
    // ...
  ],

  solutions: [                         // 3-4 solution cards
    {
      title: 'EPA-Registered Disinfectants',
      description: 'Hospital-grade products that kill 99.9% of pathogens'
    },
    // ...
  ],

  compliance: [                        // 4-6 compliance badges
    'OSHA Compliant',
    'CDC Guidelines',
    // ...
  ],

  testimonials: [                      // 1-2 testimonials
    {
      quote: '...',
      author: 'Dr. Sarah Mitchell',
      company: 'Springfield Family Medicine',
      role: 'Medical Director'
    },
    // ...
  ]
}
```

---

## ➕ How to Add a New Industry

### Step 1: Add Industry Data

Edit `lib/industries-data.ts` and add your new industry to the `industries` array:

```typescript
import { YourIcon } from 'lucide-react'

export const industries: Industry[] = [
  // ... existing industries

  {
    id: 'hospitality',
    name: 'Hotels & Hospitality',
    slug: 'hotels-hospitality',
    icon: YourIcon,  // Choose from https://lucide.dev/icons
    shortDescription: 'Two sentences describing the industry and our specialized approach to their cleaning needs.',

    hero: {
      title: 'Hotel & Hospitality Cleaning Services',
      subtitle: 'One sentence positioning statement',
      backgroundImage: '/images/industries/hospitality-hero.jpg'
    },

    overview: [
      'First paragraph explaining the unique cleaning needs of this industry...',
      'Second paragraph about our specialized approach...',
      'Third paragraph about our experience and commitment...'
    ],

    challenges: [
      'First common challenge',
      'Second challenge',
      'Third challenge',
      'Fourth challenge',
      'Fifth challenge (optional)',
      'Sixth challenge (optional)'
    ],

    solutions: [
      {
        title: 'Solution Name',
        description: 'Detailed description of how we address specific challenges with this solution.'
      },
      {
        title: 'Another Solution',
        description: 'Description...'
      },
      // Add 2-4 solutions total
    ],

    compliance: [
      'Relevant Certification 1',
      'Relevant Certification 2',
      'Relevant Standard 3',
      'Background-Checked Staff',
      'Insured & Bonded',
      'OSHA Compliant'
    ],

    testimonials: [
      {
        quote: 'Detailed testimonial quote from a satisfied client in this industry. 2-3 sentences is ideal.',
        author: 'Client Name',
        company: 'Company Name',
        role: 'Job Title'
      },
      {
        quote: 'Second testimonial if available...',
        author: 'Another Client',
        company: 'Their Company',
        role: 'Their Role'
      }
    ]
  }
]
```

### Step 2: Add Icon Import

At the top of `lib/industries-data.ts`, import the icon:

```typescript
import {
  Building2,
  GraduationCap,
  ShoppingBag,
  Factory,
  Heart,
  Hotel,  // ← Add your new icon here
} from 'lucide-react'
```

Browse icons at: https://lucide.dev/icons

### Step 3: (Optional) Add to Hub Page Filter

If you want to control which industries appear on the hub page, edit `app/industries/page.tsx`:

```typescript
const filteredIndustries = industries.filter(ind =>
  [
    'healthcare',
    'corporate-offices',
    'educational-facilities',
    'retail-stores',
    'manufacturing-warehouses',
    'hotels-hospitality',  // ← Add your new industry slug here
  ].includes(ind.slug)
)
```

Or remove the filter entirely to show all industries:

```typescript
// Just use the full array
{industries.map((industry) => { ... })}
```

### Step 4: Create Hero Image (Optional)

1. Create hero image at: `/public/images/industries/hospitality-hero.jpg`
2. Recommended size: 1920x1080px (16:9 aspect ratio)
3. Optimize before uploading (use tinypng.com or imageoptim.com)
4. Update `hero.backgroundImage` path in industry data

If no image available, the template will use gradient background.

### Step 5: Build & Test

```bash
# Development server
npm run dev

# Visit your new page
http://localhost:3000/industries/hotels-hospitality

# Build for production (generates static pages)
npm run build
```

---

## 🎨 Customizing the Template

The `IndustryTemplate` component can be customized with props:

```tsx
// Show quote form in CTA section
<IndustryTemplate industry={industry} showQuoteForm={true} />

// Hide quote form (just show buttons)
<IndustryTemplate industry={industry} showQuoteForm={false} />
```

To customize the template further, edit:
- `components/industries/IndustryTemplate.tsx`

---

## 🔍 Helper Functions

The data file exports helper functions:

```typescript
import {
  getIndustryBySlug,
  getIndustryById,
  getAllIndustrySlugs
} from '@/lib/industries-data'

// Get specific industry
const industry = getIndustryBySlug('healthcare')

// Get industry by ID
const industry = getIndustryById('healthcare')

// Get all slugs (for static generation)
const slugs = getAllIndustrySlugs()  // ['healthcare', 'corporate-offices', ...]
```

---

## 📱 Responsive Behavior

The template is fully responsive:

| Screen Size | Hero | Challenges | Solutions | Testimonials |
|------------|------|-----------|-----------|--------------|
| Mobile (< 768px) | Stacked | 1 column | 1 column | 1 column |
| Tablet (768-1023px) | Stacked | 2 columns | 2 columns | 1 column |
| Desktop (≥ 1024px) | Side-by-side | 3 columns | 2 columns | 2 columns |

---

## ♿ Accessibility

All templates follow WCAG 2.1 AA guidelines:

- ✅ Proper heading hierarchy (h1 → h2 → h3)
- ✅ Semantic HTML structure
- ✅ Alt text for all images (via hero.backgroundImage)
- ✅ ARIA labels on interactive elements
- ✅ Color contrast compliance
- ✅ Keyboard navigation support
- ✅ Touch targets ≥ 44x44px

---

## 🧪 Testing Checklist

Before publishing a new industry page:

- [ ] All content is accurate and complete
- [ ] Images are optimized and loading correctly
- [ ] Links work correctly (back button, CTAs)
- [ ] Responsive design looks good on mobile, tablet, desktop
- [ ] Dark mode displays properly
- [ ] Testimonials are properly attributed
- [ ] Compliance badges are relevant to industry
- [ ] SEO metadata is set (title, description)
- [ ] Build succeeds without errors (`npm run build`)
- [ ] Page generates statically and loads fast

---

## 📝 Content Writing Tips

### Short Description (Hub Card)
- 2 sentences maximum
- First sentence: What we clean
- Second sentence: Key differentiator or benefit
- Keep under 200 characters

### Hero Subtitle
- One sentence
- Focus on main value proposition or compliance standard
- Examples:
  - "Medical-grade cleaning that meets OSHA and CDC standards"
  - "Creating healthy learning environments for students and staff"
  - "Professional environments that impress clients and inspire teams"

### Overview Paragraphs
- 3 paragraphs total
- Paragraph 1: Industry challenges and requirements
- Paragraph 2: Our specialized approach and training
- Paragraph 3: Specific services and commitment

### Challenges
- 4-6 bullet points
- Start with action verb or "ing" word
- Be specific to the industry
- Focus on pain points we solve

### Solutions
- 3-4 solution cards
- Each has a title (2-5 words) and description (1-2 sentences)
- Focus on what makes us different
- Include specific products, methods, or training

### Compliance Badges
- 4-6 relevant certifications/standards
- Mix of industry-specific and general
- Examples: OSHA, EPA, Background-Checked Staff, Insured & Bonded

### Testimonials
- 2-3 sentences each
- Real quotes from real clients (if available)
- Include specific results or benefits
- Always attribute with name, role, and company

---

## 🚀 Production Deployment

The industries system generates static pages at build time:

```bash
# Build generates static HTML for all industry pages
npm run build

# Output includes:
# /industries/healthcare.html
# /industries/corporate-offices.html
# /industries/educational-facilities.html
# /industries/retail-stores.html
# /industries/manufacturing-warehouses.html
```

This means:
- ✅ Fast page loads (pre-rendered HTML)
- ✅ Great SEO (crawlable content)
- ✅ Low server cost (static files)
- ✅ Works without JavaScript

---

## 🔧 Troubleshooting

### Industry page not showing
- Check slug matches exactly in data file and URL
- Rebuild after adding new industry: `npm run build`
- Check browser console for errors

### Icon not displaying
- Verify icon name matches Lucide icon: https://lucide.dev/icons
- Check import statement at top of industries-data.ts
- Icon names are PascalCase: `Building2`, not `building-2`

### Images not loading
- Check image path matches file location
- Images must be in `/public` directory
- Use absolute paths: `/images/industries/...`
- Optimize images before uploading (< 500KB recommended)

### Build errors
- Validate all TypeScript types match interfaces
- Check for missing required fields in industry objects
- Ensure all imports are correct
- Run `npm run lint` to catch issues

---

## 📚 Additional Resources

- **Lucide Icons**: https://lucide.dev/icons
- **Next.js Dynamic Routes**: https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes
- **Image Optimization**: https://tinypng.com
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/handbook/intro.html

---

**Last Updated**: 2025-11-14
**Version**: 1.0.0
**Maintainer**: Anderson Cleaning Development Team
