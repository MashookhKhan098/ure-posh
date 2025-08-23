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
  Flag,
  Gavel,
  Users2,
  Building2,
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
                Global Compliance
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              POSH Committee and{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                External NGO Members
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              India, UK, and US Compliance Guide - Expert external members from renowned NGOs 
              to ensure impartial, professional, and credible handling of workplace harassment cases.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Flag className="w-5 h-5" />
                <span>India, UK, US</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Expert Panel</span>
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
              <TabsTrigger value="india" className="rounded-lg">India</TabsTrigger>
              <TabsTrigger value="international" className="rounded-lg">UK & US</TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">Get Started</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What is a POSH Committee?</h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    A POSH Committee, also known as the Internal Committee (IC), is a specialized team that helps 
                    organizations prevent and address workplace sexual harassment. Having an effective POSH Committee 
                    is crucial not only for legal compliance but also for building a truly safe and inclusive environment.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">The Power of External Members</h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      External members provide an unbiased voice, ensuring fair investigations and decisions. 
                      Their presence reassures employees that the process is trustworthy and professional.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Neutrality & Objectivity</h4>
                          <p className="text-gray-600">External members provide an unbiased voice, ensuring fair investigations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Credibility</h4>
                          <p className="text-gray-600">Their presence reassures employees that the process is trustworthy</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Expertise</h4>
                          <p className="text-gray-600">NGO professionals bring deep experience in gender issues and legal requirements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Users2 className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Benefits of External Members</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Unbiased investigation and resolution</li>
                          <li>• Up-to-date knowledge of local and global laws</li>
                          <li>• Enhanced employee trust and confidence</li>
                          <li>• Public demonstration of ethical leadership</li>
                          <li>• Professional case handling expertise</li>
                          <li>• Reduced risk of bias allegations</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Global Standards</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Flag className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">India</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        POSH Act 2013 mandates external members for companies with 10+ employees
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-green-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Building2 className="w-6 h-6 text-green-600" />
                        </div>
                        <CardTitle className="text-lg">UK</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Best practice to include external advisors for impartiality and transparency
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-purple-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Gavel className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">US</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        External legal experts and NGO specialists ensure unbiased perspectives
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* India Tab */}
            <TabsContent value="india" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">POSH Committee Structure in India</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Under India's POSH Act, 2013, every company with 10 or more employees is required to establish 
                    an Internal Committee to address complaints of sexual harassment.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Mandatory External Member Requirement</h3>
                  <p className="text-lg text-gray-600 mb-6 text-center">
                    A unique feature of this law is the mandatory inclusion of an external member, a representative 
                    from a respected NGO or a professional with experience in women's issues.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Why Include External Members from Renowned NGOs?</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Neutrality & Objectivity:</strong> External members provide an unbiased voice, ensuring fair investigations and decisions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Credibility:</strong> Their presence reassures employees that the process is trustworthy and professional.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Expertise:</strong> NGO professionals bring deep experience in gender issues, legal requirements, and trauma-sensitive care.</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Well-known NGOs</h4>
                      <p className="text-gray-700 mb-4">Whose members serve as external IC members include:</p>
                      <ul className="space-y-2 text-gray-700">
                        <li>• WCRT</li>
                        <li>• Breakthrough India</li>
                        <li>• Jagori</li>
                        <li>• Majlis Legal Centre</li>
                        <li>• CSR India</li>
                        <li>• SAKSHI</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 text-center">Legal Framework</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-blue-600" />
                          POSH Act 2013 Requirements
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-700">• Companies with 10+ employees must establish Internal Committee</p>
                        <p className="text-gray-700">• External member is mandatory</p>
                        <p className="text-gray-700">• Must be from NGO or professional with women's issues experience</p>
                        <p className="text-gray-700">• Ensures impartial investigation and resolution</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-green-600" />
                          Compliance Benefits
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-700">• Fulfills legal requirements</p>
                        <p className="text-gray-700">• Shows genuine commitment to respectful workplace</p>
                        <p className="text-gray-700">• Enhances organizational reputation</p>
                        <p className="text-gray-700">• Reduces legal liabilities</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* International Tab */}
            <TabsContent value="international" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">POSH & Harassment Committees: UK and US Standards</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    While the UK and US do not have a law identical to India's POSH Act, workplace harassment and 
                    gender equality are taken very seriously.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Flag className="w-6 h-6 text-blue-600" />
                        UK Approach
                      </h3>
                      <p className="text-gray-700 mb-4">
                        Businesses may invite external HR professionals or NGO representatives—such as those from 
                        the Equality and Human Rights Commission or Women's Aid—to ensure transparency and fairness in investigations.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-blue-800">Key Organizations:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Equality and Human Rights Commission</li>
                          <li>• Women's Aid</li>
                          <li>• External HR professionals</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Gavel className="w-6 h-6 text-green-600" />
                        US Practice
                      </h3>
                      <p className="text-gray-700 mb-4">
                        US firms often include external legal experts or NGO specialists like those from the National 
                        Women's Law Center (NWLC) or RAINN to bring unbiased perspectives in sensitive cases.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-green-800">Key Organizations:</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• National Women's Law Center (NWLC)</li>
                          <li>• RAINN</li>
                          <li>• External legal experts</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">International Best Practices</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Companies are encouraged to:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Form harassment committees or ethics boards</li>
                        <li>• Deal with complaints professionally</li>
                        <li>• Involve external advisors for impartiality</li>
                        <li>• Ensure transparency and fairness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Benefits of External Involvement:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Unbiased investigation and resolution</li>
                        <li>• Up-to-date knowledge of local and global laws</li>
                        <li>• Enhanced employee trust and confidence</li>
                        <li>• Public demonstration of ethical leadership</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How UREPosh Can Help</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our network includes leading NGO professionals and compliance specialists ready to serve as external 
                    POSH Committee members for organizations in India and as external advisors for companies in the UK and US.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">We Help You:</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Select qualified external IC members</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Stay audit-ready and compliant with the latest laws</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <span className="text-gray-700">Foster a culture of respect, trust, and safety</span>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-2xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
                      <div className="space-y-4">
                        <div>
                          <p className="font-semibold text-gray-900">Who can be an external member of the POSH Committee in India?</p>
                          <p className="text-sm text-gray-700 mt-1">
                            An external member is typically a person who is not an employee of the organization and brings relevant expertise in areas such as legal matters, gender sensitivity, or workplace harassment prevention.
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Why should my company have an external NGO member?</p>
                          <p className="text-sm text-gray-700 mt-1">
                            External NGO members bring unbiased, specialized expertise and demonstrate your company's commitment to upholding gender sensitivity and compliance with legal requirements.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-2xl border border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Connect with Us</h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-blue-600" />
                        <span className="text-gray-700 font-semibold">+91 99999 44807</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-green-600" />
                        <span className="text-gray-700">ea@ureposh.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-purple-600" />
                        <span className="text-gray-700">C 84, Sector 2, Noida, 201301</span>
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white py-3 rounded-xl text-lg font-bold">
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
              UREPosh: Trusted Partners for POSH, Harassment Committee Compliance, and Workplace Inclusion
            </h2>
            <p className="text-xl text-gray-600">
              Don't compromise on the quality of your workplace investigations. Partner with experienced 
              external members who bring credibility and expertise to your POSH compliance framework.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-500 to-green-600 hover:from-blue-600 hover:to-green-700 text-white px-8 py-3 rounded-xl text-lg font-bold">
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
