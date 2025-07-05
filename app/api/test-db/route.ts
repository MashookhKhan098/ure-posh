import { NextResponse } from 'next/server'
import prisma from '@/lib/database'

export async function GET() {
  try {
    // Test the database connection
    await prisma.$connect()
    
    // Count the number of posts
    const postCount = await prisma.post.count()
    
    // Get the first few posts
    const posts = await prisma.post.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true
      }
    })
    
    return NextResponse.json({
      success: true,
      postCount,
      posts,
      message: 'Database connection successful!'
    })
    
  } catch (error) {
    console.error('Database connection error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to connect to database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
