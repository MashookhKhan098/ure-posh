import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

// GET /api/admin/people
// Query params: search, category, verified, limit, offset, sortBy
export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const { searchParams } = new URL(req.url)

    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const verified = searchParams.get('verified')
    const sortBy = searchParams.get('sortBy') || 'name'
    const limit = Number(searchParams.get('limit') || '50')
    const offset = Number(searchParams.get('offset') || '0')

    let query = supabase.from('people').select('*', { count: 'exact' })

    if (category) query = query.eq('category', category)
    if (verified === 'true') query = query.eq('verified', true)
    if (verified === 'false') query = query.eq('verified', false)
    if (search) {
      query = query.or(`name.ilike.%${search}%,title.ilike.%${search}%,specialization.ilike.%${search}%`)
    }

    switch (sortBy) {
      case 'experience':
        query = query.order('experience', { ascending: false })
        break
      case 'rating':
        query = query.order('rating', { ascending: false })
        break
      case 'projects':
        query = query.order('projects', { ascending: false })
        break
      default:
        query = query.order('name', { ascending: true })
    }

    query = query.range(offset, offset + limit - 1)

    const { data, error, count } = await query
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    const transformed = (data || []).map((p: any) => ({
      ...p,
      expertise: Array.isArray(p.expertise) ? p.expertise : [],
      languages: Array.isArray(p.languages) ? p.languages : [],
      education: Array.isArray(p.education) ? p.education : [],
      certifications: Array.isArray(p.certifications) ? p.certifications : [],
      skills: Array.isArray(p.skills) ? p.skills : [],
      testimonials: Array.isArray(p.testimonials) ? p.testimonials : [],
      recent_projects: Array.isArray(p.recent_projects) ? p.recent_projects : [],
      achievements: Array.isArray(p.achievements) ? p.achievements : [],
    }))

    return NextResponse.json({ data: transformed, count: count || 0 })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to list people' }, { status: 500 })
  }
}

// POST /api/admin/people
export async function POST(req: NextRequest) {
  try {
    const supabase = createAdminClient()
    const body = await req.json()

    const required = ['name','title','specialization','description','experience','category','email','location']
    for (const k of required) {
      if (!body?.[k]) return NextResponse.json({ error: `${k} is required` }, { status: 400 })
    }

    const insertPayload = {
      ...body,
      expertise: body.expertise ?? [],
      languages: body.languages ?? [],
      education: body.education ?? [],
      certifications: body.certifications ?? [],
      skills: body.skills ?? [],
      testimonials: body.testimonials ?? [],
      recent_projects: body.recent_projects ?? [],
      achievements: body.achievements ?? [],
    }

    const { data, error } = await supabase.from('people').insert([insertPayload]).select().single()
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })

    return NextResponse.json({ data })
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to create person' }, { status: 500 })
  }
}


