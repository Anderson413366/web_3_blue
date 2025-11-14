# Logo & Icon Setup Guide

This guide explains how to add your Anderson Cleaning logo and brand icons to the website.

## Required Logo Files

Place your logo files in the `/public` directory with these exact names:

### Main Logo Files

```
/public/images/logo.png          - Main logo (transparent background, 400x100px recommended)
/public/images/logo-dark.png     - Dark mode version (optional, white/light colored)
/public/images/logo-icon.png     - Square icon version (200x200px minimum)
```

### Favicon Files (Browser Tab Icons)

```
/public/favicon.ico              - 32x32px ICO format
/public/favicon-16x16.png        - 16x16px PNG
/public/favicon-32x32.png        - 32x32px PNG
/public/apple-touch-icon.png     - 180x180px PNG (for iOS home screen)
/public/android-chrome-192x192.png - 192x192px PNG (for Android)
/public/android-chrome-512x512.png - 512x512px PNG (for Android)
/public/safari-pinned-tab.svg    - SVG for Safari pinned tab
```

### Social Media / Open Graph

```
/public/images/og-image.jpg      - 1200x630px JPG (shows when sharing on social media)
```

## Quick Start: Using Your Logo

### Step 1: Prepare Your Logo Files

1. **Main Logo**: Export as PNG with transparent background
   - Recommended size: 400x100px (or maintain ~4:1 aspect ratio)
   - Format: PNG with transparency
   - Colors: Your brand colors

2. **Dark Mode Logo** (optional but recommended):
   - Same size as main logo
   - Light colored for dark backgrounds
   - Format: PNG with transparency

3. **Square Icon**: For favicons and social media
   - Size: 512x512px (we'll generate smaller sizes)
   - Format: PNG with transparency
   - Should work well at small sizes

### Step 2: Add Files to Project

```bash
# Upload your logo files to these locations:
/public/images/logo.png
/public/images/logo-dark.png
/public/images/logo-icon.png
```

### Step 3: Generate Favicon Files

You can use online tools to generate all favicon sizes from your square icon:

**Recommended Tools:**

- https://realfavicongenerator.net/
- https://favicon.io/favicon-converter/

Upload your `logo-icon.png` and download the generated files.

### Step 4: Update Header Component

The Header component (`components/Header.tsx`) will automatically use your logo files once they're in place.

**Current placeholder** (lines 59-66):

```tsx
<div className="flex items-center justify-center w-10 h-10 bg-primary-700 dark:bg-blue-600 rounded-lg transition-colors">
  <span className="text-white font-bold text-xl">A</span>
</div>
```

**Will be replaced with**:

```tsx
<Image
  src="/images/logo.png"
  alt="Anderson Cleaning Logo"
  width={40}
  height={40}
  className="dark:hidden"
/>
<Image
  src="/images/logo-dark.png"
  alt="Anderson Cleaning Logo"
  width={40}
  height={40}
  className="hidden dark:block"
/>
```

## Logo Specifications

### Recommended Dimensions

| File                       | Size       | Format | Purpose                        |
| -------------------------- | ---------- | ------ | ------------------------------ |
| logo.png                   | 400x100px  | PNG    | Main website logo (light mode) |
| logo-dark.png              | 400x100px  | PNG    | Dark mode logo                 |
| logo-icon.png              | 512x512px  | PNG    | Square icon for all uses       |
| favicon.ico                | 32x32px    | ICO    | Browser tab icon               |
| favicon-16x16.png          | 16x16px    | PNG    | Small browser icon             |
| favicon-32x32.png          | 32x32px    | PNG    | Standard browser icon          |
| apple-touch-icon.png       | 180x180px  | PNG    | iOS home screen                |
| android-chrome-192x192.png | 192x192px  | PNG    | Android icon                   |
| android-chrome-512x512.png | 512x512px  | PNG    | Android hi-res                 |
| og-image.jpg               | 1200x630px | JPG    | Social media preview           |

### Design Guidelines

**Colors:**

- Use your brand colors
- Ensure good contrast for accessibility
- Light logo should work on white/light backgrounds
- Dark logo should work on dark backgrounds

**File Formats:**

- **PNG**: For logos with transparency (logo.png, logo-dark.png)
- **SVG**: For scalable vector graphics (optional, future enhancement)
- **ICO**: For favicon.ico only
- **JPG**: For og-image.jpg only

**Optimization:**

- Compress PNG files without losing quality (use TinyPNG.com)
- Keep file sizes under 100KB for logos
- OG image can be up to 1MB

## Where Logos Are Used

### 1. Header Navigation (`components/Header.tsx`)

- Shows in top left corner on all pages
- Responsive sizing for mobile/desktop
- Supports dark mode

### 2. Footer (`components/Footer.tsx`)

- May include logo (check implementation)

### 3. SEO & Social Media (`lib/seo/jsonld.ts`, `lib/seo/next-seo.config.ts`)

- Organization schema (logo.png)
- Open Graph images (og-image.jpg)
- Twitter Card images

### 4. Browser & Mobile (`app/layout.tsx`)

- Favicon in browser tab
- iOS home screen icon
- Android app icon
- Safari pinned tab

## After Adding Logo Files

Once you've added all the logo files:

1. **Clear browser cache** and reload the page
2. **Check appearance** in both light and dark modes
3. **Test mobile view** to ensure logo scales properly
4. **Share a link** on social media to see OG image
5. **Check browser tab** for favicon

## Troubleshooting

### Logo not appearing?

- Verify file paths are correct (case-sensitive!)
- Check file permissions (should be readable)
- Clear Next.js cache: `rm -rf .next` and rebuild
- Hard refresh browser: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### Logo too large/small?

- Adjust the `width` and `height` props in the Image component
- Maintain aspect ratio for best results

### Favicon not updating?

- Favicons are heavily cached by browsers
- Try opening site in incognito/private mode
- Clear browser cache completely
- May take up to 24 hours to update in some browsers

### Dark mode logo not showing?

- Ensure logo-dark.png exists in `/public/images/`
- Check that image has light colors (will be invisible if dark on dark)
- Verify dark mode is working on the site

## Quick Command Reference

```bash
# Navigate to project directory
cd /path/to/anderson-cleaning

# Create images directory if it doesn't exist
mkdir -p public/images

# Copy your logo files (example)
cp ~/Downloads/logo.png public/images/logo.png
cp ~/Downloads/logo-dark.png public/images/logo-dark.png
cp ~/Downloads/logo-icon.png public/images/logo-icon.png

# Copy favicon files
cp ~/Downloads/favicon.ico public/favicon.ico
cp ~/Downloads/favicon-32x32.png public/favicon-32x32.png
cp ~/Downloads/apple-touch-icon.png public/apple-touch-icon.png

# Rebuild the project
npm run build

# Start development server to test
npm run dev
```

## Need Help?

If you need assistance:

1. Check that all file paths match exactly (case-sensitive)
2. Verify files are in correct format (PNG, ICO, JPG, SVG)
3. Ensure files are not corrupted (try opening them)
4. Check file sizes are reasonable (<100KB for logos)

## Next Steps

After adding your logo:

1. ✅ Update all logo files listed above
2. ✅ Test in light and dark modes
3. ✅ Check mobile responsiveness
4. ✅ Verify social media preview
5. ✅ Test browser tab icon
6. ✅ Review on different devices
7. ✅ Update alt text if needed (for accessibility)

---

**Last Updated**: 2024
**Files Referenced**: `components/Header.tsx`, `lib/seo/next-seo.config.ts`, `lib/seo/jsonld.ts`, `app/layout.tsx`
