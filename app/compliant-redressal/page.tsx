"use client";
import React, { useState } from 'react';
import { ChevronDown, Scale, Shield, Users, FileText, CheckCircle, Mail, ArrowRight, Clock, Target, AlertTriangle, Award, Gavel, BookOpen } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-orange-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-orange-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-orange-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-orange-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-orange-700' : 'hover:bg-orange-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-orange-200 mb-2"></div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function CompliantRedressalPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Compliant Redressal: Expert Guidance for Workplace Harassment Resolution",
    subtitle: "Professional Complaint Resolution Services",
    description: "Expert guidance through complaint resolution processes ensuring legal compliance, fair procedures, comprehensive documentation, and effective resolution support for all workplace harassment cases.",
    faqs: [
      {
        question: "What is the proper procedure for handling POSH complaints under the Act?",
        answer: "Under POSH Act 2013, complaints must be filed within 3 months (extendable to 6 months), the Internal Committee must conduct a thorough investigation within 90 days, ensure confidentiality, provide fair hearing to all parties, maintain detailed records, and submit a final report with recommendations for action."
      },
      {
        question: "How should organizations ensure fair and unbiased complaint resolution?",
        answer: "Organizations should establish clear procedures, ensure IC members are trained, maintain confidentiality, provide equal opportunity for both parties to present their case, avoid conflicts of interest, document all proceedings, and follow due process as outlined in the POSH Act."
      },
      {
        question: "What documentation is required throughout the complaint resolution process?",
        answer: "Required documentation includes complaint registration, acknowledgment receipts, investigation notes, witness statements, evidence collection records, hearing minutes, interim orders (if any), final investigation report, action taken report, and compliance verification documents."
      },
      {
        question: "What support should be provided to complainants during the process?",
        answer: "Complainants should receive confidentiality assurance, protection from retaliation, regular updates on case progress, access to counseling services if needed, reasonable accommodations during investigation, and clear communication about their rights and the process timeline."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
          border: 2px solid #fed7aa;
          box-shadow: 0 8px 32px rgba(249, 115, 22, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #ffffff 100%);
          border: 1px solid #fde68a;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(249, 115, 22, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #fff7ed 100%);
          border: 2px solid #fdba74;
          box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(249, 115, 22, 0.25);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-orange-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-100/40 to-amber-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-orange-300 shadow-lg">
              <div className="w-3 h-3 bg-orange-600 rounded-full animate-pulse"></div>
              <span className="text-orange-800 font-bold text-sm">Professional Complaint Resolution</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-orange-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-orange-700 to-amber-700 bg-clip-text text-transparent">
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

      {/* Main Services */}
      <section className="py-16 bg-gradient-to-b from-white via-orange-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Complaint Resolution Process */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-orange-600 to-amber-600 rounded-xl shadow-lg">
                  <Scale className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Professional Complaint Resolution
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-orange-500 to-amber-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Comprehensive support throughout the entire complaint resolution process, ensuring legal compliance, 
                  fairness, and effective outcomes for all parties involved.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Initial Assessment & Registration",
                    desc: "Proper complaint intake, preliminary assessment, and formal registration process"
                  },
                  {
                    title: "Investigation Planning",
                    desc: "Strategic investigation approach with timeline, methodology, and resource allocation"
                  },
                  {
                    title: "Evidence Collection",
                    desc: "Systematic collection and preservation of evidence, witness statements, and documentation"
                  },
                  {
                    title: "Fair Hearing Process",
                    desc: "Conducting impartial hearings with due process for all parties involved"
                  },
                  {
                    title: "Resolution & Follow-up",
                    desc: "Implementing appropriate remedies and ensuring ongoing compliance monitoring"
                  }
                ].map((step, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{step.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed mt-1">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Compliance Support */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg">
                  <Gavel className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Legal Compliance & Documentation
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Ensure full legal compliance with POSH Act 2013 requirements while maintaining comprehensive 
                  documentation throughout the resolution process.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <FileText className="w-5 h-5 text-blue-600" />,
                    title: "Legal Framework Compliance",
                    desc: "Adherence to all POSH Act 2013 requirements and recent amendments"
                  },
                  {
                    icon: <BookOpen className="w-5 h-5 text-green-600" />,
                    title: "Documentation Standards",
                    desc: "Comprehensive record-keeping meeting legal and audit requirements"
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-purple-600" />,
                    title: "Timeline Management",
                    desc: "Strict adherence to statutory timelines and procedural deadlines"
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-orange-600" />,
                    title: "Confidentiality Protocols",
                    desc: "Robust confidentiality measures protecting all parties' privacy"
                  }
                ].map((feature, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {feature.icon}
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Features */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Comprehensive Resolution Support
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Professional support services ensuring effective, compliant, and fair resolution of workplace harassment complaints.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Expert Investigation Team",
                  desc: "Experienced professionals trained in harassment investigation procedures",
                  highlight: "Certified Experts"
                },
                {
                  title: "Legal Compliance Assurance",
                  desc: "Complete adherence to POSH Act requirements and procedural guidelines",
                  highlight: "100% Compliant"
                },
                {
                  title: "Confidentiality Protection",
                  desc: "Robust measures to protect privacy and prevent information leakage",
                  highlight: "Secure Process"
                },
                {
                  title: "Fair Hearing Management",
                  desc: "Impartial proceedings ensuring due process for all parties",
                  highlight: "Due Process"
                },
                {
                  title: "Documentation Excellence",
                  desc: "Comprehensive record-keeping meeting all legal requirements",
                  highlight: "Audit Ready"
                },
                {
                  title: "Resolution Implementation",
                  desc: "Support for implementing recommendations and monitoring compliance",
                  highlight: "Follow Through"
                }
              ].map((service, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{service.title}</h3>
                      <div className="inline-block px-2 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full mb-2">
                        {service.highlight}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-orange-600 rounded-xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Why Choose Professional Complaint Resolution?
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-orange-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Legal Protection",
                  desc: "Comprehensive protection against legal challenges and non-compliance issues"
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "Employee Trust",
                  desc: "Build confidence in organizational commitment to fair and effective resolution"
                },
                {
                  icon: <Clock className="w-6 h-6 text-purple-600" />,
                  title: "Efficient Process",
                  desc: "Streamlined procedures ensuring timely resolution within statutory timeframes"
                },
                {
                  icon: <Shield className="w-6 h-6 text-orange-600" />,
                  title: "Risk Mitigation",
                  desc: "Proactive approach to minimize legal, reputational, and operational risks"
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
      <section className="py-16 bg-gradient-to-b from-orange-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Need <span className="text-orange-600">Professional Complaint Resolution</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Get expert guidance for effective, compliant, and fair workplace harassment complaint resolution
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-orange-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Get Resolution Support</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-orange-600 to-amber-600 mx-auto rounded-full shadow-lg"></div>
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
