-- Essential RLS Policies for Admin Login System
-- Run these commands in your Supabase SQL Editor

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================

-- Enable RLS on all tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- ========================================
-- ESSENTIAL POLICIES FOR ADMIN LOGIN
-- ========================================

-- 1. ADMIN TABLE - Allow public read access for login verification
CREATE POLICY "Allow public read access to admin" ON admin
    FOR SELECT USING (true);

-- 2. WRITER_PROFILES TABLE - Allow public read access to active writers
CREATE POLICY "Allow public read access to active writers" ON writer_profiles
    FOR SELECT USING (is_active = true);

-- 3. POSTS TABLE - Allow public read access to published posts
CREATE POLICY "Allow public read access to published posts" ON posts
    FOR SELECT USING (status = 'published');

-- ========================================
-- SERVICE ROLE POLICIES (for admin operations)
-- ========================================

-- Allow service role full access to all tables
CREATE POLICY "Service role full access to admin" ON admin
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to writer_profiles" ON writer_profiles
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to posts" ON posts
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- STORAGE POLICIES (for file uploads)
-- ========================================

-- Allow public read access to uploads
CREATE POLICY "Allow public read access to uploads" ON storage.objects
    FOR SELECT USING (bucket_id = 'uploads');

-- Allow service role full access to storage
CREATE POLICY "Service role full access to storage" ON storage.objects
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- VERIFICATION
-- ========================================

-- Check if policies are created successfully
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('admin', 'writer_profiles', 'posts')
ORDER BY tablename, policyname; 