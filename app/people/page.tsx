"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Award, Heart, Target, Sparkles, CheckCircle } from "lucide-react"

export default function PeoplePage() {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      bio: "Legal expert with 15+ years experience in workplace compliance and cultural transformation.",
      image: "/images/2.jpg",
      expertise: ["POSH Compliance", "Legal Advisory", "Leadership"],
      achievements: ["500+ Organizations Transformed", "99.2% Success Rate"],
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Training",
      bio: "Certified trainer specializing in inclusive workplace practices and cultural sensitivity.",
      image: "/images/3.jpg",
      expertise: ["Training Programs", "Cultural Adaptation", "Skill Development"],
      achievements: ["50,000+ Professionals Trained", "15+ Languages"],
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Chief Compliance Officer",
      bio: "Legal professional focused on ensuring comprehensive compliance and risk management.",
      image: "/images/4.jpg",
      expertise: ["Legal Compliance", "Risk Management", "Policy Development"],
      achievements: ["Zero Major Violations", "Industry Expert"],
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
              <Users className="w-5 h-5 mr-2" />
              Our Team
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Meet the <span className="text-black">Experts</span> Behind Our Success
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Our diverse team of legal professionals, certified trainers, and compliance experts 
              are dedicated to transforming workplaces across India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardHeader className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-500 to-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-slate-900">{member.name}</CardTitle>
                    <CardDescription className="text-lg font-semibold text-slate-600">{member.role}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <p className="text-slate-600 leading-relaxed">{member.bio}</p>
                    
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Key Achievements</h4>
                      <div className="space-y-2">
                        {member.achievements.map((achievement, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-slate-600">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
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
              <Heart className="w-5 h-5 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              What <span className="text-slate-900">Drives</span> Our Team
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our team is united by a shared commitment to creating safer, more inclusive workplaces 
              where every individual can thrive and contribute their best.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Excellence",
                description: "We maintain the highest standards in all our services and interactions.",
                icon: Award,
                color: "from-gray-500 to-slate-600",
              },
              {
                title: "Empathy",
                description: "We understand the human impact of workplace issues and approach solutions with compassion.",
                icon: Heart,
                color: "from-slate-500 to-gray-600",
              },
              {
                title: "Innovation",
                description: "We continuously evolve our approaches to meet changing workplace needs.",
                icon: Sparkles,
                color: "from-zinc-500 to-gray-600",
              },
            ].map((value, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full text-center border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">{value.description}</CardDescription>
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