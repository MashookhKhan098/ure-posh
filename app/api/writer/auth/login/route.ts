import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function POST(req: NextRequest) {
  try {
    const { username, id, password } = await req.json()
    if ((!username && !id) || !password) {
      return NextResponse.json({ error: 'Username or id and password are required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    let writerQuery = supabase
      .from('writer')
      .select('id, username, full_name, password_hash, bio, field_allotted, expertise, phone, is_active')

    if (id) {
      writerQuery = writerQuery.eq('id', id)
    } else if (username) {
      writerQuery = writerQuery.eq('username', username)
    }

    const { data: writer, error } = await writerQuery.single()

    if (error || !writer) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    if (!writer.is_active) {
      return NextResponse.json({ error: 'Account is inactive' }, { status: 403 })
    }

    const ok = await bcrypt.compare(password, writer.password_hash || '')
    if (!ok) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ role: 'writer', writerId: writer.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey)

    const response = NextResponse.json({
      success: true,
      writer: {
        id: writer.id,
        name: writer.full_name,
        username: writer.username,
        bio: writer.bio,
        field_allotted: writer.field_allotted,
        expertise: writer.expertise,
        phone: writer.phone,
      },
    })

    response.cookies.set('writer_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 60 * 60 * 24,
    })

    return response
  } catch (e) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}


