import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const posts = [
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
  }
]

async function main() {
  console.log('Seeding database...')
  
  // Create initial posts
  for (const post of posts) {
    await prisma.post.create({
      data: post
    })
  }
  
  console.log('Database seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
