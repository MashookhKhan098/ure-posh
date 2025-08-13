"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Building, User, MessageSquare, Calendar, Shield, Award, Briefcase, DollarSign, Globe, Target, AlertCircle, Linkedin, Users, CalendarDays, Star, FileText, Globe2, MapPinIcon } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    industry: '',
    website: '',
    linkedin: '',
    subject: '',
    serviceType: '',
    budgetRange: '',
    preferredContact: '',
    urgencyLevel: '',
    employeeCount: '',
    location: '',
    projectTimeline: '',
    referralSource: '',
    additionalContacts: '',
    specificRequirements: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const serviceTypes = [
    { value: 'consultation', label: 'Workplace Consultation', icon: '👥' },
    { value: 'training', label: 'Training & Workshops', icon: '🎓' },
    { value: 'compliance', label: 'Compliance Services', icon: '✅' },
    { value: 'investigation', label: 'Investigation Services', icon: '🔍' },
    { value: 'policy', label: 'Policy Development', icon: '📋' },
    { value: 'audit', label: 'HR Audit & Assessment', icon: '📊' },
    { value: 'mediation', label: 'Conflict Mediation', icon: '🤝' },
    { value: 'other', label: 'Other Services', icon: '💼' }
  ];

  const budgetRanges = [
    { value: '', label: 'Select budget range' },
    { value: 'under-10k', label: 'Under ₹10,000' },
    { value: '10k-50k', label: '₹10,000 - ₹50,000' },
    { value: '50k-1lakh', label: '₹50,000 - ₹1,00,000' },
    { value: '1lakh-5lakh', label: '₹1,00,000 - ₹5,00,000' },
    { value: '5lakh-plus', label: '₹5,00,000+' },
    { value: 'discuss', label: 'Let\'s discuss' }
  ];

  const preferredContactMethods = [
    { value: '', label: 'Select preferred method' },
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Call' },
    { value: 'meeting', label: 'In-person Meeting' }
  ];

  const urgencyLevels = [
    { value: '', label: 'Select urgency level' },
    { value: 'low', label: 'Low - Planning phase' },
    { value: 'medium', label: 'Medium - Within 3 months' },
    { value: 'high', label: 'High - Within 1 month' },
    { value: 'urgent', label: 'Urgent - Immediate attention needed' }
  ];

  const employeeCounts = [
    { value: '', label: 'Select company size' },
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500-plus', label: '500+ employees' }
  ];

  const industries = [
    { value: '', label: 'Select industry' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance & Banking' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail & E-commerce' },
    { value: 'education', label: 'Education' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'hospitality', label: 'Hospitality & Tourism' },
    { value: 'non-profit', label: 'Non-profit' },
    { value: 'government', label: 'Government' },
    { value: 'media', label: 'Media & Entertainment' },
    { value: 'logistics', label: 'Logistics & Transportation' },
    { value: 'energy', label: 'Energy & Utilities' },
    { value: 'other', label: 'Other' }
  ];

  const projectTimelines = [
    { value: '', label: 'Select project timeline' },
    { value: 'immediate', label: 'Immediate - Within 1 month' },
    { value: 'short-term', label: 'Short-term - 1-3 months' },
    { value: 'medium-term', label: 'Medium-term - 3-6 months' },
    { value: 'long-term', label: 'Long-term - 6+ months' },
    { value: 'ongoing', label: 'Ongoing partnership' },
    { value: 'flexible', label: 'Flexible timeline' }
  ];

  const referralSources = [
    { value: '', label: 'How did you hear about us?' },
    { value: 'google', label: 'Google Search' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'social-media', label: 'Social Media' },
    { value: 'referral', label: 'Referral/Recommendation' },
    { value: 'event', label: 'Event/Conference' },
    { value: 'website', label: 'Direct Website Visit' },
    { value: 'advertisement', label: 'Advertisement' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('submitting');
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({} as any));
      if (!res.ok) {
        const reason = data?.details?.join?.(', ') || data?.error || 'Failed to send message';
        throw new Error(reason);
      }
      setPreviewUrl(data?.previewUrl || null);
      setStatus('success');
      setFormData({ 
        name: '', email: '', phone: '', company: '', jobTitle: '', industry: '', 
        website: '', linkedin: '', subject: '', serviceType: '', budgetRange: '', 
        preferredContact: '', urgencyLevel: '', employeeCount: '', location: '', 
        projectTimeline: '', referralSource: '', additionalContacts: '', 
        specificRequirements: '', message: '' 
      });
      setTimeout(() => { setStatus('idle'); setPreviewUrl(null); }, 8000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black rounded-full mb-6">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Let's Start a Conversation
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Ready to transform your workplace? Our experts are here to help you create a safe, inclusive, and compliant environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Free Consultation
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-blue-500" />
                24/7 Response
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-2 text-purple-500" />
                Confidential
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-gray-900 to-black text-white p-8">
                  <div className="flex items-center">
                    
                    <div>
                      <h2 className="text-2xl font-bold">Request for Proposal</h2>
                     
                    </div>
                  </div>
                </div>
                
                {/* Form Content */}
                <div className="p-8">
                  {status === 'success' ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">Message Sent Successfully!</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Thank you for reaching out. We'll get back to you within 24 hours with a detailed response.
                      </p>
                      {previewUrl && (
                        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                          <p className="text-sm text-blue-800 mb-3 font-medium">Development Preview:</p>
                          <a
                            href={previewUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            View email preview
                          </a>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {status === 'error' && (
                        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">
                          <div className="flex items-center">
                            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-red-600 text-xs font-bold">!</span>
                            </div>
                            <span className="font-medium">Error:</span>
                            <span className="ml-2">{errorMessage}</span>
                          </div>
                        </div>
                      )}
                      
                      {/* Personal Information */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-sm font-semibold text-gray-700">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your phone number"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                            Company
                          </label>
                          <div className="relative">
                            <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              id="company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your company name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="jobTitle" className="block text-sm font-semibold text-gray-700">
                            Job Title
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              id="jobTitle"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your job title"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="industry" className="block text-sm font-semibold text-gray-700">
                            Industry
                          </label>
                          <div className="relative">
                            <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="industry"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select industry</option>
                              {industries.map((industry) => (
                                <option key={industry.value} value={industry.value}>
                                  {industry.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="website" className="block text-sm font-semibold text-gray-700">
                            Website
                          </label>
                          <div className="relative">
                            <Target className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="url"
                              id="website"
                              name="website"
                              value={formData.website}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your website"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="linkedin" className="block text-sm font-semibold text-gray-700">
                            LinkedIn Profile
                          </label>
                          <div className="relative">
                            <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="url"
                              id="linkedin"
                              name="linkedin"
                              value={formData.linkedin}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your LinkedIn profile URL"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="employeeCount" className="block text-sm font-semibold text-gray-700">
                            Company Size
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="employeeCount"
                              name="employeeCount"
                              value={formData.employeeCount}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select company size</option>
                              {employeeCounts.map((count) => (
                                <option key={count.value} value={count.value}>
                                  {count.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="projectTimeline" className="block text-sm font-semibold text-gray-700">
                            Project Timeline
                          </label>
                          <div className="relative">
                            <CalendarDays className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="projectTimeline"
                              name="projectTimeline"
                              value={formData.projectTimeline}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select project timeline</option>
                              {projectTimelines.map((timeline) => (
                                <option key={timeline.value} value={timeline.value}>
                                  {timeline.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="referralSource" className="block text-sm font-semibold text-gray-700">
                            Referral Source
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="referralSource"
                              name="referralSource"
                              value={formData.referralSource}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">How did you hear about us?</option>
                              {referralSources.map((source) => (
                                <option key={source.value} value={source.value}>
                                  {source.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="additionalContacts" className="block text-sm font-semibold text-gray-700">
                            Additional Contact Information
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <textarea
                              id="additionalContacts"
                              name="additionalContacts"
                              value={formData.additionalContacts}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Any other contact information you'd like to share (e.g., Skype ID, Slack channel)"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="subject" className="block text-sm font-semibold text-gray-700">
                            Subject *
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            placeholder="Brief description of your inquiry"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700">
                            Service Type
                          </label>
                          <select
                            id="serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                          >
                            <option value="">Select a service</option>
                            {serviceTypes.map((service) => (
                              <option key={service.value} value={service.value}>
                                {service.icon} {service.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="budgetRange" className="block text-sm font-semibold text-gray-700">
                            Budget Range
                          </label>
                          <div className="relative">
                            <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="budgetRange"
                              name="budgetRange"
                              value={formData.budgetRange}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select budget range</option>
                              {budgetRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                  {range.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="preferredContact" className="block text-sm font-semibold text-gray-700">
                            Preferred Contact Method
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="preferredContact"
                              name="preferredContact"
                              value={formData.preferredContact}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select preferred method</option>
                              {preferredContactMethods.map((method) => (
                                <option key={method.value} value={method.value}>
                                  {method.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="urgencyLevel" className="block text-sm font-semibold text-gray-700">
                            Urgency Level
                          </label>
                          <div className="relative">
                            <AlertCircle className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <select
                              id="urgencyLevel"
                              name="urgencyLevel"
                              value={formData.urgencyLevel}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            >
                              <option value="">Select urgency level</option>
                              {urgencyLevels.map((level) => (
                                <option key={level.value} value={level.value}>
                                  {level.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="location" className="block text-sm font-semibold text-gray-700">
                            Location
                          </label>
                          <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                              type="text"
                              id="location"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                              placeholder="Enter your location"
                            />
                          </div>
                        </div>
                      </div>
                      
                        <div className="space-y-2">
                          <label htmlFor="specificRequirements" className="block text-sm font-semibold text-gray-700">
                            Specific Requirements (if any)
                          </label>
                          <textarea
                            id="specificRequirements"
                            name="specificRequirements"
                            value={formData.specificRequirements}
                            onChange={handleChange}
                            rows={3}
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                            placeholder="Please provide any specific requirements or details for your request."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
                            Message *
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            minLength={20}
                            rows={6}
                            className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white"
                            placeholder="Tell us about your needs, challenges, or questions..."
                          />
                          <p className="text-xs text-gray-500">Minimum 20 characters</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                          <div className="flex items-center mb-4">
                            <Star className="w-5 h-5 text-blue-600 mr-3" />
                            <h3 className="font-semibold text-gray-900">Why Choose Ureposh?</h3>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>Expert HR Consultants</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>Confidential & Secure</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>Customized Solutions</span>
                            </div>
                            <div className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              <span>24/7 Support</span>
                            </div>
                          </div>
                        </div>
                      
                      <Button
                        type="submit"
                        disabled={status === 'submitting'}
                        className="w-full bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 disabled:opacity-60 disabled:cursor-not-allowed text-white py-5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg"
                      >
                        {status === 'submitting' ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                            Sending Message...
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="w-5 h-5 mr-3" />
                            Send Message
                          </div>
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-8"
            >
              <div>
                 <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in touch</h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Ready to transform your workplace culture? Our team of experts is here to help you create a safe, inclusive, and compliant environment.
                </p>
              </div>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">ea@ureposh.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Phone</h3>
                    <p className="text-gray-600">+91 99999 44807</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-600">C 84, Sector 2, Noida, 201301</p>
                  </div>
                </motion.div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 text-gray-600 mr-3" />
                  <h3 className="font-semibold text-gray-900">Business Hours</h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 2:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-blue-600" />
                  Why Choose Us?
                </h3>
                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Expert workplace consultants
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    24/7 response time
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Confidential & secure
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    Proven track record
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                   <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-600" />
                   Quick Response
                </h3>
                 <p className="text-sm text-gray-600">&nbsp;</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}