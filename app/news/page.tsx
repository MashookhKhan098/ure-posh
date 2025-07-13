"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Newspaper, Calendar, User, Tag, ArrowRight } from "lucide-react"

export default function NewsPage() {
  const newsArticles = [
    {
      title: "New POSH Guidelines Released by Ministry of Labour",
      excerpt: "The Ministry of Labour and Employment has released updated guidelines for POSH compliance, emphasizing the importance of workplace safety and inclusion.",
      author: "Ureposh Team",
      date: "2024-01-15",
      category: "Legal Updates",
      tags: ["POSH Guidelines", "Legal Compliance", "Ministry Updates"],
      readTime: 5,
    },
    {
      title: "Ureposh Achieves 99.2% Compliance Success Rate",
      excerpt: "Our comprehensive approach to workplace safety has resulted in exceptional compliance rates across all client organizations.",
      author: "Priya Sharma",
      date: "2024-01-10",
      category: "Company News",
      tags: ["Success Rate", "Compliance", "Achievement"],
      readTime: 3,
    },
    {
      title: "Digital Transformation in POSH Training",
      excerpt: "How technology is revolutionizing workplace safety training and making compliance more accessible than ever before.",
      author: "Rajesh Kumar",
      date: "2024-01-08",
      category: "Technology",
      tags: ["Digital Training", "Technology", "Innovation"],
      readTime: 7,
    },
    {
      title: "Building Inclusive Workplaces: A Comprehensive Guide",
      excerpt: "Our latest guide provides practical steps for organizations to create truly inclusive and safe work environments.",
      author: "Dr. Anjali Mehta",
      date: "2024-01-05",
      category: "Resources",
      tags: ["Inclusion", "Workplace Safety", "Guide"],
      readTime: 8,
    },
    {
      title: "Industry Spotlight: Healthcare Sector Compliance",
      excerpt: "Special focus on the unique challenges and solutions for POSH compliance in healthcare organizations.",
      author: "Ureposh Team",
      date: "2024-01-03",
      category: "Industry Focus",
      tags: ["Healthcare", "Industry", "Compliance"],
      readTime: 6,
    },
    {
      title: "Annual POSH Compliance Report 2023",
      excerpt: "Comprehensive analysis of workplace safety trends and compliance patterns across Indian organizations.",
      author: "Ureposh Research",
      date: "2024-01-01",
      category: "Research",
      tags: ["Annual Report", "Research", "Trends"],
      readTime: 10,
    },
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
              Latest News
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Stay <span className="text-black">Informed</span> About Workplace Safety
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get the latest updates on POSH compliance, workplace safety trends, 
              and insights from our expert team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {newsArticles.map((article, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {article.category}
                      </Badge>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(article.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-900 mb-3 line-clamp-2">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 leading-relaxed mb-4">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <span>{article.readTime} min read</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Button variant="ghost" className="w-full mt-4 hover:bg-gray-50">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
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
              Subscribe to Our <span className="text-slate-900">Newsletter</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get the latest insights on workplace safety, compliance updates, and expert tips 
              delivered directly to your inbox.
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
          </motion.div>
        </div>
      </section>
    </div>
  )
} 