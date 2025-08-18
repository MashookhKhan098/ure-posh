require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

async function testWriterAuth() {
  try {
    console.log('🔍 Testing Writer Authentication...');
    
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
    
    // Test writers table
    console.log('\n🔍 Testing writers table...');
    const { data: writersData, error: writersError } = await supabase
      .from('writers')
      .select('*');
    
    if (writersError) {
      console.error('❌ Writers table error:', writersError.message);
      console.log('\n💡 The writers table might not exist yet.');
      console.log('Please check your Supabase database structure.');
    } else {
      console.log('✅ Writers table connected');
      console.log('   Found', writersData?.length || 0, 'writers');
      
      if (writersData && writersData.length > 0) {
        console.log('\n📝 Sample writer data:');
        writersData.forEach((writer, index) => {
          console.log(`   ${index + 1}. ${writer.name} (${writer.email})`);
          console.log(`      Specialization: ${writer.specialization}`);
          console.log(`      Status: ${writer.status}`);
          console.log(`      Featured: ${writer.is_featured ? 'Yes' : 'No'}`);
          console.log(`      Verified: ${writer.verification_status}`);
        });
        
        // Show active writers for login
        const activeWriters = writersData.filter(w => w.status === 'active');
        console.log(`\n🟢 Active writers available for login: ${activeWriters.length}`);
        activeWriters.forEach(writer => {
          console.log(`   • ${writer.email} (${writer.specialization})`);
        });
      }
    }
    
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
    
    // Test categories table
    console.log('\n🔍 Testing categories table...');
    const { data: categoriesData, error: categoriesError } = await supabase
      .from('categories')
      .select('*')
      .limit(1);
    
    if (categoriesError) {
      console.error('❌ Categories table error:', categoriesError.message);
    } else {
      console.log('✅ Categories table connected');
      console.log('   Found', categoriesData?.length || 0, 'categories');
    }
    
    console.log('\n🎉 Database connection test completed!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testWriterAuth();
