"use client"

import Link from "next/link"
import { Heart, Globe } from "lucide-react"
import { motion } from "framer-motion"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900/20 to-slate-900/20"></div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-5"></div>

      {/* Floating elements */}
      <motion.div
        animate={{ rotate: -360, scale: [1, 1.1, 1] }}
        transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border border-gray-300/20 rounded-full"
      ></motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-gray-600 via-slate-600 to-zinc-600 rounded-2xl flex items-center justify-center shadow-xl">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <div>
                <span className="text-3xl font-bold">UREPOSH</span>
                <p className="text-slate-400 text-sm">Transforming Workplaces <br /> Empowering Lives</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              We're dedicated to creating workplaces where every individual feels valued, respected, and empowered to
              contribute their best. Through innovative solutions and expert guidance, we help organizations build
              cultures of inclusion, safety, and legal compliance that drive sustainable business success.
            </p>
            <div className="flex space-x-4">
              {["facebook", "twitter", "linkedin", "instagram", "youtube"].map((social, index) => (
                <motion.div
                  key={social}
                  whileHover={{ scale: 1.2, y: -3 }}
                  className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-gray-500 hover:to-slate-500 transition-all duration-300 cursor-pointer group"
                >
                  <div className="w-6 h-6 bg-slate-400 group-hover:bg-white rounded transition-colors"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
            >
              <h3 className="font-bold mb-8 text-xl text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-slate-400 hover:text-gray-400 transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-slate-800 mt-20 pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-8">
              <p className="text-slate-400 text-lg">&copy; 2024 Ureposh. All rights reserved.</p>
              <div className="flex space-x-8 text-base">
                <Link href="#" className="text-slate-400 hover:text-gray-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-slate-400 hover:text-gray-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="text-slate-400 hover:text-gray-400 transition-colors">
                  Cookie Policy
                </Link>
                <Link href="#" className="text-slate-400 hover:text-gray-400 transition-colors">
                  Compliance Statement
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-slate-400">
              <Globe className="h-5 w-5" />
              <span>Proudly serving organizations across India and beyond</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 