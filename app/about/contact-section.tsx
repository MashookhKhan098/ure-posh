"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, MessageCircle, ArrowRight, CheckCircle, Users, Award, Shield } from "lucide-react";

const ContactSection: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "HR Director",
      company: "TechCorp Solutions",
      content: "Ureposh transformed our workplace culture completely. Their compliance training is engaging and actually works.",
      rating: 5,
      avatar: "SJ"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "InnovateLabs",
      content: "The best investment we've made in our company culture. Our team feels safer and more included than ever.",
      rating: 5,
      avatar: "MC"
    },
    {
      name: "Priya Sharma",
      role: "Diversity Officer",
      company: "Global Enterprises",
      content: "Professional, effective, and truly transformative. Ureposh understands what modern workplaces need.",
      rating: 5,
      avatar: "PS"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-pink-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-pink-100/40 to-pink-200/30 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-pink-200/40 to-pink-100/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-50/20 to-pink-100/20 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-pink-100/30 to-pink-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Section Header */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8 mb-20"
        >
          <motion.div variants={slideInLeft}>
            <Badge className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 px-6 py-3 text-sm font-semibold rounded-full shadow-lg border border-pink-200">
              <Heart className="w-5 h-5 mr-2" />
              Success Stories
            </Badge>
          </motion.div>
          <motion.h2 
            variants={slideInRight}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
          >
            Success Stories & Testimonials
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light"
          >
            Hear from organizations that have transformed their workplace culture with our innovative compliance solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-10">
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  {/* Testimonial Content */}
                  <p className="text-gray-700 leading-relaxed text-lg font-light mb-8 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-black">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                      <div className="text-sm text-pink-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center"
        >
          <motion.div variants={fadeInUp}>
            <Card className="border border-gray-200 shadow-2xl bg-gradient-to-r from-pink-50 to-white overflow-hidden rounded-3xl">
              <CardContent className="p-16">
                <div className="space-y-8">
                  <div className="space-y-6">
                    <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                      Ready to Transform Your Workplace?
                    </h3>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light">
                      Join hundreds of organizations that have already transformed their workplace culture with our innovative compliance solutions.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                    <Button className="group bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                      <MessageCircle className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
                      Get Started Today
                      <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className="border-3 border-black text-black hover:bg-black hover:text-white px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                      <Users className="w-6 h-6 mr-3" />
                      Schedule Demo
                    </Button>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center items-center gap-8 pt-8 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      ISO 27001 Certified
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4 text-yellow-500" />
                      Industry Leader 2024
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield className="w-4 h-4 text-blue-500" />
                      SOC 2 Compliant
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;