require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

// Use existing Supabase configuration from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function getWriterUsernames() {
  try {
    console.log('🔍 Fetching usernames from writer_profiles table...');
    console.log('📡 Using Supabase URL:', supabaseUrl);

    // Fetch all usernames from writer_profiles table
    const { data: writers, error } = await supabase
      .from('writer_profiles')
      .select('username, full_name, email, is_active, is_verified, specialization, experience_level')
      .order('username');

    if (error) {
      console.error('❌ Error fetching writers:', error.message);
      return;
    }

    console.log(`\n✅ Found ${writers.length} writers in database:`);
    console.log('='.repeat(60));
    
    writers.forEach((writer, index) => {
      console.log(`${index + 1}. Username: ${writer.username}`);
      console.log(`   Full Name: ${writer.full_name || 'N/A'}`);
      console.log(`   Email: ${writer.email || 'N/A'}`);
      console.log(`   Active: ${writer.is_active ? '✅ Yes' : '❌ No'}`);
      console.log(`   Verified: ${writer.is_verified ? '✅ Yes' : '❌ No'}`);
      console.log(`   Specialization: ${writer.specialization || 'N/A'}`);
      console.log(`   Experience: ${writer.experience_level || 'N/A'}`);
      console.log('   ' + '-'.repeat(40));
    });

    // Show active writers only
    const activeWriters = writers.filter(w => w.is_active);
    console.log(`\n📊 Summary:`);
    console.log(`Total Writers: ${writers.length}`);
    console.log(`Active Writers: ${activeWriters.length}`);
    console.log(`Verified Writers: ${writers.filter(w => w.is_verified).length}`);

    // Show login credentials for active writers
    if (activeWriters.length > 0) {
      console.log('\n🔐 Active Writers (for login):');
      activeWriters.forEach(writer => {
        console.log(`Username: ${writer.username}`);
      });
      console.log('\n💡 Password: ureposh2024 (for all accounts)');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  }
}

// Run the script
getWriterUsernames(); 