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
  Heart,
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
      ease: "easeInOut" as const,
    },
  },
};

const CTASection = () => {
  return (
    <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white text-gray-900">
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          className="absolute top-10 left-10 w-80 h-80 bg-blue-200/20 blur-3xl rounded-full"
        />
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          style={{ animationDelay: "1.5s" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-blue-300/10 blur-3xl rounded-full"
        />
        <motion.div
          initial="initial"
          animate="animate"
          variants={floatingAnimation}
          style={{ animationDelay: "3s" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/5 rounded-full blur-3xl"
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
            Connect with <span className="text-blue-600">Us</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed font-light"
          >
            Join us in our mission to empower children and create lasting change across India.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="text-base opacity-70 max-w-2xl mx-auto"
          >
            Every contribution makes a difference in a child's life.
          </motion.div>
        </motion.div>

        {/* Call-to-Action Buttons */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center shadow-2xl transition-all duration-500 hover:shadow-3xl"
          >
            <Heart className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
            Donate Now
            <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" />
            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group border-2 border-blue-600 text-blue-600 px-10 py-5 rounded-2xl font-bold text-lg flex items-center hover:bg-blue-600 hover:text-white transition-all duration-500 bg-transparent backdrop-blur-md"
          >
            <MessageCircle className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
            Get Involved
          </motion.button>
        </motion.div>

        {/* Trust Elements */}
        <motion.div variants={fadeInUp} className="text-center space-y-6 text-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Transparency</div>
                <div className="text-xs opacity-80">Full accountability</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Community Impact</div>
                <div className="text-xs opacity-80">10,000+ children helped</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold">Proven Results</div>
                <div className="text-xs opacity-80">20+ years of service</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          variants={fadeInUp}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-lg">
            <p className="text-sm text-gray-600 mb-4">
              In special consultative status with the United Nations Economic and Social Council
            </p>
            <p className="text-xs text-gray-500">
              2025 © Children's Hope India • Children's Hope India is a Registered 501 (c)(3) Charity.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
