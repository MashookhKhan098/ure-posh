import React, { useState, useMemo } from 'react';
import { motion } from "framer-motion";
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";

// Animation variants
const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

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
    color: "bg-gradient-to-r from-gray-500 to-gray-600", 
    count: 8,
    description: "Browse all available questions"
  },
  { 
    value: "compliance", 
    label: "Compliance & Security", 
    icon: Shield, 
    color: "bg-gradient-to-r from-gray-500 to-gray-600", 
    count: 2,
    description: "Data protection and compliance standards"
  },
  { 
    value: "pricing", 
    label: "Pricing & Plans", 
    icon: TrendingUp, 
    color: "bg-gradient-to-r from-gray-500 to-gray-600", 
    count: 2,
    description: "Subscription plans and billing"
  },
  { 
    value: "implementation", 
    label: "Implementation", 
    icon: Zap, 
    color: "bg-gradient-to-r from-gray-500 to-gray-600", 
    count: 2,
    description: "Setup and integration guidance"
  },
  { 
    value: "support", 
    label: "Support & Training", 
    icon: Users, 
    color: "bg-gradient-to-r from-gray-500 to-gray-600", 
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
    answer: "We implement enterprise-grade security measures including end-to-end encryption, regular security audits, and compliance with SOC 2 Type II standards. Our infrastructure is hosted on enterprise cloud services with 99.9% uptime guarantee, and we maintain comprehensive backup and disaster recovery procedures. We also provide detailed security documentation and can accommodate custom security requirements for enterprise clients.",
    category: "compliance",
    difficulty: "advanced",
    readTime: "5 min read",
    tags: ["security", "encryption", "cloud", "backup"],
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
      beginner: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
      intermediate: "bg-gradient-to-r from-gray-500 to-gray-600 text-white",
      advanced: "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
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
    <section className="py-32 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-50 rounded-full blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="text-center space-y-6 mb-20"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-black px-8 py-4 text-sm font-semibold rounded-full border border-gray-300 shadow-lg">
              <HelpCircle className="w-4 h-4 mr-2" />
              Frequently Asked Questions
            </Badge>
          </motion.div>
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold text-black leading-tight"
          >
            Got{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              Questions?
            </span>
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-black max-w-4xl mx-auto leading-relaxed"
          >
            We've got answers. Here are the most common questions we receive about our 
            workplace culture transformation services.
          </motion.p>
        </motion.div>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto space-y-6"
        >
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="group"
            >
              <Card className="border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                  >
                    <h3 className="text-xl font-semibold text-black pr-4">
                      {faq.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-6">
                          <div className="pt-4 border-t border-gray-200">
                            <p className="text-black leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            
                            {faq.relatedLinks && faq.relatedLinks.length > 0 && (
                              <div className="space-y-3">
                                {faq.relatedLinks.map((link, index) => (
                                  <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                                    <ArrowRight className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                                    <a
                                      href={link.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-700 text-sm leading-relaxed"
                                    >
                                      {link.title}
                                    </a>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div className="mt-6 pt-4 border-t border-gray-200">
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
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h3>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Our team is here to help. Reach out and we'll get back to you with personalized answers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <MessageCircle className="w-5 h-5 mr-2" />
                Contact Support
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-700 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Call
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;