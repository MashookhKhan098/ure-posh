require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function testPasswordVerification() {
  console.log('🔍 Testing Password Verification...\n');

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // Get the admin user
    console.log('1. Fetching admin user from database...');
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
    console.log('- Username:', admin.username);
    console.log('- Password hash:', admin.password);
    console.log('- Hash length:', admin.password.length);

    // Test different password variations
    const testPasswords = [
      'ureposh2024',
      'ureposh2024 ',
      ' ureposh2024',
      'ureposh2024\n',
      'ureposh2024\r',
      'UREPOSH2024',
      'Ureposh2024'
    ];

    console.log('\n2. Testing password variations...');
    for (let i = 0; i < testPasswords.length; i++) {
      const password = testPasswords[i];
      const isValid = await bcrypt.compare(password, admin.password);
      console.log(`Password "${password}" (length: ${password.length}): ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    }

    // Test creating a new hash
    console.log('\n3. Creating new password hash...');
    const correctPassword = 'ureposh2024';
    const newHash = await bcrypt.hash(correctPassword, 10);
    console.log('New hash:', newHash);
    console.log('New hash length:', newHash.length);

    // Test the new hash
    console.log('\n4. Testing new hash...');
    const isNewHashValid = await bcrypt.compare(correctPassword, newHash);
    console.log('New hash valid:', isNewHashValid ? '✅ Yes' : '❌ No');

    // Update the database with the new hash
    console.log('\n5. Updating database with new hash...');
    const { data: updatedAdmin, error: updateError } = await supabase
      .from('admin')
      .update({ password: newHash })
      .eq('username', 'admin')
      .select()
      .single();

    if (updateError) {
      console.log('❌ Update error:', updateError.message);
      return;
    }

    console.log('✅ Database updated successfully');

    // Verify the update
    console.log('\n6. Verifying the update...');
    const { data: verifyAdmins, error: verifyError } = await supabase
      .from('admin')
      .select('*')
      .eq('username', 'admin')
      .limit(1);

    if (verifyError) {
      console.log('❌ Verify error:', verifyError.message);
      return;
    }

    const verifyAdmin = verifyAdmins[0];
    const isUpdatedValid = await bcrypt.compare(correctPassword, verifyAdmin.password);
    console.log('Updated password valid:', isUpdatedValid ? '✅ Yes' : '❌ No');

    if (isUpdatedValid) {
      console.log('\n🎉 Password verification fixed!');
      console.log('\n📝 Now test the login:');
      console.log('1. Go to http://localhost:3000/admin');
      console.log('2. Clear cache if needed');
      console.log('3. Login with: admin / ureposh2024');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testPasswordVerification(); 