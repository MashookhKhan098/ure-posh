import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const verified = searchParams.get('verified');

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from('articles')
      .select(`
        *,
        categories (
          id,
          name,
          slug,
          color
        )
      `)
      .order('created_at', { ascending: false });

    // Apply filters for admin view (show all articles, not just published)
    if (status && status !== 'All') {
      // Map status values to match articles table structure
      if (status === 'Published') {
        query = query.not('published_at', 'is', null);
      } else if (status === 'Draft') {
        query = query.is('published_at', null);
      } else if (status === 'Pending') {
        // For pending, we can check if verified is false and published_at is null
        query = query.eq('verified', false).is('published_at', null);
      } else if (status === 'Rejected') {
        // For rejected, we can check if verified is false and published_at is not null
        query = query.eq('verified', false).not('published_at', 'is', null);
      }
    }

    // For articles table, we'll use verified column for verification status
    if (verified && verified !== 'All') {
      query = query.eq('verified', verified === 'Verified');
    }

    const { data: articles, error } = await query;

    if (error) {
      console.error('Error fetching admin articles:', error);
      return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
    }

    // Transform articles to match the expected format in the admin dashboard
    const transformedPosts = articles?.map(article => ({
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      image_url: article.image_url,
      author: article.author || 'Unknown Author',
      status: article.published_at ? 'Published' : 'Draft',
      verified: article.verified || false,
      is_featured: article.is_featured || false, // Keep for backward compatibility
      submittedDate: article.created_at ? new Date(article.created_at).toISOString().split('T')[0] : '',
      category: article.categories?.name || 'Uncategorized',
      categoryColor: article.categories?.color || '#6B7280',
      readTime: `${Math.max(1, Math.ceil((article.content?.length || 0) / 200))} min`,
      views: article.views || 0,
      is_breaking: article.is_breaking || false,
      is_hot: article.is_hot || false,
      published_at: article.published_at,
      created_at: article.created_at,
      updated_at: article.updated_at
    })) || [];

    return NextResponse.json(transformedPosts);

  } catch (error) {
    console.error('Admin articles API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch articles data' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Post id is required' }, { status: 400 })
    }

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting article:', error)
      return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Admin delete article API error:', error)
    return NextResponse.json(
      { error: 'Failed to delete article' },
      { status: 500 }
    )
  }
}