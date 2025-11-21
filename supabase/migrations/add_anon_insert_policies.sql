-- =====================================================
-- Add Anonymous Insert Policies for Form Submissions
-- =====================================================
-- Created: 2025-11-21
-- Purpose: Allow anonymous users to submit forms
-- Issue: Forms failing with "Unable to save submission"
-- =====================================================

-- Allow anonymous users to INSERT into contact_submissions
CREATE POLICY "Allow anonymous contact submissions"
    ON public.contact_submissions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to INSERT into quote_requests
CREATE POLICY "Allow anonymous quote requests"
    ON public.quote_requests
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to INSERT into career_applications
CREATE POLICY "Allow anonymous career applications"
    ON public.career_applications
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Allow anonymous users to INSERT into newsletter_subscriptions
CREATE POLICY "Allow anonymous newsletter subscriptions"
    ON public.newsletter_subscriptions
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- =====================================================
-- NOTE: These policies only allow INSERT, not SELECT/UPDATE/DELETE
-- This ensures anonymous users can submit forms but cannot:
-- - Read other submissions (SELECT blocked)
-- - Modify submissions (UPDATE blocked)
-- - Delete submissions (DELETE blocked)
-- =====================================================
