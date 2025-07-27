# Writer Database Setup Guide

This guide will help you properly connect the writer authentication system to your database.

## 🔧 **Step 1: Environment Variables**

Make sure you have these environment variables in your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Secret for authentication
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

## 🗄️ **Step 2: Database Schema**

Your `writer_profiles` table should have this structure:

```sql
CREATE TABLE writer_profiles (
  writer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  bio TEXT,
  avatar_url TEXT,
  specialization VARCHAR(100),
  experience_level VARCHAR(50) DEFAULT 'beginner',
  is_verified BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  login_count INTEGER DEFAULT 0,
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 📝 **Step 3: Add Test Data**

Run this SQL script to add test writer accounts:

```sql
-- Add demo writer account
INSERT INTO writer_profiles (
  username, 
  email, 
  password_hash, 
  full_name, 
  specialization, 
  experience_level, 
  is_verified, 
  is_active
) VALUES 
(
  'demo_writer', 
  'demo@ureposh.com', 
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 
  'Demo Writer', 
  'General', 
  'intermediate', 
  true, 
  true
);
```

## 🧪 **Step 4: Test Database Connection**

Run the database connection test:

```bash
node test-writer-db-connection.js
```

This will verify:
- ✅ Database connection
- ✅ writer_profiles table access
- ✅ Test data presence
- ✅ Authentication query functionality

## 🔐 **Step 5: Test Authentication**

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the writer portal:**
   ```
   http://localhost:4000/writer
   ```

3. **Login with test credentials:**
   - **Username:** `demo_writer`
   - **Password:** `ureposh2024`

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"Missing writer database environment variables"**
   - Check your `.env.local` file
   - Ensure all Supabase variables are set

2. **"Table 'writer_profiles' does not exist"**
   - Run the SQL schema creation script
   - Check if you're connected to the right database

3. **"Invalid credentials" error**
   - Verify the test data was inserted correctly
   - Check if the password hash is correct

4. **"JWT_SECRET not set"**
   - Generate a JWT secret: `node generate-jwt-secret.js`
   - Add it to your `.env.local` file

### **Database Connection Test:**

```bash
# Test the connection
node test-writer-db-connection.js

# Expected output:
# ✅ Supabase client created successfully
# ✅ writer_profiles table accessible
# 📊 Found 1 writer profiles
# ✅ Authentication query successful
```

### **Manual Database Check:**

```sql
-- Check if writer_profiles table exists
SELECT * FROM writer_profiles LIMIT 1;

-- Check if demo_writer exists
SELECT username, email, is_active FROM writer_profiles WHERE username = 'demo_writer';

-- Check table structure
\d writer_profiles;
```

## 🚀 **Step 6: Verify Everything Works**

1. **Database Connection:** ✅
2. **Table Structure:** ✅
3. **Test Data:** ✅
4. **Authentication API:** ✅
5. **Login Page:** ✅
6. **Dashboard Access:** ✅

## 📋 **Complete Setup Checklist**

- [ ] Environment variables configured
- [ ] Database schema created
- [ ] Test data inserted
- [ ] Database connection tested
- [ ] Authentication API working
- [ ] Login page accessible
- [ ] Dashboard functional

## 🎯 **Test Credentials**

| Username | Password | Full Name | Specialization |
|----------|----------|-----------|----------------|
| `demo_writer` | `ureposh2024` | Demo Writer | General |

## 🔧 **Advanced Configuration**

### **Custom Database URL (if different from main Supabase):**

```env
NEXT_PUBLIC_WRITER_SUPABASE_URL=your_writer_supabase_url
NEXT_PUBLIC_WRITER_SUPABASE_ANON_KEY=your_writer_supabase_anon_key
WRITER_SUPABASE_SERVICE_ROLE_KEY=your_writer_supabase_service_role_key
```

### **Row Level Security (RLS):**

If using Supabase with RLS enabled, add these policies:

```sql
-- Enable RLS
ALTER TABLE writer_profiles ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view their own profile
CREATE POLICY "Users can view own profile" ON writer_profiles
  FOR SELECT USING (auth.uid()::text = writer_id::text);
```

## 📞 **Support**

If you encounter issues:

1. Check the browser console for errors
2. Run the database connection test
3. Verify environment variables
4. Check database table structure
5. Test with the provided credentials

The writer authentication system should now be properly connected to your database! 🎉 