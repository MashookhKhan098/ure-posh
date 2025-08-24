"use client";

import React, { useState } from 'react';
import { Heart, Scale, Target, BookOpen, Award, CheckCircle, Users, Shield, TrendingUp, Building, ArrowRight, Globe, Zap, UserCheck, Laptop, HeartHandshake, Briefcase, GraduationCap, Phone, Mail } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('mission');

  const pillars = [
    {
      number: "1",
      title: "Workplace Education & Awareness",
      description: "Interactive gender sensitization workshops, e-learning modules, and policy orientation for all employees and leadership.",
      icon: GraduationCap
    },
    {
      number: "2", 
      title: "Digital Compliance & Learning",
      description: "Technology-enabled compliance processes, digital policy handbooks, and access to online POSH training resources.",
      icon: Laptop
    },
    {
      number: "3",
      title: "Health, Well-being & Support", 
      description: "Psychological counseling, mental wellness sessions, and safe reporting channels to support holistic well-being.",
      icon: HeartHandshake
    },
    {
      number: "4",
      title: "Remedial Support & Interventions",
      description: "Targeted remediation, investigation, and support for individuals impacted by harassment, including conflict resolution and restorative practices.",
      icon: Shield
    },
    {
      number: "5",
      title: "Legal & Regulatory Guidance",
      description: "Comprehensive legal advisory, Internal Committee constitution, and support in regulatory filings, audits, and impact assessment.",
      icon: Scale
    },
    {
      number: "6",
      title: "Career Growth & Empowerment", 
      description: "Training for professional development, leadership programs, and access to resources for upskilling and career advancement.",
      icon: TrendingUp
    }
  ];

  const whyChooseFeatures = [
    {
      title: "End-to-End Expertise",
      description: "Legal, practical, and psychological support under one roof",
      icon: UserCheck
    },
    {
      title: "Global Best Practices",
      description: "Alignment with international standards and Indian law", 
      icon: Globe
    },
    {
      title: "Trusted by Industry Leaders",
      description: "Serving Fortune 500s, SMEs, educational institutions, and NGOs",
      icon: Building
    },
    {
      title: "Results-Driven Approach", 
      description: "Focus on real impact, not just paperwork",
      icon: Zap
    }
  ];

  const values = [
    { name: "Integrity", description: "Always doing what's right", icon: Scale },
    { name: "Respect", description: "Treating everyone with dignity", icon: Heart },
    { name: "Inclusivity", description: "Embracing diversity and equality", icon: Users },
    { name: "Excellence", description: "Striving for the best", icon: Award },
    { name: "Empowerment", description: "Giving businesses the tools to succeed", icon: TrendingUp }
  ];

  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section - Redesigned with modern light white-pink theme */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-100/20 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[75vh]">
            
            {/* Left side - Content */}
            <div className="space-y-8 lg:space-y-10">
              {/* Badge */}
              <div className="inline-flex items-center gap-3 bg-pink-100/80 backdrop-blur-sm px-6 py-3 rounded-full border border-pink-200/60">
                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                <span className="text-pink-700 font-medium text-sm">Empowering Workplace Rights</span>
              </div>
              
              {/* Main heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-[0.9]">
                  Welcome to <br/>
                  <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    URE POSH
                  </span>
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"></div>
              </div>
              
              {/* Description */}
              <div className="space-y-6">
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg">
                  Your trusted partner in fostering <strong className="text-gray-800">safe, inclusive, and harassment-free workplaces</strong>. We specialize in Prevention of Sexual Harassment (POSH) compliance, offering tailored solutions for businesses of all sizes.
                </p>
                
                {/* Key highlights */}
                <div className="grid grid-cols-2 gap-4 max-w-md">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span>Expert Compliance</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span>Safe Workplaces</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Users className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span>Inclusive Culture</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Award className="w-4 h-4 text-pink-500 flex-shrink-0" />
                    <span>Proven Results</span>
                  </div>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-xl font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group border-2 border-pink-200 text-pink-600 px-8 py-4 rounded-xl font-semibold hover:bg-pink-50 hover:border-pink-300 transition-all duration-300 flex items-center justify-center gap-3">
                  <span>Learn More</span>
                  <div className="w-2 h-2 bg-pink-400 rounded-full group-hover:scale-150 transition-transform"></div>
                </button>
              </div>
            </div>

            {/* Right side - Enhanced Image Design */}
            <div className="relative">
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-pink-200 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-rose-200 rounded-full opacity-60 animate-pulse"></div>
              <div className="absolute top-1/2 -left-8 w-4 h-4 bg-purple-200 rounded-full opacity-60 animate-ping"></div>
              
              {/* Main image container */}
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-pink-100/40 via-rose-100/30 to-purple-100/40 blur-2xl rounded-[2rem]"></div>
                <div className="relative rounded-[1.75rem] p-1.5 bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100 shadow-2xl border border-pink-200/60 transition-all duration-700 hover:scale-[1.02] hover:shadow-3xl">
                  <div className="rounded-[1.5rem] overflow-hidden bg-white/90 backdrop-blur-sm">
                    <div className="relative">
                      <Image
                        src="/images/Core%20Values_%20A%20Circular%20Design%20-%20visual%20selection.png"
                        alt="Core Values - A Circular Design"
                        width={1400}
                        height={1050}
                        className="w-full h-[320px] sm:h-[380px] lg:h-[440px] object-contain select-none"
                        priority
                      />
                      
                      {/* Enhanced decorative elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full shadow-lg"></div>
                      <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-rose-400 to-purple-400 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full shadow-lg"></div>
                      <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full shadow-lg"></div>
                      
                      {/* Subtle overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent pointer-events-none"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Floating Mug Section */}
      <section className="py-8 bg-gradient-to-br from-white via-pink-50/20 to-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Experience Our Interactive Platform</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our innovative approach to workplace safety through our interactive floating mug experience
            </p>
          </div>
          
          <div className="flex justify-center">
            <Card className="relative shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 relative z-10">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center"
                >
                  {/* Interactive Mug in Foreground */}
                  <div className="mb-6">
                    <iframe 
                      src="https://floating-mug.vercel.app/"
                      className="w-80 h-80 rounded-2xl shadow-lg mx-auto cursor-pointer hover:shadow-2xl transition-all duration-300"
                      style={{ minHeight: '320px', minWidth: '320px' }}
                      title="Interactive Floating Mug"
                      frameBorder="0"
                      allowFullScreen
                      onClick={() => window.open('https://floating-mug.vercel.app/', '_blank')}
                    />
                  </div>
                  
                  {/* Subtle Description */}
                  <p className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
                    Click the mug to explore
                  </p>
                </motion.div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission/Vision/Values - Better laptop layout */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Foundation</h2>
            <div className="w-20 h-1 bg-pink-500 mx-auto"></div>
          </div>

          <div className="bg-pink-50 rounded-2xl overflow-hidden shadow-lg">
            {/* Tab Headers */}
            <div className="flex">
              <button 
                onClick={() => setActiveTab('mission')}
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all ${
                  activeTab === 'mission' 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-700 hover:bg-pink-100'
                }`}
              >
                <Target className="w-6 h-6 mx-auto mb-2" />
                Mission
              </button>
              <button 
                onClick={() => setActiveTab('vision')}
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all ${
                  activeTab === 'vision' 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-700 hover:bg-pink-100'
                }`}
              >
                <Heart className="w-6 h-6 mx-auto mb-2" />
                Vision
              </button>
              <button 
                onClick={() => setActiveTab('values')}
                className={`flex-1 py-4 px-6 text-lg font-semibold transition-all ${
                  activeTab === 'values' 
                    ? 'bg-pink-500 text-white' 
                    : 'text-gray-700 hover:bg-pink-100'
                }`}
              >
                <Award className="w-6 h-6 mx-auto mb-2" />
                Values
              </button>
            </div>

            {/* Tab Content - Optimized for laptop reading */}
            <div className="bg-white p-8 md:p-10">
              {activeTab === 'mission' && (
                <div className="max-w-5xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-pink-50 rounded-xl p-6 md:p-6 border-l-4 border-pink-500">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        At <strong>URE POSH</strong>, our mission is to empower organizations with expert POSH compliance solutions that promote mutual respect and safety in the workplace. We provide training, policy development, and strategic guidance that not only meet legal requirements but also encourage an environment where dignity, inclusivity, and equality are at the forefront.
                      </p>
                    </div>
                    <div className="bg-pink-500 rounded-xl p-6 md:p-6 text-white">
                      <p className="text-base md:text-lg leading-relaxed">
                        We are dedicated to supporting businesses in creating a workplace where everyone feels protected, valued, and free from harassment, discrimination, or bias.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="max-w-5xl mx-auto">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-pink-50 rounded-xl p-6 md:p-6 border-l-4 border-pink-500">
                      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                        Our vision is to lead the way in <strong>POSH compliance</strong>, known for our commitment to advancing workplace equality, safety, and integrity. We aim to offer world-class training, customized solutions, and effective consultation services that help organizations maintain the highest standards of professionalism and respect.
                      </p>
                    </div>
                    <div className="bg-pink-500 rounded-xl p-6 md:p-6 text-white">
                      <p className="text-base md:text-lg leading-relaxed">
                        We envision a future where every workplace is a safe space for all, where sexual harassment no longer exists, and where respect is the foundation of every workplace culture.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'values' && (
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h3>
                  <div className="grid grid-cols-5 gap-4 md:gap-6">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div key={index} className="text-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 hover:bg-pink-200 transition-colors">
                            <Icon className="w-8 h-8 md:w-10 md:h-10 text-pink-600" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2 text-lg">{value.name}</h4>
                          <p className="text-gray-600 text-sm">{value.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Six Foundational Pillars - Light white-pink */}
      <section className="py-8 bg-gradient-to-b from-white to-pink-50/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Approach: Six Foundational Pillars</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-gray-600 max-w-4xl mx-auto">
              URE POSH's work is guided by six foundational pillars—ensuring holistic support for organizations and individuals. These pillars shape our strategies and services, empowering workplaces at every level.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-pink-200 transition-colors">
                        <Icon className="w-7 h-7 text-pink-600" />
                      </div>
                      <div className="text-center">
                        <span className="inline-flex items-center justify-center w-7 h-7 bg-pink-100 rounded-full text-pink-600 font-bold text-xs">
                          {pillar.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3">{pillar.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">{pillar.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose URE POSH - Light white-pink */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Why Choose URE POSH?</h2>
            <div className="w-16 h-1 bg-pink-400 mx-auto"></div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {whyChooseFeatures.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-pink-50 rounded-2xl p-6 border border-pink-100 hover:bg-pink-100 transition-colors group">
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-pink-200 transition-colors">
                      <Icon className="w-7 h-7 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-700 text-sm md:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Summary and CTA - Light white-pink, refined content */}
      <section className="py-10 bg-gradient-to-r from-pink-50 to-rose-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8 text-slate-800">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center text-slate-900">URE POSH – Empowering Workplace Rights</h2>

          <div className="bg-white rounded-xl border border-pink-100 p-5 md:p-6 mb-5 shadow-sm">
            <div className="grid lg:grid-cols-2 gap-5 items-start">
              <div>
                <p className="text-sm md:text-base leading-relaxed mb-2">
                  <strong>URE POSH</strong> helps organizations prevent sexual harassment at the workplace through policy development, reporting systems, and inclusive culture-building.
                </p>
                <p className="text-sm md:text-base leading-relaxed mb-2">
                  We align your processes with POSH legislation, conduct awareness programs, and equip leadership to respond effectively.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  Our goal is simple: make every workplace safe, respectful, and equitable for all.
                </p>
              </div>
              <div className="bg-pink-50 rounded-lg p-5 border border-pink-100">
                <h3 className="text-lg md:text-xl font-bold mb-2 text-slate-900">Ready to Transform Your Workplace?</h3>
                <ul className="text-sm md:text-base text-slate-700 list-disc pl-5 space-y-1">
                  <li>Consultation on policies, committees, and procedures</li>
                  <li>Training for managers, IC members, and staff</li>
                  <li>End-to-end implementation and ongoing support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <button className="bg-pink-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-pink-700 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Schedule Consultation
            </button>
            <button className="bg-white border border-pink-200 text-pink-700 px-5 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Book Training Session
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}