"use client";

import React, { useState, useRef } from 'react';
import { ArrowLeft, Save, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddWriterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    phone: '',
    bio: '',
    image_url: '',
    // Field Allotted Checkboxes
    company_updates: false,
    compliance_legal_insights: false,
    news_media_coverage: false,
    newsletter_archive: false,
    thought_leadership: false,
    workplace_stories: false,
    events_webinars: false,
    international_regulatory_policy_watch: false,
    united_kingdom_workplace: false,
    us_workplace: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (key: keyof typeof form, value: string | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key: keyof typeof form) => {
    setForm(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setError(null);

      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/people/upload-image', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setForm((prev: any) => ({ ...prev, image_url: data.image_url }));
      setImagePreview(data.image_url);
    } catch (e: any) {
      setError(e.message || 'Error uploading image');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Upload the file
      handleImageUpload(file);
    }
  };

  const removeImage = () => {
    setForm((prev: any) => ({ ...prev, image_url: "" }));
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type.startsWith('image/')) {
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setImagePreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        
        // Upload the file
        handleImageUpload(file);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.username || !form.password) {
      setError('Name, username and password are required');
      return;
    }
    
    // Check if at least one field is allotted
    const hasFieldAllotted = Object.keys(form).some(key => 
      key !== 'name' && key !== 'username' && key !== 'password' && key !== 'phone' && key !== 'bio' && form[key as keyof typeof form]
    );
    
    if (!hasFieldAllotted) {
      setError('Please select at least one field allotted');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Failed to create writer');
      }
      router.replace('/admin/dashboard?tab=writers');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-4 overflow-y-auto">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-start mb-3">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 border border-pink-200 text-pink-700 hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

                 <div className="bg-white/85 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-100 p-3 max-h-[calc(100vh-2rem)] overflow-y-auto" style={{ overflow: 'scroll' }}>
                      <h1 className="text-lg font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-1">Add Writer</h1>
            <p className="text-xs text-gray-600 mb-2">Create a new writer account with assigned content areas</p>

          {error && (
            <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

                                                                                       <form onSubmit={handleSubmit} className="space-y-1">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                               {/* Left Column - Basic Info */}
                <div className="space-y-1">
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Full Name</label>
                   <input
                     type="text"
                     value={form.name}
                     onChange={(e) => handleChange('name', e.target.value)}
                     className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                     placeholder="e.g., John Doe"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
                   <input
                     type="text"
                     value={form.username}
                     onChange={(e) => handleChange('username', e.target.value)}
                     className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                     placeholder="unique handle"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
                   <input
                     type="password"
                     value={form.password}
                     onChange={(e) => handleChange('password', e.target.value)}
                     className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                     placeholder="secure password"
                     required
                   />
                 </div>
                 <div>
                   <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                   <input
                     type="tel"
                     value={form.phone}
                     onChange={(e) => handleChange('phone', e.target.value)}
                     className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                     placeholder="optional"
                   />
                 </div>
               </div>

                               {/* Middle Column - Profile Photo */}
                <div className="space-y-1">
                 <div>
                                       <label className="block text-xs font-medium text-gray-700 mb-1">Profile Photo</label>
                    <div className="space-y-1">
                     {/* Image Preview */}
                     {(imagePreview || form.image_url) && (
                       <div className="relative inline-block">
                         <img 
                           src={imagePreview || form.image_url} 
                           alt="Profile preview" 
                           className="w-20 h-20 object-cover rounded-xl border-2 border-pink-200"
                         />
                         <button
                           type="button"
                           onClick={removeImage}
                           className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                         >
                           <X className="w-2.5 h-2.5" />
                         </button>
                       </div>
                     )}
                     
                     {/* Upload Area */}
                     <div 
                       className={`border-2 border-dashed rounded-xl p-3 text-center transition-colors ${
                         dragActive 
                           ? 'border-pink-400 bg-pink-50' 
                           : 'border-pink-300 hover:border-pink-400'
                       }`}
                       onDragEnter={handleDrag}
                       onDragLeave={handleDrag}
                       onDragOver={handleDrag}
                       onDrop={handleDrop}
                     >
                                               <div className="space-y-1">
                          <ImageIcon className="w-5 h-5 mx-auto text-pink-400" />
                         <div>
                           <p className="text-xs text-gray-600">
                             <button
                               type="button"
                               onClick={() => fileInputRef.current?.click()}
                               disabled={uploadingImage}
                               className="text-pink-600 hover:text-pink-700 font-medium"
                             >
                               Click to upload
                             </button>
                             {' '}or drag
                           </p>
                           <p className="text-xs text-gray-500 mt-1">
                             PNG, JPG, WebP, GIF up to 5MB
                           </p>
                         </div>
                         
                         {uploadingImage && (
                           <div className="flex items-center justify-center gap-2 text-xs text-pink-600">
                             <div className="w-3 h-3 border-2 border-pink-600 border-t-transparent rounded-full animate-spin"></div>
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
                         className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-xs" 
                       />
                     </div>
                   </div>
                 </div>
               </div>

               {/* Right Column - Bio */}
               <div>
                 <label className="block text-xs font-medium text-gray-700 mb-1">Bio</label>
                                   <textarea
                    rows={6}
                    value={form.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    className="w-full px-3 py-1.5 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black resize-none"
                    placeholder="Brief bio about the writer"
                  />
               </div>
             </div>

             

                                                                                                       {/* Field Allotted Section */}
               <div>
                 <label className="block text-xs font-medium text-gray-700 mb-1">Field Allotted - Select Content Areas</label>
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1 p-2 bg-gray-50 rounded-xl border border-gray-200">
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="company_updates"
                     checked={form.company_updates}
                     onChange={() => handleCheckboxChange('company_updates')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="company_updates" className="text-xs font-medium text-gray-700">Company Updates</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="compliance_legal_insights"
                     checked={form.compliance_legal_insights}
                     onChange={() => handleCheckboxChange('compliance_legal_insights')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="compliance_legal_insights" className="text-xs font-medium text-gray-700">Compliance & Legal Insights</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="news_media_coverage"
                     checked={form.news_media_coverage}
                     onChange={() => handleCheckboxChange('news_media_coverage')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="news_media_coverage" className="text-xs font-medium text-gray-700">News & Media Coverage</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="newsletter_archive"
                     checked={form.newsletter_archive}
                     onChange={() => handleCheckboxChange('newsletter_archive')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="newsletter_archive" className="text-xs font-medium text-gray-700">Newsletter Archive</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="thought_leadership"
                     checked={form.thought_leadership}
                     onChange={() => handleCheckboxChange('thought_leadership')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="thought_leadership" className="text-xs font-medium text-gray-700">Thought Leadership</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="workplace_stories"
                     checked={form.workplace_stories}
                     onChange={() => handleCheckboxChange('workplace_stories')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="workplace_stories" className="text-xs font-medium text-gray-700">Workplace Stories</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="events_webinars"
                     checked={form.events_webinars}
                     onChange={() => handleCheckboxChange('events_webinars')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="events_webinars" className="text-xs font-medium text-gray-700">Events & Webinars</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="international_regulatory_policy_watch"
                     checked={form.international_regulatory_policy_watch}
                     onChange={() => handleCheckboxChange('international_regulatory_policy_watch')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="international_regulatory_policy_watch" className="text-xs font-medium text-gray-700">International Regulatory & Policy Watch</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="united_kingdom_workplace"
                     checked={form.united_kingdom_workplace}
                     onChange={() => handleCheckboxChange('united_kingdom_workplace')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="united_kingdom_workplace" className="text-xs font-medium text-gray-700">UK Workplace</label>
                 </div>
                
                                 <div className="flex items-center gap-1">
                   <input
                     type="checkbox"
                     id="us_workplace"
                     checked={form.us_workplace}
                     onChange={() => handleCheckboxChange('us_workplace')}
                     className="w-3 h-3 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                   />
                                      <label htmlFor="us_workplace" className="text-xs font-medium text-gray-700">US Workplace</label>
                 </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-1 sticky bottom-0 bg-white/85 backdrop-blur-sm border-t border-pink-100 mt-4 -mx-4 px-4 py-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 rounded-xl bg-white text-pink-700 hover:bg-pink-50 border border-pink-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700 disabled:opacity-70"
              >
                <Save className="w-4 h-4" />
                {isSubmitting ? 'Creating...' : 'Create Writer'}
              </button>
                         </div>
           </form>
           <div className="h-4"></div>
         </div>
      </div>
    </main>
  );
}


