require('dotenv').config({ path: '.env' });

async function fixApprovalWorkflow() {
  try {
    console.log('🔍 Fixing Approval Workflow...');
    
    // Get all posts
    const allPostsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (allPostsResponse.ok) {
      const allPosts = await allPostsResponse.json();
      console.log(`✅ Found ${allPosts.length} posts`);
      
      console.log('\n📋 Current Posts:');
      allPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Author: ${post.author}`);
        console.log(`   Created: ${post.created_at}`);
        console.log('');
      });
      
      // Posts that should be draft (not properly approved through admin workflow)
      const postsToMakeDraft = allPosts.filter(post => 
        post.title.includes('try') || 
        post.title.includes('Introducing Ureposh')
      );
      
      console.log(`📋 Posts to make draft (not properly approved):`);
      postsToMakeDraft.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Current Status: ${post.status}`);
        console.log(`   Author: ${post.author}`);
        console.log('');
      });
      
      // Make these posts draft
      for (const post of postsToMakeDraft) {
        console.log(`🔄 Making "${post.title}" draft (not approved through admin workflow)`);
        
        const draftResponse = await fetch(`http://localhost:4000/api/posts/${post.id}/approve`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'reject',
            reason: 'Not approved through admin workflow'
          })
        });
        
        if (draftResponse.ok) {
          console.log(`✅ Made "${post.title}" draft`);
        } else {
          console.error(`❌ Failed to make "${post.title}" draft`);
        }
      }
      
      // Verify the fix
      console.log('\n🔍 Verifying approval workflow...');
      const verifyResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json();
        const publishedPosts = verifyData.filter(p => p.status === 'published');
        const draftPosts = verifyData.filter(p => p.status === 'draft');
        const rejectedPosts = verifyData.filter(p => p.status === 'rejected');
        
        console.log(`\n📊 Updated Status Breakdown:`);
        console.log(`   Published (properly approved): ${publishedPosts.length}`);
        console.log(`   Draft (needs approval): ${draftPosts.length}`);
        console.log(`   Rejected: ${rejectedPosts.length}`);
        
        if (publishedPosts.length > 0) {
          console.log('\n📋 Properly Approved Posts:');
          publishedPosts.forEach(post => {
            console.log(`   ✅ ${post.title} by ${post.author}`);
          });
        }
        
        if (draftPosts.length > 0) {
          console.log('\n📋 Posts Needing Approval:');
          draftPosts.forEach(post => {
            console.log(`   ⏳ ${post.title} by ${post.author}`);
          });
        }
      }
      
      // Check public posts (should only show properly approved)
      console.log('\n🔍 Checking public posts...');
      const publicResponse = await fetch('http://localhost:4000/api/posts');
      if (publicResponse.ok) {
        const publicPosts = await publicResponse.json();
        console.log(`📊 Public posts visible: ${publicPosts.length}`);
        
        if (publicPosts.length > 0) {
          console.log('\n📋 Posts visible to public:');
          publicPosts.forEach(post => {
            console.log(`   ✅ ${post.title} by ${post.author}`);
          });
        }
      }
      
      console.log('\n🎉 Approval Workflow Fix Complete!');
      console.log('💡 Only properly approved posts should now be visible on public site');
      
    } else {
      console.error('❌ Failed to fetch posts:', allPostsResponse.status);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixApprovalWorkflow(); 