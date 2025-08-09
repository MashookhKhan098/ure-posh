"use client";

import React from 'react';
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, Award, Shield, Target, Sparkles, ArrowRight } from "lucide-react";
import { TeamMember } from './about-data';

interface PeopleProps {
  teamMembers: TeamMember[];
}

const PeopleSection: React.FC<PeopleProps> = ({ teamMembers }) => {
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
              <Users className="w-4 h-4 mr-2" />
              Our People
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Meet the{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Team
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed"
          >
            Our diverse team of experts brings together decades of experience in compliance, 
            psychology, technology, and organizational development to transform workplaces.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <Card className="border border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/80 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-gray-500 to-gray-600 transition-all duration-500" />
                
                <CardHeader className="text-center pb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors duration-300">
                    {member.name}
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 text-sm font-semibold rounded-full shadow-md">
                    {member.role}
                  </Badge>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-black text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-black text-sm">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="text-xs bg-gray-100 text-black px-2 py-1 rounded-full border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-black">{member.stats}</p>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gray-50 group-hover:border-gray-400 text-black border-gray-300 hover:text-gray-700 transition-all duration-300"
                  >
                    View Profile
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>

                {/* Hover Effect Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-gray-500 to-gray-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-8 text-center">
              Our Collective Impact
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, value: "15+", label: "Years Experience" },
                { icon: Heart, value: "500+", label: "Organizations Served" },
                { icon: Award, value: "99.2%", label: "Success Rate" },
                { icon: Shield, value: "75K+", label: "Lives Transformed" }
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
                  <div className="text-3xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm opacity-90">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PeopleSection; 