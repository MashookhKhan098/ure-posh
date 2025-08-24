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
    // Enhanced design for poster emails with View All Posters button
    htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🎨 New Poster Available - ${postData.postTitle}</title>
    <style>
        @media (max-width: 600px) {
            .mobile-padding { padding: 20px !important; }
            .mobile-button { width: 90% !important; padding: 15px 20px !important; }
            .mobile-text { font-size: 14px !important; }
        }
    </style>
</head>
<body style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); line-height: 1.6;">
    <div style="max-width: 650px; margin: 0 auto; background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.15); border-radius: 0;">
        
        <!-- Header with dynamic gradient background -->
        <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 50%, #fd79a8 100%); padding: 50px 30px; text-align: center; color: white; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
            <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
            <div style="font-size: 60px; margin-bottom: 15px; animation: bounce 2s infinite;">🎨</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Fresh Creative Poster!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; font-weight: 300;">Just added to our exclusive design collection</p>
            <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.2); border-radius: 25px; display: inline-block;">
                <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">✨ Premium Quality Design ✨</span>
            </div>
        </div>
        
        <!-- Main content with enhanced styling -->
        <div class="mobile-padding" style="padding: 50px 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #2d3436; font-size: 28px; margin: 0 0 20px 0; font-weight: 700; line-height: 1.3;">${postData.postTitle}</h2>
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #ff6b6b, #ee5a24, #fd79a8); margin: 0 auto; border-radius: 3px;"></div>
                <p style="margin: 20px 0 0 0; color: #636e72; font-size: 16px; font-style: italic;">Professionally crafted for maximum impact</p>
            </div>
            
            ${postData.postImage ? `
            <!-- Featured Poster Image with enhanced presentation -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-block; padding: 12px; background: linear-gradient(45deg, #ff6b6b, #ee5a24); border-radius: 16px; box-shadow: 0 12px 35px rgba(0,0,0,0.2);">
                    <div style="background: white; padding: 8px; border-radius: 12px;">
                        <img src="${postData.postImage}" alt="${postData.postTitle}" 
                             style="width: 100%; max-width: 450px; height: auto; border-radius: 8px; display: block;">
                    </div>
                </div>
                <p style="margin: 15px 0 0 0; color: #636e72; font-size: 14px; font-style: italic;">Click to view full resolution</p>
            </div>
            ` : ''}
            
            <!-- Enhanced Description -->
            ${contentPreview ? `
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 15px; margin-bottom: 35px; border-left: 6px solid #ff6b6b; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <div style="position: absolute; top: 15px; right: 20px; color: #ff6b6b; font-size: 24px; opacity: 0.3;">💬</div>
                <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 18px; font-weight: 600;">About This Design:</h3>
                <p style="margin: 0; color: #2d3436; font-size: 16px; line-height: 1.7;">${contentPreview}</p>
            </div>
            ` : ''}
            
            <!-- Dual Call to Action Buttons -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="margin-bottom: 15px;">
                    <a href="${postUrl}" 
                       class="mobile-button"
                       style="display: inline-block; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
                              color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; 
                              font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
                              transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 10px;">
                        🖼️ View This Poster
                    </a>
                </div>
                <div>
                    <a href="${baseUrl}/services/poster-and-policy-discloser" 
                       class="mobile-button"
                       style="display: inline-block; background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); 
                              color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; 
                              font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(116, 185, 255, 0.4);
                              transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 10px;">
                        🎨 View All Posters
                    </a>
                </div>
                <p class="mobile-text" style="margin: 15px 0 0 0; color: #636e72; font-size: 14px; font-style: italic;">Discover our complete collection of professional designs</p>
            </div>
            
            <!-- Enhanced Features Grid -->
            <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 15px; padding: 30px; margin-bottom: 35px; border: 1px solid #e9ecef; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h3 style="text-align: center; margin: 0 0 25px 0; color: #2d3436; font-size: 20px; font-weight: 600;">What Makes Our Posters Special</h3>
                <div style="display: table; width: 100%;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #ff6b6b, #ee5a24); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.3);">📐</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Premium Quality</div>
                            <div style="color: #636e72; font-size: 12px;">High-resolution designs</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #74b9ff, #0984e3); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(116, 185, 255, 0.3);">💫</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Creative Excellence</div>
                            <div style="color: #636e72; font-size: 12px;">Unique artistic vision</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #00b894, #00a085); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(0, 184, 148, 0.3);">⚡</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Ready to Use</div>
                            <div style="color: #636e72; font-size: 12px;">Download instantly</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #fd79a8, #e84393); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(253, 121, 168, 0.3);">🎯</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Purpose-Built</div>
                            <div style="color: #636e72; font-size: 12px;">Targeted messaging</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Engagement Section -->
            <div style="background: linear-gradient(135deg, #74b9ff 0%, #0984e3 50%, #6c5ce7 100%); padding: 35px; border-radius: 15px; text-align: center; color: white; margin-bottom: 30px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
                <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
                <h3 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 700;">🚀 Stay Creative & Inspired!</h3>
                <p style="margin: 0; font-size: 16px; font-weight: 400; line-height: 1.6; opacity: 0.95;">
                    Join thousands of creative professionals who trust Ureposh for their design needs. Get exclusive access to new posters, creative resources, and design insights delivered straight to your inbox!
                </p>
                <div style="margin-top: 20px; padding: 15px 25px; background: rgba(255,255,255,0.15); border-radius: 25px; display: inline-block;">
                    <span style="font-size: 14px; font-weight: 600;">✨ Premium Member Benefits ✨</span>
                </div>
            </div>
            
            <!-- Social Proof Section -->
            <div style="text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%); border-radius: 12px;">
                <p style="margin: 0; color: #2d3436; font-size: 16px; font-weight: 600;">
                    🌟 <strong>Loved by Creators Worldwide</strong> 🌟
                </p>
                <p style="margin: 10px 0 0 0; color: #636e72; font-size: 14px;">
                    "These posters have transformed our workplace communication!" - Happy Customer
                </p>
            </div>
        </div>
        
        <!-- Enhanced Footer -->
        <div style="background: linear-gradient(135deg, #2d3436 0%, #636e72 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Thank You for Being Creative!</h3>
                <p style="margin: 0; color: #b2bec3; font-size: 16px; line-height: 1.5;">
                    We're thrilled to share our latest design creations with amazing people like you. Your creativity inspires us to keep designing!
                </p>
            </div>
            
            <!-- Action Links -->
            <div style="margin: 25px 0; border-top: 1px solid #636e72; border-bottom: 1px solid #636e72; padding: 20px 0;">
                <a href="${baseUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">🏠 Visit Website</a>
                <a href="${baseUrl}/services/poster-and-policy-discloser" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">🎨 All Posters</a>
                <a href="${unsubscribeUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">✉️ Unsubscribe</a>
            </div>
            
            <div style="margin-top: 20px;">
                <p style="margin: 0; color: #636e72; font-size: 12px; line-height: 1.4;">
                    © 2025 Ureposh - Professional Creative Solutions<br>
                    Designing the future, one poster at a time.
                </p>
            </div>
        </div>
    </div>
</body>
</html>`;
  } else {
    // Enhanced design for blog post emails
    htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>📝 New Article - ${postData.postTitle}</title>
    <style>
        @media (max-width: 600px) {
            .mobile-padding { padding: 20px !important; }
            .mobile-button { width: 90% !important; padding: 15px 20px !important; }
            .mobile-text { font-size: 14px !important; }
        }
    </style>
</head>
<body style="font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); line-height: 1.6;">
    <div style="max-width: 650px; margin: 0 auto; background: white; box-shadow: 0 20px 60px rgba(0,0,0,0.15); border-radius: 0;">
        
        <!-- Header with dynamic gradient background -->
        <div style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #3b82f6 100%); padding: 50px 30px; text-align: center; color: white; position: relative; overflow: hidden;">
            <div style="position: absolute; top: -50px; right: -50px; width: 100px; height: 100px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
            <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
            <div style="font-size: 60px; margin-bottom: 15px;">📝</div>
            <h1 style="margin: 0; font-size: 32px; font-weight: 800; letter-spacing: -1px; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">New Insightful Article!</h1>
            <p style="margin: 15px 0 0 0; font-size: 18px; opacity: 0.95; font-weight: 300;">Fresh insights and expert knowledge for you</p>
            <div style="margin-top: 20px; padding: 12px 24px; background: rgba(255,255,255,0.2); border-radius: 25px; display: inline-block;">
                <span style="font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">✨ Expert Content ✨</span>
            </div>
        </div>
        
        <!-- Main content with enhanced styling -->
        <div class="mobile-padding" style="padding: 50px 40px;">
            <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #2d3436; font-size: 28px; margin: 0 0 20px 0; font-weight: 700; line-height: 1.3;">${postData.postTitle}</h2>
                <div style="width: 80px; height: 5px; background: linear-gradient(90deg, #2563eb, #1d4ed8, #3b82f6); margin: 0 auto; border-radius: 3px;"></div>
                <p style="margin: 20px 0 0 0; color: #636e72; font-size: 16px; font-style: italic;">Expert insights for informed decision-making</p>
            </div>
            
            ${postData.postImage ? `
            <!-- Featured Article Image with enhanced presentation -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="display: inline-block; padding: 12px; background: linear-gradient(45deg, #2563eb, #1d4ed8); border-radius: 16px; box-shadow: 0 12px 35px rgba(0,0,0,0.2);">
                    <div style="background: white; padding: 8px; border-radius: 12px;">
                        <img src="${postData.postImage}" alt="${postData.postTitle}" 
                             style="width: 100%; max-width: 450px; height: 250px; object-fit: cover; border-radius: 8px; display: block;">
                    </div>
                </div>
                <p style="margin: 15px 0 0 0; color: #636e72; font-size: 14px; font-style: italic;">Featured article image</p>
            </div>
            ` : ''}
            
            <!-- Enhanced Article Preview -->
            ${contentPreview ? `
            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 30px; border-radius: 15px; margin-bottom: 35px; border-left: 6px solid #2563eb; position: relative; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <div style="position: absolute; top: 15px; right: 20px; color: #2563eb; font-size: 24px; opacity: 0.3;">📖</div>
                <h3 style="margin: 0 0 15px 0; color: #2d3436; font-size: 18px; font-weight: 600;">Article Preview:</h3>
                <p style="margin: 0; color: #2d3436; font-size: 16px; line-height: 1.7;">${contentPreview}</p>
            </div>
            ` : ''}
            
            <!-- Dual Call to Action Buttons -->
            <div style="text-align: center; margin-bottom: 40px;">
                <div style="margin-bottom: 15px;">
                    <a href="${postUrl}" 
                       class="mobile-button"
                       style="display: inline-block; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                              color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; 
                              font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
                              transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 10px;">
                        📖 Read Full Article
                    </a>
                </div>
                <div>
                    <a href="${baseUrl}/posts" 
                       class="mobile-button"
                       style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); 
                              color: white; padding: 18px 40px; text-decoration: none; border-radius: 50px; 
                              font-weight: 700; font-size: 16px; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
                              transition: all 0.3s ease; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 10px;">
                        📚 Browse All Articles
                    </a>
                </div>
                <p class="mobile-text" style="margin: 15px 0 0 0; color: #636e72; font-size: 14px; font-style: italic;">Explore our complete knowledge library</p>
            </div>
            
            <!-- Enhanced Features Grid -->
            <div style="background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%); border-radius: 15px; padding: 30px; margin-bottom: 35px; border: 1px solid #e9ecef; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                <h3 style="text-align: center; margin: 0 0 25px 0; color: #2d3436; font-size: 20px; font-weight: 600;">Why Our Content Stands Out</h3>
                <div style="display: table; width: 100%;">
                    <div style="display: table-row;">
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">🎯</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Expert Analysis</div>
                            <div style="color: #636e72; font-size: 12px;">In-depth research</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #10b981, #059669); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">💡</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Practical Insights</div>
                            <div style="color: #636e72; font-size: 12px;">Actionable advice</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #8b5cf6, #7c3aed); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">📊</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Data-Driven</div>
                            <div style="color: #636e72; font-size: 12px;">Evidence-based</div>
                        </div>
                        <div style="display: table-cell; width: 25%; text-align: center; padding: 20px 10px;">
                            <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; font-size: 20px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">⚡</div>
                            <div style="color: #2d3436; font-size: 14px; font-weight: 600; margin-bottom: 5px;">Up-to-Date</div>
                            <div style="color: #636e72; font-size: 12px;">Latest trends</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Engagement Section -->
            <div style="background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%); padding: 35px; border-radius: 15px; text-align: center; color: white; margin-bottom: 30px; position: relative; overflow: hidden;">
                <div style="position: absolute; top: -20px; right: -20px; width: 80px; height: 80px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
                <div style="position: absolute; bottom: -30px; left: -30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.3;"></div>
                <h3 style="margin: 0 0 15px 0; font-size: 22px; font-weight: 700;">🚀 Stay Informed & Ahead!</h3>
                <p style="margin: 0; font-size: 16px; font-weight: 400; line-height: 1.6; opacity: 0.95;">
                    Join thousands of professionals who trust Ureposh for cutting-edge insights, industry updates, and expert analysis. Get the knowledge you need to make informed decisions and stay ahead in your field!
                </p>
                <div style="margin-top: 20px; padding: 15px 25px; background: rgba(255,255,255,0.15); border-radius: 25px; display: inline-block;">
                    <span style="font-size: 14px; font-weight: 600;">✨ Trusted by Industry Leaders ✨</span>
                </div>
            </div>
            
            <!-- Reading Time & Categories -->
            <div style="text-align: center; margin-bottom: 30px; padding: 25px; background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%); border-radius: 12px;">
                <p style="margin: 0; color: #2d3436; font-size: 16px; font-weight: 600;">
                    📚 <strong>Quality Content You Can Trust</strong> 📚
                </p>
                <p style="margin: 10px 0 0 0; color: #636e72; font-size: 14px;">
                    "Ureposh consistently delivers valuable insights that help us stay compliant and informed." - Industry Professional
                </p>
            </div>
        </div>
        
        <!-- Enhanced Footer -->
        <div style="background: linear-gradient(135deg, #2d3436 0%, #636e72 100%); padding: 40px 30px; text-align: center; color: white;">
            <div style="margin-bottom: 25px;">
                <h3 style="margin: 0 0 10px 0; font-size: 20px; font-weight: 700;">Thank You for Reading!</h3>
                <p style="margin: 0; color: #b2bec3; font-size: 16px; line-height: 1.5;">
                    We're committed to bringing you the most valuable and up-to-date content. Your engagement drives our passion for creating quality articles!
                </p>
            </div>
            
            <!-- Action Links -->
            <div style="margin: 25px 0; border-top: 1px solid #636e72; border-bottom: 1px solid #636e72; padding: 20px 0;">
                <a href="${baseUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">🏠 Visit Website</a>
                <a href="${baseUrl}/posts" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">📚 All Articles</a>
                <a href="${unsubscribeUrl}" style="color: #74b9ff; text-decoration: none; margin: 0 20px; font-size: 16px; font-weight: 500;">✉️ Unsubscribe</a>
            </div>
            
            <div style="margin-top: 20px;">
                <p style="margin: 0; color: #636e72; font-size: 12px; line-height: 1.4;">
                    © 2025 Ureposh - Professional Insights & Solutions<br>
                    Empowering professionals with knowledge and expertise.
                </p>
            </div>
        </div>
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
