require('dotenv').config({ path: '.env' });

async function createDraftPost() {
  try {
    console.log('🔍 Creating Draft Post for Approval Testing...');
    
    // Create FormData for the post
    const formData = new FormData();
    formData.append('title', 'Test Draft Post for Approval');
    formData.append('content', 'This is a test post created specifically for testing the approval functionality. It contains sample content that needs to be reviewed by an admin before being published.');
    formData.append('excerpt', 'A test post for approval workflow testing');
    formData.append('author', 'Test Writer');
    formData.append('category', 'Technology');
    formData.append('tags', 'test,approval,draft');
    formData.append('slug', 'test-draft-post-approval');
    formData.append('status', 'draft');
    formData.append('readTime', '2');
    formData.append('language', 'en');
    formData.append('isFromWriter', 'true'); // This will set status to draft

    console.log('📋 Creating post with data:', {
      title: 'Test Draft Post for Approval',
      author: 'Test Writer',
      status: 'draft',
      category: 'Technology'
    });

    // Create the post using the posts API
    const createResponse = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      body: formData
    });

    if (createResponse.ok) {
      const result = await createResponse.json();
      console.log('✅ Draft post created successfully!');
      console.log('📋 Post details:', {
        id: result.id,
        title: result.title,
        status: result.status,
        author: result.author
      });

      // Verify the post was created as draft
      console.log('\n🔍 Verifying post status...');
      const verifyResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
      
      if (verifyResponse.ok) {
        const posts = await verifyResponse.json();
        const draftPosts = posts.filter(p => p.status === 'draft');
        const publishedPosts = posts.filter(p => p.status === 'published');
        
        console.log(`📊 Updated Status Breakdown:`);
        console.log(`   Published: ${publishedPosts.length}`);
        console.log(`   Draft: ${draftPosts.length}`);
        
        if (draftPosts.length > 0) {
          console.log('\n📋 Draft Posts Available for Approval:');
          draftPosts.forEach((post, index) => {
            console.log(`${index + 1}. ${post.title} by ${post.author}`);
            console.log(`   ID: ${post.id}`);
            console.log(`   Status: ${post.status}`);
            console.log('');
          });
        }
      }

      console.log('\n🎉 Draft Post Creation Complete!');
      console.log('💡 You can now test the approval functionality in the admin dashboard');
      console.log('📋 Go to /admin → Post Approval tab to see the draft post');

    } else {
      console.error('❌ Failed to create draft post');
      console.error('Status:', createResponse.status);
      const errorText = await createResponse.text();
      console.error('Error:', errorText);
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

createDraftPost(); 