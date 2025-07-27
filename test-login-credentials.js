require('dotenv').config();

async function testLoginCredentials() {
  console.log('🧪 Testing Login Credentials...\n');

  try {
    // Test with correct credentials
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

    if (response.ok) {
      console.log('✅ Login successful!');
      console.log('Status:', response.status);
      console.log('Token present:', !!data.token);
      console.log('User data present:', !!data.user);
      console.log('Message:', data.message);
    } else {
      console.log('❌ Login failed');
      console.log('Status:', response.status);
      console.log('Error:', data.error);
      
      // Test with wrong password
      console.log('\n🔍 Testing with wrong password...');
      const wrongResponse = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          username: 'admin', 
          password: 'wrongpassword' 
        }),
      });
      
      const wrongData = await wrongResponse.json();
      console.log('Wrong password status:', wrongResponse.status);
      console.log('Wrong password error:', wrongData.error);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testLoginCredentials(); 