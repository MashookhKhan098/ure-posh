// File: app/expertise/[slug]/page.tsx

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Users, Award, BookOpen, Target, Clock, Phone, Mail } from 'lucide-react';

// This function receives the slug from the URL as a parameter
export default function ExpertiseTopicPage({ params }: { params: { slug: string } }) {
  
  // Convert the URL slug back into a readable title
  const title = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get detailed content based on the slug
  const getExpertiseContent = (slug: string) => {
    const content = {
      'posh-compliance-initiation': {
        category: 'Compliance at ALL Work Place',
        description: 'Complete setup and initiation of POSH compliance framework for your organization.',
        overview: 'Our POSH Compliance Initiation service provides end-to-end setup of Prevention of Sexual Harassment frameworks, ensuring your organization meets all legal requirements while creating a safe workplace environment.',
        keyFeatures: [
          'Initial assessment of current policies and procedures',
          'Internal Committee (IC) constitution and setup',
          'Policy framework development and implementation',
          'Employee awareness and communication strategy',
          'Documentation and record-keeping systems',
          'Compliance calendar and ongoing monitoring'
        ],
        benefits: [
          'Legal compliance with POSH Act 2013',
          'Reduced workplace harassment incidents',
          'Enhanced employee trust and safety',
          'Protected organizational reputation',
          'Structured complaint handling process',
          'Regular compliance monitoring'
        ],
        deliverables: [
          'Customized POSH policy document',
          'Internal Committee formation',
          'Employee handbook updates',
          'Awareness materials and posters',
          'Compliance checklist and calendar',
          'Training schedule and materials'
        ],
        timeline: '2-4 weeks',
        suitable: ['Startups implementing POSH for the first time', 'Companies expanding to 10+ employees', 'Organizations seeking compliance review']
      },
      'external-members-from-renowned-ngo': {
        category: 'Compliance at ALL Work Place',
        description: 'Access to qualified external members from reputed NGOs for your Internal Committee.',
        overview: 'We provide access to experienced external members from renowned NGOs to serve on your Internal Committee, ensuring impartial and expert handling of complaints.',
        keyFeatures: [
          'Pre-vetted external members from established NGOs',
          'Experience in handling sexual harassment cases',
          'Regular training and certification updates',
          'Available for committee meetings and case hearings',
          'Professional indemnity and background verification',
          'Ongoing support and guidance'
        ],
        benefits: [
          'Impartial complaint handling',
          'Expert knowledge and experience',
          'Enhanced credibility of IC',
          'Legal compliance assurance',
          'Reduced organizational liability',
          'Professional case management'
        ],
        deliverables: [
          'External member assignment',
          'Member credentials and certifications',
          'Service agreement and terms',
          'Contact details and availability',
          'Regular progress reports',
          'Case handling documentation'
        ],
        timeline: '1-2 weeks',
        suitable: ['Companies requiring external IC members', 'Organizations in remote locations', 'Companies seeking experienced professionals']
      }
      // Add more content for other slugs as needed
    };

    return content[slug as keyof typeof content] || {
      category: 'General Expertise',
      description: `Comprehensive solutions and expertise in ${title.toLowerCase()}.`,
      overview: `Our ${title} service provides comprehensive solutions tailored to your organization's specific needs. We combine industry best practices with practical implementation strategies.`,
      keyFeatures: [
        'Customized approach based on organizational needs',
        'Expert guidance and implementation support',
        'Comprehensive documentation and resources',
        'Ongoing support and consultation',
        'Regular reviews and updates',
        'Compliance and best practice alignment'
      ],
      benefits: [
        'Enhanced workplace safety and compliance',
        'Improved organizational culture',
        'Risk mitigation and legal protection',
        'Employee satisfaction and trust',
        'Professional development opportunities',
        'Long-term sustainability'
      ],
      deliverables: [
        'Detailed service implementation plan',
        'Customized policies and procedures',
        'Training materials and resources',
        'Ongoing support documentation',
        'Regular progress reports',
        'Compliance certification'
      ],
      timeline: '2-6 weeks',
      suitable: ['Organizations of all sizes', 'Companies seeking expert guidance', 'Businesses prioritizing workplace safety']
    };
  };

  const content = getExpertiseContent(params.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <span>/</span>
            <span className="text-gray-400">Expertise</span>
            <span>/</span>
            <span className="text-pink-600 font-medium">{title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800 mb-4">
                  {content.category}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {title}
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  {content.description}
                </p>
              </div>
              
              <Link 
                href="/"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors ml-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Overview Section */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-6 h-6 mr-3 text-pink-600" />
                  Overview
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {content.overview}
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-3 text-pink-600" />
                  Key Features
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.keyFeatures.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-pink-600" />
                  Benefits
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {content.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  What You'll Receive
                </h2>
                <ul className="space-y-3">
                  {content.deliverables.map((deliverable, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <span className="text-gray-700">{deliverable}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Info */}
              <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-pink-600" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Timeline</div>
                      <div className="text-sm text-gray-600">{content.timeline}</div>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Users className="w-5 h-5 text-pink-600 mt-1" />
                    <div>
                      <div className="text-sm font-medium text-gray-900">Suitable For</div>
                      <ul className="text-sm text-gray-600 mt-1 space-y-1">
                        {content.suitable.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact CTA */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6 text-sm">
                  Contact us to discuss your specific requirements and get a customized solution.
                </p>
                <div className="space-y-3">
                  <Link 
                    href="/connect"
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Consultation
                  </Link>
                  <Link 
                    href="mailto:contact@ureposh.com"
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
                  </Link>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Services</h3>
                <div className="space-y-2">
                  <Link href="/expertise/posh-training-for-workforce" className="block text-sm text-pink-600 hover:text-pink-700">
                    → POSH Training for Workforce
                  </Link>
                  <Link href="/expertise/posh-training-for-ic-members" className="block text-sm text-pink-600 hover:text-pink-700">
                    → POSH Training for IC Members
                  </Link>
                  <Link href="/expertise/annual-report" className="block text-sm text-pink-600 hover:text-pink-700">
                    → Annual Report
                  </Link>
                  <Link href="/expertise/posh-audit" className="block text-sm text-pink-600 hover:text-pink-700">
                    → POSH Audit
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}