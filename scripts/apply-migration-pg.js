#!/usr/bin/env node

/**
 * Apply Supabase Migration via PostgreSQL
 *
 * This script applies SQL migrations directly to the PostgreSQL database
 * using the non-pooling connection for DDL statements (CREATE POLICY).
 */

const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') })

const DATABASE_URL = process.env.POSTGRES_URL_NON_POOLING

if (!DATABASE_URL) {
  console.error('❌ Missing POSTGRES_URL_NON_POOLING environment variable')
  process.exit(1)
}

// Read migration file
const migrationPath = process.argv[2]
if (!migrationPath) {
  console.error('❌ Usage: node apply-migration-pg.js <migration-file>')
  console.error('   Example: node apply-migration-pg.js supabase/migrations/add_anon_insert_policies.sql')
  process.exit(1)
}

const fullPath = path.resolve(migrationPath)
if (!fs.existsSync(fullPath)) {
  console.error(`❌ Migration file not found: ${fullPath}`)
  process.exit(1)
}

const sql = fs.readFileSync(fullPath, 'utf-8')

console.log(`📄 Migration file: ${path.basename(fullPath)}`)
console.log(`🔗 Database: ${DATABASE_URL.split('@')[1].split('?')[0]}`)
console.log(`📝 SQL length: ${sql.length} characters\n`)

async function applyMigration() {
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
      checkServerIdentity: () => undefined
    }
  })

  try {
    console.log('🔌 Connecting to database...')
    await client.connect()
    console.log('✅ Connected\n')

    console.log('🚀 Applying migration...')
    await client.query(sql)
    console.log('✅ Migration applied successfully!\n')

    // Verify policies were created
    console.log('🔍 Verifying policies...')
    const result = await client.query(`
      SELECT schemaname, tablename, policyname, roles
      FROM pg_policies
      WHERE schemaname = 'public'
        AND policyname LIKE '%anonymous%'
      ORDER BY tablename, policyname;
    `)

    if (result.rows.length > 0) {
      console.log(`✅ Found ${result.rows.length} anonymous policies:\n`)
      result.rows.forEach(row => {
        console.log(`   • ${row.tablename}: ${row.policyname}`)
        console.log(`     Roles: ${row.roles.join(', ')}`)
      })
    } else {
      console.log('⚠️  No anonymous policies found (this may be expected if using different naming)')
    }

  } catch (error) {
    console.error('❌ Migration failed:', error.message)
    if (error.stack) {
      console.error('\nStack trace:')
      console.error(error.stack)
    }
    process.exit(1)
  } finally {
    await client.end()
    console.log('\n🔌 Database connection closed')
  }
}

applyMigration()
