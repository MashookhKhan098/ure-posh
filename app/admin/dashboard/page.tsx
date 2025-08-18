"use client";

import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { 
  Users, FileText, Plus, Check, X, RotateCcw, Search, Filter, Eye, 
  LogOut, Bell, Settings, MoreVertical, Calendar, TrendingUp, 
  ChevronDown, Menu, Shield, Activity, BarChart3, Download,
  UserPlus, Edit3, Trash2, Mail
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
  id: number;
  name: string;
  username: string;
  status: string;
  joinDate: string;
  postsCount: number;
  avatar: string;
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
  const { admin, isAuthenticated, loading: authLoading, logout } = useAdminAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Real data from database
  const [writers, setWriters] = useState<Writer[]>([
    { id: 1, name: 'John Doe', username: 'john', status: 'Active', joinDate: '2024-01-15', postsCount: 12, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', username: 'jane', status: 'Active', joinDate: '2024-02-20', postsCount: 8, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', username: 'mike', status: 'Inactive', joinDate: '2024-03-10', postsCount: 5, avatar: 'MJ' }
  ]);

  const [posts, setPosts] = useState<Post[]>([]);
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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [verifiedFilter, setVerifiedFilter] = useState('All');
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
      const writersResponse = await fetch('/api/admin/writers');
      if (writersResponse.ok) {
        const writersData = await writersResponse.json();
        setWriters(writersData);
      }

    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
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
        const local = {
          id: writer.id || writers.length + 1,
          name: newWriter.name,
          username: newWriter.username,
          status: 'Active',
          joinDate: new Date().toISOString().split('T')[0],
          postsCount: 0,
          avatar: newWriter.name.split(' ').map(n => n[0]).join('').toUpperCase()
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
        // Update the specific post in the state instead of refreshing all data
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
  const filteredWriters = writers.filter(writer => 
    writer.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    writer.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'posts', label: 'Articles', icon: FileText },
    { id: 'writers', label: 'Writers', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
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
                    {activeTab === 'writers' && 'Writers Management'}
                    {activeTab === 'analytics' && 'Analytics'}
                    {activeTab === 'settings' && 'Settings'}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    {activeTab === 'dashboard' && 'Monitor your content platform performance'}
                    {activeTab === 'posts' && 'Review and manage submitted articles'}
                    {activeTab === 'writers' && 'Manage your writing team'}
                    {activeTab === 'analytics' && 'View detailed platform analytics'}
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
                  <button className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-200/50 group">
                    <Download className="w-5 h-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-emerald-700">Export Data</span>
                  </button>
                  <button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200/50 group">
                    <BarChart3 className="w-5 h-5 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium text-purple-700">View Reports</span>
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
                              className="p-2.5 bg-gray-500/10 text-gray-600 rounded-xl hover:bg-gray-500/20 transition-all duration-200 border border-gray-200/50 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                              title="More Options"
                            >
                              <MoreVertical className="w-4 h-4" />
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

          {/* Writers Management Tab */}
          {activeTab === 'writers' && (
            <div className="space-y-6">
              {/* Enhanced Writers Header */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Writers Management</h2>
                    <p className="text-sm text-gray-500 mt-1">Manage your content creation team</p>
                  </div>
                  <div className="flex gap-3 w-full lg:w-auto">
                    <div className="relative flex-1 lg:flex-initial lg:w-80">
                      <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search writers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                      />
                    </div>
                    <button
                      onClick={() => setShowAddWriter(true)}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add Writer
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Writers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredWriters.map((writer) => (
                  <div key={writer.id} className="group bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl hover:shadow-gray-500/10 transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {writer.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{writer.name}</h3>
                          <p className="text-sm text-gray-500">@{writer.username}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(writer.status)}`}>
                        {writer.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-200/50">
                        <p className="text-xs text-gray-500 mb-1">Posts</p>
                        <p className="text-lg font-bold text-gray-900">{writer.postsCount}</p>
                      </div>
                      <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-200/50">
                        <p className="text-xs text-gray-500 mb-1">Joined</p>
                        <p className="text-sm font-medium text-gray-900">{writer.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-500/20 transition-all duration-200 text-sm border border-blue-200/50">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button className="flex-1 flex items-center justify-center px-3 py-2 bg-gray-500/10 text-gray-600 rounded-lg hover:bg-gray-500/20 transition-all duration-200 text-sm border border-gray-200/50">
                        {writer.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                      <button className="p-2 bg-red-500/10 text-red-600 rounded-lg hover:bg-red-500/20 transition-all duration-200 border border-red-200/50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg text-center">
                <BarChart3 className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-500">Detailed analytics and reporting features coming soon...</p>
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