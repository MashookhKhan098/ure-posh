require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function testSecureAuthentication() {
  console.log('🔐 Testing Secure Authentication Flow...\n');

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('1. Simulating frontend login request...');
    const loginData = {
      username: 'admin',
      password: 'ureposh2024'
    };
    console.log('Frontend sends:', { username: loginData.username, password: '***' });

    console.log('\n2. Server fetches user from database...');
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', loginData.username)
      .limit(1);

    if (error) {
      console.log('❌ Database error:', error.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ User not found');
      return;
    }

    const admin = admins[0];
    console.log('✅ User found in database:');
    console.log('- Username:', admin.username);
    console.log('- Email:', admin.email);
    console.log('- Hashed password length:', admin.password.length);
    console.log('- Hashed password:', admin.password.substring(0, 20) + '...');

    console.log('\n3. Server compares password with bcrypt...');
    const isPasswordValid = await bcrypt.compare(loginData.password, admin.password);
    console.log('Password comparison result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');

    if (isPasswordValid) {
      console.log('\n4. Server generates JWT token...');
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        {
          adminId: admin.id,
          adminUserName: admin.username,
          role: 'admin'
        },
        process.env.JWT_SECRET || 'fallback-secret',
        { expiresIn: '2h' }
      );
      console.log('✅ JWT token generated');

      console.log('\n5. Server returns success response...');
      const { password: _, ...safeAdminData } = admin;
      const response = {
        success: true,
        message: 'Login successful',
        token: token.substring(0, 50) + '...',
        user: safeAdminData
      };
      console.log('Response:', response);

      console.log('\n🎉 AUTHENTICATION SUCCESSFUL!');
      console.log('\n📋 This is exactly what happens:');
      console.log('1. ✅ Frontend sends username + password');
      console.log('2. ✅ Server fetches user from database (with hashed password)');
      console.log('3. ✅ Server compares password using bcrypt');
      console.log('4. ✅ Server generates JWT token');
      console.log('5. ✅ Server returns success (never exposes password)');
      
      console.log('\n🔒 SECURITY FEATURES:');
      console.log('- ✅ Password is hashed in database');
      console.log('- ✅ Password is never sent back to frontend');
      console.log('- ✅ bcrypt.compare() is used for secure comparison');
      console.log('- ✅ JWT token for session management');
      
    } else {
      console.log('\n❌ AUTHENTICATION FAILED');
      console.log('Password comparison failed - invalid credentials');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testSecureAuthentication(); 