'use client'

import { useState, useEffect } from 'react'

export function useSimpleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('adminAuthenticated')
      setIsAuthenticated(!!auth)
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'ureposh2024') {
      localStorage.setItem('adminAuthenticated', 'true')
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Invalid credentials' }
  }

  const logout = () => {
    localStorage.removeItem('adminAuthenticated')
    setIsAuthenticated(false)
    window.location.replace('/admin/login')
  }

  return { isAuthenticated, loading, login, logout }
}
