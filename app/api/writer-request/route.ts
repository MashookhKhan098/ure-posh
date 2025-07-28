import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Validate required fields
    const { 
      fullName, 
      email, 
      username, 
      bio, 
      expertise, 
      portfolio, 
      socialLinks,
      blockchainWallet 
    } = body;

    if (!fullName || !email || !username || !bio) {
      return NextResponse.json(
        { error: 'Missing required fields: fullName, email, username, bio' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Username validation (alphanumeric and underscore only)
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
      return NextResponse.json(
        { error: 'Username can only contain letters, numbers, and underscores' },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createAdminClient();

    // Check if username already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('writers')
      .select('id')
      .eq('username', username)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username already exists' },
        { status: 409 }
      );
    }

    // Check if email already exists
    const { data: existingEmail, error: emailCheckError } = await supabase
      .from('writers')
      .select('id')
      .eq('email', email)
      .single();

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create writer request
    const writerRequest = {
      full_name: fullName,
      email: email.toLowerCase(),
      username: username.toLowerCase(),
      bio: bio,
      expertise: expertise || '',
      portfolio: portfolio || '',
      social_links: socialLinks || {},
      blockchain_wallet: blockchainWallet || '',
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: newRequest, error: insertError } = await supabase
      .from('writer_requests')
      .insert(writerRequest)
      .select()
      .single();

    if (insertError) {
      console.error('Database error:', insertError);
      return NextResponse.json(
        { error: 'Failed to create writer request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Writer request submitted successfully',
      data: {
        id: newRequest.id,
        username: newRequest.username,
        status: newRequest.status,
        submittedAt: newRequest.created_at
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Writer request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const email = searchParams.get('email');
    const username = searchParams.get('username');

    const supabase = createAdminClient();

    let query = supabase
      .from('writer_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (email) {
      query = query.eq('email', email);
    }

    if (username) {
      query = query.eq('username', username);
    }

    const { data: requests, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch writer requests' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: requests || []
    });

  } catch (error) {
    console.error('Fetch writer requests error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status, adminNotes } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: id, status' },
        { status: 400 }
      );
    }

    const validStatuses = ['pending', 'approved', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: pending, approved, or rejected' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const updateData = {
      status,
      updated_at: new Date().toISOString(),
      admin_notes: adminNotes || ''
    };

    const { data: updatedRequest, error } = await supabase
      .from('writer_requests')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { error: 'Failed to update writer request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Writer request updated successfully',
      data: updatedRequest
    });

  } catch (error) {
    console.error('Update writer request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 