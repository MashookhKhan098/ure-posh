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
	BarChart3,
	Share2,
	Bookmark
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import Image from 'next/image'

type Post = {
	id: string
	title: string
	slug?: string
	status?: string
	category?: string
	featured_image?: string
	image_url?: string
	excerpt?: string
	created_at?: string
	updated_at?: string
	author?: string
	verified?: boolean
	published_at?: string | null
	views?: number
}

export default function WriterDashboardPage() {

	const { writer, isAuthenticated, loading: authLoading, logout } = useWriterAuth()
	const [articles, setArticles] = useState<Post[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [showCreateForm, setShowCreateForm] = useState<boolean>(false)
	const [writerStatusFilter, setWriterStatusFilter] = useState<'All' | 'Published' | 'Pending' | 'Reverted'>('All')
	const [assignedCategories, setAssignedCategories] = useState<{id: string, name: string}[]>([])

	const supabase = useMemo(() => {
		try {
			return createSupabaseBrowserClient()
		} catch (e) {
			return null
		}
	}, [])

	// Fetch assigned categories for the writer
	useEffect(() => {
		async function fetchAssignedCategories() {
			if (!writer?.field_allotted) return setAssignedCategories([])
			try {
				const res = await fetch('/api/categories')
				if (!res.ok) return setAssignedCategories([])
				const data = await res.json()
				const allCategories = data.data || []
				const fieldToCategoryMap = {
					company_updates: 'company-updates',
					compliance_legal_insights: 'compliance-legal-insights',
					news_media_coverage: 'news-media-coverage',
					newsletter_archive: 'newsletter-archive',
					thought_leadership: 'thought-leadership',
					workplace_stories: 'workplace-stories',
					events_webinars: 'events-webinars',
					international_regulatory_policy_watch: 'international-regulatory-policy-watch',
					united_kingdom_workplace: 'united-kingdom-workplace',
					us_workplace: 'us-workplace'
				}
				const allowed: ((prevState: { id: string; name: string }[]) => { id: string; name: string }[]) | { id: any; name: any }[] = []
				Object.entries(writer.field_allotted).forEach(([field, isAllowed]) => {
					if (isAllowed) {
						const slug = fieldToCategoryMap[field as keyof typeof fieldToCategoryMap]
						if (slug) {
							const cat = allCategories.find((c: any) => c.slug === slug)
							if (cat) allowed.push({ id: cat.id, name: cat.name })
						}
					}
				})
				setAssignedCategories(allowed)
			} catch {
				setAssignedCategories([])
			}
		}
		fetchAssignedCategories()
	}, [writer])

	useEffect(() => {
		if (authLoading) return
		if (!isAuthenticated) {
			window.location.replace('/writer/login')
			return
		}
	}, [authLoading, isAuthenticated])

	useEffect(() => {
		const fetchArticlesForWriter = async () => {
			if (!isAuthenticated) return
			setLoading(true)
			setError(null)
			try {
				const res = await fetch('/api/writer/articles', { credentials: 'include' })
				if (!res.ok) {
					throw new Error('Failed to load articles')
				}
				const json = await res.json()
				setArticles(json.data || [])
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
	}, [isAuthenticated])

	const totalCount = articles.length
	const deriveStatus = (p: Post): 'published' | 'pending' | 'reverted' => {
		const isVerified = !!p.verified
		const isPublished = !!p.published_at
		if (isVerified && isPublished) return 'published'
		if (isVerified && !isPublished) return 'reverted'
		return 'pending'
	}
	const publishedCount = articles.filter(p => deriveStatus(p) === 'published').length
	const pendingCount = articles.filter(p => deriveStatus(p) === 'pending').length
	const revertedCount = articles.filter(p => deriveStatus(p) === 'reverted').length

	const visibleArticles = React.useMemo(() => {
		if (writerStatusFilter === 'All') return articles
		return articles.filter((p) => {
			const s = deriveStatus(p)
			if (writerStatusFilter === 'Published') return s === 'published'
			if (writerStatusFilter === 'Pending') return s === 'pending'
			if (writerStatusFilter === 'Reverted') return s === 'reverted'
			return true
		})
	}, [articles, writerStatusFilter])

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
		try {
			const res = await fetch('/api/writer/articles', { credentials: 'include' })
			if (res.ok) {
				const json = await res.json()
				setArticles(json.data || [])
				}
			} catch (e) {
				console.error('Error refreshing articles:', e)
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
								{assignedCategories.length > 0 && (
									<div className="mt-2 flex flex-wrap gap-2">
										<span className="text-sm text-gray-500 mr-2">Assigned Categories:</span>
										{assignedCategories.map(cat => (
											<Badge key={cat.id} variant="secondary" className="bg-blue-50 text-blue-700 border border-blue-200">{cat.name}</Badge>
										))}
									</div>
								)}
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

				{/* Top status chips removed as requested */}

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

				{/* Section: Status tabs in spacer area */}
				<div className="bg-white/60 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-sm mb-6">
					<Tabs value={writerStatusFilter as any} onValueChange={(v) => setWriterStatusFilter(v as any)} className="w-full">
						<TabsList className="grid w-full grid-cols-4 bg-gray-100/60 p-1 rounded-xl">
							<TabsTrigger value="All" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">All ({totalCount})</TabsTrigger>
							<TabsTrigger value="Pending" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">Pending ({pendingCount})</TabsTrigger>
							<TabsTrigger value="Published" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">Published ({publishedCount})</TabsTrigger>
							<TabsTrigger value="Reverted" className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm">Reverted ({revertedCount})</TabsTrigger>
						</TabsList>
					</Tabs>
					</div>

				{/* Main Content */}
				<Tabs defaultValue="articles" className="w-full">
					<div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-lg overflow-hidden">

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
								) : visibleArticles.length === 0 ? (
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
										{visibleArticles.map((post: any) => (
											<div key={post.id} className="group bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-4 hover:bg-white transition-all duration-200 hover:shadow-lg">
												<div className="flex gap-4">
													{/* Thumbnail */}
													<div className="relative w-28 h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
														{(post.image_url || post.featured_image) ? (
															<Image src={(post.image_url || post.featured_image) as string} alt={post.title} fill className="object-cover" />
														) : (
															<div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">No Image</div>
														)}
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0">
														<div className="flex items-center gap-3 mb-1">
															<h3 className="font-semibold text-gray-900 text-base truncate">{post.title}</h3>
															<Badge variant={getStatusVariant(deriveStatus(post))} className="shadow-sm">{formatStatus(deriveStatus(post))}</Badge>
														</div>
														{post.excerpt && (
															<p className="text-sm text-gray-600 line-clamp-2 mb-2">{post.excerpt}</p>
														)}

														{/* Meta row */}
														<div className="flex items-center justify-between text-xs text-gray-600">
															<div className="flex items-center gap-4">
																<span className="flex items-center gap-1"><Clock className="h-4 w-4" />{formatTimeAgo(post.created_at)}</span>
																<span className="flex items-center gap-1"><Eye className="h-4 w-4" />{typeof post.views === 'number' ? (post.views?.toLocaleString?.() || post.views) : 0}</span>
															</div>
															<div className="flex items-center gap-1">
																<Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-blue-600"><Share2 className="h-4 w-4" /></Button>
																<Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-pink-600"><Bookmark className="h-4 w-4" /></Button>
															</div>
														</div>

														{/* Actions row */}
														<div className="mt-3 flex items-center gap-3">
															{deriveStatus(post) === 'published' ? (
																<Button variant="outline" asChild className="w-full sm:w-auto">
																	<a href={`/posts/${post.slug || post.id}`} target="_blank" rel="noreferrer">Read</a>
																</Button>
															) : (
																<span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-2 py-1">In review</span>
															)}
															<Button variant="ghost" size="sm">Edit</Button>
														</div>
													</div>
												</div>

												{/* Context tip */}
												{deriveStatus(post) === 'pending' && (
													<div className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">Awaiting admin review. You’ll be notified once it’s approved.</div>
												)}
												{deriveStatus(post) === 'reverted' && (
													<div className="mt-3 text-xs text-purple-700 bg-purple-50 border border-purple-200 rounded-lg px-3 py-2">Returned for updates. Edit and resubmit to publish again.</div>
												)}
											</div>
										))}
									</div>
								)}
							</div>
						</TabsContent>

						{/* Bottom status summary */}
						<div className="border-t border-gray-200/50 bg-white/70 backdrop-blur-sm px-6 py-4">
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-sm text-gray-500 mr-2">Summary:</span>
								<span className="px-3 py-1.5 rounded-full text-xs bg-gray-100 text-gray-800 border border-gray-200">All ({totalCount})</span>
								<span className="px-3 py-1.5 rounded-full text-xs bg-amber-50 text-amber-800 border border-amber-200">Pending ({pendingCount})</span>
								<span className="px-3 py-1.5 rounded-full text-xs bg-emerald-50 text-emerald-800 border border-emerald-200">Published ({publishedCount})</span>
								<span className="px-3 py-1.5 rounded-full text-xs bg-purple-50 text-purple-800 border border-purple-200">Reverted ({revertedCount})</span>
								</div>
							</div>
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

function formatTimeAgo(dateString?: string) {
    if (!dateString) return 'Not set'
    const now = new Date().getTime()
    const then = new Date(dateString).getTime()
    const diffMins = Math.max(0, Math.floor((now - then) / (1000 * 60)))
    if (diffMins < 60) return `${diffMins}m ago`
    const hours = Math.floor(diffMins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
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
		case 'reverted':
			return `${base} bg-rose-50 text-rose-700 border border-rose-100`
		default:
			return `${base} bg-gray-100 text-gray-700`
	}
}


