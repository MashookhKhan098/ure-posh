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
  Video,
  Star
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

  // Expose refresh function to parent component
  const refreshPosts = () => {
    fetchPosts()
  }

  // Make refreshPosts available globally for other components
  if (typeof window !== 'undefined') {
    (window as any).refreshPostsList = refreshPosts
  }

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
        console.log('Fetched articles data:', data) // Debug log
        // Transform Supabase data to match Post interface (using new column names)
        const transformedPosts = (data || []).map((post: any) => ({
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt || post.content.substring(0, 150),
          author: post.author,
          category: post.category,
          status: post.status,
          created_at: post.created_at,
          updated_at: post.updated_at,
          featured_image: post.featured_image,
          video_url: post.video_url,
          video_title: post.video_title,
          video_description: post.video_description,
          tags: post.tags || '',
          slug: post.slug,
          views: post.view_count || 0,
          read_time: post.read_time,
          likes: post.likes || 0,
          comments: post.comments_count || 0,
          is_featured: post.is_featured || false
        }))
        setPosts(transformedPosts)
      } else {
        setError('Failed to fetch articles')
      }
    } catch (error) {
      setError('Error fetching articles')
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
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase())
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
    switch (sortBy) {
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'author':
        filtered.sort((a, b) => a.author.localeCompare(b.author))
        break
      case 'views':
        filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
        break
      case 'date':
      default:
        filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    setFilteredPosts(filtered)
  }

  const handleDelete = async (slug: string) => {
    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug))
      } else {
        console.error('Failed to delete post')
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      published: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
      draft: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      archived: { color: 'bg-gray-100 text-gray-800', icon: AlertCircle }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status}
      </span>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="Workplace Safety">Workplace Safety</option>
            <option value="Legal Compliance">Legal Compliance</option>
            <option value="Women Safety">Women Safety</option>
            <option value="POSH Compliance">POSH Compliance</option>
            <option value="General">General</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Date</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="views">Views</option>
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500">
            {filteredPosts.length} of {posts.length} articles
          </div>
          <button
            onClick={fetchPosts}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
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
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      {getStatusBadge(post.status)}
                      {post.is_featured && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(post.created_at).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views || 0} views</span>
                    </div>
                    {post.video_url && (
                      <div className="flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>Video</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">{post.category}</span>
                      {post.tags && (
                        <div className="flex items-center space-x-1">
                          <Tag className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-500">
                            {post.tags.split(',').length} tags
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <DeleteButton slug={post.slug} onDelete={() => handleDelete(post.slug)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No articles found</p>
        </div>
      )}
    </div>
  )
}
