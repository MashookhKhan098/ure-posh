-- =====================================================
-- BASE DATABASE SETUP SCRIPT
-- Core tables for admin, writers, and posts
-- Run this first before the poster system
-- =====================================================

-- 1. Admin Table for Authentication
CREATE TABLE IF NOT EXISTS admin (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  password_hash TEXT,
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
  password TEXT NOT NULL,
  password_hash TEXT,
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

-- =====================================================
-- SAMPLE DATA INSERTION
-- =====================================================

-- Insert default admin user
INSERT INTO admin (username, email, password, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@ureposh.com',
  'admin123',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'System Administrator',
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample writer
INSERT INTO writer_profiles (username, email, password, password_hash, full_name, bio, expertise) 
VALUES (
  'writer1',
  'writer@ureposh.com',
  'writer123',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'John Writer',
  'Experienced content writer with expertise in technology and business.',
  'Technology, Business, Marketing'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample post
INSERT INTO posts (title, content, excerpt, author, category, tags, slug, status) 
VALUES (
  'Welcome to Ureposh',
  'This is the first post on Ureposh platform. We are excited to bring you amazing content and digital products.',
  'Welcome to our platform where innovation meets creativity.',
  'admin',
  'General',
  ARRAY['welcome', 'introduction', 'platform'],
  'welcome-to-ureposh',
  'published'
) ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Base database setup completed successfully!';
  RAISE NOTICE 'Admin user created: admin / admin123';
  RAISE NOTICE 'Writer user created: writer1 / writer123';
  RAISE NOTICE 'Sample post created: Welcome to Ureposh';
END $$;
