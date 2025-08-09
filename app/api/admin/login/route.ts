import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'

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
    // 1) Try exact username match (case-sensitive)
    let { data: admin, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', username)
      .single()

    // 2) If not found, try exact email match
    if (error || !admin) {
      const emailTry = await supabase
        .from('admin')
        .select('*')
        .eq('email', username)
        .single()
      admin = emailTry.data as any
      error = emailTry.error as any
    }

    // 3) If still not found, try case-insensitive username match and take first
    if (error || !admin) {
      const fallback = await supabase
        .from('admin')
        .select('*')
        .ilike('username', username)
        .limit(1)
      admin = (fallback.data && fallback.data[0]) as any
      error = fallback.error as any
    }

    if (error || !admin) {
      console.log('Admin not found:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Verify password (stored as bcrypt hash in password_hash)
    const storedHash: string | undefined = (admin as any).password_hash || (admin as any).password
    if (!storedHash) {
      console.warn('No password hash found for admin:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // If stored value looks like a bcrypt hash, verify with bcrypt; otherwise fallback to strict equality
    const looksHashed = /^\$2[aby]\$\d{2}\$/.test(storedHash)
    const isValidPassword = looksHashed
      ? await bcrypt.compare(password, storedHash)
      : password === storedHash
    if (!isValidPassword) {
      console.log('Invalid password for admin:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Generate JWT token
    const tokenPayload = {
      userId: admin.id,
      username: admin.username,
      email: admin.email,
      role: 'admin',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    }

    const token = jwt.sign(tokenPayload, JWT_SECRET)

    // Return admin data (without sensitive information)
    const { password_hash, password: adminPassword, ...adminData } = admin

    // Set HTTP-only cookie for additional security
    const response = NextResponse.json({
      success: true,
      message: 'Login successful',
      token: token,
      user: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name,
        role: 'admin'
      }
    })

    // Set secure cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Admin login error:', error)
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 