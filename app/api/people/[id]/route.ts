import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { PersonResponse } from '@/types/database'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Error fetching person:', error)
      return NextResponse.json(
        { error: 'Person not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the frontend expectations
    const transformedData = {
      ...data,
      expertise: data.expertise || [],
      languages: data.languages || [],
      education: data.education || [],
      certifications: data.certifications || [],
      skills: data.skills || [],
      testimonials: data.testimonials || [],
      recent_projects: data.recent_projects || [],
      achievements: data.achievements || []
    }

    const response: PersonResponse = {
      data: transformedData,
      error: null
    }

    return NextResponse.json(response)

  } catch (error) {
    console.error('Error in person API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const body = await request.json()

    const { data, error } = await supabase
      .from('people')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating person:', error)
      return NextResponse.json(
        { error: 'Failed to update person' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data, error: null })

  } catch (error) {
    console.error('Error in person PUT API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
      .from('people')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting person:', error)
      return NextResponse.json(
        { error: 'Failed to delete person' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error in person DELETE API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
