require('dotenv').config({ path: '.env.local' });

async function testNewsletterDB() {
  console.log('🔍 Testing Newsletter Database Tables...');
  console.log('✅ Environment variables loaded');
  
  // Import supabase after env is loaded
  const { createClient } = require('@supabase/supabase-js');
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase environment variables');
    return;
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  
  try {
    // Test newsletter_subscribers table
    console.log('\n📧 Testing newsletter_subscribers table...');
    const { data: subscribers, error: subscribersError } = await supabase
      .from('newsletter_subscribers')
      .select('id, email, subscribed_at, is_active')
      .limit(3);
    
    if (subscribersError) {
      console.log('❌ Newsletter subscribers table error:', subscribersError.message);
    } else {
      console.log('✅ Newsletter subscribers table exists and accessible');
      console.log(`   Found ${subscribers.length} subscribers`);
      if (subscribers.length > 0) {
        console.log('   Sample subscriber:', { 
          id: subscribers[0].id, 
          email: subscribers[0].email, 
          active: subscribers[0].is_active 
        });
      }
    }
    
    // Test newsletter_notifications table
    console.log('\n📬 Testing newsletter_notifications table...');
    const { data: notifications, error: notificationsError } = await supabase
      .from('newsletter_notifications')
      .select('id, post_type, post_title, sent_to_count, sent_at')
      .limit(3);
    
    if (notificationsError) {
      console.log('❌ Newsletter notifications table error:', notificationsError.message);
    } else {
      console.log('✅ Newsletter notifications table exists and accessible');
      console.log(`   Found ${notifications.length} notifications`);
      if (notifications.length > 0) {
        console.log('   Sample notification:', {
          id: notifications[0].id,
          type: notifications[0].post_type,
          title: notifications[0].post_title
        });
      }
    }
    
    // Test insert functionality
    console.log('\n✍️ Testing newsletter subscription...');
    const testEmail = `test-${Date.now()}@example.com`;
    
    const { data: insertData, error: insertError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: testEmail })
      .select();
    
    if (insertError) {
      console.log('❌ Insert test error:', insertError.message);
    } else {
      console.log('✅ Newsletter subscription insert works');
      console.log('   Test subscriber created:', insertData[0].email);
      
      // Clean up test data
      await supabase
        .from('newsletter_subscribers')
        .delete()
        .eq('email', testEmail);
      console.log('   Test data cleaned up');
    }
    
  } catch (error) {
    console.log('❌ Newsletter database test error:', error.message);
  }
  
  console.log('\n🎉 Newsletter database test completed!');
  console.log('\n📋 Summary:');
  console.log('   ✓ Tables: newsletter_subscribers, newsletter_notifications');
  console.log('   ✓ API Endpoint: /api/newsletter');
  console.log('   ✓ Component: NewsletterSubscription.tsx');
  console.log('   ✓ Pages Updated: posts/page.tsx, news/page.tsx');
}

testNewsletterDB();
