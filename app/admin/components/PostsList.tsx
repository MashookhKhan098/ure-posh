'use client'

import { useEffect, useState } from 'react'
import { Post } from '@/types/post'
import DeleteButton from './DeleteButton'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Calendar, 
  User, 
  Tag, 
  MoreVertical,
  ExternalLink,
  Clock,
  CheckCircle,
  AlertCircle,
  Zap,
  Database,
  Globe,
  FileText,
  PenTool,
  Video
} from 'lucide-react'

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [posts, searchTerm, statusFilter, categoryFilter, sortBy])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        // Supabase returns posts directly in the data array
        setPosts(data.posts || [])
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Failed to fetch posts')
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
      setError('Error fetching posts')
    } finally {
      setLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = [...posts]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(post => post.status === statusFilter)
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          // Use created_at for Supabase
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'title':
          return a.title.localeCompare(b.title)
        case 'status':
          return a.status.localeCompare(b.status)
        default:
          return 0
      }
    })

    setFilteredPosts(filtered)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PUBLISHED: {
        label: 'Published',
        className: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-700 border-green-500/50',
        icon: CheckCircle
      },
      DRAFT: {
        label: 'Draft',
        className: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-700 border-yellow-500/50',
        icon: PenTool
      },
      ARCHIVED: {
        label: 'Archived',
        className: 'bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-700 border-gray-500/50',
        icon: Database
      }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${config.className}`}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
          <div className="relative w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <span className="ml-4 text-gray-600 font-medium">Loading posts...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    )
  }

  if (filteredPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-16 w-16 mb-4 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <p className="text-gray-900 font-medium">No posts found</p>
        <p className="text-gray-600 text-sm mt-2">Create your first blog post to get started</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
        >
          <option value="all">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="ARCHIVED">Archived</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
        >
          <option value="all">All Categories</option>
          <option value="tech">Technology</option>
          <option value="business">Business</option>
          <option value="lifestyle">Lifestyle</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
        >
          <option value="date">Sort by Date</option>
          <option value="title">Sort by Title</option>
          <option value="status">Sort by Status</option>
        </select>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div key={post.slug} className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
            <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 hover:border-blue-300/70 transition-all duration-300 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                        {post.excerpt || post.content.substring(0, 150)}...
                      </p>
                    </div>
                    <div className="ml-4 flex items-center space-x-2">
                      {getStatusBadge(post.status)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(post.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <User className="h-4 w-4" />
                      <span>{post.author || 'Unknown'}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-500">
                      <Eye className="h-4 w-4" />
                      <span>{post.views || 0} views</span>
                    </div>
                    {post.video_url && (
                      <div className="flex items-center space-x-2 text-green-600">
                        <Video className="h-4 w-4" />
                        <span>Video</span>
                      </div>
                    )}
                    {post.category && (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <Tag className="h-4 w-4" />
                        <span>{post.category}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 rounded-xl hover:bg-blue-50 transition-colors group">
                    <Eye className="h-4 w-4 text-blue-600 group-hover:text-blue-700" />
                  </button>
                  <button className="p-2 rounded-xl hover:bg-purple-50 transition-colors group">
                    <Edit className="h-4 w-4 text-purple-600 group-hover:text-purple-700" />
                  </button>
                  <DeleteButton slug={post.slug} title={post.title} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Summary */}
      <div className="text-center py-6">
        <p className="text-gray-600 font-medium">
          Showing {filteredPosts.length} of {posts.length} posts
        </p>
      </div>
    </div>
  )
}
