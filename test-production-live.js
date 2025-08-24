#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testProductionWebsite() {
  console.log('🌐 Testing Production Website: https://ureposh-one.vercel.app');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  const productionUrl = 'https://ureposh-one.vercel.app';
  
  try {
    // Test the newsletter notification API on production
    console.log('\n📧 Testing Production Newsletter API...');
    console.log(`🎯 Target URL: ${productionUrl}/api/newsletter/notify`);
    
    const response = await fetch(`${productionUrl}/api/newsletter/notify`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'User-Agent': 'Newsletter-Test/1.0'
      },
      body: JSON.stringify({
        postId: 'prod-test-' + Date.now(),
        postType: 'posters',
        postTitle: '🚀 Production Test - Newsletter Working!',
        postSlug: 'production-newsletter-test',
        postContent: 'This is a test to verify that the newsletter system is working correctly on the production website at ureposh-one.vercel.app',
        postImage: 'https://via.placeholder.com/400x600/28a745/ffffff?text=Production+Success'
      }),
    });
    
    console.log(`📊 Response Status: ${response.status}`);
    console.log(`📊 Response OK: ${response.ok}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ PRODUCTION NEWSLETTER TEST PASSED! 🎉');
      console.log(`📧 Emails sent to: ${data.sentCount} subscribers`);
      console.log(`👥 Total active subscribers: ${data.totalSubscribers}`);
      console.log(`📝 Message: ${data.message || 'Newsletter sent successfully'}`);
      
      console.log('\n🎯 What this means:');
      console.log('   ✅ Your production API is working');
      console.log('   ✅ SMTP configuration is correct');
      console.log('   ✅ Environment variables are properly set');
      console.log('   ✅ Emails are being sent to subscribers');
      console.log('   ✅ Newsletter system is FULLY OPERATIONAL!');
      
    } else {
      const errorText = await response.text();
      console.log('❌ PRODUCTION TEST FAILED');
      console.log(`📊 Status: ${response.status}`);
      console.log(`📋 Error Response:`, errorText);
      
      if (response.status === 500) {
        console.log('\n🔍 Possible Issues:');
        console.log('   - Missing environment variables in Vercel');
        console.log('   - SMTP authentication problem');
        console.log('   - Function timeout (check Vercel logs)');
      }
    }
    
    // Test basic website accessibility
    console.log('\n🌐 Testing website accessibility...');
    const siteResponse = await fetch(productionUrl);
    console.log(`🏠 Website Status: ${siteResponse.status} ${siteResponse.ok ? '✅ ONLINE' : '❌ OFFLINE'}`);
    
    console.log('\n📋 Production Environment Summary:');
    console.log(`   🌍 Website: ${productionUrl}`);
    console.log(`   📧 Newsletter API: ${productionUrl}/api/newsletter/notify`);
    console.log(`   📝 Admin Portal: ${productionUrl}/admin`);
    console.log(`   🎨 Poster Upload: ${productionUrl}/admin/posters`);
    
    console.log('\n🎯 Next Steps:');
    console.log('   1. If test passed → Newsletter system is working! 🎉');
    console.log('   2. If test failed → Check Vercel environment variables');
    console.log('   3. Upload a poster via admin panel to trigger real email');
    console.log('   4. Approve a post to trigger newsletter');
    
  } catch (error) {
    console.error('❌ Production test failed:', error);
    
    if (error.code === 'ENOTFOUND') {
      console.log('🚨 Website not accessible - check if deployment completed');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🚨 Connection refused - website might be down');
    } else {
      console.log('🚨 Unknown error - check network connection');
    }
  }
}

testProductionWebsite();
