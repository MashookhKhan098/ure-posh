const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function setupStoragePolicies() {
  try {
    console.log('🔐 Setting up Supabase Storage Policies...\n');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.log('❌ Missing environment variables!');
      console.log('Please make sure you have:');
      console.log('- NEXT_PUBLIC_SUPABASE_URL');
      console.log('- SUPABASE_SERVICE_ROLE_KEY');
      return;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check if bucket exists
    console.log('🔍 Checking "uploads" bucket...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.log('❌ Error listing buckets:', listError.message);
      return;
    }

    const uploadsBucket = buckets.find(bucket => bucket.name === 'uploads');

    if (!uploadsBucket) {
      console.log('❌ "uploads" bucket not found!');
      console.log('Please run: node setup-storage-bucket.js first');
      return;
    }

    console.log('✅ "uploads" bucket found');

    // Set up RLS policies for storage
    console.log('🔐 Setting up storage policies...');

    // Policy 1: Allow public read access to all files in uploads bucket
    const { error: readPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "Public Read Access" ON storage.objects
        FOR SELECT USING (bucket_id = 'uploads');
      `
    });

    if (readPolicyError) {
      console.log('⚠️  Could not create read policy (might already exist):', readPolicyError.message);
    } else {
      console.log('✅ Read policy created');
    }

    // Policy 2: Allow authenticated users to upload files
    const { error: insertPolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "Authenticated Upload" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'uploads' AND auth.role() = 'authenticated');
      `
    });

    if (insertPolicyError) {
      console.log('⚠️  Could not create insert policy (might already exist):', insertPolicyError.message);
    } else {
      console.log('✅ Insert policy created');
    }

    // Policy 3: Allow users to update their own files
    const { error: updatePolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "User Update Own Files" ON storage.objects
        FOR UPDATE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
      `
    });

    if (updatePolicyError) {
      console.log('⚠️  Could not create update policy (might already exist):', updatePolicyError.message);
    } else {
      console.log('✅ Update policy created');
    }

    // Policy 4: Allow users to delete their own files
    const { error: deletePolicyError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE POLICY IF NOT EXISTS "User Delete Own Files" ON storage.objects
        FOR DELETE USING (bucket_id = 'uploads' AND auth.uid()::text = (storage.foldername(name))[1]);
      `
    });

    if (deletePolicyError) {
      console.log('⚠️  Could not create delete policy (might already exist):', deletePolicyError.message);
    } else {
      console.log('✅ Delete policy created');
    }

    console.log('\n🎉 Storage policies setup complete!');
    console.log('📝 Next steps:');
    console.log('1. Test image upload in your writer dashboard');
    console.log('2. If you still have issues, check the manual setup guide');

  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    console.log('\n💡 Manual setup instructions:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to Storage → uploads → Policies');
    console.log('3. Add these policies manually:');
    console.log('   - "Public Read Access": SELECT for all files');
    console.log('   - "Authenticated Upload": INSERT for authenticated users');
    console.log('   - "User Update Own Files": UPDATE for own files');
    console.log('   - "User Delete Own Files": DELETE for own files');
  }
}

setupStoragePolicies();
