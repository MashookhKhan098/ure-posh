import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { writeFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import { join } from "path"

const UPLOADS_DIR = join(process.cwd(), "public", "uploads")

// GET /api/posts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const pageSize = 12
  const skip = (page - 1) * pageSize

  try {
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
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
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

    if (!title || !content || !author || !category || !slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const tags = tagsStr
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean)

    let relativePath = ""

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

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        author,
        category,
        slug,
        tags: tags.join(","),
        featuredImage: relativePath || null,
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
  } catch (error) {
    console.error("POST /api/posts error:", error)
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
