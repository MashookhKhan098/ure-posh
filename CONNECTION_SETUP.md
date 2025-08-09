# 🔗 Connect Your Tables to Supabase

## ✅ Tables Created Successfully!
Your three tables are now created in Supabase:
- `admin` - For admin authentication
- `writer_profiles` - For writer management  
- `posts` - For content management

## 🔧 Next Steps to Connect:

### 1. Get Your Supabase Credentials

1. **Go to your Supabase Dashboard**
   - Visit [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Click on your project

2. **Copy API Credentials**
   - Go to **Settings** → **API**
   - Copy these values:
     - **Project URL** (looks like: `https://abc123.supabase.co`)
     - **anon public** key (starts with `eyJ...`)
     - **service_role secret** key (starts with `eyJ...`)

### 2. Create Environment File

Create a file named `.env.local` in your project root with this content:

```env
# ========================================
# SUPABASE CONFIGURATION
# ========================================
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY_HERE

# ========================================
# AUTHENTICATION & SECURITY
# ========================================
JWT_SECRET=69ef7fb68fb41f982e2211ba1f82cb9b1c62af90087d138be3250c20b7ccf30244504d48e93b21af03fa0734a399d577d207bf17e00aab008e5eef334436d989

# ========================================
# APPLICATION CONFIGURATION
# ========================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Replace the placeholder values with your actual Supabase credentials.**

### 3. Test the Connection

After creating `.env.local`, run this command to test:

```bash
node test-connection.js
```

You should see:
```
✅ Environment variables found
✅ Admin table connected
✅ Writer profiles table connected  
✅ Posts table connected
```

### 4. Start the Application

```bash
npm run dev
```

### 5. Test Admin Login

1. Go to `http://localhost:3000/admin/login`
2. Login with:
   - **Username**: `admin`
   - **Password**: `admin123`

## 🔍 Troubleshooting

### If you get "fetch failed" error:
- Check that your Supabase credentials are correct
- Make sure the `.env.local` file is in the project root
- Verify your Supabase project is active

### If you get "Invalid credentials":
- Check if the admin user exists in your database
- Verify the password hash in the database

### Database Verification:
Run this in Supabase SQL Editor:
```sql
SELECT * FROM admin WHERE username = 'admin';
```

## 🎯 What's Connected:

✅ **Admin Authentication** - Login system ready  
✅ **Writer Management** - Writer profiles table ready  
✅ **Content Management** - Posts table ready  
✅ **File Storage** - Supabase storage ready  

## 🚀 Ready to Use!

Once you've updated the `.env.local` file with your actual Supabase credentials, your admin login system will be fully connected and ready to use! 