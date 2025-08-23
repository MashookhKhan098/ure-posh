"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
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
  Users,
  FileText,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Heart,
  Globe,
  Briefcase,
  Calendar,
  ArrowRight,
  Gavel,
  Search,
  FileCheck,
  Zap,
  Lightbulb,
  AlertTriangle,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function CompliantRedressalPage() {
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
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-green-200/40 to-green-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-orange-300/40 to-orange-200/40 rounded-full blur-3xl animate-pulse"></div>
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
              <Badge className="bg-gradient-to-r from-green-100 via-green-200 to-green-100 text-green-800 hover:from-green-200 hover:via-green-300 hover:to-green-200 px-6 py-3 text-base font-semibold border border-green-200/50 shadow-lg shadow-green-500/10">
                <CheckCircle className="w-4 h-4 mr-2" />
                Equality Compliance
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Compliant{" "}
              <span className="bg-gradient-to-r from-green-600 to-orange-600 bg-clip-text text-transparent">
                Redressal
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Implement effective complaint resolution systems that ensure timely, fair, and legally compliant 
              handling of workplace harassment complaints with structured procedures and professional guidance.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>As needed</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Case-by-case</span>
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
                      Effective Complaint Resolution System
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Our Compliant Redressal service provides a comprehensive framework for handling workplace 
                      harassment complaints in a fair, timely, and legally compliant manner. We ensure that every 
                      complaint receives proper attention and resolution.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Structured Procedures</h4>
                          <p className="text-gray-600">Clear, documented processes for complaint handling</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Timely Resolution</h4>
                          <p className="text-gray-600">Efficient processes to resolve complaints promptly</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                          <p className="text-gray-600">Adherence to all POSH Act requirements and timelines</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-green-50 to-orange-50 p-8 rounded-2xl border border-green-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-orange-500 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Complaint Handling Procedures</li>
                          <li>• Investigation Guidelines</li>
                          <li>• Resolution Timelines</li>
                          <li>• Appeal Mechanisms</li>
                          <li>• Documentation Templates</li>
                          <li>• Expert Guidance</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Components</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-green-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <FileText className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-lg">Structured Procedures</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Clear, documented processes for receiving, investigating, and resolving complaints
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-green-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Search className="w-6 h-6 text-orange-600" />
                        </div>
                        <CardTitle className="text-lg">Investigation Support</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Professional guidance for conducting thorough and impartial investigations
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-green-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gavel className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">Resolution Framework</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Fair and consistent resolution mechanisms with appeal processes
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Complaint Resolution Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We follow a systematic approach to ensure every complaint is handled professionally, 
                    fairly, and in compliance with legal requirements while maintaining confidentiality.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Complaint Receipt & Documentation",
                      description: "Structured receipt of complaints with proper documentation, acknowledgment, and initial assessment of the case.",
                      icon: FileText,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "02",
                      title: "Preliminary Assessment",
                      description: "Initial evaluation of the complaint to determine jurisdiction, seriousness, and required response level.",
                      icon: Search,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "03",
                      title: "Investigation Planning",
                      description: "Development of investigation strategy, timeline, and resource allocation for thorough case handling.",
                      icon: Target,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "04",
                      title: "Investigation Execution",
                      description: "Systematic investigation including evidence collection, witness interviews, and fact-finding.",
                      icon: Search,
                      color: "from-orange-500 to-orange-600"
                    },
                    {
                      step: "05",
                      title: "Analysis & Decision",
                      description: "Comprehensive analysis of findings and evidence-based decision-making with clear reasoning.",
                      icon: Gavel,
                      color: "from-pink-500 to-pink-600"
                    },
                    {
                      step: "06",
                      title: "Resolution & Follow-up",
                      description: "Implementation of resolution measures, communication to parties, and follow-up monitoring.",
                      icon: CheckCircle,
                      color: "from-green-500 to-green-600"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Compliant Redressal?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our structured approach ensures not just legal compliance, but also fair, efficient, and 
                    professional handling of workplace harassment complaints that builds trust and confidence.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Immediate Benefits</h3>
                    <div className="space-y-4">
                      {[
                        "Structured complaint handling procedures",
                        "Timely resolution of cases",
                        "Legal compliance assurance",
                        "Professional investigation support",
                        "Clear documentation and tracking",
                        "Reduced risk of legal challenges"
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
                        "Sustainable complaint resolution framework",
                        "Enhanced workplace trust and confidence",
                        "Reduced workplace harassment incidents",
                        "Improved organizational culture",
                        "Better employee satisfaction",
                        "Enhanced employer reputation"
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-green-50 to-orange-50 p-8 rounded-2xl border border-green-100">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Success Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                        <div className="text-gray-700">Legal Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600 mb-2">Timely</div>
                        <div className="text-gray-700">Resolution</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
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
                    Implement a robust complaint resolution system that ensures fair, timely, and compliant 
                    handling of workplace harassment cases with our expert guidance.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Current System Assessment</h4>
                          <p className="text-gray-600">Evaluation of your existing complaint handling procedures</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-orange-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">System Design</h4>
                          <p className="text-gray-600">Customized complaint resolution framework design</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Implementation</h4>
                          <p className="text-gray-600">Systematic implementation with training and support</p>
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
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl text-lg font-bold">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Build Trust Through Fair Resolution
            </h2>
            <p className="text-xl text-gray-600">
              Don't let workplace complaints go unresolved. Implement a robust, compliant, and fair 
              resolution system that protects your employees and your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-xl text-lg font-bold">
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
