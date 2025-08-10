import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { createAdminClient } from '@/utils/supabase/admin';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const secretKey = new TextEncoder().encode(JWT_SECRET);

// Mark this route as dynamic since it uses request headers
export const dynamic = 'force-dynamic';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Require admin auth
    const token = req.cookies.get('admin_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }
    try {
      await jwtVerify(token, secretKey);
    } catch (e) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { id } = params;
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required for revert' }, { status: 400 });
    }

    // Create Supabase admin client to bypass RLS
    const supabase = createAdminClient();

    // Update post status to 'reverted' and save the revert message
    const { data: post, error } = await supabase
      .from('posts')
      .update({ status: 'reverted', revert_message: message })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Post reverted successfully', post });
  } catch (error) {
    console.error('Revert post error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
