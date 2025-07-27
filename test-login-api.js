const http = require('http');

function testLoginAPI() {
  console.log('🔐 Testing Login API...\n');

  const postData = JSON.stringify({
    username: 'admin',
    password: 'ureposh2024'
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/admin/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Headers:', res.headers);

    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log('Response Body:', response);
        
        if (res.statusCode === 200 && response.success) {
          console.log('✅ Login API is working correctly!');
          console.log('- Token generated:', response.token ? 'Yes' : 'No');
          console.log('- User data:', response.user?.username);
        } else {
          console.log('❌ Login API failed:', response.error);
        }
      } catch (error) {
        console.log('❌ Failed to parse response:', error.message);
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (error) => {
    console.log('❌ Request failed:', error.message);
  });

  req.write(postData);
  req.end();
}

testLoginAPI(); 