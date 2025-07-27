-- Setup Writer Accounts
-- This script adds test writer accounts to the existing writer_profiles table

-- Clear existing test data (optional - uncomment if you want to start fresh)
-- DELETE FROM writer_notifications WHERE writer_id IN (SELECT writer_id FROM writer_profiles WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer'));
-- DELETE FROM writer_statistics WHERE writer_id IN (SELECT writer_id FROM writer_profiles WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer'));
-- DELETE FROM writer_profiles WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer');

-- Insert test writer accounts
-- Password hash for 'ureposh2024' using bcrypt
INSERT INTO writer_profiles (
  username, 
  email, 
  password_hash, 
  full_name, 
  specialization, 
  experience_level, 
  is_verified, 
  is_active
) VALUES 
(
  'demo_writer', 
  'demo@ureposh.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'Demo Writer', 
  'General', 
  'intermediate', 
  true, 
  true
),
(
  'tech_writer', 
  'tech@ureposh.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'Tech Writer', 
  'Technology', 
  'expert', 
  true, 
  true
),
(
  'business_writer', 
  'business@ureposh.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'Business Writer', 
  'Business', 
  'intermediate', 
  true, 
  true
),
(
  'lifestyle_writer', 
  'lifestyle@ureposh.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'Lifestyle Writer', 
  'Lifestyle', 
  'beginner', 
  true, 
  true
);

-- Insert statistics for new writers
INSERT INTO writer_statistics (writer_id, total_posts, published_posts, pending_posts, total_views, total_likes) 
SELECT writer_id, 0, 0, 0, 0, 0 
FROM writer_profiles 
WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer');

-- Insert welcome notifications for demo writer
INSERT INTO writer_notifications (writer_id, title, message, type) 
SELECT writer_id, 'Welcome!', 'Welcome to the writer portal. Start creating your first article!', 'info' 
FROM writer_profiles 
WHERE username = 'demo_writer';

-- Show the created accounts
SELECT 'Writer Accounts Created:' as info;
SELECT 
  writer_id,
  username,
  email,
  full_name,
  specialization,
  experience_level,
  is_verified,
  is_active
FROM writer_profiles 
WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer')
ORDER BY username;

-- Show login credentials
SELECT 'Login Credentials:' as info;
SELECT 
  username,
  'ureposh2024' as password,
  full_name,
  specialization
FROM writer_profiles 
WHERE username IN ('demo_writer', 'tech_writer', 'business_writer', 'lifestyle_writer')
ORDER BY username; 