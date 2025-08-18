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
    
    // Test articles table (instead of posts)
    console.log('\n🔍 Testing articles table...');
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .limit(1);
    
    if (articlesError) {
      console.error('❌ Articles table error:', articlesError.message);
    } else {
      console.log('✅ Articles table connected');
      console.log('   Found', articlesData?.length || 0, 'articles');
    }
    
    // Test writers table
    console.log('\n🔍 Testing writers table...');
    const { data: writersData, error: writersError } = await supabase
      .from('writers')
      .select('*')
      .limit(1);
    
    if (writersError) {
      console.error('❌ Writers table error:', writersError.message);
    } else {
      console.log('✅ Writers table connected');
      console.log('   Found', writersData?.length || 0, 'writers');
    }
    
    console.log('\n🎉 Database connection test completed!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection(); 