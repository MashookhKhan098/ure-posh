-- Add verified column to articles table
ALTER TABLE articles ADD COLUMN verified BOOLEAN DEFAULT FALSE;

-- Update existing articles to have verified = false by default
UPDATE articles SET verified = FALSE WHERE verified IS NULL;

-- Make the verified column NOT NULL after setting default values
ALTER TABLE articles ALTER COLUMN verified SET NOT NULL;
