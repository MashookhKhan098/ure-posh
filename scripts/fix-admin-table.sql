-- Fix Admin Table Script
-- This script adds missing columns to the existing admin table

-- Add password_hash column if it doesn't exist
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

-- Update existing admin user with password_hash if it doesn't have one
UPDATE admin 
SET password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    full_name = COALESCE(full_name, 'System Administrator'),
    role = COALESCE(role, 'admin')
WHERE username = 'admin' AND (password_hash IS NULL OR password_hash = '');

-- Insert admin user only if it doesn't exist
INSERT INTO admin (username, email, password_hash, full_name, role) 
VALUES (
  'admin',
  'admin@ureposh.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'System Administrator',
  'admin'
) ON CONFLICT (username) DO NOTHING;
