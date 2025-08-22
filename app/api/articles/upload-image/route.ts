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

    // Validate file type
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

    // Generate unique filename
    const fileExt = file.name.split('.').pop() || 'png'
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `article-${Date.now()}-${safeName}`

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

    // Upload to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: `File upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    const image_url = urlData.publicUrl

    return NextResponse.json({ 
      success: true,
      image_url,
      fileName 
    }, { status: 201 })

  } catch (error) {
    console.error('Image upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
