-- Add verified column to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS verified BOOLEAN DEFAULT FALSE;

-- Add index for better performance when filtering by verified status
CREATE INDEX IF NOT EXISTS idx_posts_verified ON posts(verified) WHERE verified = TRUE;

-- Add index for combined filtering (status + verified)
CREATE INDEX IF NOT EXISTS idx_posts_status_verified ON posts(status, verified) WHERE status = 'published' AND verified = TRUE;

-- Update existing posts to be verified (optional - you can remove this if you want to manually verify posts)
-- UPDATE posts SET verified = TRUE WHERE status = 'published';

-- Add comment to document the column
COMMENT ON COLUMN posts.verified IS 'Whether the post has been verified by admin. Only verified posts are shown on the public news page.';
