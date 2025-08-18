'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function WriterPage() {
  const router = useRouter()

  useEffect(() => {
    router.push('/writer/login')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to writer login...</p>
      </div>
    </div>
  )
}
