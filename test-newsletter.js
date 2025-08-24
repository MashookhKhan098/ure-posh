#!/usr/bin/env node

const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '.env.local') });

console.log('🚀 Testing Newsletter Subscription API...');
console.log('⏰ Timestamp:', new Date().toISOString());

// Mock NextRequest and NextResponse for testing
global.Request = class MockRequest {
  constructor(url, options) {
    this.url = url;
    this.method = options.method;
    this.body = options.body;
  }
  
  async json() {
    return JSON.parse(this.body);
  }
};

global.NextRequest = global.Request;

global.NextResponse = {
  json: (data, options = {}) => {
    console.log('📤 Response:', { status: options.status || 200, data });
    return { json: () => data, status: options.status || 200 };
  }
};

// Test the API
async function testNewsletterAPI() {
  try {
    // Import the API route
    const { POST } = require('./app/api/newsletter/route.ts');
    
    // Create a test request
    const testEmail = 'test@example.com';
    const mockRequest = new global.NextRequest('http://localhost:3000/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: testEmail })
    });
    
    console.log('📧 Testing subscription for:', testEmail);
    
    // Call the API
    const response = await POST(mockRequest);
    
    console.log('✅ Newsletter API test completed!');
    
  } catch (error) {
    console.error('❌ Newsletter API test failed:', error.message);
    
    // Check if it's a database connection issue
    if (error.message.includes('supabase') || error.message.includes('database')) {
      console.log('ℹ️ This seems to be a database connection issue.');
      console.log('ℹ️ Please ensure your Supabase credentials are set up in .env.local');
    }
  }
}

testNewsletterAPI();
