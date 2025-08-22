const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

async function setupStorageBucket() {
  try {
    console.log('🔧 Setting up Supabase Storage Bucket...\n');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.log('❌ Missing environment variables!');
      console.log('Please make sure you have:');
      console.log('- NEXT_PUBLIC_SUPABASE_URL');
      console.log('- SUPABASE_SERVICE_ROLE_KEY');
      console.log('\nRun: node setup-env.js to configure your environment.');
      return;
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    // Check if bucket already exists
    console.log('🔍 Checking if "uploads" bucket exists...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();

    if (listError) {
      console.log('❌ Error listing buckets:', listError.message);
      return;
    }

    const uploadsBucket = buckets.find(bucket => bucket.name === 'uploads');

    if (uploadsBucket) {
      console.log('✅ "uploads" bucket already exists!');
      
      // Check bucket policies
      console.log('🔍 Checking bucket policies...');
      const { data: policies, error: policiesError } = await supabase.storage.getBucket('uploads');
      
      if (policiesError) {
        console.log('⚠️  Warning: Could not check bucket policies:', policiesError.message);
      } else {
        console.log('✅ Bucket is accessible');
      }
      
      return;
    }

    // Create the bucket
    console.log('📦 Creating "uploads" bucket...');
    const { data: bucket, error: createError } = await supabase.storage.createBucket('uploads', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5242880 // 5MB in bytes
    });

    if (createError) {
      console.log('❌ Error creating bucket:', createError.message);
      return;
    }

    console.log('✅ "uploads" bucket created successfully!');
    console.log('📋 Bucket details:', bucket);

    // Set up bucket policies for public access
    console.log('🔐 Setting up bucket policies...');
    
    // Policy to allow public read access
    const { error: readPolicyError } = await supabase.storage.from('uploads').createSignedUrl('test.txt', 60);
    
    if (readPolicyError) {
      console.log('⚠️  Note: You may need to manually configure bucket policies in Supabase dashboard');
      console.log('   Go to: Storage → uploads → Policies');
      console.log('   Add policy: "Allow public read access"');
    } else {
      console.log('✅ Bucket policies configured');
    }

    console.log('\n🎉 Storage setup complete!');
    console.log('📝 Next steps:');
    console.log('1. Test image upload in your writer dashboard');
    console.log('2. If you encounter permission issues, check bucket policies in Supabase dashboard');

  } catch (error) {
    console.log('❌ Setup failed:', error.message);
    console.log('\n💡 Manual setup instructions:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to Storage');
    console.log('3. Click "Create a new bucket"');
    console.log('4. Name it "uploads"');
    console.log('5. Make it public');
    console.log('6. Set allowed file types: image/jpeg, image/jpg, image/png, image/webp, image/gif');
    console.log('7. Set file size limit to 5MB');
  }
}

setupStorageBucket();
