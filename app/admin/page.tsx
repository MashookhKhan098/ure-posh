'use client'

import { useEffect } from 'react'
import { useAdminAuth } from '@/hooks/useAdminAuth'
import { useRouter } from 'next/navigation'

export default function AdminIndexPage() {
  const { isAuthenticated, loading } = useAdminAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (isAuthenticated) {
      router.push('/admin/dashboard')
    } else {
      router.push('/admin/login')
    }
  }, [isAuthenticated, loading, router])

  return null
}
