"use client"

import React, { useState, useEffect, useRef } from "react"
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
  const [showNavbar, setShowNavbar] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 10)
      if (window.innerWidth >= 1024) return // Only mobile
      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        setShowNavbar(false)
        if (isMenuOpen) setIsMenuOpen(false)
      } else {
        setShowNavbar(true)
      }
      lastScrollY.current = currentScrollY
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMenuOpen])

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg transition-all duration-300 ${scrolled ? 'shadow-2xl backdrop-blur-2xl' : ''}`}
      style={{ willChange: 'transform' }}
    >
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
              item.name !== "Expertise" ? (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-base font-medium group transition-colors duration-200 ${
                    pathname === item.href ? "text-black" : "text-gray-700 hover:text-black"
                  }${item.name === "Connect" ? " smile-cursor-trigger" : ""}`}
                >
                  {item.name}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-black transition-all duration-300 w-0 group-hover:w-full ${
                      pathname === item.href ? "w-full" : ""
                    }`}
                    style={{ borderRadius: 2 }}
                  ></span>
                </Link>
              ) : null
            ))}

            {/* Expertise Dropdown */}
            <div className="relative expertise-dropdown">
              <button
                onClick={() => setIsExpertiseOpen(!isExpertiseOpen)}
                className={`flex items-center space-x-1 text-gray-700 hover:text-black font-medium transition-colors duration-200 px-3 py-2 ${
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
                    className="fixed left-0 top-[calc(100%+1rem)] w-screen bg-gradient-to-br from-white via-gray-50 to-slate-100 border border-gray-200 rounded-2xl shadow-2xl p-12 z-50"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                      {expertiseSubmenu.map((category, idx) => (
                        <div key={idx} className="space-y-5 px-2">
                          <h3 className="font-bold text-base text-gray-900 border-b-2 border-gray-200 pb-3 mb-3 tracking-wide">
                            {category.title}
                          </h3>
                          <ul className="space-y-2">
                            {category.items.map((item, itemIdx) => (
                              <li key={itemIdx}>
                                <Link
                                  href="/services"
                                  className="block text-base text-gray-700 hover:text-white hover:bg-gray-900 rounded-lg transition-all duration-200 px-4 py-2 font-semibold shadow-sm hover:shadow-lg"
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-10 pt-8 border-t border-gray-200 text-center">
                      <Link
                        href="/services"
                        className="inline-block text-lg font-bold text-gray-900 hover:text-white hover:bg-gray-900 transition-all duration-200 px-6 py-3 rounded-xl shadow-md"
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
              className="lg:hidden fixed top-20 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50"
              style={{ maxHeight: 'calc(100dvh - 5rem)', overflowY: 'auto' }}
            >
              {/* Mobile Menu with accessible sub-tabs */}
              <div className="space-y-4 px-4 py-6" style={{ maxHeight: 'calc(100dvh - 5rem)', overflowY: 'auto' }}>
                {navItems.map((item) => (
                  item.name !== "Expertise" ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-xl font-semibold py-3 px-2 rounded-lg transition-colors duration-200 ${
                        pathname === item.href ? "text-black bg-gray-100" : "text-gray-700 hover:text-black hover:bg-gray-50"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ) : null
                ))}

                {/* Expertise as a main tab with sub-tabs */}
                <details className="w-full" open>
                  <summary className="text-lg font-bold text-gray-800 py-2 cursor-pointer flex items-center justify-between">
                    Expertise
                    <ChevronDown className="w-5 h-5 ml-2" />
                  </summary>
                  <div className="pl-2 space-y-3 mt-2">
                    {expertiseSubmenu.map((category, idx) => (
                      <details key={idx} className="mb-2 group" open>
                        <summary className="flex items-center justify-between text-base font-semibold text-gray-900 py-2 px-2 rounded-lg bg-gray-50 group-open:bg-gray-100 cursor-pointer transition-all">
                          {category.title}
                          <ChevronDown className="w-4 h-4 ml-2 transition-transform group-open:rotate-180" />
                        </summary>
                        <ul className="pl-4 py-2 space-y-1">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx}>
                              <Link
                                href="/services"
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm text-gray-600 hover:text-black py-1 rounded-md transition-colors"
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ))}
                  </div>
                </details>

                <div className="pt-6">
                  <Button className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-xl text-lg font-bold">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
