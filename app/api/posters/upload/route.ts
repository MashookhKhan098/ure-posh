import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function POST(request: NextRequest) {
  try {
    console.log('Starting poster upload...')
    const formData = await request.formData()

    const title = (formData.get('title') as string) || ''
    const description = (formData.get('description') as string) || ''
    const category = (formData.get('category') as string) || ''
    const priceRaw = (formData.get('price') as string) || ''
    const featuredRaw = (formData.get('featured') as string) || 'false'
    const tagsRaw = (formData.get('tags') as string) || ''
    const file = formData.get('image') as File | null

    console.log('Form data parsed:', { title, category, priceRaw, featuredRaw, hasFile: !!file })

    if (!title || !file || !priceRaw) {
      console.log('Validation failed - missing required fields')
      return NextResponse.json(
        { error: 'Title, image file and price are required' },
        { status: 400 }
      )
    }

    const price = parseFloat(priceRaw)
    if (Number.isNaN(price) || price <= 0) {
      console.log('Validation failed - invalid price:', price)
      return NextResponse.json({ error: 'Invalid price' }, { status: 400 })
    }

    const featured = String(featuredRaw).toLowerCase() === 'true'
    let tags: string[] = []
    try {
      // Accept comma-separated or JSON array
      if (tagsRaw) {
        if (tagsRaw.trim().startsWith('[')) {
          tags = JSON.parse(tagsRaw)
        } else {
          tags = tagsRaw
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        }
      }
    } catch (err) {
      console.log('Tags parsing failed:', err)
      tags = []
    }

    console.log('Parsed data:', { title, description, category, price, featured, tags })

    const supabase = createAdminClient()

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.log('File too large:', file.size)
      return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop() || 'png'
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `posters/${Date.now()}-${safeName}`

    console.log('Uploading file:', fileName)

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file)

    if (uploadError) {
      console.error('File upload error:', uploadError)
      return NextResponse.json(
        { error: `File upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    console.log('File uploaded successfully')

    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName)

    const image_url = urlData.publicUrl

    console.log('Public URL generated:', image_url)

    // First, let's check if the posters table exists
    const { data: tables, error: tablesError } = await supabase.rpc('get_tables')
    console.log('Available tables check:', { tables, tablesError })

    const posterData = {
      title,
      description,
      image_url,
      category: category || null,
      tags,
      price,
      featured,
      status: 'active'
    }

    console.log('Inserting poster data:', posterData)

    const { data: poster, error: insertError } = await supabase
      .from('posters')
      .insert(posterData)
      .select()
      .single()

    if (insertError) {
      console.error('Database insert error:', insertError)
      return NextResponse.json({ error: `Database error: ${insertError.message}` }, { status: 500 })
    }

    console.log('✅ Poster created:', poster.title)

    // 📧 SEND NEWSLETTER NOTIFICATION IN BACKGROUND
    Promise.resolve().then(async () => {
      try {
        console.log('📧 Triggering newsletter notification for uploaded poster...')
        
        // Call the newsletter API with poster data
        const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ureposh-one.vercel.app'
        const notificationResponse = await fetch(`${baseUrl}/api/newsletter/notify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            postId: poster.id,
            postType: 'posters',
            postTitle: poster.title,
            postSlug: poster.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            postContent: poster.description || 'New poster available for download.',
            postImage: poster.image_url
          })
        })
        
        if (notificationResponse.ok) {
          const notificationResult = await notificationResponse.json()
          console.log(`✅ Newsletter sent to ${notificationResult.sentCount} subscribers`)
        } else {
          console.log('⚠️ Newsletter notification failed:', await notificationResponse.text())
        }
      } catch (notificationError) {
        console.error('❌ Newsletter notification error:', notificationError)
      }
    }).catch(error => {
      console.error('Background email task error:', error)
    })

    console.log('Poster inserted successfully:', poster)

    return NextResponse.json({ 
      poster,
      message: 'Poster uploaded successfully! Newsletter notification is being sent in background.',
      emailStatus: 'processing'
    }, { status: 201 })
  } catch (error) {
    console.error('Unexpected error in poster upload:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}


