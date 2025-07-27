require('dotenv').config({ path: '.env' });

async function testAPIEndpoint() {
  try {
    console.log('🧪 Testing API endpoint: /api/writer/users');
    
    const response = await fetch('http://localhost:4000/api/writer/users');
    console.log('📡 Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API Response:', JSON.stringify(data, null, 2));
      
      if (data.writers && data.writers.length > 0) {
        console.log('\n📋 Writers from API:');
        data.writers.forEach((writer, index) => {
          console.log(`${index + 1}. ${writer.username} (${writer.full_name || 'N/A'})`);
        });
      } else {
        console.log('❌ No writers found in API response');
      }
    } else {
      const errorText = await response.text();
      console.error('❌ API Error:', response.status, errorText);
    }
  } catch (error) {
    console.error('💥 Error testing API:', error.message);
  }
}

testAPIEndpoint(); 