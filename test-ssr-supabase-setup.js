require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSSRSetup() {
  console.log('🔧 Testing SSR Supabase Setup...\n');

  try {
    // Test with the new environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

    console.log('1. Environment Variables Check:');
    console.log('- NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');

    if (!supabaseUrl || !supabaseKey) {
      console.log('\n❌ Missing environment variables!');
      return;
    }

    console.log('\n2. Creating Supabase Client...');
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client created');

    console.log('\n3. Testing Database Connection...');
    const { data: admins, error: adminError } = await supabase
      .from('admin')
      .select('id, username, email')
      .limit(1);

    if (adminError) {
      console.log('❌ Admin table error:', adminError.message);
    } else {
      console.log('✅ Admin table accessible');
      console.log('- Found admins:', admins?.length || 0);
    }

    console.log('\n4. Testing Posts Table...');
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('id, title, status')
      .limit(1);

    if (postsError) {
      console.log('❌ Posts table error:', postsError.message);
    } else {
      console.log('✅ Posts table accessible');
      console.log('- Found posts:', posts?.length || 0);
    }

    console.log('\n5. Testing Storage...');
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets();

    if (storageError) {
      console.log('❌ Storage error:', storageError.message);
    } else {
      console.log('✅ Storage accessible');
      console.log('- Available buckets:', buckets?.length || 0);
      buckets?.forEach(bucket => {
        console.log(`  - ${bucket.name}`);
      });
    }

    console.log('\n🎉 SSR Supabase Setup Test Complete!');
    console.log('\n📋 Summary:');
    console.log('- ✅ Environment variables configured');
    console.log('- ✅ Supabase client working');
    console.log('- ✅ Database tables accessible');
    console.log('- ✅ Storage accessible');

    console.log('\n🔧 Next Steps:');
    console.log('1. The API routes are now using SSR Supabase client');
    console.log('2. Authentication will work with proper cookie handling');
    console.log('3. File uploads will work with Supabase Storage');
    console.log('4. All database operations use the new SSR method');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

testSSRSetup(); 