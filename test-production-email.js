#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testProductionEmail() {
  console.log('📧 Testing Production Email Configuration...');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  // Check environment variables
  console.log('\n🔍 Environment Variables Check:');
  console.log({
    NODE_ENV: process.env.NODE_ENV,
    SMTP_HOST: process.env.SMTP_HOST || 'NOT SET',
    SMTP_PORT: process.env.SMTP_PORT || 'NOT SET',
    SMTP_USER: process.env.SMTP_USER || 'NOT SET',
    SMTP_PASS: process.env.SMTP_PASS ? '✅ SET' : '❌ NOT SET',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'NOT SET'
  });
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';
  
  try {
    // Test the newsletter notification API directly
    console.log('\n📧 Testing Newsletter API...');
    const response = await fetch(`${baseUrl}/api/newsletter/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: 'prod-test-' + Date.now(),
        postType: 'posters',
        postTitle: '🔧 Production Email Test',
        postSlug: 'production-email-test',
        postContent: 'This is a test to verify that emails are working in production deployment.',
        postImage: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Production+Test'
      }),
    });
    
    const responseText = await response.text();
    console.log(`Response Status: ${response.status}`);
    console.log(`Response Headers:`, Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      try {
        const data = JSON.parse(responseText);
        console.log('✅ Production email test SUCCESS:', {
          sentCount: data.sentCount,
          totalSubscribers: data.totalSubscribers,
          message: data.message
        });
      } catch (parseError) {
        console.log('✅ Response received but could not parse JSON:', responseText);
      }
    } else {
      console.log('❌ Production email test FAILED:');
      console.log('Status:', response.status);
      console.log('Response:', responseText);
      
      try {
        const errorData = JSON.parse(responseText);
        console.log('Error details:', errorData);
      } catch (e) {
        console.log('Raw error response:', responseText);
      }
    }
    
    // Production deployment checklist
    console.log('\n📋 Production Deployment Checklist:');
    console.log('   📝 Environment Variables:');
    console.log(`      ${process.env.SMTP_HOST ? '✅' : '❌'} SMTP_HOST`);
    console.log(`      ${process.env.SMTP_PORT ? '✅' : '❌'} SMTP_PORT`);
    console.log(`      ${process.env.SMTP_USER ? '✅' : '❌'} SMTP_USER`);
    console.log(`      ${process.env.SMTP_PASS ? '✅' : '❌'} SMTP_PASS`);
    console.log(`      ${process.env.NEXT_PUBLIC_APP_URL ? '✅' : '❌'} NEXT_PUBLIC_APP_URL`);
    
    console.log('\n   🔧 Required Actions for Production:');
    console.log('   1. Set all SMTP environment variables in Vercel dashboard');
    console.log('   2. Update NEXT_PUBLIC_APP_URL to your actual domain');
    console.log('   3. Test Gmail app password is working');
    console.log('   4. Verify Supabase environment variables are set');
    console.log('   5. Check function timeout limits in Vercel');
    
    console.log('\n   📧 Gmail Setup (if using Gmail):');
    console.log('   1. Enable 2-factor authentication on Gmail');
    console.log('   2. Generate App Password in Google Account settings');
    console.log('   3. Use the app password (not regular password) in SMTP_PASS');
    
  } catch (error) {
    console.error('❌ Production test failed:', error);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 This usually means:');
      console.log('   - Server is not running (for local testing)');
      console.log('   - Wrong URL configured for production testing');
    }
  }
}

testProductionEmail();
