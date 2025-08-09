"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Shield, Lightbulb, Target, Sparkles, TrendingUp, Award, Star } from "lucide-react";

const ImpactSection: React.FC = () => {
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

  const coreValues = [
    {
      title: "Inclusion as Foundation",
      description: "We approach every partnership understanding that inclusion isn't optional—it's the cornerstone of thriving organizations.",
      icon: Users,
      color: "from-pink-500 to-pink-600",
      stats: "98% satisfaction rate"
    },
    {
      title: "Safety Without Compromise",
      description: "Every workplace should be a sanctuary of respect and dignity. We cultivate cultures where safety is lived, not just documented.",
      icon: Shield,
      color: "from-pink-500 to-pink-600",
      stats: "Zero tolerance success"
    },
    {
      title: "Innovation in Tradition",
      description: "We revolutionize compliance by making it meaningful, engaging, and transformative. Traditional training becomes immersive experiences.",
      icon: Lightbulb,
      color: "from-pink-500 to-pink-600",
      stats: "300% engagement increase"
    },
    {
      title: "Diversity as Power",
      description: "We honor the full spectrum of human experience and identity. True strength comes from authentic diversity across all dimensions.",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600",
      stats: "40+ identity dimensions"
    },
    {
      title: "Impact Over Activity",
      description: "We measure success not by hours trained or policies created, but by cultural transformation and sustained behavioral change.",
      icon: Target,
      color: "from-pink-500 to-pink-600",
      stats: "85% culture transformation"
    },
  ];

  const achievements = [
    {
      icon: Award,
      number: "500+",
      label: "Organizations Transformed",
      description: "From startups to Fortune 500 companies"
    },
    {
      icon: Users,
      number: "75,000+",
      label: "Professionals Trained",
      description: "Creating safer workplaces"
    },
    {
      icon: Star,
      number: "99.2%",
      label: "Client Satisfaction",
      description: "Consistently exceeding expectations"
    },
    {
      icon: Shield,
      number: "24/7",
      label: "Expert Support",
      description: "Always available when you need us"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50/50 to-pink-50/30 relative overflow-hidden">
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
              <TrendingUp className="w-5 h-5 mr-2" />
              Our Impact
            </Badge>
          </motion.div>
          <motion.h2 
            variants={slideInRight}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
          >
            Our Impact & Values
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light"
          >
            These fundamental principles guide our approach to workplace transformation and compliance excellence.
          </motion.p>
        </motion.div>

        {/* Enhanced Core Values Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-24"
        >
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div key={index} variants={fadeInUp} className="group relative">
                <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm overflow-hidden">
                  <CardContent className="p-10">
                    {/* Enhanced Icon */}
                    <div className="flex items-center gap-6 mb-8">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                        {value.title}
                      </h3>
                    </div>
                    {/* Enhanced Description */}
                    <p className="text-gray-700 leading-relaxed text-base font-light mb-6">
                      {value.description}
                    </p>
                    {/* Stats */}
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-sm font-semibold text-pink-600">
                        {value.stats}
                      </div>
                    </div>
                  </CardContent>
                  {/* Enhanced Hover Effect Border */}
                  <motion.div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Enhanced Achievements Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <achievement.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-3">{achievement.number}</div>
              <div className="text-lg font-semibold text-black mb-2">{achievement.label}</div>
              <div className="text-sm text-gray-500 font-light">{achievement.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection; 