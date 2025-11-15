#!/usr/bin/env node
/**
 * i18n Coverage Validation Script
 *
 * Validates translation coverage for careers application i18n.
 * Detects missing translations, unused keys, and ensures consistency.
 *
 * Usage:
 *   npm run check:i18n              # Check coverage
 *   npm run check:i18n -- --verbose # Verbose output
 *   npm run check:i18n -- --unused  # Also check for unused keys
 */

import * as fs from 'fs'
import * as path from 'path'

// Configuration
const RESOURCES_PATH = path.join(process.cwd(), 'lib/careers-i18n/resources.ts')
const SOURCE_DIRS = ['app', 'components', 'lib']
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v')
const CHECK_UNUSED = process.argv.includes('--unused')
const REPORT_PATH = path.join(process.cwd(), 'i18n-coverage-report.json')

// Types
interface TranslationKeys {
  [key: string]: string | TranslationKeys
}

interface LanguageKeys {
  [language: string]: Set<string>
}

interface CoverageReport {
  summary: {
    totalLanguages: number
    totalKeys: number
    missingTranslations: number
    unusedKeys: number
  }
  languages: string[]
  missingByLanguage: {
    [language: string]: string[]
  }
  unusedKeys?: string[]
  keyUsage?: {
    [key: string]: {
      used: boolean
      locations: string[]
    }
  }
}

/**
 * Extract all translation keys from a nested object
 */
function extractKeys(obj: any, prefix = ''): string[] {
  const keys: string[] = []

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      // Recursively extract nested keys
      keys.push(...extractKeys(value, fullKey))
    } else {
      // Leaf node - this is a translation key
      keys.push(fullKey)
    }
  }

  return keys
}

/**
 * Parse resources.ts file and extract translation keys per language
 */
function parseResourcesFile(): LanguageKeys {
  try {
    // Read the file
    const content = fs.readFileSync(RESOURCES_PATH, 'utf-8')

    // Extract the resources object using regex
    // This is a simple approach - for production, use actual TS parsing
    const resourcesMatch = content.match(/export const resources = ({[\s\S]+?}) as const/)

    if (!resourcesMatch) {
      throw new Error('Could not find resources export in resources.ts')
    }

    // Use eval to parse (note: this is safe since we control the file)
    // In production, use a proper TS parser like @babel/parser
    const resourcesCode = resourcesMatch[1]
    const resources = eval(`(${resourcesCode})`)

    const languageKeys: LanguageKeys = {}

    // Extract keys for each language
    for (const [lang, data] of Object.entries(resources)) {
      const translationData = (data as any).translation || data
      const keys = extractKeys(translationData)
      languageKeys[lang] = new Set(keys)

      if (VERBOSE) {
        console.log(`[${lang}] Found ${keys.length} translation keys`)
      }
    }

    return languageKeys
  } catch (error) {
    console.error('Error parsing resources file:', error)
    throw error
  }
}

/**
 * Find missing translations across languages
 */
function findMissingTranslations(languageKeys: LanguageKeys): {
  [language: string]: string[]
} {
  const languages = Object.keys(languageKeys)
  const missingByLanguage: { [language: string]: string[] } = {}

  // Get all unique keys across all languages
  const allKeys = new Set<string>()
  for (const keys of Object.values(languageKeys)) {
    for (const key of keys) {
      allKeys.add(key)
    }
  }

  // For each language, find missing keys
  for (const lang of languages) {
    const langKeys = languageKeys[lang]
    const missing: string[] = []

    for (const key of allKeys) {
      if (!langKeys.has(key)) {
        missing.push(key)
      }
    }

    if (missing.length > 0) {
      missingByLanguage[lang] = missing.sort()
    }
  }

  return missingByLanguage
}

/**
 * Search for translation key usage in source files
 */
async function findKeyUsage(keys: Set<string>): Promise<{
  [key: string]: { used: boolean; locations: string[] }
}> {
  const keyUsage: { [key: string]: { used: boolean; locations: string[] } } = {}

  // Initialize all keys as unused
  for (const key of keys) {
    keyUsage[key] = { used: false, locations: [] }
  }

  // Recursively search source directories
  for (const dir of SOURCE_DIRS) {
    const dirPath = path.join(process.cwd(), dir)
    if (!fs.existsSync(dirPath)) continue

    await searchDirectory(dirPath, keys, keyUsage)
  }

  return keyUsage
}

/**
 * Recursively search directory for key usage
 */
async function searchDirectory(
  dirPath: string,
  keys: Set<string>,
  keyUsage: { [key: string]: { used: boolean; locations: string[] } }
): Promise<void> {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name)

    if (entry.isDirectory()) {
      // Skip node_modules and .next
      if (entry.name === 'node_modules' || entry.name === '.next') continue
      await searchDirectory(fullPath, keys, keyUsage)
    } else if (
      entry.isFile() &&
      (entry.name.endsWith('.ts') ||
        entry.name.endsWith('.tsx') ||
        entry.name.endsWith('.js') ||
        entry.name.endsWith('.jsx'))
    ) {
      // Search file for key usage
      const content = fs.readFileSync(fullPath, 'utf-8')
      const relativePath = path.relative(process.cwd(), fullPath)

      // Look for t('key') or t("key") patterns
      for (const key of keys) {
        // Escape special regex characters in key
        const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const regex = new RegExp(`t\\s*\\(\\s*['"\`]${escapedKey}['"\`]\\s*\\)`, 'g')

        if (regex.test(content)) {
          keyUsage[key].used = true
          keyUsage[key].locations.push(relativePath)
        }
      }
    }
  }
}

/**
 * Generate coverage report
 */
function generateReport(
  languageKeys: LanguageKeys,
  missingByLanguage: { [language: string]: string[] },
  keyUsage?: { [key: string]: { used: boolean; locations: string[] } }
): CoverageReport {
  const languages = Object.keys(languageKeys)
  const totalMissing = Object.values(missingByLanguage).reduce((sum, arr) => sum + arr.length, 0)

  // Get all unique keys
  const allKeys = new Set<string>()
  for (const keys of Object.values(languageKeys)) {
    for (const key of keys) {
      allKeys.add(key)
    }
  }

  let unusedKeys: string[] = []
  if (keyUsage) {
    unusedKeys = Object.entries(keyUsage)
      .filter(([_, data]) => !data.used)
      .map(([key]) => key)
      .sort()
  }

  return {
    summary: {
      totalLanguages: languages.length,
      totalKeys: allKeys.size,
      missingTranslations: totalMissing,
      unusedKeys: unusedKeys.length,
    },
    languages,
    missingByLanguage,
    unusedKeys: keyUsage ? unusedKeys : undefined,
    keyUsage,
  }
}

/**
 * Print report to console
 */
function printReport(report: CoverageReport): void {
  console.log('\n' + '='.repeat(80))
  console.log('i18n COVERAGE REPORT - Careers Application')
  console.log('='.repeat(80))

  // Summary
  console.log('\n📊 SUMMARY')
  console.log('-'.repeat(80))
  console.log(`  Supported Languages:   ${report.summary.totalLanguages}`)
  console.log(`  Languages:             ${report.languages.join(', ')}`)
  console.log(`  Total Translation Keys: ${report.summary.totalKeys}`)
  console.log(`  Missing Translations:   ${report.summary.missingTranslations}`)
  if (report.summary.unusedKeys !== undefined) {
    console.log(`  Unused Keys:            ${report.summary.unusedKeys}`)
  }

  // Missing translations
  if (report.summary.missingTranslations > 0) {
    console.log('\n❌ MISSING TRANSLATIONS')
    console.log('-'.repeat(80))

    for (const [lang, missing] of Object.entries(report.missingByLanguage)) {
      console.log(`\n  [${lang}] Missing ${missing.length} translations:`)
      missing.slice(0, 10).forEach((key) => console.log(`    - ${key}`))
      if (missing.length > 10) {
        console.log(`    ... and ${missing.length - 10} more`)
      }
    }
  } else {
    console.log('\n✅ ALL TRANSLATIONS COMPLETE')
  }

  // Unused keys
  if (report.unusedKeys && report.unusedKeys.length > 0) {
    console.log('\n⚠️  UNUSED TRANSLATION KEYS')
    console.log('-'.repeat(80))
    console.log(`  Found ${report.unusedKeys.length} keys that may be unused:\n`)
    report.unusedKeys.slice(0, 20).forEach((key) => console.log(`    - ${key}`))
    if (report.unusedKeys.length > 20) {
      console.log(`    ... and ${report.unusedKeys.length - 20} more`)
    }
    console.log('\n  Note: This is based on static analysis and may have false positives.')
  }

  // Key usage details (verbose only)
  if (VERBOSE && report.keyUsage) {
    console.log('\n📝 KEY USAGE DETAILS')
    console.log('-'.repeat(80))

    const usedKeys = Object.entries(report.keyUsage).filter(([_, data]) => data.used)
    console.log(`\n  Used keys: ${usedKeys.length}/${Object.keys(report.keyUsage).length}`)

    if (usedKeys.length > 0) {
      console.log('\n  Sample usage:')
      usedKeys.slice(0, 5).forEach(([key, data]) => {
        console.log(`    ${key}`)
        data.locations.slice(0, 2).forEach((loc) => console.log(`      - ${loc}`))
        if (data.locations.length > 2) {
          console.log(`      ... ${data.locations.length - 2} more`)
        }
      })
    }
  }

  console.log('\n' + '='.repeat(80))
  console.log(`Report saved to: ${REPORT_PATH}`)
  console.log('='.repeat(80) + '\n')
}

/**
 * Main function
 */
async function main() {
  console.log('🔍 i18n Coverage Validator')
  console.log(`Resources: ${RESOURCES_PATH}`)
  if (CHECK_UNUSED) {
    console.log('Checking for unused keys...')
  }
  console.log()

  const startTime = Date.now()

  try {
    // Parse resources file
    const languageKeys = parseResourcesFile()

    // Find missing translations
    const missingByLanguage = findMissingTranslations(languageKeys)

    // Find unused keys (optional)
    let keyUsage: { [key: string]: { used: boolean; locations: string[] } } | undefined

    if (CHECK_UNUSED) {
      console.log('Scanning source files for key usage...')
      const allKeys = new Set<string>()
      for (const keys of Object.values(languageKeys)) {
        for (const key of keys) {
          allKeys.add(key)
        }
      }
      keyUsage = await findKeyUsage(allKeys)
    }

    // Generate report
    const report = generateReport(languageKeys, missingByLanguage, keyUsage)

    // Print to console
    printReport(report)

    // Save to file
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8')

    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`⏱️  Completed in ${duration}s\n`)

    // Exit with error code if there are missing translations
    const exitCode = report.summary.missingTranslations > 0 ? 1 : 0
    process.exit(exitCode)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  }
}

// Run validator
main()
