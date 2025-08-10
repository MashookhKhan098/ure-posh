"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, CheckCircle, Star, Target, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const TaglineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.3]);

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

    // Features stagger animation
    if (featuresRef.current?.children) {
      tl.fromTo(featuresRef.current.children, 
        { opacity: 0, y: 50, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.7, 
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.6"
      );
    }

    // Highlights grid animation
    if (highlightsRef.current?.children) {
      tl.fromTo(highlightsRef.current.children, 
        { opacity: 0, y: 40, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.4"
      );
    }

    // CTA section animation
    if (ctaRef.current) {
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Floating elements animation
    gsap.to(".floating-shape", {
      y: -25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 0.6
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

    // Pulse animation for gradient orbs
    gsap.to(".gradient-orb", {
      scale: 1.15,
      opacity: 0.5,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 1.2
    });

    return () => {
      // Cleanup
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const floatingAnimation = {
    animate: {
      y: [-15, 15, -15],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const pulseAnimation = {
    animate: {
      scale: [1, 1.08, 1],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const features = [
    { icon: Target, text: "Strategic Excellence", description: "Data-driven approaches for optimal results" },
    { icon: Zap, text: "Innovation First", description: "Cutting-edge solutions for modern challenges" },
    { icon: Star, text: "Quality Assurance", description: "Uncompromising standards in every delivery" },
    { icon: CheckCircle, text: "Proven Results", description: "Track record of successful transformations" }
  ];

  const highlights = [
    "500+ Organizations Transformed",
    "98% Client Satisfaction Rate",
    "24/7 Expert Support Available",
    "Multi-language Training Programs",
    "Customized Compliance Solutions",
    "Ongoing Cultural Development"
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-slate-100/40 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 -left-20 w-40 h-40 border border-blue-200/30 rounded-full floating-shape" />
        <div className="absolute top-1/3 -right-16 w-32 h-32 border border-purple-200/40 rounded-lg floating-shape" />
        <div className="absolute bottom-1/3 left-1/4 w-28 h-28 border border-pink-200/50 rounded-full floating-shape" />
        <div className="absolute bottom-1/4 right-1/3 w-36 h-36 border border-blue-200/30 rounded-lg floating-shape" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 border border-purple-200/40 rounded-full floating-shape" />
        
        {/* Gradient orbs with parallax */}
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/25 to-purple-100/20 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-purple-100/25 to-pink-100/20 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-full blur-3xl parallax-bg" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.018]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '45px 45px'
          }} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Section Header */}
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
              <span className="text-xs sm:text-sm lg:text-base leading-tight">Why Choose Us</span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            style={{ y, opacity }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Excellence in{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Every Detail
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            We don't just meet expectations—we exceed them. Every solution is crafted with precision, 
            every strategy designed for success, and every outcome measured for impact.
          </motion.p>
        </motion.div>

        {/* Enhanced Feature Pills */}
        <motion.div
          ref={featuresRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={pulseAnimation}
              animate="animate"
              className="group"
            >
              <div className="bg-white/90 backdrop-blur-sm border border-slate-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group-hover:border-slate-300 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-6 group-hover:shadow-xl transition-all duration-300">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.text}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Highlights Grid */}
        <motion.div
          ref={highlightsRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {highlights.map((highlight, index) => (
            <motion.div
              key={index}
              variants={pulseAnimation}
              animate="animate"
              className="group"
            >
              <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:border-slate-300">
                <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-full flex items-center justify-center text-white shadow-sm">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors duration-300">
                  {highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Interactive CTA Section */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: '30px 30px'
              }} />
            </div>
            
            {/* Floating stars */}
            <div className="absolute inset-0">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                  }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Experience Excellence?
              </h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
                Join the organizations that trust us to deliver exceptional results and transform their workplaces.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Start Your Journey
                </button>
                <button className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TaglineSection; 