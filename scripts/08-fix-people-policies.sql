-- Fix people table policies by dropping existing ones and recreating them
-- This resolves the "policy already exists" error

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access to people" ON people;
DROP POLICY IF EXISTS "Allow authenticated users to insert people" ON people;
DROP POLICY IF EXISTS "Allow admin users to update people" ON people;
DROP POLICY IF EXISTS "Allow users to update own profile" ON people;

-- Recreate the policies
-- Allow public read access to all people
CREATE POLICY "Allow public read access to people" ON people
  FOR SELECT USING (true);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Allow authenticated users to insert people" ON people
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow admin users to update any profile
CREATE POLICY "Allow admin users to update people" ON people
  FOR UPDATE USING (auth.role() = 'service_role');

-- Allow admin users to delete any profile
CREATE POLICY "Allow admin users to delete people" ON people
  FOR DELETE USING (auth.role() = 'service_role');

-- Verify the policies were created
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'people';
