"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown, Heart } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import ExpertiseDropdown from "@/components/ui/dropdown-menu"

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

  // Add smiley cursor effect
  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = `
      .smiley-cursor {
        cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23FFD700' stroke='%23FFA500' stroke-width='2'/%3E%3Ccircle cx='12' cy='12' r='2' fill='%23000'/%3E%3Ccircle cx='20' cy='12' r='2' fill='%23000'/%3E%3Cpath d='M10 20 Q16 24 22 20' stroke='%23000' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E") 16 16, auto;
      }
    `
    document.head.appendChild(style)
    return () => { document.head.removeChild(style) }
  }, [])

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow transition-all duration-300 ${scrolled ? "shadow-md" : "shadow"}`}
      style={{ willChange: 'transform' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center h-20">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent tracking-tight">UREPOSH</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium px-2 py-1 transition-colors duration-200 ${pathname === item.href ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
            >
              {item.name}
            </Link>
          ))}
          <ExpertiseDropdown />
          {navItems.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium px-2 py-1 transition-colors duration-200 ${pathname === item.href ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}${item.name === "Connect" ? " smiley-cursor" : ""}`}
            >
              {item.name === "Connect" && (
                <span className="mr-1 text-3xl">☺</span>
              )}
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:block">
          <Link href="/contact" className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-pink-600 hover:to-rose-600 transition-all duration-200">
            Get Started
          </Link>
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
            <div className="space-y-4 px-4 py-6" style={{ maxHeight: 'calc(100dvh - 5rem)', overflowY: 'auto' }}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-xl font-semibold py-3 px-2 rounded-lg transition-colors duration-200 ${
                    pathname === item.href ? "text-black bg-gray-100" : "text-gray-700 hover:text-black hover:bg-gray-50"
                  } ${item.name === "☺Connect" ? "smiley-cursor" : ""}`}
                >
                  {item.name === "Connect" && (
                    <span className="mr-1 text-3xl">☺</span>
                  )}
                  {item.name}
                </Link>
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
    </motion.nav>
  )
}