'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Save, FileText, Type, Image, Tag, Sparkles, PenTool, Eye } from 'lucide-react'
import { useWriterAuth } from '@/hooks/useWriterAuth'
import { useToast } from '@/hooks/use-toast'

interface Category {
  id: string
  name: string
}

interface CreatePostFormProps {
  onClose: () => void
  onSubmit?: () => void
}

export default function CreatePostForm({ onClose, onSubmit }: CreatePostFormProps) {
  const { writer } = useWriterAuth()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category_id: '',
  })

  const [categories, setCategories] = useState<Category[]>([])
  const [submitting, setSubmitting] = useState(false)

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const result = await response.json()
      if (result.data) {
        setCategories(result.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive"
      })
      return false
    }
    if (!formData.excerpt.trim()) {
      toast({
        title: "Validation Error", 
        description: "Excerpt is required",
        variant: "destructive"
      })
      return false
    }
    if (!formData.content.trim()) {
      toast({
        title: "Validation Error",
        description: "Content is required", 
        variant: "destructive"
      })
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const slug = generateSlug(formData.title)
      const author = writer?.name || writer?.username || 'Anonymous'

      const response = await fetch('/api/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: slug,
          excerpt: formData.excerpt,
          content: formData.content,
          image_url: formData.image_url || null,
          author: author,
          category_id: formData.category_id || null,
          is_breaking: false,
          is_hot: false,
          is_featured: false,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create article')
      }

      toast({
        title: "Success!",
        description: "Article created successfully",
      })

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        image_url: '',
        category_id: '',
      })

      onSubmit?.()
      onClose()
    } catch (error) {
      console.error('Error creating article:', error)
      toast({
        title: "Error",
        description: "Failed to create article. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 z-50 flex items-center justify-center p-6">
      <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 w-full max-w-5xl max-h-[95vh] overflow-hidden">
        {/* Admin Style Header */}
        <div className="px-8 py-5 border-b border-pink-200/50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Create New Article</h2>
              <p className="text-sm text-gray-600 mt-1">Share your knowledge and insights with readers</p>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-white/70 border border-pink-200 text-pink-700 hover:bg-white hover:text-pink-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Admin Style Form Content */}
        <div className="max-h-[calc(95vh-120px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2 space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Title <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Enter a compelling title for your article..."
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Excerpt <span className="text-red-500">*</span></label>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Write a captivating summary that hooks your readers..."
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500 resize-none"
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">Keep it engaging and under 160 characters</span>
                    <span className={`text-xs font-medium ${formData.excerpt.length > 160 ? 'text-red-500' : 'text-pink-600'}`}>
                      {formData.excerpt.length}/160
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Article Content <span className="text-red-500">*</span></label>
                  <textarea
                    rows={16}
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Start writing your article here. Share your knowledge, insights, and experiences..."
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500 resize-none leading-relaxed"
                    required
                  />
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                      Reading time: ~{Math.ceil(formData.content.split(' ').filter(word => word.length > 0).length / 200)} min
                    </span>
                    <span className="text-xs text-pink-600 font-medium">
                      {formData.content.split(' ').filter(word => word.length > 0).length} words
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => handleInputChange('image_url', e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-3.5 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500"
                  />
                  {formData.image_url && (
                    <div className="mt-2 rounded-xl overflow-hidden border border-pink-200">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-32 object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => handleInputChange('category_id', value)}
                  >
                    <SelectTrigger className="w-full border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black">
                      <SelectValue placeholder="Choose a category..." />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border border-pink-200 bg-white">
                      {categories.map((category) => (
                        <SelectItem 
                          key={category.id} 
                          value={category.id}
                          className="hover:bg-pink-50 focus:bg-pink-50 text-sm"
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Article Stats */}
                <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 border border-pink-200/50">
                  <h3 className="text-sm font-semibold text-pink-800 mb-3">Article Preview</h3>
                  <div className="space-y-3">
                    <div className="bg-white/60 rounded-lg p-3 border border-pink-200/30">
                      <div className="text-xs text-gray-600 mb-1">Author</div>
                      <div className="text-sm font-medium text-gray-900">
                        {writer?.name || writer?.username || 'Anonymous'}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white/60 rounded-lg p-2 border border-pink-200/30">
                        <div className="text-xs text-gray-600">Words</div>
                        <div className="text-sm font-bold text-pink-700">
                          {formData.content.split(' ').filter(word => word.length > 0).length}
                        </div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2 border border-pink-200/30">
                        <div className="text-xs text-gray-600">Characters</div>
                        <div className="text-sm font-bold text-pink-700">
                          {formData.content.length}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/60 rounded-lg p-3 border border-pink-200/30">
                      <div className="text-xs text-gray-600 mb-1">URL Slug</div>
                      <code className="text-xs text-pink-800 font-mono break-all">
                        {formData.title ? generateSlug(formData.title) : 'auto-generated-from-title'}
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Style Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 mt-6 border-t border-pink-200/50">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-white text-pink-700 hover:bg-pink-50 border border-pink-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 disabled:opacity-70 transition-all"
              >
                <Save className="w-4 h-4" />
                {submitting ? 'Creating Article...' : 'Publish Article'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
