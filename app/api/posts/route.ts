import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"
import { Buffer } from 'buffer'

const UPLOADS_DIR = join(process.cwd(), "public", "uploads")

// GET /api/posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const pageSize = 12
  const skip = (page - 1) * pageSize

  try {
    // Ensure database connection is ready
    await prisma.$connect()
    
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: { status: "PUBLISHED" },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          content: true,
          author: true,
          category: true,
          createdAt: true,
          updatedAt: true,
          featuredImage: true,
          videoUrl: true,
          videoTitle: true,
          videoDescription: true,
          tags: true,
        },
        skip,
        take: pageSize,
      }),
      prisma.post.count({ where: { status: "PUBLISHED" } }),
    ])

    const postsWithArrayTags = posts.map((post: any) => ({
      ...post,
      tags: typeof post.tags === "string" ? post.tags.split(",").map((t: any) => t.trim()) : [],
    }))

    return NextResponse.json({
      posts: postsWithArrayTags,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
    }, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      }
    })
  } catch (error) {
    console.error("GET /api/posts error:", error)
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 })
  }
}

// POST /api/posts
export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const title = formData.get("title")?.toString()
    const content = formData.get("content")?.toString()
    const author = formData.get("author")?.toString()
    const category = formData.get("category")?.toString()
    const tagsStr = formData.get("tags")?.toString() || ""
    const slug = formData.get("slug")?.toString()
    const featuredImage = formData.get("featuredImage") as File | null
    const videoFile = formData.get("videoFile") as File | null
    const videoTitle = formData.get("videoTitle")?.toString()
    const videoDescription = formData.get("videoDescription")?.toString()

    if (!title || !content || !author || !category || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const tags = tagsStr
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)

    let relativePath = ""
    let videoUrl = ""

    // Handle featured image upload
    if (featuredImage && featuredImage.size > 0) {
      if (!existsSync(UPLOADS_DIR)) {
        await mkdir(UPLOADS_DIR, { recursive: true })
      }

      const timestamp = Date.now()
      const ext = featuredImage.name.split(".").pop()?.toLowerCase()
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      const filename = `${cleanTitle}-${timestamp}.${ext}`
      relativePath = `/uploads/${filename}`

      const buffer = Buffer.from(await featuredImage.arrayBuffer())
      await writeFile(join(UPLOADS_DIR, filename), buffer)
    }

    // Handle video upload
    if (videoFile && videoFile.size > 0) {
      if (!existsSync(UPLOADS_DIR)) {
        await mkdir(UPLOADS_DIR, { recursive: true })
      }

      const timestamp = Date.now()
      const ext = videoFile.name.split(".").pop()?.toLowerCase()
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      const filename = `${cleanTitle}-video-${timestamp}.${ext}`
      videoUrl = `/uploads/${filename}`

      const buffer = Buffer.from(await videoFile.arrayBuffer())
      await writeFile(join(UPLOADS_DIR, filename), buffer)
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author,
        category,
        slug,
        tags: tags.join(","),
        featuredImage: relativePath || null,
        videoUrl: videoUrl || null,
        videoTitle: videoTitle || null,
        videoDescription: videoDescription || null,
        status: "PUBLISHED",
      },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: newPost,
      message: "Post created successfully",
    })
  } catch (err) {
    console.error('Error in posts API:', err)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
