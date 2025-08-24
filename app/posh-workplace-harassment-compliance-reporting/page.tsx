"use client";
import React, { useState } from 'react';
import { ChevronDown, FileText, Shield, Users, AlertTriangle, CheckCircle, Mail, ArrowRight, Clock, Target, Zap, Star } from 'lucide-react';

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

export default function POSHComplianceReportingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "POSH Workplace Harassment Compliance and Reporting Solutions",
    subtitle: "Comprehensive Documentation and Legal Compliance Framework",
    description: "Professional POSH compliance reporting services to ensure your organization meets all legal requirements while maintaining detailed, audit-ready documentation of harassment prevention initiatives.",
    faqs: [
      {
        question: "What are the mandatory compliance requirements under the POSH Act 2013?",
        answer: "Under the POSH Act 2013, organizations must establish an Internal Committee, conduct annual training, file annual returns to the District Officer, display the law visibly at the workplace, create a comprehensive policy, and maintain detailed records of all complaints and resolutions."
      },
      {
        question: "What documentation must be maintained for POSH compliance?",
        answer: "Organizations must maintain records of all complaints, inquiry reports, action taken reports, training records, committee meeting minutes, annual compliance reports, policy acknowledgments from employees, and correspondence with authorities."
      },
      {
        question: "How often should POSH compliance reports be submitted?",
        answer: "Annual returns must be filed with the District Officer by 31st January each year. Additionally, organizations should maintain monthly internal compliance reviews and quarterly committee assessments to ensure ongoing adherence to requirements."
      },
      {
        question: "What are the penalties for non-compliance with POSH reporting requirements?",
        answer: "Non-compliance can result in penalties up to ₹50,000, debarment from government contracts, cancellation of licenses or registrations, and potential criminal liability for senior management. Regular compliance reporting helps avoid these severe consequences."
      }
    ]
  };

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
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(236, 72, 153, 0.25);
        }

        .pulse-glow {
          animation: pulseGlow 2s infinite;
        }

        @keyframes pulseGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-red-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-red-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-pink-300 shadow-lg">
              <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
              <span className="text-red-800 font-bold text-sm">Compliance & Reporting Excellence</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-red-600 via-pink-600 to-red-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-red-500 via-pink-500 to-red-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-pink-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
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
          </div>
        </div>
      </section>

      {/* Compliance Framework */}
      <section className="py-16 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Compliance Requirements */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-red-600 to-pink-600 rounded-xl shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Mandatory Compliance Requirements
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  The POSH Act 2013 mandates comprehensive documentation and reporting requirements that organizations 
                  must fulfill to maintain legal compliance and avoid penalties.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Annual Returns Filing",
                    desc: "Submit detailed annual reports to District Officer by January 31st"
                  },
                  {
                    title: "Committee Documentation",
                    desc: "Maintain records of all IC meetings, decisions, and member appointments"
                  },
                  {
                    title: "Training Records",
                    desc: "Document all POSH awareness sessions and employee participation"
                  },
                  {
                    title: "Complaint Management",
                    desc: "Detailed records of all complaints, inquiries, and resolutions"
                  },
                  {
                    title: "Policy Compliance",
                    desc: "Employee acknowledgments and policy distribution records"
                  }
                ].map((requirement, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{requirement.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{requirement.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Reporting Framework */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-600 to-red-600 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Professional Reporting Framework
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-pink-500 to-red-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Our comprehensive reporting framework ensures your organization maintains audit-ready 
                  documentation while demonstrating proactive commitment to workplace safety.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Target className="w-5 h-5 text-blue-600" />,
                    title: "Quarterly Compliance Reviews",
                    desc: "Regular assessment of policy adherence and documentation completeness"
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-green-600" />,
                    title: "Real-time Incident Tracking",
                    desc: "Immediate documentation and follow-up on all reported incidents"
                  },
                  {
                    icon: <Users className="w-5 h-5 text-purple-600" />,
                    title: "Stakeholder Communication",
                    desc: "Regular updates to leadership and regulatory bodies as required"
                  },
                  {
                    icon: <AlertTriangle className="w-5 h-5 text-orange-600" />,
                    title: "Risk Assessment Reports",
                    desc: "Proactive identification and mitigation of compliance risks"
                  }
                ].map((service, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {service.icon}
                      <h4 className="font-bold text-gray-900">{service.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Documentation Services */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Complete Documentation Services
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-red-600 to-pink-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Professional documentation and reporting services that ensure your organization maintains 
                comprehensive records while staying ahead of regulatory requirements.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Annual Compliance Reports",
                  desc: "Comprehensive annual reports with detailed analysis and recommendations",
                  highlight: "Due January 31st"
                },
                {
                  title: "Committee Meeting Records",
                  desc: "Professional documentation of all IC meetings and decisions",
                  highlight: "Monthly Reviews"
                },
                {
                  title: "Training Documentation",
                  desc: "Complete records of all training sessions and employee participation",
                  highlight: "Audit Ready"
                },
                {
                  title: "Incident Investigation Reports",
                  desc: "Detailed investigation reports with proper legal documentation",
                  highlight: "Legal Compliant"
                },
                {
                  title: "Policy Distribution Records",
                  desc: "Track employee acknowledgments and policy compliance",
                  highlight: "100% Coverage"
                },
                {
                  title: "Regulatory Correspondence",
                  desc: "Professional communication with District Officers and authorities",
                  highlight: "Official Channel"
                }
              ].map((service, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                      <div className="inline-block px-2 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full mb-2">
                        {service.highlight}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-pink-600 rounded-xl shadow-lg pulse-glow">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Why Choose Professional Compliance Reporting?
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-pink-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Professional compliance reporting not only ensures legal adherence but also demonstrates 
                your organization's commitment to maintaining the highest standards of workplace safety and dignity.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Avoid Penalties",
                  desc: "Prevent costly fines and legal complications through proper documentation"
                },
                {
                  icon: <Shield className="w-6 h-6 text-blue-600" />,
                  title: "Legal Protection",
                  desc: "Comprehensive records provide strong legal defense if needed"
                },
                {
                  icon: <Star className="w-6 h-6 text-yellow-600" />,
                  title: "Reputation Management",
                  desc: "Demonstrate proactive commitment to employee safety and dignity"
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-600" />,
                  title: "Audit Readiness",
                  desc: "Always prepared for regulatory inspections and compliance audits"
                },
                {
                  icon: <Users className="w-6 h-6 text-pink-600" />,
                  title: "Employee Trust",
                  desc: "Build confidence through transparent and professional processes"
                },
                {
                  icon: <ArrowRight className="w-6 h-6 text-red-600" />,
                  title: "Continuous Improvement",
                  desc: "Regular reporting identifies areas for policy and process enhancement"
                }
              ].map((benefit, index) => (
                <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Need <span className="text-red-600">Professional Compliance Reporting</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Ensure your organization maintains comprehensive, audit-ready documentation with our professional reporting services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Get Compliance Support</span>
                <ArrowRight className="w-5 h-5" />
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
            <div className="w-20 h-2 bg-gradient-to-r from-red-600 to-pink-600 mx-auto rounded-full shadow-lg"></div>
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
