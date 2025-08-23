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
  Flag,
  Building2,
  Eye,
  Handshake,
  UserCheck,
  Users2,
  Building,
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
                <Shield className="w-4 h-4 mr-2" />
                Global Compliance
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              POSH-Compliant{" "}
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Redressal
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              India, UK & US Workplace Compliance Guide - Expert POSH compliance services including IC setup, 
              policy drafting, training, investigations, and compliance audits for safer, legally compliant workplaces.
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
                <Shield className="w-5 h-5" />
                <span>Legal Compliance</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Scale className="w-5 h-5" />
                <span>Workplace Safety</span>
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
              <TabsTrigger value="faq" className="rounded-lg">FAQ</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">What Does POSH-Compliant Redressal Mean?</h2>
                  <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    POSH-compliant redressal means having a legally aligned, transparent, and fair system for preventing 
                    and addressing workplace sexual harassment. It is not just a legal mandate—it signals that your company values 
                    employee safety, workplace dignity, equality of opportunity, and global compliance readiness.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values of POSH Compliance</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Employee Safety</h4>
                          <p className="text-gray-600">Creating a secure environment free from harassment</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Workplace Dignity</h4>
                          <p className="text-gray-600">Respecting every individual's right to dignity at work</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Equality of Opportunity</h4>
                          <p className="text-gray-600">Ensuring fair treatment regardless of gender or background</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Global Compliance Readiness</h4>
                          <p className="text-gray-600">Meeting international standards for workplace safety</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto">
                          <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">Why Choose URE POSH?</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• End-to-End POSH Compliance (India)</li>
                          <li>• Global Alignment (UK & US)</li>
                          <li>• Training & Awareness Programs</li>
                          <li>• Neutral Investigations</li>
                          <li>• Audit-Ready Recordkeeping</li>
                          <li>• ESG & Investor Due Diligence Ready</li>
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
                        POSH Act 2013 mandates compliance for organizations with 10+ employees
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
                        Equality Act 2010 requires harassment-free workplaces with grievance procedures
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
                        Title VII prohibits sexual harassment with EEOC enforcement and mandatory training
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">India: POSH-Compliant Redressal Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    The Prevention of Sexual Harassment (POSH) Act, 2013 makes it mandatory for organizations 
                    with 10+ employees to establish a compliance framework.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-blue-50 to-green-50 p-8 rounded-2xl border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Steps for POSH Compliance in India</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Essential Components</h4>
                      <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Policy:</strong> Draft & circulate a written POSH policy</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Internal Committee (IC):</strong> Formed with Presiding Officer, employees, and external NGO/legal expert</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Training:</strong> Regular awareness for employees & IC members</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Reporting:</strong> Confidential complaint reporting channels</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Investigation:</strong> Impartial inquiries completed within 90 days</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span><strong>Recordkeeping:</strong> Registers, reports, and annual filings under Section 21</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-white p-6 rounded-xl">
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Penalty for Non-Compliance</h4>
                      <div className="space-y-3 text-gray-700">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                          <p className="font-semibold text-red-800">Up to ₹50,000 fine</p>
                          <p className="text-sm text-red-700">For failure to comply with POSH Act requirements</p>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                          <p className="font-semibold text-orange-800">License cancellation</p>
                          <p className="text-sm text-orange-700">Possible business license revocation</p>
                        </div>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <p className="font-semibold text-yellow-800">Reputational risk</p>
                          <p className="text-sm text-yellow-700">Damage to brand and public image</p>
                        </div>
                      </div>
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
                        <p className="text-gray-700">• Annual reports must be filed with local authorities</p>
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
                        <p className="text-gray-700">• Builds employee trust and confidence</p>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">UK & US: Workplace Harassment & Equality Compliance</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    While different from India's POSH Act, workplace harassment and gender equality are taken very seriously 
                    in both the UK and US with comprehensive legal frameworks.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Flag className="w-6 h-6 text-blue-600" />
                        UK: Equality Act 2010
                      </h3>
                      <p className="text-gray-700 mb-4">
                        The Equality Act 2010 requires employers to provide a workplace free from harassment and discrimination.
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-blue-800">Best Practices in the UK:</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Clear Anti-Harassment Policy with grievance procedure</li>
                          <li>• Equality & Diversity Training for employees & managers</li>
                          <li>• Grievance Redressal Mechanisms – internal panels or external advisors</li>
                          <li>• External Advisors – NGOs, HR, or legal experts in complex cases</li>
                          <li>• Documentation & Transparency – investigation reports and actions taken</li>
                        </ul>
                        <p className="text-sm font-semibold text-blue-800 mt-3">UK Regulators Expect:</p>
                        <p className="text-sm text-gray-700">Swift, fair, and documented responses to complaints</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Gavel className="w-6 h-6 text-green-600" />
                        US: Title VII & EEOC
                      </h3>
                      <p className="text-gray-700 mb-4">
                        In the US, sexual harassment is prohibited under Title VII of the Civil Rights Act of 1964, 
                        enforced by the Equal Employment Opportunity Commission (EEOC).
                      </p>
                      <div className="space-y-3">
                        <h4 className="font-semibold text-green-800">Core Elements in the US:</h4>
                        <ul className="text-sm text-gray-700 space-y-2">
                          <li>• Anti-Harassment Policy – acknowledged by all staff</li>
                          <li>• Complaint Process – confidential reporting and escalation</li>
                          <li>• Prompt Investigation – impartial, time-bound inquiries</li>
                          <li>• Mandatory Training – in many states (e.g., California, New York)</li>
                          <li>• External Investigators – for objectivity in sensitive cases</li>
                          <li>• Documentation – maintain records for litigation defense & audits</li>
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
                        <li>• Maintain comprehensive documentation</li>
                        <li>• Provide regular training and awareness</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">Benefits of External Involvement:</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li>• Unbiased investigation and resolution</li>
                        <li>• Up-to-date knowledge of local and global laws</li>
                        <li>• Enhanced employee trust and confidence</li>
                        <li>• Public demonstration of ethical leadership</li>
                        <li>• Professional case handling expertise</li>
                        <li>• Reduced risk of bias allegations</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </TabsContent>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="space-y-12">
              <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
                <motion.div variants={fadeInUp} className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">12 Detailed & Technical FAQs</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Comprehensive answers to technical questions about POSH compliance across India, UK, and US jurisdictions.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-6">
                  {[
                    {
                      question: "What is POSH-compliant redressal?",
                      answer: "It is a structured grievance-handling process aligned with POSH Act 2013 in India, Equality Act 2010 in the UK, and Title VII in the US. It ensures complaints are addressed in a fair, timely, confidential, and documented manner."
                    },
                    {
                      question: "How do you set up a POSH Internal Committee (IC) in India?",
                      answer: "Presiding Officer: Senior woman employee. At least two employees with credibility or legal knowledge. One external member (NGO/social worker/legal expert). At least 50% women representation. Formal notification and training are mandatory."
                    },
                    {
                      question: "What timelines must be followed under POSH Act, 2013?",
                      answer: "Complaint filing: within 3 months of incident (extendable). IC inquiry: completed within 90 days. Report submission: within 10 days of inquiry. Employer action: within 60 days of report."
                    },
                    {
                      question: "How are UK companies legally bound to address harassment?",
                      answer: "Under the Equality Act 2010, failure to prevent harassment can lead to claims in Employment Tribunals. Employers must show they took 'reasonable steps' like training, policies, and swift investigations."
                    },
                    {
                      question: "What are EEOC's expectations in the US?",
                      answer: "Employers must: Adopt zero-tolerance policies. Conduct prompt, impartial investigations. Provide remedies & corrective action. Prevent retaliation against complainants."
                    },
                    {
                      question: "What is the role of external members in IC/HR panels?",
                      answer: "They bring neutrality, expertise, and credibility, preventing internal bias. In India, external members are legally mandatory. In the UK/US, external advisors are a best practice for complex or high-stakes cases."
                    },
                    {
                      question: "How is confidentiality maintained across jurisdictions?",
                      answer: "India – Section 16 of POSH Act prohibits disclosure. UK – Confidentiality agreements & GDPR compliance. US – Non-retaliation policies + attorney-client privilege in legal reviews."
                    },
                    {
                      question: "What records must be maintained for compliance?",
                      answer: "Complaint registers. IC meeting minutes. Training attendance logs. Annual reports filed with local authorities (India). Documentation for tribunal/EEOC defense (UK/US)."
                    },
                    {
                      question: "How do global companies align POSH compliance across India, UK, and US offices?",
                      answer: "By adopting a global anti-harassment policy framework with localized addendums for each jurisdiction's legal requirements, supported by cross-border compliance audits."
                    },
                    {
                      question: "Can online training fulfill POSH/EEOC requirements?",
                      answer: "Yes, but it must be interactive, certified, and documented. Many regulators require annual refreshers and state-specific training (US: California, New York)."
                    },
                    {
                      question: "What corrective actions can employers take after inquiry?",
                      answer: "Warning or reprimand. Salary deduction or promotion freeze. Transfer or termination. Counseling and workplace environment changes."
                    },
                    {
                      question: "How does POSH compliance align with ESG reporting?",
                      answer: "Investors and regulators increasingly demand Social Governance metrics. POSH compliance demonstrates: Commitment to human rights & equality. Mitigation of reputational and litigation risks. Strengthened ESG scores for global investment readiness."
                    }
                  ].map((faq, index) => (
                    <Card key={index} className="bg-white border-gray-200 hover:border-blue-300 transition-colors">
                      <CardHeader>
                        <CardTitle className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-lg">{faq.question}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
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
              Protect your workplace. Safeguard your brand. Stay compliant.
            </h2>
            <p className="text-xl text-gray-600">
              Partner with URE POSH – India's Leading POSH & Global Workplace Compliance Firm.
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

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl font-bold text-gray-900">Contact URE POSH</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center gap-3">
                <Phone className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700 font-semibold">+91-11-99999 44807</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Mail className="w-6 h-6 text-green-600" />
                <span className="text-gray-700">ea@ureposh.com</span>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Globe className="w-6 h-6 text-purple-600" />
                <span className="text-gray-700">www.ureposh.com</span>
              </div>
            </div>
            <p className="text-lg text-gray-600">
              URE POSH = Your Global Partner for Safe, Compliant Workplaces.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
