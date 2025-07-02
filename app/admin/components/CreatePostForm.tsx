'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Upload } from 'lucide-react'

export default function CreatePostForm() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState('')
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (!featuredImage) {
        throw new Error('Please upload a featured image')
      }

      // Generate a unique slug
      let baseSlug = title.toLowerCase()
        .replace(/\s+/g, '-')  // Replace spaces with hyphens
        .replace(/[^a-z0-9-]/g, '')  // Remove special characters
        .slice(0, 50)  // Limit length
      
      let slug = baseSlug
      let counter = 1
      
      // Check if slug exists and add number suffix if needed
      const existingPost = await fetch('/api/posts', {
        method: 'GET'
      })
      
      if (existingPost.ok) {
        const posts = await existingPost.json()
        const existingSlugs = posts.map((post: any) => post.slug)
        
        while (existingSlugs.includes(slug)) {
          slug = `${baseSlug}-${counter}`
          counter++
        }
      }

      // Create FormData for image upload
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('author', author)
      formData.append('category', category)
      formData.append('tags', tags)
      formData.append('slug', slug)
      
      // Handle featured image
      if (featuredImage) {
        formData.append('featuredImage', featuredImage, featuredImage.name)
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        router.refresh()
        router.push('/admin')
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Featured Image</label>
        <div className="flex items-center gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setFeaturedImage(file)
                const reader = new FileReader()
                reader.onload = (event) => {
                  setImagePreview(event.target?.result as string)
                }
                reader.readAsDataURL(file)
              }
            }}
            className="hidden"
            id="featuredImage"
          />
          <label
            htmlFor="featuredImage"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Image
          </label>
        </div>
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded min-h-[200px]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Tags</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter tags separated by commas"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Post
      </button>
    </form>
  )
}
