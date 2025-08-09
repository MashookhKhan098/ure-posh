import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle, Users, Shield, TrendingUp, Award, Clock, Target, Zap, Star, ArrowRight } from 'lucide-react'

// Service content mapping with all services
const serviceContent = {
  // Gender Equality Compliance
  "posh-compliance-initiation": {
    title: "POSH Compliance Initiation",
    description: "Establish comprehensive POSH compliance framework for your organization",
    content: "We help organizations establish robust POSH (Prevention of Sexual Harassment) compliance frameworks that ensure workplace safety and legal adherence. Our comprehensive approach covers policy development, committee formation, and ongoing compliance monitoring.",
    features: [
      "Policy development and implementation",
      "Committee formation and training",
      "Compliance monitoring and reporting",
      "Regular audits and assessments"
    ],
    benefits: [
      "Legal compliance assurance",
      "Workplace safety enhancement",
      "Risk mitigation",
      "Professional reputation protection"
    ],
    category: "Gender Equality Compliance",
    icon: Shield,
    color: "pink"
  },
  "external-members-renowned-ngo": {
    title: "External Members from Renowned NGO",
    description: "Expert external committee members for impartial investigations",
    content: "Connect with experienced external members from renowned NGOs to ensure impartial and professional handling of workplace harassment cases. Our network includes certified professionals with extensive experience in workplace investigations.",
    features: [
      "Vetted external committee members",
      "Impartial investigation processes",
      "Professional case handling",
      "Expert witness support"
    ],
    benefits: [
      "Unbiased investigations",
      "Professional expertise",
      "Credible outcomes",
      "Legal compliance"
    ],
    category: "Gender Equality Compliance",
    icon: Users,
    color: "blue"
  },
  "compliant-redressal": {
    title: "Compliant Redressal",
    description: "Effective complaint resolution system for workplace issues",
    content: "Implement effective complaint resolution systems that ensure timely and fair handling of workplace harassment complaints. Our structured approach guarantees proper investigation and resolution procedures.",
    features: [
      "Structured complaint handling",
      "Timely resolution processes",
      "Fair investigation procedures",
      "Appeal mechanisms"
    ],
    benefits: [
      "Quick resolution",
      "Fair treatment",
      "Employee satisfaction",
      "Legal compliance"
    ],
    category: "Gender Equality Compliance",
    icon: CheckCircle,
    color: "green"
  },

  // Disclosure and Audit
  "posh-workplace-harassment-compliance-reporting": {
    title: "POSH & Workplace Harassment Compliance Reporting",
    description: "Comprehensive compliance reporting system",
    content: "Develop comprehensive reporting systems that track and document all POSH and workplace harassment compliance activities. Our automated solutions provide real-time insights and ensure regulatory compliance.",
    features: [
      "Automated reporting systems",
      "Compliance dashboards",
      "Regular reporting cycles",
      "Audit trail maintenance"
    ],
    benefits: [
      "Real-time monitoring",
      "Regulatory compliance",
      "Data-driven insights",
      "Risk management"
    ],
    category: "Disclosure and Audit",
    icon: TrendingUp,
    color: "purple"
  },
  "workplace-harassment-posh-policy-disclosure": {
    title: "Workplace Harassment & POSH Policy Disclosure",
    description: "Transparent policy disclosure framework",
    content: "Create transparent policy disclosure frameworks that ensure all employees understand their rights and responsibilities. Our comprehensive approach includes policy communication, training, and feedback mechanisms.",
    features: [
      "Policy communication strategies",
      "Employee awareness programs",
      "Regular policy updates",
      "Feedback mechanisms"
    ],
    benefits: [
      "Employee awareness",
      "Policy compliance",
      "Transparency",
      "Risk reduction"
    ],
    category: "Disclosure and Audit",
    icon: Target,
    color: "indigo"
  },
  "posh-workplace-harassment-audits": {
    title: "POSH & Workplace Harassment Audits",
    description: "Regular compliance audits and assessments",
    content: "Conduct regular audits and assessments to ensure ongoing compliance with POSH and workplace harassment policies. Our systematic approach identifies gaps and provides actionable recommendations.",
    features: [
      "Comprehensive audit frameworks",
      "Risk assessment protocols",
      "Compliance gap analysis",
      "Remediation planning"
    ],
    benefits: [
      "Continuous improvement",
      "Risk identification",
      "Compliance assurance",
      "Strategic planning"
    ],
    category: "Disclosure and Audit",
    icon: Award,
    color: "amber"
  },

  // POSH Adaptability and Training
  "respectful-workplace-training-compliance": {
    title: "Respectful Workplace Training & Compliance",
    description: "Comprehensive workplace respect training programs",
    content: "Deliver comprehensive training programs that promote respectful workplace behavior and ensure compliance with anti-harassment policies. Our interactive modules drive behavioral change and create positive workplace cultures.",
    features: [
      "Interactive training modules",
      "Behavioral change programs",
      "Compliance monitoring",
      "Effectiveness assessment"
    ],
    benefits: [
      "Behavioral change",
      "Culture improvement",
      "Compliance assurance",
      "Employee engagement"
    ],
    category: "POSH Adaptability and Training",
    icon: Users,
    color: "emerald"
  },
  "compliance-training-internal-committees-workplace-panels": {
    title: "Compliance Training for Internal Committees & Workplace Panels",
    description: "Specialized training for internal committees",
    content: "Provide specialized training for internal committees and workplace panels to ensure they can effectively handle harassment cases. Our expert-led programs cover investigation techniques, legal compliance, and decision-making skills.",
    features: [
      "Committee member training",
      "Investigation techniques",
      "Legal compliance training",
      "Decision-making skills"
    ],
    benefits: [
      "Expert committee members",
      "Effective investigations",
      "Legal compliance",
      "Confident decision-making"
    ],
    category: "POSH Adaptability and Training",
    icon: Shield,
    color: "cyan"
  },
  "quarterly-mandatory-training": {
    title: "Quarterly Mandatory Training",
    description: "Regular mandatory compliance training",
    content: "Implement quarterly mandatory training programs to ensure ongoing awareness and compliance with workplace harassment policies. Our structured approach maintains high standards and tracks progress effectively.",
    features: [
      "Regular training schedules",
      "Mandatory participation",
      "Progress tracking",
      "Compliance verification"
    ],
    benefits: [
      "Ongoing awareness",
      "Consistent compliance",
      "Progress monitoring",
      "Risk reduction"
    ],
    category: "POSH Adaptability and Training",
    icon: Clock,
    color: "orange"
  },
  "managers-level-training": {
    title: "Managers Level Training",
    description: "Leadership-focused compliance training",
    content: "Provide specialized training for managers and leaders to ensure they can effectively prevent and address workplace harassment. Our leadership-focused programs emphasize prevention strategies and response protocols.",
    features: [
      "Leadership responsibility training",
      "Prevention strategies",
      "Response protocols",
      "Team management skills"
    ],
    benefits: [
      "Leadership development",
      "Prevention focus",
      "Effective response",
      "Team safety"
    ],
    category: "POSH Adaptability and Training",
    icon: Star,
    color: "rose"
  },

  // Organisation Well-being
  "well-being-programmes": {
    title: "Well Being Programmes",
    description: "Comprehensive employee wellness programs",
    content: "Develop comprehensive wellness programs that promote physical, mental, and emotional well-being of employees. Our holistic approach addresses all aspects of employee wellness and creates supportive work environments.",
    features: [
      "Physical wellness programs",
      "Mental health support",
      "Work-life balance initiatives",
      "Stress management programs"
    ],
    benefits: [
      "Employee wellness",
      "Productivity improvement",
      "Retention enhancement",
      "Positive culture"
    ],
    category: "Organisation Well-being",
    icon: Star, // Assuming Heart is not defined, using Star as a placeholder
    color: "pink"
  },
  "code-of-conduct-training": {
    title: "Code of Conduct Training",
    description: "Ethical workplace behavior training",
    content: "Provide training on ethical workplace behavior and code of conduct to ensure a respectful and professional work environment. Our programs use real-world scenarios and case studies to drive understanding.",
    features: [
      "Ethical behavior training",
      "Code of conduct education",
      "Case study analysis",
      "Behavioral guidelines"
    ],
    benefits: [
      "Ethical workplace",
      "Professional standards",
      "Risk reduction",
      "Culture improvement"
    ],
    category: "Organisation Well-being",
    icon: Shield, // Assuming BookOpen is not defined, using Shield as a placeholder
    color: "blue"
  },
  "mental-health-training-counselling": {
    title: "Mental Health Training & Counselling",
    description: "Mental health support and counseling services",
    content: "Offer mental health training and counseling services to support employee well-being and create a supportive work environment. Our comprehensive approach includes awareness training, counseling, and crisis intervention.",
    features: [
      "Mental health awareness training",
      "Counseling services",
      "Crisis intervention",
      "Support group facilitation"
    ],
    benefits: [
      "Mental health support",
      "Crisis management",
      "Employee well-being",
      "Supportive environment"
    ],
    category: "Organisation Well-being",
    icon: Users, // Assuming Brain is not defined, using Users as a placeholder
    color: "indigo"
  },

  // Diversity and Inclusion
  "diversity-at-work-place": {
    title: "Diversity at Work Place",
    description: "Creating inclusive workplace environments",
    content: "Develop comprehensive diversity programs that create inclusive workplace environments where all employees feel valued and respected. Our approach focuses on awareness, training, and measurable outcomes.",
    features: [
      "Diversity awareness training",
      "Inclusive hiring practices",
      "Cultural sensitivity programs",
      "Diversity metrics and reporting"
    ],
    benefits: [
      "Inclusive culture",
      "Innovation enhancement",
      "Employee satisfaction",
      "Market competitiveness"
    ],
    category: "Diversity and Inclusion",
    icon: Users, // Assuming Globe is not defined, using Users as a placeholder
    color: "emerald"
  },
  "lgbtqia-inclusion": {
    title: "LGBTQIA++ Inclusion",
    description: "Comprehensive LGBTQIA+ workplace inclusion",
    content: "Implement comprehensive LGBTQIA+ inclusion programs that ensure equal opportunities and create safe, supportive workplaces for all employees. Our programs include awareness training, policy development, and ally training.",
    features: [
      "LGBTQIA+ awareness training",
      "Inclusive policy development",
      "Support group facilitation",
      "Ally training programs"
    ],
    benefits: [
      "Equal opportunities",
      "Safe environment",
      "Talent attraction",
      "Inclusive culture"
    ],
    category: "Diversity and Inclusion",
    icon: Shield, // Assuming Rainbow is not defined, using Shield as a placeholder
    color: "violet"
  }
}

// Color mapping for dynamic styling
const colorMap = {
  pink: "from-pink-500 to-rose-500",
  blue: "from-blue-500 to-indigo-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-violet-500",
  indigo: "from-indigo-500 to-blue-500",
  amber: "from-amber-500 to-orange-500",
  emerald: "from-emerald-500 to-green-500",
  cyan: "from-cyan-500 to-blue-500",
  orange: "from-orange-500 to-red-500",
  rose: "from-rose-500 to-pink-500",
  violet: "from-violet-500 to-purple-500"
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent]

  if (!service) {
    notFound()
  }

  const IconComponent = service.icon
  const colorClass = colorMap[service.color as keyof typeof colorMap] || "from-pink-500 to-rose-500"

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/services" className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center px-4 py-2 text-sm font-semibold text-pink-700 bg-pink-100 rounded-full">
                {service.category}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-pink-200 to-transparent"></div>
            </div>
            
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {service.title}
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
              {service.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${colorClass} rounded-xl flex items-center justify-center`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About This Service</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {service.content}
              </p>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits Section */}
            <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose This Service?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${colorClass} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{benefit}</h4>
                      <p className="text-gray-600 text-sm">Experience the benefits of our comprehensive approach</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Process Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Implementation Process</h3>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Assessment & Planning</h4>
                    <p className="text-gray-600">We begin with a comprehensive assessment of your current state and develop a tailored implementation plan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Implementation</h4>
                    <p className="text-gray-600">Our expert team works closely with yours to implement the solution according to the established plan.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Training & Support</h4>
                    <p className="text-gray-600">Comprehensive training ensures your team is equipped to maintain and optimize the implemented solution.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Ongoing Support</h4>
                    <p className="text-gray-600">We provide continuous support and monitoring to ensure long-term success and compliance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${colorClass} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get Started Today</h3>
                  <p className="text-gray-600 text-sm">
                    Ready to implement this service in your organization? Contact us for a consultation.
                  </p>
                </div>
                
                <Button className={`w-full bg-gradient-to-r ${colorClass} hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold rounded-xl mb-4 transition-all duration-300 hover:scale-105`}>
                  Request Consultation
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">Free initial consultation</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>info@ureposh.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <h4 className="font-semibold text-gray-900 mb-4">Quick Facts</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Implementation Time</span>
                    <span className="text-sm font-semibold text-gray-900">4-6 weeks</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Support Available</span>
                    <span className="text-sm font-semibold text-blue-600">24/7</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Expert Team</span>
                    <span className="text-sm font-semibold text-purple-600">15+ years</span>
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
                <h4 className="font-semibold text-gray-900 mb-4">Related Services</h4>
                <div className="space-y-3">
                  {Object.entries(serviceContent)
                    .filter(([key, s]) => s.category === service.category && key !== params.slug)
                    .slice(0, 3)
                    .map(([key, s]) => (
                      <Link
                        key={key}
                        href={`/services/${key}`}
                        className="block text-sm text-gray-700 hover:text-pink-700 transition-colors p-2 rounded-lg hover:bg-white/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{s.title}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 