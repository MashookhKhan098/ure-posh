"use client"

import Link from "next/link"
import { Heart, Globe, Mail, Phone, MapPin, ArrowRight, Shield, Linkedin, Twitter, Facebook, Instagram, Youtube } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900/20 to-slate-900/20"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-5"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 border border-blue-400/20 rounded-full"
        ></motion.div>
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute bottom-20 left-20 w-24 h-24 border border-purple-400/20 rounded-full"
        ></motion.div>
        <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">UREPOSH</span>
                  <p className="text-slate-400 text-sm font-medium">Transforming Workplaces <br /> Empowering Lives</p>
                </div>
              </div>
              
              <p className="text-slate-300 leading-relaxed text-base">
                We're dedicated to creating workplaces where every individual feels valued, respected, and empowered to
                contribute their best. Through innovative solutions and expert guidance, we help organizations build
                cultures of inclusion, safety, and legal compliance.
              </p>
              
              {/* Contact Info */}
              <div className="flex flex-wrap items-center gap-3 text-slate-300 text-xs">
                <div className="flex items-center space-x-1">
                  <Mail className="h-3 w-3 text-blue-400 flex-shrink-0" />
                  <span>contact@ureposh.com</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone className="h-3 w-3 text-purple-400 flex-shrink-0" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-3 w-3 text-pink-400 flex-shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Linkedin, color: "hover:bg-blue-600", bg: "bg-slate-800" },
                  { icon: Twitter, color: "hover:bg-sky-500", bg: "bg-slate-800" },
                  { icon: Facebook, color: "hover:bg-blue-600", bg: "bg-slate-800" },
                  { icon: Instagram, color: "hover:bg-pink-600", bg: "bg-slate-800" },
                  { icon: Youtube, color: "hover:bg-red-600", bg: "bg-slate-800" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -3 }}
                    className={`w-12 h-12 ${social.bg} ${social.color} rounded-xl flex items-center justify-center transition-all duration-300 cursor-pointer group`}
                  >
                    <social.icon className="h-5 w-5 text-slate-300 group-hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            {[
              {
                title: "Solutions",
                links: [
                  "POSH Policy Development",
                  "Internal Committee Setup", 
                  "Expert Training Programs",
                  "Investigation Support",
                  "Compliance Audits",
                  "Professional Certification",
                ],
              },
              {
                title: "Company",
                links: [
                  "About Ureposh",
                  "Our Mission & Values",
                  "Leadership Team", 
                  "Career Opportunities",
                  "Press & Media",
                  "Contact Us",
                ],
              },
              {
                title: "Resources",
                links: [
                  "Knowledge Center",
                  "Success Stories",
                  "Industry Reports",
                  "Legal Updates",
                  "Best Practice Guides",
                  "Resource Downloads",
                ],
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h3 className="font-bold text-lg text-white flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-slate-400 hover:text-white transition-all duration-300 text-sm hover:translate-x-2 inline-block group"
                      >
                        <span className="flex items-center space-x-2">
                          <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <span>{link}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>



          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-slate-700"
          >
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-slate-600/30">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 items-center">
                <div className="text-center lg:text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">Stay Updated</h3>
                  <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed">
                    Get the latest insights on workplace safety, compliance updates, and industry best practices.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-800 border border-slate-600 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
                  />
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <p className="text-slate-400 text-sm">&copy; {currentYear} Ureposh. All rights reserved.</p>
              <div className="flex space-x-8 text-sm">
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
                <Link href="#" className="text-slate-400 hover:text-white transition-colors">
                  Compliance Statement
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-slate-400">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-sm">Proudly serving organizations across India and beyond</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 