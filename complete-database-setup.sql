-- Complete Database Setup for Ureposh Admin System
-- Run these commands in your Supabase SQL Editor

-- ========================================
-- CORE TABLES (Already Created)
-- ========================================

-- 1. Admin Table for Authentication
CREATE TABLE IF NOT EXISTS admin (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Writer Profiles Table for Writer Management
CREATE TABLE IF NOT EXISTS writer_profiles (
  writer_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  expertise TEXT,
  portfolio TEXT,
  social_links JSONB,
  blockchain_wallet TEXT,
  is_active BOOLEAN DEFAULT true,
  login_count INTEGER DEFAULT 0,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Posts Table for Content Management
CREATE TABLE IF NOT EXISTS posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  tags TEXT[],
  slug TEXT UNIQUE,
  featured_image TEXT,
  video_url TEXT,
  video_title TEXT,
  video_description TEXT,
  status TEXT DEFAULT 'draft',
  read_time INTEGER,
  view_count INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- ADDITIONAL TABLES (Referenced in Code)
-- ========================================

-- 4. Writer Requests Table
CREATE TABLE IF NOT EXISTS writer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  expertise TEXT,
  portfolio TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Writer Sessions Table
CREATE TABLE IF NOT EXISTS writer_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Writer Statistics Table
CREATE TABLE IF NOT EXISTS writer_statistics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  total_posts INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0.00,
  last_activity TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Writer Posts Table (for writer-specific post management)
CREATE TABLE IF NOT EXISTS writer_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  approval_status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Writer Notifications Table
CREATE TABLE IF NOT EXISTS writer_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. Users Table (if needed for general user management)
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'user',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- INDEXES FOR PERFORMANCE
-- ========================================

-- Admin table indexes
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin(username);
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);

-- Writer profiles indexes
CREATE INDEX IF NOT EXISTS idx_writer_username ON writer_profiles(username);
CREATE INDEX IF NOT EXISTS idx_writer_email ON writer_profiles(email);
CREATE INDEX IF NOT EXISTS idx_writer_active ON writer_profiles(is_active);

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);

-- Writer requests indexes
CREATE INDEX IF NOT EXISTS idx_writer_requests_status ON writer_requests(status);
CREATE INDEX IF NOT EXISTS idx_writer_requests_email ON writer_requests(email);

-- Writer sessions indexes
CREATE INDEX IF NOT EXISTS idx_writer_sessions_token ON writer_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_writer_sessions_writer_id ON writer_sessions(writer_id);

-- Writer statistics indexes
CREATE INDEX IF NOT EXISTS idx_writer_statistics_writer_id ON writer_statistics(writer_id);

-- Writer posts indexes
CREATE INDEX IF NOT EXISTS idx_writer_posts_writer_id ON writer_posts(writer_id);
CREATE INDEX IF NOT EXISTS idx_writer_posts_status ON writer_posts(approval_status);

-- Writer notifications indexes
CREATE INDEX IF NOT EXISTS idx_writer_notifications_writer_id ON writer_notifications(writer_id);
CREATE INDEX IF NOT EXISTS idx_writer_notifications_read ON writer_notifications(is_read);

-- ========================================
-- SAMPLE DATA
-- ========================================

-- Insert sample admin user (password: admin123)
INSERT INTO admin (username, email, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@ureposh.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'System Administrator',
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- ========================================
-- ROW LEVEL SECURITY
-- ========================================

-- Enable RLS on all tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- ========================================
-- ESSENTIAL POLICIES
-- ========================================

-- Admin table policies
CREATE POLICY "Allow public read access to admin" ON admin
    FOR SELECT USING (true);
CREATE POLICY "Service role full access to admin" ON admin
    FOR ALL USING (auth.role() = 'service_role');

-- Writer profiles policies
CREATE POLICY "Allow public read access to active writers" ON writer_profiles
    FOR SELECT USING (is_active = true);
CREATE POLICY "Service role full access to writer_profiles" ON writer_profiles
    FOR ALL USING (auth.role() = 'service_role');

-- Posts policies
CREATE POLICY "Allow public read access to published posts" ON posts
    FOR SELECT USING (status = 'published');
CREATE POLICY "Service role full access to posts" ON posts
    FOR ALL USING (auth.role() = 'service_role');

-- Writer requests policies
CREATE POLICY "Allow public read access to writer_requests" ON writer_requests
    FOR SELECT USING (true);
CREATE POLICY "Service role full access to writer_requests" ON writer_requests
    FOR ALL USING (auth.role() = 'service_role');

-- Writer sessions policies
CREATE POLICY "Service role full access to writer_sessions" ON writer_sessions
    FOR ALL USING (auth.role() = 'service_role');

-- Writer statistics policies
CREATE POLICY "Service role full access to writer_statistics" ON writer_statistics
    FOR ALL USING (auth.role() = 'service_role');

-- Writer posts policies
CREATE POLICY "Service role full access to writer_posts" ON writer_posts
    FOR ALL USING (auth.role() = 'service_role');

-- Writer notifications policies
CREATE POLICY "Service role full access to writer_notifications" ON writer_notifications
    FOR ALL USING (auth.role() = 'service_role');

-- Users policies
CREATE POLICY "Service role full access to users" ON users
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- STORAGE BUCKET SETUP
-- ========================================

-- Note: Storage bucket 'uploads' needs to be created manually in Supabase Dashboard
-- Go to Storage → Create a new bucket → Name: 'uploads' → Make it public

-- Storage policies (run after creating the bucket)
CREATE POLICY "Allow public read access to uploads" ON storage.objects
    FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Service role full access to storage" ON storage.objects
    FOR ALL USING (auth.role() = 'service_role');

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check all tables created
SELECT 
    table_name,
    table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'admin', 'writer_profiles', 'posts', 'writer_requests', 
    'writer_sessions', 'writer_statistics', 'writer_posts', 
    'writer_notifications', 'users'
)
ORDER BY table_name;

-- Check RLS status
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
    'admin', 'writer_profiles', 'posts', 'writer_requests', 
    'writer_sessions', 'writer_statistics', 'writer_posts', 
    'writer_notifications', 'users'
)
ORDER BY tablename; 