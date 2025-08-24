import { useCallback } from 'react';

interface PostData {
  id: string;
  title: string;
  slug?: string;
  content?: string;
  image?: string;
  type: 'posts' | 'poster';
}

export const useNewsletterNotification = () => {
  const sendNewsletterNotification = useCallback(async (postData: PostData) => {
    try {
      console.log('📧 Sending newsletter notification for:', postData.title);
      
      const response = await fetch('/api/newsletter/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postData.id,
          postType: postData.type,
          postTitle: postData.title,
          postSlug: postData.slug,
          postContent: postData.content,
          postImage: postData.image,
        }),
      });

      const result = await response.json();
      console.log('📥 Newsletter notification response:', result);

      if (response.ok) {
        console.log(`✅ Newsletter sent to ${result.sentCount} subscribers`);
        return {
          success: true,
          sentCount: result.sentCount,
          totalSubscribers: result.totalSubscribers,
          message: result.message,
          alreadySent: result.alreadySent
        };
      } else {
        console.error('❌ Newsletter notification failed:', result.error);
        return {
          success: false,
          error: result.error
        };
      }
    } catch (error) {
      console.error('❌ Newsletter notification error:', error);
      return {
        success: false,
        error: 'Failed to send newsletter notification'
      };
    }
  }, []);

  return {
    sendNewsletterNotification
  };
};

// Helper function to automatically send newsletter when new posts are created
export const triggerNewsletterForNewPost = async (postData: PostData) => {
  try {
    // Add a small delay to ensure the post is fully created
    setTimeout(async () => {
      const response = await fetch('/api/newsletter/notify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: postData.id,
          postType: postData.type,
          postTitle: postData.title,
          postSlug: postData.slug,
          postContent: postData.content,
          postImage: postData.image,
        }),
      });

      const result = await response.json();
      console.log('🔄 Auto-triggered newsletter:', result);
    }, 2000); // 2 second delay
  } catch (error) {
    console.error('❌ Auto newsletter trigger failed:', error);
  }
};
