"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  BarChart3,
  CheckCircle,
  Crown,
  GraduationCap,
  Handshake,
  Mail,
  MapPin,
  Phone,
  Shield,
  Star,
  Target,
  Users,
} from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ManagersLevelTrainingPage() {
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
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-200/40 to-purple-300/40 rounded-full blur-3xl animate-pulse"></div>
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
              <Badge className="bg-gradient-to-r from-purple-100 via-purple-200 to-purple-100 text-purple-800 hover:from-purple-200 hover:via-purple-300 hover:to-purple-200 px-6 py-3 text-base font-semibold border border-purple-200/50 shadow-lg shadow-purple-500/10">
                <Crown className="w-4 h-4 mr-2" />
                POSH Adaptability
              </Badge>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl lg:text-6xl font-bold text-black leading-tight"
            >
              Managers{" "}
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Level Training
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            >
              Empower your leadership team with specialized POSH training designed for managers and supervisors, 
              ensuring they can effectively lead, prevent, and address workplace harassment issues.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Crown className="w-5 h-5" />
                <span>Leadership Focus</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Users className="w-5 h-5" />
                <span>Managers & Supervisors</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Shield className="w-5 h-5" />
                <span>Advanced Compliance</span>
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
                      Leadership-Focused POSH Training
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      Our Managers Level Training service provides specialized POSH education designed 
                      specifically for leadership roles, ensuring managers can effectively prevent, 
                      identify, and address workplace harassment issues while maintaining team morale.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Leadership Skills</h4>
                          <p className="text-gray-600">Advanced training for managerial responsibilities</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Team Management</h4>
                          <p className="text-gray-600">Effective team leadership in compliance matters</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-gray-900">Advanced Compliance</h4>
                          <p className="text-gray-600">In-depth understanding of POSH requirements</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto">
                          <Crown className="w-10 h-10 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">What You Get</h3>
                        <ul className="text-left space-y-2 text-gray-600">
                          <li>• Leadership-Focused Training</li>
                          <li>• Team Management Skills</li>
                          <li>• Advanced Compliance Knowledge</li>
                          <li>• Conflict Resolution</li>
                          <li>• Performance Management</li>
                          <li>• Ongoing Support</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Components</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white border-gray-200 hover:border-purple-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Crown className="w-6 h-6 text-purple-600" />
                        </div>
                        <CardTitle className="text-lg">Leadership Skills</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Advanced training for managerial responsibilities and team leadership
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-purple-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Users className="w-6 h-6 text-indigo-600" />
                        </div>
                        <CardTitle className="text-lg">Team Management</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        Effective team leadership in compliance and workplace safety matters
                      </CardContent>
                    </Card>
                    <Card className="bg-white border-gray-200 hover:border-purple-300 transition-colors">
                      <CardHeader className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Shield className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg">Advanced Compliance</CardTitle>
                      </CardHeader>
                      <CardContent className="text-center text-gray-600">
                        In-depth understanding of POSH requirements and implementation
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Manager Training Process</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    We follow a comprehensive approach to deliver specialized POSH training for managers 
                    that ensures effective leadership in compliance matters and team management.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="space-y-8">
                  {[
                    {
                      step: "01",
                      title: "Leadership Assessment",
                      description: "Evaluation of current leadership skills and compliance knowledge gaps.",
                      icon: Crown,
                      color: "from-purple-500 to-purple-600"
                    },
                    {
                      step: "02",
                      title: "Customized Training Design",
                      description: "Development of specialized training content for managerial roles.",
                      icon: Target,
                      color: "from-indigo-500 to-indigo-600"
                    },
                    {
                      step: "03",
                      title: "Advanced Training Delivery",
                      description: "Interactive training sessions focused on leadership and management skills.",
                      icon: GraduationCap,
                      color: "from-blue-500 to-blue-600"
                    },
                    {
                      step: "04",
                      title: "Team Management Skills",
                      description: "Training on effective team leadership in compliance matters.",
                      icon: Users,
                      color: "from-green-500 to-green-600"
                    },
                    {
                      step: "05",
                      title: "Performance Evaluation",
                      description: "Assessment of training effectiveness and leadership improvement.",
                      icon: BarChart3,
                      color: "from-teal-500 to-teal-600"
                    },
                    {
                      step: "06",
                      title: "Ongoing Leadership Support",
                      description: "Continuous support and guidance for managerial compliance leadership.",
                      icon: Handshake,
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Managers Level Training?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our specialized training for managers ensures effective leadership in compliance matters, 
                    team management, and workplace safety standards.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Immediate Benefits</h3>
                    <div className="space-y-4">
                      {[
                        "Enhanced leadership skills",
                        "Improved team management",
                        "Advanced compliance knowledge",
                        "Better conflict resolution",
                        "Increased team confidence",
                        "Reduced workplace incidents"
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
                        "Strong leadership culture",
                        "Sustainable compliance",
                        "Enhanced team performance",
                        "Improved workplace environment",
                        "Competitive leadership advantage",
                        "Organizational growth"
                      ].map((advantage, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <Star className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                          <span className="text-gray-700">{advantage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={fadeInUp} className="bg-gradient-to-r from-purple-50 to-indigo-50 p-8 rounded-2xl border border-purple-100">
                  <div className="text-center space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">Success Metrics</h3>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
                        <div className="text-gray-700">Leadership Enhancement</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-indigo-600 mb-2">Advanced</div>
                        <div className="text-gray-700">Compliance Knowledge</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                        <div className="text-gray-700">Leadership Support</div>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Empower Your Leaders?</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Invest in specialized POSH training for your managers that ensures effective leadership 
                    in compliance matters and team management.
                  </p>
                </motion.div>

                <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900">What Happens Next?</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-purple-600 font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Leadership Assessment</h4>
                          <p className="text-gray-600">Evaluation of current leadership skills and training needs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-indigo-600 font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Training Design</h4>
                          <p className="text-gray-600">Development of specialized training for managerial roles</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-600 font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Implementation</h4>
                          <p className="text-gray-600">Advanced training delivery with ongoing leadership support</p>
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
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white py-3 rounded-xl text-lg font-bold">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-gray-900">
              Empower Your Leadership Team Today
            </h2>
            <p className="text-xl text-gray-600">
              Don't let your managers struggle with compliance leadership. Invest in specialized training 
              that ensures effective team management and workplace safety standards.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl text-lg font-bold">
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
