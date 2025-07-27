# 🧹 Clean Supabase Setup Guide

This is a **minimal, clean database setup** that matches exactly what your project needs.

## 📋 What's Included

### Tables
- **`admin`** - For admin login (username: `admin`, password: `ureposh2024`)
- **`posts`** - For blog posts with all necessary fields

### Features
- ✅ **Minimal schema** - Only what you actually need
- ✅ **Proper column names** - Matches your existing code
- ✅ **Sample data** - 3 sample posts ready to display
- ✅ **Indexes** - For fast queries
- ✅ **RLS policies** - Basic security
- ✅ **Triggers** - Auto-update timestamps

## 🚀 Setup Steps

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get your credentials (URL, anon key, service role key)

### 2. Set Environment Variables
Create `.env.local` file:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
JWT_SECRET=your_jwt_secret_here
```

### 3. Run Database Setup
1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the entire `clean-supabase-setup.sql` file
3. Click "Run" to execute

### 4. Create Storage Bucket
1. Go to Supabase Dashboard > Storage
2. Create bucket named `uploads`
3. Set it to "Public" for easy access

### 5. Test the Setup
```bash
# Test database connection
node check-db-schema.js

# Test login
node test-login-direct.js

# Test API endpoints
node test-login.js
```

## 📊 Database Schema

### Admin Table
```sql
admin (
  id, adminusername, adminpassword, email, fullname, 
  role, createdat, updatedat
)
```

### Posts Table
```sql
posts (
  id, postid, title, content, excerpt, author, authorname,
  authorimage, category, tags, slug, featuredimage,
  videourl, videotitle, videodescription, status, post_status,
  viewcount, readtime, likes, comments, isfeatured,
  metatitle, metadescription, language, createdat, updatedat,
  uploaddate, publishedat, writerid
)
```

## 🔑 Default Credentials
- **Username**: `admin`
- **Password**: `ureposh2024`

## 📝 Sample Data
- 1 admin user
- 3 sample posts (Workplace Safety, Legal Compliance, Women Safety)

## 🎯 What's Removed
- ❌ Unnecessary tables (writer, categories, tags, comments, views, post_tags, media)
- ❌ Complex relationships
- ❌ Unused columns
- ❌ Excessive sample data

## ✅ What's Kept
- ✅ Admin authentication
- ✅ Post creation and management
- ✅ File uploads (images and videos)
- ✅ Basic security (RLS)
- ✅ Performance indexes
- ✅ Auto-updating timestamps

This setup is **production-ready** and matches your current codebase exactly! 