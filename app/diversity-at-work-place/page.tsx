"use client";
import React, { useState } from 'react';
import { ChevronDown, Users, Globe, Heart, Target, CheckCircle, Mail, ArrowRight, Shield, Star, Award, Sparkles, Palette, HandHeart } from 'lucide-react';

// FAQ Item Props Interface
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem = ({ question, answer, isOpen, onClick }: FAQItemProps) => (
  <div className="group bg-white rounded-lg shadow-md border border-violet-100 overflow-hidden hover:shadow-lg transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-violet-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-violet-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      <div className={`w-6 h-6 bg-violet-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen ? 'rotate-180 bg-violet-700' : 'hover:bg-violet-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    <div className={`transition-all duration-300 ease-in-out ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    } overflow-hidden`}>
      <div className="px-3 pb-3">
        <div className="w-full h-px bg-violet-200 mb-2"></div>
        <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
          <p className="text-gray-700 leading-relaxed text-xs md:text-sm">
            {answer}
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default function DiversityAtWorkPlacePage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "Diversity at Work Place: Building Inclusive Organizations",
    subtitle: "Comprehensive Workplace Diversity & Inclusion Solutions",
    description: "Creating truly inclusive workplace environments through comprehensive diversity programs, cultural competency training, bias awareness, inclusive leadership development, and systematic organizational transformation initiatives.",
    faqs: [
      {
        question: "What constitutes a comprehensive workplace diversity and inclusion program?",
        answer: "A comprehensive D&I program includes bias awareness training, inclusive leadership development, diverse recruitment practices, cultural competency education, employee resource groups, accessibility initiatives, policy development, measurement systems, and ongoing organizational culture transformation efforts."
      },
      {
        question: "How does workplace diversity contribute to harassment prevention and POSH compliance?",
        answer: "Diversity initiatives create more inclusive environments where all employees feel valued and respected, reducing the likelihood of harassment. D&I programs promote understanding across different groups, establish clear behavioral expectations, and create supportive systems that align with and strengthen POSH compliance efforts."
      },
      {
        question: "What measurable benefits can organizations expect from diversity and inclusion investments?",
        answer: "Organizations report improved innovation and creativity, better decision-making, enhanced employee engagement, increased productivity, improved company reputation, better talent attraction and retention, expanded market reach, reduced legal risks, and stronger financial performance through diverse perspectives and inclusive practices."
      },
      {
        question: "How are diversity programs customized for different industries and organizational cultures?",
        answer: "Programs are tailored based on industry-specific challenges, organizational size and structure, existing cultural dynamics, geographic considerations, demographic composition, business objectives, regulatory requirements, and stakeholder needs to ensure maximum relevance and effectiveness in each unique organizational context."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
          border: 2px solid #c4b5fd;
          box-shadow: 0 8px 32px rgba(139, 92, 246, 0.12);
          backdrop-filter: blur(10px);
        }

        .content-highlight {
          background: linear-gradient(135deg, #ffffff 0%, #f3e8ff 50%, #ffffff 100%);
          border: 1px solid #c4b5fd;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(139, 92, 246, 0.08);
        }

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .focus-card {
          background: linear-gradient(135deg, #ffffff 0%, #faf5ff 100%);
          border: 2px solid #a78bfa;
          box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
          transition: all 0.3s ease;
        }

        .focus-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(139, 92, 246, 0.25);
        }

        .diversity-glow {
          animation: diversityGlow 3s infinite;
        }

        @keyframes diversityGlow {
          0%, 100% { 
            box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
          }
          50% { 
            box-shadow: 0 0 40px rgba(139, 92, 246, 0.6);
          }
        }

        .rainbow-gradient {
          background: linear-gradient(90deg, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #8b5cf6, #ec4899);
          background-size: 200% 100%;
          animation: rainbow 3s linear infinite;
        }

        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-violet-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-violet-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-violet-300 shadow-lg">
              <div className="w-3 h-3 rainbow-gradient rounded-full"></div>
              <span className="text-violet-800 font-bold text-sm">Diversity & Inclusion Excellence</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-violet-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 rainbow-gradient rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-violet-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-violet-700 to-purple-700 bg-clip-text text-transparent">
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

      {/* Diversity Program Components */}
      <section className="py-16 bg-gradient-to-b from-white via-violet-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            
            {/* Inclusive Culture Development */}
            <div className="focus-card p-8 rounded-2xl shadow-xl diversity-glow">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Inclusive Culture Development
                  </h2>
                  <div className="w-20 h-2 rainbow-gradient rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Building truly inclusive organizational cultures where every individual feels valued, respected, 
                  and empowered to contribute their unique perspectives and talents.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Cultural Assessment & Analysis",
                    desc: "Comprehensive evaluation of current organizational culture, bias identification, and inclusion gaps"
                  },
                  {
                    title: "Bias Awareness Training",
                    desc: "Unconscious bias education, microaggression awareness, and inclusive behavior development"
                  },
                  {
                    title: "Inclusive Leadership",
                    desc: "Leadership development focused on creating psychologically safe and inclusive environments"
                  },
                  {
                    title: "Employee Resource Groups",
                    desc: "Supporting affinity groups, mentorship programs, and employee-led diversity initiatives"
                  },
                  {
                    title: "Communication & Language",
                    desc: "Inclusive communication training and culturally sensitive language development"
                  }
                ].map((element, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{element.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{element.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diversity Strategy & Implementation */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-violet-600 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Strategic Diversity Implementation
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Systematic approach to implementing diversity and inclusion strategies that create lasting 
                  organizational change and measurable outcomes.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    icon: <Globe className="w-5 h-5 text-blue-600" />,
                    title: "Diverse Recruitment & Hiring",
                    desc: "Inclusive recruitment practices, diverse candidate sourcing, and equitable selection processes"
                  },
                  {
                    icon: <Users className="w-5 h-5 text-green-600" />,
                    title: "Retention & Development",
                    desc: "Career development programs, mentorship opportunities, and advancement pathways for all"
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-red-600" />,
                    title: "Policy & Procedure Review",
                    desc: "Updating organizational policies to ensure equity, accessibility, and inclusive practices"
                  },
                  {
                    icon: <Award className="w-5 h-5 text-yellow-600" />,
                    title: "Measurement & Analytics",
                    desc: "D&I metrics, progress tracking, and continuous improvement based on data insights"
                  }
                ].map((strategy, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      {strategy.icon}
                      <h4 className="font-bold text-gray-900">{strategy.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{strategy.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diversity Dimensions & Focus Areas */}
          <div className="focus-card p-8 rounded-2xl shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Comprehensive Diversity Dimensions
              </h2>
              <div className="w-20 h-2 rainbow-gradient mx-auto rounded-full shadow-lg mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
                Our diversity and inclusion programs address multiple dimensions of human diversity to create 
                truly inclusive workplace environments.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Gender Diversity",
                  desc: "Gender equality, women's leadership, work-life balance, and gender-inclusive policies",
                  highlight: "Gender",
                  color: "from-pink-500 to-purple-600"
                },
                {
                  title: "Cultural & Ethnic Diversity", 
                  desc: "Cross-cultural understanding, ethnic inclusion, and multicultural competency development",
                  highlight: "Culture",
                  color: "from-orange-500 to-red-600"
                },
                {
                  title: "Age & Generational",
                  desc: "Multi-generational workforce integration, age discrimination prevention, and knowledge transfer",
                  highlight: "Age",
                  color: "from-blue-500 to-teal-600"
                },
                {
                  title: "Accessibility & Disabilities",
                  desc: "Disability inclusion, accessibility compliance, and assistive technology integration",
                  highlight: "Access",
                  color: "from-green-500 to-emerald-600"
                },
                {
                  title: "Socioeconomic Inclusion",
                  desc: "Economic background diversity, educational opportunity equality, and social mobility support",
                  highlight: "Economic",
                  color: "from-yellow-500 to-orange-600"
                },
                {
                  title: "Neurodiversity",
                  desc: "Neurodiverse talent inclusion, cognitive diversity appreciation, and adaptive work environments",
                  highlight: "Cognitive",
                  color: "from-violet-500 to-purple-600"
                }
              ].map((dimension, index) => (
                <div key={index} className="content-highlight p-6 rounded-lg group hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 bg-gradient-to-br ${dimension.color} rounded-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{dimension.title}</h3>
                      <span className="inline-block px-2 py-1 bg-violet-100 text-violet-800 text-xs font-bold rounded-full mb-2">
                        {dimension.highlight}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{dimension.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Program Impact & Benefits */}
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-gradient-to-br from-green-600 to-violet-600 rounded-xl shadow-lg">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                  Diversity Program Impact & Benefits
                </h2>
                <div className="w-20 h-2 bg-gradient-to-r from-green-500 to-violet-600 rounded-full shadow-sm"></div>
              </div>
            </div>
            
            <div className="text-focus p-6 rounded-xl mb-6">
              <p className="text-lg leading-relaxed text-gray-800 font-medium">
                Organizations with comprehensive diversity and inclusion programs demonstrate superior performance 
                across multiple business metrics and employee satisfaction indicators.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Users className="w-6 h-6 text-blue-600" />,
                  title: "Enhanced Innovation",
                  desc: "Increased creativity, diverse perspectives, better problem-solving, and innovative solutions"
                },
                {
                  icon: <Target className="w-6 h-6 text-purple-600" />,
                  title: "Improved Decision-Making",
                  desc: "Better strategic decisions, reduced groupthink, comprehensive risk assessment capabilities"
                },
                {
                  icon: <Globe className="w-6 h-6 text-green-600" />,
                  title: "Market Expansion",
                  desc: "Better understanding of diverse markets, improved customer relations, global competitiveness"
                },
                {
                  icon: <Heart className="w-6 h-6 text-red-600" />,
                  title: "Employee Engagement",
                  desc: "Higher job satisfaction, increased loyalty, better retention, and stronger workplace culture"
                },
                {
                  icon: <Award className="w-6 h-6 text-yellow-600" />,
                  title: "Talent Attraction",
                  desc: "Access to broader talent pools, enhanced employer brand, competitive recruitment advantage"
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
                  title: "Financial Performance",
                  desc: "Improved profitability, reduced legal risks, better investor relations, sustainable growth"
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
      <section className="py-16 bg-gradient-to-b from-violet-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to Build a <span className="text-violet-600">Truly Inclusive</span> Workplace?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Transform your organization with comprehensive diversity and inclusion programs that create lasting change
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-violet-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-violet-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Start Diversity Program</span>
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
            <div className="w-20 h-2 rainbow-gradient mx-auto rounded-full shadow-lg"></div>
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
