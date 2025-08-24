"use client";
import React, { useState } from 'react';
import { ChevronDown, Heart, Users, Smile, Target, CheckCircle, Mail, ArrowRight, Shield, Brain, Leaf, Activity, Sun, TreePine } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-emerald-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-emerald-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-emerald-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-emerald-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-emerald-700' : 'hover:bg-emerald-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-emerald-200 mb-2"></div>
        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function WellBeingProgrammesPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Well-being Programmes: Comprehensive Employee Wellness Solutions",
    subtitle: "Holistic Employee Wellness & Mental Health Programs",
    description: "Comprehensive well-being initiatives designed to support employee mental health, physical wellness, work-life balance, and overall organizational health through structured wellness programs and support systems.",
    faqs: [
      {
        question: "What components are included in comprehensive employee well-being programmes?",
        answer: "Well-being programmes include mental health support, physical wellness initiatives, work-life balance programs, stress management workshops, mindfulness training, counseling services, health screenings, fitness programs, and emotional support systems tailored to organizational needs."
      },
      {
        question: "How do well-being programmes contribute to POSH compliance and workplace safety?",
        answer: "Well-being programmes create supportive environments that reduce workplace stress, improve mental health awareness, provide safe spaces for employees to seek help, enhance overall workplace culture, and complement POSH initiatives by promoting respectful, healthy workplace relationships."
      },
      {
        question: "What return on investment can organizations expect from employee well-being programmes?",
        answer: "Organizations typically see reduced absenteeism, improved productivity, lower healthcare costs, increased employee retention, enhanced company reputation, better workplace culture, reduced stress-related issues, and improved overall employee satisfaction and engagement."
      },
      {
        question: "How are well-being programmes customized for different organizational sizes and industries?",
        answer: "Programmes are tailored based on workforce size, industry-specific stressors, organizational culture, budget constraints, demographic needs, work environment characteristics, and specific wellness challenges identified through employee surveys and organizational assessments."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 2px solid #a7f3d0;
          box-shadow: 0 8px 32px rgba(16, 185, 129, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 50%, #ffffff 100%);
          border: 1px solid #a7f3d0;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 2px solid #34d399;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(16, 185, 129, 0.25);
        }

        .wellness-glow {
          animation: wellnessGlow 3s infinite;
        }

        @keyframes wellnessGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-emerald-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-100/40 to-teal-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-emerald-300 shadow-lg">
              <div className="w-3 h-3 bg-emerald-600 rounded-full animate-pulse"></div>
              <span className="text-emerald-800 font-bold text-sm">Holistic Wellness Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-emerald-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-transparent">
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

      {/* Wellness Programme Components */}
      <section className="py-16 bg-gradient-to-b from-white via-emerald-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Mental Health & Wellness */}
            <div className="focus-card p-8 rounded-2xl shadow-xl wellness-glow">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Mental Health & Wellness Support
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Comprehensive mental health initiatives focused on supporting employee psychological well-being, 
                  stress management, and creating mentally healthy workplace environments.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Mental Health Awareness",
                    desc: "Education and awareness programs about mental health, destigmatization, and support resources"
                  },
                  {
                    title: "Counseling Services",
                    desc: "Professional counseling support, therapy sessions, and confidential mental health assistance"
                  },
                  {
                    title: "Stress Management",
                    desc: "Stress reduction techniques, coping strategies, and workplace stress prevention programs"
                  },
                  {
                    title: "Mindfulness & Meditation",
                    desc: "Mindfulness training, meditation sessions, and relaxation techniques for mental clarity"
                  },
                  {
                    title: "Crisis Support Systems",
                    desc: "Emergency mental health support, crisis intervention, and immediate assistance protocols"
                  }
                ].map((service, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <Heart className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{service.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{service.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Wellness & Health */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-teal-600 to-emerald-600 rounded-xl shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Physical Wellness & Health Programs
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-teal-500 to-emerald-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Physical health and wellness initiatives designed to promote employee fitness, healthy habits, 
                  and overall physical well-being in the workplace.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Activity className="w-5 h-5 text-orange-600" />,
                    title: "Fitness & Exercise Programs",
                    desc: "Workplace fitness initiatives, exercise classes, and physical activity promotion"
                  },
                  {
                    icon: <Heart className="w-5 h-5 text-red-600" />,
                    title: "Health Screenings",
                    desc: "Regular health check-ups, preventive screenings, and health monitoring services"
                  },
                  {
                    icon: <Leaf className="w-5 h-5 text-green-600" />,
                    title: "Nutrition & Healthy Living",
                    desc: "Nutritional guidance, healthy eating programs, and wellness lifestyle education"
                  },
                  {
                    icon: <Sun className="w-5 h-5 text-yellow-600" />,
                    title: "Work Environment Health",
                    desc: "Ergonomic assessments, workplace safety, and healthy work environment initiatives"
                  }
                ].map((program, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {program.icon}
                      <h4 className="font-bold text-gray-900">{program.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{program.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Work-Life Balance Initiatives */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Work-Life Balance & Support Systems
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Comprehensive programs designed to help employees achieve healthy work-life balance and 
                maintain personal well-being alongside professional responsibilities.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Flexible Work Arrangements",
                  desc: "Remote work options, flexible hours, and adaptive work schedules",
                  highlight: "Flexibility",
                  icon: <TreePine className="w-5 h-5 text-white" />
                },
                {
                  title: "Family Support Programs", 
                  desc: "Childcare assistance, parental leave support, and family-friendly policies",
                  highlight: "Family",
                  icon: <Users className="w-5 h-5 text-white" />
                },
                {
                  title: "Personal Development",
                  desc: "Skill building, career counseling, and personal growth opportunities",
                  highlight: "Growth",
                  icon: <Target className="w-5 h-5 text-white" />
                },
                {
                  title: "Recreational Activities",
                  desc: "Team building events, social activities, and workplace fun initiatives",
                  highlight: "Recreation",
                  icon: <Smile className="w-5 h-5 text-white" />
                },
                {
                  title: "Financial Wellness",
                  desc: "Financial planning support, budgeting assistance, and financial education",
                  highlight: "Finance",
                  icon: <Shield className="w-5 h-5 text-white" />
                },
                {
                  title: "Time Management",
                  desc: "Productivity training, time management skills, and work efficiency programs",
                  highlight: "Productivity",
                  icon: <CheckCircle className="w-5 h-5 text-white" />
                }
              ].map((initiative, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                      {initiative.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{initiative.title}</h3>
                      <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-2">
                        {initiative.highlight}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{initiative.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Program Benefits & Impact */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-purple-600 to-emerald-600 rounded-xl shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Well-being Programme Benefits & Impact
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-emerald-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Organizations implementing comprehensive well-being programmes report significant improvements in 
                employee satisfaction, productivity, retention, and overall workplace culture.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Heart className="w-6 h-6 text-red-600" />,
                  title: "Improved Employee Health",
                  desc: "Better physical and mental health outcomes, reduced stress levels, enhanced well-being"
                },
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "Enhanced Team Culture",
                  desc: "Stronger team bonds, improved collaboration, more supportive work environments"
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-600" />,
                  title: "Increased Productivity",
                  desc: "Higher work output, better focus, improved performance and quality of work"
                },
                {
                  icon: <Shield className="w-6 h-6 text-green-600" />,
                  title: "Reduced Absenteeism",
                  desc: "Lower sick leave rates, improved attendance, better employee engagement"
                },
                {
                  icon: <Smile className="w-6 h-6 text-yellow-600" />,
                  title: "Higher Job Satisfaction",
                  desc: "Increased employee happiness, better work-life balance, improved retention"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
                  title: "Cost Savings",
                  desc: "Reduced healthcare costs, lower turnover expenses, improved ROI on human resources"
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
      <section className="py-16 bg-gradient-to-b from-emerald-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to Implement <span className="text-emerald-600">Comprehensive Well-being</span> Programs?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Create a healthier, happier, and more productive workplace with our holistic well-being solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Wellness Program</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full shadow-lg"></div>
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
