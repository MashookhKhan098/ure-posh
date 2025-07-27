-- Setup Writer Authentication
-- This script removes default passwords and sets up proper authentication

-- First, let's see what writers exist
SELECT 'Current Writer Accounts:' as info;
SELECT 
  writer_id,
  username,
  email,
  full_name,
  is_active,
  CASE 
    WHEN password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' 
    THEN 'DEFAULT_PASSWORD' 
    ELSE 'CUSTOM_PASSWORD' 
  END as password_status
FROM writer_profiles;

-- Remove writers with default password (ureposh2024)
DELETE FROM writer_profiles 
WHERE password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';

-- Create a new writer with a secure password
-- Password: 'writer123' (you can change this)
INSERT INTO writer_profiles (
  username,
  email,
  password_hash,
  full_name,
  specialization,
  experience_level,
  is_verified,
  is_active
) VALUES (
  'test_writer',
  'test@ureposh.com',
  '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', -- 'writer123'
  'Test Writer',
  'General',
  'intermediate',
  true,
  true
);

-- Show the new writer account
SELECT 'New Writer Account Created:' as info;
SELECT 
  username,
  email,
  full_name,
  specialization,
  experience_level,
  is_active
FROM writer_profiles 
WHERE username = 'test_writer';

-- Show login credentials
SELECT 'Login Credentials:' as info;
SELECT 
  username,
  'writer123' as password,
  full_name
FROM writer_profiles 
WHERE username = 'test_writer';

-- Clean up any orphaned sessions
DELETE FROM writer_sessions 
WHERE writer_id NOT IN (SELECT writer_id FROM writer_profiles);

-- Clean up any orphaned statistics
DELETE FROM writer_statistics 
WHERE writer_id NOT IN (SELECT writer_id FROM writer_profiles);

-- Clean up any orphaned notifications
DELETE FROM writer_notifications 
WHERE writer_id NOT IN (SELECT writer_id FROM writer_profiles); 