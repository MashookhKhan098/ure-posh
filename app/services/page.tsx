"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  Scale,
  Users,
  Shield,
  CheckCircle,
  Award,
  BookOpen,
  GraduationCap,
  AlertTriangle,
  Menu,
  X,
  ArrowRight,
  FileText,
  Target,
  Sparkles,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const services = [
    {
      id: "policy",
      title: "POSH Policy Advisory & Drafting",
      icon: Scale,
      color: "from-violet-500 to-purple-600",
      description: "Expert guidance in creating compliant and effective POSH policies tailored to your organization.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Fully compliant with PoSH Act, 2013",
        "Customized to your industry and culture",
        "Inclusive and gender-sensitive approach",
        "Legally vetted to reduce risks",
        "Easy to understand and implement",
      ],
      process: [
        "Initial consultation and assessment",
        "Policy drafting and customization",
        "Legal review and compliance check",
        "Implementation guidance",
        "Ongoing support and updates",
      ],
      price: "",
      duration: "",
      details:
        "At Ureposh, we guide you to recognize that having a clear and solid Prevention of Sexual Harassment (PoSH) policy forms the base of a secure and law-abiding workplace. Our legal experts work closely with your team to draft or refine PoSH policies that are fully compliant with the PoSH Act, 2013, customized to suit your industry, organizational structure, and culture.",
    },
    {
      id: "ic-setup",
      title: "Internal Committee Setup & External Member Service",
      icon: Users,
      color: "from-rose-500 to-pink-600",
      description: "Complete assistance in setting up and strengthening your organization's Internal Committee.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "IC formation and structuring",
        "Qualified external member empanelment",
        "Orientation and capacity building",
        "Ongoing IC support",
        "Documentation and compliance management",
      ],
      process: [
        "IC structure assessment",
        "Member selection and training",
        "External member empanelment",
        "Process documentation",
        "Continuous advisory support",
      ],
      price: "",
      duration: "",
      details:
        "We offer complete help to set up and improve your organization's IC. Our offerings cover Formation and Structuring of the Internal Committee, Empanelment of Qualified External Members, Orientation and Capacity Building, Ongoing IC Support, and Documentation and Compliance Management.",
    },
    {
      id: "training",
      title: "IC Training & Capacity Building",
      icon: GraduationCap,
      color: "from-emerald-500 to-teal-600",
      description: "Specialized, scenario-based POSH training for Internal Committee members.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Practical, scenario-based training",
        "Complaint handling procedures",
        "Fair and legal inquiry processes",
        "Confidentiality and report writing",
        "Real-world case studies",
      ],
      process: [
        "Training needs assessment",
        "Customized curriculum development",
        "Interactive training sessions",
        "Practical exercises and simulations",
        "Ongoing mentorship",
      ],
      price: "",
      duration: "",
      details:
        "Internal Committee (IC) members play a crucial role in ensuring a workplace free from sexual harassment. At Ureposh, we offer specialized, scenario-based POSH training designed to build the confidence and competence of IC members in real-world situations.",
    },
    {
      id: "investigation",
      title: "POSH Investigations & Redressal Support",
      icon: Shield,
      color: "from-amber-500 to-orange-600",
      description: "Expert guidance through POSH investigations and resolution processes.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Live guidance during investigations",
        "Interview and evidence review support",
        "Confidentiality maintenance",
        "Report writing assistance",
        "Legal insights for complex cases",
      ],
      process: [
        "Case assessment and planning",
        "Investigation methodology guidance",
        "Evidence collection support",
        "Report preparation assistance",
        "Resolution implementation",
      ],
      price: "Custom Pricing",
      duration: "As needed",
      details:
        "Handling a sexual harassment complaint takes care, accuracy, and following the law. At Ureposh, we walk beside organizations during every part of the POSH investigation and resolution process to address complaints on time without breaking any laws.",
    },
    {
      id: "audits",
      title: "POSH Audits & Compliance",
      icon: CheckCircle,
      color: "from-blue-500 to-cyan-600",
      description: "Comprehensive POSH audits designed to match your workplace's unique needs.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Policy and IC operations review",
        "Reporting mechanisms assessment",
        "Awareness program evaluation",
        "Annual compliance report support",
        "Actionable improvement recommendations",
      ],
      process: [
        "Comprehensive audit planning",
        "Policy and process review",
        "Stakeholder interviews",
        "Gap analysis and recommendations",
        "Implementation roadmap",
      ],
      price: "",
      duration: "",
      details:
        "Ureposh focuses on conducting detailed PoSH audits designed to match the unique needs of your workplace, including its culture, structure, and legal responsibilities. We examine your workplace's policies, how the Internal Committee operates, ways employees report issues, and awareness programs.",
    },
    {
      id: "certification",
      title: "POSH & DEI Certification Programs",
      icon: Award,
      color: "from-indigo-500 to-purple-600",
      description: "Professional certification programs for HR professionals and compliance managers.",
      image: "/placeholder.svg?height=300&width=400",
      features: [
        "Beginner and Advanced levels",
        "Master the PoSH Act, 2013",
        "IC empanelment opportunities",
        "Lead awareness programs",
        "Investigation best practices",
      ],
      process: [
        "Program selection and enrollment",
        "Interactive learning modules",
        "Practical case studies",
        "Assessment and evaluation",
        "Certification and empanelment",
      ],
      price: "",
      duration: "",
      details:
        "Build Inclusive, Safe, and Legally Compliant Workplaces with India's Top PoSH & DEI Training. Equip yourself with the tools and knowledge to create harassment-free, inclusive work environments through our comprehensive certification.",
    },
  ]

  const additionalServices = [
    {
      title: "Gender Sensitization Programs",
      description: "Interactive programs promoting workplace respect and equality",
      icon: Heart,
      color: "from-rose-500 to-pink-600",
      details:
        "Creating workplaces where respect and equality thrive. Our Gender Sensitization Programs are designed to help individuals recognize and challenge unconscious biases, break stereotypes, and promote respectful behaviour—across all levels of your organization.",
    },
    {
      title: "Workplace Ethics Training",
      description: "Building culture of integrity and professional accountability",
      icon: BookOpen,
      color: "from-emerald-500 to-teal-600",
      details:
        "Building a culture of integrity, accountability, and professionalism. Our Workplace Ethics & Code of Conduct Training programs are designed to reinforce your organization's values, policies, and expectations—empowering employees to act with integrity in every situation.",
    },
    {
      title: "Anti-Bullying Training",
      description: "Creating respectful, inclusive work environments",
      icon: Shield,
      color: "from-amber-500 to-orange-600",
      details:
        "In today's diverse and dynamic workforce, maintaining a respectful, inclusive environment is not just a legal necessity—it's a moral responsibility. Our Anti-Bullying and Anti-Discrimination Training is designed to help organizations build a workplace culture that values empathy, fairness, and dignity for all.",
    },
    {
      title: "SHe-Box Support",
      description: "Guidance on using the national harassment reporting platform",
      icon: AlertTriangle,
      color: "from-violet-500 to-purple-600",
      details:
        "A step toward safer, more responsive workplaces for every woman. We actively support the use of SHe-Box—a powerful online platform launched by the Ministry of Women and Child Development, Government of India, to help women file complaints of workplace sexual harassment directly with the authorities.",
    },
    {
      title: "DEI Implementation",
      description: "Comprehensive diversity, equity, and inclusion advisory services",
      icon: Users,
      color: "from-blue-500 to-cyan-600",
      details:
        "Establishing a workplace where every individual feels included necessitates more than just complying with legal requirements. Ureposh collaborates with you to integrate diversity, equity, and inclusion (DEI) into the core of your organization.",
    },
    {
      title: "Resource Hub",
      description: "Easy-to-access library of POSH templates and legal updates",
      icon: FileText,
      color: "from-pink-500 to-rose-600",
      details:
        "Stay updated with our easy-to-access library of POSH templates, case law summaries, legal updates, FAQs, and toolkits—designed for HR teams, IC members, and leadership.",
    },
  ]

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-rose-50/40">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-violet-200/40 to-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-rose-200/40 to-pink-200/40 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Badge className="bg-gradient-to-r from-violet-100 via-purple-100 to-rose-100 text-violet-800 hover:from-violet-200 hover:via-purple-200 hover:to-rose-200 px-6 py-3 text-base font-semibold border border-violet-200/50 shadow-lg shadow-violet-500/10">
              <Scale className="w-4 h-4 mr-2" />
              Our Services
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight"
          >
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 bg-clip-text text-transparent">
              POSH Solutions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed"
          >
            From policy creation to implementation, awareness to resolution—we provide end-to-end POSH compliance and
            workplace safety solutions tailored to your organization's unique needs.
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="h-full bg-white/90 backdrop-blur-sm border-violet-100 hover:border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.image || "/placeholder.svg"}
                      alt={service.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="text-sm font-medium">{service.duration}</p>
                      <p className="text-lg font-bold">{service.price}</p>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Service Tabs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-violet-50/50 to-rose-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-white/90 text-violet-800 px-6 py-3 text-lg font-semibold border border-violet-200/50">
              <Target className="w-5 h-5 mr-2" />
              Service Details
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                Comprehensive
              </span>{" "}
              Offerings
            </h2>
            <p className="text-xl text-slate-600">Detailed breakdown of our service offerings and processes</p>
          </motion.div>

          <Tabs defaultValue="policy" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8 bg-white/80 backdrop-blur-sm">
              {services.map((service) => (
                <TabsTrigger key={service.id} value={service.id} className="text-xs lg:text-sm">
                  {service.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <Card className="bg-white/90 backdrop-blur-sm border-violet-200 shadow-xl">
                  <div className="grid lg:grid-cols-2 gap-12 p-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center shadow-lg`}
                        >
                          <service.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">{service.title}</h3>
                          <p className="text-slate-600">{service.description}</p>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-violet-50 to-rose-50 rounded-2xl p-6">
                        <p className="text-slate-700 leading-relaxed">{service.details}</p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Key Features</h4>
                        <div className="space-y-3">
                          {service.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-slate-900 mb-4">Our Process</h4>
                        <div className="space-y-4">
                          {service.process.map((step, idx) => (
                            <div key={idx} className="flex items-start">
                              <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-semibold mr-4 flex-shrink-0">
                                {idx + 1}
                              </div>
                              <span className="text-slate-600 pt-1">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-violet-200">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h5 className="font-semibold text-slate-900">Pricing</h5>
                            <p className="text-2xl font-bold text-violet-600">{service.price}</p>
                          </div>
                          <div className="text-right">
                            <h5 className="font-semibold text-slate-900">Duration</h5>
                            <p className="text-slate-600">{service.duration}</p>
                          </div>
                        </div>
                        <Button className={`w-full bg-gradient-to-r ${service.color} text-white`}>
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-violet-100 to-rose-100 text-violet-800 px-6 py-3 text-lg font-semibold">
              <Sparkles className="w-5 h-5 mr-2" />
              Additional Services
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900">
              Comprehensive{" "}
              <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
                Workplace Safety
              </span>{" "}
              Solutions
            </h2>
            <p className="text-xl text-slate-600">Beyond POSH compliance - building truly inclusive workplaces</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {additionalServices.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.03, y: -5 }}>
                <Card className="h-full text-center border-violet-100 hover:border-violet-200 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-slate-900">{service.title}</CardTitle>
                    <CardDescription className="text-slate-600">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">{service.details}</p>
                    <Button
                      variant="outline"
                      className="w-full border-violet-200 text-violet-700 hover:bg-violet-50 bg-transparent"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-slate-900">Ready to Transform Your Workplace?</h2>
            <p className="text-xl text-slate-600 mt-4">
              Let's discuss how our services can help create a safer, more inclusive environment for your organization.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 hover:from-violet-700 hover:via-purple-700 hover:to-rose-700 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-6 text-lg font-semibold"
                >
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-violet-300 text-violet-700 hover:bg-violet-50 bg-white/80 backdrop-blur-sm px-10 py-6 text-lg font-semibold"
              >
                Download Service Brochure
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-rose-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">UREPOSH</span>
              </div>
              <p className="text-slate-400">Creating safe, inclusive, and compliant workplaces across India.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/services" className="hover:text-violet-400">
                    POSH Policy Advisory
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-violet-400">
                    IC Setup & Training
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-violet-400">
                    Investigation Support
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-violet-400">
                    POSH Audits
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link href="/about" className="hover:text-violet-400">
                    About Us
                  </Link>
                </li>
                
                 
                <li>
                  <Link href="/contact" className="hover:text-violet-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-slate-400">
                <li>Email: info@ureposh.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Ureposh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
