-- =====================================================
-- Anderson Cleaning - Database Schema
-- =====================================================
-- Created: 2025-11-17
-- Purpose: Store form submissions from website
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. CONTACT SUBMISSIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.contact_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Contact Info
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    message TEXT NOT NULL,

    -- Metadata
    source_page TEXT,
    ip_address TEXT,
    user_agent TEXT
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON public.contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(email);

-- Row Level Security
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything
CREATE POLICY "Service role can do everything on contact_submissions"
    ON public.contact_submissions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- 2. QUOTE REQUESTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.quote_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Step 1: Company Info
    company_name TEXT NOT NULL,
    contact_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,

    -- Step 2: Facility Info
    facility_type TEXT NOT NULL,
    square_footage TEXT NOT NULL,
    num_restrooms TEXT,
    num_floors TEXT,
    address TEXT,

    -- Step 3: Services
    services TEXT[] NOT NULL,
    cleaning_frequency TEXT NOT NULL,
    special_requirements TEXT,

    -- Step 4: Additional Info
    start_date TEXT,
    current_provider TEXT,
    budget_range TEXT,
    how_heard TEXT,
    additional_notes TEXT,

    -- Metadata
    source_page TEXT,
    ip_address TEXT,
    user_agent TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON public.quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_email ON public.quote_requests(email);
CREATE INDEX IF NOT EXISTS idx_quote_requests_company ON public.quote_requests(company_name);

-- Row Level Security
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on quote_requests"
    ON public.quote_requests
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- 3. CAREER APPLICATIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.career_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Applicant Info
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    position TEXT NOT NULL,
    experience_years TEXT,
    availability TEXT,

    -- Resume
    resume_url TEXT,
    resume_filename TEXT,
    cover_letter TEXT,

    -- Metadata
    source_page TEXT,
    ip_address TEXT,
    user_agent TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_career_applications_created_at ON public.career_applications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_career_applications_email ON public.career_applications(email);
CREATE INDEX IF NOT EXISTS idx_career_applications_position ON public.career_applications(position);

-- Row Level Security
ALTER TABLE public.career_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on career_applications"
    ON public.career_applications
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- 4. NEWSLETTER SUBSCRIPTIONS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Subscriber Info
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'active',

    -- Metadata
    source_page TEXT,
    ip_address TEXT,
    user_agent TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_created_at ON public.newsletter_subscriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_email ON public.newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_subscriptions_status ON public.newsletter_subscriptions(status);

-- Row Level Security
ALTER TABLE public.newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything on newsletter_subscriptions"
    ON public.newsletter_subscriptions
    FOR ALL
    TO service_role
    USING (true)
    WITH CHECK (true);

-- =====================================================
-- HELPER VIEWS
-- =====================================================

-- Recent contact submissions (last 30 days)
CREATE OR REPLACE VIEW recent_contacts AS
SELECT
    id,
    created_at,
    name,
    email,
    phone,
    company,
    LEFT(message, 100) AS message_preview
FROM public.contact_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- Recent quote requests (last 30 days)
CREATE OR REPLACE VIEW recent_quotes AS
SELECT
    id,
    created_at,
    company_name,
    contact_name,
    email,
    phone,
    facility_type,
    square_footage,
    services
FROM public.quote_requests
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;

-- =====================================================
-- COMMENTS
-- =====================================================
COMMENT ON TABLE public.contact_submissions IS 'Contact form submissions from /contact page';
COMMENT ON TABLE public.quote_requests IS 'Quote requests from /quote page (multi-step form)';
COMMENT ON TABLE public.career_applications IS 'Job applications from /apply page';
COMMENT ON TABLE public.newsletter_subscriptions IS 'Newsletter signups from footer';

-- =====================================================
-- COMPLETED
-- =====================================================
-- All tables created with:
-- ✅ UUID primary keys
-- ✅ Timestamps
-- ✅ Indexes for performance
-- ✅ Row Level Security enabled
-- ✅ Service role policies
-- ✅ Helper views for recent data
