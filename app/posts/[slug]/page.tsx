"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Calendar,
  Clock,
  Copy,
  Facebook,
  Heart,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Send,
  Share2,
  Tag,
  Trash2,
  Twitter,
  User,
  Users,
  ZoomIn,
} from "lucide-react"

// Types
interface PostResponse {
  id: string
  title: string
  content: string
  author: string
  category: string
  createdAt: string
  featuredImage?: string
  tags?: string[]
  excerpt?: string
  readTime?: number
  gallery?: string[]
  authorAvatar?: string
  authorBio?: string
  imageCredit?: string
}

export default function ProfessionalBlogPost() {
  const pathname = usePathname()
  const slug = pathname?.split("/").pop()
  const [post, setPost] = useState<PostResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string[]>([])
  const [readingProgress, setReadingProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showToC, setShowToC] = useState(false)

  useEffect(() => {
    fetchPost()
  }, [slug])

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setReadingProgress(progress)
      setIsScrolled(scrollTop > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fetchPost = async () => {
    try {
      if (!slug) {
        throw new Error("No slug provided")
      }
      setLoading(true)
      const response = await fetch(`/api/posts/${slug}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setPost(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching post:", err)
      setError("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const deletePost = async () => {
    if (!slug) return
    if (!confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      return
    }

    try {
      setLoading(true)
      const response = await fetch(`/api/posts/${slug}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to delete post")
      }
      window.location.href = "/posts"
    } catch (error) {
      console.error("Error deleting post:", error)
      setError("Failed to delete post")
    } finally {
      setLoading(false)
    }
  }

  const calculateReadTime = (content: string | null | undefined) => {
    if (!content) return 0
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, "").split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  const handleImageError = (imageSrc: string) => {
    setImageError((prev) => [...prev, imageSrc])
  }

  const isImageBroken = (imageSrc: string) => {
    return imageError.includes(imageSrc)
  }

  const sharePost = (platform: string) => {
    if (typeof window === "undefined") return
    const url = window.location.href
    const title = post?.title || ""
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      copy: url,
    }

    if (platform === "copy" && navigator.clipboard) {
      navigator.clipboard.writeText(url)
    } else if (platform in shareUrls) {
      window.open(shareUrls[platform as keyof typeof shareUrls], "_blank", "width=600,height=400")
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 font-medium">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={fetchPost} className="w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Post Not Found</h2>
            <p className="text-gray-600 mb-6">The post you're looking for doesn't exist or has been removed.</p>
            <Button asChild className="w-full">
              <a href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const readTime = post.readTime || calculateReadTime(post.content)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Actions */}
      <div
        className={`fixed top-4 right-4 z-40 transition-all duration-300 ${
          isScrolled ? "translate-y-0 opacity-100" : "translate-y-[-100px] opacity-0"
        }`}
      >
        <Card className="p-2">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" onClick={() => setShowToC(!showToC)}>
              <Menu className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={deletePost}
              className="text-red-600 hover:text-red-700 bg-transparent"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Table of Contents */}
      {showToC && (
        <div className="fixed top-20 right-4 z-30 w-80">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <nav className="space-y-2">
                <a href="#introduction" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                  Introduction
                </a>
                <a href="#main-content" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                  Main Content
                </a>
                <a href="#conclusion" className="block text-sm text-gray-600 hover:text-blue-600 py-1">
                  Conclusion
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="py-4" aria-label="Breadcrumb">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
            <span>/</span>
            <a href="/blog" className="hover:text-gray-700">
              Blog
            </a>
            <span>/</span>
            <span className="text-gray-900">{post.category}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Article Header */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4">
                <Tag className="w-3 h-3 mr-1" />
                {post.category}
              </Badge>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>

              {post.excerpt && <p className="text-xl text-gray-600 mb-6 leading-relaxed">{post.excerpt}</p>}

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center space-x-3">
                  {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                    <img
                      src={post.authorAvatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={() => handleImageError(post.authorAvatar!)}
                    />
                  ) : (
                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-sm">{post.author.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{post.author}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{formatDate(post.createdAt)}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {post.featuredImage && !isImageBroken(post.featuredImage) && (
              <div className="mb-8">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <img
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(post.featuredImage!)}
                  />
                </div>
                {post.imageCredit && (
                  <p className="text-xs text-gray-500 mt-2 text-center">Photo by {post.imageCredit}</p>
                )}
              </div>
            )}

            {/* Article Content */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div
                  dangerouslySetInnerHTML={{
                    __html: post.content
                      .split('\n')
                      .map((line, index) => {
                        // Handle different sections with enhanced styling
                        if (line.startsWith('💥')) {
                          return `
                            <div class="space-y-4">
                              <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                ${line.replace('💥', '<span class="text-blue-500">💥</span>')}
                              </h2>
                              <div class="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>
                            </div>
                          `;
                        }
                        if (line.startsWith('🕶️')) {
                          return `
                            <div class="space-y-2">
                              <h3 class="text-2xl font-semibold text-gray-800 mb-1">
                                ${line.replace('🕶️', '<span class="text-gray-500">🕶️</span>')}
                              </h3>
                              <div class="h-0.5 w-16 bg-gray-200 rounded-full"></div>
                            </div>
                          `;
                        }
                        if (line.startsWith('✅')) {
                          return `
                            <li class="flex items-start space-x-3 mb-4">
                              <span class="text-green-500 text-xl">✅</span>
                              <div class="flex-1">
                                <p class="text-gray-700 mb-1">${line.replace('✅', '').trim()}</p>
                                <div class="h-0.5 w-20 bg-green-100 rounded-full"></div>
                              </div>
                            </li>
                          `;
                        }
                        if (line.startsWith('👑')) {
                          return `
                            <div class="space-y-4">
                              <h2 class="text-3xl md:text-4xl font-bold text-red-600 mb-2 bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
                                ${line.replace('👑', '<span class="text-red-500">👑</span>')}
                              </h2>
                              <div class="h-1 w-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4"></div>
                            </div>
                          `;
                        }
                        if (line.startsWith('📌')) {
                          return `
                            <div class="space-y-2">
                              <h3 class="text-2xl font-semibold text-blue-600 mb-1">
                                ${line.replace('📌', '<span class="text-blue-500">📌</span>')}
                              </h3>
                              <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
                            </div>
                          `;
                        }
                        if (line.startsWith('🔥')) {
                          return `
                            <div class="space-y-2">
                              <h4 class="text-xl font-semibold text-orange-600 mb-1">
                                ${line.replace('🔥', '<span class="text-orange-500">🔥</span>')}
                              </h4>
                              <div class="h-0.5 w-12 bg-orange-200 rounded-full"></div>
                            </div>
                          `;
                        }
                        if (line.startsWith('🖤')) {
                          return `
                            <div class="space-y-2">
                              <h4 class="text-xl font-semibold text-pink-600 mb-1">
                                ${line.replace('🖤', '<span class="text-pink-500">🖤</span>')}
                              </h4>
                              <div class="h-0.5 w-12 bg-pink-200 rounded-full"></div>
                            </div>
                          `;
                        }
                        
                        // Handle regular text with improved typography
                        return `
                          <div class="space-y-4">
                            <p class="text-gray-700 leading-relaxed">
                              ${line}
                            </p>
                            <div class="h-0.5 w-4 bg-gray-100 rounded-full"></div>
                          </div>
                        `;
                      })
                      .join('')
                  }}
                  className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900"
                />
              </CardContent>
            </Card>

            {/* Image Gallery */}
            {post.gallery && post.gallery.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <ZoomIn className="w-6 h-6 mr-2" />
                    Image Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {post.gallery.map(
                      (image, index) =>
                        !isImageBroken(image) && (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={() => handleImageError(image)}
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => window.open(image, "_blank")}
                            >
                              <ZoomIn className="w-4 h-4" />
                            </Button>
                          </div>
                        ),
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <Card className="mb-8">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="w-5 h-5 mr-2" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={`${tag.trim()}-${index}`} variant="outline">
                        #{tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Comments Section */}
            <Card>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Comments
                </h3>

                {/* Comment Form */}
                <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <Input placeholder="Your Name" />
                    <Input type="email" placeholder="Your Email" />
                  </div>
                  <Textarea placeholder="Share your thoughts..." rows={4} className="mb-4" />
                  <Button>
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>

                {/* Sample Comments */}
                <div className="space-y-6">
                  {[
                    {
                      name: "John Doe",
                      time: "2 hours ago",
                      comment: "Excellent article! This really helped me understand the topic better.",
                    },
                    {
                      name: "Alice Smith",
                      time: "1 day ago",
                      comment:
                        "I've been struggling with this concept for a while, and your explanation made it click for me.",
                    },
                  ].map((comment, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-medium text-sm">
                          {comment.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium text-gray-900">{comment.name}</h4>
                          <span className="text-sm text-gray-500">{comment.time}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{comment.comment}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <button className="text-gray-500 hover:text-blue-600 flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            Like
                          </button>
                          <button className="text-gray-500 hover:text-blue-600">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* Share Section */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Share2 className="w-5 h-5 mr-2" />
                    Share Article
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" size="sm" onClick={() => sharePost("twitter")} className="justify-start">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("linkedin")} className="justify-start">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("facebook")} className="justify-start">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("copy")} className="justify-start">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Author Bio */}
              {post.authorBio && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      About Author
                    </h3>
                    <div className="flex items-start space-x-4">
                      {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                        <img
                          src={post.authorAvatar || "/placeholder.svg"}
                          alt={post.author}
                          className="w-16 h-16 rounded-full object-cover"
                          onError={() => handleImageError(post.authorAvatar!)}
                        />
                      ) : (
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-lg">{post.author.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{post.author}</h4>
                        <p className="text-sm text-gray-600">{post.authorBio}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Newsletter */}
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Stay Updated</h3>
                  <p className="text-sm text-gray-600 mb-4">Get the latest articles delivered to your inbox</p>
                  <div className="space-y-3">
                    <Input placeholder="Enter your email" type="email" />
                    <Button className="w-full">Subscribe</Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">No spam, unsubscribe anytime</p>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Related Articles
                  </h3>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <a key={item} href="#" className="block group">
                        <div className="flex space-x-3">
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                          <div>
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 text-sm mb-1">
                              Related Article Title {item}
                            </h4>
                            <p className="text-xs text-gray-500">5 min read</p>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center py-8 border-t">
          <Button variant="outline" asChild>
            <a href="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </a>
          </Button>

          <div className="flex gap-2">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <Button>
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
