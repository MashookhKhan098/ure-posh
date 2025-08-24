/**
 * Newsletter notification utility functions
 * Handles sending notifications to subscribers when new content is approved
 */

interface NotificationData {
  postId: string;
  postType: 'posts' | 'posters';
  postTitle: string;
  postSlug?: string;
  postContent?: string;
  postImage?: string;
}

/**
 * Send newsletter notification to all subscribers
 * @param data - Post data to send in notification
 * @returns Promise with notification result
 */
export async function sendNewsletterNotification(data: NotificationData) {
  try {
    console.log('📧 Sending newsletter notification for:', data.postTitle);
    
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    
    const response = await fetch(`${baseUrl}/api/newsletter/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Newsletter notification sent successfully:', {
        sentCount: result.sentCount,
        totalSubscribers: result.totalSubscribers
      });
      return { success: true, ...result };
    } else {
      const error = await response.json();
      console.error('❌ Newsletter notification failed:', error);
      return { success: false, error: error.error };
    }
  } catch (error) {
    console.error('❌ Newsletter notification error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Send notification for approved article
 */
export async function notifyArticleApproved(article: any) {
  return await sendNewsletterNotification({
    postId: article.id,
    postType: 'posts',
    postTitle: article.title,
    postSlug: article.slug,
    postContent: article.content || article.excerpt,
    postImage: article.image_url || article.featured_image
  });
}

/**
 * Send notification for new poster
 */
export async function notifyPosterCreated(poster: any) {
  return await sendNewsletterNotification({
    postId: poster.id,
    postType: 'posters',
    postTitle: poster.title,
    postSlug: poster.slug,
    postContent: poster.description,
    postImage: poster.image_url
  });
}
