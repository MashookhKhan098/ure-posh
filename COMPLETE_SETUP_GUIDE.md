# Complete Setup Guide for Post Form

## 🚀 Quick Start

Follow these steps in order to get your post creation form working:

### Step 1: Environment Variables
Make sure your `.env` file has these variables:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

### Step 2: Database Migration
Go to your **Supabase Dashboard** → **SQL Editor** and run:

```sql
-- Add all missing columns to posts table
ALTER TABLE posts ADD COLUMN IF NOT EXISTS language VARCHAR(10) DEFAULT 'en';
ALTER TABLE posts ADD COLUMN IF NOT EXISTS comments_count INTEGER DEFAULT 0;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_title VARCHAR(255);
ALTER TABLE posts ADD COLUMN IF NOT EXISTS meta_description TEXT;
ALTER TABLE posts ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE;
```

### Step 3: Create Storage Bucket
In the same SQL Editor, run:

```sql
-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Set up simple storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can manage files" ON storage.objects FOR ALL USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
```

### Step 4: Test the Setup
1. Restart your development server
2. Go to `http://localhost:3000/admin`
3. Try creating a post with an image

## 🔧 Troubleshooting

### If you get "Column not found" errors:
Run the database migration script above.

### If you get "Bucket not found" errors:
Run the storage bucket creation script above.

### If you get "RLS policy" errors:
The API now uses the service role key which bypasses RLS.

### If you get environment variable errors:
Make sure all environment variables are set correctly.

## 📊 Database Schema

Your posts table should have these columns:
- `id` (UUID, Primary Key)
- `title` (VARCHAR)
- `content` (TEXT)
- `excerpt` (TEXT)
- `author` (VARCHAR)
- `category` (VARCHAR)
- `tags` (TEXT)
- `slug` (VARCHAR)
- `featured_image` (VARCHAR)
- `video_url` (VARCHAR)
- `video_title` (VARCHAR)
- `video_description` (TEXT)
- `status` (VARCHAR)
- `view_count` (INTEGER)
- `read_time` (INTEGER)
- `likes` (INTEGER)
- `comments_count` (INTEGER)
- `is_featured` (BOOLEAN)
- `meta_title` (VARCHAR)
- `meta_description` (TEXT)
- `language` (VARCHAR)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)
- `published_at` (TIMESTAMP)

## ✅ Success Indicators

When everything is working:
- ✅ Post creation form loads without errors
- ✅ Image uploads work
- ✅ Video uploads work
- ✅ Posts are saved to database
- ✅ No "column not found" errors
- ✅ No "bucket not found" errors
- ✅ No "RLS policy" errors

## 🆘 Still Having Issues?

1. **Check the logs** in your terminal for specific error messages
2. **Run the schema checker**: `node check-database-schema.js`
3. **Verify environment variables** are set correctly
4. **Check Supabase dashboard** for any connection issues 