#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function verifyStorage() {
  try {
    console.log('🔍 Checking Supabase Storage buckets...\n')

    const { data: buckets, error } = await supabase.storage.listBuckets()

    if (error) {
      console.error('❌ Error listing buckets:', error.message)
      process.exit(1)
    }

    console.log('📦 Available buckets:')
    buckets.forEach(bucket => {
      console.log(`   • ${bucket.name} (${bucket.public ? 'public' : 'private'})`)
    })

    const resumesBucket = buckets.find(b => b.name === 'resumes')
    if (resumesBucket) {
      console.log('\n✅ "resumes" bucket exists and is ready for uploads')
    } else {
      console.log('\n⚠️  "resumes" bucket not found')
      console.log('📝 Creating "resumes" bucket...')

      const { data, error: createError } = await supabase.storage.createBucket('resumes', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
      })

      if (createError) {
        console.error('❌ Error creating bucket:', createError.message)
        console.log('\n📋 Please create the bucket manually in Supabase Dashboard → Storage')
        process.exit(1)
      }

      console.log('✅ "resumes" bucket created successfully!')
    }

    console.log('\n🎉 Storage is configured correctly!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

verifyStorage()
