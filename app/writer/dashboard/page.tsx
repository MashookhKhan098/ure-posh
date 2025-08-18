'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { useWriterAuth } from '@/hooks/useWriterAuth'
import { createClient as createSupabaseBrowserClient } from '@/utils/supabase/client'
import CreatePostForm from './components/CreatePostForm'
import {
	ArrowRight,
	CheckCircle2,
	Clock,
	FileText,
	LogOut,
	XCircle,
	Plus,
	Edit,
	Eye,
	Calendar,
	TrendingUp,
	BookOpen,
	Award,
	Target,
	BarChart3
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type Post = {
	id: string
	title: string
	slug?: string
	status?: string
	category?: string
	featured_image?: string
	created_at?: string
	updated_at?: string
	author?: string
}

export default function WriterDashboardPage() {
	const { writer, isAuthenticated, loading: authLoading, logout } = useWriterAuth()
	const [articles, setArticles] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

	const supabase = useMemo(() => {
		try {
			return createSupabaseBrowserClient()
		} catch (e) {
			return null
		}
	}, [])

	useEffect(() => {
		if (authLoading) return
		if (!isAuthenticated) {
			window.location.replace('/writer/login')
			return
		}
	}, [authLoading, isAuthenticated])

	useEffect(() => {
		const fetchArticlesForWriter = async () => {
			if (!supabase || !writer) return
			setLoading(true)
			setError(null)
			try {
				const name = writer.name || ''
				const username = writer.username || ''
				const orFilter = `author.eq.${encodeURIComponent(name)},author.eq.${encodeURIComponent(username)}`
				const { data, error } = await supabase
					.from('articles')
					.select('*')
					.or(orFilter)
					.order('created_at', { ascending: false })

				if (error) {
					setError('Failed to load articles')
					setArticles([])
					return
				}
				setArticles(data || [])
			} catch (e) {
				setError('Failed to load articles')
				setArticles([])
			} finally {
				setLoading(false)
			}
		}

		if (isAuthenticated) {
			fetchArticlesForWriter()
		}
	}, [isAuthenticated, writer, supabase])

	const totalCount = articles.length
	const publishedCount = articles.filter(p => p.status === 'published').length
	const pendingCount = articles.filter(p => p.status === 'pending' || p.status === 'draft').length
	const rejectedCount = articles.filter(p => p.status === 'rejected' || p.status === 'reverted').length

	// Calculate some additional stats
	const thisMonthArticles = articles.filter(p => {
		if (!p.created_at) return false
		const postDate = new Date(p.created_at)
		const now = new Date()
		return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear()
	}).length

	const getWriterInitials = (name?: string, username?: string) => {
		const displayName = name || username || 'Writer'
		return displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
	}

	const handleCreatePost = async () => {
		// Refresh the articles list after creating a new article
		if (isAuthenticated && writer && supabase) {
			const { name, username } = writer
			if (!name && !username) return

			try {
				const orFilter = `author.eq.${encodeURIComponent(name)},author.eq.${encodeURIComponent(username)}`
				const { data, error } = await supabase
					.from('articles')
					.select('*')
					.or(orFilter)
					.order('created_at', { ascending: false })

				if (!error && data) {
					setArticles(data)
				}
			} catch (e) {
				console.error('Error refreshing articles:', e)
			}
		}

		setShowCreateForm(false)
	}

	if (authLoading || !isAuthenticated) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
				<div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-8 shadow-lg">
					<div className="flex items-center gap-4 text-gray-600">
						<div className="w-8 h-8 border-3 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
						<div>
							<p className="font-medium text-gray-900">Loading your dashboard...</p>
							<p className="text-sm text-gray-500">Please wait while we prepare your workspace</p>
						</div>
					</div>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
			<div className="max-w-7xl mx-auto px-4 py-6">
				{/* Header Section */}
				<div className="bg-white/70 backdrop-blur-xl border border-gray-200/50 rounded-2xl p-6 mb-6 shadow-lg">
					<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
						<div className="flex items-center gap-4">
							<Avatar className="h-16 w-16">
								<AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-lg font-semibold">
									{getWriterInitials(writer?.name, writer?.username)}
								</AvatarFallback>
							</Avatar>
							<div>
								<h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
									Welcome back, {writer?.name || writer?.username}
								</h1>
								<p className="text-gray-600 mt-1">
									Manage your articles and track your writing progress
								</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							<Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/25">
								<button onClick={() => setShowCreateForm(true)}>
									<Plus className="h-4 w-4" />
									New Article
								</button>
							</Button>
							<Button variant="outline" onClick={() => logout()} className="bg-white/60 backdrop-blur-sm">
								<LogOut className="h-4 w-4" />
								Sign out
							</Button>
						</div>
					</div>
				</div>

				{/* Stats Cards */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
					<div className="group bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-blue-100 text-sm font-medium">Total Articles</p>
								<p className="text-3xl font-bold mt-2">{totalCount}</p>
								<p className="text-blue-100 text-xs mt-1">All time articles</p>
							</div>
							<div className="bg-white/20 p-3 rounded-xl">
								<FileText className="w-6 h-6" />
							</div>
						</div>
					</div>

					<div className="group bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-emerald-100 text-sm font-medium">Published</p>
								<p className="text-3xl font-bold mt-2">{publishedCount}</p>
								<p className="text-emerald-100 text-xs mt-1">Live articles</p>
							</div>
							<div className="bg-white/20 p-3 rounded-xl">
								<CheckCircle2 className="w-6 h-6" />
							</div>
						</div>
					</div>

					<div className="group bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-amber-100 text-sm font-medium">In Review</p>
								<p className="text-3xl font-bold mt-2">{pendingCount}</p>
								<p className="text-amber-100 text-xs mt-1">Awaiting approval</p>
							</div>
							<div className="bg-white/20 p-3 rounded-xl">
								<Clock className="w-6 h-6" />
							</div>
						</div>
					</div>

					<div className="group bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl p-6 text-white hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-purple-100 text-sm font-medium">This Month</p>
								<p className="text-3xl font-bold mt-2">{thisMonthArticles}</p>
								<p className="text-purple-100 text-xs mt-1">Articles written</p>
							</div>
							<div className="bg-white/20 p-3 rounded-xl">
								<TrendingUp className="w-6 h-6" />
							</div>
						</div>
					</div>
				</div>

				{/* Quick Actions */}
				<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg mb-8">
					<h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
						<button 
							onClick={() => setShowCreateForm(true)}
							className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-200/50 group"
						>
							<Plus className="w-5 h-5 text-blue-600 mr-3 group-hover:scale-110 transition-transform" />
							<span className="text-sm font-medium text-blue-700">Write Article</span>
						</button>
						<button className="flex items-center p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl hover:from-emerald-100 hover:to-green-100 transition-all duration-200 border border-emerald-200/50 group">
							<Eye className="w-5 h-5 text-emerald-600 mr-3 group-hover:scale-110 transition-transform" />
							<span className="text-sm font-medium text-emerald-700">Preview Drafts</span>
						</button>
						<button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200/50 group">
							<BarChart3 className="w-5 h-5 text-purple-600 mr-3 group-hover:scale-110 transition-transform" />
							<span className="text-sm font-medium text-purple-700">View Analytics</span>
						</button>
						<button className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:from-orange-100 hover:to-red-100 transition-all duration-200 border border-orange-200/50 group">
							<Award className="w-5 h-5 text-orange-600 mr-3 group-hover:scale-110 transition-transform" />
							<span className="text-sm font-medium text-orange-700">Achievements</span>
						</button>
					</div>
				</div>

				{/* Recent Activity */}
				{articles.length > 0 && (
					<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg mb-8">
						<div className="flex items-center justify-between mb-4">
							<h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
							<button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
						</div>
						<div className="space-y-3">
							{articles.slice(0, 3).map((post) => (
								<div key={post.id} className="flex items-center p-3 bg-gray-50/50 rounded-lg border border-gray-200/50">
									<div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
									<div className="flex-1">
										<p className="text-sm font-medium text-gray-900">{post.title}</p>
										<p className="text-xs text-gray-500">Submitted on {formatDate(post.created_at)}</p>
									</div>
									<Badge variant={getStatusVariant(post.status)} className="text-xs">
										{formatStatus(post.status)}
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Main Content */}
				<Tabs defaultValue="articles" className="w-full">
					<div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">
						<div className="p-6 border-b border-gray-200/50">
							<TabsList className="grid w-full grid-cols-3 bg-gray-100/50">
								<TabsTrigger value="articles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">My Articles</TabsTrigger>
								<TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Analytics</TabsTrigger>
								<TabsTrigger value="profile" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">Profile</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent value="articles" className="p-6 mt-0">
							<div className="space-y-6">
								<div className="flex items-center justify-between">
									<div>
										<h2 className="text-xl font-bold text-gray-900">Your Articles</h2>
										<p className="text-sm text-gray-600 mt-1">
											Manage and track all your written content
										</p>
									</div>
									<Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
										<button onClick={() => setShowCreateForm(true)}>
											<Plus className="h-4 w-4" />
											Write New Article
										</button>
									</Button>
								</div>

								{loading ? (
									<div className="flex items-center justify-center py-12">
										<div className="flex items-center gap-3 text-gray-600">
											<div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
											<span>Loading your articles...</span>
										</div>
									</div>
								) : error ? (
									<div className="text-center py-12">
										<div className="bg-red-50 border border-red-200 rounded-2xl p-8">
											<XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
											<h3 className="text-lg font-medium text-red-900 mb-2">Error Loading Articles</h3>
											<p className="text-red-600">{error}</p>
											<p className="text-gray-500 text-sm mt-2">Please try refreshing the page</p>
										</div>
									</div>
								) : articles.length === 0 ? (
									<div className="text-center py-12">
										<div className="bg-gray-50/50 border border-gray-200 rounded-2xl p-8">
											<BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
											<h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
											<p className="text-gray-500 mb-6">Start writing your first article to see it here</p>
											<Button asChild className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
												<button onClick={() => setShowCreateForm(true)}>
													<Plus className="h-4 w-4" />
													Create Your First Article
												</button>
											</Button>
										</div>
									</div>
								) : (
									<div className="space-y-4">
										{articles.map((post: any) => (
											<div key={post.id} className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-4 hover:bg-white/80 transition-all duration-200 hover:shadow-md">
												<div className="flex items-center justify-between">
													<div className="flex-1">
														<div className="flex items-center gap-3 mb-2">
															<h3 className="font-semibold text-gray-900 text-lg">{post.title}</h3>
															<Badge variant={getStatusVariant(post.status)} className="shadow-sm">
																{formatStatus(post.status)}
															</Badge>
														</div>
														<div className="flex items-center gap-4 text-sm text-gray-600">
															<span className="flex items-center gap-1">
																<Calendar className="h-4 w-4" />
																{formatDate(post.created_at)}
															</span>
															{post.category && (
																<span className="flex items-center gap-1">
																	<Target className="h-4 w-4" />
																	{post.category}
																</span>
															)}
														</div>
													</div>
													<div className="flex items-center gap-2">
														{post.status === 'published' && (
															<Button variant="outline" size="sm" asChild className="bg-white/60 backdrop-blur-sm">
																<a href={`/posts/${post.slug || post.id}`} target="_blank" rel="noreferrer">
																	<Eye className="h-4 w-4" />
																	View Live
																</a>
															</Button>
														)}
														<Button variant="ghost" size="sm" className="hover:bg-white/60">
															<Edit className="h-4 w-4" />
															Edit
														</Button>
													</div>
												</div>
											</div>
										))}
									</div>
								)}
							</div>
						</TabsContent>

						<TabsContent value="analytics" className="p-6 mt-0">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
										<BarChart3 className="h-5 w-5" />
										Writing Analytics
									</h2>
									<p className="text-sm text-gray-600 mt-1">
										Track your writing progress and performance
									</p>
								</div>
								
								<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
									<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 text-center">
										<div className="text-3xl font-bold text-blue-600 mb-2">{Math.round((publishedCount / Math.max(totalCount, 1)) * 100)}%</div>
										<div className="text-sm text-gray-600 font-medium">Success Rate</div>
										<div className="text-xs text-gray-500 mt-1">Published vs Total</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 text-center">
										<div className="text-3xl font-bold text-emerald-600 mb-2">{totalCount > 0 ? Math.round(totalCount / 12) : 0}</div>
										<div className="text-sm text-gray-600 font-medium">Avg per Month</div>
										<div className="text-xs text-gray-500 mt-1">Articles written</div>
									</div>
									<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 text-center">
										<div className="text-3xl font-bold text-amber-600 mb-2">{rejectedCount}</div>
										<div className="text-sm text-gray-600 font-medium">Need Revision</div>
										<div className="text-xs text-gray-500 mt-1">Improvement areas</div>
									</div>
								</div>

								{/* Progress Chart Placeholder */}
								<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
									<h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Progress</h3>
									<div className="h-64 bg-gray-50/50 rounded-lg flex items-center justify-center border border-gray-200/50">
										<div className="text-center">
											<BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
											<p className="text-gray-500 font-medium">Analytics Chart</p>
											<p className="text-sm text-gray-400">Coming soon...</p>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>

						<TabsContent value="profile" className="p-6 mt-0">
							<div className="space-y-6">
								<div>
									<h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
										<Award className="h-5 w-5" />
										Writer Profile
									</h2>
									<p className="text-sm text-gray-600 mt-1">
										Your writing profile and achievements
									</p>
								</div>
								
								<div className="space-y-6">
									<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
										<div className="flex items-center gap-6">
											<Avatar className="h-20 w-20">
												<AvatarFallback className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xl font-semibold">
													{getWriterInitials(writer?.name, writer?.username)}
												</AvatarFallback>
											</Avatar>
											<div>
												<h3 className="text-2xl font-bold text-gray-900">{writer?.name || writer?.username}</h3>
												<p className="text-gray-600 text-lg">@{writer?.username}</p>
												<p className="text-sm text-gray-500 mt-1">Member since {new Date().getFullYear()}</p>
											</div>
										</div>
									</div>
									
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
											<h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
												<FileText className="h-5 w-5" />
												Writing Statistics
											</h4>
											<div className="space-y-3">
												<div className="flex justify-between items-center py-2 border-b border-gray-200/50">
													<span className="text-gray-600">Total Articles:</span>
													<span className="font-semibold text-gray-900">{totalCount}</span>
												</div>
												<div className="flex justify-between items-center py-2 border-b border-gray-200/50">
													<span className="text-gray-600">Published:</span>
													<span className="font-semibold text-emerald-600">{publishedCount}</span>
												</div>
												<div className="flex justify-between items-center py-2 border-b border-gray-200/50">
													<span className="text-gray-600">In Review:</span>
													<span className="font-semibold text-amber-600">{pendingCount}</span>
												</div>
												<div className="flex justify-between items-center py-2">
													<span className="text-gray-600">This Month:</span>
													<span className="font-semibold text-purple-600">{thisMonthArticles}</span>
												</div>
											</div>
										</div>
										
										<div className="bg-white/60 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
											<h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
												<Award className="h-5 w-5" />
												Achievements
											</h4>
											<div className="space-y-3">
												{publishedCount >= 1 && (
													<Badge variant="secondary" className="mr-2 mb-2 bg-emerald-50 text-emerald-700 border-emerald-200">
														🎉 First Article Published
													</Badge>
												)}
												{publishedCount >= 5 && (
													<Badge variant="secondary" className="mr-2 mb-2 bg-blue-50 text-blue-700 border-blue-200">
														🏆 5 Articles Milestone
													</Badge>
												)}
												{publishedCount >= 10 && (
													<Badge variant="secondary" className="mr-2 mb-2 bg-purple-50 text-purple-700 border-purple-200">
														⭐ Prolific Writer
													</Badge>
												)}
												{thisMonthArticles >= 3 && (
													<Badge variant="secondary" className="mr-2 mb-2 bg-orange-50 text-orange-700 border-orange-200">
														🔥 Monthly Contributor
													</Badge>
												)}
												{publishedCount === 0 && (
													<div className="text-center py-4">
														<p className="text-sm text-gray-500">Publish your first article to earn achievements!</p>
													</div>
												)}
											</div>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</div>
				</Tabs>
			</div>

			{/* Create Post Form Modal */}
			{showCreateForm && (
				<CreatePostForm
					onClose={() => setShowCreateForm(false)}
					onSubmit={handleCreatePost}
				/>
			)}
		</div>
	)
}

function formatDate(value?: string) {
	if (!value) return 'Not set'
	try {
		const date = new Date(value)
		return date.toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: '2-digit'
		})
	} catch {
		return 'Invalid date'
	}
}

function formatStatus(status?: string) {
	if (!status) return 'Unknown'
	return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ')
}

function getStatusVariant(status?: string): "default" | "secondary" | "destructive" | "outline" {
	switch (status) {
		case 'published':
			return 'default'
		case 'pending':
		case 'draft':
			return 'secondary'
		case 'rejected':
		case 'reverted':
			return 'destructive'
		default:
			return 'outline'
	}
}

function getStatusBadgeClass(status?: string) {
	const base = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium'
	switch (status) {
		case 'published':
			return `${base} bg-emerald-50 text-emerald-700 border border-emerald-100`
		case 'pending':
		case 'draft':
			return `${base} bg-amber-50 text-amber-700 border border-amber-100`
		case 'rejected':
		case 'reverted':
			return `${base} bg-rose-50 text-rose-700 border border-rose-100`
		default:
			return `${base} bg-gray-100 text-gray-700`
	}
}


