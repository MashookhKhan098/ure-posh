require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testAdminUsersDisplay() {
  console.log('👥 Testing Admin Users Display...\n');

  try {
    // Test 1: Direct Supabase query
    console.log('1. Testing direct Supabase query...');
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    const { data: admins, error } = await supabase
      .from('admin')
      .select('id, username, email, full_name, role, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('❌ Supabase error:', error.message);
      return;
    }

    console.log('✅ Admin users found:', admins ? admins.length : 0);
    
    if (admins && admins.length > 0) {
      console.log('\n📋 Admin Users from Database:');
      admins.forEach((admin, index) => {
        console.log(`${index + 1}. Username: ${admin.username}`);
        console.log(`   Name: ${admin.full_name || 'N/A'}`);
        console.log(`   Email: ${admin.email || 'N/A'}`);
        console.log(`   Role: ${admin.role || 'admin'}`);
        console.log(`   ID: ${admin.id}`);
        console.log('');
      });
    }

    // Test 2: API endpoint
    console.log('2. Testing admin users API endpoint...');
    const response = await fetch('http://localhost:3000/api/admin/users');
    const data = await response.json();
    
    console.log('API Status:', response.status);
    console.log('API Response:', data);
    console.log('Users from API:', data.admins ? data.admins.length : 0);

    if (response.ok && data.admins && data.admins.length > 0) {
      console.log('\n✅ API is working correctly!');
      console.log('\n📝 Frontend should now display:');
      console.log('- Available admin users from database');
      console.log('- Username and role information');
      console.log('- "Use This User" buttons for auto-fill');
      console.log('- Default password hint');
      
      console.log('\n🎉 Admin users are being fetched from Supabase!');
      console.log('\n📝 To test in browser:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. Clear cache if needed');
      console.log('3. You should see admin users listed from the database');
      console.log('4. Click "Use This User" to auto-fill username');
      console.log('5. Use the default password: ureposh2024');
    } else {
      console.log('❌ API failed:', data.error);
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testAdminUsersDisplay(); 