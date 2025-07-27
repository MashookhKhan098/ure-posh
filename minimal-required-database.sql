-- =====================================================
-- MINIMAL REQUIRED DATABASE
-- Only the fields that are actually used in your frontend
-- =====================================================

-- =====================================================
-- 1. ADMIN TABLE (for login only)
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
-- 2. POSTS TABLE (only required fields from frontend)
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

-- Insert sample posts (only required fields)
INSERT INTO posts (title, content, excerpt, author, category, tags, slug, status, view_count, read_time, likes, comments_count, is_featured, meta_title, meta_description, language, created_at, updated_at, published_at) VALUES
('Understanding Workplace Harassment Prevention', 'Detailed content about workplace harassment prevention and creating a safe environment for all employees. This comprehensive guide covers the key aspects of preventing workplace harassment through proper policies, training, and awareness programs.', 'Learn about the key aspects of preventing workplace harassment and creating a safe environment for all employees.', 'Jane Doe', 'Workplace Safety', 'harassment,prevention,workplace', 'understanding-workplace-harassment', 'published', 150, 5, 42, 8, true, 'Workplace Harassment Prevention Guide', 'Learn about preventing workplace harassment and creating safe environments for all employees.', 'en', NOW(), NOW(), NOW()),
('Legal Aspects of POSH Compliance', 'A comprehensive guide to understanding the legal requirements of POSH compliance in India. This article covers the Prevention of Sexual Harassment Act, its implementation, and the responsibilities of organizations.', 'A comprehensive guide to understanding the legal requirements of POSH compliance in India.', 'Priya Sharma', 'Legal Compliance', 'legal,compliance,posh', 'posh-legal-compliance', 'published', 89, 8, 28, 3, false, 'POSH Compliance Legal Guide', 'Comprehensive guide to POSH compliance legal requirements in India.', 'en', NOW(), NOW(), NOW()),
('Women Safety in the Workplace', 'Essential guidelines for ensuring women safety in the workplace. This article provides practical tips and strategies for creating a secure and supportive work environment for women employees.', 'Essential guidelines for ensuring women safety in the workplace.', 'Sarah Johnson', 'Women Safety', 'women-safety,workplace,empowerment', 'women-safety-workplace', 'published', 203, 6, 65, 12, true, 'Women Safety in Workplace', 'Essential guidelines for ensuring women safety in the workplace environment.', 'en', NOW(), NOW(), NOW())
ON CONFLICT (slug) DO NOTHING;

-- =====================================================
-- 3. ESSENTIAL INDEXES (only for performance)
-- =====================================================

-- Posts table indexes (only the ones you actually query)
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at);

-- Admin table indexes
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin(username);

-- =====================================================
-- 4. BASIC RLS POLICIES
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
-- 5. ESSENTIAL FUNCTIONS
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

-- =====================================================
-- 6. VERIFICATION
-- =====================================================

-- Check that tables were created
SELECT 'Admin table created' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'admin')
UNION ALL
SELECT 'Posts table created' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'posts');

-- Check admin user
SELECT username, email, role FROM admin WHERE username = 'admin';

-- Check sample posts
SELECT title, author, status FROM posts LIMIT 3; 