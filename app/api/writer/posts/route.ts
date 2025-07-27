import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const writerId = searchParams.get('writer_id');
    const status = searchParams.get('status');
    
    const supabase = createAdminClient();

    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (writerId) {
      query = query.eq('author', writerId);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Writer posts fetch error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(posts || []);

  } catch (error) {
    console.error('Fetch writer posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract form fields
    const writerId = formData.get('writer_id') as string;
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const slug = formData.get('slug') as string;
    const publishDate = formData.get('publishDate') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const readTime = formData.get('readTime') as string;
    const language = formData.get('language') as string;
    
    // File uploads
    const featuredImage = formData.get('featuredImage') as File;
    const videoFile = formData.get('videoFile') as File;
    const videoTitle = formData.get('videoTitle') as string;
    const videoDescription = formData.get('videoDescription') as string;

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    let featuredImageUrl = '';
    let videoUrl = '';
    
    // Handle featured image upload
    if (featuredImage && featuredImage.size > 0) {
      const fileName = `${Date.now()}-${featuredImage.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, featuredImage);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return NextResponse.json(
          { error: 'File upload failed' },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      featuredImageUrl = urlData.publicUrl;
    }

    // Handle video file upload
    if (videoFile && videoFile.size > 0) {
      const fileName = `${Date.now()}-${videoFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('uploads')
        .upload(fileName, videoFile);

      if (uploadError) {
        console.error('Video upload error:', uploadError);
        return NextResponse.json(
          { error: 'Video upload failed' },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      videoUrl = urlData.publicUrl;
    }

    // Calculate read time if not provided
    const calculatedReadTime = readTime ? parseInt(readTime) : Math.ceil(content.split(' ').length / 200);

    // Prepare insert data - using only fields that exist in the database
    const insertData = {
      title,
      content,
      excerpt,
      author: author || writerId, // Use writerId as author if author not provided
      category,
      tags,
      slug,
      featured_image: featuredImageUrl,
      video_url: videoUrl,
      video_title: videoTitle,
      video_description: videoDescription,
      status: status || 'draft', // Default to draft for writer posts
      read_time: calculatedReadTime,
      view_count: 0,
      likes: 0,
      is_featured: false
    };

    // Try to insert the post
    const { data: post, error } = await supabase
      .from('posts')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post created successfully and submitted for review',
      post
    });

  } catch (error) {
    console.error('Create writer post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 