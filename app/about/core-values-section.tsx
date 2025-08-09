"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, Lightbulb, Target, Sparkles } from "lucide-react";

const CoreValuesSection: React.FC = () => {
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

  const coreValues = [
    {
      title: "Inclusion as Foundation",
      description: "We approach every partnership understanding that inclusion isn't optional—it's the cornerstone of thriving organizations.",
      icon: Users,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Safety Without Compromise",
      description: "Every workplace should be a sanctuary of respect and dignity. We cultivate cultures where safety is lived, not just documented.",
      icon: Shield,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Innovation in Tradition",
      description: "We revolutionize compliance by making it meaningful, engaging, and transformative. Traditional training becomes immersive experiences.",
      icon: Lightbulb,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Diversity as Power",
      description: "We honor the full spectrum of human experience and identity. True strength comes from authentic diversity across all dimensions.",
      icon: Sparkles,
      color: "from-pink-500 to-pink-600",
    },
    {
      title: "Impact Over Activity",
      description: "We measure success not by hours trained or policies created, but by cultural transformation and sustained behavioral change.",
      icon: Target,
      color: "from-pink-500 to-pink-600",
    },
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-pink-100/30 to-pink-200/20 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-pink-200/30 to-pink-100/20 rounded-full blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-black leading-tight"
          >
            Our Core Values
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            These fundamental principles guide our approach to workplace transformation and compliance excellence.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {coreValues.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div key={index} variants={fadeInUp} className="group relative">
                <div className="relative overflow-hidden bg-white border border-gray-200 rounded-xl hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="p-8">
                    {/* Icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${value.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <h3 className="text-lg font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                        {value.title}
                      </h3>
                    </div>
                    {/* Description */}
                    <p className="text-gray-700 leading-relaxed text-sm">
                      {value.description}
                    </p>
                  </div>
                  {/* Hover Effect Border */}
                  <motion.div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${value.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-pink-600 to-pink-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to Transform Your Workplace?
            </h3>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
              Join hundreds of organizations that have already transformed their workplace culture with our innovative compliance solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-pink-600 hover:bg-gray-50 px-6 py-3 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Target className="w-4 h-4 mr-2" />
                Get Started Today
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-600 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300">
                Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;