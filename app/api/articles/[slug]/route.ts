import { NextRequest, NextResponse } from 'next/server'
import { getArticleBySlug, updateArticle, deleteArticle, incrementArticleViews } from '@/lib/api/articles'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const result = await getArticleBySlug(slug)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 404 }
      )
    }

    // Increment views when article is viewed
    if (result.data) {
      await incrementArticleViews(result.data.id)
    }

    return NextResponse.json({
      data: result.data,
      error: null
    })
  } catch (error) {
    console.error('Error in article GET route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const body = await request.json()

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // First get the article to get its ID
    const articleResult = await getArticleBySlug(slug)
    if (articleResult.error || !articleResult.data) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const result = await updateArticle(articleResult.data.id, body)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: result.data,
      error: null
    })
  } catch (error) {
    console.error('Error in article PUT route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // First get the article to get its ID
    const articleResult = await getArticleBySlug(slug)
    if (articleResult.error || !articleResult.data) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    const result = await deleteArticle(articleResult.data.id)

    if (result.error) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Article deleted successfully',
      error: null
    })
  } catch (error) {
    console.error('Error in article DELETE route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
