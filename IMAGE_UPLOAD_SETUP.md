# 🖼️ Image Upload Setup Guide

## ✅ **What's Been Added**

Your writer section now has a complete image upload feature with:

- **📤 Upload Button**: Click to select and upload images from your device
- **🔗 URL Input**: Still available for external image URLs  
- **👀 Live Preview**: See uploaded/entered images immediately
- **🗑️ Remove Button**: Clear current images easily
- **📋 File Validation**: Client-side validation with helpful error messages
- **⚡ Upload Status**: Shows "Uploading..." during file upload

## 🚀 **Setup Steps**

### 1. **Storage Bucket Setup** ✅ COMPLETED
The storage bucket has been automatically created. If you encounter issues, run:
```bash
node setup-storage-bucket.js
```

### 2. **Test the Upload Feature**
1. Start your development server: `npm run dev`
2. Go to your writer dashboard
3. Click "Create New Article"
4. In the Featured Image section, click "Upload Image"
5. Select an image file
6. You should see the upload progress and preview

### 3. **Manual Bucket Setup (if needed)**
If the automatic setup didn't work, manually create the bucket:

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Storage** in the left sidebar
4. Click **"Create a new bucket"**
5. Set the following:
   - **Name**: `uploads`
   - **Public bucket**: ✅ Checked
   - **File size limit**: `5MB`
   - **Allowed MIME types**: `image/jpeg, image/jpg, image/png, image/webp, image/gif`

## 🔧 **File Requirements**

- **📁 Formats**: JPEG, PNG, WebP, GIF
- **📏 Size**: Maximum 5MB
- **📐 Recommended**: 1200x630 pixels for optimal display

## 🐛 **Troubleshooting**

### **"Row Level Security Policy" Error** ✅ FIXED
This error has been fixed by updating the API to use the service role key. If you still encounter issues:

1. **Quick Fix - Disable RLS**:
   - Go to Supabase Dashboard → Storage → uploads → Settings
   - Disable "Row Level Security (RLS)" for the uploads bucket

2. **Manual Policy Setup**:
   - See `MANUAL_STORAGE_SETUP.md` for detailed instructions
   - Add policies for public read access and authenticated uploads

### **"Bucket not found" Error**
If you see this error, the storage bucket wasn't created properly:

1. **Run the setup script**:
   ```bash
   node setup-storage-bucket.js
   ```

2. **Check your environment variables**:
   Make sure your `.env.local` has:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

3. **Manual bucket creation**:
   - Go to Supabase Dashboard → Storage
   - Create bucket named "uploads"
   - Make it public
   - Set file size limit to 5MB

### **"Permission denied" Error**
If uploads fail due to permissions:

1. Go to Supabase Dashboard → Storage → uploads
2. Click **"Policies"**
3. Add a policy for public read access:
   ```sql
   CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'uploads');
   ```

### **Test the API**
Run this to test if the upload API is working:
```bash
node test-image-upload.js
```

## 🎯 **How to Use**

### **For Writers:**
1. **Upload Image**: Click "Upload Image" → Select file → Wait for upload
2. **Use URL**: Paste image URL in the text field
3. **Preview**: See your image preview immediately
4. **Remove**: Click the trash icon to clear the image
5. **Publish**: Your article will include the featured image

### **Features:**
- ✅ **Drag & Drop**: Coming soon
- ✅ **Multiple formats**: JPEG, PNG, WebP, GIF
- ✅ **Size validation**: 5MB limit
- ✅ **Live preview**: See images before publishing
- ✅ **Error handling**: Clear error messages
- ✅ **Progress indicator**: Shows upload status

## 📝 **API Endpoints**

- **POST** `/api/articles/upload-image` - Upload image files
- **GET** `/api/articles` - Get articles (existing)
- **POST** `/api/articles` - Create articles (existing)

## 🔒 **Security**

- File type validation on both client and server
- File size limits enforced
- Unique filenames to prevent conflicts
- Public bucket for easy access to uploaded images

## 🎨 **Customization**

You can modify the upload settings in `app/api/articles/upload-image/route.ts`:

- Change file size limit
- Add more file types
- Modify bucket name
- Add custom validation rules

---

## 🎉 **You're All Set!**

Your writer section now has a complete image upload system. Writers can easily upload their own images or use external URLs for their article featured images.

**Next steps:**
1. Test the upload feature in your writer dashboard
2. Create some articles with uploaded images
3. Check that images display correctly on your site

If you encounter any issues, check the troubleshooting section above or run the test script to verify everything is working correctly.
