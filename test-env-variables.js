require('dotenv').config();

console.log('🔧 Testing Environment Variables...\n');

console.log('1. Checking Supabase Environment Variables:');
console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');
console.log('- SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Set' : '❌ Missing');
console.log('- SUPABASE_ANON_KEY:', process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing');

console.log('\n2. Checking JWT Secret:');
console.log('- JWT_SECRET:', process.env.JWT_SECRET ? '✅ Set' : '❌ Missing');

console.log('\n3. Environment Variable Values:');
if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.log('- NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 50) + '...');
}
if (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.substring(0, 50) + '...');
}

console.log('\n4. Fallback Logic Test:');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

console.log('- Final Supabase URL:', supabaseUrl ? '✅ Available' : '❌ Missing');
console.log('- Final Supabase Key:', supabaseKey ? '✅ Available' : '❌ Missing');

if (supabaseUrl && supabaseKey) {
  console.log('\n✅ Environment variables are properly configured!');
} else {
  console.log('\n❌ Environment variables are missing!');
  console.log('\n💡 Please check your .env file and ensure it contains:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  console.log('JWT_SECRET=your-jwt-secret');
} 