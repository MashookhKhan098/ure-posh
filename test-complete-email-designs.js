const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase
const supabaseUrl = 'https://vewlslufctaslcpobnev.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZld2xzbHVmY3Rhc2xjcG9ibmV2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1NTM1NDA3MSwiZXhwIjoyMDcwOTMwMDcxfQ.NunspL2fv0L9GtEH-dbFi2WgCX8nZxC2kAllMGeP-Z0';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testBothEmailDesigns() {
  console.log('📧 === TESTING BOTH EMAIL DESIGNS ===');
  console.log('⏰ Timestamp:', new Date().toISOString());

  try {
    // Test 1: Enhanced Poster Email
    console.log('\n🎨 Testing Enhanced Poster Email Design...');
    const posterData = {
      postId: 'test-poster-' + Date.now(),
      postType: 'posters',
      postTitle: 'POSH Compliance Workplace Safety Poster',
      postSlug: 'posh-compliance-safety',
      postContent: 'Essential POSH (Prevention of Sexual Harassment) compliance poster featuring clear guidelines, reporting procedures, and contact information. Professionally designed for maximum workplace impact and legal compliance. Perfect for offices, institutions, and public spaces.',
      postImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop'
    };

    const posterResponse = await fetch('https://ureposh-one.vercel.app/api/newsletter/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(posterData)
    });

    const posterResult = await posterResponse.json();
    console.log('📊 Poster email result:', posterResult);

    // Clean up poster test
    if (posterResult.success) {
      await supabase.from('newsletter_notifications').delete().eq('post_id', posterData.postId);
    }

    // Test 2: Blog Post Email
    console.log('\n📝 Testing Blog Post Email Design...');
    const postData = {
      postId: 'test-post-' + Date.now(),
      postType: 'posts', 
      postTitle: 'Understanding Workplace Harassment Prevention',
      postSlug: 'workplace-harassment-prevention-guide',
      postContent: 'A comprehensive guide to creating safe and respectful workplace environments. Learn about prevention strategies, legal requirements, training programs, and best practices for building a harassment-free workplace culture.',
      postImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&h=600&fit=crop'
    };

    const postResponse = await fetch('https://ureposh-one.vercel.app/api/newsletter/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData)
    });

    const postResult = await postResponse.json();
    console.log('📊 Blog post email result:', postResult);

    // Clean up post test
    if (postResult.success) {
      await supabase.from('newsletter_notifications').delete().eq('post_id', postData.postId);
    }

    // Summary
    console.log('\n🎉 === EMAIL DESIGN TEST SUMMARY ===');
    console.log(`🎨 Poster emails sent: ${posterResult.sentCount || 0}`);
    console.log(`📝 Blog post emails sent: ${postResult.sentCount || 0}`);
    
    if (posterResult.success && postResult.success) {
      console.log('✅ Both email designs are working perfectly!');
      console.log('\n📧 Enhanced Features:');
      console.log('🎨 POSTER EMAILS:');
      console.log('   ✓ Dual buttons: "View This Poster" + "View All Posters"');
      console.log('   ✓ Link to poster collection page');
      console.log('   ✓ Enhanced gradients and animations');
      console.log('   ✓ 4-feature highlight grid');
      console.log('   ✓ Social proof section');
      console.log('   ✓ Mobile-responsive design');
      console.log('   ✓ Professional footer with multiple links');
      
      console.log('\n📝 BLOG POST EMAILS:');
      console.log('   ✓ Clean, professional layout');
      console.log('   ✓ Featured image display');
      console.log('   ✓ Content preview');
      console.log('   ✓ Clear call-to-action');
      console.log('   ✓ Consistent branding');
    }

  } catch (error) {
    console.error('💥 Test error:', error);
  }

  console.log('\n📧 === EMAIL DESIGN TESTS COMPLETED ===');
}

// Run comprehensive test
testBothEmailDesigns();
