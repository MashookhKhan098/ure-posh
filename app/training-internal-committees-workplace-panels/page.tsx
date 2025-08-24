"use client";
import React, { useState } from 'react';
import { ChevronDown, GraduationCap, Users, BookOpen, Target, CheckCircle, Mail, ArrowRight, Award, Clock, Brain, Lightbulb, Shield, Zap } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-green-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-green-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-green-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-green-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-green-700' : 'hover:bg-green-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-green-200 mb-2"></div>
        <div className="bg-green-50 rounded-lg p-3 border border-green-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function TrainingInternalCommitteesWorkplacePanelsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Specialized Training for Internal Committees and Workplace Panels",
    subtitle: "Expert-Led Professional Development Programs",
    description: "Comprehensive training programs designed specifically for Internal Committee members and workplace panel participants, ensuring effective harassment prevention, investigation skills, and legal compliance expertise.",
    faqs: [
      {
        question: "What specific training is required for Internal Committee members under POSH Act?",
        answer: "Internal Committee members require training on legal provisions of POSH Act 2013, investigation procedures, evidence collection, maintaining confidentiality, conducting fair hearings, decision-making processes, trauma-informed approaches, and understanding workplace dynamics. Training should cover both legal requirements and practical implementation skills."
      },
      {
        question: "How often should Internal Committee members receive refresher training?",
        answer: "IC members should receive comprehensive initial training upon appointment, followed by annual refresher training to stay updated on legal changes, new best practices, and procedural improvements. Additional training should be provided whenever there are significant legal updates or after complex case resolutions."
      },
      {
        question: "What are the key competencies that workplace panels need to develop?",
        answer: "Workplace panels need competencies in: understanding legal frameworks, conducting fair and impartial investigations, maintaining confidentiality, trauma-sensitive communication, evidence assessment, documentation practices, conflict resolution, cultural sensitivity, and creating safe environments for all parties involved."
      },
      {
        question: "How can organizations ensure their training programs are effective and comprehensive?",
        answer: "Effective training programs should include interactive modules, case study discussions, role-playing exercises, regular assessments, ongoing support, peer learning opportunities, expert guidance, and continuous feedback mechanisms. Programs should be regularly updated based on legal changes and emerging best practices."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 2px solid #dcfce7;
          box-shadow: 0 8px 32px rgba(34, 197, 94, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          border: 1px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(34, 197, 94, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 2px solid #86efac;
          box-shadow: 0 20px 40px rgba(34, 197, 94, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(34, 197, 94, 0.25);
        }

        .training-pulse {
          animation: trainingPulse 2.5s infinite;
        }

        @keyframes trainingPulse {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
            transform: scale(1);
          }
          50% { 
            box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
            transform: scale(1.02);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-green-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-100/40 to-emerald-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-green-300 shadow-lg">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"></div>
              <span className="text-green-800 font-bold text-sm">Professional Training Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-green-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-green-700 to-emerald-700 bg-clip-text text-transparent">
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

      {/* Training Programs */}
      <section className="py-16 bg-gradient-to-b from-white via-green-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Core Training Components */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Internal Committee Training */}
            <div className="focus-card p-8 rounded-2xl shadow-xl training-pulse">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Internal Committee Training Program
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Comprehensive training program designed specifically for Internal Committee members to ensure 
                  effective harassment prevention, investigation procedures, and legal compliance expertise.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Legal Framework Mastery",
                    desc: "In-depth understanding of POSH Act 2013, Supreme Court guidelines, and latest amendments"
                  },
                  {
                    title: "Investigation Techniques",
                    desc: "Professional methods for conducting fair, thorough, and legally sound investigations"
                  },
                  {
                    title: "Trauma-Informed Approaches",
                    desc: "Sensitive handling of complainants and witnesses with psychological awareness"
                  },
                  {
                    title: "Evidence Collection & Documentation",
                    desc: "Proper methods for gathering, preserving, and documenting evidence and testimonies"
                  },
                  {
                    title: "Decision Making & Reporting",
                    desc: "Framework for fair judgment, appropriate sanctions, and comprehensive reporting"
                  }
                ].map((module, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{module.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{module.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workplace Panels Training */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Workplace Panels Development
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Specialized training for workplace panel members focusing on creating safe environments, 
                  effective communication, and collaborative problem-solving approaches.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Brain className="w-5 h-5 text-blue-600" />,
                    title: "Psychological Safety Training",
                    desc: "Creating environments where employees feel safe to report and participate"
                  },
                  {
                    icon: <Target className="w-5 h-5 text-purple-600" />,
                    title: "Conflict Resolution Skills",
                    desc: "Advanced techniques for mediating disputes and facilitating dialogue"
                  },
                  {
                    icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
                    title: "Cultural Sensitivity Awareness",
                    desc: "Understanding diverse perspectives and inclusive communication approaches"
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-green-600" />,
                    title: "Confidentiality & Ethics",
                    desc: "Maintaining trust through proper handling of sensitive information"
                  },
                  {
                    icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
                    title: "Documentation Best Practices",
                    desc: "Proper record-keeping and communication with relevant stakeholders"
                  }
                ].map((skill, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {skill.icon}
                      <h4 className="font-bold text-gray-900">{skill.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Training Methodology */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Interactive Training Methodology
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our training programs combine theoretical knowledge with practical application through 
                interactive learning experiences designed for maximum retention and real-world application.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Case Study Analysis",
                  desc: "Real-world scenarios and complex cases for practical learning",
                  highlight: "Practical Learning",
                  color: "green"
                },
                {
                  title: "Role-Playing Exercises",
                  desc: "Interactive simulations of committee proceedings and investigations",
                  highlight: "Hands-On Practice",
                  color: "blue"
                },
                {
                  title: "Expert-Led Sessions",
                  desc: "Direct instruction from legal experts and experienced practitioners",
                  highlight: "Expert Guidance",
                  color: "purple"
                },
                {
                  title: "Peer Learning Groups",
                  desc: "Collaborative discussion and knowledge sharing among participants",
                  highlight: "Collaborative",
                  color: "orange"
                }
              ].map((method, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300 text-center">
                  <div className={`p-3 bg-gradient-to-br from-${method.color}-500 to-${method.color}-600 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center`}>
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{method.title}</h3>
                  <div className={`inline-block px-3 py-1 bg-${method.color}-100 text-${method.color}-800 text-xs font-bold rounded-full mb-3`}>
                    {method.highlight}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{method.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Training Outcomes */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Training Outcomes & Certification
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Our comprehensive training programs ensure participants develop the knowledge, skills, and confidence 
                needed to effectively fulfill their roles in creating harassment-free workplaces.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  icon: <Award className="w-8 h-8 text-green-600" />,
                  title: "Professional Certification",
                  desc: "Recognized certification upon successful completion of training modules and assessments"
                },
                {
                  icon: <Clock className="w-8 h-8 text-blue-600" />,
                  title: "Ongoing Support",
                  desc: "Continuous access to resources, updates, and expert consultation for complex cases"
                },
                {
                  icon: <Target className="w-8 h-8 text-purple-600" />,
                  title: "Performance Evaluation",
                  desc: "Regular assessment of competency development and practical application of training"
                }
              ].map((outcome, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg text-center">
                  <div className="flex justify-center mb-4">
                    {outcome.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-3">{outcome.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{outcome.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Enhanced Investigation Skills",
                  desc: "Improved ability to conduct thorough, fair, and legally compliant investigations"
                },
                {
                  icon: <Shield className="w-6 h-6 text-blue-600" />,
                  title: "Legal Compliance Mastery",
                  desc: "Complete understanding of legal requirements and procedural obligations"
                },
                {
                  icon: <Users className="w-6 h-6 text-purple-600" />,
                  title: "Effective Communication",
                  desc: "Improved skills in trauma-sensitive communication and stakeholder management"
                },
                {
                  icon: <Target className="w-6 h-6 text-orange-600" />,
                  title: "Decision-Making Confidence",
                  desc: "Enhanced ability to make fair, evidence-based decisions in complex situations"
                }
              ].map((competency, index) => (
                <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {competency.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{competency.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{competency.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-green-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to <span className="text-green-600">Train Your Teams</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Empower your Internal Committee and workplace panels with professional training for effective harassment prevention
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Professional Training</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full shadow-lg"></div>
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
