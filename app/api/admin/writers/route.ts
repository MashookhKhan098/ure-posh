import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Try fetching from writers table first
    let { data: writers, error: writersError } = await supabase
      .from('writers')
      .select('*')
      .order('created_at', { ascending: false });

    // If writers table doesn't exist, try the writer table
    if (writersError) {
      const { data: writerData, error: writerError } = await supabase
        .from('writer')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!writerError && writerData) {
        // Transform writer table data to match writers format
        writers = writerData.map(writer => ({
          id: writer.id,
          name: writer.full_name,
          username: writer.username,
          status: writer.is_active ? 'Active' : 'Inactive',
          joinDate: writer.created_at ? new Date(writer.created_at).toISOString().split('T')[0] : '',
          postsCount: 0, // This would need a separate query to count posts by author
          avatar: writer.full_name ? writer.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
        }));
      } else {
        return NextResponse.json({ error: 'No writers table found' }, { status: 404 });
      }
    } else if (writers) {
      // Transform writers table data to match expected format
      writers = writers.map(writer => ({
        id: writer.id,
        name: writer.name,
        username: writer.username || writer.email?.split('@')[0] || 'unknown',
        status: writer.status === 'active' ? 'Active' : 'Inactive',
        joinDate: writer.created_at ? new Date(writer.created_at).toISOString().split('T')[0] : '',
        postsCount: 0, // This would need a separate query to count posts by author
        avatar: writer.name ? writer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
      }));
    }

    return NextResponse.json(writers || []);

  } catch (error) {
    console.error('Error fetching writers:', error);
    return NextResponse.json({ error: 'Failed to fetch writers' }, { status: 500 });
  }
}

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

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const supabase = createAdminClient()

    // Try writers table first
    let { error } = await supabase.from('writers').delete().eq('id', id)
    if (error) {
      // Fallback to writer table
      const fallback = await supabase.from('writer').delete().eq('id', id)
      if (fallback.error) {
        return NextResponse.json({ error: fallback.error.message }, { status: 400 })
      }
    }

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}


