const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function testPeopleTable() {
  try {
    console.log('🔍 Testing People table...');
    
    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Missing Supabase credentials in .env.local');
      return;
    }
    
    console.log('✅ Environment variables found');
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test people table
    console.log('\n🔍 Testing people table...');
    const { data: peopleData, error: peopleError } = await supabase
      .from('people')
      .select('*')
      .limit(5);
    
    if (peopleError) {
      console.error('❌ People table error:', peopleError.message);
      console.log('\n💡 The people table might not exist. You may need to run the setup script.');
    } else {
      console.log('✅ People table connected');
      console.log('   Found', peopleData?.length || 0, 'people');
      
      if (peopleData && peopleData.length > 0) {
        console.log('\n📋 Sample data:');
        peopleData.forEach((person, index) => {
          console.log(`   ${index + 1}. ${person.name} - ${person.title}`);
        });
      }
    }
    
    console.log('\n🎉 People table test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testPeopleTable();
