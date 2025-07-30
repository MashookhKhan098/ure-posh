"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Globe, Award, Users, Shield, Heart } from "lucide-react"
import Image from "next/image"

const teamMembers = [
  {
    name: "Priya Sharma",
    role: "Founder & CEO",
    expertise: "Workplace Safety & Compliance",
    image: "/placeholder-user.jpg",
    bio: "Leading expert in POSH compliance with 15+ years of experience in workplace safety and organizational development.",
    linkedin: "#",
    email: "priya@ureposh.com",
    achievements: ["Certified POSH Trainer", "Legal Compliance Expert", "Organizational Development Specialist"]
  },
  {
    name: "Rajesh Kumar",
    role: "Head of Legal & Compliance",
    expertise: "Legal Framework & Policy",
    image: "/placeholder-user.jpg",
    bio: "Specialized in employment law and workplace harassment prevention with extensive experience in corporate legal frameworks.",
    linkedin: "#",
    email: "rajesh@ureposh.com",
    achievements: ["Employment Law Expert", "Policy Development Specialist", "Legal Compliance Auditor"]
  },
  {
    name: "Anjali Patel",
    role: "Director of Training & Development",
    expertise: "Employee Training & Wellness",
    image: "/placeholder-user.jpg",
    bio: "Expert in designing comprehensive training programs focused on workplace respect, mental health, and organizational well-being.",
    linkedin: "#",
    email: "anjali@ureposh.com",
    achievements: ["Training Program Designer", "Mental Health Advocate", "Wellness Program Specialist"]
  },
  {
    name: "Vikram Singh",
    role: "Head of Technology & Innovation",
    expertise: "Digital Solutions & Analytics",
    image: "/placeholder-user.jpg",
    bio: "Leading digital transformation initiatives to make workplace safety and compliance more accessible and effective.",
    linkedin: "#",
    email: "vikram@ureposh.com",
    achievements: ["Digital Innovation Expert", "Analytics Specialist", "Technology Integration Leader"]
  },
  {
    name: "Meera Reddy",
    role: "Senior Consultant",
    expertise: "Organizational Psychology",
    image: "/placeholder-user.jpg",
    bio: "Specialized in creating inclusive workplace cultures and addressing workplace harassment through psychological insights.",
    linkedin: "#",
    email: "meera@ureposh.com",
    achievements: ["Organizational Psychologist", "Culture Transformation Expert", "Harassment Prevention Specialist"]
  },
  {
    name: "Arjun Desai",
    role: "Client Success Manager",
    expertise: "Client Relations & Implementation",
    image: "/placeholder-user.jpg",
    bio: "Ensuring seamless implementation of POSH policies and maintaining strong relationships with our client organizations.",
    linkedin: "#",
    email: "arjun@ureposh.com",
    achievements: ["Client Success Expert", "Implementation Specialist", "Relationship Manager"]
  }
]

const stats = [
  { icon: Users, number: "500+", label: "Organizations Served" },
  { icon: Shield, number: "50,000+", label: "Employees Protected" },
  { icon: Award, number: "98%", label: "Client Satisfaction" },
  { icon: Heart, number: "24/7", label: "Support Available" }
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
      <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Meet Our <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Expert Team</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of professionals brings together expertise in legal compliance, 
            organizational psychology, training, and technology to create safer, more inclusive workplaces.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-slate-900 mb-1">{stat.number}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="text-center">
                    {/* Image */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-br from-pink-500 to-rose-500 bg-gradient-to-br from-pink-500 to-rose-500">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{member.name}</h3>
                    <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                    
                    {/* Expertise */}
                    <Badge variant="secondary" className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border-blue-200">
                      {member.expertise}
                    </Badge>

                    {/* Bio */}
                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {member.bio}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2 mb-6">
                      {member.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center text-xs text-slate-500">
                          <Award className="w-3 h-3 mr-2 text-pink-500 flex-shrink-0" />
                          {achievement}
                        </div>
                      ))}
                    </div>

                    {/* Contact Links */}
                    <div className="flex justify-center space-x-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-pink-500 hover:bg-pink-50"
                      >
                        <Linkedin className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-pink-500 hover:bg-pink-50"
                      >
                        <Mail className="w-4 h-4 text-gray-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-8 h-8 p-0 rounded-full border-gray-300 hover:border-pink-500 hover:bg-pink-50"
                      >
                        <Globe className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Ready to Work with Our Expert Team?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how our team can help transform your workplace into a safer, 
            more inclusive environment where everyone can thrive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white px-8 py-3 rounded-full font-semibold">
              Schedule a Consultation
            </Button>
            <Button variant="outline" className="border-pink-500 text-pink-600 hover:bg-pink-50 px-8 py-3 rounded-full font-semibold">
              Meet Our Team
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
