import { NextRequest, NextResponse } from 'next/server';
import { createWriterAdminClient } from '@/utils/supabase/writer';
import { verifyWriterAuth, getWriterIdFromHeaders } from '@/utils/auth/writer';

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const authData = verifyWriterAuth(req);
    if (!authData) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const writerId = authData.writer_id;

    const supabase = createWriterAdminClient();

    // Get writer profile
    const { data: writer, error: writerError } = await supabase
      .from('writer_profiles')
      .select('*')
      .eq('writer_id', writerId)
      .single();

    if (writerError || !writer) {
      return NextResponse.json(
        { error: 'Writer not found' },
        { status: 404 }
      );
    }

    // Get writer statistics
    const { data: stats, error: statsError } = await supabase
      .from('writer_statistics')
      .select('*')
      .eq('writer_id', writerId)
      .single();

    // Get recent posts
    const { data: recentPosts, error: postsError } = await supabase
      .from('writer_posts')
      .select('*')
      .eq('writer_id', writerId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Get unread notifications
    const { data: notifications, error: notifError } = await supabase
      .from('writer_notifications')
      .select('*')
      .eq('writer_id', writerId)
      .eq('is_read', false)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get pending posts count
    const { count: pendingCount, error: pendingError } = await supabase
      .from('writer_posts')
      .select('*', { count: 'exact', head: true })
      .eq('writer_id', writerId)
      .eq('approval_status', 'pending');

    // Get approved posts count
    const { count: approvedCount, error: approvedError } = await supabase
      .from('writer_posts')
      .select('*', { count: 'exact', head: true })
      .eq('writer_id', writerId)
      .eq('approval_status', 'approved');

    // Get rejected posts count
    const { count: rejectedCount, error: rejectedError } = await supabase
      .from('writer_posts')
      .select('*', { count: 'exact', head: true })
      .eq('writer_id', writerId)
      .eq('approval_status', 'rejected');

    // Calculate monthly growth (mock data for now)
    const monthlyGrowth = 12.5;

    const dashboardData = {
      writer: {
        id: writer.writer_id,
        username: writer.username,
        full_name: writer.full_name,
        email: writer.email,
        bio: writer.bio,
        avatar_url: writer.avatar_url,
        specialization: writer.specialization,
        experience_level: writer.experience_level,
        is_verified: writer.is_verified,
        last_login: writer.last_login
      },
      statistics: stats || {
        total_posts: 0,
        published_posts: 0,
        pending_posts: 0,
        rejected_posts: 0,
        total_views: 0,
        total_likes: 0,
        total_comments: 0,
        average_read_time: 0
      },
      recent_posts: recentPosts || [],
      notifications: notifications || [],
      counts: {
        pending: pendingCount || 0,
        approved: approvedCount || 0,
        rejected: rejectedCount || 0,
        total: (pendingCount || 0) + (approvedCount || 0) + (rejectedCount || 0)
      },
      monthly_growth: monthlyGrowth
    };

    return NextResponse.json(dashboardData);

  } catch (error) {
    console.error('Writer dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 