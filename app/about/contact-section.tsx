"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Calendar, MapPin } from "lucide-react";
import { contactInfo } from "./about-data";

const ContactSection = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const scaleIn = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.5 }
  };

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-blue-100/40 to-violet-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-violet-100/40 to-pink-100/40 rounded-full blur-3xl" />
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
            <Badge className="bg-gradient-to-r from-violet-100 via-blue-100 to-cyan-100 text-blue-700 px-8 py-4 text-sm font-semibold rounded-full border-0 shadow-lg">
              <MessageCircle className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Let's Start{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              The Conversation
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            Ready to transform your workplace? We're here to guide you through every step 
            of your compliance and culture transformation journey.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white text-center overflow-hidden relative">
                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-violet-500 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <info.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {info.type}
                  </h3>

                  {/* Value */}
                  <div className="mb-4">
                    <p className="text-lg font-semibold text-gray-800 mb-2">
                      {info.value}
                    </p>
                    <p className="text-gray-600">
                      {info.description}
                    </p>
                  </div>

                  {/* Response Time */}
                  {info.responseTime && (
                    <div className="mb-4">
                      <Badge className="bg-green-100 text-green-700 px-4 py-2 text-sm font-medium rounded-full">
                        <Clock className="w-4 h-4 mr-2" />
                        {info.responseTime}
                      </Badge>
                    </div>
                  )}

                  {/* Availability */}
                  <div className="text-sm text-gray-500 mb-4">
                    {info.availability}
                  </div>

                  {/* Preferred For */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Best for:</h4>
                    <div className="space-y-1">
                      {info.preferredFor.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-xs text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform group-hover:-translate-y-1"
                  >
                    {info.type === 'Email' ? 'Send Email' : 
                     info.type === 'Phone' ? 'Call Now' : 
                     'Get Directions'}
                  </Button>
                </CardContent>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="border-0 shadow-2xl bg-white">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  Schedule a Free Consultation
                </h3>
                <p className="text-xl text-gray-600">
                  Let's discuss your specific needs and how we can help transform your workplace.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Consultation Options */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">Consultation Options:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-medium text-gray-900">30-min Discovery Call</div>
                        <div className="text-sm text-gray-600">Understand your needs and challenges</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-violet-50 rounded-xl border border-violet-100">
                      <MapPin className="w-5 h-5 text-violet-600" />
                      <div>
                        <div className="font-medium text-gray-900">On-site Assessment</div>
                        <div className="text-sm text-gray-600">Comprehensive workplace evaluation</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                      <MessageCircle className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-medium text-gray-900">Workshop Preview</div>
                        <div className="text-sm text-gray-600">Experience our training methodology</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* What to Expect */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">What to Expect:</h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <div>
                        <div className="font-medium text-gray-900">Current State Analysis</div>
                        <div className="text-sm text-gray-600">We'll assess your current compliance status and culture</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <div>
                        <div className="font-medium text-gray-900">Customized Recommendations</div>
                        <div className="text-sm text-gray-600">Tailored solutions for your specific industry and size</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <div>
                        <div className="font-medium text-gray-900">Implementation Roadmap</div>
                        <div className="text-sm text-gray-600">Clear timeline and milestones for transformation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white px-12 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <Calendar className="w-5 h-5 mr-3" />
                  Schedule Free Consultation
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  No commitment required • Usually scheduled within 24 hours
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;