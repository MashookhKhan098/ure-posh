'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Tag as TagIcon, 
  Share2, 
  Heart, 
  MessageCircle, 
  Bookmark as BookmarkIcon,
  ChevronDown, 
  Grid, 
  List, 
  RefreshCw, 
  AlertCircle, 
  Twitter, 
  Facebook,
  Linkedin,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  Video,
  Filter,
  TrendingUp,
  Eye,
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
  Hash
} from 'lucide-react'

interface PostResponse {
  id: string
  title: string
  excerpt: string
  author: string
  authorAvatar?: string
  authorBio?: string
  category: string
  createdAt: string
  featuredImage?: string
  videoUrl?: string
  videoTitle?: string
  videoDescription?: string
  tags?: string[]
  slug: string
  content: string
  gallery?: string[]
  readTime?: number
  likes?: number
  comments?: number
  bookmarked?: boolean
}

type ViewMode = 'grid' | 'list'
type SortOption = 'newest' | 'oldest' | 'popular' | 'title'

export default function EnhancedPostsPage() {
  const [posts, setPosts] = useState<PostResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set())
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
  const [postsPerPage] = useState(9)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      
      if (response.ok) {
        const data = await response.json()
        setPosts(data.posts || [])
      } else {
        throw new Error('Failed to fetch posts')
      }
      
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please check your internet connection.')
    } finally {
      setLoading(false)
    }
  }

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

  const handleImageError = (src: string) => {
    setImageErrors(prev => new Set([...prev, src]))
  }

  const isImageBroken = (src: string) => imageErrors.has(src)

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
    const uniqueCategories = [...new Set(posts.map(post => post.category))]
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

  // Featured post (first post)
  const featuredPost = posts.length > 0 ? posts[0] : null

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded-lg w-80 mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mb-12"></div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                        <div className="h-3 bg-gray-200 rounded w-32"></div>
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

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <AlertCircle className="w-16 h-16 text-pink-500 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-black mb-3">Failed to Load Posts</h3>
            <p className="text-black mb-6">{error}</p>
            <button
              onClick={fetchPosts}
              className="bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition-colors flex items-center gap-2 mx-auto"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-pink-600 via-rose-600 to-pink-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-5 h-5 text-pink-300" />
              <span className="text-white/90 text-sm font-medium">Discover Amazing Content</span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Our Blog
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover insights, tutorials, and stories from our community. 
              Stay updated with the latest trends and best practices.
            </p>
            <div className="flex items-center justify-center gap-6 text-white/80">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">{posts.length} Articles</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Expert Authors</span>
              </div>
              <div className="w-1 h-1 bg-white/50 rounded-full"></div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="font-medium">Premium Content</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Post */}
        {featuredPost && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Featured Image */}
                <div className="relative h-80 lg:h-full overflow-hidden">
                  {featuredPost.featuredImage && !isImageBroken(featuredPost.featuredImage) ? (
                    <img 
                      src={featuredPost.featuredImage} 
                      alt={featuredPost.title}
                      onError={() => handleImageError(featuredPost.featuredImage!)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-white/50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  {featuredPost.videoUrl && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Video className="w-10 h-10 text-black" />
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-400 text-pink-900">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => toggleBookmark(featuredPost.id)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      <BookmarkIcon className={`w-5 h-5 ${bookmarkedPosts.has(featuredPost.id) ? 'fill-current text-pink-600' : 'text-black'}`} />
                    </button>
                    <button
                      onClick={() => sharePost('copy', featuredPost)}
                      className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                    >
                      {copiedLink === featuredPost.id ? <Check className="w-5 h-5 text-pink-600" /> : <Share className="w-5 h-5 text-black" />}
                    </button>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                      {featuredPost.category}
                    </span>
                    {featuredPost.videoUrl && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-800">
                        <Video className="w-3 h-3 mr-1" />
                        Video
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4 leading-tight">
                    <Link href={`/posts/${featuredPost.slug}`} className="hover:text-pink-600 transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>

                  {featuredPost.excerpt && (
                    <p className="text-black mb-6 leading-relaxed line-clamp-3">
                      {featuredPost.excerpt}
                    </p>
                  )}

                  <div className="flex items-center gap-4 mb-6">
                    {featuredPost.authorAvatar && !isImageBroken(featuredPost.authorAvatar) ? (
                      <img
                        src={featuredPost.authorAvatar}
                        alt={featuredPost.author}
                        onError={() => handleImageError(featuredPost.authorAvatar!)}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-md">
                        <span className="text-white font-bold text-lg">{featuredPost.author.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-black">{featuredPost.author}</p>
                      <div className="flex items-center gap-3 text-sm text-black">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(featuredPost.createdAt)}</span>
                        <span>•</span>
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime || calculateReadTime(featuredPost.content)} min read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Link 
                      href={`/posts/${featuredPost.slug}`} 
                      className="inline-flex items-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition-colors font-semibold shadow-lg hover:shadow-xl"
                    >
                      Read Featured Article
                      <ArrowRight className="w-5 h-5" />
                    </Link>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(featuredPost.id)}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                          likedPosts.has(featuredPost.id)
                            ? 'bg-pink-100 text-pink-600'
                            : 'bg-gray-100 text-black hover:bg-pink-100 hover:text-pink-600'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${likedPosts.has(featuredPost.id) ? 'fill-current' : ''}`} />
                        <span className="text-sm font-medium">{(featuredPost.likes || 0) + (likedPosts.has(featuredPost.id) ? 1 : 0)}</span>
                      </button>
                      <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-black rounded-lg">
                        <MessageSquare className="w-4 h-4" />
                        <span className="text-sm font-medium">{featuredPost.comments || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories Showcase */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-3">Explore Categories</h2>
            <p className="text-black max-w-2xl mx-auto">Discover content organized by topics that interest you most</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.slice(0, 6).map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setSelectedCategory(category)}
                className={`p-4 rounded-2xl text-center transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-pink-600 text-white shadow-lg scale-105'
                    : 'bg-white text-black hover:bg-pink-50 hover:scale-105 shadow-sm border border-gray-100'
                }`}
              >
                <div className="w-8 h-8 mx-auto mb-2 flex items-center justify-center">
                  {category === 'Technology' && <Zap className="w-5 h-5" />}
                  {category === 'Business' && <TrendingUp className="w-5 h-5" />}
                  {category === 'Health' && <Heart className="w-5 h-5" />}
                  {category === 'Travel' && <Globe className="w-5 h-5" />}
                  {category === 'Food' && <Palette className="w-5 h-5" />}
                  {category === 'Lifestyle' && <Sparkles className="w-5 h-5" />}
                  {category === 'Education' && <BookOpen className="w-5 h-5" />}
                  {category === 'Entertainment' && <Video className="w-5 h-5" />}
                  {category === 'Sports' && <Target className="w-5 h-5" />}
                  {category === 'Finance' && <TrendingDown className="w-5 h-5" />}
                  {category === 'Science' && <Layers className="w-5 h-5" />}
                  {category === 'Art' && <Camera className="w-5 h-5" />}
                </div>
                <span className="text-sm font-semibold">{category}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-lg"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-4">
              <div className="flex bg-gray-100 rounded-2xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-lg text-pink-600' 
                      : 'text-black hover:text-black'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-lg text-pink-600' 
                      : 'text-black hover:text-black'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-4 rounded-2xl transition-all ${
                  showFilters 
                    ? 'bg-pink-600 text-white shadow-lg' 
                    : 'bg-gray-100 text-black hover:bg-gray-200'
                }`}
              >
                <Filter className="w-5 h-5" />
                Filters
                <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 pt-8 border-t border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-bold text-black mb-3">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-lg"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  {/* Tag Filter */}
                  <div>
                    <label className="block text-sm font-bold text-black mb-3">Tag</label>
                    <select
                      value={selectedTag}
                      onChange={(e) => setSelectedTag(e.target.value)}
                      className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-lg"
                    >
                      <option value="all">All Tags</option>
                      {allTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-bold text-black mb-3">Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-lg"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="popular">Most Popular</option>
                      <option value="title">Alphabetical</option>
                    </select>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-semibold"
                    >
                      <FilterX className="w-4 h-4" />
                      Clear all filters
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <p className="text-black font-semibold text-lg">
              {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'article' : 'articles'} found
            </p>
            {hasActiveFilters && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-pink-100 text-pink-800">
                <Filter className="w-3 h-3 mr-1" />
                Filtered
              </span>
            )}
          </div>
          <button
            onClick={fetchPosts}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-semibold"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
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
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-black" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">No articles found</h3>
            <p className="text-black mb-8 max-w-md mx-auto">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="bg-pink-600 text-white px-8 py-4 rounded-2xl hover:bg-pink-700 transition-colors font-semibold"
              >
                Clear all filters
              </button>
            )}
          </motion.div>
        ) : (
          <>
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              <AnimatePresence>
                {currentPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-white rounded-3xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group ${
                      viewMode === 'list' ? 'flex gap-6' : ''
                    }`}
                  >
                    {/* Featured Image */}
                    {post.featuredImage && !isImageBroken(post.featuredImage) && (
                      <div className={`${viewMode === 'list' ? 'w-80 flex-shrink-0' : 'aspect-video'} relative overflow-hidden`}>
                        <img 
                          src={post.featuredImage} 
                          alt={post.title}
                          onError={() => handleImageError(post.featuredImage!)}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        {post.videoUrl && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                              <Video className="w-8 h-8 text-black" />
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => toggleBookmark(post.id)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                          >
                            <BookmarkIcon className={`w-5 h-5 ${bookmarkedPosts.has(post.id) ? 'fill-current text-pink-600' : 'text-black'}`} />
                          </button>
                          <button
                            onClick={() => sharePost('copy', post)}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
                          >
                            {copiedLink === post.id ? <Check className="w-5 h-5 text-pink-600" /> : <Share className="w-5 h-5 text-black" />}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className={viewMode === 'list' ? 'flex-1 p-8' : 'p-8'}>
                      {/* Category and Tags */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
                          {post.category}
                        </span>
                        {post.videoUrl && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-800">
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h2 className="text-xl lg:text-2xl font-bold text-black mb-4 line-clamp-2 group-hover:text-pink-600 transition-colors leading-tight">
                        <Link href={`/posts/${post.slug}`}>
                          {post.title}
                        </Link>
                      </h2>

                      {/* Excerpt */}
                      {post.excerpt && (
                        <p className="text-black mb-6 line-clamp-3 leading-relaxed text-base">
                          {post.excerpt}
                        </p>
                      )}

                      {/* Author & Meta */}
                      <div className="flex items-center gap-4 mb-6">
                        {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                          <img
                            src={post.authorAvatar}
                            alt={post.author}
                            onError={() => handleImageError(post.authorAvatar!)}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                            <span className="text-white font-bold text-lg">{post.author.charAt(0).toUpperCase()}</span>
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-black">{post.author}</p>
                          <div className="flex items-center gap-3 text-sm text-black">
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
                          <Hash className="w-4 h-4 text-black" />
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="text-xs text-black hover:text-black cursor-pointer font-medium"
                              >
                                #{tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="text-xs text-black font-medium">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <Link 
                          href={`/posts/${post.slug}`} 
                          className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 font-bold text-sm group/link"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                              likedPosts.has(post.id)
                                ? 'bg-pink-100 text-pink-600'
                                : 'bg-gray-100 text-black hover:bg-pink-100 hover:text-pink-600'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            <span className="text-sm font-medium">{(post.likes || 0) + (likedPosts.has(post.id) ? 1 : 0)}</span>
                          </button>
                          <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-black rounded-lg">
                            <MessageSquare className="w-4 h-4" />
                            <span className="text-sm font-medium">{post.comments || 0}</span>
                          </div>
                          <button
                            onClick={() => sharePost('twitter', post)}
                            className="p-2 text-black hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-colors"
                            title="Share on Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => sharePost('facebook', post)}
                            className="p-2 text-black hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
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

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="mt-12 flex items-center justify-center gap-2"
              >
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 rounded-xl font-semibold transition-colors ${
                        currentPage === page
                          ? 'bg-pink-600 text-white shadow-lg'
                          : 'bg-white text-black border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-3 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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