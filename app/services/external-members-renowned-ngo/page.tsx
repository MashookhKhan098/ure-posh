"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  CheckCircle,
  Building,
  Target,
  Award,
  Clock,
  Star,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Scale,
  Shield,
  FileText,
  TrendingUp,
  BookOpen,
  GraduationCap,
  Heart,
  Globe,
  Briefcase,
  Calendar,
  ArrowRight,
  Handshake,
  UserCheck,
  Eye,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ExternalMembersRenownedNGOPage() {
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
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-green-300/40 to-green-200/40 rounded-full blur-3xl animate-pulse"></div>
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
                Equality Compliance
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              External Members from{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Renowned NGOs
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Connect with experienced external committee members from established NGOs to ensure impartial, 
              professional, and credible handling of workplace harassment cases with the highest ethical standards.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-5 h-5" />
                <span>1-2 weeks</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Expert Panel</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Scale className="w-5 h-5" />
                <span>Impartial Investigation</span>
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
                      Expert External Committee Members
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Our network of external committee members from renowned NGOs brings extensive experience 
                      in workplace investigations, legal compliance, and social justice. They ensure impartial 
                      and professional handling of all POSH cases.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Vetted Professionals</h4>
                          <p className="text-gray-600">Carefully selected experts with proven track records</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Impartial Investigations</h4>
                          <p className="text-gray-600">Unbiased case handling and decision-making</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Legal Expertise</h4>
                          <p className="text-gray-600">Deep understanding of POSH Act and workplace laws</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Users className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Pre-vetted External Members</li>
                          <li>• Impartial Investigation Support</li>
                          <li>• Legal Compliance Assurance</li>
                          <li>• Professional Case Handling</li>
                          <li>• Ongoing Support & Guidance</li>
                          <li>• Credible Outcomes</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UserCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">Vetted Professionals</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Carefully selected experts with proven track records in workplace investigations
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Eye className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-lg">Impartial Handling</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Unbiased investigation and decision-making processes for all cases
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Scale className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">Legal Compliance</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Deep understanding of POSH Act and workplace harassment laws
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Selection & Integration Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We follow a rigorous process to identify, vet, and integrate external committee members 
                    who meet the highest standards of professionalism and expertise.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "NGO Partnership Identification",
                      description: "We identify and establish partnerships with renowned NGOs that have proven track records in social justice and workplace issues.",
                      icon: Handshake,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "02",
                      title: "Expert Screening & Selection",
                      description: "Rigorous screening process to identify individuals with the right qualifications, experience, and ethical standards.",
                      icon: UserCheck,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "03",
                      title: "Background Verification",
                      description: "Comprehensive background checks, reference verification, and assessment of professional credentials.",
                      icon: Shield,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "04",
                      title: "Training & Orientation",
                      description: "Specialized training on POSH Act, investigation procedures, and your organization's specific policies.",
                      icon: GraduationCap,
                      color: "from-orange-500 to-orange-600"
                    },
                    {
                      step: "05",
                      title: "Integration & Support",
                      description: "Seamless integration into your Internal Committee with ongoing support and guidance.",
                      icon: TrendingUp,
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our External Members?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our external committee members bring credibility, expertise, and impartiality that enhance 
                    your organization's POSH compliance framework and investigation processes.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Immediate Benefits</h3>
                    <div className="space-y-4">
                      {[
                        "Impartial and unbiased investigations",
                        "Enhanced credibility of outcomes",
                        "Professional case handling expertise",
                        "Reduced risk of bias allegations",
                        "Compliance with legal requirements",
                        "Improved stakeholder confidence"
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
                        "Sustainable investigation framework",
                        "Enhanced organizational reputation",
                        "Reduced legal liabilities",
                        "Better employee trust",
                        "Improved workplace culture",
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

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Success Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                        <div className="text-gray-700">Impartial Investigations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">1-2</div>
                        <div className="text-gray-700">Weeks Setup</div>
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
                    Enhance your Internal Committee with experienced external members who bring credibility, 
                    expertise, and impartiality to your POSH compliance framework.
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
                          <h4 className="font-semibold text-gray-900">Initial Assessment</h4>
                          <p className="text-gray-600">Assessment of your current committee structure and specific needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-green-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Member Selection</h4>
                          <p className="text-gray-600">Selection of appropriate external members based on your requirements</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Integration</h4>
                          <p className="text-gray-600">Seamless integration and orientation of external members</p>
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-green-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Enhance Your Committee Today
            </h2>
            <p className="text-xl text-gray-600">
              Don't compromise on the quality of your workplace investigations. Partner with experienced 
              external members who bring credibility and expertise to your POSH compliance framework.
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
