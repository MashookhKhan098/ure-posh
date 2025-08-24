#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });

async function testProductionNewsletter() {
  console.log('📧 Testing Newsletter on Production Deployment...');
  console.log('⏰ Timestamp:', new Date().toISOString());
  
  // Test both deployment URLs
  const deploymentUrls = [
    'https://ureposh-one.vercel.app',
    'https://ureposh-5zwt8843i-ureposh.vercel.app'
  ];
  
  for (const baseUrl of deploymentUrls) {
    console.log(`\n🌐 Testing deployment: ${baseUrl}`);
    
    try {
      // Test newsletter notification API
      console.log('📧 Testing newsletter notification...');
      const response = await fetch(`${baseUrl}/api/newsletter/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: 'prod-test-' + Date.now(),
          postType: 'posters',
          postTitle: '🚀 Production Test - Newsletter',
          postSlug: 'production-newsletter-test',
          postContent: 'Testing newsletter system on production deployment. This email should be sent to all subscribers automatically.',
          postImage: 'https://via.placeholder.com/400x600/28a745/ffffff?text=Production+Test'
        }),
      });
      
      const responseText = await response.text();
      console.log(`Status: ${response.status}`);
      
      if (response.ok) {
        try {
          const data = JSON.parse(responseText);
          console.log(`✅ SUCCESS - ${baseUrl}`);
          console.log('   📊 Results:', {
            sentCount: data.sentCount,
            totalSubscribers: data.totalSubscribers,
            message: data.message
          });
        } catch (parseError) {
          console.log(`✅ Response OK but JSON parse failed - ${baseUrl}`);
          console.log('   Response:', responseText.substring(0, 200) + '...');
        }
      } else {
        console.log(`❌ FAILED - ${baseUrl}`);
        console.log('   Response:', responseText.substring(0, 300) + '...');
      }
      
      // Small delay between tests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`❌ ERROR - ${baseUrl}:`, error.message);
    }
  }
  
  console.log('\n🔧 Production Checklist:');
  console.log('   📝 Required in Vercel Environment Variables:');
  console.log('   ✅ NEXT_PUBLIC_SUPABASE_URL');
  console.log('   ✅ NEXT_PUBLIC_SUPABASE_ANON_KEY');
  console.log('   ✅ SUPABASE_SERVICE_ROLE_KEY');
  console.log('   ✅ JWT_SECRET');
  console.log('   ✅ SMTP_HOST=smtp.gmail.com');
  console.log('   ✅ SMTP_PORT=587');
  console.log('   ✅ SMTP_USER=ureposh@gmail.com');
  console.log('   ✅ SMTP_PASS=[Gmail App Password]');
  console.log('   ✅ NEXT_PUBLIC_APP_URL=https://ureposh-one.vercel.app');
  
  console.log('\n🎯 Next Steps if Failing:');
  console.log('   1. Add all environment variables in Vercel Dashboard');
  console.log('   2. Generate Gmail App Password (not regular password)');
  console.log('   3. Redeploy after adding variables');
  console.log('   4. Check Vercel Function Logs for errors');
}

testProductionNewsletter();
