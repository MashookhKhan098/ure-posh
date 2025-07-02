// /app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join } from 'path'

const UPLOADS_DIR = join(process.cwd(), 'public', 'uploads')

// ─────────────────────────────────────────────────────────
// GET /api/posts - Fetch all posts or a single post by slug
// ─────────────────────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    
    // If no slug, return all posts with pagination
    if (!slug) {
      try {
        const page = parseInt(searchParams.get('page') || '1')
        const pageSize = 12
        const skip = (page - 1) * pageSize

        const [posts, total] = await Promise.all([
          prisma.post.findMany({
            where: { status: 'PUBLISHED' },
            select: {
              id: true,
              title: true,
              slug: true,
              content: true,
              featuredImage: true,
              category: true,
              tags: true,
              author: true,
              createdAt: true,
              updatedAt: true,
              status: true
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: pageSize
          }),
          prisma.post.count({ where: { status: 'PUBLISHED' } })
        ])

        return NextResponse.json({
          posts: posts.map(post => ({
            ...post,
            tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
          })),
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize)
        }, {
          headers: {
            'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
          }
        })
      } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json(
          { error: 'Failed to fetch posts' },
          { status: 500 }
        )
      }
    }
    
    if (slug) {
      const post = await prisma.post.findUnique({
        where: { slug },
        select: {
          id: true,
          title: true,
          content: true,
          author: true,
          category: true,
          createdAt: true,
          updatedAt: true,
          featuredImage: true,
          tags: true,
          slug: true
        }
      })

      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 })
      }

      return NextResponse.json({
        ...post,
        tags: post.tags ? post.tags.split(',').map(tag => tag.trim()) : []
      })
    }

    // Multiple posts request with pagination and optimization
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = 12
    const skip = (page - 1) * pageSize

    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          createdAt: true,
          author: true,
          featuredImage: true,
          tags: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: pageSize
      }),
      prisma.post.count()
    ])

    // Convert tags from string to array for each post
    const postsWithArrayTags = posts.map(post => ({
      ...post,
      tags: typeof post.tags === 'string' 
        ? post.tags.split(',').map((tag: string) => tag.trim()) 
        : post.tags || []
    }))

    return NextResponse.json({
      posts: postsWithArrayTags,
      total,
      page,
      pageSize
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    })
  } catch (error) {
    console.error('GET /api/posts error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

// ─────────────────────────────────────────────────────
// POST /api/posts - Create a post with featured image
// ─────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    // Parse the form data
    const formData = await request.formData()
    
    // Extract text fields
    const title = formData.get('title')?.toString()
    const content = formData.get('content')?.toString()
    const author = formData.get('author')?.toString()
    const category = formData.get('category')?.toString()
    const tagsStr = formData.get('tags')?.toString() || ''
    const slug = formData.get('slug')?.toString()
    const featuredImage = formData.get('featuredImage') as File | null

    // Validate required fields
    if (!title || !content || !author || !category || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields' }, 
        { status: 400 }
      )
    }

    if (!featuredImage) {
      return NextResponse.json(
        { error: 'Featured image is required' }, 
        { status: 400 }
      )
    }

    // Parse tags
    const tags = tagsStr.split(',').map(tag => tag.trim()).filter(Boolean)
    const tagsForDb = tags.join(',')

    try {
      // Create uploads directory if it doesn't exist
      if (!existsSync(UPLOADS_DIR)) {
        await mkdir(UPLOADS_DIR, { recursive: true })
      }

      // Generate unique filename
      const timestamp = Date.now()
      const fileExt = featuredImage.name.split('.').pop()?.toLowerCase()
      
      // Clean the title for filename
      const cleanTitle = title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Remove multiple hyphens
        .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
      
      const filename = `${cleanTitle}-${timestamp}.${fileExt}`
      const relativePath = `/uploads/${filename}`
      const filePath = join(process.cwd(), 'public', relativePath.substring(1))

      // Convert file to buffer and save
      const bytes = await featuredImage.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // Create the post in the database
      const post = await prisma.post.create({
        data: {
          title,
          content,
          author,
          category,
          slug,
          tags: tagsForDb,
          featuredImage: relativePath,
          status: 'PUBLISHED' // Add status field
        },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true
        }
      })

      return NextResponse.json({
        success: true,
        data: post,
        message: 'Post created successfully'
      })

    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save post to database' }, 
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('POST /api/posts error:', error)
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    )
  }
}
