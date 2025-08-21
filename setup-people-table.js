const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please check your .env.local file has:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupPeopleTable() {
  try {
    console.log('🚀 Setting up people table...');
    
    // Read the complete setup SQL file
    const sqlPath = path.join(__dirname, 'scripts', '10-complete-people-setup.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');
    
    console.log('📝 SQL file loaded successfully');
    
    // Split the SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
    
    console.log(`📋 Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      console.log(`🔄 Executing statement ${i + 1}/${statements.length}...`);
      
      try {
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        
        if (error) {
          console.error(`❌ Error executing statement ${i + 1}:`, error.message);
          console.log('Statement:', statement.substring(0, 100) + '...');
        } else {
          console.log('✅ Statement executed successfully');
        }
      } catch (err) {
        console.error(`❌ Exception executing statement ${i + 1}:`, err.message);
      }
    }
    
    // Verify the setup
    console.log('\n🔍 Verifying setup...');
    const { data: peopleData, error: verifyError } = await supabase
      .from('people')
      .select('*')
      .limit(5);
    
    if (verifyError) {
      console.error('❌ Verification failed:', verifyError.message);
    } else {
      console.log('✅ People table setup verified');
      console.log(`   Found ${peopleData?.length || 0} people in the table`);
      
      if (peopleData && peopleData.length > 0) {
        console.log('\n📋 Sample data:');
        peopleData.forEach((person, index) => {
          console.log(`   ${index + 1}. ${person.name} - ${person.title}`);
        });
      }
    }
    
    console.log('\n🎉 People table setup completed!');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
  }
}

setupPeopleTable();
