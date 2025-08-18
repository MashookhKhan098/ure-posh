import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('writer_token')?.value
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })

    const { payload } = await jwtVerify(token, secretKey)
    const writerId = payload.writerId as string

    const supabase = createAdminClient()
    const { data: writer } = await supabase
      .from('writer')
      .select('id, username, full_name, bio, field_allotted, expertise, phone, is_active')
      .eq('id', writerId)
      .single()

    if (!writer) return NextResponse.json({ authenticated: false }, { status: 401 })

    return NextResponse.json({
      authenticated: true,
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
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}


