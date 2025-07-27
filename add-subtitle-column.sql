-- Migration script to add subtitle column to posts table
-- Run this in your Supabase SQL editor

-- Add subtitle column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS subtitle VARCHAR(500);

-- Update existing posts to have a default subtitle (optional)
-- UPDATE posts SET subtitle = '' WHERE subtitle IS NULL; 