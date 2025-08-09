# Supabase Setup Steps

## Step 1: Create Supabase Project

1. **Go to Supabase Dashboard**
   - Visit [https://supabase.com](https://supabase.com)
   - Sign up/Login to your account

2. **Create New Project**
   - Click "New Project"
   - Choose your organization
   - Enter project name: `ureposh`
   - Enter database password (save this!)
   - Choose region closest to you
   - Click "Create new project"

## Step 2: Get Your Supabase Credentials

1. **Go to Project Settings**
   - In your Supabase dashboard, click on your project
   - Go to "Settings" → "API"

2. **Copy the Credentials**
   - **Project URL**: `https://your-project-id.supabase.co`
   - **Anon Key**: `your_supabase_anon_key_here`
   - **Service Role Key**: `your_supabase_service_role_key_here`

## Step 3: Set Up Environment Variables

1. **Create `.env.local` file**
   ```bash
   # In your project root directory
   cp env-template.txt .env.local
   ```

2. **Update `.env.local` with your credentials**
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

   # JWT Secret for authentication
   JWT_SECRET=69ef7fb68fb41f982e2211ba1f82cb9b1c62af90087d138be3250c20b7ccf30244504d48e93b21af03fa0734a399d577d207bf17e00aab008e5eef334436d989

   # Optional: Additional configuration
   NODE_ENV=development
   ```

## Step 4: Create Database Tables

1. **Go to SQL Editor**
   - In Supabase dashboard, click "SQL Editor" in the left sidebar

2. **Run the SQL Commands**
   - Copy the content from `database_tables.sql`
   - Paste it in the SQL Editor
   - Click "Run" to execute

3. **Verify Tables Created**
   - Go to "Table Editor" in the left sidebar
   - You should see: `admin`, `writer_profiles`, `posts`

## Step 5: Set Up Storage Bucket

1. **Create Storage Bucket**
   - Go to "Storage" in the left sidebar
   - Click "Create a new bucket"
   - Name: `uploads`
   - Make it public
   - Click "Create bucket"

2. **Set Storage Policies**
   - Go to "Storage" → "Policies"
   - Add policy for `uploads` bucket:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
   
   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated users can upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
   ```

## Step 6: Test the Connection

1. **Start your development server**
   ```bash
   npm run dev
   ```

2. **Test Admin Login**
   - Go to `http://localhost:3000/admin/login`
   - Login with:
     - Username: `admin`
     - Password: `admin123`

3. **Check Database Connection**
   - Go to Supabase Dashboard → "Table Editor"
   - Check if login attempts are recorded

## Step 7: Verify API Endpoints

1. **Test Admin Login API**
   ```bash
   curl -X POST http://localhost:3000/api/admin/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

2. **Test Dashboard API**
   ```bash
   curl http://localhost:3000/api/admin/dashboard
   ```

## Troubleshooting

### Common Issues:

1. **"Invalid credentials" error**
   - Check if admin user exists in database
   - Verify password hash in database

2. **"Database connection error"**
   - Verify Supabase credentials in `.env.local`
   - Check if tables exist in Supabase

3. **"JWT verification failed"**
   - Ensure JWT_SECRET is set in environment
   - Check if token is being sent correctly

### Database Verification:

```sql
-- Check if admin user exists
SELECT * FROM admin WHERE username = 'admin';

-- Check if tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('admin', 'writer_profiles', 'posts');
```

## Security Notes:

1. **Change default passwords** in production
2. **Use strong JWT_SECRET** in production
3. **Enable Row Level Security** for better security
4. **Set up proper CORS** for production

## Next Steps:

1. **Add more admin users** through the admin interface
2. **Set up writer registration** system
3. **Configure email notifications**
4. **Set up backup and monitoring** 