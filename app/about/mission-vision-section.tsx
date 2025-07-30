"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Eye, Heart, Shield, Users, ArrowRight, BookOpen, Utensils, Stethoscope, Brain, GraduationCap } from "lucide-react";

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
    title: "Mission",
    description: "Children's Hope India lifts children from poverty to prosperity by nurturing the whole child, providing education, nutrition, medical care and career building.",
    icon: Target,
  };

  const vision = {
    title: "Vision",
    description: "Build a better future for our children using the cradle to career approach.",
    icon: Eye,
  };

  const values = [
    "Transparency and accountability",
    "Value our donors",
    "Value our partners", 
    "Teamwork and collaboration",
    "Value our staff and volunteers",
    "Work with humility and respect"
  ];

  const impactStats = [
    {
      category: "Education",
      stats: [
        { number: "4000+", label: "Total Students" },
        { number: "1800+", label: "Formal Students" },
        { number: "60%", label: "Girls" },
        { number: "23,00+", label: "Non-formal Students" },
        { number: "40%", label: "Boys" }
      ]
    },
    {
      category: "Career building",
      stats: [
        { number: "150+", label: "Number of College Scholarships Provided" },
        { number: "80", label: "Students Served in a Vocational Program" }
      ]
    },
    {
      category: "nutrition",
      stats: [
        { number: "420,000+", label: "Meals and Snacks" }
      ]
    },
    {
      category: "Medical care",
      stats: [
        { number: "19,000+", label: "Vision Saving Surgeries and Treatments" },
        { number: "20,000+", label: "Medical Check Ups and Treatments" }
      ]
    },
    {
      category: "Mental health",
      stats: [
        { number: "100%", label: "Schools Providing Recreational Activities" },
        { number: "10000", label: "Counselling Hours" }
      ]
    }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-blue-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-blue-200/40 to-blue-100/40 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Impact Section */}
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
            Our Impact: Empowering Lives
          </motion.h2>
        </motion.div>

        {/* Impact Statistics Grid */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {impactStats.map((category, index) => (
            <motion.div
              key={category.category}
              variants={fadeInUp}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 border border-blue-200"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-6 text-center capitalize">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-700 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Vision */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-12 mb-20"
        >
          {/* Mission Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" />
              
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <mission.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {mission.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  {mission.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-blue-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden h-full">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500" />
              
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <vision.icon className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  {vision.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed text-center">
                  {vision.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6"
        >
          <motion.h3 
            variants={fadeInUp}
            className="text-3xl font-bold text-gray-900"
          >
            Values
          </motion.h3>
          <motion.div 
            variants={fadeInUp}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto"
          >
            {values.map((value, index) => (
              <div key={index} className="text-gray-700 font-medium">
                • {value}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionVisionSection; 