"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Users, Target, ArrowRight, Star, Award, TrendingUp } from "lucide-react";

const HeroSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
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

  return (
    <section className="relative pt-32 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-pink-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-pink-300/40 to-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-pink-100/20 to-pink-200/20 rounded-full blur-2xl" />
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-pink-100/30 to-pink-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-200/30 to-pink-100/20 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-16"
        >
          {/* Enhanced Main Hero Message */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <motion.div 
              variants={slideInLeft}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 text-sm font-semibold mb-8 shadow-lg border border-pink-200"
            >
              <Shield className="w-5 h-5 mr-3" />
              Workplace Compliance & Culture
            </motion.div>
            
            <div className="space-y-6">
              <motion.h1 
                variants={slideInRight}
                className="text-6xl md:text-7xl lg:text-8xl font-bold text-black leading-tight"
              >
                Transforming
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-700 block">
                  Workplace Culture
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp}
                className="text-2xl md:text-3xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light"
              >
                We help organizations build safe, inclusive, and high-performing workplaces 
                through innovative compliance training and culture transformation.
              </motion.p>
            </div>
            
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-12"
            >
              <Button className="group bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 text-white px-10 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                <Target className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                Get Compliant Today
                <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="border-3 border-black text-black hover:bg-black hover:text-white px-10 py-6 text-xl font-semibold rounded-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg">
                <Users className="w-6 h-6 mr-3" />
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Key Statistics */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-20"
          >
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-3">500+</div>
              <div className="text-xl font-semibold text-black mb-2">Organizations</div>
              <div className="text-sm text-gray-500">Transformed across India</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-3">75,000+</div>
              <div className="text-xl font-semibold text-black mb-2">Professionals</div>
              <div className="text-sm text-gray-500">Trained and empowered</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -10, scale: 1.05 }}
              className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl md:text-5xl font-bold text-pink-600 mb-3">99.2%</div>
              <div className="text-xl font-semibold text-black mb-2">Satisfaction</div>
              <div className="text-sm text-gray-500">Client satisfaction rate</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;