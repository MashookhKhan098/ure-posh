require('dotenv').config();

async function testLoginFlow() {
  console.log('🧪 Testing Complete Login Flow...\n');

  try {
    // Step 1: Test admin users API
    console.log('1. Testing admin users API...');
    const usersResponse = await fetch('http://localhost:3000/api/admin/users', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const usersData = await usersResponse.json();
    console.log('Users API status:', usersResponse.status);
    console.log('Available users:', usersData.admins ? usersData.admins.length : 0);

    if (usersResponse.ok && usersData.admins && usersData.admins.length > 0) {
      console.log('✅ Admin users available');
      
      // Step 2: Test login with credentials
      console.log('\n2. Testing login with credentials...');
      const loginResponse = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username: 'admin', 
          password: 'ureposh2024' 
        }),
      });

      const loginData = await loginResponse.json();
      console.log('Login status:', loginResponse.status);
      console.log('Login success:', loginData.success);
      console.log('Has token:', !!loginData.token);

      if (loginResponse.ok && loginData.success) {
        console.log('✅ Login successful');
        
        // Step 3: Test posts API (for dashboard stats)
        console.log('\n3. Testing posts API for dashboard...');
        const postsResponse = await fetch('http://localhost:3000/api/posts');
        const postsData = await postsResponse.json();
        console.log('Posts API status:', postsResponse.status);
        console.log('Posts count:', postsData.posts ? postsData.posts.length : 0);

        if (postsResponse.ok) {
          console.log('✅ Posts API working');
        }
        
        console.log('\n🎉 Complete login flow is working!');
        console.log('\n📝 Instructions to test login form:');
        console.log('1. Go to http://localhost:3000/admin');
        console.log('2. You should see the login form (no cached token)');
        console.log('3. Login with: admin / ureposh2024');
        console.log('4. You should be redirected to the dashboard');
        console.log('5. Use the "Sign Out" button to test logout');
        
      } else {
        console.log('❌ Login failed:', loginData.error);
      }
    } else {
      console.log('❌ No admin users found');
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testLoginFlow(); 