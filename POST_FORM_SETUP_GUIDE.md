# Post Form Database Connection Setup Guide

## Overview
This guide will help you connect all the fields in your post creation form to the database. All form fields are now properly mapped to database columns.

## Database Migration Required

### Option 1: Manual Migration (Recommended)
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run this SQL command:
```sql
-- No migration needed - subtitle field has been removed
```

## Storage Bucket Setup Required

### Create Storage Bucket for File Uploads
1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run this SQL command:
```sql
-- Create the uploads bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Set up simple storage policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
CREATE POLICY "Authenticated users can manage files" ON storage.objects FOR ALL USING (bucket_id = 'uploads' AND auth.role() = 'authenticated');
```

### Option 2: Using Migration Script
1. Make sure your environment variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. Run the migration script:
```bash
node run-migration.js
```

## Form Fields Now Connected

### Content Tab
- ✅ **Title** → `title` column
- ✅ **Content** → `content` column
- ✅ **Author** → `author` column
- ✅ **Category** → `category` column
- ✅ **Tags** → `tags` column (comma-separated)

### Settings Tab
- ✅ **Excerpt** → `excerpt` column
- ✅ **Status** → `status` column
- ✅ **Publish Date** → `published_at` column
- ✅ **Language** → `language` column
- ✅ **Read Time** → `read_time` column

### SEO Tab
- ✅ **Meta Title** → `meta_title` column
- ✅ **Meta Description** → `meta_description` column

### Media Tab
- ✅ **Featured Image** → `featured_image` column (uploaded to Supabase storage)
- ✅ **Video File** → `video_url` column (uploaded to Supabase storage)
- ✅ **Video Title** → `video_title` column
- ✅ **Video Description** → `video_description` column

## Database Schema

The posts table now includes all these fields:
```sql
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    tags TEXT,
    slug VARCHAR(255) UNIQUE NOT NULL,
    featured_image VARCHAR(500),
    video_url VARCHAR(500),
    video_title VARCHAR(255),
    video_description TEXT,
    status VARCHAR(50) DEFAULT 'draft',
    view_count INTEGER DEFAULT 0,
    read_time INTEGER,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    meta_title VARCHAR(255),
    meta_description TEXT,
    language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    published_at TIMESTAMP WITH TIME ZONE
);
```

## Testing the Form

1. **Start your development server:**
   ```bash
   npm run dev:3000
   ```

2. **Navigate to the admin panel:**
   ```
   http://localhost:3000/admin
   ```

3. **Create a new post:**
   - Fill in all the fields in different tabs
   - Upload an image and/or video
   - Set SEO metadata
   - Choose publish settings

4. **Check the database:**
   - Go to your Supabase dashboard
   - Check the posts table to see all fields populated

## Features Included

### Auto-save functionality
- Form automatically saves drafts every 2 seconds
- Visual indicator shows save status

### File uploads
- Featured images uploaded to Supabase storage
- Video files uploaded to Supabase storage
- File size validation (100MB limit for videos)

### SEO optimization
- Meta title and description fields
- Google search preview
- Automatic slug generation

### Content management
- Rich text content area
- Tags management with add/remove
- Category selection
- Status management (draft/published/archived)

### Preview functionality
- Live preview of how the post will look
- Toggle between edit and preview modes

## Environment Variables Required

Make sure these environment variables are set in your `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_jwt_secret
```

## Troubleshooting

### If you get database errors:
1. Make sure the migration has been run
2. Check your Supabase connection
3. Verify environment variables are set correctly
4. **Important**: Make sure `SUPABASE_SERVICE_ROLE_KEY` is set (not just the anon key)

### If file uploads fail:
1. **Create the storage bucket** - Run the SQL script above to create the 'uploads' bucket
2. Check Supabase storage bucket permissions
3. Verify the 'uploads' bucket exists in Storage section
4. Check file size limits (100MB for videos)

### If the form doesn't submit:
1. Check browser console for errors
2. Verify all required fields are filled
3. Check network tab for API errors

## Next Steps

After setting this up, you can:
1. Add form validation
2. Implement rich text editor
3. Add image optimization
4. Create post editing functionality
5. Add post preview on the frontend 