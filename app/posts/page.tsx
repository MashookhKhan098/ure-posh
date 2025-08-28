"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import NewsletterSubscription from "../../components/NewsletterSubscription"
import {
  Clock,
  Eye,
  Search,
  Bell,
  User,
  Share2,
  Bookmark,
  Flame,
  Zap,
  Play,
  Calendar,
  MapPin,
  Globe,
  Cpu,
  Briefcase,
  Heart,
  Atom,
  Star,
  Activity,
  X,
  Grid3X3,
  Users,
  Radio,
  Loader2,
  TrendingUp,
  Newspaper,
  ArrowLeft,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useArticles, useCategories } from "../../hooks/useArticles"
import { Article, Category } from "../../types/database"

function formatTimeAgo(dateString: string): string {
  const now = new Date()
  const publishedDate = new Date(dateString)
  const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60))

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m ago`
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h ago`
  } else {
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }
}

function ArticleCard({ article, featured = false, compact = false }: { article: Article; featured?: boolean; compact?: boolean }) {
  if (compact) {
    return (
             <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 shadow-sm bg-white">
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
                                      <div className="relative w-24 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-pink-200 to-pink-300">
               <Image
                 src={article.image_url && article.image_url.trim().length > 0 ? article.image_url : "/placeholder.jpg"}
                 alt={article.title}
                 width={96}
                 height={80}
                 className="w-full h-full object-cover"
                 onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg" }}
               />
              {article.is_breaking && (
                <div className="absolute top-1 left-1">
                                   <Badge className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                   BREAKING
                 </Badge>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                                 <Badge 
                   className="text-xs font-medium px-2 py-1 rounded-full" 
                   style={{ 
                     backgroundColor: article.categories?.color || '#EC4899', 
                     color: "white",
                     boxShadow: `0 0 10px ${article.categories?.color || '#EC4899'}40`
                   }}
                 >
                   {article.categories?.name || 'Uncategorized'}
                 </Badge>
                {article.is_hot && (
                                     <div className="flex items-center space-x-1">
                     <Flame className="h-3 w-3 text-pink-500 animate-pulse" />
                     <span className="text-xs text-pink-500 font-medium">HOT</span>
                   </div>
                )}
              </div>
                             <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-pink-600 transition-colors duration-300 mb-3 text-gray-900">
                 {article.title}
               </h3>
              <div className="mt-auto">
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTimeAgo(article.published_at)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{article.views.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-pink-600"><Share2 className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-600 hover:text-pink-600"><Bookmark className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
                <Link href={`/posts/${article.slug}`}>
                  <Button variant="outline" size="sm" className="mt-3 w-full">
                    Read Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
         <Card className={`group h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border-0 shadow-md bg-white overflow-hidden ${featured ? "md:col-span-2" : ""}`}>
      <CardContent className="p-0 h-full flex flex-col">
        <div className="relative">
                                <div className={`relative overflow-hidden ${featured ? "h-80" : "h-48"} bg-gradient-to-br from-pink-200 to-pink-300`}>
             <Image
               src={article.image_url && article.image_url.trim().length > 0 ? article.image_url : "/placeholder.jpg"}
               alt={article.title}
               width={featured ? 800 : 600}
               height={featured ? 320 : 192}
               className="w-full h-full object-cover"
               onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/placeholder.jpg" }}
             />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            {article.is_breaking && (
              <div className="absolute top-4 left-4">
                                 <Badge className="bg-pink-500 text-white animate-pulse px-3 py-1 rounded-full font-medium">
                   <Zap className="h-3 w-3 mr-1" />
                   BREAKING
                 </Badge>
              </div>
            )}
            {article.is_hot && (
              <div className="absolute top-4 right-4">
                                 <Badge className="bg-pink-400 text-white px-3 py-1 rounded-full font-medium">
                   <Flame className="h-3 w-3 mr-1" />
                   HOT
                 </Badge>
              </div>
            )}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center space-x-2 mb-2">
                                 <Badge 
                   className="text-sm font-medium px-3 py-1 rounded-full" 
                   style={{ 
                     backgroundColor: article.categories?.color || '#EC4899', 
                     color: "white",
                     boxShadow: `0 0 15px ${article.categories?.color || '#EC4899'}60`
                   }}
                 >
                   {article.categories?.name || 'Uncategorized'}
                 </Badge>
                <span className="text-white/80 text-sm">•</span>
                <span className="text-white/80 text-sm">{article.author}</span>
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-1">
                                      <h3 className={`font-bold mb-3 group-hover:text-pink-600 transition-colors duration-300 leading-tight text-gray-900 ${featured ? "text-3xl" : "text-xl"}`}>
               {article.title}
             </h3>
             <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-base">{article.excerpt}</p>
            <div className="mt-auto">
              <div className="flex items-center justify-between">
                             <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatTimeAgo(article.published_at)}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="h-4 w-4" />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                                 <Button variant="ghost" size="sm" className="hover:bg-pink-50 hover:text-pink-600 transition-colors">
                   <Share2 className="h-4 w-4" />
                 </Button>
                 <Button variant="ghost" size="sm" className="hover:bg-pink-50 hover:text-pink-600 transition-colors">
                   <Bookmark className="h-4 w-4" />
                 </Button>
              </div>
              </div>
              <Link href={`/posts/${article.slug}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-pink-50 hover:text-pink-600 transition-colors mt-3 w-full sm:w-auto"
                >
                  Read Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </CardContent>
    </Card>
  )
}

export default function PostsPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  
  // Newsletter subscription state
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error' | 'exists'>('idle')
  
  const selectedCategory = activeCategory !== "all" ? activeCategory : undefined
  
  // Fetch data from database (scoped by selected category when applicable)
  const { articles: latestNews, loading: latestLoading, error: latestError } = useArticles({
    category: selectedCategory,
    sortBy: 'created_at',
    sortOrder: 'desc',
  })
  
  const { articles: featuredNews, loading: featuredLoading } = useArticles({
    category: selectedCategory,
    featured: true,
    limit: 6,
    sortBy: 'published_at',
    sortOrder: 'desc',
  })
  
  const { articles: breakingNews, loading: breakingLoading } = useArticles({
    category: selectedCategory,
    breaking: true,
    limit: 3,
    sortBy: 'created_at',
    sortOrder: 'desc',
  })
  
  const { articles: hotTopics, loading: hotLoading } = useArticles({
    category: selectedCategory,
    hot: true,
    limit: 5,
    sortBy: 'views',
    sortOrder: 'desc',
  })
  
  const { articles: trendingNews, loading: trendingLoading } = useArticles({
    category: selectedCategory,
    hot: true,
    limit: 6,
    sortBy: 'views',
    sortOrder: 'desc',
  })
  
  const { articles: editorsPicks, loading: editorsLoading } = useArticles({
    category: selectedCategory,
    featured: true,
    limit: 6,
    sortBy: 'published_at',
    sortOrder: 'desc',
  })
  
  const { articles: mostPopular, loading: popularLoading } = useArticles({
    category: selectedCategory,
    limit: 6,
    sortBy: 'views',
    sortOrder: 'desc',
  })
  
  const { categories, loading: categoriesLoading } = useCategories()

  // Latest news list (already scoped by selected category)
  const filteredNews = latestNews

  // Loading state
  const isLoading = latestLoading || breakingLoading || hotLoading || categoriesLoading

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-pink-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading News</h2>
          <p className="text-gray-600">Please wait while we fetch the latest stories...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (latestError) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading News</h2>
          <p className="text-gray-600">{latestError}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
             {/* Breaking News Banner */}
       {breakingNews.length > 0 && (
         <div className="bg-gradient-to-r from-pink-600 via-pink-700 to-pink-800 text-white py-4 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 animate-pulse" />
                  <span className="font-bold text-lg">BREAKING NEWS</span>
                </div>
                <div className="hidden md:flex space-x-6">
                  {breakingNews.map((article, index) => (
                                         <span key={article.id} className="text-sm font-medium hover:text-pink-200 transition-colors cursor-pointer">
                       {article.title}
                       {index < breakingNews.length - 1 && <span className="mx-3 text-pink-300">•</span>}
                     </span>
                  ))}
                </div>
              </div>
                             <Button variant="ghost" size="sm" className="text-white hover:bg-pink-700/50">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

             {/* Category Navigation */}
       <div className="bg-white border-b border-pink-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
              News & Updates
            </h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
             <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Selector - Always Visible Above Content */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-pink-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                Select Category
              </h2>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={activeCategory === "all" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveCategory("all")}
                className="hover:bg-pink-50 transition-colors text-black text-xs px-3 py-1.5 relative group"
                style={{
                  backgroundColor: activeCategory === "all" ? "#EC4899" : undefined,
                  color: activeCategory === "all" ? "white" : "black",
                }}
              >
                <Grid3X3 className="h-3 w-3 mr-1" />
                All
                
                {/* Tooltip for All - only on hover, not when active */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                  All News
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                </div>
              </Button>
              
              {categories.map((category) => {
                // Create shorter names for categories
                const shortName = category.name
                  .replace("Compliance & Legal Insights (Blog Section)", "Legal")
                  .replace("Events & Webinars", "Events")
                  .replace("International Regulatory & Policy Watch", "Policy")
                  .replace("News & Media Coverage", "Media")
                  .replace("Newsletter Archive", "Archive")
                  .replace("Thought Leadership", "Leadership")
                  .replace("United Kingdom Workplace", "UK")
                  .replace("US Work Place", "US")
                  .replace("Workplace Stories", "Stories")
                  .replace("Company Updates", "Updates")
                
                const isActive = activeCategory === category.slug
                
                return (
                  <div key={category.id} className="relative group">
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setActiveCategory(category.slug)}
                      className="hover:bg-pink-50 transition-colors text-black text-xs px-3 py-1.5"
                      style={{
                        backgroundColor: isActive ? category.color : undefined,
                        color: isActive ? "white" : "black",
                      }}
                    >
                      {shortName}
                    </Button>
                    {/* Tooltip - only shows on hover, not when active */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                      {category.name}
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            {/* No Content Banner */}
            {activeCategory !== "all" && filteredNews.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="mb-6">
                    <Button
                      onClick={() => setActiveCategory("all")}
                      variant="outline"
                      size="sm"
                      className="mb-8 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-300 transition-all duration-300"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to All News
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-8 border border-pink-200">
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-200 to-pink-300 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Newspaper className="h-10 w-10 text-pink-600" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No Content Yet
                    </h3>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      We haven't published any articles in the "{categories.find(c => c.slug === activeCategory)?.name || activeCategory}" category yet. 
                      Check back soon or explore other categories for more content.
                    </p>
                    
                    <div className="space-y-3">
                      <Button
                        onClick={() => setActiveCategory("all")}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300"
                      >
                        <Grid3X3 className="h-4 w-4 mr-2" />
                        Browse All Categories
                      </Button>
                      
                      <p className="text-sm text-gray-500">
                        or select a different category from the navigation above
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Stories */}
            {filteredNews.length > 0 && (
                         <div className="mb-16">
                           <div className="flex items-center space-x-3 mb-6">
               <div className="w-1 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                   {activeCategory === "all"
                     ? "Featured Stories"
                     : `${categories.find((c) => c.slug === activeCategory)?.name || "Featured"} Stories`}
                 </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  {filteredNews[0] && <ArticleCard article={filteredNews[0]} featured />}
                </div>
                <div className="space-y-4">
                  {filteredNews
                    .slice(1, 4)
                    .map((article) => article && <ArticleCard key={article.id} article={article} compact />)}
                </div>
              </div>
            </div>
            )}

             {/* Latest Updates */}
             {filteredNews.length > 0 && (
             <div className="border-t border-pink-200 pt-8">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                 <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                   Latest Updates
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                 {filteredNews
                   .map((article) => article && <ArticleCard key={article.id} article={article} />)}
               </div>
             </div>
             )}

             {/* Trending Now */}
             {trendingNews.length > 0 && (
             <div className="border-t border-pink-200 pt-8 mt-16">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                 <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                   Trending Now
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {trendingNews.map((article) => (
                   <ArticleCard key={article.id} article={article} />
                 ))}
               </div>
             </div>
             )}

             {/* Editor's Picks */}
             {editorsPicks.length > 0 && (
             <div className="border-t border-pink-200 pt-8 mt-16">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                 <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                   Editor's Picks
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {editorsPicks.map((article) => (
                   <ArticleCard key={article.id} article={article} />
                 ))}
               </div>
             </div>
             )}

             {/* Most Popular */}
             {mostPopular.length > 0 && (
             <div className="border-t border-pink-200 pt-8 mt-16">
               <div className="flex items-center space-x-3 mb-6">
                 <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                 <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent tracking-tight">
                   Most Popular
                 </h2>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {mostPopular.map((article) => (
                   <ArticleCard key={article.id} article={article} />
                 ))}
               </div>
             </div>
             )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6 sticky top-32">
                             {/* Hot Topics */}
               <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                                     <div className="flex items-center space-x-2">
                     <TrendingUp className="h-5 w-5 text-pink-500" />
                     <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Hot Topics</h3>
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {hotTopics.map((article, index) => (
                    <div key={article.id} className="group cursor-pointer p-3 rounded-lg hover:bg-pink-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <div className="text-2xl font-bold text-gray-400 group-hover:text-pink-500 transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                                                     <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-pink-600 transition-colors leading-tight text-gray-900">
                             {article.title}
                           </h4>
                          <div className="flex items-center space-x-2 mt-2 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            <span>{formatTimeAgo(article.published_at)}</span>
                            <Eye className="h-3 w-3" />
                            <span>{article.views.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

                             {/* Newsletter Signup */}
               <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="pb-4">
                                     <div className="flex items-center space-x-2">
                     <Bell className="h-5 w-5 text-pink-500" />
                     <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Stay Updated</h3>
                   </div>
                </CardHeader>
                <CardContent className="space-y-4">
                                     <p className="text-sm text-gray-600 leading-relaxed font-medium">
                     Get the latest news and updates delivered directly to your inbox. Never miss important stories.
                   </p>
                                     <form onSubmit={async (e) => {
                     e.preventDefault();
                     const formData = new FormData(e.target as HTMLFormElement);
                     const email = formData.get('email') as string;
                     
                     setNewsletterLoading(true);
                     setNewsletterMessage("");
                     setNewsletterStatus('idle');
                     
                     try {
                       const response = await fetch('/api/newsletter', {
                         method: 'POST',
                         headers: { 'Content-Type': 'application/json' },
                         body: JSON.stringify({ email }),
                       });
                       
                       const data = await response.json();
                       if (response.ok) {
                         if (data.alreadySubscribed) {
                           setNewsletterStatus('exists');
                           setNewsletterMessage('You are already a member! 🎉');
                         } else {
                           setNewsletterStatus('success');
                           setNewsletterMessage('Successfully subscribed! Check your email for confirmation. ✅');
                           (e.target as HTMLFormElement).reset();
                         }
                       } else {
                         setNewsletterStatus('error');
                         setNewsletterMessage(data.error || 'Failed to subscribe. Please try again.');
                       }
                     } catch (error) {
                       setNewsletterStatus('error');
                       setNewsletterMessage('Network error. Please try again.');
                     } finally {
                       setNewsletterLoading(false);
                     }
                   }} className="flex gap-2">
                     <Input 
                       name="email"
                       type="email"
                       required
                       disabled={newsletterLoading}
                       placeholder="ankit200211222@gmail.com" 
                       className="bg-white/50 border-gray-200 focus:border-pink-500 flex-1"
                     />
                     <Button 
                       type="submit"
                       disabled={newsletterLoading}
                       className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 transition-all duration-300 shadow-lg min-w-[100px]"
                     >
                       {newsletterLoading ? (
                         <Loader2 className="h-4 w-4 animate-spin" />
                       ) : (
                         'Subscribe'
                       )}
                     </Button>
                   </form>
                   
                   {/* Status Message */}
                   {newsletterMessage && (
                     <div className={`text-sm p-3 rounded-md border ${
                       newsletterStatus === 'success' 
                         ? 'bg-green-50 text-green-700 border-green-200' 
                         : newsletterStatus === 'exists'
                         ? 'bg-blue-50 text-blue-700 border-blue-200'
                         : newsletterStatus === 'error'
                         ? 'bg-red-50 text-red-700 border-red-200'
                         : ''
                     }`}>
                       {newsletterMessage}
                     </div>
                   )}
                </CardContent>
              </Card>

                                            {/* Quick Stats */}
               <Card className="border-0 shadow-lg bg-white">
                 <CardHeader className="pb-4">
                   <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Today's Stats</h3>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                     <div className="flex items-center space-x-2">
                       <Eye className="h-4 w-4 text-pink-500" />
                       <span className="text-sm font-semibold text-gray-900">Total Views</span>
                     </div>
                     <span className="text-lg font-bold text-pink-600">89.2K</span>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                     <div className="flex items-center space-x-2">
                       <Newspaper className="h-4 w-4 text-pink-500" />
                       <span className="text-sm font-semibold text-gray-900">Articles</span>
                     </div>
                     <span className="text-lg font-bold text-pink-600">156</span>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-pink-50 rounded-lg">
                     <div className="flex items-center space-x-2">
                       <Flame className="h-4 w-4 text-pink-500" />
                       <span className="text-sm font-semibold text-gray-900">Hot Stories</span>
                     </div>
                     <span className="text-lg font-bold text-pink-600">23</span>
                   </div>
                 </CardContent>
               </Card>

               {/* Breaking News Alert */}
               <Card className="border-0 shadow-lg bg-gradient-to-br from-pink-500 to-pink-600">
                 <CardHeader className="pb-4">
                   <div className="flex items-center space-x-2">
                     <Zap className="h-5 w-5 text-white animate-pulse" />
                     <h3 className="text-2xl font-bold text-white tracking-tight">Breaking News</h3>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   {breakingNews.slice(0, 3).map((article) => (
                     <div key={article.id} className="group cursor-pointer p-3 rounded-lg hover:bg-white/10 transition-colors">
                       <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-pink-200 transition-colors leading-tight text-white">
                         {article.title}
                       </h4>
                       <div className="flex items-center space-x-2 mt-2 text-xs text-pink-200">
                         <Clock className="h-3 w-3" />
                         <span>{formatTimeAgo(article.published_at)}</span>
                       </div>
                     </div>
                   ))}
                 </CardContent>
               </Card>

               {/* Top Categories */}
               <Card className="border-0 shadow-lg bg-white">
                 <CardHeader className="pb-4">
                   <div className="flex items-center space-x-2">
                     <Grid3X3 className="h-5 w-5 text-pink-500" />
                     <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Top Categories</h3>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-3">
                   {categories.slice(0, 6).map((category) => (
                     <div key={category.id} className="group cursor-pointer p-3 rounded-lg hover:bg-pink-50 transition-colors">
                       <div className="flex items-center justify-between">
                         <span className="font-semibold text-sm text-gray-900 group-hover:text-pink-600 transition-colors">
                           {category.name}
                         </span>
                         <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                       </div>
                     </div>
                   ))}
                 </CardContent>
               </Card>

               {/* Follow Us */}
               <Card className="border-0 shadow-lg bg-gradient-to-br from-gray-900 to-gray-800">
                 <CardHeader className="pb-4">
                   <div className="flex items-center space-x-2">
                     <Users className="h-5 w-5 text-pink-400" />
                     <h3 className="text-2xl font-bold text-white tracking-tight">Follow Us</h3>
                   </div>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <p className="text-sm text-gray-300 leading-relaxed">
                     Stay connected with us on social media for the latest updates and exclusive content.
                   </p>
                   <div className="grid grid-cols-2 gap-3">
                     <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                       <span className="text-sm font-medium">Twitter</span>
                     </Button>
                     <Button className="w-full bg-blue-800 hover:bg-blue-900 text-white transition-colors">
                       <span className="text-sm font-medium">Facebook</span>
                     </Button>
                     <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white transition-colors">
                       <span className="text-sm font-medium">Instagram</span>
                     </Button>
                     <Button className="w-full bg-red-600 hover:bg-red-700 text-white transition-colors">
                       <span className="text-sm font-medium">YouTube</span>
                     </Button>
                   </div>
                 </CardContent>
               </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
