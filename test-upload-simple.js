const fs = require('fs');

async function testUpload() {
  try {
    console.log('🧪 Testing Upload API with Service Role...\n');

    // Create a simple test file
    const testContent = 'This is a test file for upload';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });

    const formData = new FormData();
    formData.append('image', testFile);

    console.log('📤 Testing upload...');
    
    const response = await fetch('http://localhost:3000/api/articles/upload-image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log('📋 Response status:', response.status);
    console.log('📋 Response:', result);

    if (response.ok) {
      console.log('✅ Upload successful!');
      console.log('🔗 File URL:', result.image_url);
    } else {
      console.log('❌ Upload failed:', result.error);
    }

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev');
  }
}

testUpload();
