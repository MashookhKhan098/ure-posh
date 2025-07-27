import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface WriterUser {
  writer_id: string;
  username: string;
  email: string;
  full_name?: string;
  bio?: string;
  avatar_url?: string;
  specialization?: string;
  experience_level?: string;
  is_verified?: boolean;
  last_login?: string;
}

interface UseWriterAuthReturn {
  user: WriterUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<boolean>;
}

export function useWriterAuth(): UseWriterAuthReturn {
  const [user, setUser] = useState<WriterUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      const token = localStorage.getItem('writerToken');
      if (!token) {
        return false;
      }

      // Verify token with server
      const response = await fetch('/api/writer/auth/verify', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.writer);
        setIsAuthenticated(true);
        return true;
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('writerToken');
        localStorage.removeItem('writerUser');
        setUser(null);
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check error:', error);
      localStorage.removeItem('writerToken');
      localStorage.removeItem('writerUser');
      setUser(null);
      setIsAuthenticated(false);
      return false;
    }
  }, []);

  const login = useCallback(async (username: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await fetch('/api/writer/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('writerToken', data.token);
        localStorage.setItem('writerUser', JSON.stringify(data.writer));
        setUser(data.writer);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        // Handle detailed error messages from API
        const errorMessage = data.details || data.error || 'Login failed';
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Network error. Please check your connection and try again.' };
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      // Call logout API to invalidate session
      await fetch('/api/writer/auth', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('writerToken')}`
        }
      });
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem('writerToken');
      localStorage.removeItem('writerUser');
      setUser(null);
      setIsAuthenticated(false);
      router.push('/writer');
    }
  }, [router]);

  // Check authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    initAuth();
  }, [checkAuth]);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    checkAuth
  };
} 