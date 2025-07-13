"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Shield, Zap, Heart, Target, ArrowRight, CheckCircle, Sparkles } from "lucide-react";

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

  const values = [
    {
      title: "Inclusion as Foundation",
      description: "We approach every partnership understanding that inclusion isn't optional—it's the cornerstone of thriving organizations. Our methodology ensures authentic representation and belonging.",
      icon: Users,
      stats: "98% satisfaction rate",
      deliverables: [
        "Comprehensive diversity assessment and gap analysis",
        "Customized inclusion roadmaps for every organization",
        "Continuous monitoring and improvement frameworks",
        "Intersectional approach to identity and belonging"
      ]
    },
    {
      title: "Safety Without Compromise",
      description: "Every workplace should be a sanctuary of respect and dignity. We don't just implement policies—we cultivate cultures where safety is lived, not just documented.",
      icon: Shield,
      stats: "Zero tolerance success",
      deliverables: [
        "Proactive risk identification and mitigation strategies",
        "Trauma-informed investigation and support processes",
        "24/7 confidential reporting mechanisms",
        "Holistic support systems for all stakeholders"
      ]
    },
    {
      title: "Innovation in Tradition",
      description: "We revolutionize compliance by making it meaningful, engaging, and transformative. Traditional training becomes immersive experiences that create lasting behavioral change.",
      icon: Zap,
      stats: "300% engagement increase",
      deliverables: [
        "Gamified learning experiences with real-world scenarios",
        "Virtual reality training for immersive understanding",
        "AI-powered personalization for maximum impact",
        "Microlearning modules for sustained retention"
      ]
    },
    {
      title: "Diversity as Power",
      description: "We honor the full spectrum of human experience and identity. Our approach recognizes that true strength comes from authentic diversity across all dimensions of identity.",
      icon: Heart,
      stats: "40+ identity dimensions",
      deliverables: [
        "Intersectional lens in all program development",
        "Culturally responsive training methodologies",
        "Accessibility-first design principles",
        "Multi-generational and multi-cultural perspectives"
      ]
    },
    {
      title: "Impact Over Activity",
      description: "We measure success not by hours trained or policies created, but by cultural transformation and sustained behavioral change that creates lasting organizational impact.",
      icon: Target,
      stats: "85% culture transformation",
      deliverables: [
        "Comprehensive pre and post-implementation analytics",
        "Long-term culture tracking and measurement",
        "ROI documentation for all interventions",
        "Continuous improvement based on data insights"
      ]
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-gray-200/40 to-gray-300/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-1/4 -right-32 w-80 h-80 bg-gradient-to-br from-gray-300/40 to-gray-200/40 rounded-full blur-3xl"
        />
        
        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-8 h-8 border-2 border-gray-300/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [360, 270, 180, 90, 0],
            scale: [1.1, 1, 1.1]
          }}
          transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-6 h-6 border-2 border-gray-400/30 transform rotate-45"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black px-8 py-3 text-sm font-semibold rounded-full border border-gray-300 shadow-lg relative overflow-hidden">
              <motion.div
                animate={{
                  x: [-100, 100],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
              />
              <Sparkles className="w-4 h-4 mr-2" />
              Our Principles
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            The Principles That{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Drive Us
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-black max-w-4xl mx-auto leading-relaxed"
          >
            These aren't just words on a wall. They're the living, breathing principles that guide every decision, 
            every interaction, and every solution we create.
          </motion.p>
        </motion.div>

        {/* Innovative Interactive Design */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group relative"
            >
              <div className="relative overflow-hidden bg-white/90 backdrop-blur-sm border border-gray-200 rounded-3xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, from-gray-500 to-gray-600)",
                      "linear-gradient(135deg, from-gray-400 to-gray-500)",
                      "linear-gradient(45deg, from-gray-500 to-gray-600)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                />
                
                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0]
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut"
                      }}
                      className="absolute w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`
                      }}
                    />
                  ))}
                </div>

                <div className="relative z-10 p-8">
                  {/* Header with Icon and Stats */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-6">
                      <motion.div
                        whileHover={{ 
                          scale: 1.1, 
                          rotate: 5,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                        }}
                        className="relative"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                          <value.icon className="w-8 h-8 text-white" />
                        </div>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                          className="absolute -inset-2 bg-gradient-to-br from-gray-400 to-gray-500 rounded-2xl opacity-20 blur-sm"
                        />
                      </motion.div>
                      
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-black leading-tight mb-2 group-hover:text-gray-700 transition-colors duration-300">
                          {value.title}
                        </h3>
                        <p className="text-black leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex-shrink-0"
                    >
                      <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 text-sm font-semibold border-0 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {value.stats}
                      </Badge>
                    </motion.div>
                  </div>

                  {/* Deliverables Section with Animation */}
                  <div className="border-t border-gray-200 pt-6">
                    <div className="flex items-start gap-6">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-black text-lg mb-4 flex items-center">
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-4 h-4 mr-2"
                          >
                            ⚡
                          </motion.div>
                          How we deliver:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {value.deliverables.map((item, itemIndex) => (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                              className="flex items-start gap-3 group/item"
                            >
                              <motion.div
                                whileHover={{ scale: 1.2, rotate: 180 }}
                                className="w-2 h-2 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full mt-2 flex-shrink-0 group-hover/item:bg-gradient-to-r group-hover/item:from-gray-600 group-hover/item:to-gray-700 transition-all duration-300"
                              />
                              <span className="text-sm text-black leading-relaxed group-hover/item:text-gray-700 transition-colors duration-300">
                                {item}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                      
                      <motion.div
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex-shrink-0"
                      >
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-2 border-gray-300 text-black hover:bg-gradient-to-r hover:from-gray-500 hover:to-gray-600 hover:text-white hover:border-transparent transition-all duration-300 text-sm font-semibold"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <motion.div
                  animate={{
                    background: [
                      "linear-gradient(45deg, from-gray-500 to-gray-600)",
                      "linear-gradient(135deg, from-gray-400 to-gray-500)",
                      "linear-gradient(45deg, from-gray-500 to-gray-600)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-8 text-white relative overflow-hidden">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
              />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Our Collective Impact
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {[
                  { icon: Users, value: "98%", label: "Satisfaction Rate" },
                  { icon: Shield, value: "100%", label: "Zero Tolerance" },
                  { icon: Zap, value: "300%", label: "Engagement Increase" },
                  { icon: Heart, value: "40+", label: "Identity Dimensions" },
                  { icon: Target, value: "85%", label: "Culture Transformation" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/30 transition-all duration-300"
                    >
                      <stat.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold mb-1 group-hover:text-white/90 transition-colors"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;