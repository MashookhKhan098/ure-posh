require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function testLoginDirect() {
  console.log('🧪 Testing Login Directly...\n');

  try {
    // Create Supabase client
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('1. Testing admin user lookup...');
    
    // Query admin user (using lowercase column name)
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*')
      .eq('adminusername', 'admin')
      .limit(1);

    if (error) {
      console.log('❌ Supabase query error:', error.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ Admin user not found');
      return;
    }

    console.log('✅ Admin user found');
    const admin = admins[0];
    console.log('Admin ID:', admin.id);
    console.log('Admin Username:', admin.adminusername);

    console.log('\n2. Testing password verification...');
    
    // Test password (using lowercase column name)
    const isPasswordValid = await bcrypt.compare('ureposh2024', admin.adminpassword);
    
    if (!isPasswordValid) {
      console.log('❌ Password verification failed');
      return;
    }

    console.log('✅ Password verification successful');

    console.log('\n3. Testing JWT generation...');
    
    // Test JWT generation
    const token = jwt.sign(
      {
        adminId: admin.id,
        adminUserName: admin.adminusername,
        role: 'admin'
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '2h' }
    );

    if (token) {
      console.log('✅ JWT token generated successfully');
      console.log('Token length:', token.length);
    } else {
      console.log('❌ JWT token generation failed');
    }

    console.log('\n🎉 All login components working!');
    console.log('\nThe issue might be:');
    console.log('1. Environment variables not loaded in Next.js');
    console.log('2. JWT_SECRET not set properly');
    console.log('3. Network/connection issues');

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testLoginDirect(); 