import { NextRequest, NextResponse } from 'next/server';
import { verifyWriterAuth } from '@/utils/auth/writer';
import { createWriterAdminClient } from '@/utils/supabase/writer';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Verify authentication
    const authData = verifyWriterAuth(req);
    if (!authData) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    const supabase = createWriterAdminClient();

    // Get current writer data
    const { data: writer, error } = await supabase
      .from('writer_profiles')
      .select('*')
      .eq('writer_id', authData.writer_id)
      .eq('is_active', true)
      .single();

    if (error || !writer) {
      return NextResponse.json(
        { error: 'Writer not found or inactive' },
        { status: 401 }
      );
    }

    // Return writer data (without sensitive information)
    const { password_hash, ...writerData } = writer;

    return NextResponse.json({
      success: true,
      writer: writerData
    });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 