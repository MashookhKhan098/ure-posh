const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testConnection() {
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase credentials in .env.local');
      console.log('Please update your .env.local file with:');
      console.log('- NEXT_PUBLIC_SUPABASE_URL');
      console.log('- SUPABASE_SERVICE_ROLE_KEY');
      return;
    }
    
    console.log('✅ Environment variables found');
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test admin table
    console.log('\n🔍 Testing admin table...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('*')
      .limit(1);
    
    if (adminError) {
      console.error('❌ Admin table error:', adminError.message);
    } else {
      console.log('✅ Admin table connected');
      console.log('   Found', adminData?.length || 0, 'admin users');
    }
    
    // Test writer_profiles table
    console.log('\n🔍 Testing writer_profiles table...');
    const { data: writerData, error: writerError } = await supabase
      .from('writer_profiles')
      .select('*')
      .limit(1);
    
    if (writerError) {
      console.error('❌ Writer profiles table error:', writerError.message);
    } else {
      console.log('✅ Writer profiles table connected');
      console.log('   Found', writerData?.length || 0, 'writer profiles');
    }
    
    // Test posts table
    console.log('\n🔍 Testing posts table...');
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(1);
    
    if (postsError) {
      console.error('❌ Posts table error:', postsError.message);
    } else {
      console.log('✅ Posts table connected');
      console.log('   Found', postsData?.length || 0, 'posts');
    }
    
    console.log('\n🎉 Database connection test completed!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection(); 