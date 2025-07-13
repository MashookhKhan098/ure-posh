"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Shield, Users, ArrowRight } from "lucide-react";

const MissionVisionSection = () => {
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

  const mission = {
    title: "Our Mission",
    description: "To create workplaces where every individual feels safe, respected, and empowered to reach their full potential through comprehensive compliance solutions and cultural transformation.",
    icon: Target,
    goals: [
      "Eliminate workplace harassment through proactive prevention",
      "Build inclusive cultures that celebrate diversity",
      "Ensure 100% legal compliance across all organizations",
      "Empower employees with knowledge and confidence"
    ],
    impact: "500+ organizations transformed, 75,000+ lives impacted"
  };

  const vision = {
    title: "Our Vision",
    description: "A world where every workplace is a sanctuary of respect, dignity, and growth - where safety is not just a policy, but a lived reality for every individual.",
    icon: Eye,
    aspirations: [
      "Zero tolerance for workplace harassment",
      "Universal access to safe work environments",
      "Cultural transformation at scale",
      "Leadership in workplace safety innovation"
    ],
    future: "Leading the global movement for workplace safety and inclusion"
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-gray-100/40 to-gray-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-gray-200/40 to-gray-100/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black px-8 py-4 text-sm font-semibold rounded-full border border-gray-300 shadow-lg">
              <Heart className="w-4 h-4 mr-2" />
              Mission & Vision
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Our{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Purpose
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed"
          >
            Driving change through clear mission and bold vision to create workplaces 
            where everyone thrives.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12"
        >
          {/* Mission Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-500" />
              
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <mission.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-black">
                  {mission.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-black text-lg leading-relaxed text-center">
                  {mission.description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-black text-lg">Our Goals:</h4>
                  <div className="space-y-3">
                    {mission.goals.map((goal, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-black text-sm leading-relaxed">{goal}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-black text-center">{mission.impact}</p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-gray-50 group-hover:border-gray-400 text-black border-gray-300 hover:text-gray-700 transition-all duration-300"
                >
                  Learn More About Our Mission
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
              />
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-500" />
              
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <vision.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-black">
                  {vision.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-black text-lg leading-relaxed text-center">
                  {vision.description}
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-semibold text-black text-lg">Our Aspirations:</h4>
                  <div className="space-y-3">
                    {vision.aspirations.map((aspiration, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-gray-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-black text-sm leading-relaxed">{aspiration}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <p className="text-sm font-semibold text-black text-center">{vision.future}</p>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-gray-50 group-hover:border-gray-400 text-black border-gray-300 hover:text-gray-700 transition-all duration-300"
                >
                  Explore Our Vision
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>

              {/* Hover Effect Overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
              />
            </Card>
          </motion.div>
        </motion.div>

        {/* Impact Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Driving Change Together
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, value: "100%", label: "Compliance Rate", desc: "Legal adherence across all clients" },
                { icon: Users, value: "500+", label: "Organizations", desc: "Transformed workplaces" },
                { icon: Heart, value: "75K+", label: "Lives Impacted", desc: "Through our programs" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <div className="text-sm opacity-90">{stat.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection; 