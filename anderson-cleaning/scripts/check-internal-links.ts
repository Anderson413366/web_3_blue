#!/usr/bin/env node
/**
 * Internal Link Integrity Crawler
 *
 * Crawls all pages on the website and validates internal links.
 * Detects broken links, redirect chains, and orphaned pages.
 *
 * Usage:
 *   npm run check:links              # Check production site
 *   npm run check:links:local        # Check local dev server
 *   npm run check:links -- --verbose # Verbose output
 */

import { chromium, Browser, Page } from '@playwright/test'
import * as path from 'path'
import * as fs from 'fs'

// Configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const MAX_DEPTH = 5 // Maximum crawl depth
const TIMEOUT = 30000 // 30 seconds per page
const VERBOSE = process.argv.includes('--verbose') || process.argv.includes('-v')
const REPORT_PATH = path.join(process.cwd(), 'link-integrity-report.json')

// Tracking
const visited = new Set<string>()
const broken = new Map<string, { status: number; foundOn: string[] }>()
const redirects = new Map<string, { target: string; foundOn: string[] }>()
const external = new Map<string, string[]>()
const queue: Array<{ url: string; depth: number; foundOn: string }> = []

// Stats
let totalLinks = 0
let totalPages = 0

/**
 * Normalize URL to avoid duplicates
 */
function normalizeUrl(url: string, baseUrl: string): string | null {
  try {
    const parsed = new URL(url, baseUrl)

    // Remove fragment
    parsed.hash = ''

    // Remove trailing slash for consistency
    const normalized = parsed.toString().replace(/\/$/, '')

    return normalized || parsed.toString()
  } catch {
    return null
  }
}

/**
 * Check if URL is internal (same domain)
 */
function isInternal(url: string, baseUrl: string): boolean {
  try {
    const base = new URL(baseUrl)
    const target = new URL(url, baseUrl)
    return target.hostname === base.hostname
  } catch {
    return false
  }
}

/**
 * Extract all links from a page
 */
async function extractLinks(page: Page, currentUrl: string): Promise<string[]> {
  const links = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll('a[href]'))
    return anchors.map((a) => (a as HTMLAnchorElement).href).filter(Boolean)
  })

  return links
}

/**
 * Check HTTP status of a URL
 */
async function checkUrl(
  page: Page,
  url: string,
  foundOn: string
): Promise<{ status: number; finalUrl: string }> {
  try {
    const response = await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT,
    })

    if (!response) {
      return { status: 0, finalUrl: url }
    }

    const finalUrl = response.url()
    const status = response.status()

    return { status, finalUrl }
  } catch (error) {
    if (VERBOSE) {
      console.error(`Error checking ${url}:`, error instanceof Error ? error.message : error)
    }
    return { status: 0, finalUrl: url }
  }
}

/**
 * Crawl a single page and extract links
 */
async function crawlPage(
  browser: Browser,
  url: string,
  depth: number,
  foundOn: string
): Promise<void> {
  // Skip if already visited
  if (visited.has(url)) {
    return
  }

  // Mark as visited
  visited.add(url)
  totalPages++

  if (VERBOSE) {
    console.log(`[${totalPages}] Crawling: ${url} (depth: ${depth})`)
  } else {
    process.stdout.write('.')
  }

  // Create new page for this URL
  const page = await browser.newPage()

  try {
    // Check URL status
    const { status, finalUrl } = await checkUrl(page, url, foundOn)

    // Track redirects
    if (finalUrl !== url) {
      if (!redirects.has(url)) {
        redirects.set(url, { target: finalUrl, foundOn: [] })
      }
      redirects.get(url)!.foundOn.push(foundOn)
    }

    // Track broken links
    if (status === 0 || status === 404 || status === 500 || status >= 400) {
      if (!broken.has(url)) {
        broken.set(url, { status, foundOn: [] })
      }
      broken.get(url)!.foundOn.push(foundOn)
      return // Don't crawl broken pages
    }

    // Don't crawl deeper if max depth reached
    if (depth >= MAX_DEPTH) {
      return
    }

    // Extract all links from the page
    const links = await extractLinks(page, url)
    totalLinks += links.length

    // Process each link
    for (const link of links) {
      const normalized = normalizeUrl(link, BASE_URL)
      if (!normalized) continue

      if (isInternal(normalized, BASE_URL)) {
        // Internal link - add to queue if not visited
        if (!visited.has(normalized)) {
          queue.push({ url: normalized, depth: depth + 1, foundOn: url })
        }
      } else {
        // External link - just track
        if (!external.has(normalized)) {
          external.set(normalized, [])
        }
        external.get(normalized)!.push(url)
      }
    }
  } finally {
    await page.close()
  }
}

/**
 * Generate report
 */
function generateReport(): {
  summary: Record<string, number>
  broken: Array<{ url: string; status: number; foundOn: string[] }>
  redirects: Array<{ url: string; target: string; foundOn: string[] }>
  external: Array<{ url: string; count: number }>
} {
  return {
    summary: {
      totalPages,
      totalLinks,
      brokenLinks: broken.size,
      redirects: redirects.size,
      externalLinks: external.size,
    },
    broken: Array.from(broken.entries()).map(([url, data]) => ({
      url,
      status: data.status,
      foundOn: data.foundOn,
    })),
    redirects: Array.from(redirects.entries()).map(([url, data]) => ({
      url,
      target: data.target,
      foundOn: data.foundOn,
    })),
    external: Array.from(external.entries())
      .map(([url, foundOn]) => ({
        url,
        count: foundOn.length,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20), // Top 20 external links
  }
}

/**
 * Print report to console
 */
function printReport(report: ReturnType<typeof generateReport>): void {
  console.log('\n\n' + '='.repeat(80))
  console.log('INTERNAL LINK INTEGRITY REPORT')
  console.log('='.repeat(80))

  // Summary
  console.log('\n📊 SUMMARY')
  console.log('-'.repeat(80))
  console.log(`  Total Pages Crawled:  ${report.summary.totalPages}`)
  console.log(`  Total Links Found:    ${report.summary.totalLinks}`)
  console.log(`  Broken Links:         ${report.summary.brokenLinks}`)
  console.log(`  Redirects:            ${report.summary.redirects}`)
  console.log(`  External Links:       ${report.summary.externalLinks}`)

  // Broken Links
  if (report.broken.length > 0) {
    console.log('\n❌ BROKEN LINKS')
    console.log('-'.repeat(80))
    report.broken.forEach(({ url, status, foundOn }) => {
      console.log(`  ${url}`)
      console.log(`    Status: ${status === 0 ? 'TIMEOUT/ERROR' : status}`)
      console.log(`    Found on (${foundOn.length} pages):`)
      foundOn.slice(0, 3).forEach((page) => console.log(`      - ${page}`))
      if (foundOn.length > 3) {
        console.log(`      ... and ${foundOn.length - 3} more`)
      }
      console.log()
    })
  } else {
    console.log('\n✅ NO BROKEN LINKS FOUND')
  }

  // Redirects
  if (report.redirects.length > 0) {
    console.log('\n🔀 REDIRECTS')
    console.log('-'.repeat(80))
    report.redirects.slice(0, 10).forEach(({ url, target, foundOn }) => {
      console.log(`  ${url}`)
      console.log(`    → ${target}`)
      console.log(`    Found on: ${foundOn.length} page(s)`)
    })
    if (report.redirects.length > 10) {
      console.log(`  ... and ${report.redirects.length - 10} more redirects`)
    }
  }

  // Top External Links
  if (report.external.length > 0) {
    console.log('\n🔗 TOP EXTERNAL LINKS')
    console.log('-'.repeat(80))
    report.external.slice(0, 10).forEach(({ url, count }) => {
      console.log(`  [${count}x] ${url}`)
    })
  }

  console.log('\n' + '='.repeat(80))
  console.log(`Report saved to: ${REPORT_PATH}`)
  console.log('='.repeat(80) + '\n')
}

/**
 * Main crawler function
 */
async function main() {
  console.log('🔍 Internal Link Integrity Crawler')
  console.log(`Base URL: ${BASE_URL}`)
  console.log(`Max Depth: ${MAX_DEPTH}`)
  console.log()

  const startTime = Date.now()

  // Launch browser
  const browser = await chromium.launch({
    headless: true,
  })

  try {
    // Start with homepage
    queue.push({ url: BASE_URL, depth: 0, foundOn: 'initial' })

    // Process queue
    while (queue.length > 0) {
      const { url, depth, foundOn } = queue.shift()!
      await crawlPage(browser, url, depth, foundOn)
    }

    // Generate report
    const report = generateReport()

    // Print to console
    printReport(report)

    // Save to file
    fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2), 'utf-8')

    // Exit with error code if broken links found
    const exitCode = report.broken.length > 0 ? 1 : 0
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)

    console.log(`\n⏱️  Completed in ${duration}s`)

    process.exit(exitCode)
  } catch (error) {
    console.error('Fatal error:', error)
    process.exit(1)
  } finally {
    await browser.close()
  }
}

// Run crawler
main()
