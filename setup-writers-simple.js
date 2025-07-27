const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Use existing Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  console.error('Please check your .env.local file for:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupWriters() {
  try {
    console.log('🚀 Setting up writer accounts...');
    console.log('📡 Using Supabase URL:', supabaseUrl);

    // Hash password for writers
    const hashedPassword = await bcrypt.hash('ureposh2024', 10);
    console.log('🔐 Password hashed successfully');

    // Sample writer accounts
    const writers = [
      {
        username: 'demo_writer',
        email: 'demo@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Demo Writer',
        specialization: 'General',
        experience_level: 'intermediate',
        is_verified: true,
        is_active: true
      },
      {
        username: 'tech_writer',
        email: 'tech@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Tech Writer',
        specialization: 'Technology',
        experience_level: 'expert',
        is_verified: true,
        is_active: true
      },
      {
        username: 'business_writer',
        email: 'business@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Business Writer',
        specialization: 'Business',
        experience_level: 'intermediate',
        is_verified: true,
        is_active: true
      },
      {
        username: 'lifestyle_writer',
        email: 'lifestyle@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Lifestyle Writer',
        specialization: 'Lifestyle',
        experience_level: 'beginner',
        is_verified: true,
        is_active: true
      }
    ];

    console.log('📝 Inserting writer profiles...');
    
    for (const writer of writers) {
      try {
        const { data, error } = await supabase
          .from('writer_profiles')
          .upsert(writer, { onConflict: 'username' });

        if (error) {
          console.error(`❌ Error inserting writer ${writer.username}:`, error.message);
        } else {
          console.log(`✅ Inserted writer: ${writer.username}`);
        }
      } catch (err) {
        console.error(`❌ Failed to insert writer ${writer.username}:`, err.message);
      }
    }

    // Check if writers were created successfully
    console.log('\n🔍 Checking created writers...');
    const { data: createdWriters, error: fetchError } = await supabase
      .from('writer_profiles')
      .select('username, full_name, is_active')
      .eq('is_active', true);

    if (fetchError) {
      console.error('❌ Error fetching writers:', fetchError.message);
    } else {
      console.log(`✅ Found ${createdWriters.length} active writers:`);
      createdWriters.forEach(writer => {
        console.log(`   - ${writer.username} (${writer.full_name})`);
      });
    }

    console.log('\n🎉 Writer setup completed!');
    console.log('\n📋 Login Credentials:');
    console.log('Username: demo_writer, Password: ureposh2024');
    console.log('Username: tech_writer, Password: ureposh2024');
    console.log('Username: business_writer, Password: ureposh2024');
    console.log('Username: lifestyle_writer, Password: ureposh2024');

  } catch (error) {
    console.error('❌ Error setting up writers:', error);
    process.exit(1);
  }
}

// Run the setup
setupWriters(); 