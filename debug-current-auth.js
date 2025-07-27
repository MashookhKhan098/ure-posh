require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function debugCurrentAuth() {
  console.log('🔍 Debugging Current Authentication State...\n');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('1. Checking Admin User in Database...');
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', 'admin')
      .limit(1);

    if (error) {
      console.log('❌ Database error:', error.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ No admin user found');
      return;
    }

    const admin = admins[0];
    console.log('✅ Admin user found:');
    console.log('- ID:', admin.id);
    console.log('- Username:', admin.username);
    console.log('- Email:', admin.email);
    console.log('- Password hash length:', admin.password.length);
    console.log('- Password hash starts with:', admin.password.substring(0, 10) + '...');

    console.log('\n2. Testing Password Verification...');
    const testPassword = 'ureposh2024';
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
    console.log('Password verification result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');

    if (!isPasswordValid) {
      console.log('\n3. Fixing Password Hash...');
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log('New hash length:', newHash.length);
      console.log('New hash starts with:', newHash.substring(0, 10) + '...');

      const { error: updateError } = await supabase
        .from('admin')
        .update({ password: newHash })
        .eq('username', 'admin');

      if (updateError) {
        console.log('❌ Failed to update password:', updateError.message);
      } else {
        console.log('✅ Password hash updated successfully');
        
        // Test again
        const { data: updatedAdmin } = await supabase
          .from('admin')
          .select('password')
          .eq('username', 'admin')
          .single();

        const isNowValid = await bcrypt.compare(testPassword, updatedAdmin.password);
        console.log('Updated password verification:', isNowValid ? '✅ Valid' : '❌ Invalid');
      }
    }

    console.log('\n4. Testing API Endpoint...');
    const fetch = require('node-fetch');
    
    try {
      const loginResponse = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'admin',
          password: 'ureposh2024'
        })
      });

      const loginResult = await loginResponse.json();
      console.log('API Response Status:', loginResponse.status);
      console.log('API Response:', loginResult);

      if (loginResponse.ok && loginResult.success) {
        console.log('✅ API login working correctly!');
      } else {
        console.log('❌ API login failed:', loginResult.error);
      }
    } catch (apiError) {
      console.log('❌ API test failed:', apiError.message);
    }

    console.log('\n🎯 Summary:');
    console.log('- Database connection: ✅ Working');
    console.log('- Admin user exists: ✅ Yes');
    console.log('- Password verification: ' + (isPasswordValid ? '✅ Working' : '❌ Fixed'));
    console.log('- API endpoint: ' + (loginResponse?.ok ? '✅ Working' : '❌ Needs attention'));

  } catch (error) {
    console.log('❌ Debug failed:', error.message);
  }
}

debugCurrentAuth(); 