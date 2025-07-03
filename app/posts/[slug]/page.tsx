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

interface Comment {
  id: string
  name: string
  email: string
  comment: string
  createdAt: string
  avatar?: string
}

export default function ProfessionalBlogPost() {
  const pathname = usePathname()
  const slug = pathname?.split("/").pop()
  const [post, setPost] = useState<PostResponse | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string[]>([])
  const [readingProgress, setReadingProgress] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showToC, setShowToC] = useState(false)
  const [relatedPosts, setRelatedPosts] = useState<PostResponse[]>([])

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
      
      // Fetch comments and related posts in parallel
      await Promise.all([
        fetchComments(data.id),
        fetchRelatedPosts(data.category, data.id)
      ])
      
      setError(null)
    } catch (err) {
      console.error("Error fetching post:", err)
      setError("Failed to load post")
    } finally {
      setLoading(false)
    }
  }

  const fetchComments = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`)
      if (response.ok) {
        const data = await response.json()
        setComments(data)
      }
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  const fetchRelatedPosts = async (category: string, currentPostId: string) => {
    try {
      const response = await fetch(`/api/posts/related?category=${category}&exclude=${currentPostId}&limit=3`)
      if (response.ok) {
        const data = await response.json()
        setRelatedPosts(data)
      }
    } catch (error) {
      console.error("Error fetching related posts:", error)
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

  const formatContent = (content: string) => {
    return content
      .split('\n')
      .map((line, index) => {
        // Enhanced content formatting with better visual hierarchy
        if (line.startsWith('💥')) {
          return `
            <div class="my-12 space-y-6" key="${index}">
              <div class="relative">
                <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  ${line.replace('💥', '<span class="text-5xl">💥</span>')}
                </h2>
                <div class="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-20"></div>
                <div class="h-1 w-32 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('🕶️')) {
          return `
            <div class="my-10 space-y-4" key="${index}">
              <h3 class="text-3xl font-bold text-gray-800 leading-tight flex items-center gap-3">
                <span class="text-gray-600">🕶️</span>
                ${line.replace('🕶️', '').trim()}
              </h3>
              <div class="flex items-center gap-2">
                <div class="h-1 w-20 bg-gray-300 rounded-full"></div>
                <div class="h-1 w-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('✅')) {
          return `
            <div class="my-6 flex items-start gap-4 p-4 bg-green-50 border-l-4 border-green-500 rounded-r-lg" key="${index}">
              <span class="text-green-600 text-2xl flex-shrink-0">✅</span>
              <div class="flex-1">
                <p class="text-gray-800 leading-relaxed font-medium">${line.replace('✅', '').trim()}</p>
                <div class="mt-2 h-1 w-24 bg-green-200 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('👑')) {
          return `
            <div class="my-12 space-y-6" key="${index}">
              <div class="relative">
                <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  ${line.replace('👑', '<span class="text-5xl">👑</span>')}
                </h2>
                <div class="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-red-500 to-pink-500 rounded-full opacity-20"></div>
                <div class="h-1 w-32 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('📌')) {
          return `
            <div class="my-8 space-y-4" key="${index}">
              <h3 class="text-2xl md:text-3xl font-bold text-blue-700 leading-tight flex items-center gap-3">
                <span class="text-blue-500">📌</span>
                ${line.replace('📌', '').trim()}
              </h3>
              <div class="flex items-center gap-2">
                <div class="h-1 w-16 bg-blue-400 rounded-full"></div>
                <div class="h-1 w-6 bg-blue-200 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('🔥')) {
          return `
            <div class="my-8 space-y-3" key="${index}">
              <h4 class="text-xl md:text-2xl font-semibold text-orange-700 leading-tight flex items-center gap-2">
                <span class="text-orange-500">🔥</span>
                ${line.replace('🔥', '').trim()}
              </h4>
              <div class="h-0.5 w-14 bg-orange-300 rounded-full"></div>
            </div>
          `;
        }
        
        if (line.startsWith('🖤')) {
          return `
            <div class="my-8 space-y-3" key="${index}">
              <h4 class="text-xl md:text-2xl font-semibold text-pink-700 leading-tight flex items-center gap-2">
                <span class="text-pink-500">🖤</span>
                ${line.replace('🖤', '').trim()}
              </h4>
              <div class="h-0.5 w-14 bg-pink-300 rounded-full"></div>
            </div>
          `;
        }
        
        // Enhanced regular paragraph formatting
        if (line.trim()) {
          return `
            <div class="my-6" key="${index}">
              <p class="text-gray-700 leading-relaxed text-lg font-light tracking-wide">
                ${line}
              </p>
            </div>
          `;
        }
        
        return '';
      })
      .join('');
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-12 h-12 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-700 font-medium text-lg">Loading article...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full shadow-xl">
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out shadow-lg"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Enhanced Floating Actions */}
      <div
        className={`fixed top-6 right-6 z-40 transition-all duration-500 ${
          isScrolled ? "translate-y-0 opacity-100 scale-100" : "translate-y-[-120px] opacity-0 scale-95"
        }`}
      >
        <Card className="p-3 shadow-xl border-0 bg-white/90 backdrop-blur-md">
          <div className="flex items-center space-x-3">
            <Button size="sm" variant="outline" onClick={() => setShowToC(!showToC)} className="hover:bg-blue-50">
              <Menu className="w-4 h-4" />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={deletePost}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hover:bg-green-50"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Enhanced Table of Contents */}
      {showToC && (
        <div className="fixed top-24 right-6 z-30 w-80">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-md">
            <CardContent className="p-6">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">Table of Contents</h3>
              <nav className="space-y-3">
                <a href="#introduction" className="block text-sm text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-blue-50 transition-colors">
                  Introduction
                </a>
                <a href="#main-content" className="block text-sm text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-blue-50 transition-colors">
                  Main Content
                </a>
                <a href="#conclusion" className="block text-sm text-gray-600 hover:text-blue-600 py-2 px-3 rounded-md hover:bg-blue-50 transition-colors">
                  Conclusion
                </a>
              </nav>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Breadcrumb */}
        <nav className="py-6" aria-label="Breadcrumb">
          <div className="flex items-center space-x-3 text-sm">
            <a href="/" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">
              Home
            </a>
            <span className="text-gray-300">/</span>
            <a href="/blog" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">
              Blog
            </a>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">{post.category}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Enhanced Article Header */}
            <div className="mb-12">
              <Badge variant="secondary" className="mb-6 px-4 py-2">
                <Tag className="w-4 h-4 mr-2" />
                {post.category}
              </Badge>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                {post.title}
              </h1>

              {post.excerpt && (
                <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light max-w-4xl">
                  {post.excerpt}
                </p>
              )}

              {/* Enhanced Meta Information */}
              <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-10 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                    <img
                      src={post.authorAvatar || "/placeholder.svg"}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                      onError={() => handleImageError(post.authorAvatar!)}
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">{post.author.charAt(0).toUpperCase()}</span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{post.author}</p>
                    <p className="text-sm text-gray-500">Author</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">{formatDate(post.createdAt)}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-green-500" />
                  <span className="font-medium">{readTime} min read</span>
                </div>
              </div>
            </div>

            {/* Enhanced Featured Image */}
            {post.featuredImage && !isImageBroken(post.featuredImage) && (
              <div className="mb-12">
                <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={post.featuredImage || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(post.featuredImage!)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {post.imageCredit && (
                  <p className="text-sm text-gray-500 mt-4 text-center font-medium">Photo by {post.imageCredit}</p>
                )}
              </div>
            )}

            {/* Enhanced Article Content */}
            <Card className="mb-12 shadow-lg border-0">
              <CardContent className="p-10">
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatContent(post.content)
                  }}
                  className="prose prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                />
              </CardContent>
            </Card>

            {/* Enhanced Image Gallery */}
            {post.gallery && post.gallery.length > 0 && (
              <Card className="mb-12 shadow-lg border-0">
                <CardContent className="p-10">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <ZoomIn className="w-8 h-8 mr-3" />
                    Image Gallery
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {post.gallery.map(
                      (image, index) =>
                        !isImageBroken(image) && (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-xl overflow-hidden shadow-lg">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Gallery image ${index + 1}`}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                onError={() => handleImageError(image)}
                              />
                            </div>
                            <Button
                              size="sm"
                              variant="secondary"
                              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg"
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

            {/* Enhanced Tags */}
            {post.tags && post.tags.length > 0 && (
              <Card className="mb-12 shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Tag className="w-6 h-6 mr-3" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((tag, index) => (
                      <Badge key={`${tag.trim()}-${index}`} variant="outline" className="px-4 py-2 text-sm font-medium">
                        #{tag.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Enhanced Comments Section */}
            <Card className="shadow-lg border-0">
              <CardContent className="p-10">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                  <MessageCircle className="w-8 h-8 mr-3" />
                  Comments ({comments.length})
                </h3>

                {/* Enhanced Comment Form */}
                <div className="mb-12 p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
                  <h4 className="text-lg font-semibold text-gray-900 mb-6">Leave a Comment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Input placeholder="Your Name" className="h-12" />
                    <Input type="email" placeholder="Your Email" className="h-12" />
                  </div>
                  <Textarea placeholder="Share your thoughts..." rows={5} className="mb-6" />
                  <Button className="px-8 py-3">
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>

                {/* Dynamic Comments */}
                {comments.length > 0 ? (
                  <div className="space-y-8">
                    {comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-6 p-6 bg-gray-50 rounded-xl">
                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">
                            {comment.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                            <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                          </div>
                          <p className="text-gray-700 mb-3 leading-relaxed">{comment.comment}</p>
                          <div className="flex items-center space-x-6 text-sm">
                            <button className="text-gray-500 hover:text-blue-600 flex items-center transition-colors">
                              <Heart className="w-4 h-4 mr-1" />
                              Like
                            </button>
                            <button className="text-gray-500 hover:text-blue-600 transition-colors">Reply</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No comments yet. Be the first to share your thoughts!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-8">
              {/* Enhanced Share Section */}
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg flex items-center">
                    <Share2 className="w-6 h-6 mr-3" />
                    Share Article
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" size="sm" onClick={() => sharePost("twitter")} className="justify-start h-12">
                      <Twitter className="w-4 h-4 mr-2" />
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("linkedin")} className="justify-start h-12">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("facebook")} className="justify-start h-12">
                      <Facebook className="w-4 h-4 mr-2" />
                      Facebook
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => sharePost("copy")} className="justify-start h-12">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter Subscription */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Stay Updated</h3>
                    <p className="text-gray-600 mb-6">Get the latest articles and news delivered to your inbox</p>
                    <div className="space-y-4">
                      <Input 
                        type="email" 
                        placeholder="Your email address" 
                        className="h-12 px-4 text-base border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500"
                      />
                      <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300">
                        Subscribe Now
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">No spam, unsubscribe anytime</p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-indigo-600" />
                    You Might Also Like
                  </h3>
                  <div className="space-y-6">
                    {relatedPosts.slice(0, 3).map((post) => (
                      <a 
                        key={post.id} 
                        href={`/posts/${post.id}`}
                        className="group block hover:bg-gray-50 rounded-lg p-3 transition-colors duration-200"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                            {post.featuredImage && (
                              <img 
                                src={post.featuredImage} 
                                alt={post.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">
                              {new Date(post.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
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

        {/* Footer Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Button 
              asChild 
              variant="outline" 
              className="w-full sm:w-auto justify-center px-8 py-6 text-base font-medium hover:bg-gray-50 transition-colors"
            >
              <a href="/blog">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blog
              </a>
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto justify-center px-8 py-6 text-base font-medium hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Previous Post
              </Button>
              <Button 
                className="w-full sm:w-auto justify-center px-8 py-6 text-base font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Next Post
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-white p-3 rounded-full shadow-xl text-gray-700 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </button>
    </div>
  )
}