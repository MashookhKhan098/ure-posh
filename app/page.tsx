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
import Footer from "./components/Footer"

// =================================================================================
// Data for Homepage Content
// =================================================================================



const heroSlides = [
  { src: '/images/5.jpg', alt: 'Diverse professionals in inclusive workplace' },
  { src: 'https://i.postimg.cc/xTBwKRM9/istockphoto-1216554355-612x612.jpg', alt: 'Diverse group of professionals collaborating' },
  { src: 'https://i.postimg.cc/FHc2GLV3/istockphoto-1765053017-612x612.jpg', alt: 'Supportive hands' }
];

const expertiseGears = [
    {
        title: "Creative, Design & Content",
        content: "Brand Identity\nDigital Content\nTraining Materials\nVisual Campaigns",
        color: "from-purple-500 to-pink-500",
        dots: [
            { color: "bg-purple-400", position: { top: '15%', left: '25%' } },
            { color: "bg-blue-400", position: { top: '25%', left: '80%' } },
            { color: "bg-teal-400", position: { bottom: '25%', left: '15%' } },
            { color: "bg-red-400", position: { bottom: '10%', left: '50%' } },
        ]
    },
    {
        title: "Public Relations & Marketing",
        content: "PR Strategy\nDigital Marketing\nCrisis Communication\nBrand Messaging",
        color: "from-blue-500 to-cyan-500",
        dots: [
            { color: "bg-yellow-400", position: { top: '25%', left: '25%' } },
            { color: "bg-teal-300", position: { bottom: '35%', left: '75%' } },
            { color: "bg-red-400", position: { bottom: '20%', left: '30%' } },
        ]
    },
    {
        title: "Strategy Planning & Reputation",
        content: "Strategic Planning\nReputation Management\nPolicy Development\nRisk Assessment",
        color: "from-green-500 to-emerald-500",
        dots: [
            { color: "bg-yellow-400", position: { top: '15%', left: '65%' } },
            { color: "bg-purple-400", position: { top: '35%', left: '20%' } },
            { color: "bg-blue-400", position: { bottom: '35%', left: '55%' } },
            { color: "bg-teal-300", position: { bottom: '40%', left: '20%' } },
            { color: "bg-red-400", position: { bottom: '15%', left: '50%' } },
        ]
    },
    {
        title: "Transaction & Transformation",
        content: "Change Management\nProcess Optimization\nCultural Transformation\nImplementation Support",
        color: "from-orange-500 to-red-500",
        dots: [
            { color: "bg-red-400", position: { top: '20%', left: '70%' } },
            { color: "bg-green-400", position: { bottom: '50%', left: '75%' } },
            { color: "bg-blue-400", position: { bottom: '30%', left: '40%' } },
            { color: "bg-teal-300", position: { bottom: '20%', left: '60%' } },
        ]
    }
];

// =================================================================================
// Reusable Components
// =================================================================================
const ExpertiseGear = ({ title, content, color, dots, index }: { 
    title: string, 
    content: string, 
    color: string, 
    dots: { color: string, position: React.CSSProperties }[], 
    index: number 
}) => {
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

    const duration = 20 + (index * 4);
    const direction = index % 2 === 0 ? 1 : -1;

    return (
        <div className="flex flex-col items-center justify-center col-span-1 group">
            {/* Enhanced Gear Container */}
            <div className="relative w-64 h-64 flex items-center justify-center mb-6">
                {/* Blurred Background Shadow */}
                <div className="absolute inset-0 rounded-full bg-black/2 blur-md scale-110"></div>
                <div className="absolute inset-0 rounded-full bg-black/1 blur-lg scale-125"></div>
                
                {/* Animated Background Ring */}
                <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-20 blur-xl`}
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                {/* Outer Glow Ring */}
                <motion.div
                    className={`absolute inset-0 rounded-full bg-gradient-to-r ${color} opacity-10`}
                    animate={{ 
                        scale: [1, 1.05, 1],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                />
                
                {/* Main Gear */}
                <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 * direction }}
                    transition={{
                        duration,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <defs>
                            <linearGradient id={`gearGradient${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: '#E0E0E0' }} />
                                <stop offset="50%" style={{ stopColor: '#BDBDBD' }} />
                                <stop offset="100%" style={{ stopColor: '#E0E0E0' }} />
                            </linearGradient>
                            <filter id={`shadow${index}`} x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur"/>
                                <feOffset in="blur" dx="1" dy="1" result="offsetBlur"/>
                                <feMerge>
                                    <feMergeNode in="offsetBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path
                            d={createGearPath()}
                            fill={`url(#gearGradient${index})`}
                            stroke="#AFAFAF"
                            strokeWidth="0.5"
                            filter={`url(#shadow${index})`}
                        />
                        <circle cx="50" cy="50" r="28" className="fill-slate-900" /> 
                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/>
                    </svg>
                    {dots.map((dot, i) => (
                        <motion.div 
                            key={i} 
                            className={`absolute w-4 h-4 rounded-full ${dot.color} shadow-lg`} 
                            style={dot.position}
                            animate={{ 
                                scale: [1, 1.3, 1],
                                opacity: [0.7, 1, 0.7]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
                
                {/* Center Content */}
                <motion.div 
                    className="relative z-10 text-center px-2"
                    animate={{ 
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="text-white text-xs font-medium leading-tight">
                        {content.split('\n').map((line, idx) => (
                            <div key={idx} className="mb-1">{line}</div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Title */}
            <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
            </motion.div>
        </div>
    );
};




// =================================================================================
// Main Page Component
// =================================================================================

export default function HomePage() {
  const pathname = usePathname()
  const router = useRouter()
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

      
      <main>
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
            <div className="grid lg:grid-cols-2 gap-20 items-center min-h-[calc(100vh-100px)] py-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-8 lg:pr-12"
              >
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block">
                  <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-6 py-2 text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                      <span className="text-white text-lg font-bold">♀</span>
                    </div>
                    <span>India's Leading POSH Compliance Partner</span>
                  </Badge>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-4">
                  <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-slate-900">
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="block mb-2 text-slate-600 font-medium"
                    >
                      Creating
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.8, duration: 0.8 }}
                      className="relative inline-block mb-2"
                    >
                      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                        Safe & Inclusive
                      </span>
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: "100%" }} 
                        transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-md"
                      />
                    </motion.span>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 1.0, duration: 0.8 }}
                      className="block text-slate-700 font-semibold"
                    >
                      Workplaces for Everyone
                    </motion.span>
                  </h1>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="space-y-6">
                  <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-3xl font-medium">
                    We transform organizational cultures through comprehensive{" "}
                    <span className="font-bold text-slate-800 bg-yellow-100 px-2 py-1 rounded-md">POSH compliance</span>, expert training, and innovative solutions that make workplaces{" "}
                    <span className="font-bold text-slate-800 bg-green-100 px-2 py-1 rounded-md">safer, more inclusive</span>, and legally compliant across India.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                      Get Started
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                    <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                      Learn More
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="relative lg:pl-12 flex flex-col items-center">
                <div className="relative max-w-md w-full">
                  {/* Simplified Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl scale-110"></div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-20">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-black/50 h-[450px] border border-white/30">
                      {/* Image Container */}
                      <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                          {heroSlides.map((slide, idx) => (
                            idx === currentSlide && (
                              <motion.div 
                                key={idx} 
                                initial={{ opacity: 0, scale: 1.1 }} 
                                animate={{ opacity: 1, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.9 }} 
                                transition={{ duration: 0.8, ease: 'easeInOut' }} 
                                className="absolute inset-0"
                              >
                                <Image 
                                  src={slide.src} 
                                  alt={slide.alt} 
                                  fill
                                  className="object-cover" 
                                  priority={idx === 0} 
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                />
                              </motion.div>
                            )
                          ))}
                        </AnimatePresence>
                      </div>
                      
                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                      
                      {/* Slide Indicators */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {heroSlides.map((_, idx) => (
                          <motion.button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              idx === currentSlide 
                                ? 'bg-white shadow-lg scale-125' 
                                : 'bg-white/50 hover:bg-white/75'
                            }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          />
                        ))}
                      </div>
                      
                      {/* Corner Accents */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="relative py-24 flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute left-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -left-12 text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -left-24 text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -left-10 text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 left-1/4 text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-8 mb-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-6 py-2 text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                  <span>Why Choose Ureposh</span>
                </Badge>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }} className="space-y-4">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-slate-900">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="block mb-2 text-slate-600 font-medium"
                  >
                    Your
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative inline-block mb-2"
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                      Trusted POSH Partner
                    </span>
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "100%" }} 
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-md"
                    />
                  </motion.span>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
                  We combine legal expertise, cultural understanding, and innovative technology to deliver comprehensive workplace safety solutions that protect your organization and empower your people.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {whyChooseUs.map((reason, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full text-center border-0 bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/10 via-transparent to-purple-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardHeader className="relative pb-6 pt-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-500 transform group-hover:scale-110">
                        <reason.icon className="h-10 w-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-slate-800 transition-colors duration-300">{reason.title}</CardTitle>
                      <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        {reason.stats}
                      </Badge>
                    </CardHeader>
                    <CardContent className="relative pt-0 pb-8">
                      <CardDescription className="text-slate-600 leading-relaxed text-base font-medium px-4">{reason.description}</CardDescription>
                    </CardContent>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Our Expertise Section */}
        <section className="relative py-24 flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute right-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -right-12 text-[12rem] text-slate-700 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -right-24 text-8xl text-slate-600 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -right-10 text-9xl text-slate-700 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 right-1/4 text-6xl text-slate-600 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-8 mb-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-slate-800 px-6 py-2 text-base font-bold border border-slate-200/50 shadow-lg shadow-slate-200/50 rounded-full flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-gray-300 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-slate-700" />
                  </div>
                  <span>Our Expertise</span>
                </Badge>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }} className="space-y-4">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-white">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="block mb-2 text-slate-300 font-medium"
                  >
                    Comprehensive
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative inline-block mb-2"
                  >
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold">
                      POSH Solutions
                    </span>
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "100%" }} 
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-md"
                    />
                  </motion.span>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                <p className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-4xl mx-auto font-medium">
                  From creative design to strategic transformation, we deliver end-to-end POSH compliance solutions that adapt to your organization's unique needs and industry requirements.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }} 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto"
            >
              {expertiseGears.map((gear, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <ExpertiseGear
                    title={gear.title}
                    content={gear.content}
                    color={gear.color}
                    dots={gear.dots}
                    index={index}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="relative py-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute left-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -left-12 text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -left-24 text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -left-10 text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 left-1/4 text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center space-y-8 mb-20">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-blue-100 via-purple-50 to-pink-100 text-slate-800 px-6 py-2 text-base font-bold border border-white/50 shadow-lg shadow-blue-200/50 rounded-full flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-300 to-purple-300 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white" />
                  </div>
                  <span>Industries We Serve</span>
                </Badge>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }} className="space-y-4">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-slate-900">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="block mb-2 text-slate-600 font-medium"
                  >
                    Trusted Across
                  </motion.span>
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.8, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative inline-block mb-2"
                  >
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                      All Sectors
                    </span>
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "100%" }} 
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-md"
                    />
                  </motion.span>
                </h2>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.8 }} viewport={{ once: true }} className="space-y-6">
                <p className="text-lg lg:text-xl text-slate-600 leading-relaxed max-w-4xl mx-auto font-medium">
                  From innovative startups to established enterprises, we've helped organizations across diverse industries create inclusive, safe workplaces that drive business success and employee wellbeing.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {industries.map((industry, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -8 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full border-0 shadow-2xl hover:shadow-3xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden group relative">
                    {/* Card Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <CardContent className="relative p-8">
                      {/* Header with Icon and Growth Badge */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="relative">
                          <div className="text-6xl mb-2">{industry.icon}</div>
                          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200 px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                          {industry.growth}
                        </Badge>
                      </div>
                      
                      {/* Industry Title */}
                      <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300">{industry.name}</h3>
                      
                      {/* Description */}
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed font-medium">{industry.description}</p>
                      
                      {/* Stats */}
                      <div className="mb-6">
                        <p className="text-4xl font-bold text-slate-900 mb-1">{industry.count}</p>
                        <p className="text-sm text-slate-500 font-medium">Organizations transformed</p>
                      </div>
                      
                      {/* Challenges */}
                      <div className="space-y-3 mb-6">
                        <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">Key Challenges Addressed:</p>
                        <div className="flex flex-wrap gap-2">
                          {industry.challenges.map((challenge, idx) => (
                            <span key={idx} className="text-xs px-3 py-1 border border-slate-200 text-slate-700 rounded-full bg-white/80 backdrop-blur-sm font-medium shadow-sm">
                              {challenge}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-semibold text-slate-600">
                          <span>Success Rate</span>
                          <span>85%</span>
                        </div>
                        <div className="relative h-3 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            whileInView={{ width: '85%' }} 
                            transition={{ delay: index * 0.1, duration: 1.2, ease: 'easeOut' }} 
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"
                          >
                            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Bottom Accent */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}