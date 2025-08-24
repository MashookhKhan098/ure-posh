"use client";
import React, { useState } from 'react';
import { ChevronDown, Calendar, Clock, CheckCircle, Mail, ArrowRight, Target, BookOpen, Award, Users, RefreshCw, Shield } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-indigo-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-indigo-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-indigo-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-indigo-700' : 'hover:bg-indigo-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-indigo-200 mb-2"></div>
        <div className="bg-indigo-50 rounded-lg p-3 border border-indigo-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function QuarterlyMandatoryTrainingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Quarterly Mandatory Training: Continuous POSH Compliance Education",
    subtitle: "Regular Mandatory Compliance Training Programs",
    description: "Systematic quarterly training sessions with updated content, progress tracking, and compliance verification to ensure ongoing adherence to POSH requirements and workplace safety standards.",
    faqs: [
      {
        question: "Why is quarterly training necessary for POSH compliance?",
        answer: "Quarterly training ensures continuous awareness, addresses policy updates, reinforces behavioral expectations, maintains legal compliance, responds to workplace changes, and provides regular opportunities to address emerging issues and maintain a culture of respect and safety."
      },
      {
        question: "What topics are covered in quarterly mandatory training sessions?",
        answer: "Each quarter covers different aspects: Q1 focuses on policy updates and legal changes, Q2 on case studies and scenarios, Q3 on prevention strategies and reporting procedures, and Q4 on annual review and compliance verification, ensuring comprehensive coverage throughout the year."
      },
      {
        question: "How do you track compliance and participation in quarterly training?",
        answer: "We provide comprehensive tracking through attendance records, completion certificates, assessment scores, progress dashboards, compliance reports, participation analytics, and automated reminders to ensure 100% employee participation and organizational compliance."
      },
      {
        question: "What happens if employees miss quarterly training sessions?",
        answer: "We provide makeup sessions, alternative delivery methods, individualized catch-up training, recorded session access, one-on-one coaching if needed, and ensure no employee falls behind on mandatory compliance requirements through flexible makeup options."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
          border: 2px solid #c7d2fe;
          box-shadow: 0 8px 32px rgba(99, 102, 241, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #ede9fe 50%, #ffffff 100%);
          border: 1px solid #ddd6fe;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
          border: 2px solid #a5b4fc;
          box-shadow: 0 20px 40px rgba(99, 102, 241, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(99, 102, 241, 0.25);
        }

        .quarterly-cycle {
          animation: quarterlyCycle 4s infinite;
        }

        @keyframes quarterlyCycle {
          0%, 100% { 
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          }
          25% { 
            background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
          }
          50% { 
            background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
          }
          75% { 
            background: linear-gradient(135deg, #f59e0b 0%, #10b981 100%);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-indigo-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-indigo-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-indigo-300 shadow-lg">
              <div className="w-3 h-3 bg-indigo-600 rounded-full animate-pulse"></div>
              <span className="text-indigo-800 font-bold text-sm">Quarterly Mandatory Training</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-indigo-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-indigo-700 to-purple-700 bg-clip-text text-transparent">
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

      {/* Quarterly Training Structure */}
      <section className="py-16 bg-gradient-to-b from-white via-indigo-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Quarterly Schedule */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Quarterly Training Schedule
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Structured quarterly training program ensuring comprehensive coverage of POSH compliance topics throughout the year.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  quarter: "Q1",
                  title: "Policy Updates & Legal Changes",
                  period: "January - March",
                  focus: "Latest legal requirements and policy amendments",
                  color: "from-blue-500 to-indigo-600",
                  topics: ["New regulations", "Policy updates", "Legal amendments", "Compliance requirements"]
                },
                {
                  quarter: "Q2", 
                  title: "Case Studies & Scenarios",
                  period: "April - June",
                  focus: "Real-world examples and practical applications",
                  color: "from-green-500 to-blue-600",
                  topics: ["Case analysis", "Scenario planning", "Best practices", "Lesson learned"]
                },
                {
                  quarter: "Q3",
                  title: "Prevention & Reporting",
                  period: "July - September", 
                  focus: "Prevention strategies and reporting procedures",
                  color: "from-yellow-500 to-green-600",
                  topics: ["Prevention methods", "Reporting channels", "Early intervention", "Support systems"]
                },
                {
                  quarter: "Q4",
                  title: "Annual Review & Assessment",
                  period: "October - December",
                  focus: "Year-end review and compliance verification",
                  color: "from-purple-500 to-yellow-600",
                  topics: ["Annual assessment", "Compliance review", "Progress evaluation", "Planning ahead"]
                }
              ].map((quarter, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className={`p-3 bg-gradient-to-br ${quarter.color} rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center quarterly-cycle`}>
                    <span className="text-white font-bold text-lg">{quarter.quarter}</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-center mb-2">{quarter.title}</h3>
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-full">
                      {quarter.period}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed text-center mb-4">{quarter.focus}</p>
                  <ul className="space-y-1">
                    {quarter.topics.map((topic, topicIdx) => (
                      <li key={topicIdx} className="flex items-start">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2 mt-1 flex-shrink-0" />
                        <span className="text-xs text-gray-600">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Training Features */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Systematic Training Approach
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Structured quarterly training program designed to maintain continuous compliance, 
                  update knowledge, and reinforce organizational commitment to workplace safety.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Updated Content Delivery",
                    desc: "Fresh content each quarter addressing latest developments and requirements"
                  },
                  {
                    title: "Progress Tracking System",
                    desc: "Comprehensive tracking of participation, completion, and competency development"
                  },
                  {
                    title: "Compliance Verification",
                    desc: "Regular assessment and certification ensuring organizational compliance standards"
                  },
                  {
                    title: "Flexible Delivery Options", 
                    desc: "Multiple formats including in-person, virtual, and hybrid session options"
                  },
                  {
                    title: "Makeup Session Provision",
                    desc: "Alternative sessions and catch-up opportunities for missed training"
                  }
                ].map((feature, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance Tracking */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Comprehensive Compliance Tracking
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Advanced tracking and reporting systems ensuring complete visibility into training 
                  participation, compliance status, and organizational readiness.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="w-5 h-5 text-blue-600" />,
                    title: "Attendance Monitoring",
                    desc: "Real-time tracking of employee participation across all quarterly sessions"
                  },
                  {
                    icon: <BookOpen className="w-5 h-5 text-green-600" />,
                    title: "Completion Certificates",
                    desc: "Digital certificates issued upon successful completion of training modules"
                  },
                  {
                    icon: <RefreshCw className="w-5 h-5 text-purple-600" />,
                    title: "Progress Dashboards",
                    desc: "Interactive dashboards showing individual and organizational progress"
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-orange-600" />,
                    title: "Compliance Reports",
                    desc: "Detailed reports demonstrating organizational compliance with training requirements"
                  }
                ].map((tracking, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {tracking.icon}
                      <h4 className="font-bold text-gray-900">{tracking.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{tracking.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-indigo-600 rounded-xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Benefits of Quarterly Mandatory Training
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-indigo-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Regular quarterly training ensures continuous compliance, updated knowledge, and sustained 
                organizational commitment to workplace safety and respect.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Continuous Compliance",
                  desc: "Maintain ongoing adherence to legal requirements and organizational policies"
                },
                {
                  icon: <RefreshCw className="w-6 h-6 text-blue-600" />,
                  title: "Updated Knowledge",
                  desc: "Regular updates on legal changes, best practices, and industry developments"
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-600" />,
                  title: "Employee Engagement",
                  desc: "Sustained engagement and awareness through regular training touchpoints"
                },
                {
                  icon: <Shield className="w-6 h-6 text-orange-600" />,
                  title: "Risk Mitigation",
                  desc: "Proactive risk management through consistent education and awareness"
                },
                {
                  icon: <Target className="w-6 h-6 text-indigo-600" />,
                  title: "Measurable Progress",
                  desc: "Track improvement and compliance through regular assessment and reporting"
                },
                {
                  icon: <Clock className="w-6 h-6 text-green-600" />,
                  title: "Timely Updates",
                  desc: "Immediate dissemination of policy changes and regulatory updates"
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
      <section className="py-16 bg-gradient-to-b from-indigo-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready for <span className="text-indigo-600">Quarterly Mandatory Training</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Establish systematic quarterly training program to ensure continuous POSH compliance and workplace safety
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Quarterly Program</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
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
