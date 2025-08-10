"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Star, MessageCircle, Users, Award, TrendingUp } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // GSAP Timeline for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Header animations
    tl.fromTo(headerRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Cards stagger animation
    tl.fromTo(cardsRef.current?.children, 
      { opacity: 0, y: 60, scale: 0.9 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.8, 
        stagger: 0.2,
        ease: "power3.out"
      },
      "-=0.5"
    );

    // Stats animation
    tl.fromTo(statsRef.current?.children,
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.6, 
        stagger: 0.1,
        ease: "power2.out"
      },
      "-=0.3"
    );

    // Floating elements animation
    gsap.to(".floating-element", {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5
    });

    // Parallax effect for background elements
    gsap.to(".parallax-bg", {
      y: -100,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

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
      avatar: "SJ",
      achievement: "95% Compliance Rate"
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "InnovateLabs",
      content: "The best investment we've made in our company culture. Our team feels safer and more included than ever.",
      rating: 5,
      avatar: "MC",
      achievement: "100% Team Satisfaction"
    },
    {
      name: "Priya Sharma",
      role: "Diversity Officer",
      company: "Global Enterprises",
      content: "Professional, effective, and truly transformative. Ureposh understands what modern workplaces need.",
      rating: 5,
      avatar: "PS",
      achievement: "90% Cultural Improvement"
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Organizations Served", color: "from-blue-600 to-purple-600" },
    { icon: Award, value: "98%", label: "Success Rate", color: "from-purple-600 to-pink-600" },
    { icon: TrendingUp, value: "3x", label: "ROI Improvement", color: "from-pink-600 to-blue-600" },
    { icon: MessageCircle, value: "24/7", label: "Support Available", color: "from-blue-600 to-purple-600" }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-100/50 relative overflow-hidden">
      {/* Sophisticated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle geometric shapes */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 border border-blue-200/30 rounded-full floating-element" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 border border-purple-200/30 rounded-full floating-element" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border border-pink-200/20 rounded-full parallax-bg" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 border border-blue-200/30 rounded-full floating-element" style={{ animationDelay: '2s' }} />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Enhanced Section Header */}
        <motion.div
          ref={headerRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8 mb-20"
        >
          <motion.div variants={slideInLeft}>
            <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm lg:text-lg font-bold">♀</span>
              </div>
              <span className="text-xs sm:text-sm lg:text-base leading-tight">Success Stories</span>
            </Badge>
          </motion.div>
          <motion.h2 
            variants={slideInRight}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Success Stories &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Testimonials
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-2xl text-slate-600 max-w-5xl mx-auto leading-relaxed font-light"
          >
            Hear from organizations that have transformed their workplace culture with our innovative compliance solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced Testimonials Grid */}
        <motion.div
          ref={cardsRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div key={index} variants={fadeInUp} className="group">
              <Card className="border border-slate-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm overflow-hidden group-hover:border-slate-300">
                <CardContent className="p-10">
                  {/* Achievement Badge */}
                  <div className="mb-6">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-xs font-medium rounded-full">
                      {testimonial.achievement}
                    </Badge>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-500 fill-current" />
                    ))}
                  </div>
                  
                  {/* Testimonial Content */}
                  <p className="text-slate-700 leading-relaxed text-lg font-light mb-8 italic">
                    "{testimonial.content}"
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-500">{testimonial.role}</div>
                      <div className="text-sm text-slate-600 font-medium">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div
          ref={statsRef}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={fadeInUp} className="text-center group">
              <div className="relative">
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-800 via-purple-800 to-pink-800 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Workplace?
              </h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join hundreds of organizations that have already improved their culture, compliance, and employee satisfaction.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started Today
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;