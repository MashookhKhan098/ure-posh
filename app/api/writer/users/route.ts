import { NextRequest, NextResponse } from 'next/server';
import { createWriterAdminClient } from '@/utils/supabase/writer';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    console.log('🔍 API: Fetching writers from Supabase...');
    const supabase = createWriterAdminClient();

    // Get all active writer profiles with additional details
    const { data: writers, error } = await supabase
      .from('writer_profiles')
      .select(`
        writer_id, 
        username, 
        email, 
        full_name, 
        specialization, 
        experience_level, 
        is_verified, 
        is_active,
        bio,
        avatar_url,
        login_count,
        last_login,
        created_at
      `)
      .eq('is_active', true)
      .order('username');

    if (error) {
      console.error('❌ API: Error fetching writer users:', error);
      return NextResponse.json(
        { error: 'Failed to fetch writer users' },
        { status: 500 }
      );
    }

    console.log(`✅ API: Found ${writers?.length || 0} writers from Supabase:`, writers?.map(w => w.username));
    
    return NextResponse.json({
      success: true,
      writers: writers || []
    });

  } catch (error) {
    console.error('💥 API: Writer users fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 