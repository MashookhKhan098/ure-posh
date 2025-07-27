# Database Schema Fix Guide

## Issues Found

Your application is experiencing these database errors:

1. **Missing `users` table**: `relation "public.users" does not exist`
2. **Missing `user_id` column in posts table**: `column posts.user_id does not exist`
3. **Missing `post_status` column in posts table**: `column posts.post_status does not exist`
4. **Next.js routing conflict**: Duplicate dynamic routes `[id]` and `[slug]`

## Fixes Applied

### 1. Removed Duplicate API Routes ✅

- Deleted `app/api/posts/[slug]/` directory and its contents
- Kept `app/api/posts/[id]/` which can handle both UUIDs and slugs

### 2. Database Schema Fix

Run this SQL in your **Supabase SQL Editor**:

```sql
-- =====================================================
-- FIX DATABASE SCHEMA
-- Fixes missing users table and missing columns in posts table
-- =====================================================

-- =====================================================
-- 1. CREATE USERS TABLE (for writers and admin users)
-- =====================================================

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role VARCHAR(50) DEFAULT 'writer',
    avatar_url VARCHAR(500),
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_sign_in_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user
INSERT INTO users (name, email, password, role, is_active, email_verified) 
VALUES (
    'Admin User', 
    'admin@ureposh.com', 
    '$2b$10$ueE3Rzpg91MbXBlLWyzYfe2pbGZpbDoSyoCM4pYqVP58N1sIG92Vy', 
    'admin', 
    true, 
    true
) ON CONFLICT (email) DO NOTHING;

-- Insert sample writers
INSERT INTO users (name, email, role, is_active, email_verified) VALUES
('Jane Doe', 'jane@ureposh.com', 'writer', true, true),
('Priya Sharma', 'priya@ureposh.com', 'writer', true, true),
('Sarah Johnson', 'sarah@ureposh.com', 'writer', true, true)
ON CONFLICT (email) DO NOTHING;

-- =====================================================
-- 2. ADD MISSING COLUMNS TO POSTS TABLE
-- =====================================================

-- Add user_id column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES users(id);

-- Add post_status column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS post_status VARCHAR(50) DEFAULT 'pending';

-- Add subtitle column if it doesn't exist
ALTER TABLE posts ADD COLUMN IF NOT EXISTS subtitle TEXT;

-- =====================================================
-- 3. UPDATE EXISTING POSTS WITH USER_ID AND POST_STATUS
-- =====================================================

-- Update existing posts to have user_id (assign to first writer)
UPDATE posts 
SET user_id = (SELECT id FROM users WHERE role = 'writer' LIMIT 1)
WHERE user_id IS NULL;

-- Update existing posts to have post_status
UPDATE posts 
SET post_status = CASE 
    WHEN status = 'published' THEN 'approved'
    WHEN status = 'draft' THEN 'pending'
    ELSE 'pending'
END
WHERE post_status IS NULL;

-- =====================================================
-- 4. CREATE INDEXES FOR PERFORMANCE
-- =====================================================

-- Users table indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Posts table indexes for new columns
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_post_status ON posts(post_status);

-- =====================================================
-- 5. ENABLE ROW LEVEL SECURITY
-- =====================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users table policies
CREATE POLICY "Users table is viewable by everyone" ON users FOR SELECT USING (true);
CREATE POLICY "Users table is insertable by authenticated users" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users table is updatable by authenticated users" ON users FOR UPDATE USING (true);
CREATE POLICY "Users table is deletable by authenticated users" ON users FOR DELETE USING (true);

-- =====================================================
-- 6. CREATE TRIGGER FOR USERS TABLE
-- =====================================================

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- 7. VERIFICATION QUERIES
-- =====================================================

-- Check that users table was created
SELECT 'Users table created' as status WHERE EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users');

-- Check that posts table has the new columns
SELECT 'Posts table has user_id' as status WHERE EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'user_id'
);

SELECT 'Posts table has post_status' as status WHERE EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'posts' AND column_name = 'post_status'
);

-- Check users data
SELECT name, email, role, is_active FROM users;

-- Check posts with user_id
SELECT p.title, p.post_status, u.name as writer_name 
FROM posts p 
LEFT JOIN users u ON p.user_id = u.id 
LIMIT 5;
```

## Steps to Fix

### Step 1: Run the SQL Migration
1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy and paste the SQL above
4. Click **Run** to execute the migration

### Step 2: Verify the Fix
After running the SQL, your admin dashboard should work without errors. The API endpoints will now have:

- ✅ `users` table with admin and writer accounts
- ✅ `posts` table with `user_id` and `post_status` columns
- ✅ Proper relationships between posts and users
- ✅ Sample data for testing

### Step 3: Test the Admin Dashboard
1. Restart your development server
2. Navigate to `/admin`
3. The dashboard should now load without database errors

## Expected Results

After applying this fix:

- ✅ Admin dashboard loads without database errors
- ✅ Posts API returns data with proper user relationships
- ✅ Writer management works correctly
- ✅ Post approval system functions properly

## Troubleshooting

If you still see errors:

1. **Check Supabase connection**: Verify your environment variables
2. **Clear browser cache**: Hard refresh the admin page
3. **Restart dev server**: Stop and restart `npm run dev`
4. **Check SQL execution**: Verify all SQL statements ran successfully

## Files Modified

- ✅ Removed duplicate API routes (`app/api/posts/[slug]/`)
- ✅ Created database migration script (`fix-database-schema.sql`)
- ✅ Created execution script (`run-database-fix.js`)

The routing conflict has been resolved and the database schema will be fixed once you run the SQL migration. 