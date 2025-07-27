// Simple test to verify login is working
const testLogin = async () => {
  try {
    console.log('🧪 Testing admin login...');
    
    const response = await fetch('http://localhost:4000/api/admin/login', {
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
    
    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Token:', data.token ? 'Present' : 'Missing');
      console.log('User:', data.user ? 'Present' : 'Missing');
    } else {
      console.log('❌ Login failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error testing login:', error.message);
  }
};

// Test posts API
const testPosts = async () => {
  try {
    console.log('\n🧪 Testing posts API...');
    
    const response = await fetch('http://localhost:4000/api/posts');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Posts API working!');
      console.log('Posts count:', data.posts?.length || 0);
    } else {
      console.log('❌ Posts API failed:', data.error);
    }
  } catch (error) {
    console.log('❌ Error testing posts:', error.message);
  }
};

// Run tests
testLogin().then(() => {
  testPosts();
}); 