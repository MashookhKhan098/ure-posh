const { createClient } = require('@supabase/supabase-js');

// You'll need to set these environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  console.log('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function runMigration() {
  try {
    console.log('Running migration to add subtitle column...');
    
    // Add subtitle column
    const { error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE posts ADD COLUMN IF NOT EXISTS subtitle VARCHAR(500);'
    });
    
    if (error) {
      console.error('Migration failed:', error);
      return;
    }
    
    console.log('✅ Migration completed successfully!');
    console.log('The subtitle column has been added to the posts table.');
    
  } catch (error) {
    console.error('Migration error:', error);
  }
}

runMigration(); 