import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(req: NextRequest) {
  try {
    const supabase = createAdminClient();

    // Get all posts to extract writer information
    const { data: posts, error } = await supabase
      .from('posts')
      .select('author, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    // Extract unique authors from posts
    const uniqueAuthors = [...new Set(posts?.map(p => p.author).filter(Boolean) || [])];
    
    // Create writer profiles from posts data
    const writers = uniqueAuthors.map(author => {
      const authorPosts = posts?.filter(p => p.author === author) || [];
      const firstPost = authorPosts[0];
      const lastPost = authorPosts[authorPosts.length - 1];
      
      return {
        writer_id: author, // Use author name as ID
        username: author.toLowerCase().replace(/\s+/g, '_'),
        email: `${author.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        full_name: author,
        specialization: 'General',
        experience_level: 'Intermediate',
        is_verified: true,
        is_active: true,
        created_at: firstPost?.created_at || new Date().toISOString(),
        updated_at: lastPost?.created_at || new Date().toISOString(),
        posts_count: authorPosts.length
      };
    });

    return NextResponse.json({
      users: [], // No users table exists
      writerProfiles: writers
    });

  } catch (error) {
    console.error('Writers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { 
      name, 
      email, 
      password, 
      username,
      fullName,
      specialization,
      experienceLevel,
      role = 'writer' 
    } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Since we don't have a users table, we'll just return success
    // The actual writer creation would happen when they create their first post
    const mockUser = {
      id: name.toLowerCase().replace(/\s+/g, '_'),
      name,
      email,
      role,
      created_at: new Date().toISOString()
    };

    const mockWriterProfile = {
      writer_id: mockUser.id,
      username: username || name.toLowerCase().replace(/\s+/g, '_'),
      email,
      full_name: fullName || name,
      specialization: specialization || 'General',
      experience_level: experienceLevel || 'Beginner',
      is_verified: true,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      user: mockUser,
      writerProfile: mockWriterProfile,
      message: 'Writer profile created successfully (mock - no users table exists)'
    });

  } catch (error) {
    console.error('Create writer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 