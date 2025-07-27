require('dotenv').config({ path: '.env' });

async function testApprovalFunctionality() {
  try {
    console.log('🔍 Testing Admin Approval Functionality...');
    
    // Step 1: Check current posts
    console.log('\n1. Current Posts Status:');
    const allPostsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (allPostsResponse.ok) {
      const allPosts = await allPostsResponse.json();
      console.log(`✅ Total Posts: ${allPosts.length}`);
      
      const publishedPosts = allPosts.filter(p => p.status === 'published');
      const draftPosts = allPosts.filter(p => p.status === 'draft');
      const rejectedPosts = allPosts.filter(p => p.status === 'rejected');
      
      console.log(`📊 Status Breakdown:`);
      console.log(`   Published: ${publishedPosts.length}`);
      console.log(`   Draft: ${draftPosts.length}`);
      console.log(`   Rejected: ${rejectedPosts.length}`);
      
      if (draftPosts.length > 0) {
        console.log('\n📋 Draft Posts (Ready for Approval):');
        draftPosts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title} by ${post.author}`);
          console.log(`   ID: ${post.id}`);
          console.log(`   Status: ${post.status}`);
          console.log('');
        });
      } else {
        console.log('📋 No draft posts available for approval testing');
      }
    }

    // Step 2: Test approval API directly
    console.log('\n2. Testing Approval API:');
    
    // Get a post to test with
    const postsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    if (postsResponse.ok) {
      const posts = await postsResponse.json();
      const testPost = posts.find(p => p.status === 'draft') || posts[0];
      
      if (testPost) {
        console.log(`📋 Testing with post: "${testPost.title}" (ID: ${testPost.id})`);
        console.log(`   Current Status: ${testPost.status}`);
        
        // Test approval
        console.log('\n🔄 Testing approval...');
        const approveResponse = await fetch(`http://localhost:4000/api/posts/${testPost.id}/approve`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'approve'
          })
        });
        
        if (approveResponse.ok) {
          const result = await approveResponse.json();
          console.log('✅ Approval API call successful');
          console.log('📋 Response:', result);
        } else {
          console.error('❌ Approval API call failed');
          console.error('Status:', approveResponse.status);
          const errorText = await approveResponse.text();
          console.error('Error:', errorText);
        }
      }
    }

    // Step 3: Check admin dashboard API
    console.log('\n3. Checking Admin Dashboard API:');
    const dashboardResponse = await fetch('http://localhost:4000/api/admin/dashboard');
    
    if (dashboardResponse.ok) {
      const dashboardData = await dashboardResponse.json();
      console.log('✅ Admin dashboard API is working');
      console.log(`📊 Posts in dashboard: ${dashboardData.posts?.length || 0}`);
      console.log(`📊 Pending approvals: ${dashboardData.metrics?.pendingApprovals || 0}`);
      
      if (dashboardData.posts && dashboardData.posts.length > 0) {
        console.log('\n📋 Posts in Admin Dashboard:');
        dashboardData.posts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   Status: ${post.status}`);
          console.log(`   Author: ${post.writer}`);
          console.log(`   ID: ${post.id}`);
          console.log('');
        });
      }
    } else {
      console.error('❌ Admin dashboard API error:', dashboardResponse.status);
    }

    // Step 4: Test admin interface
    console.log('\n4. Testing Admin Interface:');
    const adminPageResponse = await fetch('http://localhost:4000/admin');
    
    if (adminPageResponse.ok) {
      console.log('✅ Admin interface is accessible');
    } else {
      console.log('⚠️  Admin interface returned status:', adminPageResponse.status);
    }

    console.log('\n🎉 Approval Functionality Test Complete!');
    console.log('\n💡 If approval is not working:');
    console.log('1. Check if posts have correct status values');
    console.log('2. Verify approval API endpoint is working');
    console.log('3. Check admin dashboard data structure');
    console.log('4. Ensure frontend is calling correct API');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testApprovalFunctionality(); 