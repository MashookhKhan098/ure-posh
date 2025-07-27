require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Environment Variables...\n');

const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET'
];

let allGood = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  } else {
    console.log(`❌ ${varName}: MISSING`);
    allGood = false;
  }
});

console.log('\n📋 Summary:');
if (allGood) {
  console.log('✅ All required environment variables are set!');
  console.log('🚀 You can now start the development server.');
} else {
  console.log('❌ Some environment variables are missing.');
  console.log('\n🔧 To fix this:');
  console.log('1. Create a .env.local file in your project root');
  console.log('2. Add the missing variables:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key');
  console.log('   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key');
  console.log('   JWT_SECRET=your_jwt_secret');
  console.log('\n3. Restart your development server');
}

console.log('\n💡 Tip: You can generate a JWT secret by running:');
console.log('   node generate-jwt-secret.js'); 