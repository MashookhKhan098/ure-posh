"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Calendar,
  MessageCircle,
  Users,
  Shield,
  Target,
  Sparkles,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-12, 12, -12],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const benefits = [
  {
    icon: Shield,
    title: "Complete Compliance",
    description: "100% POSH compliance with ongoing legal support.",
  },
  {
    icon: Users,
    title: "Engaged Workforce",
    description: "Boost retention with safer, happier teams.",
  },
  {
    icon: Target,
    title: "Trackable Impact",
    description: "Measure your transformation with analytics.",
  },
  {
    icon: Sparkles,
    title: "Cultural Growth",
    description: "Foster inclusivity & trust across teams.",
  },
];

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          className="absolute top-10 left-10 w-80 h-80 bg-gray-500/20 blur-3xl rounded-full"
        />
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-gray-400/10 blur-3xl rounded-full"
        />
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          style={{ animationDelay: "3s" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-8 mb-20"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-bold leading-tight tracking-tight"
          >
            Empower Your <span className="text-gray-300">Workplace Culture</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Join 500+ organizations building trust, safety, and accountability 
            with our all-in-one compliance & culture framework.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="text-base opacity-70 max-w-2xl mx-auto"
          >
            Begin your journey today with a free strategy consultation.
          </motion.div>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 text-center hover:bg-white/20 transition-all duration-300"
            >
              <div className="w-14 h-14 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <benefit.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-sm text-white/80 leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-white text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg flex items-center shadow-2xl transition-all duration-500 hover:shadow-3xl"
          >
            <Calendar className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
            Get Started
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-400 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center hover:bg-white hover:text-gray-700 transition-all duration-500 bg-transparent backdrop-blur-md"
          >
            <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
            Schedule Free Consultation
          </motion.button>
        </motion.div>

        {/* Trust Elements */}
        <motion.div variants={fadeInUp} className="text-center space-y-6 text-white/90">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Compliance Guarantee</div>
                <div className="text-xs opacity-80">Or your money back</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">24/7 Expert Support</div>
                <div className="text-xs opacity-80">Always available</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Proven Results</div>
                <div className="text-xs opacity-80">99.2% success rate</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
