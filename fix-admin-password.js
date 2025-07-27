require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function fixAdminPassword() {
  console.log('🔧 Fixing Admin Password Hash...\n');

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('1. Checking current admin user...');
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*')
      .eq('username', 'admin')
      .limit(1);

    if (error) {
      console.log('❌ Error fetching admin:', error.message);
      return;
    }

    if (!admins || admins.length === 0) {
      console.log('❌ No admin user found');
      return;
    }

    const admin = admins[0];
    console.log('Current password hash length:', admin.password.length);
    console.log('Current password hash:', admin.password);

    // Check if password is properly hashed
    const isPasswordValid = await bcrypt.compare('ureposh2024', admin.password);
    console.log('Password validation result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');

    if (!isPasswordValid) {
      console.log('\n2. Creating new password hash...');
      const newPasswordHash = await bcrypt.hash('ureposh2024', 10);
      console.log('New hash length:', newPasswordHash.length);

      console.log('\n3. Updating admin user...');
      const { data: updatedAdmin, error: updateError } = await supabase
        .from('admin')
        .update({ password: newPasswordHash })
        .eq('username', 'admin')
        .select()
        .single();

      if (updateError) {
        console.log('❌ Error updating admin:', updateError.message);
        return;
      }

      console.log('✅ Admin password updated successfully');

      // Verify the new password
      console.log('\n4. Verifying new password...');
      const { data: verifyAdmins, error: verifyError } = await supabase
        .from('admin')
        .select('*')
        .eq('username', 'admin')
        .limit(1);

      if (verifyError) {
        console.log('❌ Error verifying:', verifyError.message);
        return;
      }

      const verifyAdmin = verifyAdmins[0];
      const isNewPasswordValid = await bcrypt.compare('ureposh2024', verifyAdmin.password);
      console.log('New password validation:', isNewPasswordValid ? '✅ Valid' : '❌ Invalid');

      if (isNewPasswordValid) {
        console.log('\n🎉 Password fixed successfully!');
        console.log('\n📝 Now test the login:');
        console.log('1. Go to http://localhost:3000/admin');
        console.log('2. Login with: admin / ureposh2024');
        console.log('3. You should be able to login now');
      }
    } else {
      console.log('✅ Password is already valid');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

fixAdminPassword(); 