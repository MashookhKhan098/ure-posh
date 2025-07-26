"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
  Heart
} from "lucide-react"
import Link from "next/link"

export default function NewsPage() {
  const featuredArticles = [
    {
      id: 1,
      title: "New POSH Guidelines: What Every Organization Needs to Know in 2024",
      excerpt: "The Ministry of Women and Child Development has released updated guidelines for POSH compliance. Learn about the key changes and how they impact your organization.",
      author: "CS Anchal Chopra",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Legal Updates",
      image: "/images/1.jpg",
      views: 1247,
      featured: true
    },
    {
      id: 2,
      title: "Building Inclusive Workplaces: A Comprehensive Guide for HR Leaders",
      excerpt: "Discover proven strategies for creating truly inclusive work environments that go beyond compliance to foster genuine belonging and psychological safety.",
      author: "Dr. Meera Sharma",
      date: "2024-01-12",
      readTime: "8 min read",
      category: "Best Practices",
      image: "/images/2.jpg",
      views: 892,
      featured: true
    },
    {
      id: 3,
      title: "The Future of Workplace Safety: AI-Powered Compliance Solutions",
      excerpt: "Explore how artificial intelligence is revolutionizing workplace safety and compliance, from automated training to predictive risk assessment.",
      author: "Suresh Patel",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Technology",
      image: "/images/3.jpg",
      views: 756,
      featured: true
    }
  ]

  const recentArticles = [
    {
      id: 4,
      title: "Remote Work and POSH Compliance: Challenges and Solutions",
      excerpt: "As remote work becomes the new normal, organizations face unique challenges in maintaining POSH compliance. Here's how to adapt.",
      author: "Adv. Shringarika Tyagi",
      date: "2024-01-08",
      readTime: "4 min read",
      category: "Remote Work",
      image: "/images/4.jpg",
      views: 634
    },
    {
      id: 5,
      title: "Mental Health in the Workplace: Beyond Basic Compliance",
      excerpt: "Understanding the intersection of mental health and workplace safety, and how organizations can create supportive environments.",
      author: "Dr. Meera Sharma",
      date: "2024-01-05",
      readTime: "7 min read",
      category: "Well-being",
      image: "/images/5.jpg",
      views: 521
    },
    {
      id: 6,
      title: "Case Study: How TechCorp Achieved 100% POSH Compliance",
      excerpt: "A detailed look at how one technology company transformed its workplace culture and achieved complete compliance in just 6 months.",
      author: "CA Shweta Gupta",
      date: "2024-01-03",
      readTime: "5 min read",
      category: "Case Study",
      image: "/images/6.jpg",
      views: 445
    },
    {
      id: 7,
      title: "The Role of Leadership in Preventing Workplace Harassment",
      excerpt: "Leadership commitment is crucial for effective POSH implementation. Learn how executives can drive cultural change.",
      author: "CS Anchal Chopra",
      date: "2024-01-01",
      readTime: "6 min read",
      category: "Leadership",
      image: "/images/1.jpg",
      views: 398
    },
    {
      id: 8,
      title: "Digital Transformation of Compliance Training: Success Stories",
      excerpt: "How organizations are leveraging digital platforms to deliver more effective and engaging compliance training programs.",
      author: "Suresh Patel",
      date: "2023-12-28",
      readTime: "4 min read",
      category: "Digital Learning",
      image: "/images/2.jpg",
      views: 367
    },
    {
      id: 9,
      title: "Understanding the Legal Framework: POSH Act Amendments",
      excerpt: "A comprehensive overview of recent amendments to the POSH Act and their implications for organizations.",
      author: "Adv. Pradeep Kumar",
      date: "2023-12-25",
      readTime: "8 min read",
      category: "Legal Updates",
      image: "/images/3.jpg",
      views: 312
    }
  ]

  const industryInsights = [
    {
      title: "Healthcare Sector",
      articles: 12,
      trend: "+15%",
      description: "Latest insights on healthcare workplace safety and compliance"
    },
    {
      title: "Technology Industry",
      articles: 18,
      trend: "+25%",
      description: "Innovation in workplace safety for tech companies"
    },
    {
      title: "Manufacturing",
      articles: 8,
      trend: "+8%",
      description: "Safety protocols and compliance in manufacturing"
    },
    {
      title: "Financial Services",
      articles: 14,
      trend: "+12%",
      description: "Compliance and workplace safety in finance"
    }
  ]

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
              Latest <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Insights</span> & Updates
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Stay informed with the latest news, legal updates, and expert insights on workplace safety, 
              POSH compliance, and organizational culture transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
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
              Featured Articles
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Top <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Stories</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our most popular and impactful articles on workplace safety and compliance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid lg:grid-cols-3 gap-8"
          >
            {featuredArticles.map((article, index) => (
              <motion.div key={article.id} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Newspaper className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-gray-700 font-semibold">
                        {article.category}
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
                        {article.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-xl text-black line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Stay updated with industry-specific compliance news and workplace safety trends.
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
                    <p className="text-sm text-gray-500 mt-2">Articles this month</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Articles Grid */}
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
              Latest Articles
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Recent <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Publications</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Fresh insights and expert perspectives on workplace safety and compliance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {recentArticles.map((article, index) => (
              <motion.div key={article.id} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Newspaper className="h-12 w-12 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white/90 text-gray-700 font-semibold text-xs">
                        {article.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-lg text-black line-clamp-2 group-hover:text-gray-700 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 line-clamp-3 text-sm">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-gray-500" />
                        <span className="text-xs text-gray-600">{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                    >
                      Read More
                      <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

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
              Get the latest insights on workplace safety, compliance updates, and expert tips 
              delivered directly to your inbox every week.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mt-8">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
              />
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                Subscribe
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              Join 5,000+ professionals who trust us for their compliance insights
            </p>
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