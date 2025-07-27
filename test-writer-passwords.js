require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Use existing Supabase configuration from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testWriterPasswords() {
  try {
    console.log('🔍 Testing writer passwords from database...');
    console.log('📡 Using Supabase URL:', supabaseUrl);

    // Fetch all writers with their password hashes
    const { data: writers, error } = await supabase
      .from('writer_profiles')
      .select('username, email, password_hash, is_active')
      .eq('is_active', true)
      .order('username');

    if (error) {
      console.error('❌ Error fetching writers:', error.message);
      return;
    }

    console.log(`\n✅ Found ${writers.length} active writers:`);
    console.log('='.repeat(60));

    // Test common passwords
    const testPasswords = [
      'ureposh2024',
      '1234',
      'password',
      'test',
      'demo',
      'admin',
      'writer',
      'ureposh',
      '2024'
    ];

    for (const writer of writers) {
      console.log(`\n🔐 Testing passwords for: ${writer.username}`);
      console.log(`   Email: ${writer.email || 'N/A'}`);
      
      if (!writer.password_hash) {
        console.log(`   ❌ No password hash found`);
        continue;
      }

      let passwordFound = false;
      for (const testPassword of testPasswords) {
        try {
          const isValid = await bcrypt.compare(testPassword, writer.password_hash);
          if (isValid) {
            console.log(`   ✅ Password found: "${testPassword}"`);
            passwordFound = true;
            break;
          }
        } catch (err) {
          // Try direct comparison for simple passwords
          if (writer.password_hash === testPassword) {
            console.log(`   ✅ Password found: "${testPassword}" (direct match)`);
            passwordFound = true;
            break;
          }
        }
      }

      if (!passwordFound) {
        console.log(`   ❓ Password not found in common list`);
        console.log(`   💡 Try: ureposh2024, 1234, password, test, demo, admin, writer, ureposh, 2024`);
      }
    }

    console.log('\n📋 Login Instructions:');
    console.log('1. Go to: http://localhost:4000/writer');
    console.log('2. Use the username and password found above');
    console.log('3. If password not found, try common passwords or contact admin');

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
testWriterPasswords(); 