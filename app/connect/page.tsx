"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle, Calendar, ArrowRight } from "lucide-react"

export default function ConnectPage() {
  const contactMethods = [
    {
      title: "Phone Consultation",
      description: "Speak directly with our experts for immediate guidance",
      icon: Phone,
      contact: "+91 98765 43210",
      availability: "Mon-Fri, 9 AM - 6 PM IST",
      action: "Call Now",
      color: "from-gray-500 to-slate-600",
    },
    {
      title: "Email Support",
      description: "Send us your questions and get detailed responses",
      icon: Mail,
      contact: "hello@ureposh.com",
      availability: "Response within 4 hours",
      action: "Send Email",
      color: "from-slate-500 to-zinc-600",
    },
    {
      title: "Office Visit",
      description: "Schedule an in-person consultation at our office",
      icon: MapPin,
      contact: "Mumbai, Maharashtra",
      availability: "By appointment only",
      action: "Schedule Visit",
      color: "from-zinc-500 to-gray-600",
    },
  ]

  const consultationTypes = [
    {
      title: "Free Initial Consultation",
      description: "30-minute session to understand your needs and provide initial guidance",
      duration: "30 minutes",
      price: "Free",
      features: ["Needs assessment", "Initial recommendations", "Service overview"],
    },
    {
      title: "Comprehensive Audit",
      description: "Detailed evaluation of your current POSH implementation and compliance status",
      duration: "2-3 hours",
      price: "₹15,000",
      features: ["Policy review", "Process analysis", "Gap identification", "Action plan"],
    },
    {
      title: "Full Implementation",
      description: "End-to-end POSH implementation with ongoing support",
      duration: "4-6 weeks",
      price: "Custom Quote",
      features: ["Complete setup", "Training programs", "Ongoing support", "Compliance monitoring"],
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
              <MessageCircle className="w-5 h-5 mr-2" />
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6">
              Ready to <span className="text-black">Transform</span> Your Workplace?
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Connect with our experts today and take the first step towards creating 
              a safer, more inclusive workplace environment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
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
              <Phone className="w-5 h-5 mr-2" />
              Contact Options
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Choose Your <span className="text-slate-900">Preferred</span> Method
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer multiple ways to connect with our team, ensuring you can reach us 
              in the way that works best for you.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {contactMethods.map((method, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <method.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{method.title}</CardTitle>
                    <CardDescription className="text-slate-600">{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-lg font-semibold text-slate-700">{method.contact}</p>
                      <p className="text-sm text-slate-500">{method.availability}</p>
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      {method.action}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Consultation Types */}
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
              <Calendar className="w-5 h-5 mr-2" />
              Consultation Options
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Choose Your <span className="text-slate-900">Consultation</span> Type
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We offer flexible consultation options to meet your specific needs and budget, 
              from free initial sessions to comprehensive implementation support.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {consultationTypes.map((consultation, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full bg-white/95 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                        {consultation.duration}
                      </Badge>
                      <span className="text-2xl font-bold text-slate-900">{consultation.price}</span>
                    </div>
                    <CardTitle className="text-xl text-slate-900">{consultation.title}</CardTitle>
                    <CardDescription className="text-slate-600">{consultation.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      {consultation.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-slate-900">
              Start Your <span className="text-slate-900">Transformation</span> Today
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Don't wait to create a safer, more inclusive workplace. 
              Connect with our experts and begin your journey towards positive change.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Free Consultation
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold">
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 