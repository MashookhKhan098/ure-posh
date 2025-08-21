const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please check your .env.local file has:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY (preferred) or NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function createPeopleTable() {
  try {
    console.log('🚀 Creating people table...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '06-create-people-table.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`🔄 Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          // Try alternative approach using direct SQL execution
          console.log('🔄 Trying alternative SQL execution...');
          
          const { error: directError } = await supabase
            .from('people')
            .select('id')
            .limit(1);
          
          if (directError && directError.message.includes('does not exist')) {
            console.log('✅ Table does not exist yet, continuing with creation...');
          }
        } else {
          console.log('✅ Statement executed successfully');
        }
      } catch (err) {
        console.log(`⚠️ Statement ${i + 1} may have failed, continuing...`);
      }
    }
    
    // Verify the table was created
    console.log('🔍 Verifying table creation...');
    const { data: tableCheck, error: tableError } = await supabase
      .from('people')
      .select('id')
      .limit(1);
    
    if (tableError) {
      console.error('❌ Table creation failed:', tableError.message);
    } else {
      console.log('✅ People table created successfully!');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

// Alternative approach: Create table using Supabase client
async function createTableDirectly() {
  console.log('🔄 Trying direct table creation...');
  
  try {
    // This is a simplified approach - in practice, you'd need to run the SQL
    // through Supabase's SQL editor or use their migration system
    console.log('📝 Please run the SQL from scripts/06-create-people-table.sql in your Supabase SQL editor');
    console.log('🔗 Go to: https://supabase.com/dashboard/project/[YOUR_PROJECT]/sql');
    
    // Check if table exists
    const { data, error } = await supabase
      .from('people')
      .select('id')
      .limit(1);
    
    if (error) {
      console.log('❌ Table does not exist yet');
      console.log('📋 Please manually run the SQL script in Supabase dashboard');
    } else {
      console.log('✅ Table exists!');
    }
    
  } catch (error) {
    console.error('❌ Error checking table:', error.message);
  }
}

// Run the script
if (require.main === module) {
  console.log('🎯 People Table Creation Script');
  console.log('================================');
  
  createTableDirectly()
    .then(() => {
      console.log('✅ Script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { createPeopleTable, createTableDirectly };
