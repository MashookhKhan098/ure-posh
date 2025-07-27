-- Create storage bucket for file uploads
-- Run this in your Supabase SQL Editor

-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for the uploads bucket
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can upload files" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
CREATE POLICY "Users can update their own files" ON storage.objects FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid() = owner);
CREATE POLICY "Users can delete their own files" ON storage.objects FOR DELETE USING (bucket_id = 'uploads' AND auth.uid() = owner);

-- Alternative: Allow all authenticated users to manage files (less secure but simpler)
-- CREATE POLICY "Authenticated users can manage files" ON storage.objects FOR ALL USING (bucket_id = 'uploads' AND auth.role() = 'authenticated'); 