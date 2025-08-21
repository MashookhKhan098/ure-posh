"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { 
  Users, FileText, Plus, Check, X, RotateCcw, Search, Filter, Eye, 
  LogOut, Bell, Settings, MoreVertical, Calendar, 
  ChevronDown, Menu, Shield, Activity, BarChart3, Download,
  UserPlus, Edit3, Trash2, Mail, Image as ImageIcon, Tag, DollarSign, Save,
  CheckCircle, Award, Scale, Calculator, Brain, MapPin, Star, ChevronRight
} from 'lucide-react';

// Type definitions
interface Post {
  id: number;
  title: string;
  author: string;
  category: string;
  created_at: string;
  verified: boolean;
  status?: string;
  content?: string;
  submittedDate?: string;
  excerpt?: string;
  is_breaking?: boolean;
  is_hot?: boolean;
  is_featured?: boolean;
  image_url?: string;
  readTime?: string;
  views?: number;
  published_at?: string;
}

interface Writer {
  draftCount: number;
  publishedCount: number;
  specializations: string[];
  bio: React.JSX.Element;
  id: number;
  name: string;
  username: string;
  status: string;  
  joinDate: string;
  postsCount: number;
  avatar: string;
  email?: string; // Added email property
  verified?: boolean; // Added verified property
  lastActive?: string; // Added lastActive property
}

interface DashboardStats {
  totalPosts: {
    count: number;
    growth: string;
    trend: string;
  };
  activeWriters: {
    count: number;
    growth: string;
    trend: string;
  };
  pendingReview: {
    count: number;
    trend: string;
  };
  revertedPosts: {
    count: number;
    trend: string;
  };
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex items-center gap-3 text-gray-600">
        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        <span>Loading admin dashboard...</span>
      </div>
    </div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}

function AdminDashboardContent() {
  const { admin, isAuthenticated, loading: authLoading, logout } = useAdminAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  
  // Real data from database
  const [writers, setWriters] = useState<Writer[]>([]);

  const [posts, setPosts] = useState<Post[]>([]);
  const [posters, setPosters] = useState<any[]>([]);
  const [people, setPeople] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Dashboard statistics state
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalPosts: { count: 0, growth: '0%', trend: 'from last month' },
    activeWriters: { count: 0, growth: '0', trend: 'no new writers' },
    pendingReview: { count: 0, trend: 'All caught up' },
    revertedPosts: { count: 0, trend: 'No rejected posts' }
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAddWriter, setShowAddWriter] = useState(false);
  const [showAddPerson, setShowAddPerson] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [verifiedFilter, setVerifiedFilter] = useState('All');
  const [peopleSearch, setPeopleSearch] = useState('');
  const [peopleTab, setPeopleTab] = useState<'list' | 'add'>('list');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [verifyingPosts, setVerifyingPosts] = useState<Set<number>>(new Set());

  // Fetch posts from database
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard statistics
      const statsResponse = await fetch('/api/admin/dashboard/stats');
      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setDashboardStats(statsData);
      }

      // Fetch posts for admin (including unverified)
      const postsResponse = await fetch('/api/admin/posts');
      if (postsResponse.ok) {
        const postsData = await postsResponse.json();
        setPosts(postsData);
      }

      // Fetch writers
      console.log('🔄 Dashboard: Fetching writers...');
      const writersResponse = await fetch('/api/admin/writers');
      console.log('📡 Dashboard: Writers response status:', writersResponse.status);
      if (writersResponse.ok) {
        const writersData = await writersResponse.json();
        console.log('✅ Dashboard: Writers data loaded:', writersData?.length || 0);
        console.log('📊 Dashboard: Writers data:', writersData);
        setWriters(writersData);
      } else {
        console.error('❌ Dashboard: Failed to fetch writers');
        const errorText = await writersResponse.text();
        console.error('❌ Dashboard: Error response:', errorText);
        setWriters([]);
      }

      // Fetch people (admin endpoint)
      const peopleResponse = await fetch('/api/admin/people?limit=100');
      if (peopleResponse.ok) {
        const peopleData = await peopleResponse.json();
        setPeople(peopleData?.data || []);
      }

      // Fetch posters
      const postersResponse = await fetch('/api/posters');
      if (postersResponse.ok) {
        const postersData = await postersResponse.json();
        setPosters(postersData.posters || []);
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch writers only (used on tab change)
  const fetchWriters = async () => {
    try {
      console.log('🔄 Fetching writers from API...');
      const writersResponse = await fetch('/api/admin/writers');
      console.log('📡 Writers response status:', writersResponse.status);
      console.log('📡 Writers response headers:', writersResponse.headers);
      
      if (writersResponse.ok) {
        const writersData = await writersResponse.json();
        console.log('✅ Writers data received:', writersData);
        console.log('📊 Number of writers:', writersData?.length || 0);
        console.log('🏷️ Writers data type:', typeof writersData);
        console.log('📋 Is array:', Array.isArray(writersData));
        
        if (Array.isArray(writersData)) {
          setWriters(writersData);
          console.log('✅ Writers state updated with', writersData.length, 'writers');
        } else {
          console.error('❌ Writers data is not an array:', writersData);
          setWriters([]);
        }
      } else {
        console.error('❌ Failed to fetch writers, response not ok');
        const errorText = await writersResponse.text();
        console.error('❌ Error response:', errorText);
        setWriters([]);
      }
    } catch (e) {
      console.error('💥 Exception while fetching writers:', e);
      setWriters([]);
    }
  };

  // Authentication guard and fetch posts
  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      router.push('/admin/login');
      return;
    }
    
    // Fetch dashboard data when authenticated
    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [authLoading, isAuthenticated, router]);

  // Refetch writers when switching to Writers tab
  useEffect(() => {
    if (activeTab === 'writers') {
      fetchWriters();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // Initialize tab/modal from URL query (e.g., /admin/dashboard?tab=people&new=person)
  useEffect(() => {
    const tab = searchParams?.get('tab');
    const toNew = searchParams?.get('new');
    if (tab && ['dashboard','posts','people','writers','posters','settings'].includes(tab)) {
      setActiveTab(tab);
    }
    if (toNew === 'person') {
      setShowAddPerson(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // New writer form state
  const [newWriter, setNewWriter] = useState({
    name: '',
    username: '',
    password: '',
    bio: '',
    field_allotted: '',
    expertise: '',
    phone: ''
  });

  // New person form state
  const [newPerson, setNewPerson] = useState<any>({
    name: '',
    title: '',
    specialization: '',
    description: '',
    detailed_description: '',
    experience: '',
    category: 'legal',
    email: '',
    phone: '',
    location: '',
    website: '',
    verified: false,
    featured: false,
    image_url: '',
    icon_name: 'Scale',
    color_gradient: 'from-pink-500 to-rose-600',
    accent_color: 'pink',
    languages: [] as string[],
    expertise: [] as string[],
  });

  const [expertiseInput, setExpertiseInput] = useState('');
  const [languagesInput, setLanguagesInput] = useState('');

  // Add new writer
  const handleAddWriter = async () => {
    if (newWriter.name && newWriter.username && newWriter.password) {
      const res = await fetch('/api/admin/writers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          name: newWriter.name, 
          username: newWriter.username, 
          password: newWriter.password, 
          bio: newWriter.bio,
          field_allotted: newWriter.field_allotted,
          expertise: newWriter.expertise,
          phone: newWriter.phone
        })
      })
      if (res.ok) {
        const { writer } = await res.json()
        const local: Writer = {
          id: writer.id || writers.length + 1,
          name: newWriter.name,
          username: newWriter.username,
          status: 'Active',
          joinDate: new Date().toISOString().split('T')[0],
          postsCount: 0,
          avatar: newWriter.name.split(' ').map(n => n[0]).join('').toUpperCase(),
          draftCount: 0,
          publishedCount: 0,
          specializations: [],
          bio: <span>{newWriter.bio}</span>,
          email: '', // or writer.email if available
          verified: false,
          lastActive: ''
        }
        setWriters([...writers, local])
        setNewWriter({ name: '', username: '', password: '', bio: '', field_allotted: '', expertise: '', phone: '' })
        setShowAddWriter(false)
      } else {
        const data = await res.json()
        alert(data?.error || 'Failed to create writer')
      }
    }
  };

  // Create Person
  const handleCreatePerson = async () => {
    try {
      // Minimal required validation
      if (!newPerson.name || !newPerson.title || !newPerson.specialization || !newPerson.email || !newPerson.location || !newPerson.experience || !newPerson.category || !newPerson.description) {
        alert('Please fill all required fields');
        return;
      }

      const payload = {
        ...newPerson,
        expertise: newPerson.expertise,
        languages: newPerson.languages,
        rating: 0,
        review_count: 0,
        projects: 0,
        completion_rate: 0,
        status: 'standard',
        availability: 'Available',
      };

      const res = await fetch('/api/admin/people', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to create person');

      setShowAddPerson(false);
      setNewPerson({
        name: '', title: '', specialization: '', description: '', detailed_description: '', experience: '', category: 'legal', email: '', phone: '', location: '', website: '', verified: false, featured: false, image_url: '', icon_name: 'Scale', color_gradient: 'from-pink-500 to-rose-600', accent_color: 'pink', languages: [], expertise: []
      });
      setExpertiseInput('');
      setLanguagesInput('');
      fetchDashboardData();
    } catch (e: any) {
      alert(e?.message || 'Error creating person');
    }
  };

  // Post management functions
  const handlePostAction = async (postId: number, action: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/${action}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        if (action === 'reject') {
          // Remove the post from UI when deleted
          setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
        } else {
          // Update the specific post in the state
          setPosts(prevPosts => 
            prevPosts.map(post => 
              post.id === postId 
                ? { 
                    ...post, 
                    status: action === 'approve' ? 'Published' : 'Rejected',
                    verified: action === 'approve' ? true : false,
                    published_at: action === 'approve' ? new Date().toISOString() : post.published_at || undefined
                  }
                : post
            )
          );
        }
      } else {
        const data = await response.json();
        alert(data.error || `Failed to ${action} post`);
      }
    } catch (error) {
      console.error(`Error ${action}ing post:`, error);
      alert(`Failed to ${action} post`);
    }
  };

  // Verification function
  const handleVerifyPost = async (postId: number, verified: boolean) => {
    try {
      // Add post to verifying set
      setVerifyingPosts(prev => new Set(prev).add(postId));
      
      const response = await fetch(`/api/posts/${postId}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ verified }),
      });

      if (response.ok) {
        // Update the specific post in the state instead of refreshing all data
        setPosts(prevPosts => 
          prevPosts.map(post => 
            post.id === postId 
              ? { ...post, verified: verified }
              : post
          )
        );
        
        // Show success feedback
        toast({
          title: "Verification Updated",
          description: `Article ${verified ? 'verified' : 'unverified'} successfully`,
          variant: "default",
        });
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update verification status');
      }
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert('Failed to update verification status');
    } finally {
      // Remove post from verifying set
      setVerifyingPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  // Preview function
  const handlePreview = (post: any) => {
    setSelectedPost(post);
    setShowPreview(true);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || post.status === statusFilter;
    const matchesVerified = verifiedFilter === 'All' || 
                           (verifiedFilter === 'Verified' && post.verified) || 
                           (verifiedFilter === 'Not Verified' && !post.verified);
    return matchesSearch && matchesStatus && matchesVerified;
  });

  // Filter writers
  const filteredWriters = writers.filter(writer => {
    const q = searchTerm.toLowerCase()
    const matchesSearch = !q || writer.name.toLowerCase().includes(q) || writer.username.toLowerCase().includes(q)
    const matchesStatus = statusFilter === 'All' || writer.status === statusFilter
    return matchesSearch && matchesStatus
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-amber-500/10 text-amber-700 border border-amber-200';
      case 'Published': return 'bg-emerald-500/10 text-emerald-700 border border-emerald-200';
      case 'Draft': return 'bg-blue-500/10 text-blue-700 border border-blue-200';
      case 'Rejected': return 'bg-red-500/10 text-red-700 border border-red-200';
      case 'Reverted': return 'bg-purple-500/10 text-purple-700 border border-purple-200';
      case 'Active': return 'bg-emerald-500/10 text-emerald-700 border border-emerald-200';
      case 'Inactive': return 'bg-gray-500/10 text-gray-600 border border-gray-200';
      default: return 'bg-gray-500/10 text-gray-600 border border-gray-200';
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  function PosterCreateForm({ onCreated }: { onCreated: () => void }) {
    const { toast } = useToast()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [category, setCategory] = useState('policy')
    const [price, setPrice] = useState('')
    const [featured, setFeatured] = useState(false)
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, setTagInput] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const suggestedCategories = ['policy', 'safety', 'awareness', 'education', 'health', 'environment']

    const addTag = () => {
      const value = tagInput.trim()
      if (!value) return
      if (tags.includes(value)) {
        setTagInput('')
        return
      }
      setTags((prev) => [...prev, value])
      setTagInput('')
    }

    const removeTag = (value: string) => {
      setTags((prev) => prev.filter((t) => t !== value))
    }

    const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || e.key === ',') {
        e.preventDefault()
        addTag()
      } else if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
        setTags((prev) => prev.slice(0, -1))
      }
    }

    const validate = () => {
      if (!title.trim()) return 'Title is required'
      if (!imageUrl.trim()) return 'Image URL is required'
      if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) return 'Valid price is required'
      return null
    }

    const createPoster = async () => {
      const validationError = validate()
      if (validationError) {
        setError(validationError)
        toast({ title: 'Validation error', description: validationError, variant: 'destructive' })
        return
      }
      setSubmitting(true)
      setError(null)
      try {
        let response
        if (imageFile) {
          const form = new FormData()
          form.append('title', title)
          form.append('description', description)
          form.append('category', category)
          form.append('price', price)
          form.append('featured', String(featured))
          form.append('tags', JSON.stringify(tags))
          form.append('image', imageFile)
          response = await fetch('/api/posters/upload', { method: 'POST', body: form })
        } else {
          const res = await fetch('/api/posters', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description, image_url: imageUrl, category, price, featured, tags })
          })
          response = res
        }

        const data = await response.json().catch(() => ({}))
        if (!response.ok) throw new Error(data?.error || 'Failed to create poster')
        toast({ title: 'Poster created', description: 'Your poster has been created successfully.' })
        setTitle('')
        setDescription('')
        setImageUrl('')
        setImageFile(null)
        setCategory('policy')
        setPrice('')
        setFeatured(false)
        setTags([])
        setTagInput('')
        onCreated()
      } catch (e) {
        const message = (e as any)?.message || 'Error creating poster'
        setError(message)
        toast({ title: 'Error', description: message, variant: 'destructive' })
      } finally {
        setSubmitting(false)
      }
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-black">
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Title <span className="text-red-500">*</span></label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-black"
              placeholder="Enter poster title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 resize-none text-black"
              placeholder="Short description of the poster"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Tags</label>
            <div className="flex items-center gap-2 flex-wrap border border-gray-200 rounded-xl px-2.5 py-2 bg-white/80">
              {tags.map((t) => (
                <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-200 text-xs">
                  {t}
                  <button type="button" onClick={() => removeTag(t)} className="ml-1 hover:text-red-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
              <input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={tags.length === 0 ? 'Type a tag and press Enter' : 'Add another tag'}
                className="flex-1 min-w-[140px] bg-transparent outline-none text-sm text-black"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add tags</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Category</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              {suggestedCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs border transition-colors ${
                    category === c ? 'bg-blue-500 text-white border-blue-500' : 'bg-white/80 text-gray-700 border-gray-200 hover:bg-blue-50'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-black"
              placeholder="e.g., policy, safety, awareness"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">Image URL <span className="text-red-500">*</span></label>
            <input
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-black"
              placeholder="https://..."
            />
            <div className="mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null
                  setImageFile(f)
                  if (f) {
                    const reader = new FileReader()
                    reader.onload = () => setImageUrl(String(reader.result || ''))
                    reader.readAsDataURL(f)
                  }
                }}
                className="block w-full text-sm text-black file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
              />
            </div>
            {imageUrl && (
              <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-36 object-cover"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                  }}
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Price (₹) <span className="text-red-500">*</span></label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 text-black"
                placeholder="e.g., 299"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Featured</label>
              <button
                type="button"
                onClick={() => setFeatured((f) => !f)}
                className={`relative inline-flex h-10 w-full items-center justify-between rounded-xl border px-3 transition-colors ${
                  featured ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-500' : 'bg-white/80 text-gray-700 border-gray-200'
                }`}
              >
                <span className="text-sm">{featured ? 'Featured' : 'Not Featured'}</span>
                <span
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                    featured ? 'translate-x-0' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">{error}</div>
          )}

          {/* Enhanced People Management Tab */}
          {activeTab === 'people' && (
            <div className="space-y-6">
              {/* Enhanced Header */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">People Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Create and manage expert profiles displayed on the People page</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">{people.length} People</span>
                    </div>
                    <button
                      onClick={() => setShowAddPerson(true)}
                      className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Person
                    </button>
                  </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setPeopleTab('list')} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      peopleTab === 'list'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Users className="w-4 h-4 inline-block mr-2" />
                    All People
                  </button>
                  <button 
                    onClick={() => setPeopleTab('add')} 
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                      peopleTab === 'add'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <Plus className="w-4 h-4 inline-block mr-2" />
                    Add New
                  </button>
                  <div className="flex-1" />
                  <button
                    onClick={fetchDashboardData}
                    className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* People List Tab */}
              {peopleTab === 'list' && (
                <>
                  {/* Advanced Filters */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div className="relative">
                        <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search people..."
                          value={peopleSearch}
                          onChange={(e) => setPeopleSearch(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                        />
                      </div>
                      <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80">
                        <option>All Categories</option>
                        <option>Legal</option>
                        <option>Finance</option>
                        <option>Psychology</option>
                      </select>
                      <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80">
                        <option>All Status</option>
                        <option>Verified</option>
                        <option>Unverified</option>
                        <option>Featured</option>
                      </select>
                      <select className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80">
                        <option>Sort by Name</option>
                        <option>Sort by Experience</option>
                        <option>Sort by Rating</option>
                        <option>Sort by Date Added</option>
                      </select>
                    </div>
                  </div>

                  {/* People Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {people.filter((p) => {
                      const q = peopleSearch.toLowerCase();
                      return !q || (
                        p.name?.toLowerCase().includes(q) || 
                        p.title?.toLowerCase().includes(q) || 
                        p.specialization?.toLowerCase().includes(q) ||
                        p.category?.toLowerCase().includes(q)
                      );
                    }).length === 0 ? (
                      <div className="col-span-full text-center py-16 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50">
                        <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No People Found</h3>
                        <p className="text-gray-600 mb-6">
                          {peopleSearch ? 'No people match your search criteria.' : 'No people have been added yet.'}
                        </p>
                        <button
                          onClick={() => setShowAddPerson(true)}
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Person
                        </button>
                      </div>
                    ) : (
                      people.filter((p) => {
                        const q = peopleSearch.toLowerCase();
                        return !q || (
                          p.name?.toLowerCase().includes(q) || 
                          p.title?.toLowerCase().includes(q) || 
                          p.specialization?.toLowerCase().includes(q) ||
                          p.category?.toLowerCase().includes(q)
                        );
                      }).map((person) => (
                        <div key={person.id} className="group bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200">
                          {/* Card Header */}
                          <div className={`h-20 bg-gradient-to-r ${person.color_gradient || 'from-blue-500 to-indigo-600'} rounded-t-2xl relative overflow-hidden`}>
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute top-3 right-3 flex gap-2">
                              {person.featured && (
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <Award className="h-3 w-3 text-white" />
                                </div>
                              )}
                              {person.verified && (
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Card Content */}
                          <div className="p-6 -mt-6 relative">
                            {/* Profile Section */}
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center">
                                {person.image_url ? (
                                  <img src={person.image_url} alt={person.name} className="w-full h-full rounded-xl object-cover" />
                                ) : (
                                  <span className="text-gray-600 font-bold text-sm">
                                    {person.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 line-clamp-1">{person.name}</h3>
                                <p className="text-blue-600 font-semibold text-sm line-clamp-1">{person.title}</p>
                                <p className="text-gray-600 text-xs line-clamp-1">{person.specialization}</p>
                              </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                              <div className="text-center">
                                <div className="text-sm font-bold text-gray-900">{person.projects || 0}</div>
                                <div className="text-xs text-gray-500">Projects</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-green-600">{person.completion_rate || 0}%</div>
                                <div className="text-xs text-gray-500">Success</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-orange-600">{person.rating || 0}</div>
                                <div className="text-xs text-gray-500">Rating</div>
                              </div>
                            </div>

                            {/* Details */}
                            <div className="space-y-2 mb-4 text-xs text-gray-600">
                              <div className="flex items-center gap-2">
                                <Mail className="w-3 h-3" />
                                <span className="truncate">{person.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-3 h-3" />
                                <span>{person.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Tag className="w-3 h-3" />
                                <span className="capitalize">{person.category}</span>
                              </div>
                            </div>

                            {/* Expertise Tags */}
                            <div className="mb-4">
                              <div className="flex flex-wrap gap-1">
                                {(person.expertise || []).slice(0, 3).map((skill: string, index: number) => (
                                  <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200">
                                    {skill}
                                  </span>
                                ))}
                                {(person.expertise || []).length > 3 && (
                                  <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                                    +{(person.expertise || []).length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={async () => {
                                  try {
                                    const updatedData = { ...person, verified: !person.verified };
                                    const res = await fetch(`/api/admin/people/${person.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ verified: !person.verified }),
                                    });
                                    if (!res.ok) throw new Error('Failed to update verification');
                                    setPeople(prev => prev.map(p => p.id === person.id ? updatedData : p));
                                  } catch (e: any) {
                                    alert(e?.message || 'Failed to update verification');
                                  }
                                }}
                                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  person.verified
                                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {person.verified ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Verified
                                  </>
                                ) : (
                                  <>
                                    <Shield className="w-4 h-4 mr-1" />
                                    Verify
                                  </>
                                )}
                              </button>
                              <button
                                onClick={async () => {
                                  try {
                                    const updatedData = { ...person, featured: !person.featured };
                                    const res = await fetch(`/api/admin/people/${person.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ featured: !person.featured }),
                                    });
                                    if (!res.ok) throw new Error('Failed to update featured status');
                                    setPeople(prev => prev.map(p => p.id === person.id ? updatedData : p));
                                  } catch (e: any) {
                                    alert(e?.message || 'Failed to update featured status');
                                  }
                                }}
                                className={`px-3 py-2 rounded-lg text-sm transition-colors border ${
                                  person.featured
                                    ? 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {person.featured ? <Award className="w-4 h-4" /> : <Star className="w-4 h-4" />}
                              </button>
                              <button
                                onClick={() => {
                                  // Edit functionality - could open a modal with edit form
                                  alert('Edit functionality will be implemented');
                                }}
                                className="px-3 py-2 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (!confirm(`Delete ${person.name}? This action cannot be undone.`)) return;
                                  try {
                                    const res = await fetch(`/api/admin/people/${person.id}`, { method: 'DELETE' });
                                    if (!res.ok) throw new Error('Failed to delete person');
                                    setPeople(prev => prev.filter(p => p.id !== person.id));
                                  } catch (e: any) {
                                    alert(e?.message || 'Failed to delete person');
                                  }
                                }}
                                className="px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}

              {/* Add Person Tab */}
              {peopleTab === 'add' && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/60 shadow-lg">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <UserPlus className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">Add New Person</h3>
                      <p className="text-gray-600">Create a new expert profile to display on the People page</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {/* Quick Add Options */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Scale className="w-6 h-6 text-blue-600" />
                          <h4 className="font-semibold text-blue-900">Legal Expert</h4>
                        </div>
                        <p className="text-sm text-blue-700 mb-4">Add a lawyer, legal advisor, or compliance expert</p>
                        <button
                          onClick={() => {
                            setNewPerson({
                              ...newPerson,
                              category: 'legal',
                              icon_name: 'Scale',
                              color_gradient: 'from-blue-500 to-indigo-600',
                              accent_color: 'blue'
                            });
                            setShowAddPerson(true);
                          }}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          Create Legal Profile
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Calculator className="w-6 h-6 text-green-600" />
                          <h4 className="font-semibold text-green-900">Finance Expert</h4>
                        </div>
                        <p className="text-sm text-green-700 mb-4">Add a financial advisor, accountant, or analyst</p>
                        <button
                          onClick={() => {
                            setNewPerson({
                              ...newPerson,
                              category: 'finance',
                              icon_name: 'Calculator',
                              color_gradient: 'from-green-500 to-emerald-600',
                              accent_color: 'green'
                            });
                            setShowAddPerson(true);
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
                        >
                          Create Finance Profile
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Brain className="w-6 h-6 text-purple-600" />
                          <h4 className="font-semibold text-purple-900">Psychology Expert</h4>
                        </div>
                        <p className="text-sm text-purple-700 mb-4">Add a mental health professional, therapist, or counselor</p>
                        <button
                          onClick={() => {
                            setNewPerson({
                              ...newPerson,
                              category: 'psychology',
                              icon_name: 'Brain',
                              color_gradient: 'from-purple-500 to-violet-600',
                              accent_color: 'purple'
                            });
                            setShowAddPerson(true);
                          }}
                          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
                        >
                          Create Psychology Profile
                        </button>
                      </div>

                      <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl p-6 border border-gray-200">
                        <div className="flex items-center gap-3 mb-3">
                          <Users className="w-6 h-6 text-gray-600" />
                          <h4 className="font-semibold text-gray-900">Custom Profile</h4>
                        </div>
                        <p className="text-sm text-gray-700 mb-4">Create a custom profile with your own settings</p>
                        <button
                          onClick={() => setShowAddPerson(true)}
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          Create Custom Profile
                        </button>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{people.filter(p => p.category === 'legal').length}</div>
                        <div className="text-sm text-blue-700">Legal Experts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{people.filter(p => p.category === 'finance').length}</div>
                        <div className="text-sm text-green-700">Finance Experts</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{people.filter(p => p.category === 'psychology').length}</div>
                        <div className="text-sm text-purple-700">Psychology Experts</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={createPoster}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70"
            >
              <Save className="w-4 h-4" />
              {submitting ? 'Creating...' : 'Create Poster'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'posts', label: 'Articles', icon: FileText },
    { id: 'people', label: 'People', icon: Users },
    { id: 'writers', label: 'Writers', icon: Users },
    { id: 'posters', label: 'Posters', icon: ImageIcon },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  // Show loading state while checking authentication
  if (authLoading || !isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <span>Loading admin dashboard...</span>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">AdminPro</h1>
                <p className="text-xs text-gray-500">Content Management</p>
              </div>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <IconComponent className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* User Profile & Logout */}
          <div className="p-4 border-t border-gray-200/50">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center p-3 rounded-xl hover:bg-gray-50/50 transition-colors"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                  {admin?.username?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div className="ml-3 flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900">{admin?.username || 'Admin User'}</p>
                  <p className="text-xs text-gray-500">{admin?.email || 'admin@example.com'}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>
              
              {showDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border border-gray-200/50 py-2">
                  <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings className="w-4 h-4 mr-3" />
                    Profile Settings
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Enhanced Header */}
        <header className="bg-white/70 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-40">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                    {activeTab === 'posts' && 'Articles Management'}
                    {activeTab === 'people' && 'People Management'}
                    {activeTab === 'writers' && 'Writers Management'}
                    {activeTab === 'posters' && 'Posters'}
                    {activeTab === 'settings' && 'Settings'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {activeTab === 'dashboard' && 'Monitor your content platform performance'}
                    {activeTab === 'posts' && 'Review and manage submitted articles'}
                    {activeTab === 'people' && 'Create and manage expert profiles for the People page'}
                    {activeTab === 'writers' && 'Manage your writing team'}
                    {activeTab === 'posters' && 'Create and manage posters'}
                    {activeTab === 'settings' && 'Configure platform settings'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="relative p-2 rounded-xl hover:bg-gray-100/50 transition-colors">
                  <Bell className="w-5 h-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                  </span>
                </button>
                <div className="hidden sm:flex items-center space-x-3 bg-gray-50/50 rounded-xl px-4 py-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{new Date().toLocaleDateString()}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Enhanced Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total Posts</p>
                      <p className="text-3xl font-bold mt-2">{loading ? '...' : dashboardStats.totalPosts.count}</p>
                      <p className="text-blue-100 text-xs mt-1">{loading ? 'Loading...' : `${dashboardStats.totalPosts.growth} ${dashboardStats.totalPosts.trend}`}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100 text-sm font-medium">Active Writers</p>
                      <p className="text-3xl font-bold mt-2">{loading ? '...' : dashboardStats.activeWriters.count}</p>
                      <p className="text-emerald-100 text-xs mt-1">{loading ? 'Loading...' : `${dashboardStats.activeWriters.growth} ${dashboardStats.activeWriters.trend}`}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100 text-sm font-medium">Pending Review</p>
                      <p className="text-3xl font-bold mt-2">{loading ? '...' : dashboardStats.pendingReview.count}</p>
                      <p className="text-amber-100 text-xs mt-1">{loading ? 'Loading...' : dashboardStats.pendingReview.trend}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <Activity className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                <div className="group bg-gradient-to-br from-rose-500 to-red-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-rose-500/25 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-100 text-sm font-medium">Rejected Posts</p>
                      <p className="text-3xl font-bold mt-2">{loading ? '...' : dashboardStats.revertedPosts.count}</p>
                      <p className="text-rose-100 text-xs mt-1">{loading ? 'Loading...' : dashboardStats.revertedPosts.trend}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-xl">
                      <RotateCcw className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setShowAddWriter(true)}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200/50 group"
                  >
                    <UserPlus className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-blue-700">Add Writer</span>
                  </button>
                  <button 
                    onClick={() => setShowAddPerson(true)}
                    className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl hover:from-pink-100 hover:to-rose-100 transition-all duration-200 border border-pink-200/60 group"
                  >
                    <UserPlus className="w-5 h-5 text-pink-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-pink-700">Add People</span>
                  </button>
                  <button className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-200/50 group">
                    <Download className="w-5 h-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-emerald-700">Export Data</span>
                  </button>
                  
                  <button className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all duration-200 border border-orange-200/50 group">
                    <Mail className="w-5 h-5 text-orange-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-orange-700">Send Notices</span>
                  </button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
                </div>
                <div className="space-y-3">
                  {posts.slice(0, 3).map((post, index) => (
                    <div key={post.id} className="flex items-center p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{post.title}</p>
                        <p className="text-xs text-gray-500">by {post.author} • {post.submittedDate}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status || 'pending')}`}>
                        {post.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

                    {/* Posts Management Tab */}
          {activeTab === 'posts' && (
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-6 h-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
                                         <span>Loading articles...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Enhanced Controls */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                                                 placeholder="Search articles by title or author..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm transition-all"
                      />
                    </div>
                    <button
                      onClick={fetchPosts}
                      disabled={loading}
                      className="flex items-center px-4 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <RotateCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      Refresh
                    </button>
                  <div className="relative">
                    <Filter className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="All">All Status</option>
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>
                  <div className="relative">
                    <Shield className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={verifiedFilter}
                      onChange={(e) => setVerifiedFilter(e.target.value)}
                      className="pl-12 pr-10 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer"
                    >
                      <option value="All">All Verification</option>
                      <option value="Verified">Verified</option>
                      <option value="Not Verified">Not Verified</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Enhanced Posts Grid */}
              <div className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-200/50 shadow-lg text-center">
                    <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                                         <h3 className="text-lg font-semibold text-gray-900 mb-2">No Articles Found</h3>
                                         <p className="text-gray-500 mb-4">
                       {searchTerm || statusFilter !== 'All' || verifiedFilter !== 'All' 
                         ? 'No articles match your current filters. Try adjusting your search criteria.'
                         : 'No articles have been created yet. Writers can start creating content from their dashboard.'
                       }
                     </p>
                    {(searchTerm || statusFilter !== 'All' || verifiedFilter !== 'All') && (
                      <button
                        onClick={() => {
                          setSearchTerm('');
                          setStatusFilter('All');
                          setVerifiedFilter('All');
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  filteredPosts.map((post, index) => (
                    <div key={post.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div className="p-6">
                        {/* Header with Status Badges */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="flex-1">
                              <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                                {post.title}
                              </h3>
                              {post.excerpt && (
                                <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                                  {post.excerpt}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          {/* Status Badges */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-2 flex-wrap justify-end">
                              <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg ${getStatusColor(post.status || 'pending')} shadow-sm`}>
                                {post.status}
                              </span>
                              <span className={`px-3 py-1.5 text-xs font-semibold rounded-lg shadow-sm ${
                                post.verified 
                                  ? 'bg-green-500/15 text-green-700 border border-green-200/50' 
                                  : 'bg-red-500/15 text-red-700 border border-red-200/50'
                              }`}>
                                {post.verified ? '✓ Verified' : '✗ Not Verified'}
                              </span>
                            </div>
                            
                            {/* Special Badges */}
                            <div className="flex items-center gap-2">
                              {post.is_breaking && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-red-500/15 text-red-700 border border-red-200/50">
                                  🔥 Breaking
                                </span>
                              )}
                              {post.is_hot && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-orange-500/15 text-orange-700 border border-orange-200/50">
                                  🔥 Hot
                                </span>
                              )}
                              {post.is_featured && (
                                <span className="px-2 py-1 text-xs font-semibold rounded-md bg-purple-500/15 text-purple-700 border border-purple-200/50">
                                  ⭐ Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Article Image */}
                        {post.image_url && (
                          <div className="mb-4 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                              src={post.image_url} 
                              alt={post.title}
                              className="w-full h-48 object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder.jpg';
                              }}
                            />
                          </div>
                        )}

                        {/* Author & Meta Info */}
                        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50/80 rounded-xl border border-gray-200/50">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md">
                              {post.author.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{post.author}</p>
                              <p className="text-xs text-gray-500">Author</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                              <span className="font-medium">{post.category}</span>
                            </div>
                            <div className="text-gray-400">•</div>
                            <span>{post.readTime}</span>
                            <div className="text-gray-400">•</div>
                            <span className="font-medium">{post.views} views</span>
                          </div>
                        </div>

                        {/* Date Info */}
                        <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>Submitted: {new Date(post.submittedDate ?? '').toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'short', 
                              day: 'numeric'
                            })}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
                          {/* Conditional Action Controls */}
                          {!post.verified ? (
                            // Show Approve/Reject/Revert buttons for unverified posts
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => handlePostAction(post.id, 'approve')}
                                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <Check className="w-4 h-4 mr-2" />
                                <span className="font-medium">Approve</span>
                              </button>
                              
                              <button
                                onClick={() => handlePostAction(post.id, 'reject')}
                                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <X className="w-4 h-4 mr-2" />
                                <span className="font-medium">Reject</span>
                              </button>
                              
                              <button
                                onClick={() => handlePostAction(post.id, 'revert')}
                                className="flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                              >
                                <RotateCcw className="w-4 h-4 mr-2" />
                                <span className="font-medium">Revert</span>
                              </button>

                              {/* Status info for unverified posts */}
                              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2">
                                <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-amber-700">Awaiting Review</span>
                              </div>
                            </div>
                          ) : (
                            // Show verification toggle for verified/approved posts
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2">
                                <Check className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">Post Approved</span>
                              </div>
                              
                              {/* Verification Control */}
                              <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-2 border border-gray-200/50 shadow-sm">
                                <span className="text-sm font-medium text-gray-700">Verified:</span>
                                <button
                                  onClick={() => handleVerifyPost(post.id, !post.verified)}
                                  disabled={verifyingPosts.has(post.id)}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                                    post.verified 
                                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 focus:ring-green-500' 
                                      : 'bg-gray-300 focus:ring-gray-400'
                                  } shadow-inner ${verifyingPosts.has(post.id) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-md ${
                                      post.verified ? 'translate-x-6' : 'translate-x-1'
                                    } ${verifyingPosts.has(post.id) ? 'animate-pulse' : ''}`}
                                  />
                                </button>
                                <span className={`text-sm font-semibold ${
                                  post.verified ? 'text-green-600' : 'text-gray-500'
                                }`}>
                                  {verifyingPosts.has(post.id) ? 'Updating...' : (post.verified ? 'Yes' : 'No')}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Always show preview and more options */}
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => handlePreview(post)}
                              className="p-2.5 bg-blue-500/10 text-blue-600 rounded-xl hover:bg-blue-500/20 transition-all duration-200 border border-blue-200/50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              title="Preview Article"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            
                            <button 
                              onClick={async () => {
                                if (!confirm('Delete this post permanently?')) return;
                                try {
                                  const res = await fetch(`/api/admin/posts?id=${post.id}`, { method: 'DELETE' })
                                  if (!res.ok) {
                                    const data = await res.json().catch(() => ({}))
                                    throw new Error(data?.error || 'Failed to delete post')
                                  }
                                  setPosts(prev => prev.filter(p => p.id !== post.id))
                                } catch (e: any) {
                                  alert(e?.message || 'Failed to delete post')
                                }
                              }}
                              className="p-2.5 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all duration-200 border border-red-200/50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                ))
                )}
              </div>
                </>
              )}
            </div>
          )}

          {/* Enhanced Writers Management Tab */}
          {activeTab === 'writers' && (
            <div className="space-y-6">
              {/* Enhanced Writers Header */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Writers Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your content creation team</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-xl">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-700">{writers.length} Writers</span>
                    </div>
                    <button
                      onClick={() => setShowAddWriter(true)}
                      className="flex items-center px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Writer
                    </button>
                  </div>
                </div>

                {/* Filters and Search */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search writers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                    />
                  </div>
                  <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Pending">Pending</option>
                  </select>
                  <select 
                    value={verifiedFilter} 
                    onChange={(e) => setVerifiedFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                  >
                    <option value="All">All Verification</option>
                    <option value="Verified">Verified</option>
                    <option value="Unverified">Unverified</option>
                  </select>
                  <button
                    onClick={fetchWriters}
                    className="flex items-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>

              {/* Writers Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-500 rounded-xl p-2">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-green-600 text-sm font-medium">Total</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{writers.length}</div>
                  <div className="text-sm text-green-600">Active Writers</div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-500 rounded-xl p-2">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-blue-600 text-sm font-medium">Verified</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {writers.filter(w => w.verified).length}
                  </div>
                  <div className="text-sm text-blue-600">Verified Writers</div>
                </div>

                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-500 rounded-xl p-2">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-yellow-600 text-sm font-medium">Posts</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {writers.reduce((sum, w) => sum + (w.postsCount || 0), 0)}
                  </div>
                  <div className="text-sm text-yellow-600">Total Posts</div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-500 rounded-xl p-2">
                      <Activity className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-purple-600 text-sm font-medium">Active</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {writers.filter(w => w.status === 'Active').length}
                  </div>
                  <div className="text-sm text-purple-600">Active This Month</div>
                </div>
              </div>

              {/* Enhanced Writers Grid */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">All Writers</h3>
                  <p className="text-sm text-gray-600 mt-1">Complete list of your content creation team</p>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent"></div>
                    <span className="ml-3 text-gray-600">Loading writers...</span>
                  </div>
                ) : filteredWriters.length === 0 ? (
                  <div className="text-center py-20">
                    <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Writers Found</h3>
                    <p className="text-gray-600 mb-6">
                      {searchTerm || statusFilter !== 'All' || verifiedFilter !== 'All' 
                        ? 'No writers match your search criteria.' 
                        : 'No writers have been added yet.'}
                    </p>
                    <button
                      onClick={() => setShowAddWriter(true)}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add First Writer
                    </button>
                  </div>
                ) : (
                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredWriters.map((writer) => (
                        <div key={writer.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-200">
                          {/* Writer Header */}
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-16 rounded-t-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-black/10"></div>
                            <div className="absolute top-3 right-3 flex gap-2">
                              {writer.verified && (
                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                                  <CheckCircle className="h-3 w-3 text-white" />
                                </div>
                              )}
                              <div className={`bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 ${
                                writer.status === 'Active' ? 'text-green-300' :
                                writer.status === 'Inactive' ? 'text-red-300' : 'text-yellow-300'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  writer.status === 'Active' ? 'bg-green-300' :
                                  writer.status === 'Inactive' ? 'bg-red-300' : 'bg-yellow-300'
                                }`}></div>
                              </div>
                            </div>
                          </div>

                          {/* Writer Content */}
                          <div className="p-6 -mt-4 relative">
                            {/* Profile Section */}
                            <div className="flex items-start gap-4 mb-4">
                              <div className="w-12 h-12 bg-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center">
                                {writer.avatar ? (
                                  <img src={writer.avatar} alt={writer.name} className="w-full h-full rounded-xl object-cover" />
                                ) : (
                                  <span className="text-gray-600 font-bold text-sm">
                                    {writer.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-bold text-gray-900 line-clamp-1">{writer.name}</h3>
                                <p className="text-blue-600 font-semibold text-sm">@{writer.username}</p>
                                <p className="text-gray-600 text-xs">{writer.email}</p>
                              </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-3 mb-4 p-3 bg-gray-50 rounded-xl">
                              <div className="text-center">
                                <div className="text-sm font-bold text-gray-900">{writer.postsCount || 0}</div>
                                <div className="text-xs text-gray-500">Posts</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-green-600">{writer.publishedCount || 0}</div>
                                <div className="text-xs text-gray-500">Published</div>
                              </div>
                              <div className="text-center">
                                <div className="text-sm font-bold text-orange-600">{writer.draftCount || 0}</div>
                                <div className="text-xs text-gray-500">Drafts</div>
                              </div>
                            </div>

                            {/* Writer Details */}
                            <div className="space-y-2 mb-4 text-xs text-gray-600">
                              <div className="flex items-center justify-between">
                                <span>Status:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(writer.status)}`}>
                                  {writer.status}
                                </span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Joined:</span>
                                <span>{writer.joinDate}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span>Last Active:</span>
                                <span>{writer.lastActive || 'Never'}</span>
                              </div>
                              {writer.bio && (
                                <div className="pt-2">
                                  <p className="text-gray-700 text-xs line-clamp-2">{writer.bio}</p>
                                </div>
                              )}
                            </div>

                            {/* Specializations */}
                            {Array.isArray(writer.specializations) && writer.specializations.length > 0 && (
                              <div className="mb-4">
                                <div className="flex flex-wrap gap-1">
                                  {writer.specializations.slice(0, 2).map((spec: string, index: number) => (
                                    <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200">
                                      {spec}
                                    </span>
                                  ))}
                                  {writer.specializations.length > 2 && (
                                    <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-200">
                                      +{writer.specializations.length - 2} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex gap-2">
                              <button
                                onClick={async () => {
                                  try {
                                    const updatedData = { ...writer, verified: !writer.verified };
                                    const res = await fetch(`/api/admin/writers/${writer.id}`, {
                                      method: 'PUT',
                                      headers: { 'Content-Type': 'application/json' },
                                      body: JSON.stringify({ verified: !writer.verified }),
                                    });
                                    if (!res.ok) throw new Error('Failed to update verification');
                                    setWriters(prev => prev.map(w => w.id === writer.id ? updatedData : w));
                                  } catch (e: any) {
                                    alert(e?.message || 'Failed to update verification');
                                  }
                                }}
                                className={`flex-1 flex items-center justify-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  writer.verified
                                    ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                                }`}
                              >
                                {writer.verified ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Verified
                                  </>
                                ) : (
                                  <>
                                    <Shield className="w-4 h-4 mr-1" />
                                    Verify
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  // View writer posts - could navigate to posts filtered by writer
                                  setActiveTab('posts');
                                  setSearchTerm(writer.username);
                                }}
                                className="px-3 py-2 rounded-lg text-sm bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                              >
                                <FileText className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  // Edit functionality - could open a modal with edit form
                                  alert('Edit functionality will be implemented');
                                }}
                                className="px-3 py-2 rounded-lg text-sm bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={async () => {
                                  if (!confirm(`Delete writer ${writer.name}? This action cannot be undone.`)) return;
                                  try {
                                    const res = await fetch(`/api/admin/writers?id=${writer.id}`, { method: 'DELETE' });
                                    const data = await res.json().catch(() => ({}));
                                    if (!res.ok) throw new Error(data?.error || 'Failed to delete writer');
                                    setWriters(prev => prev.filter(w => w.id !== writer.id));
                                  } catch (e: any) {
                                    alert(e?.message || 'Failed to delete writer');
                                  }
                                }}
                                className="px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Posters Tab */}
          {activeTab === 'posters' && (
            <div className="space-y-6">
              {/* Create Poster */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Poster</h3>
                <PosterCreateForm onCreated={() => fetchDashboardData()} />
              </div>

              {/* Posters List */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">All Posters</h3>
                  <button 
                    onClick={fetchDashboardData}
                    className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" /> Refresh
                  </button>
                </div>
                {posters.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">No posters yet</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {posters.map((p) => (
                      <div key={p.id} className="group bg-white/80 rounded-2xl border border-gray-200/60 shadow hover:shadow-lg transition overflow-hidden">
                        <div className="h-40 bg-gray-100 overflow-hidden">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-900 line-clamp-1">{p.title}</h4>
                          <p className="text-sm text-gray-600 line-clamp-2 mt-1">{p.description}</p>
                          <div className="flex items-center justify-between mt-3 text-sm">
                            <span className="inline-flex items-center gap-1 text-gray-700"><Tag className="w-4 h-4" />{p.category || 'Uncategorized'}</span>
                            <span className="inline-flex items-center gap-1 font-semibold text-emerald-700"><DollarSign className="w-4 h-4" />{p.price ?? '-'} </span>
                          </div>
                          <div className="flex items-center justify-end mt-3">
                            <button
                              onClick={async () => {
                                if (!confirm('Delete this poster?')) return;
                                try {
                                  const res = await fetch(`/api/posters/${p.id}`, { method: 'DELETE' })
                                  if (!res.ok) {
                                    const data = await res.json().catch(() => ({}))
                                    throw new Error(data?.error || 'Failed to delete poster')
                                  }
                                  setPosters(prev => prev.filter(x => x.id !== p.id))
                                } catch (e: any) {
                                  alert(e?.message || 'Failed to delete poster')
                                }
                              }}
                              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-700 hover:bg-red-500/20 border border-red-200/60 text-sm"
                            >
                              <Trash2 className="w-4 h-4" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg text-center">
                <Settings className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform Settings</h3>
                <p className="text-gray-500">Configuration options and system settings...</p>
              </div>
            </div>
          )}

          {/* Create Person Modal */}
          {showAddPerson && (
            <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddPerson(false)}></div>
              <div className="relative z-10 w-full max-w-3xl mt-10 max-h-[92vh] overflow-y-auto">
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Create Person</h3>
                    <button onClick={() => setShowAddPerson(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                        <input value={newPerson.name} onChange={(e)=>setNewPerson({...newPerson,name:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title <span className="text-red-500">*</span></label>
                        <input value={newPerson.title} onChange={(e)=>setNewPerson({...newPerson,title:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specialization <span className="text-red-500">*</span></label>
                        <input value={newPerson.specialization} onChange={(e)=>setNewPerson({...newPerson,specialization:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Experience <span className="text-red-500">*</span></label>
                        <input value={newPerson.experience} onChange={(e)=>setNewPerson({...newPerson,experience:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" placeholder="e.g., 8+ years" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select value={newPerson.category} onChange={(e)=>setNewPerson({...newPerson,category:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80">
                          <option value="legal">Legal</option>
                          <option value="finance">Finance</option>
                          <option value="psychology">Psychology</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                        <input value={newPerson.image_url} onChange={(e)=>setNewPerson({...newPerson,image_url:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" placeholder="https://..." />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Short Description <span className="text-red-500">*</span></label>
                        <textarea rows={2} value={newPerson.description} onChange={(e)=>setNewPerson({...newPerson,description:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 resize-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Summary</label>
                        <textarea rows={3} value={newPerson.detailed_description} onChange={(e)=>setNewPerson({...newPerson,detailed_description:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 resize-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                        <input type="email" value={newPerson.email} onChange={(e)=>setNewPerson({...newPerson,email:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input value={newPerson.phone} onChange={(e)=>setNewPerson({...newPerson,phone:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location <span className="text-red-500">*</span></label>
                        <input value={newPerson.location} onChange={(e)=>setNewPerson({...newPerson,location:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input value={newPerson.website} onChange={(e)=>setNewPerson({...newPerson,website:e.target.value})} className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80" />
                      </div>

                      {/* Expertise tags */}
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Expertise (tags)</label>
                        <div className="flex items-center gap-2 flex-wrap border border-gray-200 rounded-xl px-2.5 py-2 bg-white/80">
                          {newPerson.expertise.map((t:string) => (
                            <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-pink-500/10 text-pink-700 border border-pink-200 text-xs">
                              {t}
                              <button type="button" onClick={()=>setNewPerson({...newPerson,expertise:newPerson.expertise.filter((x:string)=>x!==t)})} className="ml-1 hover:text-red-600">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          ))}
                          <input
                            value={expertiseInput}
                            onChange={(e)=>setExpertiseInput(e.target.value)}
                            onKeyDown={(e)=>{ if (e.key==='Enter' || e.key===','){ e.preventDefault(); const v=expertiseInput.trim(); if (v && !newPerson.expertise.includes(v)) { setNewPerson({...newPerson,expertise:[...newPerson.expertise,v]}); setExpertiseInput(''); } } }}
                            placeholder={newPerson.expertise.length===0 ? 'Type a tag and press Enter' : 'Add another tag'}
                            className="flex-1 min-w-[140px] bg-transparent outline-none text-sm"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add</p>
                      </div>

                      {/* Languages tags */}
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Languages (tags)</label>
                        <div className="flex items-center gap-2 flex-wrap border border-gray-200 rounded-xl px-2.5 py-2 bg-white/80">
                          {newPerson.languages.map((t:string) => (
                            <span key={t} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 text-blue-700 border border-blue-200 text-xs">
                              {t}
                              <button type="button" onClick={()=>setNewPerson({...newPerson,languages:newPerson.languages.filter((x:string)=>x!==t)})} className="ml-1 hover:text-red-600">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </span>
                          ))}
                          <input
                            value={languagesInput}
                            onChange={(e)=>setLanguagesInput(e.target.value)}
                            onKeyDown={(e)=>{ if (e.key==='Enter' || e.key===','){ e.preventDefault(); const v=languagesInput.trim(); if (v && !newPerson.languages.includes(v)) { setNewPerson({...newPerson,languages:[...newPerson.languages,v]}); setLanguagesInput(''); } } }}
                            placeholder={newPerson.languages.length===0 ? 'Type a language and press Enter' : 'Add another language'}
                            className="flex-1 min-w-[140px] bg-transparent outline-none text-sm"
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add</p>
                      </div>

                      {/* Toggles */}
                      <div className="flex items-center gap-4 md:col-span-2">
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={newPerson.verified} onChange={(e)=>setNewPerson({...newPerson,verified:e.target.checked})} /> Verified
                        </label>
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={newPerson.featured} onChange={(e)=>setNewPerson({...newPerson,featured:e.target.checked})} /> Featured
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-6">
                      <button onClick={()=>setShowAddPerson(false)} className="px-4 py-2 rounded-xl bg-white text-gray-700 hover:bg-gray-50 border border-gray-200">Cancel</button>
                      <button onClick={handleCreatePerson} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700">Create Person</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

                     {/* Enhanced Add Writer Modal */}
           {showAddWriter && (
             <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
               <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowAddWriter(false)}></div>
               <div className="relative z-10 w-full max-w-2xl mt-10">
                 <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-200">
                   <div className="flex items-center justify-between px-5 py-4 border-b border-pink-100">
                     <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Add Writer</h3>
                     <button onClick={() => setShowAddWriter(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                   <div className="px-5 py-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                         <input
                           type="text"
                           value={newWriter.name}
                           onChange={(e) => setNewWriter({ ...newWriter, name: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="e.g., John Doe"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                         <input
                           type="text"
                           value={newWriter.username}
                           onChange={(e) => setNewWriter({ ...newWriter, username: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="unique handle"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                         <input
                           type="password"
                           value={newWriter.password}
                           onChange={(e) => setNewWriter({ ...newWriter, password: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="secure password"
                         />
                       </div>
                       <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                         <input
                           type="tel"
                           value={newWriter.phone}
                           onChange={(e) => setNewWriter({ ...newWriter, phone: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="optional"
                         />
                       </div>
                       <div className="md:col-span-1">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Field Allotted</label>
                         <input
                           type="text"
                           value={newWriter.field_allotted}
                           onChange={(e) => setNewWriter({ ...newWriter, field_allotted: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="Technology, Sports, Politics"
                         />
                       </div>
                       <div className="md:col-span-1">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                         <input
                           type="text"
                           value={newWriter.expertise}
                           onChange={(e) => setNewWriter({ ...newWriter, expertise: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black"
                           placeholder="Comma-separated areas"
                         />
                       </div>
                       <div className="md:col-span-2">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                         <textarea
                           rows={2}
                           value={newWriter.bio}
                           onChange={(e) => setNewWriter({ ...newWriter, bio: e.target.value })}
                           className="w-full px-3 py-2 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 bg-white/80 text-black resize-none"
                           placeholder="Brief bio about the writer"
                         />
                       </div>
                     </div>
                     <div className="flex items-center justify-end gap-3 pt-4">
                       <button onClick={() => setShowAddWriter(false)} className="px-4 py-2 rounded-xl bg-white text-pink-700 hover:bg-pink-50 border border-pink-200">Cancel</button>
                       <button onClick={handleAddWriter} className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:from-pink-700 hover:to-rose-700">Create Writer</button>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {/* Article Preview Modal */}
           {showPreview && selectedPost && (
             <div className="fixed inset-0 z-50 flex items-start justify-center p-4">
               <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowPreview(false)}></div>
               <div className="relative z-10 w-full max-w-4xl mt-10 max-h-[90vh] overflow-y-auto">
                 <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200">
                   <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                     <h3 className="text-lg font-semibold text-gray-900">Article Preview</h3>
                     <button onClick={() => setShowPreview(false)} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100">
                       <X className="w-5 h-5" />
                     </button>
                   </div>
                   <div className="px-6 py-6">
                     {/* Article Header */}
                     <div className="mb-6">
                       <div className="flex items-center gap-3 mb-3 flex-wrap">
                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedPost.status)}`}>
                           {selectedPost.status}
                         </span>
                         <span className={`px-3 py-1 text-xs font-medium rounded-full ${selectedPost.verified ? 'bg-green-500/10 text-green-700 border border-green-200' : 'bg-gray-500/10 text-gray-600 border border-gray-200'}`}>
                           {selectedPost.verified ? '✓ Verified' : '✗ Not Verified'}
                         </span>
                         {selectedPost.is_breaking && (
                           <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-700 border border-red-200">
                             🔥 Breaking
                           </span>
                         )}
                         {selectedPost.is_hot && (
                           <span className="px-3 py-1 text-xs font-medium rounded-full bg-orange-500/10 text-orange-700 border border-orange-200">
                             🔥 Hot
                           </span>
                         )}
                       </div>
                       <h1 className="text-2xl font-bold text-gray-900 mb-3">{selectedPost.title}</h1>
                       {selectedPost.excerpt && (
                         <p className="text-gray-600 text-lg mb-4">{selectedPost.excerpt}</p>
                       )}
                       <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                         <div className="flex items-center gap-2">
                           <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                             {selectedPost.author.split(' ').map((n: string) => n[0]).join('')}
                           </div>
                           <span>{selectedPost.author}</span>
                         </div>
                         <span>•</span>
                         <span className="bg-gray-100 px-3 py-1 rounded-lg text-sm" style={{ backgroundColor: selectedPost.categoryColor + '20', color: selectedPost.categoryColor }}>
                           {selectedPost.category}
                         </span>
                         <span>•</span>
                         <span>{selectedPost.readTime}</span>
                         <span>•</span>
                         <span>{selectedPost.views} views</span>
                         <span>•</span>
                         <span>{selectedPost.submittedDate}</span>
                       </div>
                     </div>

                     {/* Article Image */}
                     {selectedPost.image_url && (
                       <div className="mb-6">
                         <img 
                           src={selectedPost.image_url} 
                           alt={selectedPost.title}
                           className="w-full h-64 object-cover rounded-xl"
                           onError={(e) => {
                             e.currentTarget.src = '/placeholder.jpg';
                           }}
                         />
                       </div>
                     )}

                     {/* Article Content */}
                     <div className="prose prose-lg max-w-none">
                       <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                         {selectedPost.content}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  );
}