require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function debugLoginProcess() {
  console.log('🔍 Debugging Login Process...\n');

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('1. Testing direct database query...');
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
    console.log('- Email:', admin.email);
    console.log('- Password hash length:', admin.password.length);
    console.log('- Password hash:', admin.password.substring(0, 20) + '...');

    console.log('\n2. Testing password comparison...');
    const testPassword = 'ureposh2024';
    const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
    console.log('Password to test:', testPassword);
    console.log('Password valid:', isPasswordValid ? '✅ Yes' : '❌ No');

    if (!isPasswordValid) {
      console.log('\n3. Creating new password hash for comparison...');
      const newHash = await bcrypt.hash(testPassword, 10);
      console.log('New hash length:', newHash.length);
      console.log('New hash:', newHash.substring(0, 20) + '...');
      
      console.log('\n4. Testing new hash...');
      const isNewHashValid = await bcrypt.compare(testPassword, newHash);
      console.log('New hash valid:', isNewHashValid ? '✅ Yes' : '❌ No');

      if (isNewHashValid) {
        console.log('\n5. Updating admin password...');
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

        console.log('✅ Password updated successfully');
        
        // Test the updated password
        console.log('\n6. Testing updated password...');
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
        const isUpdatedPasswordValid = await bcrypt.compare(testPassword, verifyAdmin.password);
        console.log('Updated password valid:', isUpdatedPasswordValid ? '✅ Yes' : '❌ No');

        if (isUpdatedPasswordValid) {
          console.log('\n🎉 Password fixed! Now testing login API...');
          
          // Test the login API
          const response = await fetch('http://localhost:3000/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'ureposh2024' })
          });

          const data = await response.json();
          console.log('Login API status:', response.status);
          console.log('Login response:', data);
          console.log('Login success:', response.ok && data.success ? '✅ Yes' : '❌ No');
        }
      }
    } else {
      console.log('✅ Password is already valid');
      
      // Test the login API with current password
      console.log('\n3. Testing login API with current password...');
      const response = await fetch('http://localhost:3000/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'admin', password: 'ureposh2024' })
      });

      const data = await response.json();
      console.log('Login API status:', response.status);
      console.log('Login response:', data);
      console.log('Login success:', response.ok && data.success ? '✅ Yes' : '❌ No');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

debugLoginProcess(); 