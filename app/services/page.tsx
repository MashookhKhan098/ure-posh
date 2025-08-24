"use client"

import { useState, useEffect } from "react"
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
  Building,
  Globe,
  Clock,
  Zap,
  Lightbulb,
  Star,
  Briefcase,
  Calendar,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

export default function ServicesPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Function to get service slug based on service name
  const getServiceSlug = (serviceName: string): string => {
    const slugMap: { [key: string]: string } = {
      "POSH Compliance Initiation": "posh-compliance-initiation",
      "External Members from Renowned NGO": "external-members-renowned-ngo",
      "Compliant Redressal": "compliant-redressal",
      "POSH Compliance Reporting": "posh-workplace-harassment-compliance-reporting",
      "Poster and Policy Disclosure": "poster-and-policy-discloser",
      "Safe Workplace Audit": "posh-workplace-harassment-audits",
      "Workplace Respect Training": "respectful-workplace-training-compliance",
      "Internal Committees Training": "training-internal-committees-workplace-panels",
      "Quarterly Mandatory Training": "quarterly-mandatory-training",
      "Managers Level Training": "managers-level-training",
      "Well Being Programmes": "well-being-programmes",
      "Code of Conduct Training": "code-of-conduct-training",
      "Mental Health Training": "mental-health-training-counselling",
      "Diversity at Work Place": "diversity-at-work-place",
      "LGBTQIA++ Inclusion": "lgbtqia-inclusion"
    }
    return slugMap[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  // Function to open expertise dropdown
  const openExpertiseDropdown = () => {
    // Dispatch a custom event that the navbar can listen to
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('openExpertiseDropdown'));
    }
  };

  // Make the function globally available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openExpertiseDropdown = openExpertiseDropdown;
    }
  }, []);

  const expertiseCategories = [
    {
      id: "equality-compliance",
      title: "Equality Compliance",
      icon: Shield,
      color: "from-pink-500 to-pink-600",
      description: "Comprehensive POSH compliance solutions ensuring legal adherence and workplace safety across all organizational levels.",
      image: "/images/2.jpg",
      services: [
        {
          name: "POSH Compliance Initiation",
          description: "Complete setup of POSH framework from scratch",
          features: ["Policy development", "IC formation", "Legal compliance", "Implementation guidance"],
          duration: "2-4 weeks",
          price: "Custom Pricing"
        },
        {
          name: "External Members from Renowned NGO",
          description: "Qualified external members for your Internal Committee",
          features: ["Expert empanelment", "NGO partnerships", "Qualified professionals", "Ongoing support"],
          duration: "1-2 weeks",
          price: "Annual Contract"
        },
        {
          name: "Compliant Redressal",
          description: "Expert guidance through complaint resolution processes",
          features: ["Legal compliance", "Fair procedures", "Documentation", "Resolution support"],
          duration: "As needed",
          price: "Per Case"
        }
      ]
    },
    {
      id: "disclosure-and-audit",
      title: "Disclosure and Audit",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      description: "Transparent disclosure and comprehensive audit solutions ensuring ongoing compliance and risk management.",
      image: "/images/3.jpg",
      services: [
        {
          name: "POSH Compliance Reporting",
          description: "Comprehensive compliance reporting system",
          features: ["Automated reporting", "Compliance dashboards", "Regular cycles", "Audit trails"],
          duration: "Ongoing",
          price: "Annual Service"
        },
        {
          name: "Poster and Policy Disclosure",
          description: "Transparent policy disclosure framework",
          features: ["Policy communication", "Employee awareness", "Regular updates", "Feedback mechanisms"],
          duration: "Ongoing",
          price: "Annual Service"
        },
        {
          name: "Safe Workplace Audit",
          description: "Regular compliance audits and assessments",
          features: ["Comprehensive audits", "Gap analysis", "Compliance verification", "Improvement plans"],
          duration: "3-4 weeks",
          price: "Per Audit"
        }
      ]
    },
    {
      id: "posh-adaptability",
      title: "POSH Adaptability",
      icon: GraduationCap,
      color: "from-emerald-500 to-emerald-600",
      description: "Specialized training programs designed to build competence, awareness, and adaptability across all organizational levels.",
      image: "/images/4.jpg",
      services: [
        {
          name: "Workplace Respect Training",
          description: "Comprehensive workplace respect training",
          features: ["Interactive sessions", "Behavioral change", "Compliance monitoring", "Effectiveness assessment"],
          duration: "1-2 days",
          price: "Per Employee"
        },
        {
          name: "Internal Committees Training",
          description: "Specialized training for internal committees",
          features: ["Committee training", "Investigation skills", "Legal framework", "Decision-making"],
          duration: "2-3 days",
          price: "Per Member"
        },
        {
          name: "Quarterly Mandatory Training",
          description: "Regular mandatory compliance training",
          features: ["Quarterly sessions", "Updated content", "Progress tracking", "Compliance verification"],
          duration: "Quarterly",
          price: "Annual Package"
        },
        {
          name: "Managers Level Training",
          description: "Leadership-focused compliance training",
          features: ["Leadership skills", "Prevention strategies", "Team management", "Cultural responsibility"],
          duration: "1-2 days",
          price: "Per Manager"
        }
      ]
    },
    {
      id: "organisation-well-being",
      title: "Organisation Well-being",
      icon: Heart,
      color: "from-purple-500 to-purple-600",
      description: "Holistic workplace well-being programs focusing on mental health, inclusion, and organizational culture transformation.",
      image: "/images/5.jpg",
      services: [
        {
          name: "Well Being Programmes",
          description: "Comprehensive workplace well-being initiatives",
          features: ["Mental health support", "Stress management", "Work-life balance", "Employee assistance"],
          duration: "Ongoing",
          price: "Annual Program"
        },
        {
          name: "Code of Conduct Training",
          description: "Ethics and conduct training for all employees",
          features: ["Ethical guidelines", "Behavioral standards", "Compliance training", "Cultural values"],
          duration: "1 day",
          price: "Per Employee"
        },
        {
          name: "Mental Health Training",
          description: "Mental health awareness and support training",
          features: ["Awareness sessions", "Support resources", "Crisis management", "Prevention strategies"],
          duration: "1-2 days",
          price: "Per Employee"
        }
      ]
    },
    {
      id: "diversity-and-inclusion",
      title: "Diversity and Inclusion",
      icon: Users,
      color: "from-indigo-500 to-indigo-600",
      description: "Comprehensive diversity and inclusion programs that create inclusive workplace environments for all employees.",
      image: "/images/6.jpg",
      services: [
        {
          name: "Diversity at Work Place",
          description: "Creating inclusive workplace environments",
          features: ["Diversity training", "Inclusion strategies", "Cultural sensitivity", "Equity programs"],
          duration: "Ongoing",
          price: "Annual Program"
        },
        {
          name: "LGBTQIA++ Inclusion",
          description: "Specialized inclusion programs for LGBTQIA++ communities",
          features: ["Awareness training", "Policy development", "Support systems", "Cultural sensitivity"],
          duration: "1-2 days",
          price: "Per Employee"
        }
      ]
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-gray-200/40 to-gray-300/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-gray-300/40 to-gray-200/40 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto relative text-center space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Badge className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 text-gray-800 hover:from-gray-200 hover:via-gray-300 hover:to-gray-200 px-6 py-3 text-base font-semibold border border-gray-200/50 shadow-lg shadow-gray-500/10">
              <Target className="w-4 h-4 mr-2" />
              Our Expertise
            </Badge>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl lg:text-7xl font-bold text-black leading-tight"
          >
            Comprehensive{" "}
            <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
              POSH Solutions
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            From compliance to training, remote solutions to well-being—we provide end-to-end expertise that transforms workplaces 
            into safe, inclusive, and legally compliant environments.
          </motion.p>
        </div>
      </section>

      {/* Expertise Categories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 mb-16"
          >
            {expertiseCategories.map((category, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.02, y: -5 }}>
                <Card className="h-full bg-white/90 backdrop-blur-sm border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <div
                      className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-xl text-black">{category.title}</CardTitle>
                    <CardDescription className="text-gray-600">{category.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-2 mb-4">
                      {category.services.slice(0, 3).map((service, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-gray-500 mr-2 flex-shrink-0" />
                          {service.name}
                        </div>
                      ))}
                    </div>
                    <Link href={`/services/${category.id === "compliance" ? "compliance-at-all-workplace" : category.id === "training" ? "trainings-and-adaptability" : category.id === "remote" ? "remote-training-cost-effective" : category.id === "counselling" ? "organisation-counselling-wellbeing" : "#"}`}>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Detailed Service Tabs */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50/50 to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-white/90 text-gray-800 px-6 py-3 text-lg font-semibold border border-gray-200/50">
              <Sparkles className="w-5 h-5 mr-2" />
              Service Details
            </Badge>
            <h2 className="text-4xl font-bold text-black">
              Explore Our{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                Comprehensive
              </span>{" "}
              Expertise
            </h2>
            <p className="text-xl text-gray-600">Detailed breakdown of our expertise offerings and processes</p>
          </motion.div>

          <Tabs defaultValue="compliance" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8 bg-white/80 backdrop-blur-sm">
              {expertiseCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs lg:text-sm">
                  {category.title.split(" ")[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {expertiseCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-xl">
                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-8">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center shadow-lg`}
                      >
                        <category.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-black">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {category.services.map((service, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          viewport={{ once: true }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-lg font-semibold text-black mb-2">{service.name}</h4>
                              <p className="text-sm text-gray-600">{service.description}</p>
                            </div>

                            <div className="space-y-2">
                              <h5 className="text-sm font-semibold text-gray-700">Key Features:</h5>
                              <ul className="space-y-1">
                                {service.features.map((feature, featureIdx) => (
                                  <li key={featureIdx} className="flex items-start">
                                    <CheckCircle className="h-3 w-3 text-gray-500 mr-2 mt-1 flex-shrink-0" />
                                    <span className="text-xs text-gray-600">{feature}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                              <div className="text-xs text-gray-500">
                                <span className="font-semibold">Duration:</span> {service.duration}
                              </div>
                              <div className="text-xs text-gray-500">
                                <span className="font-semibold">Price:</span> {service.price}
                              </div>
                            </div>

                            <Link href={`/services/${getServiceSlug(service.name)}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                              >
                                View Details
                                <ArrowRight className="ml-2 h-3 w-3" />
                              </Button>
                            </Link>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16"
          >
            <Badge className="bg-gradient-to-r from-gray-100 to-gray-100 text-gray-800 px-6 py-3 text-lg font-semibold">
              <Star className="w-5 h-5 mr-2" />
              Why Choose Ureposh
            </Badge>
            <h2 className="text-4xl font-bold text-black">
              Expertise That{" "}
              <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                Delivers Results
              </span>
            </h2>
            <p className="text-xl text-gray-600">Proven track record of transforming workplaces across India</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Shield,
                title: "Legal Compliance",
                description: "100% compliant with POSH Act 2013 and all amendments",
                color: "from-gray-500 to-gray-600"
              },
              {
                icon: Users,
                title: "Expert Team",
                description: "Certified professionals with years of experience",
                color: "from-gray-500 to-gray-600"
              },
              {
                icon: Clock,
                title: "Quick Response",
                description: "24-hour turnaround for urgent compliance needs",
                color: "from-gray-500 to-gray-600"
              },
              {
                icon: Award,
                title: "Proven Results",
                description: "500+ organizations successfully transformed",
                color: "from-gray-500 to-gray-600"
              }
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp} whileHover={{ scale: 1.05, y: -5 }}>
                <Card className="text-center border-gray-200 hover:border-gray-300 shadow-lg hover:shadow-xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-black">{feature.title}</CardTitle>
                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                  </CardHeader>
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
            <h2 className="text-4xl font-bold text-black">Ready to Transform Your Workplace?</h2>
            <p className="text-xl text-gray-600 mt-4">
              Let's discuss how our expertise can help create a safer, more inclusive environment for your organization.
            </p>
          </motion.div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gray-600 via-gray-700 to-gray-700 hover:from-gray-700 hover:via-gray-800 hover:to-gray-800 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-6 text-lg font-semibold"
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
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-white/80 backdrop-blur-sm px-10 py-6 text-lg font-semibold"
              >
                Download Service Brochure
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                  <Heart className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">UREPOSH</span>
              </div>
              <p className="text-gray-400">Creating safe, inclusive, and compliant workplaces across India.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Expertise</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services/compliance-at-all-workplace" className="hover:text-gray-400">
                    Compliance Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/services/trainings-and-adaptability" className="hover:text-gray-400">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link href="/services/remote-training-cost-effective" className="hover:text-gray-400">
                    Remote Training
                  </Link>
                </li>
                <li>
                  <Link href="/services/organisation-counselling-wellbeing" className="hover:text-gray-400">
                    Well-being Programs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-gray-400">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-400">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@ureposh.com</li>
                <li>Phone: +91 98765 43210</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Ureposh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
