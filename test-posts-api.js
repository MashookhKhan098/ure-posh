const { createAdminClient } = require('./utils/supabase/admin');

async function testPostsAPI() {
  try {
    console.log('Testing posts API...');
    
    const supabase = createAdminClient();
    
    // Test direct database access
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Database error:', error);
      return;
    }
    
    console.log('✅ Posts fetched successfully!');
    console.log('Total posts:', posts?.length || 0);
    
    if (posts && posts.length > 0) {
      console.log('Sample post:', {
        id: posts[0].id,
        title: posts[0].title,
        author: posts[0].author,
        status: posts[0].status,
        created_at: posts[0].created_at
      });
    }
    
    // Test the actual API endpoint
    console.log('\nTesting API endpoint...');
    const response = await fetch('http://localhost:3000/api/posts');
    const apiData = await response.json();
    
    console.log('API Response status:', response.status);
    console.log('API Response data:', Array.isArray(apiData) ? apiData.length : 'Not an array');
    
    if (Array.isArray(apiData) && apiData.length > 0) {
      console.log('Sample API post:', {
        id: apiData[0].id,
        title: apiData[0].title,
        author: apiData[0].author,
        status: apiData[0].status
      });
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testPostsAPI(); 