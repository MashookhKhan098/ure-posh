-- Fix Admin Table Script v2
-- This script handles the existing password column and adds missing columns

-- First, let's see what columns exist in the admin table
-- Then add missing columns and update the password

-- Add password_hash column if it doesn't exist (for future use)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'password_hash') THEN
        ALTER TABLE admin ADD COLUMN password_hash TEXT;
    END IF;
END $$;

-- Add full_name column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'full_name') THEN
        ALTER TABLE admin ADD COLUMN full_name TEXT;
    END IF;
END $$;

-- Add role column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'role') THEN
        ALTER TABLE admin ADD COLUMN role TEXT DEFAULT 'admin';
    END IF;
END $$;

-- Add created_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'created_at') THEN
        ALTER TABLE admin ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'admin' AND column_name = 'updated_at') THEN
        ALTER TABLE admin ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
    END IF;
END $$;

-- Update existing admin user with proper password and other fields
UPDATE admin 
SET password = 'admin123',  -- Set a simple password for now
    password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    full_name = COALESCE(full_name, 'System Administrator'),
    role = COALESCE(role, 'admin')
WHERE username = 'admin';

-- If admin user doesn't exist, create it
INSERT INTO admin (username, email, password, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@ureposh.com',
  'admin123',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'System Administrator',
  'admin'
) ON CONFLICT (username) DO NOTHING;
