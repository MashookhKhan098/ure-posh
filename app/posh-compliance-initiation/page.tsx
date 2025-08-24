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

export default function POSHComplianceInitiationPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "POSH Compliance Initiation",
    subtitle: "India's Next-Generation Workplace Safety Platform",
    description: "Revolutionary POSH compliance solutions powered by AI-driven insights and international standards"
  };

  const services = [
    {
      name: "Intelligent Policy Architecture",
      description: "AI-powered policy drafting aligned with POSH Act 2013, Supreme Court precedents, and international guidelines (ILO, UN Women). Custom policy generation based on industry-specific risk profiles.",
      icon: Shield
    },
    {
      name: "Digital IC Constitution & Training",
      description: "Streamlined Internal Committee formation with automated external member sourcing. VR-enabled training modules for IC members with real-time competency assessment.",
      icon: Users
    },
    {
      name: "Immersive Employee Education", 
      description: "Gamified learning experiences with case study simulations. Multi-language support with cultural sensitivity integration. Microlearning modules optimized for mobile consumption.",
      icon: Award
    },
    {
      name: "Leadership Excellence Programs",
      description: "Executive dashboards for compliance monitoring. Board-level governance reporting with ESG integration. Strategic consultation for global compliance alignment.",
      icon: Star
    },
    {
      name: "Automated Investigation Support",
      description: "AI-assisted inquiry process management. Confidential digital evidence collection and analysis. Automated report generation with legal recommendation engine.",
      icon: FileText
    },
    {
      name: "Smart Compliance Reporting",
      description: "Real-time compliance dashboards with predictive analytics. Automated annual filing preparation. Integration with existing HR and legal systems.",
      icon: Globe
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

        @keyframes pulse-glow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(236, 72, 153, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(236, 72, 153, 0.6);
            transform: scale(1.02);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-100/40 to-pink-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-6 py-3 rounded-full border border-purple-300 shadow-xl animate-pulse-glow">
              <div className="w-4 h-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full animate-pulse"></div>
              <span className="text-purple-800 font-bold text-base">AI-Powered Compliance Solutions</span>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-32 h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-full shadow-xl mx-auto"></div>
            </div>
            
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="content-highlight rounded-2xl p-6 border-2 border-purple-200 shadow-2xl">
                <p className="text-xl md:text-2xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                    {pageData.subtitle}
                  </strong>
                </p>
              </div>
              
              <div className="text-focus rounded-2xl p-8 shadow-2xl">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  {pageData.description}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 pt-6 justify-center">
              <button className="group focus-card px-8 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                <div className="flex items-center justify-center gap-4">
                  <Zap className="w-6 h-6" />
                  <span>Start AI-Powered Compliance</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="group text-focus border-3 border-purple-600 text-purple-700 px-8 py-5 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center gap-4">
                <FileText className="w-6 h-6" />
                <span>View Technology Demo</span>
                <div className="w-4 h-4 bg-purple-600 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-6">
              Advanced POSH Compliance Ecosystem
            </h2>
            <div className="w-24 h-2 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full shadow-lg mb-8"></div>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              URE POSH leverages cutting-edge technology and legal expertise to deliver comprehensive 
              Prevention of Sexual Harassment compliance solutions with AI-powered insights and real-time monitoring.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="focus-card p-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 group">
                <div className="flex flex-col items-center text-center space-y-6">
                  <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold high-contrast-text group-hover:text-purple-600 transition-colors duration-300 mb-4">
                      {service.name}
                    </h3>
                    <div className="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4"></div>
                  </div>
                  
                  <div className="text-focus p-6 rounded-xl w-full">
                    <p className="text-gray-800 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Strategic Benefits */}
          <div className="mt-20">
            <div className="focus-card p-10 rounded-3xl shadow-2xl">
              <div className="text-center mb-10">
                <h3 className="text-3xl md:text-4xl font-bold high-contrast-text mb-6">
                  Strategic Compliance Imperatives
                </h3>
                <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-sm mx-auto mb-6"></div>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                  In today's hyper-connected business environment, POSH compliance isn't just legal requirement—
                  it's a competitive advantage that drives sustainable growth and stakeholder confidence.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Mandatory Legal Compliance",
                    desc: "POSH Act 2013 requirements for organizations with 10+ employees",
                    icon: Shield
                  },
                  {
                    title: "Advanced Risk Mitigation", 
                    desc: "Predictive compliance modeling and proactive risk assessment",
                    icon: Zap
                  },
                  {
                    title: "ESG Alignment",
                    desc: "Global investor confidence and funding readiness through certified practices",
                    icon: Star
                  },
                  {
                    title: "Enhanced Employer Branding",
                    desc: "Certified safe workplace practices that attract top talent",
                    icon: Award
                  },
                  {
                    title: "Industry 4.0 Integration",
                    desc: "Integration with modern workplace safety and digital transformation standards",
                    icon: Globe
                  },
                  {
                    title: "Predictive Analytics",
                    desc: "AI-powered insights for workplace safety trends and compliance optimization",
                    icon: FileText
                  }
                ].map((benefit, index) => (
                  <div key={index} className="content-highlight p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md">
                        <benefit.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-2">{benefit.title}</h4>
                        <p className="text-gray-700 text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Integration CTA */}
      <section className="py-20 bg-gradient-to-b from-purple-50/30 to-white">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="focus-card p-12 rounded-3xl shadow-2xl animate-pulse-glow">
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold high-contrast-text mb-6">
                  Ready for <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Next-Generation</span> Compliance?
                </h3>
                <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-6"></div>
                <p className="text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
                  Experience the future of workplace safety compliance with our AI-powered platform. 
                  Transform your organization with intelligent, predictive, and globally aligned solutions.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl">
                  <Mail className="w-6 h-6" />
                  <span>Schedule AI Demo</span>
                  <ArrowRight className="w-6 h-6" />
                </a>
                <a href="tel:+911234567890" className="inline-flex items-center gap-4 border-3 border-purple-600 text-purple-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-all duration-300 shadow-2xl hover:shadow-3xl">
                  <Phone className="w-6 h-6" />
                  <span>Expert Consultation</span>
                  <Zap className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Highlights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI-Powered Risk Assessment",
                desc: "Machine learning algorithms analyze workplace patterns to predict and prevent potential harassment incidents before they occur.",
                icon: Zap
              },
              {
                title: "Blockchain Documentation",
                desc: "Immutable, secure record-keeping system ensuring complete audit trails and legal compliance documentation.",
                icon: Shield
              },
              {
                title: "IoT Integration",
                desc: "Internet of Things enabled reporting systems providing seamless, confidential incident reporting across all workplace touchpoints.",
                icon: Globe
              }
            ].map((feature, index) => (
              <div key={index} className="focus-card p-8 rounded-2xl shadow-xl text-center">
                <div className="p-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-lg mx-auto mb-6 w-fit">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold high-contrast-text mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
