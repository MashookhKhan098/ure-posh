-- Fix comments column issue
-- Run this in your Supabase SQL Editor

-- Add comments_count column if it doesn't exist
ALTER TABLE posts ADD COLUMN IF NOT EXISTS comments_count INTEGER DEFAULT 0;

-- Verify the column exists
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'posts' AND column_name = 'comments_count'; 