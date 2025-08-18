import { NextRequest, NextResponse } from 'next/server'
import { getCategories, createCategory } from '../../../lib/api/categories'

export async function GET() {
  try {
    const result = await getCategories()

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
    console.error('Error in categories GET route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { name, slug, color, description } = body

    // Validate required fields
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name and slug are required' },
        { status: 400 }
      )
    }

    const result = await createCategory({
      name,
      slug,
      color: color || '#EC4899',
      description
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
    console.error('Error in categories POST route:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
