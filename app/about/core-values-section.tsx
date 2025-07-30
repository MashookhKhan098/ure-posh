"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, Zap, Heart, Target, Sparkles, ArrowRight, BookOpen, Monitor, Utensils, Brain, GraduationCap } from "lucide-react";

const CoreValuesSection = () => {
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

  const pillars = [
    {
      title: "Early Childhood Education",
      description: "Emphasis on play; hands-on learning; recognized learning partner; teacher trainings",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Digital Learning",
      description: "Smart board enabled classroom; learning devices",
      icon: Monitor,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Health and Nutrition",
      description: "Midday meal and/or snack; annual medical check up",
      icon: Utensils,
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Remedial Learning",
      description: "Online courses in Maths, Science, and English; recognised curriculum partner; teacher trainings",
      icon: GraduationCap,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Mental Health and Well-Being",
      description: "Weekly counseling from social worker; daily recreational activities and meditation",
      icon: Brain,
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Career Counseling",
      description: "Career counseling; access to internships; higher education scholarships",
      icon: Target,
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-blue-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-blue-100/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Our Approach: Six Foundational Pillars
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
          >
            Our impact is built upon six foundational pillars. At the heart of our work is the empowerment of children, parents, teachers, and families. These core elements guide and shape everything we do.
          </motion.p>
        </motion.div>

        {/* Pillars Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="p-8">
                  {/* Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${pillar.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <pillar.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                      {pillar.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${pillar.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-6">
              The most powerful gift we can give is the power of our presence...
            </h3>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We empower children to be the best version of themselves for a better today and brighter tomorrow.
            </p>
            <div className="mt-8">
              <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Every Child Matters
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;