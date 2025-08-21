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
  "equality-compliance": {
    title: "Equality Compliance",
    items: [
      { name: "POSH Compliance Initiation", slug: "posh-compliance-initiation", placeholder: "Establish comprehensive POSH compliance framework" },
      { name: "External Members from Renowned NGO", slug: "external-members-renowned-ngo", placeholder: "Expert external committee members" },
      { name: "Compliant Redressal", slug: "compliant-redressal", placeholder: "Effective complaint resolution system" }
    ]
  },
  "disclosure-and-audit": {
    title: "Disclosure and Audit",
    items: [
      { name: "POSH Compliance Reporting", slug: "posh-workplace-harassment-compliance-reporting", placeholder: "Comprehensive compliance reporting system" },
      { name: "Poster and Policy Disclosure", slug: "poster-and-policy-discloser", placeholder: "Transparent policy and poster disclosure framework" },
      { name: "Safe Workplace Audit", slug: "posh-workplace-harassment-audits", placeholder: "Regular compliance audits and assessments" }
    ]
  },
  "posh-adaptability": {
    title: "POSH Adaptability",
    items: [
      { name: "Workplace Respect Training", slug: "respectful-workplace-training-compliance", placeholder: "Comprehensive workplace respect training" },
      { name: "Internal Committees Training", slug: "training-internal-committees-workplace-panels", placeholder: "Specialized training for internal committees" },
      { name: "Quarterly Mandatory Training", slug: "quarterly-mandatory-training", placeholder: "Regular mandatory compliance training" },
      { name: "Managers Level Training", slug: "managers-level-training", placeholder: "Leadership-focused compliance training" }
    ]
  },
  "organisation-well-being": {
    title: "Organisation Well-being",
    items: [
      { name: "Well Being Programmes", slug: "well-being-programmes", placeholder: "Comprehensive employee wellness programs" },
      { name: "Code of Conduct Training", slug: "code-of-conduct-training", placeholder: "Ethical workplace behavior training" },
      { name: "Mental Health Training", slug: "mental-health-training-counselling", placeholder: "Mental health support and counseling services" }
    ]
  },
  "diversity-and-inclusion": {
    title: "Diversity and Inclusion",
    items: [
      { name: "Diversity at Work Place", slug: "diversity-at-work-place", placeholder: "Creating inclusive workplace environments" },
      { name: "LGBTQIA++ Inclusion", slug: "lgbtqia-inclusion", placeholder: "Comprehensive LGBTQIA+ workplace inclusion" }
    ]
  }
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isExpertiseOpen, setIsExpertiseOpen] = useState(false)
  const expertiseRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const [showNavbar, setShowNavbar] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const lastScrollY = useRef(0)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "People", href: "/people" },
    { name: "News Room", href: "/posts" },
    { name: "Connect", href: "/connect" },
  ]

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

  // Close expertise on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      if (
        isExpertiseOpen &&
        !expertiseRef.current?.contains(target) &&
        !dropdownRef.current?.contains(target)
      ) {
        setIsExpertiseOpen(false)
      }
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsExpertiseOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isExpertiseOpen])

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
              className={`expertise-dropdown-trigger flex items-center gap-2 px-3 py-2 text-base font-medium transition-all duration-300 rounded-lg hover:bg-pink-50 hover:shadow-md ${
                isExpertiseOpen ? "text-pink-600 bg-pink-50 shadow-md" : "text-gray-700 hover:text-pink-600"
              }`}
              onClick={() => setIsExpertiseOpen((v) => !v)}
              aria-haspopup="true"
              aria-expanded={isExpertiseOpen}
              type="button"
            >
              Expertise
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpertiseOpen ? "rotate-180" : ""}`} />
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

        {/* CTA Button - Free Coffee */}
        <div className="hidden lg:flex items-center">
          <Button 
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group"
            asChild
          >
            <Link href="/connect">
              {/* Custom Coffee Cup with Filling Animation */}
              <div className="relative w-4 h-4">
                {/* Coffee Cup */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  {/* Cup Body - Main Container */}
                  <path d="M6 4h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor"/>
                  
                  {/* Cup Rim - Top Edge */}
                  <path d="M4 4h16v1.5c0 .8-.7 1.5-1.5 1.5h-13C5.7 7 5 6.3 5 5.5V4z" fill="currentColor" opacity="0.9"/>
                  
                  {/* Handle - Curved Handle */}
                  <path d="M18 8c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2V8z" fill="currentColor"/>
                  <path d="M20 6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z" fill="currentColor"/>
                  
                  {/* Saucer - Base Plate */}
                  <ellipse cx="12" cy="20" rx="10" ry="2" fill="currentColor" opacity="0.8"/>
                  
                  {/* Inner Cup - For Depth */}
                  <path d="M7 5h10c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1z" fill="currentColor" opacity="0.7"/>
                </svg>
                
                {/* Coffee Filling Animation (Pink) */}
                <div className="absolute bottom-1 left-1 right-1 bg-gradient-to-t from-pink-700 via-pink-500 to-pink-400 rounded-sm transition-all duration-700 ease-out group-hover:h-2.5 h-0 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-t from-pink-700 via-pink-500 to-pink-400 rounded-sm relative">
                    {/* Coffee Surface Effect */}
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 to-pink-200 rounded-t-sm opacity-80"></div>
                  </div>
                </div>
                
                {/* Steam Effect - Multiple Steam Lines */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex space-x-0.5">
                    <div className="w-0.5 h-1.5 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                    <div className="w-0.5 h-1 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
                    <div className="w-0.5 h-1.5 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
                  </div>
                </div>
                
                {/* Coffee Aroma Lines (Pink) */}
                <div className="absolute -top-0.5 -left-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="w-0.5 h-1 bg-pink-300/40 rounded-full animate-pulse" style={{animationDelay: '100ms'}}></div>
                </div>
                <div className="absolute -top-0.5 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="w-0.5 h-1 bg-pink-300/40 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                </div>
              </div>
              Free Coffee
            </Link>
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

      {/* Render dropdown as a direct child of nav for extreme left alignment */}
      {isExpertiseOpen && (
        <div ref={dropdownRef} className="absolute left-0 right-0 top-full mt-1 bg-white shadow-xl border border-gray-200 z-50 transition-all duration-300 hover:shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-8 px-4">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-8 lg:gap-12">
                {/* Expertise Header Column */}
                <div className="w-56 pr-6">
                  <h2 className="text-[22px] font-bold text-gray-900 mb-4 pr-2 transition-colors duration-300 hover:text-pink-600">Expertise</h2>
                  <p className="text-[12px] text-gray-600 leading-relaxed">
                    Consulting for Safe Workplace Emerging World's Leading Companies
                  </p>
                </div>
                
                {/* 5 Expertise Category Columns */}
                {Object.entries(expertiseContent).map(([key, category], index) => (
                  <div key={key} className={"border-r border-gray-100 last:border-r-0 w-64 pr-10 last:pr-0"}>
                    <h3 className={`mb-4 pb-3 border-b transition-all duration-300 ${
                      key === "posh-adaptability" 
                        ? "text-[16px] font-bold text-black border-gray-300 hover:text-black hover:border-gray-400" 
                        : "text-[14px] font-semibold text-gray-900 border-gray-200 hover:text-pink-600 hover:border-pink-300"
                    }`}>
                      {category.title}
                    </h3>
                    <div className="space-y-3">
                      {category.items.map((item, itemIdx) => (
                        <div key={itemIdx}>
                          <Link 
                            href={`/services/${item.slug}`} 
                            className={`group relative block py-2 px-3 rounded-lg transition-all duration-300 text-left w-full hover:shadow-lg hover:shadow-pink-100/50 flex items-center min-h-10 leading-snug whitespace-normal break-words ${
                              item.name.includes('Internal Committees') || item.name.includes('Quarterly Training') || item.name.includes('Workplace Respect')
                                ? 'text-[12px] font-medium text-gray-800 hover:text-pink-600 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 hover:scale-105 hover:-translate-y-0.5 border border-transparent hover:border-pink-200'
                                : 'text-[12px] text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:scale-105 hover:-translate-y-0.5 border border-transparent hover:border-gray-200'
                            }`}
                          >
                            <span className="relative z-10 block">{item.name}</span>
                            {/* Hover background effect */}
                            <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                              item.name.includes('Internal Committees') || item.name.includes('Quarterly Training') || item.name.includes('Workplace Respect')
                                ? 'bg-gradient-to-r from-pink-50 to-pink-100'
                                : 'bg-gradient-to-r from-gray-50 to-gray-100'
                            }`}></div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
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
                <summary className="text-xl font-bold text-gray-800 py-4 cursor-pointer flex items-center justify-between">
                  Expertise
                  <ChevronDown className="w-6 h-6 ml-2" />
                </summary>
                <div className="pl-6 space-y-5 mt-4">
                  {Object.entries(expertiseContent).map(([key, category], idx) => (
                    <details key={idx} className="mb-4 group" open>
                      <summary className="flex items-center justify-between text-lg font-semibold text-gray-900 py-4 px-4 rounded-lg bg-gray-50 group-open:bg-gray-100 cursor-pointer transition-all">
                        {category.title}
                        <ChevronDown className="w-5 h-5 ml-2 transition-transform group-open:rotate-180" />
                      </summary>
                      <ul className="pl-6 py-4 space-y-3">
                        {category.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={`/services/${item.slug}`}
                              className="block text-base text-gray-600 hover:text-black py-3 px-4 rounded-lg transition-all text-left w-full hover:bg-gray-100"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ))}
                </div>
              </details>

              <div className="pt-6 space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl text-lg font-bold flex items-center justify-center gap-2 group"
                  asChild
                >
                  <Link href="/connect" onClick={() => setIsMenuOpen(false)}>
                    {/* Custom Coffee Cup with Filling Animation */}
                    <div className="relative w-5 h-5">
                      {/* Coffee Cup */}
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                        {/* Cup Body - Main Container */}
                        <path d="M6 4h12c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H6c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="currentColor"/>
                        
                        {/* Cup Rim - Top Edge */}
                        <path d="M4 4h16v1.5c0 .8-.7 1.5-1.5 1.5h-13C5.7 7 5 6.3 5 5.5V4z" fill="currentColor" opacity="0.9"/>
                        
                        {/* Handle - Curved Handle */}
                        <path d="M18 8c0-1.1.9-2 2-2s2 .9 2 2v4c0 1.1-.9 2-2 2s-2-.9-2-2V8z" fill="currentColor"/>
                        <path d="M20 6c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2s2-.9 2-2V8c0-1.1-.9-2-2-2z" fill="currentColor"/>
                        
                        {/* Saucer - Base Plate */}
                        <ellipse cx="12" cy="20" rx="10" ry="2" fill="currentColor" opacity="0.8"/>
                        
                        {/* Inner Cup - For Depth */}
                        <path d="M7 5h10c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1z" fill="currentColor" opacity="0.7"/>
                      </svg>
                      
                      {/* Coffee Filling Animation (Pink) */}
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-gradient-to-t from-pink-700 via-pink-500 to-pink-400 rounded-sm transition-all duration-700 ease-out group-hover:h-3 h-0 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-t from-pink-700 via-pink-500 to-pink-400 rounded-sm relative">
                          {/* Coffee Surface Effect */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-300 to-pink-200 rounded-t-sm opacity-80"></div>
                        </div>
                      </div>
                      
                      {/* Steam Effect - Multiple Steam Lines */}
                      <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="flex space-x-0.5">
                          <div className="w-0.5 h-2 bg-white/70 rounded-full animate-pulse" style={{animationDelay: '0ms'}}></div>
                          <div className="w-0.5 h-1.5 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '200ms'}}></div>
                          <div className="w-0.5 h-2 bg-white/50 rounded-full animate-pulse" style={{animationDelay: '400ms'}}></div>
                        </div>
                      </div>
                      
                      {/* Coffee Aroma Lines (Pink) */}
                      <div className="absolute -top-1 -left-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="w-0.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse" style={{animationDelay: '100ms'}}></div>
                      </div>
                      <div className="absolute -top-1 -right-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div className="w-0.5 h-1.5 bg-pink-300/40 rounded-full animate-pulse" style={{animationDelay: '300ms'}}></div>
                      </div>
                    </div>
                    Free Coffee
                  </Link>
                </Button>
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
