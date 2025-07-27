const AWS = require('aws-sdk');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// AWS Configuration
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamo = new AWS.DynamoDB.DocumentClient();

// Supabase Configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Table mappings
const TABLES = {
  ADMIN: process.env.ADMIN_TABLE || 'Ureposh-admin',
  WRITER: process.env.WRITER_TABLE || 'ureposh-writer',
  POSTS: process.env.POSTS_TABLE || 'ureposh-post',
  COMMENTS: process.env.COMMENTS_TABLE || 'ureposh-comments',
  VIEWS: process.env.VIEWS_TABLE || 'ureposh-views'
};

async function scanDynamoTable(tableName) {
  const items = [];
  let lastEvaluatedKey = undefined;

  do {
    const params = {
      TableName: tableName,
      ...(lastEvaluatedKey && { ExclusiveStartKey: lastEvaluatedKey })
    };

    const result = await dynamo.scan(params).promise();
    items.push(...result.Items);
    lastEvaluatedKey = result.LastEvaluatedKey;
  } while (lastEvaluatedKey);

  return items;
}

async function migrateAdmins() {
  console.log('🔄 Migrating admins...');
  
  try {
    const admins = await scanDynamoTable(TABLES.ADMIN);
    
    for (const admin of admins) {
      const { data, error } = await supabase
        .from('admin')
        .upsert({
          adminUserName: admin.adminUserName,
          adminPassword: admin.adminPassword, // Assuming already hashed
          email: admin.email || `${admin.adminUserName}@ureposh.com`,
          fullName: admin.fullName || admin.adminUserName,
          role: 'admin'
        }, { onConflict: 'adminUserName' });

      if (error) {
        console.error(`❌ Error migrating admin ${admin.adminUserName}:`, error);
      } else {
        console.log(`✅ Migrated admin: ${admin.adminUserName}`);
      }
    }
    
    console.log(`✅ Completed admin migration. Total: ${admins.length}`);
  } catch (error) {
    console.error('❌ Error in admin migration:', error);
  }
}

async function migrateWriters() {
  console.log('🔄 Migrating writers...');
  
  try {
    const writers = await scanDynamoTable(TABLES.WRITER);
    
    for (const writer of writers) {
      const { data, error } = await supabase
        .from('writer')
        .upsert({
          writerId: writer.writerId,
          writerName: writer.writerName,
          writerEmail: writer.writerEmail,
          writerPassword: writer.writerPassword, // Assuming already hashed
          writerBio: writer.writerBio || '',
          writerAvatar: writer.writerAvatar || '',
          writerRole: writer.writerRole || 'writer',
          isActive: writer.isActive !== false
        }, { onConflict: 'writerId' });

      if (error) {
        console.error(`❌ Error migrating writer ${writer.writerName}:`, error);
      } else {
        console.log(`✅ Migrated writer: ${writer.writerName}`);
      }
    }
    
    console.log(`✅ Completed writer migration. Total: ${writers.length}`);
  } catch (error) {
    console.error('❌ Error in writer migration:', error);
  }
}

async function migratePosts() {
  console.log('🔄 Migrating posts...');
  
  try {
    const posts = await scanDynamoTable(TABLES.POSTS);
    
    for (const post of posts) {
      // Convert tags from string to array if needed
      let tags = [];
      if (post.tags) {
        if (typeof post.tags === 'string') {
          tags = post.tags.split(',').map(tag => tag.trim()).filter(Boolean);
        } else if (Array.isArray(post.tags)) {
          tags = post.tags;
        }
      }

      const { data, error } = await supabase
        .from('posts')
        .upsert({
          postId: post.postId,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || '',
          author: post.author || post.authorName,
          authorName: post.authorName,
          authorImage: post.authorImage || '',
          category: post.category,
          tags: tags,
          slug: post.slug || generateSlug(post.title),
          featuredImage: post.featuredImage || post.imageUrl || '',
          videoUrl: post.videoUrl || '',
          videoTitle: post.videoTitle || '',
          videoDescription: post.videoDescription || '',
          status: post.status || 'draft',
          post_status: post.post_status || 'open',
          viewCount: post.viewCount || 0,
          readTime: post.readTime || null,
          likes: post.likes || 0,
          comments: post.comments || 0,
          isFeatured: post.isFeatured || false,
          metaTitle: post.metaTitle || '',
          metaDescription: post.metaDescription || '',
          language: post.language || 'en',
          createdAt: post.createdAt || post.uploadDate || new Date().toISOString(),
          updatedAt: post.updatedAt || new Date().toISOString(),
          uploadDate: post.uploadDate || new Date().toISOString(),
          publishedAt: post.publishedAt || null,
          writerId: post.writerId || post.writerName
        }, { onConflict: 'postId' });

      if (error) {
        console.error(`❌ Error migrating post ${post.title}:`, error);
      } else {
        console.log(`✅ Migrated post: ${post.title}`);
      }
    }
    
    console.log(`✅ Completed posts migration. Total: ${posts.length}`);
  } catch (error) {
    console.error('❌ Error in posts migration:', error);
  }
}

async function migrateComments() {
  console.log('🔄 Migrating comments...');
  
  try {
    const comments = await scanDynamoTable(TABLES.COMMENTS);
    
    for (const comment of comments) {
      const { data, error } = await supabase
        .from('comments')
        .upsert({
          commentId: comment.commentId,
          postId: comment.postId,
          name: comment.name,
          email: comment.email,
          comment: comment.comment,
          avatar: comment.avatar || '',
          isApproved: comment.isApproved || false,
          createdAt: comment.createdAt || new Date().toISOString(),
          updatedAt: comment.updatedAt || new Date().toISOString()
        }, { onConflict: 'commentId' });

      if (error) {
        console.error(`❌ Error migrating comment by ${comment.name}:`, error);
      } else {
        console.log(`✅ Migrated comment by: ${comment.name}`);
      }
    }
    
    console.log(`✅ Completed comments migration. Total: ${comments.length}`);
  } catch (error) {
    console.error('❌ Error in comments migration:', error);
  }
}

async function migrateViews() {
  console.log('🔄 Migrating views...');
  
  try {
    const views = await scanDynamoTable(TABLES.VIEWS);
    
    for (const view of views) {
      const { data, error } = await supabase
        .from('views')
        .upsert({
          views_ID: view.views_ID,
          postId: view.postId,
          viewCount: view.viewCount || 0,
          ipAddress: view.ipAddress || null,
          userAgent: view.userAgent || null,
          referrer: view.referrer || null,
          viewedAt: view.viewedAt || new Date().toISOString()
        }, { onConflict: 'views_ID' });

      if (error) {
        console.error(`❌ Error migrating view for post ${view.postId}:`, error);
      } else {
        console.log(`✅ Migrated view for post: ${view.postId}`);
      }
    }
    
    console.log(`✅ Completed views migration. Total: ${views.length}`);
  } catch (error) {
    console.error('❌ Error in views migration:', error);
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log('🚀 Starting AWS to Supabase migration...');
  console.log('==========================================');
  
  // Check if Supabase is configured
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Supabase configuration missing. Please set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
  }

  // Check if AWS is configured
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('❌ AWS configuration missing. Please set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY');
    process.exit(1);
  }

  try {
    // Run migrations in order
    await migrateAdmins();
    await migrateWriters();
    await migratePosts();
    await migrateComments();
    await migrateViews();
    
    console.log('==========================================');
    console.log('✅ Migration completed successfully!');
    console.log('📊 Check your Supabase dashboard to verify the data.');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run the migration
if (require.main === module) {
  main();
}

module.exports = {
  migrateAdmins,
  migrateWriters,
  migratePosts,
  migrateComments,
  migrateViews
}; 