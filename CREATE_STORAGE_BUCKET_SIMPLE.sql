-- Create storage bucket for file uploads (Simple version)
-- Run this in your Supabase SQL Editor

-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Set up simple storage policies (allow all authenticated users to manage files)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can manage files" ON storage.objects FOR ALL USING (bucket_id = 'uploads' AND auth.role() = 'authenticated'); 