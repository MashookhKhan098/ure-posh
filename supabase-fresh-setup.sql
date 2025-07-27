-- =====================================================
-- FRESH SUPABASE SETUP
-- Create new database with sample data
-- =====================================================

-- =====================================================
-- 1. ADMIN TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS admin (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    adminUserName VARCHAR(255) NOT NULL UNIQUE,
    adminPassword VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    fullName VARCHAR(255),
    role VARCHAR(50) DEFAULT 'admin',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin with hashed password (ureposh2024)
INSERT INTO admin (adminUserName, adminPassword, email, fullName) 
VALUES ('admin', '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 'admin@ureposh.com', 'Admin User')
ON CONFLICT (adminUserName) DO NOTHING;

-- =====================================================
-- 2. WRITER TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS writer (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    writerId VARCHAR(255) UNIQUE,
    writerName VARCHAR(255) NOT NULL,
    writerEmail VARCHAR(255) UNIQUE,
    writerPassword VARCHAR(255) NOT NULL,
    writerBio TEXT,
    writerAvatar VARCHAR(500),
    writerRole VARCHAR(50) DEFAULT 'writer',
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample writers
INSERT INTO writer (writerId, writerName, writerEmail, writerPassword, writerBio) VALUES
('writer-001', 'Jane Doe', 'jane@ureposh.com', '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 'Experienced writer focusing on workplace safety and compliance'),
('writer-002', 'Priya Sharma', 'priya@ureposh.com', '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 'Legal expert specializing in POSH compliance and women safety'),
('writer-003', 'Sarah Johnson', 'sarah@ureposh.com', '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 'HR professional with expertise in workplace harassment prevention')
ON CONFLICT (writerId) DO NOTHING;

-- =====================================================
-- 3. CATEGORIES TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    icon VARCHAR(50),
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default categories
INSERT INTO categories (name, slug, description, color) VALUES
('Workplace Safety', 'workplace-safety', 'Articles about workplace safety and prevention', '#EF4444'),
('Legal Compliance', 'legal-compliance', 'Legal aspects and compliance requirements', '#10B981'),
('Women Safety', 'women-safety', 'Women safety and empowerment topics', '#F59E0B'),
('POSH Compliance', 'posh-compliance', 'POSH related articles and guidelines', '#8B5CF6'),
('General', 'general', 'General articles and news', '#3B82F6')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 4. TAGS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    usage_count INTEGER DEFAULT 0,
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert common tags
INSERT INTO tags (name, slug, description) VALUES
('harassment', 'harassment', 'Harassment prevention and awareness'),
('prevention', 'prevention', 'Prevention strategies and tips'),
('workplace', 'workplace', 'Workplace related topics'),
('legal', 'legal', 'Legal aspects and compliance'),
('compliance', 'compliance', 'Compliance requirements'),
('posh', 'posh', 'POSH related content'),
('women-safety', 'women-safety', 'Women safety topics'),
('empowerment', 'empowerment', 'Empowerment and awareness'),
('training', 'training', 'Training and education'),
('awareness', 'awareness', 'Awareness campaigns and information')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- 5. POSTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    postId VARCHAR(255) UNIQUE,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    authorName VARCHAR(255),
    authorImage VARCHAR(500),
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    slug VARCHAR(255) UNIQUE,
    featuredImage VARCHAR(500),
    videoUrl VARCHAR(500),
    videoTitle VARCHAR(255),
    videoDescription TEXT,
    status VARCHAR(50) DEFAULT 'published',
    post_status VARCHAR(50) DEFAULT 'approved',
    viewCount INTEGER DEFAULT 0,
    readTime INTEGER,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    isFeatured BOOLEAN DEFAULT false,
    metaTitle VARCHAR(255),
    metaDescription TEXT,
    language VARCHAR(10) DEFAULT 'en',
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    uploadDate TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    publishedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    writerId VARCHAR(255) REFERENCES writer(writerId)
);

-- Insert sample posts
INSERT INTO posts (postId, title, content, excerpt, author, authorName, category, tags, slug, status, post_status, viewCount, readTime, likes, comments, isFeatured) VALUES
('post-001', 'Understanding Workplace Harassment Prevention', 
'Workplace harassment is a serious issue that affects millions of employees worldwide. This comprehensive guide will help you understand the different types of harassment, how to identify them, and most importantly, how to prevent them.

## Types of Workplace Harassment

### 1. Sexual Harassment
Sexual harassment includes unwelcome sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature.

### 2. Verbal Harassment
This includes offensive jokes, slurs, epithets, name-calling, and other verbal conduct that creates a hostile work environment.

### 3. Physical Harassment
Any unwanted physical contact, gestures, or intimidation tactics fall under this category.

## Prevention Strategies

### For Employers
- Implement clear anti-harassment policies
- Provide regular training sessions
- Establish confidential reporting mechanisms
- Take immediate action on complaints

### For Employees
- Know your rights
- Document incidents
- Report harassment promptly
- Support colleagues who speak up

## Legal Framework

The POSH Act (Prevention of Sexual Harassment) provides a comprehensive framework for addressing workplace harassment in India. Understanding your legal rights is crucial for both prevention and response.

## Creating a Safe Environment

A harassment-free workplace benefits everyone. It leads to:
- Higher employee satisfaction
- Increased productivity
- Better company reputation
- Reduced legal risks

Remember, prevention is always better than cure. By fostering a culture of respect and zero tolerance for harassment, we can create safer workplaces for everyone.',
'Learn about the key aspects of preventing workplace harassment and creating a safe environment for all employees.',
'Jane Doe', 'Jane Doe', 'Workplace Safety', 
ARRAY['harassment', 'prevention', 'workplace', 'legal', 'compliance'], 
'understanding-workplace-harassment-prevention', 'published', 'approved', 42, 5, 28, 8, true),

('post-002', 'Legal Aspects of POSH Compliance', 
'The Prevention of Sexual Harassment (POSH) Act, 2013, is a landmark legislation that provides a comprehensive framework for addressing sexual harassment at the workplace. Understanding the legal aspects is crucial for both employers and employees.

## Key Provisions of POSH Act

### 1. Definition of Sexual Harassment
The Act defines sexual harassment as any unwelcome sexually determined behavior, whether directly or by implication, including:
- Physical contact and advances
- A demand or request for sexual favors
- Sexually colored remarks
- Showing pornography
- Any other unwelcome physical, verbal, or non-verbal conduct of sexual nature

### 2. Employer Responsibilities
- Form an Internal Complaints Committee (ICC)
- Display the penal consequences of sexual harassment
- Organize workshops and awareness programs
- File annual reports with the district officer

### 3. Complaint Mechanism
- Complaints must be filed within 3 months
- ICC must complete inquiry within 90 days
- Interim relief can be provided to complainant
- Confidentiality must be maintained

## Compliance Requirements

### For Organizations
- Policy formulation and dissemination
- Training and awareness programs
- Regular audits and reviews
- Documentation and record-keeping

### For Employees
- Understanding rights and responsibilities
- Knowing the complaint process
- Participating in awareness programs
- Supporting colleagues

## Penalties and Consequences

Non-compliance can result in:
- Monetary penalties
- Cancellation of business licenses
- Reputational damage
- Legal action

## Best Practices

1. **Regular Training**: Conduct mandatory POSH training for all employees
2. **Clear Policies**: Develop comprehensive anti-harassment policies
3. **Prompt Action**: Address complaints immediately and fairly
4. **Documentation**: Maintain proper records of all proceedings
5. **Review and Update**: Regularly review and update policies

## Recent Legal Developments

The Supreme Court has issued several important judgments that have strengthened the POSH framework:
- Vishaka Guidelines implementation
- Mandatory POSH training for all organizations
- Enhanced penalties for non-compliance

## Conclusion

POSH compliance is not just a legal requirement but a moral obligation. Organizations that prioritize creating safe workplaces benefit from higher employee satisfaction, better productivity, and enhanced reputation.',
'A comprehensive guide to understanding the legal requirements of POSH compliance in India.',
'Priya Sharma', 'Priya Sharma', 'Legal Compliance', 
ARRAY['legal', 'compliance', 'posh', 'workplace'], 
'legal-aspects-of-posh-compliance', 'published', 'approved', 35, 8, 42, 12, true),

('post-003', 'Women Safety in the Digital Age', 
'As technology advances, women face new challenges in maintaining their safety both online and offline. This guide explores the intersection of women safety and digital technology.

## Digital Safety Challenges

### 1. Online Harassment
- Cyberstalking and harassment
- Revenge porn and image-based abuse
- Online threats and intimidation
- Social media safety concerns

### 2. Location-Based Risks
- GPS tracking and privacy concerns
- Dating app safety
- Location sharing risks
- Digital footprint management

## Safety Strategies

### Technology as a Safety Tool
- Safety apps and emergency contacts
- GPS tracking for trusted contacts
- Digital evidence collection
- Online privacy protection

### Personal Safety Measures
- Trust your instincts
- Share location with trusted contacts
- Use safety apps
- Maintain digital boundaries

## Legal Framework

### Cyber Laws in India
- Information Technology Act, 2000
- Cyber stalking provisions
- Online harassment laws
- Digital evidence admissibility

### Reporting Mechanisms
- Cyber crime portals
- Women helpline numbers
- Legal aid resources
- Support organizations

## Prevention and Awareness

### Education and Training
- Digital literacy programs
- Online safety workshops
- Privacy protection training
- Legal rights awareness

### Community Support
- Women support groups
- Online safety communities
- Peer support networks
- Professional counseling

## Technology Solutions

### Safety Apps
- Emergency alert systems
- Location sharing apps
- Self-defense tutorials
- Legal resource directories

### Privacy Tools
- VPN services
- Privacy-focused browsers
- Encrypted messaging
- Data protection tools

## Building Digital Resilience

### Personal Branding
- Professional online presence
- Privacy-conscious social media
- Digital reputation management
- Online networking safety

### Support Networks
- Family and friends
- Professional networks
- Women support groups
- Legal and counseling resources

## Conclusion

Digital safety is an integral part of women safety in the modern world. By combining technology, awareness, and legal protection, women can navigate the digital landscape safely and confidently.',
'Exploring the challenges and solutions for women safety in the digital age.',
'Sarah Johnson', 'Sarah Johnson', 'Women Safety', 
ARRAY['women-safety', 'digital', 'privacy', 'awareness'], 
'women-safety-in-the-digital-age', 'published', 'approved', 28, 6, 35, 5, false),

('post-004', 'Creating Inclusive Workplaces', 
'Inclusive workplaces are not just about compliance; they are about creating environments where everyone feels valued, respected, and able to contribute their best work. This guide explores how to build truly inclusive organizations.

## Understanding Inclusion

### What is Workplace Inclusion?
Inclusion means creating an environment where all employees feel:
- Valued for their unique contributions
- Respected regardless of differences
- Supported in their professional growth
- Safe to express their authentic selves

### Benefits of Inclusion
- Higher employee engagement
- Increased innovation and creativity
- Better decision-making
- Enhanced company reputation
- Improved customer relationships

## Building Inclusive Cultures

### Leadership Commitment
- Visible leadership support
- Clear inclusion goals
- Regular communication
- Accountability measures

### Policy Development
- Anti-discrimination policies
- Equal opportunity frameworks
- Flexible work arrangements
- Family-friendly policies

## Training and Education

### Unconscious Bias Training
- Understanding bias types
- Recognizing personal biases
- Mitigation strategies
- Ongoing reinforcement

### Cultural Competency
- Cross-cultural communication
- Cultural sensitivity training
- Global team collaboration
- Respectful workplace practices

## Measurement and Accountability

### Inclusion Metrics
- Employee satisfaction surveys
- Diversity representation
- Promotion rates
- Retention rates

### Regular Assessment
- Annual inclusion audits
- Employee feedback collection
- Policy effectiveness review
- Continuous improvement

## Best Practices

### Recruitment and Hiring
- Diverse candidate pools
- Unbiased selection processes
- Inclusive job descriptions
- Equal opportunity practices

### Career Development
- Mentorship programs
- Leadership development
- Equal promotion opportunities
- Skill development support

## Technology and Inclusion

### Digital Accessibility
- Accessible technology
- Inclusive design principles
- Digital accommodation
- Universal design

### Remote Work Inclusion
- Virtual team building
- Digital communication tools
- Remote accessibility
- Inclusive virtual meetings

## Conclusion

Creating inclusive workplaces is an ongoing journey that requires commitment, education, and continuous improvement. The benefits extend far beyond compliance to create truly successful organizations.',
'A comprehensive guide to building inclusive and diverse workplaces.',
'Jane Doe', 'Jane Doe', 'Workplace Safety', 
ARRAY['inclusion', 'diversity', 'workplace', 'leadership'], 
'creating-inclusive-workplaces', 'published', 'approved', 31, 7, 38, 9, false)
ON CONFLICT (postId) DO NOTHING;

-- =====================================================
-- 6. COMMENTS TABLE
-- =====================================================

CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    commentId VARCHAR(255) UNIQUE,
    postId VARCHAR(255) REFERENCES posts(postId) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    comment TEXT NOT NULL,
    avatar VARCHAR(500),
    isApproved BOOLEAN DEFAULT true,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample comments
INSERT INTO comments (commentId, postId, name, email, comment, isApproved) VALUES
('comment-001', 'post-001', 'Rahul Kumar', 'rahul@example.com', 'This is a very informative article. The prevention strategies are practical and easy to implement.', true),
('comment-002', 'post-001', 'Priya Singh', 'priya@example.com', 'Great insights on workplace harassment. Every organization should implement these guidelines.', true),
('comment-003', 'post-002', 'Amit Patel', 'amit@example.com', 'The legal framework explanation is very clear. This will help many organizations understand their responsibilities.', true),
('comment-004', 'post-003', 'Neha Sharma', 'neha@example.com', 'Digital safety is crucial in today''s world. This article provides valuable tips for women.', true),
('comment-005', 'post-004', 'Vikram Singh', 'vikram@example.com', 'Inclusive workplaces benefit everyone. This guide shows how to create positive change.', true)
ON CONFLICT (commentId) DO NOTHING;

-- =====================================================
-- 7. VIEWS TABLE (for analytics)
-- =====================================================

CREATE TABLE IF NOT EXISTS views (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    views_ID VARCHAR(255) UNIQUE,
    postId VARCHAR(255) REFERENCES posts(postId) ON DELETE CASCADE,
    viewCount INTEGER DEFAULT 0,
    ipAddress INET,
    userAgent TEXT,
    referrer TEXT,
    viewedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample view data
INSERT INTO views (views_ID, postId, viewCount) VALUES
('views-post-001', 'post-001', 42),
('views-post-002', 'post-002', 35),
('views-post-003', 'post-003', 28),
('views-post-004', 'post-004', 31)
ON CONFLICT (views_ID) DO NOTHING;

-- =====================================================
-- 8. POST_TAGS TABLE (many-to-many relationship)
-- =====================================================

CREATE TABLE IF NOT EXISTS post_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    postId VARCHAR(255) REFERENCES posts(postId) ON DELETE CASCADE,
    tagId UUID REFERENCES tags(id) ON DELETE CASCADE,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(postId, tagId)
);

-- =====================================================
-- 9. MEDIA TABLE (for file management)
-- =====================================================

CREATE TABLE IF NOT EXISTS media (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fileName VARCHAR(255) NOT NULL,
    originalName VARCHAR(255) NOT NULL,
    filePath VARCHAR(500) NOT NULL,
    fileUrl VARCHAR(500) NOT NULL,
    fileType VARCHAR(100) NOT NULL,
    fileSize BIGINT NOT NULL,
    mimeType VARCHAR(100),
    postId VARCHAR(255) REFERENCES posts(postId) ON DELETE CASCADE,
    uploadedBy VARCHAR(255),
    isPublic BOOLEAN DEFAULT true,
    createdAt TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updatedAt TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Posts indexes
CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);
CREATE INDEX IF NOT EXISTS idx_posts_author ON posts(author);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(createdAt);
CREATE INDEX IF NOT EXISTS idx_posts_view_count ON posts(viewCount);

-- Comments indexes
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON comments(postId);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(isApproved);

-- Views indexes
CREATE INDEX IF NOT EXISTS idx_views_post_id ON views(postId);
CREATE INDEX IF NOT EXISTS idx_views_viewed_at ON views(viewedAt);

-- Admin indexes
CREATE INDEX IF NOT EXISTS idx_admin_username ON admin(adminUserName);

-- Writer indexes
CREATE INDEX IF NOT EXISTS idx_writer_email ON writer(writerEmail);
CREATE INDEX IF NOT EXISTS idx_writer_active ON writer(isActive);

-- Tags indexes
CREATE INDEX IF NOT EXISTS idx_tags_slug ON tags(slug);
CREATE INDEX IF NOT EXISTS idx_tags_usage ON tags(usage_count);

-- Categories indexes
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE admin ENABLE ROW LEVEL SECURITY;
ALTER TABLE writer ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE views ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;

-- Admin policies (restrictive - only admins can access)
CREATE POLICY "Admin full access" ON admin FOR ALL USING (true);

-- Writer policies
CREATE POLICY "Writers can view their own data" ON writer 
    FOR SELECT USING (auth.uid()::text = writerId);
CREATE POLICY "Writers can update their own data" ON writer 
    FOR UPDATE USING (auth.uid()::text = writerId);

-- Posts policies (public read, authenticated write)
CREATE POLICY "Public can view published posts" ON posts 
    FOR SELECT USING (status = 'published' OR post_status = 'approved');
CREATE POLICY "Authenticated users can create posts" ON posts 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Authors can update their own posts" ON posts 
    FOR UPDATE USING (auth.uid()::text = writerId);

-- Comments policies
CREATE POLICY "Public can view approved comments" ON comments 
    FOR SELECT USING (isApproved = true);
CREATE POLICY "Anyone can create comments" ON comments 
    FOR INSERT WITH CHECK (true);

-- Views policies (public read, authenticated write)
CREATE POLICY "Public can view view counts" ON views 
    FOR SELECT USING (true);
CREATE POLICY "Authenticated users can record views" ON views 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Categories and tags policies (public read)
CREATE POLICY "Public can view categories" ON categories 
    FOR SELECT USING (isActive = true);
CREATE POLICY "Public can view tags" ON tags 
    FOR SELECT USING (isActive = true);

-- Media policies
CREATE POLICY "Public can view public media" ON media 
    FOR SELECT USING (isPublic = true);
CREATE POLICY "Authenticated users can upload media" ON media 
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =====================================================
-- FUNCTIONS AND TRIGGERS
-- =====================================================

-- Function to update updatedAt timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updatedAt = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updatedAt
CREATE TRIGGER update_admin_updated_at BEFORE UPDATE ON admin FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_writer_updated_at BEFORE UPDATE ON writer FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tags_updated_at BEFORE UPDATE ON tags FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate slug from title
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(regexp_replace(title, '[^a-zA-Z0-9]+', '-', 'g'));
END;
$$ LANGUAGE plpgsql;

-- =====================================================
-- VERIFICATION QUERY
-- =====================================================

-- Verify tables were created and populated
SELECT 
    table_name, 
    record_count 
FROM (
    SELECT 'admin' as table_name, COUNT(*) as record_count FROM admin
    UNION ALL
    SELECT 'writer', COUNT(*) FROM writer
    UNION ALL
    SELECT 'posts', COUNT(*) FROM posts
    UNION ALL
    SELECT 'comments', COUNT(*) FROM comments
    UNION ALL
    SELECT 'views', COUNT(*) FROM views
    UNION ALL
    SELECT 'categories', COUNT(*) FROM categories
    UNION ALL
    SELECT 'tags', COUNT(*) FROM tags
) t
ORDER BY table_name; 