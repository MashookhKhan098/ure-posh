"use client"

import React, { useState, useEffect } from "react"
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
  Filter,
  SortAsc,
  ExternalLink,
  Linkedin,
  Github,
  Badge,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

import TeamImageBar from "../../components/TeamImageBar"
import { getPeople, PeopleFilters } from "@/lib/api/people"
import { Person } from "@/types/database"

// Helper function to get flag emoji for languages
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
  const [selectedMember, setSelectedMember] = useState<Person | null>(null)
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [teamMembers, setTeamMembers] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Fetch data from database
  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true)
        const filters: PeopleFilters = {
          category: activeFilter !== 'all' ? activeFilter : undefined,
          search: searchQuery || undefined,
          sortBy: sortBy as any
        }
        
        const response = await getPeople(filters)
        
        if (response.error) {
          setError(response.error)
        } else {
          setTeamMembers(response.data)
        }
      } catch (err) {
        setError('Failed to fetch people data')
        console.error('Error fetching people:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPeople()
  }, [activeFilter, searchQuery, sortBy])

  // Helper function to get icon component by name
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'scale': return Scale
      case 'calculator': return Calculator
      case 'graduationcap': return GraduationCap
      case 'brain': return Brain
      default: return Users
    }
  }

  const openMemberProfile = (member: Person) => {
    setSelectedMember(member)
  }

  const closeMemberProfile = () => {
    setSelectedMember(null)
  }

  const categories = [
    { id: 'all', label: 'All Professionals', color: 'from-slate-600 to-slate-700' },
    { id: 'legal', label: 'Legal Experts', color: 'from-blue-600 to-indigo-700' },
    { id: 'finance', label: 'Financial Advisors', color: 'from-green-600 to-emerald-700' },
  ]

  const sortOptions = [
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'experience', label: 'Experience' },
    { value: 'rating', label: 'Rating' },
    { value: 'projects', label: 'Projects' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      
      {/* Modern Hero Section with TeamImageBar */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/90 to-indigo-900/80">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <TeamImageBar />
        </div>
        
        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-2 mb-3">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">Meet Our Expert Team</span>
            </div>
            <h1 className="text-2xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent">
              Exceptional Professionals
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Connect with our carefully curated team of legal experts and financial advisors
            </p>
          </div>
        </div>
      </div>

      {/* Modern Search and Filter Section */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search professionals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white shadow-sm text-gray-700 placeholder-gray-500 transition-all duration-200"
              />
            </div>

            {/* Filters and Controls */}
            <div className="flex items-center gap-3">
              {/* Category Filter Pills */}
              <div className="hidden lg:flex items-center gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-xl text-gray-600 hover:bg-gray-200 transition-colors"
              >
                <Filter className="h-4 w-4" />
                Filters
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white text-gray-700 text-sm font-medium"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="hidden md:flex border border-gray-200 rounded-xl p-1 bg-gray-50">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-gray-400 rounded-sm"></div>
                    ))}
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="space-y-1">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-gray-400 h-0.5 w-4 rounded-full"></div>
                    ))}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 p-4 bg-gray-50 rounded-xl">
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveFilter(category.id)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeFilter === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Our Professionals
            </h2>
            {!loading && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {teamMembers.length} {teamMembers.length === 1 ? 'professional' : 'professionals'}
              </span>
            )}
          </div>
          {activeFilter !== 'all' && (
            <button
              onClick={() => {
                setActiveFilter('all')
                setSearchQuery('')
              }}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Team Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading && (
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
              <p className="text-gray-600">Loading professionals...</p>
            </div>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <div className="bg-red-50 rounded-2xl p-4 max-w-md mx-auto">
              <X className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 mb-3">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )}
        
        {!loading && !error && teamMembers.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-gray-50 rounded-2xl p-4 max-w-md mx-auto">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Professionals Found</h3>
              <p className="text-gray-600 mb-3">Try adjusting your search criteria or filters</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setActiveFilter("all")
                }}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
        
        {!loading && !error && teamMembers.length > 0 && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" 
            : "space-y-6"
          }>
            {teamMembers.map((member) => {
              const IconComponent = getIconComponent(member.icon_name || '')

              if (viewMode === 'list') {
                return (
                  <div key={member.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group">
                    <div className="flex items-start gap-4">
                      {/* Profile Image/Icon */}
                      <div className="flex-shrink-0">
                        {member.image_url ? (
                          <img
                            src={member.image_url}
                            alt={member.name}
                            className="w-20 h-20 rounded-2xl object-cover border-2 border-gray-100"
                          />
                        ) : (
                          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color_gradient || 'from-blue-500 to-indigo-600'} flex items-center justify-center`}>
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                              {member.verified && (
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                              )}
                              {member.featured && (
                                <Award className="h-5 w-5 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-blue-600 font-semibold mb-1">{member.title}</p>
                            <p className="text-gray-600 text-sm">{member.specialization}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-semibold text-yellow-700">{member.rating}</span>
                            <span className="text-xs text-gray-500">({member.review_count})</span>
                          </div>
                        </div>

                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{member.description}</p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {member.expertise.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                          {member.expertise.length > 3 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                              +{member.expertise.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Stats and Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{member.experience} experience</span>
                            <span>•</span>
                            <span>{member.projects} projects</span>
                            <span>•</span>
                            <span>{member.completion_rate}% success</span>
                          </div>
                          <button
                            onClick={() => openMemberProfile(member)}
                            className="bg-blue-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-600 transition-colors group-hover:shadow-md"
                          >
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

              // Grid View
              return (
                <div key={member.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  {/* Header with gradient */}
                  <div className={`h-32 bg-gradient-to-br ${member.color_gradient || 'from-blue-500 to-indigo-600'} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      {member.featured && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                      )}
                      {member.verified && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 border border-white/30">
                          <CheckCircle className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-4 left-6">
                      <div className="flex items-center gap-2 text-white">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{member.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Section */}
                  <div className="px-6 -mt-8 relative">
                    {/* Profile Image/Icon */}
                    <div className="mb-4">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover border-4 border-white shadow-lg"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-white border-4 border-white shadow-lg flex items-center justify-center">
                          <IconComponent className={`h-8 w-8 text-${member.accent_color || 'blue'}-500`} />
                        </div>
                      )}
                    </div>

                    {/* Name and Title */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{member.name}</h3>
                      </div>
                      <p className="text-blue-600 font-semibold text-sm mb-1">{member.title}</p>
                      <p className="text-gray-600 text-xs line-clamp-2">{member.specialization}</p>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-semibold text-yellow-700">{member.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">({member.review_count} reviews)</span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-3">{member.description}</p>

                    {/* Skills */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-2">
                        {member.expertise.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-600 rounded-full text-xs font-medium border border-gray-200">
                            +{member.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-3 p-4 bg-gray-50 rounded-2xl">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900">{member.projects}</div>
                        <div className="text-xs text-gray-500">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{member.completion_rate}%</div>
                        <div className="text-xs text-gray-500">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{member.experience}</div>
                        <div className="text-xs text-gray-500">Experience</div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="pb-6">
                      <button
                        onClick={() => openMemberProfile(member)}
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        <span>View Profile</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Enhanced Profile Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={closeMemberProfile}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-100">
            {/* Close Button */}
            <button
              onClick={closeMemberProfile}
              className="absolute top-4 right-6 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-200 shadow-lg border border-gray-200 hover:shadow-xl"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>

            {/* Header Section */}
            <div className={`relative h-48 bg-gradient-to-br ${selectedMember.color_gradient || 'from-blue-500 to-indigo-600'} overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-16 translate-y-16"></div>
              </div>
              
              {/* Content */}
              <div className="relative h-full flex items-center px-8">
                <div className="flex items-center gap-4">
                  {/* Profile Image */}
                  <div className="flex-shrink-0">
                    {selectedMember.image_url ? (
                      <img
                        src={selectedMember.image_url}
                        alt={selectedMember.name}
                        className="w-24 h-24 rounded-3xl object-cover border-4 border-white shadow-2xl"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-3xl bg-white border-4 border-white shadow-2xl flex items-center justify-center">
                        {React.createElement(getIconComponent(selectedMember.icon_name || ''), { 
                          className: "h-12 w-12 text-gray-700" 
                        })}
                      </div>
                    )}
                  </div>
                  
                  {/* Basic Info */}
                  <div className="text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-xl font-bold">{selectedMember.name}</h1>
                      <div className="flex gap-2">
                        {selectedMember.verified && (
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        )}
                        {selectedMember.featured && (
                          <div className="bg-white/20 backdrop-blur-sm rounded-full p-1.5">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-white/90 mb-2">{selectedMember.title}</p>
                    <p className="text-white/80 mb-3">{selectedMember.specialization}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{selectedMember.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{selectedMember.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                        <Star className="h-4 w-4 text-yellow-300 fill-current" />
                        <span className="font-semibold">{selectedMember.rating}</span>
                        <span className="text-white/70">({selectedMember.review_count})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="overflow-y-auto max-h-[calc(95vh-12rem)] p-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* About */}
                  <section className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                      <div className="bg-blue-500 rounded-xl p-2">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      About
                    </h2>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedMember.detailed_description || selectedMember.description}
                    </p>
                  </section>

                  {/* Skills & Expertise */}
                  {selectedMember.skills.length > 0 && (
                    <section className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-4 border border-purple-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <div className="bg-purple-500 rounded-xl p-2">
                          <Target className="h-5 w-5 text-white" />
                        </div>
                        Skills & Expertise
                      </h2>
                      
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold text-gray-600 mb-3">CORE COMPETENCIES</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedMember.expertise.map((skill, idx) => (
                            <span key={idx} className="px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm font-medium text-gray-700 shadow-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-600 mb-4">SKILL PROFICIENCY</h3>
                        <div className="space-y-4">
                          {selectedMember.skills.map((skill, idx) => (
                            <div key={idx}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-gray-900">{skill.name}</span>
                                <span className="text-sm font-bold text-purple-600">{skill.level}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div 
                                  className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${skill.level}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>
                  )}

                  {/* Recent Projects */}
                  {selectedMember.recent_projects.length > 0 && (
                    <section className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-4 border border-green-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <div className="bg-green-500 rounded-xl p-2">
                          <Briefcase className="h-5 w-5 text-white" />
                        </div>
                        Recent Projects
                      </h2>
                      <div className="space-y-4">
                        {selectedMember.recent_projects.map((project, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-semibold text-gray-900">{project.title}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-1">{project.client}</p>
                            <p className="text-gray-500 text-xs">{project.duration}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}

                  {/* Education */}
                  {selectedMember.education.length > 0 && (
                    <section className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-4 border border-blue-100">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-3">
                        <div className="bg-blue-500 rounded-xl p-2">
                          <GraduationCap className="h-5 w-5 text-white" />
                        </div>
                        Education
                      </h2>
                      <div className="space-y-4">
                        {selectedMember.education.map((edu, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                <p className="text-gray-600 text-sm">{edu.institution}</p>
                              </div>
                              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">{edu.year}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Key Stats */}
                  <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-4 border border-indigo-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Key Stats</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Projects Completed</span>
                        <span className="font-bold text-indigo-600">{selectedMember.projects}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Success Rate</span>
                        <span className="font-bold text-green-600">{selectedMember.completion_rate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Response Time</span>
                        <span className="font-bold text-blue-600">{selectedMember.response_time}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Availability</span>
                        <span className={`font-bold ${
                          selectedMember.availability === 'Available' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {selectedMember.availability}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Contact</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{selectedMember.email}</span>
                      </div>
                      {selectedMember.phone && (
                        <div className="flex items-center gap-3">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-700">{selectedMember.phone}</span>
                        </div>
                      )}
                      {selectedMember.website && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-4 w-4 text-gray-500" />
                          <a href={selectedMember.website} className="text-sm text-blue-600 hover:underline">
                            Website
                          </a>
                        </div>
                      )}
                      {selectedMember.linkedin && (
                        <div className="flex items-center gap-3">
                          <Linkedin className="h-4 w-4 text-gray-500" />
                          <a href={`https://${selectedMember.linkedin}`} className="text-sm text-blue-600 hover:underline">
                            LinkedIn
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Languages */}
                  {selectedMember.languages.length > 0 && (
                    <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-4 border border-orange-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedMember.languages.map((lang, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-white border border-orange-200 rounded-lg text-sm font-medium text-gray-700">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Certifications */}
                  {selectedMember.certifications.length > 0 && (
                    <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl p-4 border border-yellow-100">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
                      <div className="space-y-2">
                        {selectedMember.certifications.map((cert, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Badge className="h-4 w-4 text-yellow-600" />
                            <span className="text-sm text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Contact Now
                    </button>
                    <button className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
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
