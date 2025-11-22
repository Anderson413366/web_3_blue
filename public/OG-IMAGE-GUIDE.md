# Anderson Cleaning - Open Graph Image Generation Guide

## Official Brand Colors
- **Deep Blue**: #002A86 (Pantone 2747C)
- **Bright Blue**: #0077D9 (Pantone 3005C)
- **Red**: #C8102E (Pantone 193C)
- **White**: #FFFFFF

## Image Specifications

### Dimensions Required
- **Facebook/LinkedIn Primary**: 1200 × 630px
- **Twitter**: 1200 × 600px
- **LinkedIn Alternate**: 1920 × 1080px

### Design Template

**Background:**
- Linear gradient 135deg from Deep Blue (#002A86) top-left to #0052A3 bottom-right
- Add radial glow: 15% opacity white circle at center, blur 200px

**Logo:**
- Use: `/brand/white/logo-full-2000-white.png`
- Position: Centered top
- Max-width: 400px
- Margin-top: 80px

**Headline:**
- Color: White (#FFFFFF)
- Font: Inter Bold or system-ui
- Size: 72px
- Line-height: 1.2
- Max-width: 900px
- Position: Centered
- Letter-spacing: -0.02em

**Subheadline:**
- Color: White 85% opacity (rgba(255, 255, 255, 0.85))
- Font: Inter Medium or system-ui
- Size: 36px
- Max-width: 800px
- Position: Centered below headline
- Margin-top: 32px

**Accent Element:**
- Bright Blue (#0077D9) horizontal line
- Height: 4px
- Width: 120px
- Position: Centered below headline
- Border-radius: 2px

## Required Images (6 pages × 3 sizes = 18 total)

### 1. Home Page
**Filename**: `og-home-1200x630.png`, `og-home-1200x600.png`, `og-home-1920x1080.png`

**Headline**: "Western Massachusetts' Premier Commercial Cleaning Partner"

**Subheadline**: "Enterprise-Grade Service. Small Business Care."

### 2. Services Page
**Filename**: `og-services-1200x630.png`, `og-services-1200x600.png`, `og-services-1920x1080.png`

**Headline**: "Comprehensive Commercial Cleaning Solutions"

**Subheadline**: "Office • Janitorial • Floor Care • Post-Construction"

### 3. Industries Page
**Filename**: `og-industries-1200x630.png`, `og-industries-1200x600.png`, `og-industries-1920x1080.png`

**Headline**: "Trusted by 100+ Businesses Across Western MA & CT"

**Subheadline**: "Healthcare • Education • Corporate • Retail"

### 4. About Page
**Filename**: `og-about-1200x630.png`, `og-about-1200x600.png`, `og-about-1920x1080.png`

**Headline**: "18 Years of Commercial Cleaning Excellence"

**Subheadline**: "Licensed, Insured & OSHA Compliant Since 2007"

### 5. Blog Page
**Filename**: `og-blog-1200x630.png`, `og-blog-1200x600.png`, `og-blog-1920x1080.png`

**Headline**: "Commercial Cleaning Insights & Best Practices"

**Subheadline**: "Expert tips for facility managers"

### 6. Quote Page
**Filename**: `og-quote-1200x630.png`, `og-quote-1200x600.png`, `og-quote-1920x1080.png`

**Headline**: "Get Your Free Cleaning Quote Today"

**Subheadline**: "24-Hour Response Time • No Obligation"

## Tools for Generation

### Option 1: Figma
1. Create 1200×630px frame
2. Add gradient background
3. Import white logo from `/brand/white/logo-full-2000-white.png`
4. Add text layers with specified fonts and colors
5. Export as PNG at 2x resolution

### Option 2: Canva Pro
1. Create custom size (1200×630px)
2. Use gradient tool with hex colors
3. Upload logo and add text
4. Export as PNG

### Option 3: HTML/CSS Screenshot
Create HTML file with exact specifications and use Playwright/Puppeteer to screenshot.

### Option 4: Adobe Photoshop
1. New file: 1200×630px, 72dpi
2. Gradient layer with Deep Blue → #0052A3
3. Add radial glow overlay
4. Import logo and add text layers
5. Save for Web (PNG-24)

## Placement

Save all generated images to:
```
/public/og-images/
├── og-home-1200x630.png
├── og-home-1200x600.png
├── og-home-1920x1080.png
├── og-services-1200x630.png
├── og-services-1200x600.png
├── og-services-1920x1080.png
└── (... etc for all 18 images)
```

## Meta Tag Updates

After generating images, update each page's metadata:

```typescript
// Example for home page
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/og-images/og-home-1200x630.png',
        width: 1200,
        height: 630,
        alt: 'Anderson Cleaning - Commercial Cleaning Excellence',
      },
    ],
  },
  twitter: {
    images: ['/og-images/og-home-1200x600.png'],
  },
}
```

## Verification

Test your OG images using:
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/
- **Twitter Card Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## Brand Compliance Checklist

☐ All images use official brand colors only (no other colors)
☐ White logo variant used on all images
☐ Deep Blue gradient background consistent across all images
☐ Typography hierarchy maintained (72px headlines, 36px subheadlines)
☐ Bright Blue accent line included
☐ All images optimized for web (< 300KB each)
☐ File names follow naming convention
☐ Images placed in `/public/og-images/` directory
