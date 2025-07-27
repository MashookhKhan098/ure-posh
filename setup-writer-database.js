const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Writer database configuration
const writerSupabaseUrl = process.env.NEXT_PUBLIC_WRITER_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const writerSupabaseServiceKey = process.env.WRITER_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!writerSupabaseUrl || !writerSupabaseServiceKey) {
  console.error('Missing writer database environment variables');
  process.exit(1);
}

const supabase = createClient(writerSupabaseUrl, writerSupabaseServiceKey);

async function setupWriterDatabase() {
  try {
    console.log('🚀 Setting up writer database...');

    // Hash password for writers
    const hashedPassword = await bcrypt.hash('ureposh2024', 10);

    // Insert sample writer profiles
    const writers = [
      {
        writer_id: 'writer-001',
        username: 'jane_doe',
        email: 'jane@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Jane Doe',
        bio: 'Experienced writer focusing on workplace safety and compliance',
        specialization: 'Workplace Safety',
        experience_level: 'expert',
        is_verified: true
      },
      {
        writer_id: 'writer-002',
        username: 'priya_sharma',
        email: 'priya@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Priya Sharma',
        bio: 'Legal expert specializing in POSH compliance and women safety',
        specialization: 'Legal Compliance',
        experience_level: 'expert',
        is_verified: true
      },
      {
        writer_id: 'writer-003',
        username: 'sarah_johnson',
        email: 'sarah@ureposh.com',
        password_hash: hashedPassword,
        full_name: 'Sarah Johnson',
        bio: 'HR professional with expertise in workplace harassment prevention',
        specialization: 'HR & Compliance',
        experience_level: 'intermediate',
        is_verified: true
      }
    ];

    console.log('📝 Inserting writer profiles...');
    for (const writer of writers) {
      const { error } = await supabase
        .from('writer_profiles')
        .upsert(writer, { onConflict: 'writer_id' });

      if (error) {
        console.error(`Error inserting writer ${writer.username}:`, error);
      } else {
        console.log(`✅ Inserted writer: ${writer.username}`);
      }
    }

    // Insert writer preferences
    console.log('⚙️ Setting up writer preferences...');
    const preferences = [
      {
        writer_id: 'writer-001',
        email_notifications: true,
        push_notifications: true,
        default_category: 'Workplace Safety',
        default_tags: ['safety', 'compliance', 'prevention']
      },
      {
        writer_id: 'writer-002',
        email_notifications: true,
        push_notifications: true,
        default_category: 'Legal Compliance',
        default_tags: ['legal', 'posh', 'compliance']
      },
      {
        writer_id: 'writer-003',
        email_notifications: true,
        push_notifications: false,
        default_category: 'Women Safety',
        default_tags: ['women-safety', 'empowerment', 'awareness']
      }
    ];

    for (const pref of preferences) {
      const { error } = await supabase
        .from('writer_preferences')
        .upsert(pref, { onConflict: 'writer_id' });

      if (error) {
        console.error(`Error inserting preferences for ${pref.writer_id}:`, error);
      } else {
        console.log(`✅ Inserted preferences for: ${pref.writer_id}`);
      }
    }

    // Insert writer statistics
    console.log('📊 Setting up writer statistics...');
    const statistics = [
      {
        writer_id: 'writer-001',
        total_posts: 5,
        published_posts: 3,
        pending_posts: 1,
        rejected_posts: 1,
        total_views: 1250,
        total_likes: 45,
        total_comments: 12
      },
      {
        writer_id: 'writer-002',
        total_posts: 3,
        published_posts: 2,
        pending_posts: 1,
        rejected_posts: 0,
        total_views: 890,
        total_likes: 32,
        total_comments: 8
      },
      {
        writer_id: 'writer-003',
        total_posts: 2,
        published_posts: 1,
        pending_posts: 1,
        rejected_posts: 0,
        total_views: 450,
        total_likes: 18,
        total_comments: 5
      }
    ];

    for (const stat of statistics) {
      const { error } = await supabase
        .from('writer_statistics')
        .upsert(stat, { onConflict: 'writer_id' });

      if (error) {
        console.error(`Error inserting statistics for ${stat.writer_id}:`, error);
      } else {
        console.log(`✅ Inserted statistics for: ${stat.writer_id}`);
      }
    }

    // Insert sample writer posts
    console.log('📝 Inserting sample writer posts...');
    const samplePosts = [
      {
        post_id: 'writer-post-001',
        writer_id: 'writer-001',
        title: 'Understanding Workplace Harassment Prevention',
        content: 'Workplace harassment is a serious issue that affects millions of employees worldwide...',
        excerpt: 'Learn about the key aspects of preventing workplace harassment and creating a safe environment for all employees.',
        category: 'Workplace Safety',
        tags: ['harassment', 'prevention', 'workplace', 'safety'],
        slug: 'understanding-workplace-harassment-prevention',
        status: 'published',
        approval_status: 'approved',
        read_time: 5,
        is_draft: false,
        is_submitted: true
      },
      {
        post_id: 'writer-post-002',
        writer_id: 'writer-002',
        title: 'Legal Aspects of POSH Compliance',
        content: 'The Prevention of Sexual Harassment (POSH) Act, 2013, is a landmark legislation...',
        excerpt: 'Understanding the legal aspects of POSH compliance is crucial for both employers and employees.',
        category: 'Legal Compliance',
        tags: ['posh', 'legal', 'compliance', 'harassment'],
        slug: 'legal-aspects-of-posh-compliance',
        status: 'published',
        approval_status: 'approved',
        read_time: 8,
        is_draft: false,
        is_submitted: true
      },
      {
        post_id: 'writer-post-003',
        writer_id: 'writer-001',
        title: 'Creating Safe Digital Spaces for Women',
        content: 'In today\'s digital age, women face unique challenges online...',
        excerpt: 'Explore strategies for creating safer digital environments for women.',
        category: 'Women Safety',
        tags: ['women-safety', 'digital', 'online', 'empowerment'],
        slug: 'creating-safe-digital-spaces-for-women',
        status: 'draft',
        approval_status: 'pending',
        read_time: 6,
        is_draft: true,
        is_submitted: false
      }
    ];

    for (const post of samplePosts) {
      const { error } = await supabase
        .from('writer_posts')
        .upsert(post, { onConflict: 'post_id' });

      if (error) {
        console.error(`Error inserting post ${post.post_id}:`, error);
      } else {
        console.log(`✅ Inserted post: ${post.title}`);
      }
    }

    // Insert sample notifications
    console.log('🔔 Setting up sample notifications...');
    const notifications = [
      {
        writer_id: 'writer-001',
        type: 'post_approved',
        title: 'Post Approved',
        message: 'Your post "Understanding Workplace Harassment Prevention" has been approved and is now live!',
        post_id: 'writer-post-001',
        is_read: false
      },
      {
        writer_id: 'writer-002',
        type: 'post_approved',
        title: 'Post Approved',
        message: 'Your post "Legal Aspects of POSH Compliance" has been approved and is now live!',
        post_id: 'writer-post-002',
        is_read: false
      }
    ];

    for (const notif of notifications) {
      const { error } = await supabase
        .from('writer_notifications')
        .insert(notif);

      if (error) {
        console.error(`Error inserting notification:`, error);
      } else {
        console.log(`✅ Inserted notification for: ${notif.writer_id}`);
      }
    }

    console.log('🎉 Writer database setup completed successfully!');
    console.log('\n📋 Available writer accounts:');
    console.log('Username: jane_doe, Password: ureposh2024');
    console.log('Username: priya_sharma, Password: ureposh2024');
    console.log('Username: sarah_johnson, Password: ureposh2024');

  } catch (error) {
    console.error('❌ Error setting up writer database:', error);
    process.exit(1);
  }
}

// Run the setup
setupWriterDatabase(); 