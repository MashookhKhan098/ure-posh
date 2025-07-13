"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Calendar, MapPin, Send, Download } from "lucide-react";
import { contactInfo } from "./about-data";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone } from "lucide-react";

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
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-gray-50/50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-gray-100/40 to-gray-200/40 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-gray-200/40 to-gray-100/40 rounded-full blur-2xl" />
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
              <MessageCircle className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Let's Start a{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Conversation
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed"
          >
            Ready to transform your workplace culture? We're here to listen, understand, 
            and create solutions that make a real difference.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <Card className="border border-gray-200 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold text-black">
                  Send us a message
                </CardTitle>
                <CardDescription className="text-gray-600">
                  We'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-black font-medium">First Name</Label>
                    <Input 
                      id="firstName" 
                      placeholder="John" 
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-black font-medium">Last Name</Label>
                    <Input 
                      id="lastName" 
                      placeholder="Doe" 
                      className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-black font-medium">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@company.com" 
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-black font-medium">Company</Label>
                  <Input 
                    id="company" 
                    placeholder="Your Company Name" 
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-black font-medium">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your workplace culture challenges and how we can help..." 
                    rows={6}
                    className="border-gray-300 focus:border-gray-500 focus:ring-gray-500 resize-none"
                  />
                </div>
                <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white py-6 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Other ways to reach us</h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-white/80 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-black text-lg mb-2">{info.type}</h4>
                    <p className="text-gray-600 mb-2">{info.value}</p>
                    <div className="space-y-1">
                      {info.description && <p className="text-black font-medium">{info.description}</p>}
                      {info.responseTime && (
                        <p className="text-black font-medium">
                          <Clock className="w-4 h-4" />
                          {info.responseTime}
                        </p>
                      )}
                      {info.availability && (
                        <p className="text-black font-medium">
                          {info.availability}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Office Locations */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-black">Our Offices</h3>
              
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-gray-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-black text-lg mb-2">{info.type}</h4>
                      <p className="text-gray-600 mb-2">{info.value}</p>
                      {info.description && (
                        <p className="text-black font-medium">{info.description}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Transform Your Workplace?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you create a safer, more inclusive workplace culture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Consultation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Download className="w-5 h-5 mr-2" />
                Download Resources
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;