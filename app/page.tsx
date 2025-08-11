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
  Search,
  ChevronDown,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import Footer from "./components/Footer"
import { TeamSliceCarousel } from "./people/TeamSliceCarousel"

// =================================================================================
// Data for Homepage Content
// =================================================================================

const teamMembers = [
  {
    name: "CS Anchal Chopra",
    role: "Company Secretary & Legal Expert",
    bio: "Expert in corporate governance and legal compliance with extensive experience in POSH implementation and workplace safety regulations.",
    image: "/images/1.jpg",
    expertise: ["Corporate Governance", "Legal Compliance", "POSH Implementation"],
    achievements: ["10+ Years Experience", "500+ Organizations", "99% Success Rate"]
  },
  {
    name: "Dr. Priya Sharma",
    role: "HR & Compliance Specialist",
    bio: "Specialized in human resources management and compliance with deep understanding of workplace culture transformation.",
    image: "/images/2.jpg",
    expertise: ["HR Management", "Compliance Training", "Culture Transformation"],
    achievements: ["15+ Years Experience", "300+ Training Sessions", "Expert Trainer"]
  },
  {
    name: "Adv. Rajesh Kumar",
    role: "Employment Law Expert",
    bio: "Leading employment law specialist with focus on workplace safety and employee rights protection.",
    image: "/images/3.jpg",
    expertise: ["Employment Law", "Legal Advisory", "Policy Development"],
    achievements: ["12+ Years Experience", "200+ Legal Cases", "Certified Expert"]
  },
  {
    name: "Dr. Anjali Mehta",
    role: "Organizational Psychologist",
    bio: "Expert in organizational behavior and workplace psychology with specialization in inclusive workplace design.",
    image: "/images/4.jpg",
    expertise: ["Psychology", "Behavioral Training", "Inclusive Design"],
    achievements: ["8+ Years Experience", "150+ Organizations", "PhD Psychology"]
  }
]



const heroSlides = [
  { src: '/images/5.jpg', alt: 'Diverse professionals in inclusive workplace' },
  { src: '/images/2.jpg', alt: 'Diverse group of professionals collaborating' },
  { src: '/images/3.jpg', alt: 'Supportive hands' }
];

const expertiseGears = [
    {
        title: "Gender Equality Compliance",
        content: "POSH Compliance Initiation\nExternal Members from Renowned NGO\nCompliant Redressal",
        color: "from-purple-500 to-pink-500",
        dots: [
            { color: "bg-black", position: { top: '15%', left: '25%' } },
            { color: "bg-black", position: { top: '25%', left: '80%' } },
            { color: "bg-black", position: { bottom: '25%', left: '15%' } },
        ]
    },
    {
        title: "Disclosure and Audit",
        content: "POSH & Workplace Harassment Compliance Reporting\nWorkplace Harassment & POSH Policy Disclosure\nPOSH & Workplace Harassment Audits",
        color: "from-blue-500 to-cyan-500",
        dots: [
            { color: "bg-black", position: { top: '25%', left: '25%' } },
            { color: "bg-black", position: { bottom: '35%', left: '75%' } },
            { color: "bg-black", position: { bottom: '20%', left: '30%' } },
        ]
    },
    {
        title: "POSH Adaptability Training",
        content: "Respectful Workplace Training & Compliance\nTraining for Internal Committees & Workplace Panels\nQuarterly Mandatory Training\nManagers Level Training",
        color: "from-green-500 to-emerald-500",
        dots: [
            { color: "bg-black", position: { top: '15%', left: '65%' } },
            { color: "bg-black", position: { top: '35%', left: '20%' } },
            { color: "bg-black", position: { bottom: '35%', left: '55%' } },
            { color: "bg-black", position: { bottom: '40%', left: '20%' } },
        ]
    },
    {
        title: "Organisation Well-being",
        content: "Well Being Programmes\nCode of Conduct Training\nMental Health Training & Counselling",
        color: "from-orange-500 to-red-500",
        dots: [
            { color: "bg-black", position: { top: '20%', left: '70%' } },
            { color: "bg-black", position: { bottom: '50%', left: '75%' } },
            { color: "bg-black", position: { bottom: '30%', left: '40%' } },
        ]
    },
    {
        title: "Diversity and Inclusion",
        content: "Diversity at Work Place\nLGBTQIA++ Inclusion",
        color: "from-indigo-500 to-purple-500",
        dots: [
            { color: "bg-black", position: { top: '20%', left: '30%' } },
            { color: "bg-black", position: { top: '35%', left: '70%' } },
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
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 flex items-center justify-center z-30">
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
                        </defs>
                        <path
                            d={createGearPath()}
                            fill={`url(#gearGradient${index})`}
                            stroke="#AFAFAF"
                            strokeWidth="0.5"
                        />
                        <circle cx="50" cy="50" r="28" className="fill-slate-900" /> 
                        <circle cx="50" cy="50" r="30" fill="transparent" stroke="rgba(255,255,255,0.2)" strokeWidth="4"/>
                    </svg>
                    {dots.map((dot, i) => (
                        <motion.div 
                            key={i} 
                            className={`absolute w-3 h-3 sm:w-4 sm:h-4 rounded-full ${dot.color}`} 
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
                
                <motion.div 
                    className="relative z-10 text-center px-1 sm:px-2"
                    animate={{ 
                        scale: [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="text-white text-xs sm:text-xs font-medium leading-tight">
                        {content.split('\n').map((line, idx) => (
                            <div key={idx} className="mb-0.5 sm:mb-1">{line}</div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div 
                className="text-center px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white mb-2">{title}</h3>
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
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

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
      stats:"peoples table",
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
      description: "From startups to tech giants, ensuring safe digital workspaces",
      challenges: ["Remote work policies", "Digital harassment", "Rapid scaling"],
    },
    {
      name: "Healthcare & Life Sciences",
      icon: "🏥",
      description: "Protecting healthcare workers and maintaining patient care standards",
      challenges: ["High-stress environments", "Hierarchical structures", "Patient interaction protocols"],
    },
    {
      name: "Financial Services & Banking",
      icon: "🏦",
      description: "Ensuring compliance in regulated financial environments",
      challenges: ["Regulatory compliance", "Client-facing roles", "Performance pressure"],
    },
    {
      name: "Manufacturing & Engineering",
      icon: "🏭",
      description: "Creating safe environments in industrial settings",
      challenges: ["Blue-collar workforce", "Multiple shifts", "Safety integration"],
    },
    {
      name: "Education & Research Institutions",
      icon: "🎓",
      description: "Fostering safe learning and research environments",
      challenges: ["Student-faculty dynamics", "Research collaborations", "Campus safety"],
    },
    {
      name: "Professional Services & Consulting",
      icon: "💼",
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

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main>
        {/* Hero Section */}
        <section className="relative pt-4 sm:pt-6 lg:pt-8 flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute right-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -right-12 text-[8rem] sm:text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -right-24 text-6xl sm:text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -right-10 text-7xl sm:text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 right-1/4 text-4xl sm:text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center min-h-screen py-8 sm:py-10 lg:py-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="space-y-4 sm:space-y-6 lg:space-y-8 lg:pr-12 order-2 lg:order-1"
              >
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="inline-block">
                  <Badge className="bg-gradient-to-r from-pink-100 via-purple-50 to-blue-100 text-black px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-white/50 shadow-lg shadow-pink-200/50 rounded-full flex items-center space-x-1.5 sm:space-x-2 lg:space-x-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-full bg-gradient-to-br from-purple-300 to-pink-300 flex items-center justify-center">
                      <span className="text-white text-xs sm:text-sm lg:text-lg font-bold">♀</span>
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base leading-tight">World's Leading POSH Partner</span>
                  </Badge>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="space-y-2 sm:space-y-3 lg:space-y-4">
                  <h1 className="text-lg sm:text-xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-slate-900 max-w-4xl">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 0.6, duration: 0.8 }}
                      className="flex items-center gap-1 sm:gap-1.5 lg:gap-2 mb-1 sm:mb-2"
                    >
                      <span className="text-slate-600 font-medium text-lg sm:text-xl lg:text-3xl xl:text-4xl">
                        Creating
                      </span>
                      <motion.span 
                        initial={{ opacity: 0, y: 20 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="relative inline-block"
                      >
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
                          Safe & Inclusive
                        </span>
                        <motion.div 
                          initial={{ width: 0 }} 
                          animate={{ width: "100%" }} 
                          transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                          className="absolute bottom-0 left-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full shadow-md"
                        />
                      </motion.span>
                    </motion.div>
                    <motion.span 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      transition={{ delay: 1.0, duration: 0.8 }}
                      className="block text-slate-700 font-semibold text-lg sm:text-xl lg:text-3xl xl:text-4xl"
                    >
                      Workplaces for Everyone
                    </motion.span>
                  </h1>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="space-y-3 sm:space-y-4 lg:space-y-6">
                  <p className="text-xs sm:text-sm lg:text-lg xl:text-xl text-slate-600 leading-relaxed max-w-3xl font-medium">
                    We transform organizational cultures through comprehensive{" "}
                    <span className="font-bold text-slate-800 bg-yellow-100 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-md text-xs sm:text-xs lg:text-sm">POSH compliance</span>, expert training, and innovative solutions that make workplaces{" "}
                    <span className="font-bold text-slate-800 bg-green-100 px-1 sm:px-1.5 lg:px-2 py-0.5 rounded-md text-xs sm:text-xs lg:text-sm">safer, more inclusive</span>, and legally compliant across India.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 lg:gap-4">
                    <Link href="/contact">
                      <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-xs sm:text-sm lg:text-base">
                        Get Started
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ml-1.5 sm:ml-2" />
                      </Button>
                    </Link>
                    <Link href="/about">
                      <Button variant="outline" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 px-4 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3 rounded-xl font-semibold transition-all duration-300 text-xs sm:text-sm lg:text-base">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} className="relative lg:pl-4 flex flex-col items-center order-1 lg:order-2 mb-8 lg:mb-0">
                <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
                  {/* Simplified Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl lg:rounded-3xl blur-xl lg:blur-2xl scale-110"></div>
                  
                  <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="relative z-20">
                    <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl shadow-black/50 h-[300px] sm:h-[350px] lg:h-[450px]">
                      {/* Image Container */}
                      <div className="relative w-full h-full">
                        {heroSlides.map((slide, idx) => (
                          idx === currentSlide && (
                            <div 
                              key={idx} 
                              className="absolute inset-0"
                            >
                              <Image 
                                src={slide.src} 
                                alt={slide.alt} 
                                fill
                                className="object-cover" 
                                priority={idx === 0} 
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading={idx === 0 ? "eager" : "lazy"}
                              />
                            </div>
                          )
                        ))}
                      </div>
                      
                      {/* Enhanced Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                      

                      
                      {/* Corner Accents */}
                      <div className="absolute top-3 lg:top-4 left-3 lg:left-4 w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full shadow-lg"></div>
                      <div className="absolute top-3 lg:top-4 right-3 lg:right-4 w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full shadow-lg"></div>
                      <div className="absolute bottom-3 lg:bottom-4 left-3 lg:left-4 w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full shadow-lg"></div>
                      <div className="absolute bottom-3 lg:bottom-4 right-3 lg:right-4 w-2 h-2 lg:w-3 lg:h-3 bg-black rounded-full shadow-lg"></div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>




        {/* Our Expertise Section */}
        <section id="expertise" className="relative pt-4 sm:pt-6 pb-8 sm:pb-12 lg:pb-16 flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute right-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -right-12 text-[6rem] sm:text-[8rem] lg:text-[12rem] text-slate-700 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -right-24 text-4xl sm:text-6xl lg:text-8xl text-slate-600 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -right-10 text-5xl sm:text-7xl lg:text-9xl text-slate-700 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 right-1/4 text-3xl sm:text-4xl lg:text-6xl text-slate-600 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-2 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-left space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-slate-800 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-slate-200/50 shadow-lg shadow-slate-200/50 rounded-full flex items-center space-x-2 sm:space-x-3">
                  
                  <span className="text-lg sm:text-xl lg:text-3xl xl:text-4xl">Expertise</span>
                </Badge>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} viewport={{ once: true }} className="space-y-2 sm:space-y-3 lg:space-y-4">
                <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight tracking-tight text-white">
                  <motion.span 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.6, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="relative inline-block mb-2 sm:mb-3 lg:mb-4"
                  >
                    
                    <motion.div 
                      initial={{ width: 0 }} 
                      whileInView={{ width: "100%" }} 
                      transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }} 
                      viewport={{ once: true }}
                      className="absolute bottom-0 left-0 h-1 sm:h-1.5 lg:h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full shadow-lg"
                    />
                  </motion.span>
                </h2>
              </motion.div>
             
            </motion.div>
            
            <motion.div 
              variants={staggerContainer} 
              initial="initial" 
              whileInView="animate" 
              viewport={{ once: true }} 
              className="max-w-7xl mx-auto"
            >
              {/* Top Row - 3 Gears */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 sm:gap-0.5 lg:gap-1 mb-1 sm:mb-2">
                {expertiseGears.slice(0, 3).map((gear, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
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
              </div>
              
              {/* Bottom Row - 2 Gears */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 sm:gap-0.5 lg:gap-1 max-w-4xl mx-auto">
                {expertiseGears.slice(3, 5).map((gear, index) => (
                  <motion.div
                    key={index + 3}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ExpertiseGear
                      title={gear.title}
                      content={gear.content}
                      color={gear.color}
                      dots={gear.dots}
                      index={index + 3}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Team Carousel Section */}
        <section className="relative py-6 sm:py-8 lg:py-10 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute right-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -right-12 text-[8rem] sm:text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -right-24 text-6xl sm:text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -right-10 text-7xl sm:text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 right-1/4 text-4xl sm:text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            {/* Team Section Heading */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-left space-y-4 sm:space-y-6 mb-8 sm:mb-12">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-slate-800 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-slate-200/50 shadow-lg shadow-slate-200/50 rounded-full flex items-center space-x-2 sm:space-x-3">
                  <span className="text-lg sm:text-xl lg:text-3xl xl:text-4xl">World's Leading POSH Partner</span>
                </Badge>
              </motion.div>
            </motion.div>
            
            {/* Enhanced Carousel Container */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.8 }} 
              viewport={{ once: true }}
              className="relative"
            >
              {/* Carousel Content */}
              <TeamSliceCarousel teamMembers={teamMembers} />
            </motion.div>
            
            {/* Bottom CTA */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.8, duration: 0.6 }} 
              viewport={{ once: true }}
              className="text-center mt-2 sm:mt-4"
            >
              <Button className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 border-0 text-sm sm:text-base">
                Meet Our Full Team
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="relative py-6 sm:py-8 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
          <div className="absolute inset-0 z-0 opacity-20">
            <div className="absolute left-0 top-0 w-1/2 h-full group">
              <Cog className="absolute -top-12 -left-12 text-[8rem] sm:text-[12rem] text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute top-1/4 -left-24 text-6xl sm:text-8xl text-slate-300 transition-transform duration-1000 ease-in-out group-hover:-rotate-[360deg]" />
              <Cog className="absolute bottom-1/4 -left-10 text-7xl sm:text-9xl text-slate-200 transition-transform duration-1000 ease-in-out group-hover:rotate-[360deg]" />
              <Cog className="absolute -bottom-12 left-1/4 text-4xl sm:text-6xl text-slate-300 transition-transform duration-700 ease-in-out group-hover:-rotate-[360deg]" />
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-left space-y-6 sm:space-y-8 mb-12 sm:mb-20">

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} viewport={{ once: true }} className="inline-block">
                <Badge className="bg-gradient-to-r from-slate-100 via-gray-100 to-slate-100 text-slate-800 px-3 sm:px-4 lg:px-6 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base font-bold border border-slate-200/50 shadow-lg shadow-slate-200/50 rounded-full flex items-center space-x-2 sm:space-x-3">
                  <span className="text-lg sm:text-xl lg:text-3xl xl:text-4xl">Sectors</span>
                </Badge>
              </motion.div>
            </motion.div>
            
            <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {industries.map((industry, index) => (
                <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.01, y: -4 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.3 }}>
                  <Card className="h-full border-0 shadow-lg sm:shadow-2xl hover:shadow-2xl sm:hover:shadow-3xl bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl overflow-hidden group relative">
                    {/* Card Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    
                    <CardContent className="relative p-4 sm:p-6 lg:p-8">
                      {/* Header with Icon */}
                      <div className="flex items-center justify-between mb-4 sm:mb-6 lg:mb-8">
                        <div className="relative">
                          <div className="text-4xl sm:text-5xl lg:text-6xl mb-2">{industry.icon}</div>
                        </div>
                      </div>
                      
                      {/* Industry Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-3 sm:mb-4 group-hover:text-slate-800 transition-colors duration-300">{industry.name}</h3>
                      
                      {/* Description */}
                      <p className="text-slate-600 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed font-medium">{industry.description}</p>
                      
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
      
    </div>
  )
}