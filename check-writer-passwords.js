require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

// Use existing Supabase configuration from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkWriterPasswords() {
  try {
    console.log('🔍 Checking passwords in writer_profiles table...');
    console.log('📡 Using Supabase URL:', supabaseUrl);

    // Fetch all writers with their password hashes
    const { data: writers, error } = await supabase
      .from('writer_profiles')
      .select('username, email, password_hash, is_active')
      .order('username');

    if (error) {
      console.error('❌ Error fetching writers:', error.message);
      return;
    }

    console.log(`\n✅ Found ${writers.length} writers in database:`);
    console.log('='.repeat(60));
    
    writers.forEach((writer, index) => {
      console.log(`${index + 1}. Username: ${writer.username}`);
      console.log(`   Email: ${writer.email || 'N/A'}`);
      console.log(`   Active: ${writer.is_active ? '✅ Yes' : '❌ No'}`);
      console.log(`   Has Password: ${writer.password_hash ? '✅ Yes' : '❌ No'}`);
      if (writer.password_hash) {
        console.log(`   Password Hash: ${writer.password_hash.substring(0, 20)}...`);
      }
      console.log('   ' + '-'.repeat(40));
    });

    // Check which writers have passwords
    const writersWithPasswords = writers.filter(w => w.password_hash);
    const writersWithoutPasswords = writers.filter(w => !w.password_hash);

    console.log(`\n📊 Password Summary:`);
    console.log(`Total Writers: ${writers.length}`);
    console.log(`With Passwords: ${writersWithPasswords.length}`);
    console.log(`Without Passwords: ${writersWithoutPasswords.length}`);

    if (writersWithoutPasswords.length > 0) {
      console.log('\n⚠️  Writers without passwords:');
      writersWithoutPasswords.forEach(writer => {
        console.log(`   - ${writer.username}`);
      });
    }

    if (writersWithPasswords.length > 0) {
      console.log('\n✅ Writers with passwords (can login):');
      writersWithPasswords.forEach(writer => {
        console.log(`   - ${writer.username}`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
checkWriterPasswords(); 