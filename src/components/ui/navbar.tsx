"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false)
  const pathname = usePathname()

  const expertiseSubmenu = [
    {
      title: "Compliance at ALL Work Place",
      items: [
        "POSH Compliance Initiation",
        "External Members from Renowned NGO",
        "Compliant Redressal",
        "Order Writing",
        "Annual Report",
        "Organisation Disclosure",
        "POSH Audit"
      ]
    },
    {
      title: "Trainings and Adaptability",
      items: [
        "POSH Training for Workforce",
        "POSH Training for IC Members",
        "Quarterly Mandatory Training",
        "Managers Level Training"
      ]
    },
    {
      title: "Remote Training (Cost Effective)",
      items: [
        "POSH Training for Workforce",
        "POSH Training for IC Members",
        "Managers Level Training"
      ]
    },
    {
      title: "Organisation Counselling and Well-being",
      items: [
        "Well Being Programmes",
        "Code of Conduct Training",
        "Mental Health Training",
        "Inclusion at Work Place",
        "LGBTQIA++ Inclusion"
      ]
    }
  ]

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "People", href: "/people" },
    { name: "Work", href: "/work" },
    { name: "News", href: "/news" },
    { name: "Connect", href: "/connect" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isExpertiseOpen && !(event.target as Element).closest('.expertise-dropdown')) {
        setIsExpertiseOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isExpertiseOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-gray-600 via-slate-600 to-zinc-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
              <Heart className="h-7 w-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-bold text-black group-hover:text-gray-700 transition-colors">
                UREPOSH
              </span>
              <p className="text-xs text-gray-600 font-medium">Transforming Workplaces</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-gray-700 hover:text-black font-medium transition-colors duration-200 relative group ${
                  pathname === item.href ? "text-black" : ""
                }`}
              >
                {item.name}
                {item.name === "Connect" && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
                )}
              </Link>
            ))}

            {/* Expertise Dropdown */}
            <div className="relative expertise-dropdown">
              <button
                onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
                className={`flex items-center space-x-1 text-gray-700 hover:text-black font-medium transition-colors duration-200 ${
                  pathname === "/services" ? "text-black" : ""
                }`}
              >
                <span>Expertise</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpertiseOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isExpertiseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-2xl shadow-2xl shadow-gray-500/20 p-6"
                  >
                    <div className="grid grid-cols-2 gap-6">
                      {expertiseSubmenu.map((category, index) => (
                        <div key={index} className="space-y-3">
                          <h3 className="font-semibold text-black text-sm border-b border-gray-200 pb-2">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <Link
                                  href="/services"
                                  className="text-xs text-gray-600 hover:text-black transition-colors duration-200 block py-1"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Link
                        href="/services"
                        className="text-sm font-medium text-black hover:text-gray-700 transition-colors duration-200"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200 py-6"
            >
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-lg font-medium transition-colors duration-200 ${
                      pathname === item.href ? "text-black" : "text-gray-700 hover:text-black"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Expertise Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-gray-700">Expertise</span>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                  <div className="pl-4 space-y-2">
                    {expertiseSubmenu.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <h4 className="font-medium text-black text-sm">{category.title}</h4>
                        <ul className="pl-4 space-y-1">
                          {category.items.slice(0, 3).map((item, itemIndex) => (
                            <li key={itemIndex}>
                              <Link
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm text-gray-600 hover:text-black transition-colors duration-200"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl">
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
