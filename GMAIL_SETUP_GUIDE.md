# Gmail App Password Setup Guide

## Step 1: Enable 2-Factor Authentication

1. **Go to your Google Account**:
   - Visit: https://myaccount.google.com/
   - Sign in with your Gmail account: `ureposh@gmail.com`

2. **Navigate to Security**:
   - Click on "Security" in the left sidebar
   - Or go directly to: https://myaccount.google.com/security

3. **Enable 2-Step Verification**:
   - Look for "2-Step Verification" section
   - Click "Get started" or "Turn on"
   - Follow the prompts to set up with your phone number
   - Complete the verification process

## Step 2: Generate App Password

1. **Go to App Passwords**:
   - After enabling 2FA, go back to Security settings
   - Find "App passwords" section
   - Click on "App passwords"
   - Or go directly to: https://myaccount.google.com/apppasswords

2. **Create New App Password**:
   - Click "Select app" dropdown → Choose "Mail"
   - Click "Select device" dropdown → Choose "Other (custom name)"
   - Type: "Ureposh Contact Form"
   - Click "Generate"

3. **Copy the App Password**:
   - Google will show a 16-character password like: `abcd efgh ijkl mnop`
   - **IMPORTANT**: Copy this password immediately - you won't see it again!

## Step 3: Update Environment Variables

### For Local Development (Optional):
Update your `.env.local` file:
```bash
# Uncomment and update these lines:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=ureposh@gmail.com
SMTP_PASS=abcdefghijklmnop  # Replace with your actual app password (no spaces)
```

### For Production Deployment:

#### If using Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add these variables:
   - `CONTACT_RECIPIENT_EMAIL` = `ureposh@gmail.com`
   - `SMTP_HOST` = `smtp.gmail.com`
   - `SMTP_PORT` = `587`
   - `SMTP_USER` = `ureposh@gmail.com`
   - `SMTP_PASS` = `your-16-character-app-password`

#### If using other hosting services:
Set the same environment variables in your hosting platform's environment configuration.

## Step 4: Test the Setup

1. **Local Testing** (if you updated .env.local):
   - Restart your development server: `npm run dev`
   - Test the contact form
   - Check if emails arrive at ureposh@gmail.com

2. **Production Testing**:
   - Deploy your changes
   - Test the contact form on your live website
   - Check your Gmail inbox for test emails

## Troubleshooting

### If you get "Username and Password not accepted":
- Make sure you're using the App Password, not your regular Gmail password
- Remove any spaces from the App Password
- Ensure 2FA is properly enabled

### If emails don't arrive:
- Check Gmail spam folder
- Verify all environment variables are set correctly
- Check your hosting platform's logs for errors

### Security Notes:
- Never share your App Password
- If compromised, delete the App Password and generate a new one
- The App Password is specific to this application

## Quick Links:
- Google Account Security: https://myaccount.google.com/security
- App Passwords: https://myaccount.google.com/apppasswords
- Gmail Settings: https://mail.google.com/mail/u/0/#settings/general

---

**Need Help?** If you encounter any issues, check the error messages in your application logs or contact your developer.
