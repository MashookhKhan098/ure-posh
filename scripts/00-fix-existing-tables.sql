-- =====================================================
-- FIX EXISTING TABLES SCRIPT
-- Add missing columns to existing tables
-- Run this BEFORE the main setup scripts
-- =====================================================

-- Fix Admin Table
DO $$ 
BEGIN
    -- Add password column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'password') THEN
        ALTER TABLE admin ADD COLUMN password TEXT;
    END IF;
    
    -- Add password_hash column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'password_hash') THEN
        ALTER TABLE admin ADD COLUMN password_hash TEXT;
    END IF;
    
    -- Add full_name column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'full_name') THEN
        ALTER TABLE admin ADD COLUMN full_name TEXT;
    END IF;
    
    -- Add role column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'role') THEN
        ALTER TABLE admin ADD COLUMN role TEXT DEFAULT 'admin';
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'created_at') THEN
        ALTER TABLE admin ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'updated_at') THEN
        ALTER TABLE admin ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Fix Writer Profiles Table
DO $$ 
BEGIN
    -- Add password column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'password') THEN
        ALTER TABLE writer_profiles ADD COLUMN password TEXT;
    END IF;
    
    -- Add password_hash column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'password_hash') THEN
        ALTER TABLE writer_profiles ADD COLUMN password_hash TEXT;
    END IF;
    
    -- Add bio column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'bio') THEN
        ALTER TABLE writer_profiles ADD COLUMN bio TEXT;
    END IF;
    
    -- Add expertise column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'expertise') THEN
        ALTER TABLE writer_profiles ADD COLUMN expertise TEXT;
    END IF;
    
    -- Add portfolio column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'portfolio') THEN
        ALTER TABLE writer_profiles ADD COLUMN portfolio TEXT;
    END IF;
    
    -- Add social_links column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'social_links') THEN
        ALTER TABLE writer_profiles ADD COLUMN social_links JSONB;
    END IF;
    
    -- Add blockchain_wallet column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'blockchain_wallet') THEN
        ALTER TABLE writer_profiles ADD COLUMN blockchain_wallet TEXT;
    END IF;
    
    -- Add is_active column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'is_active') THEN
        ALTER TABLE writer_profiles ADD COLUMN is_active BOOLEAN DEFAULT true;
    END IF;
    
    -- Add login_count column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'login_count') THEN
        ALTER TABLE writer_profiles ADD COLUMN login_count INTEGER DEFAULT 0;
    END IF;
    
    -- Add last_login column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'last_login') THEN
        ALTER TABLE writer_profiles ADD COLUMN last_login TIMESTAMP WITH TIME ZONE;
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'created_at') THEN
        ALTER TABLE writer_profiles ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'writer_profiles' AND column_name = 'updated_at') THEN
        ALTER TABLE writer_profiles ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Fix Posts Table
DO $$ 
BEGIN
    -- Add excerpt column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'excerpt') THEN
        ALTER TABLE posts ADD COLUMN excerpt TEXT;
    END IF;
    
    -- Add author column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'author') THEN
        ALTER TABLE posts ADD COLUMN author TEXT;
    END IF;
    
    -- Add category column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'category') THEN
        ALTER TABLE posts ADD COLUMN category TEXT;
    END IF;
    
    -- Add tags column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'tags') THEN
        ALTER TABLE posts ADD COLUMN tags TEXT[];
    END IF;
    
    -- Add slug column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'slug') THEN
        ALTER TABLE posts ADD COLUMN slug TEXT UNIQUE;
    END IF;
    
    -- Add featured_image column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'featured_image') THEN
        ALTER TABLE posts ADD COLUMN featured_image TEXT;
    END IF;
    
    -- Add video_url column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'video_url') THEN
        ALTER TABLE posts ADD COLUMN video_url TEXT;
    END IF;
    
    -- Add video_title column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'video_title') THEN
        ALTER TABLE posts ADD COLUMN video_title TEXT;
    END IF;
    
    -- Add video_description column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'video_description') THEN
        ALTER TABLE posts ADD COLUMN video_description TEXT;
    END IF;
    
    -- Add status column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'status') THEN
        ALTER TABLE posts ADD COLUMN status TEXT DEFAULT 'draft';
    END IF;
    
    -- Add read_time column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'read_time') THEN
        ALTER TABLE posts ADD COLUMN read_time INTEGER;
    END IF;
    
    -- Add view_count column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'view_count') THEN
        ALTER TABLE posts ADD COLUMN view_count INTEGER DEFAULT 0;
    END IF;
    
    -- Add likes column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'likes') THEN
        ALTER TABLE posts ADD COLUMN likes INTEGER DEFAULT 0;
    END IF;
    
    -- Add is_featured column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'is_featured') THEN
        ALTER TABLE posts ADD COLUMN is_featured BOOLEAN DEFAULT false;
    END IF;
    
    -- Add created_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'created_at') THEN
        ALTER TABLE posts ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
    
    -- Add updated_at column if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'posts' AND column_name = 'updated_at') THEN
        ALTER TABLE posts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Existing tables fixed successfully!';
  RAISE NOTICE 'All missing columns have been added safely.';
  RAISE NOTICE 'You can now run the main setup scripts.';
END $$;
