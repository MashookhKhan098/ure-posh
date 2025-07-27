'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Settings, 
  CheckCircle, 
  XCircle, 
  Clock, 
  TrendingUp,
  UserPlus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Shield,
  Bell,
  Activity,
  Calendar,
  Mail,
  Search,
  Filter,
  MoreHorizontal,
  Star,
  Award,
  Target,
  Zap,
  Hash,
  MessageSquare
} from 'lucide-react';
import CreateWriterForm from './components/CreateWriterForm';
import NotificationToast from './components/NotificationToast';
import WriterManagement from './components/WriterManagement';

interface Writer {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  postsCount: number;
  joinDate: string;
  lastActive: string;
}

interface Post {
  id: string;
  title: string;
  writer: string;
  status: 'draft' | 'published' | 'rejected';
  createdAt: string;
  category: string;
  viewCount: number;
  content?: string;
}

interface PerformanceMetrics {
  totalWriters: number;
  totalPosts: number;
  pendingApprovals: number;
  approvedPosts: number;
  totalViews: number;
  avgResponseTime: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('writers');
  const [writers, setWriters] = useState<Writer[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showCreateWriter, setShowCreateWriter] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalWriters: 0,
    totalPosts: 0,
    pendingApprovals: 0,
    approvedPosts: 0,
    totalViews: 0,
    avgResponseTime: '2.5h'
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        if (response.ok) {
          const data = await response.json();
          setWriters(data.writers || []);
          setPosts(data.posts || []);
          setMetrics(data.metrics || {
            totalWriters: 0,
            totalPosts: 0,
            pendingApprovals: 0,
            approvedPosts: 0,
            totalViews: 0,
            avgResponseTime: '0h'
          });
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleApprovePost = async (postId: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' })
      });
      
      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, status: 'published' } : post
        ));
        showNotification('Post approved successfully!', 'success');
      }
    } catch (error) {
      console.error('Error approving post:', error);
      showNotification('Failed to approve post', 'error');
    }
  };

  const handleRejectPost = async (postId: string, reason: string) => {
    try {
      const response = await fetch(`/api/posts/${postId}/approve`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason })
      });
      
      if (response.ok) {
        setPosts(posts.map(post => 
          post.id === postId ? { ...post, status: 'rejected' } : post
        ));
        showNotification('Post rejected successfully!', 'success');
      }
    } catch (error) {
      console.error('Error rejecting post:', error);
      showNotification('Failed to reject post', 'error');
    }
  };

  const handleDeletePost = async (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!confirm(`Are you sure you want to delete "${post?.title}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
        showNotification(`Post "${post?.title}" deleted successfully!`, 'success');
      } else {
        const data = await response.json();
        showNotification(data.error || 'Failed to delete post', 'error');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      showNotification('Network error. Please try again.', 'error');
    }
  };

  const handleUpdateWriter = async (writerId: string, updates: Partial<Writer>) => {
    try {
      const response = await fetch(`/api/admin/writers/${writerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      
      if (response.ok) {
        setWriters(writers.map(writer => 
          writer.id === writerId ? { ...writer, ...updates } : writer
        ));
      }
    } catch (error) {
      console.error('Error updating writer:', error);
    }
  };

  const handleDeleteWriter = async (writerId: string) => {
    if (!confirm('Are you sure you want to delete this writer? This will also delete all their posts.')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/writers/${writerId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        const writer = writers.find(w => w.id === writerId);
        setWriters(writers.filter(writer => writer.id !== writerId));
        showNotification(`Writer "${writer?.name}" deleted successfully!`, 'success');
      } else {
        const data = await response.json();
        showNotification(data.error || 'Failed to delete writer', 'error');
      }
    } catch (error) {
      console.error('Error deleting writer:', error);
      showNotification('Network error. Please try again.', 'error');
    }
  };

  const handleWriterCreated = (newWriter: Writer) => {
    setWriters(prev => [newWriter, ...prev]);
    setMetrics(prev => ({
      ...prev,
      totalWriters: prev.totalWriters + 1
    }));
    setNotification({
      message: `Writer "${newWriter.name}" created successfully!`,
      type: 'success'
    });
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ message, type });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      pending: 'bg-amber-100 text-amber-800 border-amber-200',
      approved: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      rejected: 'bg-red-100 text-red-800 border-red-200'
    };
    return <Badge className={`${variants[status as keyof typeof variants]} border`}>{status}</Badge>;
  };

  const getMetricIcon = (metric: string) => {
    const icons = {
      writers: <Users className="w-5 h-5" />,
      posts: <FileText className="w-5 h-5" />,
      pending: <Clock className="w-5 h-5" />,
      views: <TrendingUp className="w-5 h-5" />
    };
    return icons[metric as keyof typeof icons] || <Activity className="w-5 h-5" />;
  };

  const getMetricColor = (metric: string) => {
    const colors = {
      writers: 'from-blue-500 to-blue-600',
      posts: 'from-purple-500 to-purple-600',
      pending: 'from-amber-500 to-amber-600',
      views: 'from-emerald-500 to-emerald-600'
    };
    return colors[metric as keyof typeof colors] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 px-6 py-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
                <p className="text-slate-600 mt-1">Manage writers, posts, and platform settings</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="bg-white/50 backdrop-blur-sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced Metrics Overview */}
      <div className="px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { key: 'writers', label: 'Total Writers', value: metrics.totalWriters, change: '+2', period: 'from last month' },
            { key: 'posts', label: 'Total Posts', value: metrics.totalPosts, change: '+12', period: 'from last week' },
            { key: 'pending', label: 'Pending Approvals', value: metrics.pendingApprovals, change: '', period: 'Requires attention' },
            { key: 'views', label: 'Total Views', value: metrics.totalViews.toLocaleString(), change: '+8%', period: 'from last month' }
          ].map((metric) => (
            <Card key={metric.key} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-medium text-slate-700">{metric.label}</CardTitle>
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${getMetricColor(metric.key)} flex items-center justify-center text-white`}>
                  {getMetricIcon(metric.key)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-slate-900 mb-1">{metric.value}</div>
                <p className="text-xs text-slate-500 flex items-center">
                  {metric.change && <span className="text-emerald-600 font-medium mr-1">{metric.change}</span>}
                  {metric.period}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/50 backdrop-blur-sm border border-slate-200/50">
            <TabsTrigger value="writers" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white">
              <Users className="w-4 h-4" />
              <span>Writer Management</span>
            </TabsTrigger>
            <TabsTrigger value="approvals" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-teal-500 data-[state=active]:text-white">
              <FileText className="w-4 h-4" />
              <span>Post Approval</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4" />
              <span>Performance & Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Enhanced Writer Management Tab */}
          <TabsContent value="writers" className="space-y-6">
            <WriterManagement />
          </TabsContent>

          {/* Enhanced Post Approval Tab */}
          <TabsContent value="approvals" className="space-y-6">
            {/* Approval Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 bg-gradient-to-br from-amber-50 to-orange-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-700">Pending Review</p>
                      <p className="text-2xl font-bold text-amber-900">{posts.filter(p => p.status === 'draft').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">Approved</p>
                      <p className="text-2xl font-bold text-emerald-900">{posts.filter(p => p.status === 'published').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-red-50 to-pink-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">Rejected</p>
                      <p className="text-2xl font-bold text-red-900">{posts.filter(p => p.status === 'rejected').length}</p>
                    </div>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-6 h-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700">Total Posts</p>
                      <p className="text-2xl font-bold text-blue-900">{posts.length}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Post Approval Interface */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900 flex items-center">
                      <Shield className="w-6 h-6 mr-3 text-slate-700" />
                      Content Approval Center
                    </CardTitle>
                    <CardDescription className="text-slate-600">
                      Review, approve, or reject submitted content. Ensure quality and compliance.
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        <Clock className="w-3 h-3 mr-1" />
                        {posts.filter(p => p.status === 'draft').length} Pending
                      </Badge>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {posts.filter(p => p.status === 'published').length} Approved
                      </Badge>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        <XCircle className="w-3 h-3 mr-1" />
                        {posts.filter(p => p.status === 'rejected').length} Rejected
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {posts.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Posts to Review</h3>
                    <p className="text-slate-600">All posts have been reviewed and processed.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {posts.map((post) => (
                      <div key={post.id} className="group border border-slate-200/50 rounded-xl bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all duration-300 hover:shadow-lg overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <h3 className="font-bold text-slate-900 text-xl">{post.title}</h3>
                                {getStatusBadge(post.status)}
                              </div>
                              
                              {/* Post Meta Information */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <Users className="w-4 h-4" />
                                  <span className="font-medium">{post.writer}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <Target className="w-4 h-4" />
                                  <span className="font-medium">{post.category}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <TrendingUp className="w-4 h-4" />
                                  <span className="font-medium">{post.viewCount} views</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-slate-600">
                                  <Calendar className="w-4 h-4" />
                                  <span className="font-medium">
                                    {new Date(post.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </span>
                                </div>
                              </div>

                              {/* Content Preview */}
                              <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                <p className="text-sm text-slate-700 line-clamp-3">
                                  {post.content || 'Content preview not available...'}
                                </p>
                              </div>

                              {/* Quality Indicators */}
                              <div className="flex items-center space-x-4 text-xs text-slate-500">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {Math.ceil((post.content?.length || 0) / 200)} min read
                                </span>
                                <span className="flex items-center">
                                  <Hash className="w-3 h-3 mr-1" />
                                  {post.category} • {post.writer}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <div className="flex items-center space-x-3">
                              {post.status === 'draft' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    onClick={() => handleApprovePost(post.id)}
                                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg"
                                  >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve & Publish
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => handleRejectPost(post.id, 'Content does not meet quality standards')}
                                    className="border-red-200 text-red-600 hover:bg-red-50"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 hover:bg-slate-50"
                                  >
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Request Changes
                                  </Button>
                                </>
                              )}
                              {post.status === 'published' && (
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-emerald-100 text-emerald-800">
                                    <CheckCircle className="w-3 h-3 mr-1" />
                                    Published
                                  </Badge>
                                  <span className="text-sm text-slate-500">
                                    Approved on {new Date(post.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {post.status === 'rejected' && (
                                <div className="flex items-center space-x-2">
                                  <Badge className="bg-red-100 text-red-800">
                                    <XCircle className="w-3 h-3 mr-1" />
                                    Rejected
                                  </Badge>
                                  <span className="text-sm text-slate-500">
                                    Rejected on {new Date(post.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                                <Eye className="w-4 h-4 mr-2" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => handleDeletePost(post.id)}
                                className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                              <Button variant="outline" size="sm" className="hover:bg-slate-50">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Performance & Settings Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Enhanced Performance Metrics */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                    Performance Metrics
                  </CardTitle>
                  <CardDescription className="text-slate-600">Platform performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Average Response Time</span>
                    <span className="text-sm font-semibold text-blue-600">{metrics.avgResponseTime}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Approval Rate</span>
                    <span className="text-sm font-semibold text-emerald-600">
                      {Math.round((metrics.approvedPosts / metrics.totalPosts) * 100)}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">Active Writers</span>
                    <span className="text-sm font-semibold text-amber-600">
                      {writers.filter(w => w.status === 'active').length}/{metrics.totalWriters}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Platform Settings */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-600" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription className="text-slate-600">Configure platform behavior</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Auto-approval</h4>
                      <p className="text-sm text-slate-600">Automatically approve posts from trusted writers</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Content Moderation</h4>
                      <p className="text-sm text-slate-600">Set up content filtering rules</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Writer Permissions</h4>
                      <p className="text-sm text-slate-600">Manage writer access levels</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Security Settings */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-red-600" />
                    Security & Access
                  </CardTitle>
                  <CardDescription className="text-slate-600">Manage security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600">Enhanced security for admin accounts</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">API Access</h4>
                      <p className="text-sm text-slate-600">Manage API keys and permissions</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Audit Logs</h4>
                      <p className="text-sm text-slate-600">View admin activity logs</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">View</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Notification Settings */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-slate-900 flex items-center">
                    <Bell className="w-5 h-5 mr-2 text-green-600" />
                    Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-600">Configure notification preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">New Post Alerts</h4>
                      <p className="text-sm text-slate-600">Get notified when new posts are submitted</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">Writer Activity</h4>
                      <p className="text-sm text-slate-600">Monitor writer login and activity</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">System Alerts</h4>
                      <p className="text-sm text-slate-600">Critical system notifications</p>
                    </div>
                    <Button variant="outline" size="sm" className="bg-white/50">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Writer Modal */}
      {showCreateWriter && (
        <CreateWriterForm
          onClose={() => setShowCreateWriter(false)}
          onWriterCreated={handleWriterCreated}
        />
      )}

      {/* Notification Toast */}
      {notification && (
        <NotificationToast
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}
