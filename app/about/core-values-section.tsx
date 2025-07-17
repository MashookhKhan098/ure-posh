"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Shield,
  Zap,
  Heart,
  Target,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const CoreValuesSection = () => {
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

  const values = [
    {
      title: "Inclusion as Foundation",
      description:
        "We approach every partnership understanding that inclusion isn't optional—it's the cornerstone of thriving organizations. Our methodology ensures authentic representation and belonging.",
      icon: Users,
      stats: "98% satisfaction rate",
      deliverables: [
        "Comprehensive diversity assessment and gap analysis",
        "Customized inclusion roadmaps for every organization",
        "Continuous monitoring and improvement frameworks",
        "Intersectional approach to identity and belonging",
      ],
    },
    {
      title: "Safety Without Compromise",
      description:
        "Every workplace should be a sanctuary of respect and dignity. We don't just implement policies—we cultivate cultures where safety is lived, not just documented.",
      icon: Shield,
      stats: "Zero tolerance success",
      deliverables: [
        "Proactive risk identification and mitigation strategies",
        "Trauma-informed investigation and support processes",
        "24/7 confidential reporting mechanisms",
        "Holistic support systems for all stakeholders",
      ],
    },
    {
      title: "Innovation in Tradition",
      description:
        "We revolutionize compliance by making it meaningful, engaging, and transformative. Traditional training becomes immersive experiences that create lasting behavioral change.",
      icon: Zap,
      stats: "300% engagement increase",
      deliverables: [
        "Gamified learning experiences with real-world scenarios",
        "Virtual reality training for immersive understanding",
        "AI-powered personalization for maximum impact",
        "Microlearning modules for sustained retention",
      ],
    },
    {
      title: "Diversity as Power",
      description:
        "We honor the full spectrum of human experience and identity. Our approach recognizes that true strength comes from authentic diversity across all dimensions of identity.",
      icon: Heart,
      stats: "40+ identity dimensions",
      deliverables: [
        "Intersectional lens in all program development",
        "Culturally responsive training methodologies",
        "Accessibility-first design principles",
        "Multi-generational and multi-cultural perspectives",
      ],
    },
    {
      title: "Impact Over Activity",
      description:
        "We measure success not by hours trained or policies created, but by cultural transformation and sustained behavioral change that creates lasting organizational impact.",
      icon: Target,
      stats: "85% culture transformation",
      deliverables: [
        "Comprehensive pre and post-implementation analytics",
        "Long-term culture tracking and measurement",
        "ROI documentation for all interventions",
        "Continuous improvement based on data insights",
      ],
    },
  ];

  const [resetAnimation, setResetAnimation] = useState(0);

  const handleCenterClick = () => {
    setResetAnimation((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="space-y-8"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-yellow-400 text-black px-6 py-2 text-sm font-semibold rounded-full border border-yellow-500">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Our Principles
                </Badge>
              </motion.div>

              <motion.h2
                variants={fadeInUp}
                className="text-4xl md:text-5xl font-bold text-white leading-tight"
              >
                The Principles That{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
                  Drive Us
                </span>
              </motion.h2>

              <motion.div
                variants={fadeInUp}
                className="space-y-6 text-lg text-gray-300 leading-relaxed"
              >
                <p>
                  These aren't just words on a wall. They're the living,
                  breathing principles that guide every decision, every
                  interaction, and every solution we create.
                </p>
                <p>
                  We are here to reinvent how inclusion creates competitive
                  advantage - helping our clients lead, innovate and grow in
                  today's complex operating environment.
                </p>
              </motion.div>

              <motion.div variants={fadeInUp}>
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                  Learn More About Our Approach
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Visual Circles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative flex items-center justify-center"
            >
           <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg aspect-square overflow-visible">


                {values.map((value, index) => {
                  const angle = index * 72 - 90;
                  const radius = 180;
                  const x = Math.cos((angle * Math.PI) / 180) * radius;
                  const y = Math.sin((angle * Math.PI) / 180) * radius;

                  return (
                    <motion.div
                      key={`circle-${index}-${resetAnimation}`}
                      className="absolute group cursor-pointer"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      animate={{
                        x: x,
                        y: y,
                        transition: { type: "spring", stiffness: 100 },
                      }}
                    >
                      <motion.div
                        className="relative"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                      >
                        <div className="relative w-32 h-32">
                          {[...Array(24)].map((_, i) => (
                            <motion.div
                              key={`line-${index}-${i}`}
                              className="absolute bg-yellow-400"
                              style={{
                                width: "2px",
                                height: "20px",
                                left: "50%",
                                top: "50%",
                                transformOrigin: "bottom center",
                                transform: `translate(-50%, -100%) rotate(${
                                  i * 15
                                }deg) translateY(-46px)`,
                              }}
                              animate={{
                                opacity: [0.4, 1, 0.4],
                                scale: [0.8, 1.2, 0.8],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.05,
                                ease: "easeInOut",
                              }}
                            />
                          ))}

                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 rounded-full border-2 border-yellow-400 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <value.icon className="w-8 h-8 text-yellow-400 mb-2" />
                            <div className="text-xs font-bold text-white text-center leading-tight px-2">
                              {value.title}
                            </div>
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          whileHover={{ opacity: 1, y: 0, scale: 1 }}
                          className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-3 rounded-lg text-sm font-medium shadow-xl z-20 max-w-xs text-center border border-gray-200"
                        >
                          {value.description}
                          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rotate-45 border-l border-t border-gray-200"></div>
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  );
                })}

                {/* Center Button */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  onClick={handleCenterClick}
                >
                  <div className="w-20 h-20 rounded-full bg-yellow-400 shadow-xl flex items-center justify-center border-4 border-white">
                    <Sparkles className="w-8 h-8 text-black" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Values Details Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="mt-24 space-y-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={`detail-${index}`}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-700"
                >
                  <div className="w-14 h-14 rounded-xl bg-yellow-400 flex items-center justify-center mb-4 shadow-lg">
                    <value.icon className="w-7 h-7 text-black" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {value.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-4">
                    {value.description}
                  </p>

                  <div className="space-y-3 mb-4">
                    <h4 className="font-semibold text-white flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-yellow-400" />
                      How we deliver:
                    </h4>
                    <ul className="space-y-2">
                      {value.deliverables.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          <span className="text-sm text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    {value.stats}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Collective Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-24"
          >
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white relative overflow-hidden border border-gray-700">
              <div className="absolute inset-0 opacity-10">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"
                />
              </div>

              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-8 text-center">
                  Our <span className="text-yellow-400">Collective</span> Impact
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {[
                    { icon: Users, value: "98%", label: "Satisfaction Rate" },
                    { icon: Shield, value: "100%", label: "Zero Tolerance" },
                    { icon: Zap, value: "300%", label: "Engagement Increase" },
                    { icon: Heart, value: "40+", label: "Identity Dimensions" },
                    {
                      icon: Target,
                      value: "85%",
                      label: "Culture Transformation",
                    },
                  ].map((stat, index) => (
                    <motion.div
                      key={`impact-${index}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, y: -5 }}
                      className="text-center group cursor-pointer"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:bg-yellow-400/30 transition-all duration-300 border border-yellow-400/30 group-hover:border-yellow-400/50"
                      >
                        <stat.icon className="w-7 h-7 text-yellow-400 group-hover:text-yellow-300" />
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-2xl font-bold mb-1 group-hover:text-yellow-400 transition-colors"
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mt-12 text-center"
                >
                  <Button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                    See Case Studies
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CoreValuesSection;
