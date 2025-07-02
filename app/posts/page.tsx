'use client'

import { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
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
  ExternalLink
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'


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
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    // Always fetch real data from the API
    fetchPosts()
  }, [])

  const fetchPosts = async (showRetryLoader = false) => {
    try {
      if (!showRetryLoader) setLoading(true)
      
      // Try to fetch from API
      const response = await fetch('/api/posts')
      
      if (response.ok) {
        const data = await response.json()
        // Extract posts from the response
        setPosts(data.posts || [])
      } else {
        throw new Error('Failed to fetch posts')
      }
      
      setError(null)
      setRetryCount(0)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts. Please check your internet connection.')
      setError('Using offline content. Some features may be limited.')
      setRetryCount(prev => prev + 1)
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    fetchPosts(true)
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
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
    const url = `${window.location.origin}/blog/${post.slug}`
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
        // Fallback for older browsers
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
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
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

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
    setSelectedTag('all')
    setSortBy('newest')
  }

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || selectedTag !== 'all' || sortBy !== 'newest'

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">Failed to Load Posts</h3>
          <p className="text-red-600 mb-4">{error}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry {retryCount > 0 && `(${retryCount})`}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Latest Blog Posts</h1>
        <p className="text-gray-600">Discover insights, tutorials, and stories from our community</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
              </svg>
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tag</label>
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Tags</option>
                  {allTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              <div className="mt-4 flex justify-end">
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {filteredAndSortedPosts.length} {filteredAndSortedPosts.length === 1 ? 'post' : 'posts'} found
        </p>
        <button
          onClick={() => fetchPosts(true)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Posts Grid/List */}
      {filteredAndSortedPosts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredAndSortedPosts.map(post => (
            <article key={post.id} className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow ${
              viewMode === 'list' ? 'flex gap-6 p-6' : 'overflow-hidden'
            }`}>
              {/* Featured Image */}
              {post.featuredImage && !isImageBroken(post.featuredImage) && (
                <div className={`${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'aspect-video'} relative`}>
                  <img 
                    src={post.featuredImage} 
                    alt={post.title}
                    onError={() => handleImageError(post.featuredImage!)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleBookmark(post.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white/90 transition-colors"
                  >
                    <BookmarkIcon className={`w-4 h-4 ${bookmarkedPosts.has(post.id) ? 'fill-current text-blue-600' : 'text-gray-600'}`} />
                  </button>
                </div>
              )}

              {/* Content */}
              <div className={viewMode === 'list' ? 'flex-1' : 'p-6'}>
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {post.category}
                  </span>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center gap-1">
                      <TagIcon className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">
                        {post.tags.slice(0, 2).join(', ')}
                        {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                      </span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 cursor-pointer">
                  {post.title}
                </h2>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                {/* Author & Meta */}
                <div className="flex items-center gap-3 mb-4">
                  {post.authorAvatar && !isImageBroken(post.authorAvatar) ? (
                    <img
                      src={post.authorAvatar}
                      alt={post.author}
                      onError={() => handleImageError(post.authorAvatar!)}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime || calculateReadTime(post.content)} min read</span>
                    </div>
                  </div>
                </div>

                {/* Engagement Stats */}
                {(post.likes || post.comments) && (
                  <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                    {post.likes && (
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        <span>{post.likes}</span>
                      </div>
                    )}
                    {post.comments && (
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <Link href={`/posts/${post.slug}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                    Read More
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => sharePost('twitter', post)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
                      title="Share on Twitter"
                    >
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => sharePost('facebook', post)}
                      className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
                      title="Share on Facebook"
                    >
                      <Facebook className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Read More
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}