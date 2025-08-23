'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { X, Save, FileText, Type, Image, Tag, Sparkles, PenTool, Eye, Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, Heading1, Heading2, Heading3, Quote, Link as LinkIcon, List, ListOrdered, Highlighter, Upload, Trash2, Camera, Link, Cloud, CheckCircle, AlertCircle } from 'lucide-react'
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
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<'device' | 'url'>('device')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropZoneRef = useRef<HTMLDivElement>(null)

  // Get writer's allowed categories based on field_allotted
  const getWriterAllowedCategories = async () => {
    if (!writer?.field_allotted) {
      console.log('No field_allotted data found')
      return []
    }
    
    try {
      // Fetch all categories from the database
      const categoriesResponse = await fetch('/api/categories')
      if (!categoriesResponse.ok) {
        console.error('Failed to fetch categories')
        return []
      }
      
      const categoriesData = await categoriesResponse.json()
      const allCategories = categoriesData.data || []
      
      console.log('All categories from database:', allCategories)
      
             // Create a mapping between field names and category slugs
       const fieldToCategoryMap: Record<string, string> = {
         company_updates: 'company-updates',
         compliance_legal_insights: 'compliance-legal-insights',
         news_media_coverage: 'news-media-coverage',
         newsletter_archive: 'newsletter-archive',
         thought_leadership: 'thought-leadership',
         workplace_stories: 'workplace-stories',
         events_webinars: 'events-webinars',
         international_regulatory_policy_watch: 'international-regulatory-policy-watch',
         united_kingdom_workplace: 'united-kingdom-workplace',
         us_workplace: 'us-workplace'
       }
       
       const allowedCategories: Category[] = []
       
       // Map field_allotted boolean values to actual categories
       Object.entries(writer.field_allotted).forEach(([fieldName, isAllowed]) => {
         if (isAllowed) {
           const categorySlug = fieldToCategoryMap[fieldName]
           if (categorySlug) {
             const category = allCategories.find((cat: any) => cat.slug === categorySlug)
             if (category) {
               allowedCategories.push({
                 id: category.id,
                 name: category.name
               })
             } else {
               console.warn(`Category with slug '${categorySlug}' not found in database`)
             }
           }
         }
       })
      
      console.log('Field allotted values:', writer.field_allotted)
      console.log('Allowed categories result:', allowedCategories)
      
      return allowedCategories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  const contentRef = React.useRef<HTMLTextAreaElement | null>(null)

  const wrapSelection = (before: string, after: string = '') => {
    const textarea = contentRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd)
    const newValue = value.slice(0, selectionStart) + before + selected + after + value.slice(selectionEnd)
    setFormData((prev) => ({ ...prev, content: newValue }))
    requestAnimationFrame(() => {
      const pos = selectionStart + before.length + selected.length + after.length
      textarea.focus()
      textarea.setSelectionRange(pos, pos)
    })
  }

  const insertBlock = (html: string) => {
    const textarea = contentRef.current
    const pos = textarea ? textarea.selectionStart : formData.content.length
    const before = formData.content.slice(0, pos)
    const after = formData.content.slice(pos)
    const newValue = `${before}\n\n${html}\n\n${after}`
    setFormData((prev) => ({ ...prev, content: newValue }))
  }

  const insertList = (ordered = false) => {
    const textarea = contentRef.current
    if (!textarea) return
    const { selectionStart, selectionEnd, value } = textarea
    const selected = value.slice(selectionStart, selectionEnd) || 'Item 1\nItem 2\nItem 3'
    const lines = selected.split(/\r?\n/).filter(Boolean)
    const items = lines.map((l) => `<li>${l}</li>`).join('')
    const html = ordered ? `<ol>${items}</ol>` : `<ul>${items}</ul>`
    const newValue = value.slice(0, selectionStart) + html + value.slice(selectionEnd)
    setFormData((prev) => ({ ...prev, content: newValue }))
  }

  // Set writer's allowed categories on component mount
  useEffect(() => {
    console.log('Writer data:', writer)
    console.log('Field allotted data:', writer?.field_allotted)
    
    const fetchCategories = async () => {
      const allowedCategories = await getWriterAllowedCategories()
      console.log('Allowed categories:', allowedCategories)
      setCategories(allowedCategories)
    }
    
    fetchCategories()
  }, [writer])

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
    if (categories.length === 0) {
      toast({
        title: "Validation Error",
        description: "No content areas assigned. Please contact admin.",
        variant: "destructive"
      })
      return false
    }
    if (!formData.category_id) {
      toast({
        title: "Validation Error",
        description: "Please select a category",
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
          category_id: formData.category_id,
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
      setImagePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

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

  const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return { 
        isValid: false, 
        error: "Only JPEG, PNG, WebP, and GIF files are allowed." 
      }
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return { 
        isValid: false, 
        error: "Maximum file size is 5MB." 
      }
    }

    return { isValid: true }
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return

    const validation = validateImageFile(file)
    if (!validation.isValid) {
      toast({
        title: "Invalid file",
        description: validation.error,
        variant: "destructive"
      })
      return
    }

    setUploadingImage(true)
    setUploadProgress(0)

    try {
      // Create preview immediately
      const previewUrl = URL.createObjectURL(file)
      setImagePreview(previewUrl)

      const formData = new FormData()
      formData.append('image', file)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      const response = await fetch('/api/articles/upload-image', {
        method: 'POST',
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed')
      }

      setFormData(prev => ({ ...prev, image_url: result.image_url }))
      
      toast({
        title: "Success!",
        description: "Image uploaded successfully to Supabase",
      })

    } catch (error) {
      console.error('Upload error:', error)
      setImagePreview(null)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload image",
        variant: "destructive"
      })
    } finally {
      setUploadingImage(false)
      setUploadProgress(0)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    const imageFile = files.find(file => file.type.startsWith('image/'))
    
    if (imageFile) {
      handleImageUpload(imageFile)
    } else {
      toast({
        title: "Invalid file",
        description: "Please drop an image file.",
        variant: "destructive"
      })
    }
  }

  const handleCameraCapture = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Create a temporary video element
      const video = document.createElement('video')
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream
          video.play()
          
          // After a short delay, capture the frame
          setTimeout(() => {
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            context?.drawImage(video, 0, 0)
            
            // Convert to blob
            canvas.toBlob((blob) => {
              if (blob) {
                const file = new File([blob], `camera-capture-${Date.now()}.png`, { type: 'image/png' })
                handleImageUpload(file)
              }
            }, 'image/png')
            
            // Stop the stream
            stream.getTracks().forEach(track => track.stop())
          }, 1000)
        })
        .catch(error => {
          console.error('Camera access error:', error)
          toast({
            title: "Camera access denied",
            description: "Please allow camera access or use file upload instead.",
            variant: "destructive"
          })
        })
    } else {
      toast({
        title: "Camera not available",
        description: "Your device doesn't support camera capture.",
        variant: "destructive"
      })
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image_url: '' }))
    setImagePreview(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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
                  {/* Emoji toolbar for structured sections */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs text-gray-500 mr-2">Insert sections:</span>
                    {[
                      { e: '🚨', label: 'Breaking' },
                      { e: '📊', label: 'Stats' },
                      { e: '🏢', label: 'Corporate' },
                      { e: '💡', label: 'Tips' },
                      { e: '🔮', label: 'Future' },
                    ].map((b) => (
                      <button
                        key={b.e}
                        type="button"
                        title={b.label}
                        onClick={() => {
                          const snippetMap: Record<string, string> = {
                            '🚨': '🚨 Breaking News: ',
                            '📊': '📊 Why This Matters',
                            '🏢': '🏢 Corporate Reactions',
                            '💡': '💡 What Employees Need to Know',
                            '🔮': '🔮 Looking Ahead',
                          }
                          const snippet = snippetMap[b.e]
                          setFormData((prev) => ({
                            ...prev,
                            content: (prev.content ? prev.content + "\n\n" : '') + snippet + "\n\n",
                          }))
                        }}
                        className="px-2 py-1 rounded-lg bg-white/70 border border-pink-200 text-gray-700 hover:bg-pink-50 text-sm"
                      >
                        {b.e}
                      </button>
                    ))}
                    <span className="mx-3 h-4 w-px bg-pink-200" />
                    <span className="text-xs text-gray-500">Format:</span>
                    <button type="button" title="Bold" onClick={() => wrapSelection('[b]', '[/b]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Bold className="w-4 h-4" /></button>
                    <button type="button" title="Italic" onClick={() => wrapSelection('[i]', '[/i]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Italic className="w-4 h-4" /></button>
                    <button type="button" title="Underline" onClick={() => wrapSelection('[u]', '[/u]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Underline className="w-4 h-4" /></button>
                    <button type="button" title="Strikethrough" onClick={() => wrapSelection('[s]', '[/s]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Strikethrough className="w-4 h-4" /></button>
                    <button type="button" title="Small" onClick={() => wrapSelection('[small]', '[/small]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Type className="w-4 h-4" /></button>
                    <button type="button" title="Large" onClick={() => wrapSelection('[large]', '[/large]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Heading2 className="w-4 h-4" /></button>
                    <button type="button" title="Align Left" onClick={() => wrapSelection('[left]', '[/left]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><AlignLeft className="w-4 h-4" /></button>
                    <button type="button" title="Align Center" onClick={() => wrapSelection('[center]', '[/center]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><AlignCenter className="w-4 h-4" /></button>
                    <button type="button" title="Align Right" onClick={() => wrapSelection('[right]', '[/right]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><AlignRight className="w-4 h-4" /></button>
                    <button type="button" title="Quote" onClick={() => wrapSelection('[quote]', '[/quote]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Quote className="w-4 h-4" /></button>
                    <button type="button" title="Link" onClick={() => {
                      const url = prompt('Enter URL', 'https://') || 'https://'
                      const text = prompt('Link text', 'Click here') || 'Link'
                      insertBlock(`[link url="${url}"]${text}[/link]`)
                    }} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><LinkIcon className="w-4 h-4" /></button>
                    <button type="button" title="Bulleted List" onClick={() => insertBlock('[ul]\n[li]Item 1[/li]\n[li]Item 2[/li]\n[li]Item 3[/li]\n[/ul]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><List className="w-4 h-4" /></button>
                    <button type="button" title="Numbered List" onClick={() => insertBlock('[ol]\n[li]First[/li]\n[li]Second[/li]\n[li]Third[/li]\n[/ol]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><ListOrdered className="w-4 h-4" /></button>
                    <button type="button" title="Highlight" onClick={() => wrapSelection('[mark]', '[/mark]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50"><Highlighter className="w-4 h-4" /></button>
                    <button type="button" title="Separator" onClick={() => insertBlock('[hr]')} className="p-1.5 rounded-lg bg-white/70 border border-pink-200 hover:bg-pink-50">—</button>
                  </div>
                  <textarea
                    rows={16}
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Start writing your article here. Share your knowledge, insights, and experiences..."
                    className="w-full px-3.5 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500 resize-none leading-relaxed"
                    ref={contentRef}
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
                  <p className="mt-1 text-xs text-gray-500">Tip: Use the buttons above to add structured sections like Breaking, Stats, Corporate reactions, Tips, and Future outlook.</p>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="lg:col-span-1 space-y-4">
                {/* Enhanced Featured Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                  
                  {/* Upload Method Tabs */}
                  <div className="flex bg-gray-100 rounded-lg p-1 mb-3">
                    <button
                      type="button"
                      onClick={() => setUploadMethod('device')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        uploadMethod === 'device'
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      Device
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMethod('url')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                        uploadMethod === 'url'
                          ? 'bg-white text-pink-600 shadow-sm'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Link className="w-4 h-4" />
                      URL
                    </button>
                  </div>

                  {uploadMethod === 'device' ? (
                    /* Device Upload Section */
                    <div className="space-y-3">
                      {/* Drag & Drop Zone */}
                      <div
                        ref={dropZoneRef}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all ${
                          isDragOver
                            ? 'border-pink-400 bg-pink-50'
                            : 'border-pink-200 hover:border-pink-300'
                        } ${uploadingImage ? 'pointer-events-none opacity-50' : ''}`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        
                        {uploadingImage ? (
                          /* Upload Progress */
                          <div className="space-y-3">
                            <div className="flex items-center justify-center">
                              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">Uploading to Supabase...</p>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500">{uploadProgress}% complete</p>
                            </div>
                          </div>
                        ) : (
                          /* Upload Interface */
                          <div className="space-y-4">
                            <div className="flex flex-col items-center gap-3">
                              <div className="w-12 h-12 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full flex items-center justify-center">
                                <Cloud className="w-6 h-6 text-pink-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-700">
                                  Drop image here or click to browse
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  Supports JPEG, PNG, WebP, GIF up to 5MB
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all text-sm font-medium"
                              >
                                <Upload className="w-4 h-4" />
                                Choose File
                              </button>
                              <button
                                type="button"
                                onClick={handleCameraCapture}
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-pink-200 text-pink-600 rounded-lg hover:bg-pink-50 transition-all text-sm font-medium"
                              >
                                <Camera className="w-4 h-4" />
                                Camera
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Upload Status */}
                      {uploadingImage && (
                        <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                          <span className="text-sm text-blue-700">Uploading to Supabase bucket...</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* URL Input Section */
                    <div className="space-y-3">
                      <div className="relative">
                        <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="url"
                          value={formData.image_url}
                          onChange={(e) => {
                            handleInputChange('image_url', e.target.value)
                            setImagePreview(e.target.value)
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="w-full pl-10 pr-3.5 py-2.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black placeholder:text-gray-500"
                        />
                      </div>
                      <p className="text-xs text-gray-500">
                        Enter a direct link to an image hosted online
                      </p>
                    </div>
                  )}

                  {/* Enhanced Image Preview */}
                  {(imagePreview || formData.image_url) && (
                    <div className="space-y-3">
                      <div className="relative group">
                        <div className="rounded-xl overflow-hidden border border-pink-200 bg-gray-50">
                          <img 
                            src={imagePreview || formData.image_url} 
                            alt="Preview" 
                            className="w-full h-40 object-cover transition-transform group-hover:scale-105"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                              e.currentTarget.nextElementSibling?.classList.remove('hidden')
                            }}
                          />
                          <div className="hidden w-full h-40 flex items-center justify-center text-gray-400">
                            <div className="text-center">
                              <Image className="w-8 h-8 mx-auto mb-2" />
                              <p className="text-sm">Image not found</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={() => window.open(imagePreview || formData.image_url, '_blank')}
                            className="p-1.5 bg-white/90 backdrop-blur-sm text-gray-600 rounded-lg hover:bg-white hover:text-gray-800 transition-colors"
                            title="View full size"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={removeImage}
                            className="p-1.5 bg-red-500/90 backdrop-blur-sm text-white rounded-lg hover:bg-red-600 transition-colors"
                            title="Remove image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Upload Success Indicator */}
                        {formData.image_url && formData.image_url.startsWith('https://') && (
                          <div className="absolute top-2 left-2">
                            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/90 backdrop-blur-sm text-white rounded-lg text-xs">
                              <CheckCircle className="w-3 h-3" />
                              <span>Uploaded</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Image Info */}
                      <div className="text-xs text-gray-500 space-y-1">
                        <div className="flex items-center gap-2">
                          <Cloud className="w-3 h-3" />
                          <span>Stored in Supabase bucket</span>
                        </div>
                        <p>• Supported formats: JPEG, PNG, WebP, GIF</p>
                        <p>• Maximum file size: 5MB</p>
                        <p>• Recommended size: 1200x630 pixels</p>
                      </div>
                    </div>
                  )}
                </div>

                                 {/* Category */}
                 <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                   {categories.length > 0 && (
                     <div className="mb-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl shadow-sm">
                       <div className="flex items-center gap-2 mb-2">
                         <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                         <span className="text-xs font-semibold text-green-800">Your Assigned Content Areas</span>
                       </div>
                       <div className="flex flex-wrap gap-1.5">
                         {categories.map((category) => (
                           <span key={category.id} className="px-2.5 py-1 bg-white/70 border border-green-200 text-green-800 rounded-lg text-xs font-medium shadow-sm backdrop-blur-sm">
                             {category.name}
                           </span>
                         ))}
                       </div>
                     </div>
                   )}
                   {categories.length > 0 ? (
                     <div className="relative">
                       <Select
                         value={formData.category_id}
                         onValueChange={(value) => handleInputChange('category_id', value)}
                       >
                         <SelectTrigger className="w-full h-12 border-2 border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/90 backdrop-blur-sm text-black shadow-sm hover:border-pink-300 transition-all duration-200 group">
                           <div className="flex items-center gap-3">
                             <div className="w-5 h-5 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center">
                               <Tag className="w-3 h-3 text-pink-600" />
                             </div>
                             <SelectValue placeholder="Select your content area..." className="text-sm font-medium" />
                           </div>
                           <div className="w-5 h-5 bg-gradient-to-br from-pink-50 to-rose-50 rounded-lg flex items-center justify-center group-hover:from-pink-100 group-hover:to-rose-100 transition-all duration-200">
                             <svg className="w-3 h-3 text-pink-600 transform group-data-[state=open]:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                             </svg>
                           </div>
                         </SelectTrigger>
                         <SelectContent className="rounded-xl border-2 border-pink-200 bg-white/95 backdrop-blur-md shadow-xl max-h-60 overflow-hidden">
                           <div className="p-2">
                             <div className="text-xs font-semibold text-pink-700 mb-2 px-2">Available Categories</div>
                             {categories.map((category, index) => (
                               <SelectItem 
                                 key={category.id} 
                                 value={category.id}
                                 className="relative rounded-lg border border-transparent hover:border-pink-200 hover:bg-gradient-to-r hover:from-pink-50 hover:to-rose-50 focus:bg-gradient-to-r focus:from-pink-50 focus:to-rose-50 text-sm font-medium transition-all duration-200 cursor-pointer group/item"
                               >
                                 <div className="flex items-center gap-3 py-2.5 px-3">
                                   <div className="w-6 h-6 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg flex items-center justify-center group-hover/item:from-pink-200 group-hover/item:to-rose-200 transition-all duration-200">
                                     <span className="text-xs font-bold text-pink-700">
                                       {String.fromCharCode(65 + index)}
                                     </span>
                                   </div>
                                   <span className="text-gray-800 group-hover/item:text-pink-800 transition-colors duration-200">
                                     {category.name}
                                   </span>
                                   <div className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity duration-200">
                                     <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                   </div>
                                 </div>
                               </SelectItem>
                             ))}
                           </div>
                         </SelectContent>
                       </Select>
                       {formData.category_id && (
                         <div className="absolute -bottom-8 left-0 right-0">
                           <div className="flex items-center gap-2 text-xs text-green-600 animate-in slide-in-from-bottom-2 duration-300">
                             <CheckCircle className="w-3 h-3" />
                             <span>Category selected successfully</span>
                           </div>
                         </div>
                       )}
                     </div>
                   ) : (
                     <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl shadow-sm">
                       <div className="flex items-start gap-3">
                         <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                           <AlertCircle className="w-4 h-4 text-yellow-600" />
                         </div>
                         <div className="space-y-1">
                           <div className="text-sm font-semibold text-yellow-800">No Content Areas Assigned</div>
                           <div className="text-xs text-yellow-700">Please contact your administrator to assign content areas for your account.</div>
                         </div>
                       </div>
                     </div>
                   )}
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
