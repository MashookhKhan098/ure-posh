"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Users,
  Target,
  Lightbulb,
  Shield,
  Sparkles,
  Award,
  Clock,
  Phone,
  Mail,
  MapPin,
  Play,
  CheckCircle,
  Star,
  ArrowRight,
  Quote,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { motion } from "framer-motion"
import { Navbar } from "../components/Navbar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0)

  const coreValues = [
    {
      title: "Inclusion is the Starting Point",
      description:
        "We approach every partnership with the understanding that inclusion isn't optional—it's essential. Our work focuses on building spaces that welcome and respect all gender identities and expressions.",
      icon: Users,
      color: "from-violet-500 to-purple-600",
    },
    {
      title: "Everyone Deserves a Safe Workplace",
      description:
        "Safety at work is a basic right. We collaborate with organizations not just to meet POSH requirements, but to embed lasting values of respect, dignity, and zero tolerance for harassment.",
      icon: Shield,
      color: "from-rose-500 to-pink-600",
    },
    {
      title: "Rewriting Outdated Norms",
      description:
        "We challenge traditional systems that fail to protect or empower individuals. Our goal is to replace them with structures rooted in fairness, equality, and accountability.",
      icon: Lightbulb,
      color: "from-emerald-500 to-teal-600",
    },
    {
      title: "Diversity is Our Strength",
      description:
        "We honor all forms of diversity—be it gender, culture, ability, or thought. Real progress happens when everyone is seen, heard, and represented.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600",
    },
    {
      title: "From Words to Action",
      description:
        "Our commitment isn't just theoretical. We work hands-on with organizations to implement real, effective changes that go beyond compliance—and create cultures people can trust.",
      icon: Target,
      color: "from-blue-500 to-cyan-600",
    },
  ]

  const teamHighlights = [
    {
      name: "Samantha Chen",
      role: "Chief Learning Officer",
      image: "/team/samantha.jpg",
      description: "Samantha leads our learning strategy, focusing on creating engaging and effective training programs that transform compliance into meaningful learning experiences.",
      quote: "Learning should be a joy, not a chore. That's what drives us every day.",
      expertise: [
        "Learning Experience Design",
        "Instructional Strategy",
        "Engagement Analytics"
      ]
    },
    {
      name: "Raj Patel",
      role: "Chief Experience Officer",
      image: "/team/raj.jpg",
      description: "Raj ensures every interaction with Ureposh leaves a lasting positive impact. His focus is on creating seamless, intuitive experiences that make learning feel natural and enjoyable.",
      quote: "We're not just creating courses. We're crafting experiences that stick.",
      expertise: [
        "User Experience Design",
        "Interaction Design",
        "UX Research"
      ]
    },
    {
      name: "Priya Sharma",
      role: "Head of Content",
      image: "/team/priya.jpg",
      description: "Priya leads our content creation efforts, ensuring every word we write resonates with our audience and every story we tell has a meaningful impact.",
      quote: "Every word we write has a purpose. Every story we tell has impact.",
      expertise: [
        "Content Strategy",
        "Storytelling",
        "Content Development"
      ]
    },
    {
      name: "Amit Kumar",
      role: "Chief Technology Officer",
      image: "/team/amit.jpg",
      description: "Amit drives our technological innovation, ensuring our learning experiences are cutting-edge and accessible to everyone.",
      quote: "Technology should serve learning, not complicate it.",
      expertise: [
        "Learning Technology",
        "Software Architecture",
        "Digital Learning Solutions"
      ]
    },
    {
      name: "Neha Gupta",
      role: "Head of Operations",
      image: "/team/neha.jpg",
      description: "Neha ensures our operations run smoothly and efficiently, allowing our team to focus on delivering exceptional learning experiences.",
      quote: "Details matter. They make the difference between good and great.",
      expertise: [
        "Operations Management",
        "Process Optimization",
        "Team Leadership"
      ]
    },
    {
      name: "Rohit Sharma",
      role: "Learning Strategist",
      image: "/team/rohit.jpg",
      description: "Rohit helps organizations transform their learning strategies, focusing on creating impactful and sustainable learning programs.",
      quote: "Learning is a journey, not a destination.",
      expertise: [
        "Learning Strategy",
        "Organizational Development",
        "Change Management"
      ]
    }
  ]

  const testimonials = [
    {
      name: "John Doe",
      company: "TechCorp",
      quote: "Ureposh transformed our compliance training from a chore to a highlight.",
      image: "/testimonials/john.jpg",
    },
    {
      name: "Jane Smith",
      company: "HealthCare Inc.",
      quote: "Their approach to safety training is genuinely refreshing.",
      image: "/testimonials/jane.jpg",
    },
    {
      name: "Mike Johnson",
      company: "RetailCo",
      quote: "The team at Ureposh truly understands what makes learning stick.",
      image: "/testimonials/mike.jpg",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-rose-50/40">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center space-y-8 mb-20">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-gradient-to-r from-violet-100 via-purple-100 to-rose-100 text-violet-800 hover:from-violet-200 hover:via-purple-200 hover:to-rose-200 px-8 py-4 text-lg font-semibold border border-violet-200/50 shadow-xl shadow-violet-500/20 rounded-full">
                <Heart className="w-5 h-5 mr-3" />
                About Ureposh
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-6xl lg:text-8xl font-bold text-slate-900 leading-tight"
            >
              Learning That{" "}
              <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                Sparks Curiosity
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-medium"
            >
              At Ureposh, we believe learning should spark curiosity, not eye-rolls. That's why we craft learning
              experiences that actually feel personal, relatable, and worth your time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
            >
              <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 hover:from-violet-700 hover:via-purple-700 hover:to-rose-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 px-10 py-6 text-lg font-semibold rounded-2xl group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch Our Story
              </Button>
              <Button
                variant="outline"
                className="border-2 border-violet-200 text-violet-700 hover:bg-violet-50 px-10 py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                Download Brochure
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Enhanced Our Story Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-50/50 via-transparent to-rose-50/50"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge className="bg-gradient-to-r from-violet-100 to-rose-100 text-violet-800 px-6 py-3 text-lg font-semibold border border-violet-200/50 rounded-full mb-6">
              <Sparkles className="w-5 h-5 mr-2" />
              Our Journey
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              The Story Behind{" "}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                Our Mission
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From a simple idea to transforming workplaces across India
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="relative">
                <Quote className="absolute -top-4 -left-4 w-12 h-12 text-violet-200" />
                <div className="bg-gradient-to-br from-violet-50 to-rose-50 p-8 rounded-3xl border border-violet-100 shadow-xl">
                  <p className="text-lg text-slate-700 leading-relaxed font-medium italic">
                    "We started with a simple belief: workplace learning doesn't have to be boring or disconnected from
                    reality. Every training session should feel like a conversation that matters."
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-rose-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">U</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Ureposh Team</p>
                      <p className="text-slate-600">Founders</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "The Beginning",
                    description:
                      "Started with a vision to make workplace compliance training actually engaging and meaningful.",
                  },
                  {
                    title: "Growing Impact",
                    description:
                      "Expanded across India, helping organizations build safer, more inclusive workplace cultures.",
                  },
                  {
                    title: "Innovation Focus",
                    description:
                      "Developed cutting-edge training modules using real-world scenarios and interactive storytelling.",
                  },
                ].map((milestone, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-rose-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg mb-2">{milestone.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-violet-500/20">
                <Image
                  src="/placeholder.svg?height=600&width=700"
                  alt="Team collaboration"
                  width={700}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-violet-900/30 via-transparent to-transparent"></div>

                {/* Floating Stats */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-violet-600">500+</div>
                    <div className="text-sm text-slate-600">Organizations</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-600">50K+</div>
                    <div className="text-sm text-slate-600">Employees Trained</div>
                  </div>
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute -top-8 -right-8 w-full h-full bg-gradient-to-br from-violet-200/30 to-rose-200/30 rounded-3xl -z-10 blur-sm"></div>
              <div className="absolute -bottom-8 -left-8 w-full h-full bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-3xl -z-10 blur-sm"></div>
            </motion.div>
          </div>

          {/* Team Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {teamHighlights.map((highlight, index) => (
              <Card
                key={index}
                className="border-violet-100 hover:border-violet-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className="w-40 h-40 bg-white rounded-2xl overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-300"
                  >
                    <Image
                      src={highlight.image}
                      alt={highlight.name}
                      width={160}
                      height={160}
                      className="object-cover"
                    />
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{highlight.name}</h3>
                    <p className="text-slate-600 mb-4">{highlight.role}</p>
                    <p className="text-slate-600 mb-4">{highlight.description}</p>
                    <p className="text-slate-600 italic mb-4">"{highlight.quote}"</p>
                    <div className="flex flex-wrap gap-2">
                      {highlight.expertise?.map((skill, index) => (
                        <Badge
                          key={index}
                          className="bg-violet-100 text-violet-800 px-3 py-1 text-sm"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision - Enhanced */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50/50 to-rose-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="border-violet-200 hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-4xl text-slate-900 mb-4">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-slate-600 text-xl leading-relaxed">
                    To spark honest conversations, encourage better decision-making, and help build workplaces that are
                    safe, respectful, inclusive, and truly people first.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="border-violet-200 hover:shadow-2xl transition-all duration-300 h-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <CardHeader className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle className="text-4xl text-slate-900 mb-4">Our Approach</CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <CardDescription className="text-slate-600 text-xl leading-relaxed">
                    Through powerful storytelling and real-world scenarios, we go beyond lectures and compliance
                    checklists. Whether it's POSH training, diversity and inclusion, or ethical leadership—we make
                    learning engaging.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values - Enhanced */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-20"
          >
            <Badge className="bg-gradient-to-r from-violet-100 to-rose-100 text-violet-800 px-8 py-4 text-lg font-semibold border border-violet-200/50 rounded-full">
              <Sparkles className="w-5 h-5 mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-6xl font-bold text-slate-900">
              What Makes Us{" "}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                Different
              </span>
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto font-medium">
              We don't just teach. We stay with you. Our values guide everything we do.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-violet-100 hover:border-violet-200 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-50/30 via-transparent to-rose-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-10 relative">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-2">
                        <div
                          className={`w-24 h-24 bg-gradient-to-br ${value.color} rounded-3xl flex items-center justify-center mx-auto lg:mx-0 shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                        >
                          <value.icon className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="lg:col-span-10 text-center lg:text-left">
                        <h3 className="text-3xl font-bold text-slate-900 mb-6">{value.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-xl">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50/50 to-rose-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                Partners Say
              </span>
            </h2>
            <p className="text-xl text-slate-600">Real feedback from organizations we've transformed</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-violet-100 hover:shadow-xl transition-all duration-300 h-full">
                  <CardContent className="p-8">
                    <Quote className="w-8 h-8 text-violet-200 mb-4" />
                    <p className="text-slate-600 leading-relaxed mb-6 italic">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-slate-900">{testimonial.name}</p>
                      <p className="text-slate-500 text-sm">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Impact - Enhanced */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <h2 className="text-5xl font-bold text-slate-900">Our Impact</h2>
            <p className="text-2xl text-slate-600">Creating lasting change in workplaces across India</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "500+",
                label: "Organizations Transformed",
                icon: Users,
                color: "from-violet-500 to-purple-600",
              },
              { number: "50,000+", label: "Employees Empowered", icon: Heart, color: "from-rose-500 to-pink-600" },
              { number: "99%", label: "Client Satisfaction", icon: Award, color: "from-emerald-500 to-teal-600" },
              { number: "24/7", label: "Support Available", icon: Clock, color: "from-amber-500 to-orange-600" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center space-y-6 p-8 rounded-3xl bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 shadow-xl hover:shadow-2xl group"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-slate-600 font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-900 via-purple-900 to-rose-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-purple-900/90 to-rose-900/90"></div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8 mb-16"
          >
            <h2 className="text-6xl font-bold text-white">Ready to Transform Your Workplace?</h2>
            <p className="text-2xl text-violet-100 max-w-4xl mx-auto font-medium">
              Let's create a safer, more inclusive workplace together. Contact us to discuss your needs and how we can
              help.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-8 justify-center">
            <Link href="/contact" className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-violet-900 hover:bg-violet-50 shadow-2xl hover:shadow-3xl transition-all duration-300 px-12 py-8 text-xl font-bold flex items-center gap-3 rounded-2xl">
                  Start Your Journey
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
            <Link href="/services" className="inline-block">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-violet-900 shadow-2xl hover:shadow-3xl transition-all duration-300 px-12 py-8 text-xl font-bold rounded-2xl bg-transparent"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Enhanced */}
      <footer className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12">
            {/* About */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-purple-400 to-rose-400 bg-clip-text text-transparent">
                  Ureposh
                </span>
              </div>
              <p className="text-slate-400 mb-8 leading-relaxed">
                We're more than just a compliance company. We're your partner in creating workplaces where everyone
                feels safe, respected, and valued.
              </p>
              <div className="flex gap-6">
                <Link href="/about" className="text-slate-400 hover:text-white transition-colors font-medium">
                  Learn More
                </Link>
                <Link href="/contact" className="text-slate-400 hover:text-white transition-colors font-medium">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/services" className="text-slate-400 hover:text-white transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="text-slate-400 hover:text-white transition-colors">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-slate-400 hover:text-white transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
              <div className="space-y-4">
                <p className="text-slate-400 flex items-center">
                  <Phone className="inline-block h-5 w-5 mr-3 text-violet-400" />
                  +91 98765 43210
                </p>
                <p className="text-slate-400 flex items-center">
                  <Mail className="inline-block h-5 w-5 mr-3 text-violet-400" />
                  info@ureposh.com
                </p>
                <p className="text-slate-400 flex items-center">
                  <MapPin className="inline-block h-5 w-5 mr-3 text-violet-400" />
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
              <p className="text-slate-400 mb-6">
                Stay updated with the latest insights on workplace safety and inclusion.
              </p>
              <form className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-slate-800 border-slate-700 text-white placeholder-slate-400 rounded-xl"
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-rose-600 hover:from-violet-700 hover:to-rose-700 rounded-xl font-semibold"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="mt-16 pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-slate-400">&copy; {new Date().getFullYear()} Ureposh. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <Link href="/privacy" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}