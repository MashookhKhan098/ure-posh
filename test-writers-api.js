const fetch = require('node-fetch');

async function testWritersAPI() {
  try {
    console.log('Testing writers API...');
    const response = await fetch('http://localhost:4000/api/admin/writers');
    
    console.log('Status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('Writers data:', JSON.stringify(data, null, 2));
    } else {
      const errorText = await response.text();
      console.log('Error response:', errorText);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testWritersAPI();
