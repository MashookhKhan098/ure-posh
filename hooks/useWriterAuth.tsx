'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'

interface Writer {
  id: string
  name: string
  email: string
  bio?: string
  specialization?: string
  expertise_areas?: string[]
  status?: string
  is_featured?: boolean
  verification_status?: string
}

interface WriterAuthContextType {
  writer: Writer | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
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

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch('/api/writer/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
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
