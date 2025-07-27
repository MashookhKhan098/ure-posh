const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

async function testSupabaseSetup() {
  console.log('🧪 Testing Supabase Setup...\n');

  // Check environment variables
  console.log('1. Checking environment variables...');
  const requiredVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      console.log(`❌ Missing: ${varName}`);
      return;
    } else {
      console.log(`✅ Found: ${varName}`);
    }
  }

  // Test Supabase connection
  console.log('\n2. Testing Supabase connection...');
  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // Test admin table
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('count')
      .limit(1);

    if (adminError) {
      console.log('❌ Admin table error:', adminError.message);
      console.log('💡 Make sure you ran the SQL setup script in Supabase');
      return;
    }

    console.log('✅ Supabase connection successful');
    console.log('✅ Admin table exists');

    // Test posts table
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('count')
      .limit(1);

    if (postsError) {
      console.log('❌ Posts table error:', postsError.message);
    } else {
      console.log('✅ Posts table exists');
    }

    // Get sample data counts
    console.log('\n3. Checking sample data...');
    const { data: adminCount } = await supabase.from('admin').select('*', { count: 'exact' });
    const { data: postsCount } = await supabase.from('posts').select('*', { count: 'exact' });
    const { data: writersCount } = await supabase.from('writer').select('*', { count: 'exact' });

    console.log(`✅ Admin records: ${adminCount?.length || 0}`);
    console.log(`✅ Posts records: ${postsCount?.length || 0}`);
    console.log(`✅ Writers records: ${writersCount?.length || 0}`);

    // Test admin login
    console.log('\n4. Testing admin credentials...');
    const { data: adminUser } = await supabase
      .from('admin')
      .select('*')
      .eq('adminUserName', 'admin')
      .single();

    if (adminUser) {
      console.log('✅ Admin user exists');
      console.log('✅ Username: admin');
      console.log('✅ Password: ureposh2024');
    } else {
      console.log('❌ Admin user not found');
    }

    console.log('\n🎉 Supabase setup is working correctly!');
    console.log('\nNext steps:');
    console.log('1. Test the login in your application');
    console.log('2. Check that posts are loading');
    console.log('3. Try creating new content');

  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Check your SUPABASE_URL and SUPABASE_ANON_KEY');
    console.log('2. Make sure you ran the SQL setup script');
    console.log('3. Verify your project is active in Supabase dashboard');
  }
}

// Run the test
testSupabaseSetup(); 