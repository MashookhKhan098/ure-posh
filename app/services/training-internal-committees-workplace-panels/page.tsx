"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CheckCircle,
  Shield,
  Target,
  Award,
  Clock,
  Star,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Scale,
  FileText,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Heart,
  Globe,
  Briefcase,
  Calendar,
  ArrowRight,
  Search,
  Eye,
  AlertTriangle,
  Zap,
  Lightbulb,
  Clipboard,
  BarChart3,
  Activity,
  Database,
  Monitor,
  UserCheck,
  Handshake,
  Gavel,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function InternalCommitteesTrainingPage() {
  const [activeTab, setActiveTab] = useState("overview")

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/40 to-blue-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-300/40 to-indigo-200/40 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Link href="/services" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Link>
          </motion.div>

          <div className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Badge className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 text-blue-800 hover:from-blue-200 hover:via-blue-300 hover:to-blue-200 px-6 py-3 text-base font-semibold border border-blue-200/50 shadow-lg shadow-blue-500/10">
                <Users className="w-4 h-4 mr-2" />
                POSH Adaptability
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Internal Committees{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Training
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Empower your Internal Committee members with specialized training that equips them to 
              handle workplace harassment complaints effectively, fairly, and in compliance with legal requirements.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>3-5 days</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>IC Members</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Scale className="w-5 h-5" />
                <span>Legal Compliance</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-12 bg-gray-100 p-1 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="process" className="rounded-lg">Process</TabsTrigger>
              <TabsTrigger value="benefits" className="rounded-lg">Benefits</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">Get Started</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Specialized IC Member Training Program
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Our Internal Committees Training service provides comprehensive, role-specific training 
                      that equips IC members with the knowledge, skills, and confidence to handle workplace 
                      harassment complaints professionally and legally.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Role-Specific Training</h4>
                          <p className="text-gray-600">Tailored training for different IC member roles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                          <p className="text-gray-600">Understanding POSH Act requirements and procedures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Practical Skills</h4>
                          <p className="text-gray-600">Hands-on training with real case scenarios</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Role-Specific Training Modules</li>
                          <li>• Legal Framework Understanding</li>
                          <li>• Investigation Skills Development</li>
                          <li>• Case Handling Procedures</li>
                          <li>• Documentation & Reporting</li>
                          <li>• Ongoing Support & Updates</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Components</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gavel className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">Legal Framework</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Comprehensive understanding of POSH Act requirements and legal procedures
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Search className="w-6 h-6 text-indigo-600" />
                        </div>
                        <CardTitle className="text-lg">Investigation Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Development of professional investigation and fact-finding capabilities
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clipboard className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">Case Management</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Systematic approach to handling complaints and managing case procedures
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Process Tab */}
            <TabsContent value="process" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Training Implementation Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We follow a systematic approach to deliver specialized training that equips IC members 
                    with the expertise needed to handle workplace harassment complaints effectively.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Role Assessment",
                      description: "Comprehensive evaluation of IC member roles, responsibilities, and specific training needs.",
                      icon: Search,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "02",
                      title: "Program Customization",
                      description: "Development of role-specific training modules tailored to different IC member positions.",
                      icon: Target,
                      color: "from-indigo-500 to-indigo-600"
                    },
                    {
                      step: "03",
                      title: "Legal Framework Training",
                      description: "Comprehensive training on POSH Act requirements, legal procedures, and compliance obligations.",
                      icon: Gavel,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "04",
                      title: "Skills Development",
                      description: "Practical training in investigation techniques, case handling, and decision-making processes.",
                      icon: GraduationCap,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "05",
                      title: "Practical Application",
                      description: "Hands-on training with real case scenarios, role-playing, and practical exercises.",
                      icon: Activity,
                      color: "from-orange-500 to-orange-600"
                    },
                    {
                      step: "06",
                      title: "Certification & Support",
                      description: "Training completion certification and ongoing support for continuous improvement.",
                      icon: Award,
                      color: "from-pink-500 to-pink-600"
                    }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-6 items-start">
                      <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0`}>
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <item.icon className="w-6 h-6 text-gray-600" />
                          <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Benefits Tab */}
            <TabsContent value="benefits" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Internal Committees Training?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our specialized training approach ensures IC members are fully equipped with the knowledge, 
                    skills, and confidence to handle workplace harassment complaints professionally and legally.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Immediate Benefits</h3>
                    <div className="space-y-4">
                      {[
                        "Enhanced IC member competence",
                        "Improved complaint handling",
                        "Better investigation skills",
                        "Legal compliance assurance",
                        "Professional case management",
                        "Reduced legal risks"
                      ].map((benefit, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Long-term Advantages</h3>
                    <div className="space-y-4">
                      {[
                        "Sustainable IC framework",
                        "Enhanced organizational compliance",
                        "Improved workplace safety",
                        "Better employee confidence",
                        "Reduced harassment incidents",
                        "Competitive compliance advantage"
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Success Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                        <div className="text-gray-700">Legal Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">3-5</div>
                        <div className="text-gray-700">Days Training</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                        <div className="text-gray-700">Support Available</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Empower your Internal Committee members with specialized training that ensures 
                    effective, compliant, and professional handling of workplace harassment complaints.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">IC Assessment</h4>
                          <p className="text-gray-600">Evaluation of your IC structure and training needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Program Design</h4>
                          <p className="text-gray-600">Customized training program development</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Training Delivery</h4>
                          <p className="text-gray-600">Specialized training with ongoing support</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">+91 98765 43210</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">info@ureposh.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-gray-600" />
                        <span className="text-gray-700">Mumbai, Maharashtra, India</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 rounded-xl text-lg font-bold">
                        Schedule Free Consultation
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Empower Your IC Members Today
            </h2>
            <p className="text-xl text-gray-600">
              Don't let inadequate training compromise your workplace harassment complaint handling. 
              Implement specialized training that ensures professional, compliant, and effective IC operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-xl text-lg font-bold">
                Get Started Now
              </Button>
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-xl text-lg font-bold">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
