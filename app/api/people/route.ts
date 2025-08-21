import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { PeopleResponse } from '@/types/database'

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key instead of anon key
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing Supabase configuration'
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'name'
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase.from('people').select('*')

    // Apply filters
    if (category) {
      query = query.eq('category', category)
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,title.ilike.%${search}%,specialization.ilike.%${search}%`)
    }

    // Apply sorting
    switch (sortBy) {
      case 'name':
        query = query.order('name', { ascending: true })
        break
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

    // Apply pagination
    query = query.range(offset, offset + limit - 1)

    const { data, error } = await query

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        error: 'Failed to fetch people data',
        details: error.message
      }, { status: 500 })
    }

    // Transform JSONB data
    const transformedData = data?.map(person => ({
      ...person,
      expertise: Array.isArray(person.expertise) ? person.expertise : [],
      languages: Array.isArray(person.languages) ? person.languages : [],
      education: Array.isArray(person.education) ? person.education : [],
      certifications: Array.isArray(person.certifications) ? person.certifications : [],
      skills: Array.isArray(person.skills) ? person.skills : [],
      testimonials: Array.isArray(person.testimonials) ? person.testimonials : [],
      recent_projects: Array.isArray(person.recent_projects) ? person.recent_projects : [],
      achievements: Array.isArray(person.achievements) ? person.achievements : []
    })) || []

    const response: PeopleResponse = {
      data: transformedData,
      error: null
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY // Use service role key
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing Supabase configuration'
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const body = await request.json()

    // Basic validation
    if (!body.name || !body.title || !body.specialization || !body.email) {
      return NextResponse.json({
        error: 'Missing required fields'
      }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('people')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({
        error: 'Failed to create person',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({ data, error: null })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 })
  }
}
