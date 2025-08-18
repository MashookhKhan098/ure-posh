import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Fetch posts statistics
    const { data: allPosts, error: postsError } = await supabase
      .from('articles')
      .select('id, status, is_featured, created_at')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching articles:', postsError);
      return NextResponse.json({ error: 'Failed to fetch articles data' }, { status: 500 });
    }

    // Fetch writers statistics
    const { data: allWriters, error: writersError } = await supabase
      .from('writers')
      .select('id, status, created_at')
      .order('created_at', { ascending: false });

    // If writers table doesn't exist, try the writer table (based on the schema I found)
    let writersData = allWriters;
    if (writersError) {
      const { data: writerData, error: writerError } = await supabase
        .from('writer')
        .select('id, is_active, created_at')
        .order('created_at', { ascending: false });
      
      if (!writerError) {
        // Map writer table structure to match expected format
        writersData = writerData?.map(writer => ({
          id: writer.id,
          status: writer.is_active ? 'active' : 'inactive',
          created_at: writer.created_at
        }));
      }
    }

    // Calculate statistics
    const currentDate = new Date();
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    const lastWeek = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);

    // Posts statistics
    const totalPosts = allPosts?.length || 0;
    const postsLastMonth = allPosts?.filter(post => new Date(post.created_at) >= lastMonth).length || 0;
    const postsGrowthPercent = totalPosts > 0 ? Math.round((postsLastMonth / totalPosts) * 100) : 0;

    // Pending review posts (not featured/verified)
    const pendingReviewPosts = allPosts?.filter(post => !post.is_featured).length || 0;

    // Reverted posts
    const revertedPosts = allPosts?.filter(post => post.status === 'reverted').length || 0;

    // Writers statistics
    const activeWriters = writersData?.filter(writer => writer.status === 'active').length || 0;
    const newWritersThisWeek = writersData?.filter(writer => 
      new Date(writer.created_at) >= lastWeek
    ).length || 0;

    // Return statistics
    return NextResponse.json({
      totalPosts: {
        count: totalPosts,
        growth: postsGrowthPercent > 0 ? `+${postsGrowthPercent}%` : '0%',
        trend: 'from last month'
      },
      activeWriters: {
        count: activeWriters,
        growth: newWritersThisWeek > 0 ? `+${newWritersThisWeek}` : '0',
        trend: newWritersThisWeek > 0 ? 'new this week' : 'no new writers'
      },
      pendingReview: {
        count: pendingReviewPosts,
        trend: pendingReviewPosts > 0 ? 'Requires attention' : 'All caught up'
      },
      revertedPosts: {
        count: revertedPosts,
        trend: revertedPosts > 0 ? 'Action needed' : 'No reverted posts'
      }
    });

  } catch (error) {
    console.error('Dashboard stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}
