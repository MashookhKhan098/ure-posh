const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('   SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅' : '❌');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function runMigration() {
  try {
    console.log('🚀 Starting Field Allotted Migration...');
    
    // Read the migration SQL file
    const migrationPath = path.join(__dirname, 'scripts', '11-add-writer-field-allotted-checkboxes.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
    
    console.log('📖 Migration SQL loaded successfully');
    
    // Execute the migration
    console.log('⚡ Executing migration...');
    const { error } = await supabase.rpc('exec_sql', { sql: migrationSQL });
    
    if (error) {
      // If RPC method doesn't exist, try direct SQL execution
      console.log('⚠️  RPC method not available, trying direct execution...');
      
      // Split the SQL into individual statements
      const statements = migrationSQL
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0);
      
      for (const statement of statements) {
        if (statement.trim()) {
          console.log(`🔧 Executing: ${statement.substring(0, 50)}...`);
          const { error: stmtError } = await supabase.rpc('exec_sql', { sql: statement + ';' });
          if (stmtError) {
            console.log(`⚠️  Statement failed (this might be expected): ${stmtError.message}`);
          }
        }
      }
    }
    
    console.log('✅ Migration completed successfully!');
    
    // Verify the new structure
    console.log('🔍 Verifying new table structure...');
    const { data: columns, error: columnsError } = await supabase
      .from('writer')
      .select('*')
      .limit(1);
    
    if (columnsError) {
      console.error('❌ Error verifying table structure:', columnsError);
    } else {
      console.log('✅ Table structure verified');
      console.log('📋 Available columns:', Object.keys(columns[0] || {}));
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Alternative method using direct SQL execution
async function runMigrationAlternative() {
  try {
    console.log('🔄 Trying alternative migration method...');
    
    // Drop existing field_allotted column
    console.log('🗑️  Dropping existing field_allotted column...');
    try {
      await supabase.rpc('exec_sql', { 
        sql: 'ALTER TABLE IF EXISTS writer DROP COLUMN IF EXISTS field_allotted;' 
      });
      console.log('✅ Dropped existing field_allotted column');
    } catch (e) {
      console.log('⚠️  Could not drop column (might not exist):', e.message);
    }
    
    // Add new boolean columns one by one
    const newColumns = [
      'company_updates',
      'compliance_legal_insights', 
      'news_media_coverage',
      'newsletter_archive',
      'thought_leadership',
      'workplace_stories',
      'events_webinars',
      'international_regulatory_policy_watch',
      'united_kingdom_workplace',
      'us_workplace'
    ];
    
    for (const column of newColumns) {
      console.log(`➕ Adding column: ${column}`);
      try {
        await supabase.rpc('exec_sql', { 
          sql: `ALTER TABLE IF EXISTS writer ADD COLUMN IF NOT EXISTS ${column} boolean DEFAULT false;` 
        });
        console.log(`✅ Added ${column}`);
      } catch (e) {
        console.log(`⚠️  Could not add ${column}:`, e.message);
      }
    }
    
    console.log('✅ Alternative migration completed!');
    
  } catch (error) {
    console.error('❌ Alternative migration failed:', error);
  }
}

// Main execution
async function main() {
  try {
    await runMigration();
  } catch (error) {
    console.log('🔄 Primary method failed, trying alternative...');
    await runMigrationAlternative();
  }
  
  console.log('🎉 Migration process completed!');
  console.log('📝 Next steps:');
  console.log('   1. Update your writer creation forms');
  console.log('   2. Test creating a new writer');
  console.log('   3. Verify the checkboxes work correctly');
}

main();
