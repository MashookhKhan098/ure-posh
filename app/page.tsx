"use client"

import React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Users,
  Award,
  Heart,
  CheckCircle,
  Star,
  Menu,
  X,
  Play,
  Building,
  Clock,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Zap,
  Scale,
  ChevronRight,
  Quote,
  FileCheck,
  Briefcase,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const testimonials = [
    {
      name: "Priya Sharma",
      position: "Chief People Officer",
      company: "TechVision Solutions",
      content:
        "Ureposh transformed our workplace culture completely. Their approach goes beyond compliance—they helped us build genuine respect and inclusion. Our employee satisfaction scores increased by 40% within six months.",
      rating: 5,
      image: "/images/2.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Technology & Software",
      location: "Bangalore, Karnataka",
      challenge: "High attrition due to workplace culture issues",
      solution: "Comprehensive POSH training and culture transformation program",
    },
    {
      name: "Rajesh Kumar",
      position: "Managing Director",
      company: "Global Manufacturing Corp",
      content:
        "The multilingual training programs were a game-changer for our diverse workforce. Ureposh's cultural sensitivity and practical approach made complex legal concepts accessible to everyone, from factory floor to boardroom.",
      rating: 5,
      image: "/images/3.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Manufacturing & Engineering",
      location: "Chennai, Tamil Nadu",
      challenge: "Language barriers and cultural diversity across multiple locations",
      solution: "Multi-language POSH training and localized awareness programs",
    },
    {
      name: "Dr. Anjali Mehta",
      position: "Founder & CEO",
      company: "HealthTech Innovations",
      content:
        "As a woman-led healthcare startup, creating a safe environment was crucial for our growth. Ureposh helped us establish robust policies from day one, enabling us to scale confidently while maintaining our values.",
      rating: 5,
      image: "/images/4.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Healthcare Technology",
      location: "Mumbai, Maharashtra",
      challenge: "Building inclusive culture in fast-growing startup environment",
      solution: "Startup-focused POSH implementation and leadership training",
    },
  ]

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "500+ organizations transformed across 25+ industries with 99.2% compliance success rate",
      icon: Award,
      stats: "99.2% Success Rate",
    },
    {
      title: "Expert Team",
      description: "Legal professionals, certified trainers, and compliance experts with 15+ years average experience",
      icon: Users,
      stats: "15+ Years Experience",
    },
    {
      title: "Comprehensive Solutions",
      description: "End-to-end services from policy development to ongoing support and continuous improvement",
      icon: CheckCircle,
      stats: "360° Coverage",
    },
    {
      title: "Cultural Sensitivity",
      description: "Deep understanding of Indian workplace culture with solutions adapted for regional diversity",
      icon: Heart,
      stats: "15+ Languages",
    },
  ]

  const industries = [
    {
      name: "Information Technology & Software",
      icon: "💻",
      count: "180+",
      growth: "+32%",
      color: "from-gray-500 to-slate-600",
      description: "From startups to tech giants, ensuring safe digital workspaces",
      challenges: ["Remote work policies", "Digital harassment", "Rapid scaling"],
    },
    {
      name: "Healthcare & Life Sciences",
      icon: "🏥",
      count: "95+",
      growth: "+28%",
      color: "from-slate-500 to-gray-600",
      description: "Protecting healthcare workers and maintaining patient care standards",
      challenges: ["High-stress environments", "Hierarchical structures", "Patient interaction protocols"],
    },
    {
      name: "Financial Services & Banking",
      icon: "🏦",
      count: "75+",
      growth: "+25%",
      color: "from-zinc-500 to-gray-600",
      description: "Ensuring compliance in regulated financial environments",
      challenges: ["Regulatory compliance", "Client-facing roles", "Performance pressure"],
    },
    {
      name: "Manufacturing & Engineering",
      icon: "🏭",
      count: "120+",
      growth: "+22%",
      color: "from-gray-600 to-slate-700",
      description: "Creating safe environments in industrial settings",
      challenges: ["Blue-collar workforce", "Multiple shifts", "Safety integration"],
    },
    {
      name: "Education & Research Institutions",
      icon: "🎓",
      count: "65+",
      growth: "+35%",
      color: "from-slate-400 to-gray-600",
      description: "Fostering safe learning and research environments",
      challenges: ["Student-faculty dynamics", "Research collaborations", "Campus safety"],
    },
    {
      name: "Professional Services & Consulting",
      icon: "💼",
      count: "85+",
      growth: "+20%",
      color: "from-gray-500 to-zinc-600",
      description: "Maintaining professional standards in client-service environments",
      challenges: ["Client interactions", "Travel policies", "Project-based teams"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

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
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center min-h-screen py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 lg:pr-12"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-sm font-semibold border border-gray-200/50 shadow-lg rounded-full">
                  <div className="mr-2 text-black">♀</div>
                  India's Leading POSH Compliance Partner
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-black">
                  Creating{" "}
                  <span className="relative">
                    <span className="text-black">Safe & Inclusive</span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 h-1 bg-black rounded-full"
                    />
                  </span>
                  <br />
                  Workplaces for Everyone
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg lg:text-xl text-black leading-relaxed max-w-2xl"
              >
                We transform organizational cultures through comprehensive POSH compliance, expert training, and
                innovative solutions that make workplaces safer, more inclusive, and legally compliant across India.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base font-semibold rounded-xl"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-black text-black hover:bg-gray-50 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-semibold hover:border-gray-800 transition-all duration-300 shadow-lg rounded-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative lg:pl-12 flex flex-col items-center"
            >
              {/* Main Image Container */}
              <div className="relative max-w-lg w-full">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-20">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-gray-500/20">
                    <Image
                      src="/images/5.jpg"
                      alt="Diverse professionals in inclusive workplace"
                      width={700}
                      height={600}
                      className="w-full h-full object-cover"
                      priority
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>

                    {/* Overlay Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-slate-900">50,000+</p>
                            <p className="text-slate-600 font-medium">Lives Transformed</p>
                          </div>
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-slate-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white text-lg font-bold">♀</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="w-full max-w-md mt-8"
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
                  <div className="space-y-6">
                    {/* Organization Trust */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex -space-x-2">
                          {[1, 2, 3, 4].map((i) => (
                            <motion.div
                              key={i}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 1.6 + i * 0.1, type: "spring" }}
                              className="w-10 h-10 bg-gradient-to-br from-gray-600 to-slate-600 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm"
                            >
                              {String.fromCharCode(65 + i - 1)}
                            </motion.div>
                          ))}
                        </div>
                        <div>
                          <p className="text-lg font-bold text-slate-900">500+ Organizations</p>
                          <p className="text-sm text-slate-600 font-medium">Trust Our Expertise</p>
                        </div>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

                    {/* Client Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 1.8 + i * 0.05, type: "spring" }}
                          >
                            <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                          </motion.div>
                        ))}
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-900">4.9/5</p>
                        <p className="text-sm text-slate-600 font-medium">Client Rating</p>
                      </div>
                      <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-slate-700 px-3 py-1 text-xs font-semibold border border-gray-200/50">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified & Trusted Partner
                      </Badge>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white/80 backdrop-blur-sm relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-slate-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
              <Target className="w-5 h-5 mr-2" />
              Why Choose Ureposh
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Your <span className="text-slate-900">Trusted</span> <span className="text-slate-900">POSH Partner</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We combine legal expertise, cultural understanding, and innovative technology to deliver comprehensive
              workplace safety solutions that protect your organization and empower your people.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((reason, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full text-center border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <reason.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{reason.title}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-black mx-auto">
                      {reason.stats}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">{reason.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 px-6 py-3 text-lg font-semibold">
              <Briefcase className="w-5 h-5 mr-2" />
              Industries We Serve
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Trusted Across{" "}
              <span className="bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
                All Sectors
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From innovative startups to established enterprises, we've helped organizations across diverse industries
              create inclusive, safe workplaces that drive business success and employee wellbeing.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="bg-white/90 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl shadow-gray-500/10 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-5xl">{industry.icon}</div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{industry.growth}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{industry.description}</p>
                    <p className="text-4xl font-bold text-slate-900 mb-2">{industry.count}</p>
                    <p className="text-sm text-slate-600 mb-4">Organizations transformed</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-slate-700">Key Challenges Addressed:</p>
                      <div className="flex flex-wrap gap-1">
                        {industry.challenges.map((challenge, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 border border-gray-200 text-gray-700 rounded-full bg-white">{challenge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ delay: index * 0.1, duration: 1.2, ease: 'easeOut' }}
                        className="h-full bg-gray-700 rounded-full relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-slate-500/10 to-zinc-500/10"></div>
        <div className="max-w-6xl mx-auto text-center space-y-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge className="bg-white/90 text-gray-800 px-8 py-4 text-xl font-semibold border border-gray-200/50 shadow-lg">
              <Sparkles className="w-6 h-6 mr-3" />
              Ready to Transform Your Workplace?
            </Badge>
            <h2 className="text-6xl font-bold text-slate-900 leading-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-gray-600 via-slate-600 to-zinc-600 bg-clip-text text-transparent">
                Transformation
              </span>{" "}
              Journey Today
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Join 500+ forward-thinking organizations that have created safer, more inclusive workplaces with Ureposh.
              Get started with a free consultation and discover how we can help you build a culture where everyone
              thrives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-600 via-slate-600 to-zinc-600 hover:from-gray-700 hover:via-slate-700 hover:to-zinc-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-12 py-8 text-xl font-semibold"
              >
                Get Free Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white/90 backdrop-blur-sm px-12 py-8 text-xl font-semibold shadow-lg shadow-gray-500/10"
              >
                <FileCheck className="mr-3 h-6 w-6" />
                Download Resources
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 bg-white/90 backdrop-blur-sm px-12 py-8 text-xl font-semibold shadow-lg shadow-slate-500/10"
              >
                <Phone className="mr-3 h-6 w-6" />
                Call Expert Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 pt-12"
          >
            {[
              {
                icon: Phone,
                title: "Speak with Expert",
                content: "+91 98765 43210",
                subtitle: "Available Mon-Fri, 9 AM - 6 PM IST",
                color: "from-gray-500 to-slate-600",
                action: "Immediate consultation available",
              },
              {
                icon: Mail,
                title: "Email Consultation",
                content: "hello@ureposh.com",
                subtitle: "Response within 4 hours",
                color: "from-slate-500 to-zinc-600",
                action: "Detailed project discussion",
              },
              {
                icon: MapPin,
                title: "Visit Our Office",
                content: "Mumbai, Maharashtra",
                subtitle: "Schedule appointment",
                color: "from-zinc-500 to-gray-600",
                action: "In-person consultation",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-gray-500/10 border border-white/20"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-slate-700 mb-1">{contact.content}</p>
                <p className="text-sm text-slate-600 mb-2">{contact.subtitle}</p>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                  {contact.action}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-12 pt-12"
          >
            {[
              { icon: Shield, text: "100% Confidential", color: "text-gray-600", desc: "Secure processes" },
              { icon: CheckCircle, text: "Legal Compliance", color: "text-slate-600", desc: "Full POSH adherence" },
              { icon: Award, text: "Expert Team", color: "text-zinc-600", desc: "Certified professionals" },
              { icon: Clock, text: "Quick Response", color: "text-gray-700", desc: "24-hour turnaround" },
            ].map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 text-slate-700">
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
                <div>
                  <span className="font-semibold text-lg">{badge.text}</span>
                  <p className="text-sm text-slate-600">{badge.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}


