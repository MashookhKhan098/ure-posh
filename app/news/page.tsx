"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NewsletterSubscription from "../../components/NewsletterSubscription"
import { 
  Newspaper, 
  Calendar, 
  User, 
  Tag, 
  ArrowRight, 
  TrendingUp, 
  Shield, 
  Users, 
  Award, 
  BookOpen, 
  MessageCircle,
  Clock,
  Eye,
  Share2,
  Heart,
  Loader2
} from "lucide-react"
import Link from "next/link"

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  status: string;
  created_at: string;
  view_count: number;
  read_time: number;
  featured_image?: string;
  slug: string;
}

// Tiny shimmer placeholder for fast perceived loading
function shimmer(w: number, h: number) {
  return `
    <svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#e5e7eb" offset="20%" />
          <stop stop-color="#f3f4f6" offset="50%" />
          <stop stop-color="#e5e7eb" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#e5e7eb" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`
}
const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

// Category-based local fallbacks (office safety & POSH-related)
const categoryFallbacks: Record<string, string> = {
  "Workplace Safety": "/uploads/saftey-1753376435016.jpg",
  "POSH Policy": "/uploads/women-s-safety-is-everyone-s-responsibility-1753376275735.jpg",
  "Healthcare": "/uploads/he2o-1753381041380.jpg",
  "Manufacturing": "/uploads/main-1753381366493.jpg",
  "Technology": "/uploads/qwertyu-1753382685301.jpg",
  "Finance": "/uploads/asdfgh-1753382565789.jpg",
}
const genericFallbacks = [
  "/uploads/saftey-1753376499204.jpg",
  "/uploads/women-s-safety-is-not-an-option-it-s-a-right-1751536610962.jpg",
  "/uploads/1751349696275-Group 3.png",
]

function getImageForPost(post: Post, idx: number): string {
  if (post.featured_image && post.featured_image.trim().length > 0) return post.featured_image
  const byCategory = categoryFallbacks[post.category]
  if (byCategory) return byCategory
  return genericFallbacks[idx % genericFallbacks.length]
}

// Build ordered candidate list for resilient image loading
function getCandidateSources(post: Post, idx: number): string[] {
  const candidates: string[] = []
  if (post.featured_image && post.featured_image.trim().length > 0) {
    candidates.push(post.featured_image)
  }
  const cat = categoryFallbacks[post.category]
  if (cat) candidates.push(cat)
  // Add all generics in a rotated order so cards spread different fallbacks
  const rotated = [...genericFallbacks.slice(idx % genericFallbacks.length), ...genericFallbacks.slice(0, idx % genericFallbacks.length)]
  candidates.push(...rotated)
  // De-duplicate while preserving order
  return Array.from(new Set(candidates))
}

function SmartPostImage({
  post,
  idx,
  alt,
  priority,
  shimmerW,
  shimmerH,
  sizes,
  className,
}: {
  post: Post;
  idx: number;
  alt: string;
  priority?: boolean;
  shimmerW: number;
  shimmerH: number;
  sizes: string;
  className?: string;
}) {
  const sources = getCandidateSources(post, idx)
  const [srcIndex, setSrcIndex] = React.useState(0)

  return (
    <Image
      src={sources[srcIndex]}
      alt={alt}
      fill
      priority={!!priority}
      loading={priority ? undefined : "lazy"}
      sizes={sizes}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(shimmerW, shimmerH))}`}
      className={className}
      onError={() => {
        // Try next fallback if available
        setSrcIndex((i) => (i + 1 < sources.length ? i + 1 : i))
      }}
    />
  )
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Newsletter subscription state
  const [newsletterLoading, setNewsletterLoading] = useState(false)
  const [newsletterMessage, setNewsletterMessage] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error' | 'exists'>('idle')

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/posts');
      
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        setError('Failed to fetch posts');
      }
    } catch (error) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Display-only placeholders: no DB writes

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  };

  // Filter published posts
  const publishedPosts = posts.filter(post => post.status === 'published');
  
  // Get featured posts (first 3 published posts)
  const featuredPosts = publishedPosts.slice(0, 3);
  
  // Get recent posts (remaining published posts)
  const recentPosts = publishedPosts.slice(3);

  const industryInsights = [
    {
      title: "Healthcare Sector",
      articles: publishedPosts.filter(p => p.category === 'Healthcare').length,
      trend: "+15%",
      description: "Latest insights on healthcare workplace safety and compliance"
    },
    {
      title: "Technology Industry",
      articles: publishedPosts.filter(p => p.category === 'Technology').length,
      trend: "+25%",
      description: "Innovation in workplace safety for tech companies"
    },
    {
      title: "Manufacturing",
      articles: publishedPosts.filter(p => p.category === 'Manufacturing').length,
      trend: "+8%",
      description: "Safety protocols and compliance in manufacturing"
    },
    {
      title: "Financial Services",
      articles: publishedPosts.filter(p => p.category === 'Finance').length,
      trend: "+12%",
      description: "Compliance and workplace safety in finance"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/30 to-zinc-50/40 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gray-600" />
          <p className="text-gray-600">Loading posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/30 to-zinc-50/40 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={fetchPosts} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/30 to-zinc-50/40">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50 mb-6">
              <Newspaper className="w-5 h-5 mr-2" />
              News Room
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Latest <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Posts</span> & Updates
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay informed with the latest posts, insights, and updates from our community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
                <TrendingUp className="w-5 h-5 mr-2" />
                Featured Posts
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900">
                Top <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Stories</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our most popular and impactful posts from the community.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8"
            >
              {featuredPosts.map((post, index) => {
                return (
                  <motion.div key={post.id} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                    <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative h-48 overflow-hidden">
                        <SmartPostImage
                          post={post}
                          idx={index}
                          alt={`${post.category} - ${post.title}`}
                          priority={index === 0}
                          shimmerW={700}
                          shimmerH={300}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-white/90 text-gray-700 font-semibold">
                            {post.category}
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-yellow-500 text-white font-semibold">
                            Featured
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {formatDate(post.created_at)}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {getReadTime(post.content)}
                          </div>
                        </div>
                        <CardTitle className="text-xl text-black line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 150) + '...'}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              {post.view_count || 0}
                            </div>
                          </div>
                        </div>
                        <Link href={`/posts/${post.slug}`}>
                          <Button
                            variant="outline"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Industry Insights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
              <Shield className="w-5 h-5 mr-2" />
              Industry Insights
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Sector-Specific <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Updates</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Stay updated with industry-specific posts and workplace safety trends.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {industryInsights.map((insight, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }}>
                <Card className="text-center border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-lg text-black">{insight.title}</CardTitle>
                    <CardDescription className="text-gray-600">{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-2xl font-bold text-slate-900">{insight.articles}</span>
                      <span className="text-green-600 font-semibold">{insight.trend}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Posts this month</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
                <MessageCircle className="w-5 h-5 mr-2" />
                Latest Posts
              </Badge>
              <h2 className="text-4xl font-bold text-slate-900">
                Recent <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Publications</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Fresh insights and expert perspectives from our community.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {recentPosts.map((post, index) => {
                return (
                  <motion.div key={post.id} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                    <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                      <div className="relative h-40 overflow-hidden">
                        <SmartPostImage
                          post={post}
                          idx={index}
                          alt={`${post.category} - ${post.title}`}
                          shimmerW={700}
                          shimmerH={250}
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          className="object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-700 font-semibold text-xs">
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.created_at)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getReadTime(post.content)}
                          </div>
                        </div>
                        <CardTitle className="text-lg text-black line-clamp-2 group-hover:text-gray-700 transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-3 text-sm">
                          {post.excerpt || post.content.substring(0, 120) + '...'}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye className="w-3 h-3" />
                            {post.view_count || 0}
                          </div>
                        </div>
                        <Link href={`/posts/${post.slug}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                          >
                            Read More
                            <ArrowRight className="ml-2 h-3 w-3" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
              <Newspaper className="w-5 h-5 mr-2" />
              Stay Updated
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Subscribe to Our <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Newsletter</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
            }} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
              <input
                name="email"
                type="email"
                required
                disabled={newsletterLoading}
                placeholder="ankit200211222@gmail.com"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 disabled:opacity-50"
              />
              <Button 
                type="submit"
                disabled={newsletterLoading}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[120px] disabled:opacity-50"
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
              <div className={`text-sm p-4 rounded-lg mt-6 border max-w-md mx-auto ${
                newsletterStatus === 'success' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : newsletterStatus === 'exists'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : newsletterStatus === 'error'
                  ? 'bg-red-50 text-red-700 border-red-200'
                  : ''
              }`}>
                <div className="text-center font-medium">
                  {newsletterMessage}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
} 