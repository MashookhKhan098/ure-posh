"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Award, CheckCircle, Users, Target, Sparkles } from "lucide-react"

export default function WorkPage() {
  const caseStudies = [
    {
      title: "TechVision Solutions",
      industry: "Technology & Software",
      challenge: "High attrition due to workplace culture issues",
      solution: "Comprehensive POSH training and culture transformation program",
      results: ["40% increase in employee satisfaction", "Zero harassment complaints in 12 months", "Improved retention rates"],
      image: "/images/2.jpg",
    },
    {
      title: "Global Manufacturing Corp",
      industry: "Manufacturing & Engineering",
      challenge: "Language barriers and cultural diversity across multiple locations",
      solution: "Multi-language POSH training and localized awareness programs",
      results: ["95% workforce participation", "15+ languages supported", "Enhanced safety culture"],
      image: "/images/3.jpg",
    },
    {
      title: "HealthTech Innovations",
      industry: "Healthcare Technology",
      challenge: "Building inclusive culture in fast-growing startup environment",
      solution: "Startup-focused POSH implementation and leadership training",
      results: ["Scalable compliance framework", "Leadership buy-in achieved", "Sustainable growth enabled"],
      image: "/images/4.jpg",
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
              <Briefcase className="w-5 h-5 mr-2" />
              Our Work
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Transforming <span className="text-black">Workplaces</span> Across India
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover how we've helped organizations create safer, more inclusive environments 
              through our comprehensive POSH solutions and expert guidance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
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
              <Award className="w-5 h-5 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Real <span className="text-slate-900">Impact</span> Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              See how our solutions have transformed organizations across diverse industries, 
              creating lasting positive change in workplace culture and compliance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-12"
          >
            {caseStudies.map((study, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <div className="flex items-center space-x-4 mb-6">
                          <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Briefcase className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-slate-900">{study.title}</h3>
                            <p className="text-slate-600 font-medium">{study.industry}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Challenge</h4>
                            <p className="text-slate-600">{study.challenge}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-2">Solution</h4>
                            <p className="text-slate-600">{study.solution}</p>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-slate-900 mb-3">Results</h4>
                            <div className="space-y-2">
                              {study.results.map((result, idx) => (
                                <div key={idx} className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                  <span className="text-sm text-slate-600">{result}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-100 to-slate-100 rounded-2xl p-8">
                        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-slate-200 rounded-xl flex items-center justify-center mb-4">
                          <Briefcase className="h-16 w-16 text-gray-400" />
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary" className="bg-white text-gray-700 mb-2">
                            Case Study
                          </Badge>
                          <p className="text-sm text-slate-600">
                            Comprehensive transformation achieved through our expert guidance and proven methodologies.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
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
              <Target className="w-5 h-5 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Measurable <span className="text-slate-900">Results</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              The numbers speak for themselves - our comprehensive approach delivers 
              real, measurable impact across all organizations we serve.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Organizations Transformed", icon: Briefcase },
              { number: "50,000+", label: "Professionals Empowered", icon: Users },
              { number: "99.2%", label: "Compliance Success Rate", icon: CheckCircle },
              { number: "15+", label: "Languages Supported", icon: Sparkles },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full text-center border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-slate-900">{stat.number}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 font-medium">{stat.label}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
} 