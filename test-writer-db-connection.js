const { createWriterAdminClient } = require('./utils/supabase/writer');

async function testWriterDatabaseConnection() {
  console.log('🔍 Testing Writer Database Connection...\n');

  try {
    // Test 1: Create Supabase client
    console.log('1. Creating Supabase client...');
    const supabase = createWriterAdminClient();
    console.log('✅ Supabase client created successfully\n');

    // Test 2: Check if writer_profiles table exists and has data
    console.log('2. Checking writer_profiles table...');
    const { data: writers, error: writersError } = await supabase
      .from('writer_profiles')
      .select('writer_id, username, email, full_name, is_active')
      .limit(5);

    if (writersError) {
      console.error('❌ Error accessing writer_profiles table:', writersError);
      return;
    }

    console.log('✅ writer_profiles table accessible');
    console.log(`📊 Found ${writers?.length || 0} writer profiles\n`);

    if (writers && writers.length > 0) {
      console.log('📝 Writer Profiles:');
      writers.forEach((writer, index) => {
        console.log(`   ${index + 1}. ${writer.username} (${writer.full_name})`);
        console.log(`      Email: ${writer.email}`);
        console.log(`      Active: ${writer.is_active}`);
        console.log(`      ID: ${writer.writer_id}`);
        console.log('');
      });
    }

    // Test 3: Check if writer_sessions table exists
    console.log('3. Checking writer_sessions table...');
    const { data: sessions, error: sessionsError } = await supabase
      .from('writer_sessions')
      .select('id, writer_id, created_at')
      .limit(1);

    if (sessionsError) {
      console.log('⚠️  writer_sessions table not accessible (this is okay if not created yet)');
      console.log('   Error:', sessionsError.message);
    } else {
      console.log('✅ writer_sessions table accessible');
      console.log(`📊 Found ${sessions?.length || 0} sessions\n`);
    }

    // Test 4: Check if writer_statistics table exists
    console.log('4. Checking writer_statistics table...');
    const { data: stats, error: statsError } = await supabase
      .from('writer_statistics')
      .select('id, writer_id, total_posts')
      .limit(1);

    if (statsError) {
      console.log('⚠️  writer_statistics table not accessible (this is okay if not created yet)');
      console.log('   Error:', statsError.message);
    } else {
      console.log('✅ writer_statistics table accessible');
      console.log(`📊 Found ${stats?.length || 0} statistics records\n`);
    }

    // Test 5: Test authentication query
    console.log('5. Testing authentication query...');
    const { data: authTest, error: authError } = await supabase
      .from('writer_profiles')
      .select('writer_id, username, password_hash')
      .eq('username', 'demo_writer')
      .eq('is_active', true)
      .single();

    if (authError) {
      console.log('❌ Authentication query failed:', authError.message);
    } else if (authTest) {
      console.log('✅ Authentication query successful');
      console.log(`   Found user: ${authTest.username}`);
      console.log(`   Has password hash: ${authTest.password_hash ? 'Yes' : 'No'}`);
    } else {
      console.log('⚠️  No demo_writer found in database');
    }

    console.log('\n🎉 Database connection test completed!');

  } catch (error) {
    console.error('💥 Database connection test failed:', error);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check your environment variables:');
    console.log('   - NEXT_PUBLIC_SUPABASE_URL');
    console.log('   - NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.log('   - SUPABASE_SERVICE_ROLE_KEY');
    console.log('2. Verify your database is running');
    console.log('3. Check if writer_profiles table exists');
    console.log('4. Run the setup-writer-accounts.sql script');
  }
}

// Run the test
testWriterDatabaseConnection(); 