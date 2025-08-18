import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })

    const { payload } = await jwtVerify(token, secretKey)
    const adminId = payload.adminId as string

    // Verify it's a valid admin token
    if (adminId !== 'admin') {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: 'admin',
        username: ADMIN_USERNAME,
        email: 'admin@ureposh.com',
        role: 'admin',
      },
    })
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}


