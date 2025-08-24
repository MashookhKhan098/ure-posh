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
    const failedEmails: string[] = [];

    console.log('📧 Starting optimized email sending process...');
    
    // Process emails in batches for better performance
    const batchSize = 3; // Process 3 emails at a time
    const batches = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }
    
    console.log(`📦 Processing ${subscribers.length} emails in ${batches.length} batches of ${batchSize}`);
    
    for (const batch of batches) {
      const batchPromises = batch.map(async (subscriber) => {
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
          console.log(`✅ Email sent to: ${subscriber.email}`);
          return { success: true, email: subscriber.email };
        } catch (emailError) {
          console.log(`❌ Failed to send email to: ${subscriber.email}`, emailError);
          return { success: false, email: subscriber.email, error: emailError };
        }
      });
      
      // Process batch concurrently with timeout
      try {
        const batchResults = await Promise.allSettled(batchPromises.map(p => 
          Promise.race([p, new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Email timeout')), 30000)
          )])
        ));
        
        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled' && (result.value as any)?.success) {
            sentCount++;
          } else {
            failedEmails.push(batch[index].email);
          }
        });
        
        // Small delay between batches to respect rate limits
        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay
        }
        
      } catch (batchError) {
        console.error('Batch processing error:', batchError);
        // Add all batch emails to failed list
        batch.forEach(subscriber => failedEmails.push(subscriber.email));
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
  console.log('📧 Email configuration check:', {
    hasHost: !!process.env.SMTP_HOST,
    hasUser: !!process.env.SMTP_USER,
    hasPass: !!process.env.SMTP_PASS,
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    nodeEnv: process.env.NODE_ENV
  });

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('✅ Using production SMTP configuration');
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Optimized settings for production and Vercel
      pool: true, // Use connection pooling for better performance
      maxConnections: 5, // Max simultaneous connections
      maxMessages: 10, // Max messages per connection
      rateDelta: 1000, // Rate limiting: 1 second between emails
      rateLimit: 5, // Max 5 emails per rateDelta period
      tls: {
        rejectUnauthorized: false // This helps with some deployment environments
      },
      // Connection timeout settings for stability
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000, // 30 seconds
      socketTimeout: 60000, // 60 seconds
    });

    // Verify connection configuration with timeout
    try {
      console.log('🔍 Verifying SMTP connection...');
      const verifyPromise = transporter.verify();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('SMTP verification timeout')), 15000)
      );
      
      await Promise.race([verifyPromise, timeoutPromise]);
      console.log('✅ SMTP connection verified successfully');
    } catch (verifyError) {
      console.error('❌ SMTP verification failed:', verifyError);
      const errorMessage = verifyError instanceof Error ? verifyError.message : 'Unknown error';
      
      // Don't throw error in production, use fallback
      if (process.env.NODE_ENV === 'production') {
        console.log('⚠️ Using fallback email configuration in production');
        // Continue with the transport anyway for production stability
      } else {
        throw new Error(`SMTP verification failed: ${errorMessage}`);
      }
    }
  } else {
    console.log('⚠️ Missing SMTP config, using test account');
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

  // Create different email designs for posts vs posters
  let htmlContent = '';
  
  if (postData.postType === 'posters') {
    // Special design for poster emails
    htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 New Poster Available - ${postData.postTitle}</title>
</head>
<body style="font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
    <div style="max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
        
        <!-- Header with gradient background -->
        <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); padding: 40px 30px; text-align: center; color: white;">
            <div style="font-size: 48px; margin-bottom: 10px;">🎨</div>
            <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Creative Poster!</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">Fresh design just added to our collection</p>
        </div>
        
        <!-- Main content -->
        <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #2d3436; font-size: 24px; margin: 0 0 15px 0; font-weight: 600;">${postData.postTitle}</h2>
                <div style="width: 60px; height: 4px; background: linear-gradient(90deg, #ff6b6b, #ee5a24); margin: 0 auto;"></div>
            </div>
            
            ${postData.postImage ? `
            <!-- Poster Image -->
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; padding: 8px; background: white; border-radius: 12px; box-shadow: 0 8px 25px rgba(0,0,0,0.15);">
                    <img src="${postData.postImage}" alt="${postData.postTitle}" 
                         style="width: 100%; max-width: 400px; height: auto; border-radius: 8px; display: block;">
                </div>
            </div>
            ` : ''}
            
            <!-- Description -->
            ${contentPreview ? `
            <div style="background: #f8f9fa; padding: 25px; border-radius: 12px; margin-bottom: 30px; border-left: 5px solid #ff6b6b;">
                <p style="margin: 0; color: #2d3436; font-size: 16px; line-height: 1.6;">${contentPreview}</p>
            </div>
            ` : ''}
            
            <!-- Call to Action -->
            <div style="text-align: center; margin-bottom: 30px;">
                <a href="${postUrl}" 
                   style="display: inline-block; background: linear-gradient(135deg, #ff6b6b, #ee5a24); 
                          color: white; padding: 16px 32px; text-decoration: none; border-radius: 50px; 
                          font-weight: 600; font-size: 16px; box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
                          transition: transform 0.2s;">
                    🖼️ View Full Poster
                </a>
            </div>
            
            <!-- Features -->
            <div style="display: table; width: 100%; margin-bottom: 30px;">
                <div style="display: table-row;">
                    <div style="display: table-cell; width: 33%; text-align: center; padding: 15px;">
                        <div style="color: #ff6b6b; font-size: 24px; margin-bottom: 8px;">📐</div>
                        <div style="color: #636e72; font-size: 14px;">High Quality</div>
                    </div>
                    <div style="display: table-cell; width: 33%; text-align: center; padding: 15px;">
                        <div style="color: #ff6b6b; font-size: 24px; margin-bottom: 8px;">💫</div>
                        <div style="color: #636e72; font-size: 14px;">Creative Design</div>
                    </div>
                    <div style="display: table-cell; width: 33%; text-align: center; padding: 15px;">
                        <div style="color: #ff6b6b; font-size: 24px; margin-bottom: 8px;">⚡</div>
                        <div style="color: #636e72; font-size: 14px;">Ready to Use</div>
                    </div>
                </div>
            </div>
            
            <!-- Engagement box -->
            <div style="background: linear-gradient(135deg, #74b9ff, #0984e3); padding: 25px; border-radius: 12px; text-align: center; color: white; margin-bottom: 20px;">
                <p style="margin: 0; font-size: 16px; font-weight: 500;">
                    🚀 <strong>Stay Creative!</strong> Get notified about our latest poster designs and creative content.
                </p>
            </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #2d3436; padding: 30px; text-align: center; color: white;">
            <p style="margin: 0 0 15px 0; font-size: 16px;">
                <strong>Thank you for being part of the Ureposh community!</strong>
            </p>
            <p style="margin: 0 0 20px 0; color: #b2bec3; font-size: 14px;">
                We're excited to share our latest creative works with you.
            </p>
            <div style="margin: 20px 0;">
                <a href="${baseUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 15px;">🏠 Visit Website</a>
                <a href="${unsubscribeUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 15px;">✉️ Unsubscribe</a>
            </div>
            <p style="margin: 20px 0 0 0; color: #636e72; font-size: 12px;">
                © 2025 Ureposh. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>`;
  } else {
    // Original design for blog posts
    htmlContent = `
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
</html>`;
  }

  const mailOptions = {
    from: process.env.SMTP_USER || 'no-reply@ureposh.local',
    to: email,
    subject: postData.postType === 'posters' ? `🎨 New Creative Poster: ${postData.postTitle}` : `${emoji} New ${postTypeDisplay}: ${postData.postTitle}`,
    text: `
New ${postTypeDisplay} Published!

${postData.postTitle}

${contentPreview}

${postData.postType === 'posters' ? 'View this amazing poster design at:' : 'Read more at:'} ${postUrl}

---
This email was sent because you subscribed to the Ureposh newsletter.
To unsubscribe, visit: ${unsubscribeUrl}
    `,
    html: htmlContent,
  };

  try {
    console.log(`📧 Sending email to: ${email} (optimized)`);
    
    // Create timeout promise for email sending
    const sendPromise = transporter.sendMail(mailOptions);
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Email send timeout')), 25000) // 25 second timeout
    );
    
    const info = await Promise.race([sendPromise, timeoutPromise]) as any;
    console.log(`✅ Email sent successfully to ${email}, messageId: ${info.messageId}`);
    
    if (!process.env.SMTP_HOST) {
      const testUrl = nodemailer.getTestMessageUrl(info);
      console.log('🔗 Notification preview:', testUrl || '');
    }

    return { messageId: info.messageId };
  } catch (sendError) {
    console.error(`❌ Failed to send email to ${email}:`, sendError);
    const errorMessage = sendError instanceof Error ? sendError.message : 'Unknown error';
    throw new Error(`Email sending failed: ${errorMessage}`);
  }
}
