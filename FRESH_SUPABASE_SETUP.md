# 🚀 Fresh Supabase Setup Guide

This guide will help you set up a fresh Supabase database with sample data for your Ureposh application.

## 📋 Prerequisites

1. **Supabase Account**: Create a project at [supabase.com](https://supabase.com)
2. **Environment Variables**: Set up your `.env.local` file

## 🔧 Quick Setup

### Step 1: Environment Setup

Add these to your `.env.local` file:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

### Step 2: Database Setup

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Copy and paste the entire content of `supabase-fresh-setup.sql`
4. Click **Run** to execute the script

### Step 3: Verify Setup

Run this query in Supabase to verify everything is set up:

```sql
SELECT 
    table_name, 
    record_count 
FROM (
    SELECT 'admin' as table_name, COUNT(*) as record_count FROM admin
    UNION ALL
    SELECT 'writer', COUNT(*) FROM writer
    UNION ALL
    SELECT 'posts', COUNT(*) FROM posts
    UNION ALL
    SELECT 'comments', COUNT(*) FROM comments
    UNION ALL
    SELECT 'views', COUNT(*) FROM views
    UNION ALL
    SELECT 'categories', COUNT(*) FROM categories
    UNION ALL
    SELECT 'tags', COUNT(*) FROM tags
) t
ORDER BY table_name;
```

## 🎯 What's Included

### ✅ **Sample Data Created:**

**Admin Account:**
- Username: `admin`
- Password: `ureposh2024`

**Sample Writers:**
- Jane Doe (Workplace Safety)
- Priya Sharma (Legal Compliance)
- Sarah Johnson (Women Safety)

**Sample Posts:**
- Understanding Workplace Harassment Prevention
- Legal Aspects of POSH Compliance
- Women Safety in the Digital Age
- Creating Inclusive Workplaces

**Categories:**
- Workplace Safety
- Legal Compliance
- Women Safety
- POSH Compliance
- General

**Tags:**
- harassment, prevention, workplace, legal, compliance, posh, women-safety, empowerment, training, awareness

## 🧪 Test Your Setup

### Test Admin Login

```bash
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "ureposh2024"}'
```

### Test Posts API

```bash
curl http://localhost:4000/api/posts
```

### Test Individual Post

```bash
curl http://localhost:4000/api/posts/understanding-workplace-harassment-prevention
```

## 📊 Sample Data Overview

| Table | Records | Description |
|-------|---------|-------------|
| admin | 1 | Admin user for login |
| writer | 3 | Sample writers |
| posts | 4 | Sample blog posts |
| comments | 5 | Sample comments |
| views | 4 | View analytics |
| categories | 5 | Post categories |
| tags | 10 | Common tags |

## 🔐 Security Features

- ✅ **Password Hashing**: All passwords are bcrypt hashed
- ✅ **Row Level Security**: RLS policies configured
- ✅ **JWT Authentication**: Token-based auth
- ✅ **Input Validation**: Proper data validation

## 🚀 Next Steps

1. **Test the login** with admin credentials
2. **Explore the sample posts** in your application
3. **Add your own content** through the admin interface
4. **Customize the design** and branding
5. **Add more writers** and content

## 🆘 Troubleshooting

### Common Issues:

1. **Connection Error**: Check Supabase URL and keys
2. **Login Fails**: Verify admin credentials
3. **Posts Not Loading**: Check RLS policies

### Debug Commands:

```bash
# Test Supabase connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
supabase.from('admin').select('count').then(console.log).catch(console.error);
"
```

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] Environment variables set
- [ ] Database schema created
- [ ] Sample data loaded
- [ ] Admin login working
- [ ] Posts API working
- [ ] Application running without errors

---

**🎉 Congratulations!** Your fresh Supabase setup is complete and ready to use! 