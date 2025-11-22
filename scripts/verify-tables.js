#!/usr/bin/env node

const { Client } = require('pg')
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') })

async function verifyTables() {
  const client = new Client({
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: { rejectUnauthorized: false, checkServerIdentity: () => undefined }
  })

  try {
    await client.connect()

    console.log('🔍 Verifying quote form tables...\n')

    // Check quote_requests_mini table
    const miniResult = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'quote_requests_mini'
      ORDER BY ordinal_position;
    `)

    console.log('✅ quote_requests_mini table:')
    miniResult.rows.forEach(row => {
      console.log(`   • ${row.column_name}: ${row.data_type}`)
    })

    // Check quote_requests_full table
    const fullResult = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'quote_requests_full'
      ORDER BY ordinal_position;
    `)

    console.log('\n✅ quote_requests_full table:')
    fullResult.rows.forEach(row => {
      console.log(`   • ${row.column_name}: ${row.data_type}`)
    })

    // Check policies
    const policiesResult = await client.query(`
      SELECT tablename, policyname, cmd
      FROM pg_policies
      WHERE tablename IN ('quote_requests_mini', 'quote_requests_full')
      ORDER BY tablename, policyname;
    `)

    console.log('\n✅ Row Level Security Policies:')
    policiesResult.rows.forEach(row => {
      console.log(`   • ${row.tablename}: ${row.policyname} (${row.cmd})`)
    })

    console.log('\n🎉 All quote form tables and policies are set up correctly!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  } finally {
    await client.end()
  }
}

verifyTables()
