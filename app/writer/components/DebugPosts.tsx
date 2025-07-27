'use client'

import { useEffect, useState } from 'react'

export default function DebugPosts() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/posts')
      const data = await response.json()
      
      console.log('Debug - Raw API response:', data)
      console.log('Debug - Response type:', typeof data)
      console.log('Debug - Is array:', Array.isArray(data))
      console.log('Debug - Length:', Array.isArray(data) ? data.length : 'N/A')
      
      setPosts(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Debug - Fetch error:', error)
      setError('Failed to fetch posts')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-4">Loading posts...</div>
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>
  }

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-bold">Debug: Posts Data</h3>
      <div className="text-sm text-gray-600">
        Total posts: {posts.length}
      </div>
      
      {posts.length === 0 ? (
        <div className="text-gray-500">No posts found</div>
      ) : (
        <div className="space-y-2">
          {posts.slice(0, 3).map((post, index) => (
            <div key={index} className="p-3 bg-gray-100 rounded border">
              <div className="text-sm">
                <strong>Title:</strong> {post.title || 'No title'}<br/>
                <strong>Author:</strong> {post.author || 'No author'}<br/>
                <strong>Status:</strong> {post.status || 'No status'}<br/>
                <strong>Created:</strong> {post.created_at || 'No date'}<br/>
                <strong>ID:</strong> {post.id || 'No ID'}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <button
        onClick={fetchPosts}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Debug Data
      </button>
    </div>
  )
} 