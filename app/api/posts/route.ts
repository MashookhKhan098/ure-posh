import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { cookies } from 'next/headers';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const approvalStatus = searchParams.get('approval_status');
    const includeAll = searchParams.get('include_all') === 'true';
    
    // Create Supabase admin client to bypass RLS
    const supabase = createAdminClient();

    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    // Filter by status if provided
    if (status) {
      query = query.eq('status', status);
    }

    // Filter by status if provided
    if (approvalStatus) {
      query = query.eq('status', approvalStatus);
    } else if (!includeAll) {
      // By default, only show published posts for public access
      query = query.eq('status', 'published');
    }

    const { data: posts, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    return NextResponse.json(posts || []);

  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract all form fields
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const author = formData.get('author') as string;
    const category = formData.get('category') as string;
    const tags = formData.get('tags') as string;
    const status = formData.get('status') as string;
    const publishDate = formData.get('publishDate') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const readTime = formData.get('readTime') as string;
    const language = formData.get('language') as string;
    const slug = formData.get('slug') as string;
    const isFromWriter = formData.get('isFromWriter') === 'true';
    
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

    // Create Supabase admin client to bypass RLS
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

    // Parse publish date
    let publishedAt = null;
    if (publishDate) {
      publishedAt = new Date(publishDate).toISOString();
    }

    // Calculate read time if not provided
    const calculatedReadTime = readTime ? parseInt(readTime) : Math.ceil(content.split(' ').length / 200);

    // Set status based on source
    const postStatus = isFromWriter ? 'draft' : 'published';

    // Prepare basic insert data with only essential fields
    const basicInsertData = {
      title,
      content,
      excerpt,
      author,
      category,
      tags,
      slug,
      featured_image: featuredImageUrl,
      video_url: videoUrl,
      video_title: videoTitle,
      video_description: videoDescription,
      status: postStatus,
      read_time: calculatedReadTime,
      view_count: 0,
      likes: 0,
      is_featured: false
    };

    // Try to insert with all optional fields first
    try {
      const fullInsertData = {
        ...basicInsertData,
        meta_title: metaTitle,
        meta_description: metaDescription,
        language,
        published_at: publishedAt,
        comments_count: 0
      };

      const { data: post, error } = await supabase
        .from('posts')
        .insert(fullInsertData)
        .select()
        .single();

      if (error) {
        // If any optional columns don't exist, try with basic data only
        console.log('Trying with basic data only...');
        const { data: post2, error: error2 } = await supabase
          .from('posts')
          .insert(basicInsertData)
          .select()
          .single();

        if (error2) {
          throw error2;
        }

        return NextResponse.json(post2);
      }

      return NextResponse.json(post);
    } catch (error) {
      console.error('Database insert error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
