import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Phone, Mail, MapPin, CheckCircle, Users, Shield, TrendingUp, Award, Clock, Target, Zap } from 'lucide-react'

// Service content mapping
const serviceContent = {
  // Gender Equality Compliance
  "posh-compliance-initiation": {
    title: "POSH Compliance Initiation",
    description: "Establish comprehensive POSH compliance framework for your organization",
    content: "We help organizations establish robust POSH (Prevention of Sexual Harassment) compliance frameworks that ensure workplace safety and legal adherence.",
    features: [
      "Policy development and implementation",
      "Committee formation and training",
      "Compliance monitoring and reporting",
      "Regular audits and assessments"
    ],
    category: "Gender Equality Compliance"
  },
  "external-members-renowned-ngo": {
    title: "External Members from Renowned NGO",
    description: "Expert external committee members for impartial investigations",
    content: "Connect with experienced external members from renowned NGOs to ensure impartial and professional handling of workplace harassment cases.",
    features: [
      "Vetted external committee members",
      "Impartial investigation processes",
      "Professional case handling",
      "Expert witness support"
    ],
    category: "Gender Equality Compliance"
  },
  "compliant-redressal": {
    title: "Compliant Redressal",
    description: "Effective complaint resolution system for workplace issues",
    content: "Implement effective complaint resolution systems that ensure timely and fair handling of workplace harassment complaints.",
    features: [
      "Structured complaint handling",
      "Timely resolution processes",
      "Fair investigation procedures",
      "Appeal mechanisms"
    ],
    category: "Gender Equality Compliance"
  },
  "complaint-handling-committee-redressal": {
    title: "Complaint Handling Committee Redressal",
    description: "Specialized committee for complaint management",
    content: "Establish specialized internal committees with proper training and authority to handle workplace harassment complaints effectively.",
    features: [
      "Committee formation and training",
      "Authority delegation",
      "Investigation protocols",
      "Decision-making frameworks"
    ],
    category: "Gender Equality Compliance"
  },
  "posh-workplace-harassment-compliance-reporting": {
    title: "POSH & Workplace Harassment Compliance Reporting",
    description: "Comprehensive compliance reporting system",
    content: "Develop comprehensive reporting systems that track and document all POSH and workplace harassment compliance activities.",
    features: [
      "Automated reporting systems",
      "Compliance dashboards",
      "Regular reporting cycles",
      "Audit trail maintenance"
    ],
    category: "Gender Equality Compliance"
  },
  "workplace-harassment-posh-policy-disclosure": {
    title: "Workplace Harassment & POSH Policy Disclosure",
    description: "Transparent policy disclosure framework",
    content: "Create transparent policy disclosure frameworks that ensure all employees understand their rights and responsibilities.",
    features: [
      "Policy communication strategies",
      "Employee awareness programs",
      "Regular policy updates",
      "Feedback mechanisms"
    ],
    category: "Gender Equality Compliance"
  },
  "posh-workplace-harassment-audits": {
    title: "POSH & Workplace Harassment Audits",
    description: "Regular compliance audits and assessments",
    content: "Conduct regular audits and assessments to ensure ongoing compliance with POSH and workplace harassment policies.",
    features: [
      "Comprehensive audit frameworks",
      "Risk assessment protocols",
      "Compliance gap analysis",
      "Remediation planning"
    ],
    category: "Gender Equality Compliance"
  },

  // POSH Adaptability and Training
  "respectful-workplace-training-compliance": {
    title: "Respectful Workplace Training & Compliance",
    description: "Comprehensive workplace respect training programs",
    content: "Deliver comprehensive training programs that promote respectful workplace behavior and ensure compliance with anti-harassment policies.",
    features: [
      "Interactive training modules",
      "Behavioral change programs",
      "Compliance monitoring",
      "Effectiveness assessment"
    ],
    category: "POSH Adaptability and Training"
  },
  "compliance-training-internal-committees-workplace-panels": {
    title: "Compliance Training for Internal Committees & Workplace Panels",
    description: "Specialized training for internal committees",
    content: "Provide specialized training for internal committees and workplace panels to ensure they can effectively handle harassment cases.",
    features: [
      "Committee member training",
      "Investigation techniques",
      "Legal compliance training",
      "Decision-making skills"
    ],
    category: "POSH Adaptability and Training"
  },
  "quarterly-mandatory-training": {
    title: "Quarterly Mandatory Training",
    description: "Regular mandatory compliance training",
    content: "Implement quarterly mandatory training programs to ensure ongoing awareness and compliance with workplace harassment policies.",
    features: [
      "Regular training schedules",
      "Mandatory participation",
      "Progress tracking",
      "Compliance verification"
    ],
    category: "POSH Adaptability and Training"
  },
  "managers-level-training": {
    title: "Managers Level Training",
    description: "Leadership-focused compliance training",
    content: "Provide specialized training for managers and leaders to ensure they can effectively prevent and address workplace harassment.",
    features: [
      "Leadership responsibility training",
      "Prevention strategies",
      "Response protocols",
      "Team management skills"
    ],
    category: "POSH Adaptability and Training"
  },

  // Organisation Well-being
  "well-being-programmes": {
    title: "Well Being Programmes",
    description: "Comprehensive employee wellness programs",
    content: "Develop comprehensive wellness programs that promote physical, mental, and emotional well-being of employees.",
    features: [
      "Physical wellness programs",
      "Mental health support",
      "Work-life balance initiatives",
      "Stress management programs"
    ],
    category: "Organisation Well-being"
  },
  "code-of-conduct-training": {
    title: "Code of Conduct Training",
    description: "Ethical workplace behavior training",
    content: "Provide training on ethical workplace behavior and code of conduct to ensure a respectful and professional work environment.",
    features: [
      "Ethical behavior training",
      "Code of conduct education",
      "Case study analysis",
      "Behavioral guidelines"
    ],
    category: "Organisation Well-being"
  },
  "mental-health-training-counselling": {
    title: "Mental Health Training & Counselling",
    description: "Mental health support and counseling services",
    content: "Offer mental health training and counseling services to support employee well-being and create a supportive work environment.",
    features: [
      "Mental health awareness training",
      "Counseling services",
      "Crisis intervention",
      "Support group facilitation"
    ],
    category: "Organisation Well-being"
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = serviceContent[params.slug as keyof typeof serviceContent]

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-pink-50 to-rose-50 border-b border-pink-100">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/services" className="inline-flex items-center text-sm text-pink-600 hover:text-pink-700 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">About This Service</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {service.content}
              </p>
            </div>

            {/* Features Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Key Features</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
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
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Compliance Assurance</h4>
                    <p className="text-gray-600 text-sm">Ensure full regulatory compliance with expert guidance</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Expert Support</h4>
                    <p className="text-gray-600 text-sm">Access to experienced professionals and consultants</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Proven Results</h4>
                    <p className="text-gray-600 text-sm">Track record of successful implementations</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Quality Standards</h4>
                    <p className="text-gray-600 text-sm">Maintain highest quality and professional standards</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* CTA Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Get Started Today</h3>
                  <p className="text-gray-600 text-sm">
                    Ready to implement this service in your organization? Contact us for a consultation.
                  </p>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white py-3 text-lg font-semibold rounded-xl mb-4">
                  Request Consultation
                </Button>

                <div className="text-center">
                  <p className="text-xs text-gray-500">Free initial consultation</p>
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">Contact Information</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-pink-600" />
                    </div>
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <span>info@ureposh.com</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-green-600" />
                    </div>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 