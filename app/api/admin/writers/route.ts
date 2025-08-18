import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { username, name, password, bio, field_allotted, expertise, phone } = await req.json()

    if (!username || !password || !name) {
      return NextResponse.json({ error: 'username, name and password are required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const passwordHash = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from('writer')
      .insert({ username, full_name: name, password_hash: passwordHash, bio, field_allotted, expertise, phone, is_active: true })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ writer: data }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


