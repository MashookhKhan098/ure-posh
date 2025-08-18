import { NextRequest, NextResponse } from 'next/server'
import { createWriterAdminClient } from '@/utils/supabase/writer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Create Supabase admin client to bypass RLS
    const supabase = createWriterAdminClient()

    // Get writer by email from the writers table
    const { data: writer, error: fetchError } = await supabase
      .from('writers')
      .select('*')
      .eq('email', email)
      .single()

    if (fetchError || !writer) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Check if writer is active
    if (writer.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is not active. Please contact admin for activation.' },
        { status: 403 }
      )
    }

    // Verify password - check both password_hash and password fields
    let isValidPassword = false
    
    if (writer.password_hash) {
      // Use bcrypt to verify against hashed password
      isValidPassword = await bcrypt.compare(password, writer.password_hash)
    } else if (writer.password) {
      // Fallback to plain text password (temporary during migration)
      isValidPassword = (password === writer.password)
    }
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        writerId: writer.id, 
        email: writer.email,
        name: writer.name,
        role: 'writer'
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Update last login (if you want to track this)
    // await supabase
    //   .from('writers')
    //   .update({ 
    //     last_article_date: new Date().toISOString()
    //   })
    //   .eq('id', writer.id)

    // Set HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
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

    response.cookies.set('writer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Writer login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
