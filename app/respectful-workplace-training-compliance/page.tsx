"use client";
import React, { useState } from 'react';
import { ChevronDown, GraduationCap, Users, Shield, CheckCircle, Mail, ArrowRight, Clock, Target, BookOpen, Award, Lightbulb, Brain, Star } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-teal-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-teal-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-teal-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-teal-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-teal-700' : 'hover:bg-teal-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-teal-200 mb-2"></div>
        <div className="bg-teal-50 rounded-lg p-3 border border-teal-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function RespectfulWorkplaceTrainingCompliancePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Respectful Workplace Training & Compliance Programs",
    subtitle: "Comprehensive Workplace Respect Training Solutions",
    description: "Interactive training programs designed to foster behavioral change, ensure compliance monitoring, and create respectful workplace environments through comprehensive respect and dignity education.",
    faqs: [
      {
        question: "What topics are covered in respectful workplace training programs?",
        answer: "Our training covers workplace respect fundamentals, recognizing inappropriate behavior, communication skills, conflict resolution, diversity and inclusion, bystander intervention, reporting procedures, legal obligations, and creating inclusive environments for all employees."
      },
      {
        question: "How often should organizations conduct respectful workplace training?",
        answer: "We recommend initial comprehensive training for all employees, annual refresher sessions, specialized training for new hires within 30 days, additional sessions after policy updates, and targeted training following any workplace incidents or complaints."
      },
      {
        question: "What makes workplace respect training effective in changing behavior?",
        answer: "Effective training combines interactive scenarios, real-world case studies, peer discussions, practical exercises, measurable learning outcomes, follow-up assessments, ongoing reinforcement activities, and integration with organizational culture and values."
      },
      {
        question: "How do you measure the effectiveness of respectful workplace training?",
        answer: "We measure effectiveness through pre and post-training assessments, behavioral observation metrics, incident reporting trends, employee feedback surveys, culture assessment scores, compliance tracking, and long-term workplace climate improvements."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%);
          border: 2px solid #a7f3d0;
          box-shadow: 0 8px 32px rgba(20, 184, 166, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 50%, #ffffff 100%);
          border: 1px solid #d1fae5;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(20, 184, 166, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdfa 100%);
          border: 2px solid #5eead4;
          box-shadow: 0 20px 40px rgba(20, 184, 166, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(20, 184, 166, 0.25);
        }

        .training-glow {
          animation: trainingGlow 3s infinite;
        }

        @keyframes trainingGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(20, 184, 166, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(20, 184, 166, 0.6);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-teal-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-teal-100/40 to-emerald-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-teal-300 shadow-lg">
              <div className="w-3 h-3 bg-teal-600 rounded-full animate-pulse"></div>
              <span className="text-teal-800 font-bold text-sm">Respectful Workplace Training</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-teal-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-teal-700 to-emerald-700 bg-clip-text text-transparent">
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
      <section className="py-16 bg-gradient-to-b from-white via-teal-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Core Training Components */}
            <div className="focus-card p-8 rounded-2xl shadow-xl training-glow">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl shadow-lg">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Interactive Training Modules
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Comprehensive training modules designed to create lasting behavioral change through interactive 
                  learning experiences, practical scenarios, and ongoing reinforcement activities.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Workplace Respect Fundamentals",
                    desc: "Foundation principles of respectful communication and professional behavior"
                  },
                  {
                    title: "Recognizing Inappropriate Behavior",
                    desc: "Identification of harassment, discrimination, and inappropriate workplace conduct"
                  },
                  {
                    title: "Effective Communication Skills",
                    desc: "Professional communication techniques and conflict resolution strategies"
                  },
                  {
                    title: "Bystander Intervention Training",
                    desc: "Empowering employees to address inappropriate behavior when witnessed"
                  },
                  {
                    title: "Inclusive Environment Creation",
                    desc: "Building and maintaining inclusive workplace cultures for all employees"
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

            {/* Training Methodology */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Behavioral Change Methodology
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Evidence-based training approach combining adult learning principles with behavioral psychology 
                  to create meaningful and lasting workplace culture transformation.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
                    title: "Interactive Learning Experiences",
                    desc: "Engaging scenarios, role-playing, and practical exercises for active participation"
                  },
                  {
                    icon: <Users className="w-5 h-5 text-blue-600" />,
                    title: "Peer Learning & Discussion",
                    desc: "Facilitated group discussions and collaborative learning opportunities"
                  },
                  {
                    icon: <Target className="w-5 h-5 text-purple-600" />,
                    title: "Real-World Case Studies",
                    desc: "Industry-relevant examples and workplace scenarios for practical application"
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-green-600" />,
                    title: "Continuous Reinforcement",
                    desc: "Follow-up activities and ongoing support to reinforce learning outcomes"
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

          {/* Training Options */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Flexible Training Delivery Options
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Choose from multiple delivery formats to meet your organization's specific needs, schedule, and preferences.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "In-Person Workshops",
                  desc: "Face-to-face interactive sessions with maximum engagement",
                  highlight: "High Impact",
                  duration: "1-2 Days"
                },
                {
                  title: "Virtual Training",
                  desc: "Online interactive sessions with real-time participation",
                  highlight: "Cost Effective",
                  duration: "Half-Day Sessions"
                },
                {
                  title: "Blended Learning",
                  desc: "Combination of online modules and in-person discussions",
                  highlight: "Flexible",
                  duration: "2-3 Weeks"
                },
                {
                  title: "Customized Programs",
                  desc: "Tailored content specific to your industry and organizational needs",
                  highlight: "Personalized",
                  duration: "As Required"
                }
              ].map((option, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300 text-center">
                  <div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-full w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                    <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{option.title}</h3>
                  <div className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-bold rounded-full mb-3">
                    {option.highlight}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">{option.desc}</p>
                  <div className="text-xs text-gray-500 font-semibold">Duration: {option.duration}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Outcomes */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-teal-600 rounded-xl shadow-lg">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Measurable Training Outcomes
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Our training programs deliver measurable results in workplace culture transformation, 
                behavioral change, and organizational compliance enhancement.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Star className="w-6 h-6 text-yellow-600" />,
                  title: "Improved Workplace Culture",
                  desc: "Measurable improvement in employee satisfaction and workplace climate scores"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-green-600" />,
                  title: "Enhanced Compliance",
                  desc: "Strengthened adherence to workplace policies and legal requirements"
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "Better Communication",
                  desc: "Improved interpersonal relationships and professional communication skills"
                },
                {
                  icon: <Shield className="w-6 h-6 text-teal-600" />,
                  title: "Reduced Incidents",
                  desc: "Decreased workplace conflicts, complaints, and inappropriate behavior incidents"
                }
              ].map((outcome, index) => (
                <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {outcome.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{outcome.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">{outcome.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-teal-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to Build a <span className="text-teal-600">Respectful Workplace</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Transform your workplace culture with comprehensive respect and dignity training programs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-teal-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Training Program</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-teal-600 to-emerald-600 mx-auto rounded-full shadow-lg"></div>
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
