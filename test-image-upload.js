const fs = require('fs');
const path = require('path');

async function testImageUpload() {
  try {
    console.log('🧪 Testing Image Upload API...\n');

    // Create a simple test image (1x1 pixel PNG)
    const testImagePath = path.join(__dirname, 'test-image.png');
    
    // Create a minimal PNG file for testing
    const pngHeader = Buffer.from([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, // PNG signature
      0x00, 0x00, 0x00, 0x0D, // IHDR chunk length
      0x49, 0x48, 0x44, 0x52, // IHDR
      0x00, 0x00, 0x00, 0x01, // width: 1
      0x00, 0x00, 0x00, 0x01, // height: 1
      0x08, 0x02, 0x00, 0x00, 0x00, // bit depth, color type, compression, filter, interlace
      0x90, 0x77, 0x53, 0xDE, // CRC
      0x00, 0x00, 0x00, 0x0C, // IDAT chunk length
      0x49, 0x44, 0x41, 0x54, // IDAT
      0x08, 0x99, 0x01, 0x01, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x02, 0x00, 0x01, // compressed data
      0x00, 0x00, 0x00, 0x00, // IEND chunk length
      0x49, 0x45, 0x4E, 0x44, // IEND
      0xAE, 0x42, 0x60, 0x82  // CRC
    ]);
    
    fs.writeFileSync(testImagePath, pngHeader);
    console.log('✅ Test image created');

    // Test the upload API
    const formData = new FormData();
    const file = new File([pngHeader], 'test-image.png', { type: 'image/png' });
    formData.append('image', file);

    console.log('📤 Testing upload to /api/articles/upload-image...');
    
    const response = await fetch('http://localhost:3000/api/articles/upload-image', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (response.ok) {
      console.log('✅ Upload successful!');
      console.log('📋 Response:', result);
      console.log('🔗 Image URL:', result.image_url);
    } else {
      console.log('❌ Upload failed:');
      console.log('Status:', response.status);
      console.log('Error:', result.error);
    }

    // Clean up test file
    fs.unlinkSync(testImagePath);
    console.log('🧹 Test file cleaned up');

  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('\n💡 Make sure your development server is running:');
    console.log('   npm run dev');
  }
}

testImageUpload();
