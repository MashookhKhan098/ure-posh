require('dotenv').config({ path: '.env' });

async function testAdminInterface() {
  try {
    console.log('🔍 Testing Admin Interface...');
    
    // Test the API endpoint
    const apiResponse = await fetch('http://localhost:4000/api/admin/writers');
    
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      console.log('✅ API is working correctly');
      console.log(`📊 Found ${data.writerProfiles?.length || 0} writer profiles`);
      console.log(`📊 Found ${data.users?.length || 0} users`);
      
      if (data.writerProfiles && data.writerProfiles.length > 0) {
        console.log('\n📋 Writers available in admin:');
        data.writerProfiles.forEach((writer, index) => {
          console.log(`${index + 1}. ${writer.full_name || writer.username} (@${writer.username})`);
          console.log(`   Email: ${writer.email}`);
          console.log(`   Specialization: ${writer.specialization}`);
          console.log(`   Experience: ${writer.experience_level}`);
          console.log(`   Status: ${writer.is_active ? 'Active' : 'Inactive'}, ${writer.is_verified ? 'Verified' : 'Unverified'}`);
          console.log('');
        });
      }
      
      // Test the admin page
      const adminPageResponse = await fetch('http://localhost:4000/admin');
      if (adminPageResponse.ok) {
        console.log('✅ Admin page is accessible');
      } else {
        console.log('❌ Admin page returned status:', adminPageResponse.status);
      }
      
    } else {
      console.error('❌ API Error:', apiResponse.status, apiResponse.statusText);
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAdminInterface(); 