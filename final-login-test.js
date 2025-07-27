require('dotenv').config();

async function finalLoginTest() {
  console.log('🎯 Final Login Test...\n');

  try {
    // Test 1: Admin Users API
    console.log('1. Testing Admin Users API...');
    const usersResponse = await fetch('http://localhost:3000/api/admin/users');
    const usersData = await usersResponse.json();
    console.log('Status:', usersResponse.status);
    console.log('Users found:', usersData.admins ? usersData.admins.length : 0);
    console.log(usersResponse.ok ? '✅ Working' : '❌ Failed');

    // Test 2: Login API
    console.log('\n2. Testing Login API...');
    const loginResponse = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'ureposh2024' })
    });
    const loginData = await loginResponse.json();
    console.log('Status:', loginResponse.status);
    console.log('Success:', loginData.success);
    console.log('Has token:', !!loginData.token);
    console.log(loginResponse.ok && loginData.success ? '✅ Working' : '❌ Failed');

    // Test 3: Posts API
    console.log('\n3. Testing Posts API...');
    const postsResponse = await fetch('http://localhost:3000/api/posts');
    const postsData = await postsResponse.json();
    console.log('Status:', postsResponse.status);
    console.log('Posts found:', postsData.posts ? postsData.posts.length : 0);
    console.log(postsResponse.ok ? '✅ Working' : '❌ Failed');

    // Summary
    console.log('\n📊 Summary:');
    console.log('✅ Admin Users API:', usersResponse.ok ? 'Working' : 'Failed');
    console.log('✅ Login API:', loginResponse.ok && loginData.success ? 'Working' : 'Failed');
    console.log('✅ Posts API:', postsResponse.ok ? 'Working' : 'Failed');

    if (loginResponse.ok && loginData.success) {
      console.log('\n🎉 SUCCESS! Login is now working!');
      console.log('\n📝 Instructions:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. If you see the dashboard, click "Clear Cache & Reload"');
      console.log('3. You should see the login form with available admin users');
      console.log('4. Login with: admin / ureposh2024');
      console.log('5. You should be redirected to the dashboard');
      console.log('6. Use "Sign Out" to test logout');
    } else {
      console.log('\n❌ Login still has issues');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

finalLoginTest(); 