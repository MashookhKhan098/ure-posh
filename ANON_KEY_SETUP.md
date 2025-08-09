# 🔐 Anon Key Setup for All Tables

## 📋 What You Need to Do

Your tables need proper Row Level Security (RLS) policies to work with the anon key. Here's how to set them up:

## 🚀 Quick Setup Steps

### 1. Go to Supabase SQL Editor
- Open your Supabase Dashboard
- Go to **SQL Editor** in the left sidebar

### 2. Run the Essential RLS Policies
Copy and paste the content from `essential-rls-policies.sql` into the SQL Editor and run it.

### 3. Verify the Setup
Run this query to check if policies are created:
```sql
SELECT 
    tablename,
    policyname,
    cmd
FROM pg_policies 
WHERE schemaname = 'public' 
AND tablename IN ('admin', 'writer_profiles', 'posts')
ORDER BY tablename, policyname;
```

## 🔑 What Each Policy Does

### **Admin Table Policies:**
- ✅ **Public Read Access**: Allows login verification with anon key
- ✅ **Service Role Access**: Allows admin operations with service role key

### **Writer Profiles Table Policies:**
- ✅ **Public Read Access**: Shows active writers to public
- ✅ **Service Role Access**: Allows admin to manage writers

### **Posts Table Policies:**
- ✅ **Public Read Access**: Shows published posts to public
- ✅ **Service Role Access**: Allows admin to manage all posts

### **Storage Policies:**
- ✅ **Public Read Access**: Allows viewing uploaded files
- ✅ **Service Role Access**: Allows admin to manage files

## 🧪 Test Your Setup

After running the policies, test your connection:

```bash
node test-connection.js
```

You should see:
```
✅ Admin table connected
✅ Writer profiles table connected  
✅ Posts table connected
```

## 🔍 Troubleshooting

### If you get "permission denied" errors:
1. Make sure RLS is enabled on all tables
2. Verify the policies are created correctly
3. Check that your service role key is being used for admin operations

### If anon key doesn't work:
1. Ensure public read policies are in place
2. Check that the anon key has the correct permissions
3. Verify the table structure matches the policies

## 🎯 Expected Results

After setup, your tables will have:

| Table | Public Read | Service Role | Purpose |
|-------|-------------|--------------|---------|
| `admin` | ✅ | ✅ | Admin login verification |
| `writer_profiles` | ✅ | ✅ | Writer management |
| `posts` | ✅ | ✅ | Content management |
| `storage` | ✅ | ✅ | File uploads |

## 🚀 Next Steps

1. **Run the RLS policies** in Supabase SQL Editor
2. **Test the connection** with your credentials
3. **Try admin login** at `http://localhost:3000/admin/login`

Your admin login system will be fully functional with proper security! 