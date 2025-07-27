'use client'

import { useEffect, useState } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  User, 
  Calendar, 
  Tag, 
  MessageSquare,
  AlertCircle,
  Check,
  X,
  FileText,
  PenTool
} from 'lucide-react'

interface Post {
  id: string
  title: string
  content: string
  excerpt?: string
  author: string
  category: string
  status: string
  post_status: string
  created_at: string
  featured_image?: string
  video_url?: string
  video_title?: string
  video_description?: string
  tags: string
  slug: string
  view_count?: number
  read_time?: number
  likes?: number
  comments_count?: number
  rejection_reason?: string
}

export default function ApprovalList() {
  const [pendingPosts, setPendingPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [rejectionReason, setRejectionReason] = useState('')
  const [showRejectionModal, setShowRejectionModal] = useState(false)
  const [processingAction, setProcessingAction] = useState<string | null>(null)

  useEffect(() => {
    fetchPendingPosts()
  }, [])

  const fetchPendingPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts?approval_status=pending')
      
      if (response.ok) {
        const data = await response.json()
        setPendingPosts(Array.isArray(data) ? data : [])
      } else {
        setError('Failed to fetch pending posts')
      }
    } catch (error) {
      console.error('Error fetching pending posts:', error)
      setError('Failed to fetch pending posts')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (postId: string) => {
    setProcessingAction(postId)
    try {
      const response = await fetch(`/api/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'approve' }),
      })

      if (response.ok) {
        alert('Post approved successfully!')
        fetchPendingPosts() // Refresh the list
      } else {
        const errorData = await response.json()
        alert(`Error approving post: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error approving post:', error)
      alert('Error approving post. Please try again.')
    } finally {
      setProcessingAction(null)
    }
  }

  const handleReject = async (postId: string, reason: string) => {
    setProcessingAction(postId)
    try {
      const response = await fetch(`/api/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reject', reason }),
      })

      if (response.ok) {
        alert('Post rejected successfully!')
        setShowRejectionModal(false)
        setRejectionReason('')
        fetchPendingPosts() // Refresh the list
      } else {
        const errorData = await response.json()
        alert(`Error rejecting post: ${errorData.error}`)
      }
    } catch (error) {
      console.error('Error rejecting post:', error)
      alert('Error rejecting post. Please try again.')
    } finally {
      setProcessingAction(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </span>
        )
      case 'approved':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </span>
        )
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        )
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-gray-600">Loading pending posts...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button 
            onClick={fetchPendingPosts}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">Writer Approvals</h3>
          <p className="text-gray-600">
            {pendingPosts.length} post{pendingPosts.length !== 1 ? 's' : ''} waiting for approval
          </p>
        </div>
        <button
          onClick={fetchPendingPosts}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Refresh
        </button>
      </div>

      {/* Posts List */}
      {pendingPosts.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Pending Posts</h3>
          <p className="text-gray-600">All writer submissions have been reviewed.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {pendingPosts.map((post) => (
            <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">{post.title}</h4>
                    {getStatusBadge(post.post_status)}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.created_at)}
                    </div>
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-1" />
                      {post.category}
                    </div>
                    {post.read_time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.read_time} min read
                      </div>
                    )}
                  </div>

                  {post.excerpt && (
                    <p className="text-gray-700 mb-4 line-clamp-2">{post.excerpt}</p>
                  )}

                  {post.rejection_reason && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center text-red-800">
                        <AlertCircle className="h-4 w-4 mr-2" />
                        <span className="font-medium">Rejection Reason:</span>
                      </div>
                      <p className="text-red-700 mt-1">{post.rejection_reason}</p>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => {
                        setSelectedPost(post)
                        setShowPreview(true)
                      }}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Preview
                    </button>
                    
                    <button
                      onClick={() => handleApprove(post.id)}
                      disabled={processingAction === post.id}
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
                    >
                      {processingAction === post.id ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      Approve
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedPost(post)
                        setShowRejectionModal(true)
                      }}
                      disabled={processingAction === post.id}
                      className="flex items-center px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </button>
                  </div>
                </div>

                {post.featured_image && (
                  <div className="ml-6">
                    <img 
                      src={post.featured_image} 
                      alt={post.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Post Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{selectedPost.title}</h1>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {selectedPost.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(selectedPost.created_at)}
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {selectedPost.category}
                </div>
              </div>

              {selectedPost.featured_image && (
                <img 
                  src={selectedPost.featured_image} 
                  alt={selectedPost.title}
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
              )}

              <div className="prose max-w-none">
                <div dangerouslySetInnerHTML={{ __html: selectedPost.content }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">Reject Post</h3>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Are you sure you want to reject "{selectedPost.title}"?
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (Optional)
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  placeholder="Provide a reason for rejection..."
                />
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleReject(selectedPost.id, rejectionReason)}
                  disabled={processingAction === selectedPost.id}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
                >
                  {processingAction === selectedPost.id ? 'Rejecting...' : 'Reject Post'}
                </button>
                <button
                  onClick={() => {
                    setShowRejectionModal(false)
                    setRejectionReason('')
                  }}
                  className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 