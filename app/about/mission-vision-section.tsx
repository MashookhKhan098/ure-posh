"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Lightbulb, Zap, ArrowRight, Target, Globe, Cog } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MissionVisionSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

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
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    // Cards stagger animation
    if (cardsRef.current?.children) {
      tl.fromTo(cardsRef.current.children, 
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.6"
      );
    }

    // CTA section animation
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }

    // Floating elements animation
    gsap.to(".floating-element", {
      y: -20,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.8
    });

    // Parallax effect for background elements
    gsap.to(".parallax-bg", {
      y: -80,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Icon rotation animation
    gsap.to(".rotating-icon", {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: "none"
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const cardVariants = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    hover: { 
      y: -10,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hover: { 
      rotate: 360,
      scale: 1.1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Enhanced Background Elements - Matching Home Page */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute left-0 top-0 w-1/2 h-full group">
          <Cog className="absolute -top-12 -left-12 text-[8rem] sm:text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
          <Cog className="absolute top-1/4 -left-24 text-6xl sm:text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
          <Cog className="absolute bottom-1/4 -left-10 text-7xl sm:text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
          <Cog className="absolute -bottom-12 left-1/4 text-4xl sm:text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes - Matching Home Page Colors */}
        <div className="absolute top-1/4 -left-24 w-48 h-48 border border-blue-200/30 rounded-full floating-element" />
        <div className="absolute bottom-1/3 -right-20 w-32 h-32 border border-purple-200/40 rounded-lg floating-element" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 border border-pink-200/50 rounded-full floating-element" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 border border-blue-200/30 rounded-lg floating-element" />
        
        {/* Gradient orbs with parallax - Matching Home Page Colors */}
        <div className="absolute top-1/3 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/15 rounded-full blur-3xl parallax-bg" />
        <div className="absolute bottom-1/3 -right-32 w-64 h-64 bg-gradient-to-br from-purple-100/20 to-pink-100/15 rounded-full blur-3xl parallax-bg" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-50/15 to-purple-50/15 rounded-full blur-3xl parallax-bg" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header - Matching Home Page Style */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-8 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm lg:text-lg font-bold">♀</span>
              </div>
              <span className="text-xs sm:text-sm lg:text-base leading-tight">Our Foundation</span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            style={{ y, opacity }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Mission &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Vision
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Driving workplace transformation through innovative compliance solutions and cultural excellence.
          </motion.p>
        </motion.div>

        {/* Enhanced Mission & Vision Cards - Matching Home Page Style */}
        <motion.div
          ref={cardsRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Mission Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="border border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform bg-white/90 backdrop-blur-sm overflow-hidden group-hover:border-slate-300">
              <CardContent className="p-12 relative">
                {/* Animated background pattern on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 group-hover:shadow-xl transition-all duration-300"
                  >
                    <Target className="w-10 h-10 rotating-icon" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    To create safe, inclusive, and compliant workplaces where every individual can thrive. 
                    We empower organizations with innovative solutions that transform workplace culture 
                    and drive sustainable business success.
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Compliance Excellence",
                      "Cultural Transformation", 
                      "Inclusive Practices",
                      "Sustainable Results"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 cursor-pointer group/link">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            variants={cardVariants}
            whileHover="hover"
            className="group"
          >
            <Card className="border border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform bg-white/90 backdrop-blur-sm overflow-hidden group-hover:border-slate-300">
              <CardContent className="p-12 relative">
                {/* Animated background pattern on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    variants={iconVariants}
                    className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-8 group-hover:shadow-xl transition-all duration-300"
                  >
                    <Globe className="w-10 h-10 rotating-icon" />
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h3>
                  <p className="text-slate-600 text-lg leading-relaxed mb-8">
                    To be the global leader in workplace transformation, setting new standards for 
                    compliance excellence and cultural innovation. We envision a world where every 
                    workplace is a model of safety, inclusion, and sustainable growth.
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Global Leadership",
                      "Innovation Standards",
                      "Cultural Excellence",
                      "Sustainable Growth"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Learn More Link */}
                  <div className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors duration-300 cursor-pointer group/link">
                    <span className="font-medium">Learn More</span>
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Enhanced Bottom CTA Section - Matching Home Page Style */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: '25px 25px'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Workplace?
              </h3>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join the organizations that have already achieved workplace excellence through our proven solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Get Started Today
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
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

export default MissionVisionSection; 