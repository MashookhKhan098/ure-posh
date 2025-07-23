'use client'
import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Users, Award, Calendar, Target, Mail, Phone, MapPin, Menu, X, Shield, FileText, Search, Download, ChevronDown } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500+', label: 'Organizations Transformed', subtitle: 'From startups to Fortune 500 companies across India', growth: '+150% YoY' },
    { number: '75,000+', label: 'Professionals Trained', subtitle: 'Creating safer workplaces one person at a time', growth: '+200% YoY' },
    { number: '99.2%', label: 'Client Satisfaction', subtitle: 'Consistently exceeding expectations', growth: 'Maintained for 3+ years' },
    { number: '24/7', label: 'Expert Support', subtitle: 'Always available when you need us most', growth: '365 days a year' },
  ];

  const clients = [
    { name: 'TechCorp Solutions', industry: 'Technology', logo: 'TC' },
    { name: 'HealthCare Innovations', industry: 'Healthcare', logo: 'HI' },
    { name: 'RetailMax Group', industry: 'Retail', logo: 'RM' },
    { name: 'Global Finance Ltd', industry: 'Finance', logo: 'GF' },
    { name: 'EduTech Partners', industry: 'Education', logo: 'EP' },
    { name: 'Manufacturing Excellence', industry: 'Manufacturing', logo: 'ME' },
    { name: 'StartupHub India', industry: 'Technology', logo: 'SH' },
    { name: 'GovTech Solutions', industry: 'Government', logo: 'GS' },
  ];

  const team = [
    {
      name: 'Dr. Priya Sharma',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
      bio: 'Leading workplace transformation with 15+ years of experience in organizational psychology and compliance.',
      expertise: ['Organizational Psychology', 'Compliance Strategy', 'Leadership Development'],
      achievement: '500+ Organizations Transformed'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Head of Legal & Compliance',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
      bio: 'Expert in POSH Act implementation with deep understanding of Indian workplace regulations.',
      expertise: ['Legal Compliance', 'Policy Development', 'Risk Management'],
      achievement: '99.2% Compliance Rate'
    },
    {
      name: 'Anjali Mehta',
      role: 'Director of Training',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg',
      bio: 'Specialist in creating engaging, culturally-sensitive training programs for diverse workplaces.',
      expertise: ['Training Design', 'Cultural Sensitivity', 'Adult Learning'],
      achievement: '75,000+ Professionals Trained'
    },
    {
      name: 'Suresh Patel',
      role: 'Head of Technology',
      image: 'https://images.pexels.com/photos/428321/pexels-photo-428321.jpeg',
      bio: 'Driving innovation in compliance technology with AI-powered solutions for workplace safety.',
      expertise: ['Technology Innovation', 'AI Solutions', 'Digital Transformation'],
      achievement: '24/7 Support System'
    },
  ];

  const principles = [
    {
      title: 'Inclusion as Foundation',
      description: 'We approach every partnership understanding that inclusion isn\'t optional—it\'s the cornerstone of thriving organizations.',
      metric: '98% satisfaction rate',
      features: [
        'Comprehensive diversity assessment and gap analysis',
        'Customized inclusion roadmaps for every organization',
        'Continuous monitoring and improvement frameworks',
        'Intersectional approach to identity and belonging'
      ]
    },
    {
      title: 'Safety Without Compromise',
      description: 'Every workplace should be a sanctuary of respect and dignity. We don\'t just implement policies—we cultivate cultures.',
      metric: 'Zero tolerance success',
      features: [
        'Proactive risk identification and mitigation strategies',
        'Trauma-informed investigation and support processes',
        '24/7 confidential reporting mechanisms',
        'Holistic support systems for all stakeholders'
      ]
    },
    {
      title: 'Innovation in Tradition',
      description: 'We revolutionize compliance by making it meaningful, engaging, and transformative.',
      metric: '300% engagement increase',
      features: [
        'Gamified learning experiences with real-world scenarios',
        'Virtual reality training for immersive understanding',
        'AI-powered personalization for maximum impact',
        'Microlearning modules for sustained retention'
      ]
    },
    {
      title: 'Diversity as Power',
      description: 'We honor the full spectrum of human experience and identity. True strength comes from authentic diversity.',
      metric: '40+ identity dimensions',
      features: [
        'Intersectional lens in all program development',
        'Culturally responsive training methodologies',
        'Accessibility-first design principles',
        'Multi-generational and multi-cultural perspectives'
      ]
    },
    {
      title: 'Impact Over Activity',
      description: 'We measure success not by hours trained but by cultural transformation and sustained behavioral change.',
      metric: '85% culture transformation',
      features: [
        'Comprehensive pre and post-implementation analytics',
        'Long-term culture tracking and measurement',
        'ROI documentation for all interventions',
        'Continuous improvement based on data insights'
      ]
    }
  ];

  const faqs = [
    {
      question: 'How long does it take to implement your workplace culture transformation program?',
      answer: 'Implementation typically takes 3-6 months depending on organization size and complexity. We start with a comprehensive assessment, followed by customized program development, training rollout, and ongoing monitoring.'
    },
    {
      question: 'How is pricing structured for different organization sizes?',
      answer: 'Our pricing is scalable based on employee count, program complexity, and support level required. We offer packages for startups (10-50 employees), mid-size companies (50-500), and enterprise solutions (500+).'
    },
    {
      question: 'What training resources are available for new users?',
      answer: 'We provide comprehensive onboarding including admin training, user guides, video tutorials, live webinars, and dedicated customer success support to ensure smooth adoption.'
    },
    {
      question: 'What compliance frameworks do you support?',
      answer: 'We support POSH Act 2013, ISO 45001, various state regulations, and international standards. Our legal team ensures all programs meet current regulatory requirements.'
    },
    {
      question: 'What kind of support do you provide during and after implementation?',
      answer: 'We offer 24/7 support including dedicated account management, technical assistance, policy updates, refresher training, and quarterly culture assessments.'
    },
    {
      question: 'Can your solution integrate with our existing HR and productivity tools?',
      answer: 'Yes, we integrate with major HRMS platforms, learning management systems, and productivity tools through APIs and custom integrations.'
    },
    {
      question: 'Do you offer custom pricing for large enterprises?',
      answer: 'Absolutely. We provide customized enterprise packages with volume discounts, dedicated support teams, and tailored implementation timelines for organizations with 1000+ employees.'
    },
    {
      question: 'What security measures do you have in place to protect our data?',
      answer: 'We maintain ISO 27001 certification, use end-to-end encryption, conduct regular security audits, and ensure GDPR compliance with data residency options in India.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-pink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
                UREPOSH
              </h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#home" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">Home</a>
                <a href="#about" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">About</a>
                <a href="#expertise" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">Expertise</a>
                <a href="#people" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">People</a>
                <a href="#work" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">Work</a>
                <a href="#news" className="text-gray-700 hover:text-pink-600 transition-colors duration-200">News</a>
                <a href="#connect" className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-colors duration-200">☺Connect</a>
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-pink-600 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-pink-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">Home</a>
              <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">About</a>
              <a href="#expertise" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">Expertise</a>
              <a href="#people" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">People</a>
              <a href="#work" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">Work</a>
              <a href="#news" className="block px-3 py-2 text-gray-700 hover:text-pink-600 transition-colors">News</a>
              <a href="#connect" className="block px-3 py-2 text-pink-600 hover:text-pink-700 transition-colors">☺Connect</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-pink-50 via-white to-pink-50 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-8">
                <Calendar className="w-4 h-4 mr-2" />
                Transforming Workplaces Since 2019
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Where <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Humanity</span>
                <br />
                Meets <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">Compliance</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                Building safer, more inclusive workplaces through innovative training, empathetic design, and measurable impact.
              </p>
              
              <p className="text-lg text-gray-500 mb-12 max-w-3xl mx-auto">
                One conversation, one training session, one transformed culture at a time.
              </p>
              
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Trusted by leading organizations across India</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {clients.map((client, index) => (
              <div key={index} className="group">
                <div className="bg-white p-6 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-pink-100">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-400 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-4">
                      {client.logo}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm">{client.name}</h3>
                      <p className="text-pink-600 text-xs">{client.industry}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="people" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our People</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Meet the Team</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our diverse team of experts brings together decades of experience in compliance, psychology, technology, and organizational development to transform workplaces.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {team.map((member, index) => (
              <div key={index} className="group">
                <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-105 border border-pink-100">
                  <div className="flex items-start mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-pink-100 group-hover:border-pink-200 transition-colors mr-6"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-pink-600 font-semibold mb-3">{member.role}</p>
                      <p className="text-gray-600 mb-4">{member.bio}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-pink-600 font-semibold">{member.achievement}</p>
                    <button className="text-pink-600 hover:text-pink-700 font-medium">View Profile</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Team Stats */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Collective Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-pink-600 mb-2">15+</h4>
                <p className="text-gray-600">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-pink-600 mb-2">500+</h4>
                <p className="text-gray-600">Organizations Served</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-pink-600 mb-2">99.2%</h4>
                <p className="text-gray-600">Success Rate</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-pink-600 mb-2">75K+</h4>
                <p className="text-gray-600">Lives Transformed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section id="expertise" className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Principles</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">The Principles That Drive Us</h3>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              These aren't just words on a wall. They're the living, breathing principles that guide every decision, every interaction, and every solution we create.
            </p>
          </div>

          <div className="space-y-12">
            {principles.map((principle, index) => (
              <div key={index} className="group">
                <div className="bg-white p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 border border-pink-100">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{principle.title}</h3>
                      <p className="text-gray-600 text-lg mb-6">{principle.description}</p>
                      <div className="flex items-center mb-6">
                        <div className="bg-pink-100 px-4 py-2 rounded-full">
                          <span className="text-pink-600 font-semibold">{principle.metric}</span>
                        </div>
                        <span className="ml-3 text-gray-500">⚡</span>
                      </div>
                      <button className="text-pink-600 hover:text-pink-700 font-semibold">Learn More</button>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">How we deliver:</h4>
                      <ul className="space-y-3">
                        {principle.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start text-gray-700">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Principles Stats */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Our Collective Impact</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">98%</h4>
                <p className="text-gray-600 text-sm">Satisfaction Rate</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">100%</h4>
                <p className="text-gray-600 text-sm">Zero Tolerance</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">300%</h4>
                <p className="text-gray-600 text-sm">Engagement Increase</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">40+</h4>
                <p className="text-gray-600 text-sm">Identity Dimensions</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-2xl font-bold text-pink-600 mb-2">85%</h4>
                <p className="text-gray-600 text-sm">Culture Transformation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Mission & Vision</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Our Purpose</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Driving change through clear mission and bold vision to create workplaces where everyone thrives.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-gray-600 text-lg mb-6">
                To create workplaces where every individual feels safe, respected, and empowered to reach their full potential through comprehensive compliance solutions and cultural transformation.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Our Goals:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Eliminate workplace harassment through proactive prevention
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Build inclusive cultures that celebrate diversity
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Ensure 100% legal compliance across all organizations
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Empower employees with knowledge and confidence
                  </li>
                </ul>
              </div>
              <p className="text-pink-600 font-semibold mb-4">500+ organizations transformed, 75,000+ lives impacted</p>
              <button className="text-pink-600 hover:text-pink-700 font-semibold">Learn More About Our Mission</button>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl shadow-lg border border-pink-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Vision</h3>
              <p className="text-gray-600 text-lg mb-6">
                A world where every workplace is a sanctuary of respect, dignity, and growth - where safety is not just a policy, but a lived reality for every individual.
              </p>
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Our Aspirations:</h4>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Zero tolerance for workplace harassment
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Universal access to safe work environments
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Cultural transformation at scale
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-pink-400 rounded-full mr-3"></div>
                    Leadership in workplace safety innovation
                  </li>
                </ul>
              </div>
              <p className="text-pink-600 font-semibold mb-4">Leading the global movement for workplace safety and inclusion</p>
              <button className="text-pink-600 hover:text-pink-700 font-semibold">Explore Our Vision</button>
            </div>
          </div>

          {/* Mission Vision Stats */}
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Driving Change Together</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl shadow-lg">
                <h4 className="text-3xl font-bold text-pink-600 mb-2">100%</h4>
                <p className="text-gray-900 font-semibold mb-1">Compliance Rate</p>
                <p className="text-gray-600 text-sm">Legal adherence across all clients</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl shadow-lg">
                <h4 className="text-3xl font-bold text-pink-600 mb-2">500+</h4>
                <p className="text-gray-900 font-semibold mb-1">Organizations</p>
                <p className="text-gray-600 text-sm">Transformed workplaces</p>
              </div>
              <div className="bg-gradient-to-br from-pink-50 to-white p-6 rounded-xl shadow-lg">
                <h4 className="text-3xl font-bold text-pink-600 mb-2">75K+</h4>
                <p className="text-gray-900 font-semibold mb-1">Lives Impacted</p>
                <p className="text-gray-600 text-sm">Through our programs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Got Questions?</h3>
            <p className="text-xl text-gray-600">
              We've got answers. Here are the most common questions we receive about our workplace culture transformation services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-pink-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-pink-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-pink-600 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Still Have Questions?</h3>
            <p className="text-gray-600 mb-6">Our team is here to help. Reach out and we'll get back to you with personalized answers.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-6 py-3 rounded-full font-semibold hover:from-pink-700 hover:to-pink-600 transition-all duration-300">
                Contact Support
              </button>
              <button className="border-2 border-pink-600 text-pink-600 px-6 py-3 rounded-full font-semibold hover:bg-pink-600 hover:text-white transition-all duration-300">
                Schedule Call
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default App;