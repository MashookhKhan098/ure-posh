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
import ErrorDisplay from './components/ErrorDisplay'
import { useWriterAuth } from '@/hooks/useWriterAuth'

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  draftPosts: number
  totalViews: number
  monthlyGrowth: number
}

export default function WriterPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
    monthlyGrowth: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [adminUsers, setAdminUsers] = useState<any[]>([])
  const [isLoadingUsers, setIsLoadingUsers] = useState(false)
  const router = useRouter()

  // Use the new authentication hook
  const { user, isLoading: authLoading, isAuthenticated, login, logout } = useWriterAuth()

  // Check if user is already authenticated
  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        fetchWriterUsers()
      } else {
        fetchStats()
        fetchWriterUsers() // Also fetch writers when authenticated
      }
    }
  }, [authLoading, isAuthenticated])

  const fetchWriterUsers = async () => {
    setIsLoadingUsers(true)
    try {
      console.log('🔍 Fetching writer users...')
      const response = await fetch('/api/writer/users')
      console.log('📡 Response status:', response.status)
      
      if (response.ok) {
        const data = await response.json()
        console.log('📊 Writer data received:', data)
        setAdminUsers(data.writers || [])
        console.log('✅ Writer users loaded:', data.writers?.length || 0)
      } else {
        const errorData = await response.text()
        console.error('❌ Failed to fetch writer users:', response.status, errorData)
      }
    } catch (error) {
      console.error('💥 Error fetching writer users:', error)
    } finally {
      setIsLoadingUsers(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError(null)

    try {
      console.log('🔐 Attempting writer login with:', { username, password: '***' })
      
      const result = await login(username, password)
      
      if (result.success) {
        console.log('✅ Writer login successful')
        setUsername('')
        setPassword('')
        fetchStats()
      } else {
        setLoginError(result.error || 'Login failed')
        console.log('❌ Writer login failed:', result.error)
      }
    } catch (error) {
      console.error('💥 Writer login error:', error)
      setLoginError('Network error. Please check your connection and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
  }

  const fetchStats = async () => {
    try {
      console.log('Fetching writer stats...')
      
      const response = await fetch('/api/writer/dashboard')
      if (response.ok) {
        const dashboardData = await response.json()
        console.log('Writer dashboard data:', dashboardData)
        
        setStats({
          totalPosts: dashboardData.counts.total || 0,
          publishedPosts: dashboardData.counts.approved || 0,
          draftPosts: dashboardData.counts.pending || 0,
          totalViews: dashboardData.statistics.total_views || 0,
          monthlyGrowth: dashboardData.monthly_growth || 0
        })
        console.log('Writer stats updated successfully')
      } else {
        console.error('Failed to fetch writer dashboard data')
      }
    } catch (error) {
      console.error('Failed to fetch writer stats:', error)
    }
  }

  // Loading state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 w-full max-w-md items-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading...</h2>
        </div>
      </div>
    )
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 mb-4 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <PenTool className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Writer Login</h2>
            <p className="text-gray-700 text-center mb-6">Enter your credentials to access the writer portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Clear Cache Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={() => {
                  localStorage.removeItem('writerToken')
                  localStorage.removeItem('writerUser')
                  window.location.reload()
                }}
                className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                🧹 Clear Cache & Reload
              </button>
            </div>
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-gray-900 placeholder-gray-500"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all text-gray-900 placeholder-gray-500"
                placeholder="Enter password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-500 hover:to-indigo-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <ErrorDisplay 
            error={loginError} 
            onClear={() => setLoginError(null)} 
          />

          {/* Show available writer users */}
          {adminUsers.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <p className="text-blue-700 text-sm font-semibold">Available Writer Accounts ({adminUsers.length})</p>
              </div>
              <div className="space-y-3">
                {adminUsers.map((user, index) => (
                  <div key={user.writer_id} className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-blue-100 hover:border-blue-200 transition-all duration-200 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div className="text-sm font-semibold text-gray-800">
                            {user.username}
                          </div>
                          {user.is_verified && (
                            <div className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                              ✓ Verified
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-gray-600 mb-1">
                          {user.full_name || user.email}
                        </div>
                        <div className="flex items-center space-x-3 text-xs">
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                            {user.specialization || 'General'}
                          </span>
                          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                            {user.experience_level || 'Intermediate'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setUsername(user.username);
                          setPassword(''); // Clear password when switching users
                        }}
                        className="text-xs bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-3 py-1.5 rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 font-medium"
                      >
                        Use Account
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <div className="flex items-start space-x-2">
                  <div className="text-blue-600 text-sm">💡</div>
                  <div className="text-xs text-blue-700">
                    <p className="font-medium mb-1">How to login:</p>
                    <p>1. Click "Use Account" to auto-fill the username</p>
                    <p>2. Enter your password (contact admin if you don't have one)</p>
                    <p>3. Click "Sign In" to access your writer dashboard</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Writer Statistics */}
          {adminUsers.length > 0 && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <p className="text-green-700 text-sm font-semibold">Writer Community Stats</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-green-700">{adminUsers.length}</div>
                  <div className="text-green-600">Active Writers</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-green-700">
                    {adminUsers.filter(u => u.is_verified).length}
                  </div>
                  <div className="text-green-600">Verified</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-green-700">
                    {adminUsers.filter(u => u.experience_level === 'expert').length}
                  </div>
                  <div className="text-green-600">Experts</div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-green-700">
                    {adminUsers.filter(u => u.experience_level === 'beginner').length}
                  </div>
                  <div className="text-green-600">Beginners</div>
                </div>
              </div>
            </div>
          )}

          {/* Security notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-4 w-4 text-yellow-600" />
              <p className="text-yellow-600 text-sm font-medium">Security Notice:</p>
            </div>
            <div className="text-xs text-yellow-700">
              🔐 Writer accounts require secure passwords. Contact your administrator to set up your account.
            </div>
            <div className="mt-2 text-xs text-yellow-600">
              📧 For access, email: admin@ureposh.com
            </div>
          </div>

          {isLoadingUsers && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-600 mx-auto mb-2"></div>
              <p className="text-xs text-gray-500">Loading writer accounts...</p>
            </div>
          )}

          {!isLoadingUsers && adminUsers.length === 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <p className="text-yellow-600 text-sm font-medium">No Writers Found</p>
              </div>
              <div className="text-xs text-yellow-700">
                <p>No active writer accounts found in the database.</p>
                <p className="mt-1">This could mean:</p>
                <ul className="mt-1 ml-4 list-disc">
                  <li>No writers have been created yet</li>
                  <li>All writers are marked as inactive</li>
                  <li>Database connection issues</li>
                </ul>
                <p className="mt-2">Check the browser console for detailed error messages.</p>
              </div>
            </div>
          )}

          {/* Clear cache button for testing */}
          <div className="text-center">
            <button
              onClick={() => {
                localStorage.removeItem('writerToken');
                localStorage.removeItem('writerUser');
                window.location.reload();
              }}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Clear Cache & Reload
            </button>
          </div>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, icon: Icon, color, change, gradient }: any) => (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 hover:border-blue-300/70 transition-all duration-300 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-black mb-2">{title}</p>
            <p className="text-3xl font-bold text-black">{value}</p>
            {change && (
              <p className="text-sm text-blue-600 mt-2 flex items-center">
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
          : 'text-black hover:text-black hover:bg-gray-100/50'
      }`}
    >
      <Icon className="h-5 w-5 mr-3" />
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
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

      <div className="flex relative z-10">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-blue-200/50 transform transition-transform duration-300 ease-in-out shadow-lg`}>
          <div className="p-6">
            {/* User Info */}
            <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user?.full_name || user?.username}</p>
                  <p className="text-xs text-gray-600">Writer</p>
                </div>
              </div>
            </div>

            <nav className="space-y-3">
              <SidebarItem 
                id="dashboard" 
                label="Dashboard" 
                icon={BarChart3} 
                isActive={activeTab === 'dashboard'} 
              />
              <SidebarItem 
                id="posts" 
                label="My Articles" 
                icon={FileText} 
                isActive={activeTab === 'posts'} 
              />
              <SidebarItem 
                id="create" 
                label="Write Article" 
                icon={Plus} 
                isActive={activeTab === 'create'} 
              />
              <SidebarItem 
                id="analytics" 
                label="Performance" 
                icon={Activity} 
                isActive={activeTab === 'analytics'} 
              />
              <SidebarItem 
                id="settings" 
                label="Profile" 
                icon={Settings} 
                isActive={activeTab === 'settings'} 
              />
            </nav>

            {/* Logout Button */}
            <div className="mt-6 pt-6 border-t border-blue-200/50">
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut className="h-5 w-5 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Welcome back, {user?.full_name || user?.username}!
                </h2>
                <p className="text-black">
                  Here's what's happening with your blog today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="My Articles"
                  value={stats.totalPosts}
                  icon={FileText}
                  gradient="bg-gradient-to-br from-blue-500 to-blue-600"
                  change={stats.monthlyGrowth}
                />
                <StatCard
                  title="Published"
                  value={stats.publishedPosts}
                  icon={CheckCircle}
                  gradient="bg-gradient-to-br from-indigo-500 to-indigo-600"
                />
                <StatCard
                  title="Drafts"
                  value={stats.draftPosts}
                  icon={PenTool}
                  gradient="bg-gradient-to-br from-blue-400 to-blue-500"
                />
                <StatCard
                  title="Total Views"
                  value={stats.totalViews.toLocaleString()}
                  icon={Eye}
                  gradient="bg-gradient-to-br from-indigo-400 to-indigo-500"
                />
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-black mb-6">Quick Actions</h3>
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
                            <p className="font-bold text-black">Write New Article</p>
                            <p className="text-sm text-black">Start writing a new article</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                      <button
                        onClick={() => setActiveTab('posts')}
                        className="w-full flex items-center justify-between p-4 border border-blue-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all group"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl">
                            <FileText className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-black">My Articles</p>
                            <p className="text-sm text-black">Edit and manage your articles</p>
                          </div>
                        </div>
                        <div className="w-2 h-2 bg-indigo-500 rounded-full group-hover:animate-pulse"></div>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-black mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">New article published</p>
                          <p className="text-xs text-black">2 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">Article updated</p>
                          <p className="text-xs text-black">5 hours ago</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="h-2 w-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-black">Draft saved</p>
                          <p className="text-xs text-black">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Writers Section */}
              {adminUsers.length > 0 && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-white/80 backdrop-blur-xl border border-green-200/50 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-black">Writer Community</h3>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-700">{adminUsers.length} Active Writers</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {adminUsers.slice(0, 6).map((user) => (
                        <div key={user.writer_id} className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-4 hover:border-green-300 transition-all duration-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                              <User className="h-4 w-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                                {user.is_verified && (
                                  <div className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">
                                    ✓
                                  </div>
                                )}
                              </div>
                              <p className="text-xs text-gray-600">{user.full_name || user.email}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                  {user.specialization || 'General'}
                                </span>
                                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                                  {user.experience_level || 'Intermediate'}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {adminUsers.length > 6 && (
                      <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">+{adminUsers.length - 6} more writers</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Debug Section - Only show in development */}
              {process.env.NODE_ENV === 'development' && (
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Database className="h-4 w-4 text-gray-600" />
                    <p className="text-gray-700 text-sm font-medium">Debug Info</p>
                  </div>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>Admin Users Count: {adminUsers.length}</p>
                    <p>Loading Users: {isLoadingUsers ? 'Yes' : 'No'}</p>
                    <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
                    <p>Auth Loading: {authLoading ? 'Yes' : 'No'}</p>
                    <button
                      onClick={fetchWriterUsers}
                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                    >
                      Refresh Writers
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'posts' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    My Articles
                  </h2>
                  <p className="text-black">Manage and organize your articles</p>
                </div>
                <button
                  onClick={() => setActiveTab('create')}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all font-medium"
                >
                  <Plus className="h-4 w-4" />
                  <span>Write Article</span>
                </button>
              </div>
              
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-2xl shadow-lg">
                  <div className="p-6 border-b border-blue-200/50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-black" />
                        <input
                          type="text"
                          placeholder="Search articles..."
                          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black placeholder-gray-500"
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
                  Write New Article
                </h2>
                <p className="text-black">Create and publish your next article</p>
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
                <h2 className="text-3xl font-bold text-black mb-2">
                  Performance & Insights
                </h2>
                <p className="text-black">Track your article performance and audience insights</p>
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
                    <h3 className="text-2xl font-bold text-black mb-2">Performance Dashboard</h3>
                    <p className="text-black">Coming soon - Track your article performance</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">
                  Profile & Settings
                </h2>
                <p className="text-black">Configure your writer profile and preferences</p>
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
                    <h3 className="text-2xl font-bold text-black mb-2">Profile Settings</h3>
                    <p className="text-black">Coming soon - Configure your writer profile</p>
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
