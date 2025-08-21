import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    console.log('🔥 Writers API called!');
    
    // For now, let's return hardcoded test data to verify the connection works
    const testWriters = [
      {
        id: "e5b4a7ab-8074-42dd-a7bc-267374026a78",
        name: "Ankit Pal",
        username: "Ankit500ak",
        email: "Ankit500ak@example.com",
        status: "Active",
        joinDate: "2025-08-18",
        postsCount: 12,
        publishedCount: 8,
        draftCount: 4,
        verified: true,
        bio: "he he",
        specializations: ["politics", "somrthing"],
        lastActive: "2025-08-18",
        avatar: "AP"
      },
      {
        id: "626e487c-3235-4231-8284-639f936637e8",
        name: "trial2.1",
        username: "chagan",
        email: "chagan@example.com",
        status: "Active",
        joinDate: "2025-08-21",
        postsCount: 5,
        publishedCount: 3,
        draftCount: 2,
        verified: true,
        bio: "sports writer",
        specializations: ["sports", "something"],
        lastActive: "2025-08-21",
        avatar: "T"
      }
    ];

    console.log('✅ Returning', testWriters.length, 'test writers');
    return NextResponse.json(testWriters);

    // Original database fetch code (commented out for testing)
    /*
    // Use admin client instead of regular client for admin endpoints
    const supabase = createAdminClient();

    console.log('Fetching writers from database...');

    // Try fetching from writers table first
    let { data: writers, error: writersError } = await supabase
      .from('writers')
      .select('*')
      .order('created_at', { ascending: false });

    // If writers table doesn't exist, try the writer table
    if (writersError) {
      console.log('Writers table not found, trying writer table...');
      const { data: writerData, error: writerError } = await supabase
        .from('writer')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (writerError) {
        console.error('Error fetching from writer table:', writerError);
        return NextResponse.json({ error: 'No writers table found' }, { status: 404 });
      }

      // Transform writer table data to match writers format
      writers = writerData.map(writer => ({
        id: writer.id,
        name: writer.full_name,
        username: writer.username,
        email: writer.email || `${writer.username}@example.com`,
        status: writer.is_active ? 'Active' : 'Inactive',
        joinDate: writer.created_at ? new Date(writer.created_at).toISOString().split('T')[0] : '',
        postsCount: 0, // This would need a separate query to count posts by author
        publishedCount: 0,
        draftCount: 0,
        verified: writer.verified || false,
        bio: writer.bio,
        specializations: [writer.field_allotted, writer.expertise].filter(Boolean),
        lastActive: writer.updated_at ? new Date(writer.updated_at).toISOString().split('T')[0] : 'Never',
        avatar: writer.full_name ? writer.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
      }));
    } else if (writers) {
      // Transform writers table data to match expected format
      writers = writers.map(writer => ({
        id: writer.id,
        name: writer.name,
        username: writer.username || writer.email?.split('@')[0] || 'unknown',
        email: writer.email || `${writer.username}@example.com`,
        status: writer.status === 'active' ? 'Active' : 'Inactive',
        joinDate: writer.created_at ? new Date(writer.created_at).toISOString().split('T')[0] : '',
        postsCount: writer.postsCount || 0,
        publishedCount: writer.publishedCount || 0,
        draftCount: writer.draftCount || 0,
        verified: writer.verified || false,
        bio: writer.bio,
        specializations: writer.specializations || [],
        lastActive: writer.updated_at ? new Date(writer.updated_at).toISOString().split('T')[0] : 'Never',
        avatar: writer.name ? writer.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
      }));
    }

    console.log(`Successfully fetched ${writers?.length || 0} writers`);
    return NextResponse.json(writers || []);
    */

  } catch (error) {
    console.error('Error in writers API:', error);
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


