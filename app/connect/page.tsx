"use client"

import React, { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle, Calendar, ArrowRight, User, Building, CheckCircle, Clock, Shield, Award, Send } from "lucide-react"

export default function ConnectPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
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
        name: '', email: '', phone: '', company: '', subject: '', message: '' 
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
       <section className="pt-32 pb-20">
         <div className="w-full">
                       <div className="grid lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
                           {/* Connect Form - Left Side */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-full lg:col-span-2"
              >
               <div className="bg-white rounded-3xl shadow-2xl border border-pink-100 overflow-hidden">
                             {/* Form Header */}
               <div className="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-3">
                 <div className="flex items-center">
                   <div className="w-6 h-6 bg-white/10 rounded-md flex items-center justify-center mr-2">
                     <MessageCircle className="w-3 h-3 text-white" />
                   </div>
                   <div>
                     <h2 className="text-sm font-bold">Send us a message</h2>
                     <p className="text-pink-100 text-xs">We'll get back to you within 24 hours</p>
                   </div>
                 </div>
               </div>
              
              {/* Form Content */}
              <div className="p-6">
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
                      <div className="mt-8 p-6 bg-pink-50 rounded-xl border border-pink-200">
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
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                     <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                       <div className="space-y-2">
                         <label htmlFor="name" className="block text-xs font-semibold text-gray-700">
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
                             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your full name"
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label htmlFor="email" className="block text-xs font-semibold text-gray-700">
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
                             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your email"
                           />
                         </div>
                       </div>
                       
                       <div className="space-y-2">
                         <label htmlFor="company" className="block text-xs font-semibold text-gray-700">
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
                             className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
                             placeholder="Enter your company name"
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
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white text-sm"
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
                         rows={4}
                         className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none bg-gray-50 focus:bg-white text-sm"
                         placeholder="Tell us about your needs, questions, or how we can help you..."
                       />
                       <p className="text-xs text-gray-500">Minimum 20 characters</p>
                     </div>
                    
                    
                    
                                         <div className="max-w-3xl mx-auto">
                       <Button
                         type="submit"
                         disabled={status === 'submitting'}
                         className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:opacity-60 disabled:cursor-not-allowed text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-base"
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
                <div className="space-y-6">
                                   <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md flex items-center justify-center mr-3">
                      <MessageCircle className="w-3 h-3 text-white" />
                    </div>
                    Get in Touch
                  </h3>
                 
                 <div className="space-y-4">
                   <motion.div
                     whileHover={{ scale: 1.02, x: 5 }}
                     className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-pink-200 transition-all duration-300"
                   >
                                           <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <Mail className="w-4 h-4 text-white" />
                      </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 text-lg">Email</h4>
                       <p className="text-gray-600 text-base">hello@ureposh.com</p>
                     </div>
                   </motion.div>

                   <motion.div
                     whileHover={{ scale: 1.02, x: 5 }}
                     className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-green-200 transition-all duration-300"
                   >
                                           <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 text-lg">Phone</h4>
                       <p className="text-gray-600 text-base">+91 98765 43210</p>
                     </div>
                   </motion.div>

                   <motion.div
                     whileHover={{ scale: 1.02, x: 5 }}
                     className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
                   >
                                           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                     <div>
                       <h4 className="font-semibold text-gray-900 text-lg">Office</h4>
                       <p className="text-gray-600 text-base">Mumbai, Maharashtra, India</p>
                     </div>
                   </motion.div>
                   <motion.div
                     whileHover={{ scale: 1.02, x: 5 }}
                     className="flex items-center p-4 bg-white rounded-xl shadow-lg border border-gray-100 hover:border-purple-200 transition-all duration-300"
                   >
                                           <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                        <MapPin className="w-4 h-4 text-white" />
                      </div>
                     <div>
                      <h4 className="font-semibold text-gray-900 text-lg">Response</h4>
                       <p className="text-gray-600 text-base">Within 24 hours</p>
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