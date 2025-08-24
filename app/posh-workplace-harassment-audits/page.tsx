"use client";
import React, { useState } from 'react';
import { ChevronDown, Search, Shield, Users, FileText, CheckCircle, Mail, ArrowRight, Clock, Target, AlertTriangle, Award, Eye, BookOpen, Zap } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-blue-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-blue-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-blue-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-blue-700' : 'hover:bg-blue-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-blue-200 mb-2"></div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function POSHWorkplaceHarassmentAuditsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Comprehensive POSH Workplace Harassment Audits & Assessment Services",
    subtitle: "Professional Evaluation and Risk Assessment Solutions",
    description: "Expert workplace harassment audits that evaluate your organization's POSH compliance, identify vulnerabilities, and provide actionable recommendations to strengthen your harassment prevention framework.",
    faqs: [
      {
        question: "What does a comprehensive POSH audit include?",
        answer: "A comprehensive POSH audit includes evaluation of policy implementation, Internal Committee effectiveness, complaint handling procedures, training programs, documentation practices, employee awareness levels, and compliance with legal requirements. We also assess workplace culture and identify potential risk areas."
      },
      {
        question: "How often should organizations conduct POSH audits?",
        answer: "We recommend conducting comprehensive POSH audits annually, with quarterly mini-assessments to track progress. New organizations should have an initial audit within 6 months of establishing their POSH framework, and any organization with reported incidents should consider an immediate audit."
      },
      {
        question: "What are the key indicators of effective POSH implementation?",
        answer: "Key indicators include: active and trained Internal Committee, comprehensive policy awareness among employees, prompt complaint resolution, regular training completion, proper documentation practices, zero tolerance culture, and proactive prevention measures rather than reactive responses."
      },
      {
        question: "How can audit findings help improve workplace safety?",
        answer: "Audit findings provide a roadmap for improvement by identifying gaps in current practices, highlighting training needs, revealing cultural issues, recommending policy updates, suggesting procedural improvements, and establishing benchmarks for measuring progress in creating safer workplaces."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border: 2px solid #dbeafe;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(59, 130, 246, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border: 2px solid #93c5fd;
          box-shadow: 0 20px 40px rgba(59, 130, 246, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(59, 130, 246, 0.25);
        }

        .audit-pulse {
          animation: auditPulse 3s infinite;
        }

        @keyframes auditPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
            transform: scale(1.02);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-blue-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-100/40 to-indigo-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-blue-300 shadow-lg">
              <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-blue-800 font-bold text-sm">Professional Audit Services</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-blue-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
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

      {/* Audit Process Overview */}
      <section className="py-16 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Main Audit Services */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Comprehensive Assessment */}
            <div className="focus-card p-8 rounded-2xl shadow-xl audit-pulse">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                  <Search className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Comprehensive POSH Assessment
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Our expert team conducts thorough evaluations of your organization's entire POSH framework, 
                  from policy implementation to cultural assessment, ensuring comprehensive compliance and effectiveness.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Policy & Documentation Review",
                    desc: "Comprehensive analysis of all POSH policies, procedures, and documentation"
                  },
                  {
                    title: "Internal Committee Assessment",
                    desc: "Evaluation of committee composition, training, and effectiveness"
                  },
                  {
                    title: "Complaint Handling Analysis",
                    desc: "Review of complaint procedures, case studies, and resolution mechanisms"
                  },
                  {
                    title: "Training Program Evaluation",
                    desc: "Assessment of training content, delivery methods, and employee participation"
                  },
                  {
                    title: "Workplace Culture Analysis",
                    desc: "Deep-dive assessment of organizational culture and employee perceptions"
                  }
                ].map((assessment, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{assessment.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{assessment.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit Methodology */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Professional Audit Methodology
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Our systematic approach combines quantitative analysis with qualitative insights to provide 
                  a complete picture of your organization's POSH implementation effectiveness.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <BookOpen className="w-5 h-5 text-blue-600" />,
                    title: "Document Analysis",
                    desc: "Thorough review of policies, procedures, and compliance records"
                  },
                  {
                    icon: <Users className="w-5 h-5 text-green-600" />,
                    title: "Stakeholder Interviews",
                    desc: "Confidential interviews with employees, managers, and committee members"
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-purple-600" />,
                    title: "Workplace Observation",
                    desc: "Assessment of workplace environment and behavioral indicators"
                  },
                  {
                    icon: <FileText className="w-5 h-5 text-orange-600" />,
                    title: "Gap Analysis",
                    desc: "Identification of deficiencies and areas for improvement"
                  },
                  {
                    icon: <Award className="w-5 h-5 text-red-600" />,
                    title: "Best Practice Benchmarking",
                    desc: "Comparison against industry standards and leading practices"
                  }
                ].map((method, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {method.icon}
                      <h4 className="font-bold text-gray-900">{method.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{method.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Audit Components */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Complete Audit Framework
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our comprehensive audit framework evaluates every aspect of your POSH implementation 
                to ensure maximum effectiveness and legal compliance.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Legal Compliance Check",
                  desc: "Verification of adherence to POSH Act 2013 requirements",
                  highlight: "100% Compliant",
                  color: "blue"
                },
                {
                  title: "Policy Effectiveness Review",
                  desc: "Assessment of policy clarity, accessibility, and employee understanding",
                  highlight: "Clear Policies",
                  color: "green"
                },
                {
                  title: "Committee Performance Audit",
                  desc: "Evaluation of Internal Committee functioning and decision-making",
                  highlight: "Effective IC",
                  color: "purple"
                },
                {
                  title: "Training Impact Assessment",
                  desc: "Analysis of training effectiveness and behavioral change outcomes",
                  highlight: "Measurable Impact",
                  color: "orange"
                },
                {
                  title: "Incident Response Evaluation",
                  desc: "Review of complaint handling processes and resolution effectiveness",
                  highlight: "Swift Resolution",
                  color: "red"
                },
                {
                  title: "Cultural Climate Survey",
                  desc: "Anonymous assessment of workplace culture and employee perceptions",
                  highlight: "Safe Environment",
                  color: "indigo"
                }
              ].map((component, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 bg-gradient-to-br from-${component.color}-500 to-${component.color}-600 rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{component.title}</h3>
                      <div className={`inline-block px-2 py-1 bg-${component.color}-100 text-${component.color}-800 text-xs font-bold rounded-full mb-2`}>
                        {component.highlight}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{component.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Outcomes */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Audit Benefits & Expected Outcomes
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Our professional audits provide actionable insights that drive meaningful improvements in workplace 
                safety, legal compliance, and organizational culture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Shield className="w-6 h-6 text-blue-600" />,
                  title: "Enhanced Legal Protection",
                  desc: "Comprehensive compliance reduces legal risks and demonstrates due diligence"
                },
                {
                  icon: <Users className="w-6 h-6 text-green-600" />,
                  title: "Improved Employee Confidence",
                  desc: "Professional assessment builds trust in organizational commitment to safety"
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-600" />,
                  title: "Targeted Improvements",
                  desc: "Specific recommendations for addressing identified gaps and weaknesses"
                },
                {
                  icon: <Award className="w-6 h-6 text-orange-600" />,
                  title: "Industry Benchmarking",
                  desc: "Understanding of performance relative to industry standards and best practices"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Compliance Assurance",
                  desc: "Verification that all legal requirements are being met effectively"
                },
                {
                  icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
                  title: "Risk Mitigation",
                  desc: "Proactive identification and mitigation of potential harassment risks"
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
      <section className="py-16 bg-gradient-to-b from-blue-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready for a <span className="text-blue-600">Professional POSH Audit</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Get comprehensive evaluation of your workplace harassment prevention framework with actionable improvement recommendations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Schedule Professional Audit</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full shadow-lg"></div>
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
