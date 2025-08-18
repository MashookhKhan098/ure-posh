import { NextRequest, NextResponse } from 'next/server'
import { SignJWT } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'ureposh2024'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json()
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 })
    }

    // Check against environment variables
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    const token = await new SignJWT({ role: 'admin', adminId: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(secretKey)

    const response = NextResponse.json({
      success: true,
      admin: {
        id: 'admin',
        username: ADMIN_USERNAME,
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


