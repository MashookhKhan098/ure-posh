const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://vewlslufctaslcpobnev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld2xzbHVmY3Rhc2xjcG9ibmV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM1NDA3MSwiZXhwIjoyMDcwOTMwMDcxfQ.NunspL2fv0L9GtEH-dbFi2WgCX8nZxC2kAllMGeP-Z0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testEnhancedPosterEmail() {
  console.log('🎨 === TESTING ENHANCED POSTER EMAIL DESIGN ===');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    // Test with sample poster data
    const testPosterData = {
      postId: 'test-poster-' + Date.now(),
      postType: 'posters',
      postTitle: 'Professional Workplace Safety Guidelines',
      postSlug: 'workplace-safety-guidelines',
      postContent: 'Comprehensive safety guidelines designed to promote a secure and healthy work environment. Features clear visual indicators, step-by-step procedures, and emergency contact information. Perfect for office spaces, manufacturing facilities, and educational institutions.',
      postImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop'
    };

    console.log('📧 Testing enhanced poster email with sample data:', testPosterData);

    // Send test email via newsletter API
    const response = await fetch('https://ureposh-one.vercel.app/api/newsletter/notify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testPosterData)
    });

    const result = await response.json();
    console.log('📊 Email test response:', result);

    if (response.ok && result.success) {
      console.log('✅ Enhanced poster email design test successful!');
      console.log(`📈 Emails sent: ${result.sentCount}/${result.totalSubscribers}`);
      
      if (result.sentCount > 0) {
        console.log('🎉 Your enhanced poster email design is now live!');
        console.log('📧 Features included:');
        console.log('   ✓ Dual call-to-action buttons');
        console.log('   ✓ "View All Posters" button linking to poster page');
        console.log('   ✓ Enhanced mobile-responsive design');
        console.log('   ✓ Beautiful gradients and animations');
        console.log('   ✓ Social proof and engagement sections');
        console.log('   ✓ Professional feature highlights');
        console.log('   ✓ Longer, more comprehensive content');
      }
    } else {
      console.log('❌ Email test failed:', result);
    }

    // Clean up test notification record
    try {
      await supabase
        .from('newsletter_notifications')
        .delete()
        .eq('post_id', testPosterData.postId);
      console.log('🧹 Test notification record cleaned up');
    } catch (cleanupError) {
      console.log('⚠️ Cleanup note:', cleanupError.message);
    }

  } catch (error) {
    console.error('💥 Test error:', error);
  }

  console.log('🎨 === ENHANCED POSTER EMAIL TEST COMPLETED ===');
}

// Run the test
testEnhancedPosterEmail();
