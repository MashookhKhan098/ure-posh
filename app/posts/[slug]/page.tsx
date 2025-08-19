"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from 'framer-motion'
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
  Video,
  Bookmark,
  Eye,
  ExternalLink,
  Check,
  Star,
  Sparkles,
  BookOpen,
  Award,
  Target,
  Globe,
  Layers,
  Palette,
  Camera,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Share,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  BookmarkPlus,
  BookmarkCheck,
  ThumbsUp,
  MessageSquare,
  EyeOff,
  FilterX,
  SortAsc,
  SortDesc,
  Clock3,
  TrendingDown,
  Hash,
  Zap,
  TrendingUp,
  BookmarkX,
  BookmarkMinus,
  BookmarkIcon,
  BookmarkPlus as BookmarkPlusIcon,
  BookmarkCheck as BookmarkCheckIcon,
  BookmarkX as BookmarkXIcon,
  BookmarkMinus as BookmarkMinusIcon,
  BookmarkIcon as BookmarkIconIcon,
  BookmarkPlus as BookmarkPlusIcon2,
  BookmarkCheck as BookmarkCheckIcon2,
  BookmarkX as BookmarkXIcon2,
  BookmarkMinus as BookmarkMinusIcon2,
  BookmarkIcon as BookmarkIconIcon2
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
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  tags?: string[]
  excerpt?: string
  readTime?: number
  gallery?: string[]
  authorAvatar?: string
  authorBio?: string
  imageCredit?: string
  slug: string
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
  const [copiedLink, setCopiedLink] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)
  const [currentVideoTime, setCurrentVideoTime] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

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
      const response = await fetch(`/api/articles/${slug}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
      }

      const payload = await response.json()
      const data = payload?.data || payload
      
      // Transform the post data to match the expected interface
      const transformedPost = {
        ...data,
        tags: Array.isArray(data.tags) ? data.tags : (data.tags ? data.tags.split(',') : []),
        createdAt: data.published_at || data.created_at,
        featuredImage: data.image_url || data.featured_image,
        videoUrl: data.video_url,
        videoTitle: data.video_title,
        videoDescription: data.video_description,
        readTime: data.read_time,
        authorAvatar: data.author_avatar,
        authorBio: data.author_bio,
        category: data.categories?.name || data.category || 'Uncategorized'
      }
      
      setPost(transformedPost)
      
      // Fetch comments and related posts in parallel
      await Promise.all([
        fetchRelatedPosts(transformedPost.category, data.id)
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
      const response = await fetch(`/api/articles?category=${encodeURIComponent(category)}&limit=3`)
      if (response.ok) {
        const payload = await response.json()
        const list = payload?.data || []
        setRelatedPosts(list.map((a: any) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
          featuredImage: a.image_url,
          category: a.categories?.name || 'Uncategorized',
          createdAt: a.published_at || a.created_at
        })))
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
      const response = await fetch(`/api/articles/${slug}`, {
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

  const sharePost = async (platform: string) => {
    if (typeof window === "undefined" || !post) return
    
    const url = window.location.href
    const title = post.title

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      mail: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`
    }

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      } catch {
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2000)
      }
    }
  }

  const formatContent = (content: string) => {
    // Enhanced content formatting with better visual hierarchy
    return content
      .split('\n')
      .map((line, index) => {
        // Enhanced content formatting with better visual hierarchy
        if (line.startsWith('🔥')) {
          return `
            <div class="my-12 space-y-6" key="${index}">
              <div class="relative">
                <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  ${line.replace('🔥', '<span class="text-5xl">🔥</span>')}
                </h2>
                <div class="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-full opacity-20"></div>
                <div class="h-1 w-32 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-full"></div>
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
            <div class="my-6 flex items-start gap-4 p-6 bg-green-50 border-l-4 border-green-500 rounded-r-xl" key="${index}">
              <span class="text-green-600 text-2xl flex-shrink-0">✅</span>
              <div class="flex-1">
                <p class="text-gray-800 leading-relaxed font-medium text-lg">${line.replace('✅', '').trim()}</p>
                <div class="mt-2 h-1 w-24 bg-green-200 rounded-full"></div>
              </div>
            </div>
          `;
        }
        
        if (line.startsWith('👑')) {
          return `
            <div class="my-12 space-y-6" key="${index}">
              <div class="relative">
                <h2 class="text-4xl md:text-5xl font-bold leading-tight mb-4 bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 bg-clip-text text-transparent">
                  ${line.replace('👑', '<span class="text-5xl">👑</span>')}
                </h2>
                <div class="absolute -left-4 top-0 w-2 h-full bg-gradient-to-b from-yellow-500 to-orange-500 rounded-full opacity-20"></div>
                <div class="h-1 w-32 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-full"></div>
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
        
        if (line.startsWith('🖤')) {
          return `
            <div class="my-8 space-y-3" key="${index}">
              <h4 class="text-xl md:text-2xl font-semibold text-gray-800 leading-tight flex items-center gap-2">
                <span class="text-gray-600">🖤</span>
                ${line.replace('🖤', '').trim()}
              </h4>
              <div class="h-0.5 w-14 bg-gray-300 rounded-full"></div>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-32 mb-8"></div>
            <div className="h-16 bg-gray-200 rounded w-full mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-12"></div>
            <div className="h-96 bg-gray-200 rounded-2xl mb-12"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-200 rounded w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Eye className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Post Not Found</h3>
            <p className="text-gray-600 mb-6">{error || "The post you're looking for doesn't exist."}</p>
            <Link 
              href="/posts"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const readTime = post.readTime || calculateReadTime(post.content)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Action Bar */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-xl transition-colors ${
                    isBookmarked 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <BookmarkIcon className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`p-2 rounded-xl transition-colors ${
                    isLiked 
                      ? 'bg-red-100 text-red-600' 
                      : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => sharePost('copy')}
                  className={`p-2 rounded-xl transition-colors ${
                    copiedLink 
                      ? 'bg-green-100 text-green-600' 
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  {copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                >
                  <ArrowUp className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Menu */}
      <AnimatePresence>
        {showShareMenu && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => sharePost('twitter')}
                  className="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </button>
                <button
                  onClick={() => sharePost('facebook')}
                  className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </button>
                <button
                  onClick={() => sharePost('linkedin')}
                  className="p-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </button>
                <button
                  onClick={() => sharePost('mail')}
                  className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors"
                  title="Share via Email"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <div className="flex items-center space-x-3 text-sm">
            <Link href="/" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link href="/posts" className="text-gray-500 hover:text-blue-600 transition-colors font-medium">
              Blog
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-semibold">{post.category}</span>
          </div>
        </nav>

        {/* Article Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          {/* Category Badge */}
          <div className="mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
              <Tag className="w-4 h-4 mr-2" />
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
          )}

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center gap-6 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-lg"
                  onError={() => handleImageError(post.authorAvatar!)}
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">{post.author.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div>
                <p className="font-bold text-gray-900 text-xl">{post.author}</p>
                <p className="text-sm text-gray-500">Author</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Calendar className="w-6 h-6 text-blue-500" />
              <span className="font-semibold text-lg">{formatDate(post.createdAt)}</span>
            </div>

            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-green-500" />
              <span className="font-semibold text-lg">{readTime} min read</span>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => sharePost('twitter')}
                className="p-3 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                title="Share on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </button>
              <button
                onClick={() => sharePost('facebook')}
                className="p-3 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                title="Share on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => sharePost('copy')}
                className={`p-3 rounded-xl transition-colors ${
                  copiedLink 
                    ? 'bg-green-100 text-green-600' 
                    : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                }`}
                title="Copy link"
              >
                {copiedLink ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Featured Image */}
        {post.featuredImage && !isImageBroken(post.featuredImage) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={() => handleImageError(post.featuredImage!)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            {post.imageCredit && (
              <p className="text-sm text-gray-500 mt-4 text-center font-medium">
                Photo by {post.imageCredit}
              </p>
            )}
          </motion.div>
        )}

        {/* Video Display */}
        {post.videoUrl && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
              <video
                src={post.videoUrl}
                controls
                className="w-full h-full object-cover"
                poster={post.featuredImage}
                onTimeUpdate={(e) => setCurrentVideoTime(e.currentTarget.currentTime)}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                Your browser does not support the video tag.
              </video>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                  <Maximize2 className="w-5 h-5" />
                </button>
                <button className="p-2 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            {(post.videoTitle || post.videoDescription) && (
              <div className="mt-6 p-8 bg-white rounded-3xl shadow-lg border border-gray-100">
                {post.videoTitle && (
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                    <Video className="w-6 h-6 mr-3 text-blue-600" />
                    {post.videoTitle}
                  </h3>
                )}
                {post.videoDescription && (
                  <p className="text-gray-600 leading-relaxed text-lg">{post.videoDescription}</p>
                )}
              </div>
            )}
          </motion.div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Article Content */}
        <div className="xl:col-span-9">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-14 xl:p-16 mb-12"
        >
          <div
            dangerouslySetInnerHTML={{
              __html: formatContent(post.content)
            }}
            className="prose prose-lg md:prose-xl max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:bg-gray-100 prose-code:px-3 prose-code:py-1 prose-code:rounded-lg prose-li:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:font-medium prose-blockquote:text-gray-800 prose-h1:text-4xl prose-h1:font-bold prose-h2:text-3xl prose-h2:font-bold prose-h3:text-2xl prose-h3:font-semibold prose-h4:text-xl prose-h4:font-semibold prose-h5:text-lg prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-p:text-lg prose-p:leading-relaxed prose-p:mb-6 prose-ul:space-y-2 prose-ol:space-y-2 prose-li:marker:text-blue-500"
        />
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Hash className="w-6 h-6 mr-3 text-blue-600" />
                Tags
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {Array.isArray(post.tags) && post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        </div>
        {/* Sidebar */}
        <div className="hidden xl:block xl:col-span-3">
          <div className="sticky top-24 space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">About this story</h4>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2"><Tag className="w-4 h-4 text-blue-600" /><span>{post.category}</span></div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-pink-600" /><span>{formatDate(post.createdAt)}</span></div>
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-green-600" /><span>{readTime} min read</span></div>
                <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-gray-700" /><span>{(post as any).views || 0} views</span></div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">Share</h4>
              <div className="flex items-center gap-2">
                <button onClick={() => sharePost('twitter')} className="p-3 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors" title="Share on Twitter"><Twitter className="w-5 h-5" /></button>
                <button onClick={() => sharePost('facebook')} className="p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="Share on Facebook"><Facebook className="w-5 h-5" /></button>
                <button onClick={() => sharePost('linkedin')} className="p-3 text-gray-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-colors" title="Share on LinkedIn"><Linkedin className="w-5 h-5" /></button>
                <button onClick={() => sharePost('copy')} className="p-3 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-xl transition-colors" title="Copy link"><Copy className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>

        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h3>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/posts/${relatedPost.slug}`}
                  className="group block bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  {relatedPost.featuredImage && !isImageBroken(relatedPost.featuredImage) && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={relatedPost.featuredImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => handleImageError(relatedPost.featuredImage!)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 mb-4">
                      {relatedPost.category}
                    </span>
                    <h4 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors text-lg">
                      {relatedPost.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-4">
                      {formatDate(relatedPost.createdAt)}
                    </p>
                    <div className="flex items-center gap-2 text-blue-600 font-semibold">
                      Read More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Back to Blog */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-center"
        >
          <Link 
            href="/posts"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-xl hover:shadow-2xl text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Blog
          </Link>
        </motion.div>
      </div>
    </div>
  )
}