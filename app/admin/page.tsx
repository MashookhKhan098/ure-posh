'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Lock, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter,
  Calendar,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Activity,
  Shield,
  Database,
  Upload,
  Bell,
  Menu,
  X,
  Zap,
  Cpu,
  Globe,
  Rocket,
  Target,
  Sparkles,
  Hexagon,
  Satellite,
  Atom,
  Brain,
  Fingerprint,
  Key,
  Scan,
  Grid,
  Layers,
  Clock,
  BookOpen,
  PenTool,
  Image,
  Tag,
  User,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import CreatePostForm from './components/CreatePostForm'
import PostsList from './components/PostsList'

// Get allowed admin public key from env (exposed via NEXT_PUBLIC_ADMIN_WALLET)
const ADMIN_WALLET = process.env.NEXT_PUBLIC_ADMIN_WALLET?.toLowerCase()

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  monthlyGrowth: number
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    monthlyGrowth: 0
  })
  const [scanningEffect, setScanningEffect] = useState(false)
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [metamaskError, setMetamaskError] = useState<string | null>(null)
  const [isAllowed, setIsAllowed] = useState<boolean | null>(null);
  const router = useRouter()

  // MetaMask connect logic
  const connectWallet = async () => {
    setMetamaskError(null)
    if (typeof window === 'undefined' || !(window as any).ethereum) {
      setMetamaskError('MetaMask is not installed. Please install MetaMask and try again.')
      return
    }
    try {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts && accounts[0]) {
        setWalletAddress(accounts[0].toLowerCase())
      }
    } catch (err) {
      setMetamaskError('Failed to connect MetaMask.')
    }
  }

  useEffect(() => {
    // Auto-connect if already connected
    if (typeof window !== 'undefined' && (window as any).ethereum && (window as any).ethereum.selectedAddress) {
      setWalletAddress((window as any).ethereum.selectedAddress.toLowerCase())
    }
  }, [])

  useEffect(() => {
    if (walletAddress) {
      setIsAllowed(null);
      fetch('/api/admin/check-wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletAddress }),
      })
        .then(res => res.json())
        .then(data => {
          setIsAllowed(!!data.allowed);
          if (data.allowed) fetchStats();
        })
        .catch(() => setIsAllowed(false));
    } else {
      setIsAllowed(null);
    }
  }, [walletAddress]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        const posts = data.posts || []
        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: any) => p.status === 'PUBLISHED').length,
          draftPosts: posts.filter((p: any) => p.status === 'DRAFT').length,
          totalViews: posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0),
          monthlyGrowth: 12.5
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  // If not connected or not allowed, show MetaMask connect page
  if (!walletAddress || isAllowed === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 w-full max-w-md items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Login</h2>
          <p className="text-gray-700 text-center mb-4">Connect your MetaMask wallet to access the admin panel.</p>
          <button
            onClick={connectWallet}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-500 hover:to-rose-500 transition-all duration-200"
          >
            Connect MetaMask
          </button>
          {metamaskError && <p className="text-red-500 text-sm mt-2">{metamaskError}</p>}
          {walletAddress && isAllowed === false && (
            <p className="text-red-500 text-sm mt-2">This wallet is not authorized for admin access.</p>
          )}
        </div>
      </div>
    )
  }
  if (isAllowed === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 w-full max-w-md items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Checking wallet authorization...</h2>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, icon: Icon, color, change, gradient }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-rose-500/10 to-pink-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-6 hover:border-pink-300/70 transition-all duration-300 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-black mb-2">{title}</p>
            <p className="text-3xl font-bold text-black">{value}</p>
            {change && (
              <p className="text-sm text-pink-600 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{change}%
              </p>
            )}
          </div>
          <div className={`p-4 rounded-xl ${gradient} relative overflow-hidden`}>
            <Icon className="h-8 w-8 text-white relative z-10" />
          </div>
        </div>
      </div>
    </div>
  )

  const SidebarItem = ({ id, label, icon: Icon, isActive }: any) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-300 relative overflow-hidden ${
        isActive 
          ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-700 border border-pink-300/50' 
          : 'text-black hover:text-black hover:bg-gray-100/50'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(219,39,119,0.05),transparent_50%)]"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-pink-200/50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X className="h-5 w-5 text-black" /> : <Menu className="h-5 w-5 text-black" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl"></div>
                <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-pink-600" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-black">
                  Blog Admin Dashboard
                </h1>
                <p className="text-xs text-black">Content Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5 text-black" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-pink-500 rounded-full animate-pulse"></span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuthenticated')
                setWalletAddress(null)
                setMetamaskError(null)
                router.push('/')
              }}
              className="flex items-center space-x-2 px-4 py-2 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-pink-200/50 transform transition-transform duration-300 ease-in-out shadow-lg`}>
          <div className="p-6">
            <nav className="space-y-3">
              <SidebarItem 
                id="dashboard" 
                label="Dashboard" 
                icon={BarChart3} 
                isActive={activeTab === 'dashboard'} 
              />
              <SidebarItem 
                id="posts" 
                label="All Posts" 
                icon={FileText} 
                isActive={activeTab === 'posts'} 
              />
              <SidebarItem 
                id="create" 
                label="New Post" 
                icon={Plus} 
                isActive={activeTab === 'create'} 
              />
              <SidebarItem 
                id="analytics" 
                label="Analytics" 
                icon={Activity} 
                isActive={activeTab === 'analytics'} 
              />
              <SidebarItem 
                id="settings" 
                label="Settings" 
                icon={Settings} 
                isActive={activeTab === 'settings'} 
              />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Welcome back, Admin!
                </h2>
                <p className="text-black">
                  Here's what's happening with your blog today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Posts"
                  value={stats.totalPosts}
                  icon={FileText}
                  gradient="bg-gradient-to-br from-pink-500 to-pink-600"
                  change={stats.monthlyGrowth}
                />
                <StatCard
                  title="Published"
                  value={stats.publishedPosts}
                  icon={CheckCircle}
                  gradient="bg-gradient-to-br from-rose-500 to-rose-600"
                />
                <StatCard
                  title="Drafts"
                  value={stats.draftPosts}
                  icon={PenTool}
                  gradient="bg-gradient-to-br from-pink-400 to-pink-500"
                />
                <StatCard
                  title="Total Views"
                  value={stats.totalViews.toLocaleString()}
                  icon={Eye}
                  gradient="bg-gradient-to-br from-rose-400 to-rose-500"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-black mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => setActiveTab('create')}
                        className="w-full flex items-center justify-between p-4 border border-pink-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl">
                            <Plus className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-black">Create New Post</p>
                            <p className="text-sm text-black">Start writing a new blog post</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                      <button
                        onClick={() => setActiveTab('posts')}
                        className="w-full flex items-center justify-between p-4 border border-pink-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-black">Manage Posts</p>
                            <p className="text-sm text-black">Edit and organize your content</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-rose-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-black mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-pink-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">New post published</p>
                          <p className="text-xs text-black">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-rose-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">Post updated</p>
                          <p className="text-xs text-black">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-pink-400 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">Draft saved</p>
                          <p className="text-xs text-black">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    Content Management
                  </h2>
                  <p className="text-black">Manage and organize your blog content</p>
                </div>
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:from-pink-500 hover:to-rose-500 transition-all font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Post</span>
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl shadow-lg">
                  <div className="p-6 border-b border-pink-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                        <input
                          type="text"
                          placeholder="Search posts..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-black placeholder-gray-500"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 text-black rounded-xl hover:bg-gray-50 transition-colors">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <PostsList />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'create' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Create New Post
                </h2>
                <p className="text-black">Write and publish your next blog post</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl shadow-lg">
                  <CreatePostForm />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Analytics & Insights
                </h2>
                <p className="text-black">Track your blog performance and audience insights</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <Activity className="h-16 w-16 text-pink-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">Analytics Dashboard</h3>
                    <p className="text-black">Coming soon - Track your blog performance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Settings & Configuration
                </h2>
                <p className="text-black">Configure your blog preferences and settings</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-pink-200/50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <Settings className="h-16 w-16 text-pink-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-black mb-2">Settings Panel</h3>
                    <p className="text-black">Coming soon - Configure your blog settings</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-scan {
          animation: scan 1.5s linear infinite;
        }
      `}</style>
    </div>
  )
}
