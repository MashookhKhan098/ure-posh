"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Zap, Target, Award, Users, Globe, Shield, Heart } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ValuesPillarsSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const whyChooseRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -70]);
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

    // Values stagger animation
    if (valuesRef.current?.children) {
      tl.fromTo(valuesRef.current.children, 
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.8, 
          stagger: 0.15,
          ease: "power3.out"
        },
        "-=0.6"
      );
    }

    // Pillars stagger animation
    if (pillarsRef.current?.children) {
      tl.fromTo(pillarsRef.current.children, 
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
    }

    // Industries stagger animation
    if (industriesRef.current?.children) {
      tl.fromTo(industriesRef.current.children, 
        { opacity: 0, y: 50, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.7, 
          stagger: 0.1,
          ease: "power2.out"
        },
        "-=0.4"
      );
    }

    // Why Choose Us animation
    if (whyChooseRef.current) {
      tl.fromTo(whyChooseRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.3"
      );
    }

    // Floating elements animation
    gsap.to(".floating-element", {
      y: -30,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 1
    });

    // Parallax effect for background elements
    gsap.to(".parallax-bg", {
      y: -120,
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
      duration: 25,
      repeat: -1,
      ease: "none"
    });

    // Pulse animation for gradient orbs
    gsap.to(".gradient-orb", {
      scale: 1.2,
      opacity: 0.4,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      stagger: 1.5
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
      y: -12,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const iconVariants = {
    hover: { 
      rotate: 360,
      scale: 1.15,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const coreValues = [
    {
      icon: Shield,
      title: "Integrity",
      description: "Unwavering commitment to ethical practices and transparency in all our dealings.",
      delay: 0.1
    },
    {
      icon: Heart,
      title: "Empathy",
      description: "Understanding and addressing the unique needs of every organization and individual.",
      delay: 0.2
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Pursuing the highest standards of quality and performance in every solution.",
      delay: 0.3
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Working together with clients to achieve shared goals and lasting impact.",
      delay: 0.4
    }
  ];

  const pillars = [
    {
      icon: Award,
      title: "Expert Knowledge",
      description: "Deep expertise in compliance, cultural transformation, and workplace dynamics.",
      features: ["Legal Compliance", "Best Practices", "Industry Standards"],
      delay: 0.1
    },
    {
      icon: Globe,
      title: "Global Perspective",
      description: "International insights and adaptable solutions for diverse workplace cultures.",
      features: ["Cultural Sensitivity", "Local Adaptation", "Global Standards"],
      delay: 0.2
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge approaches and creative solutions for complex challenges.",
      features: ["Creative Solutions", "Technology Integration", "Process Innovation"],
      delay: 0.3
    }
  ];

  const industries = [
    { name: "Technology", icon: Zap, color: "from-blue-500 to-purple-600" },
    { name: "Healthcare", icon: Heart, color: "from-purple-500 to-pink-600" },
    { name: "Finance", icon: Shield, color: "from-pink-500 to-blue-600" },
    { name: "Education", icon: Users, color: "from-blue-500 to-purple-600" },
    { name: "Manufacturing", icon: Target, color: "from-purple-500 to-pink-600" },
    { name: "Retail", icon: Globe, color: "from-pink-500 to-blue-600" }
  ];

  return (
    <section ref={sectionRef} className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-slate-50 to-slate-100/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 -left-28 w-56 h-56 border border-blue-200/25 rounded-full floating-element" />
        <div className="absolute top-1/3 -right-24 w-40 h-40 border border-purple-200/35 rounded-lg floating-element" />
        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 border border-pink-200/45 rounded-full floating-element" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-blue-200/30 rounded-lg floating-element" />
        <div className="absolute top-1/2 left-1/4 w-28 h-28 border border-purple-200/40 rounded-full floating-element" />
        <div className="absolute top-1/3 right-1/3 w-36 h-36 border border-slate-200/35 rounded-lg floating-element" />
        
        {/* Gradient orbs with parallax */}
        <div className="absolute top-1/4 -left-40 w-72 h-72 bg-gradient-to-br from-blue-100/20 to-purple-100/15 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute bottom-1/4 -right-40 w-72 h-72 bg-gradient-to-br from-purple-100/20 to-pink-100/15 rounded-full blur-3xl gradient-orb parallax-bg" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-50/15 to-purple-50/15 rounded-full blur-3xl parallax-bg" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #64748b 1px, transparent 0)`,
            backgroundSize: '55px 55px'
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
              <span className="text-xs sm:text-sm lg:text-base leading-tight">Our Foundation</span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            style={{ y, opacity }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Values &{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pillars
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            The principles that guide our work and the foundations that support our success in transforming workplaces.
          </motion.p>
        </motion.div>

        {/* Enhanced Core Values */}
        <motion.div
          ref={valuesRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="border border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform bg-white/90 backdrop-blur-sm overflow-hidden group-hover:border-slate-300 h-full">
                <CardContent className="p-8 relative">
                  {/* Animated background pattern on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-white shadow-lg mx-auto mb-6 group-hover:shadow-xl transition-all duration-300"
                    >
                      <value.icon className="w-8 h-8 rotating-icon" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{value.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Foundational Pillars */}
        <motion.div
          ref={pillarsRef}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="grid lg:grid-cols-3 gap-8 mb-24"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <Card className="border border-slate-200 shadow-2xl hover:shadow-3xl transition-all duration-500 transform bg-white/90 backdrop-blur-sm overflow-hidden group-hover:border-slate-300 h-full">
                <CardContent className="p-8 relative">
                  {/* Animated background pattern on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-slate-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      variants={iconVariants}
                      className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300"
                    >
                      <pillar.icon className="w-10 h-10 rotating-icon" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                    <p className="text-slate-600 text-base leading-relaxed mb-6">{pillar.description}</p>
                    
                    {/* Feature tags */}
                    <div className="flex flex-wrap gap-2">
                      {pillar.features.map((feature, featureIndex) => (
                        <span
                          key={featureIndex}
                          className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full border border-slate-200"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Industry Experience */}
        <motion.div
          ref={industriesRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Industry Experience
            </h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              We've successfully transformed workplaces across diverse industries, adapting our expertise to meet unique challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover="hover"
                className="group"
              >
                <Card className="border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-300 transform bg-white/80 backdrop-blur-sm overflow-hidden group-hover:border-slate-300">
                  <CardContent className="p-6 relative">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50/30 to-slate-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${industry.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                        <industry.icon className="w-6 h-6" />
                      </div>
                      <span className="text-slate-700 font-semibold group-hover:text-slate-900 transition-colors duration-300">
                        {industry.name}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Why Choose Us */}
        <motion.div
          ref={whyChooseRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
                backgroundSize: '35px 35px'
              }} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full flex items-center justify-center"
                >
                  <Award className="w-8 h-8 text-white" />
                </motion.div>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-6">
                Why Organizations Choose Us
              </h3>
              <p className="text-slate-300 text-lg mb-8 max-w-3xl mx-auto">
                Our proven track record, deep expertise, and commitment to excellence make us the trusted partner 
                for organizations seeking meaningful workplace transformation.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 text-center">
                {[
                  { number: "500+", label: "Organizations Transformed" },
                  { number: "98%", label: "Client Satisfaction" },
                  { number: "24/7", label: "Expert Support" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-slate-300 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesPillarsSection; 