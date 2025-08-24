import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  console.log('🚀 === NEWSLETTER SUBSCRIPTION API STARTED ===');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    // Parse request body
    console.log('📥 Parsing request body...');
    const { email } = await request.json();
    console.log('✅ Request body parsed successfully');

    // Validate email
    if (!email || !email.includes('@')) {
      console.log('❌ Invalid email provided:', email);
      return NextResponse.json(
        { error: 'Valid email address is required' },
        { status: 400 }
      );
    }

    console.log('📧 Processing subscription for:', email);

    // Check if email already exists
    console.log('🔍 Checking if email already subscribed...');
    const { data: existing, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id, is_active')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.log('❌ Database check error:', checkError);
      return NextResponse.json(
        { error: 'Database error occurred' },
        { status: 500 }
      );
    }

    if (existing) {
      if (existing.is_active) {
        console.log('ℹ️ Email already subscribed and active');
        return NextResponse.json({
          message: 'You are already subscribed to our newsletter!',
          alreadySubscribed: true
        });
      } else {
        // Reactivate subscription
        console.log('🔄 Reactivating subscription...');
        const { error: updateError } = await supabase
          .from('newsletter_subscribers')
          .update({ 
            is_active: true, 
            updated_at: new Date().toISOString() 
          })
          .eq('email', email);

        if (updateError) {
          console.log('❌ Reactivation error:', updateError);
          return NextResponse.json(
            { error: 'Failed to reactivate subscription' },
            { status: 500 }
          );
        }
        console.log('✅ Subscription reactivated');
      }
    } else {
      // Add new subscription
      console.log('➕ Adding new subscription...');
      const { error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert([{ email }]);

      if (insertError) {
        console.log('❌ Subscription insert error:', insertError);
        return NextResponse.json(
          { error: 'Failed to add subscription' },
          { status: 500 }
        );
      }
      console.log('✅ New subscription added');
    }

    // Send welcome email
    try {
      console.log('📧 Sending welcome email...');
      await sendWelcomeEmail(email);
      console.log('✅ Welcome email sent successfully');
    } catch (emailError) {
      console.log('⚠️ Welcome email failed:', emailError);
      // Don't fail the subscription if email fails
    }

    console.log('🎉 === NEWSLETTER SUBSCRIPTION COMPLETED ===');
    return NextResponse.json({
      message: 'Successfully subscribed to newsletter!',
      success: true
    });

  } catch (error) {
    console.log('❌ === NEWSLETTER SUBSCRIPTION ERROR ===');
    console.log('💥 Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  console.log('🚀 === NEWSLETTER UNSUBSCRIBE API STARTED ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token or email required' },
        { status: 400 }
      );
    }

    let updateQuery;
    
    if (token) {
      updateQuery = supabase
        .from('newsletter_subscribers')
        .update({ is_active: false })
        .eq('unsubscribe_token', token);
    } else {
      updateQuery = supabase
        .from('newsletter_subscribers')
        .update({ is_active: false })
        .eq('email', email);
    }

    const { error } = await updateQuery;

    if (error) {
      console.log('❌ Unsubscribe error:', error);
      return NextResponse.json(
        { error: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

    console.log('✅ Successfully unsubscribed');
    return NextResponse.json({
      message: 'Successfully unsubscribed from newsletter',
      success: true
    });

  } catch (error) {
    console.log('❌ Unsubscribe error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send welcome email
async function sendWelcomeEmail(email: string) {
  const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL;
  
  let transporter;
  let previewUrl = '';

  // Configure email transport
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    console.log('📧 Using SMTP configuration for welcome email');
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
    console.log('📧 Using Ethereal test account for welcome email');
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

  const mailOptions = {
    from: process.env.SMTP_USER || 'no-reply@ureposh.local',
    to: email,
    subject: '🎉 Welcome to Ureposh Newsletter!',
    text: `
Welcome to Ureposh Newsletter!

Thank you for subscribing to our newsletter. You'll now receive updates about:
- New blog posts and articles
- Latest posters and designs
- Company news and updates
- Industry insights

We're excited to keep you informed about our latest content and services.

Best regards,
The Ureposh Team

---
To unsubscribe from this newsletter, click here: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000'}/unsubscribe?email=${encodeURIComponent(email)}
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Ureposh Newsletter</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #2563eb; margin-bottom: 10px;">🎉 Welcome to Ureposh Newsletter!</h1>
    </div>
    
    <div style="background: #f8fafc; padding: 25px; border-radius: 10px; margin-bottom: 25px;">
        <h2 style="color: #1e40af; margin-top: 0;">Thank you for subscribing!</h2>
        <p>You'll now receive updates about:</p>
        <ul style="color: #4b5563;">
            <li>📝 New blog posts and articles</li>
            <li>🎨 Latest posters and designs</li>
            <li>📢 Company news and updates</li>
            <li>💡 Industry insights</li>
        </ul>
    </div>
    
    <div style="background: white; border-left: 4px solid #2563eb; padding: 20px; margin-bottom: 25px;">
        <p style="margin: 0; font-size: 16px;">We're excited to keep you informed about our latest content and services!</p>
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
            To unsubscribe from this newsletter, 
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000'}/unsubscribe?email=${encodeURIComponent(email)}" 
               style="color: #2563eb; text-decoration: none;">click here</a>
        </p>
    </div>
</body>
</html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  
  if (!process.env.SMTP_HOST) {
    const testUrl = nodemailer.getTestMessageUrl(info);
    previewUrl = testUrl || '';
    console.log('🔗 Welcome email preview:', previewUrl);
  }

  return { messageId: info.messageId, previewUrl };
}
