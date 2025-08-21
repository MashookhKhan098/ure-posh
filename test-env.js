// Test script to check environment variables
require('dotenv').config({ path: '.env.local' });

console.log('=== Environment Variables Test ===');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');

if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log('URL starts with:', process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 30) + '...');
}

if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('Anon key starts with:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 20) + '...');
}

console.log('=== End Test ===');
