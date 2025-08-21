import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

// PUT /api/admin/writers/:id
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()
    const body = await req.json()
    
    // Update writer in database
    const { data, error } = await supabase
      .from('writers')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ success: true, data })
  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      error: error?.message || 'Failed to update writer' 
    }, { status: 500 })
  }
}

// DELETE /api/admin/writers/:id
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()
    
    // Delete writer from database
    const { error } = await supabase
      .from('writers')
      .delete()
      .eq('id', params.id)
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      error: error?.message || 'Failed to delete writer' 
    }, { status: 500 })
  }
}

// GET /api/admin/writers/:id
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createAdminClient()
    
    // Get writer details
    const { data, error } = await supabase
      .from('writers')
      .select(`
        *,
        posts:posts(count)
      `)
      .eq('id', params.id)
      .single()
    
    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    
    return NextResponse.json({ data })
  } catch (error: any) {
    console.error('Server error:', error)
    return NextResponse.json({ 
      error: error?.message || 'Failed to fetch writer' 
    }, { status: 500 })
  }
}
