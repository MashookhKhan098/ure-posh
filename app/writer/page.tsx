'use client'

import { useEffect } from 'react'
import { useWriterAuth } from '@/hooks/useWriterAuth'

export default function WriterIndexPage() {
  const { isAuthenticated, loading } = useWriterAuth()

  useEffect(() => {
    if (loading) return
    if (isAuthenticated) {
      window.location.replace('/writer/dashboard')
    } else {
      window.location.replace('/writer/login')
    }
  }, [isAuthenticated, loading])

  return null
}


