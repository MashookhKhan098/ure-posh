import { NextRequest, NextResponse } from 'next/server'
import { getArticles, createArticle } from '../../../lib/api/articles'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const category = searchParams.get('category') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
    const featured = searchParams.get('featured') === 'true'
    const breaking = searchParams.get('breaking') === 'true'
    const hot = searchParams.get('hot') === 'true'
    const sortBy = searchParams.get('sortBy') as 'published_at' | 'views' | 'created_at' || 'published_at'
    const sortOrder = searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc'

    const result = await getArticles({
      category,
      limit,
      offset,
      featured,
      breaking,
      hot,
      sortBy,
      sortOrder
    })

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      count: result.count,
      error: null
    })
  } catch (error) {
    console.error('Error in articles GET route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { title, slug, excerpt, content, image_url, author, is_breaking, is_hot, is_featured, category_id } = body

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const result = await createArticle({
      title,
      slug,
      excerpt,
      content,
      image_url,
      author,
      is_breaking: is_breaking || false,
      is_hot: is_hot || false,
      is_featured: is_featured || false,
      category_id
    })

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      error: null
    }, { status: 201 })
  } catch (error) {
    console.error('Error in articles POST route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
