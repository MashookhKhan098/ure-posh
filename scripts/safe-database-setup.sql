-- Safe Database Setup Script
-- This script can be run multiple times without errors

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

-- 4. Posters Table for Poster Management
CREATE TABLE IF NOT EXISTS posters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category TEXT,
  tags TEXT[],
  price DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT DEFAULT 'active',
  featured BOOLEAN DEFAULT false,
  download_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES admin(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Poster Orders Table for Payment Tracking
CREATE TABLE IF NOT EXISTS poster_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  poster_id UUID REFERENCES posters(id) ON DELETE CASCADE,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  order_status TEXT DEFAULT 'pending',
  download_url TEXT,
  download_expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Poster Categories Table
CREATE TABLE IF NOT EXISTS poster_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Payment Transactions Table
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES poster_orders(id) ON DELETE CASCADE,
  payment_gateway TEXT NOT NULL,
  transaction_id TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'INR',
  status TEXT NOT NULL,
  gateway_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample admin user only if it doesn't exist
INSERT INTO admin (username, email, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@ureposh.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'System Administrator',
  'admin'
) ON CONFLICT (username) DO NOTHING;

-- Insert sample poster categories only if they don't exist
INSERT INTO poster_categories (name, description, icon, color) VALUES
('Motivational', 'Inspirational and motivational posters', '💪', '#FF6B6B'),
('Business', 'Professional business posters', '💼', '#4ECDC4'),
('Educational', 'Learning and educational content', '📚', '#45B7D1'),
('Artistic', 'Creative and artistic designs', '🎨', '#96CEB4'),
('Technology', 'Tech-related posters', '💻', '#FFEAA7'),
('Health', 'Health and wellness posters', '🏥', '#DDA0DD'),
('Sports', 'Sports and fitness posters', '⚽', '#98D8C8'),
('Nature', 'Nature and environmental posters', '🌿', '#F7DC6F')
ON CONFLICT (name) DO NOTHING;

-- Insert sample posters only if they don't exist (checking by title)
INSERT INTO posters (title, description, image_url, category, tags, price, featured) VALUES
('Success Mindset', 'Powerful motivational poster for achieving success', '/images/posters/success-mindset.jpg', 'Motivational', ARRAY['motivation', 'success', 'mindset'], 299.00, true),
('Business Strategy', 'Professional business strategy poster', '/images/posters/business-strategy.jpg', 'Business', ARRAY['business', 'strategy', 'professional'], 399.00, true),
('Digital Innovation', 'Modern technology innovation poster', '/images/posters/digital-innovation.jpg', 'Technology', ARRAY['technology', 'innovation', 'digital'], 349.00, false),
('Health & Wellness', 'Comprehensive health and wellness guide', '/images/posters/health-wellness.jpg', 'Health', ARRAY['health', 'wellness', 'fitness'], 249.00, false),
('Creative Design', 'Artistic and creative design poster', '/images/posters/creative-design.jpg', 'Artistic', ARRAY['art', 'design', 'creative'], 199.00, true)
ON CONFLICT DO NOTHING;
