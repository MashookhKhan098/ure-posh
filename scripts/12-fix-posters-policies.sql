```sql
-- Fix posters table RLS policies to allow both authenticated users and service role

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow read access to posters" ON public.posters;
DROP POLICY IF EXISTS "Allow insert access to posters" ON public.posters;
DROP POLICY IF EXISTS "Allow update access to posters" ON public.posters;
DROP POLICY IF EXISTS "Allow delete access to posters" ON public.posters;

-- Recreate the policies with proper permissions

-- Allow public read access to all posters
CREATE POLICY "Allow read access to posters" ON public.posters
    FOR SELECT USING (true);

-- Allow authenticated users and service role to insert posters (admin functionality)
CREATE POLICY "Allow insert access to posters" ON public.posters
    FOR INSERT WITH CHECK (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- Allow authenticated users and service role to update posters
CREATE POLICY "Allow update access to posters" ON public.posters
    FOR UPDATE USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

-- Allow authenticated users and service role to delete posters
CREATE POLICY "Allow delete access to posters" ON public.posters
    FOR DELETE USING (
        auth.role() = 'authenticated' OR 
        auth.role() = 'service_role'
    );

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
WHERE tablename = 'posters';
```
