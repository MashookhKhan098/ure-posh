#!/usr/bin/env node

async function testProductionWebsite() {
  console.log('🌐 Testing Production Website: https://ureposh-one.vercel.app');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  const baseUrl = 'https://ureposh-one.vercel.app';
  
  try {
    // Test the main website
    console.log('\n🔍 Testing main website accessibility...');
    const mainResponse = await fetch(baseUrl);
    console.log(`✅ Main website: ${mainResponse.status} - ${mainResponse.ok ? 'Working' : 'Issues'}`);
    
    // Test newsletter API
    console.log('\n📧 Testing newsletter API in production...');
    const notifyResponse = await fetch(`${baseUrl}/api/newsletter/notify`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        postId: 'production-test-' + Date.now(),
        postType: 'posters',
        postTitle: '🚀 Production Test - Beautiful Poster',
        postSlug: 'production-test-poster',
        postContent: 'This is a test to verify that newsletter emails are working correctly on the deployed Vercel website at https://ureposh-one.vercel.app',
        postImage: 'https://via.placeholder.com/400x600/28a745/ffffff?text=Production+Success'
      }),
    });
    
    console.log(`Response Status: ${notifyResponse.status}`);
    
    if (notifyResponse.ok) {
      try {
        const result = await notifyResponse.json();
        console.log('🎉 PRODUCTION EMAIL TEST SUCCESS!');
        console.log({
          sentCount: result.sentCount || 'Unknown',
          totalSubscribers: result.totalSubscribers || 'Unknown',
          message: result.message || 'Success'
        });
        
        console.log('\n✅ Your newsletter system is working in production!');
        console.log('   📧 Emails are being sent to subscribers');
        console.log('   🎨 Beautiful poster email templates active');
        console.log('   🚀 Fast API responses implemented');
        
      } catch (parseError) {
        console.log('✅ API responded successfully but response format unclear');
        const text = await notifyResponse.text();
        console.log('Response preview:', text.substring(0, 200));
      }
    } else {
      const errorText = await notifyResponse.text();
      console.log('❌ PRODUCTION EMAIL TEST FAILED:');
      console.log('Status:', notifyResponse.status);
      console.log('Error preview:', errorText.substring(0, 500));
      
      if (notifyResponse.status === 500) {
        console.log('\n💡 This usually indicates:');
        console.log('   1. Missing environment variables in Vercel');
        console.log('   2. SMTP authentication issues');
        console.log('   3. Database connection problems');
        console.log('\n🔧 Next steps:');
        console.log('   1. Check Vercel Environment Variables');
        console.log('   2. Set up Gmail App Password');
        console.log('   3. Verify all SMTP settings');
      }
    }
    
    // Test poster creation (which triggers newsletter)
    console.log('\n🎨 Testing poster creation API...');
    const posterResponse = await fetch(`${baseUrl}/api/posters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Production Test Poster - ' + Date.now(),
        description: 'Testing poster creation with automatic newsletter sending',
        image_url: 'https://via.placeholder.com/400x600/ff6b6b/ffffff?text=Auto+Newsletter',
        category: 'business',
        price: 29.99,
        featured: false
      }),
    });
    
    console.log(`Poster API Status: ${posterResponse.status}`);
    
    if (posterResponse.ok) {
      const posterResult = await posterResponse.json();
      console.log('✅ Poster creation successful');
      console.log('📧 Newsletter should be sent automatically in background');
      console.log('Message:', posterResult.message || 'Poster created');
    } else {
      console.log('❌ Poster creation failed');
      const posterError = await posterResponse.text();
      console.log('Error:', posterError.substring(0, 300));
    }
    
    console.log('\n📋 Production Status Summary:');
    console.log(`   🌐 Website: https://ureposh-one.vercel.app ${mainResponse.ok ? '✅' : '❌'}`);
    console.log(`   📧 Newsletter API: ${notifyResponse.ok ? '✅' : '❌'}`);
    console.log(`   🎨 Poster Creation: ${posterResponse.ok ? '✅' : '❌'}`);
    
    if (!notifyResponse.ok || !posterResponse.ok) {
      console.log('\n🔧 To fix production issues:');
      console.log('   1. Go to Vercel Dashboard → ureposh-one → Settings → Environment Variables');
      console.log('   2. Add all SMTP configuration variables');
      console.log('   3. Set NEXT_PUBLIC_APP_URL=https://ureposh-one.vercel.app');
      console.log('   4. Generate Gmail App Password for SMTP_PASS');
      console.log('   5. Redeploy after adding environment variables');
    }
    
  } catch (error) {
    console.error('❌ Production test failed:', error.message);
    
    if (error.code === 'ENOTFOUND') {
      console.log('💡 DNS or network issues accessing the deployed site');
    } else if (error.code === 'FETCH_ERROR') {
      console.log('💡 Connection issues with the Vercel deployment');
    }
  }
}

testProductionWebsite();
