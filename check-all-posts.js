require('dotenv').config({ path: '.env' });

async function checkAllPosts() {
  try {
    console.log('🔍 Checking All Posts in Database...');
    
    // Check all posts (including drafts)
    console.log('\n1. All Posts (including drafts):');
    const allPostsResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (allPostsResponse.ok) {
      const allPosts = await allPostsResponse.json();
      console.log(`✅ Total Posts in Database: ${allPosts.length}`);
      
      // Group by status
      const publishedPosts = allPosts.filter(p => p.status === 'published');
      const draftPosts = allPosts.filter(p => p.status === 'draft');
      const rejectedPosts = allPosts.filter(p => p.status === 'rejected');
      const otherPosts = allPosts.filter(p => !['published', 'draft', 'rejected'].includes(p.status));
      
      console.log(`\n📊 Status Breakdown:`);
      console.log(`   Published: ${publishedPosts.length}`);
      console.log(`   Draft: ${draftPosts.length}`);
      console.log(`   Rejected: ${rejectedPosts.length}`);
      console.log(`   Other: ${otherPosts.length}`);
      
      console.log('\n📋 All Posts Details:');
      allPosts.forEach((post, index) => {
        console.log(`${index + 1}. ${post.title}`);
        console.log(`   Status: ${post.status}`);
        console.log(`   Author: ${post.author}`);
        console.log(`   Category: ${post.category}`);
        console.log(`   Created: ${post.created_at}`);
        console.log(`   Views: ${post.view_count || 0}`);
        console.log('');
      });
    } else {
      console.error('❌ Failed to fetch all posts:', allPostsResponse.status);
    }

    // Check public posts (should only show published)
    console.log('\n2. Public Posts (should only show published):');
    const publicPostsResponse = await fetch('http://localhost:4000/api/posts');
    
    if (publicPostsResponse.ok) {
      const publicPosts = await publicPostsResponse.json();
      console.log(`✅ Public Posts API returned: ${publicPosts.length} posts`);
      
      if (publicPosts.length > 0) {
        console.log('\n📋 Posts visible to public:');
        publicPosts.forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   Status: ${post.status}`);
          console.log(`   Author: ${post.author}`);
          console.log(`   Category: ${post.category}`);
          console.log('');
        });
      } else {
        console.log('📋 No posts visible to public');
      }
    } else {
      console.error('❌ Failed to fetch public posts:', publicPostsResponse.status);
    }

    console.log('\n🎉 Database Check Complete!');
    console.log('\n💡 If you see posts on the frontend that should not be there:');
    console.log('1. Check if there are posts with unexpected status values');
    console.log('2. Verify the frontend is using the correct API endpoint');
    console.log('3. Clear browser cache if needed');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

checkAllPosts(); 