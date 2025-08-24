'use client'

import React from 'react'
import { Shield, AlertTriangle, Mail, Phone, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function WriterDeactivatedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-red-200 p-8 text-center">
          {/* Icon */}
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Deactivated</h1>
          <p className="text-gray-600 mb-6">
            Your writer account has been temporarily deactivated by the administrator.
          </p>

          {/* Alert */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <h3 className="font-semibold text-red-800 mb-1">Access Restricted</h3>
                <p className="text-sm text-red-700">
                  You cannot access the writer dashboard or create new content until your account is reactivated.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900">Contact Administrator</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <span>ureposh@gmail.com</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+91-11-99999 44807</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/writer/login"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl hover:from-red-700 hover:to-rose-700 transition-all font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
            
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-gray-700 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all font-medium"
            >
              Visit Main Site
            </Link>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              If you believe this is an error, please contact the administrator immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
