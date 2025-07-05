"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  Heart,
  Award,
  Users,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Footer = () => {
  const [email, setEmail] = useState("");

  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
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

  const quickLinks = [
    { name: "Our Services", href: "/services" },
    { name: "Training Programs", href: "/training" },
    { name: "Resources", href: "/resources" },
    { name: "Blog", href: "/blog" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
    { name: "Data Security", href: "/security" }
  ];

  const companyStats = [
    { icon: Users, value: "500+", label: "Organizations" },
    { icon: Award, value: "99.2%", label: "Satisfaction" },
    { icon: Shield, value: "24/7", label: "Support" },
    { icon: Heart, value: "75K+", label: "Trained" }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid lg:grid-cols-4 md:grid-cols-2 gap-12"
          >
            {/* Company Info */}
            <motion.div variants={fadeInUp} className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-2xl">U</span>
                </div>
                <div>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Ureposh
                  </span>
                  <div className="text-sm text-gray-400">Transforming Workplaces Since 2019</div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed text-lg max-w-lg">
                We're more than just a compliance company. We're your strategic partner in 
                creating workplaces where every individual feels safe, respected, and empowered 
                to reach their full potential.
              </p>

              {/* Company Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                {companyStats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center group"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-600 transition-colors duration-300">
                      <stat.icon className="w-6 h-6 text-blue-400 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                  { icon: Instagram, href: "#", label: "Instagram" }
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="border-gray-700 text-gray-400 hover:bg-gradient-to-r hover:from-blue-600 hover:to-violet-600 hover:text-white hover:border-transparent transition-all duration-300 rounded-xl"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-8 text-white">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-2 transform inline-flex items-center group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={fadeInUp}>
              <h3 className="text-xl font-semibold mb-8 text-white">Stay Updated</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Get the latest insights on workplace safety, compliance updates, 
                and culture transformation strategies.
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 bg-gray-800 border-gray-700 text-white placeholder-gray-400 rounded-xl focus:border-blue-500 focus:ring-blue-500 py-4"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                >
                  Subscribe to Newsletter
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </form>
              
              {/* Contact Info */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>hello@ureposh.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-gray-400 text-lg">
                  © {new Date().getFullYear()} Ureposh. All rights reserved.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  Empowering organizations to create safer, more inclusive workplaces.
                </p>
              </div>
              
              <div className="flex flex-wrap justify-center lg:justify-end gap-6">
                {legalLinks.map((link, index) => (
                  <Link 
                    key={index}
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Additional Footer Info */}
            <motion.div
              variants={fadeInUp}
              className="mt-8 pt-8 border-t border-gray-800 text-center"
            >
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-500 text-sm">
                <span>🏆 Winner of Learning Innovation Award 2023</span>
                <span className="hidden md:block">•</span>
                <span>🌟 Rated #1 POSH Compliance Partner</span>
                <span className="hidden md:block">•</span>
                <span>🚀 Trusted by 500+ Organizations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;