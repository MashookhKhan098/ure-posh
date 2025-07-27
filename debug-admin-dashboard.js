require('dotenv').config({ path: '.env' });

async function debugAdminDashboard() {
  try {
    console.log('🔍 Debugging Admin Dashboard API...');
    
    // Check all posts directly
    console.log('\n1. All Posts (Direct API):');
    const allPostsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (allPostsResponse.ok) {
      const allPosts = await allPostsResponse.json();
      console.log(`✅ Total Posts: ${allPosts.length}`);
      
      console.log('\n📋 All Posts Details:');
      allPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   ID: ${post.id}`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Author: ${post.author}`);
        console.log(`   Created: ${post.created_at}`);
        console.log('');
      });
    }

    // Check admin dashboard API
    console.log('\n2. Admin Dashboard API:');
    const dashboardResponse = await fetch('http://localhost:4000/api/admin/dashboard');
    
    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      console.log('✅ Admin dashboard API is working');
      console.log(`📊 Posts in dashboard: ${dashboardData.posts?.length || 0}`);
      console.log(`📊 Pending approvals: ${dashboardData.metrics?.pendingApprovals || 0}`);
      console.log(`📊 Total writers: ${dashboardData.metrics?.totalWriters || 0}`);
      
      if (dashboardData.posts && dashboardData.posts.length > 0) {
        console.log('\n📋 Posts in Admin Dashboard:');
        dashboardData.posts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   ID: ${post.id}`);
          console.log(`   Status: ${post.status}`);
          console.log(`   Author: ${post.writer}`);
          console.log(`   Content Length: ${post.content?.length || 0}`);
          console.log('');
        });
      }
    } else {
      console.error('❌ Admin dashboard API error:', dashboardResponse.status);
    }

    // Check if there's a difference
    console.log('\n3. Comparing Data Sources:');
    const allPosts = await fetch('http://localhost:4000/api/posts?include_all=true').then(r => r.json());
    const dashboardPosts = await fetch('http://localhost:4000/api/admin/dashboard').then(r => r.json());
    
    console.log(`📊 All Posts API: ${allPosts.length} posts`);
    console.log(`📊 Dashboard API: ${dashboardPosts.posts?.length || 0} posts`);
    
    if (allPosts.length !== dashboardPosts.posts?.length) {
      console.log('⚠️  Data mismatch detected!');
      console.log('💡 The admin dashboard API might be filtering or caching data');
    }

    console.log('\n🎉 Debug Complete!');
    console.log('\n💡 Potential Issues:');
    console.log('1. Admin dashboard API might be caching old data');
    console.log('2. There might be a filtering issue in the dashboard API');
    console.log('3. The frontend might not be refreshing properly');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

debugAdminDashboard(); 