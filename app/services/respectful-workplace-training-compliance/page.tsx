"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
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
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function WorkplaceRespectTrainingPage() {
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
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-pink-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-300/40 to-rose-200/40 rounded-full blur-3xl animate-pulse"></div>
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
              <Badge className="bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 text-pink-800 hover:from-pink-200 hover:via-pink-300 hover:to-pink-200 px-6 py-3 text-base font-semibold border border-pink-200/50 shadow-lg shadow-pink-500/10">
                <Heart className="w-4 h-4 mr-2" />
                POSH Adaptability
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Workplace{" "}
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Respect Training
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Foster a culture of mutual respect and dignity through comprehensive training programs that 
              promote inclusive behavior, prevent harassment, and create harmonious work environments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>2-3 days</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>All employees</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Scale className="w-5 h-5" />
                <span>Behavioral Change</span>
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
                      Comprehensive Respect Training Program
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Our Workplace Respect Training service provides interactive, engaging sessions that 
                      help employees understand the importance of mutual respect, recognize inappropriate 
                      behavior, and contribute to a positive workplace culture.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Interactive Learning</h4>
                          <p className="text-gray-600">Engaging sessions with real-world scenarios</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Behavioral Change</h4>
                          <p className="text-gray-600">Practical strategies for respectful interactions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Cultural Transformation</h4>
                          <p className="text-gray-600">Building inclusive workplace environments</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full flex items-center justify-center mx-auto">
                          <Heart className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Interactive Training Sessions</li>
                          <li>• Real-world Scenarios</li>
                          <li>• Behavioral Guidelines</li>
                          <li>• Cultural Transformation</li>
                          <li>• Ongoing Support</li>
                          <li>• Assessment Tools</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Components</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-pink-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserCheck className="w-6 h-6 text-pink-600" />
                        </div>
                        <CardTitle className="text-lg">Respect Awareness</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Understanding the importance of mutual respect and dignity in the workplace
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-pink-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Handshake className="w-6 h-6 text-rose-600" />
                        </div>
                        <CardTitle className="text-lg">Inclusive Behavior</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Promoting inclusive behavior and preventing discriminatory practices
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-pink-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Clipboard className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">Cultural Change</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Building sustainable workplace culture through behavioral transformation
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
                    We follow a systematic approach to deliver effective respect training that creates 
                    lasting behavioral change and transforms workplace culture.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Needs Assessment",
                      description: "Comprehensive evaluation of current workplace culture, existing policies, and specific training requirements.",
                      icon: Search,
                      color: "from-pink-500 to-pink-600"
                    },
                    {
                      step: "02",
                      title: "Program Design",
                      description: "Customized training program development with interactive content, scenarios, and assessment tools.",
                      icon: Target,
                      color: "from-rose-500 to-rose-600"
                    },
                    {
                      step: "03",
                      title: "Training Delivery",
                      description: "Interactive training sessions with real-world scenarios, group discussions, and practical exercises.",
                      icon: GraduationCap,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "04",
                      title: "Behavioral Assessment",
                      description: "Evaluation of training effectiveness and measurement of behavioral change and cultural transformation.",
                      icon: BarChart3,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "05",
                      title: "Follow-up Support",
                      description: "Ongoing support, refresher sessions, and guidance for maintaining respectful workplace culture.",
                      icon: TrendingUp,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "06",
                      title: "Cultural Integration",
                      description: "Integration of respect principles into daily operations and organizational policies.",
                      icon: Heart,
                      color: "from-orange-500 to-orange-600"
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Workplace Respect Training?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our comprehensive training approach ensures not just awareness, but lasting behavioral 
                    change that creates respectful, inclusive, and productive work environments.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Immediate Benefits</h3>
                    <div className="space-y-4">
                      {[
                        "Enhanced workplace respect and dignity",
                        "Reduced incidents of harassment",
                        "Improved team collaboration",
                        "Better communication skills",
                        "Increased employee satisfaction",
                        "Stronger workplace relationships"
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
                        "Sustainable respectful culture",
                        "Enhanced organizational reputation",
                        "Reduced legal risks",
                        "Improved employee retention",
                        "Better workplace productivity",
                        "Competitive cultural advantage"
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Success Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-pink-600 mb-2">95%</div>
                        <div className="text-gray-700">Behavioral Change</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-rose-600 mb-2">2-3</div>
                        <div className="text-gray-700">Days Training</div>
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
                    Transform your workplace culture with comprehensive respect training that creates 
                    lasting behavioral change and fosters inclusive work environments.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-pink-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Culture Assessment</h4>
                          <p className="text-gray-600">Evaluation of your current workplace culture and needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-rose-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Program Design</h4>
                          <p className="text-gray-600">Customized training program development</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Training Delivery</h4>
                          <p className="text-gray-600">Interactive training sessions with ongoing support</p>
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
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-3 rounded-xl text-lg font-bold">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Build a Respectful Workplace Today
            </h2>
            <p className="text-xl text-gray-600">
              Don't let workplace conflicts affect productivity. Implement comprehensive respect training 
              that creates lasting behavioral change and fosters inclusive work environments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl text-lg font-bold">
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
