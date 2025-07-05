import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Filter, 
  Search, 
  MessageCircle, 
  Phone, 
  Clock, 
  Star, 
  Sparkles, 
  Users, 
  Zap, 
  Shield, 
  TrendingUp, 
  X, 
  BookOpen, 
  Lightbulb, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Copy, 
  Share2, 
  BookmarkPlus,
  Eye,
  Calendar,
  Award,
  Target,
  Headphones,
  Mail,
  FileText,
  Tag,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Info
} from 'lucide-react';

// Types
interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  readTime: string;
  tags: string[];
  popularity: number;
  lastUpdated: string;
  views: number;
  helpful: number;
  featured?: boolean;
  videoUrl?: string;
  relatedLinks?: { title: string; url: string }[];
}

interface FAQCategory {
  value: string;
  label: string;
  icon: any;
  color: string;
  count: number;
  description: string;
}

// Data
const FAQ_CATEGORIES: FAQCategory[] = [
  { 
    value: "all", 
    label: "All Questions", 
    icon: HelpCircle, 
    color: "bg-gradient-to-r from-purple-500 to-pink-500", 
    count: 8,
    description: "Browse all available questions"
  },
  { 
    value: "compliance", 
    label: "Compliance & Security", 
    icon: Shield, 
    color: "bg-gradient-to-r from-blue-500 to-cyan-500", 
    count: 2,
    description: "Data protection and compliance standards"
  },
  { 
    value: "pricing", 
    label: "Pricing & Plans", 
    icon: TrendingUp, 
    color: "bg-gradient-to-r from-green-500 to-emerald-500", 
    count: 2,
    description: "Subscription plans and billing"
  },
  { 
    value: "implementation", 
    label: "Implementation", 
    icon: Zap, 
    color: "bg-gradient-to-r from-yellow-500 to-orange-500", 
    count: 2,
    description: "Setup and integration guidance"
  },
  { 
    value: "support", 
    label: "Support & Training", 
    icon: Users, 
    color: "bg-gradient-to-r from-red-500 to-pink-500", 
    count: 2,
    description: "Help and learning resources"
  }
];

const FAQ_DATA: FAQ[] = [
  {
    id: "1",
    question: "How long does it take to implement your workplace culture transformation program?",
    answer: "Our implementation timeline typically ranges from 3-6 months depending on your organization size and complexity. We start with a comprehensive assessment phase (2-4 weeks), followed by strategy development (2-3 weeks), and then gradual rollout with continuous monitoring and adjustment. Most clients see initial improvements within the first month of implementation. We provide detailed project timelines and milestone tracking to ensure transparency throughout the process.",
    category: "implementation",
    difficulty: "beginner",
    readTime: "3 min read",
    tags: ["timeline", "process", "assessment", "strategy"],
    popularity: 95,
    lastUpdated: "2 days ago",
    views: 1284,
    helpful: 89,
    featured: true,
    relatedLinks: [
      { title: "Implementation Checklist", url: "#" },
      { title: "Project Timeline Template", url: "#" }
    ]
  },
  {
    id: "2",
    question: "What compliance frameworks do you support?",
    answer: "We support major compliance frameworks including ISO 27001, SOC 2, GDPR, HIPAA, and PCI DSS. Our platform provides automated compliance monitoring, policy management, and audit trail capabilities. We also offer custom compliance mapping for industry-specific requirements and can integrate with your existing compliance tools. Our compliance experts work with your team to ensure seamless adherence to all relevant standards.",
    category: "compliance",
    difficulty: "intermediate",
    readTime: "4 min read",
    tags: ["ISO", "SOC2", "GDPR", "HIPAA", "security"],
    popularity: 89,
    lastUpdated: "1 week ago",
    views: 956,
    helpful: 92,
    videoUrl: "https://example.com/compliance-video",
    relatedLinks: [
      { title: "Compliance Guide", url: "#" },
      { title: "Security Documentation", url: "#" }
    ]
  },
  {
    id: "3",
    question: "How is pricing structured for different organization sizes?",
    answer: "Our pricing is based on a flexible tiered structure: Starter (up to 100 employees) at $5/user/month, Professional (100-500 employees) at $8/user/month, and Enterprise (500+ employees) with custom pricing. All plans include core features, with higher tiers offering advanced analytics, custom integrations, and dedicated support. We also offer volume discounts for annual commitments and special pricing for non-profits and educational institutions.",
    category: "pricing",
    difficulty: "beginner",
    readTime: "2 min read",
    tags: ["plans", "cost", "enterprise", "discount"],
    popularity: 92,
    lastUpdated: "3 days ago",
    views: 2103,
    helpful: 94,
    featured: true,
    relatedLinks: [
      { title: "Pricing Calculator", url: "#" },
      { title: "ROI Guide", url: "#" }
    ]
  },
  {
    id: "4",
    question: "What kind of support do you provide during and after implementation?",
    answer: "We provide comprehensive support including dedicated customer success managers, 24/7 technical support, regular health checks, and continuous optimization recommendations. Our support includes onboarding training, user adoption programs, and ongoing strategic consulting to ensure you maximize value from our platform. We also offer emergency support and have a guaranteed response time of under 2 hours for critical issues.",
    category: "support",
    difficulty: "beginner",
    readTime: "3 min read",
    tags: ["customer success", "training", "consulting", "24/7"],
    popularity: 88,
    lastUpdated: "5 days ago",
    views: 743,
    helpful: 87,
    relatedLinks: [
      { title: "Support Portal", url: "#" },
      { title: "Training Schedule", url: "#" }
    ]
  },
  {
    id: "5",
    question: "Can your solution integrate with our existing HR and productivity tools?",
    answer: "Yes, we offer native integrations with 50+ popular tools including Slack, Microsoft Teams, Salesforce, Workday, BambooHR, and Google Workspace. Our API-first approach allows for custom integrations, and we provide SSO capabilities for seamless user experience. Our integration team can help map your current tech stack and recommend the best integration approach. We also offer webhook support and real-time data synchronization.",
    category: "implementation",
    difficulty: "intermediate",
    readTime: "4 min read",
    tags: ["integrations", "API", "SSO", "webhook"],
    popularity: 85,
    lastUpdated: "1 week ago",
    views: 834,
    helpful: 91,
    relatedLinks: [
      { title: "Integration Guide", url: "#" },
      { title: "API Documentation", url: "#" }
    ]
  },
  {
    id: "6",
    question: "What security measures do you have in place to protect our data?",
    answer: "We implement enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with SOC 2 Type II standards. Our infrastructure is hosted on AWS with 99.9% uptime guarantee, and we maintain comprehensive backup and disaster recovery procedures. We also provide detailed security documentation and can accommodate custom security requirements for enterprise clients.",
    category: "compliance",
    difficulty: "advanced",
    readTime: "5 min read",
    tags: ["security", "encryption", "AWS", "backup"],
    popularity: 78,
    lastUpdated: "4 days ago",
    views: 567,
    helpful: 85,
    relatedLinks: [
      { title: "Security Whitepaper", url: "#" },
      { title: "Audit Reports", url: "#" }
    ]
  },
  {
    id: "7",
    question: "Do you offer custom pricing for large enterprises?",
    answer: "Absolutely! We understand that large enterprises have unique requirements and scale considerations. Our Enterprise plan includes custom pricing based on your specific needs, user count, and feature requirements. We also offer dedicated account management, custom SLAs, advanced security features, and priority support. Contact our sales team to discuss your requirements and get a tailored quote.",
    category: "pricing",
    difficulty: "intermediate",
    readTime: "2 min read",
    tags: ["enterprise", "custom", "sales", "SLA"],
    popularity: 82,
    lastUpdated: "1 week ago",
    views: 645,
    helpful: 88,
    relatedLinks: [
      { title: "Enterprise Features", url: "#" },
      { title: "Contact Sales", url: "#" }
    ]
  },
  {
    id: "8",
    question: "What training resources are available for new users?",
    answer: "We provide comprehensive training resources including interactive tutorials, video courses, webinars, and documentation. New users get access to our onboarding program with dedicated training sessions, and we offer role-specific training for administrators and end-users. Our learning management system tracks progress and provides certificates upon completion. We also host regular webinars and have a community forum for peer support.",
    category: "support",
    difficulty: "beginner",
    readTime: "3 min read",
    tags: ["training", "onboarding", "webinars", "documentation"],
    popularity: 91,
    lastUpdated: "3 days ago",
    views: 1156,
    helpful: 93,
    featured: true,
    relatedLinks: [
      { title: "Training Portal", url: "#" },
      { title: "Webinar Schedule", url: "#" }
    ]
  }
];

const FAQSection: React.FC = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);

  const filteredFAQs = useMemo(() => {
    let filtered = FAQ_DATA;
    
    if (selectedCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }
    
    if (selectedDifficulty !== "all") {
      filtered = filtered.filter(faq => faq.difficulty === selectedDifficulty);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    filtered.sort((a, b) => {
      if (sortBy === "popularity") return b.popularity - a.popularity;
      if (sortBy === "recent") return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      if (sortBy === "views") return b.views - a.views;
      return 0;
    });
    
    return filtered;
  }, [selectedCategory, selectedDifficulty, searchQuery, sortBy]);

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-gradient-to-r from-green-500 to-emerald-500 text-white",
      intermediate: "bg-gradient-to-r from-yellow-500 to-orange-500 text-white",
      advanced: "bg-gradient-to-r from-red-500 to-pink-500 text-white"
    };
    return colors[difficulty as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600 text-white";
  };

  const getDifficultyIcon = (difficulty: string) => {
    const icons = {
      beginner: CheckCircle2,
      intermediate: AlertCircle,
      advanced: Target
    };
    return icons[difficulty as keyof typeof icons] || Info;
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedDifficulty("all");
    setSortBy("popularity");
    setShowFilters(false);
  };

  const handleQuestionSelect = (faq: FAQ) => {
    setSearchQuery(faq.question);
    setExpandedFAQ(faq.id);
    setShowSearchSuggestions(false);
  };

  const handleSearchFocus = () => {
    if (searchQuery) {
      setShowSearchSuggestions(true);
    }
  };

  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow for click events
    setTimeout(() => setShowSearchSuggestions(false), 200);
  };

  const featuredFAQs = FAQ_DATA.filter(faq => faq.featured);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-10 animate-pulse delay-2000"></div>
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-pink-300 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-40 w-1 h-1 bg-blue-300 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Enhanced Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-gray-700 font-medium">Help Center</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent tracking-tight">
            How can we{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find instant answers to your questions with our comprehensive knowledge base. 
            Search, browse, or get personalized help from our expert team.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{FAQ_DATA.length}</div>
              <div className="text-sm text-gray-600">Help Articles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">2hrs</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">99%</div>
              <div className="text-sm text-gray-600">Satisfaction</div>
            </div>
          </div>
        </div>

        {/* Enhanced Search Section */}
        <div className="mb-12">
          <div className="relative max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                className="w-full pl-16 pr-16 py-6 text-lg border-2 border-gray-200/50 rounded-2xl focus:border-purple-400 focus:outline-none transition-all duration-300 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl focus:shadow-2xl"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowSearchSuggestions(false);
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Enhanced Search Suggestions */}
            {searchQuery && showSearchSuggestions && filteredFAQs.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 font-medium">Quick suggestions</p>
                    <span className="text-xs text-gray-500">{filteredFAQs.length} results</span>
                  </div>
                </div>
                {filteredFAQs.slice(0, 5).map(faq => {
                  const categoryData = FAQ_CATEGORIES.find(cat => cat.value === faq.category);
                  const CategoryIcon = categoryData?.icon || HelpCircle;
                  
                  return (
                    <button
                      key={faq.id}
                      onClick={() => handleQuestionSelect(faq)}
                      className="w-full text-left p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 group"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${categoryData?.color || 'bg-gray-500'}`}>
                          <CategoryIcon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                            {faq.question}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-gray-500">{faq.category}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{faq.readTime}</span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-500">{faq.views} views</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Featured Questions */}
        {featuredFAQs.length > 0 && !searchQuery && (
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Most Popular Questions</h2>
              <p className="text-gray-600">Quick answers to commonly asked questions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFAQs.map((faq) => {
                const categoryData = FAQ_CATEGORIES.find(cat => cat.value === faq.category);
                const CategoryIcon = categoryData?.icon || HelpCircle;
                
                return (
                  <button
                    key={faq.id}
                    onClick={() => setExpandedFAQ(faq.id)}
                    className="text-left p-6 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${categoryData?.color || 'bg-gray-500'}`}>
                        <CategoryIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <Award className="w-4 h-4 text-yellow-500" />
                          <span className="text-xs text-gray-600">Featured</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-3 group-hover:text-purple-700 transition-colors line-clamp-2">
                      {faq.question}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{faq.readTime}</span>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{faq.views}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Enhanced Category Pills */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            {FAQ_CATEGORIES.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.value;
              
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`group relative flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                    isSelected
                      ? 'text-white shadow-lg shadow-purple-500/25'
                      : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-lg border border-gray-200/50'
                  }`}
                  style={isSelected ? { background: category.color } : {}}
                >
                  <Icon className="w-6 h-6" />
                  <div className="text-left">
                    <div className="font-medium">{category.label}</div>
                    <div className={`text-xs ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                      {category.description}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full font-medium ${
                    isSelected 
                      ? 'bg-white/20 text-white' 
                      : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-600">
                <span className="font-bold text-gray-900 text-lg">{filteredFAQs.length}</span> 
                <span className="mx-1">of</span>
                <span className="font-bold text-gray-900 text-lg">{FAQ_DATA.length}</span> 
                <span className="ml-1">questions</span>
              </p>
              {(selectedCategory !== "all" || selectedDifficulty !== "all" || searchQuery) && (
                <button
                  onClick={clearAllFilters}
                  className="text-sm text-purple-600 hover:text-purple-700 font-medium underline"
                >
                  Clear filters
                </button>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-lg transition-all duration-200 ${
                  showFilters 
                    ? 'bg-purple-100 border-purple-200 text-purple-700' 
                    : 'bg-white/80 border-gray-200/50 hover:bg-white hover:shadow-md'
                }`}
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Advanced Filters</span>
              </button>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              >
                <option value="popularity">Most Popular</option>
                <option value="recent">Recently Updated</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Advanced Filters */}
        {showFilters && (
          <div className="mb-8 animate-in slide-in-from-top-5 duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Difficulty Level</label>
                  <div className="flex flex-wrap gap-2">
                    {["all", "beginner", "intermediate", "advanced"].map((difficulty) => {
                      const isSelected = selectedDifficulty === difficulty;
                      const DifficultyIcon = difficulty !== "all" ? getDifficultyIcon(difficulty) : HelpCircle;
                      
                      return (
                        <button
                          key={difficulty}
                          onClick={() => setSelectedDifficulty(difficulty)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? "bg-purple-500 text-white shadow-lg transform scale-105"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <DifficultyIcon className="w-4 h-4" />
                          {difficulty === "all" ? "All Levels" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">Popular Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(new Set(FAQ_DATA.flatMap(faq => faq.tags))).slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-purple-100 hover:text-purple-700 transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced FAQ Cards */}
        <div className="space-y-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <HelpCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No questions found</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                We couldn't find any questions matching your search. Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            filteredFAQs.map((faq) => {
              const categoryData = FAQ_CATEGORIES.find(cat => cat.value === faq.category);
              const CategoryIcon = categoryData?.icon || HelpCircle;
              const DifficultyIcon = getDifficultyIcon(faq.difficulty);
              const isExpanded = expandedFAQ === faq.id;
              
              return (
                <div key={faq.id} className="group">
                  <div className="bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Enhanced Question Header */}
                    <div
                      onClick={() => setExpandedFAQ(isExpanded ? null : faq.id)}
                      className="w-full text-left p-6 hover:bg-gray-50/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-inset cursor-pointer"
                    >
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1 space-y-4">
                          {/* Enhanced Metadata Row */}
                          <div className="flex items-center gap-3 flex-wrap">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(faq.difficulty)}`}>
                              <DifficultyIcon className="w-3 h-3" />
                              <span>{faq.difficulty}</span>
                            </div>
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium text-white`} style={{ background: categoryData?.color }}>
                              <CategoryIcon className="w-3 h-3" />
                              <span>{faq.category}</span>
                            </div>
                            {faq.featured && (
                              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                <Award className="w-3 h-3" />
                                <span>Featured</span>
                              </div>
                            )}
                          </div>

                          {/* Enhanced Stats Row */}
                          <div className="flex items-center gap-4 text-xs text-black">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{faq.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{faq.helpful}% helpful</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              <span>{faq.views} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>Updated {faq.lastUpdated}</span>
                            </div>
                          </div>

                          {/* Enhanced Question */}
                          <h3 className="text-xl font-bold text-black leading-relaxed pr-8 group-hover:text-purple-700 transition-colors">
                            {faq.question}
                          </h3>

                          {/* Enhanced Tags */}
                          <div className="flex flex-wrap gap-2">
                            {faq.tags.slice(0, 4).map((tag, tagIndex) => (
                              <button
                                key={tagIndex}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSearchQuery(tag);
                                }}
                                className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium hover:bg-purple-200 transition-colors"
                              >
                                #{tag}
                              </button>
                            ))}
                            {faq.tags.length > 4 && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">
                                +{faq.tags.length - 4} more
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Enhanced Expand Button */}
                        <div className="flex-shrink-0 mt-2">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                            isExpanded 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:scale-110'
                          }`}>
                            {isExpanded ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Answer Section */}
                    {isExpanded && (
                      <div className="border-t border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-blue-50/50 animate-in slide-in-from-top-5 duration-300">
                        <div className="p-6">
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 shadow-sm">
                            <div className="flex items-start gap-4">
                              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                                <Lightbulb className="w-5 h-5 text-white" />
                              </div>
                              <div className="flex-1">
                                <p className="text-black leading-relaxed text-lg">
                                  {faq.answer}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Video Link */}
                          {faq.videoUrl && (
                            <div className="mt-4">
                              <a
                                href={faq.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                              >
                                <BookOpen className="w-4 h-4" />
                                Watch Video Guide
                              </a>
                            </div>
                          )}

                          {/* Related Links */}
                          {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <h4 className="text-sm font-medium text-black mb-3">Related Resources</h4>
                              <div className="space-y-2">
                                {faq.relatedLinks.map((link, index) => (
                                  <a
                                    key={index}
                                    href={link.url}
                                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-700 transition-colors"
                                  >
                                    <ArrowRight className="w-3 h-3" />
                                    {link.title}
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                          
                          {/* Enhanced Action Buttons */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-6">
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-black font-medium">Was this helpful?</span>
                              <div className="flex gap-2">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-green-700 bg-green-100 border border-green-200 rounded-lg hover:bg-green-200 transition-all duration-200 hover:scale-105">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span>Yes</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-100 border border-red-200 rounded-lg hover:bg-red-200 transition-all duration-200 hover:scale-105">
                                  <ThumbsDown className="w-4 h-4" />
                                  <span>No</span>
                                </button>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <button className="flex items-center gap-1 px-3 py-1 text-xs text-black hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50">
                                <Copy className="w-3 h-3" />
                                Copy Link
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1 text-xs text-black hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50">
                                <Share2 className="w-3 h-3" />
                                Share
                              </button>
                              <button className="flex items-center gap-1 px-3 py-1 text-xs text-black hover:text-purple-600 transition-colors rounded-lg hover:bg-purple-50">
                                <BookmarkPlus className="w-3 h-3" />
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Enhanced Contact Support */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-8 text-center text-white shadow-2xl relative overflow-hidden">
            {/* Enhanced Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl"></div>
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-4 left-4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-4 left-8 w-1 h-1 bg-white/30 rounded-full animate-pulse delay-2000"></div>
              <div className="absolute top-12 left-1/2 w-1 h-1 bg-white/25 rounded-full animate-pulse delay-500"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold mb-4">
                Still need help?
              </h3>
              <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
                Our expert support team is ready to provide personalized assistance. 
                Get the help you need, when you need it.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="flex items-center justify-center gap-3 bg-white text-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg">
                  <MessageCircle className="w-5 h-5" />
                  <span>Start Live Chat</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-200 transform hover:scale-105">
                  <Phone className="w-5 h-5" />
                  <span>Schedule Call</span>
                </button>
                <button className="flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-200 transform hover:scale-105">
                  <Mail className="w-5 h-5" />
                  <span>Email Support</span>
                </button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span>Available 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>2hr Response Time</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>99% Satisfaction</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4" />
                  <span>Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;