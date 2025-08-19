import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('admin_token')?.value
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })

    const { payload } = await jwtVerify(token, secretKey)
    const adminId = payload.adminId as string

    // Confirm admin exists in DB
    const supabase = createAdminClient()
    const { data: adminRecord } = await supabase
      .from('admins')
      .select('id')
      .eq('id', adminId)
      .single()

    if (!adminRecord) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({
      authenticated: true,
      admin: {
        id: adminRecord.id,
        username: adminRecord.id,
        email: 'admin@ureposh.com',
        role: 'admin',
      },
    })
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}


