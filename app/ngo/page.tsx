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

export default function NGOPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "POSH Committee and External NGO Members: India, UK, and US Compliance Guide",
    subtitle: "Building Safe and Inclusive Workplaces",
    description: "Partner with experienced NGO professionals to create effective POSH Committees and harassment prevention frameworks that ensure compliance and foster trust.",
    faqs: [
      {
        question: "Who can be an external member of the POSH Committee in India?",
        answer: "An external member of the POSH Committee in India is typically a person who is not an employee of the organization and brings relevant expertise in areas such as legal matters, gender sensitivity, or workplace harassment prevention. This individual can be a lawyer, a gender sensitivity trainer, a psychologist, or a representative from an NGO working on women's rights."
      },
      {
        question: "Why should my company have an external NGO member on the harassment committee?",
        answer: "Having an external NGO member on the harassment committee is important because it brings unbiased, specialized expertise in handling cases of sexual harassment and gender issues. An NGO representative can provide an objective perspective, ensure transparency, and help create a safe and supportive environment for complainants."
      },
      {
        question: "What is the international standard for workplace harassment investigations?",
        answer: "The international standard for workplace harassment investigations emphasizes fairness, confidentiality, thoroughness, and impartiality. Investigations should be conducted promptly and objectively, ensuring that all parties involved are given an equal opportunity to present their case."
      },
      {
        question: "How do I appoint an external expert for my company's committee?",
        answer: "To appoint an external expert for your company's committee, identify the specific expertise needed and research reputable professionals or organizations with relevant experience. Verify their credentials and define their roles and responsibilities clearly."
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
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-pink-300 shadow-lg">
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              <span className="text-pink-800 font-bold text-sm">NGO Partnership Solutions</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-2xl md:text-3xl lg:text-4xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-pink-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
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

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            
            {/* What is a POSH Committee */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    What is a POSH Committee?
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  A POSH Committee, also known as the Internal Committee (IC), is a specialized team that helps 
                  organizations prevent and address workplace sexual harassment. Having an effective POSH Committee 
                  is crucial not only for legal compliance but also for building a truly safe and inclusive environment.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Specialized team for preventing workplace sexual harassment",
                  "Required for organizations with 10+ employees under POSH Act 2013",
                  "Includes mandatory external member from respected NGO",
                  "Ensures fair investigations and unbiased decisions",
                  "Builds trust and credibility in the workplace"
                ].map((feature, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Committee Structure */}
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    POSH Committee Structure in India
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Under India's POSH Act, 2013, every company with 10 or more employees is required to establish 
                  an Internal Committee to address complaints of sexual harassment. A unique feature of this law 
                  is the mandatory inclusion of an external member from a respected NGO.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Neutrality & Objectivity",
                    desc: "External members provide an unbiased voice, ensuring fair investigations and decisions"
                  },
                  {
                    title: "Credibility", 
                    desc: "Their presence reassures employees that the process is trustworthy and professional"
                  },
                  {
                    title: "Expertise",
                    desc: "NGO professionals bring deep experience in gender issues, legal requirements, and trauma-sensitive care"
                  }
                ].map((benefit, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg">
                    <div className="flex items-start gap-3 mb-2">
                      <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <h4 className="font-bold text-gray-900">{benefit.title}</h4>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed ml-8">{benefit.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
                Benefits of Involving External NGO Members
              </h2>
              <div className="w-20 h-2 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full shadow-lg mb-6"></div>
            </div>
            
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Unbiased investigation and resolution",
                  "Up-to-date knowledge of local and global laws",
                  "Enhanced employee trust and confidence",
                  "Public demonstration of ethical leadership",
                  "Specialized expertise in trauma-sensitive handling",
                  "Access to best practices from other organizations",
                  "Credible third-party validation of processes"
                ].map((benefit, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* How UREPosh Can Help */}
          <div className="mt-16">
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    How URE POSH Can Help
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Our network includes leading NGO professionals and compliance specialists ready to serve as 
                  external POSH Committee members for organizations in India and as external advisors for 
                  companies in the UK and US.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Select qualified external IC members",
                  "Stay audit-ready and compliant with the latest laws",
                  "Foster a culture of respect, trust, and safety",
                  "Connect with pre-vetted NGO professionals",
                  "Provide ongoing training and support",
                  "Ensure committee effectiveness and legal compliance"
                ].map((service, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-3">
                    <ArrowRight className="w-5 h-5 text-pink-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="focus-card p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold high-contrast-text mb-4">
              Ready to Build an <span className="text-pink-600">Effective POSH Committee</span>?
            </h3>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Connect with experienced NGO professionals and compliance experts to strengthen your workplace safety framework
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Connect with NGO Partners</span>
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
            <div className="w-20 h-2 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
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
