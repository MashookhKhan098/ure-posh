import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

    if (offset) {
      query = query.range(parseInt(offset), parseInt(offset) + (parseInt(limit) || 10) - 1);
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

    return NextResponse.json({ poster: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
