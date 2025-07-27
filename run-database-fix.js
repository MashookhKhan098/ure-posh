const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- NEXT_PUBLIC_SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runDatabaseFix() {
  try {
    console.log('🔄 Running database schema fix...');
    
    // Read the SQL file
    const fs = require('fs');
    const sqlContent = fs.readFileSync('fix-database-schema.sql', 'utf8');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`\n🔧 Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error);
          // Continue with other statements
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      } catch (err) {
        console.error(`❌ Error executing statement ${i + 1}:`, err.message);
        // Continue with other statements
      }
    }
    
    console.log('\n🎉 Database schema fix completed!');
    console.log('\n📊 Verification:');
    
    // Verify the fix
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('name, email, role')
      .limit(5);
    
    if (usersError) {
      console.error('❌ Users table verification failed:', usersError);
    } else {
      console.log('✅ Users table created successfully');
      console.log('📋 Sample users:', users);
    }
    
    const { data: posts, error: postsError } = await supabase
      .from('posts')
      .select('title, user_id, post_status')
      .limit(5);
    
    if (postsError) {
      console.error('❌ Posts table verification failed:', postsError);
    } else {
      console.log('✅ Posts table updated successfully');
      console.log('📋 Sample posts:', posts);
    }
    
  } catch (error) {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run the fix
runDatabaseFix(); 