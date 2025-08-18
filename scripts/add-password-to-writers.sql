-- =====================================================
-- ADD PASSWORD FIELDS TO WRITERS TABLE
-- This script adds password authentication to existing writers table
-- =====================================================

-- Add password fields to writers table
ALTER TABLE writers 
ADD COLUMN IF NOT EXISTS password TEXT,
ADD COLUMN IF NOT EXISTS password_hash TEXT;

-- Add comment to explain the fields
COMMENT ON COLUMN writers.password IS 'Plain text password (temporary, will be removed after migration)';
COMMENT ON COLUMN writers.password_hash IS 'Bcrypt hashed password for secure authentication';

-- Create index on email for faster login queries
CREATE INDEX IF NOT EXISTS idx_writers_email ON writers(email);

-- Update existing writers with default passwords (for demo purposes)
-- You should change these passwords after first login
UPDATE writers 
SET 
  password = 'demo123',
  password_hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE password_hash IS NULL;

-- Add NOT NULL constraint after setting default values
ALTER TABLE writers 
ALTER COLUMN password_hash SET NOT NULL;

-- Create a function to hash passwords (optional, for future use)
CREATE OR REPLACE FUNCTION hash_writer_password()
RETURNS TRIGGER AS $$
BEGIN
  -- This function can be used to automatically hash passwords
  -- when they are inserted or updated
  -- For now, we'll handle hashing in the application layer
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically hash passwords (optional)
-- CREATE TRIGGER hash_writer_password_trigger
--   BEFORE INSERT OR UPDATE ON writers
--   FOR EACH ROW
--   EXECUTE FUNCTION hash_writer_password();

-- Add validation constraint for password length
ALTER TABLE writers 
ADD CONSTRAINT check_password_length 
CHECK (LENGTH(password_hash) >= 60);

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check the updated table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'writers' 
  AND column_name IN ('password', 'password_hash')
ORDER BY column_name;

-- Verify existing writers have password hashes
SELECT 
  id,
  name,
  email,
  CASE 
    WHEN password_hash IS NOT NULL THEN 'Has Password Hash'
    ELSE 'Missing Password Hash'
  END as password_status
FROM writers
ORDER BY name;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Password fields added to writers table successfully!';
  RAISE NOTICE 'Default password for all writers: demo123';
  RAISE NOTICE 'Password hash: $2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  RAISE NOTICE 'Remember to update these passwords after first login!';
END $$;
