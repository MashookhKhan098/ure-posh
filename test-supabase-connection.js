require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

async function testSupabaseConnection() {
  console.log('🔍 Testing Supabase Connection...\n');

  try {
    // Check environment variables
    console.log('1. Checking environment variables...');
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.log('❌ Missing Supabase credentials');
      console.log('SUPABASE_URL:', supabaseUrl ? '✅ Present' : '❌ Missing');
      console.log('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅ Present' : '❌ Missing');
      return;
    }
    
    console.log('✅ Environment variables found');
    console.log('URL:', supabaseUrl);

    // Create Supabase client
    console.log('\n2. Creating Supabase client...');
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client created');

    // Test connection by querying admin table
    console.log('\n3. Testing database connection...');
    const { data: admins, error } = await supabase
      .from('admin')
      .select('*')
      .limit(1);

    if (error) {
      console.log('❌ Database connection failed:');
      console.log('Error:', error.message);
      console.log('Code:', error.code);
      console.log('Details:', error.details);
      return;
    }

    console.log('✅ Database connection successful');
    console.log('Admin users found:', admins ? admins.length : 0);

    if (admins && admins.length > 0) {
      const admin = admins[0];
      console.log('\n4. Admin user details:');
      console.log('- Username:', admin.username);
      console.log('- Email:', admin.email);
      console.log('- Role:', admin.role);
      console.log('- Password hash length:', admin.password ? admin.password.length : 0);
    }

    // Test login API endpoint
    console.log('\n5. Testing login API...');
    const response = await fetch('http://localhost:3000/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'ureposh2024' })
    });

    const data = await response.json();
    console.log('Login API status:', response.status);
    console.log('Login response:', data);

    if (response.ok && data.success) {
      console.log('✅ Login API working correctly');
    } else {
      console.log('❌ Login API failed:', data.error);
    }

  } catch (error) {
    console.log('❌ Connection error:', error.message);
  }
}

testSupabaseConnection(); 