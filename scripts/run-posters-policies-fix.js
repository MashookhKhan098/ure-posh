const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing environment variables');
  console.log('SUPABASE_URL:', supabaseUrl ? 'Present' : 'Missing');
  console.log('SERVICE_ROLE_KEY:', serviceRoleKey ? 'Present' : 'Missing');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function fixPostersPolicies() {
  try {
    console.log('🔧 Fixing posters table RLS policies...');
    
    const sqlFile = path.join(__dirname, '12-fix-posters-policies.sql');
    const sql = fs.readFileSync(sqlFile, 'utf8');
    
    // Split SQL file into individual statements
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt && !stmt.startsWith('--') && stmt !== '```sql' && stmt !== '```');
    
    console.log(`📝 Found ${statements.length} SQL statements to execute`);
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (!statement) continue;
      
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);
      console.log(`SQL: ${statement.substring(0, 100)}${statement.length > 100 ? '...' : ''}`);
      
      const { data, error } = await supabase.rpc('exec_sql', { 
        sql_query: statement + ';' 
      });
      
      if (error) {
        console.error(`❌ Error executing statement ${i + 1}:`, error);
        // Continue with other statements
      } else {
        console.log(`✅ Statement ${i + 1} executed successfully`);
        if (data) {
          console.log('Result:', data);
        }
      }
    }
    
    console.log('🎉 Posters RLS policies update completed!');
    
  } catch (error) {
    console.error('❌ Error fixing posters policies:', error);
    process.exit(1);
  }
}

fixPostersPolicies();
