import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { notifyArticleApproved } from '@/lib/newsletter-notifications';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    
    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Update article to approved and set as verified
    const updateData = {
      verified: true,
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { data: article, error } = await supabase
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error: ' + error.message },
        { status: 500 }
      );
    }

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      );
    }

    console.log('✅ Article approved:', article.title);

    // Send newsletter notification in background without blocking response
    Promise.resolve().then(async () => {
      try {
        console.log('📧 Triggering newsletter notification...');
        const notificationResult = await notifyArticleApproved(article);
        
        if (notificationResult.success) {
          console.log(`✅ Newsletter sent to ${notificationResult.sentCount} subscribers`);
        } else {
          console.log('⚠️ Newsletter notification failed:', notificationResult.error);
        }
      } catch (notificationError) {
        console.error('❌ Newsletter notification error:', notificationError);
      }
    }).catch(error => {
      console.error('Background email task error:', error);
    });

    // Return immediately after article is approved (don't wait for email)
    return NextResponse.json({
      success: true,
      message: 'Article approved and verified successfully. Newsletter notification is being sent in background.',
      article,
      emailStatus: 'processing'
    });

  } catch (error) {
    console.error('Approve post error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 