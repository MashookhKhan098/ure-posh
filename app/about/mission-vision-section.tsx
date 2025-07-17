"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Shield, Users, ArrowRight, Sparkles } from "lucide-react";

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
    impact: "500+ organizations transformed, 75,000+ lives impacted",
    color: "from-blue-600 to-blue-500"
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
    future: "Leading the global movement for workplace safety and inclusion",
    color: "from-purple-600 to-purple-500"
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-16"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 text-sm font-semibold rounded-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <Sparkles className="w-4 h-4 mr-2" />
              Mission & Vision
            </Badge>
          </motion.div>
          
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Purpose</span> Drives Us
          </motion.h2>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            We're committed to creating workplaces where everyone thrives through our clear mission and bold vision for the future.
          </motion.p>
        </motion.div>

        {/* Mission & Vision Cards - Improved Design */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-8"
        >
          {/* Mission Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="text-center pb-6 pt-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${mission.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <mission.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {mission.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-10">
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  {mission.description}
                </p>
                
                <div className="space-y-4 bg-white/80 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${mission.color}`} />
                    Key Goals
                  </h4>
                  <ul className="space-y-3">
                    {mission.goals.map((goal, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${mission.color}`}></div>
                        <span className="text-gray-700">{goal}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-500 text-center">
                    <span className="font-semibold text-blue-600">{mission.impact}</span>
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className={`w-full mt-4 border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300 group-hover:shadow-sm`}
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full overflow-hidden group bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="text-center pb-6 pt-10">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${vision.color} flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <vision.icon className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {vision.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-10">
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  {vision.description}
                </p>
                
                <div className="space-y-4 bg-white/80 p-6 rounded-lg border border-gray-100">
                  <h4 className="font-semibold text-gray-900 text-lg flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${vision.color}`} />
                    Core Aspirations
                  </h4>
                  <ul className="space-y-3">
                    {vision.aspirations.map((aspiration, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 bg-gradient-to-r ${vision.color}`}></div>
                        <span className="text-gray-700">{aspiration}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <p className="text-sm font-medium text-gray-500 text-center">
                    <span className="font-semibold text-purple-600">{vision.future}</span>
                  </p>
                </div>

                <Button 
                  variant="outline" 
                  className={`w-full mt-4 border-gray-300 text-gray-700 hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all duration-300 group-hover:shadow-sm`}
                >
                  Explore Vision
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Driving Change Together Section (Unchanged from your good version) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 15 + i * 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute w-40 h-40 rounded-full bg-white"
                  style={{
                    left: `${10 + i * 10}%`,
                    top: `${10 + i * 5}%`
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Driving <span className="text-yellow-300">Change</span> Together
                </h3>
                <p className="text-lg text-blue-100">
                  We measure our success by the positive impact we create in workplaces worldwide. 
                  Join us in building safer, more inclusive environments for all.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  { 
                    icon: Shield, 
                    value: "100%", 
                    label: "Compliance Rate", 
                    desc: "Legal adherence across all client organizations",
                    color: "bg-blue-400"
                  },
                  { 
                    icon: Users, 
                    value: "500+", 
                    label: "Organizations", 
                    desc: "Transformed workplaces worldwide",
                    color: "bg-purple-400"
                  },
                  { 
                    icon: Heart, 
                    value: "75K+", 
                    label: "Lives Impacted", 
                    desc: "Through our training and programs",
                    color: "bg-pink-400"
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center mb-4 mx-auto shadow-lg`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-4xl font-bold mb-2 text-center">{stat.value}</div>
                    <div className="text-xl font-semibold mb-2 text-center">{stat.label}</div>
                    <div className="text-sm text-blue-100 text-center">{stat.desc}</div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button 
                  className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Join Our Movement
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection;