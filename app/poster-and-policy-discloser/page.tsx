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
    {/* Question Button */}
    <button
      onClick={onClick}
      className="w-full p-3 text-left flex justify-between items-center hover:bg-pink-50 transition-all duration-300"
    >
      <div className="flex-1 pr-3">
        <h4 className="font-semibold text-gray-800 text-sm md:text-base group-hover:text-pink-600 transition-colors duration-300 leading-snug">
          {question}
        </h4>
      </div>
      
      {/* Toggle Button */}
      <div className={`w-6 h-6 bg-pink-600 rounded-md flex items-center justify-center transition-all duration-300 flex-shrink-0 shadow-sm ${
        isOpen 
          ? 'rotate-180 bg-pink-700' 
          : 'hover:bg-pink-700'
      }`}>
        <ChevronDown className="w-3 h-3 text-white" />
      </div>
    </button>
    
    {/* Answer Section */}
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

export default function PosterAndPolicyDiscloserPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const pageData = {
    title: "POSH Poster & Policy Disclosure – Workplace Safety Compliance",
    subtitle: "Legally Compliant POSH Posters & Policy Disclosure Services",
    description: "URE POSH provides legally compliant POSH posters and workplace policy disclosure services. We help corporates in India, UK & US comply with POSH Act, Equality Act, and EEOC standards with audit-ready documentation.",
    faqs: [
      {
        question: "What does 'POSH poster disclosure' mean?",
        answer: "It refers to mandatory workplace display of POSH-related information including IC details, complaint process, and employee rights under POSH Act, 2013."
      },
      {
        question: "Is poster display legally mandatory in India?",
        answer: "Yes. Section 19(b) of POSH Act, 2013 requires employers to display details of the IC and complaint redressal system at conspicuous places in the workplace."
      },
      {
        question: "What must be included in a POSH poster in India?",
        answer: "Contact details of IC members, procedure for filing complaints, timelines for redressal (90 days inquiry, 10 days report, 60 days action), and statement of zero tolerance."
      },
      {
        question: "In what languages should POSH posters be displayed?",
        answer: "At least in English and the regional/local language where the workplace is located."
      },
      {
        question: "What are the penalties for not displaying posters in India?",
        answer: "Fine up to ₹50,000 and cancellation of business license on repeat offense."
      },
      {
        question: "What are the UK requirements for harassment policy disclosure?",
        answer: "Employers must ensure policies are accessible to all staff via handbooks, notice boards, or intranet. Employment Tribunals often ask for proof of awareness training and policy display."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Enhanced Styles */}
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
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-pink-50/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-pink-300 shadow-lg">
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              <span className="text-pink-800 font-bold text-sm">Legal Compliance Solutions</span>
            </div>
            
            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent">
                  {pageData.title}
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            {/* Subtitle */}
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="content-highlight rounded-xl p-4 border-2 border-pink-200 shadow-xl">
                <p className="text-lg md:text-xl high-contrast-text leading-relaxed">
                  <strong className="bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent">
                    {pageData.subtitle}
                  </strong>
                </p>
              </div>
              
              {/* Description */}
              <div className="text-focus rounded-xl p-6 shadow-lg">
                <p className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                  {pageData.description}
                </p>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <button className="group focus-card px-6 py-4 rounded-xl font-bold text-base bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <div className="flex items-center justify-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span>Get Compliance Solutions</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
              <button className="group text-focus border-3 border-pink-600 text-pink-700 px-6 py-4 rounded-xl font-bold text-base hover:bg-pink-50 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3">
                <FileText className="w-5 h-5" />
                <span>Download Policy Template</span>
                <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          
          {/* Services Overview */}
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl shadow-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    About URE POSH Poster & Policy Services
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  At URE POSH, we understand that compliance is not complete until it is visible. The POSH Act, 2013 
                  and global workplace laws mandate that organizations display posters and disclose policies to ensure 
                  employees are aware of their rights and reporting mechanisms.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Legally compliant POSH posters (English + regional languages)",
                  "Workplace harassment policies (India, UK & US frameworks)",
                  "Public disclosure protocols (digital & physical)",
                  "Employee awareness through policy accessibility",
                  "Annual compliance audits & certifications"
                ].map((feature, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="focus-card p-8 rounded-2xl shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-3">
                    Why Poster & Policy Disclosure Matters
                  </h2>
                  <div className="w-20 h-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full shadow-sm"></div>
                </div>
              </div>
              
              <div className="text-focus p-6 rounded-xl mb-6">
                <p className="text-lg leading-relaxed text-gray-800 font-medium">
                  Legal compliance and employee empowerment through visible workplace policies are essential 
                  for creating safe, transparent, and legally compliant work environments.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  "Legal Mandate (India): Section 19 of POSH Act, 2013 requires prominent display of posters",
                  "UK Standards: Equality Act 2010 and ACAS guidelines require policy disclosure",
                  "US Standards: EEOC mandates display of anti-harassment and EEO rights posters",
                  "Employee Empowerment: Visible disclosures build trust and encourage reporting",
                  "Audit Readiness: Serves as proof of compliance during inspections and ESG reviews"
                ].map((benefit, index) => (
                  <div key={index} className="content-highlight p-4 rounded-lg flex items-start gap-3">
                    <Star className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="focus-card p-8 rounded-2xl shadow-xl inline-block">
              <h3 className="text-2xl font-bold high-contrast-text mb-4">
                Ready to ensure <span className="text-pink-600">100% compliance</span>?
              </h3>
              <p className="text-gray-700 mb-6">Get your legally compliant POSH posters and policies today</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Mail className="w-5 h-5" />
                  <span>Contact Us Today</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gradient-to-b from-pink-50/30 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold high-contrast-text mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-2 bg-gradient-to-r from-pink-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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
