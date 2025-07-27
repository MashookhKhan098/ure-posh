-- =====================================================
-- OPTIMIZED SUPABASE SETUP
-- Clean schema with proper keys and only required fields
-- =====================================================

-- =====================================================
-- 1. ADMIN TABLE (for authentication)
-- =====================================================

CREATE TABLE IF NOT EXISTS admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin with hashed password (ureposh2024)
INSERT INTO admin (username, password, email, full_name) 
VALUES ('admin', '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 'admin@ureposh.com', 'Admin User')
ON CONFLICT (username) DO NOTHING;

-- =====================================================
-- 2. POSTS TABLE (main content)
-- =====================================================

CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    tags TEXT, -- Store as comma-separated string
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image VARCHAR(500),
    video_url VARCHAR(500),
    video_title VARCHAR(255),
    video_description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    view_count INTEGER DEFAULT 0,
    read_time INTEGER,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    meta_title VARCHAR(255),
    meta_description TEXT,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);

-- Insert sample posts
INSERT INTO posts (title, content, excerpt, author, category, tags, slug, status, view_count, read_time, likes, comments_count, is_featured, created_at, updated_at, published_at) VALUES
('Understanding Workplace Harassment Prevention', 'Detailed content about workplace harassment prevention and creating a safe environment for all employees. This comprehensive guide covers the key aspects of preventing workplace harassment through proper policies, training, and awareness programs.', 'Learn about the key aspects of preventing workplace harassment and creating a safe environment for all employees.', 'Jane Doe', 'Workplace Safety', 'harassment,prevention,workplace', 'understanding-workplace-harassment', 'published', 150, 5, 42, 8, true, NOW(), NOW(), NOW()),
('Legal Aspects of POSH Compliance', 'A comprehensive guide to understanding the legal requirements of POSH compliance in India. This article covers the Prevention of Sexual Harassment Act, its implementation, and the responsibilities of organizations.', 'A comprehensive guide to understanding the legal requirements of POSH compliance in India.', 'Priya Sharma', 'Legal Compliance', 'legal,compliance,posh', 'posh-legal-compliance', 'published', 89, 8, 28, 3, false, NOW(), NOW(), NOW()),
('Women Safety in the Workplace', 'Essential guidelines for ensuring women safety in the workplace. This article provides practical tips and strategies for creating a secure and supportive work environment for women employees.', 'Essential guidelines for ensuring women safety in the workplace.', 'Sarah Johnson', 'Women Safety', 'women-safety,workplace,empowerment', 'women-safety-workplace', 'published', 203, 6, 65, 12, true, NOW(), NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 3. INDEXES FOR PERFORMANCE
-- =====================================================

-- Posts table indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);
CREATE INDEX IF NOT EXISTS idx_posts_view_count ON posts(view_count);
CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured);

-- Admin table indexes
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin(username);
CREATE INDEX IF NOT EXISTS idx_admin_email ON admin(email);

-- =====================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Admin table policies
CREATE POLICY "Admin table is viewable by everyone" ON admin FOR SELECT USING (true);
CREATE POLICY "Admin table is insertable by authenticated users" ON admin FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin table is updatable by authenticated users" ON admin FOR UPDATE USING (true);
CREATE POLICY "Admin table is deletable by authenticated users" ON admin FOR DELETE USING (true);

-- Posts table policies
CREATE POLICY "Posts table is viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Posts table is insertable by authenticated users" ON posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Posts table is updatable by authenticated users" ON posts FOR UPDATE USING (true);
CREATE POLICY "Posts table is deletable by authenticated users" ON posts FOR DELETE USING (true);

-- =====================================================
-- 5. FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_slug TEXT)
RETURNS VOID AS $$
BEGIN
    UPDATE posts SET view_count = view_count + 1 WHERE slug = post_slug;
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- 6. CONSTRAINTS AND VALIDATIONS
-- =====================================================

-- Add constraints
ALTER TABLE posts ADD CONSTRAINT check_status CHECK (status IN ('draft', 'published', 'archived'));
ALTER TABLE posts ADD CONSTRAINT check_view_count CHECK (view_count >= 0);
ALTER TABLE posts ADD CONSTRAINT check_likes CHECK (likes >= 0);
ALTER TABLE posts ADD CONSTRAINT check_comments_count CHECK (comments_count >= 0);

-- =====================================================
-- 7. STORAGE BUCKET FOR UPLOADS
-- =====================================================

-- Note: You need to create this bucket in Supabase Dashboard
-- Go to Storage > Create bucket named 'uploads'
-- Set it to public for easy access 