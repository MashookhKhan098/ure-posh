# 🚨 Production Email Fix Guide

## ❌ **Current Issue**
Emails are not being sent when posters are uploaded or posts are approved in **production deployment** (Vercel).

## 🔍 **Root Causes**

### 1. **Missing Environment Variables in Production**
- Local development has all SMTP variables set ✅
- Production (Vercel) might be missing these variables ❌

### 2. **Wrong APP_URL in Production**
- Current: `http://localhost:4000` (only works locally)
- Needed: Your actual Vercel domain URL

### 3. **Gmail Authentication Issues**
- Regular Gmail password doesn't work with SMTP
- Needs App Password from Google Account

## 🛠️ **Step-by-Step Fix**

### **Step 1: Set Environment Variables in Vercel**

1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

2. Add these variables for **Production**, **Preview**, and **Development**:

```env
# Database (copy from your current setup)
NEXT_PUBLIC_SUPABASE_URL=https://vewlslufctaslcpobnev.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_current_key]
SUPABASE_SERVICE_ROLE_KEY=[your_current_service_key]
JWT_SECRET=[your_current_jwt_secret]

# App Configuration - CHANGE THIS TO YOUR ACTUAL VERCEL URL
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://ureposh-one.vercel.app

# Email Configuration
CONTACT_RECIPIENT_EMAIL=ureposh@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ureposh@gmail.com
SMTP_PASS=[your_gmail_app_password]
```

### **Step 2: Generate Gmail App Password**

1. **Enable 2-Factor Authentication** on ureposh@gmail.com
2. Go to **Google Account** → **Security** → **2-Step Verification** → **App passwords**
3. Generate password for **"Mail"** application
4. Copy the **16-character password** (like: `abcd efgh ijkl mnop`)
5. Use this as `SMTP_PASS` value (not your regular Gmail password)

### **Step 3: Update Your Domain URL**

Replace `ureposh-one.vercel.app` with your actual Vercel domain in:
- `NEXT_PUBLIC_APP_URL` environment variable
- This ensures email links work correctly

### **Step 4: Deploy & Test**

1. **Redeploy** your application after adding environment variables
2. Test poster upload or post approval in production
3. Check **Vercel Function Logs** for any errors

## 🧪 **Testing Commands**

### **Test Local Configuration:**
```bash
node test-production-email.js
```

### **Test Production (after fixing):**
Update the URL in `test-production-email.js` to your Vercel domain and run it.

## 🔧 **Alternative SMTP Services**

If Gmail continues to have issues, consider switching to:

### **SendGrid (Recommended for Production)**
```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=[your_sendgrid_api_key]
```

### **Mailgun**
```env
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_USER=[your_mailgun_user]
SMTP_PASS=[your_mailgun_password]
```

## 🔍 **Debugging Production Issues**

### **Check Vercel Function Logs:**
1. Go to Vercel Dashboard → Your Project → **Functions** tab
2. Click on failing function to see logs
3. Look for SMTP connection errors

### **Common Errors & Solutions:**

**Error: "SMTP Authentication failed"**
- ✅ Double-check Gmail App Password
- ✅ Ensure 2FA is enabled
- ✅ Try generating new App Password

**Error: "Connection timeout"**
- ✅ Check if Vercel has firewall restrictions
- ✅ Consider switching to SendGrid/Mailgun

**Error: "Missing environment variables"**
- ✅ Verify all variables are set in Vercel dashboard
- ✅ Redeploy after adding variables

## ✅ **Success Checklist**

- [ ] All environment variables added to Vercel
- [ ] Gmail App Password generated and set
- [ ] NEXT_PUBLIC_APP_URL updated to Vercel domain
- [ ] Application redeployed after env changes
- [ ] Test poster upload triggers email
- [ ] Test post approval triggers email
- [ ] Check Vercel logs show successful email sending

## 🚀 **Expected Result**

After implementing these fixes:
1. ✅ Poster uploads will trigger beautiful HTML emails to all subscribers
2. ✅ Post approvals will trigger newsletter emails automatically
3. ✅ Emails will have correct links (using your Vercel domain)
4. ✅ Fast API responses (background email processing)
5. ✅ Production logs will show successful email delivery

---

**Need help?** Check Vercel function logs or test with the provided debugging scripts.
