const { createAdminClient } = require('./utils/supabase/admin');

async function checkDatabaseSchema() {
  try {
    console.log('Checking database schema...');
    
    const supabase = createAdminClient();
    
    // Get table information
    const { data: tables, error: tableError } = await supabase
      .from('information_schema.columns')
      .select('table_name, column_name, data_type, is_nullable')
      .eq('table_name', 'posts')
      .order('ordinal_position');
    
    if (tableError) {
      console.error('Error getting schema:', tableError);
      return;
    }
    
    console.log('✅ Posts table columns:');
    tables.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    // Try to get a sample post to see the structure
    const { data: samplePost, error: postError } = await supabase
      .from('posts')
      .select('*')
      .limit(1);
    
    if (postError) {
      console.error('Error getting sample post:', postError);
    } else if (samplePost && samplePost.length > 0) {
      console.log('\n✅ Sample post structure:');
      console.log(JSON.stringify(samplePost[0], null, 2));
    }
    
  } catch (error) {
    console.error('Check failed:', error);
  }
}

checkDatabaseSchema(); 