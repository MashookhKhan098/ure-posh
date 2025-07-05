'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/30 to-rose-50/40 flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl font-bold text-violet-600">404</h1>
          <h2 className="text-3xl font-semibold text-slate-900">Page Not Found</h2>
          <p className="text-lg text-slate-600 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/">
            <Button className="bg-gradient-to-r from-violet-600 via-purple-600 to-rose-600 hover:from-violet-700 hover:via-purple-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl font-semibold">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 