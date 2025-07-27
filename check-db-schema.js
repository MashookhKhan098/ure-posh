require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function checkSchema() {
  console.log('🔍 Checking Database Schema...\n');

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    // Check admin table structure
    console.log('1. Checking admin table...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('*')
      .limit(1);

    if (adminError) {
      console.log('❌ Admin table error:', adminError.message);
      return;
    }

    if (adminData && adminData.length > 0) {
      console.log('✅ Admin table exists');
      console.log('Admin columns:', Object.keys(adminData[0]));
      console.log('Sample admin data:', adminData[0]);
    } else {
      console.log('⚠️ Admin table exists but is empty');
    }

    // Check posts table structure
    console.log('\n2. Checking posts table...');
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(1);

    if (postsError) {
      console.log('❌ Posts table error:', postsError.message);
    } else if (postsData && postsData.length > 0) {
      console.log('✅ Posts table exists');
      console.log('Posts columns:', Object.keys(postsData[0]));
    } else {
      console.log('⚠️ Posts table exists but is empty');
    }

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

checkSchema(); 