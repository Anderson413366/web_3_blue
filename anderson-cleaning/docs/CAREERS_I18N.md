# Careers Internationalization (i18n) Documentation

Complete guide to the multilingual careers application implementation.

## Table of Contents

- [Overview](#overview)
- [Supported Languages](#supported-languages)
- [Implementation Details](#implementation-details)
- [Translation Files](#translation-files)
- [Adding a New Language](#adding-a-new-language)
- [URL Structure](#url-structure)
- [Language Persistence](#language-persistence)
- [Email Localization](#email-localization)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Scope

**IMPORTANT:** Only the `/apply` route (careers application) is multilingual. The rest of the website is English-only.

### Why This Approach?

Anderson Cleaning's service area (Western MA & Northern CT) has diverse workforce demographics:

- Spanish speakers (construction, facilities)
- Brazilian Portuguese speakers (housekeeping, facilities)
- Romanian speakers (labor, facilities)

Offering multilingual job applications increases applicant pool diversity and reduces language barriers to employment.

### Architecture Decision

**Scoped i18n (not site-wide):**

- Uses `i18next` for translations
- Only loads on `/[lang]/apply` routes
- Does not affect main website bundle size
- Simpler than Next.js i18n routing (which is deprecated in App Router)

---

## Supported Languages

| Language             | Code    | Native Name        | Target Audience     |
| -------------------- | ------- | ------------------ | ------------------- |
| English              | `en`    | English            | Primary language    |
| Spanish              | `es`    | Español            | Hispanic community  |
| Brazilian Portuguese | `pt-BR` | Português (Brasil) | Brazilian community |
| Romanian             | `ro`    | Română             | Romanian community  |

### Default Language

**English (`en`)** is the default/fallback language.

**Logic:**

1. Check URL parameter: `?lang=es`
2. Check localStorage: `careersLanguage`
3. Fallback to English

---

## Implementation Details

### File Structure

```
app/
└── [lang]/
    └── apply/
        ├── layout.tsx           # i18n provider wrapper
        └── page.tsx             # Application form

components/
└── careers/
    ├── LanguageSwitcher.tsx    # Language selection UI
    ├── CareersForm.tsx          # Main form component
    └── SuccessPage.tsx         # Success confirmation

lib/
└── careers-i18n/
    ├── index.ts                # i18next configuration
    ├── en.json                 # English translations (170+ keys)
    ├── es.json                 # Spanish translations
    ├── pt-BR.json              # Portuguese translations
    └── ro.json                 # Romanian translations
```

### i18next Configuration

**File:** `lib/careers-i18n/index.ts`

```typescript
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from './en.json'
import es from './es.json'
import ptBR from './pt-BR.json'
import ro from './ro.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    'pt-BR': { translation: ptBR },
    ro: { translation: ro },
  },
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, // React already escapes
  },
})

export default i18n
```

### Usage in Components

```typescript
import { useTranslation } from 'react-i18next'

function CareersForm() {
  const { t } = useTranslation()

  return (
    <form>
      <label>{t('form.name.label')}</label>
      <input
        placeholder={t('form.name.placeholder')}
        aria-label={t('form.name.aria')}
      />
      <button>{t('form.submit')}</button>
    </form>
  )
}
```

---

## Translation Files

### File Format

**JSON structure:**

```json
{
  "page": {
    "title": "Careers - Join Our Team",
    "subtitle": "Apply for a position at Anderson Cleaning"
  },
  "form": {
    "name": {
      "label": "Full Name",
      "placeholder": "Enter your full name",
      "aria": "Your full name"
    },
    "submit": "Submit Application"
  },
  "errors": {
    "required": "This field is required",
    "emailInvalid": "Please enter a valid email address"
  }
}
```

### Translation Keys

**Total Keys:** ~170

**Categories:**

1. **Page Content** (~20 keys)
   - Titles, headings, descriptions
   - Example: `page.title`, `page.heroSubtitle`

2. **Form Labels** (~30 keys)
   - Input labels, placeholders
   - Example: `form.name.label`, `form.email.placeholder`

3. **Validation Messages** (~40 keys)
   - Error messages, warnings
   - Example: `errors.required`, `errors.phoneInvalid`

4. **Success/Error Pages** (~20 keys)
   - Confirmation messages
   - Example: `success.title`, `error.tryAgain`

5. **UI Elements** (~30 keys)
   - Buttons, links, tooltips
   - Example: `ui.back`, `ui.next`, `ui.upload`

6. **ARIA Labels** (~30 keys)
   - Accessibility labels
   - Example: `aria.closeButton`, `aria.languageSelector`

### Complete Translation File Example

See `lib/careers-i18n/en.json` for full reference. Key sections:

```json
{
  "page": {
    "title": "Careers",
    "subtitle": "Join Our Team",
    "description": "Anderson Cleaning is hiring..."
  },
  "form": {
    "personalInfo": "Personal Information",
    "name": {
      "label": "Full Name",
      "placeholder": "John Doe"
    },
    "email": {
      "label": "Email Address",
      "placeholder": "john@example.com"
    },
    "phone": {
      "label": "Phone Number",
      "placeholder": "(555) 123-4567"
    },
    "resume": {
      "label": "Upload Resume",
      "button": "Choose File",
      "accepted": "PDF or DOC (max 5MB)"
    },
    "submit": "Submit Application"
  },
  "validation": {
    "required": "This field is required",
    "emailInvalid": "Invalid email address",
    "phoneInvalid": "Invalid phone number",
    "fileTooBig": "File must be smaller than 5MB",
    "fileTypeInvalid": "Only PDF and DOC files allowed"
  },
  "success": {
    "title": "Application Submitted!",
    "message": "Thank you for applying. We'll review your application and get back to you soon.",
    "emailSent": "A confirmation email has been sent to {{email}}."
  },
  "error": {
    "title": "Submission Failed",
    "message": "There was an error submitting your application. Please try again.",
    "tryAgain": "Try Again"
  }
}
```

---

## Adding a New Language

### Step 1: Create Translation File

```bash
# Create new translation file
cp lib/careers-i18n/en.json lib/careers-i18n/fr.json
```

### Step 2: Translate Content

Edit `fr.json` and translate all values (not keys):

```json
{
  "page": {
    "title": "Carrières", // ✅ Translate value
    "subtitle": "Rejoignez Notre Équipe"
  },
  "form": {
    "name": {
      // ❌ DO NOT translate key
      "label": "Nom Complet", // ✅ Translate value
      "placeholder": "Jean Dupont"
    }
  }
}
```

### Step 3: Add to i18next Config

**File:** `lib/careers-i18n/index.ts`

```typescript
import fr from './fr.json'

i18n.init({
  resources: {
    en: { translation: en },
    es: { translation: es },
    'pt-BR': { translation: ptBR },
    ro: { translation: ro },
    fr: { translation: fr }, // ← Add here
  },
})
```

### Step 4: Update Language Switcher

**File:** `components/careers/LanguageSwitcher.tsx`

```typescript
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
  { code: 'ro', name: 'Română', flag: '🇷🇴' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }, // ← Add here
]
```

### Step 5: Test

```bash
# Navigate to new language
http://localhost:3000/fr/apply

# Verify all text is translated
# Check form validation messages
# Test email confirmation (if localized)
```

---

## URL Structure

### Routes

| Language   | URL            | Description          |
| ---------- | -------------- | -------------------- |
| English    | `/en/apply`    | Default language     |
| Spanish    | `/es/apply`    | Spanish version      |
| Portuguese | `/pt-BR/apply` | Brazilian Portuguese |
| Romanian   | `/ro/apply`    | Romanian version     |

### Dynamic Route

**Implemented as:** `app/[lang]/apply/page.tsx`

**Route parameter:** `lang` can be `en`, `es`, `pt-BR`, or `ro`

**Language Detection:**

```typescript
// app/[lang]/apply/page.tsx
export default function ApplyPage({ params }: { params: { lang: string } }) {
  const lang = params.lang || 'en'

  // Initialize i18n with language
  i18n.changeLanguage(lang)

  return <CareersForm />
}
```

### Querystring Fallback

If user visits `/apply` (no language), redirect to `/en/apply`:

```typescript
// next.config.js
async rewrites() {
  return [
    {
      source: '/apply',
      destination: '/en/apply',
    }
  ]
}
```

---

## Language Persistence

### Strategy

Store selected language in:

1. **URL** (primary): `/es/apply`
2. **localStorage** (secondary): `careersLanguage`

### Implementation

**Save to localStorage:**

```typescript
function changeLanguage(lang: string) {
  i18n.changeLanguage(lang)
  localStorage.setItem('careersLanguage', lang)
  window.history.pushState({}, '', `/${lang}/apply`)
}
```

**Load from localStorage:**

```typescript
useEffect(() => {
  const savedLang = localStorage.getItem('careersLanguage')
  if (savedLang && savedLang !== currentLang) {
    i18n.changeLanguage(savedLang)
  }
}, [])
```

### Language Switcher

**Component:** `components/careers/LanguageSwitcher.tsx`

**Features:**

- Dropdown or button group
- Current language highlighted
- Persist selection on page reload
- Update URL when changed

**Example:**

```typescript
function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleChange = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('careersLanguage', lang)
    window.history.pushState({}, '', `/${lang}/apply`)
  }

  return (
    <select value={i18n.language} onChange={(e) => handleChange(e.target.value)}>
      <option value="en">🇺🇸 English</option>
      <option value="es">🇪🇸 Español</option>
      <option value="pt-BR">🇧🇷 Português</option>
      <option value="ro">🇷🇴 Română</option>
    </select>
  )
}
```

---

## Email Localization

### Email Templates

**File:** `lib/careers/emails.ts`

```typescript
const emailTemplates = {
  en: {
    subject: 'Thank you for your application',
    body: `
      Dear {{name}},

      Thank you for applying to Anderson Cleaning.
      We have received your application for the {{position}} position.

      We will review your application and contact you within 5-7 business days.

      Best regards,
      Anderson Cleaning HR Team
    `,
  },
  es: {
    subject: 'Gracias por su solicitud',
    body: `
      Estimado/a {{name}},

      Gracias por postularse a Anderson Cleaning.
      Hemos recibido su solicitud para el puesto de {{position}}.

      Revisaremos su solicitud y nos comunicaremos con usted dentro de 5-7 días hábiles.

      Saludos cordiales,
      Equipo de RRHH de Anderson Cleaning
    `,
  },
  'pt-BR': {
    subject: 'Obrigado pela sua candidatura',
    body: `
      Prezado/a {{name}},

      Obrigado por se candidatar à Anderson Cleaning.
      Recebemos sua candidatura para a posição de {{position}}.

      Revisaremos sua candidatura e entraremos em contato dentro de 5-7 dias úteis.

      Atenciosamente,
      Equipe de RH da Anderson Cleaning
    `,
  },
  ro: {
    subject: 'Mulțumim pentru aplicație',
    body: `
      Stimate/ă {{name}},

      Mulțumim că ați aplicat la Anderson Cleaning.
      Am primit aplicația dumneavoastră pentru poziția de {{position}}.

      Vom revizui aplicația și vă vom contacta în 5-7 zile lucrătoare.

      Cu stimă,
      Echipa HR Anderson Cleaning
    `,
  },
}
```

### Sending Localized Emails

**API Route:** `app/api/apply/route.ts`

```typescript
export async function POST(request: Request) {
  const { name, email, position, language } = await request.json()

  // Get template for user's language
  const template = emailTemplates[language] || emailTemplates.en

  // Replace placeholders
  const body = template.body.replace('{{name}}', name).replace('{{position}}', position)

  // Send email
  await resend.send({
    to: email,
    subject: template.subject,
    html: body,
  })
}
```

---

## Testing

### Manual Testing Checklist

**For Each Language:**

- [ ] Visit `/{lang}/apply`
- [ ] All text is translated (no English fallbacks)
- [ ] Form labels in correct language
- [ ] Placeholder text in correct language
- [ ] Validation errors in correct language
- [ ] Success message in correct language
- [ ] Email confirmation in correct language

**Language Switcher:**

- [ ] Dropdown shows all languages
- [ ] Clicking language updates URL
- [ ] Page content changes immediately
- [ ] Selection persists on refresh

**Edge Cases:**

- [ ] Invalid language code (`/xx/apply`) → redirect to `/en/apply`
- [ ] Missing translation key → fallback to English
- [ ] Special characters render correctly (ñ, ã, ă, etc.)

### Automated Testing

**Playwright E2E Test:**

```typescript
// tests/e2e/careers-i18n.spec.ts
test('language switching works', async ({ page }) => {
  await page.goto('/en/apply')

  // Check English content
  await expect(page.locator('h1')).toContainText('Careers')

  // Switch to Spanish
  await page.selectOption('select[name="language"]', 'es')

  // Check Spanish content
  await expect(page.locator('h1')).toContainText('Carreras')

  // Verify URL changed
  expect(page.url()).toContain('/es/apply')
})

test('form validation in Spanish', async ({ page }) => {
  await page.goto('/es/apply')

  // Submit empty form
  await page.click('button[type="submit"]')

  // Check Spanish error message
  await expect(page.locator('.error')).toContainText('Este campo es obligatorio')
})
```

---

## Troubleshooting

### Issue: Translations not loading

**Symptom:** Page shows translation keys instead of text (e.g., `form.name.label`)

**Solution:**

1. Check i18next is initialized: `i18n.isInitialized`
2. Verify language file exists: `lib/careers-i18n/{lang}.json`
3. Check JSON syntax (no trailing commas)
4. Clear cache: `rm -rf .next && npm run dev`

### Issue: Language not persisting

**Symptom:** Page reverts to English on refresh

**Solution:**

1. Check localStorage is working: `localStorage.getItem('careersLanguage')`
2. Verify `useEffect` is running to load saved language
3. Check URL parameter is being read correctly

### Issue: Mixed languages

**Symptom:** Some text in one language, some in another

**Solution:**

1. Check for hardcoded strings (should use `t()` function)
2. Verify all keys exist in translation file
3. Check fallback language is set correctly

### Issue: Special characters broken

**Symptom:** Characters like ñ, ã, ă display as �

**Solution:**

1. Ensure JSON files are UTF-8 encoded
2. Check HTML has charset: `<meta charset="UTF-8">`
3. Verify server response header: `Content-Type: text/html; charset=utf-8`

### Issue: Email in wrong language

**Symptom:** User selects Spanish but receives English email

**Solution:**

1. Check `language` field is sent in API request
2. Verify email template exists for that language
3. Check fallback logic: `emailTemplates[language] || emailTemplates.en`

---

## Best Practices

### Translation Quality

1. **Native Speakers:** Have native speakers review translations
2. **Context:** Provide context to translators (screenshot, description)
3. **Consistency:** Use consistent terminology across languages
4. **Tone:** Maintain professional yet friendly tone
5. **Testing:** Test with native speakers before launch

### Performance

1. **Code Splitting:** i18n only loads on careers pages
2. **Lazy Loading:** Load translations on demand (if large)
3. **Caching:** Cache translations in localStorage (optional)
4. **Bundle Size:** Monitor i18n library size

### Accessibility

1. **Language Attribute:** Set `<html lang="es">` based on selection
2. **Screen Readers:** Announce language changes
3. **Keyboard Nav:** Language switcher keyboard accessible
4. **ARIA Labels:** Translate ARIA labels too

### Maintenance

1. **Version Control:** Track translation changes in git
2. **Documentation:** Document translation keys and meanings
3. **Updates:** Keep translations in sync when adding features
4. **Audits:** Periodically review for missing/outdated translations

---

## Future Enhancements

### Potential Improvements

1. **Auto-Detection:** Detect browser language

   ```typescript
   const browserLang = navigator.language.split('-')[0]
   ```

2. **Translation Management:** Use service like Lokalise or Crowdin

3. **Pluralization:** Handle plural forms correctly

   ```json
   {
     "items": {
       "one": "{{count}} item",
       "other": "{{count}} items"
     }
   }
   ```

4. **Date/Number Formatting:** Locale-specific formats

   ```typescript
   new Intl.DateTimeFormat(language).format(date)
   ```

5. **RTL Support:** If adding Arabic or Hebrew
   ```css
   [dir='rtl'] {
     text-align: right;
   }
   ```

---

## Resources

- **i18next Docs:** https://www.i18next.com/
- **React i18next:** https://react.i18next.com/
- **Translation Best Practices:** https://www.w3.org/International/
- **WCAG i18n:** https://www.w3.org/WAI/WCAG21/Understanding/language-of-page

---

**Document Version:** 1.0
**Last Updated:** November 2024
**Maintained By:** Development Team

For questions about translations, contact: translations@andersoncleaning.com
