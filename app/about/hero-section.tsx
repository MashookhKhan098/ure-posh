"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Download } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0a2540] to-[#1a365d] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold text-white leading-tight"
          >
            Where Humanity Meets Compliance
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-xl md:text-2xl text-gray-200 max-w-4xl mx-auto">
              Building safer, more inclusive workplaces through innovative training, 
              empathetic design, and measurable impact.
            </p>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              One conversation, one training session, one transformed culture at a time.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
          >
            <Button className="bg-white text-[#0a2540] hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg">
              <Play className="w-5 h-5 mr-3" />
              Watch Our Story
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-lg">
              <Download className="w-5 h-5 mr-3" />
              Download Profile
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;