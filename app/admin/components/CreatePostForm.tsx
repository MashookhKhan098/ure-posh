'use client'

import { useState } from 'react'
import { Upload, X, Tag, User, Calendar, Globe, FileText, Image, Type, Hash } from 'lucide-react'

export default function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    excerpt: '',
    author: '',
    category: '',
    tags: [] as string[],
    status: 'draft',
    publishDate: '',
    metaTitle: '',
    metaDescription: '',
    readTime: '',
    language: 'en'
  })

  // Add tag handling functions
  const addTag = (tag: string) => {
    if (!tag.trim()) return
    const newTag = tag.trim()
    if (!formData.tags.includes(newTag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }))
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }))
  }

  const handleTagsInputChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget
    if (e.key === 'Enter' || e.key === 'Tab') {
      addTag(input.value)
      input.value = ''
    }
  }
  
  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('content')

  const categories = [
    'Technology', 'Business', 'Health', 'Travel', 'Food', 'Lifestyle', 
    'Education', 'Entertainment', 'Sports', 'Finance', 'Science', 'Art'
  ]

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'hi', name: 'Hindi' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Auto-calculate read time based on content
    if (field === 'content') {
      const wordCount = value.split(' ').filter(word => word.length > 0).length
      const readTime = Math.ceil(wordCount / 200) // Average reading speed
      setFormData(prev => ({ ...prev, readTime: `${readTime} min read` }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB')
        return
      }
      
      setFeaturedImage(file)
      const reader = new FileReader()
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setFeaturedImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Validation
      if (!formData.title.trim()) throw new Error('Title is required')
      if (!formData.content.trim()) throw new Error('Content is required')
      if (!formData.author.trim()) throw new Error('Author is required')
      if (!featuredImage) throw new Error('Featured image is required')

      // Generate slug
      let baseSlug = formData.title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .slice(0, 50)
      
      // Create form data
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags') {
          const tags = value as string[]
          if (tags && tags.length > 0) {
            submitData.append(key, tags.join(','))
          }
        } else {
          submitData.append(key, value as string)
        }
      })
      submitData.append('slug', baseSlug)
      submitData.append('featuredImage', featuredImage)

      // Make API call
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: submitData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to create post')
      }

      const data = await response.json()
      alert('Post created successfully!')
      
      // Redirect to the new post page
      window.location.href = `/posts/${data.data.slug}`
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to create post')
    } finally {
      setIsSubmitting(false)
      // Reset form state
      setFormData({
        title: '',
        subtitle: '',
        content: '',
        excerpt: '',
        author: '',
        category: '',
        tags: [],
        status: 'draft',
        publishDate: '',
        metaTitle: '',
        metaDescription: '',
        readTime: '',
        language: 'en'
      })
      setFeaturedImage(null)
      setImagePreview(null)
    }
  }

  const TabButton = ({ id, label, icon: Icon, isActive }: any) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isActive 
          ? 'bg-blue-100 text-blue-700 border-blue-200' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  )

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
        <p className="text-gray-600">Fill in the details below to create your blog post</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-8 border-b border-gray-200">
        <TabButton id="content" label="Content" icon={FileText} isActive={activeTab === 'content'} />
        <TabButton id="media" label="Media" icon={Image} isActive={activeTab === 'media'} />
        <TabButton id="settings" label="Settings" icon={Globe} isActive={activeTab === 'settings'} />
        <TabButton id="seo" label="SEO" icon={Hash} isActive={activeTab === 'seo'} />
      </div>

      <div className="space-y-6">
        {/* Content Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Type className="w-4 h-4 mr-2" />
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your post title..."
                  required
                />
              </div>
              
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Type className="w-4 h-4 mr-2" />
                  Subtitle
                </label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => handleInputChange('subtitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Optional subtitle..."
                />
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={3}
                placeholder="Brief description of your post (will be shown in previews)..."
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Content *
              </label>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {/* Content preview */}
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{
                      __html: formData.content
                        .split('\n')
                        .map((line, index) => {
                          // Handle different sections with proper styling
                          if (line.startsWith('💥')) {
                            return `<h2 class="text-2xl font-bold mb-4">${line}</h2>`;
                          }
                          if (line.startsWith('🕶️')) {
                            return `<h3 class="text-xl font-semibold mb-3">${line}</h3>`;
                          }
                          if (line.startsWith('✅')) {
                            return `<li class="list-disc pl-5 mb-2">${line}</li>`;
                          }
                          if (line.startsWith('👑')) {
                            return `<h2 class="text-2xl font-bold text-red-600 mb-4">${line}</h2>`;
                          }
                          if (line.startsWith('📌')) {
                            return `<h3 class="text-xl font-semibold text-blue-600 mb-3">${line}</h3>`;
                          }
                          if (line.startsWith('🔥')) {
                            return `<h4 class="text-lg font-semibold text-orange-600 mb-2">${line}</h4>`;
                          }
                          if (line.startsWith('🖤')) {
                            return `<h4 class="text-lg font-semibold text-pink-600 mb-2">${line}</h4>`;
                          }
                          return `<p class="mb-4">${line}</p>`;
                        })
                        .join('')
                    }} />
                  </div>
                  
                  {/* Content editing textarea */}
                  <div>
                    <textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      rows={12}
                      placeholder="Write your post content here... Use emojis and special characters to create sections:
                        🔄 for main headings
                        🕶️ for subheadings
                        ✅ for checklist items
                        👑 for special headings
                        📌 for call-to-action headings
                        🔥 for highlight headings
                        🖤 for special headings"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {formData.content.split(' ').filter(word => word.length > 0).length} words
                {formData.readTime && ` • ${formData.readTime}`}
              </div>
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-4">
                <Image className="w-4 h-4 mr-2" />
                Featured Image *
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="featuredImage"
                  />
                  <label htmlFor="featuredImage" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-1">Upload Featured Image</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-w-md h-64 object-cover rounded-lg shadow-lg"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="mt-2 text-sm text-gray-600">
                    {featuredImage?.name} ({Math.round((featuredImage?.size || 0) / 1024)}KB)
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 mr-2" />
                  Author *
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Author name..."
                  required
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 mr-2" />
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 mr-2" />
                  Tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {/* Display existing tags */}
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyDown={handleTagsInputChange}
                  placeholder="Press Enter to add tag"
                  className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 mr-2" />
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  Publish Date
                </label>
                <input
                  type="datetime-local"
                  value={formData.publishDate}
                  onChange={(e) => handleInputChange('publishDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* SEO Tab */}
        {activeTab === 'seo' && (
          <div className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Type className="w-4 h-4 mr-2" />
                Meta Title
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => handleInputChange('metaTitle', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="SEO title (leave blank to use post title)..."
                maxLength={60}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.metaTitle.length}/60 characters
              </div>
            </div>

            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Meta Description
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => handleInputChange('metaDescription', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                rows={3}
                placeholder="Brief description for search engines..."
                maxLength={160}
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.metaDescription.length}/160 characters
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-500">
            * Required fields
          </div>
          
          <div className="flex space-x-3">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Save Draft
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Post...
                </>
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </div>
        </div>
    </div>
  )
}