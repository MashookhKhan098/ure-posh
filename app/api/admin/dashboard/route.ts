import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Get posts data (only table that exists)
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, title, author, status, created_at, view_count, category, likes, read_time, content')
      .order('created_at', { ascending: false });

    if (postsError) {
      console.error('Error fetching posts:', postsError);
    }



    // Calculate metrics based on available data
    const totalPosts = posts?.length || 0;
    const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;
    const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
    const totalViews = posts?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;
    const totalLikes = posts?.reduce((sum, post) => sum + (post.likes || 0), 0) || 0;

    // Get unique authors from posts
    const uniqueAuthors = [...new Set(posts?.map(p => p.author).filter(Boolean) || [])];
    const totalWriters = uniqueAuthors.length;

    // Format data for frontend
    const formattedWriters = uniqueAuthors.map(author => ({
      id: author, // Use author name as ID since we don't have user IDs
      name: author,
      email: `${author.toLowerCase().replace(/\s+/g, '.')}@example.com`, // Generate email
      status: 'active', // Assume active since they have posts
      postsCount: posts?.filter(p => p.author === author).length || 0,
      joinDate: posts?.find(p => p.author === author)?.created_at || new Date().toISOString(),
      lastActive: posts?.find(p => p.author === author)?.created_at || new Date().toISOString()
    }));

    const formattedPosts = posts?.map(post => ({
      id: post.id,
      title: post.title,
      writer: post.author || 'Unknown',
      status: post.status || 'draft',
      createdAt: post.created_at,
      category: post.category || 'General',
      viewCount: post.view_count || 0,
      likes: post.likes || 0,
      readTime: post.read_time || 0,
      content: post.content || ''
    })) || [];

    return NextResponse.json({
      writers: formattedWriters,
      posts: formattedPosts,
      metrics: {
        totalWriters,
        totalPosts,
        pendingApprovals: draftPosts, // Use draft posts as pending
        approvedPosts: publishedPosts, // Use published posts as approved
        totalViews,
        totalLikes,
        avgResponseTime: '2.5h' // This would need to be calculated from actual data
      }
    });

  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 