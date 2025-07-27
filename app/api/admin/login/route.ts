import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Create Supabase admin client to bypass RLS
    const supabase = createAdminClient()

    // Query the admin table for login credentials
    const { data: writers, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !writers) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password (assuming password is stored as hash)
    if (writers.password !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: writers.id, 
        username: writers.username,
        role: 'writer'
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    return NextResponse.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: writers.id,
        username: writers.username,
        email: writers.email,
        full_name: writers.full_name,
        role: writers.role || 'writer'
      }
    })

  } catch (error) {
    console.error('Writer login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 