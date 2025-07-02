"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Heart, Menu, X, ArrowRight } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  className?: string
}

export function Navbar({ className = "" }: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Culture", href: "/culture" },
    { label: "News Room", href: "/news-room" },
    { label: "Our People", href: "/team" },
    { label: "Contact", href: "/contact" }
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/95 backdrop-blur-2xl border-b border-violet-200/30 sticky top-0 z-50 shadow-lg shadow-violet-500/5 h-24"
    >
      {/* Gradient Background */}
      <div className="h-24 bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50/30 backdrop-blur-xl" />
      
      {/* Main Navigation Container */}
      <div className="bg-white/95 backdrop-blur-2xl border-b border-violet-200/30 shadow-lg shadow-violet-500/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo Section */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-violet-600 via-purple-600 to-rose-600 rounded-2xl flex items-center justify-center shadow-xl shadow-violet-500/25">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-rose-600 bg-clip-text text-transparent">
                  UREPOSH
                </span>
                <p className="text-xs text-slate-600 font-medium tracking-wide">
                  Empowering Inclusive Workplaces
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <Link
                    href={item.href}
                    className={`px-4 py-3 text-base font-medium transition-all duration-300 ${
                      pathname === item.href
                        ? "text-pink-600 font-semibold bg-pink-50/50 rounded-lg"
                        : "text-gray-800 hover:text-pink-600 hover:bg-pink-50/20 rounded-lg"
                    }`}
                  >
                    {item.label}
                  </Link>
                  <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ${
                    pathname === item.href
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}></span>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-700 hover:text-violet-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            {/* Get Started Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
              <Button className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-700 hover:via-rose-700 hover:to-fuchsia-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/98 backdrop-blur-2xl border-t border-violet-200/30"
          >
            <div className="px-6 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="block text-slate-700 hover:text-violet-600 transition-colors py-3 text-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 mt-6 py-4 text-lg">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
