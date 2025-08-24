import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { notifyPosterCreated } from '@/lib/newsletter-notifications';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = searchParams.get('limit');
    const offset = searchParams.get('offset');

    let query = supabase
      .from('posters')
      .select('*')
      .eq('status', 'active');

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    if (featured === 'true') {
      query = query.eq('featured', true);
    }

    if (limit) {
      query = query.limit(parseInt(limit));
    }

    if (offset && limit) {
      const offsetNum = parseInt(offset);
      const limitNum = parseInt(limit);
      query = query.range(offsetNum, offsetNum + limitNum - 1);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posters: data });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, image_url, category, tags, price, featured } = body;

    // Validate required fields
    if (!title || !image_url || !price) {
      return NextResponse.json(
        { error: 'Title, image_url, and price are required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('posters')
      .insert({
        title,
        description,
        image_url,
        category,
        tags: tags || [],
        price: parseFloat(price),
        featured: featured || false,
        status: 'active'
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Poster created:', data.title);

    // Send newsletter notification to all subscribers for new poster
    try {
      console.log('📧 Triggering newsletter notification for new poster...');
      const notificationResult = await notifyPosterCreated(data);
      
      if (notificationResult.success) {
        console.log(`✅ Newsletter sent to ${notificationResult.sentCount} subscribers`);
      } else {
        console.log('⚠️ Newsletter notification failed:', notificationResult.error);
      }
    } catch (notificationError) {
      console.error('❌ Newsletter notification error:', notificationError);
      // Don't fail the poster creation if newsletter fails
    }

    return NextResponse.json({ poster: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
