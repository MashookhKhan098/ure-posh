'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Writer {
  id: string
  name: string
  username: string
  bio?: string
  is_active?: boolean
  field_allotted?: {
    company_updates: boolean
    compliance_legal_insights: boolean
    news_media_coverage: boolean
    newsletter_archive: boolean
    thought_leadership: boolean
    workplace_stories: boolean
    events_webinars: boolean
    international_regulatory_policy_watch: boolean
    united_kingdom_workplace: boolean
    us_workplace: boolean
  }
  phone?: string
}

interface WriterAuthContextType {
  writer: Writer | null
  isAuthenticated: boolean
  loading: boolean
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const WriterAuthContext = createContext<WriterAuthContextType | undefined>(undefined)

export function useWriterAuth() {
  const context = useContext(WriterAuthContext)
  if (context === undefined) {
    throw new Error('useWriterAuth must be used within a WriterAuthProvider')
  }
  return context
}

export function WriterAuthProvider({ children }: { children: ReactNode }) {
  const [writer, setWriter] = useState<Writer | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const checkAuth = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/writer/auth/check', {
        credentials: 'include'
      })
      
      if (response.ok) {
        const data = await response.json()
        
        // Check if writer is active
        if (data.writer && data.writer.is_active === false) {
          setWriter(null)
          setIsAuthenticated(false)
          // Redirect to deactivation page or show message
          router.push('/writer/deactivated')
          return
        }
        
        setWriter(data.writer)
        setIsAuthenticated(true)
      } else {
        setWriter(null)
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      setWriter(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('/api/writer/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        // Check if writer is active
        if (data.writer && data.writer.is_active === false) {
          return { success: false, error: 'Your account has been deactivated by the administrator. Please contact admin for assistance.' }
        }
        
        setWriter(data.writer)
        setIsAuthenticated(true)
        router.push('/writer/dashboard')
        return { success: true }
      } else {
        return { success: false, error: data.error || 'Login failed' }
      }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: 'Network error. Please try again.' }
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/writer/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })
      
      setWriter(null)
      setIsAuthenticated(false)
      router.push('/writer/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const value: WriterAuthContextType = {
    writer,
    isAuthenticated,
    loading,
    login,
    logout,
    checkAuth
  }

  return (
    <WriterAuthContext.Provider value={value}>
      {children}
    </WriterAuthContext.Provider>
  )
}
