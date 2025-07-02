"use client"

"use client"

import React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Shield,
  Users,
  Award,
  Heart,
  CheckCircle,
  Star,
  Menu,
  X,
  Play,
  Building,
  Clock,
  Phone,
  Mail,
  MapPin,
  Globe,
  Sparkles,
  Target,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Zap,
  Scale,
  ChevronRight,
  Quote,
  FileCheck,
  Briefcase,
  Calendar,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeService, setActiveService] = useState(0)
  const [activeFeature, setActiveFeature] = useState(0)

  const testimonials = [
    {
      name: "Priya Sharma",
      position: "Chief People Officer",
      company: "TechVision Solutions",
      content:
        "Ureposh transformed our workplace culture completely. Their approach goes beyond compliance—they helped us build genuine respect and inclusion. Our employee satisfaction scores increased by 40% within six months.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Technology & Software",
      employees: "2,500+",
      location: "Bangalore, Karnataka",
      impact: "40% improvement in workplace satisfaction",
      challenge: "High attrition due to workplace culture issues",
      solution: "Comprehensive POSH training and culture transformation program",
    },
    {
      name: "Rajesh Kumar",
      position: "Managing Director",
      company: "Global Manufacturing Corp",
      content:
        "The multilingual training programs were a game-changer for our diverse workforce. Ureposh's cultural sensitivity and practical approach made complex legal concepts accessible to everyone, from factory floor to boardroom.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Manufacturing & Engineering",
      employees: "8,000+",
      location: "Chennai, Tamil Nadu",
      impact: "Zero harassment incidents in 24 months",
      challenge: "Language barriers and cultural diversity across multiple locations",
      solution: "Multi-language POSH training and localized awareness programs",
    },
    {
      name: "Dr. Anjali Mehta",
      position: "Founder & CEO",
      company: "HealthTech Innovations",
      content:
        "As a woman-led healthcare startup, creating a safe environment was crucial for our growth. Ureposh helped us establish robust policies from day one, enabling us to scale confidently while maintaining our values.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Healthcare Technology",
      employees: "450+",
      location: "Mumbai, Maharashtra",
      impact: "95% employee retention rate",
      challenge: "Building inclusive culture in fast-growing startup environment",
      solution: "Startup-focused POSH implementation and leadership training",
    },
  ]

  const services = [
    {
      id: "policy",
      title: "POSH Policy Development & Legal Advisory",
      icon: Scale,
      color: "from-pink-500 to-rose-600",
      description:
        "Comprehensive legal framework tailored to your organization's unique needs and industry requirements.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "100% compliant with Sexual Harassment of Women at Workplace Act, 2013",
        "Industry-specific customization for tech, manufacturing, healthcare, and more",
        "Gender-inclusive language covering all forms of workplace harassment",
        "Regular legal updates to ensure ongoing compliance",
        "Integration with existing HR policies and procedures",
        "Multi-location policy harmonization for large enterprises",
      ],
      benefits: [
        "Reduced legal liability and compliance risks",
        "Clear guidelines for employees and management",
        "Streamlined reporting and resolution processes",
        "Enhanced organizational reputation and employer branding",
      ],
      process: [
        "Comprehensive organizational assessment and gap analysis",
        "Stakeholder consultation and requirement gathering",
        "Custom policy drafting with legal review",
        "Management approval and board ratification process",
        "Implementation planning and rollout strategy",
        "Ongoing monitoring and annual policy updates",
      ],
      price: "Starting from ₹25,000",
      duration: "2-4 weeks",
      deliverables: [
        "Complete POSH Policy Document",
        "Implementation Guidelines",
        "Training Materials",
        "Compliance Checklist",
      ],
    },
    {
      id: "ic-setup",
      title: "Internal Committee Formation & Management",
      icon: Users,
      color: "from-rose-500 to-pink-600",
      description:
        "End-to-end support for establishing and managing effective Internal Committees with qualified external members.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Strategic IC composition based on organizational structure",
        "Qualified external member empanelment from our expert network",
        "Comprehensive orientation and capacity building programs",
        "Ongoing advisory support and mentorship",
        "Documentation and compliance management systems",
        "Performance monitoring and effectiveness evaluation",
      ],
      benefits: [
        "Legally compliant committee structure",
        "Access to experienced external members",
        "Reduced administrative burden on HR teams",
        "Improved complaint resolution efficiency",
      ],
      process: [
        "Organizational structure analysis and IC design",
        "Internal member selection and external member matching",
        "Committee formation and legal documentation",
        "Comprehensive training and orientation program",
        "Process setup and documentation systems",
        "Ongoing support and performance monitoring",
      ],
      price: "Starting from ₹35,000",
      duration: "3-6 weeks",
      deliverables: [
        "IC Formation Documentation",
        "Member Training Certificates",
        "Process Manuals",
        "Ongoing Support Plan",
      ],
    },
    {
      id: "training",
      title: "Specialized POSH Training & Capacity Building",
      icon: BookOpen,
      color: "from-fuchsia-500 to-pink-600",
      description:
        "Interactive, scenario-based training programs designed to build competence and confidence in handling sensitive situations.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Role-specific training modules for IC members, HR teams, and leadership",
        "Real-world case studies and interactive scenario planning",
        "Legal procedure training and documentation best practices",
        "Confidentiality protocols and ethical guidelines",
        "Trauma-informed approach to complaint handling",
        "Continuous learning and refresher programs",
      ],
      benefits: [
        "Enhanced IC member competence and confidence",
        "Reduced resolution time for complaints",
        "Improved stakeholder satisfaction",
        "Better legal compliance and documentation",
      ],
      process: [
        "Training needs assessment and customization",
        "Interactive workshop design and material development",
        "Hands-on training sessions with expert facilitators",
        "Practical exercises and case study analysis",
        "Competency evaluation and certification",
        "Ongoing mentorship and support programs",
      ],
      price: "₹15,000 per person",
      duration: "1-2 weeks",
      deliverables: ["Training Certificates", "Reference Materials", "Case Study Library", "Ongoing Support Access"],
    },
    {
      id: "investigation",
      title: "Investigation Support & Resolution Services",
      icon: Shield,
      color: "from-pink-600 to-rose-700",
      description:
        "Expert guidance and support throughout the investigation process to ensure fair, thorough, and legally compliant resolutions.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Real-time guidance during active investigations",
        "Interview techniques and evidence collection support",
        "Confidentiality maintenance and stakeholder management",
        "Professional report writing and documentation",
        "Legal insights for complex and sensitive cases",
        "Post-resolution monitoring and follow-up support",
      ],
      benefits: [
        "Legally sound investigation processes",
        "Reduced risk of procedural errors",
        "Fair and unbiased resolution outcomes",
        "Enhanced stakeholder confidence in the process",
      ],
      process: [
        "Case assessment and investigation planning",
        "Evidence collection and stakeholder interview guidance",
        "Legal compliance review and documentation support",
        "Report preparation and recommendation development",
        "Resolution implementation and monitoring",
        "Post-case analysis and process improvement",
      ],
      price: "Custom pricing based on case complexity",
      duration: "As needed (typically 2-8 weeks)",
      deliverables: [
        "Investigation Reports",
        "Legal Compliance Documentation",
        "Resolution Recommendations",
        "Follow-up Plans",
      ],
    },
    {
      id: "audits",
      title: "Comprehensive POSH Audits & Compliance Review",
      icon: CheckCircle,
      color: "from-rose-500 to-red-600",
      description:
        "Thorough evaluation of your POSH implementation to identify gaps, ensure compliance, and drive continuous improvement.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "360-degree policy and process evaluation",
        "IC effectiveness and performance assessment",
        "Reporting mechanism analysis and optimization",
        "Employee awareness and culture measurement",
        "Legal compliance verification and gap analysis",
        "Benchmarking against industry best practices",
      ],
      benefits: [
        "Complete visibility into POSH program effectiveness",
        "Proactive identification of compliance gaps",
        "Data-driven improvement recommendations",
        "Enhanced organizational risk management",
      ],
      process: [
        "Comprehensive audit planning and scope definition",
        "Document review and stakeholder interviews",
        "Process observation and effectiveness evaluation",
        "Gap analysis and risk assessment",
        "Detailed reporting with actionable recommendations",
        "Implementation support and follow-up monitoring",
      ],
      price: "Starting from ₹45,000",
      duration: "4-6 weeks",
      deliverables: ["Comprehensive Audit Report", "Gap Analysis", "Improvement Roadmap", "Implementation Support"],
    },
    {
      id: "certification",
      title: "Professional POSH & DEI Certification Programs",
      icon: Award,
      color: "from-pink-500 to-fuchsia-600",
      description:
        "Industry-recognized certification programs to build expertise in POSH compliance and diversity, equity & inclusion.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Beginner to advanced level certification tracks",
        "Comprehensive coverage of POSH Act 2013 and amendments",
        "Practical skills development for IC empanelment",
        "Leadership training for awareness program management",
        "Investigation best practices and case study analysis",
        "Continuing education and recertification programs",
      ],
      benefits: [
        "Industry-recognized professional credentials",
        "Enhanced career opportunities in compliance roles",
        "Practical skills for immediate application",
        "Access to exclusive professional network",
      ],
      process: [
        "Program selection and enrollment process",
        "Interactive learning modules and assessments",
        "Practical case studies and simulation exercises",
        "Competency evaluation and certification exam",
        "Professional certification and credential issuance",
        "Ongoing professional development opportunities",
      ],
      price: "₹15,000 per person",
      duration: "6-8 weeks",
      deliverables: [
        "Professional Certification",
        "Digital Credentials",
        "Resource Library Access",
        "Alumni Network Membership",
      ],
    },
  ]

  const features = [
    {
      title: "AI-Powered Compliance Intelligence",
      description:
        "Advanced analytics and predictive insights to proactively identify and prevent workplace issues before they escalate.",
      icon: Zap,
      color: "from-pink-500 to-rose-600",
      image: "/placeholder.svg?height=300&width=400",
      benefits: [
        "Predictive risk analytics and early warning systems",
        "Real-time compliance monitoring and alerts",
        "Custom dashboards with actionable insights",
        "Trend analysis and pattern recognition for prevention",
      ],
      details:
        "Our proprietary AI system analyzes workplace data patterns to predict potential issues, enabling proactive intervention and prevention strategies.",
    },
    {
      title: "Inclusive Design & Cultural Adaptation",
      description:
        "Solutions designed with accessibility, cultural sensitivity, and regional nuances at the core of every implementation.",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      image: "/placeholder.svg?height=300&width=400",
      benefits: [
        "Universal design principles for accessibility",
        "Multi-language support in 15+ Indian languages",
        "Cultural adaptation for diverse workforce",
        "Region-specific compliance considerations",
      ],
      details:
        "We understand India's diverse cultural landscape and design solutions that respect local customs while maintaining global standards.",
    },
    {
      title: "Continuous Learning Ecosystem",
      description:
        "Engaging, interactive learning experiences that evolve with your organization and adapt to changing needs.",
      icon: BookOpen,
      color: "from-fuchsia-500 to-pink-600",
      image: "/placeholder.svg?height=300&width=400",
      benefits: [
        "Microlearning modules for busy professionals",
        "Gamification elements to increase engagement",
        "Progress tracking and competency measurement",
        "Personalized content based on role and experience",
      ],
      details:
        "Our learning platform adapts to individual learning styles and organizational needs, ensuring maximum retention and practical application.",
    },
  ]

  const industries = [
    {
      name: "Information Technology & Software",
      icon: "💻",
      count: "180+",
      growth: "+32%",
      color: "from-pink-500 to-rose-600",
      description: "From startups to tech giants, ensuring safe digital workspaces",
      challenges: ["Remote work policies", "Digital harassment", "Rapid scaling"],
    },
    {
      name: "Healthcare & Life Sciences",
      icon: "🏥",
      count: "95+",
      growth: "+28%",
      color: "from-rose-500 to-red-600",
      description: "Protecting healthcare workers and maintaining patient care standards",
      challenges: ["High-stress environments", "Hierarchical structures", "Patient interaction protocols"],
    },
    {
      name: "Financial Services & Banking",
      icon: "🏦",
      count: "75+",
      growth: "+25%",
      color: "from-fuchsia-500 to-pink-600",
      description: "Ensuring compliance in regulated financial environments",
      challenges: ["Regulatory compliance", "Client-facing roles", "Performance pressure"],
    },
    {
      name: "Manufacturing & Engineering",
      icon: "🏭",
      count: "120+",
      growth: "+22%",
      color: "from-pink-600 to-rose-700",
      description: "Creating safe environments in industrial settings",
      challenges: ["Blue-collar workforce", "Multiple shifts", "Safety integration"],
    },
    {
      name: "Education & Research Institutions",
      icon: "🎓",
      count: "65+",
      growth: "+35%",
      color: "from-rose-400 to-pink-600",
      description: "Fostering safe learning and research environments",
      challenges: ["Student-faculty dynamics", "Research collaborations", "Campus safety"],
    },
    {
      name: "Professional Services & Consulting",
      icon: "💼",
      count: "85+",
      growth: "+20%",
      color: "from-pink-500 to-fuchsia-600",
      description: "Maintaining professional standards in client-service environments",
      challenges: ["Client interactions", "Travel policies", "Project-based teams"],
    },
  ]

  const coreValues = [
    {
      title: "Inclusion as Foundation, Not Afterthought",
      description:
        "We believe inclusion isn't a checkbox—it's the cornerstone of every thriving workplace. Our solutions are built from the ground up to welcome and respect all gender identities, expressions, and backgrounds, creating environments where everyone can contribute their authentic selves.",
      icon: Users,
      color: "from-pink-500 to-rose-600",
      impact: "Every individual feels valued and heard",
      approach: "Proactive inclusion strategies integrated into all processes",
    },
    {
      title: "Safety as a Fundamental Right",
      description:
        "Every person deserves to work without fear of harassment or discrimination. We go beyond legal compliance to embed deep-rooted values of respect, dignity, and zero tolerance for any form of workplace harassment, creating cultures where safety is everyone's responsibility.",
      icon: Shield,
      color: "from-rose-500 to-pink-600",
      impact: "Zero-tolerance culture with proactive prevention",
      approach: "Comprehensive safety frameworks with continuous monitoring",
    },
    {
      title: "Transforming Systems, Not Just Policies",
      description:
        "We challenge outdated systems that fail to protect or empower individuals. Our mission is to replace them with progressive structures rooted in fairness, equality, and accountability—creating lasting change that goes beyond surface-level compliance.",
      icon: Lightbulb,
      color: "from-fuchsia-500 to-pink-600",
      impact: "Systemic change that addresses root causes",
      approach: "Holistic transformation of organizational culture and processes",
    },
    {
      title: "Diversity as Competitive Advantage",
      description:
        "We celebrate all forms of diversity—gender, culture, ability, thought, and experience. True innovation happens when diverse perspectives come together in psychologically safe environments where everyone feels empowered to contribute their unique insights.",
      icon: Sparkles,
      color: "from-pink-600 to-rose-700",
      impact: "Enhanced innovation and business performance",
      approach: "Diversity-driven decision making and inclusive leadership development",
    },
    {
      title: "Action-Oriented Implementation",
      description:
        "Our commitment extends far beyond theoretical frameworks. We work hands-on with organizations to implement tangible, measurable changes that create real impact—building cultures people can trust and environments where everyone can thrive.",
      icon: Target,
      color: "from-rose-500 to-red-600",
      impact: "Measurable outcomes and sustainable change",
      approach: "Data-driven implementation with continuous improvement cycles",
    },
  ]

  const whyChooseUs = [
    {
      title: "Proven Track Record",
      description: "500+ organizations transformed across 25+ industries with 99.2% compliance success rate",
      icon: Award,
      stats: "99.2% Success Rate",
    },
    {
      title: "Expert Team",
      description: "Legal professionals, certified trainers, and compliance experts with 15+ years average experience",
      icon: Users,
      stats: "15+ Years Experience",
    },
    {
      title: "Comprehensive Solutions",
      description: "End-to-end services from policy development to ongoing support and continuous improvement",
      icon: CheckCircle,
      stats: "360° Coverage",
    },
    {
      title: "Cultural Sensitivity",
      description: "Deep understanding of Indian workplace culture with solutions adapted for regional diversity",
      icon: Heart,
      stats: "15+ Languages",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 6000)
    return () => clearInterval(featureInterval)
  }, [features.length])

  useEffect(() => {
    const serviceInterval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length)
    }, 7000)
    return () => clearInterval(serviceInterval)
  }, [services.length])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50/30 to-fuchsia-50/40 overflow-x-hidden">
      {/* Enhanced Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/95 backdrop-blur-2xl border-b border-pink-200/30 sticky top-0 z-50 shadow-lg shadow-pink-500/5"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 flex-wrap gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl shadow-pink-500/25">
                  <Heart className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-3xl font-bold bg-gradient-to-r from-pink-700 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
                  UREPOSH
                </span>
                <p className="text-xs text-slate-600 font-medium tracking-wide">
                  Transforming Workplaces <br /> Empowering Lives
                </p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {["Home", "About", "Services", "Culture", "News Room", "Our People", "Contact"].map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, type: 'spring', stiffness: 300 }}
                  className="relative group px-2"
                >
                  <Link
                    href={item === "Home" ? "/" : item === "Our People" ? "/team" : `/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`)
                        ? 'text-pink-600 font-semibold'
                        : 'text-slate-700 hover:text-pink-600'
                    }`}
                  >
                    {item}
                    <span className={`absolute left-1/2 -bottom-1 h-0.5 bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-300 ${
                      pathname === (item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, '-')}`)
                        ? 'w-4/5 left-[10%]'
                        : 'w-0 group-hover:w-4/5 group-hover:left-[10%]'
                    }`}></span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>

            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.9 }}
              className="hidden lg:flex items-center justify-center flex-1"
            >
              <Button className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-700 hover:via-rose-700 hover:to-fuchsia-700 shadow-xl shadow-pink-500/25 hover:shadow-2xl transition-all duration-300 px-8 py-6 text-lg font-semibold" onClick={() => router.push('/about')}>
                Start Journey
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white/98 backdrop-blur-2xl border-t border-pink-200/30"
            >
              <div className="px-8 py-6 space-y-2">
                {["Home", "About", "Services", "Culture", "News Room", "Our People", "Contact"].map((item) => (
                  <Link
                    key={item}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="block text-slate-700 hover:text-pink-600 transition-colors py-3 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                ))}
                <Button className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 mt- py-4 text-lg">
                  Start Journey
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Revolutionary Hero Section */}
      {/* Clean & Smooth Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50/80 via-white to-rose-50/60">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gentle gradient orbs */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-rose-200/40 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-fuchsia-200/30 to-pink-200/30 rounded-full blur-3xl"
          />

          {/* Floating women symbols */}
          <motion.div
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 5, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 text-pink-300/20 text-8xl font-light"
          >
            ♀
          </motion.div>
          <motion.div
            animate={{
              y: [20, -20, 20],
              rotate: [0, -5, 0],
              opacity: [0.1, 0.15, 0.1],
            }}
            transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-1/3 right-1/3 text-rose-300/20 text-6xl font-light"
          >
            ♀
          </motion.div>
          <motion.div
            animate={{
              y: [-15, 15, -15],
              rotate: [0, 3, 0],
              opacity: [0.05, 0.1, 0.05],
            }}
            transition={{ duration: 18, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 6 }}
            className="absolute top-2/3 left-2/3 text-fuchsia-300/15 text-7xl font-light"
          >
            ♀
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen py-20">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 lg:pr-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-block"
              >
                <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-3 text-sm font-semibold border border-pink-200/50 shadow-lg rounded-full">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="mr-2 text-pink-600"
                  >
                    ♀
                  </motion.div>
                  India's Leading POSH Compliance Partner
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="space-y-4"
              >
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-slate-900">
                  Creating{" "}
                  <span className="relative">
                    <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                      Safe & Inclusive
                    </span>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"
                    />
                  </span>
                  <br />
                  Workplaces for Everyone
                </h1>

                {/* Women symbol integration */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
                  className="flex items-center space-x-3 pt-2"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xl font-bold">♀</span>
                  </div>
                  <div className="h-px bg-gradient-to-r from-pink-300 to-transparent flex-1"></div>
                </motion.div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-2xl"
              >
                We transform organizational cultures through comprehensive POSH compliance, expert training, and
                innovative solutions that make workplaces safer, more inclusive, and legally compliant across India.
              </motion.p>

              {/* Key Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="grid grid-cols-3 gap-6"
              >
                {[
                  { number: "500+", label: "Organizations", icon: "🏢" },
                  { number: "99.2%", label: "Success Rate", icon: "✅" },
                  { number: "50K+", label: "Lives Impacted", icon: "♀" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-bold text-slate-900">{stat.number}</div>
                    <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-4 text-base font-semibold rounded-xl"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Get Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 bg-white/80 backdrop-blur-sm px-8 py-4 text-base font-semibold hover:border-pink-400 transition-all duration-300 shadow-lg rounded-xl"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </Button>
                </motion.div>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
                className="flex flex-wrap items-center gap-8 pt-6"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1.6 + i * 0.1, type: "spring" }}
                        className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-sm"
                      >
                        {String.fromCharCode(65 + i - 1)}
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">500+ Organizations</p>
                    <p className="text-sm text-slate-600">Trust Our Expertise</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 1.8 + i * 0.05, type: "spring" }}
                      >
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                      </motion.div>
                    ))}
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">4.9/5</p>
                    <p className="text-sm text-slate-600">Client Rating</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
              className="relative lg:pl-8"
            >
              {/* Main Image Container */}
              <div className="relative">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-20">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-pink-500/20">
                    <Image
                      src="/placeholder.svg?height=600&width=700"
                      alt="Diverse professionals in inclusive workplace"
                      width={700}
                      height={600}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 via-transparent to-transparent"></div>

                    {/* Overlay Stats */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.8 }}
                      className="absolute bottom-6 left-6 right-6"
                    >
                      <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-slate-900">50,000+</p>
                            <p className="text-slate-600 font-medium">Lives Transformed</p>
                          </div>
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg"
                          >
                            <span className="text-white text-lg font-bold">♀</span>
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Achievement Cards */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, type: "spring" }}
                  className="absolute top-12 -left-12 z-30"
                >
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-900">99.2%</p>
                        <p className="text-sm text-slate-600 font-medium">Compliance Rate</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.8, type: "spring" }}
                  className="absolute bottom-12 -right-12 z-30"
                >
                  <motion.div
                    animate={{ y: [10, -10, 10] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 3 }}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/30"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-slate-900">2024</p>
                        <p className="text-sm text-slate-600 font-medium">Excellence Award</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Background decoration */}
                <div className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-pink-200/30 to-rose-200/30 rounded-3xl -z-10"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="flex flex-col items-center space-y-2 cursor-pointer group"
          >
            <p className="text-slate-600 text-sm font-medium group-hover:text-pink-600 transition-colors">
              Scroll to explore
            </p>
            <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex justify-center group-hover:border-pink-600 transition-colors">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-1 h-3 bg-pink-400 rounded-full mt-2 group-hover:bg-pink-600 transition-colors"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Why Choose Us Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white/80 backdrop-blur-sm relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-rose-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-3 text-lg font-semibold border border-pink-200/50">
              <Target className="w-5 h-5 mr-2" />
              Why Choose Ureposh
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Your Trusted{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                POSH Partner
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We combine legal expertise, cultural understanding, and innovative technology to deliver comprehensive
              workplace safety solutions that protect your organization and empower your people.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {whyChooseUs.map((reason, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full text-center border-pink-100 hover:border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <reason.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{reason.title}</CardTitle>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 mx-auto">
                      {reason.stats}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-600 leading-relaxed">{reason.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-pink-50/50 to-rose-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-white/90 text-pink-800 px-6 py-3 text-lg font-semibold border border-pink-200/50">
              <Scale className="w-5 h-5 mr-2" />
              Our Services
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                POSH Solutions
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto">
              From policy development to ongoing compliance management—we provide end-to-end workplace safety solutions
              tailored to your organization's unique needs and industry requirements.
            </p>
          </motion.div>

          {/* Featured Service */}
          <div className="mb-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/90 backdrop-blur-sm border-pink-200 shadow-2xl overflow-hidden">
                  <div className="grid lg:grid-cols-2 gap-0">
                    <div className="relative h-96 lg:h-auto">
                      <Image
                        src={services[activeService].image || "/placeholder.svg"}
                        alt={services[activeService].title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 text-white">
                        <Badge className="bg-white/20 text-white mb-3">{services[activeService].duration}</Badge>
                        <h3 className="text-2xl font-bold mb-2">{services[activeService].title}</h3>
                        <p className="text-lg">{services[activeService].price}</p>
                      </div>
                    </div>
                    <div className="p-12">
                      <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-br ${services[activeService].color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}
                          >
                            {React.createElement(services[activeService].icon, { className: "h-8 w-8 text-white" })}
                          </div>
                          <div>
                            <h3 className="text-3xl font-bold text-slate-900 mb-2">{services[activeService].title}</h3>
                            <p className="text-slate-600 text-lg leading-relaxed">
                              {services[activeService].description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <h4 className="text-lg font-semibold text-slate-900">Key Features:</h4>
                          {services[activeService].features.slice(0, 4).map((feature, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <CheckCircle className="h-5 w-5 text-pink-500 flex-shrink-0 mt-0.5" />
                              <span className="text-slate-700">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-4 pt-6">
                          <Button className={`bg-gradient-to-r ${services[activeService].color} text-white flex-1`}>
                            Learn More
                          </Button>
                          <Button variant="outline" className="border-pink-200 text-pink-700 flex-1 bg-transparent">
                            Get Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Service Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveService(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === activeService
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 w-8"
                      : "bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="h-full bg-white/90 backdrop-blur-sm border-pink-100 hover:border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      {React.createElement(service.icon, { className: "h-6 w-6 text-white" })}
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{service.duration}</p>
                      <p className="text-lg font-bold">{service.price}</p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-pink-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-2">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-pink-200 text-pink-700 hover:bg-pink-50 bg-transparent"
                    >
                      Learn More
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/services">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-700 hover:via-rose-700 hover:to-fuchsia-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-12 py-8 text-xl font-semibold"
                >
                  Explore All Services & Pricing
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-3 text-lg font-semibold">
              <Sparkles className="w-5 h-5 mr-2" />
              Our Core Values
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Values That{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Drive Impact
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our values aren't just words on a wall—they're the foundation of every solution we create and every
              partnership we build.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {coreValues.map((value, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-pink-100 hover:border-pink-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <CardContent className="p-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-start">
                      <div className="lg:col-span-2">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-xl mb-4`}
                        >
                          <value.icon className="h-10 w-10 text-white" />
                        </div>
                        <div className="text-center lg:text-left">
                          <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-xs">
                            {value.impact}
                          </Badge>
                        </div>
                      </div>
                      <div className="lg:col-span-10 text-center lg:text-left space-y-4">
                        <h3 className="text-2xl font-bold text-slate-900">{value.title}</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">{value.description}</p>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                          <p className="text-sm font-medium text-slate-700">
                            <span className="font-semibold">Our Approach:</span> {value.approach}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-white/80 backdrop-blur-sm relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-rose-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-3 text-lg font-semibold border border-pink-200/50">
              <TrendingUp className="w-5 h-5 mr-2" />
              Our Impact Across India
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Transforming Workplaces{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Nationwide
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Measurable results that demonstrate our commitment to creating safer, more inclusive work environments
              across diverse industries and organizational sizes.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                number: "500+",
                label: "Organizations Transformed",
                icon: Building,
                color: "from-pink-500 to-rose-600",
                description: "Across 25+ industries",
                metric: "98% client retention rate",
                details: "From startups to Fortune 500 companies",
              },
              {
                number: "50,000+",
                label: "Professionals Empowered",
                icon: Users,
                color: "from-rose-500 to-fuchsia-600",
                description: "Training delivered in 15+ languages",
                metric: "95% satisfaction score",
                details: "Comprehensive awareness and skill building",
              },
              {
                number: "99.2%",
                label: "Compliance Achievement",
                icon: CheckCircle,
                color: "from-fuchsia-500 to-pink-600",
                description: "Legal standards exceeded",
                metric: "Zero major compliance failures",
                details: "Rigorous legal framework adherence",
              },
              {
                number: "75+",
                label: "Expert Consultants",
                icon: Award,
                color: "from-pink-600 to-rose-700",
                description: "Certified professionals",
                metric: "15+ years average experience",
                details: "Legal, HR, and compliance specialists",
              },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }} className="group">
                <Card className="h-full bg-white/90 backdrop-blur-sm border-pink-100 hover:border-pink-200 shadow-xl hover:shadow-2xl shadow-pink-500/10 transition-all duration-500 text-center">
                  <CardContent className="p-8">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
                      className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-2"
                    >
                      {stat.number}
                    </motion.div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{stat.label}</h3>
                    <p className="text-sm text-slate-600 mb-3">{stat.description}</p>
                    <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-xs mb-2">
                      {stat.metric}
                    </Badge>
                    <p className="text-xs text-slate-500">{stat.details}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Industries Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 px-6 py-3 text-lg font-semibold">
              <Briefcase className="w-5 h-5 mr-2" />
              Industries We Serve
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Trusted Across{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                All Sectors
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From innovative startups to established enterprises, we've helped organizations across diverse industries
              create inclusive, safe workplaces that drive business success and employee wellbeing.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {industries.map((industry, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="bg-white/90 backdrop-blur-sm border-pink-100 hover:border-pink-200 shadow-lg hover:shadow-xl shadow-pink-500/10 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-5xl">{industry.icon}</div>
                      <Badge
                        variant="secondary"
                        className="bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 group-hover:from-pink-200 group-hover:to-rose-200 transition-colors font-semibold"
                      >
                        {industry.growth}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{industry.description}</p>
                    <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">
                      {industry.count}
                    </p>
                    <p className="text-sm text-slate-600 mb-4">Organizations transformed</p>

                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-slate-700">Key Challenges Addressed:</p>
                      <div className="flex flex-wrap gap-1">
                        {industry.challenges.map((challenge, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-pink-200 text-pink-700">
                            {challenge}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "85%" }}
                        transition={{ delay: index * 0.1, duration: 1.2, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${industry.color} rounded-full relative`}
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 bg-gradient-to-r from-pink-100/70 to-rose-100/70 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-white/90 text-pink-800 px-6 py-3 text-lg font-semibold border border-pink-200/50">
              <Quote className="w-5 h-5 mr-2" />
              Client Success Stories
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              What Our{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Partners Say
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real stories from leaders who have transformed their workplaces with Ureposh's comprehensive solutions and
              expert guidance.
            </p>
          </motion.div>

          <div className="relative max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white/95 backdrop-blur-sm border-pink-200 shadow-2xl overflow-hidden">
                  <div className="grid lg:grid-cols-3 gap-0">
                    <div className="lg:col-span-2 p-12">
                      <div className="flex justify-start mb-6">
                        <Quote className="h-12 w-12 text-pink-300" />
                      </div>
                      <div className="flex justify-center mb-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <blockquote className="text-2xl text-slate-700 mb-8 leading-relaxed italic font-medium">
                        "{testimonials[activeTestimonial].content}"
                      </blockquote>
                      <div className="flex items-center space-x-6">
                        <Image
                          src={testimonials[activeTestimonial].image || "/placeholder.svg"}
                          alt={testimonials[activeTestimonial].name}
                          width={80}
                          height={80}
                          className="rounded-full border-4 border-pink-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xl">{testimonials[activeTestimonial].name}</div>
                          <div className="text-slate-600 text-lg">{testimonials[activeTestimonial].position}</div>
                          <div className="text-pink-600 font-semibold">{testimonials[activeTestimonial].company}</div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-pink-500 to-rose-600 p-12 text-white flex flex-col justify-center">
                      <div className="space-y-6">
                        <Image
                          src={testimonials[activeTestimonial].companyLogo || "/placeholder.svg"}
                          alt={`${testimonials[activeTestimonial].company} logo`}
                          width={120}
                          height={40}
                          className="brightness-0 invert"
                        />
                        <div className="space-y-4">
                          <div>
                            <p className="text-pink-100 text-sm">Industry</p>
                            <p className="text-white font-semibold">{testimonials[activeTestimonial].industry}</p>
                          </div>
                          <div>
                            <p className="text-pink-100 text-sm">Company Size</p>
                            <p className="text-white font-semibold">{testimonials[activeTestimonial].employees}</p>
                          </div>
                          <div>
                            <p className="text-pink-100 text-sm">Location</p>
                            <p className="text-white font-semibold">{testimonials[activeTestimonial].location}</p>
                          </div>
                          <div>
                            <p className="text-pink-100 text-sm">Challenge</p>
                            <p className="text-white font-medium text-sm">
                              {testimonials[activeTestimonial].challenge}
                            </p>
                          </div>
                          <div>
                            <p className="text-pink-100 text-sm">Solution</p>
                            <p className="text-white font-medium text-sm">{testimonials[activeTestimonial].solution}</p>
                          </div>
                          <div>
                            <p className="text-pink-100 text-sm">Impact</p>
                            <p className="text-white font-semibold">{testimonials[activeTestimonial].impact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Testimonial Navigation */}
            <div className="flex justify-center space-x-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === activeTestimonial
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 w-10"
                      : "bg-pink-200 hover:bg-pink-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/10 to-fuchsia-500/10"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-5"></div>

        {/* Floating geometric elements */}
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.2, 1] }}
          transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-20 w-40 h-40 border-2 border-pink-200/30 rounded-full"
        ></motion.div>

        <div className="max-w-6xl mx-auto text-center space-y-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Badge className="bg-white/90 text-pink-800 px-8 py-4 text-xl font-semibold border border-pink-200/50 shadow-lg">
              <Sparkles className="w-6 h-6 mr-3" />
              Ready to Transform Your Workplace?
            </Badge>
            <h2 className="text-6xl font-bold text-slate-900 leading-tight">
              Start Your{" "}
              <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 bg-clip-text text-transparent">
                Transformation
              </span>{" "}
              Journey Today
            </h2>
            <p className="text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Join 500+ forward-thinking organizations that have created safer, more inclusive workplaces with Ureposh.
              Get started with a free consultation and discover how we can help you build a culture where everyone
              thrives.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row gap-8 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 via-rose-600 to-fuchsia-600 hover:from-pink-700 hover:via-rose-700 hover:to-fuchsia-700 shadow-2xl shadow-pink-500/25 hover:shadow-3xl transition-all duration-300 px-12 py-8 text-xl font-semibold"
              >
                Get Free Consultation
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-pink-300 text-pink-700 hover:bg-pink-50 bg-white/90 backdrop-blur-sm px-12 py-8 text-xl font-semibold shadow-lg shadow-pink-500/10"
              >
                <FileCheck className="mr-3 h-6 w-6" />
                Download Resources
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-rose-300 text-rose-700 hover:bg-rose-50 bg-white/90 backdrop-blur-sm px-12 py-8 text-xl font-semibold shadow-lg shadow-rose-500/10"
              >
                <Phone className="mr-3 h-6 w-6" />
                Call Expert Now
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 pt-12"
          >
            {[
              {
                icon: Phone,
                title: "Speak with Expert",
                content: "+91 98765 43210",
                subtitle: "Available Mon-Fri, 9 AM - 6 PM IST",
                color: "from-pink-500 to-rose-600",
                action: "Immediate consultation available",
              },
              {
                icon: Mail,
                title: "Email Consultation",
                content: "hello@ureposh.com",
                subtitle: "Response within 4 hours",
                color: "from-rose-500 to-fuchsia-600",
                action: "Detailed project discussion",
              },
              {
                icon: MapPin,
                title: "Visit Our Office",
                content: "Mumbai, Maharashtra",
                subtitle: "Schedule appointment",
                color: "from-fuchsia-500 to-pink-600",
                action: "In-person consultation",
              },
            ].map((contact, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-pink-500/10 border border-white/20"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}
                >
                  <contact.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.title}</h3>
                <p className="text-lg font-semibold text-slate-700 mb-1">{contact.content}</p>
                <p className="text-sm text-slate-600 mb-2">{contact.subtitle}</p>
                <Badge variant="secondary" className="bg-pink-100 text-pink-700 text-xs">
                  {contact.action}
                </Badge>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center items-center gap-12 pt-12"
          >
            {[
              { icon: Shield, text: "100% Confidential", color: "text-pink-600", desc: "Secure processes" },
              { icon: CheckCircle, text: "Legal Compliance", color: "text-rose-600", desc: "Full POSH adherence" },
              { icon: Award, text: "Expert Team", color: "text-fuchsia-600", desc: "Certified professionals" },
              { icon: Clock, text: "Quick Response", color: "text-pink-700", desc: "24-hour turnaround" },
            ].map((badge, index) => (
              <div key={index} className="flex items-center space-x-3 text-slate-700">
                <badge.icon className={`w-6 h-6 ${badge.color}`} />
                <div>
                  <span className="font-semibold text-lg">{badge.text}</span>
                  <p className="text-sm text-slate-600">{badge.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-pink-900/20 to-rose-900/20"></div>
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-5"></div>

        {/* Floating elements */}
        <motion.div
          animate={{ rotate: -360, scale: [1, 1.1, 1] }}
          transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="absolute top-20 right-20 w-32 h-32 border border-pink-300/20 rounded-full"
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
                <div className="w-14 h-14 bg-gradient-to-br from-pink-600 via-rose-600 to-fuchsia-600 rounded-2xl flex items-center justify-center shadow-xl">
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
                    className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-br hover:from-pink-500 hover:to-rose-500 transition-all duration-300 cursor-pointer group"
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
                        className="text-slate-400 hover:text-pink-400 transition-colors text-lg hover:translate-x-2 inline-block transition-transform duration-300"
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
                  <Link href="#" className="text-slate-400 hover:text-pink-400 transition-colors">
                    Privacy Policy
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-pink-400 transition-colors">
                    Terms of Service
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-pink-400 transition-colors">
                    Cookie Policy
                  </Link>
                  <Link href="#" className="text-slate-400 hover:text-pink-400 transition-colors">
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
    </div>
  )
}


