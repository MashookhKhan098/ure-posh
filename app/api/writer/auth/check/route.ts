import { NextRequest, NextResponse } from 'next/server'
import { createWriterAdminClient } from '@/utils/supabase/writer'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('writer_token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      )
    }

    // Verify JWT token
    let decoded
    try {
      decoded = jwt.verify(token, JWT_SECRET) as any
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      return NextResponse.json(
        { error: 'Token expired' },
        { status: 401 }
      )
    }

    // Get writer data from database
    const supabase = createWriterAdminClient()
    const { data: writer, error } = await supabase
      .from('writers')
      .select('id, name, email, bio, specialization, expertise_areas, status, is_featured, verification_status')
      .eq('id', decoded.writerId)
      .single()

    if (error || !writer) {
      return NextResponse.json(
        { error: 'Writer not found' },
        { status: 404 }
      )
    }

    if (writer.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is not active' },
        { status: 403 }
      )
    }

    return NextResponse.json({
      success: true,
      writer: {
        id: writer.id,
        name: writer.name,
        email: writer.email,
        bio: writer.bio,
        specialization: writer.specialization,
        expertise_areas: writer.expertise_areas,
        status: writer.status,
        is_featured: writer.is_featured,
        verification_status: writer.verification_status
      }
    })

  } catch (error) {
    console.error('Writer auth check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
