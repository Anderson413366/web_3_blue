# 🚀 Supabase Database Setup - FINAL STEP

**Status:** Supabase connected via Vercel ✅
**Next:** Create database tables (2 minutes)

---

## 📋 Quick Setup (Copy & Paste SQL)

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase project dashboard
2. Click **"SQL Editor"** in the left sidebar
3. Click **"New Query"**

### Step 2: Run the Schema

Copy the ENTIRE contents of `supabase/schema.sql` and paste into the SQL Editor, then click **"Run"**.

**OR** use this direct link format:
- Go to: `https://supabase.com/dashboard/project/YOUR_PROJECT_ID/sql/new`
- Paste the SQL from `supabase/schema.sql`
- Click **"Run"**

### Step 3: Verify Tables Created

After running the SQL, go to **"Table Editor"** in Supabase and you should see:

✅ `contact_submissions`
✅ `quote_requests`
✅ `career_applications`
✅ `newsletter_subscriptions`

---

## 🎯 What This Creates

### Tables:
1. **contact_submissions** - Contact form data
2. **quote_requests** - Quote requests (all 4 steps)
3. **career_applications** - Job applications
4. **newsletter_subscriptions** - Newsletter signups

### Features:
- ✅ UUID primary keys
- ✅ Automatic timestamps
- ✅ Indexed for fast queries
- ✅ Row Level Security enabled
- ✅ Helper views for recent data

---

## ✅ Once Tables Are Created

Tell me "Tables created!" and I'll:
1. Update all 4 API routes to save to Supabase
2. Deploy to production
3. Test all forms
4. Show you the Supabase dashboard with data

---

**Ready?** Just run the SQL and let me know when done!
