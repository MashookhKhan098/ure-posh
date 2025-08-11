"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Award, TrendingUp, Star, Zap, Target, Cog, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP Timeline for section entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Main heading animation with text reveal
    tl.fromTo(headingRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );

    // Stats stagger animation
    if (statsRef.current?.children) {
      tl.fromTo(statsRef.current.children, 
        { opacity: 0, y: 60, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.8"
      );
    }

    // Floating elements entrance
    if (floatingElementsRef.current?.children) {
      tl.fromTo(floatingElementsRef.current.children,
        { opacity: 0, scale: 0, rotation: -180 },
        { 
          opacity: 1, 
          scale: 1, 
          rotation: 0, 
          duration: 1, 
          stagger: 0.2,
          ease: "back.out(1.7)"
        },
        "-=0.5"
      );
    }

    // Continuous floating animation
    gsap.to(".floating-shape", {
      y: -30,
      rotation: 360,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.5
    });

    // Parallax effect for background elements
    gsap.to(".parallax-bg", {
      y: -150,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Pulse animation for gradient orbs
    gsap.to(".gradient-orb", {
      scale: 1.2,
      opacity: 0.6,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 1
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const floatingAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden">
      {/* Enhanced Background Elements - Matching Home Page */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute right-0 top-0 w-1/2 h-full group">
          <Cog className="absolute -top-12 -right-12 text-[8rem] sm:text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
          <Cog className="absolute top-1/4 -right-24 text-6xl sm:text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
          <Cog className="absolute bottom-1/4 -right-10 text-7xl sm:text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
          <Cog className="absolute -bottom-12 right-1/4 text-4xl sm:text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
        </div>
      </div>
      
      <div ref={floatingElementsRef} className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-blue-200/40 rounded-full floating-shape" />
        <div className="absolute top-40 right-32 w-24 h-24 border border-purple-200/30 rounded-lg floating-shape" />
        <div className="absolute bottom-40 left-32 w-20 h-20 border border-pink-200/50 rounded-full floating-shape" />
        <div className="absolute bottom-20 right-20 w-28 h-28 border border-blue-200/40 rounded-lg floating-shape" />
        
        {/* Gradient orbs with parallax - Matching Home Page Colors */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/30 to-purple-100/20 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-pink-100/20 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-full blur-3xl parallax-bg" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        {/* Enhanced Badge - Matching Home Page Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-center mb-8"
        >
          <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
              <span className="text-white text-xs sm:text-sm lg:text-lg font-bold">♀</span>
            </div>
            <span className="text-xs sm:text-sm lg:text-base leading-tight">World's Leading POSH Partner</span>
          </Badge>
        </motion.div>

        {/* Enhanced Main Heading - Matching Home Page Style */}
        <motion.h1 
          ref={headingRef}
          style={{ y, opacity }}
          className="text-6xl md:text-7xl lg:text-8xl font-bold text-center leading-tight mb-8"
        >
          <span className="text-slate-600 font-medium">Creating</span>{" "}
          <motion.span 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="relative inline-block"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              Safe & Inclusive
            </span>
            <motion.div 
              initial={{ width: 0 }} 
              whileInView={{ width: "100%" }} 
              transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
              viewport={{ once: true }}
              className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-md"
            />
          </motion.span>{" "}
          <span className="text-slate-700 font-semibold">Workplaces</span>
        </motion.h1>

        {/* Enhanced Description - Matching Home Page Style */}
        <motion.p 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-2xl md:text-3xl text-slate-600 text-center max-w-5xl mx-auto leading-relaxed font-medium mb-12"
        >
          We transform organizational cultures through comprehensive{" "}
          <span className="font-bold text-slate-800 bg-yellow-100 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-md text-xs sm:text-xs lg:text-sm">POSH compliance</span>, expert training, and innovative solutions that make workplaces{" "}
          <span className="font-bold text-slate-800 bg-green-100 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-md text-xs sm:text-xs lg:text-sm">safer, more inclusive</span>, and legally compliant across India.
        </motion.p>

        {/* Enhanced Feature Pills - Matching Home Page Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {[
            { icon: CheckCircle, text: "Compliance Excellence" },
            { icon: Award, text: "Cultural Transformation" },
            { icon: TrendingUp, text: "Sustainable Results" },
            { icon: Zap, text: "Innovation Driven" }
          ].map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <feature.icon className="w-5 h-5 text-slate-600" />
              <span className="text-slate-700 font-medium">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Enhanced CTA Button - Matching Home Page Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center mb-20"
        >
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border-0">
            Start Your Transformation
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </motion.div>

        {/* Enhanced Key Statistics - Matching Home Page Style */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "500+", label: "Organizations Transformed", icon: Award },
            { number: "98%", label: "Success Rate", icon: CheckCircle },
            { number: "3x", label: "ROI Improvement", icon: TrendingUp },
            { number: "24/7", label: "Expert Support", icon: Star }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={pulseAnimation}
              animate="animate"
              className="text-center group"
            >
              <div className="relative">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                  <stat.icon className="w-10 h-10" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">{stat.number}</div>
              <div className="text-slate-600 font-medium text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating Achievement Badge - Matching Home Page Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.2 }}
          className="absolute top-1/4 right-8 hidden lg:block"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-2xl border border-blue-500/30 backdrop-blur-sm">
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-2 text-yellow-300" />
              <div className="text-sm font-semibold">Industry Leader</div>
              <div className="text-xs text-blue-100">2024 Recognition</div>
            </div>
          </div>
        </motion.div>

        {/* Floating Success Metric - Matching Home Page Style */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 1.4 }}
          className="absolute bottom-1/4 left-8 hidden lg:block"
        >
          <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-6 rounded-2xl shadow-2xl">
            <div className="text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-slate-600" />
              <div className="text-sm font-semibold text-slate-900">95%</div>
              <div className="text-xs text-slate-600">Client Satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;