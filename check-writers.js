const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://vewlslufctaslcpobnev.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld2xzbHVmY3Rhc2xjcG9ibmV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM1NDA3MSwiZXhwIjoyMDcwOTMwMDcxfQ.NunspL2fv0L9GtEH-dbFi2WgCX8nZxC2kAllMGeP-Z0';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkWriters() {
  try {
    console.log('Checking writer table...');
    const { data: writerData, error: writerError } = await supabase
      .from('writer')
      .select('*')
      .limit(10);
    
    if (writerError) {
      console.log('Writer table error:', writerError.message);
    } else {
      console.log('Writer table count:', writerData?.length || 0);
      if (writerData && writerData.length > 0) {
        console.log('All writers:', JSON.stringify(writerData, null, 2));
        
        // Transform the data like the API does
        const transformedWriters = writerData.map(writer => ({
          id: writer.id,
          name: writer.full_name,
          username: writer.username,
          email: writer.email || `${writer.username}@example.com`, // API might be missing this
          status: writer.is_active ? 'Active' : 'Inactive',
          joinDate: writer.created_at ? new Date(writer.created_at).toISOString().split('T')[0] : '',
          postsCount: 0, // This would need a separate query to count posts by author
          publishedCount: 0,
          draftCount: 0,
          verified: writer.verified,
          bio: writer.bio,
          specializations: [writer.field_allotted, writer.expertise].filter(Boolean),
          lastActive: writer.updated_at ? new Date(writer.updated_at).toISOString().split('T')[0] : 'Never',
          avatar: writer.full_name ? writer.full_name.split(' ').map((n) => n[0]).join('').toUpperCase() : 'U'
        }));
        
        console.log('\nTransformed writers for API:', JSON.stringify(transformedWriters, null, 2));
      }
    }

  } catch (err) {
    console.error('Error:', err.message);
  }
}

checkWriters();
