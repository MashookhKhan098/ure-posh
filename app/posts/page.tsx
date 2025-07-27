'use client'

import { useEffect, useState, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Clock, 
  Heart, 
  Bookmark as BookmarkIcon,
  ChevronDown, 
  Grid, 
  List, 
  RefreshCw, 
  AlertCircle, 
  Twitter, 
  Facebook,
  Copy,
  Check,
  ArrowRight,
  Video,
  Filter,
  TrendingUp,
  Star,
  Zap,
  Sparkles,
  BookOpen,
  Users,
  Award,
  Target,
  Globe,
  Layers,
  Palette,
  Camera,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  FilterX,
  Hash,
  Eye,
  ThumbsUp,
  Share2,
  TrendingDown
} from 'lucide-react'

interface PostResponse {
  id: string
  title: string
  excerpt: string
  author: string
  authorAvatar?: string
  category: string
  createdAt: string
  featuredImage?: string
  videoUrl?: string
  videoTitle?: string
  tags?: string[]
  slug: string
  content: string
  readTime?: number
  likes?: number
  comments?: number
  viewCount?: number
  status?: string
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'popular' | 'title'

export default function PostsPage() {
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedTag, setSelectedTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<string>>(new Set())
  const [copiedLink, setCopiedLink] = useState<string | null>(null)
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(12)

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      
      if (response.ok) {
        const data = await response.json()
        
        const transformedPosts = (Array.isArray(data) ? data : []).map((post: any) => ({
          id: post.id,
          title: post.title,
          excerpt: post.excerpt || post.content?.substring(0, 150) || '',
          author: post.author,
          authorAvatar: post.author_avatar,
          category: post.category,
          createdAt: post.created_at,
          featuredImage: post.featured_image,
          videoUrl: post.video_url,
          videoTitle: post.video_title,
          tags: Array.isArray(post.tags) ? post.tags : (post.tags ? post.tags.split(',') : []),
          slug: post.slug,
          content: post.content,
          readTime: post.read_time,
          likes: post.likes || 0,
          comments: post.comments_count || 0,
          viewCount: post.view_count || 0,
          status: post.status
        }))
        
        setPosts(transformedPosts)
        setError(null)
      } else {
        throw new Error('Failed to fetch posts')
      }
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return 'Invalid date'
    }
  }

  const calculateReadTime = (content: string) => {
    if (!content) return 1
    const wordsPerMinute = 200
    const words = content.replace(/<[^>]*>/g, '').split(/\s+/).filter(word => word.length > 0).length
    return Math.max(1, Math.ceil(words / wordsPerMinute))
  }

  const sharePost = async (platform: string, post: PostResponse) => {
    const url = `${window.location.origin}/posts/${post.slug}`
    const title = post.title

    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
    }

    if (shareUrls[platform as keyof typeof shareUrls]) {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank', 'width=600,height=400')
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        setCopiedLink(post.id)
        setTimeout(() => setCopiedLink(null), 2000)
      } catch {
        const textArea = document.createElement('textarea')
        textArea.value = url
        document.body.appendChild(textArea)
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
        setCopiedLink(post.id)
        setTimeout(() => setCopiedLink(null), 2000)
      }
    }
  }

  const toggleBookmark = (postId: string) => {
    setBookmarkedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  const toggleLike = (postId: string) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(postId)) {
        newSet.delete(postId)
      } else {
        newSet.add(postId)
      }
      return newSet
    })
  }

  // Get unique categories and tags from posts
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(posts.map(post => post.category).filter(Boolean))]
    return uniqueCategories.sort()
  }, [posts])

  const allTags = useMemo(() => {
    const uniqueTags = [...new Set(posts.flatMap(post => post.tags || []))]
    return uniqueTags.sort()
  }, [posts])

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (post.excerpt && post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
      const matchesTag = selectedTag === 'all' || (post.tags && post.tags.includes(selectedTag))
      
      return matchesSearch && matchesCategory && matchesTag
    })

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'popular':
          return (b.likes || 0) - (a.likes || 0)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

    return filtered
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy])

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredAndSortedPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage)

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTag('all')
    setSortBy('newest')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedTag !== 'all' || sortBy !== 'newest'

  // Featured post (first published post)
  const featuredPost = posts.find(post => post.status === 'published') || posts[0]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-slate-200 rounded-lg w-80 mb-8"></div>
            <div className="h-6 bg-slate-200 rounded w-96 mb-12"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-slate-200 rounded w-20 mb-3"></div>
                    <div className="h-6 bg-slate-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-slate-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-slate-200 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-slate-200 rounded w-32"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-slate-900 mb-3">Failed to Load Posts</h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-white/15 backdrop-blur-md rounded-full px-6 py-3 mb-8 border border-white/20"
            >
              <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
              <span className="text-white/95 text-sm font-semibold">Discover Amazing Content</span>
              <div className="w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent"
            >
              Our Blog
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/95 max-w-4xl mx-auto leading-relaxed mb-10 font-light"
            >
              Discover insights, tutorials, and stories from our community. 
              Stay updated with the latest trends and best practices.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex items-center justify-center gap-8 text-white/90"
            >
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <BookOpen className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">{posts.length} Articles</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Expert Authors</span>
              </div>
              <div className="w-1 h-1 bg-white/60 rounded-full"></div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                <Award className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Premium Content</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Enhanced Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl"></div>
              
              <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Enhanced Featured Image */}
                  <div className="relative h-80 lg:h-full overflow-hidden group">
                    {featuredPost.featuredImage ? (
                      <img 
                        src={featuredPost.featuredImage} 
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                        <BookOpen className="w-20 h-20 text-white/50" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    {featuredPost.videoUrl && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-24 h-24 bg-white/95 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl">
                          <Video className="w-12 h-12 text-black" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                        <Star className="w-4 h-4 mr-2" />
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-6 right-6 flex gap-3">
                      <button
                        onClick={() => toggleBookmark(featuredPost.id)}
                        className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                      >
                        <BookmarkIcon className={`w-5 h-5 ${bookmarkedPosts.has(featuredPost.id) ? 'fill-current text-purple-600' : 'text-slate-700'}`} />
                      </button>
                      <button
                        onClick={() => sharePost('copy', featuredPost)}
                        className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                      >
                        {copiedLink === featuredPost.id ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-slate-700" />}
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Featured Content */}
                  <div className="p-10 lg:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                        {featuredPost.category}
                      </span>
                      {featuredPost.videoUrl && (
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200">
                          <Video className="w-4 h-4 mr-2" />
                          Video
                        </span>
                      )}
                    </div>

                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                      <Link href={`/posts/${featuredPost.slug}`} className="hover:text-indigo-600 transition-colors duration-300">
                        {featuredPost.title}
                      </Link>
                    </h2>

                    {featuredPost.excerpt && (
                      <p className="text-slate-600 mb-8 leading-relaxed line-clamp-3 text-lg">
                        {featuredPost.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-5 mb-8">
                      {featuredPost.authorAvatar ? (
                        <img
                          src={featuredPost.authorAvatar}
                          alt={featuredPost.author}
                          className="w-14 h-14 rounded-full object-cover ring-4 ring-white shadow-lg"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-xl">{featuredPost.author.charAt(0).toUpperCase()}</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-bold text-slate-900 text-lg">{featuredPost.author}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(featuredPost.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{featuredPost.readTime || calculateReadTime(featuredPost.content)} min read</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Link 
                        href={`/posts/${featuredPost.slug}`} 
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                      >
                        Read Featured Article
                        <ArrowRight className="w-5 h-5" />
                      </Link>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(featuredPost.id)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                            likedPosts.has(featuredPost.id)
                              ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 shadow-lg'
                              : 'bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-pink-100 hover:to-rose-100 hover:text-pink-600 hover:shadow-lg'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${likedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                          <span className="font-semibold">{(featuredPost.likes || 0) + (likedPosts.has(featuredPost.id) ? 1 : 0)}</span>
                        </button>
                        <div className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl">
                          <MessageSquare className="w-5 h-5" />
                          <span className="font-semibold">{featuredPost.comments || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Enhanced Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative bg-white rounded-3xl shadow-xl border border-slate-100 p-8 mb-12"
        >
          {/* Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl"></div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
              {/* Enhanced Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, authors, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all text-lg shadow-sm hover:shadow-md"
                />
              </div>

              {/* Enhanced View Toggle */}
              <div className="flex items-center gap-4">
                <div className="flex bg-slate-100 rounded-2xl p-1 shadow-sm">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'grid' 
                        ? 'bg-white shadow-lg text-indigo-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      viewMode === 'list' 
                        ? 'bg-white shadow-lg text-indigo-600' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all duration-300 ${
                    showFilters 
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:shadow-md'
                  }`}
                >
                  <Filter className="w-5 h-5" />
                  Filters
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </div>

            {/* Enhanced Advanced Filters */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 pt-8 border-t border-slate-100"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all text-lg shadow-sm hover:shadow-md"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tag Filter */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Tag</label>
                      <select
                        value={selectedTag}
                        onChange={(e) => setSelectedTag(e.target.value)}
                        className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all text-lg shadow-sm hover:shadow-md"
                      >
                        <option value="all">All Tags</option>
                        {allTags.map(tag => (
                          <option key={tag} value={tag}>{tag}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sort */}
                    <div>
                      <label className="block text-sm font-bold text-slate-900 mb-3">Sort By</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
                        className="w-full p-4 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50 focus:bg-white transition-all text-lg shadow-sm hover:shadow-md"
                      >
                        <option value="newest">Newest First</option>
                        <option value="oldest">Oldest First</option>
                        <option value="popular">Most Popular</option>
                        <option value="title">Alphabetical</option>
                      </select>
                    </div>
                  </div>

                  {/* Enhanced Clear Filters */}
                  {hasActiveFilters && (
                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={clearFilters}
                        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-300 hover:scale-105"
                      >
                        <FilterX className="w-4 h-4" />
                        Clear all filters
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Enhanced Results Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <p className="text-slate-900 font-bold text-lg">
                {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'article' : 'articles'} found
              </p>
            </div>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200 shadow-sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtered
              </span>
            )}
          </div>
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh Posts
          </button>
        </motion.div>

        {/* Posts Grid/List */}
        {filteredAndSortedPosts.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No articles found</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-blue-600 text-white px-8 py-4 rounded-2xl hover:bg-blue-700 transition-colors font-semibold"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              <AnimatePresence>
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white rounded-3xl shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group ${
                      viewMode === 'list' ? 'flex gap-6' : ''
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Featured Image */}
                    {post.featuredImage && (
                      <div className={`${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'aspect-video'} relative overflow-hidden`}>
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {post.videoUrl && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/95 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                              <Video className="w-8 h-8 text-black" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => toggleBookmark(post.id)}
                            className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                          >
                            <BookmarkIcon className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current text-purple-600' : 'text-slate-700'}`} />
                          </button>
                          <button
                            onClick={() => sharePost('copy', post)}
                            className="p-2 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110"
                          >
                            {copiedLink === post.id ? <Check className="w-5 h-5 text-green-600" /> : <Share2 className="w-5 h-5 text-slate-700" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Content */}
                    <div className={viewMode === 'list' ? 'flex-1 p-8' : 'p-6'}>
                      {/* Category and Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200">
                          {post.category}
                        </span>
                        {post.videoUrl && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 border border-pink-200">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl lg:text-2xl font-bold text-slate-900 mb-4 line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed text-base">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Author & Meta */}
                      <div className="flex items-center gap-4 mb-6">
                        {post.authorAvatar ? (
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-100 shadow-md"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md">
                            <span className="text-white font-bold text-lg">{post.author.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900">{post.author}</p>
                          <div className="flex items-center gap-3 text-sm text-slate-600">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(post.createdAt)}</span>
                            <span>•</span>
                            <Clock className="w-4 h-4" />
                            <span>{post.readTime || calculateReadTime(post.content)} min read</span>
                          </div>
                        </div>
                      </div>

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex items-center gap-2 mb-6">
                          <Hash className="w-4 h-4 text-slate-400" />
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-slate-600 hover:text-indigo-600 cursor-pointer font-medium transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-slate-600 font-medium">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Enhanced Action Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                        <Link 
                          href={`/posts/${post.slug}`} 
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold text-sm group/link transition-colors duration-300"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                        </Link>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                              likedPosts.has(post.id)
                                ? 'bg-gradient-to-r from-pink-100 to-rose-100 text-pink-600 shadow-md'
                                : 'bg-slate-100 text-slate-600 hover:bg-gradient-to-r hover:from-pink-100 hover:to-rose-100 hover:text-pink-600 hover:shadow-md'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{(post.likes || 0) + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-1 px-3 py-2 bg-slate-100 text-slate-600 rounded-lg">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm font-medium">{post.comments || 0}</span>
                          </div>
                          <button
                            onClick={() => sharePost('twitter', post)}
                            className="p-2 text-slate-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all duration-300"
                            title="Share on Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sharePost('facebook', post)}
                            className="p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-300"
                            title="Share on Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-16 flex items-center justify-center gap-3"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                        currentPage === page
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:shadow-md hover:scale-105'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-sm hover:shadow-md hover:scale-105"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}