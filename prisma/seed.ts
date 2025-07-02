import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')
  
  try {
    // First, delete all existing posts
    await prisma.post.deleteMany()
    console.log('🧹 Deleted existing posts')

    // Create sample posts
    const samplePosts = [
      {
        title: 'Welcome to Our Blog',
        content: 'Welcome to our new blog platform! We are excited to share our thoughts and insights with you.',
        author: 'Admin',
        category: 'General',
        tags: 'welcome, announcement',
        status: 'PUBLISHED',
        slug: 'welcome-to-our-blog',
        featuredImage: '/uploads/welcome.jpg'
      },
      {
        title: 'Getting Started Guide',
        content: 'Learn how to use our blog platform effectively. This guide will help you get started with creating and managing your content.',
        author: 'Admin',
        category: 'Guide',
        tags: 'guide, tutorial',
        status: 'PUBLISHED',
        slug: 'getting-started-guide',
        featuredImage: '/uploads/guide.jpg'
      },
      {
        title: 'First Blog Post',
        content: 'This is your first blog post. Start writing your amazing content here!',
        author: 'Admin',
        category: 'Blog',
        tags: 'blog, first-post',
        status: 'PUBLISHED',
        slug: 'first-blog-post',
        featuredImage: '/uploads/first-post.jpg'
      }
    ]

    // Create posts
    for (const post of samplePosts) {
      try {
        await prisma.post.create({
          data: {
            ...post,
            tags: post.tags,
            status: post.status || 'PUBLISHED'
          }
        })
        console.log(`✅ Created post: ${post.title}`)
      } catch (error) {
        console.error(`❌ Error creating post ${post.title}:`, error)
      }
    }

    console.log('🌱 Database seeding completed successfully')
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
