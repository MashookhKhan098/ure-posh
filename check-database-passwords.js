require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function checkDatabasePasswords() {
  console.log('🔍 Checking Database Passwords...\n');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('1. Fetching all admin users from database...');
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*');

    if (error) {
      console.log('❌ Database error:', error.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ No admin users found in database');
      return;
    }

    console.log(`✅ Found ${admins.length} admin user(s):\n`);

    admins.forEach((admin, index) => {
      console.log(`--- Admin User ${index + 1} ---`);
      console.log(`ID: ${admin.id}`);
      console.log(`Username: ${admin.username}`);
      console.log(`Email: ${admin.email}`);
      console.log(`Full Name: ${admin.full_name}`);
      console.log(`Role: ${admin.role}`);
      console.log(`Password Length: ${admin.password.length}`);
      console.log(`Password Type: ${admin.password.startsWith('$2b$') || admin.password.startsWith('$2a$') ? 'Hashed' : 'Plain Text'}`);
      console.log(`Password Preview: ${admin.password.substring(0, 20)}...`);
      console.log(`Created: ${admin.created_at}`);
      console.log(`Updated: ${admin.updated_at}`);
      console.log('');
    });

    console.log('2. Testing password verification...');
    const testPassword = 'ureposh2024';
    
    for (const admin of admins) {
      console.log(`\nTesting password for user: ${admin.username}`);
      
      let isValid = false;
      if (admin.password.startsWith('$2b$') || admin.password.startsWith('$2a$')) {
        // Test with bcrypt
        const bcrypt = require('bcryptjs');
        isValid = await bcrypt.compare(testPassword, admin.password);
        console.log(`- Password is hashed`);
        console.log(`- bcrypt.compare result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      } else {
        // Test with direct comparison
        isValid = testPassword === admin.password;
        console.log(`- Password is plain text`);
        console.log(`- Direct comparison result: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
      }
    }

    console.log('\n3. Recommendations:');
    console.log('- If passwords are plain text, consider hashing them for security');
    console.log('- If passwords are hashed but verification fails, the hash might be incorrect');
    console.log('- You can update passwords directly in the Supabase dashboard');

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkDatabasePasswords(); 