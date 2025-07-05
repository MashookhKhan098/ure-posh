import { NextResponse } from "next/server"
import prisma from "../../../../lib/prisma"
import { deleteImage } from "../../../../lib/image-utils"
import { unlink } from "fs/promises"
import { join } from "path"

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ error: "Slug parameter is required" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // First find the post to get its image and video paths
    const post = await prisma.post.findUnique({
      where: { slug: slug },
      select: { featuredImage: true, videoUrl: true }
    })

    if (!post) {
      return new NextResponse(
        JSON.stringify({ error: "Post not found" }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Delete the featured image if it exists
    if (post.featuredImage) {
      await deleteImage(post.featuredImage)
    }

    // Delete the video file if it exists
    if (post.videoUrl) {
      try {
        const videoPath = join(process.cwd(), "public", post.videoUrl)
        await unlink(videoPath)
      } catch (error) {
        console.error("Error deleting video file:", error)
      }
    }

    // Delete the post from database
    await prisma.post.delete({
      where: { slug: slug }
    })

    return new NextResponse(
      JSON.stringify({ message: "Post deleted successfully" }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  } catch (error) {
    console.error("DELETE /api/posts/[slug] error:", error)
    return new NextResponse(
      JSON.stringify({ error: "Failed to delete post" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug) {
      return new NextResponse(
        JSON.stringify({ error: "Slug parameter is required" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
        status: "PUBLISHED",
      },
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
    })

    if (!post) {
      return new NextResponse(
        JSON.stringify({ error: "Post not found" }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Convert tags from string to array if needed
    const postWithArrayTags = {
      ...post,
      tags: typeof post.tags === "string" 
        ? post.tags.split(",").map((tag: string) => tag.trim()).filter(Boolean)
        : post.tags || [],
    }

    try {
      const jsonData = JSON.stringify(postWithArrayTags)
      console.log('Sending response:', jsonData)
      return new NextResponse(
        jsonData,
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60'
          }
        }
      )
    } catch (error) {
      console.error('Error stringifying JSON:', error)
      return new NextResponse(
        JSON.stringify({ error: 'Failed to generate response' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  } catch (error) {
    console.error("GET /api/posts/[slug] error:", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}
