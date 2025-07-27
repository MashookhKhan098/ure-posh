-- Simple Writer Setup
-- This script adds basic writer accounts to the writer_profiles table

-- Insert basic writer accounts
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
);

-- Show the created account
SELECT 'Writer Account Created:' as info;
SELECT 
  writer_id,
  username,
  email,
  full_name,
  specialization,
  experience_level
FROM writer_profiles 
WHERE username = 'demo_writer';

-- Show login credentials
SELECT 'Login Credentials:' as info;
SELECT 
  username,
  'ureposh2024' as password,
  full_name
FROM writer_profiles 
WHERE username = 'demo_writer'; 