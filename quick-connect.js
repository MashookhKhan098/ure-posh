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
    
    // Test articles table (instead of posts)
    console.log('🔍 Testing articles table...');
    const { data: articlesData, error: articlesError } = await supabase
      .from('articles')
      .select('*')
      .limit(1);
    
    if (articlesError) {
      console.log('❌ Articles table error:', articlesError.message);
    } else {
      console.log('✅ Articles table connected');
      console.log('   Found', articlesData?.length || 0, 'articles');
    }
    
    // Test writers table
    console.log('🔍 Testing writers table...');
    const { data: writersData, error: writersError } = await supabase
      .from('writers')
      .select('*')
      .limit(1);
    
    if (writersError) {
      console.log('❌ Writers table error:', writersError.message);
    } else {
      console.log('✅ Writers table connected');
      console.log('   Found', writersData?.length || 0, 'writers');
    }
    
    console.log('\n🎉 Database tables connected successfully!');
    console.log('\n🚀 Your website is ready!');
    console.log('   URL: http://localhost:4000');
    
  } catch (error) {
    console.error('\n❌ Connection failed:', error.message);
    console.log('\n💡 Make sure your Supabase credentials are correct.');
  } finally {
    rl.close();
  }
}

quickConnect(); 