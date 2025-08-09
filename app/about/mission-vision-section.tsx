"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Sparkles, ArrowRight } from "lucide-react";

interface MissionVisionProps {
  mission: { title: string; description: string; icon: any };
  vision: { title: string; description: string; icon: any };
}

const iconMap = {
  target: Target,
  eye: Eye,
};

const MissionVisionSection: React.FC<MissionVisionProps> = ({ mission, vision }) => {
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

  const MissionIcon = iconMap[mission.icon];
  const VisionIcon = iconMap[vision.icon];

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
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 text-sm font-semibold shadow-lg border border-pink-200">
              <Sparkles className="w-5 h-5 mr-2" />
              Our Purpose
            </div>
          </motion.div>
          <motion.h2 
            variants={slideInRight}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-black leading-tight"
          >
            Our Mission & Vision
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
          >
            Driving workplace transformation through innovative compliance solutions and culture building
          </motion.p>
        </motion.div>

        {/* Enhanced Mission & Vision Cards */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16"
        >
          {/* Mission Card */}
          <motion.div variants={slideInLeft}>
            <Card className="group border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700" />
              
              <CardHeader className="text-center pb-8 pt-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  {MissionIcon && <MissionIcon className="w-10 h-10 text-white" />}
                </div>
                <CardTitle className="text-3xl font-bold text-black">
                  {mission.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 px-12 pb-12">
                <p className="text-gray-700 text-xl leading-relaxed text-center font-light">
                  {mission.description}
                </p>
                <div className="flex justify-center">
                  <Button className="group bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={slideInRight}>
            <Card className="group border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700" />
              
              <CardHeader className="text-center pb-8 pt-12">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  {VisionIcon && <VisionIcon className="w-10 h-10 text-white" />}
                </div>
                <CardTitle className="text-3xl font-bold text-black">
                  {vision.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 px-12 pb-12">
                <p className="text-gray-700 text-xl leading-relaxed text-center font-light">
                  {vision.description}
                </p>
                <div className="flex justify-center">
                  <Button className="group bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection; 