-- =====================================================
-- POSTER SYSTEM SETUP SCRIPT
-- Complete poster e-commerce system
-- Run this AFTER the base database setup
-- =====================================================

-- 1. Poster Categories Table
CREATE TABLE IF NOT EXISTS poster_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Posters Table for Poster Management
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

-- 3. Poster Orders Table for Payment Tracking
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

-- 4. Payment Transactions Table
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

-- =====================================================
-- SAMPLE POSTER CATEGORIES
-- =====================================================

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

-- =====================================================
-- SAMPLE POSTERS WITH HIGH-QUALITY IMAGES
-- =====================================================

INSERT INTO posters (title, description, image_url, category, tags, price, featured) VALUES
('Success Mindset Blueprint', 'A comprehensive motivational poster designed to inspire success and achievement. Perfect for offices, classrooms, and personal spaces.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', 'Motivational', ARRAY['motivation', 'success', 'mindset', 'achievement'], 299.00, true),

('Business Strategy Framework', 'Professional business strategy poster with modern design elements. Ideal for corporate environments and business meetings.', 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=600&fit=crop', 'Business', ARRAY['business', 'strategy', 'professional', 'corporate'], 399.00, true),

('Digital Innovation Hub', 'Modern technology innovation poster showcasing the future of digital transformation and technological advancement.', 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop', 'Technology', ARRAY['technology', 'innovation', 'digital', 'future'], 349.00, false),

('Health & Wellness Guide', 'Comprehensive health and wellness poster promoting healthy lifestyle choices and well-being practices.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'Health', ARRAY['health', 'wellness', 'fitness', 'lifestyle'], 249.00, false),

('Creative Design Principles', 'Artistic and creative design poster featuring modern design principles and creative inspiration.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop', 'Artistic', ARRAY['art', 'design', 'creative', 'inspiration'], 199.00, true),

('Sports Excellence', 'Dynamic sports and fitness poster celebrating athletic achievement and physical excellence.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop', 'Sports', ARRAY['sports', 'fitness', 'athletic', 'excellence'], 279.00, false),

('Nature Conservation', 'Beautiful nature and environmental poster promoting conservation and environmental awareness.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'Nature', ARRAY['nature', 'environment', 'conservation', 'sustainability'], 229.00, false),

('Educational Excellence', 'Comprehensive educational poster designed to inspire learning and academic achievement.', 'https://images.unsplash.com/photo-1523240797358-5bbd9f0c3b0d?w=800&h=600&fit=crop', 'Educational', ARRAY['education', 'learning', 'academic', 'knowledge'], 189.00, false),

('Leadership Principles', 'Professional leadership poster featuring essential leadership principles and management strategies.', 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop', 'Business', ARRAY['leadership', 'management', 'professional', 'strategy'], 359.00, true),

('Mindfulness & Meditation', 'Peaceful mindfulness and meditation poster promoting mental wellness and inner peace.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'Health', ARRAY['mindfulness', 'meditation', 'mental-health', 'wellness'], 219.00, false)
ON CONFLICT DO NOTHING;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Poster system setup completed successfully!';
  RAISE NOTICE 'Created 8 poster categories';
  RAISE NOTICE 'Created 10 sample posters with high-quality images';
  RAISE NOTICE 'Poster system is ready for e-commerce functionality';
END $$;
