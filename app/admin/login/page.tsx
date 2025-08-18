"use client";

import React, { useEffect, useState } from 'react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAuthenticated, loading } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/admin/dashboard');
    }
  }, [loading, isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const result = await login(username, password);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (e) {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="flex items-center gap-3 text-gray-600">
          <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
          <span>Loading...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-blue-100 p-8 mx-4 text-black">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Access</h1>
            <p className="text-black">Sign in to your admin dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm border border-red-200">
                {error}
              </div>
            )}
            
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-black mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white/50 placeholder-gray-400 text-black"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-black mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white/50 placeholder-gray-400 text-black"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Secure admin access • Protected by JWT authentication
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}