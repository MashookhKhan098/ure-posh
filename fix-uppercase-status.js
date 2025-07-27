require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');

// Use existing Supabase configuration from .env
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function fixUppercaseStatus() {
  try {
    console.log('🔍 Fixing Uppercase Status Issues...');
    
    // Get all posts with uppercase status
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .or('status.eq.PUBLISHED,status.eq.DRAFT,status.eq.REJECTED');
    
    if (error) {
      console.error('❌ Error fetching posts:', error);
      return;
    }
    
    console.log(`✅ Found ${posts.length} posts with uppercase status`);
    
    if (posts.length === 0) {
      console.log('✅ No posts with uppercase status found');
      return;
    }
    
    console.log('\n📋 Posts with uppercase status:');
    posts.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`);
      console.log(`   Current Status: ${post.status}`);
      console.log(`   Author: ${post.author}`);
      console.log('');
    });
    
    // Fix each post
    for (const post of posts) {
      const newStatus = post.status.toLowerCase();
      console.log(`🔄 Fixing "${post.title}" status from "${post.status}" to "${newStatus}"`);
      
      const { error: updateError } = await supabase
        .from('posts')
        .update({ status: newStatus })
        .eq('id', post.id);
      
      if (updateError) {
        console.error(`❌ Failed to update "${post.title}":`, updateError);
      } else {
        console.log(`✅ Fixed status for "${post.title}"`);
      }
    }
    
    // Verify the fix
    console.log('\n🔍 Verifying fix...');
    const { data: verifyPosts, error: verifyError } = await supabase
      .from('posts')
      .select('*');
    
    if (verifyError) {
      console.error('❌ Error verifying posts:', verifyError);
      return;
    }
    
    const publishedPosts = verifyPosts.filter(p => p.status === 'published');
    const draftPosts = verifyPosts.filter(p => p.status === 'draft');
    const rejectedPosts = verifyPosts.filter(p => p.status === 'rejected');
    const otherPosts = verifyPosts.filter(p => !['published', 'draft', 'rejected'].includes(p.status));
    
    console.log(`\n📊 Updated Status Breakdown:`);
    console.log(`   Published (lowercase): ${publishedPosts.length}`);
    console.log(`   Draft (lowercase): ${draftPosts.length}`);
    console.log(`   Rejected (lowercase): ${rejectedPosts.length}`);
    console.log(`   Other: ${otherPosts.length}`);
    
    if (otherPosts.length > 0) {
      console.log('\n⚠️  Posts with unexpected status:');
      otherPosts.forEach(post => {
        console.log(`   - ${post.title}: ${post.status}`);
      });
    }
    
    console.log('\n🎉 Uppercase Status Fix Complete!');
    console.log('💡 All posts now have consistent lowercase status values');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

fixUppercaseStatus(); 