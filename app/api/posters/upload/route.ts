import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const title = (formData.get('title') as string) || ''
    const description = (formData.get('description') as string) || ''
    const category = (formData.get('category') as string) || ''
    const priceRaw = (formData.get('price') as string) || ''
    const featuredRaw = (formData.get('featured') as string) || 'false'
    const tagsRaw = (formData.get('tags') as string) || ''
    const file = formData.get('image') as File | null

    if (!title || !file || !priceRaw) {
      return NextResponse.json(
        { error: 'Title, image file and price are required' },
        { status: 400 }
      )
    }

    const price = parseFloat(priceRaw)
    if (Number.isNaN(price) || price <= 0) {
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
    } catch (_) {
      tags = []
    }

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const fileExt = file.name.split('.').pop() || 'png'
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
    const fileName = `${Date.now()}-${safeName}`

    const { error: uploadError } = await supabase.storage
      .from('uploads')
      .upload(fileName, file)

    if (uploadError) {
      return NextResponse.json(
        { error: `File upload failed: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName)

    const image_url = urlData.publicUrl

    const { data: poster, error: insertError } = await supabase
      .from('posters')
      .insert({
        title,
        description,
        image_url,
        category: category || null,
        tags,
        price,
        featured,
        status: 'active'
      })
      .select()
      .single()

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ poster }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


