'use client'

import { useState } from 'react'

export default function DeleteButton({
  slug,
  onDelete
}: {
  slug: string
  onDelete?: () => void
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const deletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/posts/${slug}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData?.error || 'Failed to delete post')
      }

      if (onDelete) onDelete()
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={deletePost}
        disabled={loading}
        className="text-red-500 hover:text-red-700 font-medium"
      >
        {loading ? 'Deleting...' : 'Delete'}
      </button>
      {error && (
        <div className="text-sm text-red-500 mt-1">{error}</div>
      )}
    </>
  )
}
