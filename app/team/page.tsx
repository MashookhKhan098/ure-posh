"use client"

import { useState } from "react"
import {
  Scale,
  Calculator,
  GraduationCap,
  Brain,
  Star,
  MapPin,
  Clock,
  Mail,
  Phone,
  CheckCircle,
  Award,
  TrendingUp,
  Users,
  Search,
  Info,
  X,
  MessageCircle,
  Calendar,
  Globe,
  Briefcase,
  Share2,
  Heart,
  Shield,
  Zap,
  Target,
  BookOpen,
  Menu,
  ChevronDown,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

import TeamImageBar from "./components/TeamImageBar"

export default function TeamPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMember, setSelectedMember] = useState<any>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const teamMembers = [
    {
      id: 1,
      name: "CS Anchal Chopra",
      title: "Company Secretary & Legal Expert",
      specialization: "Corporate Law & Compliance",
      icon: Scale,
      color: "from-pink-500 to-rose-600",
      accentColor: "pink",
      description:
        "Expert in corporate governance and legal compliance with extensive experience in POSH implementation and workplace safety regulations.",
      detailedDescription:
        "With over a decade of experience in corporate law and compliance, CS Anchal Chopra has established herself as a leading authority in POSH implementation and workplace safety. Her comprehensive approach combines legal expertise with practical implementation strategies, helping organizations create safer, more inclusive work environments.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "Corporate Governance",
        "Legal Compliance",
        "POSH Implementation",
        "Risk Management",
        "Company Law",
        "Regulatory Advisory",
      ],
      experience: "10+ years",
      email: "anchal.chopra@ureposh.com",
      phone: "+91 98765 43210",
      location: "New Delhi, India",
      website: "www.anchalchopra.com",
      linkedin: "linkedin.com/in/anchalchopra",
      category: "legal",
      rating: 4.9,
      reviewCount: 187,
      projects: 156,
      completionRate: 98,
      responseTime: "2 hours",
      availability: "Available",
      hourlyRate: "₹5,000",
      monthlyRate: "₹1,50,000",
      projectRate: "₹25,000",
      languages: ["English", "Hindi", "Punjabi"],
      education: [
        {
          degree: "Company Secretary",
          institution: "Institute of Company Secretaries of India",
          year: "2012",
        },
        {
          degree: "LLB",
          institution: "Delhi University",
          year: "2010",
        },
      ],
      certifications: ["Certified POSH Trainer", "Corporate Governance Expert", "Risk Management Professional"],
      skills: [
        { name: "Corporate Law", level: 95 },
        { name: "POSH Compliance", level: 98 },
        { name: "Risk Management", level: 90 },
        { name: "Training & Development", level: 92 },
      ],
      testimonials: [
        {
          id: 1,
          client: "TechCorp Solutions",
          feedback: "Exceptional expertise in POSH implementation. Made the entire process seamless.",
          rating: 5,
          date: "2024-01-15",
          projectType: "POSH Implementation",
        },
        {
          id: 2,
          client: "Global Manufacturing",
          feedback: "Professional approach and deep knowledge of corporate compliance.",
          rating: 5,
          date: "2023-12-20",
          projectType: "Compliance Audit",
        },
        {
          id: 3,
          client: "StartupHub India",
          feedback: "Outstanding legal guidance and support throughout our compliance journey.",
          rating: 5,
          date: "2023-11-10",
          projectType: "Legal Advisory",
        },
      ],
      recentProjects: [
        {
          title: "POSH Policy Implementation",
          client: "Tech Solutions Ltd",
          duration: "3 months",
          status: "Completed",
        },
        {
          title: "Corporate Governance Review",
          client: "Manufacturing Corp",
          duration: "2 months",
          status: "In Progress",
        },
      ],
      achievements: [
        "Top 10 Corporate Lawyers in Delhi - 2023",
        "Excellence in POSH Implementation Award",
        "Best Legal Advisor - Startup Category",
      ],
      status: "premium",
      verified: true,
      featured: true,
    },
    {
      id: 2,
      name: "CA Shweta Gupta",
      title: "Chartered Accountant & Financial Advisor",
      specialization: "Financial Compliance & Risk Management",
      icon: Calculator,
      color: "from-rose-500 to-pink-600",
      accentColor: "rose",
      description:
        "Specialized in financial compliance and risk assessment for workplace safety programs with expertise in audit management and strategic financial planning.",
      detailedDescription:
        "CA Shweta Gupta brings comprehensive financial expertise to workplace safety and compliance programs. Her analytical approach to risk assessment and financial planning ensures organizations can implement effective POSH programs while maintaining fiscal responsibility.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "Financial Compliance",
        "Risk Assessment",
        "Audit Management",
        "Strategic Planning",
        "Tax Advisory",
        "Financial Reporting",
      ],
      experience: "8+ years",
      email: "shweta.gupta@ureposh.com",
      phone: "+91 98765 43211",
      location: "Mumbai, India",
      website: "www.shwetaguptaca.com",
      linkedin: "linkedin.com/in/shwetaguptaca",
      category: "finance",
      rating: 4.8,
      reviewCount: 134,
      projects: 112,
      completionRate: 96,
      responseTime: "3 hours",
      availability: "Available",
      hourlyRate: "₹4,500",
      monthlyRate: "₹1,20,000",
      projectRate: "₹20,000",
      languages: ["English", "Hindi", "Marathi"],
      education: [
        {
          degree: "Chartered Accountant",
          institution: "Institute of Chartered Accountants of India",
          year: "2015",
        },
        {
          degree: "B.Com",
          institution: "Mumbai University",
          year: "2013",
        },
      ],
      certifications: ["Certified Risk Management Professional", "Financial Planning Expert", "Audit Specialist"],
      skills: [
        { name: "Financial Analysis", level: 94 },
        { name: "Risk Assessment", level: 91 },
        { name: "Audit Management", level: 88 },
        { name: "Compliance Reporting", level: 93 },
      ],
      testimonials: [
        {
          id: 1,
          client: "Financial Services Corp",
          feedback: "Outstanding financial compliance expertise. Helped optimize our budget significantly.",
          rating: 5,
          date: "2024-01-10",
          projectType: "Financial Audit",
        },
        {
          id: 2,
          client: "Investment Group",
          feedback: "Excellent risk assessment and strategic financial planning.",
          rating: 5,
          date: "2023-12-15",
          projectType: "Risk Management",
        },
      ],
      recentProjects: [
        {
          title: "Financial Compliance Audit",
          client: "Banking Solutions",
          duration: "4 months",
          status: "Completed",
        },
        {
          title: "Risk Assessment Framework",
          client: "Insurance Corp",
          duration: "2 months",
          status: "In Progress",
        },
      ],
      achievements: [
        "Best CA in Financial Compliance - 2023",
        "Excellence in Risk Management Award",
        "Top Financial Advisor - Mumbai",
      ],
      status: "standard",
      verified: true,
      featured: false,
    },
    {
      id: 3,
      name: "Adv. Shringarika Tyagi",
      title: "Legal Academic & Gender Justice Expert",
      specialization: "POSH Law & Policy Research",
      icon: GraduationCap,
      color: "from-fuchsia-500 to-purple-600",
      accentColor: "fuchsia",
      description:
        "UGC-NET qualified legal academic pursuing Ph.D. in Law, specializing in gender justice and POSH compliance with extensive research background.",
      detailedDescription:
        "Adv. Shringarika Tyagi combines academic excellence with practical legal expertise in gender justice and POSH law. Her research-driven approach to policy development and implementation has helped shape modern workplace safety standards across various industries.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "POSH Law",
        "Gender Justice",
        "Policy Research",
        "Legal Education",
        "Academic Research",
        "Constitutional Law",
      ],
      experience: "12+ years",
      email: "shringarika.tyagi@ureposh.com",
      phone: "+91 98765 43212",
      location: "Delhi, India",
      website: "www.shringarikatyagi.com",
      linkedin: "linkedin.com/in/shringarikatyagi",
      category: "legal",
      rating: 4.9,
      reviewCount: 203,
      projects: 178,
      completionRate: 99,
      responseTime: "1 hour",
      availability: "Available",
      hourlyRate: "₹6,000",
      monthlyRate: "₹1,80,000",
      projectRate: "₹30,000",
      languages: ["English", "Hindi", "Sanskrit"],
      education: [
        {
          degree: "Ph.D. in Law (Pursuing)",
          institution: "Jawaharlal Nehru University",
          year: "2024",
        },
        {
          degree: "LLM",
          institution: "Delhi University",
          year: "2012",
        },
        {
          degree: "LLB",
          institution: "Delhi University",
          year: "2010",
        },
      ],
      certifications: [
        "UGC-NET Qualified",
        "Gender Justice Expert",
        "POSH Law Specialist",
        "Constitutional Law Expert",
      ],
      skills: [
        { name: "POSH Law", level: 98 },
        { name: "Gender Justice", level: 96 },
        { name: "Policy Research", level: 94 },
        { name: "Legal Training", level: 95 },
      ],
      testimonials: [
        {
          id: 1,
          client: "Government Think Tank",
          feedback: "Exceptional research capabilities and deep understanding of gender justice issues.",
          rating: 5,
          date: "2024-01-20",
          projectType: "Policy Research",
        },
        {
          id: 2,
          client: "Legal Education Institute",
          feedback: "Outstanding academic expertise and practical implementation knowledge.",
          rating: 5,
          date: "2023-12-25",
          projectType: "Legal Training",
        },
      ],
      recentProjects: [
        {
          title: "POSH Policy Framework Development",
          client: "Government Agency",
          duration: "6 months",
          status: "Completed",
        },
        {
          title: "Gender Justice Research Study",
          client: "Academic Institution",
          duration: "8 months",
          status: "In Progress",
        },
      ],
      achievements: [
        "Best Research Paper on Gender Justice - 2023",
        "Excellence in Legal Education Award",
        "Top POSH Law Expert - India",
      ],
      status: "premium",
      verified: true,
      featured: true,
    },
    {
      id: 4,
      name: "CA Sarvagya Goyal",
      title: "Chartered Accountant & Audit Specialist",
      specialization: "Compliance Auditing & Process Optimization",
      icon: Calculator,
      color: "from-pink-400 to-rose-500",
      accentColor: "pink",
      description:
        "Expert in compliance auditing and financial oversight for organizational safety programs with focus on process optimization and quality assurance.",
      detailedDescription:
        "CA Sarvagya Goyal specializes in creating robust audit frameworks for workplace safety programs. His systematic approach to compliance auditing ensures organizations maintain the highest standards while optimizing operational efficiency.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "Compliance Auditing",
        "Financial Oversight",
        "Process Optimization",
        "Quality Assurance",
        "Internal Controls",
        "Risk Assessment",
      ],
      experience: "7+ years",
      email: "sarvagya.goyal@ureposh.com",
      phone: "+91 98765 43213",
      location: "Bangalore, India",
      website: "www.sarvagyagoyal.com",
      linkedin: "linkedin.com/in/sarvagyagoyal",
      category: "finance",
      rating: 4.7,
      reviewCount: 98,
      projects: 89,
      completionRate: 94,
      responseTime: "4 hours",
      availability: "Available",
      hourlyRate: "₹4,000",
      monthlyRate: "₹1,00,000",
      projectRate: "₹18,000",
      languages: ["English", "Hindi", "Kannada"],
      education: [
        {
          degree: "Chartered Accountant",
          institution: "Institute of Chartered Accountants of India",
          year: "2016",
        },
        {
          degree: "B.Com",
          institution: "Bangalore University",
          year: "2014",
        },
      ],
      certifications: ["Certified Internal Auditor", "Process Optimization Expert", "Quality Assurance Specialist"],
      skills: [
        { name: "Audit Management", level: 92 },
        { name: "Compliance Review", level: 89 },
        { name: "Process Optimization", level: 87 },
        { name: "Quality Assurance", level: 85 },
      ],
      testimonials: [
        {
          id: 1,
          client: "Manufacturing Group",
          feedback: "Excellent audit capabilities and attention to detail in compliance matters.",
          rating: 5,
          date: "2024-01-05",
          projectType: "Compliance Audit",
        },
      ],
      recentProjects: [
        {
          title: "Internal Audit Framework",
          client: "Tech Company",
          duration: "3 months",
          status: "Completed",
        },
      ],
      achievements: ["Best Auditor - Bangalore Chapter", "Excellence in Process Optimization"],
      status: "standard",
      verified: true,
      featured: false,
    },
    {
      id: 5,
      name: "Adv. Pradeep Kumar",
      title: "Legal Advisor & Litigation Expert",
      specialization: "Employment Law & Dispute Resolution",
      icon: Scale,
      color: "from-rose-400 to-pink-500",
      accentColor: "rose",
      description:
        "Experienced in employment law and workplace dispute resolution with focus on harassment cases and legal counseling.",
      detailedDescription:
        "Adv. Pradeep Kumar brings extensive litigation experience to workplace dispute resolution. His expertise in employment law and mediation has helped numerous organizations resolve complex harassment cases while maintaining workplace harmony.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "Employment Law",
        "Dispute Resolution",
        "Litigation",
        "Legal Counseling",
        "Contract Law",
        "Labor Relations",
      ],
      experience: "15+ years",
      email: "pradeep.kumar@ureposh.com",
      phone: "+91 98765 43214",
      location: "Chennai, India",
      website: "www.pradeepkumarlaw.com",
      linkedin: "linkedin.com/in/pradeepkumarlaw",
      category: "legal",
      rating: 4.8,
      reviewCount: 245,
      projects: 198,
      completionRate: 97,
      responseTime: "6 hours",
      availability: "Busy",
      hourlyRate: "₹7,000",
      monthlyRate: "₹2,00,000",
      projectRate: "₹35,000",
      languages: ["English", "Hindi", "Tamil"],
      education: [
        {
          degree: "LLM",
          institution: "Madras University",
          year: "2010",
        },
        {
          degree: "LLB",
          institution: "Madras University",
          year: "2008",
        },
      ],
      certifications: ["Employment Law Expert", "Certified Mediator", "Litigation Specialist"],
      skills: [
        { name: "Employment Law", level: 96 },
        { name: "Dispute Resolution", level: 94 },
        { name: "Litigation", level: 93 },
        { name: "Legal Counseling", level: 91 },
      ],
      testimonials: [
        {
          id: 1,
          client: "Corporate Legal Dept",
          feedback: "Outstanding litigation skills and deep knowledge of employment law.",
          rating: 5,
          date: "2024-01-12",
          projectType: "Employment Dispute",
        },
      ],
      recentProjects: [
        {
          title: "Employment Dispute Resolution",
          client: "Large Corporation",
          duration: "4 months",
          status: "Completed",
        },
      ],
      achievements: ["Top Employment Lawyer - Chennai", "Excellence in Dispute Resolution"],
      status: "premium",
      verified: true,
      featured: false,
    },
    {
      id: 6,
      name: "Dr. Meera Sharma",
      title: "Mental health professional & HR Consultant",
      specialization: "Workplace Psychology & Behavioral Training",
      icon: Brain,
      color: "from-pink-300 to-rose-400",
      accentColor: "pink",
      description:
        "Specialized in workplace psychology, behavioral training, and creating psychologically safe work environments with expertise in trauma-informed approaches.",
      detailedDescription:
        "Dr. Meera Sharma combines clinical psychology expertise with organizational development to create psychologically safe workplaces. Her trauma-informed approach to workplace training has transformed organizational cultures across various industries.",
      image: "/placeholder.svg?height=400&width=400",
      coverImage: "/placeholder.svg?height=300&width=800",
      expertise: [
        "Workplace Psychology",
        "Behavioral Training",
        "Trauma-Informed Care",
        "Employee Wellness",
        "Conflict Resolution",
        "Leadership Development",
      ],
      experience: "9+ years",
      email: "meera.sharma@ureposh.com",
      phone: "+91 98765 43215",
      location: "Pune, India",
      website: "www.meerasharma.com",
      linkedin: "linkedin.com/in/meerasharma",
      category: "psychology",
      rating: 4.9,
      reviewCount: 156,
      projects: 134,
      completionRate: 97,
      responseTime: "3 hours",
      availability: "Available",
      hourlyRate: "₹5,500",
      monthlyRate: "₹1,40,000",
      projectRate: "₹28,000",
      languages: ["English", "Hindi", "Marathi"],
      education: [
        {
          degree: "Ph.D. in Psychology",
          institution: "Pune University",
          year: "2015",
        },
        {
          degree: "M.A. Psychology",
          institution: "Pune University",
          year: "2012",
        },
      ],
      certifications: [
        "Licensed Clinical Mental health professional",
        "Trauma-Informed Care Specialist",
        "Organizational Development Expert",
      ],
      skills: [
        { name: "Workplace Psychology", level: 96 },
        { name: "Behavioral Training", level: 94 },
        { name: "Trauma-Informed Care", level: 92 },
        { name: "Employee Wellness", level: 90 },
      ],
      testimonials: [
        {
          id: 1,
          client: "Tech Startup",
          feedback: "Exceptional understanding of workplace psychology and employee wellness.",
          rating: 5,
          date: "2024-01-08",
          projectType: "Workplace Psychology",
        },
      ],
      recentProjects: [
        {
          title: "Employee Wellness Program",
          client: "Software Company",
          duration: "5 months",
          status: "In Progress",
        },
      ],
      achievements: ["Best Mental health professional - Pune", "Excellence in Employee Wellness"],
      status: "standard",
      verified: true,
      featured: false,
    },
  ]

  const filteredMembers = teamMembers.filter((member) => {
    const matchesFilter = activeFilter === "all" || member.category === activeFilter
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.expertise.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const sortedMembers = [...filteredMembers].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "experience":
        return Number.parseInt(b.experience) - Number.parseInt(a.experience)
      case "rating":
        return b.rating - a.rating
      case "projects":
        return b.projects - a.projects
      default:
        return 0
    }
  })

  const toggleCardFlip = (memberId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(memberId)) {
        newSet.delete(memberId)
      } else {
        newSet.add(memberId)
      }
      return newSet
    })
  }

  const openMemberProfile = (member: any) => {
    setSelectedMember(member)
  }

  const closeMemberProfile = () => {
    setSelectedMember(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      {/* Exact UREPOSH Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-full p-3">
                <Heart className="h-6 w-6 text-white fill-current" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  UREPOSH
                </h1>
                <p className="text-sm text-black font-medium">Transforming Workplaces <br /> Empowering Lives</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link 
                href="/" 
                className="text-pink-600 font-semibold px-4 py-2 rounded-full bg-pink-50 text-sm transition-all duration-200 hover:bg-pink-100"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-black font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:text-black"
              >
                About
              </Link>
              <Link 
                href="/expertise" 
                className="text-black font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:text-black"
              >
                Expertise
              </Link>
              <Link 
                href="/people" 
                className="text-pink-600 font-semibold px-4 py-2 rounded-full bg-pink-50 text-sm transition-all duration-200 hover:bg-pink-100"
              >
                People
              </Link>
              <Link 
                href="/work" 
                className="text-black font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:text-black"
              >
                Work
              </Link>
              <Link 
                href="/connect" 
                className="text-black font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:text-black cursor-smile"
              >
                Connect
              </Link>
              <Link 
                href="/news" 
                className="text-black font-medium px-4 py-2 rounded-full text-sm transition-all duration-200 hover:bg-gray-100 hover:text-black"
              >
                News
              </Link>
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-sm hover:shadow-md">
                Start Journey
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-full text-black hover:bg-gray-100 hover:text-pink-600 transition-all duration-200"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="lg:hidden mt-2 border-t border-pink-200">
                <div className="flex flex-col space-y-2 p-3">
                  <Link 
                    href="/" 
                    className="text-pink-600 font-semibold px-3 py-2 rounded-full bg-pink-50 text-sm"
                  >
                    Home
                  </Link>
                  <Link 
                    href="/about" 
                    className="text-black font-medium px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:text-black"
                  >
                    About
                  </Link>
                  <Link 
                    href="/expertise" 
                    className="text-black font-medium px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:text-black"
                  >
                    Expertise
                  </Link>
                  <Link 
                    href="/people" 
                    className="text-pink-600 font-semibold px-3 py-2 rounded-full bg-pink-50 text-sm"
                  >
                    People
                  </Link>
                  <Link 
                    href="/work" 
                    className="text-black font-medium px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:text-black"
                  >
                    Work
                  </Link>
                  <Link 
                    href="/connect" 
                    className="text-black font-medium px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:text-black"
                  >
                    Connect
                  </Link>
                  <Link 
                    href="/news" 
                    className="text-black font-medium px-3 py-2 rounded-full text-sm hover:bg-gray-100 hover:text-black"
                  >
                    News
                  </Link>
                  <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-sm hover:shadow-md">
                    Start Journey
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-gray-100 py-4">
              <div className="flex flex-col space-y-3">
                <Link href="/" className="text-pink-600 font-semibold px-4 py-2 rounded-lg bg-pink-50 text-sm">
                  Home
                </Link>
                <Link href="/about" className="text-black font-medium px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">
                  About
                </Link>
                <Link href="/expertise" className="text-black font-medium px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">
                  Expertise
                </Link>
                <Link href="/people" className="text-pink-600 font-semibold px-4 py-2 rounded-lg bg-pink-50 text-sm">
                  People
                </Link>
                <Link href="/work" className="text-black font-medium px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">
                  Work
                </Link>
                <Link href="/connect" className="text-black font-medium px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">
                  Connect
                </Link>
                <Link href="/news" className="text-black font-medium px-4 py-2 hover:bg-gray-50 rounded-lg text-sm">
                  News
                </Link>
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2.5 rounded-full font-semibold mx-4 mt-2 text-sm">
                  Start Journey
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="bg-white/60 backdrop-blur-sm border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center text-sm text-gray-600">
            <a href="#" className="hover:text-pink-600 transition-colors duration-200">
              Home
            </a>
            <ChevronDown className="h-4 w-4 mx-2 rotate-[-90deg] text-gray-400" />
            <span className="text-pink-600 font-medium">Our People</span>
          </div>
        </div>
      </div>
      <TeamImageBar/>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Meet Our Expert Team
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
              Certified professionals specializing in POSH compliance and workplace safety, dedicated to transforming
              workplaces and empowering lives
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-white/90">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Certified Experts</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Award className="h-5 w-5" />
                <span className="font-medium">Industry Leaders</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Trusted Partners</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-black font-medium">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-rose-600 mb-2">98%</div>
              <div className="text-black font-medium">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-fuchsia-600 mb-2">50+</div>
              <div className="text-black font-medium">Expert Team</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <div className="text-black font-medium">Support Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-black h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search by name, expertise, or specialization..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/90 backdrop-blur-sm shadow-sm text-black font-medium placeholder-gray-500"
                />
              </div>

              <select
                value={activeFilter}
                onChange={(e) => setActiveFilter(e.target.value)}
                className="px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
              >
                <option value="all">All Categories</option>
                <option value="legal">Legal Experts</option>
                <option value="finance">Financial Advisors</option>
                <option value="psychology">Mental health professionals</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
              >
                <option value="name">Sort by Name</option>
                <option value="experience">Sort by Experience</option>
                <option value="rating">Sort by Rating</option>
                <option value="projects">Sort by Projects</option>
              </select>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 font-medium">
                Showing {sortedMembers.length} of {teamMembers.length} experts
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Grid - Fixed Card Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedMembers.map((member) => {
            const IconComponent = member.icon
            const isFlipped = flippedCards.has(member.id)

            return (
              <div key={member.id} className="perspective-1000 h-[450px]">
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}
                >
                  {/* Front of Card - Fixed Design */}
                  <div className="absolute inset-0 backface-hidden">
                    <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-pink-100 overflow-hidden group hover:-translate-y-1">
                      {/* Header with Gradient - Fixed Height */}
                      <div className={`h-20 bg-gradient-to-r ${member.color} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
                        <div className="absolute top-3 right-3 flex gap-2">
                          {member.featured && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30">
                              <Award className="h-3 w-3 text-white" />
                            </div>
                          )}
                          {member.verified && (
                            <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 border border-white/30">
                              <CheckCircle className="h-3 w-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Profile Section - Fixed Layout */}
                      <div className="px-5 -mt-8 relative z-10 h-[calc(100%-5rem)] flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="bg-white rounded-xl p-3 shadow-lg border-4 border-white">
                            <IconComponent className={`h-6 w-6 text-${member.accentColor}-500`} />
                          </div>
                          <button
                            onClick={() => toggleCardFlip(member.id)}
                            className="mt-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-200 border border-pink-200 hover:border-pink-300"
                          >
                            <Info className="h-4 w-4 text-pink-600" />
                          </button>
                        </div>

                        {/* Name and Title - Fixed Height */}
                        <div className="mb-3">
                          <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-1">{member.name}</h3>
                          <p className="text-pink-600 font-semibold text-sm leading-tight line-clamp-1">
                            {member.title}
                          </p>
                          <p className="text-gray-600 text-xs mt-1 leading-tight line-clamp-2">
                            {member.specialization}
                          </p>
                        </div>

                        {/* Rating and Stats - Fixed Height */}
                        <div className="flex items-center gap-4 mb-3 p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-400 fill-current" />
                            <span className="text-xs font-bold text-gray-900">{member.rating}</span>
                            <span className="text-xs text-gray-500">({member.reviewCount})</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 text-green-500" />
                            <span className="text-xs font-medium text-gray-700">{member.projects}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Shield className="h-3 w-3 text-blue-500" />
                            <span className="text-xs font-medium text-gray-700">{member.completionRate}%</span>
                          </div>
                        </div>

                        {/* Skills Preview - Fixed Height */}
                        <div className="mb-3 flex-shrink-0">
                          <h4 className="text-xs font-semibold text-gray-900 mb-2">Core Expertise</h4>
                          <div className="flex flex-wrap gap-1">
                            {member.expertise.slice(0, 2).map((skill, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 rounded-full text-xs font-medium border border-pink-200"
                              >
                                {skill}
                              </span>
                            ))}
                            {member.expertise.length > 2 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                                +{member.expertise.length - 2}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Pricing - Fixed Height */}
                        <div className="mb-3 p-3 bg-gradient-to-r from-pink-50 via-rose-50 to-fuchsia-50 rounded-xl border border-pink-200 flex-shrink-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-600 font-medium">Starting from</p>
                              <p className="text-lg font-bold text-pink-600">{member.hourlyRate}/hr</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-gray-600 font-medium">Status</p>
                              <div className="flex items-center gap-1">
                                <div
                                  className={`w-2 h-2 rounded-full ${member.availability === "Available" ? "bg-green-500" : "bg-orange-500"}`}
                                ></div>
                                <p
                                  className={`text-xs font-semibold ${member.availability === "Available" ? "text-green-600" : "text-orange-600"}`}
                                >
                                  {member.availability}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons - Fixed at Bottom */}
                        <div className="mt-auto flex gap-2">
                          <button
                            onClick={() => openMemberProfile(member)}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2.5 px-3 rounded-xl font-semibold text-sm hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            View Profile
                          </button>
                          <button className="bg-white border-2 border-pink-200 text-pink-600 py-2.5 px-3 rounded-xl font-semibold hover:bg-pink-50 hover:border-pink-300 transition-all duration-200 shadow-sm">
                            <MessageCircle className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card - Fixed Design */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
                      {/* Header */}
                      <div className={`h-16 bg-gradient-to-r ${member.color} flex items-center justify-between px-5`}>
                        <h3 className="text-white font-bold text-lg line-clamp-1">{member.name}</h3>
                        <button
                          onClick={() => toggleCardFlip(member.id)}
                          className="bg-white/20 backdrop-blur-sm rounded-full p-1.5 hover:bg-white/30 transition-colors border border-white/30"
                        >
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>

                      <div className="p-5 h-[calc(100%-4rem)] overflow-y-auto">
                        {/* Skills with Progress */}
                        <div className="mb-5">
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                            <Target className="h-4 w-4 text-pink-500" />
                            Skills & Expertise
                          </h4>
                          <div className="space-y-3">
                            {member.skills.slice(0, 3).map((skill, index) => (
                              <div key={index}>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-700 font-medium">{skill.name}</span>
                                  <span className="text-pink-600 font-bold">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-1000"
                                    style={{ width: `${skill.level}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="mb-4">
                          <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-pink-500" />
                            Contact
                          </h4>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <Mail className="h-3 w-3 text-pink-500" />
                              <span className="text-gray-700 text-xs line-clamp-1">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                              <MapPin className="h-3 w-3 text-pink-500" />
                              <span className="text-gray-700 text-xs">{member.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Latest Testimonial */}
                        {member.testimonials && member.testimonials.length > 0 && (
                          <div className="mb-4">
                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm">
                              <MessageCircle className="h-4 w-4 text-pink-500" />
                              Latest Review
                            </h4>
                            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-3 border border-pink-200">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < member.testimonials[0].rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-gray-700 italic leading-relaxed line-clamp-3">
                                "{member.testimonials[0].feedback}"
                              </p>
                              <p className="text-xs text-gray-500 mt-1 font-medium">
                                - {member.testimonials[0].client}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 text-center border border-green-200">
                            <p className="text-sm font-bold text-green-600">{member.completionRate}%</p>
                            <p className="text-xs text-green-700 font-medium">Success</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-2 text-center border border-blue-200">
                            <p className="text-sm font-bold text-blue-600">{member.experience}</p>
                            <p className="text-xs text-blue-700 font-medium">Experience</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {sortedMembers.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No experts found</h3>
            <p className="text-gray-600 text-lg">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery("")
                setActiveFilter("all")
              }}
              className="mt-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Member Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={closeMemberProfile}
              className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg border border-gray-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Cover Image with Gradient Overlay */}
            <div className="relative h-52 overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-r ${selectedMember.color}`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>

              {/* Profile Header */}
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="flex items-end gap-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-5 border border-white/30 shadow-xl">
                    <selectedMember.icon className="h-20 w-20 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <h1 className="text-4xl font-bold">{selectedMember.name}</h1>
                      {selectedMember.verified && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                      )}
                      {selectedMember.featured && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-2xl text-white/95 mb-2 font-semibold">{selectedMember.title}</p>
                    <p className="text-white/85 text-lg">{selectedMember.specialization}</p>
                    <div className="flex items-center gap-8 mt-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-300 fill-current" />
                        <span className="font-bold text-lg">{selectedMember.rating}</span>
                        <span className="text-white/80">({selectedMember.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-300" />
                        <span className="text-white/90 font-medium">{selectedMember.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-blue-300" />
                        <span className="text-white/90 font-medium">{selectedMember.completionRate}% success</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-220px)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* About Section */}
                  <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-8 border border-pink-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-pink-500 rounded-2xl p-3">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">About</h2>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">{selectedMember.detailedDescription}</p>
                  </div>

                  {/* Skills & Expertise */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-purple-500 rounded-2xl p-3">
                        <Target className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Skills & Expertise</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedMember.skills.map((skill: any, index: number) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-900 text-xl">{skill.name}</span>
                            <span className="text-pink-600 font-bold text-xl">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-rose-500 h-4 rounded-full transition-all duration-1000 shadow-sm"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Certifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Education */}
                    <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-500 rounded-2xl p-3">
                          <GraduationCap className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Education</h3>
                      </div>
                      <div className="space-y-4">
                        {selectedMember.education.map((edu: any, index: number) => (
                          <div key={index} className="bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                            <h4 className="font-bold text-gray-900 text-lg">{edu.degree}</h4>
                            <p className="text-blue-600 font-semibold text-lg">{edu.institution}</p>
                            <p className="text-gray-600">{edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="bg-green-50 rounded-3xl p-8 border border-green-200">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-green-500 rounded-2xl p-3">
                          <Award className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Certifications</h3>
                      </div>
                      <div className="space-y-4">
                        {selectedMember.certifications.map((cert: string, index: number) => (
                          <div
                            key={index}
                            className="bg-white rounded-2xl p-4 border border-green-100 flex items-center gap-4 shadow-sm"
                          >
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700 font-semibold">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Recent Projects */}
                  <div className="bg-orange-50 rounded-3xl p-8 border border-orange-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-orange-500 rounded-2xl p-3">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Recent Projects</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedMember.recentProjects.map((project: any, index: number) => (
                        <div key={index} className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
                          <h4 className="font-bold text-gray-900 mb-3 text-lg">{project.title}</h4>
                          <p className="text-orange-600 font-semibold mb-2">{project.client}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium">{project.duration}</span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                project.status === "Completed"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Client Testimonials */}
                  <div className="bg-purple-50 rounded-3xl p-8 border border-purple-200">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="bg-purple-500 rounded-2xl p-3">
                        <MessageCircle className="h-6 w-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900">Client Testimonials</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedMember.testimonials.map((testimonial: any) => (
                        <div
                          key={testimonial.id}
                          className="bg-white rounded-2xl p-8 border border-purple-100 shadow-sm"
                        >
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 italic mb-6 leading-relaxed text-lg">"{testimonial.feedback}"</p>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{testimonial.client}</p>
                              <p className="text-purple-600 font-semibold">{testimonial.projectType}</p>
                            </div>
                            <p className="text-gray-500">{testimonial.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="bg-yellow-50 rounded-3xl p-8 border border-yellow-200">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-yellow-500 rounded-2xl p-3">
                        <Zap className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Achievements</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMember.achievements.map((achievement: string, index: number) => (
                        <div
                          key={index}
                          className="bg-white rounded-2xl p-6 border border-yellow-100 flex items-center gap-4 shadow-sm"
                        >
                          <Award className="h-6 w-6 text-yellow-500" />
                          <span className="text-gray-700 font-semibold text-lg">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Contact Card */}
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-3">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold">Contact Information</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Mail className="h-5 w-5" />
                        <span className="font-medium">{selectedMember.email}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Phone className="h-5 w-5" />
                        <span className="font-medium">{selectedMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <MapPin className="h-5 w-5" />
                        <span className="font-medium">{selectedMember.location}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Globe className="h-5 w-5" />
                        <span className="font-medium">{selectedMember.website}</span>
                      </div>
                      <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Clock className="h-5 w-5" />
                        <span className="font-medium">Responds in {selectedMember.responseTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Card */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-green-500 rounded-2xl p-3">
                        <Calculator className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Pricing</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-2xl border border-green-200">
                        <span className="text-gray-700 font-semibold text-lg">Hourly Rate</span>
                        <span className="font-bold text-green-600 text-2xl">{selectedMember.hourlyRate}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-blue-50 rounded-2xl border border-blue-200">
                        <span className="text-gray-700 font-semibold text-lg">Monthly Rate</span>
                        <span className="font-bold text-blue-600 text-2xl">{selectedMember.monthlyRate}</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-purple-50 rounded-2xl border border-purple-200">
                        <span className="text-gray-700 font-semibold text-lg">Project Rate</span>
                        <span className="font-bold text-purple-600 text-2xl">{selectedMember.projectRate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-indigo-500 rounded-2xl p-3">
                        <TrendingUp className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Statistics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <p className="text-3xl font-bold text-green-600">{selectedMember.completionRate}%</p>
                        <p className="text-green-700 font-semibold">Success Rate</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                        <p className="text-3xl font-bold text-blue-600">{selectedMember.experience}</p>
                        <p className="text-blue-700 font-semibold">Experience</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
                        <p className="text-3xl font-bold text-purple-600">{selectedMember.projects}</p>
                        <p className="text-purple-700 font-semibold">Projects</p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200">
                        <p
                          className={`text-3xl font-bold ${selectedMember.availability === "Available" ? "text-green-600" : "text-orange-600"}`}
                        >
                          {selectedMember.availability === "Available" ? "✓" : "⏳"}
                        </p>
                        <p
                          className={`font-semibold ${selectedMember.availability === "Available" ? "text-green-700" : "text-orange-700"}`}
                        >
                          {selectedMember.availability}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Languages */}
                  <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-teal-500 rounded-2xl p-3">
                        <Globe className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {selectedMember.languages.map((language: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-3 bg-teal-50 text-teal-700 rounded-2xl font-semibold border border-teal-200"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                      <MessageCircle className="h-6 w-6" />
                      Hire Now
                    </button>
                    <button className="w-full bg-white border-2 border-pink-200 text-pink-600 py-4 px-6 rounded-2xl font-bold text-lg hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-3">
                      <Calendar className="h-6 w-6" />
                      Schedule Consultation
                    </button>
                    <div className="grid grid-cols-2 gap-4">
                      <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2">
                        <Share2 className="h-5 w-5" />
                        Share
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2">
                        <Heart className="h-5 w-5" />
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-3 shadow-lg">
                  <Heart className="h-8 w-8 text-white fill-current" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                    UREPOSH
                  </h3>
                  <p className="text-sm text-black font-medium">Transforming Workplaces <br /> Empowering Lives</p>
                </div>
              </div>
              <p className="text-black leading-relaxed mb-4">
                Leading the way in workplace safety and POSH compliance with our team of certified experts and
                comprehensive solutions.
              </p>
              <div className="flex space-x-4">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Mail className="h-5 w-5 text-pink-600" />
                </div>
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Phone className="h-5 w-5 text-pink-600" />
                </div>
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Globe className="h-5 w-5 text-pink-600" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Our Team
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    POSH Training
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Legal Compliance
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Risk Assessment
                  </a>
                </li>
                <li>
                  <a href="#" className="text-black hover:text-pink-600 transition-colors duration-200">
                    Consultation
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">
              © 2024 UREPOSH. All rights reserved. Transforming workplaces, empowering lives.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}
