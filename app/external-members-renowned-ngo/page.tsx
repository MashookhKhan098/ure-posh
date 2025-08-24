"use client";
import React from 'react';
import { Users, Shield, Mail, ArrowRight, Award } from 'lucide-react';

export default function ExternalMembersRenownedNGOPage() {
  return (
    <main className="min-h-screen bg-white">
      <style jsx>{`
        .text-focus {
          background: linear-gradient(135deg, #ffffff 0%, #fef7ff 100%);
          border: 2px solid #fce7f3;
          box-shadow: 0 8px 32px rgba(236, 72, 153, 0.12);
          backdrop-filter: blur(10px);
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

        .high-contrast-text {
          color: #111827;
          font-weight: 700;
          line-height: 1.4;
          text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-br from-white via-pink-50/30 to-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-pink-100/40 to-purple-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 w-full">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 text-focus px-4 py-2 rounded-full border border-pink-300 shadow-lg">
              <div className="w-3 h-3 bg-pink-600 rounded-full animate-pulse"></div>
              <span className="text-pink-800 font-bold text-sm">External Members from Renowned NGO</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl high-contrast-text leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-700 bg-clip-text text-transparent">
                  Expert External Committee Members
                </span>
              </h1>
              <div className="w-24 h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 rounded-full shadow-lg mx-auto"></div>
            </div>
            
            <div className="space-y-4 max-w-4xl mx-auto">
              <div className="text-focus rounded-xl p-6 shadow-lg">
                <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                  Access qualified external members from reputed NGOs for your Internal Committee, ensuring impartial and expert handling of complaints.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gradient-to-b from-white via-pink-50/20 to-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="focus-card p-8 rounded-2xl shadow-xl text-center">
            <Users className="w-16 h-16 text-pink-600 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold high-contrast-text mb-6">
              Coming Soon: Expert External Committee Members
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We're building a comprehensive network of qualified external members from renowned NGOs to serve on your Internal Committee.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:ureposh@gmail.com" className="inline-flex items-center gap-3 bg-pink-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-pink-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
                <Mail className="w-5 h-5" />
                <span>Get Early Access</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
