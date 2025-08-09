const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔧 Supabase Environment Setup');
console.log('=============================\n');

console.log('Please provide your Supabase credentials:');
console.log('1. Go to your Supabase Dashboard → Settings → API');
console.log('2. Copy the Project URL, anon key, and service role key\n');

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function setupEnv() {
  try {
    const supabaseUrl = await askQuestion('Enter your Supabase Project URL (e.g., https://abc123.supabase.co): ');
    const anonKey = await askQuestion('Enter your Supabase anon/public key: ');
    const serviceRoleKey = await askQuestion('Enter your Supabase service role key: ');

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      console.log('❌ All fields are required!');
      rl.close();
      return;
    }

    const envContent = `# ========================================
# SUPABASE CONFIGURATION
# ========================================
NEXT_PUBLIC_SUPABASE_URL=${supabaseUrl}
NEXT_PUBLIC_SUPABASE_ANON_KEY=${anonKey}
SUPABASE_SERVICE_ROLE_KEY=${serviceRoleKey}

# ========================================
# AUTHENTICATION & SECURITY
# ========================================
JWT_SECRET=69ef7fb68fb41f982e2211ba1f82cb9b1c62af90087d138be3250c20b7ccf30244504d48e93b21af03fa0734a399d577d207bf17e00aab008e5eef334436d989

# ========================================
# APPLICATION CONFIGURATION
# ========================================
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

    fs.writeFileSync('.env.local', envContent);
    console.log('\n✅ .env.local file created successfully!');
    console.log('\n🔍 Testing connection...');
    
    // Test the connection
    const { createClient } = require('@supabase/supabase-js');
    require('dotenv').config({ path: '.env.local' });
    
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    // Test admin table
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
    
    // Test writer_profiles table
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
    
    // Test posts table
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
    
    console.log('\n🎉 Setup completed! Your tables are now connected.');
    console.log('\n🚀 You can now:');
    console.log('1. Start your app: npm run dev');
    console.log('2. Test admin login: http://localhost:3000/admin/login');
    console.log('   Username: admin, Password: admin123');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  } finally {
    rl.close();
  }
}

setupEnv(); 