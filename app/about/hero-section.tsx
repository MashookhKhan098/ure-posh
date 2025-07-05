"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Play, Download, Building2 } from "lucide-react";
import { companyStats, trustedCompanies } from "./about-data";

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

  const scaleIn = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100/60 to-violet-100/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-violet-100/60 to-pink-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-50/30 to-violet-50/30 rounded-full blur-3xl" />
        
        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 right-20 w-4 h-4 bg-blue-400 rounded-full"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 left-20 w-6 h-6 bg-violet-400 rounded-full"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 right-40 w-3 h-3 bg-pink-400 rounded-full"
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-violet-100 via-blue-100 to-cyan-100 text-blue-700 px-8 py-4 text-sm font-semibold rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <Heart className="w-4 h-4 mr-2 animate-pulse" />
              Transforming Workplaces Since 2019
            </Badge>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight"
          >
            Where{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent">
                Humanity
              </span>
              <motion.span
                className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-blue-200 via-violet-200 to-purple-200 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              />
            </span>{" "}
            <br className="hidden md:block" />
            Meets{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Compliance
              </span>
              <motion.span
                className="absolute bottom-2 left-0 w-full h-4 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 rounded-full -z-10"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              />
            </span>
          </motion.h1>

          <motion.div
            variants={fadeInUp}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl lg:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Building safer, more inclusive workplaces through{" "}
              <span className="font-semibold text-gray-800">innovative training</span>,{" "}
              <span className="font-semibold text-gray-800">empathetic design</span>, and{" "}
              <span className="font-semibold text-gray-800">measurable impact</span>.
            </p>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              One conversation, one training session, one transformed culture at a time.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button className="group bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 hover:from-blue-700 hover:via-violet-700 hover:to-purple-700 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <Play className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform duration-300" />
              Watch Our Impact Story
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-400 via-violet-400 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                whileHover={{ scale: 1.05 }}
              />
            </Button>
            <Button variant="outline" className="group border-2 border-blue-600 text-blue-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-violet-50 px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105">
              <Download className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform duration-300" />
              Download Company Profile
            </Button>
          </motion.div>

          {/* Enhanced Stats */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto pt-20"
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                className="text-center group relative"
                whileHover={{ scale: 1.05 }}
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
                  <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">
                    {stat.number}
                  </div>
                  <div className="text-gray-700 font-semibold text-lg mb-2">{stat.label}</div>
                  <div className="text-gray-500 text-sm leading-relaxed">{stat.description}</div>
                  {stat.growth && (
                    <Badge className="mt-3 bg-green-100 text-green-700 text-xs px-3 py-1">
                      {stat.growth}
                    </Badge>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Trusted Companies */}
          <motion.div variants={fadeInUp} className="pt-20">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-8">
              Trusted by leading organizations across India
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 max-w-6xl mx-auto">
              {trustedCompanies.map((company, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  className="group relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex flex-col items-center gap-3 px-4 py-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:bg-white/80 hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-lg group-hover:rotate-6 transition-transform duration-300">
                      {company.logo}
                    </div>
                    <div className="text-center">
                      <div className="text-gray-700 font-medium text-sm leading-tight">{company.name}</div>
                      <div className="text-gray-400 text-xs mt-1">{company.industry}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;