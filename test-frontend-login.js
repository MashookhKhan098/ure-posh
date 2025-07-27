require('dotenv').config();

async function testFrontendLogin() {
  console.log('🧪 Testing Frontend Login Simulation...\n');

  try {
    // Simulate exactly what the frontend sends
    console.log('1. Simulating frontend login request...');
    const loginData = {
      username: 'admin',
      password: 'ureposh2024'
    };

    console.log('Request data:', loginData);

    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    const data = await response.json();
    console.log('Response data:', data);

    if (response.ok && data.success) {
      console.log('\n✅ Login successful!');
      console.log('Token present:', !!data.token);
      console.log('User data present:', !!data.user);
      
      console.log('\n📝 Frontend should now:');
      console.log('1. Store token in localStorage');
      console.log('2. Store user data in localStorage');
      console.log('3. Redirect to dashboard');
      console.log('4. Set isAuthenticated to true');
      
      console.log('\n🎉 The login logic is working correctly!');
      console.log('\n📝 To test in browser:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. Clear cache if needed (use "Clear Cache & Reload" button)');
      console.log('3. Enter: admin / ureposh2024');
      console.log('4. You should be logged in successfully');
      
    } else {
      console.log('\n❌ Login failed:', data.error);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
    console.log('\n💡 This might mean the server is not running on port 3000');
    console.log('Try: npm run dev:3000');
  }
}

testFrontendLogin(); 