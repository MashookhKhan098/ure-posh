require('dotenv').config({ path: '.env' });

async function testWriterForm() {
  try {
    console.log('🔍 Testing Writer Form Functionality...');
    
    // Test 1: Check if writer interface is accessible
    console.log('\n1. Testing writer interface...');
    const writerResponse = await fetch('http://localhost:4000/writer');
    
    if (writerResponse.ok) {
      console.log('✅ Writer interface is accessible');
    } else {
      console.log('❌ Writer interface error:', writerResponse.status);
    }

    // Test 2: Check if writer posts API is working
    console.log('\n2. Testing writer posts API...');
    const postsResponse = await fetch('http://localhost:4000/api/writer/posts');
    
    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      console.log('✅ Writer posts API is working');
      console.log(`📊 Found ${postsData.length} posts`);
    } else {
      console.log('❌ Writer posts API error:', postsResponse.status);
    }

    console.log('\n🎉 Writer Form Test Complete!');
    console.log('\n💡 Instructions for testing the form:');
    console.log('1. Go to http://localhost:4000/writer');
    console.log('2. Login with a writer account');
    console.log('3. Click "Write Article" or "Create New Post"');
    console.log('4. Try typing in the title and content fields');
    console.log('5. Fill in other fields like author, category, etc.');
    console.log('6. Submit the form to create a post');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testWriterForm(); 