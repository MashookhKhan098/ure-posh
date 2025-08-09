-- Setup Row Level Security (RLS) Policies for Tables
-- Run these commands in your Supabase SQL Editor

-- ========================================
-- ENABLE ROW LEVEL SECURITY
-- ========================================

-- Enable RLS on all tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- ========================================
-- ADMIN TABLE POLICIES
-- ========================================

-- Allow public read access to admin table (for login verification)
CREATE POLICY "Allow public read access to admin" ON admin
    FOR SELECT USING (true);

-- Allow authenticated users to update their own admin record
CREATE POLICY "Allow admin to update own record" ON admin
    FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow service role to perform all operations
CREATE POLICY "Allow service role full access to admin" ON admin
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- WRITER_PROFILES TABLE POLICIES
-- ========================================

-- Allow public read access to active writer profiles
CREATE POLICY "Allow public read access to active writers" ON writer_profiles
    FOR SELECT USING (is_active = true);

-- Allow writers to read their own profile
CREATE POLICY "Allow writers to read own profile" ON writer_profiles
    FOR SELECT USING (auth.uid()::text = writer_id::text);

-- Allow writers to update their own profile
CREATE POLICY "Allow writers to update own profile" ON writer_profiles
    FOR UPDATE USING (auth.uid()::text = writer_id::text);

-- Allow service role to perform all operations
CREATE POLICY "Allow service role full access to writer_profiles" ON writer_profiles
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- POSTS TABLE POLICIES
-- ========================================

-- Allow public read access to published posts
CREATE POLICY "Allow public read access to published posts" ON posts
    FOR SELECT USING (status = 'published');

-- Allow authenticated users to read all posts (including drafts)
CREATE POLICY "Allow authenticated users to read all posts" ON posts
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to create posts
CREATE POLICY "Allow authenticated users to create posts" ON posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow users to update their own posts
CREATE POLICY "Allow users to update own posts" ON posts
    FOR UPDATE USING (auth.uid()::text = author::text OR auth.role() = 'service_role');

-- Allow service role to perform all operations
CREATE POLICY "Allow service role full access to posts" ON posts
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- STORAGE POLICIES (for file uploads)
-- ========================================

-- Allow public read access to uploads bucket
CREATE POLICY "Allow public read access to uploads" ON storage.objects
    FOR SELECT USING (bucket_id = 'uploads');

-- Allow authenticated users to upload files
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');

-- Allow users to update their own files
CREATE POLICY "Allow users to update own files" ON storage.objects
    FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid()::text = owner::text);

-- Allow service role full access to storage
CREATE POLICY "Allow service role full access to storage" ON storage.objects
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check if policies are created
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Check RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('admin', 'writer_profiles', 'posts'); 