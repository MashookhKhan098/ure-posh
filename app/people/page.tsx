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
  CopyIcon,
} from "lucide-react"
import Link from "next/link"

import TeamImageBar from "../../components/TeamImageBar"

// 1. Add flag emoji helper for languages
const getFlagEmoji = (lang: string) => {
  switch (lang.toLowerCase()) {
    case "english": return "🇬🇧";
    case "hindi": return "🇮🇳";
    case "punjabi": return "🇮🇳";
    case "marathi": return "🇮🇳";
    case "sanskrit": return "🇮🇳";
    case "kannada": return "🇮🇳";
    case "tamil": return "🇮🇳";
    default: return "🌐";
  }
};

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
      title: "Organizational Psychologist & HR Consultant",
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
        "Licensed Clinical Psychologist",
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
      achievements: ["Best Organizational Psychologist - Pune", "Excellence in Employee Wellness"],
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

  // Helper to split name for header
  const getNameParts = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length === 1) return { first: name, last: '' };
    return {
      first: parts.slice(0, -1).join(' '),
      last: parts[parts.length - 1],
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-fuchsia-50">
      
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
      <div className="h-auto">
        <TeamImageBar />
      </div>

      {/* Filters and Search Section */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-row items-center gap-3 justify-center">
            <span className="font-semibold text-gray-700 text-base">People</span>
            <div className="relative w-72">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search by name, expertise, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 placeholder-gray-500"
              />
            </div>
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="h-12 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
            >
              <option value="all">All Categories</option>
              <option value="legal">Legal Experts</option>
              <option value="finance">Financial Advisors</option>
              <option value="psychology">Psychologists</option>
            </select>
            <select
              className="h-12 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
            >
              <option value="all">All Status</option>
              <option value="available">Available</option>
              <option value="busy">Busy</option>
            </select>
            <select
              className="h-12 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
            >
              <option value="all">All Expertise</option>
              <option value="compliance">Compliance</option>
              <option value="training">Training</option>
              <option value="wellbeing">Well-being</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-12 px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 backdrop-blur-sm shadow-sm text-gray-700 font-medium"
            >
              <option value="name">Sort by Name</option>
              <option value="experience">Sort by Experience</option>
              <option value="rating">Sort by Rating</option>
              <option value="projects">Sort by Projects</option>
            </select>
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
              <div key={member.id} className="perspective-1000 h-[370px]">
                <div
                  className={`relative w-full h-full transition-transform duration-700 preserve-3d will-change-transform ${isFlipped ? "rotate-y-180" : ""} overflow-hidden`}
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

                        {/* Ratings and stats removed - no gap */}

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

                        {/* Status section removed */}

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

                  {/* Back of Card - Redesigned */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180">
                    <div className="h-full bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden flex flex-col">
                      {/* Header */}
                      <div className={`h-16 bg-gradient-to-r ${member.color} flex items-center justify-between px-5`}>
                        <h3 className="text-white font-bold text-base truncate">{member.name}</h3>
                        <button onClick={() => toggleCardFlip(member.id)} className="bg-white/20 rounded-full p-1.5 border border-white/30" aria-label="Close details">
                          <X className="h-4 w-4 text-white" />
                        </button>
                      </div>
                      <div className="flex-1 flex flex-col gap-3 p-4 overflow-y-auto">
                        {/* Skills */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-pink-500" />
                            <span className="font-bold text-gray-900 text-xs">Skills & Expertise</span>
                          </div>
                          <div className="space-y-2">
                            {member.skills.slice(0, 3).map((skill, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between text-xs mb-0.5">
                                  <span className="text-gray-700 font-medium">{skill.name}</span>
                                  <span className="text-pink-600 font-bold">{skill.level}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="border-t border-pink-100 my-2"></div>
                        {/* Contact */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Mail className="h-4 w-4 text-pink-500" />
                            <span className="font-bold text-gray-900 text-xs">Contact</span>
                          </div>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <Mail className="h-3 w-3 text-pink-500" />
                              <span className="truncate">{member.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-700">
                              <MapPin className="h-3 w-3 text-pink-500" />
                              <span>{member.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-pink-100 my-2"></div>
                        {/* Testimonial */}
                        {member.testimonials && member.testimonials.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <MessageCircle className="h-4 w-4 text-pink-500" />
                              <span className="font-bold text-gray-900 text-xs">Latest Review</span>
                            </div>
                            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg p-2 border border-pink-100">
                              <div className="flex items-center gap-1 mb-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`h-3 w-3 ${i < member.testimonials[0].rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
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
                        <div className="border-t border-pink-100 my-2"></div>
                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-2 text-center border border-green-100">
                            <p className="text-xs font-bold text-green-600">{member.completionRate}%</p>
                            <p className="text-[10px] text-green-700 font-medium">Success</p>
                          </div>
                          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-2 text-center border border-blue-100">
                            <p className="text-xs font-bold text-blue-600">{member.experience}</p>
                            <p className="text-[10px] text-blue-700 font-medium">Experience</p>
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden relative flex flex-col">
            {/* Close Button */}
            <button
              onClick={closeMemberProfile}
              aria-label="Close profile modal"
              className="absolute top-6 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg border border-gray-200"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>

            {/* Profile Header - Premium Design */}
            <div className="relative h-40 flex items-center bg-gradient-to-r from-pink-500 via-rose-500 to-fuchsia-500 border-b-4 border-pink-200">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
              <div className="relative z-10 flex flex-row items-center w-full max-w-3xl mx-auto px-4 md:h-40 h-auto py-4 md:py-0">
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 ${selectedMember.featured ? 'ring-4 ring-yellow-400' : selectedMember.verified ? 'ring-4 ring-green-400' : ''} rounded-full flex-shrink-0 ml-4 md:ml-0`} style={{alignSelf: 'flex-start'}}>
                  {selectedMember.image ? (
                    <img
                      src={selectedMember.image}
                      alt={selectedMember.name}
                      className="h-20 w-20 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  ) : (
                    <selectedMember.icon className="h-20 w-20 text-white" />
                  )}
                  {selectedMember.featured && (
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-white rounded-full p-1 shadow-lg" title="Featured"><Award className="h-5 w-5" /></span>
                  )}
                  {selectedMember.verified && (
                    <span className="absolute -bottom-2 -right-2 bg-green-400 text-white rounded-full p-1 shadow-lg" title="Verified"><CheckCircle className="h-5 w-5" /></span>
                  )}
                </div>
                <div className="flex flex-row flex-1 min-w-0 items-center text-left w-full gap-10 md:gap-20 pl-28 md:pl-32">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg leading-tight mb-0 md:mb-0 break-words">
                    {selectedMember.name}
                  </h1>
                  <div className="flex flex-col items-start text-left gap-1 w-full">
                    <p className="text-base md:text-lg text-white/90 font-semibold leading-tight truncate">{selectedMember.title}</p>
                    <p className="text-white/80 text-sm md:text-base leading-tight truncate">{selectedMember.specialization}</p>
                    <div className="flex flex-wrap items-center gap-6 mt-2 text-xs md:text-sm w-full">
                      <div className="flex items-center gap-1" title="Rating">
                        <Star className="h-4 w-4 text-yellow-300 fill-current" />
                        <span className="font-bold text-white">{selectedMember.rating}</span>
                        <span className="text-white/80">({selectedMember.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1" title="Projects">
                        <TrendingUp className="h-4 w-4 text-green-300" />
                        <span className="text-white font-medium">{selectedMember.projects} projects</span>
                      </div>
                      <div className="flex items-center gap-1" title="Success Rate">
                        <Shield className="h-4 w-4 text-blue-300" />
                        <span className="text-white font-medium">{selectedMember.completionRate}% success</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto p-0">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-10">
                  {/* About Section */}
                  <section className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-3xl p-8 border border-pink-200 mb-4 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-pink-500 rounded-2xl p-3"><BookOpen className="h-6 w-6 text-white" /></div>
                      <h2 className="text-2xl font-bold text-gray-900">About</h2>
                    </div>
                    <blockquote className="text-gray-700 leading-relaxed text-lg italic border-l-4 border-pink-400 pl-4 mb-2">{selectedMember.detailedDescription}</blockquote>
                    {selectedMember.philosophy && (
                      <div className="mt-4 text-pink-700 font-semibold text-base">“{selectedMember.philosophy}”</div>
                    )}
                  </section>

                  {/* Skills & Expertise */}
                  <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md mb-4">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-purple-500 rounded-2xl p-3"><Target className="h-6 w-6 text-white" /></div>
                      <h2 className="text-2xl font-bold text-gray-900">Skills & Expertise</h2>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {selectedMember.expertise.map((skill: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-700 rounded-full text-xs font-medium border border-pink-200 shadow-sm">{skill}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedMember.skills.map((skill: any, index: number) => (
                        <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-bold text-gray-900 text-lg">{skill.name}</span>
                            <span className="text-pink-600 font-bold text-lg">{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-gradient-to-r from-pink-500 to-rose-500 h-3 rounded-full transition-all duration-1000 shadow-sm" style={{ width: `${skill.level}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Education & Certifications Timeline */}
                  <section className="rounded-3xl p-0 border-none mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Education Timeline */}
                      <div className="bg-blue-50 rounded-3xl p-8 border border-blue-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-blue-500 rounded-2xl p-3"><GraduationCap className="h-6 w-6 text-white" /></div>
                          <h3 className="text-xl font-bold text-gray-900">Education</h3>
                        </div>
                        <ol className="relative border-l-2 border-blue-200 ml-2">
                          {selectedMember.education.map((edu: any, index: number) => (
                            <li key={index} className="mb-6 ml-4">
                              <div className="absolute w-3 h-3 bg-blue-400 rounded-full mt-1.5 -left-1.5 border border-white"></div>
                              <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
                                <h4 className="font-bold text-gray-900 text-base">{edu.degree}</h4>
                                <p className="text-blue-600 font-semibold text-base">{edu.institution}</p>
                                <p className="text-gray-600 text-sm">{edu.year}</p>
                              </div>
                            </li>
                          ))}
                        </ol>
                      </div>
                      {/* Certifications as Badges */}
                      <div className="bg-green-50 rounded-3xl p-8 border border-green-200 shadow-md">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="bg-green-500 rounded-2xl p-3"><Award className="h-6 w-6 text-white" /></div>
                          <h3 className="text-xl font-bold text-gray-900">Certifications</h3>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {selectedMember.certifications.map((cert: string, index: number) => (
                            <span key={index} className="bg-white rounded-full px-4 py-2 border border-green-200 flex items-center gap-2 shadow-sm text-green-700 font-semibold text-sm"><CheckCircle className="h-4 w-4 text-green-500" />{cert}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Recent Projects */}
                  <section className="bg-orange-50 rounded-3xl p-8 border border-orange-200 mb-4 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-orange-500 rounded-2xl p-3"><Briefcase className="h-6 w-6 text-white" /></div>
                      <h3 className="text-xl font-bold text-gray-900">Recent Projects</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMember.recentProjects.map((project: any, index: number) => (
                        <div key={index} className="bg-white rounded-2xl p-4 border border-orange-100 shadow-sm flex flex-col gap-2">
                          <h4 className="font-bold text-gray-900 mb-1 text-base">{project.title}</h4>
                          <p className="text-orange-600 font-semibold mb-1">{project.client}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600 font-medium text-sm">{project.duration}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === "Completed" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>{project.status}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Testimonials Grid */}
                  <section className="bg-purple-50 rounded-3xl p-8 border border-purple-200 mb-4 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-purple-500 rounded-2xl p-3"><MessageCircle className="h-6 w-6 text-white" /></div>
                      <h2 className="text-xl font-bold text-gray-900">Client Testimonials</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedMember.testimonials.map((testimonial: any) => (
                        <div key={testimonial.id} className="bg-white rounded-2xl p-5 border border-purple-100 shadow-sm flex flex-col gap-2">
                          <div className="flex items-center gap-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                            ))}
                          </div>
                          <p className="text-gray-700 italic leading-relaxed text-base">"{testimonial.feedback}"</p>
                          <div className="flex justify-between items-center mt-2">
                            <div>
                              <p className="font-bold text-gray-900 text-base">{testimonial.client}</p>
                              <p className="text-purple-600 font-semibold text-sm">{testimonial.projectType}</p>
                            </div>
                            <p className="text-gray-500 text-xs">{testimonial.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* Achievements */}
                  <section className="bg-yellow-50 rounded-3xl p-8 border border-yellow-200 mb-4 shadow-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-yellow-500 rounded-2xl p-3"><Zap className="h-6 w-6 text-white" /></div>
                      <h3 className="text-xl font-bold text-gray-900">Achievements</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedMember.achievements.map((achievement: string, index: number) => (
                        <div key={index} className="bg-white rounded-2xl p-4 border border-yellow-100 flex items-center gap-3 shadow-sm">
                          <Award className="h-5 w-5 text-yellow-500" />
                          <span className="text-gray-700 font-semibold text-base">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>

                {/* Sidebar - Premium Design */}
                <aside className="space-y-6 lg:sticky lg:top-8 h-fit">
                  {/* Contact Card */}
                  <section className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl mb-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-2"><Mail className="h-5 w-5 text-white" /></div>
                      <h3 className="text-lg font-bold">Contact</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Mail className="h-4 w-4" />
                        <span className="font-medium text-sm">{selectedMember.email}</span>
                        <button aria-label="Copy email" className="ml-auto bg-white/20 rounded-full p-1 hover:bg-white/30 transition"><CopyIcon className="h-4 w-4 text-white" /></button>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Phone className="h-4 w-4" />
                        <span className="font-medium text-sm">{selectedMember.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <MapPin className="h-4 w-4" />
                        <span className="font-medium text-sm">{selectedMember.location}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Globe className="h-4 w-4" />
                        <span className="font-medium text-sm">{selectedMember.website}</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium text-sm">Responds in {selectedMember.responseTime}</span>
                      </div>
                    </div>
                  </section>

                  {/* Quick Stats */}
                  <section className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-indigo-500 rounded-2xl p-2"><TrendingUp className="h-5 w-5 text-white" /></div>
                      <h3 className="text-lg font-bold text-gray-900">Statistics</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
                        <p className="text-xl font-bold text-green-600">{selectedMember.completionRate}%</p>
                        <p className="text-green-700 font-semibold text-sm">Success Rate</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                        <p className="text-xl font-bold text-blue-600">{selectedMember.experience}</p>
                        <p className="text-blue-700 font-semibold text-sm">Experience</p>
                      </div>
                      <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl border border-purple-200">
                        <p className="text-xl font-bold text-purple-600">{selectedMember.projects}</p>
                        <p className="text-purple-700 font-semibold text-sm">Projects</p>
                      </div>
                    </div>
                  </section>

                  {/* Languages */}
                  <section className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm mb-2">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-teal-500 rounded-2xl p-2"><Globe className="h-5 w-5 text-white" /></div>
                      <h3 className="text-lg font-bold text-gray-900">Languages</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMember.languages.map((language: string, index: number) => (
                        <span key={index} className="px-3 py-2 bg-teal-50 text-teal-700 rounded-2xl font-semibold border border-teal-200 text-sm flex items-center gap-1"><span className="text-sm">{getFlagEmoji(language)}</span> {language}</span>
                      ))}
                    </div>
                  </section>

                  {/* Action Buttons */}
                  <section className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-2xl font-bold text-base hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2" aria-label="Hire Now">
                      <MessageCircle className="h-5 w-5" /> Hire Now
                    </button>
                    <button className="w-full bg-white border-2 border-pink-200 text-pink-600 py-3 px-6 rounded-2xl font-bold text-base hover:bg-pink-50 transition-all duration-200 flex items-center justify-center gap-2" aria-label="Schedule Consultation">
                      <Calendar className="h-5 w-5" /> Schedule Consultation
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-1" aria-label="Share Profile">
                        <Share2 className="h-4 w-4" /> Share
                      </button>
                      <button className="bg-gray-100 text-gray-700 py-2 px-3 rounded-2xl font-semibold hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-1" aria-label="Save Profile">
                        <Heart className="h-4 w-4" /> Save
                      </button>
                    </div>
                  </section>
                </aside>
              </div>
            </div>
          </div>
        </div>
      )}



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
        .will-change-transform {
          will-change: transform;
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
      <style jsx>{`
        @media (max-width: 768px) {
          .md\\:flex-row {
            flex-direction: column !important;
          }
          .md\\:h-40 {
            height: auto !important;
          }
          .md\\:mx-0 {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          .md\\:mb-0 {
            margin-bottom: 1rem !important;
          }
          .md\\:items-start {
            align-items: flex-start !important;
          }
          .md\\:gap-8 {
            gap: 1.5rem !important;
          }
          .whitespace-nowrap {
            white-space: normal !important;
          }
          .absolute.left-0 {
            position: static !important;
            left: auto !important;
            top: auto !important;
            transform: none !important;
            margin-left: 0 !important;
            margin-bottom: 1rem !important;
          }
          .pl-28, .md\:pl-32 {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
