'use client'

import { useState, useEffect } from 'react'
import { 
  Upload, 
  X, 
  Tag, 
  User, 
  Calendar, 
  Globe, 
  FileText, 
  Image, 
  Type, 
  Hash, 
  Save, 
  Eye, 
  EyeOff, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Brain, 
  Database, 
  Video, 
  Play,
  Plus,
  Trash2,
  Settings,
  Palette,
  Sparkles,
  Target,
  TrendingUp,
  BarChart3,
  Shield,
  Globe2,
  Smartphone,
  Monitor,
  Tablet
} from 'lucide-react'

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
    language: 'en',
    videoTitle: '',
    videoDescription: ''
  })

  const [featuredImage, setFeaturedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [tagInput, setTagInput] = useState('')
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

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (formData.title || formData.content) {
        setAutoSaveStatus('saving')
        // Simulate auto-save
        setTimeout(() => {
          setAutoSaveStatus('saved')
        }, 1000)
      }
    }, 2000)

    return () => clearTimeout(autoSaveTimer)
  }, [formData.title, formData.content])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFeaturedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Check if file is a video
      if (!file.type.startsWith('video/')) {
        alert('Please select a valid video file')
        return
      }
      
      // Check file size (limit to 100MB)
      if (file.size > 100 * 1024 * 1024) {
        alert('Video file size must be less than 100MB')
        return
      }

      setVideoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => setVideoPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const submitFormData = new FormData()
      
      // Add text fields
      submitFormData.append('title', formData.title)
      submitFormData.append('content', formData.content)
      submitFormData.append('author', formData.author)
      submitFormData.append('category', formData.category)
      submitFormData.append('tags', formData.tags.join(','))
      submitFormData.append('slug', formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
      
      // Add image file
      if (featuredImage) {
        submitFormData.append('featuredImage', featuredImage)
      }
      
      // Add video file and metadata
      if (videoFile) {
        submitFormData.append('videoFile', videoFile)
        submitFormData.append('videoTitle', formData.videoTitle)
        submitFormData.append('videoDescription', formData.videoDescription)
      }

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: submitFormData,
      })

      if (response.ok) {
        // Reset form
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
          language: 'en',
          videoTitle: '',
          videoDescription: ''
        })
        setFeaturedImage(null)
        setImagePreview(null)
        setVideoFile(null)
        setVideoPreview(null)
        alert('Post created successfully!')
      } else {
        throw new Error('Failed to create post')
      }
    } catch (error) {
      console.error('Error creating post:', error)
      alert('Failed to create post. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAutoSaveIcon = () => {
    switch (autoSaveStatus) {
      case 'saving':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />
      case 'saved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  const tabs = [
    { id: 'content', label: 'Content', icon: FileText },
    { id: 'media', label: 'Media', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'seo', label: 'SEO', icon: Target },
    { id: 'preview', label: 'Preview', icon: Eye }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Create New Post</h1>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-sm">
                {getAutoSaveIcon()}
                <span className="text-gray-600">
                  {autoSaveStatus === 'saving' ? 'Saving...' : 
                   autoSaveStatus === 'saved' ? 'Saved' : 
                   autoSaveStatus === 'error' ? 'Save Error' : 'Ready'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  isPreviewMode 
                    ? 'bg-purple-100 text-purple-700 border border-purple-300' 
                    : 'bg-blue-100 text-blue-700 border border-blue-300'
                }`}
              >
                {isPreviewMode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span className="hidden sm:inline">{isPreviewMode ? 'Edit Mode' : 'Preview Mode'}</span>
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all font-medium shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4" />
                    <span>Publish Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all flex-1 justify-center ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Content Tab */}
          {activeTab === 'content' && (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Title */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <Type className="h-4 w-4 mr-2" />
                    Post Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 text-lg"
                    placeholder="Enter your post title..."
                    required
                  />
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Post Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={20}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 resize-none text-base leading-relaxed"
                    placeholder="Write your blog post content..."
                    required
                  />
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Author & Category */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Author & Category
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
                      <input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Enter author name..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Tag className="h-5 w-5 mr-2" />
                    Tags
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Add tag..."
                      />
                      <button
                        type="button"
                        onClick={addTag}
                        className="px-4 py-3 bg-blue-100 text-blue-700 border border-blue-300 rounded-lg hover:bg-blue-200 transition-colors"
                      >
                        <Hash className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-red-600 transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Media Tab */}
          {activeTab === 'media' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Featured Image */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Image className="h-5 w-5 mr-2" />
                  Featured Image
                </h3>
                
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img src={imagePreview} alt="Preview" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                      <button
                        type="button"
                        onClick={() => {
                          setFeaturedImage(null)
                          setImagePreview(null)
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Upload className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">Upload Featured Image</p>
                      <p className="text-gray-500 text-sm">Drag & drop or click to select</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Video Upload */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Video Upload
                </h3>
                
                <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors">
                  {videoPreview ? (
                    <div className="relative">
                      <video 
                        src={videoPreview} 
                        controls 
                        className="max-w-full h-48 object-cover rounded-lg mx-auto"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setVideoFile(null)
                          setVideoPreview(null)
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Video className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <p className="text-gray-700 font-medium mb-2">Upload Video</p>
                      <p className="text-gray-500 text-sm">Drag & drop or click to select (Max 100MB)</p>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                
                {/* Video Metadata */}
                {videoFile && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Title
                      </label>
                      <input
                        type="text"
                        value={formData.videoTitle}
                        onChange={(e) => handleInputChange('videoTitle', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-500"
                        placeholder="Enter video title..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Video Description
                      </label>
                      <textarea
                        value={formData.videoDescription}
                        onChange={(e) => handleInputChange('videoDescription', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-900 placeholder-gray-500 resize-none"
                        placeholder="Enter video description..."
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Publish Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Publish Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                    <input
                      type="datetime-local"
                      value={formData.publishDate}
                      onChange={(e) => handleInputChange('publishDate', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <select
                      value={formData.language}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900"
                    >
                      {languages.map(lang => (
                        <option key={lang.code} value={lang.code}>{lang.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Content Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Palette className="h-5 w-5 mr-2" />
                  Content Settings
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => handleInputChange('subtitle', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Enter subtitle..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="Enter excerpt..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Read Time (minutes)</label>
                    <input
                      type="number"
                      value={formData.readTime}
                      onChange={(e) => handleInputChange('readTime', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                      placeholder="Estimated read time..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* SEO Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  SEO Settings
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                    <input
                      type="text"
                      value={formData.metaTitle || ''}
                      onChange={e => handleInputChange('metaTitle', e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                      placeholder="SEO title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                    <textarea
                      value={formData.metaDescription || ''}
                      onChange={e => handleInputChange('metaDescription', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500 resize-none"
                      placeholder="SEO description..."
                    />
                  </div>
                </div>
              </div>
              {/* Google Search Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Search Preview
                </h3>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Google Search Preview</div>
                  <div className="text-blue-600 font-medium text-sm mb-1">
                    {formData.metaTitle || formData.title || 'Your post title will appear here'}
                  </div>
                  <div className="text-green-600 text-sm mb-1">
                    yourdomain.com/posts/{formData.title ? formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'your-slug'}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {formData.metaDescription || formData.excerpt || 'Your post description will appear here...'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Post Preview
              </h3>
              <div className="prose max-w-none">
                <h1>{formData.title || 'Your post title will appear here'}</h1>
                {formData.subtitle && <h2 className="text-lg text-gray-600">{formData.subtitle}</h2>}
                {formData.excerpt && <p className="text-lg text-gray-600">{formData.excerpt}</p>}
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                  <span>By {formData.author || 'Author'}</span>
                  <span>•</span>
                  <span>{formData.category || 'Category'}</span>
                  <span>•</span>
                  <span>{formData.readTime || '5'} min read</span>
                </div>
                {imagePreview && (
                  <img src={imagePreview} alt="Preview" className="max-w-full h-48 object-cover rounded-lg mx-auto mb-4" />
                )}
                {videoPreview && (
                  <video src={videoPreview} controls className="max-w-full h-48 object-cover rounded-lg mx-auto mb-4" />
                )}
                <div className="whitespace-pre-wrap">{formData.content || 'Your content will appear here...'}</div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}