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
  Cog,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"

// =================================================================================
// Data for Navigation and Dropdowns
// =================================================================================

const navItems = [
  { label: 'About', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'Expertise', href: '#', isDropdown: true },
  { label: 'Join us', href: '#' },
  { label: 'Connect', href: '#' }
];

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

const heroSlides = [
  { src: '/images/5.jpg', alt: 'Diverse professionals in inclusive workplace' },
  { src: 'https://i.postimg.cc/xTBwKRM9/istockphoto-1216554355-612x612.jpg', alt: 'Diverse group of professionals collaborating' },
  { src: 'https://i.postimg.cc/FHc2GLV3/istockphoto-1765053017-612x612.jpg', alt: 'Supportive hands' }
];

const expertiseGears = [
  {
    title: "Creative, design and content",
    dots: [
      { color: "bg-pink-400", position: { top: '15%', left: '25%' } },
      { color: "bg-rose-400", position: { top: '25%', left: '80%' } },
      { color: "bg-pink-300", position: { bottom: '25%', left: '15%' } },
      { color: "bg-rose-300", position: { bottom: '10%', left: '50%' } },
    ]
  },
  {
    title: "Public relations and Marketing",
    dots: [
      { color: "bg-pink-400", position: { top: '25%', left: '25%' } },
      { color: "bg-rose-300", position: { bottom: '35%', left: '75%' } },
      { color: "bg-pink-300", position: { bottom: '20%', left: '30%' } },
    ]
  },
  {
    title: "Strategy planning and reputation",
    dots: [
      { color: "bg-pink-400", position: { top: '15%', left: '65%' } },
      { color: "bg-rose-400", position: { top: '35%', left: '20%' } },
      { color: "bg-pink-300", position: { bottom: '35%', left: '55%' } },
      { color: "bg-rose-300", position: { bottom: '40%', left: '20%' } },
      { color: "bg-pink-200", position: { bottom: '15%', left: '50%' } },
    ]
  },
  {
    title: "Transaction and Transformation",
    dots: [
      { color: "bg-rose-400", position: { top: '20%', left: '70%' } },
      { color: "bg-pink-300", position: { bottom: '50%', left: '75%' } },
      { color: "bg-pink-400", position: { bottom: '30%', left: '40%' } },
      { color: "bg-rose-300", position: { bottom: '20%', left: '60%' } },
    ]
  }
];

// =================================================================================
// Reusable Component for the Expertise Gears (Updated with detailed SVG)
// =================================================================================
const ExpertiseGear = ({ title, dots, isLast }: { title: string, dots: { color: string, position: React.CSSProperties }[], isLast?: boolean }) => {
    const size = 400;
    const centerX = size / 2;
    const centerY = size / 2;
    const outerRadius = size / 2 - 6;
    const toothHeight = size * 0.06;
    const innerRadius = outerRadius * 0.4;

    // Generates the SVG path for a gear with a more realistic profile
    const createGearPath = (
        teeth = 24, 
        innerRadius = 35, 
        midRadius = 42, 
        outerRadius = 50
    ) => {
        const angle = (Math.PI * 2) / teeth;
        const toothWidth = angle * 0.4;
        let path = '';

        for (let i = 0; i < teeth; i++) {
            const start = i * angle;
            const p1x = Math.cos(start) * midRadius + 50;
            const p1y = Math.sin(start) * midRadius + 50;
            const p2x = Math.cos(start + toothWidth) * outerRadius + 50;
            const p2y = Math.sin(start + toothWidth) * outerRadius + 50;
            const p3x = Math.cos(start + toothWidth * 2) * outerRadius + 50;
            const p3y = Math.sin(start + toothWidth * 2) * outerRadius + 50;
            const p4x = Math.cos(start + toothWidth * 3) * midRadius + 50;
            const p4y = Math.sin(start + toothWidth * 3) * midRadius + 50;

            if (i === 0) path += `M ${p1x},${p1y} `;
            else path += `L ${p1x},${p1y} `;
            path += `L ${p2x},${p2y} L ${p3x},${p3y} L ${p4x},${p4y} `;
        }
        path += 'Z';
        return path;
    };

    return (
        <div className="flex items-center justify-center col-span-1">
            <div className="relative group w-48 h-48 flex items-center justify-center text-center">
                {/* Animated gear rotation */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: [0, 360] }}
                    transition={{
                        duration: 36,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear"
                    }}
                    initial={false}
                    style={{ willChange: 'transform' }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id="gearGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#E0E0E0' }} />
                                <stop offset="50%" style={{ stopColor: '#BDBDBD' }} />
                                <stop offset="100%" style={{ stopColor: '#E0E0E0' }} />
                            </linearGradient>
                            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
                                <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
                                <feMerge>
                                    <feMergeNode in="offsetBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        {/* Gear Body with Gradient and Shadow */}
                        <path
                            d={createGearPath()}
                            fill="url(#gearGradient)"
                            stroke="#AFAFAF"
                            strokeWidth="0.5"
                            filter="url(#shadow)"
                        />
                         {/* Inner hole */}
                        <circle cx="50" cy="50" r="28" fill="#e9f2eb" /> 
                         {/* Inner shadow for depth */}
                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="rgba(0,0,0,0.1)" strokeWidth="4"/>
                    </svg>

                    {/* Dots */}
                    {dots.map((dot, i) => (
                        <div key={i} className={`absolute w-3 h-3 rounded-full ${dot.color}`} style={dot.position} />
                    ))}
                </motion.div>
                <span className="relative text-sm font-semibold text-slate-800 max-w-[120px]">{title}</span>
            </div>
            {!isLast && <ArrowRight className="mx-2 text-slate-400 hidden xl:block" />}
        </div>
    );
};


// =================================================================================
// Header Component
// =================================================================================

const Header = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean, setIsMenuOpen: (isOpen: boolean) => void }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-slate-900">POSH</span>
            </Link>
          </div>
          <div className="lg:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
          <nav className="hidden lg:flex space-x-10">
            {navItems.map((item) => (
              item.isDropdown ? (
                <div key={item.label} className="relative group">
                  <button className="text-base font-medium text-slate-600 hover:text-slate-900 flex items-center group">
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform transition-transform duration-200 group-hover:rotate-90" />
                  </button>
                  <div className="absolute left-0 mt-3 px-0 w-[100vw] max-w-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                      <div className="relative grid gap-8 bg-white p-8 grid-cols-4">
                        <div className="pr-8 border-r border-gray-100">
                            <h2 className="text-2xl font-bold text-slate-900 inline-block border-b-2 border-teal-500 pb-2">
                                Expertise
                            </h2>
                            <p className="mt-4 text-slate-600">
                                Advising and leading businesses and brands across an array of industries
                            </p>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 mb-4">Services</h3>
                          <ul className="space-y-3">
                            {expertiseServices.map((service) => (
                              <li key={service}><a href="#" className="text-base text-slate-600 hover:text-slate-900 hover:underline">{service}</a></li>
                            ))}
                          </ul>
                        </div>
                        <div className="col-span-2">
                           <h3 className="text-lg font-bold text-slate-900 mb-4">Sectors</h3>
                           <div className="grid grid-cols-2 gap-8">
                              <ul className="space-y-3">
                                {expertiseSectorsCol1.map((sector) => (
                                  <li key={sector}><a href="#" className="text-base text-slate-600 hover:text-slate-900 hover:underline">{sector}</a></li>
                                ))}
                              </ul>
                              <ul className="space-y-3">
                                {expertiseSectorsCol2.map((sector) => (
                                  <li key={sector}><a href="#" className="text-base text-slate-600 hover:text-slate-900 hover:underline">{sector}</a></li>
                                ))}
                              </ul>
                           </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={item.label} href={item.href} className="text-base font-medium text-slate-600 hover:text-slate-900">
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50">
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


// =================================================================================
// Main Page Component
// =================================================================================

export default function HomePage() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [currentSlide, setCurrentSlide] = useState(0);


  const testimonials = [
    {
      name: "Priya Sharma",
      position: "Chief People Officer",
      company: "TechVision Solutions",
      content:
        "Ureposh transformed our workplace culture completely. Their approach goes beyond compliance—they helped us build genuine respect and inclusion. Our employee satisfaction scores increased by 40% within six months.",
      rating: 5,
      image: "/images/2.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Technology & Software",
      location: "Bangalore, Karnataka",
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
      image: "/images/3.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Manufacturing & Engineering",
      location: "Chennai, Tamil Nadu",
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
      image: "/images/4.jpg",
      companyLogo: "/placeholder.svg?height=50&width=150",
      industry: "Healthcare Technology",
      location: "Mumbai, Maharashtra",
      challenge: "Building inclusive culture in fast-growing startup environment",
      solution: "Startup-focused POSH implementation and leadership training",
    },
  ]

  const whyChooseUs = [
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

  const industries = [
    {
      name: "Information Technology & Software",
      icon: "💻",
      count: "180+",
      growth: "+32%",
      color: "from-gray-500 to-slate-600",
      description: "From startups to tech giants, ensuring safe digital workspaces",
      challenges: ["Remote work policies", "Digital harassment", "Rapid scaling"],
    },
    {
      name: "Healthcare & Life Sciences",
      icon: "🏥",
      count: "95+",
      growth: "+28%",
      color: "from-slate-500 to-gray-600",
      description: "Protecting healthcare workers and maintaining patient care standards",
      challenges: ["High-stress environments", "Hierarchical structures", "Patient interaction protocols"],
    },
    {
      name: "Financial Services & Banking",
      icon: "🏦",
      count: "75+",
      growth: "+25%",
      color: "from-zinc-500 to-gray-600",
      description: "Ensuring compliance in regulated financial environments",
      challenges: ["Regulatory compliance", "Client-facing roles", "Performance pressure"],
    },
    {
      name: "Manufacturing & Engineering",
      icon: "🏭",
      count: "120+",
      growth: "+22%",
      color: "from-gray-600 to-slate-700",
      description: "Creating safe environments in industrial settings",
      challenges: ["Blue-collar workforce", "Multiple shifts", "Safety integration"],
    },
    {
      name: "Education & Research Institutions",
      icon: "🎓",
      count: "65+",
      growth: "+35%",
      color: "from-slate-400 to-gray-600",
      description: "Fostering safe learning and research environments",
      challenges: ["Student-faculty dynamics", "Research collaborations", "Campus safety"],
    },
    {
      name: "Professional Services & Consulting",
      icon: "💼",
      count: "85+",
      growth: "+20%",
      color: "from-gray-500 to-zinc-600",
      description: "Maintaining professional standards in client-service environments",
      challenges: ["Client interactions", "Travel policies", "Project-based teams"],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, []);


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
    <div className="min-h-screen bg-white overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="relative pt-24 lg:pt-28 flex items-center justify-center overflow-hidden bg-white">
        
        <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute right-0 top-0 w-1/2 h-full group">
                <Cog className="absolute -top-12 -right-12 text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
                <Cog className="absolute top-1/4 -right-24 text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
                <Cog className="absolute bottom-1/4 -right-10 text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
                <Cog className="absolute -bottom-12 right-1/4 text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-120px)] py-4">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 lg:pr-12"
            >
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block">
                <Badge
  className="
    bg-gradient-to-r from-pink-100 via-white to-indigo-100
    text-black
    px-4 py-2
    border-2 border-pink-200
    shadow-xl
    rounded-full
    flex items-center justify-center
    gap-2
    relative
    "
  style={{
    boxShadow: "0 4px 24px 0 rgba(236, 72, 153, 0.10), 0 1.5px 6px 0 rgba(99, 102, 241, 0.08)"
  }}
>
  <span
    className="
      flex items-center justify-center
      w-8 h-8
      rounded-full
      bg-gradient-to-br from-pink-400 to-indigo-400
      text-white
      text-lg
      font-extrabold
      shadow-lg
      border-4 border-white
    "
    style={{ boxShadow: "0 2px 8px 0 rgba(236, 72, 153, 0.15)" }}
  >
    ♀
  </span>
  <span className="text-base font-extrabold tracking-tight leading-tight">
    India's Leading POSH Compliance Partner
  </span>
</Badge>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-4">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight text-black">
                  Creating{" "}
                  <span className="relative">
                    <span className="text-black">Safe & Inclusive</span>
                    <motion.div initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }} className="absolute bottom-0 left-0 h-1 bg-black rounded-full" />
                  </span>
                  <br />
                  Workplaces for Everyone
                </h1>
              </motion.div>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="text-lg lg:text-xl text-black leading-relaxed max-w-2xl">
                We transform organizational cultures through comprehensive POSH compliance, expert training, and innovative solutions that make workplaces safer, more inclusive, and legally compliant across India.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4 pt-4">
                {/* Removed Get Free Consultation and Watch Demo buttons as requested */}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="relative lg:pl-12 flex flex-col items-center">
              <div className="relative max-w-lg w-full">
                <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-20">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-gray-500/20 h-[600px]">
                    <AnimatePresence>
                      {heroSlides.map((slide, idx) => (
                        idx === currentSlide && (
                          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.0, ease: 'easeInOut' }} className="absolute inset-0">
                            <Image src={slide.src} alt={slide.alt} width={700} height={600} className="w-full h-full object-cover" priority={idx === 0} loading={idx === 0 ? "eager" : "lazy"} />
                          </motion.div>
                        )
                      ))}
                    </AnimatePresence>
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent"></div>
                  </div>
                </motion.div>
              </div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }} className="w-full max-w-md mt-4">
                {/* Removed A, B, C, D avatars, 500+ Organizations, Trust Our Expertise, 4.9/5, Client Rating, and Verified & Trusted Partner as requested */}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-24 bg-white/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50/50 to-slate-50/50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-6 mb-16">
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-black px-6 py-3 text-lg font-semibold border border-gray-200/50">
              <Target className="w-5 h-5 mr-2" />
              Why Choose Ureposh
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Your <span className="text-slate-900">Trusted</span> <span className="text-slate-900">POSH Partner</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We combine legal expertise, cultural understanding, and innovative technology to deliver comprehensive workplace safety solutions that protect your organization and empower your people.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} 
            className="flex flex-row justify-center items-stretch gap-6">
            {whyChooseUs.map((reason, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -10 }}>
                <Card className="h-full text-center border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-500 to-slate-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <reason.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{reason.title}</CardTitle>
                    <Badge variant="secondary" className="bg-gray-100 text-black mx-auto">
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

      {/* Our Expertise Section */}
      <motion.section 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        transition={{ duration: 0.8 }} 
        viewport={{ once: true }} 
        className="py-24 bg-green-100/70"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-5xl font-bold text-slate-900 mb-16">Our Expertise</h2>
            <div className="flex flex-wrap items-center justify-center gap-y-12">
                {expertiseGears.map((gear, index) => (
                    <ExpertiseGear
                        key={index}
                        title={gear.title}
                        dots={gear.dots}
                        isLast={index === expertiseGears.length - 1}
                    />
                ))}
            </div>
        </div>
      </motion.section>


      {/* Industries Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-6 mb-16">
            <Badge className="bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 px-6 py-3 text-lg font-semibold">
              <Briefcase className="w-5 h-5 mr-2" />
              Industries We Serve
            </Badge>
            <h2 className="text-5xl font-bold text-slate-900">
              Trusted Across <span className="bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">All Sectors</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              From innovative startups to established enterprises, we've helped organizations across diverse industries create inclusive, safe workplaces that drive business success and employee wellbeing.
            </p>
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="bg-white/90 backdrop-blur-sm border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-xl shadow-gray-500/10 transition-all duration-300 overflow-hidden group">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-5xl">{industry.icon}</div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">{industry.growth}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{industry.name}</h3>
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{industry.description}</p>
                    <p className="text-4xl font-bold text-slate-900 mb-2">{industry.count}</p>
                    <p className="text-sm text-slate-600 mb-4">Organizations transformed</p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-slate-700">Key Challenges Addressed:</p>
                      <div className="flex flex-wrap gap-1">
                        {industry.challenges.map((challenge, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 border border-gray-200 text-gray-700 rounded-full bg-white">{challenge}</span>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: '85%' }} transition={{ delay: index * 0.1, duration: 1.2, ease: 'easeOut' }} className="h-full bg-gray-700 rounded-full relative">
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
    </div>
  )
}