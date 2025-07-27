require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

async function verifyDatabaseSetup() {
  console.log('🔍 Verifying Database Setup...\n');

  try {
    // Create Supabase client
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
    
    console.log('1. Checking if admin table exists...');
    
    // Check if admin table exists
    const { data: adminData, error: adminError } = await supabase
      .from('admin')
      .select('*')
      .limit(1);

    if (adminError) {
      console.log('❌ Admin table error:', adminError.message);
      return;
    }

    console.log('✅ Admin table exists');
    console.log('Admin records found:', adminData ? adminData.length : 0);

    if (adminData && adminData.length > 0) {
      const admin = adminData[0];
      console.log('Admin user found:');
      console.log('- Username:', admin.username);
      console.log('- Email:', admin.email);
      console.log('- Role:', admin.role);
      console.log('- Password hash length:', admin.password ? admin.password.length : 0);

      // Test password verification
      console.log('\n2. Testing password verification...');
      const isPasswordValid = await bcrypt.compare('ureposh2024', admin.password);
      console.log('Password verification result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');

      if (!isPasswordValid) {
        console.log('\n🔧 Creating new admin user with correct password...');
        
        // Create new admin user with correct password
        const hashedPassword = await bcrypt.hash('ureposh2024', 10);
        const { data: newAdmin, error: insertError } = await supabase
          .from('admin')
          .upsert({
            username: 'admin',
            password: hashedPassword,
            email: 'admin@ureposh.com',
            full_name: 'Admin User',
            role: 'admin'
          }, { onConflict: 'username' })
          .select()
          .single();

        if (insertError) {
          console.log('❌ Error creating admin:', insertError.message);
        } else {
          console.log('✅ Admin user updated successfully');
        }
      }
    } else {
      console.log('❌ No admin user found. Creating one...');
      
      // Create admin user
      const hashedPassword = await bcrypt.hash('ureposh2024', 10);
      const { data: newAdmin, error: insertError } = await supabase
        .from('admin')
        .insert({
          username: 'admin',
          password: hashedPassword,
          email: 'admin@ureposh.com',
          full_name: 'Admin User',
          role: 'admin'
        })
        .select()
        .single();

      if (insertError) {
        console.log('❌ Error creating admin:', insertError.message);
      } else {
        console.log('✅ Admin user created successfully');
      }
    }

    console.log('\n3. Checking posts table...');
    
    // Check posts table
    const { data: postsData, error: postsError } = await supabase
      .from('posts')
      .select('*')
      .limit(3);

    if (postsError) {
      console.log('❌ Posts table error:', postsError.message);
    } else {
      console.log('✅ Posts table exists');
      console.log('Posts found:', postsData ? postsData.length : 0);
      
      if (postsData && postsData.length > 0) {
        console.log('Sample post:', postsData[0].title);
      }
    }

    console.log('\n🎉 Database verification complete!');

  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

verifyDatabaseSetup(); 