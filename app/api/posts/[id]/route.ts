import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Helper function to check if string is a UUID
function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Create Supabase client using SSR method
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase.from('posts').select('*');
    
    // Check if the parameter is a UUID (ID) or a slug
    if (isUUID(params.id)) {
      query = query.eq('id', params.id);
    } else {
      query = query.eq('slug', params.id);
    }

    const { data: post, error } = await query.single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await supabase
      .from('posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', post.id);

    return NextResponse.json(post);

  } catch (error) {
    console.error('Fetch post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const body = await req.json().catch(() => ({} as any));
    const { featured_image, ...rest } = body || {};

    if (!featured_image && Object.keys(rest).length === 0) {
      return NextResponse.json({ error: 'No fields to update' }, { status: 400 });
    }

    const updateData: Record<string, any> = {};
    if (featured_image && typeof featured_image === 'string') updateData.featured_image = featured_image;
    // Allow extending later with more updatable fields via `rest`
    Object.assign(updateData, rest);

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    let updateQuery = supabase.from('posts').update(updateData).select('*');
    if (isUUID(params.id)) {
      updateQuery = updateQuery.eq('id', params.id);
    } else {
      updateQuery = updateQuery.eq('slug', params.id);
    }

    const { data, error } = await updateQuery.single();

    if (error) {
      console.error('Supabase update error:', error);
      return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }

    return NextResponse.json({ success: true, post: data });
  } catch (error) {
    console.error('Update post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Create Supabase client using SSR method
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // First, get the post to find the featured image
    let query = supabase.from('posts').select('featured_image');
    
    // Check if the parameter is a UUID (ID) or a slug
    if (isUUID(params.id)) {
      query = query.eq('id', params.id);
    } else {
      query = query.eq('slug', params.id);
    }

    const { data: post, error: fetchError } = await query.single();

    if (fetchError) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // Delete the post
    let deleteQuery = supabase.from('posts').delete();
    
    if (isUUID(params.id)) {
      deleteQuery = deleteQuery.eq('id', params.id);
    } else {
      deleteQuery = deleteQuery.eq('slug', params.id);
    }

    const { error: deleteError } = await deleteQuery;

    if (deleteError) {
      console.error('Supabase delete error:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete post' },
        { status: 500 }
      );
    }

    // Delete the featured image from storage if it exists
    if (post.featured_image) {
      const fileName = post.featured_image.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('uploads')
          .remove([fileName]);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Post deleted successfully'
    });

  } catch (error) {
    console.error('Delete post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 