"use client";

import React, { useState } from 'react';
import { 
  Heart, Scale, Target, BookOpen, Award, CheckCircle, Users, Shield, 
  TrendingUp, Building, ArrowRight, Globe, Zap, UserCheck, Laptop, 
  HeartHandshake, Briefcase, GraduationCap, Phone, Mail, AlertTriangle, 
  FileText, UserPlus, Calendar, ClipboardCheck, BarChart3, Search, HelpCircle,
  Plus, Minus
} from 'lucide-react';

// Data arrays moved outside component for better performance
const services = [
  {
    number: "1",
    title: "Policy Drafting & Customization",
    description: "We create legally sound, company-specific POSH policies aligned with POSH Act 2013, Supreme Court & High Court precedents, and ILO & UN women workplace guidelines.",
    icon: FileText
  },
  {
    number: "2", 
    title: "Internal Committee (IC) Formation",
    description: "Assistance in IC constitution as per law, appointment of External Member (mandatory), and role & responsibility training for IC members.",
    icon: UserPlus
  },
  {
    number: "3",
    title: "Employee Training & Sensitization", 
    description: "Workshops on rights & responsibilities under POSH Act, case study-based learning for employees & managers, and digital learning modules for large organizations.",
    icon: GraduationCap
  },
  {
    number: "4",
    title: "Employer & Leadership Training",
    description: "Compliance duties of employer/HR heads, role of management in preventing retaliation & victimization, and governance reporting for Board-level oversight.",
    icon: Users
  },
  {
    number: "5",
    title: "Investigation & Advisory Support",
    description: "Handholding IC during inquiries, drafting inquiry reports & legal recommendations, and advisory on confidentiality & disciplinary actions.",
    icon: Search
  },
  {
    number: "6",
    title: "Annual Filings & Compliance Reporting", 
    description: "Preparation of Annual Report under Section 21 of POSH Act, filing with District Officer / Local Committee, and record maintenance for audits & inspections.",
    icon: Calendar
  },
  {
    number: "7",
    title: "Compliance Audit & Certification",
    description: "End-to-end POSH compliance audit and certification for ESG reporting, CSR, and investor due diligence.",
    icon: ClipboardCheck
  }
];

const benefits = [
  { text: "Zero legal risk with 100% POSH compliance", icon: Shield },
  { text: "Internationally benchmarked training modules", icon: Globe },
  { text: "Stronger ESG & CSR reporting framework", icon: BarChart3 },
  { text: "Reputation & employee brand protection", icon: Award },
  { text: "Ready compliance for MNC standards & global investors", icon: TrendingUp }
];

const penalties = [
  { text: "Penalty up to ₹50,000 for first-time violations", icon: AlertTriangle },
  { text: "License cancellation for repeated non-compliance", icon: AlertTriangle },
  { text: "Public disclosure & reputational loss in case of non-filing", icon: AlertTriangle }
];

const whyMatters = [
  { text: "Statutory Requirement under POSH Act, 2013 (mandatory for all companies with 10+ employees)", icon: Scale },
  { text: "Reputation Risk Mitigation – avoid litigation, penalties, and reputational damage", icon: Shield },
  { text: "Investor & ESG Alignment – global investors now assess DEI & POSH compliance before funding", icon: TrendingUp },
  { text: "Employee Trust – builds safe workplace culture, improves retention & employer brand", icon: Users }
];

const faqs = [
  {
    question: "Is POSH compliance mandatory for all companies?",
    answer: "Yes. Under Section 4 of POSH Act, 2013, every workplace with 10 or more employees must constitute an Internal Committee (IC) and implement compliance measures."
  },
  {
    question: "What are the legal penalties for non-compliance?",
    answer: "Companies may face fines up to ₹50,000, cancellation of licenses, and reputational damage. Repeated violations invite higher penalties and disqualification of responsible officers."
  },
  {
    question: "What are the duties of the employer under POSH Act?",
    answer: "Employers must: Provide a safe workplace environment, Draft & communicate POSH policies, Constitute an IC with external member, Conduct awareness training, File annual compliance reports."
  },
  {
    question: "What constitutes 'sexual harassment' under POSH Act?",
    answer: "It includes: Unwelcome physical contact and advances, Demands for sexual favors, Sexually colored remarks, Showing pornography, Any unwelcome verbal, non-verbal, or physical conduct of sexual nature."
  },
  {
    question: "How should the Internal Committee be structured?",
    answer: "As per Rule 4 of POSH Rules, 2013: Presiding Officer: Senior woman employee, At least 2 employee members with social credibility, 1 external member (NGO/Legal expert), Total strength ≥ 4, with 50% women."
  },
  {
    question: "What is the timeline for inquiry completion?",
    answer: "An IC must complete inquiry within 90 days of complaint. The report must be submitted to the employer/District Officer within 10 days thereafter."
  },
  {
    question: "How is confidentiality maintained during inquiries?",
    answer: "Section 16 of POSH Act mandates strict confidentiality of complaints, witness statements, and inquiry proceedings. Breach attracts fines."
  },
  {
    question: "What records must be maintained for POSH compliance?",
    answer: "Complaint register, IC meeting minutes, Inquiry proceedings & recommendations, Annual reports submitted to District Officer."
  },
  {
    question: "Is online POSH training sufficient for compliance?",
    answer: "Legally, awareness programs must be conducted regularly. Online training is acceptable but must be supplemented with interactive sessions and documented evidence."
  },
  {
    question: "What is the role of External Member in IC?",
    answer: "They provide independent oversight, ensure fairness, and bring expertise in women's rights, law, or NGO/social work. Their presence ensures inquiries are unbiased."
  },
  {
    question: "Can POSH compliance be integrated with ESG reporting?",
    answer: "Yes. Investors & MNC partners now require proof of POSH compliance as part of ESG (Social Governance) audits. URE POSH provides compliance certification for global due diligence."
  },
  {
    question: "How does URE POSH ensure international standard compliance?",
    answer: "We align policies with: POSH Act, 2013 (India), ILO Workplace Harassment Guidelines, UN Women's Empowerment Principles (WEPs), Corporate ESG & CSR frameworks."
  }
];

export default function POSHComplianceInitiationPage() {
  const [activeServiceTab, setActiveServiceTab] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white">
      {/* SEO Meta Title and Description would go in Head component */}
      
      {/* Hero Section - Two Column Design */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-pink-50/30 to-rose-50/20 overflow-hidden min-h-[600px]">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl translate-y-1/3"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 h-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px]">
            
            {/* Left Content Column */}
            <div className="space-y-8 lg:pr-8">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-2.5 rounded-full border border-pink-200/60 shadow-sm">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                <span className="text-pink-700 font-semibold text-sm">POSH Compliance Initiation</span>
              </div>
              
              {/* Main heading */}
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="block text-gray-900">Comprehensive</span>
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    POSH Compliance
                  </span>
                  <span className="block text-gray-700 text-3xl lg:text-4xl mt-2">Solutions</span>
                </h1>
                
                <div className="space-y-4">
                  <p className="text-xl text-gray-700 font-medium leading-relaxed">
                    Creating a Culture of Respect and Equality in Every Organization
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Expert guidance for complete POSH Act compliance, from IC constitution to annual reporting. Protect your workplace and reputation with India's most trusted compliance partner.
                  </p>
                </div>
                
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full"></div>
              </div>
            </div>
            
            {/* Right Image Column */}
            <div className="relative lg:pl-8">
              <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-3xl p-8 shadow-2xl border border-pink-100">
                {/* Placeholder for Image */}
                <div className="aspect-[4/3] bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-pink-600 space-y-4">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <Shield className="w-10 h-10 text-pink-500" />
                    </div>
                    <div>
                      <div className="text-lg font-bold">POSH Compliance</div>
                      <div className="text-sm opacity-70">Professional Workplace Image</div>
                    </div>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-pink-500" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </div>
              
              {/* Background accent */}
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-3xl transform rotate-3 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Our POSH Compliance Services - Enhanced Design */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Our POSH Compliance Services</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          </div>
          
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-10">
            
            {/* Description Column */}
            <div className="lg:col-span-2">
              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Our Expertise</h3>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      At <strong className="text-pink-600">URE POSH</strong>, we specialize in Prevention of Sexual Harassment (POSH) compliance consulting, helping companies design, implement, and monitor safe workplace frameworks.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      We understand that today's corporates are evaluated not only on profitability but also on employee well-being, ESG compliance, and legal accountability.
                    </p>
                  </div>
                </div>

                {/* Key Points */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Employee Well-being Focus</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">ESG Compliance</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Scale className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Legal Accountability</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Award className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">Expert Consulting</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Services List Column */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <ClipboardCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold">Our Services</h3>
                  </div>
                </div>

                <div className="p-4">
                  <div className="space-y-2">
                    {[
                      { text: "End-to-end POSH compliance initiation", icon: CheckCircle },
                      { text: "Custom workplace policy drafting", icon: FileText },
                      { text: "Internal Committee (IC) constitution & training", icon: Users },
                      { text: "Awareness & sensitization programs", icon: GraduationCap },
                      { text: "Annual filings & compliance audit reports", icon: BarChart3 }
                    ].map((service, index) => {
                      const Icon = service.icon;
                      return (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-md hover:bg-pink-50 transition-colors group">
                          <div className="w-6 h-6 bg-pink-100 rounded-md flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                            <Icon className="w-3 h-3 text-pink-600" />
                          </div>
                          <span className="text-xs font-medium text-gray-700 leading-relaxed">
                            {service.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 text-sm">
                      <span>Get Started</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why POSH Compliance Matters - Compact Design */}
      <section className="py-10 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Why POSH Compliance Matters</h2>
            <div className="w-16 h-0.5 bg-pink-500 mx-auto mb-4"></div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            
            {/* Key Benefits Column */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Core Benefits</h3>
                </div>

                <div className="grid gap-4">
                  {whyMatters.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-md flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm mb-1">
                            {item.text.split(' – ')[0]}
                          </h4>
                          {item.text.includes(' – ') && (
                            <p className="text-gray-600 text-xs leading-relaxed">
                              {item.text.split(' – ')[1]}
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            {/* Legal Penalties Column */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl border border-red-200 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-md flex items-center justify-center">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold">Legal Penalties</h3>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {penalties.map((penalty, index) => (
                    <div key={index} className="flex items-start gap-2 p-2 bg-white/60 rounded-md border border-red-100">
                      <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-800 text-xs font-medium leading-relaxed">
                        {penalty.text}
                      </p>
                    </div>
                  ))}
                  
                  {/* CTA Section */}
                  <div className="mt-4 p-3 bg-white rounded-md border border-red-200">
                    <h4 className="font-medium text-red-800 text-sm mb-1">Avoid These Risks</h4>
                    <button className="w-full bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md font-medium transition-colors text-xs">
                      Get Protected Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our POSH Compliance Services - Content Only */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our POSH Compliance Services</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto mb-6"></div>
          </div>

          <div className="relative">
            {/* Full Width Content Display */}
            <div className="relative h-[350px] bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl overflow-hidden border border-pink-100">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-6 right-6 w-24 h-24 bg-pink-300 rounded-full blur-2xl"></div>
                <div className="absolute bottom-6 left-6 w-20 h-20 bg-rose-300 rounded-full blur-xl"></div>
              </div>

              {/* Service Content */}
              {services.map((service, index) => {
                const Icon = service.icon;
                if (activeServiceTab !== index) return null;

                return (
                  <div key={index} className="relative h-full p-6 lg:p-8 flex flex-col justify-center">
                    {/* Animated Icon */}
                    <div className="absolute top-6 right-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Service Number */}
                    <div className="text-6xl font-bold text-pink-500/20 mb-3">
                      0{service.number}
                    </div>

                    {/* Service Title */}
                    <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                      {service.title}
                    </h3>

                    {/* Service Description */}
                    <p className="text-base text-gray-600 leading-relaxed mb-6 max-w-2xl">
                      {service.description}
                    </p>

                    {/* Action Button */}
                    <div className="flex items-center gap-4">
                      <button className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Navigation Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                <button
                  onClick={() => setActiveServiceTab(activeServiceTab > 0 ? activeServiceTab - 1 : services.length - 1)}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-white hover:scale-105 transition-all shadow-md"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>

                {/* Dot Indicators */}
                <div className="flex gap-2">
                  {services.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveServiceTab(idx)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        idx === activeServiceTab
                          ? 'bg-pink-500 scale-125'
                          : 'bg-pink-300 hover:bg-pink-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveServiceTab(activeServiceTab < services.length - 1 ? activeServiceTab + 1 : 0)}
                  className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-600 hover:bg-white hover:scale-105 transition-all shadow-md"
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits of Partnering */}
      <section className="py-12 bg-gradient-to-b from-pink-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Benefits of Partnering with URE POSH</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center shadow-sm border border-pink-100 hover:shadow-md transition-all">
                  <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-pink-600" />
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{benefit.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Compact Interactive FAQs */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm">Quick answers to common POSH compliance queries</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div 
                key={`faq-${index}`}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <button 
                  className="w-full text-left p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Clicked FAQ index:', index, 'Current active:', activeFaq);
                    setActiveFaq(activeFaq === index ? null : index);
                  }}
                >
                  <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-gray-900 leading-snug pr-2">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {activeFaq === index ? (
                      <Minus className="w-4 h-4 text-pink-500" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </button>
                
                {activeFaq === index && (
                  <div className="px-4 pb-4">
                    <div className="ml-9 bg-pink-50 rounded-lg p-3 border-l-3 border-pink-500">
                      <p className="text-xs text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compact CTA Banner */}
      <section className="py-8 bg-gradient-to-r from-pink-500 to-rose-500 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-4 left-8 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-6 right-12 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 lg:px-8 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              
              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-medium text-white mb-3">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  Ready to Get Started?
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                  ✨ Ensure 100% POSH Compliance
                </h2>
                <p className="text-pink-100 text-sm">
                  Partner with URE POSH, India's most trusted compliance firm
                </p>
              </div>

              {/* Right Contact Cards */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="bg-white rounded-xl p-3 min-w-[160px]">
                  <div className="flex items-center gap-2 text-pink-600">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">Call Now</div>
                      <div className="text-gray-600">+91-99999 44807</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 min-w-[160px]">
                  <div className="flex items-center gap-2 text-pink-600">
                    <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">Email Us</div>
                      <div className="text-gray-600">ureposh@gmail.com</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/20 border border-white/30 rounded-xl p-3 min-w-[140px]">
                  <div className="flex items-center gap-2 text-white">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div className="text-xs">
                      <div className="font-semibold">Visit</div>
                      <div className="opacity-80">www.ureposh.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Notice */}
            <div className="mt-4 pt-4 border-t border-white/20 text-center">
              <p className="text-white/90 text-xs">
                📞 Free consultation & demo available • Industry experts • 100% compliance guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}