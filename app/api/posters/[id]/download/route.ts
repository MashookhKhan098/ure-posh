import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('order');

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
    }

    // Verify order and payment
    const { data: order, error: orderError } = await supabase
      .from('poster_orders')
      .select('*')
      .eq('id', orderId)
      .eq('poster_id', id)
      .eq('payment_status', 'completed')
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Invalid order or payment not completed' }, { status: 404 });
    }

    // Check if download has expired
    if (order.download_expires_at && new Date() > new Date(order.download_expires_at)) {
      return NextResponse.json({ error: 'Download link has expired' }, { status: 410 });
    }

    // Get poster details
    const { data: poster, error: posterError } = await supabase
      .from('posters')
      .select('*')
      .eq('id', id)
      .single();

    if (posterError || !poster) {
      return NextResponse.json({ error: 'Poster not found' }, { status: 404 });
    }

    // For now, return the image URL
    // In a real implementation, you might want to:
    // 1. Generate a signed URL for the image
    // 2. Create a downloadable version of the poster
    // 3. Track download analytics

    return NextResponse.json({
      download_url: poster.image_url,
      poster_title: poster.title,
      expires_at: order.download_expires_at
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
