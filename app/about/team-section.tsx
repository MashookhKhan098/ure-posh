"use client"

import React from 'react';
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail, Globe, Award, Users, Shield, Heart } from "lucide-react"
import Image from "next/image"
import { TeamMember } from './about-data';

interface TeamProps {
  teamMembers: TeamMember[];
}

const TeamSection: React.FC<TeamProps> = ({ teamMembers }) => {
  const stats = [
    { icon: Users, number: "500+", label: "Organizations Served" },
    { icon: Shield, number: "50,000+", label: "Employees Protected" },
    { icon: Award, number: "98%", label: "Client Satisfaction" },
    { icon: Heart, number: "24/7", label: "Support Available" }
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <Badge className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 text-blue-800 px-6 py-2 text-sm font-semibold rounded-full border border-blue-300 shadow-lg mb-6">
            <Users className="w-4 h-4 mr-2" />
            Our Team
          </Badge>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Expert Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our dedicated team of professionals brings together expertise in legal compliance, 
            organizational psychology, training, and technology to create safer, more inclusive workplaces.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-white/90 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-8">
                  <div className="text-center">
                    {/* Image */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gradient-to-br from-blue-500 to-purple-500 bg-gradient-to-br from-blue-500 to-purple-500">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Name and Role */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {member.name}
                    </h3>
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 text-sm font-semibold rounded-full mb-4">
                      {member.role}
                    </Badge>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                      {member.description}
                    </p>

                    {/* Expertise */}
                    <div className="space-y-2 mb-6">
                      <h4 className="text-sm font-semibold text-gray-900">Expertise:</h4>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-gray-300 text-gray-700">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-center space-x-3">
                      {member.linkedin && (
                        <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-full hover:bg-blue-50">
                          <Linkedin className="w-4 h-4 text-gray-600" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" className="w-8 h-8 p-0 rounded-full hover:bg-blue-50">
                        <Mail className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
