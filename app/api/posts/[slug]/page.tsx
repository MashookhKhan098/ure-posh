import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Tag, Share2, Eye, Heart, Bookmark } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Post {
  id: string
  title: string
  slug: string
  content: string
  author: string | null
  category: string | null
  createdAt: string
  updatedAt: string
  featuredImage: string | null
  tags: string[]
}

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"

    const response = await fetch(`${baseUrl}/api/posts/${slug}`, {
      cache: "no-store",
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch post: ${response.status}`)
    }

    const data = await response.json()
    return data.post
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

function estimateReadingTime(content: string): number {
  if (!content) return 1
  const wordsPerMinute = 200
  const words = content
    .replace(/<[^>]*>/g, "")
    .trim()
    .split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  } catch {
    return "Unknown date"
  }
}

function getAuthorInitials(author: string | null | undefined): string {
  if (!author || typeof author !== "string") return "?"
  const names = author.trim().split(" ")
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase()
  }
  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    }
  }

  const description = post.content ? post.content.substring(0, 160).replace(/<[^>]*>/g, "") + "..." : "Read this post"

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      authors: [post.author || "Unknown Author"],
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              alt: post.title,
              width: 1200,
              height: 630,
            },
          ]
        : [],
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  const readingTime = estimateReadingTime(post.content || "")
  const formattedDate = formatDate(post.createdAt)
  const authorInitials = getAuthorInitials(post.author)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      <div className="relative">
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="container mx-auto px-4 py-6">
            <Link href="/posts">
              <Button variant="ghost" className="text-white hover:bg-white/20 backdrop-blur-sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Posts
              </Button>
            </Link>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage ? (
          <div className="relative h-[60vh] w-full overflow-hidden">
            <Image
              src={post.featuredImage || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="container mx-auto max-w-4xl">
                <div className="space-y-4">
                  {post.category && (
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
                      {post.category}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    {post.title}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-24">
            <div className="container mx-auto px-4 max-w-4xl">
              <div className="space-y-6 text-center">
                {post.category && (
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                    {post.category}
                  </Badge>
                )}
                <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Article Meta */}
        <div className="py-8 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Author Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                <AvatarImage src="/placeholder.svg" alt={post.author || "Author"} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {authorInitials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900 text-lg">{post.author || "Unknown Author"}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formattedDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{readingTime} min read</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden sm:inline">Like</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">Save</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">Share</span>
              </Button>
            </div>
          </div>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm hover:bg-gray-50 transition-colors">
                  <Tag className="mr-1 h-3 w-3" />
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Article Content */}
        <article className="py-12">
          <div
            className="prose prose-xl max-w-none 
                     prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                     prose-h1:text-4xl prose-h1:mb-8 prose-h1:mt-12
                     prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10
                     prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                     prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                     prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-gray-900 prose-strong:font-semibold
                     prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
                     prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                     prose-pre:bg-gray-900 prose-pre:text-gray-100
                     prose-ul:mb-6 prose-ol:mb-6
                     prose-li:mb-2
                     prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: post.content || "No content available." }}
          />
        </article>

        {/* Article Footer */}
        <footer className="py-12 border-t border-gray-200">
          <div className="space-y-8">
            {/* Author Card */}
            <Card className="bg-gradient-to-r from-gray-50 to-white border-0 shadow-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-6">
                  <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
                    <AvatarImage src="/placeholder.svg" alt={post.author || "Author"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold text-xl">
                      {authorInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Written by {post.author || "Unknown Author"}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Passionate writer sharing insights and stories. Follow for more amazing content.
                    </p>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Follow
                      </Button>
                      <Button variant="outline" size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
              <Link href="/posts">
                <Button variant="ghost" className="gap-2 text-gray-600 hover:text-gray-900">
                  <ArrowLeft className="h-4 w-4" />
                  All Posts
                </Button>
              </Link>
              
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share Article
                </Button>
                <Link href="/">
                  <Button>Back to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
