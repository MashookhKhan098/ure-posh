"use client"

import React from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, MessageCircle, Calendar, ArrowRight } from "lucide-react"

export default function ConnectPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50/30 to-zinc-50/40 flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-0 flex flex-col md:flex-row overflow-hidden">
        {/* Form Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">Contact Us</h1>
          <form className="flex flex-col gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input id="name" name="name" type="text" required className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 shadow-sm text-gray-700 placeholder-gray-400" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input id="email" name="email" type="email" required className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 shadow-sm text-gray-700 placeholder-gray-400" placeholder="you@email.com" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea id="message" name="message" rows={5} required className="w-full px-4 py-3 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/90 shadow-sm text-gray-700 placeholder-gray-400" placeholder="How can we help you?" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl">Send Message</Button>
          </form>
        </div>
        {/* Divider */}
        <div className="hidden md:block w-px bg-pink-100 my-8"></div>
        {/* Details Section */}
        <div className="flex-1 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-pink-50 to-rose-50">
          <h2 className="text-2xl font-bold text-pink-700 mb-4">Contact Details</h2>
          <div className="flex flex-col gap-5 text-base text-gray-700">
            <div className="flex items-center gap-3"><Mail className="h-5 w-5 text-pink-500" /> hello@ureposh.com</div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-pink-500" /> +91 98765 43210</div>
            <div className="flex items-center gap-3"><MapPin className="h-5 w-5 text-pink-500" /> Mumbai, Maharashtra</div>
          </div>
        </div>
      </div>
    </div>
  )
} 