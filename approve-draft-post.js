require('dotenv').config({ path: '.env' });

async function approveDraftPost() {
  try {
    console.log('🔍 Approving draft post...');
    
    // First, get the draft post ID
    const postsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      const draftPosts = postsData.filter(p => p.status === 'draft');
      
      if (draftPosts.length === 0) {
        console.log('❌ No draft posts found to approve');
        return;
      }
      
      const draftPost = draftPosts[0]; // Get the first draft post
      console.log(`📋 Found draft post: "${draftPost.title}" (ID: ${draftPost.id})`);
      
      // Approve the post
      const approveResponse = await fetch(`http://localhost:4000/api/posts/${draftPost.id}/approve`, {
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
        console.log('✅ Post approved successfully!');
        console.log('📋 Result:', result);
        
        // Verify the post is now published
        const verifyResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
        if (verifyResponse.ok) {
          const verifyData = await verifyResponse.json();
          const publishedPosts = verifyData.filter(p => p.status === 'published');
          const draftPosts = verifyData.filter(p => p.status === 'draft');
          
          console.log(`\n📊 Updated Status:`);
          console.log(`📋 Published Posts: ${publishedPosts.length}`);
          console.log(`📋 Draft Posts: ${draftPosts.length}`);
          
          if (publishedPosts.length > 0) {
            console.log('\n📋 Published Posts:');
            publishedPosts.forEach((post, index) => {
              console.log(`${index + 1}. ${post.title} by ${post.author}`);
              console.log(`   Status: ${post.status}`);
              console.log(`   Created: ${post.created_at}`);
              console.log('');
            });
          }
        }
        
        console.log('\n🎉 The post is now published and should be visible on the public posts page!');
        console.log('💡 Visit http://localhost:4000/posts to see the published post');
        
      } else {
        console.error('❌ Failed to approve post:', approveResponse.status);
        const errorText = await approveResponse.text();
        console.error('Error details:', errorText);
      }
      
    } else {
      console.error('❌ Failed to fetch posts:', postsResponse.status);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

approveDraftPost(); 