import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('🚀 === NEWSLETTER NOTIFICATION API STARTED ===');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    const { postId, postType, postTitle, postSlug, postContent, postImage } = await request.json();

    if (!postId || !postType || !postTitle) {
      return NextResponse.json(
        { error: 'Missing required fields: postId, postType, postTitle' },
        { status: 400 }
      );
    }

    console.log('📧 Processing newsletter notification for:', {
      postId,
      postType,
      postTitle,
      postSlug
    });

    // Get all active subscribers
    console.log('📋 Fetching active subscribers...');
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('email, unsubscribe_token')
      .eq('is_active', true);

    if (subscribersError) {
      console.log('❌ Error fetching subscribers:', subscribersError);
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      console.log('ℹ️ No active subscribers found');
      return NextResponse.json({
        message: 'No active subscribers to notify',
        success: true,
        sentCount: 0
      });
    }

    console.log(`📊 Found ${subscribers.length} active subscribers`);

    // Check if notification already sent for this post
    const { data: existingNotification } = await supabase
      .from('newsletter_notifications')
      .select('id')
      .eq('post_id', postId)
      .eq('post_type', postType)
      .single();

    if (existingNotification) {
      console.log('ℹ️ Notification already sent for this post');
      return NextResponse.json({
        message: 'Notification already sent for this post',
        alreadySent: true
      });
    }

    // Send emails to all subscribers
    let sentCount = 0;
    const failedEmails = [];

    console.log('📧 Starting email sending process...');
    for (const subscriber of subscribers) {
      try {
        await sendPostNotificationEmail(
          subscriber.email,
          subscriber.unsubscribe_token,
          {
            postId,
            postType,
            postTitle,
            postSlug,
            postContent,
            postImage
          }
        );
        sentCount++;
        console.log(`✅ Email sent to: ${subscriber.email}`);
      } catch (emailError) {
        console.log(`❌ Failed to send email to: ${subscriber.email}`, emailError);
        failedEmails.push(subscriber.email);
      }
    }

    // Log the notification
    const { error: logError } = await supabase
      .from('newsletter_notifications')
      .insert([{
        post_id: postId,
        post_type: postType,
        post_title: postTitle,
        post_slug: postSlug,
        sent_to_count: sentCount
      }]);

    if (logError) {
      console.log('⚠️ Failed to log notification:', logError);
    }

    console.log('🎉 === NEWSLETTER NOTIFICATION COMPLETED ===');
    console.log(`📊 Sent to: ${sentCount}/${subscribers.length} subscribers`);

    return NextResponse.json({
      message: 'Newsletter notifications sent successfully',
      success: true,
      sentCount,
      totalSubscribers: subscribers.length,
      failedEmails: failedEmails.length > 0 ? failedEmails : undefined
    });

  } catch (error) {
    console.log('❌ === NEWSLETTER NOTIFICATION ERROR ===');
    console.log('💥 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send post notification email
async function sendPostNotificationEmail(
  email: string, 
  unsubscribeToken: string,
  postData: {
    postId: string;
    postType: string;
    postTitle: string;
    postSlug?: string;
    postContent?: string;
    postImage?: string;
  }
) {
  let transporter;

  // Configure email transport
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  } else {
    const testAccount = await nodemailer.createTestAccount();
    transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';
  const postUrl = postData.postSlug 
    ? `${baseUrl}/${postData.postType}/${postData.postSlug}`
    : `${baseUrl}/${postData.postType}`;
  
  const unsubscribeUrl = `${baseUrl}/unsubscribe?token=${unsubscribeToken}`;
  
  // Truncate content for preview
  const contentPreview = postData.postContent 
    ? postData.postContent.substring(0, 200) + (postData.postContent.length > 200 ? '...' : '')
    : 'New content has been published!';

  const postTypeDisplay = postData.postType === 'posts' ? 'Blog Post' : 'Poster';
  const emoji = postData.postType === 'posts' ? '📝' : '🎨';

  const mailOptions = {
    from: process.env.SMTP_USER || 'no-reply@ureposh.local',
    to: email,
    subject: `${emoji} New ${postTypeDisplay}: ${postData.postTitle}`,
    text: `
New ${postTypeDisplay} Published!

${postData.postTitle}

${contentPreview}

Read more: ${postUrl}

---
This email was sent because you subscribed to the Ureposh newsletter.
To unsubscribe, visit: ${unsubscribeUrl}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New ${postTypeDisplay} - ${postData.postTitle}</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">${emoji} New ${postTypeDisplay} Published!</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1e40af; margin-top: 0; margin-bottom: 15px;">${postData.postTitle}</h2>
        ${postData.postImage ? `<img src="${postData.postImage}" alt="${postData.postTitle}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">` : ''}
        <p style="color: #4b5563; margin-bottom: 20px;">${contentPreview}</p>
        <div style="text-align: center;">
            <a href="${postUrl}" 
               style="background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
                Read Full ${postTypeDisplay}
            </a>
        </div>
    </div>
    
    <div style="background: white; border-left: 4px solid #10b981; padding: 20px; margin-bottom: 25px;">
        <p style="margin: 0; font-size: 16px; color: #059669;">
            <strong>🚀 Stay Updated:</strong> Keep getting the latest ${postData.postType === 'posts' ? 'articles and insights' : 'designs and creations'} from Ureposh!
        </p>
    </div>
    
    <div style="text-align: center; margin-top: 30px;">
        <p style="color: #6b7280; font-size: 14px;">
            Best regards,<br>
            <strong>The Ureposh Team</strong>
        </p>
    </div>
    
    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
    
    <div style="text-align: center;">
        <p style="color: #9ca3af; font-size: 12px;">
            This email was sent because you subscribed to the Ureposh newsletter.<br>
            <a href="${unsubscribeUrl}" style="color: #2563eb; text-decoration: none;">Unsubscribe</a> | 
            <a href="${baseUrl}" style="color: #2563eb; text-decoration: none;">Visit Website</a>
        </p>
    </div>
</body>
</html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  
  if (!process.env.SMTP_HOST) {
    const testUrl = nodemailer.getTestMessageUrl(info);
    console.log('🔗 Notification preview:', testUrl || '');
  }

  return { messageId: info.messageId };
}
