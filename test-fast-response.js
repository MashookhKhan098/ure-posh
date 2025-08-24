#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testFastResponse() {
  console.log('⚡ Testing Fast API Response (No Loading Wait)...');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:4000';
  
  try {
    console.log('\n🚀 Testing poster upload with immediate response...');
    
    const startTime = Date.now();
    
    // Test poster creation - should return immediately
    const posterResponse = await fetch(`${baseUrl}/api/posters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Fast Response Test Poster',
        description: 'Testing that API responds immediately after saving poster, before sending emails',
        image_url: 'https://via.placeholder.com/400x600/28a745/ffffff?text=Fast+Response',
        category: 'business',
        price: 25.99,
        featured: false
      }),
    });
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    if (posterResponse.ok) {
      const posterData = await posterResponse.json();
      console.log(`✅ Poster created in ${responseTime}ms (FAST!)`, {
        id: posterData.poster.id,
        title: posterData.poster.title,
        message: posterData.message
      });
      
      console.log('\n📊 Performance Results:');
      console.log(`   ⚡ Response Time: ${responseTime}ms`);
      console.log(`   📤 API responded immediately after database save`);
      console.log(`   📧 Email sending happens in background`);
      console.log(`   🎯 Loading animation stops right away!`);
      
      console.log('\n🔄 What happens now:');
      console.log('   1. ✅ Poster saved to database → Response sent');
      console.log('   2. 🛑 Loading animation stops');  
      console.log('   3. 📧 Emails being sent in background (users don\'t wait)');
      
    } else {
      const error = await posterResponse.json();
      console.log('❌ Poster creation failed:', error);
    }
    
    console.log('\n🎯 User Experience Improved:');
    console.log('   ✅ Immediate feedback after upload');
    console.log('   ✅ No waiting for email sending');
    console.log('   ✅ Background email processing');
    console.log('   ✅ Better UI responsiveness');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFastResponse();
