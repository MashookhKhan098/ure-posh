-- =====================================================
-- REMOVE PLAIN TEXT PASSWORD FIELD
-- Run this AFTER all writers have logged in and passwords are properly hashed
-- =====================================================

-- First, verify all writers have password hashes
DO $$
DECLARE
  missing_passwords INTEGER;
BEGIN
  SELECT COUNT(*) INTO missing_passwords
  FROM writers 
  WHERE password_hash IS NULL OR password_hash = '';
  
  IF missing_passwords > 0 THEN
    RAISE EXCEPTION 'Cannot remove password field: % writers still missing password hashes', missing_passwords;
  END IF;
  
  RAISE NOTICE 'All writers have password hashes. Safe to remove plain text password field.';
END $$;

-- Remove the plain text password field
ALTER TABLE writers DROP COLUMN IF EXISTS password;

-- Remove the temporary constraint
ALTER TABLE writers DROP CONSTRAINT IF EXISTS check_password_length;

-- Update the password_hash column to be more secure
ALTER TABLE writers 
ALTER COLUMN password_hash SET NOT NULL;

-- Add a more secure constraint for bcrypt hashes
ALTER TABLE writers 
ADD CONSTRAINT check_bcrypt_hash 
CHECK (password_hash ~ '^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$');

-- =====================================================
-- FINAL VERIFICATION
-- =====================================================

-- Check final table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'writers' 
ORDER BY ordinal_position;

-- Verify password hashes are properly formatted
SELECT 
  id,
  name,
  email,
  CASE 
    WHEN password_hash ~ '^\$2[aby]\$\d{1,2}\$[./A-Za-z0-9]{53}$' THEN 'Valid Bcrypt Hash'
    ELSE 'Invalid Hash Format'
  END as hash_validation
FROM writers
ORDER BY name;

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$
BEGIN
  RAISE NOTICE 'Plain text password field removed successfully!';
  RAISE NOTICE 'Writers table now uses secure password hashing only.';
  RAISE NOTICE 'All authentication will use password_hash field.';
END $$;
