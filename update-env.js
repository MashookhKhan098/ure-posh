const fs = require('fs');

console.log('🔧 Update Supabase Credentials');
console.log('==============================\n');

console.log('Please provide your Supabase credentials:');
console.log('1. Go to your Supabase Dashboard → Settings → API');
console.log('2. Copy the Project URL, anon key, and service role key\n');

// Read the current .env.local file
let envContent = fs.readFileSync('.env.local', 'utf8');

// Function to update a specific environment variable
function updateEnvVar(content, varName, newValue) {
  const regex = new RegExp(`^${varName}=.*$`, 'm');
  return content.replace(regex, `${varName}=${newValue}`);
}

// Get user input (you'll need to replace these with your actual values)
const supabaseUrl = 'https://your-actual-project-id.supabase.co'; // Replace with your URL
const anonKey = 'your_actual_anon_key_here'; // Replace with your anon key
const serviceRoleKey = 'your_actual_service_role_key_here'; // Replace with your service role key

console.log('⚠️  IMPORTANT: You need to edit this script and replace the placeholder values with your actual Supabase credentials!');
console.log('\nCurrent placeholder values:');
console.log(`NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}`);
console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}`);
console.log(`SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}`);

console.log('\n📝 To get your credentials:');
console.log('1. Go to https://supabase.com/dashboard');
console.log('2. Click on your project');
console.log('3. Go to Settings → API');
console.log('4. Copy the Project URL, anon public key, and service_role secret key');
console.log('5. Replace the values in this script and run it again');

// Update the environment variables
envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', supabaseUrl);
envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey);
envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey);

// Write the updated content back to .env.local
fs.writeFileSync('.env.local', envContent);

console.log('\n✅ .env.local file updated!');
console.log('\n🔍 Now test the connection:');
console.log('node test-connection.js'); 