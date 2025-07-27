-- =====================================================
-- VERIFICATION QUERIES
-- Run this after the main setup to verify everything works
-- =====================================================

-- Check table counts
SELECT 'Admin table' as table_name, COUNT(*) as record_count FROM admin
UNION ALL
SELECT 'Posts table' as table_name, COUNT(*) as record_count FROM posts;

-- Check sample data
SELECT 'Sample admin' as type, username, email FROM admin LIMIT 1
UNION ALL
SELECT 'Sample post' as type, title, status FROM posts LIMIT 1;

-- Check indexes
SELECT schemaname, tablename, indexname, indexdef 
FROM pg_indexes 
WHERE tablename IN ('admin', 'posts') 
ORDER BY tablename, indexname;

-- Check admin user
SELECT id, username, email, role FROM admin WHERE username = 'admin';

-- Check sample posts
SELECT id, title, author, status, view_count FROM posts LIMIT 3; 