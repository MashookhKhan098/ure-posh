import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { hash } from 'bcryptjs';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient();

    // Get writer from both tables
    const [userResponse, writerProfileResponse] = await Promise.all([
      supabase
        .from('users')
        .select('*')
        .eq('id', params.id)
        .single(),
      supabase
        .from('writer_profiles')
        .select('*')
        .eq('writer_id', params.id)
        .single()
    ]);

    if (userResponse.error && writerProfileResponse.error) {
      return NextResponse.json(
        { error: 'Writer not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: userResponse.data,
      writerProfile: writerProfileResponse.data
    });

  } catch (error) {
    console.error('Get writer API error:', error);
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
    const updateData = await req.json();
    const supabase = createAdminClient();

    const updates: any = {};

    // Update user table if user data is provided
    if (updateData.user) {
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update({
          ...updateData.user,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)
        .select()
        .single();

      if (userError) {
        console.error('Error updating user:', userError);
        return NextResponse.json(
          { error: 'Failed to update user' },
          { status: 500 }
        );
      }

      updates.user = updatedUser;
    }

    // Update writer_profiles table if writer data is provided
    if (updateData.writerProfile) {
      const { data: updatedWriterProfile, error: writerError } = await supabase
        .from('writer_profiles')
        .update({
          ...updateData.writerProfile,
          updated_at: new Date().toISOString()
        })
        .eq('writer_id', params.id)
        .select()
        .single();

      if (writerError) {
        console.error('Error updating writer profile:', writerError);
        return NextResponse.json(
          { error: 'Failed to update writer profile' },
          { status: 500 }
        );
      }

      updates.writerProfile = updatedWriterProfile;
    }

    return NextResponse.json({
      success: true,
      ...updates,
      message: 'Writer updated successfully'
    });

  } catch (error) {
    console.error('Update writer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createAdminClient();

    // Delete from both tables
    const [userDeleteResult, writerDeleteResult] = await Promise.all([
      supabase
        .from('users')
        .delete()
        .eq('id', params.id),
      supabase
        .from('writer_profiles')
        .delete()
        .eq('writer_id', params.id)
    ]);

    if (userDeleteResult.error && writerDeleteResult.error) {
      return NextResponse.json(
        { error: 'Failed to delete writer' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Writer deleted successfully'
    });

  } catch (error) {
    console.error('Delete writer API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 