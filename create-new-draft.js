require('dotenv').config({ path: '.env' });

async function createNewDraft() {
  try {
    console.log('🔍 Creating New Draft Post for Testing...');
    
    // Create FormData for the post
    const formData = new FormData();
    formData.append('title', 'New Draft Post - Needs Approval');
    formData.append('content', 'This is a new draft post that needs to be approved by an admin. It contains sample content for testing the approval workflow. The admin should review this content and decide whether to approve or reject it.');
    formData.append('excerpt', 'A new draft post for testing the approval workflow');
    formData.append('author', 'New Writer');
    formData.append('category', 'Technology');
    formData.append('tags', 'draft,test,approval');
    formData.append('slug', 'new-draft-post-approval');
    formData.append('status', 'draft');
    formData.append('readTime', '3');
    formData.append('language', 'en');
    formData.append('isFromWriter', 'true'); // This will set status to draft

    console.log('📋 Creating new draft post...');

    // Create the post using the posts API
    const createResponse = await fetch('http://localhost:4000/api/posts', {
      method: 'POST',
      body: formData
    });

    if (createResponse.ok) {
      const result = await createResponse.json();
      console.log('✅ New draft post created successfully!');
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

      console.log('\n🎉 New Draft Post Creation Complete!');
      console.log('💡 You can now test the approval functionality');
      console.log('📋 Go to /admin → Post Approval tab to see the draft post');
      console.log('📋 The post should appear in the "Pending Review" section');

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

createNewDraft(); 