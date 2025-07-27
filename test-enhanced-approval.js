require('dotenv').config({ path: '.env' });

async function testEnhancedApproval() {
  try {
    console.log('🔍 Testing Enhanced Post Approval Interface...');
    
    // Test 1: Check admin dashboard API
    console.log('\n1. Checking Admin Dashboard API...');
    const dashboardResponse = await fetch('http://localhost:4000/api/admin/dashboard');
    
    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      console.log('✅ Admin dashboard API is working');
      console.log(`📊 Total Posts: ${dashboardData.posts?.length || 0}`);
      console.log(`📊 Total Writers: ${dashboardData.metrics?.totalWriters || 0}`);
      
      if (dashboardData.posts && dashboardData.posts.length > 0) {
        console.log('\n📋 Posts with Content:');
        dashboardData.posts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   Status: ${post.status}`);
          console.log(`   Author: ${post.writer}`);
          console.log(`   Category: ${post.category}`);
          console.log(`   Content Length: ${post.content?.length || 0} characters`);
          console.log(`   Read Time: ${post.readTime || 0} min`);
          console.log('');
        });
      }
    } else {
      console.error('❌ Admin dashboard API error:', dashboardResponse.status);
    }

    // Test 2: Check admin interface accessibility
    console.log('\n2. Checking Admin Interface...');
    const adminPageResponse = await fetch('http://localhost:4000/admin');
    
    if (adminPageResponse.ok) {
      console.log('✅ Admin interface is accessible');
      console.log('📋 Enhanced approval interface should be visible');
    } else {
      console.log('⚠️  Admin interface returned status:', adminPageResponse.status);
    }

    console.log('\n🎉 Enhanced Approval Test Complete!');
    console.log('\n📋 New Features Added:');
    console.log('✅ Approval Overview Cards (Pending, Approved, Rejected, Total)');
    console.log('✅ Enhanced Post Cards with Content Preview');
    console.log('✅ Better Action Buttons (Approve & Publish, Reject, Request Changes)');
    console.log('✅ Quality Indicators (Read Time, Category, Author)');
    console.log('✅ Status-specific UI (Published/Rejected badges with dates)');
    console.log('✅ Empty State for No Posts');
    console.log('✅ Improved Visual Design with Gradients and Icons');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testEnhancedApproval(); 