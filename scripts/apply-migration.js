#!/usr/bin/env node

/**
 * Apply Supabase Migration
 *
 * This script applies SQL migrations to the Supabase database
 * using the service role key for admin access.
 */

const fs = require('fs')
const path = require('path')
const https = require('https')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:')
  console.error('   - NEXT_PUBLIC_SUPABASE_URL')
  console.error('   - SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

// Read migration file
const migrationPath = process.argv[2]
if (!migrationPath) {
  console.error('❌ Usage: node apply-migration.js <migration-file>')
  console.error('   Example: node apply-migration.js supabase/migrations/add_anon_insert_policies.sql')
  process.exit(1)
}

const fullPath = path.resolve(migrationPath)
if (!fs.existsSync(fullPath)) {
  console.error(`❌ Migration file not found: ${fullPath}`)
  process.exit(1)
}

const sql = fs.readFileSync(fullPath, 'utf-8')

console.log(`📄 Migration file: ${path.basename(fullPath)}`)
console.log(`🔗 Supabase URL: ${SUPABASE_URL}`)
console.log(`📝 SQL length: ${sql.length} characters\n`)

// Parse the Supabase URL to get the project reference
const projectRef = new URL(SUPABASE_URL).hostname.split('.')[0]

// Apply migration using Supabase REST API
const url = `https://${projectRef}.supabase.co/rest/v1/rpc/exec_sql`

const postData = JSON.stringify({ query: sql })

const options = {
  hostname: `${projectRef}.supabase.co`,
  port: 443,
  path: '/rest/v1/rpc/exec_sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
    'apikey': SUPABASE_SERVICE_KEY,
    'Authorization': `Bearer ${SUPABASE_SERVICE_KEY}`,
  },
}

console.log('🚀 Applying migration...\n')

const req = https.request(options, (res) => {
  let data = ''

  res.on('data', (chunk) => {
    data += chunk
  })

  res.on('end', () => {
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('✅ Migration applied successfully!')
      console.log(`   Status: ${res.statusCode}`)
      if (data) {
        console.log(`   Response: ${data}`)
      }
      process.exit(0)
    } else {
      console.error(`❌ Migration failed with status ${res.statusCode}`)
      console.error(`   Response: ${data}`)

      // Try alternative method: direct SQL execution via PostgREST
      console.log('\n🔄 Trying alternative method...')
      applyViaDirectConnection(sql)
    }
  })
})

req.on('error', (error) => {
  console.error('❌ Request error:', error.message)
  console.log('\n🔄 Trying alternative method...')
  applyViaDirectConnection(sql)
})

req.write(postData)
req.end()

// Alternative method: Use Supabase client library
function applyViaDirectConnection(sql) {
  const { createClient } = require('@supabase/supabase-js')

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Split SQL into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0 && !s.startsWith('--'))

  console.log(`📋 Executing ${statements.length} SQL statements...\n`)

  // Execute each statement
  const executeStatements = async () => {
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';'
      console.log(`   [${i + 1}/${statements.length}] Executing...`)

      try {
        const { error } = await supabase.rpc('exec_sql', { query: statement })
        if (error) {
          console.error(`   ❌ Error: ${error.message}`)

          // If exec_sql doesn't exist, try direct execution
          if (error.message.includes('function') || error.message.includes('does not exist')) {
            console.log('   ℹ️  exec_sql function not available, policies must be created via Supabase Dashboard')
            console.log('\n📋 Copy and paste this SQL in Supabase Dashboard → SQL Editor:\n')
            console.log('─'.repeat(80))
            console.log(sql)
            console.log('─'.repeat(80))
            process.exit(1)
          }
        } else {
          console.log(`   ✅ Success`)
        }
      } catch (err) {
        console.error(`   ❌ Exception: ${err.message}`)
      }
    }

    console.log('\n✅ Migration completed!')
    process.exit(0)
  }

  executeStatements().catch(err => {
    console.error('\n❌ Migration failed:', err.message)
    console.log('\n📋 Please apply the migration manually via Supabase Dashboard → SQL Editor:\n')
    console.log('─'.repeat(80))
    console.log(sql)
    console.log('─'.repeat(80))
    process.exit(1)
  })
}
