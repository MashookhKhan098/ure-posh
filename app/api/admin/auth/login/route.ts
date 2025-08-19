import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    // Look up admin from Supabase (admins table: id, password_hash)
    const supabase = createAdminClient()
    const { data: adminRecord, error } = await supabase
      .from('admins')
      .select('id, password_hash')
      .eq('id', username)
      .single()

    if (error || !adminRecord) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const passwordOk = await bcrypt.compare(password, adminRecord.password_hash || '')
    if (!passwordOk) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ role: 'admin', adminId: adminRecord.id })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey)

    const response = NextResponse.json({
      success: true,
      admin: {
        id: adminRecord.id,
        username: adminRecord.id,
        email: 'admin@ureposh.com',
        role: 'admin',
      },
    })

    response.cookies.set('admin_token', token, {
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


