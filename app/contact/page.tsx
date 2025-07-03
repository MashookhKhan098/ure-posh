"use client"

import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, MessageSquare, Users, Clock, ArrowRight, Menu, X } from 'lucide-react';
import { Navbar } from '../components/Navbar';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: string;
  description: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    service: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        service: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo: ContactInfo[] = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "info@ureposh.com",
      description: "We typically respond within 2-4 hours"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 98765 43210",
      description: "Available Mon-Fri, 9 AM - 6 PM IST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "Mumbai, Maharashtra, India",
      description: "Serving clients across India"
    }
  ];

  const faqs: FAQ[] = [
    {
      question: "How quickly can you help us become POSH compliant?",
      answer: "Depending on your organization's size and current state, we can help you achieve basic compliance within 2-4 weeks. Complete implementation with training typically takes 6-8 weeks."
    },
    {
      question: "Do you provide ongoing support after implementation?",
      answer: "Yes, we provide continuous support including annual compliance reviews, IC training updates, investigation assistance, and policy updates as regulations change."
    },
    {
      question: "What industries do you work with?",
      answer: "We work with organizations across all industries including IT, manufacturing, healthcare, education, startups, and government organizations of all sizes."
    },
    {
      question: "Can you help with existing harassment cases?",
      answer: "Yes, we provide expert guidance for ongoing investigations, help with proper documentation, and ensure compliance with legal procedures throughout the process."
    },
    {
      question: "What is the cost of your services?",
      answer: "Our pricing varies based on organization size, services required, and complexity. We offer customized packages and provide detailed quotes after understanding your specific needs."
    },
    {
      question: "Do you provide training in regional languages?",
      answer: "Yes, we conduct training sessions in Hindi, English, and several regional languages to ensure effective communication and understanding across your organization."
    }
  ];

  const benefits: string[] = [
    "Expert legal compliance guidance",
    "24/7 ongoing support",
    "Customized solutions for your industry",
    "Proven track record with 200+ clients"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse mb-8">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
              <MessageSquare className="w-12 h-12 text-rose-600" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Ready to make your workplace safer and more inclusive? Our POSH compliance experts are here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>2-4 hour response time</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>200+ satisfied clients</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>100% compliance guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800">Thank you! We'll get back to you within 2-4 hours.</p>
                  </div>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    placeholder="Your Company"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="compliance">POSH Compliance Setup</option>
                    <option value="training">Training & Workshops</option>
                    <option value="investigation">Investigation Support</option>
                    <option value="ongoing">Ongoing Compliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your requirements..."
                    required
                  />
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      Send Message
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <div className="space-y-6">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 p-4 rounded-lg hover:bg-rose-50/50 transition-colors">
                      <div className="bg-rose-100 p-3 rounded-full text-rose-600">
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                        <p className="text-gray-800 font-medium">{item.content}</p>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Choose Us?</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our services</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-rose-100 hover:shadow-lg transition-all duration-300 p-6 rounded-lg bg-white hover:scale-105"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-rose-100 to-pink-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <h2 className="text-4xl font-bold text-gray-900">Ready to Get Started?</h2>
          <p className="text-xl text-gray-600">
            Take the first step towards creating a safer, more inclusive workplace for everyone.
          </p>
          <button className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 px-8 py-4 rounded-full text-white font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center gap-2">
            Book Free Consultation
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Us</h3>
              <div className="space-y-2 text-gray-600">
                <p>Email: info@ureposh.com</p>
                <p>Phone: +91 98765 43210</p>
                <p>Location: Mumbai, Maharashtra, India</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-600 hover:text-rose-400 transition-colors">Our People</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li>POSH Compliance Setup</li>
                <li>Training & Workshops</li>
                <li>Investigation Support</li>
                <li>Ongoing Compliance</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2024 Ureposh. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;