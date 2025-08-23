const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testFieldAllotted() {
  try {
    console.log('🧪 Testing Field Allotted Structure...');
    
    // Test creating a writer with new fields
    const testWriter = {
      username: 'test_writer_' + Date.now(),
      full_name: 'Test Writer',
      password_hash: 'test_hash',
      bio: 'Test bio',
      phone: '1234567890',
      is_active: true,
      company_updates: true,
      compliance_legal_insights: false,
      news_media_coverage: true,
      newsletter_archive: false,
      thought_leadership: true,
      workplace_stories: false,
      events_webinars: true,
      international_regulatory_policy_watch: false,
      united_kingdom_workplace: true,
      us_workplace: false
    };
    
    console.log('📝 Creating test writer...');
    const { data: createdWriter, error: createError } = await supabase
      .from('writer')
      .insert(testWriter)
      .select()
      .single();
    
    if (createError) {
      console.error('❌ Error creating test writer:', createError);
      return;
    }
    
    console.log('✅ Test writer created successfully!');
    console.log('📋 Writer data:', createdWriter);
    
    // Test fetching the writer
    console.log('🔍 Fetching test writer...');
    const { data: fetchedWriter, error: fetchError } = await supabase
      .from('writer')
      .select('*')
      .eq('id', createdWriter.id)
      .single();
    
    if (fetchError) {
      console.error('❌ Error fetching test writer:', fetchError);
    } else {
      console.log('✅ Test writer fetched successfully!');
      console.log('📋 Fetched data:', fetchedWriter);
      
      // Verify all boolean fields are present
      const expectedFields = [
        'company_updates', 'compliance_legal_insights', 'news_media_coverage',
        'newsletter_archive', 'thought_leadership', 'workplace_stories',
        'events_webinars', 'international_regulatory_policy_watch',
        'united_kingdom_workplace', 'us_workplace'
      ];
      
      const missingFields = expectedFields.filter(field => !(field in fetchedWriter));
      if (missingFields.length > 0) {
        console.error('❌ Missing fields:', missingFields);
      } else {
        console.log('✅ All expected fields are present!');
      }
    }
    
    // Clean up - delete test writer
    console.log('🧹 Cleaning up test writer...');
    const { error: deleteError } = await supabase
      .from('writer')
      .delete()
      .eq('id', createdWriter.id);
    
    if (deleteError) {
      console.error('⚠️  Could not delete test writer:', deleteError);
    } else {
      console.log('✅ Test writer deleted successfully!');
    }
    
    console.log('🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testFieldAllotted();
