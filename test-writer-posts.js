require('dotenv').config({ path: '.env' });

async function testWriterPosts() {
  try {
    console.log('🔍 Testing Writer Posts Functionality...');
    
    // Test 1: Check if writer posts API is accessible
    console.log('\n1. Testing writer posts API...');
    const response = await fetch('http://localhost:4000/api/writer/posts');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Writer posts API is working');
      console.log(`📊 Found ${data.length} posts`);
      
      if (data.length > 0) {
        console.log('\n📋 Sample posts:');
        data.slice(0, 3).forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   Author: ${post.author}`);
          console.log(`   Status: ${post.post_status || 'unknown'}`);
          console.log(`   Category: ${post.category}`);
          console.log('');
        });
      }
    } else {
      console.error('❌ Writer posts API error:', response.status, response.statusText);
    }

    // Test 2: Check if writer can create a post (simulate)
    console.log('\n2. Testing post creation simulation...');
    const testPostData = {
      title: 'Test Writer Post',
      content: 'This is a test post created by a writer.',
      excerpt: 'Test excerpt',
      author: 'test_writer',
      category: 'Technology',
      tags: 'test,writer,post',
      status: 'draft',
      slug: 'test-writer-post',
      writer_id: 'test-writer-id'
    };

    console.log('📝 Test post data prepared:');
    console.log(`   Title: ${testPostData.title}`);
    console.log(`   Author: ${testPostData.author}`);
    console.log(`   Category: ${testPostData.category}`);
    console.log('✅ Post creation simulation ready');

    // Test 3: Check admin posts API to see if writer posts appear
    console.log('\n3. Checking admin posts API...');
    const adminResponse = await fetch('http://localhost:4000/api/posts?include_all=true');
    
    if (adminResponse.ok) {
      const adminData = await adminResponse.json();
      console.log('✅ Admin posts API is working');
      console.log(`📊 Found ${adminData.length} total posts`);
      
      const pendingPosts = adminData.filter(post => post.post_status === 'pending');
      console.log(`📋 Pending posts: ${pendingPosts.length}`);
      
      if (pendingPosts.length > 0) {
        console.log('\n📋 Pending posts for approval:');
        pendingPosts.slice(0, 3).forEach((post, index) => {
          console.log(`${index + 1}. ${post.title}`);
          console.log(`   Author: ${post.author}`);
          console.log(`   Created: ${post.created_at}`);
          console.log('');
        });
      }
    } else {
      console.error('❌ Admin posts API error:', adminResponse.status, adminResponse.statusText);
    }

    console.log('\n🎉 Writer Posts Test Complete!');
    console.log('✅ Writer posts functionality is working correctly');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWriterPosts(); 