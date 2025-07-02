import { prisma } from './prisma-client'

function seedPosts() {
  console.log('🌱 Seeding posts...')

  interface Post {
    title: string
    content: string
    author: string
    category: string
    tags: string
    status: string
    slug: string
    featuredImage: string
  }

  const samplePosts: Post[] = [
    {
      title: 'Welcome to Our Blog',
      content: 'Welcome to our new blog platform! We are excited to share our thoughts and insights with you.',
      author: 'Admin',
      category: 'General',
      tags: 'welcome,announcement',
      status: 'PUBLISHED',
      slug: 'welcome-to-our-blog',
      featuredImage: '/uploads/welcome.jpg'
    },
    {
      title: 'Getting Started Guide',
      content: 'Learn how to use our blog platform effectively. This guide will help you get started with creating and managing your content.',
      author: 'Admin',
      category: 'Guide',
      tags: 'guide,tutorial',
      status: 'PUBLISHED',
      slug: 'getting-started-guide',
      featuredImage: '/uploads/guide.jpg'
    },
    {
      title: 'First Blog Post',
      content: 'This is your first blog post. Start writing your amazing content here!',
      author: 'Admin',
      category: 'Blog',
      tags: 'blog,first-post',
      status: 'PUBLISHED',
      slug: 'first-blog-post',
      featuredImage: '/uploads/first-post.jpg'
    }
  ]

  // Delete all existing posts first
  prisma.post.deleteMany()
  console.log('🧹 Cleared existing posts.')

  for (const post of samplePosts) {
    try {
      prisma.post.create({
        data: {
          ...post
        }
      })
      console.log(`✅ Created post: ${post.title}`)
    } catch (error) {
      console.error(`❌ Failed to create post "${post.title}":`, error)
    }
  }
}

function main() {
  console.log('🚀 Starting full database seeding process...')

  try {
    seedPosts()
    console.log('🎉 Seeding completed successfully.')
  } catch (error) {
    console.error('🔥 Seeding failed with error:', error)
    process.exit(1)
  } finally {
    prisma.$disconnect()
    console.log('🔌 Prisma disconnected.')
  }
}

main()
