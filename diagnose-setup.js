require('dotenv').config();

console.log('🔍 Diagnosing Supabase Setup...\n');

// Check environment variables
console.log('1. Checking Environment Variables:');
const requiredVars = [
  'SUPABASE_URL',
  'SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY',
  'JWT_SECRET'
];

let missingVars = [];
requiredVars.forEach(varName => {
  if (!process.env[varName]) {
    console.log(`❌ Missing: ${varName}`);
    missingVars.push(varName);
  } else {
    console.log(`✅ Found: ${varName}`);
  }
});

if (missingVars.length > 0) {
  console.log('\n❌ Missing environment variables!');
  console.log('Please set these in your .env.local file:');
  missingVars.forEach(varName => {
    console.log(`   ${varName}=your_value_here`);
  });
  process.exit(1);
}

console.log('\n2. Testing Supabase Connection...');

// Test Supabase connection
const { createClient } = require('@supabase/supabase-js');

try {
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
  
  // Test basic connection
  supabase.from('admin').select('count').limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.log('❌ Supabase connection failed:', error.message);
        console.log('\nPossible issues:');
        console.log('1. Check your SUPABASE_URL and SUPABASE_ANON_KEY');
        console.log('2. Make sure you ran the SQL setup script');
        console.log('3. Verify your project is active in Supabase dashboard');
      } else {
        console.log('✅ Supabase connection successful!');
        
        // Test admin table
        supabase.from('admin').select('*').limit(1)
          .then(({ data: adminData, error: adminError }) => {
            if (adminError) {
              console.log('❌ Admin table error:', adminError.message);
              console.log('💡 Run the SQL setup script in Supabase dashboard');
            } else {
              console.log('✅ Admin table exists');
              console.log('✅ Admin records:', adminData?.length || 0);
              
              // Test posts table
              supabase.from('posts').select('*').limit(1)
                .then(({ data: postsData, error: postsError }) => {
                  if (postsError) {
                    console.log('❌ Posts table error:', postsError.message);
                  } else {
                    console.log('✅ Posts table exists');
                    console.log('✅ Posts records:', postsData?.length || 0);
                    
                    console.log('\n🎉 Setup looks good!');
                    console.log('\nNext steps:');
                    console.log('1. Test the login in your application');
                    console.log('2. Check that posts are loading');
                    console.log('3. Try creating new content');
                  }
                });
            }
          });
      }
    })
    .catch(error => {
      console.log('❌ Connection error:', error.message);
    });

} catch (error) {
  console.log('❌ Error creating Supabase client:', error.message);
} 