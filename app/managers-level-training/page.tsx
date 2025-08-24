"use client";
import React, { useState } from 'react';
import { ChevronDown, Users, Crown, Target, CheckCircle, Mail, ArrowRight, Shield, Briefcase, Award, Star, TrendingUp } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-amber-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-amber-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-amber-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-amber-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-amber-700' : 'hover:bg-amber-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-amber-200 mb-2"></div>
        <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function ManagersLevelTrainingPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Managers Level Training: Leadership-Focused POSH Compliance",
    subtitle: "Leadership-Focused Compliance Training Programs",
    description: "Specialized training programs for managers and leaders focusing on leadership skills, prevention strategies, team management, and cultural responsibility in creating harassment-free workplaces.",
    faqs: [
      {
        question: "Why do managers need specialized POSH training different from general employee training?",
        answer: "Managers have additional responsibilities including recognizing early warning signs, handling initial complaints, supporting team members, creating inclusive environments, making decisions about workplace culture, and serving as role models. They need enhanced skills in leadership, communication, and legal understanding."
      },
      {
        question: "What specific leadership skills are covered in managers' POSH training?",
        answer: "Training covers ethical leadership, creating psychological safety, handling difficult conversations, supporting survivors, managing team dynamics, decision-making in sensitive situations, crisis management, building inclusive teams, and fostering respectful workplace cultures."
      },
      {
        question: "How often should managers receive POSH leadership training?",
        answer: "Managers should receive initial comprehensive training upon appointment, annual refresher training, specialized sessions for policy updates, scenario-based training quarterly, and immediate training when handling specific cases or during organizational changes."
      },
      {
        question: "What role do managers play in POSH prevention and response?",
        answer: "Managers are responsible for creating safe environments, modeling appropriate behavior, recognizing and addressing issues early, supporting employees through complaints, ensuring team compliance, maintaining confidentiality, and working with HR and IC for effective resolution."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
          border: 2px solid #fed7aa;
          box-shadow: 0 8px 32px rgba(245, 158, 11, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #ffffff 100%);
          border: 1px solid #fde68a;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(245, 158, 11, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #fffbeb 100%);
          border: 2px solid #fbbf24;
          box-shadow: 0 20px 40px rgba(245, 158, 11, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(245, 158, 11, 0.25);
        }

        .leadership-glow {
          animation: leadershipGlow 2s infinite;
        }

        @keyframes leadershipGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(245, 158, 11, 0.6);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-amber-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-100/40 to-yellow-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-amber-300 shadow-lg">
              <div className="w-3 h-3 bg-amber-600 rounded-full animate-pulse"></div>
              <span className="text-amber-800 font-bold text-sm">Leadership Training Excellence</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-amber-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-amber-700 to-yellow-700 bg-clip-text text-transparent">
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

      {/* Leadership Training Components */}
      <section className="py-16 bg-gradient-to-b from-white via-amber-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Leadership Skills Development */}
            <div className="focus-card p-8 rounded-2xl shadow-xl leadership-glow">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-amber-600 to-yellow-600 rounded-xl shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Leadership Excellence Development
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Comprehensive leadership development program designed specifically for managers to create 
                  and maintain harassment-free workplace environments through effective leadership practices.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Ethical Leadership Principles",
                    desc: "Foundational principles of ethical leadership and moral decision-making in workplace contexts"
                  },
                  {
                    title: "Creating Psychological Safety",
                    desc: "Building environments where employees feel safe to speak up and report concerns"
                  },
                  {
                    title: "Inclusive Team Management",
                    desc: "Leading diverse teams with cultural sensitivity and inclusion best practices"
                  },
                  {
                    title: "Difficult Conversation Skills",
                    desc: "Managing sensitive discussions, addressing concerns, and handling conflicts"
                  },
                  {
                    title: "Crisis Leadership & Response",
                    desc: "Leading effectively during harassment incidents and organizational crises"
                  }
                ].map((skill, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{skill.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Management Responsibilities */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-yellow-600 to-amber-600 rounded-xl shadow-lg">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Manager-Specific Responsibilities
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Understanding and fulfilling the unique responsibilities that managers have in preventing, 
                  identifying, and responding to workplace harassment situations.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Shield className="w-5 h-5 text-blue-600" />,
                    title: "Prevention & Early Intervention",
                    desc: "Identifying warning signs and addressing issues before they escalate"
                  },
                  {
                    icon: <Users className="w-5 h-5 text-green-600" />,
                    title: "Team Culture Leadership",
                    desc: "Shaping and maintaining positive, respectful team cultures and dynamics"
                  },
                  {
                    icon: <Target className="w-5 h-5 text-purple-600" />,
                    title: "Performance Management",
                    desc: "Addressing performance issues while maintaining professional boundaries"
                  },
                  {
                    icon: <TrendingUp className="w-5 h-5 text-orange-600" />,
                    title: "Continuous Improvement",
                    desc: "Implementing feedback and driving continuous cultural improvements"
                  }
                ].map((responsibility, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {responsibility.icon}
                      <h4 className="font-bold text-gray-900">{responsibility.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{responsibility.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Modules */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Comprehensive Leadership Training Modules
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-amber-600 to-yellow-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Structured learning modules designed specifically for managers and leaders to excel in creating 
                harassment-free workplace environments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Leadership Fundamentals",
                  desc: "Core leadership principles and ethical decision-making frameworks",
                  highlight: "Foundation",
                  duration: "Half Day"
                },
                {
                  title: "Legal Responsibilities", 
                  desc: "Manager-specific legal obligations and compliance requirements",
                  highlight: "Compliance",
                  duration: "Half Day"
                },
                {
                  title: "Scenario Management",
                  desc: "Handling real workplace situations and case study analysis",
                  highlight: "Practical",
                  duration: "Full Day"
                },
                {
                  title: "Communication Excellence",
                  desc: "Advanced communication skills for sensitive conversations",
                  highlight: "Skills",
                  duration: "Half Day"
                },
                {
                  title: "Team Development",
                  desc: "Building inclusive, respectful, and high-performing teams",
                  highlight: "Culture",
                  duration: "Full Day"
                },
                {
                  title: "Crisis Response",
                  desc: "Managing incidents, supporting employees, and organizational recovery",
                  highlight: "Emergency",
                  duration: "Half Day"
                }
              ].map((module, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{module.title}</h3>
                      <div className="flex gap-2 mb-2">
                        <span className="inline-block px-2 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                          {module.highlight}
                        </span>
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                          {module.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{module.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Outcomes */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-amber-600 rounded-xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Leadership Training Benefits & Outcomes
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-amber-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Managers who complete our specialized training demonstrate improved leadership effectiveness, 
                better team outcomes, and stronger organizational culture development.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Crown className="w-6 h-6 text-amber-600" />,
                  title: "Enhanced Leadership Skills",
                  desc: "Improved ability to lead teams ethically and inclusively in all situations"
                },
                {
                  icon: <Shield className="w-6 h-6 text-blue-600" />,
                  title: "Proactive Prevention",
                  desc: "Early identification and prevention of workplace harassment and conflicts"
                },
                {
                  icon: <Users className="w-6 h-6 text-green-600" />,
                  title: "Team Performance",
                  desc: "Higher team engagement, trust, and performance in inclusive environments"
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-600" />,
                  title: "Organizational Impact",
                  desc: "Positive influence on overall workplace culture and employee satisfaction"
                },
                {
                  icon: <TrendingUp className="w-6 h-6 text-orange-600" />,
                  title: "Career Development",
                  desc: "Enhanced leadership credentials and career advancement opportunities"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Compliance Confidence",
                  desc: "Complete understanding of legal obligations and confident decision-making"
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
      <section className="py-16 bg-gradient-to-b from-amber-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to Empower Your <span className="text-amber-600">Management Team</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Develop exceptional leaders who create harassment-free, inclusive, and high-performing workplace environments
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-amber-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-amber-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Leadership Training</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-amber-600 to-yellow-600 mx-auto rounded-full shadow-lg"></div>
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
