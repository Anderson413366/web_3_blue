# Scripts

Utility scripts for maintaining and validating the Anderson Cleaning website.

## Available Scripts

### Internal Link Checker

**File:** `check-internal-links.ts`

Crawls all pages on the website and validates that internal links are working correctly. Detects broken links, redirects, and provides insights into your site's link structure.

#### Features

- **Automatic Crawling:** Starts from homepage and discovers all linked pages
- **Broken Link Detection:** Identifies 404s, 500s, and unreachable pages
- **Redirect Tracking:** Reports redirect chains and permanent redirects
- **External Link Analysis:** Lists most-referenced external domains
- **Depth Control:** Configurable crawl depth (default: 5 levels)
- **JSON Report:** Generates machine-readable report for CI/CD integration
- **Exit Codes:** Returns exit code 1 if broken links found (CI-friendly)

#### Usage

```bash
# Check production site
npm run check:links

# Check local development server (must be running on port 3000)
npm run check:links:local

# Verbose output with detailed logging
npm run check:links:verbose

# Check custom URL
BASE_URL=https://staging.andersoncleaning.com npm run check:links

# Direct execution with options
tsx scripts/check-internal-links.ts --verbose
```

#### Configuration

Edit `scripts/check-internal-links.ts` to customize:

- `MAX_DEPTH`: Maximum crawl depth (default: 5)
- `TIMEOUT`: Request timeout in milliseconds (default: 30000)
- `REPORT_PATH`: Output path for JSON report

#### Report Output

The script generates two types of output:

**1. Console Report**

```
================================================================================
INTERNAL LINK INTEGRITY REPORT
================================================================================

📊 SUMMARY
--------------------------------------------------------------------------------
  Total Pages Crawled:  15
  Total Links Found:    237
  Broken Links:         0
  Redirects:            2
  External Links:       18

✅ NO BROKEN LINKS FOUND

🔀 REDIRECTS
--------------------------------------------------------------------------------
  /old-services
    → /services
    Found on: 3 page(s)

🔗 TOP EXTERNAL LINKS
--------------------------------------------------------------------------------
  [12x] https://www.google.com/maps
  [8x] https://www.facebook.com/andersoncleaning
  [6x] https://twitter.com/andersoncleaning
```

**2. JSON Report** (`link-integrity-report.json`)

```json
{
  "summary": {
    "totalPages": 15,
    "totalLinks": 237,
    "brokenLinks": 0,
    "redirects": 2,
    "externalLinks": 18
  },
  "broken": [],
  "redirects": [
    {
      "url": "http://localhost:3000/old-services",
      "target": "http://localhost:3000/services",
      "foundOn": [
        "http://localhost:3000/",
        "http://localhost:3000/about",
        "http://localhost:3000/contact"
      ]
    }
  ],
  "external": [
    {
      "url": "https://www.google.com/maps",
      "count": 12
    }
  ]
}
```

#### CI/CD Integration

Add to your CI pipeline to prevent broken links from reaching production:

**GitHub Actions Example:**

```yaml
name: Link Integrity Check

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Start server
        run: npm run start &

      - name: Wait for server
        run: npx wait-on http://localhost:3000

      - name: Check internal links
        run: npm run check:links:local

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: link-integrity-report
          path: link-integrity-report.json
```

#### Exit Codes

- `0`: All links working (success)
- `1`: Broken links found (failure)

#### Best Practices

1. **Run Before Deployment**
   - Check links in staging environment before production deploy
   - Catch broken links early in the development cycle

2. **Regular Monitoring**
   - Schedule weekly link checks on production
   - Monitor for external links that may break over time

3. **Update Redirects**
   - Review redirect report regularly
   - Update internal links to point directly to final URLs
   - Reduce redirect chains for better SEO and performance

4. **Fix Broken Links Immediately**
   - Broken links hurt SEO and user experience
   - Use the "foundOn" data to locate and fix source pages

#### Troubleshooting

**Script times out or hangs:**
- Increase `TIMEOUT` value in the script
- Check if dev server is running (for local checks)
- Reduce `MAX_DEPTH` to crawl fewer pages

**Too many false positives:**
- Some pages may require authentication
- Dynamic content may load slowly
- Adjust wait conditions or exclude specific pages

**Missing pages:**
- Pages not linked from any other page won't be discovered
- Add links to sitemap or homepage
- Manually test orphaned pages separately

#### Technical Details

- **Technology:** Playwright (headless browser)
- **Rendering:** Full JavaScript execution
- **Concurrency:** Sequential crawling (one page at a time)
- **Link Extraction:** DOM parsing (finds all `<a href="">` elements)
- **Normalization:** URLs normalized to avoid duplicates (trailing slashes, fragments removed)

### i18n Coverage Validator

**File:** `check-i18n-coverage.ts`

Validates translation coverage for the careers application (i18next). Detects missing translations, ensures consistency across languages, and optionally finds unused translation keys.

#### Features

- **Missing Translation Detection:** Identifies keys missing in any language
- **Language Consistency:** Ensures all languages have the same keys
- **Unused Key Detection:** Optionally finds translation keys not used in code
- **Multi-Language Support:** Validates en, es, pt-BR, ro translations
- **JSON Report:** Generates machine-readable report for CI/CD
- **Exit Codes:** Returns exit code 1 if missing translations found

#### Usage

```bash
# Check translation coverage
npm run check:i18n

# Also check for unused translation keys (slower)
npm run check:i18n:unused

# Verbose output with usage details
npm run check:i18n:verbose

# Direct execution
tsx scripts/check-i18n-coverage.ts --verbose --unused
```

#### Configuration

Edit `scripts/check-i18n-coverage.ts` to customize:

- `RESOURCES_PATH`: Path to resources.ts file
- `SOURCE_DIRS`: Directories to scan for key usage
- `REPORT_PATH`: Output path for JSON report

#### Report Output

**Console Report**

```
================================================================================
i18n COVERAGE REPORT - Careers Application
================================================================================

📊 SUMMARY
--------------------------------------------------------------------------------
  Supported Languages:   4
  Languages:             en, es, pt-BR, ro
  Total Translation Keys: 28
  Missing Translations:   0
  Unused Keys:            2

✅ ALL TRANSLATIONS COMPLETE

⚠️  UNUSED TRANSLATION KEYS
--------------------------------------------------------------------------------
  Found 2 keys that may be unused:

    - oldFeatureButton
    - deprecatedLabel

  Note: This is based on static analysis and may have false positives.
```

**JSON Report** (`i18n-coverage-report.json`)

```json
{
  "summary": {
    "totalLanguages": 4,
    "totalKeys": 28,
    "missingTranslations": 0,
    "unusedKeys": 2
  },
  "languages": ["en", "es", "pt-BR", "ro"],
  "missingByLanguage": {},
  "unusedKeys": [
    "oldFeatureButton",
    "deprecatedLabel"
  ]
}
```

#### CI/CD Integration

Add to your CI pipeline to prevent incomplete translations from reaching production:

**GitHub Actions Example:**

```yaml
name: i18n Coverage Check

on:
  pull_request:
  push:
    branches: [main]

jobs:
  check-i18n:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Check i18n Coverage
        run: npm run check:i18n

      - name: Upload report
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: i18n-coverage-report
          path: i18n-coverage-report.json
```

#### Exit Codes

- `0`: All translations complete (success)
- `1`: Missing translations found (failure)

#### Best Practices

1. **Run Before Adding Translations**
   - Check coverage before adding new translation keys
   - Ensures all languages are updated together

2. **Regular Audits**
   - Run periodically to catch missing translations
   - Use `--unused` flag to identify cleanup opportunities

3. **Fix Missing Translations Immediately**
   - Missing translations hurt user experience
   - Update all languages when adding new features

4. **Review Unused Keys**
   - Unused keys indicate dead code or outdated translations
   - Clean up regularly to reduce bundle size

#### Troubleshooting

**Script can't find resources.ts:**
- Verify path in `RESOURCES_PATH` constant
- Ensure file exists at `lib/careers-i18n/resources.ts`

**False positives for unused keys:**
- Static analysis may miss dynamic key usage
- Review each unused key manually before removing
- Keys used in templates or dynamic content may not be detected

**Missing keys not detected:**
- Ensure all language objects have `translation` property
- Check that resources are properly exported as `const`
- Verify TypeScript object structure is correct

#### Scope

This validator is specifically designed for the **careers application** i18n (i18next-based). The main website does not use i18n.

For details on the careers i18n implementation, see `docs/CAREERS_I18N.md`.

---

## Adding New Scripts

1. Create TypeScript file in `scripts/` directory
2. Add shebang: `#!/usr/bin/env node`
3. Make executable: `chmod +x scripts/your-script.ts`
4. Add npm script to `package.json`:
   ```json
   {
     "scripts": {
       "your-command": "tsx scripts/your-script.ts"
     }
   }
   ```
5. Update this README with usage documentation

## Development

All scripts use `tsx` to execute TypeScript directly without compilation:

```bash
# Run any script directly
tsx scripts/your-script.ts

# With arguments
tsx scripts/your-script.ts --flag value

# Debug mode
node --inspect node_modules/.bin/tsx scripts/your-script.ts
```
