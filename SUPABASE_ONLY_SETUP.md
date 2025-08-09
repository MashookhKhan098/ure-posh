# Supabase-Only Setup Guide

## Overview
This project has been migrated from AWS (DynamoDB + S3) to use **Supabase exclusively** for all database operations and file storage.

## What Was Removed

### AWS Components Removed:
- ✅ `ureposh-backend/` - Complete AWS Lambda backend directory
- ✅ AWS SDK dependencies from `package.json`
- ✅ AWS environment variables from `env.example`
- ✅ AWS-related test files and scripts
- ✅ `server.js` and `start-dev-simple.js` (AWS backend files)

### Dependencies Removed:
```json
"@aws-sdk/client-dynamodb": "^3.848.0",
"@aws-sdk/client-s3": "^3.850.0", 
"@aws-sdk/lib-dynamodb": "^3.850.0",
"aws": "^0.0.3-2"
```

### Environment Variables Removed:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_POSTS_TABLE=ureposh-posts
AWS_S3_BUCKET=ureposh-media-uploads
BACKEND_URL=http://localhost:3001
```

## Current Supabase Setup

### Environment Variables Required:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# Admin Authentication
ADMIN_USERNAME=admin
ADMIN_PASSWORD=ureposh2024
```

### Supabase Configuration Files:
- `utils/supabase/client.ts` - Browser client for frontend
- `utils/supabase/admin.ts` - Admin client with service role
- `utils/supabase/server.ts` - Server-side client
- `utils/supabase/middleware.ts` - Middleware utilities
- `utils/supabase/writer.ts` - Writer-specific client

### API Routes (All Using Supabase):
- ✅ `app/api/posts/route.ts` - Post CRUD operations
- ✅ `app/api/admin/login/route.ts` - Admin authentication
- ✅ `app/api/writer/auth/route.ts` - Writer authentication
- ✅ `app/api/writer/posts/route.ts` - Writer post creation
- ✅ `app/api/posts/[id]/approve/route.ts` - Post approval workflow
- ✅ `app/api/writer-request/route.ts` - Writer registration

### Database Tables (Supabase):
- `posts` - All blog posts and articles
- `admin` - Admin user accounts
- `writer_profiles` - Writer user accounts
- `writer_sessions` - Writer login sessions
- `writer_requests` - Pending writer applications

### File Storage (Supabase Storage):
- All file uploads go to Supabase Storage bucket: `uploads`
- Images and videos are stored with public URLs
- Automatic file management and cleanup

## Getting Started

### 1. Set Up Supabase Project
1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and API keys
3. Create the required database tables using the SQL scripts in the project

### 2. Configure Environment
Create a `.env.local` file with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Development Server
```bash
npm run dev
```

## Key Benefits of Supabase-Only Setup

### ✅ Simplified Architecture
- Single database provider (Supabase)
- No need for separate AWS backend
- Unified authentication and storage

### ✅ Better Developer Experience
- Real-time subscriptions out of the box
- Built-in Row Level Security (RLS)
- Automatic API generation
- Built-in file storage

### ✅ Cost Effective
- Free tier available
- Pay-as-you-go pricing
- No AWS Lambda cold starts

### ✅ Easier Deployment
- No separate backend deployment
- Vercel + Supabase integration
- Simplified environment management

## Database Schema

The project uses these main tables in Supabase:

### Posts Table
```sql
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author TEXT,
  category TEXT,
  tags TEXT[],
  slug TEXT UNIQUE,
  featured_image TEXT,
  video_url TEXT,
  video_title TEXT,
  video_description TEXT,
  status TEXT DEFAULT 'draft',
  read_time INTEGER,
  view_count INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Admin Table
```sql
CREATE TABLE admin (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Writer Profiles Table
```sql
CREATE TABLE writer_profiles (
  writer_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  expertise TEXT,
  portfolio TEXT,
  social_links JSONB,
  blockchain_wallet TEXT,
  is_active BOOLEAN DEFAULT true,
  login_count INTEGER DEFAULT 0,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## File Storage

All files are stored in Supabase Storage:
- **Bucket**: `uploads`
- **Public URLs**: Automatically generated
- **File Types**: Images (jpg, png, webp), Videos (mp4, mov)
- **Organization**: Files named with timestamps for uniqueness

## Authentication

### Admin Authentication
- JWT-based authentication
- Session stored in cookies
- Protected routes: `/admin/*`
- API protection: `/api/admin/*`

### Writer Authentication  
- JWT-based authentication
- Session stored in cookies
- Protected routes: `/writer/*`
- API protection: `/api/writer/*`

## Migration Complete ✅

The project is now fully migrated to Supabase and ready for development. All AWS dependencies have been removed and the codebase is optimized for Supabase-only operations. 