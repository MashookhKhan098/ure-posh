require('dotenv').config();

async function testAdminUsers() {
  console.log('🧪 Testing Admin Users API...\n');

  try {
    // Test the admin users API endpoint
    console.log('1. Testing admin users API...');
    const response = await fetch('http://localhost:3000/api/admin/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', {
      success: data.success,
      adminCount: data.admins ? data.admins.length : 0
    });

    if (response.ok && data.success) {
      console.log('✅ Admin users API working correctly');
      
      if (data.admins && data.admins.length > 0) {
        console.log('\n📋 Available Admin Users:');
        data.admins.forEach((admin, index) => {
          console.log(`${index + 1}. Username: ${admin.username}`);
          console.log(`   Name: ${admin.full_name || 'N/A'}`);
          console.log(`   Email: ${admin.email || 'N/A'}`);
          console.log(`   Role: ${admin.role || 'N/A'}`);
          console.log('');
        });
      } else {
        console.log('⚠️  No admin users found in database');
      }
      
      console.log('\n🎉 Admin users API is working!');
      console.log('\n📝 Now you can:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. See available admin users listed');
      console.log('3. Login with any of the listed usernames');
      
    } else {
      console.log('❌ Admin users API failed');
      console.log('Error:', data.error);
    }

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

testAdminUsers(); 