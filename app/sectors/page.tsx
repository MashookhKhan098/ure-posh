"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Building, 
  Heart, 
  ShoppingBag, 
  Car, 
  Cpu, 
  Factory, 
  Globe, 
  Zap, 
  Users, 
  Film, 
  Leaf, 
  Wrench,
  ArrowRight,
  CheckCircle,
  Target,
  Sparkles,
  Award
} from "lucide-react"
import Link from "next/link"

export default function SectorsPage() {
  const sectors = [
    {
      name: "Health",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      description: "Comprehensive POSH solutions for healthcare organizations, hospitals, and medical institutions.",
      challenges: ["Patient safety concerns", "24/7 work environments", "Hierarchical structures"],
      solutions: ["Healthcare-specific training", "Patient safety integration", "Shift-based compliance"],
      image: "/images/1.jpg"
    },
    {
      name: "Food & Beverage",
      icon: ShoppingBag,
      color: "from-orange-500 to-yellow-500",
      description: "Specialized compliance for restaurants, food manufacturing, and hospitality sectors.",
      challenges: ["High turnover rates", "Cultural diversity", "Customer-facing roles"],
      solutions: ["Hospitality-focused training", "Multi-language support", "Customer interaction guidelines"],
      image: "/images/2.jpg"
    },
    {
      name: "Financial Services",
      icon: Building,
      color: "from-blue-500 to-indigo-500",
      description: "Expert POSH solutions for banks, insurance companies, and financial institutions.",
      challenges: ["Regulatory compliance", "Client confidentiality", "High-pressure environments"],
      solutions: ["Regulatory alignment", "Confidentiality training", "Stress management programs"],
      image: "/images/3.jpg"
    },
    {
      name: "Government & Public Sector",
      icon: Globe,
      color: "from-green-500 to-teal-500",
      description: "Specialized compliance for government departments and public sector organizations.",
      challenges: ["Public accountability", "Political sensitivity", "Bureaucratic structures"],
      solutions: ["Public sector protocols", "Transparency frameworks", "Accountability training"],
      image: "/images/4.jpg"
    },
    {
      name: "Mobility & Transportation",
      icon: Car,
      color: "from-purple-500 to-violet-500",
      description: "Comprehensive solutions for transportation, logistics, and mobility companies.",
      challenges: ["Remote workforces", "Safety-critical operations", "Diverse locations"],
      solutions: ["Remote training programs", "Safety integration", "Multi-location compliance"],
      image: "/images/5.jpg"
    },
    {
      name: "Technology",
      icon: Cpu,
      color: "from-gray-500 to-slate-600",
      description: "Modern POSH solutions for tech companies, startups, and digital organizations.",
      challenges: ["Fast-paced environments", "Remote work", "Innovation culture"],
      solutions: ["Agile compliance", "Digital training platforms", "Innovation-friendly policies"],
      image: "/images/6.jpg"
    },
    {
      name: "Retail & CPG",
      icon: ShoppingBag,
      color: "from-pink-500 to-rose-500",
      description: "Specialized solutions for retail chains, consumer goods, and e-commerce companies.",
      challenges: ["Customer interactions", "Seasonal workforce", "Multi-location operations"],
      solutions: ["Customer service training", "Seasonal compliance", "Standardized protocols"],
      image: "/images/1.jpg"
    },
    {
      name: "Lifestyle & Leisure",
      icon: Heart,
      color: "from-emerald-500 to-green-500",
      description: "Comprehensive solutions for fitness, wellness, and lifestyle companies.",
      challenges: ["Physical proximity", "Wellness focus", "Client relationships"],
      solutions: ["Wellness integration", "Boundary training", "Client interaction guidelines"],
      image: "/images/2.jpg"
    },
    {
      name: "Media & Entertainment",
      icon: Film,
      color: "from-purple-500 to-indigo-500",
      description: "Specialized compliance for media houses, entertainment companies, and creative agencies.",
      challenges: ["Creative environments", "Celebrity interactions", "Content sensitivity"],
      solutions: ["Creative culture alignment", "Celebrity protocols", "Content guidelines"],
      image: "/images/3.jpg"
    },
    {
      name: "Non-profit",
      icon: Users,
      color: "from-teal-500 to-cyan-500",
      description: "Comprehensive solutions for NGOs, charitable organizations, and social enterprises.",
      challenges: ["Volunteer management", "Limited resources", "Social impact focus"],
      solutions: ["Volunteer training", "Resource optimization", "Impact measurement"],
      image: "/images/4.jpg"
    },
    {
      name: "Energy",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
      description: "Specialized compliance for energy companies, utilities, and renewable energy firms.",
      challenges: ["Safety-critical operations", "Remote locations", "Technical workforce"],
      solutions: ["Safety integration", "Remote compliance", "Technical training"],
      image: "/images/5.jpg"
    },
    {
      name: "Industry & Manufacturing",
      icon: Factory,
      color: "from-gray-600 to-slate-700",
      description: "Comprehensive solutions for manufacturing, industrial, and production companies.",
      challenges: ["Physical work environments", "Shift operations", "Safety protocols"],
      solutions: ["Physical safety integration", "Shift-based training", "Safety compliance"],
      image: "/images/6.jpg"
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50 mb-6">
              <Building className="w-5 h-5 mr-2" />
              Industry Sectors
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Sector-Specific <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">POSH Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Tailored compliance solutions designed for the unique challenges and requirements 
              of different industry sectors across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sectors Grid */}
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
              <Target className="w-5 h-5 mr-2" />
              Our Expertise
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Industry <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Solutions</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From healthcare to technology, we provide specialized POSH solutions that address 
              the unique challenges of each industry sector.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sectors.map((sector, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <sector.icon className="h-16 w-16 text-gray-400" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${sector.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <sector.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-black">{sector.name}</CardTitle>
                    <CardDescription className="text-gray-600">{sector.description}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Key Challenges</h4>
                      <ul className="space-y-1">
                        {sector.challenges.map((challenge, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-600">
                            <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">Our Solutions</h4>
                      <ul className="space-y-1">
                        {sector.solutions.map((solution, idx) => (
                          <li key={idx} className="flex items-start text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent mt-4"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Sector-Specific Matters */}
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
              <Sparkles className="w-5 h-5 mr-2" />
              Why It Matters
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Sector-Specific <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">Approach</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Each industry has unique challenges and requirements. Our sector-specific approach 
              ensures maximum effectiveness and compliance.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Target,
                title: "Tailored Solutions",
                description: "Customized training and policies designed for your specific industry challenges and requirements.",
                color: "from-blue-500 to-indigo-500"
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "Track record of successful implementations across diverse industry sectors in India.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Users,
                title: "Expert Knowledge",
                description: "Deep understanding of sector-specific regulations, challenges, and best practices.",
                color: "from-purple-500 to-violet-500"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }}>
                <Card className="text-center border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-black">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-black">Ready to Transform Your Industry?</h2>
            <p className="text-xl text-gray-600 mt-4">
              Let's discuss how our sector-specific solutions can address your organization's unique challenges.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700 hover:from-gray-700 hover:via-gray-800 hover:to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-6 text-lg font-semibold"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white/80 backdrop-blur-sm px-10 py-6 text-lg font-semibold"
              >
                Download Sector Guide
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
} 