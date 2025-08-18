# 🔐 Writer Password Authentication Setup Guide

## 📋 Overview

This guide will help you add secure password authentication to your existing `writers` table. The system will support both plain text passwords (temporary) and bcrypt hashed passwords (secure).

## 🚀 Step-by-Step Setup

### **Step 1: Run the Password Addition Script**

1. Go to your **Supabase Dashboard**
2. Navigate to **SQL Editor**
3. Copy and paste the contents of `scripts/add-password-to-writers.sql`
4. Execute the script

**What this script does:**
- ✅ Adds `password` and `password_hash` columns to `writers` table
- ✅ Sets default password `demo123` for all existing writers
- ✅ Creates email index for faster login queries
- ✅ Adds validation constraints

### **Step 2: Test the Updated Authentication**

After running the script, test the login system:

1. **Start your app:** `npm run dev`
2. **Visit:** `/writer/login`
3. **Login with any active writer:**
   - **Email:** `writer@gmail.com` (or any active writer)
   - **Password:** `demo123`

### **Step 3: Verify Database Changes**

Run this query in Supabase SQL Editor to verify:

```sql
-- Check new columns
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'writers' 
  AND column_name IN ('password', 'password_hash');

-- Check all writers have passwords
SELECT id, name, email, 
       CASE WHEN password_hash IS NOT NULL THEN 'Has Password' ELSE 'No Password' END as status
FROM writers
ORDER BY name;
```

## 🔒 Security Features

### **Current Implementation:**
- **Dual Authentication:** Supports both plain text and hashed passwords
- **Bcrypt Hashing:** Uses industry-standard bcrypt for password security
- **Fallback Support:** Gracefully handles migration period

### **Password Requirements:**
- **Default Password:** `demo123` (for all writers initially)
- **Hash Format:** Bcrypt with salt (60+ characters)
- **Validation:** Ensures proper hash format

## 📝 Available Writers for Testing

Based on your table, these writers can log in with `demo123`:

| Email | Name | Specialization | Status |
|-------|------|----------------|---------|
| `writer@gmail.com` | Writer | General Content | Active |
| `sarah.johnson@ureposh.com` | Sarah Johnson | Workplace Safety | Active |
| `michael.chen@ureposh.com` | Michael Chen | Technology | Active |
| `emily.rodriguez@ureposh.com` | Emily Rodriguez | Healthcare | Active |
| `james.wilson@ureposh.com` | James Wilson | Construction | Active |

## 🔄 Migration to Secure Passwords

### **Option 1: Automatic Migration (Recommended)**
When writers log in for the first time, you can automatically hash their passwords:

```typescript
// In your login API, after successful authentication:
if (writer.password && !writer.password_hash) {
  // Hash the plain text password
  const hashedPassword = await bcrypt.hash(writer.password, 10);
  
  // Update the database
  await supabase
    .from('writers')
    .update({ password_hash: hashedPassword })
    .eq('id', writer.id);
}
```

### **Option 2: Manual Update**
Update passwords manually in Supabase:

```sql
-- Example: Update a specific writer's password
UPDATE writers 
SET password_hash = '$2a$10$newhashhere...'
WHERE email = 'writer@gmail.com';
```

## 🧹 Final Cleanup (After Migration)

Once all writers have hashed passwords:

1. **Run the cleanup script:** `scripts/remove-plain-password.sql`
2. **This will:**
   - Remove the plain text `password` column
   - Add stricter validation for bcrypt hashes
   - Ensure only secure authentication remains

## 🧪 Testing Commands

### **Test Database Connection:**
```bash
node test-writer-auth.js
```

### **Test Login Flow:**
1. Visit `/writer/login`
2. Use any active writer email + `demo123`
3. Should redirect to `/writer/dashboard`
4. Check writer profile information

## ⚠️ Important Notes

### **Security Considerations:**
- **Default Password:** `demo123` is for testing only
- **Production:** Change passwords after first login
- **Hash Storage:** Never store plain text passwords in production

### **Migration Timeline:**
- **Phase 1:** Add password fields (current)
- **Phase 2:** Writers log in, passwords get hashed
- **Phase 3:** Remove plain text password field
- **Phase 4:** Implement password change functionality

## 🆘 Troubleshooting

### **Common Issues:**

1. **"Table doesn't exist"**
   - Ensure you're in the correct Supabase project
   - Check table name is `writers` (not `writer_profiles`)

2. **"Invalid email or password"**
   - Verify writer status is `active`
   - Check email spelling
   - Ensure password is `demo123`

3. **"Missing environment variables"**
   - Check `.env.local` file exists
   - Verify Supabase credentials are correct

### **Debug Queries:**
```sql
-- Check writer status
SELECT email, status, password_hash IS NOT NULL as has_password
FROM writers
WHERE email = 'your-email@example.com';

-- Check table structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'writers';
```

## 🎯 Next Steps

After successful setup:

1. **Test all writer logins**
2. **Implement password change functionality**
3. **Add password reset capabilities**
4. **Set up proper password policies**
5. **Monitor authentication logs**

---

**Need Help?** Check the console logs and Supabase dashboard for detailed error messages.
