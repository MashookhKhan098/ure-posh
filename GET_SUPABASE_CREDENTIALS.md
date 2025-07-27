# 🔑 How to Get Supabase Credentials

## Step 1: Create Supabase Account

1. **Go to [supabase.com](https://supabase.com)**
2. **Click "Start your project"**
3. **Sign up** with GitHub, Google, or email

## Step 2: Create New Project

1. **Click "New Project"**
2. **Choose your organization** (or create one)
3. **Fill in project details:**
   - **Name**: `ureposh` (or any name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
4. **Click "Create new project"**

## Step 3: Get Your API Keys

Once your project is created:

1. **Go to Settings** (gear icon in sidebar)
2. **Click "API"** in the left menu
3. **You'll see three important values:**

### Project URL
```
https://your-project-id.supabase.co
```

### anon public key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### service_role secret key
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up Environment Variables

1. **Create `.env.local` file** in your project root
2. **Copy this template:**

```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# JWT Secret (generate a random string)
JWT_SECRET=your_jwt_secret_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:4000
```

3. **Replace the values** with your actual credentials

## Step 5: Generate JWT Secret

Run this command to generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

## Step 6: Set Up Database

1. **Go to SQL Editor** in your Supabase dashboard
2. **Copy the content** from `supabase-fresh-setup.sql`
3. **Paste and run** the SQL script

## Step 7: Test Your Setup

```bash
# Test Supabase connection
node -e "
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
supabase.from('admin').select('count').then(console.log).catch(console.error);
"

# Test admin login
curl -X POST http://localhost:4000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "ureposh2024"}'
```

## 🔍 Where to Find Your Credentials

### In Supabase Dashboard:

1. **Settings** → **API**
2. **Project URL**: Top of the page
3. **anon public**: Under "Project API keys"
4. **service_role secret**: Under "Project API keys" (click "show" to reveal)

### Example Dashboard Layout:
```
Settings → API
├── Project URL: https://abc123.supabase.co
├── Project API keys
│   ├── anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
│   └── service_role secret: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
└── API Settings
    └── JWT Settings
```

## 🆘 Troubleshooting

### If you can't find the API keys:
1. Make sure you're in the correct project
2. Check that you have admin access
3. Try refreshing the page

### If connection fails:
1. Check that your URL starts with `https://`
2. Verify the anon key is correct
3. Make sure you've set up the database schema

### If login still gives 500 error:
1. Check that JWT_SECRET is set
2. Verify the database was created properly
3. Check the browser console for errors

## ✅ Verification Checklist

- [ ] Supabase project created
- [ ] API keys copied correctly
- [ ] Environment variables set
- [ ] Database schema created
- [ ] JWT secret generated
- [ ] Connection test successful
- [ ] Admin login working

---

**🎉 Once you have your credentials, your login should work without 500 errors!** 