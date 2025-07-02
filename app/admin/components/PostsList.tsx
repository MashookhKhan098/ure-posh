'use client'

import { useEffect, useState } from 'react'
import { Post } from '@/types/post'

export default function PostsList() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const data = await response.json()
      setPosts(data.posts || [])
      setError(null)
    } catch (err) {
      console.error('Error fetching posts:', err)
      setError('Failed to load posts')
    } finally {
      setLoading(false)
    }
  }

  const deletePost = async (slug: string) => {
    if (!window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
      return
    }

    try {
      setError(null)
      
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.error) {
          throw new Error(errorData.error)
        }
        throw new Error('Failed to delete post')
      }

      setPosts(posts.filter(post => post.slug !== slug))
      
      await fetchPosts()
      
    } catch (error) {
      console.error('Error deleting post:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete post')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mt-2"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mt-2"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative">
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No posts found</p>
        <p className="text-sm text-gray-400 mt-2">Create your first post using the form on the left</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Author</th>
              <th className="px-6 py-3 text-left">Category</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post: Post) => (
              <tr key={post.id} className="border-b">
                <td className="px-6 py-4">
                  {post.tags ? post.tags.split(',').map(tag => tag.trim()).join(', ') : ''}
                </td>
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">{post.author}</td>
                <td className="px-6 py-4">{post.category}</td>
                <td className="px-6 py-4">{post.status}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deletePost(post.slug)}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => window.open(`/posts/${post.slug}`, '_blank')}
                    className="ml-2 text-blue-500 hover:text-blue-700 font-medium"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
