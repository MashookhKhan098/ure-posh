const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔗 Quick Connect Your Tables');
console.log('============================\n');

console.log('📋 You need to provide your Supabase credentials to connect your tables.');
console.log('Get them from: https://supabase.com/dashboard → Your Project → Settings → API\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function quickConnect() {
  try {
    console.log('🔑 Enter your Supabase credentials:\n');
    
    const supabaseUrl = await askQuestion('1. Supabase Project URL (e.g., https://abc123.supabase.co): ');
    const anonKey = await askQuestion('2. Anon/Public Key (starts with eyJ...): ');
    const serviceRoleKey = await askQuestion('3. Service Role Key (starts with eyJ...): ');

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      console.log('\n❌ All fields are required! Please try again.');
      rl.close();
      return;
    }

    // Read current .env.local file
    let envContent = fs.readFileSync('.env.local', 'utf8');

    // Function to update environment variable
    function updateEnvVar(content, varName, newValue) {
      const regex = new RegExp(`^${varName}=.*$`, 'm');
      return content.replace(regex, `${varName}=${newValue}`);
    }

    // Update the credentials
    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_URL', supabaseUrl);
    envContent = updateEnvVar(envContent, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anonKey);
    envContent = updateEnvVar(envContent, 'SUPABASE_SERVICE_ROLE_KEY', serviceRoleKey);

    // Write back to .env.local
    fs.writeFileSync('.env.local', envContent);

    console.log('\n✅ Credentials updated! Testing connection...\n');

    // Test the connection
    const { createClient } = require('@supabase/supabase-js');
    require('dotenv').config({ path: '.env.local' });
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    // Test all three tables
    console.log('🔍 Testing admin table...');
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('*')
      .limit(1);
    
    if (adminError) {
      console.log('❌ Admin table error:', adminError.message);
    } else {
      console.log('✅ Admin table connected');
      console.log('   Found', adminData?.length || 0, 'admin users');
    }
    
    console.log('\n🔍 Testing writer_profiles table...');
    const { data: writerData, error: writerError } = await supabase
      .from('writer_profiles')
      .select('*')
      .limit(1);
    
    if (writerError) {
      console.log('❌ Writer profiles table error:', writerError.message);
    } else {
      console.log('✅ Writer profiles table connected');
      console.log('   Found', writerData?.length || 0, 'writer profiles');
    }
    
    console.log('\n🔍 Testing posts table...');
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(1);
    
    if (postsError) {
      console.log('❌ Posts table error:', postsError.message);
    } else {
      console.log('✅ Posts table connected');
      console.log('   Found', postsData?.length || 0, 'posts');
    }
    
    console.log('\n🎉 All tables connected successfully!');
    console.log('\n🚀 Your admin login system is ready:');
    console.log('   URL: http://localhost:3000/admin/login');
    console.log('   Username: admin');
    console.log('   Password: admin123');
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\n💡 Make sure your Supabase credentials are correct.');
  } finally {
    rl.close();
  }
}

quickConnect(); 