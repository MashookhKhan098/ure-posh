require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function fixPasswordMismatch() {
  console.log('🔧 Fixing Password Mismatch Issue...\n');

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('1. Checking current admin user...');
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
    console.log('- Current password hash:', admin.password.substring(0, 20) + '...');

    console.log('\n2. Testing different password variations...');
    const testPasswords = [
      'ureposh2024',
      'Ureposh2024',
      'UREPOSH2024',
      'ureposh2024!',
      'ureposh2024@',
      'ureposh2024#',
      'ureposh2024$',
      'ureposh2024%',
      'ureposh2024^',
      'ureposh2024&',
      'ureposh2024*',
      'ureposh2024(',
      'ureposh2024)',
      'ureposh2024-',
      'ureposh2024_',
      'ureposh2024+',
      'ureposh2024=',
      'ureposh2024[',
      'ureposh2024]',
      'ureposh2024{',
      'ureposh2024}',
      'ureposh2024|',
      'ureposh2024\\',
      'ureposh2024:',
      'ureposh2024;',
      'ureposh2024"',
      'ureposh2024\'',
      'ureposh2024<',
      'ureposh2024>',
      'ureposh2024,',
      'ureposh2024.',
      'ureposh2024?',
      'ureposh2024/',
      'ureposh2024 ',
      ' ureposh2024',
      'ureposh2024\n',
      'ureposh2024\t',
      'ureposh2024\r'
    ];

    let foundMatch = false;
    for (const testPassword of testPasswords) {
      const isValid = await bcrypt.compare(testPassword, admin.password);
      if (isValid) {
        console.log(`✅ Password match found: "${testPassword}"`);
        foundMatch = true;
        break;
      }
    }

    if (!foundMatch) {
      console.log('❌ No password match found with current hash');
      console.log('\n3. Creating new password hash...');
      
      const correctPassword = 'ureposh2024';
      const newHash = await bcrypt.hash(correctPassword, 10);
      console.log('New hash length:', newHash.length);
      console.log('New hash starts with:', newHash.substring(0, 20) + '...');

      console.log('\n4. Updating password in database...');
      const { error: updateError } = await supabase
        .from('admin')
        .update({ password: newHash })
        .eq('username', 'admin');

      if (updateError) {
        console.log('❌ Failed to update password:', updateError.message);
      } else {
        console.log('✅ Password updated successfully');
        
        // Verify the update
        const { data: updatedAdmin } = await supabase
          .from('admin')
          .select('password')
          .eq('username', 'admin')
          .single();

        const isNowValid = await bcrypt.compare(correctPassword, updatedAdmin.password);
        console.log('Updated password verification:', isNowValid ? '✅ Valid' : '❌ Invalid');
        
        if (isNowValid) {
          console.log('\n🎉 Password mismatch fixed!');
          console.log('You can now login with:');
          console.log('- Username: admin');
          console.log('- Password: ureposh2024');
        }
      }
    } else {
      console.log('\n✅ Password is already correct');
    }

  } catch (error) {
    console.log('❌ Fix failed:', error.message);
  }
}

fixPasswordMismatch(); 