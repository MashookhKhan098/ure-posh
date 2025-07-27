require('dotenv').config();

async function testAdminLogin() {
  console.log('🧪 Testing Admin Page Login...\n');

  try {
    // Test the login API endpoint
    console.log('1. Testing login API...');
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        username: 'admin', 
        password: 'ureposh2024' 
      }),
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', {
      success: data.success,
      message: data.message,
      hasToken: !!data.token,
      hasUser: !!data.user
    });

    if (response.ok && data.success) {
      console.log('✅ Login API working correctly');
      
      // Test posts API for stats
      console.log('\n2. Testing posts API for stats...');
      const postsResponse = await fetch('http://localhost:3000/api/posts');
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        console.log('Posts found:', postsData.posts ? postsData.posts.length : 0);
        console.log('✅ Posts API working correctly');
      } else {
        console.log('❌ Posts API failed');
      }
      
      console.log('\n🎉 Admin login should work now!');
      console.log('\n📝 Instructions:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. Login with:');
      console.log('   - Username: admin');
      console.log('   - Password: ureposh2024');
      console.log('3. Check browser console for debug logs');
      
    } else {
      console.log('❌ Login API failed');
      console.log('Error:', data.error);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testAdminLogin(); 