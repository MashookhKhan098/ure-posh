import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('image') as File | null

    if (!file) {
      return NextResponse.json(
        { error: 'Image file is required' },
        { status: 400 }
      )
    }

    // Enhanced file validation
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
        { status: 400 }
      )
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum size is 5MB.' },
        { status: 400 }
      )
    }

    // Validate file name
    if (!file.name || file.name.trim() === '') {
      return NextResponse.json(
        { error: 'File name is required.' },
        { status: 400 }
      )
    }

    // Use service role key to bypass RLS policies
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Storage service not configured. Please check your environment variables.' },
        { status: 500 }
      )
    }
    
    const supabase = createClient(supabaseUrl, serviceRoleKey)

    // Generate unique filename with better naming for people
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'png'
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2, 15)
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').toLowerCase()
    const fileName = `people-${timestamp}-${randomId}-${safeName}`

    // Check if uploads bucket exists, if not try to create it
    let bucketName = 'uploads'
    
    // First, try to list buckets to see what's available
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    
    if (listError) {
      console.error('Error listing buckets:', listError)
      return NextResponse.json(
        { error: 'Storage service unavailable. Please check your Supabase configuration.' },
        { status: 500 }
      )
    }
    
    // Check if uploads bucket exists
    const uploadsBucket = buckets.find(bucket => bucket.name === 'uploads')
    
    if (!uploadsBucket) {
      // Try to create the bucket
      console.log('Creating uploads bucket...')
      const { error: createError } = await supabase.storage.createBucket('uploads', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      })
      
      if (createError) {
        console.error('Failed to create bucket:', createError)
        return NextResponse.json(
          { error: 'Storage bucket not found. Please run the setup script or create the "uploads" bucket manually in your Supabase dashboard.' },
          { status: 500 }
        )
      }
    }

    // Upload to Supabase storage with better error handling
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      
      // Provide more specific error messages
      if (uploadError.message.includes('duplicate')) {
        return NextResponse.json(
          { error: 'A file with this name already exists. Please try uploading again.' },
          { status: 409 }
        )
      } else if (uploadError.message.includes('size')) {
        return NextResponse.json(
          { error: 'File size exceeds the allowed limit.' },
          { status: 413 }
        )
      } else if (uploadError.message.includes('type')) {
        return NextResponse.json(
          { error: 'File type not allowed.' },
          { status: 415 }
        )
      } else {
        return NextResponse.json(
          { error: `File upload failed: ${uploadError.message}` },
          { status: 500 }
        )
      }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    const image_url = urlData.publicUrl

    // Return enhanced response with more details
    return NextResponse.json({ 
      success: true,
      image_url,
      fileName,
      fileSize: file.size,
      fileType: file.type,
      uploadedAt: new Date().toISOString(),
      bucket: bucketName,
      message: 'People image uploaded successfully to Supabase storage'
    }, { status: 201 })

  } catch (error) {
    console.error('People image upload error:', error)
    
    // Provide more specific error messages based on error type
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Network error. Please check your internet connection and try again.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' }, 
      { status: 500 }
    )
  }
}
