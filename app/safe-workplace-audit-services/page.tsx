"use client";
import React, { useState } from 'react';
import { ChevronDown, Shield, Users, FileText, Award, Phone, Mail, Globe, CheckCircle, ArrowRight, Zap, Star } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-pink-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-pink-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-pink-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-pink-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-pink-700' : 'hover:bg-pink-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-pink-200 mb-2"></div>
        <div className="bg-pink-50 rounded-lg p-3 border border-pink-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function SafeWorkplaceAuditServicesPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Safe Workplace Audit Services",
    subtitle: "Comprehensive Workplace Safety Compliance Solutions", 
    description: "Professional audit services ensuring complete workplace safety compliance across India, UK, and US standards",
    faqs: [
      {
        question: "What does a Safe Workplace Audit include?",
        answer: "Our audits cover policy review, IC assessment, training evaluation, documentation compliance, reporting systems, and ESG certification across India, UK, and US standards."
      },
      {
        question: "How long does the audit process take?",
        answer: "Typical audit duration is 2-4 weeks depending on organization size, with preliminary findings available within one week of completion."
      },
      {
        question: "Do you provide post-audit support?",
        answer: "Yes, we offer ongoing compliance monitoring, policy updates, training refreshers, and annual re-certification services."
      }
    ]
  };

  const auditServices = [
    {
      name: "Policy & Document Review",
      description: "POSH/Anti-harassment policies, disclosures, handbooks. Legal alignment verification.",
      icon: FileText
    },
    {
      name: "IC Assessment", 
      description: "Constitution per POSH Act 2013. External member compliance. Meeting records.",
      icon: Users
    },
    {
      name: "Training & Awareness",
      description: "Employee sensitization records. IC training. Leadership accountability programs.",
      icon: Award
    },
    {
      name: "Reporting & Records",
      description: "Annual POSH filing (India), EEOC compliance (US), UK grievance docs.",
      icon: FileText
    },
    {
      name: "Workplace Disclosures",
      description: "Poster displays, digital policy access, multilingual availability.",
      icon: Globe
    },
    {
      name: "Complaint Redressal",
      description: "Complaint registers, inquiry procedures, disciplinary measures.",
      icon: Shield
    },
    {
      name: "ESG Certification",
      description: "Investor-ready reports, sustainability integration, URE POSH certification.",
      icon: Star
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #fef7ff 100%);
          border: 2px solid #fce7f3;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #fdf4ff 50%, #ffffff 100%);
          border: 1px solid #f3e8ff;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(236, 72, 153, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #fdf2f8 100%);
          border: 2px solid #f9a8d4;
          box-shadow: 0 20px 40px rgba(236, 72, 153, 0.15);
          transform: perspective(1000px) rotateX(2deg);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: perspective(1000px) rotateX(0deg) translateY(-5px);
          box-shadow: 0 30px 60px rgba(236, 72, 153, 0.25);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-pink-300 shadow-lg">
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              <span className="text-pink-800 font-bold text-sm">Professional Audit Services</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-pink-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
                    {pageData.subtitle}
                  </strong>
                </p>
              </div>
              
              <div className="text-focus rounded-xl p-6 shadow-lg">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                  {pageData.description}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button className="group focus-card px-6 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <div className="flex items-center justify-center gap-3">
                  <Shield className="w-5 h-5" />
                  <span>Schedule Audit</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="group text-focus border-3 border-pink-600 text-pink-700 px-6 py-4 rounded-xl font-bold text-base hover:bg-pink-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Download Checklist</span>
                <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
              Our Comprehensive Audit Services
            </h2>
            <div className="w-20 h-2 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full shadow-lg mb-6"></div>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Comprehensive audit services covering all workplace safety compliance aspects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {auditServices.map((service, index) => (
              <div key={index} className="focus-card p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold high-contrast-text group-hover:text-pink-600 transition-colors duration-300">
                      {service.name}
                    </h3>
                  </div>
                </div>
                <div className="text-focus p-4 rounded-lg">
                  <p className="text-gray-800 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits */}
          <div className="mt-16">
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
                  Why Choose Our Audit Services?
                </h3>
                <div className="w-16 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-sm mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "100% Legal Compliance",
                    desc: "Audit-ready certification across India, UK, US standards"
                  },
                  {
                    title: "Global Standards Integration", 
                    desc: "POSH Act, Equality Act, EEOC alignment"
                  },
                  {
                    title: "ESG & Investor Documentation",
                    desc: "Trusted documentation for stakeholder confidence"
                  },
                  {
                    title: "Risk Mitigation",
                    desc: "Comprehensive protection against violations"
                  },
                  {
                    title: "Expert Team",
                    desc: "Specialized professionals with global experience"
                  },
                  {
                    title: "Continuous Support",
                    desc: "Ongoing monitoring and re-certification services"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready for a <span className="text-pink-600">Comprehensive Audit</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Get expert evaluation of your workplace safety compliance with our professional audit services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Schedule Your Audit</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="tel:+911234567890" className="inline-flex items-center gap-3 border-2 border-pink-600 text-pink-700 px-8 py-4 rounded-xl font-bold hover:bg-pink-50 transition-all duration-300 shadow-xl hover:shadow-2xl">
                <Phone className="w-5 h-5" />
                <span>Call for Consultation</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-2 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid md:grid-cols-1 gap-6">
            {pageData.faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
