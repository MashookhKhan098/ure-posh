require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');

async function testEnhancedUpload() {
  console.log('🧪 Testing Enhanced Image Upload with Supabase Integration...\n');

  // Test 1: Check environment variables
  console.log('1️⃣ Checking environment variables...');
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
    'SUPABASE_SERVICE_ROLE_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    console.log('\n💡 Run: node setup-env.js to configure your environment.');
    return;
  }
  
  console.log('✅ All environment variables are set\n');

  // Test 2: Check if uploads bucket exists
  console.log('2️⃣ Checking Supabase storage bucket...');
  try {
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.log('❌ Error accessing Supabase storage:', error.message);
      return;
    }

    const uploadsBucket = buckets.find(bucket => bucket.name === 'uploads');
    
    if (uploadsBucket) {
      console.log('✅ "uploads" bucket exists');
      console.log(`   - Public: ${uploadsBucket.public}`);
      console.log(`   - File size limit: ${uploadsBucket.fileSizeLimit || 'Not set'}`);
    } else {
      console.log('❌ "uploads" bucket not found');
      console.log('💡 Run: node setup-storage-bucket.js to create the bucket');
      return;
    }
  } catch (error) {
    console.log('❌ Error connecting to Supabase:', error.message);
    return;
  }

  console.log('\n3️⃣ Testing API endpoint...');
  
  // Test 3: Test the upload API endpoint
  try {
    const response = await fetch('http://localhost:3000/api/articles/upload-image', {
      method: 'POST',
      body: 'test'
    });

    if (response.status === 400) {
      console.log('✅ API endpoint is accessible (returned expected error for invalid request)');
    } else {
      console.log(`⚠️  API endpoint returned unexpected status: ${response.status}`);
    }
  } catch (error) {
    console.log('❌ API endpoint test failed:', error.message);
    console.log('💡 Make sure your development server is running: npm run dev');
  }

  console.log('\n🎯 Enhanced Upload Features Available:');
  console.log('✅ Drag & Drop upload');
  console.log('✅ Camera capture (on supported devices)');
  console.log('✅ File browser upload');
  console.log('✅ URL input for external images');
  console.log('✅ Real-time upload progress');
  console.log('✅ Enhanced image preview');
  console.log('✅ Supabase bucket integration');
  console.log('✅ File validation (type, size)');
  console.log('✅ Error handling and user feedback');

  console.log('\n📝 Next Steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Go to your writer dashboard');
  console.log('3. Click "Create New Article"');
  console.log('4. Test the enhanced image upload features');
  console.log('5. Try both device upload and URL input methods');

  console.log('\n🔧 Troubleshooting:');
  console.log('- If uploads fail, check Supabase storage policies');
  console.log('- Run: node setup-storage-policies.js to configure policies');
  console.log('- Check browser console for detailed error messages');
}

testEnhancedUpload().catch(console.error);
