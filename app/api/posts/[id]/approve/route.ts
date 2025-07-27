import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { action, reason } = await req.json();

    if (!action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }

    // Create Supabase admin client to bypass RLS
    const supabase = createAdminClient();

    const newStatus = action === 'approve' ? 'published' : 'rejected';
    const updateData: any = {
      status: newStatus,
      updated_at: new Date().toISOString()
    };

    // If rejecting, add rejection reason
    if (action === 'reject' && reason) {
      updateData.rejection_reason = reason;
    }

    const { data: post, error } = await supabase
      .from('posts')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      );
    }

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Post ${action}d successfully`,
      post
    });

  } catch (error) {
    console.error('Approve/reject post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 