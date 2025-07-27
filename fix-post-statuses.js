require('dotenv').config({ path: '.env' });

async function fixPostStatuses() {
  try {
    console.log('🔍 Fixing Post Statuses...');
    
    // First, get all posts
    const allPostsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (allPostsResponse.ok) {
      const allPosts = await allPostsResponse.json();
      console.log(`✅ Found ${allPosts.length} posts to check`);
      
      // Find posts with uppercase status
      const postsToFix = allPosts.filter(post => 
        post.status === 'PUBLISHED' || 
        post.status === 'DRAFT' || 
        post.status === 'REJECTED'
      );
      
      console.log(`📋 Found ${postsToFix.length} posts with uppercase status:`);
      postsToFix.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Current Status: ${post.status}`);
        console.log(`   Author: ${post.author}`);
        console.log('');
      });
      
      // Fix each post status
      for (const post of postsToFix) {
        const newStatus = post.status.toLowerCase();
        console.log(`🔄 Fixing "${post.title}" status from "${post.status}" to "${newStatus}"`);
        
        const fixResponse = await fetch(`http://localhost:4000/api/posts/${post.id}/approve`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: newStatus === 'published' ? 'approve' : 'reject',
            status: newStatus
          })
        });
        
        if (fixResponse.ok) {
          console.log(`✅ Fixed status for "${post.title}"`);
        } else {
          console.error(`❌ Failed to fix status for "${post.title}"`);
        }
      }
      
      // Verify the fix
      console.log('\n🔍 Verifying fix...');
      const verifyResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const publishedPosts = verifyData.filter(p => p.status === 'published');
        const draftPosts = verifyData.filter(p => p.status === 'draft');
        const rejectedPosts = verifyData.filter(p => p.status === 'rejected');
        const otherPosts = verifyData.filter(p => !['published', 'draft', 'rejected'].includes(p.status));
        
        console.log(`\n📊 Updated Status Breakdown:`);
        console.log(`   Published (lowercase): ${publishedPosts.length}`);
        console.log(`   Draft (lowercase): ${draftPosts.length}`);
        console.log(`   Rejected (lowercase): ${rejectedPosts.length}`);
        console.log(`   Other: ${otherPosts.length}`);
        
        if (otherPosts.length > 0) {
          console.log('\n⚠️  Posts with unexpected status:');
          otherPosts.forEach(post => {
            console.log(`   - ${post.title}: ${post.status}`);
          });
        }
      }
      
      console.log('\n🎉 Status Fix Complete!');
      console.log('💡 All posts should now have consistent lowercase status values');
      
    } else {
      console.error('❌ Failed to fetch posts:', allPostsResponse.status);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixPostStatuses(); 