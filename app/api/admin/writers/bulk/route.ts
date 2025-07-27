import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function PATCH(req: NextRequest) {
  try {
    const { action, writerIds } = await req.json();

    if (!action || !writerIds || !Array.isArray(writerIds)) {
      return NextResponse.json(
        { error: 'Action and writerIds array are required' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    let updateData: any = {};

    switch (action) {
      case 'activate':
        updateData = { 
          status: 'active',
          updated_at: new Date().toISOString()
        };
        break;
      case 'deactivate':
        updateData = { 
          status: 'inactive',
          updated_at: new Date().toISOString()
        };
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action. Use "activate" or "deactivate"' },
          { status: 400 }
        );
    }

    const { data: updatedWriters, error } = await supabase
      .from('users')
      .update(updateData)
      .in('id', writerIds)
      .select('id, name, email, status');

    if (error) {
      console.error('Error updating writers:', error);
      return NextResponse.json(
        { error: 'Failed to update writers' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      updatedWriters,
      message: `Successfully ${action}d ${updatedWriters.length} writers`
    });

  } catch (error) {
    console.error('Bulk writers API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 