const { createAdminClient } = require('./utils/supabase/admin');

async function testAdminClient() {
  try {
    console.log('Testing admin client...');
    
    const supabase = createAdminClient();
    
    // Test database access
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Database error:', error);
      return;
    }
    
    console.log('✅ Admin client working!');
    console.log('Posts count:', posts?.length || 0);
    
    // Test storage access
    const { data: buckets, error: bucketError } = await supabase.storage.listBuckets();
    
    if (bucketError) {
      console.error('Storage error:', bucketError);
    } else {
      console.log('✅ Storage access working!');
      console.log('Buckets:', buckets?.map(b => b.name) || []);
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAdminClient(); 