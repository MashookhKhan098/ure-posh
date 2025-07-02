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
    
    // Cache for 60 seconds
    if (!slug) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
        }
      })
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
    const formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const author = formData.get('author') as string
    const category = formData.get('category') as string
    const tagsStr = formData.get('tags') as string
    const slug = formData.get('slug') as string
    const featuredImage = formData.get('featuredImage')

    if (!title || !content || !author || !category || !slug || !featuredImage) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (!(featuredImage instanceof File)) {
      return NextResponse.json({ error: 'Invalid file upload' }, { status: 400 })
    }

    // Parse tags and prepare directory
    const tags = tagsStr ? tagsStr.split(',').map(tag => tag.trim()) : []
    const tagsForDb = tags.join(',')

    if (!existsSync(UPLOADS_DIR)) {
      await mkdir(UPLOADS_DIR, { recursive: true })
    }

    // Save the image
    const timestamp = Math.floor(Date.now() / 1000)
    const cleanName = featuredImage.name
      .replace(/[^a-zA-Z0-9.]/g, '_')
      .replace(/\s+/g, '_')
      .toLowerCase()

    const relativePath = `/uploads/${timestamp}-${cleanName}`
    const fullImagePath = join(process.cwd(), 'public', relativePath.substring(1))
    const buffer = Buffer.from(await featuredImage.arrayBuffer())
    await writeFile(fullImagePath, buffer)

    // Create the post
    const post = await prisma.post.create({
      data: {
        title,
        content,
        author,
        category,
        slug,
        tags: tagsForDb,
        featuredImage: relativePath
      }
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('POST /api/posts error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
