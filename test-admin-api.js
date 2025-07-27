require('dotenv').config({ path: '.env' });

async function testAdminAPI() {
  try {
    console.log('🔍 Testing Admin API...');
    
    const response = await fetch('http://localhost:4000/api/admin/writers');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', JSON.stringify(data, null, 2));
      
      console.log(`\n📊 Summary:`);
      console.log(`Users count: ${data.users?.length || 0}`);
      console.log(`Writer Profiles count: ${data.writerProfiles?.length || 0}`);
      
      if (data.writerProfiles && data.writerProfiles.length > 0) {
        console.log('\n📋 Sample Writer Profiles:');
        data.writerProfiles.slice(0, 3).forEach((writer, index) => {
          console.log(`${index + 1}. ${writer.full_name || writer.username} (@${writer.username})`);
          console.log(`   Email: ${writer.email}`);
          console.log(`   Active: ${writer.is_active}, Verified: ${writer.is_verified}`);
        });
      }
    } else {
      console.error('❌ API Error:', response.status, response.statusText);
    }
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testAdminAPI(); 