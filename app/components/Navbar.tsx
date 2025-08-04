"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ChevronDown, Heart, Coffee } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

// Utility function to generate slugs
const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim()
}

// Expertise content with proper slugs and placeholders
const expertiseContent = {
  "gender-equality-compliance": {
    title: "Gender Equality Compliance",
    items: [
      { name: "POSH Compliance Initiation", slug: "posh-compliance-initiation", placeholder: "Establish comprehensive POSH compliance framework" },
      { name: "External Members from Renowned NGO", slug: "external-members-renowned-ngo", placeholder: "Expert external committee members" },
      { name: "Compliant Redressal", slug: "compliant-redressal", placeholder: "Effective complaint resolution system" },
      { name: "Complaint Handling Committee Redressal", slug: "complaint-handling-committee-redressal", placeholder: "Specialized committee for complaint management" },
      { name: "POSH & Workplace Harassment Compliance Reporting", slug: "posh-workplace-harassment-compliance-reporting", placeholder: "Comprehensive compliance reporting system" },
      { name: "Workplace Harassment & POSH Policy Disclosure", slug: "workplace-harassment-posh-policy-disclosure", placeholder: "Transparent policy disclosure framework" },
      { name: "POSH & Workplace Harassment Audits", slug: "posh-workplace-harassment-audits", placeholder: "Regular compliance audits and assessments" }
    ]
  },
  "posh-adaptability-training": {
    title: "POSH Adaptability and Training",
    items: [
      { name: "Respectful Workplace Training & Compliance", slug: "respectful-workplace-training-compliance", placeholder: "Comprehensive workplace respect training" },
      { name: "Compliance Training for Internal Committees & Workplace Panels", slug: "compliance-training-internal-committees-workplace-panels", placeholder: "Specialized training for internal committees" },
      { name: "Quarterly Mandatory Training", slug: "quarterly-mandatory-training", placeholder: "Regular mandatory compliance training" },
      { name: "Managers Level Training", slug: "managers-level-training", placeholder: "Leadership-focused compliance training" }
    ]
  },
  "organisation-well-being": {
    title: "Organisation Well-being",
    items: [
      { name: "Well Being Programmes", slug: "well-being-programmes", placeholder: "Comprehensive employee wellness programs" },
      { name: "Code of Conduct Training", slug: "code-of-conduct-training", placeholder: "Ethical workplace behavior training" },
      { name: "Mental Health Training & Counselling", slug: "mental-health-training-counselling", placeholder: "Mental health support and counseling services" }
    ]
  }
}

const expertiseServices = [
  "Public affairs & impact", "Crisis & issues", "Transactions & transformations",
  "Strategy & reputation", "Public relations & marketing", "Creative, design & content",
  "Insights & analytics", "Generative AI", "YTPR Advisory"
];

const expertiseSectorsCol1 = [
  "Health", "Food & beverage", "Financial services", "Government & public sector",
  "Mobility & transportation", "Technology"
];

const expertiseSectorsCol2 = [
  "Retail & CPG", "Lifestyle & leisure", "Media & entertainment", "Non-profit", "Energy", "Industry & manufacturing"
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false)
  const expertiseRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  const expertiseSubmenu = [
    {
      title: "Gender Equality Compliance",
      items: [
        "POSH Compliance Initiation", "External Members from Renowned NGO", "Compliant Redressal",
        "Complaint Handling Committee Redressal", "POSH & Workplace Harassment Compliance Reporting",
        "Workplace Harassment & POSH Policy Disclosure", "POSH & Workplace Harassment Audits"
      ]
    },
    {
      title: "POSH Adaptability and Training",
      items: [
        "Respectful Workplace Training & Compliance", "Compliance Training for Internal Committees & Workplace Panels",
        "Quarterly Mandatory Training", "Managers Level Training"
      ]
    },
    {
      title: "Organisation Well-being",
      items: [
        "Well Being Programmes", "Code of Conduct Training", "Mental Health Training & Counselling"
      ]
    }
  ]

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "People", href: "/people" },
    { name: "News Room", href: "/posts" },
    { name: "Connect", href: "/connect" },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpertiseOpen &&
        expertiseRef.current &&
        !(event.target as Element).closest(".expertise-dropdown-trigger") &&
        !(event.target as Element).closest(".expertise-dropdown-panel")
      ) {
        setIsExpertiseOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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

  // Listen for custom event to open expertise dropdown
  useEffect(() => {
    const handleOpenExpertiseDropdown = () => {
      setIsExpertiseOpen(true);
    };

    window.addEventListener('openExpertiseDropdown', handleOpenExpertiseDropdown);
    
    return () => {
      window.removeEventListener('openExpertiseDropdown', handleOpenExpertiseDropdown);
    };
  }, []);

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
                  <Link href="/" className="flex items-center h-8">
            <Image 
              src="/images/logo.jpg" 
              alt="UREPOSH Logo" 
              width={120} 
              height={120} 
              className="h-16 w-auto -mt-2"
              priority
            />
          </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1 ml-auto mr-4">
          {navItems.slice(0, 2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium px-2 py-1 transition-colors duration-200 ${pathname === item.href ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
            >
              {item.name}
            </Link>
          ))}
          {/* Expertise Dropdown Trigger */}
          <div className="relative" ref={expertiseRef}>
            <button
              className={`expertise-dropdown-trigger flex items-center gap-2 px-2 py-1 text-base font-medium transition-colors duration-200 ${isExpertiseOpen ? "text-pink-600" : "text-gray-700 hover:text-pink-600"}`}
              onClick={() => setIsExpertiseOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={isExpertiseOpen}
              type="button"
            >
              Expertise
              <ChevronDown className={`w-4 h-4 transition-transform ${isExpertiseOpen ? "rotate-180" : ""}`} />
            </button>
          </div>
          {/* End Expertise Dropdown */}
          {navItems.slice(2).map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium px-1 py-1 transition-colors duration-200 ${pathname === item.href ? "text-pink-600" : "text-gray-700 hover:text-pink-600"} ${item.name === "Connect" ? "smiley-cursor" : ""}`}
            >
              {item.name === "Connect" ? `☺ ${item.name}` : item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button - Removed Free Coffee */}

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Render dropdown as a direct child of nav for extreme left alignment */}
      {isExpertiseOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.18 }}
          className="expertise-dropdown-panel fixed left-0 mt-3 w-full bg-white shadow-2xl border-b border-gray-100 z-50"
        >
          <div className="max-w-7xl mx-auto px-8 py-6">
            <div className="grid grid-cols-4 gap-8">
              <div className="pr-6 border-r border-gray-200">
                <h2 className="text-xl font-bold text-slate-900 mb-2">
                  Expertise
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Advising and leading businesses and brands across an array of industries
                </p>
              </div>
              <div className="col-span-3">
                <div className="grid grid-cols-3 gap-8">
                  {Object.entries(expertiseContent).map(([key, category]) => (
                    <div key={key}>
                      <h3 className="text-sm font-semibold text-slate-900 mb-3 border-b border-gray-100 pb-2">
                        {category.title}
                      </h3>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link 
                              href={`/services/${item.slug}`} 
                              className="text-sm text-slate-600 hover:text-slate-900 hover:text-pink-600 transition-colors duration-200 block"
                              title={item.placeholder}
                              onClick={() => setIsExpertiseOpen(false)}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

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
                  } ${item.name === "Connect" ? "smiley-cursor" : ""}`}
                >
                  {item.name === "Connect" ? `:) ${item.name}` : item.name}
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
                              href={`/services/${generateSlug(item)}`}
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