const BACKEND_URL = 'http://localhost:3000';

async function testBackendConnection() {
  console.log('Testing backend connection...');
  
  try {
    // Test health endpoint
    const healthResponse = await fetch(`${BACKEND_URL}/health`);
    if (healthResponse.ok) {
      console.log('✅ Backend is running');
    } else {
      console.log('❌ Backend health check failed');
      return;
    }

    // Test admin login
    const loginResponse = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminUserName: 'admin',
        adminPassword: 'ureposh2024'
      }),
    });

    const loginData = await loginResponse.json();
    
    if (loginResponse.ok) {
      console.log('✅ Admin login successful');
      console.log('Token:', loginData.token);
    } else {
      console.log('❌ Admin login failed:', loginData.error);
    }

    // Test posts endpoint
    const postsResponse = await fetch(`${BACKEND_URL}/api/posts`);
    if (postsResponse.ok) {
      const postsData = await postsResponse.json();
      console.log('✅ Posts endpoint working');
      console.log('Posts count:', postsData.posts?.length || 0);
    } else {
      console.log('❌ Posts endpoint failed');
    }

  } catch (error) {
    console.error('❌ Connection error:', error.message);
  }
}

testBackendConnection(); 