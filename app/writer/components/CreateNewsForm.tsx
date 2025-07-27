"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Video, Image, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function CreateNewsForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    slug: "",
    videoTitle: "",
    videoDescription: ""
  })
  
  const [files, setFiles] = useState({
    featuredImage: null as File | null,
    videoFile: null as File | null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFiles(prev => ({ ...prev, [name]: files[0] }))
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    setFormData(prev => ({ 
      ...prev, 
      title,
      slug: generateSlug(title)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")
    setMessage("")

    try {
      const formDataToSend = new FormData()
      
      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value)
      })
      
      // Add files
      if (files.featuredImage) {
        formDataToSend.append("featuredImage", files.featuredImage)
      }
      if (files.videoFile) {
        formDataToSend.append("videoFile", files.videoFile)
      }

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const result = await response.json()
        setSubmitStatus("success")
        setMessage("News post created successfully!")
        
        // Reset form
        setFormData({
          title: "",
          content: "",
          author: "",
          category: "",
          tags: "",
          slug: "",
          videoTitle: "",
          videoDescription: ""
        })
        setFiles({
          featuredImage: null,
          videoFile: null
        })
      } else {
        const error = await response.json()
        setSubmitStatus("error")
        setMessage(error.error || "Failed to create news post")
      }
    } catch (error) {
      setSubmitStatus("error")
      setMessage("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Create News Post
          </CardTitle>
          <CardDescription>
            Add a new news article, blog post, or announcement to your website
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Status Message */}
            {submitStatus !== "idle" && (
              <div className={`p-4 rounded-lg flex items-center gap-2 ${
                submitStatus === "success" 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}>
                {submitStatus === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <AlertCircle className="w-5 h-5" />
                )}
                {message}
              </div>
            )}

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleTitleChange}
                  placeholder="Enter news title"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author *
                </label>
                <Input
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Author name"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select category</option>
                  <option value="compliance">Compliance Updates</option>
                  <option value="training">Training & Development</option>
                  <option value="case-studies">Case Studies</option>
                  <option value="industry-news">Industry News</option>
                  <option value="company-updates">Company Updates</option>
                  <option value="expert-insights">Expert Insights</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <Input
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="POSH, compliance, workplace safety"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug
              </label>
              <Input
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="auto-generated from title"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <Textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Write your news content here..."
                rows={8}
                required
              />
            </div>

            {/* Media Upload */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <input
                    type="file"
                    name="featuredImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="featuredImage"
                  />
                  <label htmlFor="featuredImage" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    {files.featuredImage ? files.featuredImage.name : "Choose image"}
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Video File
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Video className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <input
                    type="file"
                    name="videoFile"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="videoFile"
                  />
                  <label htmlFor="videoFile" className="cursor-pointer text-blue-600 hover:text-blue-700">
                    {files.videoFile ? files.videoFile.name : "Choose video"}
                  </label>
                </div>
              </div>
            </div>

            {/* Video Details */}
            {(files.videoFile || formData.videoTitle || formData.videoDescription) && (
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Title
                  </label>
                  <Input
                    name="videoTitle"
                    value={formData.videoTitle}
                    onChange={handleInputChange}
                    placeholder="Video title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Description
                  </label>
                  <Textarea
                    name="videoDescription"
                    value={formData.videoDescription}
                    onChange={handleInputChange}
                    placeholder="Video description"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Create News Post
                  </div>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 