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

const ADMIN_PASSWORD = 'admin123'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  monthlyGrowth: number
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setScanningEffect(true)
      setTimeout(() => {
        setIsAuthenticated(true)
        localStorage.setItem('adminAuthenticated', 'true')
        setScanningEffect(false)
      }, 1500)
    } else {
      alert('Incorrect password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('adminAuthenticated')
  }

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuthenticated')
    if (isAuth === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats()
    }
  }, [isAuthenticated])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/posts')
      if (response.ok) {
        const data = await response.json()
        const posts = data.posts || []
        
        setStats({
          totalPosts: posts.length,
          publishedPosts: posts.filter((p: any) => p.status === 'published').length,
          draftPosts: posts.filter((p: any) => p.status === 'draft').length,
          totalViews: posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0),
          monthlyGrowth: 12.5
        })
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full opacity-20 blur-sm"></div>
            </div>
          ))}
        </div>

        {/* Loading Effect */}
        {scanningEffect && (
          <div className="absolute inset-0 z-50">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent animate-scan"></div>
          </div>
        )}

        <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
          <div className="max-w-md w-full space-y-8">
            {/* Login Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl"></div>
              <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="relative mx-auto h-20 w-20 mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                    <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                      <BookOpen className="h-10 w-10 text-blue-600" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Blog Admin
                  </h2>
                  <p className="text-gray-600 text-sm">
                    Sign in to manage your blog content
                  </p>
                </div>
                
                <form className="space-y-6" onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="relative">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                          placeholder="Enter admin password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={scanningEffect}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105"
                  >
                    {scanningEffect ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <span>Sign In</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
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

  const StatCard = ({ title, value, icon: Icon, color, change, gradient }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 hover:border-blue-300/70 transition-all duration-300 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className="text-sm text-green-600 mt-2 flex items-center">
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
          ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-700 border border-blue-300/50' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.05),transparent_50%)]"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-xl border-b border-blue-200/50 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {isSidebarOpen ? <X className="h-5 w-5 text-gray-600" /> : <Menu className="h-5 w-5 text-gray-600" />}
            </button>
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl"></div>
                <div className="absolute inset-1 bg-white rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Blog Dashboard
                </h1>
                <p className="text-xs text-gray-500">Content Management System</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full animate-pulse"></span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-blue-200/50 transform transition-transform duration-300 ease-in-out shadow-lg`}>
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Dashboard Overview
                </h2>
                <p className="text-gray-600">
                  Monitor your blog performance and manage content effectively
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Posts"
                  value={stats.totalPosts}
                  icon={FileText}
                  gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                  change={stats.monthlyGrowth}
                />
                <StatCard
                  title="Published"
                  value={stats.publishedPosts}
                  icon={CheckCircle}
                  gradient="bg-gradient-to-br from-green-500 to-green-600"
                />
                <StatCard
                  title="Drafts"
                  value={stats.draftPosts}
                  icon={PenTool}
                  gradient="bg-gradient-to-br from-yellow-500 to-yellow-600"
                />
                <StatCard
                  title="Total Views"
                  value={stats.totalViews.toLocaleString()}
                  icon={Eye}
                  gradient="bg-gradient-to-br from-purple-500 to-purple-600"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                    <div className="space-y-4">
                      <button
                        onClick={() => setActiveTab('create')}
                        className="w-full flex items-center justify-between p-4 border border-blue-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                            <Plus className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Create New Post</p>
                            <p className="text-sm text-gray-600">Start writing a new blog post</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                      <button
                        onClick={() => setActiveTab('posts')}
                        className="w-full flex items-center justify-between p-4 border border-blue-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">Manage Posts</p>
                            <p className="text-sm text-gray-600">Edit and organize your content</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-purple-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">New post published</p>
                          <p className="text-xs text-gray-600">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Post updated</p>
                          <p className="text-xs text-gray-600">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">Draft saved</p>
                          <p className="text-xs text-gray-600">1 day ago</p>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    All Posts
                  </h2>
                  <p className="text-gray-600">Manage and organize your blog content</p>
                </div>
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Post</span>
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl shadow-lg">
                  <div className="p-6 border-b border-blue-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search posts..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-gray-900 placeholder-gray-500"
                        />
                      </div>
                      <button className="flex items-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
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
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Create New Post
                </h2>
                <p className="text-gray-600">Write and publish your next blog post</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl shadow-lg">
                  <CreatePostForm />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Analytics
                </h2>
                <p className="text-gray-600">Track your blog performance and audience insights</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <Activity className="h-16 w-16 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Analytics Dashboard</h3>
                    <p className="text-gray-600">Coming soon - Track your blog performance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Settings
                </h2>
                <p className="text-gray-600">Configure your blog preferences and settings</p>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-8">
                  <div className="text-center">
                    <div className="mx-auto h-32 w-32 mb-6 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse"></div>
                      <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                        <Settings className="h-16 w-16 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Settings Panel</h3>
                    <p className="text-gray-600">Coming soon - Configure your blog settings</p>
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
