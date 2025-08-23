import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { createAdminClient } from '@/utils/supabase/admin'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('writer_token')?.value
    if (!token) return NextResponse.json({ authenticated: false }, { status: 401 })

    const { payload } = await jwtVerify(token, secretKey)
    const writerId = payload.writerId as string

    const supabase = createAdminClient()
    const { data: writer } = await supabase
      .from('writer')
      .select('id, username, full_name, bio, phone, is_active, company_updates, compliance_legal_insights, news_media_coverage, newsletter_archive, thought_leadership, workplace_stories, events_webinars, international_regulatory_policy_watch, united_kingdom_workplace, us_workplace')
      .eq('id', writerId)
      .single()

    if (!writer) return NextResponse.json({ authenticated: false }, { status: 401 })

    return NextResponse.json({
      authenticated: true,
      writer: {
        id: writer.id,
        name: writer.full_name,
        username: writer.username,
        bio: writer.bio,
        field_allotted: {
          company_updates: writer.company_updates,
          compliance_legal_insights: writer.compliance_legal_insights,
          news_media_coverage: writer.news_media_coverage,
          newsletter_archive: writer.newsletter_archive,
          thought_leadership: writer.thought_leadership,
          workplace_stories: writer.workplace_stories,
          events_webinars: writer.events_webinars,
          international_regulatory_policy_watch: writer.international_regulatory_policy_watch,
          united_kingdom_workplace: writer.united_kingdom_workplace,
          us_workplace: writer.us_workplace
        },
        phone: writer.phone,
      },
    })
  } catch (e) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}


