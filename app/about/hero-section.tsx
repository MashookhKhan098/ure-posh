"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Coffee, Users, BookOpen, Shield, Award } from "lucide-react";
import Image from "next/image";

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

  return (
    <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-gradient-to-br from-blue-100/60 to-blue-200/40 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 bg-gradient-to-br from-blue-200/60 to-blue-100/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center space-y-8"
        >
          {/* Main Hero Message */}
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-tight mb-6">
              A Cup Of Chai A Day
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 font-medium mb-4">
              Helps a child everyday
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              *$250 covers the educational expenses for 1 child for 1 year - that is equivalent to one cup of chai a day.
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <Heart className="w-6 h-6 mr-3" />
              Donate for Happier Childhoods
            </Button>
          </motion.div>

          {/* Secondary Messages */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Educate a child.
              <br />
              Empower A child.
            </h2>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Educate a child
            </Button>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              ONE child can change the world
            </h2>
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Listen to Our Voices
            </Button>
          </motion.div>

          {/* Impact Statistics */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto pt-16"
          >
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-lg font-semibold text-gray-700">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-lg font-semibold text-gray-700">Children's hopes come true</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">2+</div>
              <div className="text-lg font-semibold text-gray-700">Years of service</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;