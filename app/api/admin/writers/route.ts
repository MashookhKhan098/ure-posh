import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createAdminClient } from '@/utils/supabase/admin'

export async function GET(req: NextRequest) {
  try {
    // Use admin client instead of regular client for admin endpoints
    const supabase = createAdminClient();

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
      if (writerError) {
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
        specializations: [
          writer.company_updates && 'Company Updates',
          writer.compliance_legal_insights && 'Compliance & Legal Insights',
          writer.news_media_coverage && 'News & Media Coverage',
          writer.newsletter_archive && 'Newsletter Archive',
          writer.thought_leadership && 'Thought Leadership',
          writer.workplace_stories && 'Workplace Stories',
          writer.events_webinars && 'Events & Webinars',
          writer.international_regulatory_policy_watch && 'International Regulatory & Policy Watch',
          writer.united_kingdom_workplace && 'United Kingdom Workplace',
          writer.us_workplace && 'US Workplace'
        ].filter(Boolean),
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
    return NextResponse.json(writers || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch writers' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { 
      username, 
      name, 
      password, 
      bio, 
      phone,
      // Field Allotted Checkboxes
      company_updates,
      compliance_legal_insights,
      news_media_coverage,
      newsletter_archive,
      thought_leadership,
      workplace_stories,
      events_webinars,
      international_regulatory_policy_watch,
      united_kingdom_workplace,
      us_workplace
    } = await req.json()

    if (!username || !password || !name) {
      return NextResponse.json({ error: 'username, name and password are required' }, { status: 400 })
    }

    const supabase = createAdminClient()
    const passwordHash = await bcrypt.hash(password, 10)

    const { data, error } = await supabase
      .from('writer')
      .insert({ 
        username, 
        full_name: name, 
        password_hash: passwordHash, 
        bio, 
        phone, 
        is_active: true,
        // Field Allotted Checkboxes
        company_updates: company_updates || false,
        compliance_legal_insights: compliance_legal_insights || false,
        news_media_coverage: news_media_coverage || false,
        newsletter_archive: newsletter_archive || false,
        thought_leadership: thought_leadership || false,
        workplace_stories: workplace_stories || false,
        events_webinars: events_webinars || false,
        international_regulatory_policy_watch: international_regulatory_policy_watch || false,
        united_kingdom_workplace: united_kingdom_workplace || false,
        us_workplace: us_workplace || false
      })
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


