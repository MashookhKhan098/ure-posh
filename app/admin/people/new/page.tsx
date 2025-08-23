"use client"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useAdminAuth } from "@/hooks/useAdminAuth"
import { X, Save, ArrowLeft, Upload, Image as ImageIcon } from "lucide-react"

export default function AdminPeopleNewPage() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAdminAuth()

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [form, setForm] = useState<any>({
    name: "",
    title: "",
    specialization: "",
    description: "",
    detailed_description: "",
    experience: "",
    category: "legal",
    email: "",
    phone: "",
    location: "",
    website: "",
    verified: false,
    featured: false,
    image_url: "",
    icon_name: "Scale",
    color_gradient: "from-pink-500 to-rose-600",
    accent_color: "pink",
    expertise: [] as string[],
    languages: [] as string[],
  })

  const [expertiseInput, setExpertiseInput] = useState("")
  const [languagesInput, setLanguagesInput] = useState("")
  const [uploadingImage, setUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) router.push("/admin/login")
  }, [isAuthenticated, loading, router])

  const addTag = (key: "expertise" | "languages", value: string) => {
    const v = value.trim()
    if (!v) return
    if (form[key].includes(v)) return
    setForm((prev: any) => ({ ...prev, [key]: [...prev[key], v] }))
  }

  const removeTag = (key: "expertise" | "languages", value: string) => {
    setForm((prev: any) => ({ ...prev, [key]: prev[key].filter((t: string) => t !== value) }))
  }

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true)
      setError(null)

      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/people/upload-image', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image')
      }

      setForm((prev: any) => ({ ...prev, image_url: data.image_url }))
      setImagePreview(data.image_url)
    } catch (e: any) {
      setError(e.message || 'Error uploading image')
    } finally {
      setUploadingImage(false)
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      
      // Upload the file
      handleImageUpload(file)
    }
  }

  const removeImage = () => {
    setForm((prev: any) => ({ ...prev, image_url: "" }))
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        // Create preview
        const reader = new FileReader()
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string)
        }
        reader.readAsDataURL(file)
        
        // Upload the file
        handleImageUpload(file)
      }
    }
  }

  const validate = () => {
    if (!form.name.trim()) return "Name is required"
    if (!form.title.trim()) return "Title is required"
    if (!form.specialization.trim()) return "Specialization is required"
    if (!form.description.trim()) return "Short description is required"
    if (!form.experience.trim()) return "Experience is required"
    if (!form.email.trim()) return "Email is required"
    if (!form.location.trim()) return "Location is required"
    return null
  }

  const handleSubmit = async () => {
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }
    try {
      setSubmitting(true)
      setError(null)

      const payload = {
        ...form,
        status: "standard",
        availability: "Available",
        rating: 0,
        review_count: 0,
        projects: 0,
        completion_rate: 0,
      }

      const res = await fetch("/api/people", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Failed to create person")

      router.push("/admin/dashboard?tab=people")
    } catch (e: any) {
      setError(e?.message || "Error creating person")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <button onClick={() => router.back()} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">Create Person</h1>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-black">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
              <input value={form.specialization} onChange={(e)=>setForm({...form, specialization: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
              <input value={form.experience} onChange={(e)=>setForm({...form, experience: e.target.value})} placeholder="e.g., 8+ years" className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select value={form.category} onChange={(e)=>setForm({...form, category: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90">
                <option value="legal">Legal</option>
                <option value="finance">Finance</option>
                <option value="psychology">Psychology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image</label>
              <div className="space-y-3">
                {/* Image Preview */}
                {(imagePreview || form.image_url) && (
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview || form.image_url} 
                      alt="Profile preview" 
                      className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                
                {/* Upload Area */}
                <div 
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                    dragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="space-y-3">
                    <ImageIcon className="w-8 h-8 mx-auto text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploadingImage}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Click to upload
                        </button>
                        {' '}or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, WebP, GIF up to 5MB
                      </p>
                    </div>
                    
                    {uploadingImage && (
                      <div className="flex items-center justify-center gap-2 text-sm text-blue-600">
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        Uploading...
                      </div>
                    )}
                  </div>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                
                {/* Manual URL input as fallback */}
                <div>
                  <input 
                    value={form.image_url} 
                    onChange={(e)=>setForm({...form, image_url: e.target.value})} 
                    placeholder="Or enter image URL manually" 
                    className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 text-sm" 
                  />
                </div>
                

              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <textarea rows={2} value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 resize-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Summary</label>
              <textarea rows={3} value={form.detailed_description} onChange={(e)=>setForm({...form, detailed_description: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90 resize-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input type="email" value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input value={form.phone} onChange={(e)=>setForm({...form, phone: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input value={form.location} onChange={(e)=>setForm({...form, location: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input value={form.website} onChange={(e)=>setForm({...form, website: e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/90" />
            </div>

            {/* Expertise tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (tags)</label>
              <div className="flex items-center gap-2 flex-wrap border border-gray-200 rounded-xl px-2.5 py-2 bg-white/90">
                {form.expertise.map((t: string) => (
                  <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-500/10 text-pink-700 border border-pink-200 text-xs">
                    {t}
                    <button type="button" onClick={()=>removeTag("expertise", t)} className="ml-1 hover:text-red-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input
                  value={expertiseInput}
                  onChange={(e)=>setExpertiseInput(e.target.value)}
                  onKeyDown={(e)=>{ if (e.key==='Enter' || e.key===','){ e.preventDefault(); addTag('expertise', expertiseInput); setExpertiseInput(''); } }}
                  placeholder={form.expertise.length===0 ? 'Type a tag and press Enter' : 'Add another tag'}
                  className="flex-1 min-w-[140px] bg-transparent outline-none text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add</p>
            </div>

            {/* Languages tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Languages (tags)</label>
              <div className="flex items-center gap-2 flex-wrap border border-gray-200 rounded-xl px-2.5 py-2 bg-white/90">
                {form.languages.map((t: string) => (
                  <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-200 text-xs">
                    {t}
                    <button type="button" onClick={()=>removeTag("languages", t)} className="ml-1 hover:text-red-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </span>
                ))}
                <input
                  value={languagesInput}
                  onChange={(e)=>setLanguagesInput(e.target.value)}
                  onKeyDown={(e)=>{ if (e.key==='Enter' || e.key===','){ e.preventDefault(); addTag('languages', languagesInput); setLanguagesInput(''); } }}
                  placeholder={form.languages.length===0 ? 'Type a language and press Enter' : 'Add another language'}
                  className="flex-1 min-w-[140px] bg-transparent outline-none text-sm"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add</p>
            </div>

            {/* Toggles */}
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.verified} onChange={(e)=>setForm({...form, verified: e.target.checked})} /> Verified
              </label>
              <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                <input type="checkbox" checked={form.featured} onChange={(e)=>setForm({...form, featured: e.target.checked})} /> Featured
              </label>
            </div>
          </div>

          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>
          )}

          <div className="mt-6 flex items-center justify-end gap-3">
            <button onClick={()=>router.push('/admin/dashboard?tab=people')} className="px-4 py-2 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">Cancel</button>
            <button onClick={handleSubmit} disabled={submitting} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 disabled:opacity-70">
              <Save className="w-4 h-4" /> {submitting ? "Creating..." : "Create Person"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}


