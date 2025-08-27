"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle, Calendar, ArrowRight, User, Building, CheckCircle, Clock, Shield, Award, Send, FileText } from "lucide-react"

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    gstin: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

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
        name: '', email: '', phone: '', company: '', gstin: '', subject: '', message: '' 
      });
      setTimeout(() => { setStatus('idle'); setPreviewUrl(null); }, 8000);
    } catch (err: any) {
      setErrorMessage(err?.message || 'Something went wrong');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
             {/* Connect Form Section */}
       <section className="pt-28 pb-14 sm:pt-24 sm:pb-12">
         <div className="w-full">
                       <div className="grid lg:grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                           {/* Connect Form - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:col-span-2"
              >
               <div className="bg-white rounded-2xl shadow-xl border border-pink-100 overflow-hidden">
                             {/* Form Header */}
               <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3">
                 <div className="flex items-center">
                   <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center mr-2">
                     <MessageCircle className="w-3 h-3 text-white" />
                   </div>
                   <div>
              <h2 className="text-sm font-bold">Request for Proposal</h2>
                      
                   </div>
                 </div>
               </div>
              
              {/* Form Content */}
              <div className="p-5">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-600 mb-4 max-w-md mx-auto text-sm">
                      Thank you for reaching out. We'll get back to you within 24 hours with a detailed response.
                    </p>
                    {previewUrl && (
                      <div className="mt-6 p-4 bg-pink-50 rounded-xl border border-pink-200">
                        <p className="text-sm text-pink-800 mb-3 font-medium">Development Preview:</p>
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-pink-600 hover:text-pink-800 font-medium"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          View email preview
                        </a>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {status === 'error' && (
                      <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700">
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
                     <div className="grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                       <div className="space-y-2">
                         <label htmlFor="name" className="block text-xs font-semibold text-gray-700">
                           Full Name *
                         </label>
                         <div className="relative">
                           <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input
                             type="text"
                             id="name"
                             name="name"
                             value={formData.name}
                             onChange={handleChange}
                             required
                             className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your full name"
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
                           Email Address *
                         </label>
                         <div className="relative">
                           <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input
                             type="email"
                             id="email"
                             name="email"
                             value={formData.email}
                             onChange={handleChange}
                             required
                             className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your email"
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label htmlFor="company" className="block text-xs font-semibold text-gray-700">
                           Company
                         </label>
                         <div className="relative">
                           <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                           <input
                             type="text"
                             id="company"
                             name="company"
                             value={formData.company}
                             onChange={handleChange}
                             className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your company name"
                           />
                         </div>
                       </div>
                     </div>

                      {/* Additional Details */}
                      <div className="grid md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-xs font-semibold text-gray-700">
                            Mobile No
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                              placeholder="Enter your mobile number"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="gstin" className="block text-xs font-semibold text-gray-700">
                            GSTIN
                          </label>
                          <div className="relative">
                            <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              id="gstin"
                              name="gstin"
                              value={formData.gstin}
                              onChange={handleChange}
                              className="w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                              placeholder="Enter your GSTIN"
                            />
                          </div>
                        </div>
                      </div>

                                          <div className="space-y-2 max-w-3xl mx-auto">
                        <label htmlFor="subject" className="block text-xs font-semibold text-gray-700">
                          Subject *
                        </label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                          placeholder="Brief description of your inquiry"
                        />
                      </div>
                    
                                         <div className="space-y-2 max-w-3xl mx-auto">
                       <label htmlFor="message" className="block text-xs font-semibold text-gray-700">
                         Message *
                       </label>
                       <textarea
                         id="message"
                         name="message"
                         value={formData.message}
                         onChange={handleChange}
                         required
                         minLength={20}
                         rows={3}
                         className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white text-sm"
                         placeholder="Tell us about your needs, questions, or how we can help you..."
                       />
                       </div>
                    
                    
                    
                                         <div className="max-w-3xl mx-auto">
                       <Button
                         type="submit"
                         disabled={status === 'submitting'}
                         className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm"
                       >
                      {status === 'submitting' ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Message...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Send className="w-4 h-4 mr-2" />
                          Send Message
                                                 </div>
                       )}
                     </Button>
                   </div>
                  </form>
                )}
              </div>
                           </div>
             </motion.div>
             
                           {/* Contact Information - Right Side */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-sm mx-auto"
              >
             

                           {/* Contact Cards Grid */}
              <div className="w-full">
                                 {/* Contact Details */}
                 <div className="space-y-4">
                                    <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                     <div className="w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md flex items-center justify-center mr-2">
                       <MessageCircle className="w-3 h-3 text-white" />
                     </div>
                     Get in Touch
                   </h3>
                  
                  <div className="space-y-2">
                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center p-2 bg-white rounded-lg shadow-md border border-gray-100 hover:border-pink-200 transition-all duration-300"
                    >
                                             <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md flex items-center justify-center flex-shrink-0 mr-2">
                         <Mail className="w-3 h-3 text-white" />
                       </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Email</h4>
                         <p className="text-gray-600 text-xs">ureposh@gmail.com</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center p-2 bg-white rounded-lg shadow-md border border-gray-100 hover:border-green-200 transition-all duration-300"
                    >
                                             <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-md flex items-center justify-center flex-shrink-0 mr-2">
                         <Phone className="w-3 h-3 text-white" />
                       </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Phone</h4>
                         <p className="text-gray-600 text-xs">+91 99999 44807</p>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center p-2 bg-white rounded-lg shadow-md border border-gray-100 hover:border-purple-200 transition-all duration-300"
                    >
                                             <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md flex items-center justify-center flex-shrink-0 mr-2">
                         <MapPin className="w-3 h-3 text-white" />
                       </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">Office</h4>
                         <p className="text-gray-600 text-xs">C 84, Sector 2, Noida, 201301</p>
                       </div>
                                        </motion.div>

                   </div>

                                                                           {/* Floating Mug Section */}
                    <div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="relative"
                      >
                                                        <div className="relative">
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 }}
                              className="text-center"
                            >
                              {/* Well-designed "Let's have a coffee" text section */}
                              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-200/50 shadow-lg hover:shadow-xl transition-all duration-300">
                                <div className="flex items-center justify-center mb-4">
                                  <div className="text-5xl animate-bounce">☕</div>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                  Let's Have a Coffee!
                                </h3>
                                <p className="text-base text-gray-600 max-w-sm mx-auto leading-relaxed">
                                  Great conversations start over a warm cup of coffee. Let's discuss how we can make your workplace safer and more inclusive.
                                </p>
                              </div>
                            </motion.div>
                          </div>
                      </motion.div>
                    </div>
                </div>

                               
               </div>
             </motion.div>
           </div>
         </div>
       </section>
    </div>
  )
}
