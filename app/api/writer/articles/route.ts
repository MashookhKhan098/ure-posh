import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('writer_token')?.value
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { payload } = await jwtVerify(token, secretKey)
    const writerId = payload.writerId as string

    const supabase = createAdminClient()

    // Look up writer info to get name/username
    const { data: writer, error: writerError } = await supabase
      .from('writer')
      .select('id, username, full_name')
      .eq('id', writerId)
      .single()

    if (writerError || !writer) {
      return NextResponse.json({ error: 'Writer not found' }, { status: 404 })
    }

    // Fetch articles authored by this writer (match by full name or username string)
    const authorName = writer.full_name || ''
    const authorUsername = writer.username || ''
    const orFilter = [
      authorName ? `author.eq.${authorName}` : null,
      authorUsername ? `author.eq.${authorUsername}` : null,
    ]
      .filter(Boolean)
      .join(',')

    let query = supabase.from('articles').select('*').order('created_at', { ascending: false })

    if (orFilter.length > 0) {
      query = query.or(orFilter)
    } else {
      // No author info to match; return empty list gracefully
      return NextResponse.json({ data: [] })
    }

    const { data: articles, error } = await query
    if (error) {
      return NextResponse.json({ error: 'Failed to load articles' }, { status: 500 })
    }

    return NextResponse.json({ data: articles || [] })
  } catch (e) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
}


