import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    
    const supabase = createAdminClient()

    // Prepare update data
    const updateData: any = {}
    
    // Basic fields
    if (body.name !== undefined) updateData.full_name = body.name
    if (body.username !== undefined) updateData.username = body.username
    if (body.bio !== undefined) updateData.bio = body.bio
    if (body.phone !== undefined) updateData.phone = body.phone
    if (body.is_active !== undefined) updateData.is_active = body.is_active
    
    // Field allotted checkboxes
    if (body.company_updates !== undefined) updateData.company_updates = body.company_updates
    if (body.compliance_legal_insights !== undefined) updateData.compliance_legal_insights = body.compliance_legal_insights
    if (body.news_media_coverage !== undefined) updateData.news_media_coverage = body.news_media_coverage
    if (body.newsletter_archive !== undefined) updateData.newsletter_archive = body.newsletter_archive
    if (body.thought_leadership !== undefined) updateData.thought_leadership = body.thought_leadership
    if (body.workplace_stories !== undefined) updateData.workplace_stories = body.workplace_stories
    if (body.events_webinars !== undefined) updateData.events_webinars = body.events_webinars
    if (body.international_regulatory_policy_watch !== undefined) updateData.international_regulatory_policy_watch = body.international_regulatory_policy_watch
    if (body.united_kingdom_workplace !== undefined) updateData.united_kingdom_workplace = body.united_kingdom_workplace
    if (body.us_workplace !== undefined) updateData.us_workplace = body.us_workplace
    
    // Add timestamp for status updates
    if (body.is_active !== undefined) {
      updateData.status_updated_at = new Date().toISOString()
      // Note: status_updated_by would need to be set from admin session
    }

    // Update the writer
    const { data, error } = await supabase
      .from('writer')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating writer:', error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Transform the response to match the expected format
    const transformedWriter = {
      id: data.id,
      name: data.full_name,
      username: data.username,
      email: data.email || `${data.username}@example.com`,
      status: data.is_active ? 'Active' : 'Inactive',
      joinDate: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : '',
      postsCount: 0, // Would need separate query
      publishedCount: 0,
      draftCount: 0,
      verified: data.verified || false,
      bio: data.bio,
      phone: data.phone,
      specializations: [
        data.company_updates && 'Company Updates',
        data.compliance_legal_insights && 'Compliance & Legal Insights',
        data.news_media_coverage && 'News & Media Coverage',
        data.newsletter_archive && 'Newsletter Archive',
        data.thought_leadership && 'Thought Leadership',
        data.workplace_stories && 'Workplace Stories',
        data.events_webinars && 'Events & Webinars',
        data.international_regulatory_policy_watch && 'International Regulatory & Policy Watch',
        data.united_kingdom_workplace && 'United Kingdom Workplace',
        data.us_workplace && 'US Workplace'
      ].filter(Boolean),
      lastActive: data.updated_at ? new Date(data.updated_at).toISOString().split('T')[0] : 'Never',
      avatar: data.full_name ? data.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
    }

    return NextResponse.json(transformedWriter)
  } catch (error) {
    console.error('Error in writer update API:', error)
    return NextResponse.json({ error: 'Failed to update writer' }, { status: 500 })
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const supabase = createAdminClient()

    const { data, error } = await supabase
      .from('writer')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 })
    }

    // Transform the response to match the expected format
    const transformedWriter = {
      id: data.id,
      name: data.full_name,
      username: data.username,
      email: data.email || `${data.username}@example.com`,
      status: data.is_active ? 'Active' : 'Inactive',
      joinDate: data.created_at ? new Date(data.created_at).toISOString().split('T')[0] : '',
      postsCount: 0,
      publishedCount: 0,
      draftCount: 0,
      verified: data.verified || false,
      bio: data.bio,
      phone: data.phone,
      is_active: data.is_active,
      field_allotted: {
        company_updates: data.company_updates || false,
        compliance_legal_insights: data.compliance_legal_insights || false,
        news_media_coverage: data.news_media_coverage || false,
        newsletter_archive: data.newsletter_archive || false,
        thought_leadership: data.thought_leadership || false,
        workplace_stories: data.workplace_stories || false,
        events_webinars: data.events_webinars || false,
        international_regulatory_policy_watch: data.international_regulatory_policy_watch || false,
        united_kingdom_workplace: data.united_kingdom_workplace || false,
        us_workplace: data.us_workplace || false
      },
      specializations: [
        data.company_updates && 'Company Updates',
        data.compliance_legal_insights && 'Compliance & Legal Insights',
        data.news_media_coverage && 'News & Media Coverage',
        data.newsletter_archive && 'Newsletter Archive',
        data.thought_leadership && 'Thought Leadership',
        data.workplace_stories && 'Workplace Stories',
        data.events_webinars && 'Events & Webinars',
        data.international_regulatory_policy_watch && 'International Regulatory & Policy Watch',
        data.united_kingdom_workplace && 'United Kingdom Workplace',
        data.us_workplace && 'US Workplace'
      ].filter(Boolean),
      lastActive: data.updated_at ? new Date(data.updated_at).toISOString().split('T')[0] : 'Never',
      avatar: data.full_name ? data.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : 'U'
    }

    return NextResponse.json(transformedWriter)
  } catch (error) {
    console.error('Error in writer get API:', error)
    return NextResponse.json({ error: 'Failed to fetch writer' }, { status: 500 })
  }
}
