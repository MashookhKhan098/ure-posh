'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Admin {
  id: string
  username: string
  email: string
  role: string
}

interface AdminAuthContextType {
  admin: Admin | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined)

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/auth/check', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated && data.admin) {
          setAdmin(data.admin)
          setIsAuthenticated(true)
        } else {
          setAdmin(null)
          setIsAuthenticated(false)
        }
      } else {
        setAdmin(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Admin auth check error:', error)
      setAdmin(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setAdmin(data.admin)
        setIsAuthenticated(true)
        router.push('/admin/dashboard')
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Admin login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      setAdmin(null)
      setIsAuthenticated(false)
      
      // Clear all admin-related cookies and localStorage
      document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;'
      localStorage.removeItem('admin_session')
      sessionStorage.removeItem('admin_session')
      
      router.push('/admin/login')
    } catch (error) {
      console.error('Admin logout error:', error)
      // Force logout even if API call fails
      setAdmin(null)
      setIsAuthenticated(false)
      document.cookie = 'admin_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      localStorage.removeItem('admin_session')
      sessionStorage.removeItem('admin_session')
      router.push('/admin/login')
    }
  }

  // Check auth on mount
  useEffect(() => {
    checkAuth()
  }, [])

  const value: AdminAuthContextType = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth
  }

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}
