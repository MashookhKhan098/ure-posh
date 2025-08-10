import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Mark this route as dynamic since it uses request headers
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Get admin info from headers (set by middleware)
    const adminId = req.headers.get('x-admin-id');
    const adminUsername = req.headers.get('x-admin-username');
    const adminRole = req.headers.get('x-admin-role');

    if (!adminId || !adminUsername) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();

    // Fetch dashboard data
    const [
      { data: writers, error: writersError },
      { data: posts, error: postsError },
      { data: adminUser, error: adminError }
    ] = await Promise.all([
      supabase.from('writer_profiles').select('*').eq('is_active', true),
      supabase.from('posts').select('*'),
      supabase.from('admin').select('*').eq('id', adminId).single()
    ]);

    if (writersError) {
      console.error('Error fetching writers:', writersError);
    }

    if (postsError) {
      console.error('Error fetching posts:', postsError);
    }

    if (adminError) {
      console.error('Error fetching admin user:', adminError);
    }

    // Calculate metrics
    const totalWriters = writers?.length || 0;
    const totalPosts = posts?.length || 0;
    const pendingApprovals = posts?.filter(p => p.status === 'pending').length || 0;
    const approvedPosts = posts?.filter(p => p.status === 'approved').length || 0;
    const totalViews = posts?.reduce((sum, post) => sum + (post.view_count || 0), 0) || 0;

    // Format writers data
    const formattedWriters = writers?.map(writer => ({
      id: writer.writer_id,
      name: writer.full_name || writer.username,
      email: writer.email,
      status: writer.is_active ? 'active' : 'inactive',
      postsCount: 0, // You can calculate this if needed
      joinDate: writer.created_at,
      lastActive: writer.last_login
    })) || [];

    // Format posts data
    const formattedPosts = posts?.map(post => ({
      id: post.id,
      title: post.title,
      writer: post.writer_name || 'Unknown',
      status: post.status,
      createdAt: post.created_at,
      category: post.category || 'General',
      viewCount: post.view_count || 0,
      content: post.content
    })) || [];

    return NextResponse.json({
      user: {
        id: adminUser?.id,
        username: adminUser?.username,
        email: adminUser?.email,
        full_name: adminUser?.full_name,
        role: 'admin'
      },
      writers: formattedWriters,
      posts: formattedPosts,
      metrics: {
        totalWriters,
        totalPosts,
        pendingApprovals,
        approvedPosts,
        totalViews,
        avgResponseTime: '2.5h'
      }
    });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 