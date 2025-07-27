-- Writer Database Setup
-- This file contains all the necessary tables for the writer system

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Writer Profiles Table
CREATE TABLE IF NOT EXISTS writer_profiles (
  writer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  specialization VARCHAR(100),
  experience_level VARCHAR(50) DEFAULT 'beginner',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  login_count INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Writer Sessions Table
CREATE TABLE IF NOT EXISTS writer_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  session_token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Writer Posts Table
CREATE TABLE IF NOT EXISTS writer_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  slug VARCHAR(255) UNIQUE,
  featured_image TEXT,
  category VARCHAR(100),
  tags TEXT[],
  status VARCHAR(20) DEFAULT 'draft',
  approval_status VARCHAR(20) DEFAULT 'pending',
  view_count INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  read_time INTEGER,
  meta_title VARCHAR(255),
  meta_description TEXT,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Writer Statistics Table
CREATE TABLE IF NOT EXISTS writer_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  total_posts INTEGER DEFAULT 0,
  published_posts INTEGER DEFAULT 0,
  pending_posts INTEGER DEFAULT 0,
  rejected_posts INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_likes INTEGER DEFAULT 0,
  total_comments INTEGER DEFAULT 0,
  average_read_time DECIMAL(5,2) DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Writer Notifications Table
CREATE TABLE IF NOT EXISTS writer_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  writer_id UUID REFERENCES writer_profiles(writer_id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Clear existing data if any
DELETE FROM writer_notifications;
DELETE FROM writer_statistics;
DELETE FROM writer_posts;
DELETE FROM writer_sessions;
DELETE FROM writer_profiles;

-- Insert default writer accounts with explicit UUIDs
INSERT INTO writer_profiles (writer_id, username, email, password_hash, full_name, specialization, experience_level, is_verified, is_active) VALUES
(gen_random_uuid(), 'writer1', 'writer1@ureposh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John Writer', 'Technology', 'intermediate', true, true),
(gen_random_uuid(), 'writer2', 'writer2@ureposh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah Author', 'Business', 'beginner', true, true),
(gen_random_uuid(), 'writer3', 'writer3@ureposh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Mike Blogger', 'Lifestyle', 'expert', true, true),
(gen_random_uuid(), 'demo_writer', 'demo@ureposh.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Demo Writer', 'General', 'intermediate', true, true);

-- Insert sample statistics for each writer
INSERT INTO writer_statistics (writer_id, total_posts, published_posts, pending_posts, total_views, total_likes) 
SELECT writer_id, 0, 0, 0, 0, 0 FROM writer_profiles;

-- Insert sample notifications for demo writer
INSERT INTO writer_notifications (writer_id, title, message, type) 
SELECT writer_id, 'Welcome!', 'Welcome to the writer portal. Start creating your first article!', 'info' FROM writer_profiles WHERE username = 'demo_writer';

INSERT INTO writer_notifications (writer_id, title, message, type) 
SELECT writer_id, 'Account Verified', 'Your writer account has been verified successfully.', 'success' FROM writer_profiles WHERE username = 'demo_writer';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_writer_profiles_username ON writer_profiles(username);
CREATE INDEX IF NOT EXISTS idx_writer_profiles_email ON writer_profiles(email);
CREATE INDEX IF NOT EXISTS idx_writer_profiles_active ON writer_profiles(is_active);
CREATE INDEX IF NOT EXISTS idx_writer_sessions_writer_id ON writer_sessions(writer_id);
CREATE INDEX IF NOT EXISTS idx_writer_sessions_token ON writer_sessions(session_token);
CREATE INDEX IF NOT EXISTS idx_writer_posts_writer_id ON writer_posts(writer_id);
CREATE INDEX IF NOT EXISTS idx_writer_posts_status ON writer_posts(status);
CREATE INDEX IF NOT EXISTS idx_writer_posts_approval_status ON writer_posts(approval_status);
CREATE INDEX IF NOT EXISTS idx_writer_notifications_writer_id ON writer_notifications(writer_id);
CREATE INDEX IF NOT EXISTS idx_writer_notifications_read ON writer_notifications(is_read);

-- Enable Row Level Security (if using Supabase)
-- Note: These policies should be created in Supabase dashboard or via Supabase CLI

-- Enable Row Level Security
ALTER TABLE writer_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for writer_profiles
CREATE POLICY "Writers can view their own profile" ON writer_profiles
  FOR SELECT USING (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can update their own profile" ON writer_profiles
  FOR UPDATE USING (auth.uid()::text = writer_id::text);

-- Create policies for writer_sessions
CREATE POLICY "Writers can manage their own sessions" ON writer_sessions
  FOR ALL USING (auth.uid()::text = writer_id::text);

-- Create policies for writer_posts
CREATE POLICY "Writers can view their own posts" ON writer_posts
  FOR SELECT USING (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can insert their own posts" ON writer_posts
  FOR INSERT WITH CHECK (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can update their own posts" ON writer_posts
  FOR UPDATE USING (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can delete their own posts" ON writer_posts
  FOR DELETE USING (auth.uid()::text = writer_id::text);

-- Create policies for writer_statistics
CREATE POLICY "Writers can view their own statistics" ON writer_statistics
  FOR SELECT USING (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can update their own statistics" ON writer_statistics
  FOR UPDATE USING (auth.uid()::text = writer_id::text);

-- Create policies for writer_notifications
CREATE POLICY "Writers can view their own notifications" ON writer_notifications
  FOR SELECT USING (auth.uid()::text = writer_id::text);

CREATE POLICY "Writers can update their own notifications" ON writer_notifications
  FOR UPDATE USING (auth.uid()::text = writer_id::text); 